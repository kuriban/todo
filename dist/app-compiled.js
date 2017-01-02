"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
			}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
				var n = t[o][1][e];return s(n ? n : e);
			}, l, l.exports, e, t, n, r);
		}return n[o].exports;
	}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
		s(r[o]);
	}return s;
})({ 1: [function (require, module, exports) {
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
	}, { "../app/task": 2, "../app/test": 3, "../js-lib/modernizr": 4 }], 2: [function (require, module, exports) {
		"use strict";

		var _interopRequire = function _interopRequire(obj) {
			return obj && obj.__esModule ? obj["default"] : obj;
		};

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var key in props) {
					var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
				}Object.defineProperties(target, props);
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		var _classCallCheck = function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		};

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var store = _interopRequire(require("store"));

		var Task = exports.Task = function () {
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
		}();

		var tasks = new Task();
		document.querySelector("table").innerHTML = tasks.render();

		document.querySelector(".addTask").addEventListener("click", function (event) {
			event.preventDefault();
			var item = event.target.previousElementSibling.value,
			    task = new Task(item),
			    name = task.getTask();
			document.querySelector("table").innerHTML = task.render();
		});
	}, { "store": 5 }], 3: [function (require, module, exports) {
		"use strict";

		var _interopRequire = function _interopRequire(obj) {
			return obj && obj.__esModule ? obj["default"] : obj;
		};

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
	}, { "store": 5 }], 4: [function (require, module, exports) {
		/*! modernizr 3.3.1 (Custom Build) | MIT *
   * https://modernizr.com/download/?-localstorage !*/
		"use strict";

		!function (n, e, o) {
			function t(n, e) {
				return (typeof n === "undefined" ? "undefined" : _typeof(n)) === e;
			}function s() {
				var n, e, o, s, i, f, l;for (var u in a) {
					if (a.hasOwnProperty(u)) {
						if (n = [], e = a[u], e.name && (n.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length)) for (o = 0; o < e.options.aliases.length; o++) {
							n.push(e.options.aliases[o].toLowerCase());
						}for (s = t(e.fn, "function") ? e.fn() : e.fn, i = 0; i < n.length; i++) {
							f = n[i], l = f.split("."), 1 === l.length ? Modernizr[l[0]] = s : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = s), r.push((s ? "" : "no-") + l.join("-"));
						}
					}
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
					return localStorage.setItem(n, n), localStorage.removeItem(n), !0;
				} catch (e) {
					return !1;
				}
			});var r = [];s(), delete i.addTest, delete i.addAsyncTest;for (var f = 0; f < Modernizr._q.length; f++) {
				Modernizr._q[f]();
			}n.Modernizr = Modernizr;
		}(window, document);
	}, {}], 5: [function (require, module, exports) {
		(function (global) {
			"use strict";
			(function (root, factory) {
				if (typeof define === 'function' && define.amd) {
					// AMD. Register as an anonymous module.
					define([], factory);
				} else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
					// Node. Does not work with strict CommonJS, but
					// only CommonJS-like environments that support module.exports,
					// like Node.
					module.exports = factory();
				} else {
					// Browser globals (root is window)
					root.store = factory();
				}
			})(this, function () {

				// Store.js
				var store = {},
				    win = typeof window != 'undefined' ? window : global,
				    doc = win.document,
				    localStorageName = 'localStorage',
				    scriptTag = 'script',
				    storage;

				store.disabled = false;
				store.version = '1.3.20';
				store.set = function (key, value) {};
				store.get = function (key, defaultVal) {};
				store.has = function (key) {
					return store.get(key) !== undefined;
				};
				store.remove = function (key) {};
				store.clear = function () {};
				store.transact = function (key, defaultVal, transactionFn) {
					if (transactionFn == null) {
						transactionFn = defaultVal;
						defaultVal = null;
					}
					if (defaultVal == null) {
						defaultVal = {};
					}
					var val = store.get(key, defaultVal);
					transactionFn(val);
					store.set(key, val);
				};
				store.getAll = function () {};
				store.forEach = function () {};

				store.serialize = function (value) {
					return JSON.stringify(value);
				};
				store.deserialize = function (value) {
					if (typeof value != 'string') {
						return undefined;
					}
					try {
						return JSON.parse(value);
					} catch (e) {
						return value || undefined;
					}
				};

				// Functions to encapsulate questionable FireFox 3.6.13 behavior
				// when about.config::dom.storage.enabled === false
				// See https://github.com/marcuswestin/store.js/issues#issue/13
				function isLocalStorageNameSupported() {
					try {
						return localStorageName in win && win[localStorageName];
					} catch (err) {
						return false;
					}
				}

				if (isLocalStorageNameSupported()) {
					storage = win[localStorageName];
					store.set = function (key, val) {
						if (val === undefined) {
							return store.remove(key);
						}
						storage.setItem(key, store.serialize(val));
						return val;
					};
					store.get = function (key, defaultVal) {
						var val = store.deserialize(storage.getItem(key));
						return val === undefined ? defaultVal : val;
					};
					store.remove = function (key) {
						storage.removeItem(key);
					};
					store.clear = function () {
						storage.clear();
					};
					store.getAll = function () {
						var ret = {};
						store.forEach(function (key, val) {
							ret[key] = val;
						});
						return ret;
					};
					store.forEach = function (callback) {
						for (var i = 0; i < storage.length; i++) {
							var key = storage.key(i);
							callback(key, store.get(key));
						}
					};
				} else if (doc && doc.documentElement.addBehavior) {
					var storageOwner, storageContainer;
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
						storageContainer = new ActiveXObject('htmlfile');
						storageContainer.open();
						storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>');
						storageContainer.close();
						storageOwner = storageContainer.w.frames[0].document;
						storage = storageOwner.createElement('div');
					} catch (e) {
						// somehow ActiveXObject instantiation failed (perhaps some special
						// security settings or otherwse), fall back to per-path storage
						storage = doc.createElement('div');
						storageOwner = doc.body;
					}
					var withIEStorage = function withIEStorage(storeFunction) {
						return function () {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift(storage);
							// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
							// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
							storageOwner.appendChild(storage);
							storage.addBehavior('#default#userData');
							storage.load(localStorageName);
							var result = storeFunction.apply(store, args);
							storageOwner.removeChild(storage);
							return result;
						};
					};

					// In IE7, keys cannot start with a digit or contain certain chars.
					// See https://github.com/marcuswestin/store.js/issues/40
					// See https://github.com/marcuswestin/store.js/issues/83
					var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
					var ieKeyFix = function ieKeyFix(key) {
						return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___');
					};
					store.set = withIEStorage(function (storage, key, val) {
						key = ieKeyFix(key);
						if (val === undefined) {
							return store.remove(key);
						}
						storage.setAttribute(key, store.serialize(val));
						storage.save(localStorageName);
						return val;
					});
					store.get = withIEStorage(function (storage, key, defaultVal) {
						key = ieKeyFix(key);
						var val = store.deserialize(storage.getAttribute(key));
						return val === undefined ? defaultVal : val;
					});
					store.remove = withIEStorage(function (storage, key) {
						key = ieKeyFix(key);
						storage.removeAttribute(key);
						storage.save(localStorageName);
					});
					store.clear = withIEStorage(function (storage) {
						var attributes = storage.XMLDocument.documentElement.attributes;
						storage.load(localStorageName);
						for (var i = attributes.length - 1; i >= 0; i--) {
							storage.removeAttribute(attributes[i].name);
						}
						storage.save(localStorageName);
					});
					store.getAll = function (storage) {
						var ret = {};
						store.forEach(function (key, val) {
							ret[key] = val;
						});
						return ret;
					};
					store.forEach = withIEStorage(function (storage, callback) {
						var attributes = storage.XMLDocument.documentElement.attributes;
						for (var i = 0, attr; attr = attributes[i]; ++i) {
							callback(attr.name, store.deserialize(storage.getAttribute(attr.name)));
						}
					});
				}

				try {
					var testKey = '__storejs__';
					store.set(testKey, testKey);
					if (store.get(testKey) != testKey) {
						store.disabled = true;
					}
					store.remove(testKey);
				} catch (e) {
					store.disabled = true;
				}
				store.enabled = !store.disabled;

				return store;
			});
		}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	}, {}] }, {}, [1]);

//# sourceMappingURL=app-compiled.js.map