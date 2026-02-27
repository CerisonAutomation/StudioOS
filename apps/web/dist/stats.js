// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef2, createElement as createElement2 } from "react";

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef, createElement } from "react";

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef(({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth,
  className = "",
  children,
  iconNode,
  ...rest
}, ref) => createElement("svg", {
  ref,
  ...defaultAttributes,
  width: size,
  height: size,
  stroke: color,
  strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
  className: mergeClasses("lucide", className),
  ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
  ...rest
}, [
  ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
  ...Array.isArray(children) ? children : [children]
]));

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef2(({ className, ...props }, ref) => createElement2(Icon, {
    ref,
    iconNode,
    className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
    ...props
  }));
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/icons/dollar-sign.js
var __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
var DollarSign = createLucideIcon("dollar-sign", __iconNode);

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/icons/folder-kanban.js
var __iconNode2 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
var FolderKanban = createLucideIcon("folder-kanban", __iconNode2);

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/icons/trending-up.js
var __iconNode3 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
var TrendingUp = createLucideIcon("trending-up", __iconNode3);

// ../../node_modules/.bun/lucide-react@0.553.0+b1ab299f0a400331/node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode4 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode4);
// lib/data.ts
async function getDashboardStats() {
  return {
    revenue: 125000,
    activeProjects: 12,
    totalClients: 48,
    conversionRate: 68
  };
}

// components/dashboard/stats.tsx
import { jsxDEV } from "react/jsx-dev-runtime";
async function DashboardStats() {
  const stats = await getDashboardStats();
  const items = [
    {
      name: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      change: "+12%",
      changeType: "positive",
      icon: DollarSign
    },
    {
      name: "Active Projects",
      value: stats.activeProjects.toString(),
      change: "+3",
      changeType: "positive",
      icon: FolderKanban
    },
    {
      name: "Total Clients",
      value: stats.totalClients.toString(),
      change: "+8%",
      changeType: "positive",
      icon: Users
    },
    {
      name: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: "+2.4%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];
  return /* @__PURE__ */ jsxDEV("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
    "data-testid": "metric-card",
    children: items.map((item) => /* @__PURE__ */ jsxDEV("div", {
      className: "bg-card border border-border rounded-lg p-6",
      children: [
        /* @__PURE__ */ jsxDEV("div", {
          className: "flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxDEV("div", {
              children: [
                /* @__PURE__ */ jsxDEV("p", {
                  className: "text-sm text-muted-foreground",
                  children: item.name
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV("p", {
                  className: "text-2xl font-bold mt-1",
                  children: item.value
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            /* @__PURE__ */ jsxDEV("div", {
              className: "w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center",
              children: /* @__PURE__ */ jsxDEV(item.icon, {
                className: "w-6 h-6 text-primary"
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV("div", {
          className: "mt-4 flex items-center text-sm",
          children: [
            /* @__PURE__ */ jsxDEV("span", {
              className: item.changeType === "positive" ? "text-green-500" : "text-red-500",
              children: item.change
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV("span", {
              className: "text-muted-foreground ml-2",
              children: "from last month"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, item.name, true, undefined, this))
  }, undefined, false, undefined, this);
}
export {
  DashboardStats
};
