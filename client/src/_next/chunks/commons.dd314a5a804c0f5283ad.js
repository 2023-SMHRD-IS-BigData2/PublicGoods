(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
    "/0+H": function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.isInAmpMode = i,
        e.useAmp = function() {
            return i(o.default.useContext(a.AmpStateContext))
        }
        ;
        var n, o = (n = r("q1tI")) && n.__esModule ? n : {
            default: n
        }, a = r("lwAK");
        function i({ampFirst: t=!1, hybrid: e=!1, hasQuery: r=!1}={}) {
            return t || e && r
        }
    },
    "/jkW": function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.isDynamicRoute = function(t) {
            return n.test(t)
        }
        ;
        const n = /\/\[[^/]+?\](?=\/|$)/
    },
    "0Bsm": function(t, e, r) {
        "use strict";
        var n = r("AroE");
        e.__esModule = !0,
        e.default = function(t) {
            function e(e) {
                return o.default.createElement(t, Object.assign({
                    router: (0,
                    a.useRouter)()
                }, e))
            }
            e.getInitialProps = t.getInitialProps,
            e.origGetInitialProps = t.origGetInitialProps,
            !1;
            return e
        }
        ;
        var o = n(r("q1tI"))
          , a = r("nOHt")
    },
    "3r9c": function(t, e) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || new Function("return this")()
        } catch (n) {
            "object" === typeof window && (r = window)
        }
        t.exports = r
    },
    "4JlD": function(t, e, r) {
        "use strict";
        var n = function(t) {
            switch (typeof t) {
            case "string":
                return t;
            case "boolean":
                return t ? "true" : "false";
            case "number":
                return isFinite(t) ? t : "";
            default:
                return ""
            }
        };
        t.exports = function(t, e, r, s) {
            return e = e || "&",
            r = r || "=",
            null === t && (t = void 0),
            "object" === typeof t ? a(i(t), (function(i) {
                var s = encodeURIComponent(n(i)) + r;
                return o(t[i]) ? a(t[i], (function(t) {
                    return s + encodeURIComponent(n(t))
                }
                )).join(e) : s + encodeURIComponent(n(t[i]))
            }
            )).join(e) : s ? encodeURIComponent(n(s)) + r + encodeURIComponent(n(t)) : ""
        }
        ;
        var o = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
        ;
        function a(t, e) {
            if (t.map)
                return t.map(e);
            for (var r = [], n = 0; n < t.length; n++)
                r.push(e(t[n], n));
            return r
        }
        var i = Object.keys || function(t) {
            var e = [];
            for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
            return e
        }
    },
    "7KCV": function(t, e, r) {
        var n = r("C+bE");
        function o() {
            if ("function" !== typeof WeakMap)
                return null;
            var t = new WeakMap;
            return o = function() {
                return t
            }
            ,
            t
        }
        t.exports = function(t) {
            if (t && t.__esModule)
                return t;
            if (null === t || "object" !== n(t) && "function" !== typeof t)
                return {
                    default: t
                };
            var e = o();
            if (e && e.has(t))
                return e.get(t);
            var r = {}
              , a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in t)
                if (Object.prototype.hasOwnProperty.call(t, i)) {
                    var s = a ? Object.getOwnPropertyDescriptor(t, i) : null;
                    s && (s.get || s.set) ? Object.defineProperty(r, i, s) : r[i] = t[i]
                }
            return r.default = t,
            e && e.set(t, r),
            r
        }
    },
    "7eYB": function(t, e) {
        t.exports = function(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++)
                n[r] = t[r];
            return n
        }
    },
    "8Kt/": function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.defaultHead = u,
        e.default = void 0;
        var n = c(r("q1tI"))
          , o = c(r("Xuae"))
          , a = r("lwAK")
          , i = r("FYa8")
          , s = r("/0+H");
        function c(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function u(t=!1) {
            const e = [n.default.createElement("meta", {
                charSet: "utf-8"
            })];
            return t || e.push(n.default.createElement("meta", {
                name: "viewport",
                content: "width=device-width"
            })),
            e
        }
        function l(t, e) {
            return "string" === typeof e || "number" === typeof e ? t : e.type === n.default.Fragment ? t.concat(n.default.Children.toArray(e.props.children).reduce((t,e)=>"string" === typeof e || "number" === typeof e ? t : t.concat(e), [])) : t.concat(e)
        }
        const h = ["name", "httpEquiv", "charSet", "itemProp"];
        function p(t, e) {
            return t.reduce((t,e)=>{
                const r = n.default.Children.toArray(e.props.children);
                return t.concat(r)
            }
            , []).reduce(l, []).reverse().concat(u(e.inAmpMode)).filter(function() {
                const t = new Set
                  , e = new Set
                  , r = new Set
                  , n = {};
                return o=>{
                    let a = !0;
                    if (o.key && "number" !== typeof o.key && o.key.indexOf("$") > 0) {
                        const e = o.key.slice(o.key.indexOf("$") + 1);
                        t.has(e) ? a = !1 : t.add(e)
                    }
                    switch (o.type) {
                    case "title":
                    case "base":
                        e.has(o.type) ? a = !1 : e.add(o.type);
                        break;
                    case "meta":
                        for (let t = 0, e = h.length; t < e; t++) {
                            const e = h[t];
                            if (o.props.hasOwnProperty(e))
                                if ("charSet" === e)
                                    r.has(e) ? a = !1 : r.add(e);
                                else {
                                    const t = o.props[e]
                                      , r = n[e] || new Set;
                                    r.has(t) ? a = !1 : (r.add(t),
                                    n[e] = r)
                                }
                        }
                    }
                    return a
                }
            }()).reverse().map((t,e)=>{
                const r = t.key || e;
                return n.default.cloneElement(t, {
                    key: r
                })
            }
            )
        }
        const f = (0,
        o.default)();
        function d({children: t}) {
            return n.default.createElement(a.AmpStateContext.Consumer, null, e=>n.default.createElement(i.HeadManagerContext.Consumer, null, r=>n.default.createElement(f, {
                reduceComponentsToState: p,
                handleStateChange: r,
                inAmpMode: (0,
                s.isInAmpMode)(e)
            }, t)))
        }
        d.rewind = f.rewind;
        var m = d;
        e.default = m
    },
    AroE: function(t, e) {
        t.exports = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    },
    "C+bE": function(t, e) {
        function r(e) {
            return "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? t.exports = r = function(t) {
                return typeof t
            }
            : t.exports = r = function(t) {
                return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            r(e)
        }
        t.exports = r
    },
    FYa8: function(t, e, r) {
        "use strict";
        var n;
        e.__esModule = !0,
        e.HeadManagerContext = void 0;
        const o = ((n = r("q1tI")) && n.__esModule ? n : {
            default: n
        }).default.createContext(null);
        e.HeadManagerContext = o
    },
    KckH: function(t, e, r) {
        var n = r("7eYB");
        t.exports = function(t, e) {
            if (t) {
                if ("string" === typeof t)
                    return n(t, e);
                var r = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0
            }
        }
    },
    PqPU: function(t, e) {
        t.exports = function(t) {
            if (Array.isArray(t))
                return t
        }
    },
    Qetd: function(t, e, r) {
        "use strict";
        var n = Object.assign.bind(Object);
        t.exports = n,
        t.exports.default = t.exports
    },
    QmWs: function(t, e, r) {
        var n, o = (n = r("s4NR")) && "object" == typeof n && "default"in n ? n.default : n, a = /https?|ftp|gopher|file/;
        function i(t) {
            "string" == typeof t && (t = w(t));
            var e = function(t, e, r) {
                var n = t.auth
                  , o = t.hostname
                  , a = t.protocol || ""
                  , i = t.pathname || ""
                  , s = t.hash || ""
                  , c = t.query || ""
                  , u = !1;
                n = n ? encodeURIComponent(n).replace(/%3A/i, ":") + "@" : "",
                t.host ? u = n + t.host : o && (u = n + (~o.indexOf(":") ? "[" + o + "]" : o),
                t.port && (u += ":" + t.port)),
                c && "object" == typeof c && (c = e.encode(c));
                var l = t.search || c && "?" + c || "";
                return a && ":" !== a.substr(-1) && (a += ":"),
                t.slashes || (!a || r.test(a)) && !1 !== u ? (u = "//" + (u || ""),
                i && "/" !== i[0] && (i = "/" + i)) : u || (u = ""),
                s && "#" !== s[0] && (s = "#" + s),
                l && "?" !== l[0] && (l = "?" + l),
                {
                    protocol: a,
                    host: u,
                    pathname: i = i.replace(/[?#]/g, encodeURIComponent),
                    search: l = l.replace("#", "%23"),
                    hash: s
                }
            }(t, o, a);
            return "" + e.protocol + e.host + e.pathname + e.search + e.hash
        }
        var s = "http://"
          , c = "w.w"
          , u = s + c
          , l = /^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i
          , h = /https?|ftp|gopher|file/;
        function p(t, e) {
            var r = "string" == typeof t ? w(t) : t;
            t = "object" == typeof t ? i(t) : t;
            var n = w(e)
              , o = "";
            r.protocol && !r.slashes && (o = r.protocol,
            t = t.replace(r.protocol, ""),
            o += "/" === e[0] || "/" === t[0] ? "/" : ""),
            o && n.protocol && (o = "",
            n.slashes || (o = n.protocol,
            e = e.replace(n.protocol, "")));
            var a = t.match(l);
            a && !n.protocol && (t = t.substr((o = a[1] + (a[2] || "")).length),
            /^\/\/[^/]/.test(e) && (o = o.slice(0, -1)));
            var c = new URL(t,u + "/")
              , p = new URL(e,c).toString().replace(u, "")
              , f = n.protocol || r.protocol;
            return f += r.slashes || n.slashes ? "//" : "",
            !o && f ? p = p.replace(s, f) : o && (p = p.replace(s, "")),
            h.test(p) || ~e.indexOf(".") || "/" === t.slice(-1) || "/" === e.slice(-1) || "/" !== p.slice(-1) || (p = p.slice(0, -1)),
            o && (p = o + ("/" === p[0] ? p.substr(1) : p)),
            p
        }
        function f() {}
        f.parse = w,
        f.format = i,
        f.resolve = p,
        f.resolveObject = p;
        var d = /^https?|ftp|gopher|file/
          , m = /^(.*?)([#?].*)/
          , y = /^([a-z0-9.+-]*:)(\/{0,3})(.*)/i
          , v = /^([a-z0-9.+-]*:)?\/\/\/*/i
          , g = /^([a-z0-9.+-]*:)(\/{0,2})\[(.*)\]$/i;
        function b(t) {
            try {
                return decodeURI(t)
            } catch (o) {
                return t
            }
        }
        function w(t, e, r) {
            if (void 0 === e && (e = !1),
            void 0 === r && (r = !1),
            t && "object" == typeof t && t instanceof f)
                return t;
            var n = (t = t.trim()).match(m);
            t = n ? b(n[1]).replace(/\\/g, "/") + n[2] : b(t).replace(/\\/g, "/"),
            g.test(t) && "/" !== t.slice(-1) && (t += "/");
            var a = !/(^javascript)/.test(t) && t.match(y)
              , s = v.test(t)
              , l = "";
            a && (d.test(a[1]) || (l = a[1].toLowerCase(),
            t = "" + a[2] + a[3]),
            a[2] || (s = !1,
            d.test(a[1]) ? (l = a[1],
            t = "" + a[3]) : t = "//" + a[3]),
            3 !== a[2].length && 1 !== a[2].length || (l = a[1],
            t = "/" + a[3]));
            var h, p = (n ? n[1] : t).match(/(:[0-9]+)/), w = "";
            p && p[1] && 3 === p[1].length && (t = t.replace(w = p[1], w + "00"));
            var _ = new f
              , x = ""
              , S = "";
            try {
                h = new URL(t)
            } catch (o) {
                x = o,
                l || r || !/^\/\//.test(t) || /^\/\/.+[@.]/.test(t) || (S = "/",
                t = t.substr(1));
                try {
                    h = new URL(t,u)
                } catch (t) {
                    return _.protocol = l,
                    _.href = l,
                    _
                }
            }
            _.slashes = s && !S,
            _.host = h.host === c ? "" : h.host,
            _.hostname = h.hostname === c ? "" : h.hostname.replace(/(\[|\])/g, ""),
            _.protocol = x ? l || null : h.protocol,
            _.search = h.search.replace(/\\/g, "%5C"),
            _.hash = h.hash.replace(/\\/g, "%5C");
            var C = t.split("#");
            !_.search && ~C[0].indexOf("?") && (_.search = "?"),
            _.hash || "" !== C[1] || (_.hash = "#"),
            _.query = e ? o.decode(h.search.substr(1)) : _.search.substr(1),
            _.pathname = S + b(h.pathname).replace(/"/g, "%22"),
            "about:" === _.protocol && "blank" === _.pathname && (_.protocol = "",
            _.pathname = ""),
            x && "/" !== t[0] && (_.pathname = _.pathname.substr(1)),
            l && !d.test(l) && "/" !== t.slice(-1) && "/" === _.pathname && (_.pathname = ""),
            _.path = _.pathname + _.search,
            _.auth = [h.username, h.password].map(decodeURIComponent).filter(Boolean).join(":"),
            _.port = h.port,
            w && (_.host = _.host.replace(w + "00", w),
            _.port = _.port.slice(0, -2)),
            _.href = S ? "" + _.pathname + _.search + _.hash : i(_);
            var P = /^(file)/.test(_.href) ? ["host", "hostname"] : [];
            return Object.keys(_).forEach((function(t) {
                ~P.indexOf(t) || (_[t] = _[t] || null)
            }
            )),
            _
        }
        e.parse = w,
        e.format = i,
        e.resolve = p,
        e.resolveObject = function(t, e) {
            return w(p(t, e))
        }
        ,
        e.Url = f
    },
    Xuae: function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.default = void 0;
        var n = r("q1tI");
        e.default = ()=>{
            const t = new Set;
            let e;
            function r(r) {
                e = r.props.reduceComponentsToState([...t], r.props),
                r.props.handleStateChange && r.props.handleStateChange(e)
            }
            return class extends n.Component {
                static rewind() {
                    const r = e;
                    return e = void 0,
                    t.clear(),
                    r
                }
                constructor(t) {
                    super(t)
                }
                componentDidMount() {
                    t.add(this),
                    r(this)
                }
                componentDidUpdate() {
                    r(this)
                }
                componentWillUnmount() {
                    t.delete(this),
                    r(this)
                }
                render() {
                    return null
                }
            }
        }
    },
    YTqd: function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.getRouteRegex = function(t) {
            const e = (n = t.replace(/\/$/, "") || "/",
            n.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&"))
              , r = {};
            var n;
            let o = 1;
            const a = e.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (t,e)=>{
                const n = /^\\\[.*\\\]$/.test(e);
                n && (e = e.slice(2, -2));
                const a = /^(\\\.){3}/.test(e);
                return a && (e = e.slice(6)),
                r[e.replace(/\\([|\\{}()[\]^$+*?.-])/g, "$1")] = {
                    pos: o++,
                    repeat: a
                },
                a ? n ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)"
            }
            );
            0;
            return {
                re: new RegExp("^" + a + "(?:/)?$","i"),
                groups: r,
                namedRegex: void 0
            }
        }
    },
    dZ6Y: function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.default = function() {
            const t = Object.create(null);
            return {
                on(e, r) {
                    (t[e] || (t[e] = [])).push(r)
                },
                off(e, r) {
                    t[e] && t[e].splice(t[e].indexOf(r) >>> 0, 1)
                },
                emit(e, ...r) {
                    (t[e] || []).slice().map(t=>{
                        t(...r)
                    }
                    )
                }
            }
        }
    },
    elyg: function(t, e, r) {
        "use strict";
        var n = r("vJKn")
          , o = r("qVT1")
          , a = r("zoAU");
        e.__esModule = !0,
        e.addBasePath = d,
        e.delBasePath = m,
        e.default = void 0;
        var i, s = r("QmWs"), c = (i = r("dZ6Y")) && i.__esModule ? i : {
            default: i
        }, u = r("g/15"), l = r("/jkW"), h = r("gguc"), p = r("YTqd");
        const f = "";
        function d(t) {
            return 0 !== t.indexOf(f) ? f + t : t
        }
        function m(t) {
            return 0 === t.indexOf(f) ? t.substr(f.length) || "/" : t
        }
        function y(t) {
            return t.replace(/\/$/, "") || "/"
        }
        const v = t=>y(t && "/" !== t ? t : "/index");
        function g(t, e, r, n) {
            let o = r ? 3 : 1;
            return function r() {
                return fetch((0,
                u.formatWithValidation)({
                    pathname: d("/_next/data/".concat(__NEXT_DATA__.buildId).concat(m(t), ".json")),
                    query: e
                }), {
                    credentials: "same-origin"
                }).then(t=>{
                    if (!t.ok) {
                        if (--o > 0 && t.status >= 500)
                            return r();
                        throw new Error("Failed to load static props")
                    }
                    return t.json()
                }
                )
            }().then(t=>n ? n(t) : t).catch(t=>{
                throw r || (t.code = "PAGE_LOAD_ERROR"),
                t
            }
            )
        }
        class b {
            constructor(t, e, r, {initialProps: n, pageLoader: o, App: a, wrapApp: i, Component: c, err: h, subscription: p, isFallback: d}) {
                this.route = void 0,
                this.pathname = void 0,
                this.query = void 0,
                this.asPath = void 0,
                this.basePath = void 0,
                this.components = void 0,
                this.sdc = {},
                this.sub = void 0,
                this.clc = void 0,
                this.pageLoader = void 0,
                this._bps = void 0,
                this.events = void 0,
                this._wrapApp = void 0,
                this.isSsr = void 0,
                this.isFallback = void 0,
                this.onPopState = t=>{
                    if (!t.state) {
                        const t = this.pathname
                          , e = this.query;
                        return void this.changeState("replaceState", (0,
                        u.formatWithValidation)({
                            pathname: t,
                            query: e
                        }), (0,
                        u.getURL)())
                    }
                    if (t.state && this.isSsr && t.state.as === this.asPath && (0,
                    s.parse)(t.state.url).pathname === this.pathname)
                        return;
                    if (this._bps && !this._bps(t.state))
                        return;
                    const e = t.state
                      , r = e.url
                      , n = e.as
                      , o = e.options;
                    this.replace(r, n, o)
                }
                ,
                this._getStaticData = t=>{
                    const e = v((0,
                    s.parse)(t).pathname);
                    return this.sdc[e] ? Promise.resolve(this.sdc[e]) : g(e, null, this.isSsr, t=>this.sdc[e] = t)
                }
                ,
                this._getServerData = t=>{
                    let e = (0,
                    s.parse)(t, !0)
                      , r = e.pathname
                      , n = e.query;
                    return r = v(r),
                    g(r, n, this.isSsr)
                }
                ,
                this.route = y(t),
                this.components = {},
                "/_error" !== t && (this.components[this.route] = {
                    Component: c,
                    props: n,
                    err: h,
                    __N_SSG: n && n.__N_SSG,
                    __N_SSP: n && n.__N_SSP
                }),
                this.components["/_app"] = {
                    Component: a
                },
                this.events = b.events,
                this.pageLoader = o,
                this.pathname = t,
                this.query = e,
                this.asPath = (0,
                l.isDynamicRoute)(t) && __NEXT_DATA__.autoExport ? t : r,
                this.basePath = f,
                this.sub = p,
                this.clc = null,
                this._wrapApp = i,
                this.isSsr = !0,
                this.isFallback = d,
                "//" !== r.substr(0, 2) && this.changeState("replaceState", (0,
                u.formatWithValidation)({
                    pathname: t,
                    query: e
                }), r),
                window.addEventListener("popstate", this.onPopState)
            }
            static _rewriteUrlForNextExport(t) {
                return t
            }
            update(t, e) {
                const r = e.default || e
                  , n = this.components[t];
                if (!n)
                    throw new Error("Cannot update unavailable route: ".concat(t));
                const o = Object.assign({}, n, {
                    Component: r,
                    __N_SSG: e.__N_SSG,
                    __N_SSP: e.__N_SSP
                });
                this.components[t] = o,
                "/_app" !== t ? t === this.route && this.notify(o) : this.notify(this.components[this.route])
            }
            reload() {
                window.location.reload()
            }
            back() {
                window.history.back()
            }
            push(t, e=t, r={}) {
                return this.change("pushState", t, e, r)
            }
            replace(t, e=t, r={}) {
                return this.change("replaceState", t, e, r)
            }
            change(t, e, r, n) {
                return new Promise((o,a)=>{
                    n._h || (this.isSsr = !1),
                    u.ST && performance.mark("routeChange");
                    let i = "object" === typeof e ? (0,
                    u.formatWithValidation)(e) : e
                      , c = "object" === typeof r ? (0,
                    u.formatWithValidation)(r) : r;
                    if (i = d(i),
                    c = d(c),
                    this.abortComponentLoad(c),
                    !n._h && this.onlyAHashChange(c))
                        return this.asPath = c,
                        b.events.emit("hashChangeStart", c),
                        this.changeState(t, i, c, n),
                        this.scrollToHash(c),
                        b.events.emit("hashChangeComplete", c),
                        o(!0);
                    const f = (0,
                    s.parse)(i, !0)
                      , m = f.pathname
                      , v = f.query
                      , g = f.protocol;
                    if (!m || g)
                        return o(!1);
                    this.urlIsNew(c) || (t = "replaceState");
                    const w = y(m)
                      , _ = n.shallow
                      , x = void 0 !== _ && _;
                    if ((0,
                    l.isDynamicRoute)(w)) {
                        const t = (0,
                        s.parse)(c).pathname
                          , e = (0,
                        p.getRouteRegex)(w)
                          , r = (0,
                        h.getRouteMatcher)(e)(t);
                        if (r)
                            Object.assign(v, r);
                        else {
                            if (Object.keys(e.groups).filter(t=>!v[t]).length > 0)
                                return a(new Error("The provided `as` value (".concat(t, ") is incompatible with the `href` value (").concat(w, "). ") + "Read more: https://err.sh/vercel/next.js/incompatible-href-as"))
                        }
                    }
                    b.events.emit("routeChangeStart", c),
                    this.getRouteInfo(w, m, v, c, x).then(e=>{
                        const r = e.error;
                        if (r && r.cancelled)
                            return o(!1);
                        b.events.emit("beforeHistoryChange", c),
                        this.changeState(t, i, c, n),
                        this.set(w, m, v, c, e).then(()=>{
                            if (r)
                                throw b.events.emit("routeChangeError", r, c),
                                r;
                            return b.events.emit("routeChangeComplete", c),
                            o(!0)
                        }
                        )
                    }
                    , a)
                }
                )
            }
            changeState(t, e, r, n={}) {
                "pushState" === t && (0,
                u.getURL)() === r || window.history[t]({
                    url: e,
                    as: r,
                    options: n
                }, "", r)
            }
            getRouteInfo(t, e, r, n, o=!1) {
                const a = this.components[t];
                if (o && a && this.route === t)
                    return Promise.resolve(a);
                const i = (t,o)=>new Promise(a=>"PAGE_LOAD_ERROR" === t.code || o ? (window.location.href = n,
                t.cancelled = !0,
                a({
                    error: t
                })) : t.cancelled ? a({
                    error: t
                }) : void a(this.fetchComponent("/_error").then(n=>{
                    const o = n.page
                      , a = {
                        Component: o,
                        err: t
                    };
                    return new Promise(n=>{
                        this.getInitialProps(o, {
                            err: t,
                            pathname: e,
                            query: r
                        }).then(e=>{
                            a.props = e,
                            a.error = t,
                            n(a)
                        }
                        , e=>{
                            console.error("Error in error page `getInitialProps`: ", e),
                            a.error = t,
                            a.props = {},
                            n(a)
                        }
                        )
                    }
                    )
                }
                ).catch(t=>i(t, !0))));
                return new Promise((e,r)=>{
                    if (a)
                        return e(a);
                    this.fetchComponent(t).then(t=>e({
                        Component: t.page,
                        __N_SSG: t.mod.__N_SSG,
                        __N_SSP: t.mod.__N_SSP
                    }), r)
                }
                ).then(o=>{
                    const a = o.Component
                      , i = o.__N_SSG
                      , s = o.__N_SSP;
                    return this._getData(()=>i ? this._getStaticData(n) : s ? this._getServerData(n) : this.getInitialProps(a, {
                        pathname: e,
                        query: r,
                        asPath: n
                    })).then(e=>(o.props = e,
                    this.components[t] = o,
                    o))
                }
                ).catch(i)
            }
            set(t, e, r, n, o) {
                return this.isFallback = !1,
                this.route = t,
                this.pathname = e,
                this.query = r,
                this.asPath = n,
                this.notify(o)
            }
            beforePopState(t) {
                this._bps = t
            }
            onlyAHashChange(t) {
                if (!this.asPath)
                    return !1;
                const e = this.asPath.split("#")
                  , r = a(e, 2)
                  , n = r[0]
                  , o = r[1]
                  , i = t.split("#")
                  , s = a(i, 2)
                  , c = s[0]
                  , u = s[1];
                return !(!u || n !== c || o !== u) || n === c && o !== u
            }
            scrollToHash(t) {
                const e = t.split("#")
                  , r = a(e, 2)[1];
                if ("" === r)
                    return void window.scrollTo(0, 0);
                const n = document.getElementById(r);
                if (n)
                    return void n.scrollIntoView();
                const o = document.getElementsByName(r)[0];
                o && o.scrollIntoView()
            }
            urlIsNew(t) {
                return this.asPath !== t
            }
            prefetch(t, e=t, r={}) {
                return new Promise((n,o)=>{
                    const a = (0,
                    s.parse)(t)
                      , i = a.pathname
                      , c = a.protocol;
                    if (!i || c)
                        return void 0;
                    const u = m(y(i));
                    Promise.all([this.pageLoader.prefetchData(t, m(e)), this.pageLoader[r.priority ? "loadPage" : "prefetch"](u)]).then(()=>n(), o)
                }
                )
            }
            fetchComponent(t) {
                var e = this;
                return o(n.mark((function r() {
                    var o, a, i, s;
                    return n.wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return o = !1,
                                a = e.clc = ()=>{
                                    o = !0
                                }
                                ,
                                t = m(t),
                                r.next = 5,
                                e.pageLoader.loadPage(t);
                            case 5:
                                if (i = r.sent,
                                !o) {
                                    r.next = 10;
                                    break
                                }
                                throw (s = new Error('Abort fetching component for route: "'.concat(t, '"'))).cancelled = !0,
                                s;
                            case 10:
                                return a === e.clc && (e.clc = null),
                                r.abrupt("return", i);
                            case 12:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r)
                }
                )))()
            }
            _getData(t) {
                let e = !1;
                const r = ()=>{
                    e = !0
                }
                ;
                return this.clc = r,
                t().then(t=>{
                    if (r === this.clc && (this.clc = null),
                    e) {
                        const t = new Error("Loading initial props cancelled");
                        throw t.cancelled = !0,
                        t
                    }
                    return t
                }
                )
            }
            getInitialProps(t, e) {
                const r = this.components["/_app"].Component
                  , n = this._wrapApp(r);
                return e.AppTree = n,
                (0,
                u.loadGetInitialProps)(r, {
                    AppTree: n,
                    Component: t,
                    router: this,
                    ctx: e
                })
            }
            abortComponentLoad(t) {
                if (this.clc) {
                    const e = new Error("Route Cancelled");
                    e.cancelled = !0,
                    b.events.emit("routeChangeError", e, t),
                    this.clc(),
                    this.clc = null
                }
            }
            notify(t) {
                return this.sub(t, this.components["/_app"].Component)
            }
        }
        e.default = b,
        b.events = (0,
        c.default)()
    },
    "g/15": function(t, e, r) {
        "use strict";
        var n = r("vJKn")
          , o = r("qVT1");
        e.__esModule = !0,
        e.execOnce = function(t) {
            let e, r = !1;
            return (...n)=>(r || (r = !0,
            e = t(...n)),
            e)
        }
        ,
        e.getLocationOrigin = i,
        e.getURL = function() {
            const t = window.location.href
              , e = i();
            return t.substring(e.length)
        }
        ,
        e.getDisplayName = s,
        e.isResSent = c,
        e.loadGetInitialProps = u,
        e.formatWithValidation = function(t, e) {
            0;
            return (0,
            a.format)(t, e)
        }
        ,
        e.ST = e.SP = e.urlObjectKeys = void 0;
        var a = r("QmWs");
        function i() {
            const t = window.location
              , e = t.protocol
              , r = t.hostname
              , n = t.port;
            return "".concat(e, "//").concat(r).concat(n ? ":" + n : "")
        }
        function s(t) {
            return "string" === typeof t ? t : t.displayName || t.name || "Unknown"
        }
        function c(t) {
            return t.finished || t.headersSent
        }
        function u(t, e) {
            return l.apply(this, arguments)
        }
        function l() {
            return (l = o(n.mark((function t(e, r) {
                var o, a, i;
                return n.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            t.next = 4;
                            break;
                        case 4:
                            if (a = r.res || r.ctx && r.ctx.res,
                            e.getInitialProps) {
                                t.next = 12;
                                break
                            }
                            if (!r.ctx || !r.Component) {
                                t.next = 11;
                                break
                            }
                            return t.next = 9,
                            u(r.Component, r.ctx);
                        case 9:
                            return t.t0 = t.sent,
                            t.abrupt("return", {
                                pageProps: t.t0
                            });
                        case 11:
                            return t.abrupt("return", {});
                        case 12:
                            return t.next = 14,
                            e.getInitialProps(r);
                        case 14:
                            if (i = t.sent,
                            !a || !c(a)) {
                                t.next = 17;
                                break
                            }
                            return t.abrupt("return", i);
                        case 17:
                            if (i) {
                                t.next = 20;
                                break
                            }
                            throw o = '"'.concat(s(e), '.getInitialProps()" should resolve to an object. But found "').concat(i, '" instead.'),
                            new Error(o);
                        case 20:
                            return t.abrupt("return", i);
                        case 22:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            )))).apply(this, arguments)
        }
        e.urlObjectKeys = ["auth", "hash", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "slashes"];
        const h = "undefined" !== typeof performance;
        e.SP = h;
        const p = h && "function" === typeof performance.mark && "function" === typeof performance.measure;
        e.ST = p
    },
    gguc: function(t, e, r) {
        "use strict";
        e.__esModule = !0,
        e.getRouteMatcher = function(t) {
            const e = t.re
              , r = t.groups;
            return t=>{
                const n = e.exec(t);
                if (!n)
                    return !1;
                const o = t=>{
                    try {
                        return decodeURIComponent(t)
                    } catch (e) {
                        const t = new Error("failed to decode param");
                        throw t.code = "DECODE_FAILED",
                        t
                    }
                }
                  , a = {};
                return Object.keys(r).forEach(t=>{
                    const e = r[t]
                      , i = n[e.pos];
                    void 0 !== i && (a[t] = ~i.indexOf("/") ? i.split("/").map(t=>o(t)) : e.repeat ? [o(i)] : o(i))
                }
                ),
                a
            }
        }
    },
    kd2E: function(t, e, r) {
        "use strict";
        function n(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        t.exports = function(t, e, r, a) {
            e = e || "&",
            r = r || "=";
            var i = {};
            if ("string" !== typeof t || 0 === t.length)
                return i;
            var s = /\+/g;
            t = t.split(e);
            var c = 1e3;
            a && "number" === typeof a.maxKeys && (c = a.maxKeys);
            var u = t.length;
            c > 0 && u > c && (u = c);
            for (var l = 0; l < u; ++l) {
                var h, p, f, d, m = t[l].replace(s, "%20"), y = m.indexOf(r);
                y >= 0 ? (h = m.substr(0, y),
                p = m.substr(y + 1)) : (h = m,
                p = ""),
                f = decodeURIComponent(h),
                d = decodeURIComponent(p),
                n(i, f) ? o(i[f]) ? i[f].push(d) : i[f] = [i[f], d] : i[f] = d
            }
            return i
        }
        ;
        var o = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
    },
    ls82: function(t, e, r) {
        var n = function(t) {
            "use strict";
            var e, r = Object.prototype, n = r.hasOwnProperty, o = "function" === typeof Symbol ? Symbol : {}, a = o.iterator || "@@iterator", i = o.asyncIterator || "@@asyncIterator", s = o.toStringTag || "@@toStringTag";
            function c(t, e, r, n) {
                var o = e && e.prototype instanceof m ? e : m
                  , a = Object.create(o.prototype)
                  , i = new O(n || []);
                return a._invoke = function(t, e, r) {
                    var n = l;
                    return function(o, a) {
                        if (n === p)
                            throw new Error("Generator is already running");
                        if (n === f) {
                            if ("throw" === o)
                                throw a;
                            return A()
                        }
                        for (r.method = o,
                        r.arg = a; ; ) {
                            var i = r.delegate;
                            if (i) {
                                var s = C(i, r);
                                if (s) {
                                    if (s === d)
                                        continue;
                                    return s
                                }
                            }
                            if ("next" === r.method)
                                r.sent = r._sent = r.arg;
                            else if ("throw" === r.method) {
                                if (n === l)
                                    throw n = f,
                                    r.arg;
                                r.dispatchException(r.arg)
                            } else
                                "return" === r.method && r.abrupt("return", r.arg);
                            n = p;
                            var c = u(t, e, r);
                            if ("normal" === c.type) {
                                if (n = r.done ? f : h,
                                c.arg === d)
                                    continue;
                                return {
                                    value: c.arg,
                                    done: r.done
                                }
                            }
                            "throw" === c.type && (n = f,
                            r.method = "throw",
                            r.arg = c.arg)
                        }
                    }
                }(t, r, i),
                a
            }
            function u(t, e, r) {
                try {
                    return {
                        type: "normal",
                        arg: t.call(e, r)
                    }
                } catch (n) {
                    return {
                        type: "throw",
                        arg: n
                    }
                }
            }
            t.wrap = c;
            var l = "suspendedStart"
              , h = "suspendedYield"
              , p = "executing"
              , f = "completed"
              , d = {};
            function m() {}
            function y() {}
            function v() {}
            var g = {};
            g[a] = function() {
                return this
            }
            ;
            var b = Object.getPrototypeOf
              , w = b && b(b(j([])));
            w && w !== r && n.call(w, a) && (g = w);
            var _ = v.prototype = m.prototype = Object.create(g);
            function x(t) {
                ["next", "throw", "return"].forEach((function(e) {
                    t[e] = function(t) {
                        return this._invoke(e, t)
                    }
                }
                ))
            }
            function S(t, e) {
                var r;
                this._invoke = function(o, a) {
                    function i() {
                        return new e((function(r, i) {
                            !function r(o, a, i, s) {
                                var c = u(t[o], t, a);
                                if ("throw" !== c.type) {
                                    var l = c.arg
                                      , h = l.value;
                                    return h && "object" === typeof h && n.call(h, "__await") ? e.resolve(h.__await).then((function(t) {
                                        r("next", t, i, s)
                                    }
                                    ), (function(t) {
                                        r("throw", t, i, s)
                                    }
                                    )) : e.resolve(h).then((function(t) {
                                        l.value = t,
                                        i(l)
                                    }
                                    ), (function(t) {
                                        return r("throw", t, i, s)
                                    }
                                    ))
                                }
                                s(c.arg)
                            }(o, a, r, i)
                        }
                        ))
                    }
                    return r = r ? r.then(i, i) : i()
                }
            }
            function C(t, r) {
                var n = t.iterator[r.method];
                if (n === e) {
                    if (r.delegate = null,
                    "throw" === r.method) {
                        if (t.iterator.return && (r.method = "return",
                        r.arg = e,
                        C(t, r),
                        "throw" === r.method))
                            return d;
                        r.method = "throw",
                        r.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return d
                }
                var o = u(n, t.iterator, r.arg);
                if ("throw" === o.type)
                    return r.method = "throw",
                    r.arg = o.arg,
                    r.delegate = null,
                    d;
                var a = o.arg;
                return a ? a.done ? (r[t.resultName] = a.value,
                r.next = t.nextLoc,
                "return" !== r.method && (r.method = "next",
                r.arg = e),
                r.delegate = null,
                d) : a : (r.method = "throw",
                r.arg = new TypeError("iterator result is not an object"),
                r.delegate = null,
                d)
            }
            function P(t) {
                var e = {
                    tryLoc: t[0]
                };
                1 in t && (e.catchLoc = t[1]),
                2 in t && (e.finallyLoc = t[2],
                e.afterLoc = t[3]),
                this.tryEntries.push(e)
            }
            function E(t) {
                var e = t.completion || {};
                e.type = "normal",
                delete e.arg,
                t.completion = e
            }
            function O(t) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                t.forEach(P, this),
                this.reset(!0)
            }
            function j(t) {
                if (t) {
                    var r = t[a];
                    if (r)
                        return r.call(t);
                    if ("function" === typeof t.next)
                        return t;
                    if (!isNaN(t.length)) {
                        var o = -1
                          , i = function r() {
                            for (; ++o < t.length; )
                                if (n.call(t, o))
                                    return r.value = t[o],
                                    r.done = !1,
                                    r;
                            return r.value = e,
                            r.done = !0,
                            r
                        };
                        return i.next = i
                    }
                }
                return {
                    next: A
                }
            }
            function A() {
                return {
                    value: e,
                    done: !0
                }
            }
            return y.prototype = _.constructor = v,
            v.constructor = y,
            v[s] = y.displayName = "GeneratorFunction",
            t.isGeneratorFunction = function(t) {
                var e = "function" === typeof t && t.constructor;
                return !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name))
            }
            ,
            t.mark = function(t) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(t, v) : (t.__proto__ = v,
                s in t || (t[s] = "GeneratorFunction")),
                t.prototype = Object.create(_),
                t
            }
            ,
            t.awrap = function(t) {
                return {
                    __await: t
                }
            }
            ,
            x(S.prototype),
            S.prototype[i] = function() {
                return this
            }
            ,
            t.AsyncIterator = S,
            t.async = function(e, r, n, o, a) {
                void 0 === a && (a = Promise);
                var i = new S(c(e, r, n, o),a);
                return t.isGeneratorFunction(r) ? i : i.next().then((function(t) {
                    return t.done ? t.value : i.next()
                }
                ))
            }
            ,
            x(_),
            _[s] = "Generator",
            _[a] = function() {
                return this
            }
            ,
            _.toString = function() {
                return "[object Generator]"
            }
            ,
            t.keys = function(t) {
                var e = [];
                for (var r in t)
                    e.push(r);
                return e.reverse(),
                function r() {
                    for (; e.length; ) {
                        var n = e.pop();
                        if (n in t)
                            return r.value = n,
                            r.done = !1,
                            r
                    }
                    return r.done = !0,
                    r
                }
            }
            ,
            t.values = j,
            O.prototype = {
                constructor: O,
                reset: function(t) {
                    if (this.prev = 0,
                    this.next = 0,
                    this.sent = this._sent = e,
                    this.done = !1,
                    this.delegate = null,
                    this.method = "next",
                    this.arg = e,
                    this.tryEntries.forEach(E),
                    !t)
                        for (var r in this)
                            "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ("throw" === t.type)
                        throw t.arg;
                    return this.rval
                },
                dispatchException: function(t) {
                    if (this.done)
                        throw t;
                    var r = this;
                    function o(n, o) {
                        return s.type = "throw",
                        s.arg = t,
                        r.next = n,
                        o && (r.method = "next",
                        r.arg = e),
                        !!o
                    }
                    for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                        var i = this.tryEntries[a]
                          , s = i.completion;
                        if ("root" === i.tryLoc)
                            return o("end");
                        if (i.tryLoc <= this.prev) {
                            var c = n.call(i, "catchLoc")
                              , u = n.call(i, "finallyLoc");
                            if (c && u) {
                                if (this.prev < i.catchLoc)
                                    return o(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc)
                                    return o(i.finallyLoc)
                            } else if (c) {
                                if (this.prev < i.catchLoc)
                                    return o(i.catchLoc, !0)
                            } else {
                                if (!u)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc)
                                    return o(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var a = o;
                            break
                        }
                    }
                    a && ("break" === t || "continue" === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
                    var i = a ? a.completion : {};
                    return i.type = t,
                    i.arg = e,
                    a ? (this.method = "next",
                    this.next = a.finallyLoc,
                    d) : this.complete(i)
                },
                complete: function(t, e) {
                    if ("throw" === t.type)
                        throw t.arg;
                    return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg,
                    this.method = "return",
                    this.next = "end") : "normal" === t.type && e && (this.next = e),
                    d
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var r = this.tryEntries[e];
                        if (r.finallyLoc === t)
                            return this.complete(r.completion, r.afterLoc),
                            E(r),
                            d
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var r = this.tryEntries[e];
                        if (r.tryLoc === t) {
                            var n = r.completion;
                            if ("throw" === n.type) {
                                var o = n.arg;
                                E(r)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(t, r, n) {
                    return this.delegate = {
                        iterator: j(t),
                        resultName: r,
                        nextLoc: n
                    },
                    "next" === this.method && (this.arg = e),
                    d
                }
            },
            t
        }(t.exports);
        try {
            regeneratorRuntime = n
        } catch (o) {
            Function("r", "regeneratorRuntime = r")(n)
        }
    },
    lwAK: function(t, e, r) {
        "use strict";
        var n;
        e.__esModule = !0,
        e.AmpStateContext = void 0;
        const o = ((n = r("q1tI")) && n.__esModule ? n : {
            default: n
        }).default.createContext({});
        e.AmpStateContext = o
    },
    mxvI: function(t, e) {
        t.exports = function(t, e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) {
                var r = []
                  , n = !0
                  , o = !1
                  , a = void 0;
                try {
                    for (var i, s = t[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value),
                    !e || r.length !== e); n = !0)
                        ;
                } catch (c) {
                    o = !0,
                    a = c
                } finally {
                    try {
                        n || null == s.return || s.return()
                    } finally {
                        if (o)
                            throw a
                    }
                }
                return r
            }
        }
    },
    nOHt: function(t, e, r) {
        "use strict";
        function n(t, e) {
            var r;
            if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
                if (Array.isArray(t) || (r = function(t, e) {
                    if (!t)
                        return;
                    if ("string" === typeof t)
                        return o(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    "Object" === r && t.constructor && (r = t.constructor.name);
                    if ("Map" === r || "Set" === r)
                        return Array.from(t);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
                        return o(t, e)
                }(t)) || e && t && "number" === typeof t.length) {
                    r && (t = r);
                    var n = 0
                      , a = function() {};
                    return {
                        s: a,
                        n: function() {
                            return n >= t.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: t[n++]
                            }
                        },
                        e: function(t) {
                            throw t
                        },
                        f: a
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, s = !0, c = !1;
            return {
                s: function() {
                    r = t[Symbol.iterator]()
                },
                n: function() {
                    var t = r.next();
                    return s = t.done,
                    t
                },
                e: function(t) {
                    c = !0,
                    i = t
                },
                f: function() {
                    try {
                        s || null == r.return || r.return()
                    } finally {
                        if (c)
                            throw i
                    }
                }
            }
        }
        function o(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var r = 0, n = new Array(e); r < e; r++)
                n[r] = t[r];
            return n
        }
        var a = r("7KCV")
          , i = r("AroE");
        e.__esModule = !0,
        e.useRouter = function() {
            return s.default.useContext(u.RouterContext)
        }
        ,
        e.makePublicRouterInstance = function(t) {
            const e = t
              , r = {};
            var o, a = n(p);
            try {
                for (a.s(); !(o = a.n()).done; ) {
                    const t = o.value;
                    "object" !== typeof e[t] ? r[t] = e[t] : r[t] = Object.assign({}, e[t])
                }
            } catch (i) {
                a.e(i)
            } finally {
                a.f()
            }
            return r.events = c.default.events,
            f.forEach(t=>{
                r[t] = (...r)=>e[t](...r)
            }
            ),
            r
        }
        ,
        e.createRouter = e.withRouter = e.default = void 0;
        var s = i(r("q1tI"))
          , c = a(r("elyg"));
        e.Router = c.default,
        e.NextRouter = c.NextRouter;
        var u = r("qOIg")
          , l = i(r("0Bsm"));
        e.withRouter = l.default;
        const h = {
            router: null,
            readyCallbacks: [],
            ready(t) {
                if (this.router)
                    return t();
                this.readyCallbacks.push(t)
            }
        }
          , p = ["pathname", "route", "query", "asPath", "components", "isFallback", "basePath"]
          , f = ["push", "replace", "reload", "back", "prefetch", "beforePopState"];
        function d() {
            if (!h.router) {
                throw new Error('No router instance found.\nYou should only use "next/router" inside the client side of your app.\n')
            }
            return h.router
        }
        Object.defineProperty(h, "events", {
            get: ()=>c.default.events
        }),
        p.forEach(t=>{
            Object.defineProperty(h, t, {
                get: ()=>d()[t]
            })
        }
        ),
        f.forEach(t=>{
            h[t] = (...e)=>{
                return d()[t](...e)
            }
        }
        ),
        ["routeChangeStart", "beforeHistoryChange", "routeChangeComplete", "routeChangeError", "hashChangeStart", "hashChangeComplete"].forEach(t=>{
            h.ready(()=>{
                c.default.events.on(t, (...e)=>{
                    const r = "on".concat(t.charAt(0).toUpperCase()).concat(t.substring(1))
                      , n = h;
                    if (n[r])
                        try {
                            n[r](...e)
                        } catch (o) {
                            console.error("Error when running the Router event: ".concat(r)),
                            console.error("".concat(o.message, "\n").concat(o.stack))
                        }
                }
                )
            }
            )
        }
        );
        var m = h;
        e.default = m;
        e.createRouter = (...t)=>(h.router = new c.default(...t),
        h.readyCallbacks.forEach(t=>t()),
        h.readyCallbacks = [],
        h.router)
    },
    pSHO: function(t, e) {
        t.exports = function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
    },
    qOIg: function(t, e, r) {
        "use strict";
        var n;
        e.__esModule = !0,
        e.RouterContext = void 0;
        const o = ((n = r("q1tI")) && n.__esModule ? n : {
            default: n
        }).default.createContext(null);
        e.RouterContext = o
    },
    qVT1: function(t, e) {
        function r(t, e, r, n, o, a, i) {
            try {
                var s = t[a](i)
                  , c = s.value
            } catch (u) {
                return void r(u)
            }
            s.done ? e(c) : Promise.resolve(c).then(n, o)
        }
        t.exports = function(t) {
            return function() {
                var e = this
                  , n = arguments;
                return new Promise((function(o, a) {
                    var i = t.apply(e, n);
                    function s(t) {
                        r(i, o, a, s, c, "next", t)
                    }
                    function c(t) {
                        r(i, o, a, s, c, "throw", t)
                    }
                    s(void 0)
                }
                ))
            }
        }
    },
    s4NR: function(t, e, r) {
        "use strict";
        e.decode = e.parse = r("kd2E"),
        e.encode = e.stringify = r("4JlD")
    },
    vJKn: function(t, e, r) {
        t.exports = r("ls82")
    },
    zoAU: function(t, e, r) {
        var n = r("PqPU")
          , o = r("mxvI")
          , a = r("KckH")
          , i = r("pSHO");
        t.exports = function(t, e) {
            return n(t) || o(t, e) || a(t, e) || i()
        }
    }
}]);