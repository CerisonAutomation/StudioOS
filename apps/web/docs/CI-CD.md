# StudioOS CI/CD Pipeline

## Overview
Production CI/CD pipeline with automated testing, security scanning, performance monitoring, and multi-environment deployment.

## Pipeline Stages

### 1. Code Quality & Security
```yaml
code-quality:
  stage: test
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run lint
    - npm run type-check
    - npm run security-audit
    - npm run accessibility-check
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - .npm/
      - node_modules/
  artifacts:
    reports:
      sast: gl-sast-report.json
    expire_in: 1 week
  only:
    - merge_requests
    - main
    - develop
```

### 2. Comprehensive Testing
```yaml
unit-tests:
  stage: test
  image: node:18-alpine
  services:
    - postgres:15-alpine
    - redis:7-alpine
  variables:
    POSTGRES_DB: studioos_test
    POSTGRES_USER: studioos
    POSTGRES_PASSWORD: test_password
    REDIS_URL: redis://redis:6379
  before_script:
    - npm ci --cache .npm --prefer-offline
    - npx supabase start
  script:
    - npm run test:unit -- --coverage --coverageReporters=json-summary
    - npm run test:integration
    - npm run test:e2e:ci
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
      junit: test-results/junit.xml
    expire_in: 1 week

visual-regression:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0-jammy
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npx playwright install
    - npm run test:visual
  artifacts:
    paths:
      - test-results/visual/
    expire_in: 1 week

performance-tests:
  stage: test
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run lighthouse:ci
    - npm run performance:test
  artifacts:
    paths:
      - lighthouse-reports/
      - performance-reports/
    expire_in: 1 week

chaos-tests:
  stage: test
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run chaos:test
  artifacts:
    paths:
      - chaos-reports/
    expire_in: 1 week
  allow_failure: true
```

### 3. Security Scanning
```yaml
security-scan:
  stage: security
  image: zricethezav/gitleaks:latest
  script:
    - gitleaks detect --verbose --redact --config .gitleaks.toml
  allow_failure: false

dependency-scan:
  stage: security
  image: node:18-alpine
  script:
    - npm audit --audit-level high
    - npm run security:scan
  artifacts:
    reports:
      dependency_scanning: dependency-report.json
    expire_in: 1 week

container-scan:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy image --format json --output trivy-report.json $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  artifacts:
    reports:
      container_scanning: trivy-report.json
    expire_in: 1 week
  dependencies:
    - build
```

### 4. Build & Optimization
```yaml
build:
  stage: build
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run build
    - npm run analyze:bundle
  artifacts:
    paths:
      - .next/
      - bundle-analysis/
    expire_in: 1 hour
  cache:
    key: "$CI_COMMIT_REF_SLUG"
    paths:
      - .npm/
      - node_modules/
      - .next/cache/

build-storybook:
  stage: build
  image: node:18-alpine
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run build:storybook
  artifacts:
    paths:
      - storybook-static/
    expire_in: 1 week
  only:
    - main
```

### 5. Multi-Environment Deployment
```yaml
deploy-staging:
  stage: deploy
  image: google/cloud-sdk:alpine
  environment:
    name: staging
    url: https://staging.studioos.com
  before_script:
    - echo $GCP_SA_KEY > /tmp/gcp-key.json
    - gcloud auth activate-service-account --key-file /tmp/gcp-key.json
    - gcloud config set project $GCP_PROJECT_ID
  script:
    - gcloud builds submit --config cloudbuild.staging.yaml .
  dependencies:
    - build
  only:
    - develop

deploy-production:
  stage: deploy
  image: google/cloud-sdk:alpine
  environment:
    name: production
    url: https://studioos.com
  before_script:
    - echo $GCP_SA_KEY > /tmp/gcp-key.json
    - gcloud auth activate-service-account --key-file /tmp/gcp-key.json
    - gcloud config set project $GCP_PROJECT_ID
  script:
    - gcloud builds submit --config cloudbuild.production.yaml .
  dependencies:
    - build
  only:
    - main
  when: manual

deploy-edge:
  stage: deploy
  image: node:18-alpine
  script:
    - npx vercel --prod --yes
  environment:
    name: edge
    url: https://studioos-edge.vercel.app
  only:
    - main
```

### 6. Monitoring & Alerting
```yaml
performance-monitoring:
  stage: monitor
  image: node:18-alpine
  script:
    - npm run performance:monitor
    - npm run error-tracking:check
  artifacts:
    paths:
      - monitoring-reports/
    expire_in: 1 week

health-check:
  stage: monitor
  image: curlimages/curl:latest
  script:
    - curl -f https://studioos.com/api/health || exit 1
    - curl -f https://staging.studioos.com/api/health || exit 1
  only:
    - main
    - develop
```

## Configuration Files

### .gitlab-ci.yml (Complete)
```yaml
stages:
  - test
  - security
  - build
  - deploy
  - monitor

variables:
  DOCKER_HOST: tcp://docker:2376
  DOCKER_TLS_CERTDIR: "/certs"
  DOCKER_TLS_VERIFY: 1
  DOCKER_CERT_PATH: "$DOCKER_TLS_CERTDIR/client"
  DOCKER_DRIVER: overlay2

include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml

# Test stage jobs...
# Security stage jobs...
# Build stage jobs...
# Deploy stage jobs...
# Monitor stage jobs...
```

### cloudbuild.staging.yaml
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/studioos-staging:$COMMIT_SHA'
      - '.'
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/studioos-staging:$COMMIT_SHA'
  - name: 'gcr.io/cloud-builders/gke-deploy'
    args:
      - run
      - '--filename=k8s/staging/'
      - '--image=gcr.io/$PROJECT_ID/studioos-staging:$COMMIT_SHA'
      - '--location=us-central1'
      - '--cluster=studioos-staging'
```

### cloudbuild.production.yaml
```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/studioos:$COMMIT_SHA'
      - '.'
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
    args:
      - 'gcr.io/$PROJECT_ID/studioos:$COMMIT_SHA'
  - name: 'gcr.io/cloud-builders/gke-deploy'
    args:
      - run
      - '--filename=k8s/production/'
      - '--image=gcr.io/$PROJECT_ID/studioos:$COMMIT_SHA'
      - '--location=us-central1'
      - '--cluster=studioos-production'
```

## Quality Gates

### Test Coverage Requirements
- **Unit Tests**: >95% coverage
- **Integration Tests**: >90% coverage
- **E2E Tests**: >85% coverage
- **Visual Regression**: 100% pass rate

### Performance Budgets
- **Bundle Size**: <150KB initial, <500KB total
- **Lighthouse Scores**: >95 PWA, >90 Performance
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

### Security Requirements
- **SAST**: Zero critical/high vulnerabilities
- **Dependency Scan**: Zero critical vulnerabilities
- **Container Scan**: Zero critical vulnerabilities
- **Secret Detection**: Zero secrets exposed

## Rollback Strategy

### Automated Rollback Triggers
- Deployment failure >5 minutes
- Error rate >5% in 5 minutes
- Performance degradation >20%
- Security vulnerability detected

### Manual Rollback Process
1. Identify failed deployment
2. Execute rollback command
3. Verify rollback success
4. Investigate root cause
5. Fix issues and redeploy

## Monitoring Integration

### Real-time Dashboards
- Deployment status and metrics
- Error rates and performance
- Security incidents and alerts
- User experience metrics

### Alerting Rules
- Deployment failures
- Performance degradation
- Security incidents
- Infrastructure issues
