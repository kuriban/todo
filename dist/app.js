(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("../js-lib/modernizr");

(function () {
    if (!Modernizr.localstorage) {
        alert("Ваш браузер не поддерживает LocalStorage");
        return false;
    }
})();

//import store from "store";

require("../app/test");

require("../app/task");

},{"../app/task":2,"../app/test":3,"../js-lib/modernizr":4}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var store = _interopRequire(require("store"));

var Task = exports.Task = (function () {
    function Task(item) {
        _classCallCheck(this, Task);

        if (item) {
            this.name = item;
            this.numberLastTask = this.getNumberLastTask();
            this.createTask();
        }
    }

    _createClass(Task, {
        getNumberLastTask: {
            value: function getNumberLastTask() {
                var count = 0;
                store.forEach(function (key, value) {
                    if (key.indexOf("task_") != -1) {
                        count = parseInt(key.substr(5));
                    }
                });

                return count;
            }
        },
        createTask: {
            value: function createTask() {
                store.set("task_" + (this.numberLastTask + 1), {
                    name: this.name
                });
            }
        },
        getTask: {
            value: function getTask(id) {
                this.name = store.get("task_");
                return this.name;
            }
        },
        render: {
            value: function render() {
                var tr = "";
                store.forEach(function (key, value) {
                    if (key.indexOf("task_") != -1) {
                        var mainTask = value,
                            count = parseInt(key.substr(5));
                        tr += ["<tr class='mainTask'>", "<td data-id=" + count + ">" + mainTask.name + "</td>", "<td>", "<input type='text' name='subtask' placeholder='название подзадачи'>", "<button>добавить подзадачу</button>", "</td>", "</tr>"].join("");
                    }
                });
                return tr;
            }
        },
        deleteTask: {
            value: function deleteTask() {}
        }
    });

    return Task;
})();

var tasks = new Task();
document.querySelector("table").innerHTML = tasks.render();

document.querySelector(".addTask").addEventListener("click", function (event) {
    event.preventDefault();
    var item = event.target.previousElementSibling.value,
        task = new Task(item),
        name = task.getTask();
    document.querySelector("table").innerHTML = task.render();
});

},{"store":5}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var store = _interopRequire(require("store"));

//localStorage.setItem("name","Igor");
//localStorage["name2"] = "Ira";
//
//console.log(localStorage.getItem("name"));
//console.log( localStorage["name2"] );
//
//localStorage.removeItem("name");
//delete localStorage["name2"];
//
//localStorage.clear();

//store.set("name","Igor");
console.log(store.get("name"));

},{"store":5}],4:[function(require,module,exports){
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-localstorage !*/
"use strict";

!(function (n, e, o) {
  function t(n, e) {
    return typeof n === e;
  }function s() {
    var n, e, o, s, i, f, l;for (var u in a) if (a.hasOwnProperty(u)) {
      if ((n = [], e = a[u], e.name && (n.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))) for (o = 0; o < e.options.aliases.length; o++) n.push(e.options.aliases[o].toLowerCase());for (s = t(e.fn, "function") ? e.fn() : e.fn, i = 0; i < n.length; i++) f = n[i], l = f.split("."), 1 === l.length ? Modernizr[l[0]] = s : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = s), r.push((s ? "" : "no-") + l.join("-"));
    }
  }var a = [],
      i = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(n, e) {
      var o = this;setTimeout(function () {
        e(o[n]);
      }, 0);
    }, addTest: function addTest(n, e, o) {
      a.push({ name: n, fn: e, options: o });
    }, addAsyncTest: function addAsyncTest(n) {
      a.push({ name: null, fn: n });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = i, Modernizr = new Modernizr(), Modernizr.addTest("localstorage", function () {
    var n = "modernizr";try {
      return (localStorage.setItem(n, n), localStorage.removeItem(n), !0);
    } catch (e) {
      return !1;
    }
  });var r = [];s(), delete i.addTest, delete i.addAsyncTest;for (var f = 0; f < Modernizr._q.length; f++) Modernizr._q[f]();n.Modernizr = Modernizr;
})(window, document);

},{}],5:[function(require,module,exports){
(function (global){
"use strict"
// Module export pattern from
// https://github.com/umdjs/umd/blob/master/returnExports.js
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.store = factory();
  }
}(this, function () {
	
	// Store.js
	var store = {},
		win = (typeof window != 'undefined' ? window : global),
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.20'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc && doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		var ieKeyFix = function(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=attributes.length-1; i>=0; i--) {
				storage.removeAttribute(attributes[i].name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled
	
	return store
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9zdG9yZS9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIlxuLy8gTW9kdWxlIGV4cG9ydCBwYXR0ZXJuIGZyb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LnN0b3JlID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0XG5cdC8vIFN0b3JlLmpzXG5cdHZhciBzdG9yZSA9IHt9LFxuXHRcdHdpbiA9ICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKSxcblx0XHRkb2MgPSB3aW4uZG9jdW1lbnQsXG5cdFx0bG9jYWxTdG9yYWdlTmFtZSA9ICdsb2NhbFN0b3JhZ2UnLFxuXHRcdHNjcmlwdFRhZyA9ICdzY3JpcHQnLFxuXHRcdHN0b3JhZ2VcblxuXHRzdG9yZS5kaXNhYmxlZCA9IGZhbHNlXG5cdHN0b3JlLnZlcnNpb24gPSAnMS4zLjIwJ1xuXHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7fVxuXHRzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwpIHt9XG5cdHN0b3JlLmhhcyA9IGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gc3RvcmUuZ2V0KGtleSkgIT09IHVuZGVmaW5lZCB9XG5cdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge31cblx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHt9XG5cdHN0b3JlLnRyYW5zYWN0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsLCB0cmFuc2FjdGlvbkZuKSB7XG5cdFx0aWYgKHRyYW5zYWN0aW9uRm4gPT0gbnVsbCkge1xuXHRcdFx0dHJhbnNhY3Rpb25GbiA9IGRlZmF1bHRWYWxcblx0XHRcdGRlZmF1bHRWYWwgPSBudWxsXG5cdFx0fVxuXHRcdGlmIChkZWZhdWx0VmFsID09IG51bGwpIHtcblx0XHRcdGRlZmF1bHRWYWwgPSB7fVxuXHRcdH1cblx0XHR2YXIgdmFsID0gc3RvcmUuZ2V0KGtleSwgZGVmYXVsdFZhbClcblx0XHR0cmFuc2FjdGlvbkZuKHZhbClcblx0XHRzdG9yZS5zZXQoa2V5LCB2YWwpXG5cdH1cblx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oKSB7fVxuXG5cdHN0b3JlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuXHR9XG5cdHN0b3JlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7IHJldHVybiB1bmRlZmluZWQgfVxuXHRcdHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHZhbHVlKSB9XG5cdFx0Y2F0Y2goZSkgeyByZXR1cm4gdmFsdWUgfHwgdW5kZWZpbmVkIH1cblx0fVxuXG5cdC8vIEZ1bmN0aW9ucyB0byBlbmNhcHN1bGF0ZSBxdWVzdGlvbmFibGUgRmlyZUZveCAzLjYuMTMgYmVoYXZpb3Jcblx0Ly8gd2hlbiBhYm91dC5jb25maWc6OmRvbS5zdG9yYWdlLmVuYWJsZWQgPT09IGZhbHNlXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3VlcyNpc3N1ZS8xM1xuXHRmdW5jdGlvbiBpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSB7XG5cdFx0dHJ5IHsgcmV0dXJuIChsb2NhbFN0b3JhZ2VOYW1lIGluIHdpbiAmJiB3aW5bbG9jYWxTdG9yYWdlTmFtZV0pIH1cblx0XHRjYXRjaChlcnIpIHsgcmV0dXJuIGZhbHNlIH1cblx0fVxuXG5cdGlmIChpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSkge1xuXHRcdHN0b3JhZ2UgPSB3aW5bbG9jYWxTdG9yYWdlTmFtZV1cblx0XHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBzdG9yZS5yZW1vdmUoa2V5KSB9XG5cdFx0XHRzdG9yYWdlLnNldEl0ZW0oa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHJldHVybiB2YWxcblx0XHR9XG5cdFx0c3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsKSB7XG5cdFx0XHR2YXIgdmFsID0gc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRJdGVtKGtleSkpXG5cdFx0XHRyZXR1cm4gKHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbCA6IHZhbClcblx0XHR9XG5cdFx0c3RvcmUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7IHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpIH1cblx0XHRzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkgeyBzdG9yYWdlLmNsZWFyKCkgfVxuXHRcdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBzdG9yYWdlLmtleShpKVxuXHRcdFx0XHRjYWxsYmFjayhrZXksIHN0b3JlLmdldChrZXkpKVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5hZGRCZWhhdmlvcikge1xuXHRcdHZhciBzdG9yYWdlT3duZXIsXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyXG5cdFx0Ly8gU2luY2UgI3VzZXJEYXRhIHN0b3JhZ2UgYXBwbGllcyBvbmx5IHRvIHNwZWNpZmljIHBhdGhzLCB3ZSBuZWVkIHRvXG5cdFx0Ly8gc29tZWhvdyBsaW5rIG91ciBkYXRhIHRvIGEgc3BlY2lmaWMgcGF0aC4gIFdlIGNob29zZSAvZmF2aWNvbi5pY29cblx0XHQvLyBhcyBhIHByZXR0eSBzYWZlIG9wdGlvbiwgc2luY2UgYWxsIGJyb3dzZXJzIGFscmVhZHkgbWFrZSBhIHJlcXVlc3QgdG9cblx0XHQvLyB0aGlzIFVSTCBhbnl3YXkgYW5kIGJlaW5nIGEgNDA0IHdpbGwgbm90IGh1cnQgdXMgaGVyZS4gIFdlIHdyYXAgYW5cblx0XHQvLyBpZnJhbWUgcG9pbnRpbmcgdG8gdGhlIGZhdmljb24gaW4gYW4gQWN0aXZlWE9iamVjdChodG1sZmlsZSkgb2JqZWN0XG5cdFx0Ly8gKHNlZTogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2FhNzUyNTc0KHY9VlMuODUpLmFzcHgpXG5cdFx0Ly8gc2luY2UgdGhlIGlmcmFtZSBhY2Nlc3MgcnVsZXMgYXBwZWFyIHRvIGFsbG93IGRpcmVjdCBhY2Nlc3MgYW5kXG5cdFx0Ly8gbWFuaXB1bGF0aW9uIG9mIHRoZSBkb2N1bWVudCBlbGVtZW50LCBldmVuIGZvciBhIDQwNCBwYWdlLiAgVGhpc1xuXHRcdC8vIGRvY3VtZW50IGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgKHdoaWNoIHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIGxpbWl0ZWQgdG8gdGhlIGN1cnJlbnQgcGF0aCkgdG8gcGVyZm9ybSAjdXNlckRhdGEgc3RvcmFnZS5cblx0XHR0cnkge1xuXHRcdFx0c3RvcmFnZUNvbnRhaW5lciA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLm9wZW4oKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci53cml0ZSgnPCcrc2NyaXB0VGFnKyc+ZG9jdW1lbnQudz13aW5kb3c8Lycrc2NyaXB0VGFnKyc+PGlmcmFtZSBzcmM9XCIvZmF2aWNvbi5pY29cIj48L2lmcmFtZT4nKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5jbG9zZSgpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBzdG9yYWdlQ29udGFpbmVyLncuZnJhbWVzWzBdLmRvY3VtZW50XG5cdFx0XHRzdG9yYWdlID0gc3RvcmFnZU93bmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHQvLyBzb21laG93IEFjdGl2ZVhPYmplY3QgaW5zdGFudGlhdGlvbiBmYWlsZWQgKHBlcmhhcHMgc29tZSBzcGVjaWFsXG5cdFx0XHQvLyBzZWN1cml0eSBzZXR0aW5ncyBvciBvdGhlcndzZSksIGZhbGwgYmFjayB0byBwZXItcGF0aCBzdG9yYWdlXG5cdFx0XHRzdG9yYWdlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBkb2MuYm9keVxuXHRcdH1cblx0XHR2YXIgd2l0aElFU3RvcmFnZSA9IGZ1bmN0aW9uKHN0b3JlRnVuY3Rpb24pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRcdGFyZ3MudW5zaGlmdChzdG9yYWdlKVxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxMDgxKHY9VlMuODUpLmFzcHhcblx0XHRcdFx0Ly8gYW5kIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTQyNCh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdHN0b3JhZ2VPd25lci5hcHBlbmRDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRzdG9yYWdlLmFkZEJlaGF2aW9yKCcjZGVmYXVsdCN1c2VyRGF0YScpXG5cdFx0XHRcdHN0b3JhZ2UubG9hZChsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gc3RvcmVGdW5jdGlvbi5hcHBseShzdG9yZSwgYXJncylcblx0XHRcdFx0c3RvcmFnZU93bmVyLnJlbW92ZUNoaWxkKHN0b3JhZ2UpXG5cdFx0XHRcdHJldHVybiByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJbiBJRTcsIGtleXMgY2Fubm90IHN0YXJ0IHdpdGggYSBkaWdpdCBvciBjb250YWluIGNlcnRhaW4gY2hhcnMuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzQwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzgzXG5cdFx0dmFyIGZvcmJpZGRlbkNoYXJzUmVnZXggPSBuZXcgUmVnRXhwKFwiWyFcXFwiIyQlJicoKSorLC9cXFxcXFxcXDo7PD0+P0BbXFxcXF1eYHt8fX5dXCIsIFwiZ1wiKVxuXHRcdHZhciBpZUtleUZpeCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0cmV0dXJuIGtleS5yZXBsYWNlKC9eZC8sICdfX18kJicpLnJlcGxhY2UoZm9yYmlkZGVuQ2hhcnNSZWdleCwgJ19fXycpXG5cdFx0fVxuXHRcdHN0b3JlLnNldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCB2YWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRBdHRyaWJ1dGUoa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0cmV0dXJuIHZhbFxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0ID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXksIGRlZmF1bHRWYWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHZhciB2YWwgPSBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEF0dHJpYnV0ZShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fSlcblx0XHRzdG9yZS5yZW1vdmUgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0c3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0fSlcblx0XHRzdG9yZS5jbGVhciA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdGZvciAodmFyIGk9YXR0cmlidXRlcy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG5cdFx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZXNbaV0ubmFtZSlcblx0XHRcdH1cblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRmb3IgKHZhciBpPTAsIGF0dHI7IGF0dHI9YXR0cmlidXRlc1tpXTsgKytpKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGF0dHIubmFtZSwgc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRBdHRyaWJ1dGUoYXR0ci5uYW1lKSkpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHRyeSB7XG5cdFx0dmFyIHRlc3RLZXkgPSAnX19zdG9yZWpzX18nXG5cdFx0c3RvcmUuc2V0KHRlc3RLZXksIHRlc3RLZXkpXG5cdFx0aWYgKHN0b3JlLmdldCh0ZXN0S2V5KSAhPSB0ZXN0S2V5KSB7IHN0b3JlLmRpc2FibGVkID0gdHJ1ZSB9XG5cdFx0c3RvcmUucmVtb3ZlKHRlc3RLZXkpXG5cdH0gY2F0Y2goZSkge1xuXHRcdHN0b3JlLmRpc2FibGVkID0gdHJ1ZVxuXHR9XG5cdHN0b3JlLmVuYWJsZWQgPSAhc3RvcmUuZGlzYWJsZWRcblx0XG5cdHJldHVybiBzdG9yZVxufSkpO1xuIl19
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImU6L3dhbXAvd3d3L1RvZG9JdGVtcy9hcHAvYXBwLmpzIiwiZTovd2FtcC93d3cvVG9kb0l0ZW1zL2FwcC90YXNrLmpzIiwiZTovd2FtcC93d3cvVG9kb0l0ZW1zL2FwcC90ZXN0LmpzIiwiZTovd2FtcC93d3cvVG9kb0l0ZW1zL2pzLWxpYi9tb2Rlcm5penIuanMiLCJub2RlX21vZHVsZXNcXHN0b3JlXFxzdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O1FDQU8scUJBQXFCOztBQUU1QixDQUFDLFlBQVc7QUFDUixRQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtBQUN6QixhQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUNsRCxlQUFPLEtBQUssQ0FBQztLQUNoQjtDQUNKLENBQUEsRUFDRSxDQUFDOzs7O1FBR0csYUFBYTs7UUFDYixhQUFhOzs7Ozs7Ozs7Ozs7Ozs7SUNaYixLQUFLLDJCQUFNLE9BQU87O0lBRVosSUFBSSxXQUFKLElBQUk7QUFFRCxhQUZILElBQUksQ0FFQSxJQUFJLEVBQUM7OEJBRlQsSUFBSTs7QUFHVCxZQUFHLElBQUksRUFBQztBQUNKLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixnQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUMvQyxnQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0tBQ0o7O2lCQVJRLElBQUk7QUFZYix5QkFBaUI7bUJBQUEsNkJBQUU7QUFDZixvQkFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QscUJBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFHO0FBQ3ZCLHdCQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7QUFDMUIsNkJBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNuQztpQkFDSixDQUFDLENBQUM7O0FBRUgsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCOztBQUVELGtCQUFVO21CQUFBLHNCQUFFO0FBQ1IscUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQztBQUN0QywwQkFBTyxJQUFJLENBQUMsSUFBSTtpQkFDbkIsQ0FBQyxDQUFDO2FBQ047O0FBRUQsZUFBTzttQkFBQSxpQkFBQyxFQUFFLEVBQUM7QUFDUCxvQkFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLHVCQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDcEI7O0FBRUQsY0FBTTttQkFBQSxrQkFBRTtBQUNKLG9CQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDWixxQkFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUc7QUFDdkIsd0JBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQztBQUMxQiw0QkFBSSxRQUFRLEdBQUcsS0FBSzs0QkFDaEIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsMEJBQUUsSUFBSSxDQUNGLHVCQUF1QixFQUNuQixjQUFjLEdBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxRQUFRLENBQUMsSUFBSSxHQUFDLE9BQU8sRUFDOUMsTUFBTSxFQUNGLHFFQUFxRSxFQUNyRSxxQ0FBcUMsRUFDekMsT0FBTyxFQUNYLE9BQU8sQ0FDVixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDZDtpQkFDSixDQUFDLENBQUM7QUFDSCx1QkFBTyxFQUFFLENBQUM7YUFDYjs7QUFFRCxrQkFBVTttQkFBQSxzQkFBRSxFQUVYOzs7O1dBeERRLElBQUk7OztBQTBEakIsSUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN6QixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRTNELFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLFVBQUEsS0FBSyxFQUFFO0FBQy9ELFNBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixRQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUs7UUFDaEQsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFCLFlBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztDQUc3RCxDQUFDLENBQUM7Ozs7Ozs7SUN2RUksS0FBSywyQkFBTSxPQUFPOzs7Ozs7Ozs7Ozs7OztBQWV6QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztBQ2IvQixDQUFDLENBQUEsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFPLE9BQU8sQ0FBQyxLQUFHLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxHQUFFO0FBQUMsUUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBRyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQSxBQUFDLENBQUEsRUFBQyxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsVUFBVSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsTUFBTSxHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFXLE9BQU8sS0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEtBQUssQ0FBQSxHQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUFDO0dBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRTtNQUFDLENBQUMsR0FBQyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLFlBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBVTtBQUFDLFNBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLE9BQU8sRUFBQyxpQkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLE9BQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7S0FBQyxFQUFDLFlBQVksRUFBQyxzQkFBUyxDQUFDLEVBQUM7QUFBQyxPQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUM7TUFBQyxTQUFTLEdBQUMscUJBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxFQUFDLFNBQVMsR0FBQyxJQUFJLFNBQVMsRUFBQSxFQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFDLFlBQVU7QUFBQyxRQUFJLENBQUMsR0FBQyxXQUFXLENBQUMsSUFBRztBQUFDLGNBQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsQ0FBQSxPQUFNLENBQUMsRUFBQztBQUFDLGFBQU0sQ0FBQyxDQUFDLENBQUE7S0FBQztHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFBO0NBQUMsQ0FBQSxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQzs7O0FDRi9zQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFwiLi4vanMtbGliL21vZGVybml6clwiO1xyXG5cclxuKGZ1bmN0aW9uICgpe1xyXG4gICAgaWYgKCFNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XHJcbiAgICAgICAgYWxlcnQoXCLQktCw0Ygg0LHRgNCw0YPQt9C10YAg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YIgTG9jYWxTdG9yYWdlXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4pKCk7XHJcblxyXG4vL2ltcG9ydCBzdG9yZSBmcm9tIFwic3RvcmVcIjtcclxuaW1wb3J0IFwiLi4vYXBwL3Rlc3RcIjtcclxuaW1wb3J0IFwiLi4vYXBwL3Rhc2tcIjsiLCJpbXBvcnQgc3RvcmUgZnJvbSBcInN0b3JlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFzayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKGl0ZW0pe1xyXG4gICAgICAgIGlmKGl0ZW0pe1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBpdGVtO1xyXG4gICAgICAgICAgICB0aGlzLm51bWJlckxhc3RUYXNrID0gdGhpcy5nZXROdW1iZXJMYXN0VGFzaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRhc2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXROdW1iZXJMYXN0VGFzaygpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgc3RvcmUuZm9yRWFjaCgoa2V5LHZhbHVlKT0+e1xyXG4gICAgICAgICAgICBpZihrZXkuaW5kZXhPZihcInRhc2tfXCIpICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQoa2V5LnN1YnN0cig1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRhc2soKXtcclxuICAgICAgICBzdG9yZS5zZXQoXCJ0YXNrX1wiKyh0aGlzLm51bWJlckxhc3RUYXNrKzEpLHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6dGhpcy5uYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFzayhpZCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gc3RvcmUuZ2V0KFwidGFza19cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBsZXQgdHIgPSBcIlwiO1xyXG4gICAgICAgIHN0b3JlLmZvckVhY2goKGtleSx2YWx1ZSk9PntcclxuICAgICAgICAgICAgaWYoa2V5LmluZGV4T2YoXCJ0YXNrX1wiKSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFpblRhc2sgPSB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KGtleS5zdWJzdHIoNSkpO1xyXG4gICAgICAgICAgICAgICAgdHIgKz0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPHRyIGNsYXNzPSdtYWluVGFzayc+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHRkIGRhdGEtaWQ9XCIrY291bnQrXCI+XCIrbWFpblRhc2submFtZStcIjwvdGQ+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHRkPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nc3VidGFzaycgcGxhY2Vob2xkZXI9J9C90LDQt9Cy0LDQvdC40LUg0L/QvtC00LfQsNC00LDRh9C4Jz5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGJ1dHRvbj7QtNC+0LHQsNCy0LjRgtGMINC/0L7QtNC30LDQtNCw0YfRgzwvYnV0dG9uPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvdGQ+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L3RyPlwiXHJcbiAgICAgICAgICAgICAgICBdLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzaygpe1xyXG5cclxuICAgIH1cclxufVxyXG5jb25zdCB0YXNrcyA9IG5ldyBUYXNrKCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKS5pbm5lckhUTUwgPSB0YXNrcy5yZW5kZXIoKTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkVGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixldmVudD0+e1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBpdGVtID0gZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWUsXHJcbiAgICAgICAgdGFzayA9IG5ldyBUYXNrKGl0ZW0pLFxyXG4gICAgICAgIG5hbWUgPSB0YXNrLmdldFRhc2soKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKS5pbm5lckhUTUwgPSB0YXNrLnJlbmRlcigpO1xyXG5cclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgc3RvcmUgZnJvbSBcInN0b3JlXCI7XHJcblxyXG4vL2xvY2FsU3RvcmFnZS5zZXRJdGVtKFwibmFtZVwiLFwiSWdvclwiKTtcclxuLy9sb2NhbFN0b3JhZ2VbXCJuYW1lMlwiXSA9IFwiSXJhXCI7XHJcbi8vXHJcbi8vY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpKTtcclxuLy9jb25zb2xlLmxvZyggbG9jYWxTdG9yYWdlW1wibmFtZTJcIl0gKTtcclxuLy9cclxuLy9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIm5hbWVcIik7XHJcbi8vZGVsZXRlIGxvY2FsU3RvcmFnZVtcIm5hbWUyXCJdO1xyXG4vL1xyXG4vL2xvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG5cclxuXHJcbi8vc3RvcmUuc2V0KFwibmFtZVwiLFwiSWdvclwiKTtcclxuY29uc29sZS5sb2coc3RvcmUuZ2V0KFwibmFtZVwiKSk7IiwiLyohIG1vZGVybml6ciAzLjMuMSAoQ3VzdG9tIEJ1aWxkKSB8IE1JVCAqXG4gKiBodHRwczovL21vZGVybml6ci5jb20vZG93bmxvYWQvPy1sb2NhbHN0b3JhZ2UgISovXG4hZnVuY3Rpb24obixlLG8pe2Z1bmN0aW9uIHQobixlKXtyZXR1cm4gdHlwZW9mIG49PT1lfWZ1bmN0aW9uIHMoKXt2YXIgbixlLG8scyxpLGYsbDtmb3IodmFyIHUgaW4gYSlpZihhLmhhc093blByb3BlcnR5KHUpKXtpZihuPVtdLGU9YVt1XSxlLm5hbWUmJihuLnB1c2goZS5uYW1lLnRvTG93ZXJDYXNlKCkpLGUub3B0aW9ucyYmZS5vcHRpb25zLmFsaWFzZXMmJmUub3B0aW9ucy5hbGlhc2VzLmxlbmd0aCkpZm9yKG89MDtvPGUub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDtvKyspbi5wdXNoKGUub3B0aW9ucy5hbGlhc2VzW29dLnRvTG93ZXJDYXNlKCkpO2ZvcihzPXQoZS5mbixcImZ1bmN0aW9uXCIpP2UuZm4oKTplLmZuLGk9MDtpPG4ubGVuZ3RoO2krKylmPW5baV0sbD1mLnNwbGl0KFwiLlwiKSwxPT09bC5sZW5ndGg/TW9kZXJuaXpyW2xbMF1dPXM6KCFNb2Rlcm5penJbbFswXV18fE1vZGVybml6cltsWzBdXWluc3RhbmNlb2YgQm9vbGVhbnx8KE1vZGVybml6cltsWzBdXT1uZXcgQm9vbGVhbihNb2Rlcm5penJbbFswXV0pKSxNb2Rlcm5penJbbFswXV1bbFsxXV09cyksci5wdXNoKChzP1wiXCI6XCJuby1cIikrbC5qb2luKFwiLVwiKSl9fXZhciBhPVtdLGk9e192ZXJzaW9uOlwiMy4zLjFcIixfY29uZmlnOntjbGFzc1ByZWZpeDpcIlwiLGVuYWJsZUNsYXNzZXM6ITAsZW5hYmxlSlNDbGFzczohMCx1c2VQcmVmaXhlczohMH0sX3E6W10sb246ZnVuY3Rpb24obixlKXt2YXIgbz10aGlzO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtlKG9bbl0pfSwwKX0sYWRkVGVzdDpmdW5jdGlvbihuLGUsbyl7YS5wdXNoKHtuYW1lOm4sZm46ZSxvcHRpb25zOm99KX0sYWRkQXN5bmNUZXN0OmZ1bmN0aW9uKG4pe2EucHVzaCh7bmFtZTpudWxsLGZuOm59KX19LE1vZGVybml6cj1mdW5jdGlvbigpe307TW9kZXJuaXpyLnByb3RvdHlwZT1pLE1vZGVybml6cj1uZXcgTW9kZXJuaXpyLE1vZGVybml6ci5hZGRUZXN0KFwibG9jYWxzdG9yYWdlXCIsZnVuY3Rpb24oKXt2YXIgbj1cIm1vZGVybml6clwiO3RyeXtyZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obixuKSxsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShuKSwhMH1jYXRjaChlKXtyZXR1cm4hMX19KTt2YXIgcj1bXTtzKCksZGVsZXRlIGkuYWRkVGVzdCxkZWxldGUgaS5hZGRBc3luY1Rlc3Q7Zm9yKHZhciBmPTA7ZjxNb2Rlcm5penIuX3EubGVuZ3RoO2YrKylNb2Rlcm5penIuX3FbZl0oKTtuLk1vZGVybml6cj1Nb2Rlcm5penJ9KHdpbmRvdyxkb2N1bWVudCk7IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCJcbi8vIE1vZHVsZSBleHBvcnQgcGF0dGVybiBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3JldHVybkV4cG9ydHMuanNcbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgICAgcm9vdC5zdG9yZSA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdFxuXHQvLyBTdG9yZS5qc1xuXHR2YXIgc3RvcmUgPSB7fSxcblx0XHR3aW4gPSAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCksXG5cdFx0ZG9jID0gd2luLmRvY3VtZW50LFxuXHRcdGxvY2FsU3RvcmFnZU5hbWUgPSAnbG9jYWxTdG9yYWdlJyxcblx0XHRzY3JpcHRUYWcgPSAnc2NyaXB0Jyxcblx0XHRzdG9yYWdlXG5cblx0c3RvcmUuZGlzYWJsZWQgPSBmYWxzZVxuXHRzdG9yZS52ZXJzaW9uID0gJzEuMy4yMCdcblx0c3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge31cblx0c3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsKSB7fVxuXHRzdG9yZS5oYXMgPSBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHN0b3JlLmdldChrZXkpICE9PSB1bmRlZmluZWQgfVxuXHRzdG9yZS5yZW1vdmUgPSBmdW5jdGlvbihrZXkpIHt9XG5cdHN0b3JlLmNsZWFyID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS50cmFuc2FjdCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCwgdHJhbnNhY3Rpb25Gbikge1xuXHRcdGlmICh0cmFuc2FjdGlvbkZuID09IG51bGwpIHtcblx0XHRcdHRyYW5zYWN0aW9uRm4gPSBkZWZhdWx0VmFsXG5cdFx0XHRkZWZhdWx0VmFsID0gbnVsbFxuXHRcdH1cblx0XHRpZiAoZGVmYXVsdFZhbCA9PSBudWxsKSB7XG5cdFx0XHRkZWZhdWx0VmFsID0ge31cblx0XHR9XG5cdFx0dmFyIHZhbCA9IHN0b3JlLmdldChrZXksIGRlZmF1bHRWYWwpXG5cdFx0dHJhbnNhY3Rpb25Gbih2YWwpXG5cdFx0c3RvcmUuc2V0KGtleSwgdmFsKVxuXHR9XG5cdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKCkge31cblx0c3RvcmUuZm9yRWFjaCA9IGZ1bmN0aW9uKCkge31cblxuXHRzdG9yZS5zZXJpYWxpemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblx0fVxuXHRzdG9yZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgeyByZXR1cm4gdW5kZWZpbmVkIH1cblx0XHR0cnkgeyByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSkgfVxuXHRcdGNhdGNoKGUpIHsgcmV0dXJuIHZhbHVlIHx8IHVuZGVmaW5lZCB9XG5cdH1cblxuXHQvLyBGdW5jdGlvbnMgdG8gZW5jYXBzdWxhdGUgcXVlc3Rpb25hYmxlIEZpcmVGb3ggMy42LjEzIGJlaGF2aW9yXG5cdC8vIHdoZW4gYWJvdXQuY29uZmlnOjpkb20uc3RvcmFnZS5lbmFibGVkID09PSBmYWxzZVxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcmN1c3dlc3Rpbi9zdG9yZS5qcy9pc3N1ZXMjaXNzdWUvMTNcblx0ZnVuY3Rpb24gaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkge1xuXHRcdHRyeSB7IHJldHVybiAobG9jYWxTdG9yYWdlTmFtZSBpbiB3aW4gJiYgd2luW2xvY2FsU3RvcmFnZU5hbWVdKSB9XG5cdFx0Y2F0Y2goZXJyKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblxuXHRpZiAoaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkpIHtcblx0XHRzdG9yYWdlID0gd2luW2xvY2FsU3RvcmFnZU5hbWVdXG5cdFx0c3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRJdGVtKGtleSwgc3RvcmUuc2VyaWFsaXplKHZhbCkpXG5cdFx0XHRyZXR1cm4gdmFsXG5cdFx0fVxuXHRcdHN0b3JlLmdldCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCkge1xuXHRcdFx0dmFyIHZhbCA9IHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fVxuXHRcdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkgeyBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSB9XG5cdFx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHsgc3RvcmFnZS5jbGVhcigpIH1cblx0XHRzdG9yZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciByZXQgPSB7fVxuXHRcdFx0c3RvcmUuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0XHRyZXRba2V5XSA9IHZhbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiByZXRcblx0XHR9XG5cdFx0c3RvcmUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8c3RvcmFnZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIga2V5ID0gc3RvcmFnZS5rZXkoaSlcblx0XHRcdFx0Y2FsbGJhY2soa2V5LCBzdG9yZS5nZXQoa2V5KSlcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnQuYWRkQmVoYXZpb3IpIHtcblx0XHR2YXIgc3RvcmFnZU93bmVyLFxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lclxuXHRcdC8vIFNpbmNlICN1c2VyRGF0YSBzdG9yYWdlIGFwcGxpZXMgb25seSB0byBzcGVjaWZpYyBwYXRocywgd2UgbmVlZCB0b1xuXHRcdC8vIHNvbWVob3cgbGluayBvdXIgZGF0YSB0byBhIHNwZWNpZmljIHBhdGguICBXZSBjaG9vc2UgL2Zhdmljb24uaWNvXG5cdFx0Ly8gYXMgYSBwcmV0dHkgc2FmZSBvcHRpb24sIHNpbmNlIGFsbCBicm93c2VycyBhbHJlYWR5IG1ha2UgYSByZXF1ZXN0IHRvXG5cdFx0Ly8gdGhpcyBVUkwgYW55d2F5IGFuZCBiZWluZyBhIDQwNCB3aWxsIG5vdCBodXJ0IHVzIGhlcmUuICBXZSB3cmFwIGFuXG5cdFx0Ly8gaWZyYW1lIHBvaW50aW5nIHRvIHRoZSBmYXZpY29uIGluIGFuIEFjdGl2ZVhPYmplY3QoaHRtbGZpbGUpIG9iamVjdFxuXHRcdC8vIChzZWU6IGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9hYTc1MjU3NCh2PVZTLjg1KS5hc3B4KVxuXHRcdC8vIHNpbmNlIHRoZSBpZnJhbWUgYWNjZXNzIHJ1bGVzIGFwcGVhciB0byBhbGxvdyBkaXJlY3QgYWNjZXNzIGFuZFxuXHRcdC8vIG1hbmlwdWxhdGlvbiBvZiB0aGUgZG9jdW1lbnQgZWxlbWVudCwgZXZlbiBmb3IgYSA0MDQgcGFnZS4gIFRoaXNcblx0XHQvLyBkb2N1bWVudCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50ICh3aGljaCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiBsaW1pdGVkIHRvIHRoZSBjdXJyZW50IHBhdGgpIHRvIHBlcmZvcm0gI3VzZXJEYXRhIHN0b3JhZ2UuXG5cdFx0dHJ5IHtcblx0XHRcdHN0b3JhZ2VDb250YWluZXIgPSBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5vcGVuKClcblx0XHRcdHN0b3JhZ2VDb250YWluZXIud3JpdGUoJzwnK3NjcmlwdFRhZysnPmRvY3VtZW50Lnc9d2luZG93PC8nK3NjcmlwdFRhZysnPjxpZnJhbWUgc3JjPVwiL2Zhdmljb24uaWNvXCI+PC9pZnJhbWU+Jylcblx0XHRcdHN0b3JhZ2VDb250YWluZXIuY2xvc2UoKVxuXHRcdFx0c3RvcmFnZU93bmVyID0gc3RvcmFnZUNvbnRhaW5lci53LmZyYW1lc1swXS5kb2N1bWVudFxuXHRcdFx0c3RvcmFnZSA9IHN0b3JhZ2VPd25lci5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0Ly8gc29tZWhvdyBBY3RpdmVYT2JqZWN0IGluc3RhbnRpYXRpb24gZmFpbGVkIChwZXJoYXBzIHNvbWUgc3BlY2lhbFxuXHRcdFx0Ly8gc2VjdXJpdHkgc2V0dGluZ3Mgb3Igb3RoZXJ3c2UpLCBmYWxsIGJhY2sgdG8gcGVyLXBhdGggc3RvcmFnZVxuXHRcdFx0c3RvcmFnZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0c3RvcmFnZU93bmVyID0gZG9jLmJvZHlcblx0XHR9XG5cdFx0dmFyIHdpdGhJRVN0b3JhZ2UgPSBmdW5jdGlvbihzdG9yZUZ1bmN0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuXHRcdFx0XHRhcmdzLnVuc2hpZnQoc3RvcmFnZSlcblx0XHRcdFx0Ly8gU2VlIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTA4MSh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdC8vIGFuZCBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzE0MjQodj1WUy44NSkuYXNweFxuXHRcdFx0XHRzdG9yYWdlT3duZXIuYXBwZW5kQ2hpbGQoc3RvcmFnZSlcblx0XHRcdFx0c3RvcmFnZS5hZGRCZWhhdmlvcignI2RlZmF1bHQjdXNlckRhdGEnKVxuXHRcdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHN0b3JlRnVuY3Rpb24uYXBwbHkoc3RvcmUsIGFyZ3MpXG5cdFx0XHRcdHN0b3JhZ2VPd25lci5yZW1vdmVDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSW4gSUU3LCBrZXlzIGNhbm5vdCBzdGFydCB3aXRoIGEgZGlnaXQgb3IgY29udGFpbiBjZXJ0YWluIGNoYXJzLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3Vlcy80MFxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3Vlcy84M1xuXHRcdHZhciBmb3JiaWRkZW5DaGFyc1JlZ2V4ID0gbmV3IFJlZ0V4cChcIlshXFxcIiMkJSYnKCkqKywvXFxcXFxcXFw6Ozw9Pj9AW1xcXFxdXmB7fH1+XVwiLCBcImdcIilcblx0XHR2YXIgaWVLZXlGaXggPSBmdW5jdGlvbihrZXkpIHtcblx0XHRcdHJldHVybiBrZXkucmVwbGFjZSgvXmQvLCAnX19fJCYnKS5yZXBsYWNlKGZvcmJpZGRlbkNoYXJzUmVnZXgsICdfX18nKVxuXHRcdH1cblx0XHRzdG9yZS5zZXQgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSwgdmFsKSB7XG5cdFx0XHRrZXkgPSBpZUtleUZpeChrZXkpXG5cdFx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHN0b3JlLnJlbW92ZShrZXkpIH1cblx0XHRcdHN0b3JhZ2Uuc2V0QXR0cmlidXRlKGtleSwgc3RvcmUuc2VyaWFsaXplKHZhbCkpXG5cdFx0XHRzdG9yYWdlLnNhdmUobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdHJldHVybiB2YWxcblx0XHR9KVxuXHRcdHN0b3JlLmdldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCBkZWZhdWx0VmFsKSB7XG5cdFx0XHRrZXkgPSBpZUtleUZpeChrZXkpXG5cdFx0XHR2YXIgdmFsID0gc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRBdHRyaWJ1dGUoa2V5KSlcblx0XHRcdHJldHVybiAodmFsID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsIDogdmFsKVxuXHRcdH0pXG5cdFx0c3RvcmUucmVtb3ZlID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXkpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGtleSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuY2xlYXIgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UpIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gc3RvcmFnZS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlc1xuXHRcdFx0c3RvcmFnZS5sb2FkKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0XHRmb3IgKHZhciBpPWF0dHJpYnV0ZXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuXHRcdFx0XHRzdG9yYWdlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5hbWUpXG5cdFx0XHR9XG5cdFx0XHRzdG9yYWdlLnNhdmUobG9jYWxTdG9yYWdlTmFtZSlcblx0XHR9KVxuXHRcdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKHN0b3JhZ2UpIHtcblx0XHRcdHZhciByZXQgPSB7fVxuXHRcdFx0c3RvcmUuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0XHRyZXRba2V5XSA9IHZhbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiByZXRcblx0XHR9XG5cdFx0c3RvcmUuZm9yRWFjaCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gc3RvcmFnZS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlc1xuXHRcdFx0Zm9yICh2YXIgaT0wLCBhdHRyOyBhdHRyPWF0dHJpYnV0ZXNbaV07ICsraSkge1xuXHRcdFx0XHRjYWxsYmFjayhhdHRyLm5hbWUsIHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0QXR0cmlidXRlKGF0dHIubmFtZSkpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHR0cnkge1xuXHRcdHZhciB0ZXN0S2V5ID0gJ19fc3RvcmVqc19fJ1xuXHRcdHN0b3JlLnNldCh0ZXN0S2V5LCB0ZXN0S2V5KVxuXHRcdGlmIChzdG9yZS5nZXQodGVzdEtleSkgIT0gdGVzdEtleSkgeyBzdG9yZS5kaXNhYmxlZCA9IHRydWUgfVxuXHRcdHN0b3JlLnJlbW92ZSh0ZXN0S2V5KVxuXHR9IGNhdGNoKGUpIHtcblx0XHRzdG9yZS5kaXNhYmxlZCA9IHRydWVcblx0fVxuXHRzdG9yZS5lbmFibGVkID0gIXN0b3JlLmRpc2FibGVkXG5cdFxuXHRyZXR1cm4gc3RvcmVcbn0pKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5emRHOXlaUzl6ZEc5eVpTNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpjSW5WelpTQnpkSEpwWTNSY0lseHVMeThnVFc5a2RXeGxJR1Y0Y0c5eWRDQndZWFIwWlhKdUlHWnliMjFjYmk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOTFiV1JxY3k5MWJXUXZZbXh2WWk5dFlYTjBaWEl2Y21WMGRYSnVSWGh3YjNKMGN5NXFjMXh1T3lobWRXNWpkR2x2YmlBb2NtOXZkQ3dnWm1GamRHOXllU2tnZTF4dUlDQWdJR2xtSUNoMGVYQmxiMllnWkdWbWFXNWxJRDA5UFNBblpuVnVZM1JwYjI0bklDWW1JR1JsWm1sdVpTNWhiV1FwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdRVTFFTGlCU1pXZHBjM1JsY2lCaGN5QmhiaUJoYm05dWVXMXZkWE1nYlc5a2RXeGxMbHh1SUNBZ0lDQWdJQ0JrWldacGJtVW9XMTBzSUdaaFkzUnZjbmtwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvZEhsd1pXOW1JR1Y0Y0c5eWRITWdQVDA5SUNkdlltcGxZM1FuS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRTV2WkdVdUlFUnZaWE1nYm05MElIZHZjbXNnZDJsMGFDQnpkSEpwWTNRZ1EyOXRiVzl1U2xNc0lHSjFkRnh1SUNBZ0lDQWdJQ0F2THlCdmJteDVJRU52YlcxdmJrcFRMV3hwYTJVZ1pXNTJhWEp2Ym0xbGJuUnpJSFJvWVhRZ2MzVndjRzl5ZENCdGIyUjFiR1V1Wlhod2IzSjBjeXhjYmlBZ0lDQWdJQ0FnTHk4Z2JHbHJaU0JPYjJSbExseHVJQ0FnSUNBZ0lDQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWmhZM1J2Y25rb0tUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBdkx5QkNjbTkzYzJWeUlHZHNiMkpoYkhNZ0tISnZiM1FnYVhNZ2QybHVaRzkzS1Z4dUlDQWdJQ0FnSUNCeWIyOTBMbk4wYjNKbElEMGdabUZqZEc5eWVTZ3BPMXh1SUNCOVhHNTlLSFJvYVhNc0lHWjFibU4wYVc5dUlDZ3BJSHRjYmx4MFhHNWNkQzh2SUZOMGIzSmxMbXB6WEc1Y2RIWmhjaUJ6ZEc5eVpTQTlJSHQ5TEZ4dVhIUmNkSGRwYmlBOUlDaDBlWEJsYjJZZ2QybHVaRzkzSUNFOUlDZDFibVJsWm1sdVpXUW5JRDhnZDJsdVpHOTNJRG9nWjJ4dlltRnNLU3hjYmx4MFhIUmtiMk1nUFNCM2FXNHVaRzlqZFcxbGJuUXNYRzVjZEZ4MGJHOWpZV3hUZEc5eVlXZGxUbUZ0WlNBOUlDZHNiMk5oYkZOMGIzSmhaMlVuTEZ4dVhIUmNkSE5qY21sd2RGUmhaeUE5SUNkelkzSnBjSFFuTEZ4dVhIUmNkSE4wYjNKaFoyVmNibHh1WEhSemRHOXlaUzVrYVhOaFlteGxaQ0E5SUdaaGJITmxYRzVjZEhOMGIzSmxMblpsY25OcGIyNGdQU0FuTVM0ekxqSXdKMXh1WEhSemRHOXlaUzV6WlhRZ1BTQm1kVzVqZEdsdmJpaHJaWGtzSUhaaGJIVmxLU0I3ZlZ4dVhIUnpkRzl5WlM1blpYUWdQU0JtZFc1amRHbHZiaWhyWlhrc0lHUmxabUYxYkhSV1lXd3BJSHQ5WEc1Y2RITjBiM0psTG1oaGN5QTlJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2MzUnZjbVV1WjJWMEtHdGxlU2tnSVQwOUlIVnVaR1ZtYVc1bFpDQjlYRzVjZEhOMGIzSmxMbkpsYlc5MlpTQTlJR1oxYm1OMGFXOXVLR3RsZVNrZ2UzMWNibHgwYzNSdmNtVXVZMnhsWVhJZ1BTQm1kVzVqZEdsdmJpZ3BJSHQ5WEc1Y2RITjBiM0psTG5SeVlXNXpZV04wSUQwZ1puVnVZM1JwYjI0b2EyVjVMQ0JrWldaaGRXeDBWbUZzTENCMGNtRnVjMkZqZEdsdmJrWnVLU0I3WEc1Y2RGeDBhV1lnS0hSeVlXNXpZV04wYVc5dVJtNGdQVDBnYm5Wc2JDa2dlMXh1WEhSY2RGeDBkSEpoYm5OaFkzUnBiMjVHYmlBOUlHUmxabUYxYkhSV1lXeGNibHgwWEhSY2RHUmxabUYxYkhSV1lXd2dQU0J1ZFd4c1hHNWNkRngwZlZ4dVhIUmNkR2xtSUNoa1pXWmhkV3gwVm1Gc0lEMDlJRzUxYkd3cElIdGNibHgwWEhSY2RHUmxabUYxYkhSV1lXd2dQU0I3ZlZ4dVhIUmNkSDFjYmx4MFhIUjJZWElnZG1Gc0lEMGdjM1J2Y21VdVoyVjBLR3RsZVN3Z1pHVm1ZWFZzZEZaaGJDbGNibHgwWEhSMGNtRnVjMkZqZEdsdmJrWnVLSFpoYkNsY2JseDBYSFJ6ZEc5eVpTNXpaWFFvYTJWNUxDQjJZV3dwWEc1Y2RIMWNibHgwYzNSdmNtVXVaMlYwUVd4c0lEMGdablZ1WTNScGIyNG9LU0I3ZlZ4dVhIUnpkRzl5WlM1bWIzSkZZV05vSUQwZ1puVnVZM1JwYjI0b0tTQjdmVnh1WEc1Y2RITjBiM0psTG5ObGNtbGhiR2w2WlNBOUlHWjFibU4wYVc5dUtIWmhiSFZsS1NCN1hHNWNkRngwY21WMGRYSnVJRXBUVDA0dWMzUnlhVzVuYVdaNUtIWmhiSFZsS1Z4dVhIUjlYRzVjZEhOMGIzSmxMbVJsYzJWeWFXRnNhWHBsSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VwSUh0Y2JseDBYSFJwWmlBb2RIbHdaVzltSUhaaGJIVmxJQ0U5SUNkemRISnBibWNuS1NCN0lISmxkSFZ5YmlCMWJtUmxabWx1WldRZ2ZWeHVYSFJjZEhSeWVTQjdJSEpsZEhWeWJpQktVMDlPTG5CaGNuTmxLSFpoYkhWbEtTQjlYRzVjZEZ4MFkyRjBZMmdvWlNrZ2V5QnlaWFIxY200Z2RtRnNkV1VnZkh3Z2RXNWtaV1pwYm1Wa0lIMWNibHgwZlZ4dVhHNWNkQzh2SUVaMWJtTjBhVzl1Y3lCMGJ5QmxibU5oY0hOMWJHRjBaU0J4ZFdWemRHbHZibUZpYkdVZ1JtbHlaVVp2ZUNBekxqWXVNVE1nWW1Wb1lYWnBiM0pjYmx4MEx5OGdkMmhsYmlCaFltOTFkQzVqYjI1bWFXYzZPbVJ2YlM1emRHOXlZV2RsTG1WdVlXSnNaV1FnUFQwOUlHWmhiSE5sWEc1Y2RDOHZJRk5sWlNCb2RIUndjem92TDJkcGRHaDFZaTVqYjIwdmJXRnlZM1Z6ZDJWemRHbHVMM04wYjNKbExtcHpMMmx6YzNWbGN5TnBjM04xWlM4eE0xeHVYSFJtZFc1amRHbHZiaUJwYzB4dlkyRnNVM1J2Y21GblpVNWhiV1ZUZFhCd2IzSjBaV1FvS1NCN1hHNWNkRngwZEhKNUlIc2djbVYwZFhKdUlDaHNiMk5oYkZOMGIzSmhaMlZPWVcxbElHbHVJSGRwYmlBbUppQjNhVzViYkc5allXeFRkRzl5WVdkbFRtRnRaVjBwSUgxY2JseDBYSFJqWVhSamFDaGxjbklwSUhzZ2NtVjBkWEp1SUdaaGJITmxJSDFjYmx4MGZWeHVYRzVjZEdsbUlDaHBjMHh2WTJGc1UzUnZjbUZuWlU1aGJXVlRkWEJ3YjNKMFpXUW9LU2tnZTF4dVhIUmNkSE4wYjNKaFoyVWdQU0IzYVc1YmJHOWpZV3hUZEc5eVlXZGxUbUZ0WlYxY2JseDBYSFJ6ZEc5eVpTNXpaWFFnUFNCbWRXNWpkR2x2YmloclpYa3NJSFpoYkNrZ2UxeHVYSFJjZEZ4MGFXWWdLSFpoYkNBOVBUMGdkVzVrWldacGJtVmtLU0I3SUhKbGRIVnliaUJ6ZEc5eVpTNXlaVzF2ZG1Vb2EyVjVLU0I5WEc1Y2RGeDBYSFJ6ZEc5eVlXZGxMbk5sZEVsMFpXMG9hMlY1TENCemRHOXlaUzV6WlhKcFlXeHBlbVVvZG1Gc0tTbGNibHgwWEhSY2RISmxkSFZ5YmlCMllXeGNibHgwWEhSOVhHNWNkRngwYzNSdmNtVXVaMlYwSUQwZ1puVnVZM1JwYjI0b2EyVjVMQ0JrWldaaGRXeDBWbUZzS1NCN1hHNWNkRngwWEhSMllYSWdkbUZzSUQwZ2MzUnZjbVV1WkdWelpYSnBZV3hwZW1Vb2MzUnZjbUZuWlM1blpYUkpkR1Z0S0d0bGVTa3BYRzVjZEZ4MFhIUnlaWFIxY200Z0tIWmhiQ0E5UFQwZ2RXNWtaV1pwYm1Wa0lEOGdaR1ZtWVhWc2RGWmhiQ0E2SUhaaGJDbGNibHgwWEhSOVhHNWNkRngwYzNSdmNtVXVjbVZ0YjNabElEMGdablZ1WTNScGIyNG9hMlY1S1NCN0lITjBiM0poWjJVdWNtVnRiM1psU1hSbGJTaHJaWGtwSUgxY2JseDBYSFJ6ZEc5eVpTNWpiR1ZoY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ6ZEc5eVlXZGxMbU5zWldGeUtDa2dmVnh1WEhSY2RITjBiM0psTG1kbGRFRnNiQ0E5SUdaMWJtTjBhVzl1S0NrZ2UxeHVYSFJjZEZ4MGRtRnlJSEpsZENBOUlIdDlYRzVjZEZ4MFhIUnpkRzl5WlM1bWIzSkZZV05vS0daMWJtTjBhVzl1S0d0bGVTd2dkbUZzS1NCN1hHNWNkRngwWEhSY2RISmxkRnRyWlhsZElEMGdkbUZzWEc1Y2RGeDBYSFI5S1Z4dVhIUmNkRngwY21WMGRYSnVJSEpsZEZ4dVhIUmNkSDFjYmx4MFhIUnpkRzl5WlM1bWIzSkZZV05vSUQwZ1puVnVZM1JwYjI0b1kyRnNiR0poWTJzcElIdGNibHgwWEhSY2RHWnZjaUFvZG1GeUlHazlNRHNnYVR4emRHOXlZV2RsTG14bGJtZDBhRHNnYVNzcktTQjdYRzVjZEZ4MFhIUmNkSFpoY2lCclpYa2dQU0J6ZEc5eVlXZGxMbXRsZVNocEtWeHVYSFJjZEZ4MFhIUmpZV3hzWW1GamF5aHJaWGtzSUhOMGIzSmxMbWRsZENoclpYa3BLVnh1WEhSY2RGeDBmVnh1WEhSY2RIMWNibHgwZlNCbGJITmxJR2xtSUNoa2IyTWdKaVlnWkc5akxtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZEM1aFpHUkNaV2hoZG1sdmNpa2dlMXh1WEhSY2RIWmhjaUJ6ZEc5eVlXZGxUM2R1WlhJc1hHNWNkRngwWEhSemRHOXlZV2RsUTI5dWRHRnBibVZ5WEc1Y2RGeDBMeThnVTJsdVkyVWdJM1Z6WlhKRVlYUmhJSE4wYjNKaFoyVWdZWEJ3YkdsbGN5QnZibXg1SUhSdklITndaV05wWm1saklIQmhkR2h6TENCM1pTQnVaV1ZrSUhSdlhHNWNkRngwTHk4Z2MyOXRaV2h2ZHlCc2FXNXJJRzkxY2lCa1lYUmhJSFJ2SUdFZ2MzQmxZMmxtYVdNZ2NHRjBhQzRnSUZkbElHTm9iMjl6WlNBdlptRjJhV052Ymk1cFkyOWNibHgwWEhRdkx5QmhjeUJoSUhCeVpYUjBlU0J6WVdabElHOXdkR2x2Yml3Z2MybHVZMlVnWVd4c0lHSnliM2R6WlhKeklHRnNjbVZoWkhrZ2JXRnJaU0JoSUhKbGNYVmxjM1FnZEc5Y2JseDBYSFF2THlCMGFHbHpJRlZTVENCaGJubDNZWGtnWVc1a0lHSmxhVzVuSUdFZ05EQTBJSGRwYkd3Z2JtOTBJR2gxY25RZ2RYTWdhR1Z5WlM0Z0lGZGxJSGR5WVhBZ1lXNWNibHgwWEhRdkx5QnBabkpoYldVZ2NHOXBiblJwYm1jZ2RHOGdkR2hsSUdaaGRtbGpiMjRnYVc0Z1lXNGdRV04wYVhabFdFOWlhbVZqZENob2RHMXNabWxzWlNrZ2IySnFaV04wWEc1Y2RGeDBMeThnS0hObFpUb2dhSFIwY0RvdkwyMXpaRzR1YldsamNtOXpiMlowTG1OdmJTOWxiaTExY3k5c2FXSnlZWEo1TDJGaE56VXlOVGMwS0hZOVZsTXVPRFVwTG1GemNIZ3BYRzVjZEZ4MEx5OGdjMmx1WTJVZ2RHaGxJR2xtY21GdFpTQmhZMk5sYzNNZ2NuVnNaWE1nWVhCd1pXRnlJSFJ2SUdGc2JHOTNJR1JwY21WamRDQmhZMk5sYzNNZ1lXNWtYRzVjZEZ4MEx5OGdiV0Z1YVhCMWJHRjBhVzl1SUc5bUlIUm9aU0JrYjJOMWJXVnVkQ0JsYkdWdFpXNTBMQ0JsZG1WdUlHWnZjaUJoSURRd05DQndZV2RsTGlBZ1ZHaHBjMXh1WEhSY2RDOHZJR1J2WTNWdFpXNTBJR05oYmlCaVpTQjFjMlZrSUdsdWMzUmxZV1FnYjJZZ2RHaGxJR04xY25KbGJuUWdaRzlqZFcxbGJuUWdLSGRvYVdOb0lIZHZkV3hrWEc1Y2RGeDBMeThnYUdGMlpTQmlaV1Z1SUd4cGJXbDBaV1FnZEc4Z2RHaGxJR04xY25KbGJuUWdjR0YwYUNrZ2RHOGdjR1Z5Wm05eWJTQWpkWE5sY2tSaGRHRWdjM1J2Y21GblpTNWNibHgwWEhSMGNua2dlMXh1WEhSY2RGeDBjM1J2Y21GblpVTnZiblJoYVc1bGNpQTlJRzVsZHlCQlkzUnBkbVZZVDJKcVpXTjBLQ2RvZEcxc1ptbHNaU2NwWEc1Y2RGeDBYSFJ6ZEc5eVlXZGxRMjl1ZEdGcGJtVnlMbTl3Wlc0b0tWeHVYSFJjZEZ4MGMzUnZjbUZuWlVOdmJuUmhhVzVsY2k1M2NtbDBaU2duUENjcmMyTnlhWEIwVkdGbkt5YytaRzlqZFcxbGJuUXVkejEzYVc1a2IzYzhMeWNyYzJOeWFYQjBWR0ZuS3ljK1BHbG1jbUZ0WlNCemNtTTlYQ0l2Wm1GMmFXTnZiaTVwWTI5Y0lqNDhMMmxtY21GdFpUNG5LVnh1WEhSY2RGeDBjM1J2Y21GblpVTnZiblJoYVc1bGNpNWpiRzl6WlNncFhHNWNkRngwWEhSemRHOXlZV2RsVDNkdVpYSWdQU0J6ZEc5eVlXZGxRMjl1ZEdGcGJtVnlMbmN1Wm5KaGJXVnpXekJkTG1SdlkzVnRaVzUwWEc1Y2RGeDBYSFJ6ZEc5eVlXZGxJRDBnYzNSdmNtRm5aVTkzYm1WeUxtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BYRzVjZEZ4MGZTQmpZWFJqYUNobEtTQjdYRzVjZEZ4MFhIUXZMeUJ6YjIxbGFHOTNJRUZqZEdsMlpWaFBZbXBsWTNRZ2FXNXpkR0Z1ZEdsaGRHbHZiaUJtWVdsc1pXUWdLSEJsY21oaGNITWdjMjl0WlNCemNHVmphV0ZzWEc1Y2RGeDBYSFF2THlCelpXTjFjbWwwZVNCelpYUjBhVzVuY3lCdmNpQnZkR2hsY25kelpTa3NJR1poYkd3Z1ltRmpheUIwYnlCd1pYSXRjR0YwYUNCemRHOXlZV2RsWEc1Y2RGeDBYSFJ6ZEc5eVlXZGxJRDBnWkc5akxtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BYRzVjZEZ4MFhIUnpkRzl5WVdkbFQzZHVaWElnUFNCa2IyTXVZbTlrZVZ4dVhIUmNkSDFjYmx4MFhIUjJZWElnZDJsMGFFbEZVM1J2Y21GblpTQTlJR1oxYm1OMGFXOXVLSE4wYjNKbFJuVnVZM1JwYjI0cElIdGNibHgwWEhSY2RISmxkSFZ5YmlCbWRXNWpkR2x2YmlncElIdGNibHgwWEhSY2RGeDBkbUZ5SUdGeVozTWdQU0JCY25KaGVTNXdjbTkwYjNSNWNHVXVjMnhwWTJVdVkyRnNiQ2hoY21kMWJXVnVkSE1zSURBcFhHNWNkRngwWEhSY2RHRnlaM011ZFc1emFHbG1kQ2h6ZEc5eVlXZGxLVnh1WEhSY2RGeDBYSFF2THlCVFpXVWdhSFIwY0RvdkwyMXpaRzR1YldsamNtOXpiMlowTG1OdmJTOWxiaTExY3k5c2FXSnlZWEo1TDIxek5UTXhNRGd4S0hZOVZsTXVPRFVwTG1GemNIaGNibHgwWEhSY2RGeDBMeThnWVc1a0lHaDBkSEE2THk5dGMyUnVMbTFwWTNKdmMyOW1kQzVqYjIwdlpXNHRkWE12YkdsaWNtRnllUzl0Y3pVek1UUXlOQ2gyUFZaVExqZzFLUzVoYzNCNFhHNWNkRngwWEhSY2RITjBiM0poWjJWUGQyNWxjaTVoY0hCbGJtUkRhR2xzWkNoemRHOXlZV2RsS1Z4dVhIUmNkRngwWEhSemRHOXlZV2RsTG1Ga1pFSmxhR0YyYVc5eUtDY2paR1ZtWVhWc2RDTjFjMlZ5UkdGMFlTY3BYRzVjZEZ4MFhIUmNkSE4wYjNKaFoyVXViRzloWkNoc2IyTmhiRk4wYjNKaFoyVk9ZVzFsS1Z4dVhIUmNkRngwWEhSMllYSWdjbVZ6ZFd4MElEMGdjM1J2Y21WR2RXNWpkR2x2Ymk1aGNIQnNlU2h6ZEc5eVpTd2dZWEpuY3lsY2JseDBYSFJjZEZ4MGMzUnZjbUZuWlU5M2JtVnlMbkpsYlc5MlpVTm9hV3hrS0hOMGIzSmhaMlVwWEc1Y2RGeDBYSFJjZEhKbGRIVnliaUJ5WlhOMWJIUmNibHgwWEhSY2RIMWNibHgwWEhSOVhHNWNibHgwWEhRdkx5QkpiaUJKUlRjc0lHdGxlWE1nWTJGdWJtOTBJSE4wWVhKMElIZHBkR2dnWVNCa2FXZHBkQ0J2Y2lCamIyNTBZV2x1SUdObGNuUmhhVzRnWTJoaGNuTXVYRzVjZEZ4MEx5OGdVMlZsSUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5dFlYSmpkWE4zWlhOMGFXNHZjM1J2Y21VdWFuTXZhWE56ZFdWekx6UXdYRzVjZEZ4MEx5OGdVMlZsSUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5dFlYSmpkWE4zWlhOMGFXNHZjM1J2Y21VdWFuTXZhWE56ZFdWekx6Z3pYRzVjZEZ4MGRtRnlJR1p2Y21KcFpHUmxia05vWVhKelVtVm5aWGdnUFNCdVpYY2dVbVZuUlhod0tGd2lXeUZjWEZ3aUl5UWxKaWNvS1NvckxDOWNYRnhjWEZ4Y1hEbzdQRDArUDBCYlhGeGNYRjFlWUh0OGZYNWRYQ0lzSUZ3aVoxd2lLVnh1WEhSY2RIWmhjaUJwWlV0bGVVWnBlQ0E5SUdaMWJtTjBhVzl1S0d0bGVTa2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlHdGxlUzV5WlhCc1lXTmxLQzllWkM4c0lDZGZYMThrSmljcExuSmxjR3hoWTJVb1ptOXlZbWxrWkdWdVEyaGhjbk5TWldkbGVDd2dKMTlmWHljcFhHNWNkRngwZlZ4dVhIUmNkSE4wYjNKbExuTmxkQ0E5SUhkcGRHaEpSVk4wYjNKaFoyVW9ablZ1WTNScGIyNG9jM1J2Y21GblpTd2dhMlY1TENCMllXd3BJSHRjYmx4MFhIUmNkR3RsZVNBOUlHbGxTMlY1Um1sNEtHdGxlU2xjYmx4MFhIUmNkR2xtSUNoMllXd2dQVDA5SUhWdVpHVm1hVzVsWkNrZ2V5QnlaWFIxY200Z2MzUnZjbVV1Y21WdGIzWmxLR3RsZVNrZ2ZWeHVYSFJjZEZ4MGMzUnZjbUZuWlM1elpYUkJkSFJ5YVdKMWRHVW9hMlY1TENCemRHOXlaUzV6WlhKcFlXeHBlbVVvZG1Gc0tTbGNibHgwWEhSY2RITjBiM0poWjJVdWMyRjJaU2hzYjJOaGJGTjBiM0poWjJWT1lXMWxLVnh1WEhSY2RGeDBjbVYwZFhKdUlIWmhiRnh1WEhSY2RIMHBYRzVjZEZ4MGMzUnZjbVV1WjJWMElEMGdkMmwwYUVsRlUzUnZjbUZuWlNobWRXNWpkR2x2YmloemRHOXlZV2RsTENCclpYa3NJR1JsWm1GMWJIUldZV3dwSUh0Y2JseDBYSFJjZEd0bGVTQTlJR2xsUzJWNVJtbDRLR3RsZVNsY2JseDBYSFJjZEhaaGNpQjJZV3dnUFNCemRHOXlaUzVrWlhObGNtbGhiR2w2WlNoemRHOXlZV2RsTG1kbGRFRjBkSEpwWW5WMFpTaHJaWGtwS1Z4dVhIUmNkRngwY21WMGRYSnVJQ2gyWVd3Z1BUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdSbFptRjFiSFJXWVd3Z09pQjJZV3dwWEc1Y2RGeDBmU2xjYmx4MFhIUnpkRzl5WlM1eVpXMXZkbVVnUFNCM2FYUm9TVVZUZEc5eVlXZGxLR1oxYm1OMGFXOXVLSE4wYjNKaFoyVXNJR3RsZVNrZ2UxeHVYSFJjZEZ4MGEyVjVJRDBnYVdWTFpYbEdhWGdvYTJWNUtWeHVYSFJjZEZ4MGMzUnZjbUZuWlM1eVpXMXZkbVZCZEhSeWFXSjFkR1VvYTJWNUtWeHVYSFJjZEZ4MGMzUnZjbUZuWlM1ellYWmxLR3h2WTJGc1UzUnZjbUZuWlU1aGJXVXBYRzVjZEZ4MGZTbGNibHgwWEhSemRHOXlaUzVqYkdWaGNpQTlJSGRwZEdoSlJWTjBiM0poWjJVb1puVnVZM1JwYjI0b2MzUnZjbUZuWlNrZ2UxeHVYSFJjZEZ4MGRtRnlJR0YwZEhKcFluVjBaWE1nUFNCemRHOXlZV2RsTGxoTlRFUnZZM1Z0Wlc1MExtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZEM1aGRIUnlhV0oxZEdWelhHNWNkRngwWEhSemRHOXlZV2RsTG14dllXUW9iRzlqWVd4VGRHOXlZV2RsVG1GdFpTbGNibHgwWEhSY2RHWnZjaUFvZG1GeUlHazlZWFIwY21saWRYUmxjeTVzWlc1bmRHZ3RNVHNnYVQ0OU1Ec2dhUzB0S1NCN1hHNWNkRngwWEhSY2RITjBiM0poWjJVdWNtVnRiM1psUVhSMGNtbGlkWFJsS0dGMGRISnBZblYwWlhOYmFWMHVibUZ0WlNsY2JseDBYSFJjZEgxY2JseDBYSFJjZEhOMGIzSmhaMlV1YzJGMlpTaHNiMk5oYkZOMGIzSmhaMlZPWVcxbEtWeHVYSFJjZEgwcFhHNWNkRngwYzNSdmNtVXVaMlYwUVd4c0lEMGdablZ1WTNScGIyNG9jM1J2Y21GblpTa2dlMXh1WEhSY2RGeDBkbUZ5SUhKbGRDQTlJSHQ5WEc1Y2RGeDBYSFJ6ZEc5eVpTNW1iM0pGWVdOb0tHWjFibU4wYVc5dUtHdGxlU3dnZG1Gc0tTQjdYRzVjZEZ4MFhIUmNkSEpsZEZ0clpYbGRJRDBnZG1Gc1hHNWNkRngwWEhSOUtWeHVYSFJjZEZ4MGNtVjBkWEp1SUhKbGRGeHVYSFJjZEgxY2JseDBYSFJ6ZEc5eVpTNW1iM0pGWVdOb0lEMGdkMmwwYUVsRlUzUnZjbUZuWlNobWRXNWpkR2x2YmloemRHOXlZV2RsTENCallXeHNZbUZqYXlrZ2UxeHVYSFJjZEZ4MGRtRnlJR0YwZEhKcFluVjBaWE1nUFNCemRHOXlZV2RsTGxoTlRFUnZZM1Z0Wlc1MExtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZEM1aGRIUnlhV0oxZEdWelhHNWNkRngwWEhSbWIzSWdLSFpoY2lCcFBUQXNJR0YwZEhJN0lHRjBkSEk5WVhSMGNtbGlkWFJsYzF0cFhUc2dLeXRwS1NCN1hHNWNkRngwWEhSY2RHTmhiR3hpWVdOcktHRjBkSEl1Ym1GdFpTd2djM1J2Y21VdVpHVnpaWEpwWVd4cGVtVW9jM1J2Y21GblpTNW5aWFJCZEhSeWFXSjFkR1VvWVhSMGNpNXVZVzFsS1NrcFhHNWNkRngwWEhSOVhHNWNkRngwZlNsY2JseDBmVnh1WEc1Y2RIUnllU0I3WEc1Y2RGeDBkbUZ5SUhSbGMzUkxaWGtnUFNBblgxOXpkRzl5WldwelgxOG5YRzVjZEZ4MGMzUnZjbVV1YzJWMEtIUmxjM1JMWlhrc0lIUmxjM1JMWlhrcFhHNWNkRngwYVdZZ0tITjBiM0psTG1kbGRDaDBaWE4wUzJWNUtTQWhQU0IwWlhOMFMyVjVLU0I3SUhOMGIzSmxMbVJwYzJGaWJHVmtJRDBnZEhKMVpTQjlYRzVjZEZ4MGMzUnZjbVV1Y21WdGIzWmxLSFJsYzNSTFpYa3BYRzVjZEgwZ1kyRjBZMmdvWlNrZ2UxeHVYSFJjZEhOMGIzSmxMbVJwYzJGaWJHVmtJRDBnZEhKMVpWeHVYSFI5WEc1Y2RITjBiM0psTG1WdVlXSnNaV1FnUFNBaGMzUnZjbVV1WkdsellXSnNaV1JjYmx4MFhHNWNkSEpsZEhWeWJpQnpkRzl5WlZ4dWZTa3BPMXh1SWwxOSJdfQ==
