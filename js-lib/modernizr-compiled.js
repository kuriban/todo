/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-localstorage !*/
!function (n, e, o) {
  function t(n, e) {
    return typeof n === e;
  }function s() {
    var n, e, o, s, i, f, l;for (var u in a) if (a.hasOwnProperty(u)) {
      if (n = [], e = a[u], e.name && (n.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length)) for (o = 0; o < e.options.aliases.length; o++) n.push(e.options.aliases[o].toLowerCase());for (s = t(e.fn, "function") ? e.fn() : e.fn, i = 0; i < n.length; i++) f = n[i], l = f.split("."), 1 === l.length ? Modernizr[l[0]] = s : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = s), r.push((s ? "" : "no-") + l.join("-"));
    }
  }var a = [],
      i = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (n, e) {
      var o = this;setTimeout(function () {
        e(o[n]);
      }, 0);
    }, addTest: function (n, e, o) {
      a.push({ name: n, fn: e, options: o });
    }, addAsyncTest: function (n) {
      a.push({ name: null, fn: n });
    } },
      Modernizr = function () {};Modernizr.prototype = i, Modernizr = new Modernizr(), Modernizr.addTest("localstorage", function () {
    var n = "modernizr";try {
      return localStorage.setItem(n, n), localStorage.removeItem(n), !0;
    } catch (e) {
      return !1;
    }
  });var r = [];s(), delete i.addTest, delete i.addAsyncTest;for (var f = 0; f < Modernizr._q.length; f++) Modernizr._q[f]();n.Modernizr = Modernizr;
}(window, document);

//# sourceMappingURL=modernizr-compiled.js.map