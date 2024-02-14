(window.webpackJsonp = window.webpackJsonp || []).push([[11], {
    "/0U9": function(e, t, n) {
        e.exports = n("GEzw")
    },
    1: function(e, t, n) {
        n("74v/"),
        e.exports = n("nOHt")
    },
    "74v/": function(e, t, n) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function() {
            return n("cha2")
        }
        ])
    },
    GEzw: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
            function e(e, t) {
                for (var n, o = 0; o < t.length; o++)
                    (n = t[o]).enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
            }
            return function(t, n, o) {
                return n && e(t.prototype, n),
                o && e(t, o),
                t
            }
        }()
          , r = n("q1tI")
          , i = function(e) {
            if (e && e.__esModule)
                return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t.default = e,
            t
        }(n("SRHp"));
        function u(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function a(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function c(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function f() {
            return "localhost" === location.hostname
        }
        t.default = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
              , n = t.router;
            return function(t) {
                var l = function(l) {
                    function s() {
                        return u(this, s),
                        a(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments))
                    }
                    return c(s, l),
                    o(s, [{
                        key: "componentDidMount",
                        value: function() {
                            f() || !1 || (i.init(e),
                            i.pageview(),
                            n && n.events && "function" == typeof n.events.on && n.events.on("routeChangeComplete", (function() {
                                i.pageview()
                            }
                            )))
                        }
                    }, {
                        key: "render",
                        value: function() {
                            return (0,
                            r.createElement)(t, this.props)
                        }
                    }]),
                    s
                }(r.Component);
                return t.getInitialProps && (l.getInitialProps = t.getInitialProps),
                l
            }
        }
    },
    SKz9: function(e, t, n) {},
    SRHp: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.init = function(e) {
            u && !window.FB_INITIALIZED && e && i.default.init(e)
        }
        ,
        t.pageview = function() {
            i.default.pageView()
        }
        ,
        t.event = function e() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
              , n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            t && 0 === Object.keys(n).length && i.default.event(e, n)
        }
        ,
        t.exception = function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
              , t = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1];
            e && i.default.trackCustom("Error", {
                description: e,
                fatal: t
            })
        }
        ;
        var o, r = n("tseg"), i = (o = r) && o.__esModule ? o : {
            default: o
        };
        var u = "undefined" != typeof window
    },
    cha2: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n("wx14")
          , r = n("q1tI")
          , i = n.n(r)
          , u = n("nOHt")
          , a = n.n(u)
          , c = n("/0U9")
          , f = n.n(c)
          , l = n("8Kt/")
          , s = n.n(l)
          , p = n("vOnD")
          , d = n("LvDl")
          , h = n.n(d)
          , b = (n("SKz9"),
        n("uJZo"))
          , w = n("Kvkj")
          , v = i.a.createElement;
        const y = (e,t)=>{
            return "false" === (h.a.isArray(e[t]) ? h.a.last(e[t]) : e[t])
        }
        ;
        t.default = f()("1473695572815869", a.a)(({Component: e, pageProps: t})=>{
            const n = Object(r.useRef)(null)
              , a = Object(u.useRouter)()
              , c = y(a.query, "header")
              , f = y(a.query, "footer")
              , l = y(a.query, "cslink")
              , d = y(a.query, "headermenu")
              , h = a.pathname
              , g = "/" === h || "/home" === h || "/company" === h || "/career" === h;
            return Object(r.useEffect)(()=>{
                window.GA_INITIALIZED || (w.a.initGA(),
                window.GA_INITIALIZED = !0),
                w.a.logPageView()
            }
            , []),
            v(i.a.Fragment, null, v(s.a, null, v("title", null, "Fount - \ucc9c\ucc9c\ud788 \uae38\uac8c, \ubc14\ub978\ud22c\uc790 \ud30c\uc6b4\ud2b8"), v("link", {
                href: "/theme/fonts/index.css",
                rel: "stylesheet"
            }), v("meta", {
                property: "og:title",
                content: "Fount - \ucc9c\ucc9c\ud788 \uae38\uac8c, \ubc14\ub978\ud22c\uc790 \ud30c\uc6b4\ud2b8"
            })), v("main", null, v(p.a, {
                theme: b.a
            }, v(w.f, {
                ref: n
            }), !g && v(w.d, {
                whiteTheme: !1,
                hideHeader: c,
                hideHeaderMenu: d
            }), v(e, Object(o.a)({}, t, {
                hideHeader: c,
                hideFooter: f,
                hideCSLink: l
            })), !g && v(w.c, {
                showPopup: ()=>{
                    n.current && n.current.showPopup()
                }
                ,
                hideFooter: f
            }))))
        }
        )
    },
    tseg: function(e, t, n) {
        e.exports = function(e) {
            function t(o) {
                if (n[o])
                    return n[o].exports;
                var r = n[o] = {
                    i: o,
                    l: !1,
                    exports: {}
                };
                return e[o].call(r.exports, r, r.exports, t),
                r.l = !0,
                r.exports
            }
            var n = {};
            return t.m = e,
            t.c = n,
            t.i = function(e) {
                return e
            }
            ,
            t.d = function(e, n, o) {
                t.o(e, n) || Object.defineProperty(e, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: o
                })
            }
            ,
            t.n = function(e) {
                var n = e && e.__esModule ? function() {
                    return e.default
                }
                : function() {
                    return e
                }
                ;
                return t.d(n, "a", n),
                n
            }
            ,
            t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            ,
            t.p = "",
            t(t.s = 1)
        }([function(e, t, n) {
            "use strict";
            function o(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++)
                        n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = !1
              , i = !1
              , u = function() {
                return r || console.warn("Pixel not initialized before using call ReactPixel.init with required params"),
                r
            }
              , a = function() {
                for (var e, t = arguments.length, n = Array(t), r = 0; r < t; r++)
                    n[r] = arguments[r];
                (e = console).info.apply(e, o(["[react-facebook-pixel]"].concat(n)))
            }
              , c = {
                autoConfig: !0,
                debug: !1
            };
            t.default = {
                init: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c;
                    !function(e, t, n, o, r, i, u) {
                        e.fbq || (r = e.fbq = function() {
                            r.callMethod ? r.callMethod.apply(r, arguments) : r.queue.push(arguments)
                        }
                        ,
                        e._fbq || (e._fbq = r),
                        r.push = r,
                        r.loaded = !0,
                        r.version = "2.0",
                        r.queue = [],
                        (i = t.createElement(n)).async = !0,
                        i.src = "https://connect.facebook.net/en_US/fbevents.js",
                        (u = t.getElementsByTagName(n)[0]).parentNode.insertBefore(i, u))
                    }(window, document, "script"),
                    e ? (!1 === n.autoConfig && fbq("set", "autoConfig", !1, e),
                    fbq("init", e, t),
                    r = !0,
                    i = n.debug) : console.warn("Please insert pixel id for initializing")
                },
                pageView: function() {
                    u() && (fbq("track", "PageView"),
                    i && a("called fbq('track', 'PageView');"))
                },
                track: function(e, t) {
                    u() && (fbq("track", e, t),
                    i && (a("called fbq('track', '" + e + "');"),
                    t && a("with data", t)))
                },
                trackCustom: function(e, t) {
                    u() && (fbq("trackCustom", e, t),
                    i && (a("called fbq('trackCustom', '" + e + "');"),
                    t && a("with data", t)))
                },
                fbq: function(e) {
                    function t() {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function() {
                        return e.toString()
                    }
                    ,
                    t
                }((function() {
                    if (u()) {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                            t[n] = arguments[n];
                        fbq.apply(void 0, t),
                        i && (a("called fbq('" + t.slice(0, 2).join("', '") + "')"),
                        t[2] && a("with data", t[2]))
                    }
                }
                ))
            }
        }
        , function(e, t, n) {
            e.exports = n(0)
        }
        ])
    }
}, [[1, 1, 2, 3, 4, 0, 5]]]);
