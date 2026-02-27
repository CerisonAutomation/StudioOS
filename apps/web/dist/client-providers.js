var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// ../../node_modules/.bun/react@19.2.4/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS((exports, module) => {
  (function() {
    function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function() {
          console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
        }
      });
    }
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
      var warningKey = publicInstance + "." + callerName;
      didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
    }
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function noop() {}
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
      oldElement._store && (newKey._store.validated = oldElement._store.validated);
      return newKey;
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    function getElementKey(element, index) {
      return typeof element === "object" && element !== null && element.key != null ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (typeof thenable.status === "string" ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
            thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          }, function(error) {
            thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
          })), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if (type === "undefined" || type === "boolean")
        children = null;
      var invokeCallback = false;
      if (children === null)
        invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
            }
        }
      if (invokeCallback) {
        invokeCallback = children;
        callback = callback(invokeCallback);
        var childKey = nameSoFar === "" ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
        isArrayImpl(callback) ? (escapedPrefix = "", childKey != null && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : callback != null && (isValidElement(callback) && (callback.key != null && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (callback.key == null || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), nameSoFar !== "" && invokeCallback != null && isValidElement(invokeCallback) && invokeCallback.key == null && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
        return 1;
      }
      invokeCallback = 0;
      childKey = nameSoFar === "" ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0;i < children.length; i++)
          nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (i = getIteratorFn(children), typeof i === "function")
        for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true), children = i.call(children), i = 0;!(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (type === "object") {
        if (typeof children.then === "function")
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
        array = String(children);
        throw Error("Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (children == null)
        return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (payload._status === -1) {
        var ioInfo = payload._ioInfo;
        ioInfo != null && (ioInfo.start = ioInfo.end = performance.now());
        ioInfo = payload._result;
        var thenable = ioInfo();
        thenable.then(function(moduleObject) {
          if (payload._status === 0 || payload._status === -1) {
            payload._status = 1;
            payload._result = moduleObject;
            var _ioInfo = payload._ioInfo;
            _ioInfo != null && (_ioInfo.end = performance.now());
            thenable.status === undefined && (thenable.status = "fulfilled", thenable.value = moduleObject);
          }
        }, function(error) {
          if (payload._status === 0 || payload._status === -1) {
            payload._status = 2;
            payload._result = error;
            var _ioInfo2 = payload._ioInfo;
            _ioInfo2 != null && (_ioInfo2.end = performance.now());
            thenable.status === undefined && (thenable.status = "rejected", thenable.reason = error);
          }
        });
        ioInfo = payload._ioInfo;
        if (ioInfo != null) {
          ioInfo.value = thenable;
          var displayName = thenable.displayName;
          typeof displayName === "string" && (ioInfo.name = displayName);
        }
        payload._status === -1 && (payload._status = 0, payload._result = thenable);
      }
      if (payload._status === 1)
        return ioInfo = payload._result, ioInfo === undefined && console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ioInfo), "default" in ioInfo || console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ioInfo), ioInfo.default;
      throw payload._result;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      dispatcher === null && console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return dispatcher;
    }
    function releaseAsyncTransition() {
      ReactSharedInternals.asyncTransitions--;
    }
    function enqueueTask(task) {
      if (enqueueTaskImpl === null)
        try {
          var requireString = ("require" + Math.random()).slice(0, 7);
          enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
        } catch (_err) {
          enqueueTaskImpl = function(callback) {
            didWarnAboutMessageChannel === false && (didWarnAboutMessageChannel = true, typeof MessageChannel === "undefined" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var channel = new MessageChannel;
            channel.port1.onmessage = callback;
            channel.port2.postMessage(undefined);
          };
        }
      return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
      return 1 < errors.length && typeof AggregateError === "function" ? new AggregateError(errors) : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
      prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
      actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
      var queue = ReactSharedInternals.actQueue;
      if (queue !== null)
        if (queue.length !== 0)
          try {
            flushActQueue(queue);
            enqueueTask(function() {
              return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
        else
          ReactSharedInternals.actQueue = null;
      0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
    }
    function flushActQueue(queue) {
      if (!isFlushing) {
        isFlushing = true;
        var i = 0;
        try {
          for (;i < queue.length; i++) {
            var callback = queue[i];
            do {
              ReactSharedInternals.didUsePromise = false;
              var continuation = callback(false);
              if (continuation !== null) {
                if (ReactSharedInternals.didUsePromise) {
                  queue[i] = callback;
                  queue.splice(0, i);
                  return;
                }
                callback = continuation;
              } else
                break;
            } while (1);
          }
          queue.length = 0;
        } catch (error) {
          queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
        } finally {
          isFlushing = false;
        }
      }
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function(publicInstance) {
        warnNoop(publicInstance, "forceUpdate");
      },
      enqueueReplaceState: function(publicInstance) {
        warnNoop(publicInstance, "replaceState");
      },
      enqueueSetState: function(publicInstance) {
        warnNoop(publicInstance, "setState");
      }
    }, assign = Object.assign, emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
      ]
    };
    for (fnName in deprecatedAPIs)
      deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy;
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = true;
    var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null,
      actQueue: null,
      asyncTransitions: 0,
      isBatchingLegacy: false,
      didScheduleLegacyUpdate: false,
      didUsePromise: false,
      thrownErrors: [],
      getCurrentStack: null,
      recentlyCreatedOwnerStacks: 0
    }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    deprecatedAPIs = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(deprecatedAPIs, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = typeof queueMicrotask === "function" ? function(callback) {
      queueMicrotask(function() {
        return queueMicrotask(callback);
      });
    } : enqueueTask;
    deprecatedAPIs = Object.freeze({
      __proto__: null,
      c: function(size) {
        return resolveDispatcher().useMemoCache(size);
      }
    });
    var fnName = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = fnName;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function(callback) {
      var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
      actScopeDepth++;
      var queue = ReactSharedInternals.actQueue = prevActQueue !== null ? prevActQueue : [], didAwaitActCall = false;
      try {
        var result = callback();
      } catch (error) {
        ReactSharedInternals.thrownErrors.push(error);
      }
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      if (result !== null && typeof result === "object" && typeof result.then === "function") {
        var thenable = result;
        queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
        });
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            thenable.then(function(returnValue) {
              popActScope(prevActQueue, prevActScopeDepth);
              if (prevActScopeDepth === 0) {
                try {
                  flushActQueue(queue), enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  });
                } catch (error$0) {
                  ReactSharedInternals.thrownErrors.push(error$0);
                }
                if (0 < ReactSharedInternals.thrownErrors.length) {
                  var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                  ReactSharedInternals.thrownErrors.length = 0;
                  reject(_thrownError);
                }
              } else
                resolve(returnValue);
            }, function(error) {
              popActScope(prevActQueue, prevActScopeDepth);
              0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
            });
          }
        };
      }
      var returnValue$jscomp$0 = result;
      popActScope(prevActQueue, prevActScopeDepth);
      prevActScopeDepth === 0 && (flushActQueue(queue), queue.length !== 0 && queueSeveralMicrotasks(function() {
        didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
      }), ReactSharedInternals.actQueue = null);
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      return {
        then: function(resolve, reject) {
          didAwaitActCall = true;
          prevActScopeDepth === 0 ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
            return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
          })) : resolve(returnValue$jscomp$0);
        }
      };
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.captureOwnerStack = function() {
      var getCurrentStack = ReactSharedInternals.getCurrentStack;
      return getCurrentStack === null ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
      if (element === null || element === undefined)
        throw Error("The argument must be a React element, but you passed " + element + ".");
      var props = assign({}, element.props), key = element.key, owner = element._owner;
      if (config != null) {
        var JSCompiler_inline_result;
        a: {
          if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
            JSCompiler_inline_result = false;
            break a;
          }
          JSCompiler_inline_result = config.ref !== undefined;
        }
        JSCompiler_inline_result && (owner = getOwner());
        hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
        for (propName in config)
          !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === undefined || (props[propName] = config[propName]);
      }
      var propName = arguments.length - 2;
      if (propName === 1)
        props.children = children;
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName);
        for (var i = 0;i < propName; i++)
          JSCompiler_inline_result[i] = arguments[i + 2];
        props.children = JSCompiler_inline_result;
      }
      props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
      for (key = 2;key < arguments.length; key++)
        validateChildKeys(arguments[key]);
      return props;
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      defaultValue._currentRenderer = null;
      defaultValue._currentRenderer2 = null;
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      for (var i = 2;i < arguments.length; i++)
        validateChildKeys(arguments[i]);
      i = {};
      var key = null;
      if (config != null)
        for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (i[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1)
        i.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), _i = 0;_i < childrenLength; _i++)
          childArray[_i] = arguments[_i + 2];
        Object.freeze && Object.freeze(childArray);
        i.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          i[propName] === undefined && (i[propName] = childrenLength[propName]);
      key && defineKeyPropWarningGetter(i, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return ReactElement(type, key, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
      var refObject = { current: null };
      Object.seal(refObject);
      return refObject;
    };
    exports.forwardRef = function(render) {
      render != null && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render !== "function" ? console.error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
      render != null && render.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
        }
      });
      return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      ctor = { _status: -1, _result: ctor };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: ctor,
        _init: lazyInitializer
      }, ioInfo = {
        name: "lazy",
        start: -1,
        end: -1,
        value: null,
        owner: null,
        debugStack: Error("react-stack-top-frame"),
        debugTask: console.createTask ? console.createTask("lazy()") : null
      };
      ctor._ioInfo = ioInfo;
      lazyType._debugInfo = [{ awaited: ioInfo }];
      return lazyType;
    };
    exports.memo = function(type, compare) {
      type == null && console.error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare
      };
      var ownName;
      Object.defineProperty(compare, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
        }
      });
      return compare;
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition._updatedFibers = new Set;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
      } catch (error) {
        reportGlobalError(error);
      } finally {
        prevTransition === null && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), prevTransition !== null && currentTransition.types !== null && (prevTransition.types !== null && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function(usable) {
      return resolveDispatcher().use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return resolveDispatcher().useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      var dispatcher = resolveDispatcher();
      Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
      return dispatcher.useContext(Context);
    };
    exports.useDebugValue = function(value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function(value, initialValue) {
      return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      create == null && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return resolveDispatcher().useEffectEvent(callback);
    };
    exports.useId = function() {
      return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      create == null && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      create == null && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
      return resolveDispatcher().useTransition();
    };
    exports.version = "19.2.4";
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// ../../node_modules/.bun/react@19.2.4/node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  var react_development = __toESM(require_react_development());
  if (false) {} else {
    module.exports = react_development;
  }
});

// ../../node_modules/.bun/react-dom@19.2.4+b1ab299f0a400331/node_modules/react-dom/cjs/react-dom.development.js
var require_react_dom_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  (function() {
    function noop() {}
    function testStringCoercion(value) {
      return "" + value;
    }
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && arguments[3] !== undefined ? arguments[3] : null;
      try {
        testStringCoercion(key);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol === "function" && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    function getCrossOriginStringAs(as, input) {
      if (as === "font")
        return "";
      if (typeof input === "string")
        return input === "use-credentials" ? input : "";
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
      return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : 'something with type "' + typeof thing + '"';
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
      return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : typeof thing === "string" ? JSON.stringify(thing) : typeof thing === "number" ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      dispatcher === null && console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return dispatcher;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    }, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map === "function" && Map.prototype != null && typeof Map.prototype.forEach === "function" && typeof Set === "function" && Set.prototype != null && typeof Set.prototype.clear === "function" && typeof Set.prototype.forEach === "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && arguments[2] !== undefined ? arguments[2] : null;
      if (!container || container.nodeType !== 1 && container.nodeType !== 9 && container.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn)
          return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
      }
    };
    exports.preconnect = function(href, options) {
      typeof href === "string" && href ? options != null && typeof options !== "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : options != null && typeof options.crossOrigin !== "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      typeof href === "string" && (options ? (options = options.crossOrigin, options = typeof options === "string" ? options === "use-credentials" ? options : "" : undefined) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      if (typeof href !== "string" || !href)
        console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      else if (1 < arguments.length) {
        var options = arguments[1];
        typeof options === "object" && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
      }
      typeof href === "string" && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      typeof href === "string" && href ? options == null || typeof options !== "object" ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : options.as !== "style" && options.as !== "script" && console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      if (typeof href === "string" && options && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = typeof options.integrity === "string" ? options.integrity : undefined, fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
        as === "style" ? Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
          crossOrigin,
          integrity,
          fetchPriority
        }) : as === "script" && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined
        });
      }
    };
    exports.preinitModule = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options !== undefined && typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && ("as" in options) && options.as !== "script" && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
      if (encountered)
        console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
      else
        switch (encountered = options && typeof options.as === "string" ? options.as : "script", encountered) {
          case "script":
            break;
          default:
            encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)', encountered, href);
        }
      if (typeof href === "string")
        if (typeof options === "object" && options !== null) {
          if (options.as == null || options.as === "script")
            encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
              crossOrigin: encountered,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined
            });
        } else
          options == null && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options == null || typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : typeof options.as === "string" && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
      if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
        encountered = options.as;
        var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
        Internals.d.L(href, encountered, {
          crossOrigin,
          integrity: typeof options.integrity === "string" ? options.integrity : undefined,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined,
          type: typeof options.type === "string" ? options.type : undefined,
          fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
          referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
          imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
          imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
          media: typeof options.media === "string" ? options.media : undefined
        });
      }
    };
    exports.preloadModule = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options !== undefined && typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && ("as" in options) && typeof options.as !== "string" && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
      typeof href === "string" && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
        as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
        crossOrigin: encountered,
        integrity: typeof options.integrity === "string" ? options.integrity : undefined
      })) : Internals.d.m(href));
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return resolveDispatcher().useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return resolveDispatcher().useHostTransitionStatus();
    };
    exports.version = "19.2.4";
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// ../../node_modules/.bun/react-dom@19.2.4+b1ab299f0a400331/node_modules/react-dom/index.js
var require_react_dom = __commonJS((exports, module) => {
  var react_dom_development = __toESM(require_react_dom_development());
  if (false) {} else {
    module.exports = react_dom_development;
  }
});

// ../../node_modules/.bun/react@19.2.4/node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  (function() {
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x2) {}
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x2) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (children !== undefined)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0;isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else
          validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return k !== "key";
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      maybeKey !== undefined && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          propName !== "key" && (maybeKey[propName] = config[propName]);
      } else
        maybeKey = config;
      children && defineKeyPropWarningGetter(maybeKey, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
  })();
});

// ../../node_modules/.bun/react@19.2.4/node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS((exports, module) => {
  var react_jsx_dev_runtime_development = __toESM(require_react_jsx_dev_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_dev_runtime_development;
  }
});

// ../../node_modules/.bun/react@19.2.4/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS((exports) => {
  var React2 = __toESM(require_react());
  (function() {
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x2) {}
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x2) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (children !== undefined)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0;isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else
          validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return k !== "key";
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      maybeKey !== undefined && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          propName !== "key" && (maybeKey[propName] = config[propName]);
      } else
        maybeKey = config;
      children && defineKeyPropWarningGetter(maybeKey, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React2 = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(React2, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, false, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, true, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
  })();
});

// ../../node_modules/.bun/react@19.2.4/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS((exports, module) => {
  var react_jsx_runtime_development = __toESM(require_react_jsx_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_runtime_development;
  }
});

// ../../node_modules/.bun/@tanstack+query-devtools@5.93.0/node_modules/@tanstack/query-devtools/build/chunk/6FXOYLZD.js
function getContextId(count) {
  const num = String(count), len = num.length - 1;
  return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return {
    ...sharedConfig.context,
    id: sharedConfig.getNextContextId(),
    count: 0
  };
}
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === undefined ? owner : detachedOwner, root = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: current ? current.context : null,
    owner: current
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || undefined
  };
  const setter = (value2) => {
    if (typeof value2 === "function") {
      if (Transition && Transition.running && Transition.sources.has(s))
        value2 = value2(s.tValue);
      else
        value2 = value2(s.value);
    }
    return writeSignal(s, value2);
  };
  return [readSignal.bind(s), setter];
}
function createComputed(fn, value, options) {
  const c = createComputation(fn, value, true, STALE);
  if (Scheduler && Transition && Transition.running)
    Updates.push(c);
  else
    updateComputation(c);
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  if (Scheduler && Transition && Transition.running)
    Updates.push(c);
  else
    updateComputation(c);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c = createComputation(fn, value, false, STALE), s = SuspenseContext && useContext4(SuspenseContext);
  if (s)
    c.suspense = s;
  if (!options || !options.render)
    c.user = true;
  Effects ? Effects.push(c) : updateComputation(c);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c = createComputation(fn, value, true, 0);
  c.observers = null;
  c.observerSlots = null;
  c.comparator = options.equals || undefined;
  if (Scheduler && Transition && Transition.running) {
    c.tState = STALE;
    Updates.push(c);
  } else
    updateComputation(c);
  return readSignal.bind(c);
}
function isPromise(v2) {
  return v2 && typeof v2 === "object" && "then" in v2;
}
function createResource(pSource, pFetcher, pOptions) {
  let source;
  let fetcher;
  let options;
  {
    source = true;
    fetcher = pSource;
    options = {};
  }
  let pr = null, initP = NO_INIT, id = null, loadedUnderTransition = false, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
  const contexts = /* @__PURE__ */ new Set, [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(undefined), [track, trigger] = createSignal(undefined, {
    equals: false
  }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
  if (sharedConfig.context) {
    id = sharedConfig.getNextContextId();
    if (options.ssrLoadFrom === "initial")
      initP = options.initialValue;
    else if (sharedConfig.load && sharedConfig.has(id))
      initP = sharedConfig.load(id);
  }
  function loadEnd(p, v2, error2, key) {
    if (pr === p) {
      pr = null;
      key !== undefined && (resolved = true);
      if ((p === initP || v2 === initP) && options.onHydrated)
        queueMicrotask(() => options.onHydrated(key, {
          value: v2
        }));
      initP = NO_INIT;
      if (Transition && p && loadedUnderTransition) {
        Transition.promises.delete(p);
        loadedUnderTransition = false;
        runUpdates(() => {
          Transition.running = true;
          completeLoad(v2, error2);
        }, false);
      } else
        completeLoad(v2, error2);
    }
    return v2;
  }
  function completeLoad(v2, err) {
    runUpdates(() => {
      if (err === undefined)
        setValue(() => v2);
      setState(err !== undefined ? "errored" : resolved ? "ready" : "unresolved");
      setError(err);
      for (const c of contexts.keys())
        c.decrement();
      contexts.clear();
    }, false);
  }
  function read() {
    const c = SuspenseContext && useContext4(SuspenseContext), v2 = value(), err = error();
    if (err !== undefined && !pr)
      throw err;
    if (Listener && !Listener.user && c) {
      createComputed(() => {
        track();
        if (pr) {
          if (c.resolved && Transition && loadedUnderTransition)
            Transition.promises.add(pr);
          else if (!contexts.has(c)) {
            c.increment();
            contexts.add(c);
          }
        }
      });
    }
    return v2;
  }
  function load(refetching = true) {
    if (refetching !== false && scheduled)
      return;
    scheduled = false;
    const lookup = dynamic ? dynamic() : source;
    loadedUnderTransition = Transition && Transition.running;
    if (lookup == null || lookup === false) {
      loadEnd(pr, untrack(value));
      return;
    }
    if (Transition && pr)
      Transition.promises.delete(pr);
    let error2;
    const p = initP !== NO_INIT ? initP : untrack(() => {
      try {
        return fetcher(lookup, {
          value: value(),
          refetching
        });
      } catch (fetcherError) {
        error2 = fetcherError;
      }
    });
    if (error2 !== undefined) {
      loadEnd(pr, undefined, castError(error2), lookup);
      return;
    } else if (!isPromise(p)) {
      loadEnd(pr, p, undefined, lookup);
      return p;
    }
    pr = p;
    if ("v" in p) {
      if (p.s === 1)
        loadEnd(pr, p.v, undefined, lookup);
      else
        loadEnd(pr, undefined, castError(p.v), lookup);
      return p;
    }
    scheduled = true;
    queueMicrotask(() => scheduled = false);
    runUpdates(() => {
      setState(resolved ? "refreshing" : "pending");
      trigger();
    }, false);
    return p.then((v2) => loadEnd(p, v2, undefined, lookup), (e) => loadEnd(p, undefined, castError(e), lookup));
  }
  Object.defineProperties(read, {
    state: {
      get: () => state()
    },
    error: {
      get: () => error()
    },
    loading: {
      get() {
        const s = state();
        return s === "pending" || s === "refreshing";
      }
    },
    latest: {
      get() {
        if (!resolved)
          return read();
        const err = error();
        if (err && !pr)
          throw err;
        return value();
      }
    }
  });
  let owner = Owner;
  if (dynamic)
    createComputed(() => (owner = Owner, load(false)));
  else
    load(false);
  return [read, {
    refetch: (info) => runWithOwner(owner, () => load(info)),
    mutate: setValue
  }];
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (!ExternalSourceConfig && Listener === null)
    return fn();
  const listener = Listener;
  Listener = null;
  try {
    if (ExternalSourceConfig)
      return ExternalSourceConfig.untrack(fn);
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray3 = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return (prevValue) => {
    let input;
    if (isArray3) {
      input = Array(deps.length);
      for (let i = 0;i < deps.length; i++)
        input[i] = deps[i]();
    } else
      input = deps();
    if (defer) {
      defer = false;
      return prevValue;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null)
    ;
  else if (Owner.cleanups === null)
    Owner.cleanups = [fn];
  else
    Owner.cleanups.push(fn);
  return fn;
}
function getOwner() {
  return Owner;
}
function runWithOwner(o2, fn) {
  const prev = Owner;
  const prevListener = Listener;
  Owner = o2;
  Listener = null;
  try {
    return runUpdates(fn, true);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
    Listener = prevListener;
  }
}
function startTransition(fn) {
  if (Transition && Transition.running) {
    fn();
    return Transition.done;
  }
  const l = Listener;
  const o2 = Owner;
  return Promise.resolve().then(() => {
    Listener = l;
    Owner = o2;
    let t2;
    if (Scheduler || SuspenseContext) {
      t2 = Transition || (Transition = {
        sources: /* @__PURE__ */ new Set,
        effects: [],
        promises: /* @__PURE__ */ new Set,
        disposed: /* @__PURE__ */ new Set,
        queue: /* @__PURE__ */ new Set,
        running: true
      });
      t2.done || (t2.done = new Promise((res) => t2.resolve = res));
      t2.running = true;
    }
    runUpdates(fn, false);
    Listener = Owner = null;
    return t2 ? t2.done : undefined;
  });
}
function useTransition() {
  return [transPending, startTransition];
}
function createContext4(defaultValue, options) {
  const id = /* @__PURE__ */ Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext4(context) {
  let value;
  return Owner && Owner.context && (value = Owner.context[context.id]) !== undefined ? value : context.defaultValue;
}
function children(fn) {
  const children2 = createMemo(fn);
  const memo2 = createMemo(() => resolveChildren(children2()));
  memo2.toArray = () => {
    const c = memo2();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo2;
}
function readSignal() {
  const runningTransition = Transition && Transition.running;
  if (this.sources && (runningTransition ? this.tState : this.state)) {
    if ((runningTransition ? this.tState : this.state) === STALE)
      updateComputation(this);
    else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  if (runningTransition && Transition.sources.has(this))
    return this.tValue;
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    if (Transition) {
      const TransitionRunning = Transition.running;
      if (TransitionRunning || !isComp && Transition.sources.has(node)) {
        Transition.sources.add(node);
        node.tValue = value;
      }
      if (!TransitionRunning)
        node.value = value;
    } else
      node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0;i < node.observers.length; i += 1) {
          const o2 = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o2))
            continue;
          if (TransitionRunning ? !o2.tState : !o2.state) {
            if (o2.pure)
              Updates.push(o2);
            else
              Effects.push(o2);
            if (o2.observers)
              markDownstream(o2);
          }
          if (!TransitionRunning)
            o2.state = STALE;
          else
            o2.tState = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (IS_DEV)
            ;
          throw new Error;
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn)
    return;
  cleanNode(node);
  const time = ExecCount;
  runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
  if (Transition && !Transition.running && Transition.sources.has(node)) {
    queueMicrotask(() => {
      runUpdates(() => {
        Transition && (Transition.running = true);
        Listener = Owner = node;
        runComputation(node, node.tValue, time);
        Listener = Owner = null;
      }, false);
    });
  }
}
function runComputation(node, value, time) {
  let nextValue;
  const owner = Owner, listener = Listener;
  Listener = Owner = node;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      if (Transition && Transition.running) {
        node.tState = STALE;
        node.tOwned && node.tOwned.forEach(cleanNode);
        node.tOwned = undefined;
      } else {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  } finally {
    Listener = listener;
    Owner = owner;
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue, true);
    } else if (Transition && Transition.running && node.pure) {
      Transition.sources.add(node);
      node.tValue = nextValue;
    } else
      node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Transition && Transition.running) {
    c.state = 0;
    c.tState = state;
  }
  if (Owner === null)
    ;
  else if (Owner !== UNOWNED) {
    if (Transition && Transition.running && Owner.pure) {
      if (!Owner.tOwned)
        Owner.tOwned = [c];
      else
        Owner.tOwned.push(c);
    } else {
      if (!Owner.owned)
        Owner.owned = [c];
      else
        Owner.owned.push(c);
    }
  }
  if (ExternalSourceConfig && c.fn) {
    const [track, trigger] = createSignal(undefined, {
      equals: false
    });
    const ordinary = ExternalSourceConfig.factory(c.fn, trigger);
    onCleanup(() => ordinary.dispose());
    const triggerInTransition = () => startTransition(trigger).then(() => inTransition.dispose());
    const inTransition = ExternalSourceConfig.factory(c.fn, triggerInTransition);
    c.fn = (x2) => {
      track();
      return Transition && Transition.running ? inTransition.track(x2) : ordinary.track(x2);
    };
  }
  return c;
}
function runTop(node) {
  const runningTransition = Transition && Transition.running;
  if ((runningTransition ? node.tState : node.state) === 0)
    return;
  if ((runningTransition ? node.tState : node.state) === PENDING)
    return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback))
    return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (runningTransition && Transition.disposed.has(node))
      return;
    if (runningTransition ? node.tState : node.state)
      ancestors.push(node);
  }
  for (let i = ancestors.length - 1;i >= 0; i--) {
    node = ancestors[i];
    if (runningTransition) {
      let top = node, prev = ancestors[i + 1];
      while ((top = top.owner) && top !== prev) {
        if (Transition.disposed.has(top))
          return;
      }
    }
    if ((runningTransition ? node.tState : node.state) === STALE) {
      updateComputation(node);
    } else if ((runningTransition ? node.tState : node.state) === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates)
    return fn();
  let wait = false;
  if (!init)
    Updates = [];
  if (Effects)
    wait = true;
  else
    Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait)
      Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    if (Scheduler && Transition && Transition.running)
      scheduleQueue(Updates);
    else
      runQueue(Updates);
    Updates = null;
  }
  if (wait)
    return;
  let res;
  if (Transition) {
    if (!Transition.promises.size && !Transition.queue.size) {
      const sources = Transition.sources;
      const disposed = Transition.disposed;
      Effects.push.apply(Effects, Transition.effects);
      res = Transition.resolve;
      for (const e2 of Effects) {
        "tState" in e2 && (e2.state = e2.tState);
        delete e2.tState;
      }
      Transition = null;
      runUpdates(() => {
        for (const d of disposed)
          cleanNode(d);
        for (const v2 of sources) {
          v2.value = v2.tValue;
          if (v2.owned) {
            for (let i = 0, len = v2.owned.length;i < len; i++)
              cleanNode(v2.owned[i]);
          }
          if (v2.tOwned)
            v2.owned = v2.tOwned;
          delete v2.tValue;
          delete v2.tOwned;
          v2.tState = 0;
        }
        setTransPending(false);
      }, false);
    } else if (Transition.running) {
      Transition.running = false;
      Transition.effects.push.apply(Transition.effects, Effects);
      Effects = null;
      setTransPending(true);
      return;
    }
  }
  const e = Effects;
  Effects = null;
  if (e.length)
    runUpdates(() => runEffects(e), false);
  if (res)
    res();
}
function runQueue(queue) {
  for (let i = 0;i < queue.length; i++)
    runTop(queue[i]);
}
function scheduleQueue(queue) {
  for (let i = 0;i < queue.length; i++) {
    const item = queue[i];
    const tasks = Transition.queue;
    if (!tasks.has(item)) {
      tasks.add(item);
      Scheduler(() => {
        tasks.delete(item);
        runUpdates(() => {
          Transition.running = true;
          runTop(item);
        }, false);
        Transition && (Transition.running = false);
      });
    }
  }
}
function runUserEffects(queue) {
  let i, userLength = 0;
  for (i = 0;i < queue.length; i++) {
    const e = queue[i];
    if (!e.user)
      runTop(e);
    else
      queue[userLength++] = e;
  }
  if (sharedConfig.context) {
    if (sharedConfig.count) {
      sharedConfig.effects || (sharedConfig.effects = []);
      sharedConfig.effects.push(...queue.slice(0, userLength));
      return;
    }
    setHydrateContext();
  }
  if (sharedConfig.effects && (sharedConfig.done || !sharedConfig.count)) {
    queue = [...sharedConfig.effects, ...queue];
    userLength += sharedConfig.effects.length;
    delete sharedConfig.effects;
  }
  for (i = 0;i < userLength; i++)
    runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition && Transition.running;
  if (runningTransition)
    node.tState = 0;
  else
    node.state = 0;
  for (let i = 0;i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      const state = runningTransition ? source.tState : source.state;
      if (state === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount))
          runTop(source);
      } else if (state === PENDING)
        lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition && Transition.running;
  for (let i = 0;i < node.observers.length; i += 1) {
    const o2 = node.observers[i];
    if (runningTransition ? !o2.tState : !o2.state) {
      if (runningTransition)
        o2.tState = PENDING;
      else
        o2.state = PENDING;
      if (o2.pure)
        Updates.push(o2);
      else
        Effects.push(o2);
      o2.observers && markDownstream(o2);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(), s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (node.tOwned) {
    for (i = node.tOwned.length - 1;i >= 0; i--)
      cleanNode(node.tOwned[i]);
    delete node.tOwned;
  }
  if (Transition && Transition.running && node.pure) {
    reset(node, true);
  } else if (node.owned) {
    for (i = node.owned.length - 1;i >= 0; i--)
      cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = node.cleanups.length - 1;i >= 0; i--)
      node.cleanups[i]();
    node.cleanups = null;
  }
  if (Transition && Transition.running)
    node.tState = 0;
  else
    node.state = 0;
}
function reset(node, top) {
  if (!top) {
    node.tState = 0;
    Transition.disposed.add(node);
  }
  if (node.owned) {
    for (let i = 0;i < node.owned.length; i++)
      reset(node.owned[i]);
  }
}
function castError(err) {
  if (err instanceof Error)
    return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function runErrors(err, fns, owner) {
  try {
    for (const f of fns)
      f(err);
  } catch (e) {
    handleError(e, owner && owner.owner || null);
  }
}
function handleError(err, owner = Owner) {
  const fns = ERROR && owner && owner.context && owner.context[ERROR];
  const error = castError(err);
  if (!fns)
    throw error;
  if (Effects)
    Effects.push({
      fn() {
        runErrors(error, fns, owner);
      },
      state: STALE
    });
  else
    runErrors(error, fns, owner);
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length)
    return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results = [];
    for (let i = 0;i < children2.length; i++) {
      const result = resolveChildren(children2[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children2;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    }), undefined);
    return res;
  };
}
function dispose(d) {
  for (let i = 0;i < d.length; i++)
    d[i]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [], newLen = newItems.length, i, j;
    newItems[$TRACK];
    return untrack(() => {
      let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      } else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0;j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen);start < end && items[start] === newItems[start]; start++)
          ;
        for (end = len - 1, newEnd = newLen - 1;end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = /* @__PURE__ */ new Map;
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd;j >= start; j--) {
          item = newItems[j];
          i = newIndices.get(item);
          newIndicesNext[j] = i === undefined ? -1 : i;
          newIndices.set(item, j);
        }
        for (i = start;i <= end; i++) {
          item = items[i];
          j = newIndices.get(item);
          if (j !== undefined && j !== -1) {
            temp[j] = mapped[i];
            tempdisposers[j] = disposers[i];
            indexes && (tempIndexes[j] = indexes[i]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else
            disposers[i]();
        }
        for (j = start;j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else
            mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], signals = [], len = 0, i;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [], newLen = newItems.length;
    newItems[$TRACK];
    return untrack(() => {
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i = 0;i < newLen; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (;i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newLen;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}
function createComponent(Comp, props) {
  if (hydrationEnabled) {
    if (sharedConfig.context) {
      const c = sharedConfig.context;
      setHydrateContext(nextHydrateContext());
      const r = untrack(() => Comp(props || {}));
      setHydrateContext(c);
      return r;
    }
  }
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
function resolveSource(s) {
  return !(s = typeof s === "function" ? s() : s) ? {} : s;
}
function resolveSources() {
  for (let i = 0, length = this.length;i < length; ++i) {
    const v2 = this[i]();
    if (v2 !== undefined)
      return v2;
  }
}
function mergeProps(...sources) {
  let proxy = false;
  for (let i = 0;i < sources.length; i++) {
    const s = sources[i];
    proxy = proxy || !!s && $PROXY in s;
    sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
  }
  if (SUPPORTS_PROXY && proxy) {
    return new Proxy({
      get(property) {
        for (let i = sources.length - 1;i >= 0; i--) {
          const v2 = resolveSource(sources[i])[property];
          if (v2 !== undefined)
            return v2;
        }
      },
      has(property) {
        for (let i = sources.length - 1;i >= 0; i--) {
          if (property in resolveSource(sources[i]))
            return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i = 0;i < sources.length; i++)
          keys.push(...Object.keys(resolveSource(sources[i])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const sourcesMap = {};
  const defined = /* @__PURE__ */ Object.create(null);
  for (let i = sources.length - 1;i >= 0; i--) {
    const source = sources[i];
    if (!source)
      continue;
    const sourceKeys = Object.getOwnPropertyNames(source);
    for (let i2 = sourceKeys.length - 1;i2 >= 0; i2--) {
      const key = sourceKeys[i2];
      if (key === "__proto__" || key === "constructor")
        continue;
      const desc = Object.getOwnPropertyDescriptor(source, key);
      if (!defined[key]) {
        defined[key] = desc.get ? {
          enumerable: true,
          configurable: true,
          get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
        } : desc.value !== undefined ? desc : undefined;
      } else {
        const sources2 = sourcesMap[key];
        if (sources2) {
          if (desc.get)
            sources2.push(desc.get.bind(source));
          else if (desc.value !== undefined)
            sources2.push(() => desc.value);
        }
      }
    }
  }
  const target = {};
  const definedKeys = Object.keys(defined);
  for (let i = definedKeys.length - 1;i >= 0; i--) {
    const key = definedKeys[i], desc = defined[key];
    if (desc && desc.get)
      Object.defineProperty(target, key, desc);
    else
      target[key] = desc ? desc.value : undefined;
  }
  return target;
}
function splitProps(props, ...keys) {
  if (SUPPORTS_PROXY && $PROXY in props) {
    const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
    const res = keys.map((k) => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : undefined;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter((property) => (property in props));
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? undefined : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : (property in props);
      },
      keys() {
        return Object.keys(props).filter((k) => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const otherObject = {};
  const objects = keys.map(() => ({}));
  for (const propName of Object.getOwnPropertyNames(props)) {
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    let blocked = false;
    let objectIndex = 0;
    for (const k of keys) {
      if (k.includes(propName)) {
        blocked = true;
        isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
      }
      ++objectIndex;
    }
    if (!blocked) {
      isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
    }
  }
  return [...objects, otherObject];
}
function lazy(fn) {
  let comp;
  let p;
  const wrap = (props) => {
    const ctx = sharedConfig.context;
    if (ctx) {
      const [s, set] = createSignal();
      sharedConfig.count || (sharedConfig.count = 0);
      sharedConfig.count++;
      (p || (p = fn())).then((mod) => {
        !sharedConfig.done && setHydrateContext(ctx);
        sharedConfig.count--;
        set(() => mod.default);
        setHydrateContext();
      });
      comp = s;
    } else if (!comp) {
      const [s] = createResource(() => (p || (p = fn())).then((mod) => mod.default));
      comp = s;
    }
    let Comp;
    return createMemo(() => (Comp = comp()) ? untrack(() => {
      if (IS_DEV)
        ;
      if (!ctx || sharedConfig.done)
        return Comp(props);
      const c = sharedConfig.context;
      setHydrateContext(ctx);
      const r = Comp(props);
      setHydrateContext(c);
      return r;
    }) : "");
  };
  wrap.preload = () => p || ((p = fn()).then((mod) => comp = () => mod.default), p);
  return wrap;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  return ctx ? sharedConfig.getNextContextId() : `cl-${counter++}`;
}
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || undefined));
}
function Show(props) {
  const keyed = props.keyed;
  const conditionValue = createMemo(() => props.when, undefined, undefined);
  const condition = keyed ? conditionValue : createMemo(conditionValue, undefined, {
    equals: (a, b2) => !a === !b2
  });
  return createMemo(() => {
    const c = condition();
    if (c) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      return fn ? untrack(() => child(keyed ? c : () => {
        if (!untrack(condition))
          throw narrowedError("Show");
        return conditionValue();
      })) : child;
    }
    return props.fallback;
  }, undefined, undefined);
}
function Switch(props) {
  const chs = children(() => props.children);
  const switchFunc = createMemo(() => {
    const ch = chs();
    const mps = Array.isArray(ch) ? ch : [ch];
    let func = () => {
      return;
    };
    for (let i = 0;i < mps.length; i++) {
      const index = i;
      const mp = mps[i];
      const prevFunc = func;
      const conditionValue = createMemo(() => prevFunc() ? undefined : mp.when, undefined, undefined);
      const condition = mp.keyed ? conditionValue : createMemo(conditionValue, undefined, {
        equals: (a, b2) => !a === !b2
      });
      func = () => prevFunc() || (condition() ? [index, conditionValue, mp] : undefined);
    }
    return func;
  });
  return createMemo(() => {
    const sel = switchFunc()();
    if (!sel)
      return props.fallback;
    const [index, conditionValue, mp] = sel;
    const child = mp.children;
    const fn = typeof child === "function" && child.length > 0;
    return fn ? untrack(() => child(mp.keyed ? conditionValue() : () => {
      if (untrack(switchFunc)()?.[0] !== index)
        throw narrowedError("Match");
      return conditionValue();
    })) : child;
  }, undefined, undefined);
}
function Match(props) {
  return props;
}
function getPropAlias(prop, tagName) {
  const a = PropAliases[prop];
  return typeof a === "object" ? a[tagName] ? a["$"] : undefined : a;
}
function reconcileArrays(parentNode, a, b2) {
  let bLength = b2.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a[aStart] === b2[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a[aEnd - 1] === b2[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b2[bStart - 1].nextSibling : b2[bEnd - bStart] : after;
      while (bStart < bEnd)
        parentNode.insertBefore(b2[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart]))
          a[aStart].remove();
        aStart++;
      }
    } else if (a[aStart] === b2[bEnd - 1] && b2[bStart] === a[aEnd - 1]) {
      const node = a[--aEnd].nextSibling;
      parentNode.insertBefore(b2[bStart++], a[aStart++].nextSibling);
      parentNode.insertBefore(b2[--bEnd], node);
      a[aEnd] = b2[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map;
        let i = bStart;
        while (i < bEnd)
          map.set(b2[i], i++);
      }
      const index = map.get(a[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i = aStart, sequence = 1, t2;
          while (++i < aEnd && i < bEnd) {
            if ((t2 = map.get(a[i])) == null || t2 !== index + sequence)
              break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a[aStart];
            while (bStart < index)
              parentNode.insertBefore(b2[bStart++], node);
          } else
            parentNode.replaceChild(b2[bStart++], a[aStart++]);
        } else
          aStart++;
      } else
        a[aStart++].remove();
    }
  }
}
function render(code, element, init, options = {}) {
  let disposer;
  createRoot((dispose2) => {
    disposer = dispose2;
    element === document ? code() : insert(element, code(), element.firstChild ? null : undefined, init);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template(html, isImportNode, isSVG, isMathML) {
  let node;
  const create = () => {
    const t2 = isMathML ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
    t2.innerHTML = html;
    return isSVG ? t2.content.firstChild.firstChild : isMathML ? t2.firstChild : t2.content.firstChild;
  };
  const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
  fn.cloneNode = fn;
  return fn;
}
function delegateEvents(eventNames, document2 = window.document) {
  const e = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set);
  for (let i = 0, l = eventNames.length;i < l; i++) {
    const name = eventNames[i];
    if (!e.has(name)) {
      e.add(name);
      document2.addEventListener(name, eventHandler);
    }
  }
}
function clearDelegatedEvents(document2 = window.document) {
  if (document2[$$EVENTS]) {
    for (let name of document2[$$EVENTS].keys())
      document2.removeEventListener(name, eventHandler);
    delete document2[$$EVENTS];
  }
}
function setAttribute(node, name, value) {
  if (isHydrating(node))
    return;
  if (value == null)
    node.removeAttribute(name);
  else
    node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
  if (isHydrating(node))
    return;
  if (value == null)
    node.removeAttributeNS(namespace, name);
  else
    node.setAttributeNS(namespace, name, value);
}
function setBoolAttribute(node, name, value) {
  if (isHydrating(node))
    return;
  value ? node.setAttribute(name, "") : node.removeAttribute(name);
}
function className(node, value) {
  if (isHydrating(node))
    return;
  if (value == null)
    node.removeAttribute("class");
  else
    node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else
      node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = (e) => handlerFn.call(node, handler[1], e));
  } else
    node.addEventListener(name, handler, typeof handler !== "function" && handler);
}
function classList(node, value, prev = {}) {
  const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
  let i, len;
  for (i = 0, len = prevKeys.length;i < len; i++) {
    const key = prevKeys[i];
    if (!key || key === "undefined" || value[key])
      continue;
    toggleClassKey(node, key, false);
    delete prev[key];
  }
  for (i = 0, len = classKeys.length;i < len; i++) {
    const key = classKeys[i], classValue = !!value[key];
    if (!key || key === "undefined" || prev[key] === classValue || !classValue)
      continue;
    toggleClassKey(node, key, true);
    prev[key] = classValue;
  }
  return prev;
}
function style(node, value, prev) {
  if (!value)
    return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string")
    return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = undefined);
  prev || (prev = {});
  value || (value = {});
  let v2, s;
  for (s in prev) {
    value[s] == null && nodeStyle.removeProperty(s);
    delete prev[s];
  }
  for (s in value) {
    v2 = value[s];
    if (v2 !== prev[s]) {
      nodeStyle.setProperty(s, v2);
      prev[s] = v2;
    }
  }
  return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
  const prevProps = {};
  if (!skipChildren) {
    createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
  }
  createRenderEffect(() => typeof props.ref === "function" && use(props.ref, node));
  createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
  return prevProps;
}
function use(fn, element, arg) {
  return untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
  if (marker !== undefined && !initial)
    initial = [];
  if (typeof accessor !== "function")
    return insertExpression(parent, accessor, initial, marker);
  createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
  props || (props = {});
  for (const prop in prevProps) {
    if (!(prop in props)) {
      if (prop === "children")
        continue;
      prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef, props);
    }
  }
  for (const prop in props) {
    if (prop === "children") {
      continue;
    }
    const value = props[prop];
    prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef, props);
  }
}
function getNextElement(template2) {
  let node, key, hydrating = isHydrating();
  if (!hydrating || !(node = sharedConfig.registry.get(key = getHydrationKey()))) {
    return template2();
  }
  if (sharedConfig.completed)
    sharedConfig.completed.add(node);
  sharedConfig.registry.delete(key);
  return node;
}
function isHydrating(node) {
  return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
}
function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_2, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
  const classNames = key.trim().split(/\s+/);
  for (let i = 0, nameLen = classNames.length;i < nameLen; i++)
    node.classList.toggle(classNames[i], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef, props) {
  let isCE, isProp, isChildProp, propAlias, forceProp;
  if (prop === "style")
    return style(node, value, prev);
  if (prop === "classList")
    return classList(node, value, prev);
  if (value === prev)
    return prev;
  if (prop === "ref") {
    if (!skipRef)
      value(node);
  } else if (prop.slice(0, 3) === "on:") {
    const e = prop.slice(3);
    prev && node.removeEventListener(e, prev, typeof prev !== "function" && prev);
    value && node.addEventListener(e, value, typeof value !== "function" && value);
  } else if (prop.slice(0, 10) === "oncapture:") {
    const e = prop.slice(10);
    prev && node.removeEventListener(e, prev, true);
    value && node.addEventListener(e, value, true);
  } else if (prop.slice(0, 2) === "on") {
    const name = prop.slice(2).toLowerCase();
    const delegate = DelegatedEvents.has(name);
    if (!delegate && prev) {
      const h = Array.isArray(prev) ? prev[0] : prev;
      node.removeEventListener(name, h);
    }
    if (delegate || value) {
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    }
  } else if (prop.slice(0, 5) === "attr:") {
    setAttribute(node, prop.slice(5), value);
  } else if (prop.slice(0, 5) === "bool:") {
    setBoolAttribute(node, prop.slice(5), value);
  } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-") || ("is" in props))) {
    if (forceProp) {
      prop = prop.slice(5);
      isProp = true;
    } else if (isHydrating(node))
      return value;
    if (prop === "class" || prop === "className")
      className(node, value);
    else if (isCE && !isProp && !isChildProp)
      node[toPropertyName(prop)] = value;
    else
      node[propAlias || prop] = value;
  } else {
    const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
    if (ns)
      setAttributeNS(node, ns, prop, value);
    else
      setAttribute(node, Aliases[prop] || prop, value);
  }
  return value;
}
function eventHandler(e) {
  if (sharedConfig.registry && sharedConfig.events) {
    if (sharedConfig.events.find(([el, ev]) => ev === e))
      return;
  }
  let node = e.target;
  const key = `$$${e.type}`;
  const oriTarget = e.target;
  const oriCurrentTarget = e.currentTarget;
  const retarget = (value) => Object.defineProperty(e, "target", {
    configurable: true,
    value
  });
  const handleNode = () => {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
      if (e.cancelBubble)
        return;
    }
    node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e.target) && retarget(node.host);
    return true;
  };
  const walkUpTree = () => {
    while (handleNode() && (node = node._$host || node.parentNode || node.host))
      ;
  };
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  if (sharedConfig.registry && !sharedConfig.done)
    sharedConfig.done = _$HY.done = true;
  if (e.composedPath) {
    const path = e.composedPath();
    retarget(path[0]);
    for (let i = 0;i < path.length - 2; i++) {
      node = path[i];
      if (!handleNode())
        break;
      if (node._$host) {
        node = node._$host;
        walkUpTree();
        break;
      }
      if (node.parentNode === oriCurrentTarget) {
        break;
      }
    }
  } else
    walkUpTree();
  retarget(oriTarget);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  const hydrating = isHydrating(parent);
  if (hydrating) {
    !current && (current = [...parent.childNodes]);
    let cleaned = [];
    for (let i = 0;i < current.length; i++) {
      const node = current[i];
      if (node.nodeType === 8 && node.data.slice(0, 2) === "!$")
        node.remove();
      else
        cleaned.push(node);
    }
    current = cleaned;
  }
  while (typeof current === "function")
    current = current();
  if (value === current)
    return current;
  const t2 = typeof value, multi = marker !== undefined;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t2 === "string" || t2 === "number") {
    if (hydrating)
      return current;
    if (t2 === "number") {
      value = value.toString();
      if (value === current)
        return current;
    }
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data !== value && (node.data = value);
      } else
        node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else
        current = parent.textContent = value;
    }
  } else if (value == null || t2 === "boolean") {
    if (hydrating)
      return current;
    current = cleanChildren(parent, current, marker);
  } else if (t2 === "function") {
    createRenderEffect(() => {
      let v2 = value();
      while (typeof v2 === "function")
        v2 = v2();
      current = insertExpression(parent, v2, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (hydrating) {
      if (!array.length)
        return current;
      if (marker === undefined)
        return current = [...parent.childNodes];
      let node = array[0];
      if (node.parentNode !== parent)
        return current;
      const nodes = [node];
      while ((node = node.nextSibling) !== marker)
        nodes.push(node);
      return current = nodes;
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi)
        return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else
        reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value.nodeType) {
    if (hydrating && value.parentNode)
      return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi)
        return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else
      parent.replaceChild(value, parent.firstChild);
    current = value;
  } else
    ;
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
  let dynamic = false;
  for (let i = 0, len = array.length;i < len; i++) {
    let item = array[i], prev = current && current[normalized.length], t2;
    if (item == null || item === true || item === false)
      ;
    else if ((t2 = typeof item) === "object" && item.nodeType) {
      normalized.push(item);
    } else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (t2 === "function") {
      if (unwrap) {
        while (typeof item === "function")
          item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value)
        normalized.push(prev);
      else
        normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i = 0, len = array.length;i < len; i++)
    parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === undefined)
    return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i = current.length - 1;i >= 0; i--) {
      const el = current[i];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i)
          isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else
          isParent && el.remove();
      } else
        inserted = true;
    }
  } else
    parent.insertBefore(node, marker);
  return [node];
}
function getHydrationKey() {
  return sharedConfig.getNextContextId();
}
function createElement2(tagName, isSVG = false) {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}
function Portal(props) {
  const {
    useShadow
  } = props, marker = document.createTextNode(""), mount = () => props.mount || document.body, owner = getOwner();
  let content;
  let hydrating = !!sharedConfig.context;
  createEffect(() => {
    if (hydrating)
      getOwner().user = hydrating = false;
    content || (content = runWithOwner(owner, () => createMemo(() => props.children)));
    const el = mount();
    if (el instanceof HTMLHeadElement) {
      const [clean, setClean] = createSignal(false);
      const cleanup = () => setClean(true);
      createRoot((dispose2) => insert(el, () => !clean() ? content() : dispose2(), null));
      onCleanup(cleanup);
    } else {
      const container = createElement2(props.isSVG ? "g" : "div", props.isSVG), renderRoot = useShadow && container.attachShadow ? container.attachShadow({
        mode: "open"
      }) : container;
      Object.defineProperty(container, "_$host", {
        get() {
          return marker.parentNode;
        },
        configurable: true
      });
      insert(renderRoot, content);
      el.appendChild(container);
      props.ref && props.ref(container);
      onCleanup(() => el.removeChild(container));
    }
  }, undefined, {
    render: !hydrating
  });
  return marker;
}
function createDynamic(component, props) {
  const cached = createMemo(component);
  return createMemo(() => {
    const component2 = cached();
    switch (typeof component2) {
      case "function":
        return untrack(() => component2(props));
      case "string":
        const isSvg = SVGElements.has(component2);
        const el = sharedConfig.context ? getNextElement() : createElement2(component2, isSvg);
        spread(el, props, isSvg);
        return el;
    }
  });
}
function Dynamic(props) {
  const [, others] = splitProps(props, ["component"]);
  return createDynamic(() => props.component, others);
}
function valuesOfObj(record) {
  if ("values" in Object) {
    return Object.values(record);
  }
  const values = [];
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      values.push(record[key]);
    }
  }
  return values;
}
function find(record, predicate) {
  const values = valuesOfObj(record);
  if ("find" in values) {
    return values.find(predicate);
  }
  const valuesNotNever = values;
  for (let i = 0;i < valuesNotNever.length; i++) {
    const value = valuesNotNever[i];
    if (predicate(value)) {
      return value;
    }
  }
  return;
}
function forEach(record, run) {
  Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
  for (let i = 0;i < record.length; i++) {
    const value = record[i];
    if (predicate(value)) {
      return value;
    }
  }
  return;
}
function simpleTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
function compositeTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
function isInstanceOfRegisteredClass(potentialClass, superJson) {
  if (potentialClass?.constructor) {
    const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
    return isRegistered;
  }
  return false;
}
function validatePath(path) {
  if (includes(path, "__proto__")) {
    throw new Error("__proto__ is not allowed as a property");
  }
  if (includes(path, "prototype")) {
    throw new Error("prototype is not allowed as a property");
  }
  if (includes(path, "constructor")) {
    throw new Error("constructor is not allowed as a property");
  }
}
function traverse(tree, walker2, origin = []) {
  if (!tree) {
    return;
  }
  if (!isArray(tree)) {
    forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
    return;
  }
  const [nodeValue, children2] = tree;
  if (children2) {
    forEach(children2, (child, key) => {
      traverse(child, walker2, [...origin, ...parsePath(key)]);
    });
  }
  walker2(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
  traverse(annotations, (type, path) => {
    plain = setDeep(plain, path, (v2) => untransformValue(v2, type, superJson));
  });
  return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
  function apply(identicalPaths, path) {
    const object = getDeep(plain, parsePath(path));
    identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
      plain = setDeep(plain, identicalObjectPath, () => object);
    });
  }
  if (isArray(annotations)) {
    const [root, other] = annotations;
    root.forEach((identicalPath) => {
      plain = setDeep(plain, parsePath(identicalPath), () => plain);
    });
    if (other) {
      forEach(other, apply);
    }
  } else {
    forEach(annotations, apply);
  }
  return plain;
}
function addIdentity(object, path, identities) {
  const existingSet = identities.get(object);
  if (existingSet) {
    existingSet.push(path);
  } else {
    identities.set(object, [path]);
  }
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
  const result = {};
  let rootEqualityPaths = undefined;
  identitites.forEach((paths) => {
    if (paths.length <= 1) {
      return;
    }
    if (!dedupe) {
      paths = paths.map((path) => path.map(String)).sort((a, b2) => a.length - b2.length);
    }
    const [representativePath, ...identicalPaths] = paths;
    if (representativePath.length === 0) {
      rootEqualityPaths = identicalPaths.map(stringifyPath);
    } else {
      result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
    }
  });
  if (rootEqualityPaths) {
    if (isEmptyObject(result)) {
      return [rootEqualityPaths];
    } else {
      return [rootEqualityPaths, result];
    }
  } else {
    return isEmptyObject(result) ? undefined : result;
  }
}
function getType2(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
function isArray2(payload) {
  return getType2(payload) === "Array";
}
function isPlainObject22(payload) {
  if (getType2(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function assignProp2(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target, options = {}) {
  if (isArray2(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!isPlainObject22(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if (isArray2(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp2(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}
function getQueryStatusLabel(query) {
  return query.state.fetchStatus === "fetching" ? "fetching" : !query.getObserversCount() ? "inactive" : query.state.fetchStatus === "paused" ? "paused" : query.isStale() ? "stale" : "fresh";
}
function getSidedProp(prop, side) {
  return `${prop}${side.charAt(0).toUpperCase() + side.slice(1)}`;
}
function getQueryStatusColor({
  queryState,
  observerCount,
  isStale
}) {
  return queryState.fetchStatus === "fetching" ? "blue" : !observerCount ? "gray" : queryState.fetchStatus === "paused" ? "purple" : isStale ? "yellow" : "green";
}
function getMutationStatusColor({
  status,
  isPaused
}) {
  return isPaused ? "purple" : status === "error" ? "red" : status === "pending" ? "yellow" : status === "success" ? "green" : "gray";
}
function getQueryStatusColorByLabel(label) {
  return label === "fresh" ? "green" : label === "stale" ? "yellow" : label === "paused" ? "purple" : label === "inactive" ? "gray" : "blue";
}
var sharedConfig, IS_DEV = false, equalFn = (a, b2) => a === b2, $PROXY, SUPPORTS_PROXY, $TRACK, signalOptions, ERROR = null, runEffects, STALE = 1, PENDING = 2, UNOWNED, NO_INIT, Owner = null, Transition = null, Scheduler = null, ExternalSourceConfig = null, Listener = null, Updates = null, Effects = null, ExecCount = 0, transPending, setTransPending, SuspenseContext, FALLBACK, hydrationEnabled = false, propTraps, counter = 0, narrowedError = (name) => `Stale read from <${name}>.`, DEV = undefined, booleans, Properties, ChildProperties, Aliases, PropAliases, DelegatedEvents, SVGElements, SVGNamespace, memo2 = (fn) => createMemo(() => fn()), $$EVENTS = "_$DX_DELEGATE", isServer2 = false, SVG_NAMESPACE = "http://www.w3.org/2000/svg", DoubleIndexedKV = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map;
    this.valueToKey = /* @__PURE__ */ new Map;
  }
  set(key, value) {
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }
  getByKey(key) {
    return this.keyToValue.get(key);
  }
  getByValue(value) {
    return this.valueToKey.get(value);
  }
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
}, Registry = class {
  constructor(generateIdentifier) {
    this.generateIdentifier = generateIdentifier;
    this.kv = new DoubleIndexedKV;
  }
  register(value, identifier) {
    if (this.kv.getByValue(value)) {
      return;
    }
    if (!identifier) {
      identifier = this.generateIdentifier(value);
    }
    this.kv.set(identifier, value);
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(value) {
    return this.kv.getByValue(value);
  }
  getValue(identifier) {
    return this.kv.getByKey(identifier);
  }
}, ClassRegistry, CustomTransformerRegistry = class {
  constructor() {
    this.transfomers = {};
  }
  register(transformer) {
    this.transfomers[transformer.name] = transformer;
  }
  findApplicable(v2) {
    return find(this.transfomers, (transformer) => transformer.isApplicable(v2));
  }
  findByName(name) {
    return this.transfomers[name];
  }
}, getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1), isUndefined = (payload) => typeof payload === "undefined", isNull = (payload) => payload === null, isPlainObject2 = (payload) => {
  if (typeof payload !== "object" || payload === null)
    return false;
  if (payload === Object.prototype)
    return false;
  if (Object.getPrototypeOf(payload) === null)
    return true;
  return Object.getPrototypeOf(payload) === Object.prototype;
}, isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0, isArray = (payload) => Array.isArray(payload), isString = (payload) => typeof payload === "string", isNumber = (payload) => typeof payload === "number" && !isNaN(payload), isBoolean = (payload) => typeof payload === "boolean", isRegExp = (payload) => payload instanceof RegExp, isMap = (payload) => payload instanceof Map, isSet = (payload) => payload instanceof Set, isSymbol = (payload) => getType(payload) === "Symbol", isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf()), isError = (payload) => payload instanceof Error, isNaNValue = (payload) => typeof payload === "number" && isNaN(payload), isPrimitive = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload), isBigint = (payload) => typeof payload === "bigint", isInfinite = (payload) => payload === Infinity || payload === -Infinity, isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView), isURL = (payload) => payload instanceof URL, escapeKey = (key) => key.replace(/\./g, "\\."), stringifyPath = (path) => path.map(String).map(escapeKey).join("."), parsePath = (string) => {
  const result = [];
  let segment = "";
  for (let i = 0;i < string.length; i++) {
    let char = string.charAt(i);
    const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
    if (isEscapedDot) {
      segment += ".";
      i++;
      continue;
    }
    const isEndOfSegment = char === ".";
    if (isEndOfSegment) {
      result.push(segment);
      segment = "";
      continue;
    }
    segment += char;
  }
  const lastSegment = segment;
  result.push(lastSegment);
  return result;
}, simpleRules, symbolRule, constructorToName, typedArrayRule, classRule, customRule, compositeRules, transformValue = (value, superJson) => {
  const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableCompositeRule) {
    return {
      value: applicableCompositeRule.transform(value, superJson),
      type: applicableCompositeRule.annotation(value, superJson)
    };
  }
  const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableSimpleRule) {
    return {
      value: applicableSimpleRule.transform(value, superJson),
      type: applicableSimpleRule.annotation
    };
  }
  return;
}, simpleRulesByAnnotation, untransformValue = (json, type, superJson) => {
  if (isArray(type)) {
    switch (type[0]) {
      case "symbol":
        return symbolRule.untransform(json, type, superJson);
      case "class":
        return classRule.untransform(json, type, superJson);
      case "custom":
        return customRule.untransform(json, type, superJson);
      case "typed-array":
        return typedArrayRule.untransform(json, type, superJson);
      default:
        throw new Error("Unknown transformation: " + type);
    }
  } else {
    const transformation = simpleRulesByAnnotation[type];
    if (!transformation) {
      throw new Error("Unknown transformation: " + type);
    }
    return transformation.untransform(json, superJson);
  }
}, getNthKey = (value, n) => {
  if (n > value.size)
    throw new Error("index out of bounds");
  const keys = value.keys();
  while (n > 0) {
    keys.next();
    n--;
  }
  return keys.next().value;
}, getDeep = (object, path) => {
  validatePath(path);
  for (let i = 0;i < path.length; i++) {
    const key = path[i];
    if (isSet(object)) {
      object = getNthKey(object, +key);
    } else if (isMap(object)) {
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(object, row);
      switch (type) {
        case "key":
          object = keyOfRow;
          break;
        case "value":
          object = object.get(keyOfRow);
          break;
      }
    } else {
      object = object[key];
    }
  }
  return object;
}, setDeep = (object, path, mapper) => {
  validatePath(path);
  if (path.length === 0) {
    return mapper(object);
  }
  let parent = object;
  for (let i = 0;i < path.length - 1; i++) {
    const key = path[i];
    if (isArray(parent)) {
      const index = +key;
      parent = parent[index];
    } else if (isPlainObject2(parent)) {
      parent = parent[key];
    } else if (isSet(parent)) {
      const row = +key;
      parent = getNthKey(parent, row);
    } else if (isMap(parent)) {
      const isEnd = i === path.length - 2;
      if (isEnd) {
        break;
      }
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(parent, row);
      switch (type) {
        case "key":
          parent = keyOfRow;
          break;
        case "value":
          parent = parent.get(keyOfRow);
          break;
      }
    }
  }
  const lastKey = path[path.length - 1];
  if (isArray(parent)) {
    parent[+lastKey] = mapper(parent[+lastKey]);
  } else if (isPlainObject2(parent)) {
    parent[lastKey] = mapper(parent[lastKey]);
  }
  if (isSet(parent)) {
    const oldValue = getNthKey(parent, +lastKey);
    const newValue = mapper(oldValue);
    if (oldValue !== newValue) {
      parent.delete(oldValue);
      parent.add(newValue);
    }
  }
  if (isMap(parent)) {
    const row = +path[path.length - 2];
    const keyToRow = getNthKey(parent, row);
    const type = +lastKey === 0 ? "key" : "value";
    switch (type) {
      case "key": {
        const newKey = mapper(keyToRow);
        parent.set(newKey, parent.get(keyToRow));
        if (newKey !== keyToRow) {
          parent.delete(keyToRow);
        }
        break;
      }
      case "value": {
        parent.set(keyToRow, mapper(parent.get(keyToRow)));
        break;
      }
    }
  }
  return object;
}, isDeep = (object, superJson) => isPlainObject2(object) || isArray(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson), walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map) => {
  const primitive = isPrimitive(object);
  if (!primitive) {
    addIdentity(object, path, identities);
    const seen = seenObjects.get(object);
    if (seen) {
      return dedupe ? {
        transformedValue: null
      } : seen;
    }
  }
  if (!isDeep(object, superJson)) {
    const transformed2 = transformValue(object, superJson);
    const result2 = transformed2 ? {
      transformedValue: transformed2.value,
      annotations: [transformed2.type]
    } : {
      transformedValue: object
    };
    if (!primitive) {
      seenObjects.set(object, result2);
    }
    return result2;
  }
  if (includes(objectsInThisPath, object)) {
    return {
      transformedValue: null
    };
  }
  const transformationResult = transformValue(object, superJson);
  const transformed = transformationResult?.value ?? object;
  const transformedValue = isArray(transformed) ? [] : {};
  const innerAnnotations = {};
  forEach(transformed, (value, index) => {
    if (index === "__proto__" || index === "constructor" || index === "prototype") {
      throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
    }
    const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
    transformedValue[index] = recursiveResult.transformedValue;
    if (isArray(recursiveResult.annotations)) {
      innerAnnotations[index] = recursiveResult.annotations;
    } else if (isPlainObject2(recursiveResult.annotations)) {
      forEach(recursiveResult.annotations, (tree, key) => {
        innerAnnotations[escapeKey(index) + "." + key] = tree;
      });
    }
  });
  const result = isEmptyObject(innerAnnotations) ? {
    transformedValue,
    annotations: transformationResult ? [transformationResult.type] : undefined
  } : {
    transformedValue,
    annotations: transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
  };
  if (!primitive) {
    seenObjects.set(object, result);
  }
  return result;
}, SuperJSON = class {
  constructor({ dedupe = false } = {}) {
    this.classRegistry = new ClassRegistry;
    this.symbolRegistry = new Registry((s) => s.description ?? "");
    this.customTransformerRegistry = new CustomTransformerRegistry;
    this.allowedErrorProps = [];
    this.dedupe = dedupe;
  }
  serialize(object) {
    const identities = /* @__PURE__ */ new Map;
    const output = walker(object, identities, this, this.dedupe);
    const res = {
      json: output.transformedValue
    };
    if (output.annotations) {
      res.meta = {
        ...res.meta,
        values: output.annotations
      };
    }
    const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
    if (equalityAnnotations) {
      res.meta = {
        ...res.meta,
        referentialEqualities: equalityAnnotations
      };
    }
    return res;
  }
  deserialize(payload) {
    const { json, meta } = payload;
    let result = copy(json);
    if (meta?.values) {
      result = applyValueAnnotations(result, meta.values, this);
    }
    if (meta?.referentialEqualities) {
      result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
    }
    return result;
  }
  stringify(object) {
    return JSON.stringify(this.serialize(object));
  }
  parse(string) {
    return this.deserialize(JSON.parse(string));
  }
  registerClass(v2, options) {
    this.classRegistry.register(v2, options);
  }
  registerSymbol(v2, identifier) {
    this.symbolRegistry.register(v2, identifier);
  }
  registerCustom(transformer, name) {
    this.customTransformerRegistry.register({
      name,
      ...transformer
    });
  }
  allowErrorProps(...props) {
    this.allowedErrorProps.push(...props);
  }
}, serialize, stringify, displayValue = (value, beautify = false) => {
  const {
    json
  } = serialize(value);
  return JSON.stringify(json, null, beautify ? 2 : undefined);
}, getStatusRank = (q) => q.state.fetchStatus !== "idle" ? 0 : !q.getObserversCount() ? 3 : q.isStale() ? 2 : 1, queryHashSort = (a, b2) => a.queryHash.localeCompare(b2.queryHash), dateSort = (a, b2) => a.state.dataUpdatedAt < b2.state.dataUpdatedAt ? 1 : -1, statusAndDateSort = (a, b2) => {
  if (getStatusRank(a) === getStatusRank(b2)) {
    return dateSort(a, b2);
  }
  return getStatusRank(a) > getStatusRank(b2) ? 1 : -1;
}, sortFns, getMutationStatusRank = (m) => m.state.isPaused ? 0 : m.state.status === "error" ? 2 : m.state.status === "pending" ? 1 : 3, mutationDateSort = (a, b2) => a.state.submittedAt < b2.state.submittedAt ? 1 : -1, mutationStatusSort = (a, b2) => {
  if (getMutationStatusRank(a) === getMutationStatusRank(b2)) {
    return mutationDateSort(a, b2);
  }
  return getMutationStatusRank(a) > getMutationStatusRank(b2) ? 1 : -1;
}, mutationSortFns, convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}, getPreferredColorScheme = () => {
  const [colorScheme, setColorScheme] = createSignal("dark");
  onMount(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(query.matches ? "dark" : "light");
    const listener = (e) => {
      setColorScheme(e.matches ? "dark" : "light");
    };
    query.addEventListener("change", listener);
    onCleanup(() => query.removeEventListener("change", listener));
  });
  return colorScheme;
}, updateNestedDataByPath = (oldData, updatePath, value) => {
  if (updatePath.length === 0) {
    return value;
  }
  if (oldData instanceof Map) {
    const newData = new Map(oldData);
    if (updatePath.length === 1) {
      newData.set(updatePath[0], value);
      return newData;
    }
    const [head, ...tail] = updatePath;
    newData.set(head, updateNestedDataByPath(newData.get(head), tail, value));
    return newData;
  }
  if (oldData instanceof Set) {
    const setAsArray = updateNestedDataByPath(Array.from(oldData), updatePath, value);
    return new Set(setAsArray);
  }
  if (Array.isArray(oldData)) {
    const newData = [...oldData];
    if (updatePath.length === 1) {
      newData[updatePath[0]] = value;
      return newData;
    }
    const [head, ...tail] = updatePath;
    newData[head] = updateNestedDataByPath(newData[head], tail, value);
    return newData;
  }
  if (oldData instanceof Object) {
    const newData = {
      ...oldData
    };
    if (updatePath.length === 1) {
      newData[updatePath[0]] = value;
      return newData;
    }
    const [head, ...tail] = updatePath;
    newData[head] = updateNestedDataByPath(newData[head], tail, value);
    return newData;
  }
  return oldData;
}, deleteNestedDataByPath = (oldData, deletePath) => {
  if (oldData instanceof Map) {
    const newData = new Map(oldData);
    if (deletePath.length === 1) {
      newData.delete(deletePath[0]);
      return newData;
    }
    const [head, ...tail] = deletePath;
    newData.set(head, deleteNestedDataByPath(newData.get(head), tail));
    return newData;
  }
  if (oldData instanceof Set) {
    const setAsArray = deleteNestedDataByPath(Array.from(oldData), deletePath);
    return new Set(setAsArray);
  }
  if (Array.isArray(oldData)) {
    const newData = [...oldData];
    if (deletePath.length === 1) {
      return newData.filter((_2, idx) => idx.toString() !== deletePath[0]);
    }
    const [head, ...tail] = deletePath;
    newData[head] = deleteNestedDataByPath(newData[head], tail);
    return newData;
  }
  if (oldData instanceof Object) {
    const newData = {
      ...oldData
    };
    if (deletePath.length === 1) {
      delete newData[deletePath[0]];
      return newData;
    }
    const [head, ...tail] = deletePath;
    newData[head] = deleteNestedDataByPath(newData[head], tail);
    return newData;
  }
  return oldData;
}, setupStyleSheet = (nonce, target) => {
  if (!nonce)
    return;
  const styleExists = document.querySelector("#_goober") || target?.querySelector("#_goober");
  if (styleExists)
    return;
  const styleTag = document.createElement("style");
  const textNode = document.createTextNode("");
  styleTag.appendChild(textNode);
  styleTag.id = "_goober";
  styleTag.setAttribute("nonce", nonce);
  if (target) {
    target.appendChild(styleTag);
  } else {
    document.head.appendChild(styleTag);
  }
};
var init_6FXOYLZD = __esm(() => {
  sharedConfig = {
    context: undefined,
    registry: undefined,
    effects: undefined,
    done: false,
    getContextId() {
      return getContextId(this.context.count);
    },
    getNextContextId() {
      return getContextId(this.context.count++);
    }
  };
  $PROXY = /* @__PURE__ */ Symbol("solid-proxy");
  SUPPORTS_PROXY = typeof Proxy === "function";
  $TRACK = /* @__PURE__ */ Symbol("solid-track");
  signalOptions = {
    equals: equalFn
  };
  runEffects = runQueue;
  UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
  NO_INIT = {};
  [transPending, setTransPending] = /* @__PURE__ */ createSignal(false);
  FALLBACK = /* @__PURE__ */ Symbol("fallback");
  propTraps = {
    get(_2, property, receiver) {
      if (property === $PROXY)
        return receiver;
      return _2.get(property);
    },
    has(_2, property) {
      if (property === $PROXY)
        return true;
      return _2.has(property);
    },
    set: trueFn,
    deleteProperty: trueFn,
    getOwnPropertyDescriptor(_2, property) {
      return {
        configurable: true,
        enumerable: true,
        get() {
          return _2.get(property);
        },
        set: trueFn,
        deleteProperty: trueFn
      };
    },
    ownKeys(_2) {
      return _2.keys();
    }
  };
  booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
  Properties = /* @__PURE__ */ new Set(["className", "value", "readOnly", "noValidate", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
  ChildProperties = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]);
  Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
    className: "class",
    htmlFor: "for"
  });
  PropAliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
    class: "className",
    novalidate: {
      $: "noValidate",
      FORM: 1
    },
    formnovalidate: {
      $: "formNoValidate",
      BUTTON: 1,
      INPUT: 1
    },
    ismap: {
      $: "isMap",
      IMG: 1
    },
    nomodule: {
      $: "noModule",
      SCRIPT: 1
    },
    playsinline: {
      $: "playsInline",
      VIDEO: 1
    },
    readonly: {
      $: "readOnly",
      INPUT: 1,
      TEXTAREA: 1
    }
  });
  DelegatedEvents = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
  SVGElements = /* @__PURE__ */ new Set([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern"
  ]);
  SVGNamespace = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
  };
  ClassRegistry = class extends Registry {
    constructor() {
      super((c) => c.name);
      this.classToAllowedProps = /* @__PURE__ */ new Map;
    }
    register(value, options) {
      if (typeof options === "object") {
        if (options.allowProps) {
          this.classToAllowedProps.set(value, options.allowProps);
        }
        super.register(value, options.identifier);
      } else {
        super.register(value, options);
      }
    }
    getAllowedProps(value) {
      return this.classToAllowedProps.get(value);
    }
  };
  simpleRules = [
    simpleTransformation(isUndefined, "undefined", () => null, () => {
      return;
    }),
    simpleTransformation(isBigint, "bigint", (v2) => v2.toString(), (v2) => {
      if (typeof BigInt !== "undefined") {
        return BigInt(v2);
      }
      console.error("Please add a BigInt polyfill.");
      return v2;
    }),
    simpleTransformation(isDate, "Date", (v2) => v2.toISOString(), (v2) => new Date(v2)),
    simpleTransformation(isError, "Error", (v2, superJson) => {
      const baseError = {
        name: v2.name,
        message: v2.message
      };
      superJson.allowedErrorProps.forEach((prop) => {
        baseError[prop] = v2[prop];
      });
      return baseError;
    }, (v2, superJson) => {
      const e = new Error(v2.message);
      e.name = v2.name;
      e.stack = v2.stack;
      superJson.allowedErrorProps.forEach((prop) => {
        e[prop] = v2[prop];
      });
      return e;
    }),
    simpleTransformation(isRegExp, "regexp", (v2) => "" + v2, (regex) => {
      const body = regex.slice(1, regex.lastIndexOf("/"));
      const flags = regex.slice(regex.lastIndexOf("/") + 1);
      return new RegExp(body, flags);
    }),
    simpleTransformation(isSet, "set", (v2) => [...v2.values()], (v2) => new Set(v2)),
    simpleTransformation(isMap, "map", (v2) => [...v2.entries()], (v2) => new Map(v2)),
    simpleTransformation((v2) => isNaNValue(v2) || isInfinite(v2), "number", (v2) => {
      if (isNaNValue(v2)) {
        return "NaN";
      }
      if (v2 > 0) {
        return "Infinity";
      } else {
        return "-Infinity";
      }
    }, Number),
    simpleTransformation((v2) => v2 === 0 && 1 / v2 === -Infinity, "number", () => {
      return "-0";
    }, Number),
    simpleTransformation(isURL, "URL", (v2) => v2.toString(), (v2) => new URL(v2))
  ];
  symbolRule = compositeTransformation((s, superJson) => {
    if (isSymbol(s)) {
      const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
      return isRegistered;
    }
    return false;
  }, (s, superJson) => {
    const identifier = superJson.symbolRegistry.getIdentifier(s);
    return ["symbol", identifier];
  }, (v2) => v2.description, (_2, a, superJson) => {
    const value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
      throw new Error("Trying to deserialize unknown symbol");
    }
    return value;
  });
  constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray
  ].reduce((obj, ctor) => {
    obj[ctor.name] = ctor;
    return obj;
  }, {});
  typedArrayRule = compositeTransformation(isTypedArray, (v2) => ["typed-array", v2.constructor.name], (v2) => [...v2], (v2, a) => {
    const ctor = constructorToName[a[1]];
    if (!ctor) {
      throw new Error("Trying to deserialize unknown typed array");
    }
    return new ctor(v2);
  });
  classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
    const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ["class", identifier];
  }, (clazz, superJson) => {
    const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
      return { ...clazz };
    }
    const result = {};
    allowedProps.forEach((prop) => {
      result[prop] = clazz[prop];
    });
    return result;
  }, (v2, a, superJson) => {
    const clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
      throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
    }
    return Object.assign(Object.create(clazz.prototype), v2);
  });
  customRule = compositeTransformation((value, superJson) => {
    return !!superJson.customTransformerRegistry.findApplicable(value);
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ["custom", transformer.name];
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
  }, (v2, a, superJson) => {
    const transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
      throw new Error("Trying to deserialize unknown custom value");
    }
    return transformer.deserialize(v2);
  });
  compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
  simpleRulesByAnnotation = {};
  simpleRules.forEach((rule) => {
    simpleRulesByAnnotation[rule.annotation] = rule;
  });
  SuperJSON.defaultInstance = new SuperJSON;
  SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
  SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
  SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
  SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
  SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
  SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
  SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
  SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
  serialize = SuperJSON.serialize;
  SuperJSON.deserialize;
  stringify = SuperJSON.stringify;
  SuperJSON.parse;
  SuperJSON.registerClass;
  SuperJSON.registerCustom;
  SuperJSON.registerSymbol;
  SuperJSON.allowErrorProps;
  sortFns = {
    status: statusAndDateSort,
    "query hash": queryHashSort,
    "last updated": dateSort
  };
  mutationSortFns = {
    status: mutationStatusSort,
    "last updated": mutationDateSort
  };
});

// ../../node_modules/.bun/@tanstack+query-devtools@5.93.0/node_modules/@tanstack/query-devtools/build/chunk/HNLWDMU5.js
function chain(callbacks) {
  return (...args) => {
    for (const callback of callbacks)
      callback && callback(...args);
  };
}
function accessWith(valueOrFn, ...args) {
  return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
}
function handleDiffArray(current, prev, handleAdded, handleRemoved) {
  const currLength = current.length;
  const prevLength = prev.length;
  let i2 = 0;
  if (!prevLength) {
    for (;i2 < currLength; i2++)
      handleAdded(current[i2]);
    return;
  }
  if (!currLength) {
    for (;i2 < prevLength; i2++)
      handleRemoved(prev[i2]);
    return;
  }
  for (;i2 < prevLength; i2++) {
    if (prev[i2] !== current[i2])
      break;
  }
  let prevEl;
  let currEl;
  prev = prev.slice(i2);
  current = current.slice(i2);
  for (prevEl of prev) {
    if (!current.includes(prevEl))
      handleRemoved(prevEl);
  }
  for (currEl of current) {
    if (!prev.includes(currEl))
      handleAdded(currEl);
  }
}
function createStorage(props) {
  const [error, setError] = createSignal();
  const handleError2 = props?.throw ? (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
    throw err;
  } : (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
  };
  const apis = props?.api ? Array.isArray(props.api) ? props.api : [props.api] : [globalThis.localStorage].filter(Boolean);
  const prefix = props?.prefix ? `${props.prefix}.` : "";
  const signals = /* @__PURE__ */ new Map;
  const store = new Proxy({}, {
    get(_2, key) {
      let node = signals.get(key);
      if (!node) {
        node = createSignal(undefined, { equals: false });
        signals.set(key, node);
      }
      node[0]();
      const value = apis.reduce((result, api) => {
        if (result !== null || !api) {
          return result;
        }
        try {
          return api.getItem(`${prefix}${key}`);
        } catch (err) {
          handleError2(err, `Error reading ${prefix}${key} from ${api["name"]}`);
          return null;
        }
      }, null);
      if (value !== null && props?.deserializer) {
        return props.deserializer(value, key, props.options);
      }
      return value;
    }
  });
  const setter = (key, value, options) => {
    const filteredValue = props?.serializer ? props.serializer(value, key, options ?? props.options) : value;
    const apiKey = `${prefix}${key}`;
    apis.forEach((api) => {
      try {
        api.getItem(apiKey) !== filteredValue && api.setItem(apiKey, filteredValue);
      } catch (err) {
        handleError2(err, `Error setting ${prefix}${key} to ${filteredValue} in ${api.name}`);
      }
    });
    const node = signals.get(key);
    node && node[1]();
  };
  const remove = (key) => apis.forEach((api) => {
    try {
      api.removeItem(`${prefix}${key}`);
    } catch (err) {
      handleError2(err, `Error removing ${prefix}${key} from ${api.name}`);
    }
  });
  const clear = () => apis.forEach((api) => {
    try {
      api.clear();
    } catch (err) {
      handleError2(err, `Error clearing ${api.name}`);
    }
  });
  const toJSON = () => {
    const result = {};
    const addValue = (key, value) => {
      if (!result.hasOwnProperty(key)) {
        const filteredValue = value && props?.deserializer ? props.deserializer(value, key, props.options) : value;
        if (filteredValue) {
          result[key] = filteredValue;
        }
      }
    };
    apis.forEach((api) => {
      if (typeof api.getAll === "function") {
        let values;
        try {
          values = api.getAll();
        } catch (err) {
          handleError2(err, `Error getting all values from in ${api.name}`);
        }
        for (const key of values) {
          addValue(key, values[key]);
        }
      } else {
        let index = 0, key;
        try {
          while (key = api.key(index++)) {
            if (!result.hasOwnProperty(key)) {
              addValue(key, api.getItem(key));
            }
          }
        } catch (err) {
          handleError2(err, `Error getting all values from ${api.name}`);
        }
      }
    });
    return result;
  };
  props?.sync !== false && onMount(() => {
    const listener = (ev) => {
      let changed = false;
      apis.forEach((api) => {
        try {
          if (api !== ev.storageArea && ev.key && ev.newValue !== api.getItem(ev.key)) {
            ev.newValue ? api.setItem(ev.key, ev.newValue) : api.removeItem(ev.key);
            changed = true;
          }
        } catch (err) {
          handleError2(err, `Error synching api ${api.name} from storage event (${ev.key}=${ev.newValue})`);
        }
      });
      changed && ev.key && signals.get(ev.key)?.[1]();
    };
    if ("addEventListener" in globalThis) {
      globalThis.addEventListener("storage", listener);
      onCleanup(() => globalThis.removeEventListener("storage", listener));
    } else {
      apis.forEach((api) => api.addEventListener?.("storage", listener));
      onCleanup(() => apis.forEach((api) => api.removeEventListener?.("storage", listener)));
    }
  });
  return [
    store,
    setter,
    {
      clear,
      error,
      remove,
      toJSON
    }
  ];
}
function useQueryDevtoolsContext() {
  return useContext4(QueryDevtoolsContext);
}
function useTheme() {
  return useContext4(ThemeContext);
}
function removeAccents(str) {
  return str.replace(allAccents, (match) => {
    return characterMap[match];
  });
}
function rankItem(item, value, options) {
  var _options$threshold;
  options = options || {};
  options.threshold = (_options$threshold = options.threshold) != null ? _options$threshold : rankings.MATCHES;
  if (!options.accessors) {
    const rank = getMatchRanking(item, value, options);
    return {
      rankedValue: item,
      rank,
      accessorIndex: -1,
      accessorThreshold: options.threshold,
      passed: rank >= options.threshold
    };
  }
  const valuesToRank = getAllValuesToRank(item, options.accessors);
  const rankingInfo = {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    accessorIndex: -1,
    accessorThreshold: options.threshold,
    passed: false
  };
  for (let i2 = 0;i2 < valuesToRank.length; i2++) {
    const rankValue = valuesToRank[i2];
    let newRank = getMatchRanking(rankValue.itemValue, value, options);
    const {
      minRanking,
      maxRanking,
      threshold = options.threshold
    } = rankValue.attributes;
    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }
    newRank = Math.min(newRank, maxRanking);
    if (newRank >= threshold && newRank > rankingInfo.rank) {
      rankingInfo.rank = newRank;
      rankingInfo.passed = true;
      rankingInfo.accessorIndex = i2;
      rankingInfo.accessorThreshold = threshold;
      rankingInfo.rankedValue = rankValue.itemValue;
    }
  }
  return rankingInfo;
}
function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options);
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();
  if (testString === stringToRank) {
    return rankings.EQUAL;
  }
  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  }
  if (testString.includes(` ${stringToRank}`)) {
    return rankings.WORD_STARTS_WITH;
  }
  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    return rankings.NO_MATCH;
  }
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }
  return getClosenessRanking(testString, stringToRank);
}
function getAcronym(string) {
  let acronym = "";
  const wordsInString = string.split(" ");
  wordsInString.forEach((wordInString) => {
    const splitByHyphenWords = wordInString.split("-");
    splitByHyphenWords.forEach((splitByHyphenWord) => {
      acronym += splitByHyphenWord.substr(0, 1);
    });
  });
  return acronym;
}
function getClosenessRanking(testString, stringToRank) {
  let matchingInOrderCharCount = 0;
  let charNumber = 0;
  function findMatchingCharacter(matchChar, string, index) {
    for (let j = index, J2 = string.length;j < J2; j++) {
      const stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread3) {
    const spreadPercentage = 1 / spread3;
    const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }
  const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (let i2 = 1, I2 = stringToRank.length;i2 < I2; i2++) {
    const matchChar = stringToRank[i2];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    const found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }
  const spread2 = charNumber - firstIndex;
  return getRanking(spread2);
}
function prepareValueForComparison(value, _ref) {
  let {
    keepDiacritics
  } = _ref;
  value = `${value}`;
  if (!keepDiacritics) {
    value = removeAccents(value);
  }
  return value;
}
function getItemValues(item, accessor) {
  let accessorFn = accessor;
  if (typeof accessor === "object") {
    accessorFn = accessor.accessor;
  }
  const value = accessorFn(item);
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [String(value)];
}
function getAllValuesToRank(item, accessors) {
  const allValues = [];
  for (let j = 0, J2 = accessors.length;j < J2; j++) {
    const accessor = accessors[j];
    const attributes = getAccessorAttributes(accessor);
    const itemValues = getItemValues(item, accessor);
    for (let i2 = 0, I2 = itemValues.length;i2 < I2; i2++) {
      allValues.push({
        itemValue: itemValues[i2],
        attributes
      });
    }
  }
  return allValues;
}
function getAccessorAttributes(accessor) {
  if (typeof accessor === "function") {
    return defaultKeyAttributes;
  }
  return {
    ...defaultKeyAttributes,
    ...accessor
  };
}
function u(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t22) => Object.assign(e3, t22 && t22.call ? t22(r2.p) : t22), {}) : l2, t2(r2.target), r2.g, r2.o, r2.k);
}
function r(e2) {
  var t22, f, n2 = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    n2 += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2)) {
      var o22 = e2.length;
      for (t22 = 0;t22 < o22; t22++)
        e2[t22] && (f = r(e2[t22])) && (n2 && (n2 += " "), n2 += f);
    } else
      for (f in e2)
        e2[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e2, t22, f = 0, n2 = "", o22 = arguments.length;f < o22; f++)
    (e2 = arguments[f]) && (t22 = r(e2)) && (n2 && (n2 += " "), n2 += t22);
  return n2;
}
function createListTransition(source, options) {
  const initSource = untrack(source);
  if (isServer2) {
    const copy2 = initSource.slice();
    return () => copy2;
  }
  const { onChange } = options;
  let prevSet = new Set(options.appear ? undefined : initSource);
  const exiting = /* @__PURE__ */ new WeakSet;
  const [toRemove, setToRemove] = createSignal([], { equals: false });
  const [isTransitionPending] = useTransition();
  const finishRemoved = (els) => {
    setToRemove((p2) => (p2.push.apply(p2, els), p2));
    for (const el of els)
      exiting.delete(el);
  };
  const handleRemoved = (els, el, i2) => els.splice(i2, 0, el);
  return createMemo((prev) => {
    const elsToRemove = toRemove();
    const sourceList = source();
    sourceList[$TRACK];
    if (untrack(isTransitionPending)) {
      isTransitionPending();
      return prev;
    }
    if (elsToRemove.length) {
      const next = prev.filter((e2) => !elsToRemove.includes(e2));
      elsToRemove.length = 0;
      onChange({ list: next, added: [], removed: [], unchanged: next, finishRemoved });
      return next;
    }
    return untrack(() => {
      const nextSet = new Set(sourceList);
      const next = sourceList.slice();
      const added = [];
      const removed = [];
      const unchanged = [];
      for (const el of sourceList) {
        (prevSet.has(el) ? unchanged : added).push(el);
      }
      let nothingChanged = !added.length;
      for (let i2 = 0;i2 < prev.length; i2++) {
        const el = prev[i2];
        if (!nextSet.has(el)) {
          if (!exiting.has(el)) {
            removed.push(el);
            exiting.add(el);
          }
          handleRemoved(next, el, i2);
        }
        if (nothingChanged && el !== next[i2])
          nothingChanged = false;
      }
      if (!removed.length && nothingChanged)
        return prev;
      onChange({ list: next, added, removed, unchanged, finishRemoved });
      prevSet = nextSet;
      return next;
    });
  }, options.appear ? [] : initSource.slice());
}
function mergeRefs(...refs) {
  return chain(refs);
}
function getResolvedElements(value, predicate) {
  if (predicate(value))
    return value;
  if (typeof value === "function" && !value.length)
    return getResolvedElements(value(), predicate);
  if (Array.isArray(value)) {
    const results = [];
    for (const item of value) {
      const result = getResolvedElements(item, predicate);
      if (result)
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results.length ? results : null;
  }
  return null;
}
function resolveElements(fn, predicate = defaultElementPredicate, serverPredicate = defaultElementPredicate) {
  const children2 = createMemo(fn);
  const memo22 = createMemo(() => getResolvedElements(children2(), isServer2 ? serverPredicate : predicate));
  memo22.toArray = () => {
    const value = memo22();
    return Array.isArray(value) ? value : value ? [value] : [];
  };
  return memo22;
}
function createClassnames(props) {
  return createMemo(() => {
    const name = props.name || "s";
    return {
      enterActive: (props.enterActiveClass || name + "-enter-active").split(" "),
      enter: (props.enterClass || name + "-enter").split(" "),
      enterTo: (props.enterToClass || name + "-enter-to").split(" "),
      exitActive: (props.exitActiveClass || name + "-exit-active").split(" "),
      exit: (props.exitClass || name + "-exit").split(" "),
      exitTo: (props.exitToClass || name + "-exit-to").split(" "),
      move: (props.moveClass || name + "-move").split(" ")
    };
  });
}
function nextFrame(fn) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}
function enterTransition(classes, events, el, done) {
  const { onBeforeEnter, onEnter, onAfterEnter } = events;
  onBeforeEnter?.(el);
  el.classList.add(...classes.enter);
  el.classList.add(...classes.enterActive);
  queueMicrotask(() => {
    if (!el.parentNode)
      return done?.();
    onEnter?.(el, () => endTransition());
  });
  nextFrame(() => {
    el.classList.remove(...classes.enter);
    el.classList.add(...classes.enterTo);
    if (!onEnter || onEnter.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.enterActive);
      el.classList.remove(...classes.enterTo);
      onAfterEnter?.(el);
    }
  }
}
function exitTransition(classes, events, el, done) {
  const { onBeforeExit, onExit, onAfterExit } = events;
  if (!el.parentNode)
    return done?.();
  onBeforeExit?.(el);
  el.classList.add(...classes.exit);
  el.classList.add(...classes.exitActive);
  onExit?.(el, () => endTransition());
  nextFrame(() => {
    el.classList.remove(...classes.exit);
    el.classList.add(...classes.exitTo);
    if (!onExit || onExit.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      done?.();
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.exitActive);
      el.classList.remove(...classes.exitTo);
      onAfterExit?.(el);
    }
  }
}
function dispose2(list) {
  for (const o22 of list)
    o22.dispose();
}
function keyArray(items, keyFn, mapFn, options = {}) {
  if (isServer2) {
    const itemsRef = items();
    let s2 = [];
    if (itemsRef && itemsRef.length) {
      for (let i2 = 0, len = itemsRef.length;i2 < len; i2++)
        s2.push(mapFn(() => itemsRef[i2], () => i2));
    } else if (options.fallback)
      s2 = [options.fallback()];
    return () => s2;
  }
  const prev = /* @__PURE__ */ new Map;
  onCleanup(() => dispose2(prev.values()));
  return () => {
    const list = items() || [];
    list[$TRACK];
    return untrack(() => {
      if (!list.length) {
        dispose2(prev.values());
        prev.clear();
        if (!options.fallback)
          return [];
        const fb2 = createRoot((dispose22) => {
          prev.set(FALLBACK2, { dispose: dispose22 });
          return options.fallback();
        });
        return [fb2];
      }
      const result = new Array(list.length);
      const fb = prev.get(FALLBACK2);
      if (!prev.size || fb) {
        fb?.dispose();
        prev.delete(FALLBACK2);
        for (let i2 = 0;i2 < list.length; i2++) {
          const item = list[i2];
          const key = keyFn(item, i2);
          addNewItem(result, item, i2, key);
        }
        return result;
      }
      const prevKeys = new Set(prev.keys());
      for (let i2 = 0;i2 < list.length; i2++) {
        const item = list[i2];
        const key = keyFn(item, i2);
        prevKeys.delete(key);
        const lookup = prev.get(key);
        if (lookup) {
          result[i2] = lookup.mapped;
          lookup.setIndex?.(i2);
          lookup.setItem(() => item);
        } else
          addNewItem(result, item, i2, key);
      }
      for (const key of prevKeys) {
        prev.get(key)?.dispose();
        prev.delete(key);
      }
      return result;
    });
  };
  function addNewItem(list, item, i2, key) {
    createRoot((dispose22) => {
      const [getItem, setItem] = createSignal(item);
      const save = { setItem, dispose: dispose22 };
      if (mapFn.length > 1) {
        const [index, setIndex] = createSignal(i2);
        save.setIndex = setIndex;
        save.mapped = mapFn(getItem, index);
      } else
        save.mapped = mapFn(getItem);
      prev.set(key, save);
      list[i2] = save.mapped;
    });
  }
}
function Key(props) {
  const { by } = props;
  return createMemo(keyArray(() => props.each, typeof by === "function" ? by : (v2) => v2[by], props.children, "fallback" in props ? { fallback: () => props.fallback } : undefined));
}
function makeEventListener(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return tryOnCleanup(target.removeEventListener.bind(target, type, handler, options));
}
function createEventListener(targets, type, handler, options) {
  if (isServer2)
    return;
  const attachListeners = () => {
    asArray(access(targets)).forEach((el) => {
      if (el)
        asArray(access(type)).forEach((type2) => makeEventListener(el, type2, handler, options));
    });
  };
  if (typeof targets === "function")
    createEffect(attachListeners);
  else
    createRenderEffect(attachListeners);
}
function makeResizeObserver(callback, options) {
  if (isServer2) {
    return { observe: noop2, unobserve: noop2 };
  }
  const observer = new ResizeObserver(callback);
  onCleanup(observer.disconnect.bind(observer));
  return {
    observe: (ref) => observer.observe(ref, options),
    unobserve: observer.unobserve.bind(observer)
  };
}
function createResizeObserver(targets, onResize, options) {
  if (isServer2)
    return;
  const previousMap = /* @__PURE__ */ new WeakMap, { observe, unobserve } = makeResizeObserver((entries2) => {
    for (const entry of entries2) {
      const { contentRect, target } = entry, width = Math.round(contentRect.width), height = Math.round(contentRect.height), previous = previousMap.get(target);
      if (!previous || previous.width !== width || previous.height !== height) {
        onResize(contentRect, target, entry);
        previousMap.set(target, { width, height });
      }
    }
  }, options);
  createEffect((prev) => {
    const refs = filterNonNullable(asArray(access(targets)));
    handleDiffArray(refs, prev, observe, unobserve);
    return refs;
  }, []);
}
function stringStyleToObject(style2) {
  const object = {};
  let match;
  while (match = extractCSSregex.exec(style2)) {
    object[match[1]] = match[2];
  }
  return object;
}
function combineStyle(a2, b2) {
  if (typeof a2 === "string") {
    if (typeof b2 === "string")
      return `${a2};${b2}`;
    a2 = stringStyleToObject(a2);
  } else if (typeof b2 === "string") {
    b2 = stringStyleToObject(b2);
  }
  return { ...a2, ...b2 };
}
function addItemToArray(array, item, index = -1) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
function removeItemFromArray(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function isNumber2(value) {
  return typeof value === "number";
}
function isString2(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isFunction(value) {
  return typeof value === "function";
}
function createGenerateId(baseId) {
  return (suffix) => `${baseId()}-${suffix}`;
}
function contains(parent, child) {
  if (!parent) {
    return false;
  }
  return parent === child || parent.contains(child);
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getDocument(node);
  if (!activeElement?.nodeName) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function getWindow(node) {
  return getDocument(node).defaultView || window;
}
function getDocument(node) {
  return node ? node.ownerDocument || node : document;
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
function testPlatform(re2) {
  return typeof window !== "undefined" && window.navigator != null ? re2.test(window.navigator["userAgentData"]?.platform || window.navigator.platform) : false;
}
function isMac() {
  return testPlatform(/^Mac/i);
}
function isIPhone() {
  return testPlatform(/^iPhone/i);
}
function isIPad() {
  return testPlatform(/^iPad/i) || isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}
function callHandler(event, handler) {
  if (handler) {
    if (isFunction(handler)) {
      handler(event);
    } else {
      handler[0](handler[1], event);
    }
  }
  return event?.defaultPrevented;
}
function composeEventHandlers(handlers) {
  return (event) => {
    for (const handler of handlers) {
      callHandler(event, handler);
    }
  };
}
function isCtrlKey(e2) {
  if (isMac()) {
    return e2.metaKey && !e2.ctrlKey;
  }
  return e2.ctrlKey && !e2.metaKey;
}
function focusWithoutScrolling(element) {
  if (!element) {
    return;
  }
  if (supportsPreventScroll()) {
    element.focus({ preventScroll: true });
  } else {
    const scrollableElements = getScrollableElements(element);
    element.focus();
    restoreScrollPosition(scrollableElements);
  }
}
function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      const focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e2) {}
  }
  return supportsPreventScrollCached;
}
function getScrollableElements(element) {
  let parent = element.parentNode;
  const scrollableElements = [];
  const rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }
  return scrollableElements;
}
function restoreScrollPosition(scrollableElements) {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
function getAllTabbableIn(container, includeContainer) {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTOR));
  const tabbableElements2 = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements2.unshift(container);
  }
  tabbableElements2.forEach((element, i2) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(frameBody, false);
      tabbableElements2.splice(i2, 1, ...allFrameTabbable);
    }
  });
  return tabbableElements2;
}
function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
function isFocusable(element) {
  return element.matches(FOCUSABLE_ELEMENT_SELECTOR) && isElementVisible(element);
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isElementVisible(element, childElement) {
  return element.nodeName !== "#comment" && isStyleVisible(element) && isAttributeVisible(element, childElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }
  const { display, visibility } = element.style;
  let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    if (!element.ownerDocument.defaultView) {
      return isVisible;
    }
    const { getComputedStyle: getComputedStyle3 } = element.ownerDocument.defaultView;
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle3(element);
    isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
  }
  return isVisible;
}
function isAttributeVisible(element, childElement) {
  return !element.hasAttribute("hidden") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function getFocusableTreeWalker(root, opts, scope) {
  const selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
  const walker2 = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (opts?.from?.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.matches(selector) && isElementVisible(node) && true && (!opts?.accept || opts.accept(node))) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });
  if (opts?.from) {
    walker2.currentNode = opts.from;
  }
  return walker2;
}
function getScrollParent(node) {
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
function isScrollable(node) {
  const style2 = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style2.overflow + style2.overflowX + style2.overflowY);
}
function noop3() {
  return;
}
function isPointInPolygon(point, polygon) {
  const [x2, y] = point;
  let inside = false;
  const length = polygon.length;
  for (let l2 = length, i2 = 0, j = l2 - 1;i2 < l2; j = i2++) {
    const [xi, yi] = polygon[i2];
    const [xj, yj] = polygon[j];
    const [, vy] = polygon[j === 0 ? l2 - 1 : j - 1] || [0, 0];
    const where = (yi - yj) * (x2 - xi) - (xi - xj) * (y - yi);
    if (yj < yi) {
      if (y >= yj && y < yi) {
        if (where === 0)
          return true;
        if (where > 0) {
          if (y === yj) {
            if (y > vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (yi < yj) {
      if (y > yi && y <= yj) {
        if (where === 0)
          return true;
        if (where < 0) {
          if (y === yj) {
            if (y < vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (y == yi && (x2 >= xj && x2 <= xi || x2 >= xi && x2 <= xj)) {
      return true;
    }
  }
  return inside;
}
function mergeDefaultProps(defaultProps, props) {
  return mergeProps(defaultProps, props);
}
function setupGlobalEvents() {
  if (typeof window === "undefined") {
    return;
  }
  const onTransitionStart = (e2) => {
    if (!e2.target) {
      return;
    }
    let transitions = transitionsByElement.get(e2.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set;
      transitionsByElement.set(e2.target, transitions);
      e2.target.addEventListener("transitioncancel", onTransitionEnd);
    }
    transitions.add(e2.propertyName);
  };
  const onTransitionEnd = (e2) => {
    if (!e2.target) {
      return;
    }
    const properties = transitionsByElement.get(e2.target);
    if (!properties) {
      return;
    }
    properties.delete(e2.propertyName);
    if (properties.size === 0) {
      e2.target.removeEventListener("transitioncancel", onTransitionEnd);
      transitionsByElement.delete(e2.target);
    }
    if (transitionsByElement.size === 0) {
      for (const cb of transitionCallbacks) {
        cb();
      }
      transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
function scrollIntoView(scrollView, element) {
  const offsetX = relativeOffset(scrollView, element, "left");
  const offsetY = relativeOffset(scrollView, element, "top");
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  let x2 = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  const maxX = x2 + scrollView.offsetWidth;
  const maxY = y + scrollView.offsetHeight;
  if (offsetX <= x2) {
    x2 = offsetX;
  } else if (offsetX + width > maxX) {
    x2 += offsetX + width - maxX;
  }
  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }
  scrollView.scrollLeft = x2;
  scrollView.scrollTop = y;
}
function relativeOffset(ancestor, child, axis) {
  const prop = axis === "left" ? "offsetLeft" : "offsetTop";
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor) {
      break;
    } else if (child.offsetParent.contains(ancestor)) {
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
function scrollIntoViewport(targetElement, opts) {
  if (document.contains(targetElement)) {
    const root = document.scrollingElement || document.documentElement;
    const isScrollPrevented = window.getComputedStyle(root).overflow === "hidden";
    if (!isScrollPrevented) {
      const { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
      targetElement?.scrollIntoView?.({ block: "nearest" });
      const { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
      if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
        targetElement.scrollIntoView?.({ block: "nearest" });
      }
    } else {
      let scrollParent = getScrollParent(targetElement);
      while (targetElement && scrollParent && targetElement !== root && scrollParent !== root) {
        scrollIntoView(scrollParent, targetElement);
        targetElement = scrollParent;
        scrollParent = getScrollParent(targetElement);
      }
    }
  }
}
function createRegisterId(setter) {
  return (id) => {
    setter(id);
    return () => setter(undefined);
  };
}
function createTagName(ref, fallback) {
  const [tagName, setTagName] = createSignal(stringOrUndefined(fallback?.()));
  createEffect(() => {
    setTagName(ref()?.tagName.toLowerCase() || stringOrUndefined(fallback?.()));
  });
  return tagName;
}
function stringOrUndefined(value) {
  return isString2(value) ? value : undefined;
}
function Polymorphic(props) {
  const [local, others] = splitProps(props, ["as"]);
  if (!local.as) {
    throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
  }
  return createComponent(Dynamic, mergeProps(others, {
    get component() {
      return local.as;
    }
  }));
}
function createFormControl(props) {
  const defaultId = `form-control-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [labelId, setLabelId] = createSignal();
  const [fieldId, setFieldId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [errorMessageId, setErrorMessageId] = createSignal();
  const getAriaLabelledBy = (fieldId2, fieldAriaLabel, fieldAriaLabelledBy) => {
    const hasAriaLabelledBy = fieldAriaLabelledBy != null || labelId() != null;
    return [
      fieldAriaLabelledBy,
      labelId(),
      hasAriaLabelledBy && fieldAriaLabel != null ? fieldId2 : undefined
    ].filter(Boolean).join(" ") || undefined;
  };
  const getAriaDescribedBy = (fieldAriaDescribedBy) => {
    return [
      descriptionId(),
      errorMessageId(),
      fieldAriaDescribedBy
    ].filter(Boolean).join(" ") || undefined;
  };
  const dataset = createMemo(() => ({
    "data-valid": access(mergedProps.validationState) === "valid" ? "" : undefined,
    "data-invalid": access(mergedProps.validationState) === "invalid" ? "" : undefined,
    "data-required": access(mergedProps.required) ? "" : undefined,
    "data-disabled": access(mergedProps.disabled) ? "" : undefined,
    "data-readonly": access(mergedProps.readOnly) ? "" : undefined
  }));
  const formControlContext = {
    name: () => access(mergedProps.name) ?? access(mergedProps.id),
    dataset,
    validationState: () => access(mergedProps.validationState),
    isRequired: () => access(mergedProps.required),
    isDisabled: () => access(mergedProps.disabled),
    isReadOnly: () => access(mergedProps.readOnly),
    labelId,
    fieldId,
    descriptionId,
    errorMessageId,
    getAriaLabelledBy,
    getAriaDescribedBy,
    generateId: createGenerateId(() => access(mergedProps.id)),
    registerLabel: createRegisterId(setLabelId),
    registerField: createRegisterId(setFieldId),
    registerDescription: createRegisterId(setDescriptionId),
    registerErrorMessage: createRegisterId(setErrorMessageId)
  };
  return {
    formControlContext
  };
}
function useFormControlContext() {
  const context = useContext4(FormControlContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");
  }
  return context;
}
function FormControlDescription(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function FormControlErrorMessage(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("error-message")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  const isInvalid = () => context.validationState() === "invalid";
  createEffect(() => {
    if (!isInvalid()) {
      return;
    }
    onCleanup(context.registerErrorMessage(others.id));
  });
  return createComponent(Show, {
    get when() {
      return local.forceMount || isInvalid();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function FormControlLabel(props) {
  let ref;
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const tagName = createTagName(() => ref, () => "label");
  createEffect(() => onCleanup(context.registerLabel(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["for"]() {
      return memo2(() => tagName() === "label")() ? context.fieldId() : undefined;
    }
  }, () => context.dataset(), others));
}
function createFormResetListener(element, handler) {
  createEffect(on(element, (element2) => {
    if (element2 == null) {
      return;
    }
    const form = getClosestForm(element2);
    if (form == null) {
      return;
    }
    form.addEventListener("reset", handler, { passive: true });
    onCleanup(() => {
      form.removeEventListener("reset", handler);
    });
  }));
}
function getClosestForm(element) {
  return isFormElement(element) ? element.form : element.closest("form");
}
function isFormElement(element) {
  return element.matches("textarea, input, select, button");
}
function createControllableSignal(props) {
  const [_value, _setValue] = createSignal(props.defaultValue?.());
  const isControlled = createMemo(() => props.value?.() !== undefined);
  const value = createMemo(() => isControlled() ? props.value?.() : _value());
  const setValue = (next) => {
    untrack(() => {
      const nextValue = accessWith(next, value());
      if (!Object.is(nextValue, value())) {
        if (!isControlled()) {
          _setValue(nextValue);
        }
        props.onChange?.(nextValue);
      }
      return nextValue;
    });
  };
  return [value, setValue];
}
function createControllableBooleanSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? false;
  return [value, setValue];
}
function createControllableArraySignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? [];
  return [value, setValue];
}
function createToggleState(props = {}) {
  const [isSelected, _setIsSelected] = createControllableBooleanSignal({
    value: () => access(props.isSelected),
    defaultValue: () => !!access(props.defaultIsSelected),
    onChange: (value) => props.onSelectedChange?.(value)
  });
  const setIsSelected = (value) => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(value);
    }
  };
  const toggle = () => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(!isSelected());
    }
  };
  return {
    isSelected,
    setIsSelected,
    toggle
  };
}
function useOptionalDomCollectionContext() {
  return useContext4(DomCollectionContext);
}
function useDomCollectionContext() {
  const context = useOptionalDomCollectionContext();
  if (context === undefined) {
    throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");
  }
  return context;
}
function isElementPreceding(a2, b2) {
  return Boolean(b2.compareDocumentPosition(a2) & Node.DOCUMENT_POSITION_PRECEDING);
}
function findDOMIndex(items, item) {
  const itemEl = item.ref();
  if (!itemEl) {
    return -1;
  }
  let length = items.length;
  if (!length) {
    return -1;
  }
  while (length--) {
    const currentItemEl = items[length]?.ref();
    if (!currentItemEl) {
      continue;
    }
    if (isElementPreceding(currentItemEl, itemEl)) {
      return length + 1;
    }
  }
  return 0;
}
function sortBasedOnDOMPosition(items) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort(([indexA, a2], [indexB, b2]) => {
    const elementA = a2.ref();
    const elementB = b2.ref();
    if (elementA === elementB) {
      return 0;
    }
    if (!elementA || !elementB) {
      return 0;
    }
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });
  if (isOrderDifferent) {
    return pairs.map(([_2, item]) => item);
  }
  return items;
}
function setItemsBasedOnDOMPosition(items, setItems) {
  const sortedItems = sortBasedOnDOMPosition(items);
  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}
function getCommonParent(items) {
  const firstItem = items[0];
  const lastItemEl = items[items.length - 1]?.ref();
  let parentEl = firstItem?.ref()?.parentElement;
  while (parentEl) {
    if (lastItemEl && parentEl.contains(lastItemEl)) {
      return parentEl;
    }
    parentEl = parentEl.parentElement;
  }
  return getDocument(parentEl).body;
}
function createTimeoutObserver(items, setItems) {
  createEffect(() => {
    const timeout = setTimeout(() => {
      setItemsBasedOnDOMPosition(items(), setItems);
    });
    onCleanup(() => clearTimeout(timeout));
  });
}
function createSortBasedOnDOMPosition(items, setItems) {
  if (typeof IntersectionObserver !== "function") {
    createTimeoutObserver(items, setItems);
    return;
  }
  let previousItems = [];
  createEffect(() => {
    const callback = () => {
      const hasPreviousItems = !!previousItems.length;
      previousItems = items();
      if (!hasPreviousItems) {
        return;
      }
      setItemsBasedOnDOMPosition(items(), setItems);
    };
    const root = getCommonParent(items());
    const observer = new IntersectionObserver(callback, { root });
    for (const item of items()) {
      const itemEl = item.ref();
      if (itemEl) {
        observer.observe(itemEl);
      }
    }
    onCleanup(() => observer.disconnect());
  });
}
function createDomCollection(props = {}) {
  const [items, setItems] = createControllableArraySignal({
    value: () => access(props.items),
    onChange: (value) => props.onItemsChange?.(value)
  });
  createSortBasedOnDOMPosition(items, setItems);
  const registerItem = (item) => {
    setItems((prevItems) => {
      const index = findDOMIndex(prevItems, item);
      return addItemToArray(prevItems, item, index);
    });
    return () => {
      setItems((prevItems) => {
        const nextItems = prevItems.filter((prevItem) => prevItem.ref() !== item.ref());
        if (prevItems.length === nextItems.length) {
          return prevItems;
        }
        return nextItems;
      });
    };
  };
  const DomCollectionProvider = (props2) => {
    return createComponent(DomCollectionContext.Provider, {
      value: { registerItem },
      get children() {
        return props2.children;
      }
    });
  };
  return { DomCollectionProvider };
}
function createDomCollectionItem(props) {
  const context = useDomCollectionContext();
  const mergedProps = mergeDefaultProps({ shouldRegisterItem: true }, props);
  createEffect(() => {
    if (!mergedProps.shouldRegisterItem) {
      return;
    }
    const unregister = context.registerItem(mergedProps.getItem());
    onCleanup(unregister);
  });
}
function buildNodes(params) {
  let index = params.startIndex ?? 0;
  const level = params.startLevel ?? 0;
  const nodes = [];
  const getKey = (data) => {
    if (data == null) {
      return "";
    }
    const _getKey = params.getKey ?? "key";
    const dataKey = isString2(_getKey) ? data[_getKey] : _getKey(data);
    return dataKey != null ? String(dataKey) : "";
  };
  const getTextValue = (data) => {
    if (data == null) {
      return "";
    }
    const _getTextValue = params.getTextValue ?? "textValue";
    const dataTextValue = isString2(_getTextValue) ? data[_getTextValue] : _getTextValue(data);
    return dataTextValue != null ? String(dataTextValue) : "";
  };
  const getDisabled = (data) => {
    if (data == null) {
      return false;
    }
    const _getDisabled = params.getDisabled ?? "disabled";
    return (isString2(_getDisabled) ? data[_getDisabled] : _getDisabled(data)) ?? false;
  };
  const getSectionChildren = (data) => {
    if (data == null) {
      return;
    }
    if (isString2(params.getSectionChildren)) {
      return data[params.getSectionChildren];
    }
    return params.getSectionChildren?.(data);
  };
  for (const data of params.dataSource) {
    if (isString2(data) || isNumber2(data)) {
      nodes.push({
        type: "item",
        rawValue: data,
        key: String(data),
        textValue: String(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
      continue;
    }
    if (getSectionChildren(data) != null) {
      nodes.push({
        type: "section",
        rawValue: data,
        key: "",
        textValue: "",
        disabled: false,
        level,
        index
      });
      index++;
      const sectionChildren = getSectionChildren(data) ?? [];
      if (sectionChildren.length > 0) {
        const childNodes = buildNodes({
          dataSource: sectionChildren,
          getKey: params.getKey,
          getTextValue: params.getTextValue,
          getDisabled: params.getDisabled,
          getSectionChildren: params.getSectionChildren,
          startIndex: index,
          startLevel: level + 1
        });
        nodes.push(...childNodes);
        index += childNodes.length;
      }
    } else {
      nodes.push({
        type: "item",
        rawValue: data,
        key: getKey(data),
        textValue: getTextValue(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
    }
  }
  return nodes;
}
function createCollection(props, deps = []) {
  return createMemo(() => {
    const nodes = buildNodes({
      dataSource: access(props.dataSource),
      getKey: access(props.getKey),
      getTextValue: access(props.getTextValue),
      getDisabled: access(props.getDisabled),
      getSectionChildren: access(props.getSectionChildren)
    });
    for (let i2 = 0;i2 < deps.length; i2++)
      deps[i2]();
    return props.factory(nodes);
  });
}
function isRTL(locale) {
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script ?? "";
    return RTL_SCRIPTS.has(script);
  }
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}
function getReadingDirection(locale) {
  return isRTL(locale) ? "rtl" : "ltr";
}
function getDefaultLocale() {
  let locale = typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
  return {
    locale,
    direction: getReadingDirection(locale)
  };
}
function updateLocale() {
  currentLocale = getDefaultLocale();
  for (const listener of listeners) {
    listener(currentLocale);
  }
}
function createDefaultLocale() {
  const defaultSSRLocale = {
    locale: "en-US",
    direction: "ltr"
  };
  const [defaultClientLocale, setDefaultClientLocale] = createSignal(currentLocale);
  const defaultLocale = createMemo(() => isServer2 ? defaultSSRLocale : defaultClientLocale());
  onMount(() => {
    if (listeners.size === 0) {
      window.addEventListener("languagechange", updateLocale);
    }
    listeners.add(setDefaultClientLocale);
    onCleanup(() => {
      listeners.delete(setDefaultClientLocale);
      if (listeners.size === 0) {
        window.removeEventListener("languagechange", updateLocale);
      }
    });
  });
  return {
    locale: () => defaultLocale().locale,
    direction: () => defaultLocale().direction
  };
}
function useLocale() {
  const defaultLocale = createDefaultLocale();
  const context = useContext4(I18nContext);
  return context || defaultLocale;
}
function createCollator(options) {
  const { locale } = useLocale();
  const cacheKey = createMemo(() => {
    return locale() + (options ? Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join() : "");
  });
  return createMemo(() => {
    const key = cacheKey();
    let collator;
    if (cache.has(key)) {
      collator = cache.get(key);
    }
    if (!collator) {
      collator = new Intl.Collator(locale(), options);
      cache.set(key, collator);
    }
    return collator;
  });
}
function createControllableSelectionSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? new Selection;
  return [value, setValue];
}
function isNonContiguousSelectionModifier(e2) {
  return isAppleDevice() ? e2.altKey : e2.ctrlKey;
}
function isCtrlKeyPressed(e2) {
  if (isMac()) {
    return e2.metaKey;
  }
  return e2.ctrlKey;
}
function convertSelection(selection) {
  return new Selection(selection);
}
function isSameSelection(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}
function createMultipleSelectionState(props) {
  const mergedProps = mergeDefaultProps({
    selectionMode: "none",
    selectionBehavior: "toggle"
  }, props);
  const [isFocused, setFocused] = createSignal(false);
  const [focusedKey, setFocusedKey] = createSignal();
  const selectedKeysProp = createMemo(() => {
    const selection = access(mergedProps.selectedKeys);
    if (selection != null) {
      return convertSelection(selection);
    }
    return selection;
  });
  const defaultSelectedKeys = createMemo(() => {
    const defaultSelection = access(mergedProps.defaultSelectedKeys);
    if (defaultSelection != null) {
      return convertSelection(defaultSelection);
    }
    return new Selection;
  });
  const [selectedKeys, _setSelectedKeys] = createControllableSelectionSignal({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys,
    onChange: (value) => mergedProps.onSelectionChange?.(value)
  });
  const [selectionBehavior, setSelectionBehavior] = createSignal(access(mergedProps.selectionBehavior));
  const selectionMode = () => access(mergedProps.selectionMode);
  const disallowEmptySelection = () => access(mergedProps.disallowEmptySelection) ?? false;
  const setSelectedKeys = (keys2) => {
    if (access(mergedProps.allowDuplicateSelectionEvents) || !isSameSelection(keys2, selectedKeys())) {
      _setSelectedKeys(keys2);
    }
  };
  createEffect(() => {
    const selection = selectedKeys();
    if (access(mergedProps.selectionBehavior) === "replace" && selectionBehavior() === "toggle" && typeof selection === "object" && selection.size === 0) {
      setSelectionBehavior("replace");
    }
  });
  createEffect(() => {
    setSelectionBehavior(access(mergedProps.selectionBehavior) ?? "toggle");
  });
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    isFocused,
    setFocused,
    focusedKey,
    setFocusedKey,
    selectedKeys,
    setSelectedKeys
  };
}
function createTypeSelect(props) {
  const [search, setSearch] = createSignal("");
  const [timeoutId, setTimeoutId] = createSignal(-1);
  const onKeyDown = (e2) => {
    if (access(props.isDisabled)) {
      return;
    }
    const delegate = access(props.keyboardDelegate);
    const manager = access(props.selectionManager);
    if (!delegate.getKeyForSearch) {
      return;
    }
    const character = getStringForKey(e2.key);
    if (!character || e2.ctrlKey || e2.metaKey) {
      return;
    }
    if (character === " " && search().trim().length > 0) {
      e2.preventDefault();
      e2.stopPropagation();
    }
    let newSearch = setSearch((prev) => prev + character);
    let key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    if (key == null && isAllSameLetter(newSearch)) {
      newSearch = newSearch[0];
      key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    }
    if (key != null) {
      manager.setFocusedKey(key);
      props.onTypeSelect?.(key);
    }
    clearTimeout(timeoutId());
    setTimeoutId(window.setTimeout(() => setSearch(""), 500));
  };
  return {
    typeSelectHandlers: {
      onKeyDown
    }
  };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
function isAllSameLetter(search) {
  return search.split("").every((letter) => letter === search[0]);
}
function createSelectableCollection(props, ref, scrollRef) {
  const defaultProps = {
    selectOnFocus: () => access(props.selectionManager).selectionBehavior() === "replace"
  };
  const mergedProps = mergeProps(defaultProps, props);
  const finalScrollRef = () => ref();
  const { direction } = useLocale();
  let scrollPos = { top: 0, left: 0 };
  createEventListener(() => !access(mergedProps.isVirtualized) ? finalScrollRef() : undefined, "scroll", () => {
    const scrollEl = finalScrollRef();
    if (!scrollEl) {
      return;
    }
    scrollPos = {
      top: scrollEl.scrollTop,
      left: scrollEl.scrollLeft
    };
  });
  const { typeSelectHandlers } = createTypeSelect({
    isDisabled: () => access(mergedProps.disallowTypeAhead),
    keyboardDelegate: () => access(mergedProps.keyboardDelegate),
    selectionManager: () => access(mergedProps.selectionManager)
  });
  const orientation = () => access(mergedProps.orientation) ?? "vertical";
  const onKeyDown = (e2) => {
    callHandler(e2, typeSelectHandlers.onKeyDown);
    if (e2.altKey && e2.key === "Tab") {
      e2.preventDefault();
    }
    const refEl = ref();
    if (!refEl?.contains(e2.target)) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    const navigateToKey = (key) => {
      if (key != null) {
        manager.setFocusedKey(key);
        if (e2.shiftKey && manager.selectionMode() === "multiple") {
          manager.extendSelection(key);
        } else if (selectOnFocus && !isNonContiguousSelectionModifier(e2)) {
          manager.replaceSelection(key);
        }
      }
    };
    const delegate = access(mergedProps.keyboardDelegate);
    const shouldFocusWrap = access(mergedProps.shouldFocusWrap);
    const focusedKey = manager.focusedKey();
    switch (e2.key) {
      case (orientation() === "vertical" ? "ArrowDown" : "ArrowRight"): {
        if (delegate.getKeyBelow) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyBelow(focusedKey);
          } else {
            nextKey = delegate.getFirstKey?.();
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = delegate.getFirstKey?.(focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowUp" : "ArrowLeft"): {
        if (delegate.getKeyAbove) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyAbove(focusedKey);
          } else {
            nextKey = delegate.getLastKey?.();
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = delegate.getLastKey?.(focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowLeft" : "ArrowUp"): {
        if (delegate.getKeyLeftOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyLeftOf(focusedKey);
          } else {
            nextKey = isRTL3 ? delegate.getFirstKey?.() : delegate.getLastKey?.();
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowRight" : "ArrowDown"): {
        if (delegate.getKeyRightOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyRightOf(focusedKey);
          } else {
            nextKey = isRTL3 ? delegate.getLastKey?.() : delegate.getFirstKey?.();
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case "Home":
        if (delegate.getFirstKey) {
          e2.preventDefault();
          const firstKey = delegate.getFirstKey(focusedKey, isCtrlKeyPressed(e2));
          if (firstKey != null) {
            manager.setFocusedKey(firstKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(firstKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(firstKey);
            }
          }
        }
        break;
      case "End":
        if (delegate.getLastKey) {
          e2.preventDefault();
          const lastKey = delegate.getLastKey(focusedKey, isCtrlKeyPressed(e2));
          if (lastKey != null) {
            manager.setFocusedKey(lastKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(lastKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(lastKey);
            }
          }
        }
        break;
      case "PageDown":
        if (delegate.getKeyPageBelow && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageBelow(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "PageUp":
        if (delegate.getKeyPageAbove && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageAbove(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "a":
        if (isCtrlKeyPressed(e2) && manager.selectionMode() === "multiple" && access(mergedProps.disallowSelectAll) !== true) {
          e2.preventDefault();
          manager.selectAll();
        }
        break;
      case "Escape":
        if (!e2.defaultPrevented) {
          e2.preventDefault();
          if (!access(mergedProps.disallowEmptySelection)) {
            manager.clearSelection();
          }
        }
        break;
      case "Tab": {
        if (!access(mergedProps.allowsTabNavigation)) {
          if (e2.shiftKey) {
            refEl.focus();
          } else {
            const walker2 = getFocusableTreeWalker(refEl, { tabbable: true });
            let next;
            let last;
            do {
              last = walker2.lastChild();
              if (last) {
                next = last;
              }
            } while (last);
            if (next && !next.contains(document.activeElement)) {
              focusWithoutScrolling(next);
            }
          }
          break;
        }
      }
    }
  };
  const onFocusIn = (e2) => {
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    if (manager.isFocused()) {
      if (!e2.currentTarget.contains(e2.target)) {
        manager.setFocused(false);
      }
      return;
    }
    if (!e2.currentTarget.contains(e2.target)) {
      return;
    }
    manager.setFocused(true);
    if (manager.focusedKey() == null) {
      const navigateToFirstKey = (key) => {
        if (key == null) {
          return;
        }
        manager.setFocusedKey(key);
        if (selectOnFocus) {
          manager.replaceSelection(key);
        }
      };
      const relatedTarget = e2.relatedTarget;
      if (relatedTarget && e2.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) {
        navigateToFirstKey(manager.lastSelectedKey() ?? delegate.getLastKey?.());
      } else {
        navigateToFirstKey(manager.firstSelectedKey() ?? delegate.getFirstKey?.());
      }
    } else if (!access(mergedProps.isVirtualized)) {
      const scrollEl = finalScrollRef();
      if (scrollEl) {
        scrollEl.scrollTop = scrollPos.top;
        scrollEl.scrollLeft = scrollPos.left;
        const element = scrollEl.querySelector(`[data-key="${manager.focusedKey()}"]`);
        if (element) {
          focusWithoutScrolling(element);
          scrollIntoView(scrollEl, element);
        }
      }
    }
  };
  const onFocusOut = (e2) => {
    const manager = access(mergedProps.selectionManager);
    if (!e2.currentTarget.contains(e2.relatedTarget)) {
      manager.setFocused(false);
    }
  };
  const onMouseDown = (e2) => {
    if (finalScrollRef() === e2.target) {
      e2.preventDefault();
    }
  };
  const tryAutoFocus = () => {
    const autoFocus = access(mergedProps.autoFocus);
    if (!autoFocus) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    let focusedKey;
    if (autoFocus === "first") {
      focusedKey = delegate.getFirstKey?.();
    }
    if (autoFocus === "last") {
      focusedKey = delegate.getLastKey?.();
    }
    const selectedKeys = manager.selectedKeys();
    if (selectedKeys.size) {
      focusedKey = selectedKeys.values().next().value;
    }
    manager.setFocused(true);
    manager.setFocusedKey(focusedKey);
    const refEl = ref();
    if (refEl && focusedKey == null && !access(mergedProps.shouldUseVirtualFocus)) {
      focusWithoutScrolling(refEl);
    }
  };
  onMount(() => {
    if (mergedProps.deferAutoFocus) {
      setTimeout(tryAutoFocus, 0);
    } else {
      tryAutoFocus();
    }
  });
  createEffect(on([
    finalScrollRef,
    () => access(mergedProps.isVirtualized),
    () => access(mergedProps.selectionManager).focusedKey()
  ], (newValue) => {
    const [scrollEl, isVirtualized, focusedKey] = newValue;
    if (isVirtualized) {
      focusedKey && mergedProps.scrollToKey?.(focusedKey);
    } else {
      if (focusedKey && scrollEl) {
        const element = scrollEl.querySelector(`[data-key="${focusedKey}"]`);
        if (element) {
          scrollIntoView(scrollEl, element);
        }
      }
    }
  }));
  const tabIndex = createMemo(() => {
    if (access(mergedProps.shouldUseVirtualFocus)) {
      return;
    }
    return access(mergedProps.selectionManager).focusedKey() == null ? 0 : -1;
  });
  return {
    tabIndex,
    onKeyDown,
    onMouseDown,
    onFocusIn,
    onFocusOut
  };
}
function createSelectableItem(props, ref) {
  const manager = () => access(props.selectionManager);
  const key = () => access(props.key);
  const shouldUseVirtualFocus = () => access(props.shouldUseVirtualFocus);
  const onSelect = (e2) => {
    if (manager().selectionMode() === "none") {
      return;
    }
    if (manager().selectionMode() === "single") {
      if (manager().isSelected(key()) && !manager().disallowEmptySelection()) {
        manager().toggleSelection(key());
      } else {
        manager().replaceSelection(key());
      }
    } else if (e2?.shiftKey) {
      manager().extendSelection(key());
    } else if (manager().selectionBehavior() === "toggle" || isCtrlKeyPressed(e2) || "pointerType" in e2 && e2.pointerType === "touch") {
      manager().toggleSelection(key());
    } else {
      manager().replaceSelection(key());
    }
  };
  const isSelected = () => manager().isSelected(key());
  const isDisabled = () => access(props.disabled) || manager().isDisabled(key());
  const allowsSelection = () => !isDisabled() && manager().canSelectItem(key());
  let pointerDownType = null;
  const onPointerDown = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    pointerDownType = e2.pointerType;
    if (e2.pointerType === "mouse" && e2.button === 0 && !access(props.shouldSelectOnPressUp)) {
      onSelect(e2);
    }
  };
  const onPointerUp = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (e2.pointerType === "mouse" && e2.button === 0 && access(props.shouldSelectOnPressUp) && access(props.allowsDifferentPressOrigin)) {
      onSelect(e2);
    }
  };
  const onClick = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (access(props.shouldSelectOnPressUp) && !access(props.allowsDifferentPressOrigin) || pointerDownType !== "mouse") {
      onSelect(e2);
    }
  };
  const onKeyDown = (e2) => {
    if (!allowsSelection() || !["Enter", " "].includes(e2.key)) {
      return;
    }
    if (isNonContiguousSelectionModifier(e2)) {
      manager().toggleSelection(key());
    } else {
      onSelect(e2);
    }
  };
  const onMouseDown = (e2) => {
    if (isDisabled()) {
      e2.preventDefault();
    }
  };
  const onFocus = (e2) => {
    const refEl = ref();
    if (shouldUseVirtualFocus() || isDisabled() || !refEl) {
      return;
    }
    if (e2.target === refEl) {
      manager().setFocusedKey(key());
    }
  };
  const tabIndex = createMemo(() => {
    if (shouldUseVirtualFocus() || isDisabled()) {
      return;
    }
    return key() === manager().focusedKey() ? 0 : -1;
  });
  const dataKey = createMemo(() => {
    return access(props.virtualized) ? undefined : key();
  });
  createEffect(on([
    ref,
    key,
    shouldUseVirtualFocus,
    () => manager().focusedKey(),
    () => manager().isFocused()
  ], ([refEl, key2, shouldUseVirtualFocus2, focusedKey, isFocused]) => {
    if (refEl && key2 === focusedKey && isFocused && !shouldUseVirtualFocus2 && document.activeElement !== refEl) {
      if (props.focus) {
        props.focus();
      } else {
        focusWithoutScrolling(refEl);
      }
    }
  }));
  return {
    isSelected,
    isDisabled,
    allowsSelection,
    tabIndex,
    dataKey,
    onPointerDown,
    onPointerUp,
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus
  };
}
function createListState(props) {
  const selectionState = createMultipleSelectionState(props);
  const factory = (nodes) => {
    return props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
  };
  const collection = createCollection({
    dataSource: () => access(props.dataSource),
    getKey: () => access(props.getKey),
    getTextValue: () => access(props.getTextValue),
    getDisabled: () => access(props.getDisabled),
    getSectionChildren: () => access(props.getSectionChildren),
    factory
  }, [() => props.filter]);
  const selectionManager = new SelectionManager(collection, selectionState);
  createComputed(() => {
    const focusedKey = selectionState.focusedKey();
    if (focusedKey != null && !collection().getItem(focusedKey)) {
      selectionState.setFocusedKey(undefined);
    }
  });
  return {
    collection,
    selectionManager: () => selectionManager
  };
}
function indexOf(node) {
  return layers.findIndex((layer) => layer.node === node);
}
function find2(node) {
  return layers[indexOf(node)];
}
function isTopMostLayer(node) {
  return layers[layers.length - 1].node === node;
}
function getPointerBlockingLayers() {
  return layers.filter((layer) => layer.isPointerBlocking);
}
function getTopMostPointerBlockingLayer() {
  return [...getPointerBlockingLayers()].slice(-1)[0];
}
function hasPointerBlockingLayer() {
  return getPointerBlockingLayers().length > 0;
}
function isBelowPointerBlockingLayer(node) {
  const highestBlockingIndex = indexOf(getTopMostPointerBlockingLayer()?.node);
  return indexOf(node) < highestBlockingIndex;
}
function addLayer(layer) {
  layers.push(layer);
}
function removeLayer(node) {
  const index = indexOf(node);
  if (index < 0) {
    return;
  }
  layers.splice(index, 1);
}
function assignPointerEventToLayers() {
  for (const {
    node
  } of layers) {
    node.style.pointerEvents = isBelowPointerBlockingLayer(node) ? "none" : "auto";
  }
}
function disableBodyPointerEvents(node) {
  if (hasPointerBlockingLayer() && !hasDisabledBodyPointerEvents) {
    const ownerDocument = getDocument(node);
    originalBodyPointerEvents = document.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = "none";
    hasDisabledBodyPointerEvents = true;
  }
}
function restoreBodyPointerEvents(node) {
  if (hasPointerBlockingLayer()) {
    return;
  }
  const ownerDocument = getDocument(node);
  ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
  if (ownerDocument.body.style.length === 0) {
    ownerDocument.body.removeAttribute("style");
  }
  hasDisabledBodyPointerEvents = false;
}
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") {
    return true;
  }
  if (tagName === "input" && element.type) {
    return BUTTON_INPUT_TYPES.indexOf(element.type) !== -1;
  }
  return false;
}
function ButtonRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    type: "button"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "type", "disabled"]);
  const tagName = createTagName(() => ref, () => "button");
  const isNativeButton = createMemo(() => {
    const elementTagName = tagName();
    if (elementTagName == null) {
      return false;
    }
    return isButton({
      tagName: elementTagName,
      type: local.type
    });
  });
  const isNativeInput = createMemo(() => {
    return tagName() === "input";
  });
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && ref?.getAttribute("href") != null;
  });
  return createComponent(Polymorphic, mergeProps({
    as: "button",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get type() {
      return isNativeButton() || isNativeInput() ? local.type : undefined;
    },
    get role() {
      return !isNativeButton() && !isNativeLink() ? "button" : undefined;
    },
    get tabIndex() {
      return !isNativeButton() && !isNativeLink() && !local.disabled ? 0 : undefined;
    },
    get disabled() {
      return isNativeButton() || isNativeInput() ? local.disabled : undefined;
    },
    get ["aria-disabled"]() {
      return !isNativeButton() && !isNativeInput() && local.disabled ? true : undefined;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : undefined;
    }
  }, others));
}
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === undefined) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt2 = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt2;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x2,
    right: x2 + width,
    bottom: y + height,
    x: x2,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === undefined) {
    options = {};
  }
  const {
    x: x2,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? undefined : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? undefined : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? undefined : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? undefined : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? undefined : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? undefined : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? undefined : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? undefined : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e2) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === undefined) {
    list = [];
  }
  if (traverseIframes === undefined) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? undefined : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x2 = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x: x2,
    y
  };
}
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === undefined) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === undefined) {
    includeScale = false;
  }
  if (isFixedStrategy === undefined) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x2 = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x2,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL2(element) {
  return getComputedStyle2(element).direction === "rtl";
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === undefined) {
      skip = false;
    }
    if (threshold === undefined) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries2) {
      const ratio = entries2[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 0.0000001);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === undefined) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
function usePopperContext() {
  const context = useContext4(PopperContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");
  }
  return context;
}
function PopperArrow(props) {
  const context = usePopperContext();
  const mergedProps = mergeDefaultProps({
    size: DEFAULT_SIZE
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "size"]);
  const dir = () => context.currentPlacement().split("-")[0];
  const contentStyle = createComputedStyle(context.contentRef);
  const fill = () => contentStyle()?.getPropertyValue("background-color") || "none";
  const stroke = () => contentStyle()?.getPropertyValue(`border-${dir()}-color`) || "none";
  const borderWidth = () => contentStyle()?.getPropertyValue(`border-${dir()}-width`) || "0px";
  const strokeWidth = () => {
    return Number.parseInt(borderWidth()) * 2 * (DEFAULT_SIZE / local.size);
  };
  const rotate = () => {
    return `rotate(${ROTATION_DEG[dir()]} ${HALF_DEFAULT_SIZE} ${HALF_DEFAULT_SIZE}) translate(0 2)`;
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setArrowRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "aria-hidden": "true",
    get style() {
      return combineStyle({
        position: "absolute",
        "font-size": `${local.size}px`,
        width: "1em",
        height: "1em",
        "pointer-events": "none",
        fill: fill(),
        stroke: stroke(),
        "stroke-width": strokeWidth()
      }, local.style);
    }
  }, others, {
    get children() {
      const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
      createRenderEffect(() => setAttribute(_el$2, "transform", rotate()));
      return _el$;
    }
  }));
}
function createComputedStyle(element) {
  const [style2, setStyle] = createSignal();
  createEffect(() => {
    const el = element();
    el && setStyle(getWindow(el).getComputedStyle(el));
  });
  return style2;
}
function PopperPositioner(props) {
  const context = usePopperContext();
  const [local, others] = splitProps(props, ["ref", "style"]);
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setPositionerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "data-popper-positioner": "",
    get style() {
      return combineStyle({
        position: "absolute",
        top: 0,
        left: 0,
        "min-width": "max-content"
      }, local.style);
    }
  }, others));
}
function createDOMRect(anchorRect) {
  const { x: x2 = 0, y = 0, width = 0, height = 0 } = anchorRect ?? {};
  if (typeof DOMRect === "function") {
    return new DOMRect(x2, y, width, height);
  }
  const rect = {
    x: x2,
    y,
    width,
    height,
    top: y,
    right: x2 + width,
    bottom: y + height,
    left: x2
  };
  return { ...rect, toJSON: () => rect };
}
function getAnchorElement(anchor, getAnchorRect) {
  const contextElement = anchor;
  return {
    contextElement,
    getBoundingClientRect: () => {
      const anchorRect = getAnchorRect(anchor);
      if (anchorRect) {
        return createDOMRect(anchorRect);
      }
      if (anchor) {
        return anchor.getBoundingClientRect();
      }
      return createDOMRect();
    }
  };
}
function isValidPlacement(flip22) {
  return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(flip22);
}
function getTransformOrigin(placement, readingDirection) {
  const [basePlacement, alignment] = placement.split("-");
  const reversePlacement = REVERSE_BASE_PLACEMENT[basePlacement];
  if (!alignment) {
    return `${reversePlacement} center`;
  }
  if (basePlacement === "left" || basePlacement === "right") {
    return `${reversePlacement} ${alignment === "start" ? "top" : "bottom"}`;
  }
  if (alignment === "start") {
    return `${reversePlacement} ${readingDirection === "rtl" ? "right" : "left"}`;
  }
  return `${reversePlacement} ${readingDirection === "rtl" ? "left" : "right"}`;
}
function PopperRoot(props) {
  const mergedProps = mergeDefaultProps({
    getAnchorRect: (anchor) => anchor?.getBoundingClientRect(),
    placement: "bottom",
    gutter: 0,
    shift: 0,
    flip: true,
    slide: true,
    overlap: false,
    sameWidth: false,
    fitViewport: false,
    hideWhenDetached: false,
    detachedPadding: 0,
    arrowPadding: 4,
    overflowPadding: 8
  }, props);
  const [positionerRef, setPositionerRef] = createSignal();
  const [arrowRef, setArrowRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(mergedProps.placement);
  const anchorRef = () => getAnchorElement(mergedProps.anchorRef?.(), mergedProps.getAnchorRect);
  const {
    direction
  } = useLocale();
  async function updatePosition() {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    const arrowEl = arrowRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const arrowOffset = (arrowEl?.clientHeight || 0) / 2;
    const finalGutter = typeof mergedProps.gutter === "number" ? mergedProps.gutter + arrowOffset : mergedProps.gutter ?? arrowOffset;
    floatingEl.style.setProperty("--kb-popper-content-overflow-padding", `${mergedProps.overflowPadding}px`);
    referenceEl.getBoundingClientRect();
    const middleware = [
      offset2(({
        placement
      }) => {
        const hasAlignment = !!placement.split("-")[1];
        return {
          mainAxis: finalGutter,
          crossAxis: !hasAlignment ? mergedProps.shift : undefined,
          alignmentAxis: mergedProps.shift
        };
      })
    ];
    if (mergedProps.flip !== false) {
      const fallbackPlacements = typeof mergedProps.flip === "string" ? mergedProps.flip.split(" ") : undefined;
      if (fallbackPlacements !== undefined && !fallbackPlacements.every(isValidPlacement)) {
        throw new Error("`flip` expects a spaced-delimited list of placements");
      }
      middleware.push(flip2({
        padding: mergedProps.overflowPadding,
        fallbackPlacements
      }));
    }
    if (mergedProps.slide || mergedProps.overlap) {
      middleware.push(shift2({
        mainAxis: mergedProps.slide,
        crossAxis: mergedProps.overlap,
        padding: mergedProps.overflowPadding
      }));
    }
    middleware.push(size2({
      padding: mergedProps.overflowPadding,
      apply({
        availableWidth,
        availableHeight,
        rects
      }) {
        const referenceWidth = Math.round(rects.reference.width);
        availableWidth = Math.floor(availableWidth);
        availableHeight = Math.floor(availableHeight);
        floatingEl.style.setProperty("--kb-popper-anchor-width", `${referenceWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-width", `${availableWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-height", `${availableHeight}px`);
        if (mergedProps.sameWidth) {
          floatingEl.style.width = `${referenceWidth}px`;
        }
        if (mergedProps.fitViewport) {
          floatingEl.style.maxWidth = `${availableWidth}px`;
          floatingEl.style.maxHeight = `${availableHeight}px`;
        }
      }
    }));
    if (mergedProps.hideWhenDetached) {
      middleware.push(hide2({
        padding: mergedProps.detachedPadding
      }));
    }
    if (arrowEl) {
      middleware.push(arrow2({
        element: arrowEl,
        padding: mergedProps.arrowPadding
      }));
    }
    const pos = await computePosition2(referenceEl, floatingEl, {
      placement: mergedProps.placement,
      strategy: "absolute",
      middleware,
      platform: {
        ...platform,
        isRTL: () => direction() === "rtl"
      }
    });
    setCurrentPlacement(pos.placement);
    mergedProps.onCurrentPlacementChange?.(pos.placement);
    if (!floatingEl) {
      return;
    }
    floatingEl.style.setProperty("--kb-popper-content-transform-origin", getTransformOrigin(pos.placement, direction()));
    const x2 = Math.round(pos.x);
    const y = Math.round(pos.y);
    let visibility;
    if (mergedProps.hideWhenDetached) {
      visibility = pos.middlewareData.hide?.referenceHidden ? "hidden" : "visible";
    }
    Object.assign(floatingEl.style, {
      top: "0",
      left: "0",
      transform: `translate3d(${x2}px, ${y}px, 0)`,
      visibility
    });
    if (arrowEl && pos.middlewareData.arrow) {
      const {
        x: arrowX,
        y: arrowY
      } = pos.middlewareData.arrow;
      const dir = pos.placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [dir]: "100%"
      });
    }
  }
  createEffect(() => {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const cleanupAutoUpdate = autoUpdate(referenceEl, floatingEl, updatePosition, {
      elementResize: typeof ResizeObserver === "function"
    });
    onCleanup(cleanupAutoUpdate);
  });
  createEffect(() => {
    const positioner = positionerRef();
    const content = mergedProps.contentRef?.();
    if (!positioner || !content) {
      return;
    }
    queueMicrotask(() => {
      positioner.style.zIndex = getComputedStyle(content).zIndex;
    });
  });
  const context = {
    currentPlacement,
    contentRef: () => mergedProps.contentRef?.(),
    setPositionerRef,
    setArrowRef
  };
  return createComponent(PopperContext.Provider, {
    value: context,
    get children() {
      return mergedProps.children;
    }
  });
}
function createEscapeKeyDown(props) {
  const handleKeyDown = (event) => {
    if (event.key === EventKey.Escape) {
      props.onEscapeKeyDown?.(event);
    }
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    if (access(props.isDisabled)) {
      return;
    }
    const document2 = props.ownerDocument?.() ?? getDocument();
    document2.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document2.removeEventListener("keydown", handleKeyDown);
    });
  });
}
function createInteractOutside(props, ref) {
  let pointerDownTimeoutId;
  let clickHandler = noop3;
  const ownerDocument = () => getDocument(ref());
  const onPointerDownOutside = (e2) => props.onPointerDownOutside?.(e2);
  const onFocusOutside = (e2) => props.onFocusOutside?.(e2);
  const onInteractOutside = (e2) => props.onInteractOutside?.(e2);
  const isEventOutside = (e2) => {
    const target = e2.target;
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    if (target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
      return false;
    }
    if (!contains(ownerDocument(), target)) {
      return false;
    }
    if (contains(ref(), target)) {
      return false;
    }
    return !props.shouldExcludeElement?.(target);
  };
  const onPointerDown = (e2) => {
    function handler() {
      const container = ref();
      const target = e2.target;
      if (!container || !target || !isEventOutside(e2)) {
        return;
      }
      const handler2 = composeEventHandlers([
        onPointerDownOutside,
        onInteractOutside
      ]);
      target.addEventListener(POINTER_DOWN_OUTSIDE_EVENT, handler2, {
        once: true
      });
      const pointerDownOutsideEvent = new CustomEvent(POINTER_DOWN_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: e2,
          isContextMenu: e2.button === 2 || isCtrlKey(e2) && e2.button === 0
        }
      });
      target.dispatchEvent(pointerDownOutsideEvent);
    }
    if (e2.pointerType === "touch") {
      ownerDocument().removeEventListener("click", handler);
      clickHandler = handler;
      ownerDocument().addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  };
  const onFocusIn = (e2) => {
    const container = ref();
    const target = e2.target;
    if (!container || !target || !isEventOutside(e2)) {
      return;
    }
    const handler = composeEventHandlers([
      onFocusOutside,
      onInteractOutside
    ]);
    target.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    const focusOutsideEvent = new CustomEvent(FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: e2,
        isContextMenu: false
      }
    });
    target.dispatchEvent(focusOutsideEvent);
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    if (access(props.isDisabled)) {
      return;
    }
    pointerDownTimeoutId = window.setTimeout(() => {
      ownerDocument().addEventListener("pointerdown", onPointerDown, true);
    }, 0);
    ownerDocument().addEventListener("focusin", onFocusIn, true);
    onCleanup(() => {
      window.clearTimeout(pointerDownTimeoutId);
      ownerDocument().removeEventListener("click", clickHandler);
      ownerDocument().removeEventListener("pointerdown", onPointerDown, true);
      ownerDocument().removeEventListener("focusin", onFocusIn, true);
    });
  });
}
function useOptionalDismissableLayerContext() {
  return useContext4(DismissableLayerContext);
}
function DismissableLayer(props) {
  let ref;
  const parentContext = useOptionalDismissableLayerContext();
  const [local, others] = splitProps(props, ["ref", "disableOutsidePointerEvents", "excludedElements", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss", "bypassTopMostLayerCheck"]);
  const nestedLayers = /* @__PURE__ */ new Set([]);
  const registerNestedLayer = (element) => {
    nestedLayers.add(element);
    const parentUnregister = parentContext?.registerNestedLayer(element);
    return () => {
      nestedLayers.delete(element);
      parentUnregister?.();
    };
  };
  const shouldExcludeElement = (element) => {
    if (!ref) {
      return false;
    }
    return local.excludedElements?.some((node) => contains(node(), element)) || [...nestedLayers].some((layer) => contains(layer, element));
  };
  const onPointerDownOutside = (e2) => {
    if (!ref || layerStack.isBelowPointerBlockingLayer(ref)) {
      return;
    }
    if (!local.bypassTopMostLayerCheck && !layerStack.isTopMostLayer(ref)) {
      return;
    }
    local.onPointerDownOutside?.(e2);
    local.onInteractOutside?.(e2);
    if (!e2.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    local.onInteractOutside?.(e2);
    if (!e2.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  createInteractOutside({
    shouldExcludeElement,
    onPointerDownOutside,
    onFocusOutside
  }, () => ref);
  createEscapeKeyDown({
    ownerDocument: () => getDocument(ref),
    onEscapeKeyDown: (e2) => {
      if (!ref || !layerStack.isTopMostLayer(ref)) {
        return;
      }
      local.onEscapeKeyDown?.(e2);
      if (!e2.defaultPrevented && local.onDismiss) {
        e2.preventDefault();
        local.onDismiss();
      }
    }
  });
  onMount(() => {
    if (!ref) {
      return;
    }
    layerStack.addLayer({
      node: ref,
      isPointerBlocking: local.disableOutsidePointerEvents,
      dismiss: local.onDismiss
    });
    const unregisterFromParentLayer = parentContext?.registerNestedLayer(ref);
    layerStack.assignPointerEventToLayers();
    layerStack.disableBodyPointerEvents(ref);
    onCleanup(() => {
      if (!ref) {
        return;
      }
      layerStack.removeLayer(ref);
      unregisterFromParentLayer?.();
      layerStack.assignPointerEventToLayers();
      layerStack.restoreBodyPointerEvents(ref);
    });
  });
  createEffect(on([() => ref, () => local.disableOutsidePointerEvents], ([ref2, disableOutsidePointerEvents]) => {
    if (!ref2) {
      return;
    }
    const layer = layerStack.find(ref2);
    if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
      layer.isPointerBlocking = disableOutsidePointerEvents;
      layerStack.assignPointerEventToLayers();
    }
    if (disableOutsidePointerEvents) {
      layerStack.disableBodyPointerEvents(ref2);
    }
    onCleanup(() => {
      layerStack.restoreBodyPointerEvents(ref2);
    });
  }, {
    defer: true
  }));
  const context = {
    registerNestedLayer
  };
  return createComponent(DismissableLayerContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, others));
    }
  });
}
function createDisclosureState(props = {}) {
  const [isOpen, setIsOpen] = createControllableBooleanSignal({
    value: () => access(props.open),
    defaultValue: () => !!access(props.defaultOpen),
    onChange: (value) => props.onOpenChange?.(value)
  });
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    isOpen() ? close() : open();
  };
  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  };
}
function useRadioGroupContext() {
  const context = useContext4(RadioGroupContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");
  }
  return context;
}
function useRadioGroupItemContext() {
  const context = useContext4(RadioGroupItemContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");
  }
  return context;
}
function RadioGroupItem(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "disabled", "onPointerDown"]);
  const [inputId, setInputId] = createSignal();
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
  const isSelected = createMemo(() => {
    return radioGroupContext.isSelectedValue(local.value);
  });
  const isDisabled = createMemo(() => {
    return local.disabled || formControlContext.isDisabled() || false;
  });
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    if (isFocused()) {
      e2.preventDefault();
    }
  };
  const dataset = createMemo(() => ({
    ...formControlContext.dataset(),
    "data-disabled": isDisabled() ? "" : undefined,
    "data-checked": isSelected() ? "" : undefined
  }));
  const context = {
    value: () => local.value,
    dataset,
    isSelected,
    isDisabled,
    inputId,
    labelId,
    descriptionId,
    inputRef,
    select: () => radioGroupContext.setSelectedValue(local.value),
    generateId: createGenerateId(() => others.id),
    registerInput: createRegisterId(setInputId),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId),
    setIsFocused,
    setInputRef
  };
  return createComponent(RadioGroupItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        onPointerDown
      }, dataset, others));
    }
  });
}
function RadioGroupItemControl(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("control")
  }, props);
  const [local, others] = splitProps(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    context.select();
    context.inputRef()?.focus();
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.key === EventKey.Space) {
      context.select();
      context.inputRef()?.focus();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    onClick,
    onKeyDown
  }, () => context.dataset(), others));
}
function RadioGroupItemDescription(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function RadioGroupItemIndicator(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "forceMount"]);
  const [ref, setRef] = createSignal();
  const {
    present
  } = src_default({
    show: () => local.forceMount || context.isSelected(),
    element: () => ref() ?? null
  });
  return createComponent(Show, {
    get when() {
      return present();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs(setRef, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, () => context.dataset(), others));
    }
  });
}
function RadioGroupItemInput(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const radioContext = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: radioContext.generateId("input")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "aria-labelledby", "aria-describedby", "onChange", "onFocus", "onBlur"]);
  const ariaLabelledBy = () => {
    return [
      local["aria-labelledby"],
      radioContext.labelId(),
      local["aria-labelledby"] != null && others["aria-label"] != null ? others.id : undefined
    ].filter(Boolean).join(" ") || undefined;
  };
  const ariaDescribedBy = () => {
    return [local["aria-describedby"], radioContext.descriptionId(), radioGroupContext.ariaDescribedBy()].filter(Boolean).join(" ") || undefined;
  };
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const onChange = (e2) => {
    callHandler(e2, local.onChange);
    e2.stopPropagation();
    if (!isInternalChangeEvent()) {
      radioGroupContext.setSelectedValue(radioContext.value());
      const target = e2.target;
      target.checked = radioContext.isSelected();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    radioContext.setIsFocused(true);
  };
  const onBlur = (e2) => {
    callHandler(e2, local.onBlur);
    radioContext.setIsFocused(false);
  };
  createEffect(on([() => radioContext.isSelected(), () => radioContext.value()], (c2) => {
    if (!c2[0] && c2[1] === radioContext.value())
      return;
    setIsInternalChangeEvent(true);
    const ref = radioContext.inputRef();
    ref?.dispatchEvent(new Event("input", {
      bubbles: true,
      cancelable: true
    }));
    ref?.dispatchEvent(new Event("change", {
      bubbles: true,
      cancelable: true
    }));
  }, {
    defer: true
  }));
  createEffect(() => onCleanup(radioContext.registerInput(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs(radioContext.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "radio",
    get name() {
      return formControlContext.name();
    },
    get value() {
      return radioContext.value();
    },
    get checked() {
      return radioContext.isSelected();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return radioContext.isDisabled();
    },
    get readonly() {
      return formControlContext.isReadOnly();
    },
    get style() {
      return combineStyle({
        ...visuallyHiddenStyles
      }, local.style);
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return ariaDescribedBy();
    },
    onChange,
    onFocus,
    onBlur
  }, () => radioContext.dataset(), others));
}
function RadioGroupItemLabel(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  createEffect(() => onCleanup(context.registerLabel(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    get ["for"]() {
      return context.inputId();
    }
  }, () => context.dataset(), mergedProps));
}
function RadioGroupLabel(props) {
  return createComponent(FormControlLabel, mergeProps({
    as: "span"
  }, props));
}
function RadioGroupRoot(props) {
  let ref;
  const defaultId = `radiogroup-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    orientation: "vertical"
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby"], FORM_CONTROL_PROP_NAMES);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => setSelected(local.defaultValue ?? ""));
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(access(formControlProps.id), others["aria-label"], local["aria-labelledby"]);
  };
  const ariaDescribedBy = () => {
    return formControlContext.getAriaDescribedBy(local["aria-describedby"]);
  };
  const isSelectedValue = (value) => {
    return value === selected();
  };
  const context = {
    ariaDescribedBy,
    isSelectedValue,
    setSelectedValue: (value) => {
      if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
        return;
      }
      setSelected(value);
      if (ref)
        for (const el of ref.querySelectorAll("[type='radio']")) {
          const radio = el;
          radio.checked = isSelectedValue(radio.value);
        }
    }
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "radiogroup",
            get id() {
              return access(formControlProps.id);
            },
            get ["aria-invalid"]() {
              return formControlContext.validationState() === "invalid" || undefined;
            },
            get ["aria-required"]() {
              return formControlContext.isRequired() || undefined;
            },
            get ["aria-disabled"]() {
              return formControlContext.isDisabled() || undefined;
            },
            get ["aria-readonly"]() {
              return formControlContext.isReadOnly() || undefined;
            },
            get ["aria-orientation"]() {
              return local.orientation;
            },
            get ["aria-labelledby"]() {
              return ariaLabelledBy();
            },
            get ["aria-describedby"]() {
              return ariaDescribedBy();
            }
          }, () => formControlContext.dataset(), others));
        }
      });
    }
  });
}
function createSelectableList(props, ref, scrollRef) {
  const collator = createCollator({ usage: "search", sensitivity: "base" });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(props.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(props.collection, ref, collator);
  });
  return createSelectableCollection({
    selectionManager: () => access(props.selectionManager),
    keyboardDelegate: delegate,
    autoFocus: () => access(props.autoFocus),
    deferAutoFocus: () => access(props.deferAutoFocus),
    shouldFocusWrap: () => access(props.shouldFocusWrap),
    disallowEmptySelection: () => access(props.disallowEmptySelection),
    selectOnFocus: () => access(props.selectOnFocus),
    disallowTypeAhead: () => access(props.disallowTypeAhead),
    shouldUseVirtualFocus: () => access(props.shouldUseVirtualFocus),
    allowsTabNavigation: () => access(props.allowsTabNavigation),
    isVirtualized: () => access(props.isVirtualized),
    scrollToKey: (key) => access(props.scrollToKey)?.(key),
    orientation: () => access(props.orientation)
  }, ref);
}
function createFocusScope(props, ref) {
  const [isPaused, setIsPaused] = createSignal(false);
  const focusScope = {
    pause() {
      setIsPaused(true);
    },
    resume() {
      setIsPaused(false);
    }
  };
  let lastFocusedElement = null;
  const onMountAutoFocus = (e2) => props.onMountAutoFocus?.(e2);
  const onUnmountAutoFocus = (e2) => props.onUnmountAutoFocus?.(e2);
  const ownerDocument = () => getDocument(ref());
  const createSentinel = () => {
    const element = ownerDocument().createElement("span");
    element.setAttribute("data-focus-trap", "");
    element.tabIndex = 0;
    Object.assign(element.style, visuallyHiddenStyles);
    return element;
  };
  const tabbables = () => {
    const container = ref();
    if (!container) {
      return [];
    }
    return getAllTabbableIn(container, true).filter((el) => !el.hasAttribute("data-focus-trap"));
  };
  const firstTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[0] : null;
  };
  const lastTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[items.length - 1] : null;
  };
  const shouldPreventUnmountAutoFocus = () => {
    const container = ref();
    if (!container) {
      return false;
    }
    const activeElement = getActiveElement(container);
    if (!activeElement) {
      return false;
    }
    if (contains(container, activeElement)) {
      return false;
    }
    return isFocusable(activeElement);
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container) {
      return;
    }
    focusScopeStack.add(focusScope);
    const previouslyFocusedElement = getActiveElement(container);
    const hasFocusedCandidate = contains(container, previouslyFocusedElement);
    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT_EVENT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      container.dispatchEvent(mountEvent);
      if (!mountEvent.defaultPrevented) {
        setTimeout(() => {
          focusWithoutScrolling(firstTabbable());
          if (getActiveElement(container) === previouslyFocusedElement) {
            focusWithoutScrolling(container);
          }
        }, 0);
      }
    }
    onCleanup(() => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      setTimeout(() => {
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT_EVENT, EVENT_OPTIONS);
        if (shouldPreventUnmountAutoFocus()) {
          unmountEvent.preventDefault();
        }
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        container.dispatchEvent(unmountEvent);
        if (!unmountEvent.defaultPrevented) {
          focusWithoutScrolling(previouslyFocusedElement ?? ownerDocument().body);
        }
        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        focusScopeStack.remove(focusScope);
      }, 0);
    });
  });
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const onFocusIn = (event) => {
      const target = event.target;
      if (target?.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (contains(container, target)) {
        lastFocusedElement = target;
      } else {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      const target = relatedTarget ?? getActiveElement(container);
      if (target?.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (!contains(container, target)) {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    ownerDocument().addEventListener("focusin", onFocusIn);
    ownerDocument().addEventListener("focusout", onFocusOut);
    onCleanup(() => {
      ownerDocument().removeEventListener("focusin", onFocusIn);
      ownerDocument().removeEventListener("focusout", onFocusOut);
    });
  });
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const startSentinel = createSentinel();
    container.insertAdjacentElement("afterbegin", startSentinel);
    const endSentinel = createSentinel();
    container.insertAdjacentElement("beforeend", endSentinel);
    function onFocus(event) {
      const first = firstTabbable();
      const last = lastTabbable();
      if (event.relatedTarget === first) {
        focusWithoutScrolling(last);
      } else {
        focusWithoutScrolling(first);
      }
    }
    startSentinel.addEventListener("focusin", onFocus);
    endSentinel.addEventListener("focusin", onFocus);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.previousSibling === endSentinel) {
          endSentinel.remove();
          container.insertAdjacentElement("beforeend", endSentinel);
        }
        if (mutation.nextSibling === startSentinel) {
          startSentinel.remove();
          container.insertAdjacentElement("afterbegin", startSentinel);
        }
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: false
    });
    onCleanup(() => {
      startSentinel.removeEventListener("focusin", onFocus);
      endSentinel.removeEventListener("focusin", onFocus);
      startSentinel.remove();
      endSentinel.remove();
      observer.disconnect();
    });
  });
}
function createHideOutside(props) {
  createEffect(() => {
    if (access(props.isDisabled)) {
      return;
    }
    onCleanup(ariaHideOutside(access(props.targets), access(props.root)));
  });
}
function ariaHideOutside(targets, root = document.body) {
  const visibleNodes = new Set(targets);
  const hiddenNodes = /* @__PURE__ */ new Set;
  const walk = (root2) => {
    for (const element of root2.querySelectorAll(`[${DATA_LIVE_ANNOUNCER_ATTR}], [${DATA_TOP_LAYER_ATTR}]`)) {
      visibleNodes.add(element);
    }
    const acceptNode = (node) => {
      if (visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") {
        return NodeFilter.FILTER_REJECT;
      }
      for (const target of visibleNodes) {
        if (node.contains(target)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    const walker2 = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, {
      acceptNode
    });
    const acceptRoot = acceptNode(root2);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
      hide3(root2);
    }
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker2.nextNode();
      while (node != null) {
        hide3(node);
        node = walker2.nextNode();
      }
    }
  };
  const hide3 = (node) => {
    const refCount = refCountMap.get(node) ?? 0;
    if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return;
    }
    if (refCount === 0) {
      node.setAttribute("aria-hidden", "true");
    }
    hiddenNodes.add(node);
    refCountMap.set(node, refCount + 1);
  };
  if (observerStack.length) {
    observerStack[observerStack.length - 1].disconnect();
  }
  walk(root);
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0) {
        continue;
      }
      if (![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) {
        for (const node of change.removedNodes) {
          if (node instanceof Element) {
            visibleNodes.delete(node);
            hiddenNodes.delete(node);
          }
        }
        for (const node of change.addedNodes) {
          if ((node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true")) {
            visibleNodes.add(node);
          } else if (node instanceof Element) {
            walk(node);
          }
        }
      }
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  const observerWrapper = {
    observe() {
      observer.observe(root, { childList: true, subtree: true });
    },
    disconnect() {
      observer.disconnect();
    }
  };
  observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (const node of hiddenNodes) {
      const count = refCountMap.get(node);
      if (count == null) {
        return;
      }
      if (count === 1) {
        node.removeAttribute("aria-hidden");
        refCountMap.delete(node);
      } else {
        refCountMap.set(node, count - 1);
      }
    }
    if (observerWrapper === observerStack[observerStack.length - 1]) {
      observerStack.pop();
      if (observerStack.length) {
        observerStack[observerStack.length - 1].observe();
      }
    } else {
      observerStack.splice(observerStack.indexOf(observerWrapper), 1);
    }
  };
}
function useOptionalMenuContext() {
  return useContext4(MenuContext);
}
function useMenuContext() {
  const context = useOptionalMenuContext();
  if (context === undefined) {
    throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");
  }
  return context;
}
function useMenuItemContext() {
  const context = useContext4(MenuItemContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");
  }
  return context;
}
function useMenuRootContext() {
  const context = useContext4(MenuRootContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");
  }
  return context;
}
function MenuItemBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`item-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "textValue", "disabled", "closeOnSelect", "checked", "indeterminate", "onSelect", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [labelRef, setLabelRef] = createSignal();
  const selectionManager = () => menuContext.listState().selectionManager();
  const key = () => others.id;
  const isHighlighted = () => selectionManager().focusedKey() === key();
  const onSelect = () => {
    local.onSelect?.();
    if (local.closeOnSelect) {
      setTimeout(() => {
        menuContext.close(true);
      });
    }
  };
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? labelRef()?.textContent ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    })
  });
  const selectableItem = createSelectableItem({
    key,
    selectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    if (local.disabled) {
      menuContext.onItemLeave(e2);
    } else {
      menuContext.onItemEnter(e2);
      if (!e2.defaultPrevented) {
        focusWithoutScrolling(e2.currentTarget);
        menuContext.listState().selectionManager().setFocused(true);
        menuContext.listState().selectionManager().setFocusedKey(key());
      }
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    menuContext.onItemLeave(e2);
  };
  const onPointerUp = (e2) => {
    callHandler(e2, local.onPointerUp);
    if (!local.disabled && e2.button === 0) {
      onSelect();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    switch (e2.key) {
      case "Enter":
      case " ":
        onSelect();
        break;
    }
  };
  const ariaChecked = createMemo(() => {
    if (local.indeterminate) {
      return "mixed";
    }
    if (local.checked == null) {
      return;
    }
    return local.checked;
  });
  const dataset = createMemo(() => ({
    "data-indeterminate": local.indeterminate ? "" : undefined,
    "data-checked": local.checked && !local.indeterminate ? "" : undefined,
    "data-disabled": local.disabled ? "" : undefined,
    "data-highlighted": isHighlighted() ? "" : undefined
  }));
  const context = {
    isChecked: () => local.checked,
    dataset,
    setLabelRef,
    generateId: createGenerateId(() => others.id),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId)
  };
  return createComponent(MenuItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        get tabIndex() {
          return selectableItem.tabIndex();
        },
        get ["aria-checked"]() {
          return ariaChecked();
        },
        get ["aria-disabled"]() {
          return local.disabled;
        },
        get ["aria-labelledby"]() {
          return labelId();
        },
        get ["aria-describedby"]() {
          return descriptionId();
        },
        get ["data-key"]() {
          return selectableItem.dataKey();
        },
        get onPointerDown() {
          return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
        },
        get onPointerUp() {
          return composeEventHandlers([onPointerUp, selectableItem.onPointerUp]);
        },
        get onClick() {
          return composeEventHandlers([local.onClick, selectableItem.onClick]);
        },
        get onKeyDown() {
          return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
        },
        get onMouseDown() {
          return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
        },
        get onFocus() {
          return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
        },
        onPointerMove,
        onPointerLeave
      }, dataset, others));
    }
  });
}
function MenuCheckboxItem(props) {
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["checked", "defaultChecked", "onChange", "onSelect"]);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (checked) => local.onChange?.(checked),
    isDisabled: () => others.disabled
  });
  const onSelect = () => {
    local.onSelect?.();
    state.toggle();
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemcheckbox",
    get checked() {
      return state.isSelected();
    },
    onSelect
  }, others));
}
function useOptionalMenubarContext() {
  return useContext4(MenubarContext);
}
function MenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId("trigger")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "disabled", "onPointerDown", "onClick", "onKeyDown", "onMouseOver", "onFocus"]);
  let key = () => rootContext.value();
  if (optionalMenubarContext !== undefined) {
    key = () => rootContext.value() ?? local.id;
    if (optionalMenubarContext.lastValue() === undefined)
      optionalMenubarContext.setLastValue(key);
  }
  const tagName = createTagName(() => context.triggerRef(), () => "button");
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && context.triggerRef()?.getAttribute("href") != null;
  });
  createEffect(on(() => optionalMenubarContext?.value(), (value) => {
    if (!isNativeLink())
      return;
    if (value === key())
      context.triggerRef()?.focus();
  }));
  const handleClick = () => {
    if (optionalMenubarContext !== undefined) {
      if (!context.isOpen()) {
        if (!optionalMenubarContext.autoFocusMenu()) {
          optionalMenubarContext.setAutoFocusMenu(true);
        }
        context.open(false);
      } else {
        if (optionalMenubarContext.value() === key())
          optionalMenubarContext.closeMenu();
      }
    } else
      context.toggle(true);
  };
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    e2.currentTarget.dataset.pointerType = e2.pointerType;
    if (!local.disabled && e2.pointerType !== "touch" && e2.button === 0) {
      handleClick();
    }
  };
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!local.disabled) {
      if (e2.currentTarget.dataset.pointerType === "touch")
        handleClick();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (local.disabled) {
      return;
    }
    if (isNativeLink()) {
      switch (e2.key) {
        case "Enter":
        case " ":
          return;
      }
    }
    switch (e2.key) {
      case "Enter":
      case " ":
      case MENU_KEYS.first(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        scrollIntoViewport(e2.currentTarget);
        context.open("first");
        optionalMenubarContext?.setAutoFocusMenu(true);
        optionalMenubarContext?.setValue(key);
        break;
      case MENU_KEYS.last(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        context.open("last");
        break;
      case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
        if (optionalMenubarContext === undefined)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.nextMenu();
        break;
      case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
        if (optionalMenubarContext === undefined)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.previousMenu();
        break;
    }
  };
  const onMouseOver = (e2) => {
    callHandler(e2, local.onMouseOver);
    if (context.triggerRef()?.dataset.pointerType === "touch")
      return;
    if (!local.disabled && optionalMenubarContext !== undefined && optionalMenubarContext.value() !== undefined) {
      optionalMenubarContext.setValue(key);
    }
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    if (optionalMenubarContext !== undefined && e2.currentTarget.dataset.pointerType !== "touch")
      optionalMenubarContext.setValue(key);
  };
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["data-kb-menu-value-trigger"]() {
      return rootContext.value();
    },
    get id() {
      return local.id;
    },
    get disabled() {
      return local.disabled;
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo2(() => !!context.isOpen())() ? context.contentId() : undefined;
    },
    get ["data-highlighted"]() {
      return key() !== undefined && optionalMenubarContext?.value() === key() ? true : undefined;
    },
    get tabIndex() {
      return optionalMenubarContext !== undefined ? optionalMenubarContext.value() === key() || optionalMenubarContext.lastValue() === key() ? 0 : -1 : undefined;
    },
    onPointerDown,
    onMouseOver,
    onClick,
    onKeyDown,
    onFocus,
    role: optionalMenubarContext !== undefined ? "menuitem" : undefined
  }, () => context.dataset(), others));
}
function useOptionalNavigationMenuContext() {
  return useContext4(NavigationMenuContext);
}
function MenuContentBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`content-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onEscapeKeyDown", "onFocusOutside", "onPointerEnter", "onPointerMove", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  let lastPointerX = 0;
  const isRootModalContent = () => {
    return context.parentMenuContext() == null && optionalMenubarContext === undefined && rootContext.isModal();
  };
  const selectableList = createSelectableList({
    selectionManager: context.listState().selectionManager,
    collection: context.listState().collection,
    autoFocus: context.autoFocus,
    deferAutoFocus: true,
    shouldFocusWrap: true,
    disallowTypeAhead: () => !context.listState().selectionManager().isFocused(),
    orientation: () => rootContext.orientation() === "horizontal" ? "vertical" : "horizontal"
  }, () => ref);
  createFocusScope({
    trapFocus: () => isRootModalContent() && context.isOpen(),
    onMountAutoFocus: (event) => {
      if (optionalMenubarContext === undefined)
        local.onOpenAutoFocus?.(event);
    },
    onUnmountAutoFocus: local.onCloseAutoFocus
  }, () => ref);
  const onKeyDown = (e2) => {
    if (!contains(e2.currentTarget, e2.target)) {
      return;
    }
    if (e2.key === "Tab" && context.isOpen()) {
      e2.preventDefault();
    }
    if (optionalMenubarContext !== undefined) {
      if (e2.currentTarget.getAttribute("aria-haspopup") !== "true")
        switch (e2.key) {
          case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.nextMenu();
            break;
          case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
            if (e2.currentTarget.hasAttribute("data-closed"))
              break;
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.previousMenu();
            break;
        }
    }
  };
  const onEscapeKeyDown = (e2) => {
    local.onEscapeKeyDown?.(e2);
    optionalMenubarContext?.setAutoFocusMenu(false);
    context.close(true);
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    if (rootContext.isModal()) {
      e2.preventDefault();
    }
  };
  const onPointerEnter = (e2) => {
    callHandler(e2, local.onPointerEnter);
    if (!context.isOpen()) {
      return;
    }
    context.parentMenuContext()?.listState().selectionManager().setFocused(false);
    context.parentMenuContext()?.listState().selectionManager().setFocusedKey(undefined);
  };
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const target = e2.target;
    const pointerXHasChanged = lastPointerX !== e2.clientX;
    if (contains(e2.currentTarget, target) && pointerXHasChanged) {
      context.setPointerDir(e2.clientX > lastPointerX ? "right" : "left");
      lastPointerX = e2.clientX;
    }
  };
  createEffect(() => onCleanup(context.registerContentId(local.id)));
  const commonAttributes = {
    ref: mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref),
    role: "menu",
    get id() {
      return local.id;
    },
    get tabIndex() {
      return selectableList.tabIndex();
    },
    get "aria-labelledby"() {
      return context.triggerId();
    },
    onKeyDown: composeEventHandlers([local.onKeyDown, selectableList.onKeyDown, onKeyDown]),
    onMouseDown: composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]),
    onFocusIn: composeEventHandlers([local.onFocusIn, selectableList.onFocusIn]),
    onFocusOut: composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]),
    onPointerEnter,
    onPointerMove,
    get "data-orientation"() {
      return rootContext.orientation();
    }
  };
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return optionalNavigationMenuContext === undefined || context.parentMenuContext() != null;
        },
        get fallback() {
          return createComponent(Polymorphic, mergeProps({
            as: "div"
          }, () => context.dataset(), commonAttributes, others));
        },
        get children() {
          return createComponent(Popper.Positioner, {
            get children() {
              return createComponent(DismissableLayer, mergeProps({
                get disableOutsidePointerEvents() {
                  return memo2(() => !!isRootModalContent())() && context.isOpen();
                },
                get excludedElements() {
                  return [context.triggerRef];
                },
                bypassTopMostLayerCheck: true,
                get style() {
                  return combineStyle({
                    "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                    position: "relative"
                  }, local.style);
                },
                onEscapeKeyDown,
                onFocusOutside,
                get onDismiss() {
                  return context.close;
                }
              }, () => context.dataset(), commonAttributes, others));
            }
          });
        }
      });
    }
  });
}
function MenuContent(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["ref"]);
  src_default2({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && rootContext.preventScroll()
  });
  return createComponent(MenuContentBase, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, others));
}
function useMenuGroupContext() {
  const context = useContext4(MenuGroupContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");
  }
  return context;
}
function MenuGroup(props) {
  const rootContext = useMenuRootContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`group-${createUniqueId()}`)
  }, props);
  const [labelId, setLabelId] = createSignal();
  const context = {
    generateId: createGenerateId(() => mergedProps.id),
    registerLabelId: createRegisterId(setLabelId)
  };
  return createComponent(MenuGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        get ["aria-labelledby"]() {
          return labelId();
        }
      }, mergedProps));
    }
  });
}
function MenuGroupLabel(props) {
  const context = useMenuGroupContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerLabelId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    get id() {
      return local.id;
    },
    "aria-hidden": "true"
  }, others));
}
function MenuIcon(props) {
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    children: "▼"
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}
function MenuItem(props) {
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitem",
    closeOnSelect: true
  }, props));
}
function MenuItemDescription(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerDescription(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuItemIndicator(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  return createComponent(Show, {
    get when() {
      return local.forceMount || context.isChecked();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function MenuItemLabel(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id"]);
  createEffect(() => onCleanup(context.registerLabel(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setLabelRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuPortal(props) {
  const context = useMenuContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
function useMenuRadioGroupContext() {
  const context = useContext4(MenuRadioGroupContext);
  if (context === undefined) {
    throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");
  }
  return context;
}
function MenuRadioGroup(props) {
  const rootContext = useMenuRootContext();
  const defaultId = rootContext.generateId(`radiogroup-${createUniqueId()}`);
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "defaultValue", "onChange", "disabled"]);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const context = {
    isDisabled: () => local.disabled,
    isSelectedValue: (value) => value === selected(),
    setSelectedValue: setSelected
  };
  return createComponent(MenuRadioGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(MenuGroup, others);
    }
  });
}
function MenuRadioItem(props) {
  const context = useMenuRadioGroupContext();
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "onSelect"]);
  const onSelect = () => {
    local.onSelect?.();
    context.setSelectedValue(local.value);
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemradio",
    get checked() {
      return context.isSelectedValue(local.value);
    },
    onSelect
  }, others));
}
function getPointerGraceArea(placement, event, contentEl) {
  const basePlacement = placement.split("-")[0];
  const contentRect = contentEl.getBoundingClientRect();
  const polygon = [];
  const pointerX = event.clientX;
  const pointerY = event.clientY;
  switch (basePlacement) {
    case "top":
      polygon.push([pointerX, pointerY + 5]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      break;
    case "right":
      polygon.push([pointerX - 5, pointerY]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      break;
    case "bottom":
      polygon.push([pointerX, pointerY - 5]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      break;
    case "left":
      polygon.push([pointerX + 5, pointerY]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      break;
  }
  return polygon;
}
function isPointerInGraceArea(event, area) {
  if (!area) {
    return false;
  }
  return isPointInPolygon([event.clientX, event.clientY], area);
}
function Menu(props) {
  const rootContext = useMenuRootContext();
  const parentDomCollectionContext = useOptionalDomCollectionContext();
  const parentMenuContext = useOptionalMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const mergedProps = mergeDefaultProps({
    placement: rootContext.orientation() === "horizontal" ? "bottom-start" : "right-start"
  }, props);
  const [local, others] = splitProps(mergedProps, ["open", "defaultOpen", "onOpenChange"]);
  let pointerGraceTimeoutId = 0;
  let pointerGraceIntent = null;
  let pointerDir = "right";
  const [triggerId, setTriggerId] = createSignal();
  const [contentId, setContentId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(true);
  const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
  const [nestedMenus, setNestedMenus] = createSignal([]);
  const [items, setItems] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const {
    present: contentPresent
  } = src_default({
    show: () => rootContext.forceMount() || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const listState = createListState({
    selectionMode: "none",
    dataSource: items
  });
  const open = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
  };
  const close = (recursively = false) => {
    disclosureState.close();
    if (recursively && parentMenuContext) {
      parentMenuContext.close(true);
    }
  };
  const toggle = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.toggle();
  };
  const _focusContent = () => {
    const content = contentRef();
    if (content) {
      focusWithoutScrolling(content);
      listState.selectionManager().setFocused(true);
      listState.selectionManager().setFocusedKey(undefined);
    }
  };
  const focusContent = () => {
    if (optionalNavigationMenuContext != null)
      setTimeout(() => _focusContent());
    else
      _focusContent();
  };
  const registerNestedMenu = (element) => {
    setNestedMenus((prev) => [...prev, element]);
    const parentUnregister = parentMenuContext?.registerNestedMenu(element);
    return () => {
      setNestedMenus((prev) => removeItemFromArray(prev, element));
      parentUnregister?.();
    };
  };
  const isPointerMovingToSubmenu = (e2) => {
    const isMovingTowards = pointerDir === pointerGraceIntent?.side;
    return isMovingTowards && isPointerInGraceArea(e2, pointerGraceIntent?.area);
  };
  const onItemEnter = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  const onItemLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      return;
    }
    focusContent();
  };
  const onTriggerLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => {
      return !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal());
    },
    targets: () => [contentRef(), ...nestedMenus()].filter(Boolean)
  });
  createEffect(() => {
    const contentEl = contentRef();
    if (!contentEl || !parentMenuContext) {
      return;
    }
    const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);
    onCleanup(() => {
      parentUnregister();
    });
  });
  createEffect(() => {
    if (parentMenuContext !== undefined)
      return;
    optionalMenubarContext?.registerMenu(rootContext.value(), [contentRef(), ...nestedMenus()]);
  });
  createEffect(() => {
    if (parentMenuContext !== undefined || optionalMenubarContext === undefined)
      return;
    if (optionalMenubarContext.value() === rootContext.value()) {
      triggerRef()?.focus();
      if (optionalMenubarContext.autoFocusMenu())
        open(true);
    } else
      close();
  });
  createEffect(() => {
    if (parentMenuContext !== undefined || optionalMenubarContext === undefined)
      return;
    if (disclosureState.isOpen())
      optionalMenubarContext.setValue(rootContext.value());
  });
  onCleanup(() => {
    if (parentMenuContext !== undefined)
      return;
    optionalMenubarContext?.unregisterMenu(rootContext.value());
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : undefined,
    "data-closed": !disclosureState.isOpen() ? "" : undefined
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    contentPresent,
    nestedMenus,
    currentPlacement,
    pointerGraceTimeoutId: () => pointerGraceTimeoutId,
    autoFocus: focusStrategy,
    listState: () => listState,
    parentMenuContext: () => parentMenuContext,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
    setTriggerRef,
    setContentRef,
    open,
    close,
    toggle,
    focusContent,
    onItemEnter,
    onItemLeave,
    onTriggerLeave,
    setPointerDir: (dir) => pointerDir = dir,
    setPointerGraceTimeoutId: (id) => pointerGraceTimeoutId = id,
    setPointerGraceIntent: (intent) => pointerGraceIntent = intent,
    registerNestedMenu,
    registerItemToParentDomCollection: parentDomCollectionContext?.registerItem,
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId)
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(MenuContext.Provider, {
        value: context,
        get children() {
          return createComponent(Show, {
            when: optionalNavigationMenuContext === undefined,
            get fallback() {
              return others.children;
            },
            get children() {
              return createComponent(Popper, mergeProps({
                anchorRef: triggerRef,
                contentRef,
                onCurrentPlacementChange: setCurrentPlacement
              }, others));
            }
          });
        }
      });
    }
  });
}
function MenuSub(props) {
  const {
    direction
  } = useLocale();
  return createComponent(Menu, mergeProps({
    get placement() {
      return direction() === "rtl" ? "left-start" : "right-start";
    },
    flip: true
  }, props));
}
function MenuSubContent(props) {
  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps(props, ["onFocusOutside", "onKeyDown"]);
  const {
    direction
  } = useLocale();
  const onOpenAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onCloseAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    const target = e2.target;
    if (!contains(context.triggerRef(), target)) {
      context.close();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    const isKeyDownInside = contains(e2.currentTarget, e2.target);
    const isCloseKey = SUB_CLOSE_KEYS.close(direction(), rootContext.orientation()).includes(e2.key);
    const isSubMenu = context.parentMenuContext() != null;
    if (isKeyDownInside && isCloseKey && isSubMenu) {
      context.close();
      focusWithoutScrolling(context.triggerRef());
    }
  };
  return createComponent(MenuContentBase, mergeProps({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onFocusOutside,
    onKeyDown
  }, others));
}
function MenuSubTrigger(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`sub-trigger-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "textValue", "disabled", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  let openTimeoutId = null;
  const clearOpenTimeout = () => {
    if (isServer2) {
      return;
    }
    if (openTimeoutId) {
      window.clearTimeout(openTimeoutId);
    }
    openTimeoutId = null;
  };
  const {
    direction
  } = useLocale();
  const key = () => local.id;
  const parentSelectionManager = () => {
    const parentMenuContext = context.parentMenuContext();
    if (parentMenuContext == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    return parentMenuContext.listState().selectionManager();
  };
  const collection = () => context.listState().collection();
  const isHighlighted = () => parentSelectionManager().focusedKey() === key();
  const selectableItem = createSelectableItem({
    key,
    selectionManager: parentSelectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!context.isOpen() && !local.disabled) {
      context.open(true);
    }
  };
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const parentMenuContext = context.parentMenuContext();
    parentMenuContext?.onItemEnter(e2);
    if (e2.defaultPrevented) {
      return;
    }
    if (local.disabled) {
      parentMenuContext?.onItemLeave(e2);
      return;
    }
    if (!context.isOpen() && !openTimeoutId) {
      context.parentMenuContext()?.setPointerGraceIntent(null);
      openTimeoutId = window.setTimeout(() => {
        context.open(false);
        clearOpenTimeout();
      }, 100);
    }
    parentMenuContext?.onItemEnter(e2);
    if (!e2.defaultPrevented) {
      if (context.listState().selectionManager().isFocused()) {
        context.listState().selectionManager().setFocused(false);
        context.listState().selectionManager().setFocusedKey(undefined);
      }
      focusWithoutScrolling(e2.currentTarget);
      parentMenuContext?.listState().selectionManager().setFocused(true);
      parentMenuContext?.listState().selectionManager().setFocusedKey(key());
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    clearOpenTimeout();
    const parentMenuContext = context.parentMenuContext();
    const contentEl = context.contentRef();
    if (contentEl) {
      parentMenuContext?.setPointerGraceIntent({
        area: getPointerGraceArea(context.currentPlacement(), e2, contentEl),
        side: context.currentPlacement().split("-")[0]
      });
      window.clearTimeout(parentMenuContext?.pointerGraceTimeoutId());
      const pointerGraceTimeoutId = window.setTimeout(() => {
        parentMenuContext?.setPointerGraceIntent(null);
      }, 300);
      parentMenuContext?.setPointerGraceTimeoutId(pointerGraceTimeoutId);
    } else {
      parentMenuContext?.onTriggerLeave(e2);
      if (e2.defaultPrevented) {
        return;
      }
      parentMenuContext?.setPointerGraceIntent(null);
    }
    parentMenuContext?.onItemLeave(e2);
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    if (SUB_OPEN_KEYS.open(direction(), rootContext.orientation()).includes(e2.key)) {
      e2.stopPropagation();
      e2.preventDefault();
      parentSelectionManager().setFocused(false);
      parentSelectionManager().setFocusedKey(undefined);
      if (!context.isOpen()) {
        context.open("first");
      }
      context.focusContent();
      context.listState().selectionManager().setFocused(true);
      context.listState().selectionManager().setFocusedKey(collection().getFirstKey());
    }
  };
  createEffect(() => {
    if (context.registerItemToParentDomCollection == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    const unregister = context.registerItemToParentDomCollection({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    });
    onCleanup(unregister);
  });
  createEffect(on(() => context.parentMenuContext()?.pointerGraceTimeoutId(), (pointerGraceTimer) => {
    onCleanup(() => {
      window.clearTimeout(pointerGraceTimer);
      context.parentMenuContext()?.setPointerGraceIntent(null);
    });
  }));
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  onCleanup(() => {
    clearOpenTimeout();
  });
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        context.setTriggerRef(el);
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    },
    role: "menuitem",
    get tabIndex() {
      return selectableItem.tabIndex();
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo2(() => !!context.isOpen())() ? context.contentId() : undefined;
    },
    get ["aria-disabled"]() {
      return local.disabled;
    },
    get ["data-key"]() {
      return selectableItem.dataKey();
    },
    get ["data-highlighted"]() {
      return isHighlighted() ? "" : undefined;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : undefined;
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([onClick, selectableItem.onClick]);
    },
    get onKeyDown() {
      return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
    },
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    },
    onPointerMove,
    onPointerLeave
  }, () => context.dataset(), others));
}
function MenuRoot(props) {
  const optionalMenubarContext = useOptionalMenubarContext();
  const defaultId = `menu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    modal: true
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "modal", "preventScroll", "forceMount", "open", "defaultOpen", "onOpenChange", "value", "orientation"]);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const context = {
    isModal: () => local.modal ?? true,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    forceMount: () => local.forceMount ?? false,
    generateId: createGenerateId(() => local.id),
    value: () => local.value,
    orientation: () => local.orientation ?? optionalMenubarContext?.orientation() ?? "horizontal"
  };
  return createComponent(MenuRootContext.Provider, {
    value: context,
    get children() {
      return createComponent(Menu, mergeProps({
        get open() {
          return disclosureState.isOpen();
        },
        get onOpenChange() {
          return disclosureState.setIsOpen;
        }
      }, others));
    }
  });
}
function SeparatorRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    orientation: "horizontal"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "orientation"]);
  const tagName = createTagName(() => ref, () => "hr");
  return createComponent(Polymorphic, mergeProps({
    as: "hr",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get role() {
      return tagName() !== "hr" ? "separator" : undefined;
    },
    get ["aria-orientation"]() {
      return local.orientation === "vertical" ? "vertical" : undefined;
    },
    get ["data-orientation"]() {
      return local.orientation;
    }
  }, others));
}
function DropdownMenuContent(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"]);
  let hasInteractedOutside = false;
  const onCloseAutoFocus = (e2) => {
    local.onCloseAutoFocus?.(e2);
    if (!hasInteractedOutside) {
      focusWithoutScrolling(context.triggerRef());
    }
    hasInteractedOutside = false;
    e2.preventDefault();
  };
  const onInteractOutside = (e2) => {
    local.onInteractOutside?.(e2);
    if (!rootContext.isModal() || e2.detail.isContextMenu) {
      hasInteractedOutside = true;
    }
  };
  return createComponent(MenuContent, mergeProps({
    onCloseAutoFocus,
    onInteractOutside
  }, others));
}
function DropdownMenuRoot(props) {
  const defaultId = `dropdownmenu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  return createComponent(MenuRoot, mergedProps);
}
function Search() {
  return _tmpl$2();
}
function Trash() {
  return _tmpl$22();
}
function ChevronDown() {
  return _tmpl$3();
}
function ArrowUp() {
  return _tmpl$4();
}
function ArrowDown() {
  return _tmpl$5();
}
function ArrowLeft() {
  return (() => {
    var _el$6 = _tmpl$5();
    _el$6.style.setProperty("transform", "rotate(90deg)");
    return _el$6;
  })();
}
function ArrowRight() {
  return (() => {
    var _el$7 = _tmpl$5();
    _el$7.style.setProperty("transform", "rotate(-90deg)");
    return _el$7;
  })();
}
function Sun() {
  return _tmpl$6();
}
function Moon() {
  return _tmpl$7();
}
function Monitor() {
  return _tmpl$8();
}
function Wifi() {
  return _tmpl$9();
}
function Offline() {
  return _tmpl$0();
}
function Settings() {
  return _tmpl$1();
}
function PiPIcon() {
  return _tmpl$10();
}
function Copier() {
  return _tmpl$11();
}
function Pencil() {
  return _tmpl$12();
}
function CopiedCopier(props) {
  return (() => {
    var _el$15 = _tmpl$13(), _el$16 = _el$15.firstChild;
    createRenderEffect(() => setAttribute(_el$16, "stroke", props.theme === "dark" ? "#12B76A" : "#027A48"));
    return _el$15;
  })();
}
function ErrorCopier() {
  return _tmpl$14();
}
function List() {
  return _tmpl$15();
}
function Check(props) {
  return [createComponent(Show, {
    get when() {
      return props.checked;
    },
    get children() {
      var _el$19 = _tmpl$13(), _el$20 = _el$19.firstChild;
      createRenderEffect(() => setAttribute(_el$20, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$19;
    }
  }), createComponent(Show, {
    get when() {
      return !props.checked;
    },
    get children() {
      var _el$21 = _tmpl$16(), _el$22 = _el$21.firstChild;
      createRenderEffect(() => setAttribute(_el$22, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$21;
    }
  })];
}
function CheckCircle() {
  return _tmpl$17();
}
function LoadingCircle() {
  return _tmpl$18();
}
function XCircle() {
  return _tmpl$19();
}
function PauseCircle() {
  return _tmpl$20();
}
function TanstackLogo() {
  const id = createUniqueId();
  return (() => {
    var _el$27 = _tmpl$21(), _el$28 = _el$27.firstChild, _el$29 = _el$28.nextSibling, _el$30 = _el$29.nextSibling, _el$31 = _el$30.firstChild, _el$32 = _el$30.nextSibling, _el$33 = _el$32.firstChild, _el$34 = _el$32.nextSibling, _el$35 = _el$34.nextSibling, _el$36 = _el$35.firstChild, _el$37 = _el$35.nextSibling, _el$38 = _el$37.firstChild, _el$39 = _el$37.nextSibling, _el$40 = _el$39.nextSibling, _el$41 = _el$40.firstChild, _el$42 = _el$40.nextSibling, _el$43 = _el$42.firstChild, _el$44 = _el$42.nextSibling, _el$45 = _el$44.nextSibling, _el$46 = _el$45.firstChild, _el$47 = _el$45.nextSibling, _el$48 = _el$47.firstChild, _el$49 = _el$47.nextSibling, _el$50 = _el$49.nextSibling, _el$51 = _el$50.firstChild, _el$52 = _el$50.nextSibling, _el$53 = _el$52.firstChild, _el$54 = _el$52.nextSibling, _el$55 = _el$54.nextSibling, _el$56 = _el$55.firstChild, _el$57 = _el$55.nextSibling, _el$58 = _el$57.firstChild, _el$59 = _el$57.nextSibling, _el$60 = _el$59.nextSibling, _el$61 = _el$60.firstChild, _el$62 = _el$60.nextSibling, _el$63 = _el$62.firstChild, _el$64 = _el$62.nextSibling, _el$65 = _el$64.firstChild, _el$66 = _el$65.nextSibling, _el$67 = _el$66.nextSibling, _el$68 = _el$67.nextSibling, _el$69 = _el$68.nextSibling, _el$70 = _el$64.nextSibling, _el$71 = _el$70.firstChild, _el$72 = _el$70.nextSibling, _el$73 = _el$72.firstChild, _el$74 = _el$72.nextSibling, _el$75 = _el$74.firstChild, _el$76 = _el$75.nextSibling, _el$77 = _el$76.nextSibling, _el$78 = _el$77.firstChild, _el$79 = _el$78.nextSibling, _el$80 = _el$79.nextSibling, _el$81 = _el$80.nextSibling, _el$82 = _el$81.nextSibling, _el$83 = _el$82.nextSibling, _el$84 = _el$83.nextSibling, _el$85 = _el$84.nextSibling, _el$86 = _el$85.nextSibling, _el$87 = _el$86.nextSibling, _el$88 = _el$87.nextSibling, _el$89 = _el$88.nextSibling, _el$90 = _el$74.nextSibling, _el$91 = _el$90.firstChild, _el$92 = _el$90.nextSibling, _el$93 = _el$92.firstChild, _el$94 = _el$92.nextSibling, _el$95 = _el$94.firstChild, _el$96 = _el$95.nextSibling, _el$97 = _el$94.nextSibling, _el$98 = _el$97.firstChild, _el$99 = _el$97.nextSibling, _el$100 = _el$99.firstChild, _el$101 = _el$99.nextSibling, _el$102 = _el$101.firstChild, _el$103 = _el$102.nextSibling, _el$104 = _el$103.nextSibling, _el$105 = _el$104.nextSibling, _el$106 = _el$105.nextSibling, _el$107 = _el$106.nextSibling, _el$108 = _el$107.nextSibling, _el$109 = _el$108.nextSibling, _el$110 = _el$109.nextSibling, _el$111 = _el$110.nextSibling, _el$112 = _el$111.nextSibling, _el$113 = _el$112.nextSibling, _el$114 = _el$113.nextSibling, _el$115 = _el$114.nextSibling, _el$116 = _el$115.nextSibling, _el$117 = _el$116.nextSibling, _el$118 = _el$117.nextSibling, _el$119 = _el$118.nextSibling;
    setAttribute(_el$28, "id", `a-${id}`);
    setAttribute(_el$29, "fill", `url(#a-${id})`);
    setAttribute(_el$31, "id", `am-${id}`);
    setAttribute(_el$32, "id", `b-${id}`);
    setAttribute(_el$33, "filter", `url(#am-${id})`);
    setAttribute(_el$34, "mask", `url(#b-${id})`);
    setAttribute(_el$36, "id", `ah-${id}`);
    setAttribute(_el$37, "id", `k-${id}`);
    setAttribute(_el$38, "filter", `url(#ah-${id})`);
    setAttribute(_el$39, "mask", `url(#k-${id})`);
    setAttribute(_el$41, "id", `ae-${id}`);
    setAttribute(_el$42, "id", `j-${id}`);
    setAttribute(_el$43, "filter", `url(#ae-${id})`);
    setAttribute(_el$44, "mask", `url(#j-${id})`);
    setAttribute(_el$46, "id", `ai-${id}`);
    setAttribute(_el$47, "id", `i-${id}`);
    setAttribute(_el$48, "filter", `url(#ai-${id})`);
    setAttribute(_el$49, "mask", `url(#i-${id})`);
    setAttribute(_el$51, "id", `aj-${id}`);
    setAttribute(_el$52, "id", `h-${id}`);
    setAttribute(_el$53, "filter", `url(#aj-${id})`);
    setAttribute(_el$54, "mask", `url(#h-${id})`);
    setAttribute(_el$56, "id", `ag-${id}`);
    setAttribute(_el$57, "id", `g-${id}`);
    setAttribute(_el$58, "filter", `url(#ag-${id})`);
    setAttribute(_el$59, "mask", `url(#g-${id})`);
    setAttribute(_el$61, "id", `af-${id}`);
    setAttribute(_el$62, "id", `f-${id}`);
    setAttribute(_el$63, "filter", `url(#af-${id})`);
    setAttribute(_el$64, "mask", `url(#f-${id})`);
    setAttribute(_el$68, "id", `m-${id}`);
    setAttribute(_el$69, "fill", `url(#m-${id})`);
    setAttribute(_el$71, "id", `ak-${id}`);
    setAttribute(_el$72, "id", `e-${id}`);
    setAttribute(_el$73, "filter", `url(#ak-${id})`);
    setAttribute(_el$74, "mask", `url(#e-${id})`);
    setAttribute(_el$75, "id", `n-${id}`);
    setAttribute(_el$76, "fill", `url(#n-${id})`);
    setAttribute(_el$78, "id", `r-${id}`);
    setAttribute(_el$79, "fill", `url(#r-${id})`);
    setAttribute(_el$80, "id", `s-${id}`);
    setAttribute(_el$81, "fill", `url(#s-${id})`);
    setAttribute(_el$82, "id", `q-${id}`);
    setAttribute(_el$83, "fill", `url(#q-${id})`);
    setAttribute(_el$84, "id", `p-${id}`);
    setAttribute(_el$85, "fill", `url(#p-${id})`);
    setAttribute(_el$86, "id", `o-${id}`);
    setAttribute(_el$87, "fill", `url(#o-${id})`);
    setAttribute(_el$88, "id", `l-${id}`);
    setAttribute(_el$89, "fill", `url(#l-${id})`);
    setAttribute(_el$91, "id", `al-${id}`);
    setAttribute(_el$92, "id", `d-${id}`);
    setAttribute(_el$93, "filter", `url(#al-${id})`);
    setAttribute(_el$94, "mask", `url(#d-${id})`);
    setAttribute(_el$95, "id", `u-${id}`);
    setAttribute(_el$96, "fill", `url(#u-${id})`);
    setAttribute(_el$98, "id", `ad-${id}`);
    setAttribute(_el$99, "id", `c-${id}`);
    setAttribute(_el$100, "filter", `url(#ad-${id})`);
    setAttribute(_el$101, "mask", `url(#c-${id})`);
    setAttribute(_el$102, "id", `t-${id}`);
    setAttribute(_el$103, "fill", `url(#t-${id})`);
    setAttribute(_el$104, "id", `v-${id}`);
    setAttribute(_el$105, "stroke", `url(#v-${id})`);
    setAttribute(_el$106, "id", `aa-${id}`);
    setAttribute(_el$107, "stroke", `url(#aa-${id})`);
    setAttribute(_el$108, "id", `w-${id}`);
    setAttribute(_el$109, "stroke", `url(#w-${id})`);
    setAttribute(_el$110, "id", `ac-${id}`);
    setAttribute(_el$111, "stroke", `url(#ac-${id})`);
    setAttribute(_el$112, "id", `ab-${id}`);
    setAttribute(_el$113, "stroke", `url(#ab-${id})`);
    setAttribute(_el$114, "id", `y-${id}`);
    setAttribute(_el$115, "stroke", `url(#y-${id})`);
    setAttribute(_el$116, "id", `x-${id}`);
    setAttribute(_el$117, "stroke", `url(#x-${id})`);
    setAttribute(_el$118, "id", `z-${id}`);
    setAttribute(_el$119, "stroke", `url(#z-${id})`);
    return _el$27;
  })();
}
function chunkArray(array, size3) {
  let i2 = 0;
  const result = [];
  while (i2 < array.length) {
    result.push(array.slice(i2, i2 + size3));
    i2 = i2 + size3;
  }
  return result;
}
function isIterable(x2) {
  return Symbol.iterator in x2;
}
function Explorer(props) {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  const [expanded, setExpanded] = createSignal((props.defaultExpanded || []).includes(props.label));
  const toggleExpanded = () => setExpanded((old) => !old);
  const [expandedPages, setExpandedPages] = createSignal([]);
  const subEntries = createMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.map((d, i2) => ({
        label: i2.toString(),
        value: d
      }));
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      if (props.value instanceof Map) {
        return Array.from(props.value, ([key, val]) => ({
          label: key,
          value: val
        }));
      }
      return Array.from(props.value, (val, i2) => ({
        label: i2.toString(),
        value: val
      }));
    } else if (typeof props.value === "object" && props.value !== null) {
      return Object.entries(props.value).map(([key, val]) => ({
        label: key,
        value: val
      }));
    }
    return [];
  });
  const type = createMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      return "Iterable";
    } else if (typeof props.value === "object" && props.value !== null) {
      return "object";
    }
    return typeof props.value;
  });
  const subEntryPages = createMemo(() => chunkArray(subEntries(), 100));
  const currentDataPath = props.dataPath ?? [];
  const inputId = createUniqueId();
  return (() => {
    var _el$6 = _tmpl$72();
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length;
      },
      get children() {
        return [(() => {
          var _el$7 = _tmpl$82(), _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$0 = _el$9.nextSibling, _el$1 = _el$0.nextSibling, _el$10 = _el$1.nextSibling, _el$11 = _el$10.firstChild;
          _el$8.$$click = () => toggleExpanded();
          insert(_el$8, createComponent(Expander, {
            get expanded() {
              return expanded();
            }
          }), _el$9);
          insert(_el$0, () => props.label);
          insert(_el$10, () => String(type()).toLowerCase() === "iterable" ? "(Iterable) " : "", _el$11);
          insert(_el$10, () => subEntries().length, _el$11);
          insert(_el$10, () => subEntries().length > 1 ? `items` : `item`, null);
          insert(_el$7, createComponent(Show, {
            get when() {
              return props.editable;
            },
            get children() {
              var _el$12 = _tmpl$72();
              insert(_el$12, createComponent(CopyButton, {
                get value() {
                  return props.value;
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return props.itemsDeletable && props.activeQuery !== undefined;
                },
                get children() {
                  return createComponent(DeleteItemButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return type() === "array" && props.activeQuery !== undefined;
                },
                get children() {
                  return createComponent(ClearArrayButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return memo2(() => !!!!props.onEdit)() && !serialize(props.value).meta;
                },
                get children() {
                  var _el$13 = _tmpl$62();
                  _el$13.$$click = () => {
                    props.onEdit?.();
                  };
                  insert(_el$13, createComponent(Pencil, {}));
                  createRenderEffect(() => className(_el$13, styles().actionButton));
                  return _el$13;
                }
              }), null);
              createRenderEffect(() => className(_el$12, styles().actions));
              return _el$12;
            }
          }), null);
          createRenderEffect((_p$) => {
            var _v$3 = styles().expanderButtonContainer, _v$4 = styles().expanderButton, _v$5 = expanded() ? "true" : "false", _v$6 = styles().info;
            _v$3 !== _p$.e && className(_el$7, _p$.e = _v$3);
            _v$4 !== _p$.t && className(_el$8, _p$.t = _v$4);
            _v$5 !== _p$.a && setAttribute(_el$8, "aria-expanded", _p$.a = _v$5);
            _v$6 !== _p$.o && className(_el$10, _p$.o = _v$6);
            return _p$;
          }, {
            e: undefined,
            t: undefined,
            a: undefined,
            o: undefined
          });
          return _el$7;
        })(), createComponent(Show, {
          get when() {
            return expanded();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return subEntryPages().length === 1;
              },
              get children() {
                var _el$14 = _tmpl$72();
                insert(_el$14, createComponent(Key, {
                  get each() {
                    return subEntries();
                  },
                  by: (item) => item.label,
                  children: (entry) => {
                    return createComponent(Explorer, {
                      get defaultExpanded() {
                        return props.defaultExpanded;
                      },
                      get label() {
                        return entry().label;
                      },
                      get value() {
                        return entry().value;
                      },
                      get editable() {
                        return props.editable;
                      },
                      get dataPath() {
                        return [...currentDataPath, entry().label];
                      },
                      get activeQuery() {
                        return props.activeQuery;
                      },
                      get itemsDeletable() {
                        return type() === "array" || type() === "Iterable" || type() === "object";
                      }
                    });
                  }
                }));
                createRenderEffect(() => className(_el$14, styles().subEntry));
                return _el$14;
              }
            }), createComponent(Show, {
              get when() {
                return subEntryPages().length > 1;
              },
              get children() {
                var _el$15 = _tmpl$72();
                insert(_el$15, createComponent(Index, {
                  get each() {
                    return subEntryPages();
                  },
                  children: (entries2, index) => (() => {
                    var _el$21 = _tmpl$102(), _el$22 = _el$21.firstChild, _el$23 = _el$22.firstChild, _el$24 = _el$23.firstChild, _el$28 = _el$24.nextSibling, _el$26 = _el$28.nextSibling, _el$29 = _el$26.nextSibling;
                    _el$29.nextSibling;
                    _el$23.$$click = () => setExpandedPages((old) => old.includes(index) ? old.filter((d) => d !== index) : [...old, index]);
                    insert(_el$23, createComponent(Expander, {
                      get expanded() {
                        return expandedPages().includes(index);
                      }
                    }), _el$24);
                    insert(_el$23, index * 100, _el$28);
                    insert(_el$23, index * 100 + 100 - 1, _el$29);
                    insert(_el$22, createComponent(Show, {
                      get when() {
                        return expandedPages().includes(index);
                      },
                      get children() {
                        var _el$30 = _tmpl$72();
                        insert(_el$30, createComponent(Key, {
                          get each() {
                            return entries2();
                          },
                          by: (entry) => entry.label,
                          children: (entry) => createComponent(Explorer, {
                            get defaultExpanded() {
                              return props.defaultExpanded;
                            },
                            get label() {
                              return entry().label;
                            },
                            get value() {
                              return entry().value;
                            },
                            get editable() {
                              return props.editable;
                            },
                            get dataPath() {
                              return [...currentDataPath, entry().label];
                            },
                            get activeQuery() {
                              return props.activeQuery;
                            }
                          })
                        }));
                        createRenderEffect(() => className(_el$30, styles().subEntry));
                        return _el$30;
                      }
                    }), null);
                    createRenderEffect((_p$) => {
                      var _v$1 = styles().entry, _v$10 = styles().expanderButton;
                      _v$1 !== _p$.e && className(_el$22, _p$.e = _v$1);
                      _v$10 !== _p$.t && className(_el$23, _p$.t = _v$10);
                      return _p$;
                    }, {
                      e: undefined,
                      t: undefined
                    });
                    return _el$21;
                  })()
                }));
                createRenderEffect(() => className(_el$15, styles().subEntry));
                return _el$15;
              }
            })];
          }
        })];
      }
    }), null);
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length === 0;
      },
      get children() {
        var _el$16 = _tmpl$110(), _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild;
        setAttribute(_el$17, "for", inputId);
        insert(_el$17, () => props.label, _el$18);
        insert(_el$16, createComponent(Show, {
          get when() {
            return memo2(() => !!(props.editable && props.activeQuery !== undefined))() && (type() === "string" || type() === "number" || type() === "boolean");
          },
          get fallback() {
            return (() => {
              var _el$31 = _tmpl$02();
              insert(_el$31, () => displayValue(props.value));
              createRenderEffect(() => className(_el$31, styles().value));
              return _el$31;
            })();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return memo2(() => !!(props.editable && props.activeQuery !== undefined))() && (type() === "string" || type() === "number");
              },
              get children() {
                var _el$19 = _tmpl$92();
                _el$19.addEventListener("change", (changeEvent) => {
                  const oldData = props.activeQuery.state.data;
                  const newData = updateNestedDataByPath(oldData, currentDataPath, type() === "number" ? changeEvent.target.valueAsNumber : changeEvent.target.value);
                  queryClient.setQueryData(props.activeQuery.queryKey, newData);
                });
                setAttribute(_el$19, "id", inputId);
                createRenderEffect((_p$) => {
                  var _v$7 = type() === "number" ? "number" : "text", _v$8 = clsx(styles().value, styles().editableInput);
                  _v$7 !== _p$.e && setAttribute(_el$19, "type", _p$.e = _v$7);
                  _v$8 !== _p$.t && className(_el$19, _p$.t = _v$8);
                  return _p$;
                }, {
                  e: undefined,
                  t: undefined
                });
                createRenderEffect(() => _el$19.value = props.value);
                return _el$19;
              }
            }), createComponent(Show, {
              get when() {
                return type() === "boolean";
              },
              get children() {
                var _el$20 = _tmpl$02();
                insert(_el$20, createComponent(ToggleValueButton, {
                  get activeQuery() {
                    return props.activeQuery;
                  },
                  dataPath: currentDataPath,
                  get value() {
                    return props.value;
                  }
                }), null);
                insert(_el$20, () => displayValue(props.value), null);
                createRenderEffect(() => className(_el$20, clsx(styles().value, styles().actions, styles().editableInput)));
                return _el$20;
              }
            })];
          }
        }), null);
        insert(_el$16, createComponent(Show, {
          get when() {
            return props.editable && props.itemsDeletable && props.activeQuery !== undefined;
          },
          get children() {
            return createComponent(DeleteItemButton, {
              get activeQuery() {
                return props.activeQuery;
              },
              dataPath: currentDataPath
            });
          }
        }), null);
        createRenderEffect((_p$) => {
          var _v$9 = styles().row, _v$0 = styles().label;
          _v$9 !== _p$.e && className(_el$16, _p$.e = _v$9);
          _v$0 !== _p$.t && className(_el$17, _p$.t = _v$0);
          return _p$;
        }, {
          e: undefined,
          t: undefined
        });
        return _el$16;
      }
    }), null);
    createRenderEffect(() => className(_el$6, styles().entry));
    return _el$6;
  })();
}
var isClient, isDev, noop2 = () => {
  return;
}, isNonNullable = (i2) => i2 != null, filterNonNullable = (arr) => arr.filter(isNonNullable), access = (v2) => typeof v2 === "function" && !v2.length ? v2() : v2, asArray = (value) => Array.isArray(value) ? value : value ? [value] : [], tryOnCleanup, createLocalStorage, addClearMethod = (storage) => {
  if (typeof storage.clear === "function") {
    return storage;
  }
  storage.clear = () => {
    let key;
    while (key = storage.key(0)) {
      storage.removeItem(key);
    }
  };
  return storage;
}, serializeCookieOptions = (options) => {
  if (!options) {
    return "";
  }
  let memo22 = "";
  for (const key in options) {
    if (!options.hasOwnProperty(key)) {
      continue;
    }
    const value = options[key];
    memo22 += value instanceof Date ? `; ${key}=${value.toUTCString()}` : typeof value === "boolean" ? `; ${key}` : `; ${key}=${value}`;
  }
  return memo22;
}, cookieStorage, firstBreakpoint = 1024, secondBreakpoint = 796, thirdBreakpoint = 700, BUTTON_POSITION = "bottom-right", POSITION = "bottom", THEME_PREFERENCE = "system", INITIAL_IS_OPEN = false, DEFAULT_HEIGHT = 500, PIP_DEFAULT_HEIGHT = 500, DEFAULT_WIDTH = 500, DEFAULT_SORT_FN_NAME, DEFAULT_SORT_ORDER = 1, DEFAULT_MUTATION_SORT_FN_NAME, QueryDevtoolsContext, PipOpenError, PiPContext, PiPProvider = (props) => {
  const [pipWindow, setPipWindow] = createSignal(null);
  const closePipWindow = () => {
    const w = pipWindow();
    if (w != null) {
      w.close();
      setPipWindow(null);
    }
  };
  const requestPipWindow = (width, height) => {
    if (pipWindow() != null) {
      return;
    }
    const pip = window.open("", "TSQD-Devtools-Panel", `width=${width},height=${height},popup`);
    if (!pip) {
      throw new PipOpenError("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");
    }
    pip.document.head.innerHTML = "";
    pip.document.body.innerHTML = "";
    clearDelegatedEvents(pip.document);
    pip.document.title = "TanStack Query Devtools";
    pip.document.body.style.margin = "0";
    pip.addEventListener("pagehide", () => {
      props.setLocalStore("pip_open", "false");
      setPipWindow(null);
    });
    [...(useQueryDevtoolsContext().shadowDOMTarget || document).styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
        const style2 = document.createElement("style");
        const style_node = styleSheet.ownerNode;
        let style_id = "";
        if (style_node && "id" in style_node) {
          style_id = style_node.id;
        }
        if (style_id) {
          style2.setAttribute("id", style_id);
        }
        style2.textContent = cssRules;
        pip.document.head.appendChild(style2);
      } catch (e2) {
        const link = document.createElement("link");
        if (styleSheet.href == null) {
          return;
        }
        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media.toString();
        link.href = styleSheet.href;
        pip.document.head.appendChild(link);
      }
    });
    delegateEvents(["focusin", "focusout", "pointermove", "keydown", "pointerdown", "pointerup", "click", "mousedown", "input"], pip.document);
    props.setLocalStore("pip_open", "true");
    setPipWindow(pip);
  };
  createEffect(() => {
    const pip_open = props.localStore.pip_open ?? "false";
    if (pip_open === "true" && !props.disabled) {
      try {
        requestPipWindow(Number(window.innerWidth), Number(props.localStore.height || PIP_DEFAULT_HEIGHT));
      } catch (error) {
        if (error instanceof PipOpenError) {
          console.error(error.message);
          props.setLocalStore("pip_open", "false");
          props.setLocalStore("open", "false");
          return;
        }
        throw error;
      }
    }
  });
  createEffect(() => {
    const gooberStyles = (useQueryDevtoolsContext().shadowDOMTarget || document).querySelector("#_goober");
    const w = pipWindow();
    if (gooberStyles && w) {
      const observer = new MutationObserver(() => {
        const pip_style = (useQueryDevtoolsContext().shadowDOMTarget || w.document).querySelector("#_goober");
        if (pip_style) {
          pip_style.textContent = gooberStyles.textContent;
        }
      });
      observer.observe(gooberStyles, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
      });
      onCleanup(() => {
        observer.disconnect();
      });
    }
  });
  const value = createMemo(() => ({
    pipWindow: pipWindow(),
    requestPipWindow,
    closePipWindow,
    disabled: props.disabled ?? false
  }));
  return createComponent(PiPContext.Provider, {
    value,
    get children() {
      return props.children;
    }
  });
}, usePiPWindow = () => {
  const context = createMemo(() => {
    const ctx = useContext4(PiPContext);
    if (!ctx) {
      throw new Error("usePiPWindow must be used within a PiPProvider");
    }
    return ctx();
  });
  return context;
}, ThemeContext, characterMap, chars, allAccents, rankings, defaultKeyAttributes, e, t2 = (t22) => typeof window == "object" ? ((t22 ? t22.querySelector("#_goober") : window._goober) || Object.assign((t22 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t22 || e, l, a, n, o2 = (e2, t22) => {
  let r2 = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    n2[0] == "@" ? n2[1] == "i" ? r2 = n2 + " " + c2 + ";" : l2 += n2[1] == "f" ? o2(c2, n2) : n2 + "{" + o2(c2, n2[1] == "k" ? "" : t22) + "}" : typeof c2 == "object" ? l2 += o2(c2, t22 ? t22.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : c2 != null && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o2.p ? o2.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r2 + (t22 && a2 ? t22 + "{" + a2 + "}" : a2) + l2;
}, c, s = (e2) => {
  if (typeof e2 == "object") {
    let t22 = "";
    for (let r2 in e2)
      t22 += r2 + s(e2[r2]);
    return t22;
  }
  return e2;
}, i = (e2, t22, r2, i2, p2) => {
  let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r3 = 11;
    for (;t3 < e3.length; )
      r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r3;
  })(u2));
  if (!c[d]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r3, o22 = [{}];
      for (;t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o22.shift() : t4[3] ? (r3 = t4[3].replace(n, " ").trim(), o22.unshift(o22[0][r3] = o22[0][r3] || {})) : o22[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o22[0];
    })(e2);
    c[d] = o2(p2 ? { ["@keyframes " + d]: t3 } : t3, r2 ? "" : "." + d);
  }
  let f = r2 && c.g ? c.g : null;
  return r2 && (c.g = c[d]), ((e3, t3, r3, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : t3.data.indexOf(e3) === -1 && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
  })(c[d], t22, i2, f), d;
}, p = (e2, t22, r2) => e2.reduce((e3, l2, a2) => {
  let n2 = t22[a2];
  if (n2 && n2.call) {
    let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && typeof e4 == "object" ? e4.props ? "" : o2(e4, "") : e4 === false ? "" : e4;
  }
  return e3 + l2 + (n2 == null ? "" : n2);
}, ""), defaultElementPredicate, TransitionGroup = (props) => {
  const classnames = createClassnames(props);
  return createListTransition(resolveElements(() => props.children).toArray, {
    appear: props.appear,
    onChange({ added, removed, finishRemoved, list }) {
      const classes = classnames();
      for (const el of added) {
        enterTransition(classes, props, el);
      }
      const toMove = [];
      for (const el of list) {
        if (el.isConnected && (el instanceof HTMLElement || el instanceof SVGElement)) {
          toMove.push({ el, rect: el.getBoundingClientRect() });
        }
      }
      queueMicrotask(() => {
        const moved = [];
        for (const { el, rect } of toMove) {
          if (el.isConnected) {
            const newRect = el.getBoundingClientRect(), dX = rect.left - newRect.left, dY = rect.top - newRect.top;
            if (dX || dY) {
              el.style.transform = `translate(${dX}px, ${dY}px)`;
              el.style.transitionDuration = "0s";
              moved.push(el);
            }
          }
        }
        document.body.offsetHeight;
        for (const el of moved) {
          let endTransition2 = function(e2) {
            if (e2.target === el || /transform$/.test(e2.propertyName)) {
              el.removeEventListener("transitionend", endTransition2);
              el.classList.remove(...classes.move);
            }
          };
          el.classList.add(...classes.move);
          el.style.transform = el.style.transitionDuration = "";
          el.addEventListener("transitionend", endTransition2);
        }
      });
      for (const el of removed) {
        exitTransition(classes, props, el, () => finishRemoved([el]));
      }
    }
  });
}, FALLBACK2, extractCSSregex, EventKey, supportsPreventScrollCached = null, focusableElements, tabbableElements, FOCUSABLE_ELEMENT_SELECTOR, TABBABLE_ELEMENT_SELECTOR, transitionsByElement, transitionCallbacks, visuallyHiddenStyles, FORM_CONTROL_PROP_NAMES, FormControlContext, __defProp2, __export2 = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, DomCollectionContext, RTL_SCRIPTS, RTL_LANGS, currentLocale, listeners, I18nContext, cache, Selection, SelectionManager = class {
  collection;
  state;
  constructor(collection, state) {
    this.collection = collection;
    this.state = state;
  }
  selectionMode() {
    return this.state.selectionMode();
  }
  disallowEmptySelection() {
    return this.state.disallowEmptySelection();
  }
  selectionBehavior() {
    return this.state.selectionBehavior();
  }
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  isFocused() {
    return this.state.isFocused();
  }
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  focusedKey() {
    return this.state.focusedKey();
  }
  setFocusedKey(key) {
    if (key == null || this.collection().getItem(key)) {
      this.state.setFocusedKey(key);
    }
  }
  selectedKeys() {
    return this.state.selectedKeys();
  }
  isSelected(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return false;
    }
    return this.state.selectedKeys().has(retrievedKey);
  }
  isEmpty() {
    return this.state.selectedKeys().size === 0;
  }
  isSelectAll() {
    if (this.isEmpty()) {
      return false;
    }
    const selectedKeys = this.state.selectedKeys();
    return this.getAllSelectableKeys().every((k) => selectedKeys.has(k));
  }
  firstSelectedKey() {
    let first;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemBeforeFirst = item?.index != null && first?.index != null && item.index < first.index;
      if (!first || isItemBeforeFirst) {
        first = item;
      }
    }
    return first?.key;
  }
  lastSelectedKey() {
    let last;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemAfterLast = item?.index != null && last?.index != null && item.index > last.index;
      if (!last || isItemAfterLast) {
        last = item;
      }
    }
    return last?.key;
  }
  extendSelection(toKey) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      this.replaceSelection(toKey);
      return;
    }
    const retrievedToKey = this.getKey(toKey);
    if (retrievedToKey == null) {
      return;
    }
    const selectedKeys = this.state.selectedKeys();
    const anchorKey = selectedKeys.anchorKey || retrievedToKey;
    const selection = new Selection(selectedKeys, anchorKey, retrievedToKey);
    for (const key of this.getKeyRange(anchorKey, selectedKeys.currentKey || retrievedToKey)) {
      selection.delete(key);
    }
    for (const key of this.getKeyRange(retrievedToKey, anchorKey)) {
      if (this.canSelectItem(key)) {
        selection.add(key);
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    const fromItem = this.collection().getItem(from);
    const toItem = this.collection().getItem(to);
    if (fromItem && toItem) {
      if (fromItem.index != null && toItem.index != null && fromItem.index <= toItem.index) {
        return this.getKeyRangeInternal(from, to);
      }
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    const keys2 = [];
    let key = from;
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item") {
        keys2.push(key);
      }
      if (key === to) {
        return keys2;
      }
      key = this.collection().getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    const item = this.collection().getItem(key);
    if (!item) {
      return key;
    }
    if (!item || item.type !== "item") {
      return null;
    }
    return item.key;
  }
  toggleSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const keys2 = new Selection(this.state.selectedKeys());
    if (keys2.has(retrievedKey)) {
      keys2.delete(retrievedKey);
    } else if (this.canSelectItem(retrievedKey)) {
      keys2.add(retrievedKey);
      keys2.anchorKey = retrievedKey;
      keys2.currentKey = retrievedKey;
    }
    if (this.disallowEmptySelection() && keys2.size === 0) {
      return;
    }
    this.state.setSelectedKeys(keys2);
  }
  replaceSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const selection = this.canSelectItem(retrievedKey) ? new Selection([retrievedKey], retrievedKey, retrievedKey) : new Selection;
    this.state.setSelectedKeys(selection);
  }
  setSelectedKeys(keys2) {
    if (this.selectionMode() === "none") {
      return;
    }
    const selection = new Selection;
    for (const key of keys2) {
      const retrievedKey = this.getKey(key);
      if (retrievedKey != null) {
        selection.add(retrievedKey);
        if (this.selectionMode() === "single") {
          break;
        }
      }
    }
    this.state.setSelectedKeys(selection);
  }
  selectAll() {
    if (this.selectionMode() === "multiple") {
      this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()));
    }
  }
  clearSelection() {
    const selectedKeys = this.state.selectedKeys();
    if (!this.disallowEmptySelection() && selectedKeys.size > 0) {
      this.state.setSelectedKeys(new Selection);
    }
  }
  toggleSelectAll() {
    if (this.isSelectAll()) {
      this.clearSelection();
    } else {
      this.selectAll();
    }
  }
  select(key, e2) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection()) {
        this.toggleSelection(key);
      } else {
        this.replaceSelection(key);
      }
    } else if (this.selectionBehavior() === "toggle" || e2 && e2.pointerType === "touch") {
      this.toggleSelection(key);
    } else {
      this.replaceSelection(key);
    }
  }
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys()) {
      return true;
    }
    const selectedKeys = this.selectedKeys();
    if (selection.size !== selectedKeys.size) {
      return false;
    }
    for (const key of selection) {
      if (!selectedKeys.has(key)) {
        return false;
      }
    }
    for (const key of selectedKeys) {
      if (!selection.has(key)) {
        return false;
      }
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const item = this.collection().getItem(key);
    return item != null && !item.disabled;
  }
  isDisabled(key) {
    const item = this.collection().getItem(key);
    return !item || item.disabled;
  }
  getAllSelectableKeys() {
    const keys2 = [];
    const addKeys = (key) => {
      while (key != null) {
        if (this.canSelectItem(key)) {
          const item = this.collection().getItem(key);
          if (!item) {
            continue;
          }
          if (item.type === "item") {
            keys2.push(key);
          }
        }
        key = this.collection().getKeyAfter(key);
      }
    };
    addKeys(this.collection().getFirstKey());
    return keys2;
  }
}, ListCollection, access2 = (v2) => typeof v2 === "function" ? v2() : v2, createPresence = (props) => {
  const refStyles = createMemo(() => {
    const element = access2(props.element);
    if (!element)
      return;
    return getComputedStyle(element);
  });
  const getAnimationName = () => {
    return refStyles()?.animationName ?? "none";
  };
  const [presentState, setPresentState] = createSignal(access2(props.show) ? "present" : "hidden");
  let animationName = "none";
  createEffect((prevShow) => {
    const show = access2(props.show);
    untrack(() => {
      if (prevShow === show)
        return show;
      const prevAnimationName = animationName;
      const currentAnimationName = getAnimationName();
      if (show) {
        setPresentState("present");
      } else if (currentAnimationName === "none" || refStyles()?.display === "none") {
        setPresentState("hidden");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (prevShow === true && isAnimating) {
          setPresentState("hiding");
        } else {
          setPresentState("hidden");
        }
      }
    });
    return show;
  });
  createEffect(() => {
    const element = access2(props.element);
    if (!element)
      return;
    const handleAnimationStart = (event) => {
      if (event.target === element) {
        animationName = getAnimationName();
      }
    };
    const handleAnimationEnd = (event) => {
      const currentAnimationName = getAnimationName();
      const isCurrentAnimation = currentAnimationName.includes(event.animationName);
      if (event.target === element && isCurrentAnimation && presentState() === "hiding") {
        setPresentState("hidden");
      }
    };
    element.addEventListener("animationstart", handleAnimationStart);
    element.addEventListener("animationcancel", handleAnimationEnd);
    element.addEventListener("animationend", handleAnimationEnd);
    onCleanup(() => {
      element.removeEventListener("animationstart", handleAnimationStart);
      element.removeEventListener("animationcancel", handleAnimationEnd);
      element.removeEventListener("animationend", handleAnimationEnd);
    });
  });
  return {
    present: () => presentState() === "present" || presentState() === "hiding",
    state: presentState
  };
}, presence_default, src_default, DATA_TOP_LAYER_ATTR = "data-kb-top-layer", originalBodyPointerEvents, hasDisabledBodyPointerEvents = false, layers, layerStack, button_exports, BUTTON_INPUT_TYPES, Button, sides, min, max, round, floor, createCoords = (v2) => ({
  x: v2,
  y: v2
}), oppositeSideMap, oppositeAlignmentMap, computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? undefined : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0;i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset: reset2
    } = await fn({
      x: x2,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset2 && resetCount <= 50) {
      resetCount++;
      if (typeof reset2 === "object") {
        if (reset2.placement) {
          statefulPlacement = reset2.placement;
        }
        if (reset2.rects) {
          rects = reset2.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset2.rects;
        }
        ({
          x: x2,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x: x2,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
}, arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? undefined : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? undefined : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp2(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
}), flip = function(options) {
  if (options === undefined) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? undefined : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? undefined : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? undefined : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? undefined : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? undefined : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
}, hide = function(options) {
  if (options === undefined) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
}, offset = function(options) {
  if (options === undefined) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? undefined : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
}, shift = function(options) {
  if (options === undefined) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x22,
              y: y2
            } = _ref;
            return {
              x: x22,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp2(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp2(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y
        }
      };
    }
  };
}, size = function(options) {
  if (options === undefined) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? undefined : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
}, noOffsets, getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
}, platform, offset2, shift2, flip2, size2, hide2, arrow2, computePosition2 = (reference, floating, options) => {
  const cache2 = /* @__PURE__ */ new Map;
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache2
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
}, PopperContext, _tmpl$, DEFAULT_SIZE = 30, HALF_DEFAULT_SIZE, ROTATION_DEG, REVERSE_BASE_PLACEMENT, Popper, POINTER_DOWN_OUTSIDE_EVENT = "interactOutside.pointerDownOutside", FOCUS_OUTSIDE_EVENT = "interactOutside.focusOutside", DismissableLayerContext, radio_group_exports, RadioGroupContext, RadioGroupItemContext, RadioGroup, ListKeyboardDelegate = class {
  collection;
  ref;
  collator;
  constructor(collection, ref, collator) {
    this.collection = collection;
    this.ref = ref;
    this.collator = collator;
  }
  getKeyBelow(key) {
    let keyAfter = this.collection().getKeyAfter(key);
    while (keyAfter != null) {
      const item = this.collection().getItem(keyAfter);
      if (item && item.type === "item" && !item.disabled) {
        return keyAfter;
      }
      keyAfter = this.collection().getKeyAfter(keyAfter);
    }
  }
  getKeyAbove(key) {
    let keyBefore = this.collection().getKeyBefore(key);
    while (keyBefore != null) {
      const item = this.collection().getItem(keyBefore);
      if (item && item.type === "item" && !item.disabled) {
        return keyBefore;
      }
      keyBefore = this.collection().getKeyBefore(keyBefore);
    }
  }
  getFirstKey() {
    let key = this.collection().getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyAfter(key);
    }
  }
  getLastKey() {
    let key = this.collection().getLastKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyBefore(key);
    }
  }
  getItem(key) {
    return this.ref?.()?.querySelector(`[data-key="${key}"]`) ?? null;
  }
  getKeyPageAbove(key) {
    const menu = this.ref?.();
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.max(0, item.offsetTop + item.offsetHeight - menu.offsetHeight);
    let keyAbove = key;
    while (keyAbove && item && item.offsetTop > pageY) {
      keyAbove = this.getKeyAbove(keyAbove);
      item = keyAbove != null ? this.getItem(keyAbove) : null;
    }
    return keyAbove;
  }
  getKeyPageBelow(key) {
    const menu = this.ref?.();
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.min(menu.scrollHeight, item.offsetTop - item.offsetHeight + menu.offsetHeight);
    let keyBelow = key;
    while (keyBelow && item && item.offsetTop < pageY) {
      keyBelow = this.getKeyBelow(keyBelow);
      item = keyBelow != null ? this.getItem(keyBelow) : null;
    }
    return keyBelow;
  }
  getKeyForSearch(search, fromKey) {
    const collator = this.collator?.();
    if (!collator) {
      return;
    }
    let key = fromKey != null ? this.getKeyBelow(fromKey) : this.getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item) {
        const substring = item.textValue.slice(0, search.length);
        if (item.textValue && collator.compare(substring, search) === 0) {
          return key;
        }
      }
      key = this.getKeyBelow(key);
    }
  }
}, AUTOFOCUS_ON_MOUNT_EVENT = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT_EVENT = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS, focusScopeStack, DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer", refCountMap, observerStack, activeStyles, createStyle = (props) => {
  createEffect(() => {
    const style2 = access2(props.style) ?? {};
    const properties = access2(props.properties) ?? [];
    const originalStyles = {};
    for (const key in style2) {
      originalStyles[key] = props.element.style[key];
    }
    const activeStyle = activeStyles.get(props.key);
    if (activeStyle) {
      activeStyle.activeCount++;
    } else {
      activeStyles.set(props.key, {
        activeCount: 1,
        originalStyles,
        properties: properties.map((property) => property.key)
      });
    }
    Object.assign(props.element.style, props.style);
    for (const property of properties) {
      props.element.style.setProperty(property.key, property.value);
    }
    onCleanup(() => {
      const activeStyle2 = activeStyles.get(props.key);
      if (!activeStyle2)
        return;
      if (activeStyle2.activeCount !== 1) {
        activeStyle2.activeCount--;
        return;
      }
      activeStyles.delete(props.key);
      for (const [key, value] of Object.entries(activeStyle2.originalStyles)) {
        props.element.style[key] = value;
      }
      for (const property of activeStyle2.properties) {
        props.element.style.removeProperty(property);
      }
      if (props.element.style.length === 0) {
        props.element.removeAttribute("style");
      }
      props.cleanup?.();
    });
  });
}, style_default, getScrollDimensions = (element, axis) => {
  switch (axis) {
    case "x":
      return [element.clientWidth, element.scrollLeft, element.scrollWidth];
    case "y":
      return [element.clientHeight, element.scrollTop, element.scrollHeight];
  }
}, isScrollContainer = (element, axis) => {
  const styles = getComputedStyle(element);
  const overflow = axis === "x" ? styles.overflowX : styles.overflowY;
  return overflow === "auto" || overflow === "scroll" || element.tagName === "HTML" && overflow === "visible";
}, getScrollAtLocation = (location, axis, stopAt) => {
  const directionFactor = axis === "x" && window.getComputedStyle(location).direction === "rtl" ? -1 : 1;
  let currentElement = location;
  let availableScroll = 0;
  let availableScrollTop = 0;
  let wrapperReached = false;
  do {
    const [clientSize, scrollOffset, scrollSize] = getScrollDimensions(currentElement, axis);
    const scrolled = scrollSize - clientSize - directionFactor * scrollOffset;
    if ((scrollOffset !== 0 || scrolled !== 0) && isScrollContainer(currentElement, axis)) {
      availableScroll += scrolled;
      availableScrollTop += scrollOffset;
    }
    if (currentElement === (stopAt ?? document.documentElement)) {
      wrapperReached = true;
    } else {
      currentElement = currentElement._$host ?? currentElement.parentElement;
    }
  } while (currentElement && !wrapperReached);
  return [availableScroll, availableScrollTop];
}, preventScrollStack, setPreventScrollStack, isActive = (id) => preventScrollStack().indexOf(id) === preventScrollStack().length - 1, createPreventScroll = (props) => {
  const defaultedProps = mergeProps({
    element: null,
    enabled: true,
    hideScrollbar: true,
    preventScrollbarShift: true,
    preventScrollbarShiftMode: "padding",
    restoreScrollPosition: true,
    allowPinchZoom: false
  }, props);
  const preventScrollId = createUniqueId();
  let currentTouchStart = [0, 0];
  let currentTouchStartAxis = null;
  let currentTouchStartDelta = null;
  createEffect(() => {
    if (!access2(defaultedProps.enabled))
      return;
    setPreventScrollStack((stack) => [...stack, preventScrollId]);
    onCleanup(() => {
      setPreventScrollStack((stack) => stack.filter((id) => id !== preventScrollId));
    });
  });
  createEffect(() => {
    if (!access2(defaultedProps.enabled) || !access2(defaultedProps.hideScrollbar))
      return;
    const { body } = document;
    const scrollbarWidth = window.innerWidth - body.offsetWidth;
    if (access2(defaultedProps.preventScrollbarShift)) {
      const style2 = { overflow: "hidden" };
      const properties = [];
      if (scrollbarWidth > 0) {
        if (access2(defaultedProps.preventScrollbarShiftMode) === "padding") {
          style2.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${scrollbarWidth}px)`;
        } else {
          style2.marginRight = `calc(${window.getComputedStyle(body).marginRight} + ${scrollbarWidth}px)`;
        }
        properties.push({
          key: "--scrollbar-width",
          value: `${scrollbarWidth}px`
        });
      }
      const offsetTop = window.scrollY;
      const offsetLeft = window.scrollX;
      style_default({
        key: "prevent-scroll",
        element: body,
        style: style2,
        properties,
        cleanup: () => {
          if (access2(defaultedProps.restoreScrollPosition) && scrollbarWidth > 0) {
            window.scrollTo(offsetLeft, offsetTop);
          }
        }
      });
    } else {
      style_default({
        key: "prevent-scroll",
        element: body,
        style: {
          overflow: "hidden"
        }
      });
    }
  });
  createEffect(() => {
    if (!isActive(preventScrollId) || !access2(defaultedProps.enabled))
      return;
    document.addEventListener("wheel", maybePreventWheel, {
      passive: false
    });
    document.addEventListener("touchstart", logTouchStart, {
      passive: false
    });
    document.addEventListener("touchmove", maybePreventTouch, {
      passive: false
    });
    onCleanup(() => {
      document.removeEventListener("wheel", maybePreventWheel);
      document.removeEventListener("touchstart", logTouchStart);
      document.removeEventListener("touchmove", maybePreventTouch);
    });
  });
  const logTouchStart = (event) => {
    currentTouchStart = getTouchXY(event);
    currentTouchStartAxis = null;
    currentTouchStartDelta = null;
  };
  const maybePreventWheel = (event) => {
    const target = event.target;
    const wrapper = access2(defaultedProps.element);
    const delta = getDeltaXY(event);
    const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
    const axisDelta = axis === "x" ? delta[0] : delta[1];
    const resultsInScroll = wouldScroll(target, axis, axisDelta, wrapper);
    let shouldCancel;
    if (wrapper && contains2(wrapper, target)) {
      shouldCancel = !resultsInScroll;
    } else {
      shouldCancel = true;
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
  const maybePreventTouch = (event) => {
    const wrapper = access2(defaultedProps.element);
    const target = event.target;
    let shouldCancel;
    if (event.touches.length === 2) {
      shouldCancel = !access2(defaultedProps.allowPinchZoom);
    } else {
      if (currentTouchStartAxis == null || currentTouchStartDelta === null) {
        const delta = getTouchXY(event).map((touch, i2) => currentTouchStart[i2] - touch);
        const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
        currentTouchStartAxis = axis;
        currentTouchStartDelta = axis === "x" ? delta[0] : delta[1];
      }
      if (target.type === "range") {
        shouldCancel = false;
      } else {
        const wouldResultInScroll = wouldScroll(target, currentTouchStartAxis, currentTouchStartDelta, wrapper);
        if (wrapper && contains2(wrapper, target)) {
          shouldCancel = !wouldResultInScroll;
        } else {
          shouldCancel = true;
        }
      }
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
}, getDeltaXY = (event) => [
  event.deltaX,
  event.deltaY
], getTouchXY = (event) => event.changedTouches[0] ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0], wouldScroll = (target, axis, delta, wrapper) => {
  const targetInWrapper = wrapper !== null && contains2(wrapper, target);
  const [availableScroll, availableScrollTop] = getScrollAtLocation(target, axis, targetInWrapper ? wrapper : undefined);
  if (delta > 0 && Math.abs(availableScroll) <= 1) {
    return false;
  }
  if (delta < 0 && Math.abs(availableScrollTop) < 1) {
    return false;
  }
  return true;
}, contains2 = (wrapper, target) => {
  if (wrapper.contains(target))
    return true;
  let currentElement = target;
  while (currentElement) {
    if (currentElement === wrapper)
      return true;
    currentElement = currentElement._$host ?? currentElement.parentElement;
  }
  return false;
}, preventScroll_default, src_default2, MenuContext, MenuItemContext, MenuRootContext, MenubarContext, MENUBAR_KEYS, MENU_KEYS, NavigationMenuContext, MenuGroupContext, MenuRadioGroupContext, SUB_CLOSE_KEYS, SELECTION_KEYS, SUB_OPEN_KEYS, separator_exports, Separator, dropdown_menu_exports, DropdownMenu, tokens, _tmpl$2, _tmpl$22, _tmpl$3, _tmpl$4, _tmpl$5, _tmpl$6, _tmpl$7, _tmpl$8, _tmpl$9, _tmpl$0, _tmpl$1, _tmpl$10, _tmpl$11, _tmpl$12, _tmpl$13, _tmpl$14, _tmpl$15, _tmpl$16, _tmpl$17, _tmpl$18, _tmpl$19, _tmpl$20, _tmpl$21, _tmpl$23, _tmpl$24, _tmpl$32, _tmpl$42, _tmpl$52, _tmpl$62, _tmpl$72, _tmpl$82, _tmpl$92, _tmpl$02, _tmpl$110, _tmpl$102, Expander = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  return (() => {
    var _el$ = _tmpl$23();
    createRenderEffect(() => className(_el$, clsx(styles().expander, css`
          transform: rotate(${props.expanded ? 90 : 0}deg);
        `, props.expanded && css`
            & svg {
              top: -1px;
            }
          `)));
    return _el$;
  })();
}, CopyButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const [copyState, setCopyState] = createSignal("NoCopy");
  return (() => {
    var _el$2 = _tmpl$24();
    addEventListener(_el$2, "click", copyState() === "NoCopy" ? () => {
      navigator.clipboard.writeText(stringify(props.value)).then(() => {
        setCopyState("SuccessCopy");
        setTimeout(() => {
          setCopyState("NoCopy");
        }, 1500);
      }, (err) => {
        console.error("Failed to copy: ", err);
        setCopyState("ErrorCopy");
        setTimeout(() => {
          setCopyState("NoCopy");
        }, 1500);
      });
    } : undefined, true);
    insert(_el$2, createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return copyState() === "NoCopy";
          },
          get children() {
            return createComponent(Copier, {});
          }
        }), createComponent(Match, {
          get when() {
            return copyState() === "SuccessCopy";
          },
          get children() {
            return createComponent(CopiedCopier, {
              get theme() {
                return theme();
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return copyState() === "ErrorCopy";
          },
          get children() {
            return createComponent(ErrorCopier, {});
          }
        })];
      }
    }));
    createRenderEffect((_p$) => {
      var _v$ = styles().actionButton, _v$2 = `${copyState() === "NoCopy" ? "Copy object to clipboard" : copyState() === "SuccessCopy" ? "Object copied to clipboard" : "Error copying object to clipboard"}`;
      _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
      _v$2 !== _p$.t && setAttribute(_el$2, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: undefined,
      t: undefined
    });
    return _el$2;
  })();
}, ClearArrayButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$3 = _tmpl$32();
    _el$3.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = updateNestedDataByPath(oldData, props.dataPath, []);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$3, createComponent(List, {}));
    createRenderEffect(() => className(_el$3, styles().actionButton));
    return _el$3;
  })();
}, DeleteItemButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$4 = _tmpl$42();
    _el$4.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = deleteNestedDataByPath(oldData, props.dataPath);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$4, createComponent(Trash, {}));
    createRenderEffect(() => className(_el$4, clsx(styles().actionButton)));
    return _el$4;
  })();
}, ToggleValueButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$5 = _tmpl$52();
    _el$5.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = updateNestedDataByPath(oldData, props.dataPath, !props.value);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$5, createComponent(Check, {
      get theme() {
        return theme();
      },
      get checked() {
        return props.value;
      }
    }));
    createRenderEffect(() => className(_el$5, clsx(styles().actionButton, css`
          width: ${tokens.size[3.5]};
          height: ${tokens.size[3.5]};
        `)));
    return _el$5;
  })();
}, stylesFactory = (theme, css) => {
  const {
    colors,
    font,
    size: size3,
    border
  } = tokens;
  const t22 = (light, dark) => theme === "light" ? light : dark;
  return {
    entry: css`
      & * {
        font-size: ${font.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,
    subEntry: css`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${t22(colors.gray[300], colors.darkGray[400])};
      /* outline: 1px solid ${colors.teal[400]}; */
    `,
    expander: css`
      & path {
        stroke: ${colors.gray[400]};
      }
      & svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${colors.blue[400]}; */
    `,
    expanderButtonContainer: css`
      display: flex;
      align-items: center;
      line-height: ${size3[4]};
      min-height: ${size3[4]};
      gap: ${size3[2]};
    `,
    expanderButton: css`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${size3[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${size3[1]};
      position: relative;
      /* outline: 1px solid ${colors.green[400]}; */

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,
    info: css`
      color: ${t22(colors.gray[500], colors.gray[500])};
      font-size: ${font.size.xs};
      margin-left: ${size3[1]};
      /* outline: 1px solid ${colors.yellow[400]}; */
    `,
    label: css`
      color: ${t22(colors.gray[700], colors.gray[300])};
      white-space: nowrap;
    `,
    value: css`
      color: ${t22(colors.purple[600], colors.purple[400])};
      flex-grow: 1;
    `,
    actions: css`
      display: inline-flex;
      gap: ${size3[2]};
      align-items: center;
    `,
    row: css`
      display: inline-flex;
      gap: ${size3[2]};
      width: 100%;
      margin: ${size3[0.25]} 0px;
      line-height: ${size3[4.5]};
      align-items: center;
    `,
    editableInput: css`
      border: none;
      padding: ${size3[0.5]} ${size3[1]} ${size3[0.5]} ${size3[1.5]};
      flex-grow: 1;
      border-radius: ${border.radius.xs};
      background-color: ${t22(colors.gray[200], colors.darkGray[500])};

      &:hover {
        background-color: ${t22(colors.gray[300], colors.darkGray[600])};
      }
    `,
    actionButton: css`
      background-color: transparent;
      color: ${t22(colors.gray[500], colors.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${size3[3]};
      height: ${size3[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${t22(colors.gray[600], colors.gray[400])};
      }

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
        outline-offset: 2px;
      }
    `
  };
}, lightStyles = (css) => stylesFactory("light", css), darkStyles = (css) => stylesFactory("dark", css), _tmpl$25, _tmpl$26, _tmpl$33, _tmpl$43, _tmpl$53, _tmpl$63, _tmpl$73, _tmpl$83, _tmpl$93, _tmpl$03, _tmpl$111, _tmpl$103, _tmpl$112, _tmpl$122, _tmpl$132, _tmpl$142, _tmpl$152, _tmpl$162, _tmpl$172, _tmpl$182, _tmpl$192, _tmpl$202, _tmpl$212, _tmpl$222, _tmpl$232, _tmpl$242, _tmpl$252, _tmpl$262, _tmpl$27, _tmpl$28, _tmpl$29, _tmpl$30, _tmpl$31, _tmpl$322, _tmpl$332, _tmpl$34, _tmpl$35, _tmpl$36, selectedQueryHash, setSelectedQueryHash, selectedMutationId, setSelectedMutationId, panelWidth, setPanelWidth, offline, setOffline, Devtools = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const onlineManager2 = createMemo(() => useQueryDevtoolsContext().onlineManager);
  onMount(() => {
    const unsubscribe = onlineManager2().subscribe((online) => {
      setOffline(!online);
    });
    onCleanup(() => {
      unsubscribe();
    });
  });
  const pip = usePiPWindow();
  const buttonPosition = createMemo(() => {
    return useQueryDevtoolsContext().buttonPosition || BUTTON_POSITION;
  });
  const isOpen = createMemo(() => {
    return props.localStore.open === "true" ? true : props.localStore.open === "false" ? false : useQueryDevtoolsContext().initialIsOpen || INITIAL_IS_OPEN;
  });
  const position = createMemo(() => {
    return props.localStore.position || useQueryDevtoolsContext().position || POSITION;
  });
  let transitionsContainerRef;
  createEffect(() => {
    const root = transitionsContainerRef.parentElement;
    const height = props.localStore.height || DEFAULT_HEIGHT;
    const width = props.localStore.width || DEFAULT_WIDTH;
    const panelPosition = position();
    root.style.setProperty("--tsqd-panel-height", `${panelPosition === "top" ? "-" : ""}${height}px`);
    root.style.setProperty("--tsqd-panel-width", `${panelPosition === "left" ? "-" : ""}${width}px`);
  });
  onMount(() => {
    const onFocus = () => {
      const root = transitionsContainerRef.parentElement;
      const fontSize = getComputedStyle(root).fontSize;
      root.style.setProperty("--tsqd-font-size", fontSize);
    };
    onFocus();
    window.addEventListener("focus", onFocus);
    onCleanup(() => {
      window.removeEventListener("focus", onFocus);
    });
  });
  const pip_open = createMemo(() => props.localStore.pip_open ?? "false");
  return [createComponent(Show, {
    get when() {
      return memo2(() => !!pip().pipWindow)() && pip_open() == "true";
    },
    get children() {
      return createComponent(Portal, {
        get mount() {
          return pip().pipWindow?.document.body;
        },
        get children() {
          return createComponent(PiPPanel, {
            get children() {
              return createComponent(ContentView, props);
            }
          });
        }
      });
    }
  }), (() => {
    var _el$ = _tmpl$26();
    var _ref$ = transitionsContainerRef;
    typeof _ref$ === "function" ? use(_ref$, _el$) : transitionsContainerRef = _el$;
    insert(_el$, createComponent(TransitionGroup, {
      name: "tsqd-panel-transition",
      get children() {
        return createComponent(Show, {
          get when() {
            return memo2(() => !!(isOpen() && !pip().pipWindow))() && pip_open() == "false";
          },
          get children() {
            return createComponent(DraggablePanel, {
              get localStore() {
                return props.localStore;
              },
              get setLocalStore() {
                return props.setLocalStore;
              }
            });
          }
        });
      }
    }), null);
    insert(_el$, createComponent(TransitionGroup, {
      name: "tsqd-button-transition",
      get children() {
        return createComponent(Show, {
          get when() {
            return !isOpen();
          },
          get children() {
            var _el$2 = _tmpl$25(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
            insert(_el$3, createComponent(TanstackLogo, {}));
            _el$4.$$click = () => props.setLocalStore("open", "true");
            insert(_el$4, createComponent(TanstackLogo, {}));
            createRenderEffect(() => className(_el$2, clsx(styles().devtoolsBtn, styles()[`devtoolsBtn-position-${buttonPosition()}`], "tsqd-open-btn-container")));
            return _el$2;
          }
        });
      }
    }), null);
    createRenderEffect(() => className(_el$, clsx(css`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${position() === "top" || position() === "bottom" ? `transform: translateY(var(--tsqd-panel-height));` : `transform: translateX(var(--tsqd-panel-width));`}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${buttonPosition() === "relative" ? `none;` : buttonPosition() === "top-left" ? `translateX(-72px);` : buttonPosition() === "top-right" ? `translateX(72px);` : `translateY(72px);`};
              opacity: 0;
            }
          `, "tsqd-transitions-container")));
    return _el$;
  })()];
}, PiPPanel = (props) => {
  const pip = usePiPWindow();
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t22 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t22(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t22(colors.gray[200], colors.darkGray[900])};
    `;
  };
  createEffect(() => {
    const win = pip().pipWindow;
    const resizeCB = () => {
      if (!win)
        return;
      setPanelWidth(win.innerWidth);
    };
    if (win) {
      win.addEventListener("resize", resizeCB);
      resizeCB();
    }
    onCleanup(() => {
      if (win) {
        win.removeEventListener("resize", resizeCB);
      }
    });
  });
  return (() => {
    var _el$5 = _tmpl$26();
    _el$5.style.setProperty("--tsqd-font-size", "16px");
    _el$5.style.setProperty("max-height", "100vh");
    _el$5.style.setProperty("height", "100vh");
    _el$5.style.setProperty("width", "100vw");
    insert(_el$5, () => props.children);
    createRenderEffect(() => className(_el$5, clsx(styles().panel, getPanelDynamicStyles(), {
      [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
    }, "tsqd-main-panel")));
    return _el$5;
  })();
}, ParentPanel = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  let panelRef;
  onMount(() => {
    createResizeObserver(panelRef, ({
      width
    }, el) => {
      if (el === panelRef) {
        setPanelWidth(width);
      }
    });
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t22 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t22(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t22(colors.gray[200], colors.darkGray[900])};
    `;
  };
  return (() => {
    var _el$6 = _tmpl$26();
    var _ref$2 = panelRef;
    typeof _ref$2 === "function" ? use(_ref$2, _el$6) : panelRef = _el$6;
    _el$6.style.setProperty("--tsqd-font-size", "16px");
    insert(_el$6, () => props.children);
    createRenderEffect(() => className(_el$6, clsx(styles().parentPanel, getPanelDynamicStyles(), {
      [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
    }, "tsqd-main-panel")));
    return _el$6;
  })();
}, DraggablePanel = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  let closeBtnRef;
  onMount(() => {
    closeBtnRef.focus();
  });
  const [isResizing, setIsResizing] = createSignal(false);
  const position = createMemo(() => props.localStore.position || useQueryDevtoolsContext().position || POSITION);
  const handleDragStart = (event) => {
    const panelElement = event.currentTarget.parentElement;
    if (!panelElement)
      return;
    setIsResizing(true);
    const {
      height,
      width
    } = panelElement.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    let newSize = 0;
    const minHeight = convertRemToPixels(3.5);
    const minWidth = convertRemToPixels(12);
    const runDrag = (moveEvent) => {
      moveEvent.preventDefault();
      if (position() === "left" || position() === "right") {
        const valToAdd = position() === "right" ? startX - moveEvent.clientX : moveEvent.clientX - startX;
        newSize = Math.round(width + valToAdd);
        if (newSize < minWidth) {
          newSize = minWidth;
        }
        props.setLocalStore("width", String(Math.round(newSize)));
        const newWidth = panelElement.getBoundingClientRect().width;
        if (Number(props.localStore.width) < newWidth) {
          props.setLocalStore("width", String(newWidth));
        }
      } else {
        const valToAdd = position() === "bottom" ? startY - moveEvent.clientY : moveEvent.clientY - startY;
        newSize = Math.round(height + valToAdd);
        if (newSize < minHeight) {
          newSize = minHeight;
          setSelectedQueryHash(null);
        }
        props.setLocalStore("height", String(Math.round(newSize)));
      }
    };
    const unsubscribe = () => {
      if (isResizing()) {
        setIsResizing(false);
      }
      document.removeEventListener("mousemove", runDrag, false);
      document.removeEventListener("mouseup", unsubscribe, false);
    };
    document.addEventListener("mousemove", runDrag, false);
    document.addEventListener("mouseup", unsubscribe, false);
  };
  let panelRef;
  onMount(() => {
    createResizeObserver(panelRef, ({
      width
    }, el) => {
      if (el === panelRef) {
        setPanelWidth(width);
      }
    });
  });
  createEffect(() => {
    const rootContainer = panelRef.parentElement?.parentElement?.parentElement;
    if (!rootContainer)
      return;
    const currentPosition = props.localStore.position || POSITION;
    const styleProp = getSidedProp("padding", currentPosition);
    const isVertical = props.localStore.position === "left" || props.localStore.position === "right";
    const previousPaddings = (({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }) => ({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }))(rootContainer.style);
    rootContainer.style[styleProp] = `${isVertical ? props.localStore.width : props.localStore.height}px`;
    onCleanup(() => {
      Object.entries(previousPaddings).forEach(([property, previousValue]) => {
        rootContainer.style[property] = previousValue;
      });
    });
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t22 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t22(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t22(colors.gray[200], colors.darkGray[900])};
    `;
  };
  return (() => {
    var _el$7 = _tmpl$33(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
    var _ref$3 = panelRef;
    typeof _ref$3 === "function" ? use(_ref$3, _el$7) : panelRef = _el$7;
    _el$8.$$keydown = (e2) => {
      const step = 10;
      const minHeight = convertRemToPixels(3.5);
      const minWidth = convertRemToPixels(12);
      if (position() === "top" || position() === "bottom") {
        if (e2.key === "ArrowUp" || e2.key === "ArrowDown") {
          e2.preventDefault();
          const currentHeight = Number(props.localStore.height || DEFAULT_HEIGHT);
          const delta = position() === "bottom" ? e2.key === "ArrowUp" ? step : -10 : e2.key === "ArrowDown" ? step : -10;
          const newHeight = Math.max(minHeight, currentHeight + delta);
          props.setLocalStore("height", String(newHeight));
        }
      } else {
        if (e2.key === "ArrowLeft" || e2.key === "ArrowRight") {
          e2.preventDefault();
          const currentWidth = Number(props.localStore.width || DEFAULT_WIDTH);
          const delta = position() === "right" ? e2.key === "ArrowLeft" ? step : -10 : e2.key === "ArrowRight" ? step : -10;
          const newWidth = Math.max(minWidth, currentWidth + delta);
          props.setLocalStore("width", String(newWidth));
        }
      }
    };
    _el$8.$$mousedown = handleDragStart;
    _el$9.$$click = () => props.setLocalStore("open", "false");
    var _ref$4 = closeBtnRef;
    typeof _ref$4 === "function" ? use(_ref$4, _el$9) : closeBtnRef = _el$9;
    insert(_el$9, createComponent(ChevronDown, {}));
    insert(_el$7, createComponent(ContentView, props), null);
    createRenderEffect((_p$) => {
      var _v$ = clsx(styles().panel, styles()[`panel-position-${position()}`], getPanelDynamicStyles(), {
        [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint && (position() === "right" || position() === "left")
      }, "tsqd-main-panel"), _v$2 = position() === "bottom" || position() === "top" ? `${props.localStore.height || DEFAULT_HEIGHT}px` : "auto", _v$3 = position() === "right" || position() === "left" ? `${props.localStore.width || DEFAULT_WIDTH}px` : "auto", _v$4 = position() === "top" || position() === "bottom" ? "horizontal" : "vertical", _v$5 = position() === "top" || position() === "bottom" ? convertRemToPixels(3.5) : convertRemToPixels(12), _v$6 = position() === "top" || position() === "bottom" ? Number(props.localStore.height || DEFAULT_HEIGHT) : Number(props.localStore.width || DEFAULT_WIDTH), _v$7 = clsx(styles().dragHandle, styles()[`dragHandle-position-${position()}`], "tsqd-drag-handle"), _v$8 = clsx(styles().closeBtn, styles()[`closeBtn-position-${position()}`], "tsqd-minimize-btn");
      _v$ !== _p$.e && className(_el$7, _p$.e = _v$);
      _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$7.style.setProperty("height", _v$2) : _el$7.style.removeProperty("height"));
      _v$3 !== _p$.a && ((_p$.a = _v$3) != null ? _el$7.style.setProperty("width", _v$3) : _el$7.style.removeProperty("width"));
      _v$4 !== _p$.o && setAttribute(_el$8, "aria-orientation", _p$.o = _v$4);
      _v$5 !== _p$.i && setAttribute(_el$8, "aria-valuemin", _p$.i = _v$5);
      _v$6 !== _p$.n && setAttribute(_el$8, "aria-valuenow", _p$.n = _v$6);
      _v$7 !== _p$.s && className(_el$8, _p$.s = _v$7);
      _v$8 !== _p$.h && className(_el$9, _p$.h = _v$8);
      return _p$;
    }, {
      e: undefined,
      t: undefined,
      a: undefined,
      o: undefined,
      i: undefined,
      n: undefined,
      s: undefined,
      h: undefined
    });
    return _el$7;
  })();
}, ContentView = (props) => {
  setupQueryCacheSubscription();
  setupMutationCacheSubscription();
  let containerRef;
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const pip = usePiPWindow();
  const [selectedView, setSelectedView] = createSignal("queries");
  const sort = createMemo(() => props.localStore.sort || DEFAULT_SORT_FN_NAME);
  const sortOrder = createMemo(() => Number(props.localStore.sortOrder) || DEFAULT_SORT_ORDER);
  const mutationSort = createMemo(() => props.localStore.mutationSort || DEFAULT_MUTATION_SORT_FN_NAME);
  const mutationSortOrder = createMemo(() => Number(props.localStore.mutationSortOrder) || DEFAULT_SORT_ORDER);
  const sortFn = createMemo(() => sortFns[sort()]);
  const mutationSortFn = createMemo(() => mutationSortFns[mutationSort()]);
  const onlineManager2 = createMemo(() => useQueryDevtoolsContext().onlineManager);
  const query_cache = createMemo(() => {
    return useQueryDevtoolsContext().client.getQueryCache();
  });
  const mutation_cache = createMemo(() => {
    return useQueryDevtoolsContext().client.getMutationCache();
  });
  const queryCount = createSubscribeToQueryCacheBatcher((queryCache) => {
    return queryCache().getAll().length;
  }, false);
  const queries = createMemo(on(() => [queryCount(), props.localStore.filter, sort(), sortOrder(), props.localStore.hideDisabledQueries], () => {
    const curr = query_cache().getAll();
    let filtered = props.localStore.filter ? curr.filter((item) => rankItem(item.queryHash, props.localStore.filter || "").passed) : [...curr];
    if (props.localStore.hideDisabledQueries === "true") {
      filtered = filtered.filter((item) => !item.isDisabled());
    }
    const sorted = sortFn() ? filtered.sort((a2, b2) => sortFn()(a2, b2) * sortOrder()) : filtered;
    return sorted;
  }));
  const mutationCount = createSubscribeToMutationCacheBatcher((mutationCache) => {
    return mutationCache().getAll().length;
  }, false);
  const mutations = createMemo(on(() => [mutationCount(), props.localStore.mutationFilter, mutationSort(), mutationSortOrder()], () => {
    const curr = mutation_cache().getAll();
    const filtered = props.localStore.mutationFilter ? curr.filter((item) => {
      const value = `${item.options.mutationKey ? JSON.stringify(item.options.mutationKey) + " - " : ""}${new Date(item.state.submittedAt).toLocaleString()}`;
      return rankItem(value, props.localStore.mutationFilter || "").passed;
    }) : [...curr];
    const sorted = mutationSortFn() ? filtered.sort((a2, b2) => mutationSortFn()(a2, b2) * mutationSortOrder()) : filtered;
    return sorted;
  }));
  const setDevtoolsPosition = (pos) => {
    props.setLocalStore("position", pos);
  };
  const setComputedVariables = (el) => {
    const computedStyle = getComputedStyle(containerRef);
    const variable = computedStyle.getPropertyValue("--tsqd-font-size");
    el.style.setProperty("--tsqd-font-size", variable);
  };
  return [(() => {
    var _el$0 = _tmpl$222(), _el$1 = _el$0.firstChild, _el$10 = _el$1.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$11.firstChild, _el$13 = _el$12.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$1.nextSibling, _el$16 = _el$15.firstChild, _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild, _el$19 = _el$17.nextSibling, _el$22 = _el$19.nextSibling, _el$25 = _el$16.nextSibling, _el$26 = _el$25.firstChild, _el$27 = _el$26.nextSibling;
    var _ref$5 = containerRef;
    typeof _ref$5 === "function" ? use(_ref$5, _el$0) : containerRef = _el$0;
    _el$11.$$click = () => {
      if (!pip().pipWindow && !props.showPanelViewOnly) {
        props.setLocalStore("open", "false");
        return;
      }
      if (props.onClose) {
        props.onClose();
      }
    };
    insert(_el$13, () => useQueryDevtoolsContext().queryFlavor, _el$14);
    insert(_el$13, () => useQueryDevtoolsContext().version, null);
    insert(_el$10, createComponent(radio_group_exports.Root, {
      get ["class"]() {
        return clsx(styles().viewToggle);
      },
      get value() {
        return selectedView();
      },
      "aria-label": "Toggle between queries and mutations view",
      onChange: (value) => {
        setSelectedView(value);
        setSelectedQueryHash(null);
        setSelectedMutationId(null);
      },
      get children() {
        return [createComponent(radio_group_exports.Item, {
          value: "queries",
          class: "tsqd-radio-toggle",
          get children() {
            return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
              get children() {
                return createComponent(radio_group_exports.ItemIndicator, {});
              }
            }), createComponent(radio_group_exports.ItemLabel, {
              title: "Toggle Queries View",
              children: "Queries"
            })];
          }
        }), createComponent(radio_group_exports.Item, {
          value: "mutations",
          class: "tsqd-radio-toggle",
          get children() {
            return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
              get children() {
                return createComponent(radio_group_exports.ItemIndicator, {});
              }
            }), createComponent(radio_group_exports.ItemLabel, {
              title: "Toggle Mutations View",
              children: "Mutations"
            })];
          }
        })];
      }
    }), null);
    insert(_el$1, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        return createComponent(QueryStatusCount, {});
      }
    }), null);
    insert(_el$1, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        return createComponent(MutationStatusCount, {});
      }
    }), null);
    insert(_el$17, createComponent(Search, {}), _el$18);
    _el$18.$$input = (e2) => {
      if (selectedView() === "queries") {
        props.setLocalStore("filter", e2.currentTarget.value);
      } else {
        props.setLocalStore("mutationFilter", e2.currentTarget.value);
      }
    };
    insert(_el$19, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        var _el$20 = _tmpl$43();
        _el$20.addEventListener("change", (e2) => {
          props.setLocalStore("sort", e2.currentTarget.value);
        });
        insert(_el$20, () => Object.keys(sortFns).map((key) => (() => {
          var _el$46 = _tmpl$232();
          _el$46.firstChild;
          _el$46.value = key;
          insert(_el$46, key, null);
          return _el$46;
        })()));
        createRenderEffect(() => _el$20.value = sort());
        return _el$20;
      }
    }), null);
    insert(_el$19, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        var _el$21 = _tmpl$53();
        _el$21.addEventListener("change", (e2) => {
          props.setLocalStore("mutationSort", e2.currentTarget.value);
        });
        insert(_el$21, () => Object.keys(mutationSortFns).map((key) => (() => {
          var _el$48 = _tmpl$232();
          _el$48.firstChild;
          _el$48.value = key;
          insert(_el$48, key, null);
          return _el$48;
        })()));
        createRenderEffect(() => _el$21.value = mutationSort());
        return _el$21;
      }
    }), null);
    insert(_el$19, createComponent(ChevronDown, {}), null);
    _el$22.$$click = () => {
      if (selectedView() === "queries") {
        props.setLocalStore("sortOrder", String(sortOrder() * -1));
      } else {
        props.setLocalStore("mutationSortOrder", String(mutationSortOrder() * -1));
      }
    };
    insert(_el$22, createComponent(Show, {
      get when() {
        return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === 1;
      },
      get children() {
        return [_tmpl$63(), createComponent(ArrowUp, {})];
      }
    }), null);
    insert(_el$22, createComponent(Show, {
      get when() {
        return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1;
      },
      get children() {
        return [_tmpl$73(), createComponent(ArrowDown, {})];
      }
    }), null);
    _el$26.$$click = () => {
      if (selectedView() === "queries") {
        sendDevToolsEvent({
          type: "CLEAR_QUERY_CACHE"
        });
        query_cache().clear();
      } else {
        sendDevToolsEvent({
          type: "CLEAR_MUTATION_CACHE"
        });
        mutation_cache().clear();
      }
    };
    insert(_el$26, createComponent(Trash, {}));
    _el$27.$$click = () => {
      onlineManager2().setOnline(!onlineManager2().isOnline());
    };
    insert(_el$27, (() => {
      var _c$ = memo2(() => !!offline());
      return () => _c$() ? createComponent(Offline, {}) : createComponent(Wifi, {});
    })());
    insert(_el$25, createComponent(Show, {
      get when() {
        return memo2(() => !!!pip().pipWindow)() && !pip().disabled;
      },
      get children() {
        var _el$28 = _tmpl$83();
        _el$28.$$click = () => {
          pip().requestPipWindow(Number(window.innerWidth), Number(props.localStore.height ?? 500));
        };
        insert(_el$28, createComponent(PiPIcon, {}));
        createRenderEffect(() => className(_el$28, clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-open-pip")));
        return _el$28;
      }
    }), null);
    insert(_el$25, createComponent(dropdown_menu_exports.Root, {
      gutter: 4,
      get children() {
        return [createComponent(dropdown_menu_exports.Trigger, {
          get ["class"]() {
            return clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-settings");
          },
          "aria-label": "Open settings menu",
          title: "Open settings menu",
          get children() {
            return createComponent(Settings, {});
          }
        }), createComponent(dropdown_menu_exports.Portal, {
          ref: (el) => setComputedVariables(el),
          get mount() {
            return memo2(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
          },
          get children() {
            return createComponent(dropdown_menu_exports.Content, {
              get ["class"]() {
                return clsx(styles().settingsMenu, "tsqd-settings-menu");
              },
              get children() {
                return [(() => {
                  var _el$29 = _tmpl$93();
                  createRenderEffect(() => className(_el$29, clsx(styles().settingsMenuHeader, "tsqd-settings-menu-header")));
                  return _el$29;
                })(), createComponent(Show, {
                  get when() {
                    return !props.showPanelViewOnly;
                  },
                  get children() {
                    return createComponent(dropdown_menu_exports.Sub, {
                      overlap: true,
                      gutter: 8,
                      shift: -4,
                      get children() {
                        return [createComponent(dropdown_menu_exports.SubTrigger, {
                          get ["class"]() {
                            return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                          },
                          get children() {
                            return [_tmpl$03(), createComponent(ChevronDown, {})];
                          }
                        }), createComponent(dropdown_menu_exports.Portal, {
                          ref: (el) => setComputedVariables(el),
                          get mount() {
                            return memo2(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.SubContent, {
                              get ["class"]() {
                                return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                              },
                              get children() {
                                return createComponent(dropdown_menu_exports.RadioGroup, {
                                  "aria-label": "Position settings",
                                  get value() {
                                    return props.localStore.position;
                                  },
                                  onChange: (value) => setDevtoolsPosition(value),
                                  get children() {
                                    return [createComponent(dropdown_menu_exports.RadioItem, {
                                      value: "top",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                                      },
                                      get children() {
                                        return [_tmpl$111(), createComponent(ArrowUp, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.RadioItem, {
                                      value: "bottom",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                                      },
                                      get children() {
                                        return [_tmpl$103(), createComponent(ArrowDown, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.RadioItem, {
                                      value: "left",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                                      },
                                      get children() {
                                        return [_tmpl$112(), createComponent(ArrowLeft, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.RadioItem, {
                                      value: "right",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-right");
                                      },
                                      get children() {
                                        return [_tmpl$122(), createComponent(ArrowRight, {})];
                                      }
                                    })];
                                  }
                                });
                              }
                            });
                          }
                        })];
                      }
                    });
                  }
                }), createComponent(dropdown_menu_exports.Sub, {
                  overlap: true,
                  gutter: 8,
                  shift: -4,
                  get children() {
                    return [createComponent(dropdown_menu_exports.SubTrigger, {
                      get ["class"]() {
                        return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                      },
                      get children() {
                        return [_tmpl$132(), createComponent(ChevronDown, {})];
                      }
                    }), createComponent(dropdown_menu_exports.Portal, {
                      ref: (el) => setComputedVariables(el),
                      get mount() {
                        return memo2(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                      },
                      get children() {
                        return createComponent(dropdown_menu_exports.SubContent, {
                          get ["class"]() {
                            return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.RadioGroup, {
                              get value() {
                                return props.localStore.theme_preference;
                              },
                              onChange: (value) => {
                                props.setLocalStore("theme_preference", value);
                              },
                              "aria-label": "Theme preference",
                              get children() {
                                return [createComponent(dropdown_menu_exports.RadioItem, {
                                  value: "light",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                                  },
                                  get children() {
                                    return [_tmpl$142(), createComponent(Sun, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.RadioItem, {
                                  value: "dark",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                                  },
                                  get children() {
                                    return [_tmpl$152(), createComponent(Moon, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.RadioItem, {
                                  value: "system",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                                  },
                                  get children() {
                                    return [_tmpl$162(), createComponent(Monitor, {})];
                                  }
                                })];
                              }
                            });
                          }
                        });
                      }
                    })];
                  }
                }), createComponent(dropdown_menu_exports.Sub, {
                  overlap: true,
                  gutter: 8,
                  shift: -4,
                  get children() {
                    return [createComponent(dropdown_menu_exports.SubTrigger, {
                      get ["class"]() {
                        return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-disabled-queries");
                      },
                      get children() {
                        return [_tmpl$172(), createComponent(ChevronDown, {})];
                      }
                    }), createComponent(dropdown_menu_exports.Portal, {
                      ref: (el) => setComputedVariables(el),
                      get mount() {
                        return memo2(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                      },
                      get children() {
                        return createComponent(dropdown_menu_exports.SubContent, {
                          get ["class"]() {
                            return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.RadioGroup, {
                              get value() {
                                return props.localStore.hideDisabledQueries;
                              },
                              "aria-label": "Hide disabled queries setting",
                              onChange: (value) => props.setLocalStore("hideDisabledQueries", value),
                              get children() {
                                return [createComponent(dropdown_menu_exports.RadioItem, {
                                  value: "false",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-show");
                                  },
                                  get children() {
                                    return [_tmpl$182(), createComponent(Show, {
                                      get when() {
                                        return props.localStore.hideDisabledQueries !== "true";
                                      },
                                      get children() {
                                        return createComponent(CheckCircle, {});
                                      }
                                    })];
                                  }
                                }), createComponent(dropdown_menu_exports.RadioItem, {
                                  value: "true",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-hide");
                                  },
                                  get children() {
                                    return [_tmpl$192(), createComponent(Show, {
                                      get when() {
                                        return props.localStore.hideDisabledQueries === "true";
                                      },
                                      get children() {
                                        return createComponent(CheckCircle, {});
                                      }
                                    })];
                                  }
                                })];
                              }
                            });
                          }
                        });
                      }
                    })];
                  }
                })];
              }
            });
          }
        })];
      }
    }), null);
    insert(_el$0, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        var _el$42 = _tmpl$202(), _el$43 = _el$42.firstChild;
        insert(_el$43, createComponent(Key, {
          by: (q) => q.queryHash,
          get each() {
            return queries();
          },
          children: (query) => createComponent(QueryRow, {
            get query() {
              return query();
            }
          })
        }));
        createRenderEffect(() => className(_el$42, clsx(styles().overflowQueryContainer, "tsqd-queries-overflow-container")));
        return _el$42;
      }
    }), null);
    insert(_el$0, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        var _el$44 = _tmpl$212(), _el$45 = _el$44.firstChild;
        insert(_el$45, createComponent(Key, {
          by: (m) => m.mutationId,
          get each() {
            return mutations();
          },
          children: (mutation) => createComponent(MutationRow, {
            get mutation() {
              return mutation();
            }
          })
        }));
        createRenderEffect(() => className(_el$44, clsx(styles().overflowQueryContainer, "tsqd-mutations-overflow-container")));
        return _el$44;
      }
    }), null);
    createRenderEffect((_p$) => {
      var _v$9 = clsx(styles().queriesContainer, panelWidth() < secondBreakpoint && (selectedQueryHash() || selectedMutationId()) && css`
              height: 50%;
              max-height: 50%;
            `, panelWidth() < secondBreakpoint && !(selectedQueryHash() || selectedMutationId()) && css`
              height: 100%;
              max-height: 100%;
            `, "tsqd-queries-container"), _v$0 = clsx(styles().row, "tsqd-header"), _v$1 = styles().logoAndToggleContainer, _v$10 = clsx(styles().logo, "tsqd-text-logo-container"), _v$11 = clsx(styles().tanstackLogo, "tsqd-text-logo-tanstack"), _v$12 = clsx(styles().queryFlavorLogo, "tsqd-text-logo-query-flavor"), _v$13 = clsx(styles().row, "tsqd-filters-actions-container"), _v$14 = clsx(styles().filtersContainer, "tsqd-filters-container"), _v$15 = clsx(styles().filterInput, "tsqd-query-filter-textfield-container"), _v$16 = clsx("tsqd-query-filter-textfield"), _v$17 = clsx(styles().filterSelect, "tsqd-query-filter-sort-container"), _v$18 = `Sort order ${(selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1 ? "descending" : "ascending"}`, _v$19 = (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1, _v$20 = clsx(styles().actionsContainer, "tsqd-actions-container"), _v$21 = clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-clear-cache"), _v$22 = `Clear ${selectedView()} cache`, _v$23 = clsx(styles().actionsBtn, offline() && styles().actionsBtnOffline, "tsqd-actions-btn", "tsqd-action-mock-offline-behavior"), _v$24 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`, _v$25 = offline(), _v$26 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`;
      _v$9 !== _p$.e && className(_el$0, _p$.e = _v$9);
      _v$0 !== _p$.t && className(_el$1, _p$.t = _v$0);
      _v$1 !== _p$.a && className(_el$10, _p$.a = _v$1);
      _v$10 !== _p$.o && className(_el$11, _p$.o = _v$10);
      _v$11 !== _p$.i && className(_el$12, _p$.i = _v$11);
      _v$12 !== _p$.n && className(_el$13, _p$.n = _v$12);
      _v$13 !== _p$.s && className(_el$15, _p$.s = _v$13);
      _v$14 !== _p$.h && className(_el$16, _p$.h = _v$14);
      _v$15 !== _p$.r && className(_el$17, _p$.r = _v$15);
      _v$16 !== _p$.d && className(_el$18, _p$.d = _v$16);
      _v$17 !== _p$.l && className(_el$19, _p$.l = _v$17);
      _v$18 !== _p$.u && setAttribute(_el$22, "aria-label", _p$.u = _v$18);
      _v$19 !== _p$.c && setAttribute(_el$22, "aria-pressed", _p$.c = _v$19);
      _v$20 !== _p$.w && className(_el$25, _p$.w = _v$20);
      _v$21 !== _p$.m && className(_el$26, _p$.m = _v$21);
      _v$22 !== _p$.f && setAttribute(_el$26, "title", _p$.f = _v$22);
      _v$23 !== _p$.y && className(_el$27, _p$.y = _v$23);
      _v$24 !== _p$.g && setAttribute(_el$27, "aria-label", _p$.g = _v$24);
      _v$25 !== _p$.p && setAttribute(_el$27, "aria-pressed", _p$.p = _v$25);
      _v$26 !== _p$.b && setAttribute(_el$27, "title", _p$.b = _v$26);
      return _p$;
    }, {
      e: undefined,
      t: undefined,
      a: undefined,
      o: undefined,
      i: undefined,
      n: undefined,
      s: undefined,
      h: undefined,
      r: undefined,
      d: undefined,
      l: undefined,
      u: undefined,
      c: undefined,
      w: undefined,
      m: undefined,
      f: undefined,
      y: undefined,
      g: undefined,
      p: undefined,
      b: undefined
    });
    createRenderEffect(() => _el$18.value = selectedView() === "queries" ? props.localStore.filter || "" : props.localStore.mutationFilter || "");
    return _el$0;
  })(), createComponent(Show, {
    get when() {
      return memo2(() => selectedView() === "queries")() && selectedQueryHash();
    },
    get children() {
      return createComponent(QueryDetails, {});
    }
  }), createComponent(Show, {
    get when() {
      return memo2(() => selectedView() === "mutations")() && selectedMutationId();
    },
    get children() {
      return createComponent(MutationDetails, {});
    }
  })];
}, QueryRow = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t22 = (light, dark) => theme() === "dark" ? dark : light;
  const queryState = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().find({
    queryKey: props.query.queryKey
  })?.state, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const isDisabled = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().find({
    queryKey: props.query.queryKey
  })?.isDisabled() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const isStatic = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().find({
    queryKey: props.query.queryKey
  })?.isStatic() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const isStale = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().find({
    queryKey: props.query.queryKey
  })?.isStale() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const observers = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().find({
    queryKey: props.query.queryKey
  })?.getObserversCount() ?? 0, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const color = createMemo(() => getQueryStatusColor({
    queryState: queryState(),
    observerCount: observers(),
    isStale: isStale()
  }));
  const getObserverCountColorStyles = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t22(colors[color()][200], colors[color()][700])};
        color: ${t22(colors[color()][700], colors[color()][300])};
      `;
    }
    return css`
      background-color: ${t22(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t22(colors[color()][800], colors[color()][300])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return queryState();
    },
    get children() {
      var _el$50 = _tmpl$262(), _el$51 = _el$50.firstChild, _el$52 = _el$51.nextSibling;
      _el$50.$$click = () => setSelectedQueryHash(props.query.queryHash === selectedQueryHash() ? null : props.query.queryHash);
      insert(_el$51, observers);
      insert(_el$52, () => props.query.queryHash);
      insert(_el$50, createComponent(Show, {
        get when() {
          return isDisabled();
        },
        get children() {
          return _tmpl$242();
        }
      }), null);
      insert(_el$50, createComponent(Show, {
        get when() {
          return isStatic();
        },
        get children() {
          return _tmpl$252();
        }
      }), null);
      createRenderEffect((_p$) => {
        var _v$27 = clsx(styles().queryRow, selectedQueryHash() === props.query.queryHash && styles().selectedQueryRow, "tsqd-query-row"), _v$28 = `Query key ${props.query.queryHash}${isDisabled() ? ", disabled" : ""}${isStatic() ? ", static" : ""}`, _v$29 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
        _v$27 !== _p$.e && className(_el$50, _p$.e = _v$27);
        _v$28 !== _p$.t && setAttribute(_el$50, "aria-label", _p$.t = _v$28);
        _v$29 !== _p$.a && className(_el$51, _p$.a = _v$29);
        return _p$;
      }, {
        e: undefined,
        t: undefined,
        a: undefined
      });
      return _el$50;
    }
  });
}, MutationRow = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t22 = (light, dark) => theme() === "dark" ? dark : light;
  const mutationState = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    return mutation?.state;
  });
  const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    if (!mutation)
      return false;
    return mutation.state.isPaused;
  });
  const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    if (!mutation)
      return "idle";
    return mutation.state.status;
  });
  const color = createMemo(() => getMutationStatusColor({
    isPaused: isPaused(),
    status: status()
  }));
  const getObserverCountColorStyles = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t22(colors[color()][200], colors[color()][700])};
        color: ${t22(colors[color()][700], colors[color()][300])};
      `;
    }
    return css`
      background-color: ${t22(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t22(colors[color()][800], colors[color()][300])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return mutationState();
    },
    get children() {
      var _el$55 = _tmpl$262(), _el$56 = _el$55.firstChild, _el$57 = _el$56.nextSibling;
      _el$55.$$click = () => {
        setSelectedMutationId(props.mutation.mutationId === selectedMutationId() ? null : props.mutation.mutationId);
      };
      insert(_el$56, createComponent(Show, {
        get when() {
          return color() === "purple";
        },
        get children() {
          return createComponent(PauseCircle, {});
        }
      }), null);
      insert(_el$56, createComponent(Show, {
        get when() {
          return color() === "green";
        },
        get children() {
          return createComponent(CheckCircle, {});
        }
      }), null);
      insert(_el$56, createComponent(Show, {
        get when() {
          return color() === "red";
        },
        get children() {
          return createComponent(XCircle, {});
        }
      }), null);
      insert(_el$56, createComponent(Show, {
        get when() {
          return color() === "yellow";
        },
        get children() {
          return createComponent(LoadingCircle, {});
        }
      }), null);
      insert(_el$57, createComponent(Show, {
        get when() {
          return props.mutation.options.mutationKey;
        },
        get children() {
          return [memo2(() => JSON.stringify(props.mutation.options.mutationKey)), " -", " "];
        }
      }), null);
      insert(_el$57, () => new Date(props.mutation.state.submittedAt).toLocaleString(), null);
      createRenderEffect((_p$) => {
        var _v$30 = clsx(styles().queryRow, selectedMutationId() === props.mutation.mutationId && styles().selectedQueryRow, "tsqd-query-row"), _v$31 = `Mutation submitted at ${new Date(props.mutation.state.submittedAt).toLocaleString()}`, _v$32 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
        _v$30 !== _p$.e && className(_el$55, _p$.e = _v$30);
        _v$31 !== _p$.t && setAttribute(_el$55, "aria-label", _p$.t = _v$31);
        _v$32 !== _p$.a && className(_el$56, _p$.a = _v$32);
        return _p$;
      }, {
        e: undefined,
        t: undefined,
        a: undefined
      });
      return _el$55;
    }
  });
}, QueryStatusCount = () => {
  const stale = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "stale").length);
  const fresh = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "fresh").length);
  const fetching = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "fetching").length);
  const paused = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "paused").length);
  const inactive = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "inactive").length);
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  return (() => {
    var _el$58 = _tmpl$26();
    insert(_el$58, createComponent(QueryStatus, {
      label: "Fresh",
      color: "green",
      get count() {
        return fresh();
      }
    }), null);
    insert(_el$58, createComponent(QueryStatus, {
      label: "Fetching",
      color: "blue",
      get count() {
        return fetching();
      }
    }), null);
    insert(_el$58, createComponent(QueryStatus, {
      label: "Paused",
      color: "purple",
      get count() {
        return paused();
      }
    }), null);
    insert(_el$58, createComponent(QueryStatus, {
      label: "Stale",
      color: "yellow",
      get count() {
        return stale();
      }
    }), null);
    insert(_el$58, createComponent(QueryStatus, {
      label: "Inactive",
      color: "gray",
      get count() {
        return inactive();
      }
    }), null);
    createRenderEffect(() => className(_el$58, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
    return _el$58;
  })();
}, MutationStatusCount = () => {
  const success = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "green").length);
  const pending = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "yellow").length);
  const paused = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "purple").length);
  const error = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "red").length);
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  return (() => {
    var _el$59 = _tmpl$26();
    insert(_el$59, createComponent(QueryStatus, {
      label: "Paused",
      color: "purple",
      get count() {
        return paused();
      }
    }), null);
    insert(_el$59, createComponent(QueryStatus, {
      label: "Pending",
      color: "yellow",
      get count() {
        return pending();
      }
    }), null);
    insert(_el$59, createComponent(QueryStatus, {
      label: "Success",
      color: "green",
      get count() {
        return success();
      }
    }), null);
    insert(_el$59, createComponent(QueryStatus, {
      label: "Error",
      color: "red",
      get count() {
        return error();
      }
    }), null);
    createRenderEffect(() => className(_el$59, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
    return _el$59;
  })();
}, QueryStatus = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t22 = (light, dark) => theme() === "dark" ? dark : light;
  let tagRef;
  const [mouseOver, setMouseOver] = createSignal(false);
  const [focused, setFocused] = createSignal(false);
  const showLabel = createMemo(() => {
    if (selectedQueryHash()) {
      if (panelWidth() < firstBreakpoint && panelWidth() > secondBreakpoint) {
        return false;
      }
    }
    if (panelWidth() < secondBreakpoint) {
      return false;
    }
    return true;
  });
  return (() => {
    var _el$60 = _tmpl$29(), _el$62 = _el$60.firstChild, _el$64 = _el$62.nextSibling;
    var _ref$6 = tagRef;
    typeof _ref$6 === "function" ? use(_ref$6, _el$60) : tagRef = _el$60;
    _el$60.addEventListener("mouseleave", () => {
      setMouseOver(false);
      setFocused(false);
    });
    _el$60.addEventListener("mouseenter", () => setMouseOver(true));
    _el$60.addEventListener("blur", () => setFocused(false));
    _el$60.addEventListener("focus", () => setFocused(true));
    spread(_el$60, mergeProps({
      get disabled() {
        return showLabel();
      },
      get ["aria-label"]() {
        return `${props.label}: ${props.count}`;
      },
      get ["class"]() {
        return clsx(styles().queryStatusTag, !showLabel() && css`
            cursor: pointer;
            &:hover {
              background: ${t22(colors.gray[200], colors.darkGray[400])}${alpha[80]};
            }
          `, "tsqd-query-status-tag", `tsqd-query-status-tag-${props.label.toLowerCase()}`);
      }
    }, () => mouseOver() || focused() ? {
      "aria-describedby": "tsqd-status-tooltip"
    } : {}), false, true);
    insert(_el$60, createComponent(Show, {
      get when() {
        return memo2(() => !!!showLabel())() && (mouseOver() || focused());
      },
      get children() {
        var _el$61 = _tmpl$27();
        insert(_el$61, () => props.label);
        createRenderEffect(() => className(_el$61, clsx(styles().statusTooltip, "tsqd-query-status-tooltip")));
        return _el$61;
      }
    }), _el$62);
    insert(_el$60, createComponent(Show, {
      get when() {
        return showLabel();
      },
      get children() {
        var _el$63 = _tmpl$28();
        insert(_el$63, () => props.label);
        createRenderEffect(() => className(_el$63, clsx(styles().queryStatusTagLabel, "tsqd-query-status-tag-label")));
        return _el$63;
      }
    }), _el$64);
    insert(_el$64, () => props.count);
    createRenderEffect((_p$) => {
      var _v$33 = clsx(css`
            width: ${tokens.size[1.5]};
            height: ${tokens.size[1.5]};
            border-radius: ${tokens.border.radius.full};
            background-color: ${tokens.colors[props.color][500]};
          `, "tsqd-query-status-tag-dot"), _v$34 = clsx(styles().queryStatusCount, props.count > 0 && props.color !== "gray" && css`
              background-color: ${t22(colors[props.color][100], colors[props.color][900])};
              color: ${t22(colors[props.color][700], colors[props.color][300])};
            `, "tsqd-query-status-tag-count");
      _v$33 !== _p$.e && className(_el$62, _p$.e = _v$33);
      _v$34 !== _p$.t && className(_el$64, _p$.t = _v$34);
      return _p$;
    }, {
      e: undefined,
      t: undefined
    });
    return _el$60;
  })();
}, QueryDetails = () => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors
  } = tokens;
  const t22 = (light, dark) => theme() === "dark" ? dark : light;
  const queryClient = useQueryDevtoolsContext().client;
  const [restoringLoading, setRestoringLoading] = createSignal(false);
  const [dataMode, setDataMode] = createSignal("view");
  const [dataEditError, setDataEditError] = createSignal(false);
  const errorTypes = createMemo(() => {
    return useQueryDevtoolsContext().errorTypes || [];
  });
  const activeQuery = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().find((query) => query.queryHash === selectedQueryHash()), false);
  const activeQueryFresh = createSubscribeToQueryCacheBatcher((queryCache) => {
    return queryCache().getAll().find((query) => query.queryHash === selectedQueryHash());
  }, false);
  const activeQueryState = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())?.state, false);
  const activeQueryStateData = createSubscribeToQueryCacheBatcher((queryCache) => {
    return queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())?.state.data;
  }, false);
  const statusLabel = createSubscribeToQueryCacheBatcher((queryCache) => {
    const query = queryCache().getAll().find((q) => q.queryHash === selectedQueryHash());
    if (!query)
      return "inactive";
    return getQueryStatusLabel(query);
  });
  const queryStatus = createSubscribeToQueryCacheBatcher((queryCache) => {
    const query = queryCache().getAll().find((q) => q.queryHash === selectedQueryHash());
    if (!query)
      return "pending";
    return query.state.status;
  });
  const observerCount = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())?.getObserversCount() ?? 0);
  const color = createMemo(() => getQueryStatusColorByLabel(statusLabel()));
  const handleRefetch = () => {
    sendDevToolsEvent({
      type: "REFETCH",
      queryHash: activeQuery()?.queryHash
    });
    const promise = activeQuery()?.fetch();
    promise?.catch(() => {});
  };
  const triggerError = (errorType) => {
    const activeQueryVal = activeQuery();
    if (!activeQueryVal)
      return;
    sendDevToolsEvent({
      type: "TRIGGER_ERROR",
      queryHash: activeQueryVal.queryHash,
      metadata: {
        error: errorType?.name
      }
    });
    const error = errorType?.initializer(activeQueryVal) ?? new Error("Unknown error from devtools");
    const __previousQueryOptions = activeQueryVal.options;
    activeQueryVal.setState({
      data: undefined,
      status: "error",
      error,
      fetchMeta: {
        ...activeQueryVal.state.fetchMeta,
        __previousQueryOptions
      }
    });
  };
  const restoreQueryAfterLoadingOrError = () => {
    const activeQueryVal = activeQuery();
    if (!activeQueryVal)
      return;
    sendDevToolsEvent({
      type: "RESTORE_LOADING",
      queryHash: activeQueryVal.queryHash
    });
    const previousState = activeQueryVal.state;
    const previousOptions = activeQueryVal.state.fetchMeta ? activeQueryVal.state.fetchMeta.__previousQueryOptions : null;
    activeQueryVal.cancel({
      silent: true
    });
    activeQueryVal.setState({
      ...previousState,
      fetchStatus: "idle",
      fetchMeta: null
    });
    if (previousOptions) {
      activeQueryVal.fetch(previousOptions);
    }
  };
  createEffect(() => {
    if (statusLabel() !== "fetching") {
      setRestoringLoading(false);
    }
  });
  const getQueryStatusColors = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t22(colors[color()][200], colors[color()][700])};
        color: ${t22(colors[color()][700], colors[color()][300])};
        border-color: ${t22(colors[color()][400], colors[color()][600])};
      `;
    }
    return css`
      background-color: ${t22(colors[color()][100], colors[color()][900])};
      color: ${t22(colors[color()][700], colors[color()][300])};
      border-color: ${t22(colors[color()][400], colors[color()][600])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return memo2(() => !!activeQuery())() && activeQueryState();
    },
    get children() {
      var _el$65 = _tmpl$34(), _el$66 = _el$65.firstChild, _el$67 = _el$66.nextSibling, _el$68 = _el$67.firstChild, _el$69 = _el$68.firstChild, _el$70 = _el$69.firstChild, _el$71 = _el$69.nextSibling, _el$72 = _el$68.nextSibling, _el$73 = _el$72.firstChild, _el$74 = _el$73.nextSibling, _el$75 = _el$72.nextSibling, _el$76 = _el$75.firstChild, _el$77 = _el$76.nextSibling, _el$78 = _el$67.nextSibling, _el$79 = _el$78.nextSibling, _el$80 = _el$79.firstChild, _el$81 = _el$80.firstChild, _el$82 = _el$80.nextSibling, _el$83 = _el$82.firstChild, _el$84 = _el$82.nextSibling, _el$85 = _el$84.firstChild, _el$86 = _el$84.nextSibling, _el$87 = _el$86.firstChild, _el$88 = _el$86.nextSibling, _el$89 = _el$88.firstChild, _el$90 = _el$89.nextSibling, _el$99 = _el$79.nextSibling;
      _el$99.firstChild;
      var _el$109 = _el$99.nextSibling, _el$110 = _el$109.nextSibling;
      insert(_el$70, () => displayValue(activeQuery().queryKey, true));
      insert(_el$71, statusLabel);
      insert(_el$74, observerCount);
      insert(_el$77, () => new Date(activeQueryState().dataUpdatedAt).toLocaleTimeString());
      _el$80.$$click = handleRefetch;
      _el$82.$$click = () => {
        sendDevToolsEvent({
          type: "INVALIDATE",
          queryHash: activeQuery()?.queryHash
        });
        queryClient.invalidateQueries(activeQuery());
      };
      _el$84.$$click = () => {
        sendDevToolsEvent({
          type: "RESET",
          queryHash: activeQuery()?.queryHash
        });
        queryClient.resetQueries(activeQuery());
      };
      _el$86.$$click = () => {
        sendDevToolsEvent({
          type: "REMOVE",
          queryHash: activeQuery()?.queryHash
        });
        queryClient.removeQueries(activeQuery());
        setSelectedQueryHash(null);
      };
      _el$88.$$click = () => {
        if (activeQuery()?.state.data === undefined) {
          setRestoringLoading(true);
          restoreQueryAfterLoadingOrError();
        } else {
          const activeQueryVal = activeQuery();
          if (!activeQueryVal)
            return;
          sendDevToolsEvent({
            type: "TRIGGER_LOADING",
            queryHash: activeQueryVal.queryHash
          });
          const __previousQueryOptions = activeQueryVal.options;
          activeQueryVal.fetch({
            ...__previousQueryOptions,
            queryFn: () => {
              return new Promise(() => {});
            },
            gcTime: -1
          });
          activeQueryVal.setState({
            data: undefined,
            status: "pending",
            fetchMeta: {
              ...activeQueryVal.state.fetchMeta,
              __previousQueryOptions
            }
          });
        }
      };
      insert(_el$88, () => queryStatus() === "pending" ? "Restore" : "Trigger", _el$90);
      insert(_el$79, createComponent(Show, {
        get when() {
          return errorTypes().length === 0 || queryStatus() === "error";
        },
        get children() {
          var _el$91 = _tmpl$30(), _el$92 = _el$91.firstChild, _el$93 = _el$92.nextSibling;
          _el$91.$$click = () => {
            if (!activeQuery().state.error) {
              triggerError();
            } else {
              sendDevToolsEvent({
                type: "RESTORE_ERROR",
                queryHash: activeQuery()?.queryHash
              });
              queryClient.resetQueries(activeQuery());
            }
          };
          insert(_el$91, () => queryStatus() === "error" ? "Restore" : "Trigger", _el$93);
          createRenderEffect((_p$) => {
            var _v$35 = clsx(css`
                  color: ${t22(colors.red[500], colors.red[400])};
                `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error"), _v$36 = queryStatus() === "pending", _v$37 = css`
                  background-color: ${t22(colors.red[500], colors.red[400])};
                `;
            _v$35 !== _p$.e && className(_el$91, _p$.e = _v$35);
            _v$36 !== _p$.t && (_el$91.disabled = _p$.t = _v$36);
            _v$37 !== _p$.a && className(_el$92, _p$.a = _v$37);
            return _p$;
          }, {
            e: undefined,
            t: undefined,
            a: undefined
          });
          return _el$91;
        }
      }), null);
      insert(_el$79, createComponent(Show, {
        get when() {
          return !(errorTypes().length === 0 || queryStatus() === "error");
        },
        get children() {
          var _el$94 = _tmpl$31(), _el$95 = _el$94.firstChild, _el$96 = _el$95.nextSibling, _el$97 = _el$96.nextSibling;
          _el$97.firstChild;
          _el$97.addEventListener("change", (e2) => {
            const errorType = errorTypes().find((et) => et.name === e2.currentTarget.value);
            triggerError(errorType);
          });
          insert(_el$97, createComponent(For, {
            get each() {
              return errorTypes();
            },
            children: (errorType) => (() => {
              var _el$111 = _tmpl$35();
              insert(_el$111, () => errorType.name);
              createRenderEffect(() => _el$111.value = errorType.name);
              return _el$111;
            })()
          }), null);
          insert(_el$94, createComponent(ChevronDown, {}), null);
          createRenderEffect((_p$) => {
            var _v$38 = clsx(styles().actionsSelect, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error-multiple"), _v$39 = css`
                  background-color: ${tokens.colors.red[400]};
                `, _v$40 = queryStatus() === "pending";
            _v$38 !== _p$.e && className(_el$94, _p$.e = _v$38);
            _v$39 !== _p$.t && className(_el$95, _p$.t = _v$39);
            _v$40 !== _p$.a && (_el$97.disabled = _p$.a = _v$40);
            return _p$;
          }, {
            e: undefined,
            t: undefined,
            a: undefined
          });
          return _el$94;
        }
      }), null);
      insert(_el$99, () => dataMode() === "view" ? "Explorer" : "Editor", null);
      insert(_el$65, createComponent(Show, {
        get when() {
          return dataMode() === "view";
        },
        get children() {
          var _el$101 = _tmpl$322();
          insert(_el$101, createComponent(Explorer, {
            label: "Data",
            defaultExpanded: ["Data"],
            get value() {
              return activeQueryStateData();
            },
            editable: true,
            onEdit: () => setDataMode("edit"),
            get activeQuery() {
              return activeQuery();
            }
          }));
          createRenderEffect((_$p) => (_$p = tokens.size[2]) != null ? _el$101.style.setProperty("padding", _$p) : _el$101.style.removeProperty("padding"));
          return _el$101;
        }
      }), _el$109);
      insert(_el$65, createComponent(Show, {
        get when() {
          return dataMode() === "edit";
        },
        get children() {
          var _el$102 = _tmpl$332(), _el$103 = _el$102.firstChild, _el$104 = _el$103.nextSibling, _el$105 = _el$104.firstChild, _el$106 = _el$105.nextSibling, _el$107 = _el$106.firstChild, _el$108 = _el$107.nextSibling;
          _el$102.addEventListener("submit", (e2) => {
            e2.preventDefault();
            const formData = new FormData(e2.currentTarget);
            const data = formData.get("data");
            try {
              const parsedData = JSON.parse(data);
              activeQuery().setState({
                ...activeQuery().state,
                data: parsedData
              });
              setDataMode("view");
            } catch (error) {
              setDataEditError(true);
            }
          });
          _el$103.addEventListener("focus", () => setDataEditError(false));
          insert(_el$105, () => dataEditError() ? "Invalid Value" : "");
          _el$107.$$click = () => setDataMode("view");
          createRenderEffect((_p$) => {
            var _v$41 = clsx(styles().devtoolsEditForm, "tsqd-query-details-data-editor"), _v$42 = styles().devtoolsEditTextarea, _v$43 = dataEditError(), _v$44 = styles().devtoolsEditFormActions, _v$45 = styles().devtoolsEditFormError, _v$46 = styles().devtoolsEditFormActionContainer, _v$47 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t22(colors.gray[600], colors.gray[300])};
                    `), _v$48 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t22(colors.blue[600], colors.blue[400])};
                    `);
            _v$41 !== _p$.e && className(_el$102, _p$.e = _v$41);
            _v$42 !== _p$.t && className(_el$103, _p$.t = _v$42);
            _v$43 !== _p$.a && setAttribute(_el$103, "data-error", _p$.a = _v$43);
            _v$44 !== _p$.o && className(_el$104, _p$.o = _v$44);
            _v$45 !== _p$.i && className(_el$105, _p$.i = _v$45);
            _v$46 !== _p$.n && className(_el$106, _p$.n = _v$46);
            _v$47 !== _p$.s && className(_el$107, _p$.s = _v$47);
            _v$48 !== _p$.h && className(_el$108, _p$.h = _v$48);
            return _p$;
          }, {
            e: undefined,
            t: undefined,
            a: undefined,
            o: undefined,
            i: undefined,
            n: undefined,
            s: undefined,
            h: undefined
          });
          createRenderEffect(() => _el$103.value = JSON.stringify(activeQueryStateData(), null, 2));
          return _el$102;
        }
      }), _el$109);
      insert(_el$110, createComponent(Explorer, {
        label: "Query",
        defaultExpanded: ["Query", "queryKey"],
        get value() {
          return activeQueryFresh();
        }
      }));
      createRenderEffect((_p$) => {
        var _v$49 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$50 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$51 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$52 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$53 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$54 = clsx(styles().actionsBody, "tsqd-query-details-actions-container"), _v$55 = clsx(css`
                color: ${t22(colors.blue[600], colors.blue[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-refetch"), _v$56 = statusLabel() === "fetching", _v$57 = css`
                background-color: ${t22(colors.blue[600], colors.blue[400])};
              `, _v$58 = clsx(css`
                color: ${t22(colors.yellow[600], colors.yellow[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-invalidate"), _v$59 = queryStatus() === "pending", _v$60 = css`
                background-color: ${t22(colors.yellow[600], colors.yellow[400])};
              `, _v$61 = clsx(css`
                color: ${t22(colors.gray[600], colors.gray[300])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-reset"), _v$62 = queryStatus() === "pending", _v$63 = css`
                background-color: ${t22(colors.gray[600], colors.gray[400])};
              `, _v$64 = clsx(css`
                color: ${t22(colors.pink[500], colors.pink[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-remove"), _v$65 = statusLabel() === "fetching", _v$66 = css`
                background-color: ${t22(colors.pink[500], colors.pink[400])};
              `, _v$67 = clsx(css`
                color: ${t22(colors.cyan[500], colors.cyan[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-loading"), _v$68 = restoringLoading(), _v$69 = css`
                background-color: ${t22(colors.cyan[500], colors.cyan[400])};
              `, _v$70 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$71 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$72 = tokens.size[2];
        _v$49 !== _p$.e && className(_el$65, _p$.e = _v$49);
        _v$50 !== _p$.t && className(_el$66, _p$.t = _v$50);
        _v$51 !== _p$.a && className(_el$67, _p$.a = _v$51);
        _v$52 !== _p$.o && className(_el$71, _p$.o = _v$52);
        _v$53 !== _p$.i && className(_el$78, _p$.i = _v$53);
        _v$54 !== _p$.n && className(_el$79, _p$.n = _v$54);
        _v$55 !== _p$.s && className(_el$80, _p$.s = _v$55);
        _v$56 !== _p$.h && (_el$80.disabled = _p$.h = _v$56);
        _v$57 !== _p$.r && className(_el$81, _p$.r = _v$57);
        _v$58 !== _p$.d && className(_el$82, _p$.d = _v$58);
        _v$59 !== _p$.l && (_el$82.disabled = _p$.l = _v$59);
        _v$60 !== _p$.u && className(_el$83, _p$.u = _v$60);
        _v$61 !== _p$.c && className(_el$84, _p$.c = _v$61);
        _v$62 !== _p$.w && (_el$84.disabled = _p$.w = _v$62);
        _v$63 !== _p$.m && className(_el$85, _p$.m = _v$63);
        _v$64 !== _p$.f && className(_el$86, _p$.f = _v$64);
        _v$65 !== _p$.y && (_el$86.disabled = _p$.y = _v$65);
        _v$66 !== _p$.g && className(_el$87, _p$.g = _v$66);
        _v$67 !== _p$.p && className(_el$88, _p$.p = _v$67);
        _v$68 !== _p$.b && (_el$88.disabled = _p$.b = _v$68);
        _v$69 !== _p$.T && className(_el$89, _p$.T = _v$69);
        _v$70 !== _p$.A && className(_el$99, _p$.A = _v$70);
        _v$71 !== _p$.O && className(_el$109, _p$.O = _v$71);
        _v$72 !== _p$.I && ((_p$.I = _v$72) != null ? _el$110.style.setProperty("padding", _v$72) : _el$110.style.removeProperty("padding"));
        return _p$;
      }, {
        e: undefined,
        t: undefined,
        a: undefined,
        o: undefined,
        i: undefined,
        n: undefined,
        s: undefined,
        h: undefined,
        r: undefined,
        d: undefined,
        l: undefined,
        u: undefined,
        c: undefined,
        w: undefined,
        m: undefined,
        f: undefined,
        y: undefined,
        g: undefined,
        p: undefined,
        b: undefined,
        T: undefined,
        A: undefined,
        O: undefined,
        I: undefined
      });
      return _el$65;
    }
  });
}, MutationDetails = () => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors
  } = tokens;
  const t22 = (light, dark) => theme() === "dark" ? dark : light;
  const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
    if (!mutation)
      return false;
    return mutation.state.isPaused;
  });
  const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
    if (!mutation)
      return "idle";
    return mutation.state.status;
  });
  const color = createMemo(() => getMutationStatusColor({
    isPaused: isPaused(),
    status: status()
  }));
  const activeMutation = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().find((mutation) => mutation.mutationId === selectedMutationId()), false);
  const getQueryStatusColors = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t22(colors[color()][200], colors[color()][700])};
        color: ${t22(colors[color()][700], colors[color()][300])};
        border-color: ${t22(colors[color()][400], colors[color()][600])};
      `;
    }
    return css`
      background-color: ${t22(colors[color()][100], colors[color()][900])};
      color: ${t22(colors[color()][700], colors[color()][300])};
      border-color: ${t22(colors[color()][400], colors[color()][600])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return activeMutation();
    },
    get children() {
      var _el$112 = _tmpl$36(), _el$113 = _el$112.firstChild, _el$114 = _el$113.nextSibling, _el$115 = _el$114.firstChild, _el$116 = _el$115.firstChild, _el$117 = _el$116.firstChild, _el$118 = _el$116.nextSibling, _el$119 = _el$115.nextSibling, _el$120 = _el$119.firstChild, _el$121 = _el$120.nextSibling, _el$122 = _el$114.nextSibling, _el$123 = _el$122.nextSibling, _el$124 = _el$123.nextSibling, _el$125 = _el$124.nextSibling, _el$126 = _el$125.nextSibling, _el$127 = _el$126.nextSibling, _el$128 = _el$127.nextSibling, _el$129 = _el$128.nextSibling;
      insert(_el$117, createComponent(Show, {
        get when() {
          return activeMutation().options.mutationKey;
        },
        fallback: "No mutationKey found",
        get children() {
          return displayValue(activeMutation().options.mutationKey, true);
        }
      }));
      insert(_el$118, createComponent(Show, {
        get when() {
          return color() === "purple";
        },
        children: "pending"
      }), null);
      insert(_el$118, createComponent(Show, {
        get when() {
          return color() !== "purple";
        },
        get children() {
          return status();
        }
      }), null);
      insert(_el$121, () => new Date(activeMutation().state.submittedAt).toLocaleTimeString());
      insert(_el$123, createComponent(Explorer, {
        label: "Variables",
        defaultExpanded: ["Variables"],
        get value() {
          return activeMutation().state.variables;
        }
      }));
      insert(_el$125, createComponent(Explorer, {
        label: "Context",
        defaultExpanded: ["Context"],
        get value() {
          return activeMutation().state.context;
        }
      }));
      insert(_el$127, createComponent(Explorer, {
        label: "Data",
        defaultExpanded: ["Data"],
        get value() {
          return activeMutation().state.data;
        }
      }));
      insert(_el$129, createComponent(Explorer, {
        label: "Mutation",
        defaultExpanded: ["Mutation"],
        get value() {
          return activeMutation();
        }
      }));
      createRenderEffect((_p$) => {
        var _v$73 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$74 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$75 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$76 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$77 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$78 = tokens.size[2], _v$79 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$80 = tokens.size[2], _v$81 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$82 = tokens.size[2], _v$83 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$84 = tokens.size[2];
        _v$73 !== _p$.e && className(_el$112, _p$.e = _v$73);
        _v$74 !== _p$.t && className(_el$113, _p$.t = _v$74);
        _v$75 !== _p$.a && className(_el$114, _p$.a = _v$75);
        _v$76 !== _p$.o && className(_el$118, _p$.o = _v$76);
        _v$77 !== _p$.i && className(_el$122, _p$.i = _v$77);
        _v$78 !== _p$.n && ((_p$.n = _v$78) != null ? _el$123.style.setProperty("padding", _v$78) : _el$123.style.removeProperty("padding"));
        _v$79 !== _p$.s && className(_el$124, _p$.s = _v$79);
        _v$80 !== _p$.h && ((_p$.h = _v$80) != null ? _el$125.style.setProperty("padding", _v$80) : _el$125.style.removeProperty("padding"));
        _v$81 !== _p$.r && className(_el$126, _p$.r = _v$81);
        _v$82 !== _p$.d && ((_p$.d = _v$82) != null ? _el$127.style.setProperty("padding", _v$82) : _el$127.style.removeProperty("padding"));
        _v$83 !== _p$.l && className(_el$128, _p$.l = _v$83);
        _v$84 !== _p$.u && ((_p$.u = _v$84) != null ? _el$129.style.setProperty("padding", _v$84) : _el$129.style.removeProperty("padding"));
        return _p$;
      }, {
        e: undefined,
        t: undefined,
        a: undefined,
        o: undefined,
        i: undefined,
        n: undefined,
        s: undefined,
        h: undefined,
        r: undefined,
        d: undefined,
        l: undefined,
        u: undefined
      });
      return _el$112;
    }
  });
}, queryCacheMap, setupQueryCacheSubscription = () => {
  const queryCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getQueryCache();
  });
  const unsubscribe = queryCache().subscribe((q) => {
    batch(() => {
      for (const [callback, value] of queryCacheMap.entries()) {
        if (!value.shouldUpdate(q))
          continue;
        value.setter(callback(queryCache));
      }
    });
  });
  onCleanup(() => {
    queryCacheMap.clear();
    unsubscribe();
  });
  return unsubscribe;
}, createSubscribeToQueryCacheBatcher = (callback, equalityCheck = true, shouldUpdate = () => true) => {
  const queryCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getQueryCache();
  });
  const [value, setValue] = createSignal(callback(queryCache), !equalityCheck ? {
    equals: false
  } : undefined);
  createEffect(() => {
    setValue(callback(queryCache));
  });
  queryCacheMap.set(callback, {
    setter: setValue,
    shouldUpdate
  });
  onCleanup(() => {
    queryCacheMap.delete(callback);
  });
  return value;
}, mutationCacheMap, setupMutationCacheSubscription = () => {
  const mutationCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getMutationCache();
  });
  const unsubscribe = mutationCache().subscribe(() => {
    for (const [callback, setter] of mutationCacheMap.entries()) {
      queueMicrotask(() => {
        setter(callback(mutationCache));
      });
    }
  });
  onCleanup(() => {
    mutationCacheMap.clear();
    unsubscribe();
  });
  return unsubscribe;
}, createSubscribeToMutationCacheBatcher = (callback, equalityCheck = true) => {
  const mutationCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getMutationCache();
  });
  const [value, setValue] = createSignal(callback(mutationCache), !equalityCheck ? {
    equals: false
  } : undefined);
  createEffect(() => {
    setValue(callback(mutationCache));
  });
  mutationCacheMap.set(callback, setValue);
  onCleanup(() => {
    mutationCacheMap.delete(callback);
  });
  return value;
}, DEV_TOOLS_EVENT = "@tanstack/query-devtools-event", sendDevToolsEvent = ({
  type,
  queryHash,
  metadata
}) => {
  const event = new CustomEvent(DEV_TOOLS_EVENT, {
    detail: {
      type,
      queryHash,
      metadata
    },
    bubbles: true,
    cancelable: true
  });
  window.dispatchEvent(event);
}, stylesFactory2 = (theme, css) => {
  const {
    colors,
    font,
    size: size3,
    alpha,
    shadow,
    border
  } = tokens;
  const t22 = (light, dark) => theme === "light" ? light : dark;
  return {
    devtoolsBtn: css`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${shadow.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${colors.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,
    panel: css`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t22(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t22(colors.gray[400], colors.darkGray[300])};
      }
    `,
    parentPanel: css`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t22(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t22(colors.gray[400], colors.darkGray[300])};
      }
    `,
    "devtoolsBtn-position-bottom-right": css`
      bottom: 12px;
      right: 12px;
    `,
    "devtoolsBtn-position-bottom-left": css`
      bottom: 12px;
      left: 12px;
    `,
    "devtoolsBtn-position-top-left": css`
      top: 12px;
      left: 12px;
    `,
    "devtoolsBtn-position-top-right": css`
      top: 12px;
      right: 12px;
    `,
    "devtoolsBtn-position-relative": css`
      position: relative;
    `,
    "panel-position-top": css`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-bottom: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
    "panel-position-bottom": css`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-top: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
    "panel-position-right": css`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
    "panel-position-left": css`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
    closeBtn: css`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${t22(colors.gray[50], colors.darkGray[700])};
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${colors.blue[600]};
      }
      & svg {
        color: ${t22(colors.gray[600], colors.gray[400])};
        width: ${size3[2]};
        height: ${size3[2]};
      }
    `,
    "closeBtn-position-top": css`
      bottom: 0;
      right: ${size3[2]};
      transform: translate(0, 100%);
      border-right: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${border.radius.sm} ${border.radius.sm};
      padding: ${size3[0.5]} ${size3[1.5]} ${size3[1]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,
    "closeBtn-position-bottom": css`
      top: 0;
      right: ${size3[2]};
      transform: translate(0, -100%);
      border-right: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${border.radius.sm} ${border.radius.sm} 0px 0px;
      padding: ${size3[1]} ${size3[1.5]} ${size3[0.5]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }
    `,
    "closeBtn-position-right": css`
      bottom: ${size3[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: ${border.radius.sm} 0px 0px ${border.radius.sm};
      padding: ${size3[1.5]} ${size3[0.5]} ${size3[1.5]} ${size3[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,
    "closeBtn-position-left": css`
      bottom: ${size3[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t22(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px ${border.radius.sm} ${border.radius.sm} 0px;
      padding: ${size3[1.5]} ${size3[1]} ${size3[1.5]} ${size3[0.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,
    queriesContainer: css`
      flex: 1 1 700px;
      background-color: ${t22(colors.gray[50], colors.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,
    dragHandle: css`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${colors.purple[400]}${t22("", alpha[90])};
      }
      &:focus {
        outline: none;
        background-color: ${colors.purple[400]}${t22("", alpha[90])};
      }
      &:focus-visible {
        outline: 2px solid ${colors.blue[800]};
        outline-offset: -2px;
        background-color: ${colors.purple[400]}${t22("", alpha[90])};
      }
      z-index: 4;
    `,
    "dragHandle-position-top": css`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
    "dragHandle-position-bottom": css`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
    "dragHandle-position-right": css`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
    "dragHandle-position-left": css`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
    row: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${tokens.size[2]} ${tokens.size[2.5]};
      gap: ${tokens.size[2.5]};
      border-bottom: ${t22(colors.gray[300], colors.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${size3[0.5]};
        flex-direction: column;
      }
    `,
    logoAndToggleContainer: css`
      display: flex;
      gap: ${tokens.size[3]};
      align-items: center;
    `,
    logo: css`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${tokens.size[0.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    tanstackLogo: css`
      font-size: ${font.size.md};
      font-weight: ${font.weight.bold};
      line-height: ${font.lineHeight.xs};
      white-space: nowrap;
      color: ${t22(colors.gray[600], colors.gray[300])};
    `,
    queryFlavorLogo: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(
        to right,
        ${t22("#ea4037, #ff9b11", "#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
    queryStatusContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      height: min-content;
    `,
    queryStatusTag: css`
      display: flex;
      gap: ${tokens.size[1.5]};
      box-sizing: border-box;
      height: ${tokens.size[6.5]};
      background: ${t22(colors.gray[50], colors.darkGray[500])};
      color: ${t22(colors.gray[700], colors.gray[300])};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.sm};
      padding: ${tokens.size[1]};
      padding-left: ${tokens.size[1.5]};
      align-items: center;
      font-weight: ${font.weight.medium};
      border: ${t22("1px solid " + colors.gray[300], "1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    queryStatusTagLabel: css`
      font-size: ${font.size.xs};
    `,
    queryStatusCount: css`
      font-size: ${font.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t22(colors.gray[500], colors.gray[400])};
      background-color: ${t22(colors.gray[200], colors.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${tokens.size[4.5]};
    `,
    statusTooltip: css`
      position: absolute;
      z-index: 1;
      background-color: ${t22(colors.gray[50], colors.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${tokens.size[2]}));
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.xs};
      border: 1px solid ${t22(colors.gray[400], colors.gray[600])};
      color: ${t22(colors["gray"][600], colors["gray"][300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${t22(colors.gray[400], colors.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${t22(colors.gray[100], colors.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,
    filtersContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      & > button {
        cursor: pointer;
        padding: ${tokens.size[0.5]} ${tokens.size[1.5]} ${tokens.size[0.5]}
          ${tokens.size[2]};
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t22(colors.gray[100], colors.darkGray[400])};
        border: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
        color: ${t22(colors.gray[700], colors.gray[300])};
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        line-height: ${font.lineHeight.sm};
        gap: ${tokens.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        & svg {
          width: ${tokens.size[3]};
          height: ${tokens.size[3]};
          color: ${t22(colors.gray[500], colors.gray[400])};
        }
      }
    `,
    filterInput: css`
      padding: ${size3[0.5]} ${size3[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t22(colors.gray[100], colors.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      color: ${t22(colors.gray[600], colors.gray[400])};
      & > svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      & input {
        font-size: ${font.size.xs};
        width: 100%;
        background-color: ${t22(colors.gray[100], colors.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${font.lineHeight.sm};
        color: ${t22(colors.gray[700], colors.gray[300])};
        &::placeholder {
          color: ${t22(colors.gray[700], colors.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    filterSelect: css`
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t22(colors.gray[100], colors.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${t22(colors.gray[600], colors.gray[400])};
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      & > select {
        appearance: none;
        color: ${t22(colors.gray[700], colors.gray[300])};
        min-width: 100px;
        line-height: ${font.lineHeight.sm};
        font-size: ${font.size.xs};
        background-color: ${t22(colors.gray[100], colors.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    actionsContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
    `,
    actionsBtn: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t22(colors.gray[100], colors.darkGray[400])};
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
      width: ${tokens.size[6.5]};
      height: ${tokens.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }
      & svg {
        color: ${t22(colors.gray[700], colors.gray[300])};
        width: ${tokens.size[3]};
        height: ${tokens.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    actionsBtnOffline: css`
      & svg {
        stroke: ${t22(colors.yellow[700], colors.yellow[500])};
        fill: ${t22(colors.yellow[700], colors.yellow[500])};
      }
    `,
    overflowQueryContainer: css`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,
    queryRow: css`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${t22(colors.gray[700], colors.gray[300])};
      background-color: ${t22(colors.gray[50], colors.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${t22(colors.gray[200], colors.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${tokens.size[1]};
        user-select: none;
        min-width: ${tokens.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${font.size.xs};
        font-weight: ${font.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${t22(colors.gray[300], colors.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        min-height: ${tokens.size[6]};
        flex: 1;
        padding: ${tokens.size[1]} ${tokens.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${tokens.size[2]};
        color: ${t22(colors.gray[800], colors.gray[300])};
        background-color: ${t22(colors.gray[300], colors.darkGray[600])};
        border-bottom: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
        font-size: ${font.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${tokens.size[2]};
        color: ${t22(colors.teal[800], colors.teal[300])};
        background-color: ${t22(colors.teal[100], colors.teal[900])};
        border-bottom: 1px solid ${t22(colors.teal[300], colors.teal[700])};
        font-size: ${font.size.xs};
      }
    `,
    selectedQueryRow: css`
      background-color: ${t22(colors.gray[200], colors.darkGray[500])};
    `,
    detailsContainer: css`
      flex: 1 1 700px;
      background-color: ${t22(colors.gray[50], colors.darkGray[700])};
      color: ${t22(colors.gray[700], colors.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,
    detailsHeader: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${t22(colors.gray[200], colors.darkGray[600])};
      padding: ${tokens.size[1.5]} ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      font-size: ${font.size.xs};
      line-height: ${font.lineHeight.xs};
      text-align: left;
    `,
    detailsBody: css`
      margin: ${tokens.size[1.5]} 0px ${tokens.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${tokens.size[2]};
        line-height: ${font.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${font.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${tokens.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${font.size.xs};
        line-height: ${font.lineHeight.xs};
        max-width: 100%;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,
    queryDetailsStatus: css`
      border: 1px solid ${colors.darkGray[200]};
      border-radius: ${tokens.border.radius.sm};
      font-weight: ${font.weight.medium};
      padding: ${tokens.size[1]} ${tokens.size[2.5]};
    `,
    actionsBody: css`
      flex-wrap: wrap;
      margin: ${tokens.size[2]} 0px ${tokens.size[2]} 0px;
      display: flex;
      gap: ${tokens.size[2]};
      padding: 0px ${tokens.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${font.size.xs};
        padding: ${tokens.size[1]} ${tokens.size[2]};
        display: flex;
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t22(colors.gray[100], colors.darkGray[600])};
        border: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
        align-items: center;
        gap: ${tokens.size[2]};
        font-weight: ${font.weight.medium};
        line-height: ${font.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        &:hover {
          background-color: ${t22(colors.gray[200], colors.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${size3[1.5]};
          height: ${size3[1.5]};
          border-radius: ${tokens.border.radius.full};
        }
      }
    `,
    actionsSelect: css`
      font-size: ${font.size.xs};
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      display: flex;
      border-radius: ${tokens.border.radius.sm};
      overflow: hidden;
      background-color: ${t22(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.sm};
      color: ${t22(colors.red[500], colors.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }
      & > span {
        width: ${size3[1.5]};
        height: ${size3[1.5]};
        border-radius: ${tokens.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${tokens.colors.red[400]};
      }
      & svg {
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
    `,
    settingsMenu: css`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${size3[0.5]};
      border-radius: ${tokens.border.radius.sm};
      border: 1px solid ${t22(colors.gray[300], colors.gray[700])};
      background-color: ${t22(colors.gray[50], colors.darkGray[600])};
      font-size: ${font.size.xs};
      color: ${t22(colors.gray[700], colors.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${size3[0.5]};
    `,
    settingsSubTrigger: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${t22(colors.gray[700], colors.gray[300])};
      & svg {
        color: ${t22(colors.gray[600], colors.gray[400])};
        transform: rotate(-90deg);
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
    settingsMenuHeader: css`
      padding: ${tokens.size[1]} ${tokens.size[1]};
      font-weight: ${font.weight.medium};
      border-bottom: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
      color: ${t22(colors.gray[500], colors.gray[400])};
      font-size: ${font.size["xs"]};
    `,
    settingsSubButton: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${t22(colors.gray[700], colors.gray[300])};
      font-size: ${font.size["xs"]};
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${t22(colors.gray[600], colors.gray[400])};
      }
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
      &[data-checked] {
        background-color: ${t22(colors.purple[100], colors.purple[900])};
        color: ${t22(colors.purple[700], colors.purple[300])};
        & svg {
          color: ${t22(colors.purple[700], colors.purple[300])};
        }
        &:hover {
          background-color: ${t22(colors.purple[100], colors.purple[900])};
        }
      }
    `,
    viewToggle: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t22(colors.gray[200], colors.darkGray[600])};
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${font.size.xs};
      color: ${t22(colors.gray[700], colors.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${colors.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${font.lineHeight.md};
        }

        & label:hover {
          background-color: ${t22(colors.gray[100], colors.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${t22(colors.gray[100], colors.darkGray[400])};
        & label:hover {
          background-color: ${t22(colors.gray[100], colors.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${tokens.size[1.5]} 0 ${tokens.size[2]};
        }
        border-right: 1px solid ${t22(colors.gray[300], colors.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${tokens.size[2]} 0 ${tokens.size[1.5]};
        }
      }
    `,
    devtoolsEditForm: css`
      padding: ${size3[2]};
      & > [data-error='true'] {
        outline: 2px solid ${t22(colors.red[200], colors.red[800])};
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
      }
    `,
    devtoolsEditTextarea: css`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${font.size.xs};
      border-radius: ${border.radius.sm};
      field-sizing: content;
      padding: ${size3[2]};
      background-color: ${t22(colors.gray[100], colors.darkGray[800])};
      color: ${t22(colors.gray[900], colors.gray[100])};
      border: 1px solid ${t22(colors.gray[200], colors.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${t22(colors.blue[200], colors.blue[800])};
      }
    `,
    devtoolsEditFormActions: css`
      display: flex;
      justify-content: space-between;
      gap: ${size3[2]};
      align-items: center;
      padding-top: ${size3[1]};
      font-size: ${font.size.xs};
    `,
    devtoolsEditFormError: css`
      color: ${t22(colors.red[700], colors.red[500])};
    `,
    devtoolsEditFormActionContainer: css`
      display: flex;
      gap: ${size3[2]};
    `,
    devtoolsEditFormAction: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${font.size.xs};
      padding: ${size3[1]} ${tokens.size[2]};
      display: flex;
      border-radius: ${border.radius.sm};
      background-color: ${t22(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t22(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${size3[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover {
        background-color: ${t22(colors.gray[200], colors.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `
  };
}, lightStyles2 = (css) => stylesFactory2("light", css), darkStyles2 = (css) => stylesFactory2("dark", css);
var init_HNLWDMU5 = __esm(() => {
  init_6FXOYLZD();
  isClient = !isServer2;
  isDev = isClient && !!DEV;
  tryOnCleanup = isDev ? (fn) => getOwner() ? onCleanup(fn) : fn : onCleanup;
  createLocalStorage = createStorage;
  cookieStorage = addClearMethod({
    _cookies: [globalThis.document, "cookie"],
    getItem: (key) => cookieStorage._cookies[0][cookieStorage._cookies[1]].match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")?.pop() ?? null,
    setItem: (key, value, options) => {
      const oldValue = cookieStorage.getItem(key);
      cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=${value}${serializeCookieOptions(options)}`;
      const storageEvent = Object.assign(new Event("storage"), {
        key,
        oldValue,
        newValue: value,
        url: globalThis.document.URL,
        storageArea: cookieStorage
      });
      window.dispatchEvent(storageEvent);
    },
    removeItem: (key) => {
      cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=deleted${serializeCookieOptions({
        expires: /* @__PURE__ */ new Date(0)
      })}`;
    },
    key: (index) => {
      let key = null;
      let count = 0;
      cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (_2, found) => {
        if (!key && found && count++ === index) {
          key = found;
        }
        return "";
      });
      return key;
    },
    get length() {
      let length = 0;
      cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, (found) => {
        length += found ? 1 : 0;
        return "";
      });
      return length;
    }
  });
  DEFAULT_SORT_FN_NAME = Object.keys(sortFns)[0];
  DEFAULT_MUTATION_SORT_FN_NAME = Object.keys(mutationSortFns)[0];
  QueryDevtoolsContext = createContext4({
    client: undefined,
    onlineManager: undefined,
    queryFlavor: "",
    version: "",
    shadowDOMTarget: undefined
  });
  PipOpenError = class extends Error {
  };
  PiPContext = createContext4(undefined);
  ThemeContext = createContext4(() => "dark");
  characterMap = {
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    Ấ: "A",
    Ắ: "A",
    Ẳ: "A",
    Ẵ: "A",
    Ặ: "A",
    Æ: "AE",
    Ầ: "A",
    Ằ: "A",
    Ȃ: "A",
    Ç: "C",
    Ḉ: "C",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    Ế: "E",
    Ḗ: "E",
    Ề: "E",
    Ḕ: "E",
    Ḝ: "E",
    Ȇ: "E",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    Ḯ: "I",
    Ȋ: "I",
    Ð: "D",
    Ñ: "N",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ø: "O",
    Ố: "O",
    Ṍ: "O",
    Ṓ: "O",
    Ȏ: "O",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    Ý: "Y",
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    ấ: "a",
    ắ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    æ: "ae",
    ầ: "a",
    ằ: "a",
    ȃ: "a",
    ç: "c",
    ḉ: "c",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ế: "e",
    ḗ: "e",
    ề: "e",
    ḕ: "e",
    ḝ: "e",
    ȇ: "e",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    ḯ: "i",
    ȋ: "i",
    ð: "d",
    ñ: "n",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ø: "o",
    ố: "o",
    ṍ: "o",
    ṓ: "o",
    ȏ: "o",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    ý: "y",
    ÿ: "y",
    Ā: "A",
    ā: "a",
    Ă: "A",
    ă: "a",
    Ą: "A",
    ą: "a",
    Ć: "C",
    ć: "c",
    Ĉ: "C",
    ĉ: "c",
    Ċ: "C",
    ċ: "c",
    Č: "C",
    č: "c",
    C̆: "C",
    c̆: "c",
    Ď: "D",
    ď: "d",
    Đ: "D",
    đ: "d",
    Ē: "E",
    ē: "e",
    Ĕ: "E",
    ĕ: "e",
    Ė: "E",
    ė: "e",
    Ę: "E",
    ę: "e",
    Ě: "E",
    ě: "e",
    Ĝ: "G",
    Ǵ: "G",
    ĝ: "g",
    ǵ: "g",
    Ğ: "G",
    ğ: "g",
    Ġ: "G",
    ġ: "g",
    Ģ: "G",
    ģ: "g",
    Ĥ: "H",
    ĥ: "h",
    Ħ: "H",
    ħ: "h",
    Ḫ: "H",
    ḫ: "h",
    Ĩ: "I",
    ĩ: "i",
    Ī: "I",
    ī: "i",
    Ĭ: "I",
    ĭ: "i",
    Į: "I",
    į: "i",
    İ: "I",
    ı: "i",
    Ĳ: "IJ",
    ĳ: "ij",
    Ĵ: "J",
    ĵ: "j",
    Ķ: "K",
    ķ: "k",
    Ḱ: "K",
    ḱ: "k",
    K̆: "K",
    k̆: "k",
    Ĺ: "L",
    ĺ: "l",
    Ļ: "L",
    ļ: "l",
    Ľ: "L",
    ľ: "l",
    Ŀ: "L",
    ŀ: "l",
    Ł: "l",
    ł: "l",
    Ḿ: "M",
    ḿ: "m",
    M̆: "M",
    m̆: "m",
    Ń: "N",
    ń: "n",
    Ņ: "N",
    ņ: "n",
    Ň: "N",
    ň: "n",
    ŉ: "n",
    N̆: "N",
    n̆: "n",
    Ō: "O",
    ō: "o",
    Ŏ: "O",
    ŏ: "o",
    Ő: "O",
    ő: "o",
    Œ: "OE",
    œ: "oe",
    P̆: "P",
    p̆: "p",
    Ŕ: "R",
    ŕ: "r",
    Ŗ: "R",
    ŗ: "r",
    Ř: "R",
    ř: "r",
    R̆: "R",
    r̆: "r",
    Ȓ: "R",
    ȓ: "r",
    Ś: "S",
    ś: "s",
    Ŝ: "S",
    ŝ: "s",
    Ş: "S",
    Ș: "S",
    ș: "s",
    ş: "s",
    Š: "S",
    š: "s",
    Ţ: "T",
    ţ: "t",
    ț: "t",
    Ț: "T",
    Ť: "T",
    ť: "t",
    Ŧ: "T",
    ŧ: "t",
    T̆: "T",
    t̆: "t",
    Ũ: "U",
    ũ: "u",
    Ū: "U",
    ū: "u",
    Ŭ: "U",
    ŭ: "u",
    Ů: "U",
    ů: "u",
    Ű: "U",
    ű: "u",
    Ų: "U",
    ų: "u",
    Ȗ: "U",
    ȗ: "u",
    V̆: "V",
    v̆: "v",
    Ŵ: "W",
    ŵ: "w",
    Ẃ: "W",
    ẃ: "w",
    X̆: "X",
    x̆: "x",
    Ŷ: "Y",
    ŷ: "y",
    Ÿ: "Y",
    Y̆: "Y",
    y̆: "y",
    Ź: "Z",
    ź: "z",
    Ż: "Z",
    ż: "z",
    Ž: "Z",
    ž: "z",
    ſ: "s",
    ƒ: "f",
    Ơ: "O",
    ơ: "o",
    Ư: "U",
    ư: "u",
    Ǎ: "A",
    ǎ: "a",
    Ǐ: "I",
    ǐ: "i",
    Ǒ: "O",
    ǒ: "o",
    Ǔ: "U",
    ǔ: "u",
    Ǖ: "U",
    ǖ: "u",
    Ǘ: "U",
    ǘ: "u",
    Ǚ: "U",
    ǚ: "u",
    Ǜ: "U",
    ǜ: "u",
    Ứ: "U",
    ứ: "u",
    Ṹ: "U",
    ṹ: "u",
    Ǻ: "A",
    ǻ: "a",
    Ǽ: "AE",
    ǽ: "ae",
    Ǿ: "O",
    ǿ: "o",
    Þ: "TH",
    þ: "th",
    Ṕ: "P",
    ṕ: "p",
    Ṥ: "S",
    ṥ: "s",
    X́: "X",
    x́: "x",
    Ѓ: "Г",
    ѓ: "г",
    Ќ: "К",
    ќ: "к",
    A̋: "A",
    a̋: "a",
    E̋: "E",
    e̋: "e",
    I̋: "I",
    i̋: "i",
    Ǹ: "N",
    ǹ: "n",
    Ồ: "O",
    ồ: "o",
    Ṑ: "O",
    ṑ: "o",
    Ừ: "U",
    ừ: "u",
    Ẁ: "W",
    ẁ: "w",
    Ỳ: "Y",
    ỳ: "y",
    Ȁ: "A",
    ȁ: "a",
    Ȅ: "E",
    ȅ: "e",
    Ȉ: "I",
    ȉ: "i",
    Ȍ: "O",
    ȍ: "o",
    Ȑ: "R",
    ȑ: "r",
    Ȕ: "U",
    ȕ: "u",
    B̌: "B",
    b̌: "b",
    Č̣: "C",
    č̣: "c",
    Ê̌: "E",
    ê̌: "e",
    F̌: "F",
    f̌: "f",
    Ǧ: "G",
    ǧ: "g",
    Ȟ: "H",
    ȟ: "h",
    J̌: "J",
    ǰ: "j",
    Ǩ: "K",
    ǩ: "k",
    M̌: "M",
    m̌: "m",
    P̌: "P",
    p̌: "p",
    Q̌: "Q",
    q̌: "q",
    Ř̩: "R",
    ř̩: "r",
    Ṧ: "S",
    ṧ: "s",
    V̌: "V",
    v̌: "v",
    W̌: "W",
    w̌: "w",
    X̌: "X",
    x̌: "x",
    Y̌: "Y",
    y̌: "y",
    A̧: "A",
    a̧: "a",
    B̧: "B",
    b̧: "b",
    Ḑ: "D",
    ḑ: "d",
    Ȩ: "E",
    ȩ: "e",
    Ɛ̧: "E",
    ɛ̧: "e",
    Ḩ: "H",
    ḩ: "h",
    I̧: "I",
    i̧: "i",
    Ɨ̧: "I",
    ɨ̧: "i",
    M̧: "M",
    m̧: "m",
    O̧: "O",
    o̧: "o",
    Q̧: "Q",
    q̧: "q",
    U̧: "U",
    u̧: "u",
    X̧: "X",
    x̧: "x",
    Z̧: "Z",
    z̧: "z"
  };
  chars = Object.keys(characterMap).join("|");
  allAccents = new RegExp(chars, "g");
  rankings = {
    CASE_SENSITIVE_EQUAL: 7,
    EQUAL: 6,
    STARTS_WITH: 5,
    WORD_STARTS_WITH: 4,
    CONTAINS: 3,
    ACRONYM: 2,
    MATCHES: 1,
    NO_MATCH: 0
  };
  defaultKeyAttributes = {
    maxRanking: Infinity,
    minRanking: -Infinity
  };
  e = { data: "" };
  l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
  a = /\/\*[^]*?\*\/|  +/g;
  n = /\n+/g;
  c = {};
  u.bind({ g: 1 });
  u.bind({ k: 1 });
  defaultElementPredicate = isServer2 ? (item) => item != null && typeof item === "object" && ("t" in item) : (item) => item instanceof Element;
  FALLBACK2 = /* @__PURE__ */ Symbol("fallback");
  extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
  EventKey = /* @__PURE__ */ ((EventKey2) => {
    EventKey2["Escape"] = "Escape";
    EventKey2["Enter"] = "Enter";
    EventKey2["Tab"] = "Tab";
    EventKey2["Space"] = " ";
    EventKey2["ArrowDown"] = "ArrowDown";
    EventKey2["ArrowLeft"] = "ArrowLeft";
    EventKey2["ArrowRight"] = "ArrowRight";
    EventKey2["ArrowUp"] = "ArrowUp";
    EventKey2["End"] = "End";
    EventKey2["Home"] = "Home";
    EventKey2["PageDown"] = "PageDown";
    EventKey2["PageUp"] = "PageUp";
    return EventKey2;
  })(EventKey || {});
  focusableElements = [
    "input:not([type='hidden']):not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "a[href]",
    "area[href]",
    "[tabindex]",
    "iframe",
    "object",
    "embed",
    "audio[controls]",
    "video[controls]",
    "[contenteditable]:not([contenteditable='false'])"
  ];
  tabbableElements = [...focusableElements, '[tabindex]:not([tabindex="-1"]):not([disabled])'];
  FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
  TABBABLE_ELEMENT_SELECTOR = tabbableElements.join(':not([hidden]):not([tabindex="-1"]),');
  transitionsByElement = /* @__PURE__ */ new Map;
  transitionCallbacks = /* @__PURE__ */ new Set;
  if (typeof document !== "undefined") {
    if (document.readyState !== "loading") {
      setupGlobalEvents();
    } else {
      document.addEventListener("DOMContentLoaded", setupGlobalEvents);
    }
  }
  visuallyHiddenStyles = {
    border: "0",
    clip: "rect(0 0 0 0)",
    "clip-path": "inset(50%)",
    height: "1px",
    margin: "0 -1px -1px 0",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
    "white-space": "nowrap"
  };
  FORM_CONTROL_PROP_NAMES = ["id", "name", "validationState", "required", "disabled", "readOnly"];
  FormControlContext = createContext4();
  __defProp2 = Object.defineProperty;
  DomCollectionContext = createContext4();
  RTL_SCRIPTS = /* @__PURE__ */ new Set([
    "Avst",
    "Arab",
    "Armi",
    "Syrc",
    "Samr",
    "Mand",
    "Thaa",
    "Mend",
    "Nkoo",
    "Adlm",
    "Rohg",
    "Hebr"
  ]);
  RTL_LANGS = /* @__PURE__ */ new Set([
    "ae",
    "ar",
    "arc",
    "bcc",
    "bqi",
    "ckb",
    "dv",
    "fa",
    "glk",
    "he",
    "ku",
    "mzn",
    "nqo",
    "pnb",
    "ps",
    "sd",
    "ug",
    "ur",
    "yi"
  ]);
  currentLocale = getDefaultLocale();
  listeners = /* @__PURE__ */ new Set;
  I18nContext = createContext4();
  cache = /* @__PURE__ */ new Map;
  Selection = class _Selection extends Set {
    anchorKey;
    currentKey;
    constructor(keys2, anchorKey, currentKey) {
      super(keys2);
      if (keys2 instanceof _Selection) {
        this.anchorKey = anchorKey || keys2.anchorKey;
        this.currentKey = currentKey || keys2.currentKey;
      } else {
        this.anchorKey = anchorKey;
        this.currentKey = currentKey;
      }
    }
  };
  ListCollection = class {
    keyMap = /* @__PURE__ */ new Map;
    iterable;
    firstKey;
    lastKey;
    constructor(nodes) {
      this.iterable = nodes;
      for (const node of nodes) {
        this.keyMap.set(node.key, node);
      }
      if (this.keyMap.size === 0) {
        return;
      }
      let last;
      let index = 0;
      for (const [key, node] of this.keyMap) {
        if (last) {
          last.nextKey = key;
          node.prevKey = last.key;
        } else {
          this.firstKey = key;
          node.prevKey = undefined;
        }
        if (node.type === "item") {
          node.index = index++;
        }
        last = node;
        last.nextKey = undefined;
      }
      this.lastKey = last.key;
    }
    *[Symbol.iterator]() {
      yield* this.iterable;
    }
    getSize() {
      return this.keyMap.size;
    }
    getKeys() {
      return this.keyMap.keys();
    }
    getKeyBefore(key) {
      return this.keyMap.get(key)?.prevKey;
    }
    getKeyAfter(key) {
      return this.keyMap.get(key)?.nextKey;
    }
    getFirstKey() {
      return this.firstKey;
    }
    getLastKey() {
      return this.lastKey;
    }
    getItem(key) {
      return this.keyMap.get(key);
    }
    at(idx) {
      const keys2 = [...this.getKeys()];
      return this.getItem(keys2[idx]);
    }
  };
  presence_default = createPresence;
  src_default = presence_default;
  layers = [];
  layerStack = {
    layers,
    isTopMostLayer,
    hasPointerBlockingLayer,
    isBelowPointerBlockingLayer,
    addLayer,
    removeLayer,
    indexOf,
    find: find2,
    assignPointerEventToLayers,
    disableBodyPointerEvents,
    restoreBodyPointerEvents
  };
  button_exports = {};
  __export2(button_exports, {
    Button: () => Button,
    Root: () => ButtonRoot
  });
  BUTTON_INPUT_TYPES = [
    "button",
    "color",
    "file",
    "image",
    "reset",
    "submit"
  ];
  Button = ButtonRoot;
  sides = ["top", "right", "bottom", "left"];
  min = Math.min;
  max = Math.max;
  round = Math.round;
  floor = Math.floor;
  oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  noOffsets = /* @__PURE__ */ createCoords(0);
  platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL: isRTL2
  };
  offset2 = offset;
  shift2 = shift;
  flip2 = flip;
  size2 = size;
  hide2 = hide;
  arrow2 = arrow;
  PopperContext = createContext4();
  _tmpl$ = /* @__PURE__ */ template(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`);
  HALF_DEFAULT_SIZE = DEFAULT_SIZE / 2;
  ROTATION_DEG = {
    top: 180,
    right: -90,
    bottom: 0,
    left: 90
  };
  REVERSE_BASE_PLACEMENT = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  };
  Popper = Object.assign(PopperRoot, {
    Arrow: PopperArrow,
    Context: PopperContext,
    usePopperContext,
    Positioner: PopperPositioner
  });
  DismissableLayerContext = createContext4();
  radio_group_exports = {};
  __export2(radio_group_exports, {
    Description: () => FormControlDescription,
    ErrorMessage: () => FormControlErrorMessage,
    Item: () => RadioGroupItem,
    ItemControl: () => RadioGroupItemControl,
    ItemDescription: () => RadioGroupItemDescription,
    ItemIndicator: () => RadioGroupItemIndicator,
    ItemInput: () => RadioGroupItemInput,
    ItemLabel: () => RadioGroupItemLabel,
    Label: () => RadioGroupLabel,
    RadioGroup: () => RadioGroup,
    Root: () => RadioGroupRoot
  });
  RadioGroupContext = createContext4();
  RadioGroupItemContext = createContext4();
  RadioGroup = Object.assign(RadioGroupRoot, {
    Description: FormControlDescription,
    ErrorMessage: FormControlErrorMessage,
    Item: RadioGroupItem,
    ItemControl: RadioGroupItemControl,
    ItemDescription: RadioGroupItemDescription,
    ItemIndicator: RadioGroupItemIndicator,
    ItemInput: RadioGroupItemInput,
    ItemLabel: RadioGroupItemLabel,
    Label: RadioGroupLabel
  });
  EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
  };
  focusScopeStack = {
    stack: [],
    active() {
      return this.stack[0];
    },
    add(scope) {
      if (scope !== this.active()) {
        this.active()?.pause();
      }
      this.stack = removeItemFromArray(this.stack, scope);
      this.stack.unshift(scope);
    },
    remove(scope) {
      this.stack = removeItemFromArray(this.stack, scope);
      this.active()?.resume();
    }
  };
  refCountMap = /* @__PURE__ */ new WeakMap;
  observerStack = [];
  activeStyles = /* @__PURE__ */ new Map;
  style_default = createStyle;
  [preventScrollStack, setPreventScrollStack] = createSignal([]);
  preventScroll_default = createPreventScroll;
  src_default2 = preventScroll_default;
  MenuContext = createContext4();
  MenuItemContext = createContext4();
  MenuRootContext = createContext4();
  MenubarContext = createContext4();
  MENUBAR_KEYS = {
    next: (dir, orientation) => dir === "ltr" ? orientation === "horizontal" ? "ArrowRight" : "ArrowDown" : orientation === "horizontal" ? "ArrowLeft" : "ArrowUp",
    previous: (dir, orientation) => MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation)
  };
  MENU_KEYS = {
    first: (orientation) => orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
    last: (orientation) => orientation === "horizontal" ? "ArrowUp" : "ArrowLeft"
  };
  NavigationMenuContext = createContext4();
  MenuGroupContext = createContext4();
  MenuRadioGroupContext = createContext4();
  SUB_CLOSE_KEYS = {
    close: (dir, orientation) => {
      if (dir === "ltr") {
        return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
      }
      return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
    }
  };
  SELECTION_KEYS = ["Enter", " "];
  SUB_OPEN_KEYS = {
    open: (dir, orientation) => {
      if (dir === "ltr") {
        return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
      }
      return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
    }
  };
  separator_exports = {};
  __export2(separator_exports, {
    Root: () => SeparatorRoot,
    Separator: () => Separator
  });
  Separator = SeparatorRoot;
  dropdown_menu_exports = {};
  __export2(dropdown_menu_exports, {
    Arrow: () => PopperArrow,
    CheckboxItem: () => MenuCheckboxItem,
    Content: () => DropdownMenuContent,
    DropdownMenu: () => DropdownMenu,
    Group: () => MenuGroup,
    GroupLabel: () => MenuGroupLabel,
    Icon: () => MenuIcon,
    Item: () => MenuItem,
    ItemDescription: () => MenuItemDescription,
    ItemIndicator: () => MenuItemIndicator,
    ItemLabel: () => MenuItemLabel,
    Portal: () => MenuPortal,
    RadioGroup: () => MenuRadioGroup,
    RadioItem: () => MenuRadioItem,
    Root: () => DropdownMenuRoot,
    Separator: () => SeparatorRoot,
    Sub: () => MenuSub,
    SubContent: () => MenuSubContent,
    SubTrigger: () => MenuSubTrigger,
    Trigger: () => MenuTrigger
  });
  DropdownMenu = Object.assign(DropdownMenuRoot, {
    Arrow: PopperArrow,
    CheckboxItem: MenuCheckboxItem,
    Content: DropdownMenuContent,
    Group: MenuGroup,
    GroupLabel: MenuGroupLabel,
    Icon: MenuIcon,
    Item: MenuItem,
    ItemDescription: MenuItemDescription,
    ItemIndicator: MenuItemIndicator,
    ItemLabel: MenuItemLabel,
    Portal: MenuPortal,
    RadioGroup: MenuRadioGroup,
    RadioItem: MenuRadioItem,
    Separator: SeparatorRoot,
    Sub: MenuSub,
    SubContent: MenuSubContent,
    SubTrigger: MenuSubTrigger,
    Trigger: MenuTrigger
  });
  tokens = {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      neutral: {
        50: "#f9fafb",
        100: "#f2f4f7",
        200: "#eaecf0",
        300: "#d0d5dd",
        400: "#98a2b3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1d2939",
        900: "#101828"
      },
      darkGray: {
        50: "#525c7a",
        100: "#49536e",
        200: "#414962",
        300: "#394056",
        400: "#313749",
        500: "#292e3d",
        600: "#212530",
        700: "#191c24",
        800: "#111318",
        900: "#0b0d10"
      },
      gray: {
        50: "#f9fafb",
        100: "#f2f4f7",
        200: "#eaecf0",
        300: "#d0d5dd",
        400: "#98a2b3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1d2939",
        900: "#101828"
      },
      blue: {
        25: "#F5FAFF",
        50: "#EFF8FF",
        100: "#D1E9FF",
        200: "#B2DDFF",
        300: "#84CAFF",
        400: "#53B1FD",
        500: "#2E90FA",
        600: "#1570EF",
        700: "#175CD3",
        800: "#1849A9",
        900: "#194185"
      },
      green: {
        25: "#F6FEF9",
        50: "#ECFDF3",
        100: "#D1FADF",
        200: "#A6F4C5",
        300: "#6CE9A6",
        400: "#32D583",
        500: "#12B76A",
        600: "#039855",
        700: "#027A48",
        800: "#05603A",
        900: "#054F31"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      yellow: {
        25: "#FFFCF5",
        50: "#FFFAEB",
        100: "#FEF0C7",
        200: "#FEDF89",
        300: "#FEC84B",
        400: "#FDB022",
        500: "#F79009",
        600: "#DC6803",
        700: "#B54708",
        800: "#93370D",
        900: "#7A2E0E"
      },
      purple: {
        25: "#FAFAFF",
        50: "#F4F3FF",
        100: "#EBE9FE",
        200: "#D9D6FE",
        300: "#BDB4FE",
        400: "#9B8AFB",
        500: "#7A5AF8",
        600: "#6938EF",
        700: "#5925DC",
        800: "#4A1FB8",
        900: "#3E1C96"
      },
      teal: {
        25: "#F6FEFC",
        50: "#F0FDF9",
        100: "#CCFBEF",
        200: "#99F6E0",
        300: "#5FE9D0",
        400: "#2ED3B7",
        500: "#15B79E",
        600: "#0E9384",
        700: "#107569",
        800: "#125D56",
        900: "#134E48"
      },
      pink: {
        25: "#fdf2f8",
        50: "#fce7f3",
        100: "#fbcfe8",
        200: "#f9a8d4",
        300: "#f472b6",
        400: "#ec4899",
        500: "#db2777",
        600: "#be185d",
        700: "#9d174d",
        800: "#831843",
        900: "#500724"
      },
      cyan: {
        25: "#ecfeff",
        50: "#cffafe",
        100: "#a5f3fc",
        200: "#67e8f9",
        300: "#22d3ee",
        400: "#06b6d4",
        500: "#0891b2",
        600: "#0e7490",
        700: "#155e75",
        800: "#164e63",
        900: "#083344"
      }
    },
    alpha: {
      100: "ff",
      90: "e5",
      80: "cc",
      70: "b3",
      60: "99",
      50: "80",
      40: "66",
      30: "4d",
      20: "33",
      10: "1a",
      0: "00"
    },
    font: {
      size: {
        "2xs": "calc(var(--tsqd-font-size) * 0.625)",
        xs: "calc(var(--tsqd-font-size) * 0.75)",
        sm: "calc(var(--tsqd-font-size) * 0.875)",
        md: "var(--tsqd-font-size)",
        lg: "calc(var(--tsqd-font-size) * 1.125)",
        xl: "calc(var(--tsqd-font-size) * 1.25)",
        "2xl": "calc(var(--tsqd-font-size) * 1.5)",
        "3xl": "calc(var(--tsqd-font-size) * 1.875)",
        "4xl": "calc(var(--tsqd-font-size) * 2.25)",
        "5xl": "calc(var(--tsqd-font-size) * 3)",
        "6xl": "calc(var(--tsqd-font-size) * 3.75)",
        "7xl": "calc(var(--tsqd-font-size) * 4.5)",
        "8xl": "calc(var(--tsqd-font-size) * 6)",
        "9xl": "calc(var(--tsqd-font-size) * 8)"
      },
      lineHeight: {
        xs: "calc(var(--tsqd-font-size) * 1)",
        sm: "calc(var(--tsqd-font-size) * 1.25)",
        md: "calc(var(--tsqd-font-size) * 1.5)",
        lg: "calc(var(--tsqd-font-size) * 1.75)",
        xl: "calc(var(--tsqd-font-size) * 2)",
        "2xl": "calc(var(--tsqd-font-size) * 2.25)",
        "3xl": "calc(var(--tsqd-font-size) * 2.5)",
        "4xl": "calc(var(--tsqd-font-size) * 2.75)",
        "5xl": "calc(var(--tsqd-font-size) * 3)",
        "6xl": "calc(var(--tsqd-font-size) * 3.25)",
        "7xl": "calc(var(--tsqd-font-size) * 3.5)",
        "8xl": "calc(var(--tsqd-font-size) * 3.75)",
        "9xl": "calc(var(--tsqd-font-size) * 4)"
      },
      weight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900"
      }
    },
    breakpoints: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    border: {
      radius: {
        none: "0px",
        xs: "calc(var(--tsqd-font-size) * 0.125)",
        sm: "calc(var(--tsqd-font-size) * 0.25)",
        md: "calc(var(--tsqd-font-size) * 0.375)",
        lg: "calc(var(--tsqd-font-size) * 0.5)",
        xl: "calc(var(--tsqd-font-size) * 0.75)",
        "2xl": "calc(var(--tsqd-font-size) * 1)",
        "3xl": "calc(var(--tsqd-font-size) * 1.5)",
        full: "9999px"
      }
    },
    size: {
      0: "0px",
      0.25: "calc(var(--tsqd-font-size) * 0.0625)",
      0.5: "calc(var(--tsqd-font-size) * 0.125)",
      1: "calc(var(--tsqd-font-size) * 0.25)",
      1.5: "calc(var(--tsqd-font-size) * 0.375)",
      2: "calc(var(--tsqd-font-size) * 0.5)",
      2.5: "calc(var(--tsqd-font-size) * 0.625)",
      3: "calc(var(--tsqd-font-size) * 0.75)",
      3.5: "calc(var(--tsqd-font-size) * 0.875)",
      4: "calc(var(--tsqd-font-size) * 1)",
      4.5: "calc(var(--tsqd-font-size) * 1.125)",
      5: "calc(var(--tsqd-font-size) * 1.25)",
      5.5: "calc(var(--tsqd-font-size) * 1.375)",
      6: "calc(var(--tsqd-font-size) * 1.5)",
      6.5: "calc(var(--tsqd-font-size) * 1.625)",
      7: "calc(var(--tsqd-font-size) * 1.75)",
      8: "calc(var(--tsqd-font-size) * 2)",
      9: "calc(var(--tsqd-font-size) * 2.25)",
      10: "calc(var(--tsqd-font-size) * 2.5)",
      11: "calc(var(--tsqd-font-size) * 2.75)",
      12: "calc(var(--tsqd-font-size) * 3)",
      14: "calc(var(--tsqd-font-size) * 3.5)",
      16: "calc(var(--tsqd-font-size) * 4)",
      20: "calc(var(--tsqd-font-size) * 5)",
      24: "calc(var(--tsqd-font-size) * 6)",
      28: "calc(var(--tsqd-font-size) * 7)",
      32: "calc(var(--tsqd-font-size) * 8)",
      36: "calc(var(--tsqd-font-size) * 9)",
      40: "calc(var(--tsqd-font-size) * 10)",
      44: "calc(var(--tsqd-font-size) * 11)",
      48: "calc(var(--tsqd-font-size) * 12)",
      52: "calc(var(--tsqd-font-size) * 13)",
      56: "calc(var(--tsqd-font-size) * 14)",
      60: "calc(var(--tsqd-font-size) * 15)",
      64: "calc(var(--tsqd-font-size) * 16)",
      72: "calc(var(--tsqd-font-size) * 18)",
      80: "calc(var(--tsqd-font-size) * 20)",
      96: "calc(var(--tsqd-font-size) * 24)"
    },
    shadow: {
      xs: (_2 = "rgb(0 0 0 / 0.1)") => `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
      sm: (color = "rgb(0 0 0 / 0.1)") => `0 1px 3px 0 ${color}, 0 1px 2px -1px ${color}`,
      md: (color = "rgb(0 0 0 / 0.1)") => `0 4px 6px -1px ${color}, 0 2px 4px -2px ${color}`,
      lg: (color = "rgb(0 0 0 / 0.1)") => `0 10px 15px -3px ${color}, 0 4px 6px -4px ${color}`,
      xl: (color = "rgb(0 0 0 / 0.1)") => `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`,
      "2xl": (color = "rgb(0 0 0 / 0.25)") => `0 25px 50px -12px ${color}`,
      inner: (color = "rgb(0 0 0 / 0.05)") => `inset 0 2px 4px 0 ${color}`,
      none: () => `none`
    },
    zIndices: {
      hide: -1,
      auto: "auto",
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800
    }
  };
  _tmpl$2 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$22 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$3 = /* @__PURE__ */ template(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$4 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$5 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$6 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$7 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$8 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$9 = /* @__PURE__ */ template(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`);
  _tmpl$0 = /* @__PURE__ */ template(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`);
  _tmpl$1 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$10 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$11 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`);
  _tmpl$12 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$13 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$14 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$15 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`);
  _tmpl$16 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$17 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$18 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`);
  _tmpl$19 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$20 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$21 = /* @__PURE__ */ template(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);
  _tmpl$23 = /* @__PURE__ */ template(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
  _tmpl$24 = /* @__PURE__ */ template(`<button title="Copy object to clipboard">`);
  _tmpl$32 = /* @__PURE__ */ template(`<button title="Remove all items"aria-label="Remove all items">`);
  _tmpl$42 = /* @__PURE__ */ template(`<button title="Delete item"aria-label="Delete item">`);
  _tmpl$52 = /* @__PURE__ */ template(`<button title="Toggle value"aria-label="Toggle value">`);
  _tmpl$62 = /* @__PURE__ */ template(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`);
  _tmpl$72 = /* @__PURE__ */ template(`<div>`);
  _tmpl$82 = /* @__PURE__ */ template(`<div><button> <span></span> <span> `);
  _tmpl$92 = /* @__PURE__ */ template(`<input>`);
  _tmpl$02 = /* @__PURE__ */ template(`<span>`);
  _tmpl$110 = /* @__PURE__ */ template(`<div><label>:`);
  _tmpl$102 = /* @__PURE__ */ template(`<div><div><button> [<!>...<!>]`);
  delegateEvents(["click"]);
  _tmpl$25 = /* @__PURE__ */ template(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`);
  _tmpl$26 = /* @__PURE__ */ template(`<div>`);
  _tmpl$33 = /* @__PURE__ */ template(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`);
  _tmpl$43 = /* @__PURE__ */ template(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`);
  _tmpl$53 = /* @__PURE__ */ template(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`);
  _tmpl$63 = /* @__PURE__ */ template(`<span>Asc`);
  _tmpl$73 = /* @__PURE__ */ template(`<span>Desc`);
  _tmpl$83 = /* @__PURE__ */ template(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`);
  _tmpl$93 = /* @__PURE__ */ template(`<div>Settings`);
  _tmpl$03 = /* @__PURE__ */ template(`<span>Position`);
  _tmpl$111 = /* @__PURE__ */ template(`<span>Top`);
  _tmpl$103 = /* @__PURE__ */ template(`<span>Bottom`);
  _tmpl$112 = /* @__PURE__ */ template(`<span>Left`);
  _tmpl$122 = /* @__PURE__ */ template(`<span>Right`);
  _tmpl$132 = /* @__PURE__ */ template(`<span>Theme`);
  _tmpl$142 = /* @__PURE__ */ template(`<span>Light`);
  _tmpl$152 = /* @__PURE__ */ template(`<span>Dark`);
  _tmpl$162 = /* @__PURE__ */ template(`<span>System`);
  _tmpl$172 = /* @__PURE__ */ template(`<span>Disabled Queries`);
  _tmpl$182 = /* @__PURE__ */ template(`<span>Show`);
  _tmpl$192 = /* @__PURE__ */ template(`<span>Hide`);
  _tmpl$202 = /* @__PURE__ */ template(`<div><div class=tsqd-queries-container>`);
  _tmpl$212 = /* @__PURE__ */ template(`<div><div class=tsqd-mutations-container>`);
  _tmpl$222 = /* @__PURE__ */ template(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`);
  _tmpl$232 = /* @__PURE__ */ template(`<option>Sort by `);
  _tmpl$242 = /* @__PURE__ */ template(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`);
  _tmpl$252 = /* @__PURE__ */ template(`<div class=tsqd-query-static-indicator aria-hidden=true>static`);
  _tmpl$262 = /* @__PURE__ */ template(`<button><div></div><code class=tsqd-query-hash>`);
  _tmpl$27 = /* @__PURE__ */ template(`<div role=tooltip id=tsqd-status-tooltip>`);
  _tmpl$28 = /* @__PURE__ */ template(`<span>`);
  _tmpl$29 = /* @__PURE__ */ template(`<button><span aria-hidden=true></span><span>`);
  _tmpl$30 = /* @__PURE__ */ template(`<button><span aria-hidden=true></span> Error`);
  _tmpl$31 = /* @__PURE__ */ template(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value=""disabled selected>`);
  _tmpl$322 = /* @__PURE__ */ template(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`);
  _tmpl$332 = /* @__PURE__ */ template(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`);
  _tmpl$34 = /* @__PURE__ */ template(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
  _tmpl$35 = /* @__PURE__ */ template(`<option>`);
  _tmpl$36 = /* @__PURE__ */ template(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
  [selectedQueryHash, setSelectedQueryHash] = createSignal(null);
  [selectedMutationId, setSelectedMutationId] = createSignal(null);
  [panelWidth, setPanelWidth] = createSignal(0);
  [offline, setOffline] = createSignal(false);
  queryCacheMap = /* @__PURE__ */ new Map;
  mutationCacheMap = /* @__PURE__ */ new Map;
  delegateEvents(["click", "mousedown", "keydown", "input"]);
  /*! Bundled license information:
  
  @tanstack/match-sorter-utils/build/lib/index.mjs:
    (**
       * match-sorter-utils
       *
       * Copyright (c) TanStack
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.md file in the root directory of this source tree.
       *
       * @license MIT
       *)
    (**
     * @name match-sorter
     * @license MIT license.
     * @copyright (c) 2099 Kent C. Dodds
     * @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
     *)
  
  @kobalte/utils/dist/index.js:
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/da142672eddefa99365773ced72171facc06fdcb/packages/ariakit-utils/src/array.ts
     *)
    (*!
     * Original code by Chakra UI
     * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
     *
     * Credits to the Chakra UI team:
     * https://github.com/chakra-ui/chakra-ui/blob/main/packages/utils/src/assertion.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/solidjs-community/solid-aria/blob/2c5f54feb5cfea514b1ee0a52d0416878f882351/packages/utils/src/createGlobalListeners.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/232bc79018ec20967fec1e097a9474aba3bb5be7/packages/ariakit-utils/src/dom.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/cf9ab24f3255be1530d0f584061a01aa1e8180e6/packages/@react-aria/utils/src/platform.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/focusWithoutScrolling.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/main/packages/ariakit-utils/src/focus.ts
     *
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/isElementVisible.ts
     * https://github.com/adobe/react-spectrum/blob/8f2f2acb3d5850382ebe631f055f88c704aa7d17/packages/@react-aria/focus/src/FocusScope.tsx
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/f6e686fe9d3b983d48650980c1ecfdde320bc62f/packages/@react-aria/focus/src/FocusScope.tsx
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/getScrollParent.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/isVirtualEvent.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/ff3e690fffc6c54367b8057e28a0e5b9211f37b5/packages/@react-stately/utils/src/number.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/84e97943ad637a582c01c9b56d880cd95f595737/packages/ariakit/src/hovercard/__utils/polygon.ts
     * https://github.com/ariakit/ariakit/blob/f2a96973de523d67e41eec983263936c489ef3e2/packages/ariakit/src/hovercard/__utils/debug-polygon.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/runAfterTransition.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/8f2f2acb3d5850382ebe631f055f88c704aa7d17/packages/@react-aria/utils/src/scrollIntoView.ts
     *)
  */
});

// ../../node_modules/.bun/@tanstack+query-devtools@5.93.0/node_modules/@tanstack/query-devtools/build/DevtoolsComponent/B5PP2USH.js
var exports_B5PP2USH = {};
__export(exports_B5PP2USH, {
  default: () => DevtoolsComponent_default
});
var DevtoolsComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = props.theme || localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system")
      return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(Devtools, {
                localStore,
                setLocalStore
              });
            }
          });
        }
      });
    }
  });
}, DevtoolsComponent_default;
var init_B5PP2USH = __esm(() => {
  init_HNLWDMU5();
  init_6FXOYLZD();
  DevtoolsComponent_default = DevtoolsComponent;
});

// ../../node_modules/.bun/@tanstack+query-devtools@5.93.0/node_modules/@tanstack/query-devtools/build/DevtoolsPanelComponent/WI32IQVE.js
var exports_WI32IQVE = {};
__export(exports_WI32IQVE, {
  default: () => DevtoolsPanelComponent_default
});
var DevtoolsPanelComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = props.theme || localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system")
      return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        disabled: true,
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(ParentPanel, {
                get children() {
                  return createComponent(ContentView, {
                    localStore,
                    setLocalStore,
                    get onClose() {
                      return props.onClose;
                    },
                    showPanelViewOnly: true
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}, DevtoolsPanelComponent_default;
var init_WI32IQVE = __esm(() => {
  init_HNLWDMU5();
  init_6FXOYLZD();
  DevtoolsPanelComponent_default = DevtoolsPanelComponent;
});

// ../../node_modules/.bun/next-themes@0.4.6+bf16f8eded5e12ee/node_modules/next-themes/dist/index.mjs
var t = __toESM(require_react(), 1);
"use client";
var M = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u)
    p(u);
  else
    try {
      let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
      p(y);
    } catch (n) {}
};
var b = ["light", "dark"];
var I = "(prefers-color-scheme: dark)";
var O = typeof window == "undefined";
var x = t.createContext(undefined);
var J = (e) => t.useContext(x) ? t.createElement(t.Fragment, null, e.children) : t.createElement(V, { ...e });
var N = ["light", "dark"];
var V = ({ forcedTheme: e, disableTransitionOnChange: i = false, enableSystem: s = true, enableColorScheme: u = true, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R }) => {
  let [c, n] = t.useState(() => H(m, l)), [T, y] = t.useState(() => c === "system" ? E() : c), k = d ? Object.values(d) : a, S = t.useCallback((o) => {
    let r = o;
    if (!r)
      return;
    o === "system" && s && (r = E());
    let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = (g) => {
      g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
    };
    if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
      let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
      P.style.colorScheme = D;
    }
    C == null || C();
  }, [p]), f = t.useCallback((o) => {
    let r = typeof o == "function" ? o(c) : o;
    n(r);
    try {
      localStorage.setItem(m, r);
    } catch (v) {}
  }, [c]), A = t.useCallback((o) => {
    let r = E(o);
    y(r), c === "system" && s && !e && S("system");
  }, [c, e]);
  t.useEffect(() => {
    let o = window.matchMedia(I);
    return o.addListener(A), A(o), () => o.removeListener(A);
  }, [A]), t.useEffect(() => {
    let o = (r) => {
      r.key === m && (r.newValue ? n(r.newValue) : f(l));
    };
    return window.addEventListener("storage", o), () => window.removeEventListener("storage", o);
  }, [f]), t.useEffect(() => {
    S(e != null ? e : c);
  }, [e, c]);
  let Q = t.useMemo(() => ({ theme: c, setTheme: f, forcedTheme: e, resolvedTheme: c === "system" ? T : c, themes: s ? [...a, "system"] : a, systemTheme: s ? T : undefined }), [c, f, e, T, s, a]);
  return t.createElement(x.Provider, { value: Q }, t.createElement(_, { forcedTheme: e, storageKey: m, attribute: h, enableSystem: s, enableColorScheme: u, defaultTheme: l, value: d, themes: a, nonce: p, scriptProps: R }), w);
};
var _ = t.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return t.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M.toString()})(${p})` } });
});
var H = (e, i) => {
  if (O)
    return;
  let s;
  try {
    s = localStorage.getItem(e) || undefined;
  } catch (u) {}
  return s || i;
};
var W = (e) => {
  let i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), () => {
    window.getComputedStyle(document.body), setTimeout(() => {
      document.head.removeChild(i);
    }, 1);
  };
};
var E = (e) => (e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");

// ../../node_modules/.bun/sonner@1.7.4+bf16f8eded5e12ee/node_modules/sonner/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
"use client";
var jt = (n) => {
  switch (n) {
    case "success":
      return ee;
    case "info":
      return ae;
    case "warning":
      return oe;
    case "error":
      return se;
    default:
      return null;
  }
};
var te = Array(12).fill(0);
var Yt = ({ visible: n, className: e }) => import_react2.default.createElement("div", { className: ["sonner-loading-wrapper", e].filter(Boolean).join(" "), "data-visible": n }, import_react2.default.createElement("div", { className: "sonner-spinner" }, te.map((t2, a) => import_react2.default.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` }))));
var ee = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }));
var oe = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }));
var ae = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" }));
var se = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react2.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }));
var Ot = import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, import_react2.default.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), import_react2.default.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Ft = () => {
  let [n, e] = import_react3.default.useState(document.hidden);
  return import_react3.default.useEffect(() => {
    let t2 = () => {
      e(document.hidden);
    };
    return document.addEventListener("visibilitychange", t2), () => window.removeEventListener("visibilitychange", t2);
  }, []), n;
};
var bt = 1;
var yt = class {
  constructor() {
    this.subscribe = (e) => (this.subscribers.push(e), () => {
      let t2 = this.subscribers.indexOf(e);
      this.subscribers.splice(t2, 1);
    });
    this.publish = (e) => {
      this.subscribers.forEach((t2) => t2(e));
    };
    this.addToast = (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    };
    this.create = (e) => {
      var S;
      let { message: t2, ...a } = e, u = typeof (e == null ? undefined : e.id) == "number" || ((S = e.id) == null ? undefined : S.length) > 0 ? e.id : bt++, f = this.toasts.find((g) => g.id === u), w = e.dismissible === undefined ? true : e.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...e, id: u, title: t2 }), { ...g, ...e, id: u, dismissible: w, title: t2 }) : g) : this.addToast({ title: t2, ...a, dismissible: w, id: u }), u;
    };
    this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t2) => {
      this.subscribers.forEach((a) => a({ id: t2.id, dismiss: true }));
    }), this.subscribers.forEach((t2) => t2({ id: e, dismiss: true })), e);
    this.message = (e, t2) => this.create({ ...t2, message: e });
    this.error = (e, t2) => this.create({ ...t2, message: e, type: "error" });
    this.success = (e, t2) => this.create({ ...t2, type: "success", message: e });
    this.info = (e, t2) => this.create({ ...t2, type: "info", message: e });
    this.warning = (e, t2) => this.create({ ...t2, type: "warning", message: e });
    this.loading = (e, t2) => this.create({ ...t2, type: "loading", message: e });
    this.promise = (e, t2) => {
      if (!t2)
        return;
      let a;
      t2.loading !== undefined && (a = this.create({ ...t2, promise: e, type: "loading", message: t2.loading, description: typeof t2.description != "function" ? t2.description : undefined }));
      let u = e instanceof Promise ? e : e(), f = a !== undefined, w, S = u.then(async (i) => {
        if (w = ["resolve", i], import_react4.default.isValidElement(i))
          f = false, this.create({ id: a, type: "default", message: i });
        else if (ie(i) && !i.ok) {
          f = false;
          let T = typeof t2.error == "function" ? await t2.error(`HTTP error! status: ${i.status}`) : t2.error, F = typeof t2.description == "function" ? await t2.description(`HTTP error! status: ${i.status}`) : t2.description;
          this.create({ id: a, type: "error", message: T, description: F });
        } else if (t2.success !== undefined) {
          f = false;
          let T = typeof t2.success == "function" ? await t2.success(i) : t2.success, F = typeof t2.description == "function" ? await t2.description(i) : t2.description;
          this.create({ id: a, type: "success", message: T, description: F });
        }
      }).catch(async (i) => {
        if (w = ["reject", i], t2.error !== undefined) {
          f = false;
          let D = typeof t2.error == "function" ? await t2.error(i) : t2.error, T = typeof t2.description == "function" ? await t2.description(i) : t2.description;
          this.create({ id: a, type: "error", message: D, description: T });
        }
      }).finally(() => {
        var i;
        f && (this.dismiss(a), a = undefined), (i = t2.finally) == null || i.call(t2);
      }), g = () => new Promise((i, D) => S.then(() => w[0] === "reject" ? D(w[1]) : i(w[1])).catch(D));
      return typeof a != "string" && typeof a != "number" ? { unwrap: g } : Object.assign(a, { unwrap: g });
    };
    this.custom = (e, t2) => {
      let a = (t2 == null ? undefined : t2.id) || bt++;
      return this.create({ jsx: e(a), id: a, ...t2 }), a;
    };
    this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = new Set;
  }
};
var v = new yt;
var ne = (n, e) => {
  let t2 = (e == null ? undefined : e.id) || bt++;
  return v.addToast({ title: n, ...e, id: t2 }), t2;
};
var ie = (n) => n && typeof n == "object" && ("ok" in n) && typeof n.ok == "boolean" && ("status" in n) && typeof n.status == "number";
var le = ne;
var ce = () => v.toasts;
var de = () => v.getActiveToasts();
var ue = Object.assign(le, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: ce, getToasts: de });
function wt(n, { insertAt: e } = {}) {
  if (!n || typeof document == "undefined")
    return;
  let t2 = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
  a.type = "text/css", e === "top" && t2.firstChild ? t2.insertBefore(a, t2.firstChild) : t2.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
}
wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function tt(n) {
  return n.label !== undefined;
}
var pe = 3;
var me = "32px";
var ge = "16px";
var Wt = 4000;
var he = 356;
var be = 14;
var ye = 20;
var we = 200;
function M2(...n) {
  return n.filter(Boolean).join(" ");
}
function xe(n) {
  let [e, t2] = n.split("-"), a = [];
  return e && a.push(e), t2 && a.push(t2), a;
}
var ve = (n) => {
  var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
  let { invert: e, toast: t2, unstyled: a, interacting: u, setHeights: f, visibleToasts: w, heights: S, index: g, toasts: i, expanded: D, removeToast: T, defaultRichColors: F, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l, className: ot = "", descriptionClassName: at = "", duration: X, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n, [Y, C] = import_react.default.useState(null), [lt, J2] = import_react.default.useState(null), [W2, H2] = import_react.default.useState(false), [A, mt] = import_react.default.useState(false), [L, z] = import_react.default.useState(false), [ct, d] = import_react.default.useState(false), [h, y] = import_react.default.useState(false), [R, j] = import_react.default.useState(0), [p, _2] = import_react.default.useState(0), O2 = import_react.default.useRef(t2.duration || X || Wt), G = import_react.default.useRef(null), k = import_react.default.useRef(null), Vt = g === 0, Ut = g + 1 <= w, N2 = t2.type, V2 = t2.dismissible !== false, Kt = t2.className || "", Xt = t2.descriptionClassName || "", dt = import_react.default.useMemo(() => S.findIndex((r) => r.toastId === t2.id) || 0, [S, t2.id]), Jt = import_react.default.useMemo(() => {
    var r;
    return (r = t2.closeButton) != null ? r : et;
  }, [t2.closeButton, et]), Tt = import_react.default.useMemo(() => t2.duration || X || Wt, [t2.duration, X]), gt = import_react.default.useRef(0), U = import_react.default.useRef(0), St = import_react.default.useRef(0), K = import_react.default.useRef(null), [Gt, Qt] = st.split("-"), Rt = import_react.default.useMemo(() => S.reduce((r, m, c) => c >= dt ? r : r + m.height, 0), [S, dt]), Et = Ft(), qt = t2.invert || e, ht = N2 === "loading";
  U.current = import_react.default.useMemo(() => dt * pt + Rt, [dt, Rt]), import_react.default.useEffect(() => {
    O2.current = Tt;
  }, [Tt]), import_react.default.useEffect(() => {
    H2(true);
  }, []), import_react.default.useEffect(() => {
    let r = k.current;
    if (r) {
      let m = r.getBoundingClientRect().height;
      return _2(m), f((c) => [{ toastId: t2.id, height: m, position: t2.position }, ...c]), () => f((c) => c.filter((b2) => b2.toastId !== t2.id));
    }
  }, [f, t2.id]), import_react.default.useLayoutEffect(() => {
    if (!W2)
      return;
    let r = k.current, m = r.style.height;
    r.style.height = "auto";
    let c = r.getBoundingClientRect().height;
    r.style.height = m, _2(c), f((b2) => b2.find((x2) => x2.toastId === t2.id) ? b2.map((x2) => x2.toastId === t2.id ? { ...x2, height: c } : x2) : [{ toastId: t2.id, height: c, position: t2.position }, ...b2]);
  }, [W2, t2.title, t2.description, f, t2.id]);
  let $ = import_react.default.useCallback(() => {
    mt(true), j(U.current), f((r) => r.filter((m) => m.toastId !== t2.id)), setTimeout(() => {
      T(t2);
    }, we);
  }, [t2, T, f, U]);
  import_react.default.useEffect(() => {
    if (t2.promise && N2 === "loading" || t2.duration === 1 / 0 || t2.type === "loading")
      return;
    let r;
    return D || u || it && Et ? (() => {
      if (St.current < gt.current) {
        let b2 = new Date().getTime() - gt.current;
        O2.current = O2.current - b2;
      }
      St.current = new Date().getTime();
    })() : (() => {
      O2.current !== 1 / 0 && (gt.current = new Date().getTime(), r = setTimeout(() => {
        var b2;
        (b2 = t2.onAutoClose) == null || b2.call(t2, t2), $();
      }, O2.current));
    })(), () => clearTimeout(r);
  }, [D, u, t2, N2, it, Et, $]), import_react.default.useEffect(() => {
    t2.delete && $();
  }, [$, t2.delete]);
  function Zt() {
    var r, m, c;
    return P != null && P.loading ? import_react.default.createElement("div", { className: M2(s == null ? undefined : s.loader, (r = t2 == null ? undefined : t2.classNames) == null ? undefined : r.loader, "sonner-loader"), "data-visible": N2 === "loading" }, P.loading) : rt ? import_react.default.createElement("div", { className: M2(s == null ? undefined : s.loader, (m = t2 == null ? undefined : t2.classNames) == null ? undefined : m.loader, "sonner-loader"), "data-visible": N2 === "loading" }, rt) : import_react.default.createElement(Yt, { className: M2(s == null ? undefined : s.loader, (c = t2 == null ? undefined : t2.classNames) == null ? undefined : c.loader), visible: N2 === "loading" });
  }
  return import_react.default.createElement("li", { tabIndex: 0, ref: k, className: M2(ot, Kt, s == null ? undefined : s.toast, (Dt = t2 == null ? undefined : t2.classNames) == null ? undefined : Dt.toast, s == null ? undefined : s.default, s == null ? undefined : s[N2], (Pt = t2 == null ? undefined : t2.classNames) == null ? undefined : Pt[N2]), "data-sonner-toast": "", "data-rich-colors": (Nt = t2.richColors) != null ? Nt : F, "data-styled": !(t2.jsx || t2.unstyled || a), "data-mounted": W2, "data-promise": !!t2.promise, "data-swiped": h, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g, "data-front": Vt, "data-swiping": L, "data-dismissible": V2, "data-type": N2, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W2), style: { "--index": g, "--toasts-before": g, "--z-index": i.length - g, "--offset": `${A ? R : U.current}px`, "--initial-height": B ? "auto" : `${p}px`, ...ut, ...t2.style }, onDragEnd: () => {
    z(false), C(null), K.current = null;
  }, onPointerDown: (r) => {
    ht || !V2 || (G.current = new Date, j(U.current), r.target.setPointerCapture(r.pointerId), r.target.tagName !== "BUTTON" && (z(true), K.current = { x: r.clientX, y: r.clientY }));
  }, onPointerUp: () => {
    var x2, Q, q, Z;
    if (ct || !V2)
      return;
    K.current = null;
    let r = Number(((x2 = k.current) == null ? undefined : x2.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m = Number(((Q = k.current) == null ? undefined : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c = new Date().getTime() - ((q = G.current) == null ? undefined : q.getTime()), b2 = Y === "x" ? r : m, I2 = Math.abs(b2) / c;
    if (Math.abs(b2) >= ye || I2 > 0.11) {
      j(U.current), (Z = t2.onDismiss) == null || Z.call(t2, t2), J2(Y === "x" ? r > 0 ? "right" : "left" : m > 0 ? "down" : "up"), $(), d(true), y(false);
      return;
    }
    z(false), C(null);
  }, onPointerMove: (r) => {
    var Q, q, Z, zt;
    if (!K.current || !V2 || ((Q = window.getSelection()) == null ? undefined : Q.toString().length) > 0)
      return;
    let c = r.clientY - K.current.y, b2 = r.clientX - K.current.x, I2 = (q = n.swipeDirections) != null ? q : xe(st);
    !Y && (Math.abs(b2) > 1 || Math.abs(c) > 1) && C(Math.abs(b2) > Math.abs(c) ? "x" : "y");
    let x2 = { x: 0, y: 0 };
    Y === "y" ? (I2.includes("top") || I2.includes("bottom")) && (I2.includes("top") && c < 0 || I2.includes("bottom") && c > 0) && (x2.y = c) : Y === "x" && (I2.includes("left") || I2.includes("right")) && (I2.includes("left") && b2 < 0 || I2.includes("right") && b2 > 0) && (x2.x = b2), (Math.abs(x2.x) > 0 || Math.abs(x2.y) > 0) && y(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x2.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x2.y}px`);
  } }, Jt && !t2.jsx ? import_react.default.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V2 ? () => {} : () => {
    var r;
    $(), (r = t2.onDismiss) == null || r.call(t2, t2);
  }, className: M2(s == null ? undefined : s.closeButton, (Bt = t2 == null ? undefined : t2.classNames) == null ? undefined : Bt.closeButton) }, (Ct = P == null ? undefined : P.close) != null ? Ct : Ot) : null, t2.jsx || import_react.isValidElement(t2.title) ? t2.jsx ? t2.jsx : typeof t2.title == "function" ? t2.title() : t2.title : import_react.default.createElement(import_react.default.Fragment, null, N2 || t2.icon || t2.promise ? import_react.default.createElement("div", { "data-icon": "", className: M2(s == null ? undefined : s.icon, (kt = t2 == null ? undefined : t2.classNames) == null ? undefined : kt.icon) }, t2.promise || t2.type === "loading" && !t2.icon ? t2.icon || Zt() : null, t2.type !== "loading" ? t2.icon || (P == null ? undefined : P[N2]) || jt(N2) : null) : null, import_react.default.createElement("div", { "data-content": "", className: M2(s == null ? undefined : s.content, (It = t2 == null ? undefined : t2.classNames) == null ? undefined : It.content) }, import_react.default.createElement("div", { "data-title": "", className: M2(s == null ? undefined : s.title, (Mt = t2 == null ? undefined : t2.classNames) == null ? undefined : Mt.title) }, typeof t2.title == "function" ? t2.title() : t2.title), t2.description ? import_react.default.createElement("div", { "data-description": "", className: M2(at, Xt, s == null ? undefined : s.description, (Ht = t2 == null ? undefined : t2.classNames) == null ? undefined : Ht.description) }, typeof t2.description == "function" ? t2.description() : t2.description) : null), import_react.isValidElement(t2.cancel) ? t2.cancel : t2.cancel && tt(t2.cancel) ? import_react.default.createElement("button", { "data-button": true, "data-cancel": true, style: t2.cancelButtonStyle || ft, onClick: (r) => {
    var m, c;
    tt(t2.cancel) && V2 && ((c = (m = t2.cancel).onClick) == null || c.call(m, r), $());
  }, className: M2(s == null ? undefined : s.cancelButton, (At = t2 == null ? undefined : t2.classNames) == null ? undefined : At.cancelButton) }, t2.cancel.label) : null, import_react.isValidElement(t2.action) ? t2.action : t2.action && tt(t2.action) ? import_react.default.createElement("button", { "data-button": true, "data-action": true, style: t2.actionButtonStyle || l, onClick: (r) => {
    var m, c;
    tt(t2.action) && ((c = (m = t2.action).onClick) == null || c.call(m, r), !r.defaultPrevented && $());
  }, className: M2(s == null ? undefined : s.actionButton, (Lt = t2 == null ? undefined : t2.classNames) == null ? undefined : Lt.actionButton) }, t2.action.label) : null));
};
function _t() {
  if (typeof window == "undefined" || typeof document == "undefined")
    return "ltr";
  let n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function Te(n, e) {
  let t2 = {};
  return [n, e].forEach((a, u) => {
    let f = u === 1, w = f ? "--mobile-offset" : "--offset", S = f ? ge : me;
    function g(i) {
      ["top", "right", "bottom", "left"].forEach((D) => {
        t2[`${w}-${D}`] = typeof i == "number" ? `${i}px` : i;
      });
    }
    typeof a == "number" || typeof a == "string" ? g(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((i) => {
      a[i] === undefined ? t2[`${w}-${i}`] = S : t2[`${w}-${i}`] = typeof a[i] == "number" ? `${a[i]}px` : a[i];
    }) : g(S);
  }), t2;
}
var $e = import_react.forwardRef(function(e, t2) {
  let { invert: a, position: u = "bottom-right", hotkey: f = ["altKey", "KeyT"], expand: w, closeButton: S, className: g, offset: i, mobileOffset: D, theme: T = "light", richColors: F, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l, dir: ot = _t(), gap: at = be, loadingIcon: X, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e, [B, s] = import_react.default.useState([]), P = import_react.default.useMemo(() => Array.from(new Set([u].concat(B.filter((d) => d.position).map((d) => d.position)))), [B, u]), [nt, it] = import_react.default.useState([]), [Y, C] = import_react.default.useState(false), [lt, J2] = import_react.default.useState(false), [W2, H2] = import_react.default.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = import_react.default.useRef(null), mt = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = import_react.default.useRef(null), z = import_react.default.useRef(false), ct = import_react.default.useCallback((d) => {
    s((h) => {
      var y;
      return (y = h.find((R) => R.id === d.id)) != null && y.delete || v.dismiss(d.id), h.filter(({ id: R }) => R !== d.id);
    });
  }, []);
  return import_react.default.useEffect(() => v.subscribe((d) => {
    if (d.dismiss) {
      s((h) => h.map((y) => y.id === d.id ? { ...y, delete: true } : y));
      return;
    }
    setTimeout(() => {
      import_react_dom.default.flushSync(() => {
        s((h) => {
          let y = h.findIndex((R) => R.id === d.id);
          return y !== -1 ? [...h.slice(0, y), { ...h[y], ...d }, ...h.slice(y + 1)] : [d, ...h];
        });
      });
    });
  }), []), import_react.default.useEffect(() => {
    if (T !== "system") {
      H2(T);
      return;
    }
    if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H2("dark") : H2("light")), typeof window == "undefined")
      return;
    let d = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d.addEventListener("change", ({ matches: h }) => {
        H2(h ? "dark" : "light");
      });
    } catch (h) {
      d.addListener(({ matches: y }) => {
        try {
          H2(y ? "dark" : "light");
        } catch (R) {
          console.error(R);
        }
      });
    }
  }, [T]), import_react.default.useEffect(() => {
    B.length <= 1 && C(false);
  }, [B]), import_react.default.useEffect(() => {
    let d = (h) => {
      var R, j;
      f.every((p) => h[p] || h.code === p) && (C(true), (R = A.current) == null || R.focus()), h.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [f]), import_react.default.useEffect(() => {
    if (A.current)
      return () => {
        L.current && (L.current.focus({ preventScroll: true }), L.current = null, z.current = false);
      };
  }, [A.current]), import_react.default.createElement("section", { ref: t2, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d, h) => {
    var j;
    let [y, R] = d.split("-");
    return B.length ? import_react.default.createElement("ol", { key: d, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g, "data-sonner-toaster": true, "data-theme": W2, "data-y-position": y, "data-lifted": Y && B.length > 1 && !w, "data-x-position": R, style: { "--front-toast-height": `${((j = nt[0]) == null ? undefined : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i, D) }, onBlur: (p) => {
      z.current && !p.currentTarget.contains(p.relatedTarget) && (z.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || z.current || (z.current = true, L.current = p.relatedTarget);
    }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
      lt || C(false);
    }, onDragEnd: () => C(false), onPointerDown: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || J2(true);
    }, onPointerUp: () => J2(false) }, B.filter((p) => !p.position && h === 0 || p.position === d).map((p, _2) => {
      var O2, G;
      return import_react.default.createElement(ve, { key: p.id, icons: st, index: _2, toast: p, defaultRichColors: F, duration: (O2 = l == null ? undefined : l.duration) != null ? O2 : et, className: l == null ? undefined : l.className, descriptionClassName: l == null ? undefined : l.descriptionClassName, invert: a, visibleToasts: ft, closeButton: (G = l == null ? undefined : l.closeButton) != null ? G : S, interacting: lt, position: d, style: l == null ? undefined : l.style, unstyled: l == null ? undefined : l.unstyled, classNames: l == null ? undefined : l.classNames, cancelButtonStyle: l == null ? undefined : l.cancelButtonStyle, actionButtonStyle: l == null ? undefined : l.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p.position), heights: nt.filter((k) => k.position == p.position), setHeights: it, expandByDefault: w, gap: at, loadingIcon: X, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e.swipeDirections });
    })) : null;
  }));
});

// lib/auth.tsx
var import_react5 = __toESM(require_react(), 1);
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var isClerkConfigured = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
var mockUser = {
  id: "demo-user-001",
  firstName: "Demo",
  lastName: "User",
  fullName: "Demo User",
  primaryEmailAddress: { emailAddress: "demo@tanti.studio" },
  imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo"
};
var AuthContext = import_react5.createContext({
  isSignedIn: false,
  isLoaded: true,
  user: null,
  userId: null,
  sessionId: null,
  orgId: null,
  orgRole: null,
  signOut: async () => {},
  getToken: async () => null
});
function DemoAuthProvider({ children }) {
  const value = import_react5.useMemo(() => ({
    isSignedIn: true,
    isLoaded: true,
    user: mockUser,
    userId: mockUser.id,
    sessionId: "demo-session",
    orgId: null,
    orgRole: null,
    signOut: async () => {
      console.log("Demo mode: sign out called");
    },
    getToken: async () => "demo-token"
  }), []);
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(AuthContext.Provider, {
    value,
    children
  }, undefined, false, undefined, this);
}
function AuthProvider({ children }) {
  if (!isClerkConfigured) {
    console.info("[StudioOS] Running in Demo Mode - Clerk not configured");
    return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(DemoAuthProvider, {
      children
    }, undefined, false, undefined, this);
  }
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV(jsx_dev_runtime.Fragment, {
    children
  }, undefined, false, undefined, this);
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set;
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {}
  onUnsubscribe() {}
};

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
  #provider = defaultTimeoutProvider;
  #providerCalled = false;
  setTimeoutProvider(provider) {
    if (true) {
      if (this.#providerCalled && provider !== this.#provider) {
        console.error(`[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`, { previous: this.#provider, provider });
      }
    }
    this.#provider = provider;
    if (true) {
      this.#providerCalled = false;
    }
  }
  setTimeout(callback, delay) {
    if (true) {
      this.#providerCalled = true;
    }
    return this.#provider.setTimeout(callback, delay);
  }
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId);
  }
  setInterval(callback, delay) {
    if (true) {
      this.#providerCalled = true;
    }
    return this.#provider.setInterval(callback, delay);
  }
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId);
  }
};
var timeoutManager = new TimeoutManager;
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(queryKey, (_2, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b2) {
  if (a === b2) {
    return true;
  }
  if (typeof a !== typeof b2) {
    return false;
  }
  if (a && b2 && typeof a === "object" && typeof b2 === "object") {
    return Object.keys(b2).every((key) => partialMatchKey(a[key], b2[key]));
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b2, depth = 0) {
  if (a === b2) {
    return a;
  }
  if (depth > 500)
    return b2;
  const array = isPlainArray(a) && isPlainArray(b2);
  if (!array && !(isPlainObject(a) && isPlainObject(b2)))
    return b2;
  const aItems = array ? a : Object.keys(a);
  const aSize = aItems.length;
  const bItems = array ? b2 : Object.keys(b2);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i = 0;i < bSize; i++) {
    const key = array ? i : bItems[i];
    const aItem = a[key];
    const bItem = b2[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i < aSize : hasOwn.call(a, key))
        equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v2 = replaceEqualDeep(aItem, bItem, depth + 1);
    copy[key] = v2;
    if (v2 === aItem)
      equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o2) {
  if (!hasObjectPrototype(o2)) {
    return false;
  }
  const ctor = o2.constructor;
  if (ctor === undefined) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o2) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(`Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`);
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(`Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`);
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false;
  let signal;
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal();
      if (consumed) {
        return signal;
      }
      consumed = true;
      if (signal.aborted) {
        onCancelled();
      } else {
        signal.addEventListener("abort", onCancelled, { once: true });
      }
      return signal;
    }
  });
  return object;
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = undefined;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager;

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {});
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = undefined;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager;

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1000 * 2 ** failureCount, 30000);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  const thenable = pendingThenable();
  const isResolved = () => thenable.status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = undefined;
      if (!isResolved()) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved()) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : undefined;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? undefined : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      this.#gcTimeout = timeoutManager.setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (isServer ? Infinity : 5 * 60 * 1000));
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      timeoutManager.clearTimeout(this.#gcTimeout);
      this.#gcTimeout = undefined;
    }
  }
};

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === undefined) {
      const defaultState = getDefaultState(this.options);
      if (defaultState.data !== undefined) {
        this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
        this.#initialState = defaultState;
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some((observer) => resolveEnabled(observer.options.enabled, this) !== false);
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some((observer) => resolveStaleTime(observer.options.staleTime, this) === "static");
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some((observer) => observer.getCurrentResult().isStale);
    }
    return this.state.data === undefined || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === undefined) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x2) => x2.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x2) => x2.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x2) => x2 !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
      if (this.state.data !== undefined && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x2) => x2.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(`As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`);
      }
    }
    const abortController = new AbortController;
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(queryFn, queryFnContext, this);
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    this.options.behavior?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) {
          this.setState({
            ...this.#revertState,
            fetchStatus: "idle"
          });
        }
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    try {
      const data = await this.#retryer.start();
      if (data === undefined) {
        if (true) {
          console.error(`Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`);
        }
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      this.#cache.config.onSuccess?.(data, this);
      this.#cache.config.onSettled?.(data, this.state.error, this);
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) {
          return this.#retryer.promise;
        } else if (error.revert) {
          if (this.state.data === undefined) {
            throw error;
          }
          return this.state.data;
        }
      }
      this.#dispatch({
        type: "error",
        error
      });
      this.#cache.config.onError?.(error, this);
      this.#cache.config.onSettled?.(this.state.data, error, this);
      throw error;
    } finally {
      this.scheduleGc();
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          this.#revertState = action.manual ? newState : undefined;
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: true
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === undefined && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== undefined;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(fetchFn, {
            client: context.client,
            queryKey: context.queryKey,
            meta: context.options.meta,
            signal: context.signal
          }, query);
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : undefined;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : undefined;
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
  #client;
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.#client = config.client;
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x2) => x2 !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        this.#dispatch({ type: "pending", variables, isPaused });
        if (this.#mutationCache.config.onMutate) {
          await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
        }
        const context = await this.options.onMutate?.(variables, mutationFnContext);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
      await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
      await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
      await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.#mutationCache.config.onSettled?.(undefined, error, this.state.variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onSettled?.(undefined, error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      this.#dispatch({ type: "error", error });
      throw error;
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: undefined,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: undefined,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: undefined,
    data: undefined,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: undefined,
    submittedAt: 0
  };
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/mutationCache.js
var MutationCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set;
    this.#scopes = /* @__PURE__ */ new Map;
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find((m) => m.state.status === "pending");
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x2) => x2.state.isPaused);
    return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache = class extends Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map;
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find((query) => matchQuery(defaultedFilters, query));
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// ../../node_modules/.bun/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache;
    this.#mutationCache = config.mutationCache || new MutationCache;
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map;
    this.#mutationDefaults = /* @__PURE__ */ new Map;
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1)
      return;
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0)
      return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = undefined;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = undefined;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === undefined) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
      this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(defaultedOptions.queryHash);
    const prevData = query?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === undefined) {
      return;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [
      queryKey,
      this.setQueryData(queryKey, updater, options)
    ]));
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries({
        type: "active",
        ...filters
      }, options);
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries({
        ...filters,
        type: filters?.refetchType ?? filters?.type ?? "active"
      }, options);
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
      let promise = query.fetch(undefined, fetchOptions);
      if (!fetchOptions.throwOnError) {
        promise = promise.catch(noop);
      }
      return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
    }));
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === undefined) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    if (defaultedOptions.refetchOnReconnect === undefined) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === undefined) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};
// ../../node_modules/.bun/@tanstack+react-query@5.90.21+b1ab299f0a400331/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var React2 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
"use client";
var QueryClientContext = React2.createContext(undefined);
var useQueryClient = (queryClient) => {
  const client = React2.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  React2.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ import_jsx_runtime.jsx(QueryClientContext.Provider, { value: client, children });
};

// ../../node_modules/.bun/@tanstack+react-query-devtools@5.91.3+d1096969542f45a5/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools.js
var React3 = __toESM(require_react(), 1);

// ../../node_modules/.bun/@tanstack+query-devtools@5.93.0/node_modules/@tanstack/query-devtools/build/dev.js
init_6FXOYLZD();
var TanstackQueryDevtools = class {
  #client;
  #onlineManager;
  #queryFlavor;
  #version;
  #isMounted = false;
  #styleNonce;
  #shadowDOMTarget;
  #buttonPosition;
  #position;
  #initialIsOpen;
  #errorTypes;
  #hideDisabledQueries;
  #Component;
  #theme;
  #dispose;
  constructor(config) {
    const {
      client,
      queryFlavor,
      version,
      onlineManager: onlineManager2,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      hideDisabledQueries,
      theme
    } = config;
    this.#client = createSignal(client);
    this.#queryFlavor = queryFlavor;
    this.#version = version;
    this.#onlineManager = onlineManager2;
    this.#styleNonce = styleNonce;
    this.#shadowDOMTarget = shadowDOMTarget;
    this.#buttonPosition = createSignal(buttonPosition);
    this.#position = createSignal(position);
    this.#initialIsOpen = createSignal(initialIsOpen);
    this.#errorTypes = createSignal(errorTypes);
    this.#hideDisabledQueries = createSignal(hideDisabledQueries);
    this.#theme = createSignal(theme);
  }
  setButtonPosition(position) {
    this.#buttonPosition[1](position);
  }
  setPosition(position) {
    this.#position[1](position);
  }
  setInitialIsOpen(isOpen) {
    this.#initialIsOpen[1](isOpen);
  }
  setErrorTypes(errorTypes) {
    this.#errorTypes[1](errorTypes);
  }
  setClient(client) {
    this.#client[1](client);
  }
  setTheme(theme) {
    this.#theme[1](theme);
  }
  mount(el) {
    if (this.#isMounted) {
      throw new Error("Devtools is already mounted");
    }
    const dispose3 = render(() => {
      const _self$ = this;
      const [btnPosition] = this.#buttonPosition;
      const [pos] = this.#position;
      const [isOpen] = this.#initialIsOpen;
      const [errors] = this.#errorTypes;
      const [hideDisabledQueries] = this.#hideDisabledQueries;
      const [queryClient] = this.#client;
      const [theme] = this.#theme;
      let Devtools2;
      if (this.#Component) {
        Devtools2 = this.#Component;
      } else {
        Devtools2 = lazy(() => Promise.resolve().then(() => (init_B5PP2USH(), exports_B5PP2USH)));
        this.#Component = Devtools2;
      }
      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
      return createComponent(Devtools2, mergeProps({
        get queryFlavor() {
          return _self$.#queryFlavor;
        },
        get version() {
          return _self$.#version;
        },
        get onlineManager() {
          return _self$.#onlineManager;
        },
        get shadowDOMTarget() {
          return _self$.#shadowDOMTarget;
        }
      }, {
        get client() {
          return queryClient();
        },
        get buttonPosition() {
          return btnPosition();
        },
        get position() {
          return pos();
        },
        get initialIsOpen() {
          return isOpen();
        },
        get errorTypes() {
          return errors();
        },
        get hideDisabledQueries() {
          return hideDisabledQueries();
        },
        get theme() {
          return theme();
        }
      }));
    }, el);
    this.#isMounted = true;
    this.#dispose = dispose3;
  }
  unmount() {
    if (!this.#isMounted) {
      throw new Error("Devtools is not mounted");
    }
    this.#dispose?.();
    this.#isMounted = false;
  }
};
var TanstackQueryDevtoolsPanel = class {
  #client;
  #onlineManager;
  #queryFlavor;
  #version;
  #isMounted = false;
  #styleNonce;
  #shadowDOMTarget;
  #buttonPosition;
  #position;
  #initialIsOpen;
  #errorTypes;
  #hideDisabledQueries;
  #onClose;
  #Component;
  #theme;
  #dispose;
  constructor(config) {
    const {
      client,
      queryFlavor,
      version,
      onlineManager: onlineManager2,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      onClose,
      hideDisabledQueries,
      theme
    } = config;
    this.#client = createSignal(client);
    this.#queryFlavor = queryFlavor;
    this.#version = version;
    this.#onlineManager = onlineManager2;
    this.#styleNonce = styleNonce;
    this.#shadowDOMTarget = shadowDOMTarget;
    this.#buttonPosition = createSignal(buttonPosition);
    this.#position = createSignal(position);
    this.#initialIsOpen = createSignal(initialIsOpen);
    this.#errorTypes = createSignal(errorTypes);
    this.#hideDisabledQueries = createSignal(hideDisabledQueries);
    this.#onClose = createSignal(onClose);
    this.#theme = createSignal(theme);
  }
  setButtonPosition(position) {
    this.#buttonPosition[1](position);
  }
  setPosition(position) {
    this.#position[1](position);
  }
  setInitialIsOpen(isOpen) {
    this.#initialIsOpen[1](isOpen);
  }
  setErrorTypes(errorTypes) {
    this.#errorTypes[1](errorTypes);
  }
  setClient(client) {
    this.#client[1](client);
  }
  setOnClose(onClose) {
    this.#onClose[1](() => onClose);
  }
  setTheme(theme) {
    this.#theme[1](theme);
  }
  mount(el) {
    if (this.#isMounted) {
      throw new Error("Devtools is already mounted");
    }
    const dispose3 = render(() => {
      const _self$ = this;
      const [btnPosition] = this.#buttonPosition;
      const [pos] = this.#position;
      const [isOpen] = this.#initialIsOpen;
      const [errors] = this.#errorTypes;
      const [hideDisabledQueries] = this.#hideDisabledQueries;
      const [queryClient] = this.#client;
      const [onClose] = this.#onClose;
      const [theme] = this.#theme;
      let Devtools2;
      if (this.#Component) {
        Devtools2 = this.#Component;
      } else {
        Devtools2 = lazy(() => Promise.resolve().then(() => (init_WI32IQVE(), exports_WI32IQVE)));
        this.#Component = Devtools2;
      }
      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
      return createComponent(Devtools2, mergeProps({
        get queryFlavor() {
          return _self$.#queryFlavor;
        },
        get version() {
          return _self$.#version;
        },
        get onlineManager() {
          return _self$.#onlineManager;
        },
        get shadowDOMTarget() {
          return _self$.#shadowDOMTarget;
        }
      }, {
        get client() {
          return queryClient();
        },
        get buttonPosition() {
          return btnPosition();
        },
        get position() {
          return pos();
        },
        get initialIsOpen() {
          return isOpen();
        },
        get errorTypes() {
          return errors();
        },
        get hideDisabledQueries() {
          return hideDisabledQueries();
        },
        get onClose() {
          return onClose();
        },
        get theme() {
          return theme();
        }
      }));
    }, el);
    this.#isMounted = true;
    this.#dispose = dispose3;
  }
  unmount() {
    if (!this.#isMounted) {
      throw new Error("Devtools is not mounted");
    }
    this.#dispose?.();
    this.#isMounted = false;
  }
};

// ../../node_modules/.bun/@tanstack+react-query-devtools@5.91.3+d1096969542f45a5/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
"use client";
function ReactQueryDevtools(props) {
  const queryClient = useQueryClient(props.client);
  const ref = React3.useRef(null);
  const {
    buttonPosition,
    position,
    initialIsOpen,
    errorTypes,
    styleNonce,
    shadowDOMTarget,
    hideDisabledQueries,
    theme
  } = props;
  const [devtools] = React3.useState(new TanstackQueryDevtools({
    client: queryClient,
    queryFlavor: "React Query",
    version: "5",
    onlineManager,
    buttonPosition,
    position,
    initialIsOpen,
    errorTypes,
    styleNonce,
    shadowDOMTarget,
    hideDisabledQueries,
    theme
  }));
  React3.useEffect(() => {
    devtools.setClient(queryClient);
  }, [queryClient, devtools]);
  React3.useEffect(() => {
    if (buttonPosition) {
      devtools.setButtonPosition(buttonPosition);
    }
  }, [buttonPosition, devtools]);
  React3.useEffect(() => {
    if (position) {
      devtools.setPosition(position);
    }
  }, [position, devtools]);
  React3.useEffect(() => {
    devtools.setInitialIsOpen(initialIsOpen || false);
  }, [initialIsOpen, devtools]);
  React3.useEffect(() => {
    devtools.setErrorTypes(errorTypes || []);
  }, [errorTypes, devtools]);
  React3.useEffect(() => {
    devtools.setTheme(theme);
  }, [theme, devtools]);
  React3.useEffect(() => {
    if (ref.current) {
      devtools.mount(ref.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return /* @__PURE__ */ import_jsx_runtime2.jsx("div", { dir: "ltr", className: "tsqd-parent-container", ref });
}

// ../../node_modules/.bun/@tanstack+react-query-devtools@5.91.3+d1096969542f45a5/node_modules/@tanstack/react-query-devtools/build/modern/index.js
"use client";
var ReactQueryDevtools2 = ReactQueryDevtools;

// lib/query-provider.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
function QueryProvider({ children: children2 }) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(QueryClientProvider, {
    client: queryClient,
    children: [
      children2,
      /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(ReactQueryDevtools2, {
        initialIsOpen: false
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// app/client-providers.tsx
var jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
function ClientProviders({ children: children2 }) {
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV(J, {
    attribute: "class",
    defaultTheme: "dark",
    enableSystem: true,
    disableTransitionOnChange: true,
    children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV(QueryProvider, {
      children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV(AuthProvider, {
        children: [
          children2,
          /* @__PURE__ */ jsx_dev_runtime3.jsxDEV($e, {
            position: "bottom-right",
            richColors: true
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}
export {
  ClientProviders
};
