(window.webpackJsonp = window.webpackJsonp || []).push([[39], {
    "1ccW": function(e, t) {
        function n() {
            return e.exports = n = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ,
            n.apply(this, arguments)
        }
        e.exports = n
    },
    BMP1: function(e, t, n) {
        "use strict";
        var r = n("7KCV")(n("IKlv"));
        window.next = r,
        (0,
        r.default)().catch(e=>{
            console.error("".concat(e.message, "\n").concat(e.stack))
        }
        )
    },
    DqTX: function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.default = function() {
            let e = null;
            return t=>{
                const n = e = Promise.resolve().then(()=>{
                    if (n !== e)
                        return;
                    e = null;
                    const r = {};
                    t.forEach(e=>{
                        const t = r[e.type] || [];
                        t.push(e),
                        r[e.type] = t
                    }
                    );
                    const a = r.title ? r.title[0] : null;
                    let i = "";
                    if (a) {
                        const e = a.props.children;
                        i = "string" === typeof e ? e : e.join("")
                    }
                    i !== document.title && (document.title = i),
                    ["meta", "base", "link", "style", "script"].forEach(e=>{
                        !function(e, t) {
                            const n = document.getElementsByTagName("head")[0]
                              , r = n.querySelector("meta[name=next-head-count]");
                            0;
                            const a = Number(r.content)
                              , i = [];
                            for (let o = 0, s = r.previousElementSibling; o < a; o++,
                            s = s.previousElementSibling)
                                s.tagName.toLowerCase() === e && i.push(s);
                            const c = t.map(o).filter(e=>{
                                for (let t = 0, n = i.length; t < n; t++) {
                                    if (i[t].isEqualNode(e))
                                        return i.splice(t, 1),
                                        !1
                                }
                                return !0
                            }
                            );
                            i.forEach(e=>e.parentNode.removeChild(e)),
                            c.forEach(e=>n.insertBefore(e, r)),
                            r.content = (a - i.length + c.length).toString()
                        }(e, r[e] || [])
                    }
                    )
                }
                )
            }
        }
        ;
        const r = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv"
        };
        function o({type: e, props: t}) {
            const n = document.createElement(e);
            for (const i in t) {
                if (!t.hasOwnProperty(i))
                    continue;
                if ("children" === i || "dangerouslySetInnerHTML" === i)
                    continue;
                if (void 0 === t[i])
                    continue;
                const e = r[i] || i.toLowerCase();
                n.setAttribute(e, t[i])
            }
            const o = t.children
              , a = t.dangerouslySetInnerHTML;
            return a ? n.innerHTML = a.__html || "" : o && (n.textContent = "string" === typeof o ? o : o.join("")),
            n
        }
    },
    IKlv: function(e, t, n) {
        "use strict";
        var r = n("vJKn")
          , o = n("qVT1")
          , a = n("7KCV")
          , i = n("AroE");
        t.__esModule = !0,
        t.render = V,
        t.renderError = K,
        t.default = t.emitter = t.router = t.version = void 0;
        var c = i(n("1ccW"))
          , s = (i(n("7KCV")),
        n("nOHt"))
          , u = n("s4NR")
          , l = i(n("q1tI"))
          , p = i(n("i8i4"))
          , d = n("FYa8")
          , f = i(n("dZ6Y"))
          , m = n("qOIg")
          , h = n("/jkW")
          , g = a(n("yLiY"))
          , v = n("g/15")
          , y = i(n("DqTX"))
          , _ = i(n("zmvN"))
          , E = i(n("bGXG"));
        "finally"in Promise.prototype || (Promise.prototype.finally = n("Z577"));
        const w = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
        window.__NEXT_DATA__ = w;
        t.version = "9.4.4";
        const S = w.props
          , T = w.err
          , b = w.page
          , x = w.query
          , P = w.buildId
          , R = w.assetPrefix
          , C = w.runtimeConfig
          , I = w.dynamicIds
          , N = w.isFallback
          , k = R || "";
        n.p = "".concat(k, "/_next/"),
        g.setConfig({
            serverRuntimeConfig: {},
            publicRuntimeConfig: C || {}
        });
        const M = (0,
        v.getURL)()
          , F = new _.default(P,k)
          , A = ([e,t])=>F.registerPage(e, t);
        window.__NEXT_P && window.__NEXT_P.map(e=>setTimeout(()=>A(e), 0)),
        window.__NEXT_P = [],
        window.__NEXT_P.push = A;
        const D = (0,
        y.default)()
          , L = document.getElementById("__next");
        let B, j, q, O, U, H;
        t.router = q;
        class X extends l.default.Component {
            componentDidCatch(e, t) {
                this.props.fn(e, t)
            }
            componentDidMount() {
                this.scrollToHash(),
                q.isSsr && (N || w.nextExport && ((0,
                h.isDynamicRoute)(q.pathname) || location.search) || S && S.__N_SSG && location.search) && q.replace(q.pathname + "?" + (0,
                u.stringify)((0,
                c.default)((0,
                c.default)({}, q.query), (0,
                u.parse)(location.search.substr(1)))), M, {
                    _h: 1,
                    shallow: !N
                })
            }
            componentDidUpdate() {
                this.scrollToHash()
            }
            scrollToHash() {
                let e = location.hash;
                if (e = e && e.substring(1),
                !e)
                    return;
                const t = document.getElementById(e);
                t && setTimeout(()=>t.scrollIntoView(), 0)
            }
            render() {
                return this.props.children
            }
        }
        const G = (0,
        f.default)();
        t.emitter = G;
        var Y = function() {
            var e = o(r.mark((function e({webpackHMR: n}={}) {
                var o, a, i, c, u;
                return r.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return e.next = 3,
                            F.loadPageScript("/_app");
                        case 3:
                            return o = e.sent,
                            a = o.page,
                            i = o.mod,
                            U = a,
                            i && i.reportWebVitals && (H = ({id: e, name: t, startTime: n, value: r, duration: o, entryType: a, entries: c})=>{
                                const s = "".concat(Date.now(), "-").concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12);
                                let u;
                                c && c.length && (u = c[0].startTime),
                                i.reportWebVitals({
                                    id: e || s,
                                    name: t,
                                    startTime: n || u,
                                    value: null == r ? o : r,
                                    label: "mark" === a || "measure" === a ? "custom" : "web-vital"
                                })
                            }
                            ),
                            c = T,
                            e.prev = 9,
                            e.next = 13,
                            F.loadPage(b);
                        case 13:
                            u = e.sent,
                            O = u.page,
                            e.next = 19;
                            break;
                        case 19:
                            e.next = 24;
                            break;
                        case 21:
                            e.prev = 21,
                            e.t0 = e.catch(9),
                            c = e.t0;
                        case 24:
                            if (!window.__NEXT_PRELOADREADY) {
                                e.next = 28;
                                break
                            }
                            return e.next = 28,
                            window.__NEXT_PRELOADREADY(I);
                        case 28:
                            return t.router = q = (0,
                            s.createRouter)(b, x, M, {
                                initialProps: S,
                                pageLoader: F,
                                App: U,
                                Component: O,
                                wrapApp: ee,
                                err: c,
                                isFallback: N,
                                subscription: ({Component: e, props: t, err: n},r)=>V({
                                    App: r,
                                    Component: e,
                                    props: t,
                                    err: n
                                })
                            }),
                            V({
                                App: U,
                                Component: O,
                                props: S,
                                err: c
                            }),
                            e.abrupt("return", G);
                        case 34:
                            e.next = 36;
                            break;
                        case 36:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[9, 21]])
            }
            )));
            return function() {
                return e.apply(this, arguments)
            }
        }();
        function V(e) {
            return W.apply(this, arguments)
        }
        function W() {
            return (W = o(r.mark((function e(t) {
                return r.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            if (!t.err) {
                                e.next = 4;
                                break
                            }
                            return e.next = 3,
                            K(t);
                        case 3:
                            return e.abrupt("return");
                        case 4:
                            return e.prev = 4,
                            e.next = 7,
                            te(t);
                        case 7:
                            e.next = 14;
                            break;
                        case 9:
                            return e.prev = 9,
                            e.t0 = e.catch(4),
                            e.next = 14,
                            K((0,
                            c.default)((0,
                            c.default)({}, t), {}, {
                                err: e.t0
                            }));
                        case 14:
                        case "end":
                            return e.stop()
                        }
                }
                ), e, null, [[4, 9]])
            }
            )))).apply(this, arguments)
        }
        function K(e) {
            const t = e.App
              , n = e.err;
            return console.error(n),
            F.loadPage("/_error").then(({page: r})=>{
                const o = ee(t)
                  , a = {
                    Component: r,
                    AppTree: o,
                    router: q,
                    ctx: {
                        err: n,
                        pathname: b,
                        query: x,
                        asPath: M,
                        AppTree: o
                    }
                };
                return Promise.resolve(e.props ? e.props : (0,
                v.loadGetInitialProps)(t, a)).then(t=>te((0,
                c.default)((0,
                c.default)({}, e), {}, {
                    err: n,
                    Component: r,
                    props: t
                })))
            }
            )
        }
        t.default = Y;
        let J = "function" === typeof p.default.hydrate;
        function $() {
            v.ST && (performance.mark("afterHydrate"),
            performance.measure("Next.js-before-hydration", "navigationStart", "beforeRender"),
            performance.measure("Next.js-hydration", "beforeRender", "afterHydrate"),
            H && performance.getEntriesByName("Next.js-hydration").forEach(H),
            z())
        }
        function Z() {
            if (!v.ST)
                return;
            performance.mark("afterRender");
            const e = performance.getEntriesByName("routeChange", "mark");
            e.length && (performance.measure("Next.js-route-change-to-render", e[0].name, "beforeRender"),
            performance.measure("Next.js-render", "beforeRender", "afterRender"),
            H && (performance.getEntriesByName("Next.js-render").forEach(H),
            performance.getEntriesByName("Next.js-route-change-to-render").forEach(H)),
            z(),
            ["Next.js-route-change-to-render", "Next.js-render"].forEach(e=>performance.clearMeasures(e)))
        }
        function z() {
            ["beforeRender", "afterHydrate", "afterRender", "routeChange"].forEach(e=>performance.clearMarks(e))
        }
        function Q({children: e}) {
            return l.default.createElement(X, {
                fn: e=>K({
                    App: U,
                    err: e
                }).catch(e=>console.error("Error rendering page: ", e))
            }, l.default.createElement(m.RouterContext.Provider, {
                value: (0,
                s.makePublicRouterInstance)(q)
            }, l.default.createElement(d.HeadManagerContext.Provider, {
                value: D
            }, e)))
        }
        const ee = e=>t=>{
            const n = (0,
            c.default)((0,
            c.default)({}, t), {}, {
                Component: O,
                err: T,
                router: q
            });
            return (l.default.createElement(Q, null, l.default.createElement(e, n)))
        }
        ;
        function te(e) {
            return ne.apply(this, arguments)
        }
        function ne() {
            return (ne = o(r.mark((function e({App: t, Component: n, props: o, err: a}) {
                var i, s, u;
                return r.wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            return n = n || B.Component,
                            o = o || B.props,
                            i = (0,
                            c.default)((0,
                            c.default)({}, o), {}, {
                                Component: n,
                                err: a,
                                router: q
                            }),
                            B = i,
                            u = new Promise((e,t)=>{
                                j && j(),
                                s = ()=>{
                                    j = null,
                                    e()
                                }
                                ,
                                j = ()=>{
                                    j = null,
                                    t()
                                }
                            }
                            ),
                            r = l.default.createElement(re, {
                                callback: s
                            }, l.default.createElement(Q, null, l.default.createElement(t, i))),
                            d = L,
                            v.ST && performance.mark("beforeRender"),
                            J ? (p.default.hydrate(r, d, $),
                            J = !1,
                            H && v.ST && (0,
                            E.default)(H)) : p.default.render(r, d, Z),
                            e.next = 9,
                            u;
                        case 9:
                        case "end":
                            return e.stop()
                        }
                    var r, d
                }
                ), e)
            }
            )))).apply(this, arguments)
        }
        function re({callback: e, children: t}) {
            return l.default.useLayoutEffect(()=>e(), [e]),
            t
        }
    },
    Z577: function(e, t) {
        Promise.prototype.finally = function(e) {
            if ("function" != typeof e)
                return this.then(e, e);
            var t = this.constructor || Promise;
            return this.then((function(n) {
                return t.resolve(e()).then((function() {
                    return n
                }
                ))
            }
            ), (function(n) {
                return t.resolve(e()).then((function() {
                    throw n
                }
                ))
            }
            ))
        }
    },
    bGXG: function(e, t, n) {
        "use strict";
        t.__esModule = !0,
        t.default = void 0;
        var r = n("w6Sm");
        t.default = e=>{
            (0,
            r.getCLS)(e),
            (0,
            r.getFID)(e),
            (0,
            r.getFCP)(e),
            (0,
            r.getLCP)(e),
            (0,
            r.getTTFB)(e)
        }
    },
    w6Sm: function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "getCLS", (function() {
            return m
        }
        )),
        n.d(t, "getFCP", (function() {
            return g
        }
        )),
        n.d(t, "getFID", (function() {
            return v
        }
        )),
        n.d(t, "getLCP", (function() {
            return _
        }
        )),
        n.d(t, "getTTFB", (function() {
            return E
        }
        ));
        var r, o, a = function() {
            return "".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
        }, i = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            return {
                name: e,
                value: t,
                delta: 0,
                entries: [],
                id: a(),
                isFinal: !1
            }
        }, c = function(e, t) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    var n = new PerformanceObserver((function(e) {
                        return e.getEntries().map(t)
                    }
                    ));
                    return n.observe({
                        type: e,
                        buffered: !0
                    }),
                    n
                }
            } catch (e) {}
        }, s = !1, u = !1, l = function(e) {
            s = !e.persisted
        }, p = function() {
            addEventListener("pagehide", l),
            addEventListener("unload", (function() {}
            ))
        }, d = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            u || (p(),
            u = !0),
            addEventListener("visibilitychange", (function(t) {
                var n = t.timeStamp;
                "hidden" === document.visibilityState && e({
                    timeStamp: n,
                    isUnloading: s
                })
            }
            ), {
                capture: !0,
                once: t
            })
        }, f = function(e, t, n, r) {
            var o;
            return function() {
                n && t.isFinal && n.disconnect(),
                t.value >= 0 && (r || t.isFinal || "hidden" === document.visibilityState) && (t.delta = t.value - (o || 0),
                (t.delta || t.isFinal || void 0 === o) && (e(t),
                o = t.value))
            }
        }, m = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , n = i("CLS", 0)
              , r = function(e) {
                e.hadRecentInput || (n.value += e.value,
                n.entries.push(e),
                a())
            }
              , o = c("layout-shift", r)
              , a = f(e, n, o, t);
            d((function(e) {
                var t = e.isUnloading;
                o && o.takeRecords().map(r),
                t && (n.isFinal = !0),
                a()
            }
            ))
        }, h = function() {
            return void 0 === r && (r = "hidden" === document.visibilityState ? 0 : 1 / 0,
            d((function(e) {
                var t = e.timeStamp;
                return r = t
            }
            ), !0)),
            {
                get timeStamp() {
                    return r
                }
            }
        }, g = function(e) {
            var t = i("FCP")
              , n = h()
              , r = c("paint", (function(e) {
                "first-contentful-paint" === e.name && e.startTime < n.timeStamp && (t.value = e.startTime,
                t.isFinal = !0,
                t.entries.push(e),
                o())
            }
            ))
              , o = f(e, t, r)
        }, v = function(e) {
            var t = i("FID")
              , n = h()
              , r = function(e) {
                e.startTime < n.timeStamp && (t.value = e.processingStart - e.startTime,
                t.entries.push(e),
                t.isFinal = !0,
                a())
            }
              , o = c("first-input", r)
              , a = f(e, t, o);
            d((function() {
                o && (o.takeRecords().map(r),
                o.disconnect())
            }
            ), !0),
            o || window.perfMetrics && window.perfMetrics.onFirstInputDelay && window.perfMetrics.onFirstInputDelay((function(e, r) {
                r.timeStamp < n.timeStamp && (t.value = e,
                t.isFinal = !0,
                t.entries = [{
                    entryType: "first-input",
                    name: r.type,
                    target: r.target,
                    cancelable: r.cancelable,
                    startTime: r.timeStamp,
                    processingStart: r.timeStamp + e
                }],
                a())
            }
            ))
        }, y = function() {
            return o || (o = new Promise((function(e) {
                return ["scroll", "keydown", "pointerdown"].map((function(t) {
                    addEventListener(t, e, {
                        once: !0,
                        passive: !0,
                        capture: !0
                    })
                }
                ))
            }
            ))),
            o
        }, _ = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , n = i("LCP")
              , r = h()
              , o = function(e) {
                var t = e.startTime;
                t < r.timeStamp ? (n.value = t,
                n.entries.push(e)) : n.isFinal = !0,
                s()
            }
              , a = c("largest-contentful-paint", o)
              , s = f(e, n, a, t)
              , u = function() {
                n.isFinal || (a && a.takeRecords().map(o),
                n.isFinal = !0,
                s())
            };
            y().then(u),
            d(u, !0)
        }, E = function(e) {
            var t, n = i("TTFB");
            t = function() {
                try {
                    var t = performance.getEntriesByType("navigation")[0] || function() {
                        var e = performance.timing
                          , t = {
                            entryType: "navigation",
                            startTime: 0
                        };
                        for (var n in e)
                            "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
                        return t
                    }();
                    n.value = n.delta = t.responseStart,
                    n.entries = [t],
                    n.isFinal = !0,
                    e(n)
                } catch (e) {}
            }
            ,
            "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t)
        }
    },
    yLiY: function(e, t, n) {
        "use strict";
        let r;
        t.__esModule = !0,
        t.setConfig = function(e) {
            r = e
        }
        ,
        t.default = void 0;
        t.default = ()=>r
    },
    zmvN: function(e, t, n) {
        "use strict";
        var r = n("AroE");
        t.__esModule = !0,
        t.default = void 0;
        var o = n("QmWs")
          , a = r(n("dZ6Y"))
          , i = n("/jkW")
          , c = n("gguc")
          , s = n("YTqd")
          , u = n("elyg");
        function l(e, t) {
            try {
                return document.createElement("link").relList.supports(e)
            } catch (n) {}
        }
        const p = l("preload") && !l("prefetch") ? "preload" : "prefetch";
        document.createElement("script");
        function d(e) {
            if ("/" !== e[0])
                throw new Error('Route name should start with a "/", got "'.concat(e, '"'));
            return "/" === (e = e.replace(/\/index$/, "/")) ? e : e.replace(/\/$/, "")
        }
        function f(e, t, n) {
            return new Promise((r,o,a)=>{
                (a = document.createElement("link")).crossOrigin = void 0,
                a.href = e,
                a.rel = t,
                n && (a.as = n),
                a.onload = r,
                a.onerror = o,
                document.head.appendChild(a)
            }
            )
        }
        t.default = class {
            constructor(e, t) {
                this.buildId = e,
                this.assetPrefix = t,
                this.pageCache = {},
                this.pageRegisterEvents = (0,
                a.default)(),
                this.loadingRoutes = {},
                this.promisedBuildManifest = new Promise(e=>{
                    window.__BUILD_MANIFEST ? e(window.__BUILD_MANIFEST) : window.__BUILD_MANIFEST_CB = ()=>{
                        e(window.__BUILD_MANIFEST)
                    }
                }
                ),
                this.promisedSsgManifest = new Promise(e=>{
                    window.__SSG_MANIFEST ? e(window.__SSG_MANIFEST) : window.__SSG_MANIFEST_CB = ()=>{
                        e(window.__SSG_MANIFEST)
                    }
                }
                )
            }
            getDependencies(e) {
                return this.promisedBuildManifest.then(t=>t[e] && t[e].map(e=>"".concat(this.assetPrefix, "/_next/").concat(encodeURI(e))) || [])
            }
            getDataHref(e, t) {
                const n = e=>(e = (0,
                u.delBasePath)(e),
                "".concat(this.assetPrefix, "/_next/data/").concat(this.buildId).concat("/" === e ? "/index" : e, ".json"))
                  , r = (0,
                o.parse)(e, !0)
                  , a = r.pathname
                  , l = r.query
                  , p = (0,
                o.parse)(t).pathname
                  , f = d(a);
                let m, h = (0,
                i.isDynamicRoute)(f);
                if (h) {
                    const e = (0,
                    s.getRouteRegex)(f)
                      , t = e.groups
                      , n = (0,
                    c.getRouteMatcher)(e)(p) || l;
                    m = f,
                    Object.keys(t).every(e=>{
                        let r = n[e];
                        const o = t[e].repeat;
                        return o && !Array.isArray(r) && (r = [r]),
                        e in n && (m = m.replace("[".concat(o ? "..." : "").concat(e, "]"), o ? r.map(encodeURIComponent).join("/") : encodeURIComponent(r)))
                    }
                    ) || (m = "")
                }
                return h ? m && n(m) : n(f)
            }
            prefetchData(e, t) {
                const n = d((0,
                o.parse)(e, !0).pathname);
                return this.promisedSsgManifest.then((r,o)=>r.has(n) && (o = this.getDataHref(e, t)) && !document.querySelector('link[rel="'.concat(p, '"][href^="').concat(o, '"]')) && f(o, p, "fetch"))
            }
            loadPage(e) {
                return this.loadPageScript(e)
            }
            loadPageScript(e) {
                return e = d(e),
                new Promise((t,n)=>{
                    const r = ({error: o, page: a, mod: i})=>{
                        this.pageRegisterEvents.off(e, r),
                        delete this.loadingRoutes[e],
                        o ? n(o) : t({
                            page: a,
                            mod: i
                        })
                    }
                      , o = this.pageCache[e];
                    if (o) {
                        const e = o.error
                          , r = o.page
                          , a = o.mod;
                        e ? n(e) : t({
                            page: r,
                            mod: a
                        })
                    } else
                        this.pageRegisterEvents.on(e, r),
                        document.querySelector('script[data-next-page="'.concat(e, '"]')) || this.loadingRoutes[e] || (this.loadingRoutes[e] = !0,
                        this.getDependencies(e).then(t=>{
                            t.forEach(t=>{
                                /\.js$/.test(t) && !document.querySelector('script[src^="'.concat(t, '"]')) && this.loadScript(t, e, !1),
                                /\.css$/.test(t) && !document.querySelector('link[rel=stylesheet][href^="'.concat(t, '"]')) && f(t, "stylesheet").catch(()=>{}
                                )
                            }
                            ),
                            this.loadRoute(e)
                        }
                        ))
                }
                )
            }
            loadRoute(e) {
                let t = "/" === (e = d(e)) ? "/index.js" : "".concat(e, ".js");
                const n = "".concat(this.assetPrefix, "/_next/static/").concat(encodeURIComponent(this.buildId), "/pages").concat(encodeURI(t));
                this.loadScript(n, e, !0)
            }
            loadScript(e, t, n) {
                const r = document.createElement("script");
                r.crossOrigin = void 0,
                r.src = e,
                r.onerror = ()=>{
                    const n = new Error("Error loading script ".concat(e));
                    n.code = "PAGE_LOAD_ERROR",
                    this.pageRegisterEvents.emit(t, {
                        error: n
                    })
                }
                ,
                document.body.appendChild(r)
            }
            registerPage(e, t) {
                (()=>{
                    try {
                        const n = t()
                          , r = {
                            page: n.default || n,
                            mod: n
                        };
                        this.pageCache[e] = r,
                        this.pageRegisterEvents.emit(e, r)
                    } catch (n) {
                        this.pageCache[e] = {
                            error: n
                        },
                        this.pageRegisterEvents.emit(e, {
                            error: n
                        })
                    }
                }
                )()
            }
            prefetch(e, t) {
                let n, r;
                if ((n = navigator.connection) && (n.saveData || /2g/.test(n.effectiveType)))
                    return Promise.resolve();
                if (t)
                    r = e;
                else {
                    e = d(e);
                    let t = "".concat("/" === e ? "/index" : e, ".js");
                    0,
                    r = "".concat(this.assetPrefix, "/_next/static/").concat(encodeURIComponent(this.buildId), "/pages").concat(encodeURI(t))
                }
                return Promise.all(document.querySelector('link[rel="'.concat(p, '"][href^="').concat(r, '"], script[data-next-page="').concat(e, '"]')) ? [] : [f(r, p, r.match(/\.css$/) ? "style" : "script"), !t && this.getDependencies(e).then(e=>Promise.all(e.map(e=>this.prefetch(e, !0))))]).then(()=>{}
                , ()=>{}
                )
            }
        }
    }
}, [["BMP1", 1, 2, 0]]]);
