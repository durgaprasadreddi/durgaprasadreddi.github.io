(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    "ct+p": function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, "HomeModule", function () {
          return Ti;
        });
      var s = i("tyNb"),
        a = i("R0Ic");
      const n = Object(a.f)(
          [
            Object(a.i)({
              opacity: "{{opacity}}",
              transform: "scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})",
            }),
            Object(a.e)(
              "{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)",
              Object(a.i)("*")
            ),
          ],
          {
            params: {
              duration: "200ms",
              delay: "0ms",
              opacity: "0",
              scale: "1",
              x: "0",
              y: "0",
              z: "0",
            },
          }
        ),
        r = [
          Object(a.k)("animate", [Object(a.j)("void => *", [Object(a.l)(n)])]),
          Object(a.k)("slideInLeft", [
            Object(a.h)(
              "void",
              Object(a.i)({ transform: "translateX(-100%)" })
            ),
            Object(a.h)("*", Object(a.i)({ transform: "translateX(0)" })),
            Object(a.j)("void => *", Object(a.e)("300ms")),
            Object(a.j)("* => void", Object(a.e)("300ms")),
          ]),
          Object(a.k)("slideInRight", [
            Object(a.h)("void", Object(a.i)({ transform: "translateX(100%)" })),
            Object(a.h)("*", Object(a.i)({ transform: "translateX(0)" })),
            Object(a.j)("void => *", Object(a.e)("300ms")),
            Object(a.j)("* => void", Object(a.e)("300ms")),
          ]),
          Object(a.k)("slideInTop", [
            Object(a.h)(
              "void",
              Object(a.i)({ transform: "translateY(-100%)" })
            ),
            Object(a.h)("*", Object(a.i)({ transform: "translateY(0)" })),
            Object(a.j)("void => *", Object(a.e)("700ms")),
            Object(a.j)("* => void", Object(a.e)("700ms")),
          ]),
          Object(a.k)("slideInBottom", [
            Object(a.h)("void", Object(a.i)({ transform: "translateY(100%)" })),
            Object(a.h)("*", Object(a.i)({ transform: "translateY(0)" })),
            Object(a.j)("void => *", Object(a.e)("700ms")),
            Object(a.j)("* => void", Object(a.e)("700ms")),
          ]),
        ];
      var o = i("HDdC"),
        l = i("quSY");
      class d extends l.a {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      class p extends d {
        constructor(e, t) {
          super(e, t),
            (this.scheduler = e),
            (this.work = t),
            (this.pending = !1);
        }
        schedule(e, t = 0) {
          if (this.closed) return this;
          this.state = e;
          const i = this.id,
            s = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(s, i, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id = this.id || this.requestAsyncId(s, this.id, t)),
            this
          );
        }
        requestAsyncId(e, t, i = 0) {
          return setInterval(e.flush.bind(e, this), i);
        }
        recycleAsyncId(e, t, i = 0) {
          if (null !== i && this.delay === i && !1 === this.pending) return t;
          clearInterval(t);
        }
        execute(e, t) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(e, t);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(e, t) {
          let i = !1,
            s = void 0;
          try {
            this.work(e);
          } catch (a) {
            (i = !0), (s = (!!a && a) || new Error(a));
          }
          if (i) return this.unsubscribe(), s;
        }
        _unsubscribe() {
          const e = this.id,
            t = this.scheduler,
            i = t.actions,
            s = i.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== s && i.splice(s, 1),
            null != e && (this.id = this.recycleAsyncId(t, e, null)),
            (this.delay = null);
        }
      }
      let h = (() => {
        class e {
          constructor(t, i = e.now) {
            (this.SchedulerAction = t), (this.now = i);
          }
          schedule(e, t = 0, i) {
            return new this.SchedulerAction(this, e).schedule(i, t);
          }
        }
        return (e.now = () => Date.now()), e;
      })();
      class c extends h {
        constructor(e, t = h.now) {
          super(e, () =>
            c.delegate && c.delegate !== this ? c.delegate.now() : t()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(e, t = 0, i) {
          return c.delegate && c.delegate !== this
            ? c.delegate.schedule(e, t, i)
            : super.schedule(e, t, i);
        }
        flush(e) {
          const { actions: t } = this;
          if (this.active) return void t.push(e);
          let i;
          this.active = !0;
          do {
            if ((i = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this.active = !1), i)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw i;
          }
        }
      }
      const u = new c(p);
      var g = i("DH7j");
      function f(e = 0, t = u) {
        var i;
        return (
          (i = e),
          (Object(g.a)(i) || !(i - parseFloat(i) + 1 >= 0) || e < 0) && (e = 0),
          (t && "function" == typeof t.schedule) || (t = u),
          new o.a(
            (i) => (
              i.add(t.schedule(m, e, { subscriber: i, counter: 0, period: e })),
              i
            )
          )
        );
      }
      function m(e) {
        const { subscriber: t, counter: i, period: s } = e;
        t.next(i),
          this.schedule({ subscriber: t, counter: i + 1, period: s }, s);
      }
      var b = i("fXoL"),
        w = i("ofXK"),
        v = i("XNiG"),
        x = i("2Vo4"),
        y = i("VRyK");
      i("LRne"), i("n6bG"), i("lJxs");
      var E = i("pLZG");
      i("7o/Q"), i("eIep");
      var S = i("l7GE"),
        T = i("ZUHj");
      function A(e) {
        return (t) => t.lift(new C(e));
      }
      class C {
        constructor(e) {
          this.notifier = e;
        }
        call(e, t) {
          const i = new O(e),
            s = Object(T.a)(i, this.notifier);
          return s && !i.seenValue ? (i.add(s), t.subscribe(i)) : i;
        }
      }
      class O extends S.a {
        constructor(e) {
          super(e), (this.seenValue = !1);
        }
        notifyNext(e, t, i, s, a) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      i("IzEk");
      var I = i("vkgz");
      const k = {
          provide: b.b,
          useFactory: function (e, t) {
            return () => {
              if (Object(w.o)(t)) {
                const t = Array.from(e.querySelectorAll(`[class*=${M}]`)),
                  i = /\bflex-layout-.+?\b/g;
                t.forEach((e) => {
                  e.classList.contains(M + "ssr") && e.parentNode
                    ? e.parentNode.removeChild(e)
                    : e.className.replace(i, "");
                });
              }
            };
          },
          deps: [w.c, b.B],
          multi: !0,
        },
        M = "flex-layout-";
      let L = (() => {
        class e {}
        return (
          (e.ɵmod = b.Fb({ type: e })),
          (e.ɵinj = b.Eb({
            factory: function (t) {
              return new (t || e)();
            },
            providers: [k],
          })),
          e
        );
      })();
      class P {
        constructor(e = !1, t = "all", i = "", s = "", a = 0) {
          (this.matches = e),
            (this.mediaQuery = t),
            (this.mqAlias = i),
            (this.suffix = s),
            (this.priority = a),
            (this.property = "");
        }
        clone() {
          return new P(
            this.matches,
            this.mediaQuery,
            this.mqAlias,
            this.suffix
          );
        }
      }
      let $ = (() => {
        class e {
          constructor() {
            this.stylesheet = new Map();
          }
          addStyleToElement(e, t, i) {
            const s = this.stylesheet.get(e);
            s ? s.set(t, i) : this.stylesheet.set(e, new Map([[t, i]]));
          }
          clearStyles() {
            this.stylesheet.clear();
          }
          getStyleForElement(e, t) {
            const i = this.stylesheet.get(e);
            let s = "";
            if (i) {
              const e = i.get(t);
              ("number" != typeof e && "string" != typeof e) || (s = e + "");
            }
            return s;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e();
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      const z = {
          addFlexToParent: !0,
          addOrientationBps: !1,
          disableDefaultBps: !1,
          disableVendorPrefixes: !1,
          serverLoaded: !1,
          useColumnBasisZero: !0,
          printWithBreakpoints: [],
          mediaTriggerAutoRestore: !0,
          ssrObserveBreakpoints: [],
        },
        D = new b.q("Flex Layout token, config options for the library", {
          providedIn: "root",
          factory: () => z,
        }),
        N = new b.q("FlexLayoutServerLoaded", {
          providedIn: "root",
          factory: () => !1,
        }),
        R = new b.q(
          "Flex Layout token, collect all breakpoints into one provider",
          { providedIn: "root", factory: () => null }
        );
      function B(e, t) {
        return (
          (e = e ? e.clone() : new P()),
          t &&
            ((e.mqAlias = t.alias),
            (e.mediaQuery = t.mediaQuery),
            (e.suffix = t.suffix),
            (e.priority = t.priority)),
          e
        );
      }
      const _ = ["row", "column", "row-reverse", "column-reverse"];
      function G(e) {
        if (e)
          switch (e.toLowerCase()) {
            case "reverse":
            case "wrap-reverse":
            case "reverse-wrap":
              e = "wrap-reverse";
              break;
            case "no":
            case "none":
            case "nowrap":
              e = "nowrap";
              break;
            default:
              e = "wrap";
          }
        return e;
      }
      let H = (() => {
        class e {
          constructor(e, t, i, s) {
            (this.elementRef = e),
              (this.styleBuilder = t),
              (this.styler = i),
              (this.marshal = s),
              (this.DIRECTIVE_KEY = ""),
              (this.inputs = []),
              (this.mru = {}),
              (this.destroySubject = new v.a()),
              (this.styleCache = new Map());
          }
          get parentElement() {
            return this.elementRef.nativeElement.parentElement;
          }
          get nativeElement() {
            return this.elementRef.nativeElement;
          }
          get activatedValue() {
            return this.marshal.getValue(
              this.nativeElement,
              this.DIRECTIVE_KEY
            );
          }
          set activatedValue(e) {
            this.marshal.setValue(
              this.nativeElement,
              this.DIRECTIVE_KEY,
              e,
              this.marshal.activatedAlias
            );
          }
          ngOnChanges(e) {
            Object.keys(e).forEach((t) => {
              if (-1 !== this.inputs.indexOf(t)) {
                const i = t.split(".").slice(1).join(".");
                this.setValue(e[t].currentValue, i);
              }
            });
          }
          ngOnDestroy() {
            this.destroySubject.next(),
              this.destroySubject.complete(),
              this.marshal.releaseElement(this.nativeElement);
          }
          init(e = []) {
            this.marshal.init(
              this.elementRef.nativeElement,
              this.DIRECTIVE_KEY,
              this.updateWithValue.bind(this),
              this.clearStyles.bind(this),
              e
            );
          }
          addStyles(e, t) {
            const i = this.styleBuilder,
              s = i.shouldCache;
            let a = this.styleCache.get(e);
            (a && s) ||
              ((a = i.buildStyles(e, t)), s && this.styleCache.set(e, a)),
              (this.mru = Object.assign({}, a)),
              this.applyStyleToElement(a),
              i.sideEffect(e, a, t);
          }
          clearStyles() {
            Object.keys(this.mru).forEach((e) => {
              this.mru[e] = "";
            }),
              this.applyStyleToElement(this.mru),
              (this.mru = {});
          }
          triggerUpdate() {
            this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
          }
          getFlexFlowDirection(e, t = !1) {
            if (e) {
              const [i, s] = this.styler.getFlowDirection(e);
              if (!s && t) {
                const t = (function (e) {
                  let [t, i, s] = (function (e) {
                    e = e ? e.toLowerCase() : "";
                    let [t, i, s] = e.split(" ");
                    return (
                      _.find((e) => e === t) || (t = _[0]),
                      "inline" === i &&
                        ((i = "inline" !== s ? s : ""), (s = "inline")),
                      [t, G(i), !!s]
                    );
                  })(e);
                  return (function (e, t = null, i = !1) {
                    return {
                      display: i ? "inline-flex" : "flex",
                      "box-sizing": "border-box",
                      "flex-direction": e,
                      "flex-wrap": t || null,
                    };
                  })(t, i, s);
                })(i);
                this.styler.applyStyleToElements(t, [e]);
              }
              return i.trim();
            }
            return "row";
          }
          hasWrap(e) {
            return this.styler.hasWrap(e);
          }
          applyStyleToElement(e, t, i = this.nativeElement) {
            this.styler.applyStyleToElement(i, e, t);
          }
          setValue(e, t) {
            this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, e, t);
          }
          updateWithValue(e) {
            this.currentValue !== e &&
              (this.addStyles(e), (this.currentValue = e));
          }
        }
        return (
          (e.ɵfac = function (e) {
            b.Rb();
          }),
          (e.ɵdir = b.Cb({ type: e, features: [b.vb] })),
          e
        );
      })();
      const j = [
          {
            alias: "xs",
            mediaQuery: "screen and (min-width: 0px) and (max-width: 599.9px)",
            priority: 1e3,
          },
          {
            alias: "sm",
            mediaQuery:
              "screen and (min-width: 600px) and (max-width: 959.9px)",
            priority: 900,
          },
          {
            alias: "md",
            mediaQuery:
              "screen and (min-width: 960px) and (max-width: 1279.9px)",
            priority: 800,
          },
          {
            alias: "lg",
            mediaQuery:
              "screen and (min-width: 1280px) and (max-width: 1919.9px)",
            priority: 700,
          },
          {
            alias: "xl",
            mediaQuery:
              "screen and (min-width: 1920px) and (max-width: 4999.9px)",
            priority: 600,
          },
          {
            alias: "lt-sm",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 599.9px)",
            priority: 950,
          },
          {
            alias: "lt-md",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 959.9px)",
            priority: 850,
          },
          {
            alias: "lt-lg",
            overlapping: !0,
            mediaQuery: "screen and (max-width: 1279.9px)",
            priority: 750,
          },
          {
            alias: "lt-xl",
            overlapping: !0,
            priority: 650,
            mediaQuery: "screen and (max-width: 1919.9px)",
          },
          {
            alias: "gt-xs",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 600px)",
            priority: -950,
          },
          {
            alias: "gt-sm",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 960px)",
            priority: -850,
          },
          {
            alias: "gt-md",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 1280px)",
            priority: -750,
          },
          {
            alias: "gt-lg",
            overlapping: !0,
            mediaQuery: "screen and (min-width: 1920px)",
            priority: -650,
          },
        ],
        F =
          "(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)",
        V =
          "(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)",
        Y = "(orientation: portrait) and (min-width: 840px)",
        X = "(orientation: landscape) and (min-width: 1280px)",
        K = {
          HANDSET:
            "(orientation: portrait) and (max-width: 599.9px), (orientation: landscape) and (max-width: 959.9px)",
          TABLET: `${F} , ${V}`,
          WEB: `${Y}, ${X} `,
          HANDSET_PORTRAIT: "(orientation: portrait) and (max-width: 599.9px)",
          TABLET_PORTRAIT: F + " ",
          WEB_PORTRAIT: "" + Y,
          HANDSET_LANDSCAPE:
            "(orientation: landscape) and (max-width: 959.9px)",
          TABLET_LANDSCAPE: "" + V,
          WEB_LANDSCAPE: "" + X,
        },
        W = [
          { alias: "handset", priority: 2e3, mediaQuery: K.HANDSET },
          {
            alias: "handset.landscape",
            priority: 2e3,
            mediaQuery: K.HANDSET_LANDSCAPE,
          },
          {
            alias: "handset.portrait",
            priority: 2e3,
            mediaQuery: K.HANDSET_PORTRAIT,
          },
          { alias: "tablet", priority: 2100, mediaQuery: K.TABLET },
          {
            alias: "tablet.landscape",
            priority: 2100,
            mediaQuery: K.TABLET_LANDSCAPE,
          },
          {
            alias: "tablet.portrait",
            priority: 2100,
            mediaQuery: K.TABLET_PORTRAIT,
          },
          { alias: "web", priority: 2200, mediaQuery: K.WEB, overlapping: !0 },
          {
            alias: "web.landscape",
            priority: 2200,
            mediaQuery: K.WEB_LANDSCAPE,
            overlapping: !0,
          },
          {
            alias: "web.portrait",
            priority: 2200,
            mediaQuery: K.WEB_PORTRAIT,
            overlapping: !0,
          },
        ],
        J = /(\.|-|_)/g;
      function q(e) {
        let t = e.length > 0 ? e.charAt(0) : "",
          i = e.length > 1 ? e.slice(1) : "";
        return t.toUpperCase() + i;
      }
      const Q = new b.q("Token (@angular/flex-layout) Breakpoints", {
        providedIn: "root",
        factory: () => {
          const e = Object(b.S)(R),
            t = Object(b.S)(D),
            i = [].concat.apply(
              [],
              (e || []).map((e) => (Array.isArray(e) ? e : [e]))
            );
          return (function (e, t = []) {
            const i = {};
            return (
              e.forEach((e) => {
                i[e.alias] = e;
              }),
              t.forEach((e) => {
                i[e.alias]
                  ? (function (e, ...t) {
                      if (null == e)
                        throw TypeError(
                          "Cannot convert undefined or null to object"
                        );
                      for (let i of t)
                        if (null != i)
                          for (let t in i) i.hasOwnProperty(t) && (e[t] = i[t]);
                    })(i[e.alias], e)
                  : (i[e.alias] = e);
              }),
              (s = Object.keys(i).map((e) => i[e])).forEach((e) => {
                e.suffix ||
                  ((e.suffix = e.alias
                    .replace(J, "|")
                    .split("|")
                    .map(q)
                    .join("")),
                  (e.overlapping = !!e.overlapping));
              }),
              s
            );
            var s;
          })(
            (t.disableDefaultBps ? [] : j).concat(t.addOrientationBps ? W : []),
            i
          );
        },
      });
      function U(e, t) {
        return ((t && t.priority) || 0) - ((e && e.priority) || 0);
      }
      function Z(e, t) {
        return (e.priority || 0) - (t.priority || 0);
      }
      let ee = (() => {
          class e {
            constructor(e) {
              (this.findByMap = new Map()), (this.items = [...e].sort(Z));
            }
            findByAlias(e) {
              return e ? this.findWithPredicate(e, (t) => t.alias == e) : null;
            }
            findByQuery(e) {
              return this.findWithPredicate(e, (t) => t.mediaQuery == e);
            }
            get overlappings() {
              return this.items.filter((e) => 1 == e.overlapping);
            }
            get aliases() {
              return this.items.map((e) => e.alias);
            }
            get suffixes() {
              return this.items.map((e) => (e.suffix ? e.suffix : ""));
            }
            findWithPredicate(e, t) {
              let i = this.findByMap.get(e);
              return (
                i ||
                  ((i = this.items.find(t) || null), this.findByMap.set(e, i)),
                i || null
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Ob(Q));
            }),
            (e.ɵprov = Object(b.Db)({
              factory: function () {
                return new e(Object(b.Ob)(Q));
              },
              token: e,
              providedIn: "root",
            })),
            e
          );
        })(),
        te = (() => {
          class e {
            constructor(e, t, i) {
              (this._zone = e),
                (this._platformId = t),
                (this._document = i),
                (this.source = new x.a(new P(!0))),
                (this.registry = new Map()),
                (this.pendingRemoveListenerFns = []),
                (this._observable$ = this.source.asObservable());
            }
            get activations() {
              const e = [];
              return (
                this.registry.forEach((t, i) => {
                  t.matches && e.push(i);
                }),
                e
              );
            }
            isActive(e) {
              const t = this.registry.get(e);
              return t
                ? t.matches
                : this.registerQuery(e).some((e) => e.matches);
            }
            observe(e, t = !1) {
              if (e && e.length) {
                const i = this._observable$.pipe(
                    Object(E.a)((i) => !t || e.indexOf(i.mediaQuery) > -1)
                  ),
                  s = new o.a((t) => {
                    const i = this.registerQuery(e);
                    if (i.length) {
                      const e = i.pop();
                      i.forEach((e) => {
                        t.next(e);
                      }),
                        this.source.next(e);
                    }
                    t.complete();
                  });
                return Object(y.a)(s, i);
              }
              return this._observable$;
            }
            registerQuery(e) {
              const t = Array.isArray(e) ? e : [e],
                i = [];
              return (
                (function (e, t) {
                  const i = e.filter((e) => !ie[e]);
                  if (i.length > 0) {
                    const e = i.join(", ");
                    try {
                      const s = t.createElement("style");
                      s.setAttribute("type", "text/css"),
                        s.styleSheet ||
                          s.appendChild(
                            t.createTextNode(
                              `\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${e} {.fx-query-test{ }}\n`
                            )
                          ),
                        t.head.appendChild(s),
                        i.forEach((e) => (ie[e] = s));
                    } catch (s) {
                      console.error(s);
                    }
                  }
                })(t, this._document),
                t.forEach((e) => {
                  const t = (t) => {
                    this._zone.run(() => this.source.next(new P(t.matches, e)));
                  };
                  let s = this.registry.get(e);
                  s ||
                    ((s = this.buildMQL(e)),
                    s.addListener(t),
                    this.pendingRemoveListenerFns.push(() =>
                      s.removeListener(t)
                    ),
                    this.registry.set(e, s)),
                    s.matches && i.push(new P(!0, e));
                }),
                i
              );
            }
            ngOnDestroy() {
              let e;
              for (; (e = this.pendingRemoveListenerFns.pop()); ) e();
            }
            buildMQL(e) {
              return (function (e, t) {
                return t && window.matchMedia("all").addListener
                  ? window.matchMedia(e)
                  : {
                      matches: "all" === e || "" === e,
                      media: e,
                      addListener: () => {},
                      removeListener: () => {},
                      onchange: null,
                      addEventListener() {},
                      removeEventListener() {},
                      dispatchEvent: () => !1,
                    };
              })(e, Object(w.o)(this._platformId));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Ob(b.z), b.Ob(b.B), b.Ob(w.c));
            }),
            (e.ɵprov = Object(b.Db)({
              factory: function () {
                return new e(
                  Object(b.Ob)(b.z),
                  Object(b.Ob)(b.B),
                  Object(b.Ob)(w.c)
                );
              },
              token: e,
              providedIn: "root",
            })),
            e
          );
        })();
      const ie = {},
        se = { alias: "print", mediaQuery: "print", priority: 1e3 };
      let ae = (() => {
        class e {
          constructor(e, t, i) {
            (this.breakpoints = e),
              (this.layoutConfig = t),
              (this._document = i),
              (this.registeredBeforeAfterPrintHooks = !1),
              (this.isPrintingBeforeAfterEvent = !1),
              (this.beforePrintEventListeners = []),
              (this.afterPrintEventListeners = []),
              (this.isPrinting = !1),
              (this.queue = new ne()),
              (this.deactivations = []);
          }
          withPrintQuery(e) {
            return [...e, "print"];
          }
          isPrintEvent(e) {
            return e.mediaQuery.startsWith("print");
          }
          get printAlias() {
            return this.layoutConfig.printWithBreakpoints || [];
          }
          get printBreakPoints() {
            return this.printAlias
              .map((e) => this.breakpoints.findByAlias(e))
              .filter((e) => null !== e);
          }
          getEventBreakpoints({ mediaQuery: e }) {
            const t = this.breakpoints.findByQuery(e);
            return (
              t ? [...this.printBreakPoints, t] : this.printBreakPoints
            ).sort(U);
          }
          updateEvent(e) {
            let t = this.breakpoints.findByQuery(e.mediaQuery);
            return (
              this.isPrintEvent(e) &&
                ((t = this.getEventBreakpoints(e)[0]),
                (e.mediaQuery = t ? t.mediaQuery : "")),
              B(e, t)
            );
          }
          registerBeforeAfterPrintHooks(e) {
            if (
              !this._document.defaultView ||
              this.registeredBeforeAfterPrintHooks
            )
              return;
            this.registeredBeforeAfterPrintHooks = !0;
            const t = () => {
                this.isPrinting ||
                  ((this.isPrintingBeforeAfterEvent = !0),
                  this.startPrinting(
                    e,
                    this.getEventBreakpoints(new P(!0, "print"))
                  ),
                  e.updateStyles());
              },
              i = () => {
                (this.isPrintingBeforeAfterEvent = !1),
                  this.isPrinting && (this.stopPrinting(e), e.updateStyles());
              };
            this._document.defaultView.addEventListener("beforeprint", t),
              this._document.defaultView.addEventListener("afterprint", i),
              this.beforePrintEventListeners.push(t),
              this.afterPrintEventListeners.push(i);
          }
          interceptEvents(e) {
            return (
              this.registerBeforeAfterPrintHooks(e),
              (t) => {
                this.isPrintEvent(t)
                  ? t.matches && !this.isPrinting
                    ? (this.startPrinting(e, this.getEventBreakpoints(t)),
                      e.updateStyles())
                    : t.matches ||
                      !this.isPrinting ||
                      this.isPrintingBeforeAfterEvent ||
                      (this.stopPrinting(e), e.updateStyles())
                  : this.collectActivations(t);
              }
            );
          }
          blockPropagation() {
            return (e) => !(this.isPrinting || this.isPrintEvent(e));
          }
          startPrinting(e, t) {
            (this.isPrinting = !0),
              (e.activatedBreakpoints = this.queue.addPrintBreakpoints(t));
          }
          stopPrinting(e) {
            (e.activatedBreakpoints = this.deactivations),
              (this.deactivations = []),
              this.queue.clear(),
              (this.isPrinting = !1);
          }
          collectActivations(e) {
            if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
              if (e.matches)
                this.isPrintingBeforeAfterEvent || (this.deactivations = []);
              else {
                const t = this.breakpoints.findByQuery(e.mediaQuery);
                t && (this.deactivations.push(t), this.deactivations.sort(U));
              }
          }
          ngOnDestroy() {
            this.beforePrintEventListeners.forEach((e) =>
              this._document.defaultView.removeEventListener("beforeprint", e)
            ),
              this.afterPrintEventListeners.forEach((e) =>
                this._document.defaultView.removeEventListener("afterprint", e)
              );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(b.Ob(ee), b.Ob(D), b.Ob(w.c));
          }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e(
                Object(b.Ob)(ee),
                Object(b.Ob)(D),
                Object(b.Ob)(w.c)
              );
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      class ne {
        constructor() {
          this.printBreakpoints = [];
        }
        addPrintBreakpoints(e) {
          return (
            e.push(se),
            e.sort(U),
            e.forEach((e) => this.addBreakpoint(e)),
            this.printBreakpoints
          );
        }
        addBreakpoint(e) {
          e &&
            void 0 ===
              this.printBreakpoints.find(
                (t) => t.mediaQuery === e.mediaQuery
              ) &&
            (this.printBreakpoints = (function (e) {
              return !!e && e.mediaQuery.startsWith("print");
            })(e)
              ? [e, ...this.printBreakpoints]
              : [...this.printBreakpoints, e]);
        }
        clear() {
          this.printBreakpoints = [];
        }
      }
      function re(e) {
        for (let t in e) {
          let i = e[t] || "";
          switch (t) {
            case "display":
              e.display =
                "flex" === i
                  ? ["-webkit-flex", "flex"]
                  : "inline-flex" === i
                  ? ["-webkit-inline-flex", "inline-flex"]
                  : i;
              break;
            case "align-items":
            case "align-self":
            case "align-content":
            case "flex":
            case "flex-basis":
            case "flex-flow":
            case "flex-grow":
            case "flex-shrink":
            case "flex-wrap":
            case "justify-content":
              e["-webkit-" + t] = i;
              break;
            case "flex-direction":
              (i = i || "row"),
                (e["-webkit-flex-direction"] = i),
                (e["flex-direction"] = i);
              break;
            case "order":
              e.order = e["-webkit-" + t] = isNaN(+i) ? "0" : i;
          }
        }
        return e;
      }
      let oe = (() => {
        class e {
          constructor(e, t, i, s) {
            (this._serverStylesheet = e),
              (this._serverModuleLoaded = t),
              (this._platformId = i),
              (this.layoutConfig = s);
          }
          applyStyleToElement(e, t, i = null) {
            let s = {};
            "string" == typeof t && ((s[t] = i), (t = s)),
              (s = this.layoutConfig.disableVendorPrefixes ? t : re(t)),
              this._applyMultiValueStyleToElement(s, e);
          }
          applyStyleToElements(e, t = []) {
            const i = this.layoutConfig.disableVendorPrefixes ? e : re(e);
            t.forEach((e) => {
              this._applyMultiValueStyleToElement(i, e);
            });
          }
          getFlowDirection(e) {
            let t = this.lookupStyle(e, "flex-direction");
            return [
              t || "row",
              this.lookupInlineStyle(e, "flex-direction") ||
              (Object(w.p)(this._platformId) && this._serverModuleLoaded)
                ? t
                : "",
            ];
          }
          hasWrap(e) {
            return "wrap" === this.lookupStyle(e, "flex-wrap");
          }
          lookupAttributeValue(e, t) {
            return e.getAttribute(t) || "";
          }
          lookupInlineStyle(e, t) {
            return Object(w.o)(this._platformId)
              ? e.style.getPropertyValue(t)
              : this._getServerStyle(e, t);
          }
          lookupStyle(e, t, i = !1) {
            let s = "";
            return (
              e &&
                ((s = this.lookupInlineStyle(e, t)) ||
                  (Object(w.o)(this._platformId)
                    ? i || (s = getComputedStyle(e).getPropertyValue(t))
                    : this._serverModuleLoaded &&
                      (s = this._serverStylesheet.getStyleForElement(e, t)))),
              s ? s.trim() : ""
            );
          }
          _applyMultiValueStyleToElement(e, t) {
            Object.keys(e)
              .sort()
              .forEach((i) => {
                const s = e[i],
                  a = Array.isArray(s) ? s : [s];
                a.sort();
                for (let e of a)
                  (e = e ? e + "" : ""),
                    Object(w.o)(this._platformId) || !this._serverModuleLoaded
                      ? Object(w.o)(this._platformId)
                        ? t.style.setProperty(i, e)
                        : this._setServerStyle(t, i, e)
                      : this._serverStylesheet.addStyleToElement(t, i, e);
              });
          }
          _setServerStyle(e, t, i) {
            t = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            const s = this._readStyleAttribute(e);
            (s[t] = i || ""), this._writeStyleAttribute(e, s);
          }
          _getServerStyle(e, t) {
            return this._readStyleAttribute(e)[t] || "";
          }
          _readStyleAttribute(e) {
            const t = {},
              i = e.getAttribute("style");
            if (i) {
              const e = i.split(/;+/g);
              for (let i = 0; i < e.length; i++) {
                const s = e[i].trim();
                if (s.length > 0) {
                  const e = s.indexOf(":");
                  if (-1 === e) throw new Error("Invalid CSS style: " + s);
                  t[s.substr(0, e).trim()] = s.substr(e + 1).trim();
                }
              }
            }
            return t;
          }
          _writeStyleAttribute(e, t) {
            let i = "";
            for (const s in t) t[s] && (i += s + ":" + t[s] + ";");
            e.setAttribute("style", i);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(b.Ob($), b.Ob(N), b.Ob(b.B), b.Ob(D));
          }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e(
                Object(b.Ob)($),
                Object(b.Ob)(N),
                Object(b.Ob)(b.B),
                Object(b.Ob)(D)
              );
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      class le {
        constructor() {
          this.shouldCache = !0;
        }
        sideEffect(e, t, i) {}
      }
      function de(e, t = "1", i = "1") {
        let s = [t, i, e],
          a = e.indexOf("calc");
        if (a > 0) {
          s[2] = pe(e.substring(a).trim());
          let t = e.substr(0, a).trim().split(" ");
          2 == t.length && ((s[0] = t[0]), (s[1] = t[1]));
        } else if (0 == a) s[2] = pe(e.trim());
        else {
          let a = e.split(" ");
          s = 3 === a.length ? a : [t, i, e];
        }
        return s;
      }
      function pe(e) {
        return e.replace(/[\s]/g, "").replace(/[\/\*\+\-]/g, " $& ");
      }
      let he = (() => {
        class e {
          constructor(e, t, i) {
            (this.matchMedia = e),
              (this.breakpoints = t),
              (this.hook = i),
              (this.activatedBreakpoints = []),
              (this.elementMap = new Map()),
              (this.elementKeyMap = new WeakMap()),
              (this.watcherMap = new WeakMap()),
              (this.updateMap = new WeakMap()),
              (this.clearMap = new WeakMap()),
              (this.subject = new v.a()),
              this.observeActivations();
          }
          get activatedAlias() {
            return this.activatedBreakpoints[0]
              ? this.activatedBreakpoints[0].alias
              : "";
          }
          onMediaChange(e) {
            const t = this.findByQuery(e.mediaQuery);
            t &&
              ((e = B(e, t)).matches &&
              -1 === this.activatedBreakpoints.indexOf(t)
                ? (this.activatedBreakpoints.push(t),
                  this.activatedBreakpoints.sort(U),
                  this.updateStyles())
                : e.matches ||
                  -1 === this.activatedBreakpoints.indexOf(t) ||
                  (this.activatedBreakpoints.splice(
                    this.activatedBreakpoints.indexOf(t),
                    1
                  ),
                  this.activatedBreakpoints.sort(U),
                  this.updateStyles()));
          }
          init(e, t, i, s, a = []) {
            ce(this.updateMap, e, t, i),
              ce(this.clearMap, e, t, s),
              this.buildElementKeyMap(e, t),
              this.watchExtraTriggers(e, t, a);
          }
          getValue(e, t, i) {
            const s = this.elementMap.get(e);
            if (s) {
              const e = void 0 !== i ? s.get(i) : this.getActivatedValues(s, t);
              if (e) return e.get(t);
            }
          }
          hasValue(e, t) {
            const i = this.elementMap.get(e);
            if (i) {
              const e = this.getActivatedValues(i, t);
              if (e) return void 0 !== e.get(t) || !1;
            }
            return !1;
          }
          setValue(e, t, i, s) {
            let a = this.elementMap.get(e);
            if (a) {
              const n = (a.get(s) || new Map()).set(t, i);
              a.set(s, n), this.elementMap.set(e, a);
            } else
              (a = new Map().set(s, new Map().set(t, i))),
                this.elementMap.set(e, a);
            const n = this.getValue(e, t);
            void 0 !== n && this.updateElement(e, t, n);
          }
          trackValue(e, t) {
            return this.subject
              .asObservable()
              .pipe(Object(E.a)((i) => i.element === e && i.key === t));
          }
          updateStyles() {
            this.elementMap.forEach((e, t) => {
              const i = new Set(this.elementKeyMap.get(t));
              let s = this.getActivatedValues(e);
              s &&
                s.forEach((e, s) => {
                  this.updateElement(t, s, e), i.delete(s);
                }),
                i.forEach((i) => {
                  if (((s = this.getActivatedValues(e, i)), s)) {
                    const e = s.get(i);
                    this.updateElement(t, i, e);
                  } else this.clearElement(t, i);
                });
            });
          }
          clearElement(e, t) {
            const i = this.clearMap.get(e);
            if (i) {
              const s = i.get(t);
              s && (s(), this.subject.next({ element: e, key: t, value: "" }));
            }
          }
          updateElement(e, t, i) {
            const s = this.updateMap.get(e);
            if (s) {
              const a = s.get(t);
              a && (a(i), this.subject.next({ element: e, key: t, value: i }));
            }
          }
          releaseElement(e) {
            const t = this.watcherMap.get(e);
            t && (t.forEach((e) => e.unsubscribe()), this.watcherMap.delete(e));
            const i = this.elementMap.get(e);
            i && (i.forEach((e, t) => i.delete(t)), this.elementMap.delete(e));
          }
          triggerUpdate(e, t) {
            const i = this.elementMap.get(e);
            if (i) {
              const s = this.getActivatedValues(i, t);
              s &&
                (t
                  ? this.updateElement(e, t, s.get(t))
                  : s.forEach((t, i) => this.updateElement(e, i, t)));
            }
          }
          buildElementKeyMap(e, t) {
            let i = this.elementKeyMap.get(e);
            i || ((i = new Set()), this.elementKeyMap.set(e, i)), i.add(t);
          }
          watchExtraTriggers(e, t, i) {
            if (i && i.length) {
              let s = this.watcherMap.get(e);
              if (
                (s || ((s = new Map()), this.watcherMap.set(e, s)), !s.get(t))
              ) {
                const a = Object(y.a)(...i).subscribe(() => {
                  const i = this.getValue(e, t);
                  this.updateElement(e, t, i);
                });
                s.set(t, a);
              }
            }
          }
          findByQuery(e) {
            return this.breakpoints.findByQuery(e);
          }
          getActivatedValues(e, t) {
            for (let s = 0; s < this.activatedBreakpoints.length; s++) {
              const i = e.get(this.activatedBreakpoints[s].alias);
              if (i && (void 0 === t || (i.has(t) && null != i.get(t))))
                return i;
            }
            const i = e.get("");
            return void 0 === t || (i && i.has(t)) ? i : void 0;
          }
          observeActivations() {
            const e = this.breakpoints.items.map((e) => e.mediaQuery);
            this.matchMedia
              .observe(this.hook.withPrintQuery(e))
              .pipe(
                Object(I.a)(this.hook.interceptEvents(this)),
                Object(E.a)(this.hook.blockPropagation())
              )
              .subscribe(this.onMediaChange.bind(this));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(b.Ob(te), b.Ob(ee), b.Ob(ae));
          }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e(
                Object(b.Ob)(te),
                Object(b.Ob)(ee),
                Object(b.Ob)(ae)
              );
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      function ce(e, t, i, s) {
        if (void 0 !== s) {
          let a = e.get(t);
          a || ((a = new Map()), e.set(t, a)), a.set(i, s);
        }
      }
      let ue = (() => {
        class e {}
        return (
          (e.ɵmod = b.Fb({ type: e })),
          (e.ɵinj = b.Eb({
            factory: function (t) {
              return new (t || e)();
            },
          })),
          e
        );
      })();
      const ge = ["row", "column", "row-reverse", "column-reverse"];
      function fe(e) {
        e = e ? e.toLowerCase() : "";
        let [t, i, s] = e.split(" ");
        return (
          ge.find((e) => e === t) || (t = ge[0]),
          "inline" === i && ((i = "inline" !== s ? s : ""), (s = "inline")),
          [t, be(i), !!s]
        );
      }
      function me(e) {
        let [t] = fe(e);
        return t.indexOf("row") > -1;
      }
      function be(e) {
        if (e)
          switch (e.toLowerCase()) {
            case "reverse":
            case "wrap-reverse":
            case "reverse-wrap":
              e = "wrap-reverse";
              break;
            case "no":
            case "none":
            case "nowrap":
              e = "nowrap";
              break;
            default:
              e = "wrap";
          }
        return e;
      }
      let we = (() => {
        class e extends le {
          buildStyles(e) {
            return (function (e) {
              let [t, i, s] = fe(e);
              return (function (e, t = null, i = !1) {
                return {
                  display: i ? "inline-flex" : "flex",
                  "box-sizing": "border-box",
                  "flex-direction": e,
                  "flex-wrap": t || null,
                };
              })(t, i, s);
            })(e);
          }
        }
        (e.ɵfac = function (i) {
          return t(i || e);
        }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e();
            },
            token: e,
            providedIn: "root",
          }));
        const t = b.Mb(e);
        return e;
      })();
      const ve = [
        "fxLayout",
        "fxLayout.xs",
        "fxLayout.sm",
        "fxLayout.md",
        "fxLayout.lg",
        "fxLayout.xl",
        "fxLayout.lt-sm",
        "fxLayout.lt-md",
        "fxLayout.lt-lg",
        "fxLayout.lt-xl",
        "fxLayout.gt-xs",
        "fxLayout.gt-sm",
        "fxLayout.gt-md",
        "fxLayout.gt-lg",
      ];
      let xe = (() => {
          class e extends H {
            constructor(e, t, i, s) {
              super(e, i, t, s),
                (this.DIRECTIVE_KEY = "layout"),
                (this.styleCache = Ee),
                this.init();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Hb(b.l), b.Hb(oe), b.Hb(we), b.Hb(he));
            }),
            (e.ɵdir = b.Cb({ type: e, features: [b.ub] })),
            e
          );
        })(),
        ye = (() => {
          class e extends xe {
            constructor() {
              super(...arguments), (this.inputs = ve);
            }
          }
          (e.ɵfac = function (i) {
            return t(i || e);
          }),
            (e.ɵdir = b.Cb({
              type: e,
              selectors: [
                ["", "fxLayout", ""],
                ["", "fxLayout.xs", ""],
                ["", "fxLayout.sm", ""],
                ["", "fxLayout.md", ""],
                ["", "fxLayout.lg", ""],
                ["", "fxLayout.xl", ""],
                ["", "fxLayout.lt-sm", ""],
                ["", "fxLayout.lt-md", ""],
                ["", "fxLayout.lt-lg", ""],
                ["", "fxLayout.lt-xl", ""],
                ["", "fxLayout.gt-xs", ""],
                ["", "fxLayout.gt-sm", ""],
                ["", "fxLayout.gt-md", ""],
                ["", "fxLayout.gt-lg", ""],
              ],
              inputs: {
                fxLayout: "fxLayout",
                "fxLayout.xs": "fxLayout.xs",
                "fxLayout.sm": "fxLayout.sm",
                "fxLayout.md": "fxLayout.md",
                "fxLayout.lg": "fxLayout.lg",
                "fxLayout.xl": "fxLayout.xl",
                "fxLayout.lt-sm": "fxLayout.lt-sm",
                "fxLayout.lt-md": "fxLayout.lt-md",
                "fxLayout.lt-lg": "fxLayout.lt-lg",
                "fxLayout.lt-xl": "fxLayout.lt-xl",
                "fxLayout.gt-xs": "fxLayout.gt-xs",
                "fxLayout.gt-sm": "fxLayout.gt-sm",
                "fxLayout.gt-md": "fxLayout.gt-md",
                "fxLayout.gt-lg": "fxLayout.gt-lg",
              },
              features: [b.ub],
            }));
          const t = b.Mb(e);
          return e;
        })();
      const Ee = new Map();
      function Se(e, ...t) {
        if (null == e)
          throw TypeError("Cannot convert undefined or null to object");
        for (let i of t)
          if (null != i) for (let t in i) i.hasOwnProperty(t) && (e[t] = i[t]);
        return e;
      }
      let Te = (() => {
        class e extends le {
          constructor(e) {
            super(), (this.layoutConfig = e);
          }
          buildStyles(e, t) {
            let [i, s, ...a] = e.split(" "),
              n = a.join(" ");
            const r = t.direction.indexOf("column") > -1 ? "column" : "row",
              o = me(r) ? "max-width" : "max-height",
              l = me(r) ? "min-width" : "min-height",
              d = String(n).indexOf("calc") > -1,
              p = d || "auto" === n,
              h = String(n).indexOf("%") > -1 && !d,
              c =
                String(n).indexOf("px") > -1 ||
                String(n).indexOf("rem") > -1 ||
                String(n).indexOf("em") > -1 ||
                String(n).indexOf("vw") > -1 ||
                String(n).indexOf("vh") > -1;
            let u = d || c;
            (i = "0" == i ? 0 : i), (s = "0" == s ? 0 : s);
            const g = !i && !s;
            let f = {};
            const m = {
              "max-width": null,
              "max-height": null,
              "min-width": null,
              "min-height": null,
            };
            switch (n || "") {
              case "":
                const e = !1 !== this.layoutConfig.useColumnBasisZero;
                n = "row" === r ? "0%" : e ? "0.000000001px" : "auto";
                break;
              case "initial":
              case "nogrow":
                (i = 0), (n = "auto");
                break;
              case "grow":
                n = "100%";
                break;
              case "noshrink":
                (s = 0), (n = "auto");
                break;
              case "auto":
                break;
              case "none":
                (i = 0), (s = 0), (n = "auto");
                break;
              default:
                u || h || isNaN(n) || (n += "%"),
                  "0%" === n && (u = !0),
                  "0px" === n && (n = "0%"),
                  (f = Se(
                    m,
                    d
                      ? {
                          "flex-grow": i,
                          "flex-shrink": s,
                          "flex-basis": u ? n : "100%",
                        }
                      : { flex: `${i} ${s} ${u ? n : "100%"}` }
                  ));
            }
            return (
              f.flex ||
                f["flex-grow"] ||
                (f = Se(
                  m,
                  d
                    ? { "flex-grow": i, "flex-shrink": s, "flex-basis": n }
                    : { flex: `${i} ${s} ${n}` }
                )),
              "0%" !== n &&
                "0px" !== n &&
                "0.000000001px" !== n &&
                "auto" !== n &&
                ((f[l] = g || (u && i) ? n : null),
                (f[o] = g || (!p && s) ? n : null)),
              f[l] || f[o]
                ? t.hasWrap &&
                  (f[d ? "flex-basis" : "flex"] = f[o]
                    ? d
                      ? f[o]
                      : `${i} ${s} ${f[o]}`
                    : d
                    ? f[l]
                    : `${i} ${s} ${f[l]}`)
                : (f = Se(
                    m,
                    d
                      ? { "flex-grow": i, "flex-shrink": s, "flex-basis": n }
                      : { flex: `${i} ${s} ${n}` }
                  )),
              Se(f, { "box-sizing": "border-box" })
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(b.Ob(D));
          }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e(Object(b.Ob)(D));
            },
            token: e,
            providedIn: "root",
          })),
          e
        );
      })();
      const Ae = [
        "fxFlex",
        "fxFlex.xs",
        "fxFlex.sm",
        "fxFlex.md",
        "fxFlex.lg",
        "fxFlex.xl",
        "fxFlex.lt-sm",
        "fxFlex.lt-md",
        "fxFlex.lt-lg",
        "fxFlex.lt-xl",
        "fxFlex.gt-xs",
        "fxFlex.gt-sm",
        "fxFlex.gt-md",
        "fxFlex.gt-lg",
      ];
      let Ce = (() => {
          class e extends H {
            constructor(e, t, i, s, a) {
              super(e, s, t, a),
                (this.layoutConfig = i),
                (this.marshal = a),
                (this.DIRECTIVE_KEY = "flex"),
                (this.direction = void 0),
                (this.wrap = void 0),
                (this.flexGrow = "1"),
                (this.flexShrink = "1"),
                this.init();
            }
            get shrink() {
              return this.flexShrink;
            }
            set shrink(e) {
              (this.flexShrink = e || "1"), this.triggerReflow();
            }
            get grow() {
              return this.flexGrow;
            }
            set grow(e) {
              (this.flexGrow = e || "1"), this.triggerReflow();
            }
            ngOnInit() {
              this.parentElement &&
                (this.marshal
                  .trackValue(this.parentElement, "layout")
                  .pipe(A(this.destroySubject))
                  .subscribe(this.onLayoutChange.bind(this)),
                this.marshal
                  .trackValue(this.nativeElement, "layout-align")
                  .pipe(A(this.destroySubject))
                  .subscribe(this.triggerReflow.bind(this)));
            }
            onLayoutChange(e) {
              const t = e.value.split(" ");
              (this.direction = t[0]),
                (this.wrap = void 0 !== t[1] && "wrap" === t[1]),
                this.triggerUpdate();
            }
            updateWithValue(e) {
              void 0 === this.direction &&
                (this.direction = this.getFlexFlowDirection(
                  this.parentElement,
                  !1 !== this.layoutConfig.addFlexToParent
                )),
                void 0 === this.wrap &&
                  (this.wrap = this.hasWrap(this.parentElement));
              const t = this.direction,
                i = t.startsWith("row"),
                s = this.wrap;
              i && s
                ? (this.styleCache = Me)
                : i && !s
                ? (this.styleCache = Ie)
                : !i && s
                ? (this.styleCache = Le)
                : i || s || (this.styleCache = ke);
              const a = de(
                String(e).replace(";", ""),
                this.flexGrow,
                this.flexShrink
              );
              this.addStyles(a.join(" "), { direction: t, hasWrap: s });
            }
            triggerReflow() {
              const e = this.activatedValue;
              if (void 0 !== e) {
                const t = de(e + "", this.flexGrow, this.flexShrink);
                this.marshal.updateElement(
                  this.nativeElement,
                  this.DIRECTIVE_KEY,
                  t.join(" ")
                );
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                b.Hb(b.l),
                b.Hb(oe),
                b.Hb(D),
                b.Hb(Te),
                b.Hb(he)
              );
            }),
            (e.ɵdir = b.Cb({
              type: e,
              inputs: {
                shrink: ["fxShrink", "shrink"],
                grow: ["fxGrow", "grow"],
              },
              features: [b.ub],
            })),
            e
          );
        })(),
        Oe = (() => {
          class e extends Ce {
            constructor() {
              super(...arguments), (this.inputs = Ae);
            }
          }
          (e.ɵfac = function (i) {
            return t(i || e);
          }),
            (e.ɵdir = b.Cb({
              type: e,
              selectors: [
                ["", "fxFlex", ""],
                ["", "fxFlex.xs", ""],
                ["", "fxFlex.sm", ""],
                ["", "fxFlex.md", ""],
                ["", "fxFlex.lg", ""],
                ["", "fxFlex.xl", ""],
                ["", "fxFlex.lt-sm", ""],
                ["", "fxFlex.lt-md", ""],
                ["", "fxFlex.lt-lg", ""],
                ["", "fxFlex.lt-xl", ""],
                ["", "fxFlex.gt-xs", ""],
                ["", "fxFlex.gt-sm", ""],
                ["", "fxFlex.gt-md", ""],
                ["", "fxFlex.gt-lg", ""],
              ],
              inputs: {
                fxFlex: "fxFlex",
                "fxFlex.xs": "fxFlex.xs",
                "fxFlex.sm": "fxFlex.sm",
                "fxFlex.md": "fxFlex.md",
                "fxFlex.lg": "fxFlex.lg",
                "fxFlex.xl": "fxFlex.xl",
                "fxFlex.lt-sm": "fxFlex.lt-sm",
                "fxFlex.lt-md": "fxFlex.lt-md",
                "fxFlex.lt-lg": "fxFlex.lt-lg",
                "fxFlex.lt-xl": "fxFlex.lt-xl",
                "fxFlex.gt-xs": "fxFlex.gt-xs",
                "fxFlex.gt-sm": "fxFlex.gt-sm",
                "fxFlex.gt-md": "fxFlex.gt-md",
                "fxFlex.gt-lg": "fxFlex.gt-lg",
              },
              features: [b.ub],
            }));
          const t = b.Mb(e);
          return e;
        })();
      const Ie = new Map(),
        ke = new Map(),
        Me = new Map(),
        Le = new Map();
      let Pe = (() => {
        class e extends le {
          buildStyles(e, t) {
            const i = {},
              [s, a] = e.split(" ");
            switch (s) {
              case "center":
                i["justify-content"] = "center";
                break;
              case "space-around":
                i["justify-content"] = "space-around";
                break;
              case "space-between":
                i["justify-content"] = "space-between";
                break;
              case "space-evenly":
                i["justify-content"] = "space-evenly";
                break;
              case "end":
              case "flex-end":
                i["justify-content"] = "flex-end";
                break;
              case "start":
              case "flex-start":
              default:
                i["justify-content"] = "flex-start";
            }
            switch (a) {
              case "start":
              case "flex-start":
                i["align-items"] = i["align-content"] = "flex-start";
                break;
              case "center":
                i["align-items"] = i["align-content"] = "center";
                break;
              case "end":
              case "flex-end":
                i["align-items"] = i["align-content"] = "flex-end";
                break;
              case "space-between":
                (i["align-content"] = "space-between"),
                  (i["align-items"] = "stretch");
                break;
              case "space-around":
                (i["align-content"] = "space-around"),
                  (i["align-items"] = "stretch");
                break;
              case "baseline":
                (i["align-content"] = "stretch"),
                  (i["align-items"] = "baseline");
                break;
              case "stretch":
              default:
                i["align-items"] = i["align-content"] = "stretch";
            }
            return Se(i, {
              display: t.inline ? "inline-flex" : "flex",
              "flex-direction": t.layout,
              "box-sizing": "border-box",
              "max-width":
                "stretch" === a ? (me(t.layout) ? null : "100%") : null,
              "max-height": "stretch" === a && me(t.layout) ? "100%" : null,
            });
          }
        }
        (e.ɵfac = function (i) {
          return t(i || e);
        }),
          (e.ɵprov = Object(b.Db)({
            factory: function () {
              return new e();
            },
            token: e,
            providedIn: "root",
          }));
        const t = b.Mb(e);
        return e;
      })();
      const $e = [
        "fxLayoutAlign",
        "fxLayoutAlign.xs",
        "fxLayoutAlign.sm",
        "fxLayoutAlign.md",
        "fxLayoutAlign.lg",
        "fxLayoutAlign.xl",
        "fxLayoutAlign.lt-sm",
        "fxLayoutAlign.lt-md",
        "fxLayoutAlign.lt-lg",
        "fxLayoutAlign.lt-xl",
        "fxLayoutAlign.gt-xs",
        "fxLayoutAlign.gt-sm",
        "fxLayoutAlign.gt-md",
        "fxLayoutAlign.gt-lg",
      ];
      let ze = (() => {
          class e extends H {
            constructor(e, t, i, s) {
              super(e, i, t, s),
                (this.DIRECTIVE_KEY = "layout-align"),
                (this.layout = "row"),
                (this.inline = !1),
                this.init(),
                this.marshal
                  .trackValue(this.nativeElement, "layout")
                  .pipe(A(this.destroySubject))
                  .subscribe(this.onLayoutChange.bind(this));
            }
            updateWithValue(e) {
              const t = this.layout || "row",
                i = this.inline;
              "row" === t && i
                ? (this.styleCache = Ge)
                : "row" !== t || i
                ? "row-reverse" === t && i
                  ? (this.styleCache = je)
                  : "row-reverse" !== t || i
                  ? "column" === t && i
                    ? (this.styleCache = He)
                    : "column" !== t || i
                    ? "column-reverse" === t && i
                      ? (this.styleCache = Fe)
                      : "column-reverse" !== t || i || (this.styleCache = _e)
                    : (this.styleCache = Re)
                  : (this.styleCache = Be)
                : (this.styleCache = Ne),
                this.addStyles(e, { layout: t, inline: i });
            }
            onLayoutChange(e) {
              const t = e.value.split(" ");
              (this.layout = t[0]),
                (this.inline = e.value.includes("inline")),
                ge.find((e) => e === this.layout) || (this.layout = "row"),
                this.triggerUpdate();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Hb(b.l), b.Hb(oe), b.Hb(Pe), b.Hb(he));
            }),
            (e.ɵdir = b.Cb({ type: e, features: [b.ub] })),
            e
          );
        })(),
        De = (() => {
          class e extends ze {
            constructor() {
              super(...arguments), (this.inputs = $e);
            }
          }
          (e.ɵfac = function (i) {
            return t(i || e);
          }),
            (e.ɵdir = b.Cb({
              type: e,
              selectors: [
                ["", "fxLayoutAlign", ""],
                ["", "fxLayoutAlign.xs", ""],
                ["", "fxLayoutAlign.sm", ""],
                ["", "fxLayoutAlign.md", ""],
                ["", "fxLayoutAlign.lg", ""],
                ["", "fxLayoutAlign.xl", ""],
                ["", "fxLayoutAlign.lt-sm", ""],
                ["", "fxLayoutAlign.lt-md", ""],
                ["", "fxLayoutAlign.lt-lg", ""],
                ["", "fxLayoutAlign.lt-xl", ""],
                ["", "fxLayoutAlign.gt-xs", ""],
                ["", "fxLayoutAlign.gt-sm", ""],
                ["", "fxLayoutAlign.gt-md", ""],
                ["", "fxLayoutAlign.gt-lg", ""],
              ],
              inputs: {
                fxLayoutAlign: "fxLayoutAlign",
                "fxLayoutAlign.xs": "fxLayoutAlign.xs",
                "fxLayoutAlign.sm": "fxLayoutAlign.sm",
                "fxLayoutAlign.md": "fxLayoutAlign.md",
                "fxLayoutAlign.lg": "fxLayoutAlign.lg",
                "fxLayoutAlign.xl": "fxLayoutAlign.xl",
                "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
                "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
                "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
                "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
                "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
                "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
                "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
                "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg",
              },
              features: [b.ub],
            }));
          const t = b.Mb(e);
          return e;
        })();
      const Ne = new Map(),
        Re = new Map(),
        Be = new Map(),
        _e = new Map(),
        Ge = new Map(),
        He = new Map(),
        je = new Map(),
        Fe = new Map();
      let Ve = (() => {
        class e {}
        return (
          (e.ɵmod = b.Fb({ type: e })),
          (e.ɵinj = b.Eb({
            factory: function (t) {
              return new (t || e)();
            },
            imports: [[L, ue]],
          })),
          e
        );
      })();
      const Ye = function () {
          return { duration: "2000ms", y: "300px" };
        },
        Xe = function (e) {
          return { value: "*", params: e };
        };
      function Ke(e, t) {
        if (1 & e) {
          const e = b.Lb();
          b.Kb(0, "div", 5),
            b.Sb("click", function () {
              return b.bc(e), b.Ub().goToBirthDay();
            }),
            b.Ib(1, "img", 6),
            b.Jb();
        }
        2 & e && b.Xb("@animate", b.Zb(2, Xe, b.Yb(1, Ye)));
      }
      const We = function () {
        return { duration: "2000ms", y: "-300px" };
      };
      function Je(e, t) {
        if (
          (1 & e &&
            (b.Kb(0, "div", 7),
            b.Kb(1, "div", 8),
            b.Kb(2, "div", 9),
            b.Kb(3, "div", 10),
            b.fc(4),
            b.Jb(),
            b.Kb(5, "div", 11),
            b.fc(6, " Days "),
            b.Jb(),
            b.Jb(),
            b.Kb(7, "div", 12),
            b.Kb(8, "div", 10),
            b.fc(9),
            b.Jb(),
            b.Kb(10, "div", 11),
            b.fc(11, " Hours "),
            b.Jb(),
            b.Jb(),
            b.Kb(12, "div", 13),
            b.Kb(13, "div", 10),
            b.fc(14),
            b.Jb(),
            b.Kb(15, "div", 14),
            b.fc(16, " Minutes "),
            b.Jb(),
            b.Jb(),
            b.Kb(17, "div", 15),
            b.Kb(18, "div", 10),
            b.fc(19),
            b.Jb(),
            b.Kb(20, "div", 11),
            b.fc(21, " Seconds "),
            b.Jb(),
            b.Jb(),
            b.Jb(),
            b.Jb()),
          2 & e)
        ) {
          const e = b.Ub();
          b.Xb("@animate", b.Zb(6, Xe, b.Yb(5, We))),
            b.xb(4),
            b.gc(" ", e.countdown.days, " "),
            b.xb(5),
            b.gc(" ", e.countdown.hours, " "),
            b.xb(5),
            b.gc(" ", e.countdown.minutes, " "),
            b.xb(5),
            b.gc(" ", e.countdown.seconds, " ");
        }
      }
      let qe = (() => {
          class e {
            constructor(e) {
              (this.router = e), (this.bday = "02-04-2023 23:45:00");
            }
            ngOnInit() {
              (this.showTimer = !1),
                Date.parse(new Date().toString()) - Date.parse(this.bday) > 0 &&
                  ((this.showTimer = !1), this.router.navigate(["/hbd"])),
                (this.countdown = {
                  days: 0,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                }),
                this.ToRemaining();
            }
            goToBirthDay() {
              (this.showTimer = !0),
                (this.countDownSubscription = f(1e3).subscribe(() =>
                  this.ToRemaining()
                ));
            }
            ToRemaining() {
              let e = Date.parse(this.bday) - Date.parse(new Date().toString());
              const t = Math.trunc(e / 864e5);
              e %= 864e5;
              const i = Math.trunc(e / 36e5);
              e %= 36e5;
              const s = Math.trunc(e / 6e4);
              e %= 6e4;
              const a = Math.trunc(e / 1e3);
              (this.countdown.days = t),
                (this.countdown.hours = i),
                (this.countdown.minutes = s),
                (this.countdown.seconds = a),
                t <= 0 &&
                  i <= 0 &&
                  s <= 0 &&
                  a <= 0 &&
                  this.router.navigate(["/hbd"]);
            }
            ngOnDestroy() {
              this.countDownSubscription &&
                this.countDownSubscription.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Hb(s.a));
            }),
            (e.ɵcmp = b.Bb({
              type: e,
              selectors: [["app-welcome"]],
              decls: 5,
              vars: 2,
              consts: [
                ["id", "welcome", "fxLayout", "column"],
                ["fxFlex", "", "fxLayout", "column"],
                [
                  "fxFlex",
                  "",
                  "fxLayout",
                  "column",
                  "fxLayoutAlign",
                  "center center",
                ],
                ["class", "hi-card", 3, "click", 4, "ngIf"],
                ["class", "timer-card", 4, "ngIf"],
                [1, "hi-card", 3, "click"],
                ["width", "100%", "src", "assets/images/welcom/hello.png"],
                [1, "timer-card"],
                [1, "countdown"],
                [1, "time", "days"],
                [1, "value"],
                [1, "title"],
                [1, "time", "hours"],
                [1, "time", "minutes"],
                [1, "+title"],
                [1, "time", "seconds"],
              ],
              template: function (e, t) {
                1 & e &&
                  (b.Kb(0, "div", 0),
                  b.Kb(1, "div", 1),
                  b.Kb(2, "div", 2),
                  b.ec(3, Ke, 2, 4, "div", 3),
                  b.ec(4, Je, 22, 8, "div", 4),
                  b.Jb(),
                  b.Jb(),
                  b.Jb()),
                  2 & e &&
                    (b.xb(3),
                    b.Xb("ngIf", !t.showTimer),
                    b.xb(1),
                    b.Xb("ngIf", t.showTimer));
              },
              directives: [ye, Oe, De, w.j],
              styles: [
                "#welcome{width:100%;background:url(/assets/images/backgrounds/welcome-bg.jpg) no-repeat;background-size:cover}#welcome .hi-card{width:250px;height:250px}#welcome .hi-card img{border-radius:60px 10px;cursor:pointer}#welcome .timer-card .countdown{display:flex;flex-direction:row;align-items:center;justify-content:center;text-align:center}#welcome .timer-card .countdown .time{display:flex;flex-direction:column;padding:0 12px;color:hsla(0,0%,83.9%,.91);font-weight:500}#welcome .timer-card .countdown .time .value{font-size:40px;line-height:34px;padding-bottom:8px}",
              ],
              encapsulation: 2,
              data: { animation: r },
            })),
            e
          );
        })(),
        Qe = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵcmp = b.Bb({
              type: e,
              selectors: [["app-home"]],
              decls: 3,
              vars: 0,
              consts: [["id", "main"]],
              template: function (e, t) {
                1 & e &&
                  (b.Kb(0, "div", 0),
                  b.Kb(1, "content"),
                  b.Ib(2, "router-outlet"),
                  b.Jb(),
                  b.Jb());
              },
              directives: [s.d],
              styles: [
                "app-home,app-home #main{display:flex;flex:1 1 auto;width:100%;height:100%}app-home #main{position:relative;flex-direction:column;z-index:1;min-width:0}",
              ],
              encapsulation: 2,
            })),
            e
          );
        })();
      function Ue(e, t) {
        1 & e &&
          (b.Kb(0, "div", 3),
          b.Kb(1, "span", 4),
          b.fc(2, "Happy Birth Day Raji Bangaram"),
          b.Jb(),
          b.Jb()),
          2 & e && b.Xb("@slideInRight", void 0);
      }
      let Ze = (() => {
        class e {
          constructor() {}
          ngOnInit() {
            (this.showTag = !0),
              (this.toggleSubscription = f(3e3).subscribe(
                () => (this.showTag = !this.showTag)
              ));
          }
          ngOnDestroy() {
            this.toggleSubscription && this.toggleSubscription.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵcmp = b.Bb({
            type: e,
            selectors: [["app-hbd"]],
            decls: 3,
            vars: 1,
            consts: [
              ["id", "hbd"],
              ["fxFlex", ""],
              ["routerLink", "/wish", "class", "wish float-right", 4, "ngIf"],
              ["routerLink", "/wish", 1, "wish", "float-right"],
              [
                "fxFlex",
                "",
                "fxLayout",
                "column",
                "fxLayoutAlign",
                "center center",
              ],
            ],
            template: function (e, t) {
              1 & e &&
                (b.Kb(0, "div", 0),
                b.Kb(1, "div", 1),
                b.ec(2, Ue, 3, 1, "div", 2),
                b.Jb(),
                b.Jb()),
                2 & e && (b.xb(2), b.Xb("ngIf", t.showTag));
            },
            directives: [Oe, w.j, s.b, ye, De],
            styles: [
              "#hbd[_ngcontent-%COMP%]{width:100%;background:url(/assets/images/backgrounds/hbdpr.png) no-repeat;background-size:cover}#hbd[_ngcontent-%COMP%]   .wish[_ngcontent-%COMP%]{width:300px;height:150px;cursor:pointer;background:url(/assets/images/ribbon.png) no-repeat;background-size:cover}#hbd[_ngcontent-%COMP%]   .wish[_ngcontent-%COMP%]:active, #hbd[_ngcontent-%COMP%]   .wish[_ngcontent-%COMP%]:focus{border:none;outline:none}#hbd[_ngcontent-%COMP%]   .wish[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff;font-style:italic}",
            ],
            data: { animation: r },
          })),
          e
        );
      })();
      function et(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function tt(e, t) {
        void 0 === e && (e = {}),
          void 0 === t && (t = {}),
          Object.keys(t).forEach(function (i) {
            void 0 === e[i]
              ? (e[i] = t[i])
              : et(t[i]) &&
                et(e[i]) &&
                Object.keys(t[i]).length > 0 &&
                tt(e[i], t[i]);
          });
      }
      var it = "undefined" != typeof document ? document : {},
        st = {
          body: {},
          addEventListener: function () {},
          removeEventListener: function () {},
          activeElement: { blur: function () {}, nodeName: "" },
          querySelector: function () {
            return null;
          },
          querySelectorAll: function () {
            return [];
          },
          getElementById: function () {
            return null;
          },
          createEvent: function () {
            return { initEvent: function () {} };
          },
          createElement: function () {
            return {
              children: [],
              childNodes: [],
              style: {},
              setAttribute: function () {},
              getElementsByTagName: function () {
                return [];
              },
            };
          },
          createElementNS: function () {
            return {};
          },
          importNode: function () {
            return null;
          },
          location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
          },
        };
      tt(it, st);
      var at = "undefined" != typeof window ? window : {};
      tt(at, {
        document: st,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: {
          replaceState: function () {},
          pushState: function () {},
          go: function () {},
          back: function () {},
        },
        CustomEvent: function () {
          return this;
        },
        addEventListener: function () {},
        removeEventListener: function () {},
        getComputedStyle: function () {
          return {
            getPropertyValue: function () {
              return "";
            },
          };
        },
        Image: function () {},
        Date: function () {},
        screen: {},
        setTimeout: function () {},
        clearTimeout: function () {},
        matchMedia: function () {
          return {};
        },
      });
      class nt {
        constructor(e) {
          const t = this;
          for (let i = 0; i < e.length; i += 1) t[i] = e[i];
          return (t.length = e.length), this;
        }
      }
      function rt(e, t) {
        const i = [];
        let s = 0;
        if (e && !t && e instanceof nt) return e;
        if (e)
          if ("string" == typeof e) {
            let a, n;
            const r = e.trim();
            if (r.indexOf("<") >= 0 && r.indexOf(">") >= 0) {
              let e = "div";
              for (
                0 === r.indexOf("<li") && (e = "ul"),
                  0 === r.indexOf("<tr") && (e = "tbody"),
                  (0 !== r.indexOf("<td") && 0 !== r.indexOf("<th")) ||
                    (e = "tr"),
                  0 === r.indexOf("<tbody") && (e = "table"),
                  0 === r.indexOf("<option") && (e = "select"),
                  n = it.createElement(e),
                  n.innerHTML = r,
                  s = 0;
                s < n.childNodes.length;
                s += 1
              )
                i.push(n.childNodes[s]);
            } else
              for (
                a =
                  t || "#" !== e[0] || e.match(/[ .<>:~]/)
                    ? (t || it).querySelectorAll(e.trim())
                    : [it.getElementById(e.trim().split("#")[1])],
                  s = 0;
                s < a.length;
                s += 1
              )
                a[s] && i.push(a[s]);
          } else if (e.nodeType || e === at || e === it) i.push(e);
          else if (e.length > 0 && e[0].nodeType)
            for (s = 0; s < e.length; s += 1) i.push(e[s]);
        return new nt(i);
      }
      function ot(e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
          -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
      }
      (rt.fn = nt.prototype),
        (rt.Class = nt),
        (rt.Dom7 = nt),
        "resize scroll".split(" ");
      const lt = {
        addClass: function (e) {
          if (void 0 === e) return this;
          const t = e.split(" ");
          for (let i = 0; i < t.length; i += 1)
            for (let e = 0; e < this.length; e += 1)
              void 0 !== this[e] &&
                void 0 !== this[e].classList &&
                this[e].classList.add(t[i]);
          return this;
        },
        removeClass: function (e) {
          const t = e.split(" ");
          for (let i = 0; i < t.length; i += 1)
            for (let e = 0; e < this.length; e += 1)
              void 0 !== this[e] &&
                void 0 !== this[e].classList &&
                this[e].classList.remove(t[i]);
          return this;
        },
        hasClass: function (e) {
          return !!this[0] && this[0].classList.contains(e);
        },
        toggleClass: function (e) {
          const t = e.split(" ");
          for (let i = 0; i < t.length; i += 1)
            for (let e = 0; e < this.length; e += 1)
              void 0 !== this[e] &&
                void 0 !== this[e].classList &&
                this[e].classList.toggle(t[i]);
          return this;
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let i = 0; i < this.length; i += 1)
            if (2 === arguments.length) this[i].setAttribute(e, t);
            else
              for (const t in e)
                (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        data: function (e, t) {
          let i;
          if (void 0 !== t) {
            for (let s = 0; s < this.length; s += 1)
              (i = this[s]),
                i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                (i.dom7ElementDataStorage[e] = t);
            return this;
          }
          if (((i = this[0]), i))
            return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage
              ? i.dom7ElementDataStorage[e]
              : i.getAttribute("data-" + e) || void 0;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) {
            const i = this[t].style;
            (i.webkitTransform = e), (i.transform = e);
          }
          return this;
        },
        transition: function (e) {
          "string" != typeof e && (e += "ms");
          for (let t = 0; t < this.length; t += 1) {
            const i = this[t].style;
            (i.webkitTransitionDuration = e), (i.transitionDuration = e);
          }
          return this;
        },
        on: function (...e) {
          let [t, i, s, a] = e;
          function n(e) {
            const t = e.target;
            if (!t) return;
            const a = e.target.dom7EventData || [];
            if ((a.indexOf(e) < 0 && a.unshift(e), rt(t).is(i))) s.apply(t, a);
            else {
              const e = rt(t).parents();
              for (let t = 0; t < e.length; t += 1)
                rt(e[t]).is(i) && s.apply(e[t], a);
            }
          }
          function r(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
          }
          "function" == typeof e[1] && (([t, s, a] = e), (i = void 0)),
            a || (a = !1);
          const o = t.split(" ");
          let l;
          for (let d = 0; d < this.length; d += 1) {
            const e = this[d];
            if (i)
              for (l = 0; l < o.length; l += 1) {
                const t = o[l];
                e.dom7LiveListeners || (e.dom7LiveListeners = {}),
                  e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []),
                  e.dom7LiveListeners[t].push({
                    listener: s,
                    proxyListener: n,
                  }),
                  e.addEventListener(t, n, a);
              }
            else
              for (l = 0; l < o.length; l += 1) {
                const t = o[l];
                e.dom7Listeners || (e.dom7Listeners = {}),
                  e.dom7Listeners[t] || (e.dom7Listeners[t] = []),
                  e.dom7Listeners[t].push({ listener: s, proxyListener: r }),
                  e.addEventListener(t, r, a);
              }
          }
          return this;
        },
        off: function (...e) {
          let [t, i, s, a] = e;
          "function" == typeof e[1] && (([t, s, a] = e), (i = void 0)),
            a || (a = !1);
          const n = t.split(" ");
          for (let r = 0; r < n.length; r += 1) {
            const e = n[r];
            for (let t = 0; t < this.length; t += 1) {
              const n = this[t];
              let r;
              if (
                (!i && n.dom7Listeners
                  ? (r = n.dom7Listeners[e])
                  : i && n.dom7LiveListeners && (r = n.dom7LiveListeners[e]),
                r && r.length)
              )
                for (let t = r.length - 1; t >= 0; t -= 1) {
                  const i = r[t];
                  (s && i.listener === s) ||
                  (s &&
                    i.listener &&
                    i.listener.dom7proxy &&
                    i.listener.dom7proxy === s)
                    ? (n.removeEventListener(e, i.proxyListener, a),
                      r.splice(t, 1))
                    : s ||
                      (n.removeEventListener(e, i.proxyListener, a),
                      r.splice(t, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...e) {
          const t = e[0].split(" "),
            i = e[1];
          for (let a = 0; a < t.length; a += 1) {
            const n = t[a];
            for (let t = 0; t < this.length; t += 1) {
              const a = this[t];
              let r;
              try {
                r = new at.CustomEvent(n, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
                });
              } catch (s) {
                (r = it.createEvent("Event")),
                  r.initEvent(n, !0, !0),
                  (r.detail = i);
              }
              (a.dom7EventData = e.filter((e, t) => t > 0)),
                a.dispatchEvent(r),
                (a.dom7EventData = []),
                delete a.dom7EventData;
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = ["webkitTransitionEnd", "transitionend"],
            i = this;
          let s;
          function a(n) {
            if (n.target === this)
              for (e.call(this, n), s = 0; s < t.length; s += 1) i.off(t[s], a);
          }
          if (e) for (s = 0; s < t.length; s += 1) i.on(t[s], a);
          return this;
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        offset: function () {
          if (this.length > 0) {
            const e = this[0],
              t = e.getBoundingClientRect(),
              i = it.body;
            return {
              top:
                t.top +
                (e === at ? at.scrollY : e.scrollTop) -
                (e.clientTop || i.clientTop || 0),
              left:
                t.left +
                (e === at ? at.scrollX : e.scrollLeft) -
                (e.clientLeft || i.clientLeft || 0),
            };
          }
          return null;
        },
        css: function (e, t) {
          let i;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (i = 0; i < this.length; i += 1)
                for (let t in e) this[i].style[t] = e[t];
              return this;
            }
            if (this[0])
              return at.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          if (!e) return this;
          for (let t = 0; t < this.length; t += 1)
            if (!1 === e.call(this[t], t, this[t])) return this;
          return this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = this[0];
          let i, s;
          if (!t || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (t.matches) return t.matches(e);
            if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
            if (t.msMatchesSelector) return t.msMatchesSelector(e);
            for (i = rt(e), s = 0; s < i.length; s += 1)
              if (i[s] === t) return !0;
            return !1;
          }
          if (e === it) return t === it;
          if (e === at) return t === at;
          if (e.nodeType || e instanceof nt) {
            for (i = e.nodeType ? [e] : e, s = 0; s < i.length; s += 1)
              if (i[s] === t) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          let i;
          return e > t - 1
            ? new nt([])
            : e < 0
            ? ((i = t + e), new nt(i < 0 ? [] : [this[i]]))
            : new nt([this[e]]);
        },
        append: function (...e) {
          let t;
          for (let i = 0; i < e.length; i += 1) {
            t = e[i];
            for (let e = 0; e < this.length; e += 1)
              if ("string" == typeof t) {
                const i = it.createElement("div");
                for (i.innerHTML = t; i.firstChild; )
                  this[e].appendChild(i.firstChild);
              } else if (t instanceof nt)
                for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
              else this[e].appendChild(t);
          }
          return this;
        },
        prepend: function (e) {
          let t, i;
          for (t = 0; t < this.length; t += 1)
            if ("string" == typeof e) {
              const s = it.createElement("div");
              for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1)
                this[t].insertBefore(s.childNodes[i], this[t].childNodes[0]);
            } else if (e instanceof nt)
              for (i = 0; i < e.length; i += 1)
                this[t].insertBefore(e[i], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                rt(this[0].nextElementSibling).is(e)
                ? new nt([this[0].nextElementSibling])
                : new nt([])
              : new nt(
                  this[0].nextElementSibling ? [this[0].nextElementSibling] : []
                )
            : new nt([]);
        },
        nextAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return new nt([]);
          for (; i.nextElementSibling; ) {
            const s = i.nextElementSibling;
            e ? rt(s).is(e) && t.push(s) : t.push(s), (i = s);
          }
          return new nt(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && rt(t.previousElementSibling).is(e)
                ? new nt([t.previousElementSibling])
                : new nt([])
              : new nt(
                  t.previousElementSibling ? [t.previousElementSibling] : []
                );
          }
          return new nt([]);
        },
        prevAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return new nt([]);
          for (; i.previousElementSibling; ) {
            const s = i.previousElementSibling;
            e ? rt(s).is(e) && t.push(s) : t.push(s), (i = s);
          }
          return new nt(t);
        },
        parent: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1)
            null !== this[i].parentNode &&
              (e
                ? rt(this[i].parentNode).is(e) && t.push(this[i].parentNode)
                : t.push(this[i].parentNode));
          return rt(ot(t));
        },
        parents: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            let s = this[i].parentNode;
            for (; s; )
              e ? rt(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
          }
          return rt(ot(t));
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? new nt([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const s = this[i].querySelectorAll(e);
            for (let e = 0; e < s.length; e += 1) t.push(s[e]);
          }
          return new nt(t);
        },
        children: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const s = this[i].childNodes;
            for (let i = 0; i < s.length; i += 1)
              e
                ? 1 === s[i].nodeType && rt(s[i]).is(e) && t.push(s[i])
                : 1 === s[i].nodeType && t.push(s[i]);
          }
          return new nt(ot(t));
        },
        filter: function (e) {
          const t = [],
            i = this;
          for (let s = 0; s < i.length; s += 1)
            e.call(i[s], s, i[s]) && t.push(i[s]);
          return new nt(t);
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
        add: function (...e) {
          const t = this;
          let i, s;
          for (i = 0; i < e.length; i += 1) {
            const a = rt(e[i]);
            for (s = 0; s < a.length; s += 1)
              (t[t.length] = a[s]), (t.length += 1);
          }
          return t;
        },
        styles: function () {
          return this[0] ? at.getComputedStyle(this[0], null) : {};
        },
      };
      Object.keys(lt).forEach((e) => {
        rt.fn[e] = rt.fn[e] || lt[e];
      });
      const dt = {
          deleteProps(e) {
            const t = e;
            Object.keys(t).forEach((e) => {
              try {
                t[e] = null;
              } catch (i) {}
              try {
                delete t[e];
              } catch (i) {}
            });
          },
          nextTick: (e, t = 0) => setTimeout(e, t),
          now: () => Date.now(),
          getTranslate(e, t = "x") {
            let i, s, a;
            const n = at.getComputedStyle(e, null);
            return (
              at.WebKitCSSMatrix
                ? ((s = n.transform || n.webkitTransform),
                  s.split(",").length > 6 &&
                    (s = s
                      .split(", ")
                      .map((e) => e.replace(",", "."))
                      .join(", ")),
                  (a = new at.WebKitCSSMatrix("none" === s ? "" : s)))
                : ((a =
                    n.MozTransform ||
                    n.OTransform ||
                    n.MsTransform ||
                    n.msTransform ||
                    n.transform ||
                    n
                      .getPropertyValue("transform")
                      .replace("translate(", "matrix(1, 0, 0, 1,")),
                  (i = a.toString().split(","))),
              "x" === t &&
                (s = at.WebKitCSSMatrix
                  ? a.m41
                  : 16 === i.length
                  ? parseFloat(i[12])
                  : parseFloat(i[4])),
              "y" === t &&
                (s = at.WebKitCSSMatrix
                  ? a.m42
                  : 16 === i.length
                  ? parseFloat(i[13])
                  : parseFloat(i[5])),
              s || 0
            );
          },
          parseUrlQuery(e) {
            const t = {};
            let i,
              s,
              a,
              n,
              r = e || at.location.href;
            if ("string" == typeof r && r.length)
              for (
                r = r.indexOf("?") > -1 ? r.replace(/\S*\?/, "") : "",
                  s = r.split("&").filter((e) => "" !== e),
                  n = s.length,
                  i = 0;
                i < n;
                i += 1
              )
                (a = s[i].replace(/#\S+/g, "").split("=")),
                  (t[decodeURIComponent(a[0])] =
                    void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
            return t;
          },
          isObject: (e) =>
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            e.constructor === Object,
          extend(...e) {
            const t = Object(e[0]);
            for (let i = 1; i < e.length; i += 1) {
              const s = e[i];
              if (null != s) {
                const e = Object.keys(Object(s));
                for (let i = 0, a = e.length; i < a; i += 1) {
                  const a = e[i],
                    n = Object.getOwnPropertyDescriptor(s, a);
                  void 0 !== n &&
                    n.enumerable &&
                    (dt.isObject(t[a]) && dt.isObject(s[a])
                      ? dt.extend(t[a], s[a])
                      : !dt.isObject(t[a]) && dt.isObject(s[a])
                      ? ((t[a] = {}), dt.extend(t[a], s[a]))
                      : (t[a] = s[a]));
                }
              }
            }
            return t;
          },
        },
        pt = {
          touch: !!(
            "ontouchstart" in at ||
            (at.DocumentTouch && it instanceof at.DocumentTouch)
          ),
          pointerEvents:
            !!at.PointerEvent &&
            "maxTouchPoints" in at.navigator &&
            at.navigator.maxTouchPoints >= 0,
          observer: "MutationObserver" in at || "WebkitMutationObserver" in at,
          passiveListener: (function () {
            let e = !1;
            try {
              const t = Object.defineProperty({}, "passive", {
                get() {
                  e = !0;
                },
              });
              at.addEventListener("testPassiveListener", null, t);
            } catch (t) {}
            return e;
          })(),
          gestures: "ongesturestart" in at,
        };
      class ht {
        constructor(e = {}) {
          const t = this;
          (t.params = e),
            (t.eventsListeners = {}),
            t.params &&
              t.params.on &&
              Object.keys(t.params.on).forEach((e) => {
                t.on(e, t.params.on[e]);
              });
        }
        on(e, t, i) {
          const s = this;
          if ("function" != typeof t) return s;
          const a = i ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              s.eventsListeners[e] || (s.eventsListeners[e] = []),
                s.eventsListeners[e][a](t);
            }),
            s
          );
        }
        once(e, t, i) {
          const s = this;
          if ("function" != typeof t) return s;
          function a(...i) {
            s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i);
          }
          return (a.f7proxy = t), s.on(e, a, i);
        }
        off(e, t) {
          const i = this;
          return i.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (i.eventsListeners[e] = [])
                  : i.eventsListeners[e] &&
                    i.eventsListeners[e].length &&
                    i.eventsListeners[e].forEach((s, a) => {
                      (s === t || (s.f7proxy && s.f7proxy === t)) &&
                        i.eventsListeners[e].splice(a, 1);
                    });
              }),
              i)
            : i;
        }
        emit(...e) {
          const t = this;
          if (!t.eventsListeners) return t;
          let i, s, a;
          return (
            "string" == typeof e[0] || Array.isArray(e[0])
              ? ((i = e[0]), (s = e.slice(1, e.length)), (a = t))
              : ((i = e[0].events), (s = e[0].data), (a = e[0].context || t)),
            (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
              if (t.eventsListeners && t.eventsListeners[e]) {
                const i = [];
                t.eventsListeners[e].forEach((e) => {
                  i.push(e);
                }),
                  i.forEach((e) => {
                    e.apply(a, s);
                  });
              }
            }),
            t
          );
        }
        useModulesParams(e) {
          const t = this;
          t.modules &&
            Object.keys(t.modules).forEach((i) => {
              const s = t.modules[i];
              s.params && dt.extend(e, s.params);
            });
        }
        useModules(e = {}) {
          const t = this;
          t.modules &&
            Object.keys(t.modules).forEach((i) => {
              const s = t.modules[i],
                a = e[i] || {};
              s.instance &&
                Object.keys(s.instance).forEach((e) => {
                  const i = s.instance[e];
                  t[e] = "function" == typeof i ? i.bind(t) : i;
                }),
                s.on &&
                  t.on &&
                  Object.keys(s.on).forEach((e) => {
                    t.on(e, s.on[e]);
                  }),
                s.create && s.create.bind(t)(a);
            });
        }
        static set components(e) {
          this.use && this.use(e);
        }
        static installModule(e, ...t) {
          const i = this;
          i.prototype.modules || (i.prototype.modules = {});
          const s =
            e.name || `${Object.keys(i.prototype.modules).length}_${dt.now()}`;
          return (
            (i.prototype.modules[s] = e),
            e.proto &&
              Object.keys(e.proto).forEach((t) => {
                i.prototype[t] = e.proto[t];
              }),
            e.static &&
              Object.keys(e.static).forEach((t) => {
                i[t] = e.static[t];
              }),
            e.install && e.install.apply(i, t),
            i
          );
        }
        static use(e, ...t) {
          const i = this;
          return Array.isArray(e)
            ? (e.forEach((e) => i.installModule(e)), i)
            : i.installModule(e, ...t);
        }
      }
      var ct = {
          updateSize: function () {
            let e, t;
            const i = this.$el;
            (e =
              void 0 !== this.params.width
                ? this.params.width
                : i[0].clientWidth),
              (t =
                void 0 !== this.params.height
                  ? this.params.height
                  : i[0].clientHeight),
              (0 === e && this.isHorizontal()) ||
                (0 === t && this.isVertical()) ||
                ((e =
                  e -
                  parseInt(i.css("padding-left"), 10) -
                  parseInt(i.css("padding-right"), 10)),
                (t =
                  t -
                  parseInt(i.css("padding-top"), 10) -
                  parseInt(i.css("padding-bottom"), 10)),
                dt.extend(this, {
                  width: e,
                  height: t,
                  size: this.isHorizontal() ? e : t,
                }));
          },
          updateSlides: function () {
            const e = this,
              t = e.params,
              { $wrapperEl: i, size: s, rtlTranslate: a, wrongRTL: n } = e,
              r = e.virtual && t.virtual.enabled,
              o = r ? e.virtual.slides.length : e.slides.length,
              l = i.children("." + e.params.slideClass),
              d = r ? e.virtual.slides.length : l.length;
            let p = [];
            const h = [],
              c = [];
            function u(e) {
              return !t.cssMode || e !== l.length - 1;
            }
            let g = t.slidesOffsetBefore;
            "function" == typeof g && (g = t.slidesOffsetBefore.call(e));
            let f = t.slidesOffsetAfter;
            "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
            const m = e.snapGrid.length,
              b = e.snapGrid.length;
            let w,
              v,
              x = t.spaceBetween,
              y = -g,
              E = 0,
              S = 0;
            if (void 0 === s) return;
            "string" == typeof x &&
              x.indexOf("%") >= 0 &&
              (x = (parseFloat(x.replace("%", "")) / 100) * s),
              (e.virtualSize = -x),
              l.css(
                a
                  ? { marginLeft: "", marginTop: "" }
                  : { marginRight: "", marginBottom: "" }
              ),
              t.slidesPerColumn > 1 &&
                ((w =
                  Math.floor(d / t.slidesPerColumn) ===
                  d / e.params.slidesPerColumn
                    ? d
                    : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn),
                "auto" !== t.slidesPerView &&
                  "row" === t.slidesPerColumnFill &&
                  (w = Math.max(w, t.slidesPerView * t.slidesPerColumn)));
            const T = t.slidesPerColumn,
              A = w / T,
              C = Math.floor(d / t.slidesPerColumn);
            for (let I = 0; I < d; I += 1) {
              v = 0;
              const i = l.eq(I);
              if (t.slidesPerColumn > 1) {
                let s, a, n;
                if ("row" === t.slidesPerColumnFill && t.slidesPerGroup > 1) {
                  const e = Math.floor(
                      I / (t.slidesPerGroup * t.slidesPerColumn)
                    ),
                    r = I - t.slidesPerColumn * t.slidesPerGroup * e,
                    o =
                      0 === e
                        ? t.slidesPerGroup
                        : Math.min(
                            Math.ceil((d - e * T * t.slidesPerGroup) / T),
                            t.slidesPerGroup
                          );
                  (n = Math.floor(r / o)),
                    (a = r - n * o + e * t.slidesPerGroup),
                    (s = a + (n * w) / T),
                    i.css({
                      "-webkit-box-ordinal-group": s,
                      "-moz-box-ordinal-group": s,
                      "-ms-flex-order": s,
                      "-webkit-order": s,
                      order: s,
                    });
                } else
                  "column" === t.slidesPerColumnFill
                    ? ((a = Math.floor(I / T)),
                      (n = I - a * T),
                      (a > C || (a === C && n === T - 1)) &&
                        ((n += 1), n >= T && ((n = 0), (a += 1))))
                    : ((n = Math.floor(I / A)), (a = I - n * A));
                i.css(
                  "margin-" + (e.isHorizontal() ? "top" : "left"),
                  0 !== n && t.spaceBetween && t.spaceBetween + "px"
                );
              }
              if ("none" !== i.css("display")) {
                if ("auto" === t.slidesPerView) {
                  const s = at.getComputedStyle(i[0], null),
                    a = i[0].style.transform,
                    n = i[0].style.webkitTransform;
                  if (
                    (a && (i[0].style.transform = "none"),
                    n && (i[0].style.webkitTransform = "none"),
                    t.roundLengths)
                  )
                    v = e.isHorizontal() ? i.outerWidth(!0) : i.outerHeight(!0);
                  else if (e.isHorizontal()) {
                    const e = parseFloat(s.getPropertyValue("width")),
                      t = parseFloat(s.getPropertyValue("padding-left")),
                      i = parseFloat(s.getPropertyValue("padding-right")),
                      a = parseFloat(s.getPropertyValue("margin-left")),
                      n = parseFloat(s.getPropertyValue("margin-right")),
                      r = s.getPropertyValue("box-sizing");
                    v = r && "border-box" === r ? e + a + n : e + t + i + a + n;
                  } else {
                    const e = parseFloat(s.getPropertyValue("height")),
                      t = parseFloat(s.getPropertyValue("padding-top")),
                      i = parseFloat(s.getPropertyValue("padding-bottom")),
                      a = parseFloat(s.getPropertyValue("margin-top")),
                      n = parseFloat(s.getPropertyValue("margin-bottom")),
                      r = s.getPropertyValue("box-sizing");
                    v = r && "border-box" === r ? e + a + n : e + t + i + a + n;
                  }
                  a && (i[0].style.transform = a),
                    n && (i[0].style.webkitTransform = n),
                    t.roundLengths && (v = Math.floor(v));
                } else
                  (v = (s - (t.slidesPerView - 1) * x) / t.slidesPerView),
                    t.roundLengths && (v = Math.floor(v)),
                    l[I] &&
                      (e.isHorizontal()
                        ? (l[I].style.width = v + "px")
                        : (l[I].style.height = v + "px"));
                l[I] && (l[I].swiperSlideSize = v),
                  c.push(v),
                  t.centeredSlides
                    ? ((y = y + v / 2 + E / 2 + x),
                      0 === E && 0 !== I && (y = y - s / 2 - x),
                      0 === I && (y = y - s / 2 - x),
                      Math.abs(y) < 0.001 && (y = 0),
                      t.roundLengths && (y = Math.floor(y)),
                      S % t.slidesPerGroup == 0 && p.push(y),
                      h.push(y))
                    : (t.roundLengths && (y = Math.floor(y)),
                      (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                        e.params.slidesPerGroup ==
                        0 && p.push(y),
                      h.push(y),
                      (y = y + v + x)),
                  (e.virtualSize += v + x),
                  (E = v),
                  (S += 1);
              }
            }
            let O;
            if (
              ((e.virtualSize = Math.max(e.virtualSize, s) + f),
              a &&
                n &&
                ("slide" === t.effect || "coverflow" === t.effect) &&
                i.css({ width: e.virtualSize + t.spaceBetween + "px" }),
              t.setWrapperSize &&
                (e.isHorizontal()
                  ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
                  : i.css({ height: e.virtualSize + t.spaceBetween + "px" })),
              t.slidesPerColumn > 1 &&
                ((e.virtualSize = (v + t.spaceBetween) * w),
                (e.virtualSize =
                  Math.ceil(e.virtualSize / t.slidesPerColumn) -
                  t.spaceBetween),
                e.isHorizontal()
                  ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
                  : i.css({ height: e.virtualSize + t.spaceBetween + "px" }),
                t.centeredSlides))
            ) {
              O = [];
              for (let i = 0; i < p.length; i += 1) {
                let s = p[i];
                t.roundLengths && (s = Math.floor(s)),
                  p[i] < e.virtualSize + p[0] && O.push(s);
              }
              p = O;
            }
            if (!t.centeredSlides) {
              O = [];
              for (let i = 0; i < p.length; i += 1) {
                let a = p[i];
                t.roundLengths && (a = Math.floor(a)),
                  p[i] <= e.virtualSize - s && O.push(a);
              }
              (p = O),
                Math.floor(e.virtualSize - s) - Math.floor(p[p.length - 1]) >
                  1 && p.push(e.virtualSize - s);
            }
            if (
              (0 === p.length && (p = [0]),
              0 !== t.spaceBetween &&
                (e.isHorizontal()
                  ? a
                    ? l.filter(u).css({ marginLeft: x + "px" })
                    : l.filter(u).css({ marginRight: x + "px" })
                  : l.filter(u).css({ marginBottom: x + "px" })),
              t.centeredSlides && t.centeredSlidesBounds)
            ) {
              let e = 0;
              c.forEach((i) => {
                e += i + (t.spaceBetween ? t.spaceBetween : 0);
              }),
                (e -= t.spaceBetween);
              const i = e - s;
              p = p.map((e) => (e < 0 ? -g : e > i ? i + f : e));
            }
            if (t.centerInsufficientSlides) {
              let e = 0;
              if (
                (c.forEach((i) => {
                  e += i + (t.spaceBetween ? t.spaceBetween : 0);
                }),
                (e -= t.spaceBetween),
                e < s)
              ) {
                const t = (s - e) / 2;
                p.forEach((e, i) => {
                  p[i] = e - t;
                }),
                  h.forEach((e, i) => {
                    h[i] = e + t;
                  });
              }
            }
            dt.extend(e, {
              slides: l,
              snapGrid: p,
              slidesGrid: h,
              slidesSizesGrid: c,
            }),
              d !== o && e.emit("slidesLengthChange"),
              p.length !== m &&
                (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
              h.length !== b && e.emit("slidesGridLengthChange"),
              (t.watchSlidesProgress || t.watchSlidesVisibility) &&
                e.updateSlidesOffset();
          },
          updateAutoHeight: function (e) {
            const t = this,
              i = [];
            let s,
              a = 0;
            if (
              ("number" == typeof e
                ? t.setTransition(e)
                : !0 === e && t.setTransition(t.params.speed),
              "auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            )
              if (t.params.centeredSlides)
                t.visibleSlides.each((e, t) => {
                  i.push(t);
                });
              else
                for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
                  const e = t.activeIndex + s;
                  if (e > t.slides.length) break;
                  i.push(t.slides.eq(e)[0]);
                }
            else i.push(t.slides.eq(t.activeIndex)[0]);
            for (s = 0; s < i.length; s += 1)
              if (void 0 !== i[s]) {
                const e = i[s].offsetHeight;
                a = e > a ? e : a;
              }
            a && t.$wrapperEl.css("height", a + "px");
          },
          updateSlidesOffset: function () {
            const e = this,
              t = e.slides;
            for (let i = 0; i < t.length; i += 1)
              t[i].swiperSlideOffset = e.isHorizontal()
                ? t[i].offsetLeft
                : t[i].offsetTop;
          },
          updateSlidesProgress: function (e = (this && this.translate) || 0) {
            const t = this,
              i = t.params,
              { slides: s, rtlTranslate: a } = t;
            if (0 === s.length) return;
            void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            a && (n = e),
              s.removeClass(i.slideVisibleClass),
              (t.visibleSlidesIndexes = []),
              (t.visibleSlides = []);
            for (let r = 0; r < s.length; r += 1) {
              const e = s[r],
                o =
                  (n +
                    (i.centeredSlides ? t.minTranslate() : 0) -
                    e.swiperSlideOffset) /
                  (e.swiperSlideSize + i.spaceBetween);
              if (
                i.watchSlidesVisibility ||
                (i.centeredSlides && i.autoHeight)
              ) {
                const a = -(n - e.swiperSlideOffset),
                  o = a + t.slidesSizesGrid[r];
                ((a >= 0 && a < t.size - 1) ||
                  (o > 1 && o <= t.size) ||
                  (a <= 0 && o >= t.size)) &&
                  (t.visibleSlides.push(e),
                  t.visibleSlidesIndexes.push(r),
                  s.eq(r).addClass(i.slideVisibleClass));
              }
              e.progress = a ? -o : o;
            }
            t.visibleSlides = rt(t.visibleSlides);
          },
          updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
              const i = t.rtlTranslate ? -1 : 1;
              e = (t && t.translate && t.translate * i) || 0;
            }
            const i = t.params,
              s = t.maxTranslate() - t.minTranslate();
            let { progress: a, isBeginning: n, isEnd: r } = t;
            const o = n,
              l = r;
            0 === s
              ? ((a = 0), (n = !0), (r = !0))
              : ((a = (e - t.minTranslate()) / s), (n = a <= 0), (r = a >= 1)),
              dt.extend(t, { progress: a, isBeginning: n, isEnd: r }),
              (i.watchSlidesProgress ||
                i.watchSlidesVisibility ||
                (i.centeredSlides && i.autoHeight)) &&
                t.updateSlidesProgress(e),
              n && !o && t.emit("reachBeginning toEdge"),
              r && !l && t.emit("reachEnd toEdge"),
              ((o && !n) || (l && !r)) && t.emit("fromEdge"),
              t.emit("progress", a);
          },
          updateSlidesClasses: function () {
            const {
                slides: e,
                params: t,
                $wrapperEl: i,
                activeIndex: s,
                realIndex: a,
              } = this,
              n = this.virtual && t.virtual.enabled;
            let r;
            e.removeClass(
              `${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ${t.slideDuplicatePrevClass}`
            ),
              (r = n
                ? this.$wrapperEl.find(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]`
                  )
                : e.eq(s)),
              r.addClass(t.slideActiveClass),
              t.loop &&
                (r.hasClass(t.slideDuplicateClass)
                  ? i
                      .children(
                        `.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${a}"]`
                      )
                      .addClass(t.slideDuplicateActiveClass)
                  : i
                      .children(
                        `.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${a}"]`
                      )
                      .addClass(t.slideDuplicateActiveClass));
            let o = r
              .nextAll("." + t.slideClass)
              .eq(0)
              .addClass(t.slideNextClass);
            t.loop &&
              0 === o.length &&
              ((o = e.eq(0)), o.addClass(t.slideNextClass));
            let l = r
              .prevAll("." + t.slideClass)
              .eq(0)
              .addClass(t.slidePrevClass);
            t.loop &&
              0 === l.length &&
              ((l = e.eq(-1)), l.addClass(t.slidePrevClass)),
              t.loop &&
                (o.hasClass(t.slideDuplicateClass)
                  ? i
                      .children(
                        `.${t.slideClass}:not(.${
                          t.slideDuplicateClass
                        })[data-swiper-slide-index="${o.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(t.slideDuplicateNextClass)
                  : i
                      .children(
                        `.${t.slideClass}.${
                          t.slideDuplicateClass
                        }[data-swiper-slide-index="${o.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(t.slideDuplicateNextClass),
                l.hasClass(t.slideDuplicateClass)
                  ? i
                      .children(
                        `.${t.slideClass}:not(.${
                          t.slideDuplicateClass
                        })[data-swiper-slide-index="${l.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(t.slideDuplicatePrevClass)
                  : i
                      .children(
                        `.${t.slideClass}.${
                          t.slideDuplicateClass
                        }[data-swiper-slide-index="${l.attr(
                          "data-swiper-slide-index"
                        )}"]`
                      )
                      .addClass(t.slideDuplicatePrevClass));
          },
          updateActiveIndex: function (e) {
            const t = this.rtlTranslate ? this.translate : -this.translate,
              {
                slidesGrid: i,
                snapGrid: s,
                params: a,
                activeIndex: n,
                realIndex: r,
                snapIndex: o,
              } = this;
            let l,
              d = e;
            if (void 0 === d) {
              for (let e = 0; e < i.length; e += 1)
                void 0 !== i[e + 1]
                  ? t >= i[e] && t < i[e + 1] - (i[e + 1] - i[e]) / 2
                    ? (d = e)
                    : t >= i[e] && t < i[e + 1] && (d = e + 1)
                  : t >= i[e] && (d = e);
              a.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
            }
            if (s.indexOf(t) >= 0) l = s.indexOf(t);
            else {
              const e = Math.min(a.slidesPerGroupSkip, d);
              l = e + Math.floor((d - e) / a.slidesPerGroup);
            }
            if ((l >= s.length && (l = s.length - 1), d === n))
              return void (
                l !== o && ((this.snapIndex = l), this.emit("snapIndexChange"))
              );
            const p = parseInt(
              this.slides.eq(d).attr("data-swiper-slide-index") || d,
              10
            );
            dt.extend(this, {
              snapIndex: l,
              realIndex: p,
              previousIndex: n,
              activeIndex: d,
            }),
              this.emit("activeIndexChange"),
              this.emit("snapIndexChange"),
              r !== p && this.emit("realIndexChange"),
              (this.initialized || this.params.runCallbacksOnInit) &&
                this.emit("slideChange");
          },
          updateClickedSlide: function (e) {
            const t = this,
              i = t.params,
              s = rt(e.target).closest("." + i.slideClass)[0];
            let a = !1;
            if (s)
              for (let n = 0; n < t.slides.length; n += 1)
                t.slides[n] === s && (a = !0);
            if (!s || !a)
              return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
            (t.clickedSlide = s),
              (t.clickedIndex =
                t.virtual && t.params.virtual.enabled
                  ? parseInt(rt(s).attr("data-swiper-slide-index"), 10)
                  : rt(s).index()),
              i.slideToClickedSlide &&
                void 0 !== t.clickedIndex &&
                t.clickedIndex !== t.activeIndex &&
                t.slideToClickedSlide();
          },
        },
        ut = {
          getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
            const {
              params: t,
              rtlTranslate: i,
              translate: s,
              $wrapperEl: a,
            } = this;
            if (t.virtualTranslate) return i ? -s : s;
            if (t.cssMode) return s;
            let n = dt.getTranslate(a[0], e);
            return i && (n = -n), n || 0;
          },
          setTranslate: function (e, t) {
            const {
              rtlTranslate: i,
              params: s,
              $wrapperEl: a,
              wrapperEl: n,
              progress: r,
            } = this;
            let o,
              l = 0,
              d = 0;
            this.isHorizontal() ? (l = i ? -e : e) : (d = e),
              s.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
              s.cssMode
                ? (n[this.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                    this.isHorizontal() ? -l : -d)
                : s.virtualTranslate ||
                  a.transform(`translate3d(${l}px, ${d}px, 0px)`),
              (this.previousTranslate = this.translate),
              (this.translate = this.isHorizontal() ? l : d);
            const p = this.maxTranslate() - this.minTranslate();
            (o = 0 === p ? 0 : (e - this.minTranslate()) / p),
              o !== r && this.updateProgress(e),
              this.emit("setTranslate", this.translate, t);
          },
          minTranslate: function () {
            return -this.snapGrid[0];
          },
          maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
          },
          translateTo: function (
            e = 0,
            t = this.params.speed,
            i = !0,
            s = !0,
            a
          ) {
            const n = this,
              { params: r, wrapperEl: o } = n;
            if (n.animating && r.preventInteractionOnTransition) return !1;
            const l = n.minTranslate(),
              d = n.maxTranslate();
            let p;
            if (
              ((p = s && e > l ? l : s && e < d ? d : e),
              n.updateProgress(p),
              r.cssMode)
            ) {
              const e = n.isHorizontal();
              return (
                0 === t
                  ? (o[e ? "scrollLeft" : "scrollTop"] = -p)
                  : o.scrollTo
                  ? o.scrollTo({ [e ? "left" : "top"]: -p, behavior: "smooth" })
                  : (o[e ? "scrollLeft" : "scrollTop"] = -p),
                !0
              );
            }
            return (
              0 === t
                ? (n.setTransition(0),
                  n.setTranslate(p),
                  i &&
                    (n.emit("beforeTransitionStart", t, a),
                    n.emit("transitionEnd")))
                : (n.setTransition(t),
                  n.setTranslate(p),
                  i &&
                    (n.emit("beforeTransitionStart", t, a),
                    n.emit("transitionStart")),
                  n.animating ||
                    ((n.animating = !0),
                    n.onTranslateToWrapperTransitionEnd ||
                      (n.onTranslateToWrapperTransitionEnd = function (e) {
                        n &&
                          !n.destroyed &&
                          e.target === this &&
                          (n.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            n.onTranslateToWrapperTransitionEnd
                          ),
                          n.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            n.onTranslateToWrapperTransitionEnd
                          ),
                          (n.onTranslateToWrapperTransitionEnd = null),
                          delete n.onTranslateToWrapperTransitionEnd,
                          i && n.emit("transitionEnd"));
                      }),
                    n.$wrapperEl[0].addEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    n.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      n.onTranslateToWrapperTransitionEnd
                    ))),
              !0
            );
          },
        },
        gt = {
          slideTo: function (e = 0, t = this.params.speed, i = !0, s) {
            const a = this;
            let n = e;
            n < 0 && (n = 0);
            const {
              params: r,
              snapGrid: o,
              slidesGrid: l,
              previousIndex: d,
              activeIndex: p,
              rtlTranslate: h,
              wrapperEl: c,
            } = a;
            if (a.animating && r.preventInteractionOnTransition) return !1;
            const u = Math.min(a.params.slidesPerGroupSkip, n);
            let g = u + Math.floor((n - u) / a.params.slidesPerGroup);
            g >= o.length && (g = o.length - 1),
              (p || r.initialSlide || 0) === (d || 0) &&
                i &&
                a.emit("beforeSlideChangeStart");
            const f = -o[g];
            if ((a.updateProgress(f), r.normalizeSlideIndex))
              for (let b = 0; b < l.length; b += 1)
                -Math.floor(100 * f) >= Math.floor(100 * l[b]) && (n = b);
            if (a.initialized && n !== p) {
              if (!a.allowSlideNext && f < a.translate && f < a.minTranslate())
                return !1;
              if (
                !a.allowSlidePrev &&
                f > a.translate &&
                f > a.maxTranslate() &&
                (p || 0) !== n
              )
                return !1;
            }
            let m;
            if (
              ((m = n > p ? "next" : n < p ? "prev" : "reset"),
              (h && -f === a.translate) || (!h && f === a.translate))
            )
              return (
                a.updateActiveIndex(n),
                r.autoHeight && a.updateAutoHeight(),
                a.updateSlidesClasses(),
                "slide" !== r.effect && a.setTranslate(f),
                "reset" !== m &&
                  (a.transitionStart(i, m), a.transitionEnd(i, m)),
                !1
              );
            if (r.cssMode) {
              const e = a.isHorizontal();
              let i = -f;
              return (
                h && (i = c.scrollWidth - c.offsetWidth - i),
                0 === t
                  ? (c[e ? "scrollLeft" : "scrollTop"] = i)
                  : c.scrollTo
                  ? c.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" })
                  : (c[e ? "scrollLeft" : "scrollTop"] = i),
                !0
              );
            }
            return (
              0 === t
                ? (a.setTransition(0),
                  a.setTranslate(f),
                  a.updateActiveIndex(n),
                  a.updateSlidesClasses(),
                  a.emit("beforeTransitionStart", t, s),
                  a.transitionStart(i, m),
                  a.transitionEnd(i, m))
                : (a.setTransition(t),
                  a.setTranslate(f),
                  a.updateActiveIndex(n),
                  a.updateSlidesClasses(),
                  a.emit("beforeTransitionStart", t, s),
                  a.transitionStart(i, m),
                  a.animating ||
                    ((a.animating = !0),
                    a.onSlideToWrapperTransitionEnd ||
                      (a.onSlideToWrapperTransitionEnd = function (e) {
                        a &&
                          !a.destroyed &&
                          e.target === this &&
                          (a.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            a.onSlideToWrapperTransitionEnd
                          ),
                          a.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            a.onSlideToWrapperTransitionEnd
                          ),
                          (a.onSlideToWrapperTransitionEnd = null),
                          delete a.onSlideToWrapperTransitionEnd,
                          a.transitionEnd(i, m));
                      }),
                    a.$wrapperEl[0].addEventListener(
                      "transitionend",
                      a.onSlideToWrapperTransitionEnd
                    ),
                    a.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      a.onSlideToWrapperTransitionEnd
                    ))),
              !0
            );
          },
          slideToLoop: function (e = 0, t = this.params.speed, i = !0, s) {
            let a = e;
            return (
              this.params.loop && (a += this.loopedSlides),
              this.slideTo(a, t, i, s)
            );
          },
          slideNext: function (e = this.params.speed, t = !0, i) {
            const s = this,
              { params: a, animating: n } = s,
              r = s.activeIndex < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup;
            if (a.loop) {
              if (n) return !1;
              s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
            }
            return s.slideTo(s.activeIndex + r, e, t, i);
          },
          slidePrev: function (e = this.params.speed, t = !0, i) {
            const s = this,
              {
                params: a,
                animating: n,
                snapGrid: r,
                slidesGrid: o,
                rtlTranslate: l,
              } = s;
            if (a.loop) {
              if (n) return !1;
              s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
            }
            function d(e) {
              return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const p = d(l ? s.translate : -s.translate),
              h = r.map((e) => d(e));
            o.map((e) => d(e)), h.indexOf(p);
            let c,
              u = r[h.indexOf(p) - 1];
            return (
              void 0 === u &&
                a.cssMode &&
                r.forEach((e) => {
                  !u && p >= e && (u = e);
                }),
              void 0 !== u &&
                ((c = o.indexOf(u)), c < 0 && (c = s.activeIndex - 1)),
              s.slideTo(c, e, t, i)
            );
          },
          slideReset: function (e = this.params.speed, t = !0, i) {
            return this.slideTo(this.activeIndex, e, t, i);
          },
          slideToClosest: function (e = this.params.speed, t = !0, i, s = 0.5) {
            const a = this;
            let n = a.activeIndex;
            const r = Math.min(a.params.slidesPerGroupSkip, n),
              o = r + Math.floor((n - r) / a.params.slidesPerGroup),
              l = a.rtlTranslate ? a.translate : -a.translate;
            if (l >= a.snapGrid[o]) {
              const e = a.snapGrid[o];
              l - e > (a.snapGrid[o + 1] - e) * s &&
                (n += a.params.slidesPerGroup);
            } else {
              const e = a.snapGrid[o - 1];
              l - e <= (a.snapGrid[o] - e) * s &&
                (n -= a.params.slidesPerGroup);
            }
            return (
              (n = Math.max(n, 0)),
              (n = Math.min(n, a.slidesGrid.length - 1)),
              a.slideTo(n, e, t, i)
            );
          },
          slideToClickedSlide: function () {
            const e = this,
              { params: t, $wrapperEl: i } = e,
              s =
                "auto" === t.slidesPerView
                  ? e.slidesPerViewDynamic()
                  : t.slidesPerView;
            let a,
              n = e.clickedIndex;
            if (t.loop) {
              if (e.animating) return;
              (a = parseInt(
                rt(e.clickedSlide).attr("data-swiper-slide-index"),
                10
              )),
                t.centeredSlides
                  ? n < e.loopedSlides - s / 2 ||
                    n > e.slides.length - e.loopedSlides + s / 2
                    ? (e.loopFix(),
                      (n = i
                        .children(
                          `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                        )
                        .eq(0)
                        .index()),
                      dt.nextTick(() => {
                        e.slideTo(n);
                      }))
                    : e.slideTo(n)
                  : n > e.slides.length - s
                  ? (e.loopFix(),
                    (n = i
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    dt.nextTick(() => {
                      e.slideTo(n);
                    }))
                  : e.slideTo(n);
            } else e.slideTo(n);
          },
        },
        ft = {
          loopCreate: function () {
            const e = this,
              { params: t, $wrapperEl: i } = e;
            i.children(`.${t.slideClass}.${t.slideDuplicateClass}`).remove();
            let s = i.children("." + t.slideClass);
            if (t.loopFillGroupWithBlank) {
              const e = t.slidesPerGroup - (s.length % t.slidesPerGroup);
              if (e !== t.slidesPerGroup) {
                for (let s = 0; s < e; s += 1) {
                  const e = rt(it.createElement("div")).addClass(
                    `${t.slideClass} ${t.slideBlankClass}`
                  );
                  i.append(e);
                }
                s = i.children("." + t.slideClass);
              }
            }
            "auto" !== t.slidesPerView ||
              t.loopedSlides ||
              (t.loopedSlides = s.length),
              (e.loopedSlides = Math.ceil(
                parseFloat(t.loopedSlides || t.slidesPerView, 10)
              )),
              (e.loopedSlides += t.loopAdditionalSlides),
              e.loopedSlides > s.length && (e.loopedSlides = s.length);
            const a = [],
              n = [];
            s.each((t, i) => {
              const r = rt(i);
              t < e.loopedSlides && n.push(i),
                t < s.length && t >= s.length - e.loopedSlides && a.push(i),
                r.attr("data-swiper-slide-index", t);
            });
            for (let r = 0; r < n.length; r += 1)
              i.append(rt(n[r].cloneNode(!0)).addClass(t.slideDuplicateClass));
            for (let r = a.length - 1; r >= 0; r -= 1)
              i.prepend(rt(a[r].cloneNode(!0)).addClass(t.slideDuplicateClass));
          },
          loopFix: function () {
            this.emit("beforeLoopFix");
            const {
              activeIndex: e,
              slides: t,
              loopedSlides: i,
              allowSlidePrev: s,
              allowSlideNext: a,
              snapGrid: n,
              rtlTranslate: r,
            } = this;
            let o;
            (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
            const l = -n[e] - this.getTranslate();
            e < i
              ? ((o = t.length - 3 * i + e),
                (o += i),
                this.slideTo(o, 0, !1, !0) &&
                  0 !== l &&
                  this.setTranslate((r ? -this.translate : this.translate) - l))
              : e >= t.length - i &&
                ((o = -t.length + e + i),
                (o += i),
                this.slideTo(o, 0, !1, !0) &&
                  0 !== l &&
                  this.setTranslate(
                    (r ? -this.translate : this.translate) - l
                  )),
              (this.allowSlidePrev = s),
              (this.allowSlideNext = a),
              this.emit("loopFix");
          },
          loopDestroy: function () {
            const { $wrapperEl: e, params: t, slides: i } = this;
            e
              .children(
                `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
              )
              .remove(),
              i.removeAttr("data-swiper-slide-index");
          },
        },
        mt = {
          setGrabCursor: function (e) {
            if (
              pt.touch ||
              !this.params.simulateTouch ||
              (this.params.watchOverflow && this.isLocked) ||
              this.params.cssMode
            )
              return;
            const t = this.el;
            (t.style.cursor = "move"),
              (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (t.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            pt.touch ||
              (this.params.watchOverflow && this.isLocked) ||
              this.params.cssMode ||
              (this.el.style.cursor = "");
          },
        },
        bt = {
          appendSlide: function (e) {
            const { $wrapperEl: t, params: i } = this;
            if (
              (i.loop && this.loopDestroy(),
              "object" == typeof e && "length" in e)
            )
              for (let s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
            else t.append(e);
            i.loop && this.loopCreate(),
              (i.observer && pt.observer) || this.update();
          },
          prependSlide: function (e) {
            const { params: t, $wrapperEl: i, activeIndex: s } = this;
            t.loop && this.loopDestroy();
            let a = s + 1;
            if ("object" == typeof e && "length" in e) {
              for (let t = 0; t < e.length; t += 1) e[t] && i.prepend(e[t]);
              a = s + e.length;
            } else i.prepend(e);
            t.loop && this.loopCreate(),
              (t.observer && pt.observer) || this.update(),
              this.slideTo(a, 0, !1);
          },
          addSlide: function (e, t) {
            const i = this,
              { $wrapperEl: s, params: a, activeIndex: n } = i;
            let r = n;
            a.loop &&
              ((r -= i.loopedSlides),
              i.loopDestroy(),
              (i.slides = s.children("." + a.slideClass)));
            const o = i.slides.length;
            if (e <= 0) return void i.prependSlide(t);
            if (e >= o) return void i.appendSlide(t);
            let l = r > e ? r + 1 : r;
            const d = [];
            for (let p = o - 1; p >= e; p -= 1) {
              const e = i.slides.eq(p);
              e.remove(), d.unshift(e);
            }
            if ("object" == typeof t && "length" in t) {
              for (let e = 0; e < t.length; e += 1) t[e] && s.append(t[e]);
              l = r > e ? r + t.length : r;
            } else s.append(t);
            for (let p = 0; p < d.length; p += 1) s.append(d[p]);
            a.loop && i.loopCreate(),
              (a.observer && pt.observer) || i.update(),
              i.slideTo(a.loop ? l + i.loopedSlides : l, 0, !1);
          },
          removeSlide: function (e) {
            const t = this,
              { params: i, $wrapperEl: s, activeIndex: a } = t;
            let n = a;
            i.loop &&
              ((n -= t.loopedSlides),
              t.loopDestroy(),
              (t.slides = s.children("." + i.slideClass)));
            let r,
              o = n;
            if ("object" == typeof e && "length" in e) {
              for (let i = 0; i < e.length; i += 1)
                (r = e[i]),
                  t.slides[r] && t.slides.eq(r).remove(),
                  r < o && (o -= 1);
              o = Math.max(o, 0);
            } else
              (r = e),
                t.slides[r] && t.slides.eq(r).remove(),
                r < o && (o -= 1),
                (o = Math.max(o, 0));
            i.loop && t.loopCreate(),
              (i.observer && pt.observer) || t.update(),
              t.slideTo(i.loop ? o + t.loopedSlides : o, 0, !1);
          },
          removeAllSlides: function () {
            const e = this,
              t = [];
            for (let i = 0; i < e.slides.length; i += 1) t.push(i);
            e.removeSlide(t);
          },
        };
      const wt = (function () {
        const e = at.navigator.platform,
          t = at.navigator.userAgent,
          i = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            edge: !1,
            ie: !1,
            firefox: !1,
            macos: !1,
            windows: !1,
            cordova: !(!at.cordova && !at.phonegap),
            phonegap: !(!at.cordova && !at.phonegap),
            electron: !1,
          },
          s = at.screen.width,
          a = at.screen.height,
          n = t.match(/(Android);?[\s\/]+([\d.]+)?/);
        let r = t.match(/(iPad).*OS\s([\d_]+)/);
        const o = t.match(/(iPod)(.*OS\s([\d_]+))?/),
          l = !r && t.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
          d = t.indexOf("MSIE ") >= 0 || t.indexOf("Trident/") >= 0,
          p = t.indexOf("Edge/") >= 0,
          h = t.indexOf("Gecko/") >= 0 && t.indexOf("Firefox/") >= 0,
          c = "Win32" === e,
          u = t.toLowerCase().indexOf("electron") >= 0;
        let g = "MacIntel" === e;
        return (
          !r &&
            g &&
            pt.touch &&
            ((1024 === s && 1366 === a) ||
              (834 === s && 1194 === a) ||
              (834 === s && 1112 === a) ||
              (768 === s && 1024 === a)) &&
            ((r = t.match(/(Version)\/([\d.]+)/)), (g = !1)),
          (i.ie = d),
          (i.edge = p),
          (i.firefox = h),
          n &&
            !c &&
            ((i.os = "android"),
            (i.osVersion = n[2]),
            (i.android = !0),
            (i.androidChrome = t.toLowerCase().indexOf("chrome") >= 0)),
          (r || l || o) && ((i.os = "ios"), (i.ios = !0)),
          l && !o && ((i.osVersion = l[2].replace(/_/g, ".")), (i.iphone = !0)),
          r && ((i.osVersion = r[2].replace(/_/g, ".")), (i.ipad = !0)),
          o &&
            ((i.osVersion = o[3] ? o[3].replace(/_/g, ".") : null),
            (i.ipod = !0)),
          i.ios &&
            i.osVersion &&
            t.indexOf("Version/") >= 0 &&
            "10" === i.osVersion.split(".")[0] &&
            (i.osVersion = t.toLowerCase().split("version/")[1].split(" ")[0]),
          (i.webView =
            !(
              !(l || r || o) ||
              (!t.match(/.*AppleWebKit(?!.*Safari)/i) &&
                !at.navigator.standalone)
            ) ||
            (at.matchMedia &&
              at.matchMedia("(display-mode: standalone)").matches)),
          (i.webview = i.webView),
          (i.standalone = i.webView),
          (i.desktop = !(i.ios || i.android) || u),
          i.desktop &&
            ((i.electron = u),
            (i.macos = g),
            (i.windows = c),
            i.macos && (i.os = "macos"),
            i.windows && (i.os = "windows")),
          (i.pixelRatio = at.devicePixelRatio || 1),
          i
        );
      })();
      function vt(e) {
        const t = this,
          i = t.touchEventsData,
          { params: s, touches: a } = t;
        if (t.animating && s.preventInteractionOnTransition) return;
        let n = e;
        n.originalEvent && (n = n.originalEvent);
        const r = rt(n.target);
        if ("wrapper" === s.touchEventsTarget && !r.closest(t.wrapperEl).length)
          return;
        if (
          ((i.isTouchEvent = "touchstart" === n.type),
          !i.isTouchEvent && "which" in n && 3 === n.which)
        )
          return;
        if (!i.isTouchEvent && "button" in n && n.button > 0) return;
        if (i.isTouched && i.isMoved) return;
        if (
          s.noSwiping &&
          r.closest(
            s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass
          )[0]
        )
          return void (t.allowClick = !0);
        if (s.swipeHandler && !r.closest(s.swipeHandler)[0]) return;
        (a.currentX =
          "touchstart" === n.type ? n.targetTouches[0].pageX : n.pageX),
          (a.currentY =
            "touchstart" === n.type ? n.targetTouches[0].pageY : n.pageY);
        const o = a.currentX,
          l = a.currentY,
          d = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
        if (
          (!s.edgeSwipeDetection && !s.iOSEdgeSwipeDetection) ||
          !(o <= d || o >= at.screen.width - d)
        ) {
          if (
            (dt.extend(i, {
              isTouched: !0,
              isMoved: !1,
              allowTouchCallbacks: !0,
              isScrolling: void 0,
              startMoving: void 0,
            }),
            (a.startX = o),
            (a.startY = l),
            (i.touchStartTime = dt.now()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            s.threshold > 0 && (i.allowThresholdMove = !1),
            "touchstart" !== n.type)
          ) {
            let e = !0;
            r.is(i.formElements) && (e = !1),
              it.activeElement &&
                rt(it.activeElement).is(i.formElements) &&
                it.activeElement !== r[0] &&
                it.activeElement.blur();
            const a = e && t.allowTouchMove && s.touchStartPreventDefault;
            (s.touchStartForcePreventDefault || a) && n.preventDefault();
          }
          t.emit("touchStart", n);
        }
      }
      function xt(e) {
        const t = this,
          i = t.touchEventsData,
          { params: s, touches: a, rtlTranslate: n } = t;
        let r = e;
        if ((r.originalEvent && (r = r.originalEvent), !i.isTouched))
          return void (
            i.startMoving &&
            i.isScrolling &&
            t.emit("touchMoveOpposite", r)
          );
        if (i.isTouchEvent && "touchmove" !== r.type) return;
        const o =
            "touchmove" === r.type &&
            r.targetTouches &&
            (r.targetTouches[0] || r.changedTouches[0]),
          l = "touchmove" === r.type ? o.pageX : r.pageX,
          d = "touchmove" === r.type ? o.pageY : r.pageY;
        if (r.preventedByNestedSwiper)
          return (a.startX = l), void (a.startY = d);
        if (!t.allowTouchMove)
          return (
            (t.allowClick = !1),
            void (
              i.isTouched &&
              (dt.extend(a, { startX: l, startY: d, currentX: l, currentY: d }),
              (i.touchStartTime = dt.now()))
            )
          );
        if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
          if (t.isVertical()) {
            if (
              (d < a.startY && t.translate <= t.maxTranslate()) ||
              (d > a.startY && t.translate >= t.minTranslate())
            )
              return (i.isTouched = !1), void (i.isMoved = !1);
          } else if (
            (l < a.startX && t.translate <= t.maxTranslate()) ||
            (l > a.startX && t.translate >= t.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          it.activeElement &&
          r.target === it.activeElement &&
          rt(r.target).is(i.formElements)
        )
          return (i.isMoved = !0), void (t.allowClick = !1);
        if (
          (i.allowTouchCallbacks && t.emit("touchMove", r),
          r.targetTouches && r.targetTouches.length > 1)
        )
          return;
        (a.currentX = l), (a.currentY = d);
        const p = a.currentX - a.startX,
          h = a.currentY - a.startY;
        if (
          t.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < t.params.threshold
        )
          return;
        if (void 0 === i.isScrolling) {
          let e;
          (t.isHorizontal() && a.currentY === a.startY) ||
          (t.isVertical() && a.currentX === a.startX)
            ? (i.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (i.isScrolling = t.isHorizontal()
                ? e > s.touchAngle
                : 90 - e > s.touchAngle));
        }
        if (
          (i.isScrolling && t.emit("touchMoveOpposite", r),
          void 0 === i.startMoving &&
            ((a.currentX === a.startX && a.currentY === a.startY) ||
              (i.startMoving = !0)),
          i.isScrolling)
        )
          return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (t.allowClick = !1),
          !s.cssMode && r.cancelable && r.preventDefault(),
          s.touchMoveStopPropagation && !s.nested && r.stopPropagation(),
          i.isMoved ||
            (s.loop && t.loopFix(),
            (i.startTranslate = t.getTranslate()),
            t.setTransition(0),
            t.animating &&
              t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (i.allowMomentumBounce = !1),
            !s.grabCursor ||
              (!0 !== t.allowSlideNext && !0 !== t.allowSlidePrev) ||
              t.setGrabCursor(!0),
            t.emit("sliderFirstMove", r)),
          t.emit("sliderMove", r),
          (i.isMoved = !0);
        let c = t.isHorizontal() ? p : h;
        (a.diff = c),
          (c *= s.touchRatio),
          n && (c = -c),
          (t.swipeDirection = c > 0 ? "prev" : "next"),
          (i.currentTranslate = c + i.startTranslate);
        let u = !0,
          g = s.resistanceRatio;
        if (
          (s.touchReleaseOnEdges && (g = 0),
          c > 0 && i.currentTranslate > t.minTranslate()
            ? ((u = !1),
              s.resistance &&
                (i.currentTranslate =
                  t.minTranslate() -
                  1 +
                  (-t.minTranslate() + i.startTranslate + c) ** g))
            : c < 0 &&
              i.currentTranslate < t.maxTranslate() &&
              ((u = !1),
              s.resistance &&
                (i.currentTranslate =
                  t.maxTranslate() +
                  1 -
                  (t.maxTranslate() - i.startTranslate - c) ** g)),
          u && (r.preventedByNestedSwiper = !0),
          !t.allowSlideNext &&
            "next" === t.swipeDirection &&
            i.currentTranslate < i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          !t.allowSlidePrev &&
            "prev" === t.swipeDirection &&
            i.currentTranslate > i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          s.threshold > 0)
        ) {
          if (!(Math.abs(c) > s.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
          if (!i.allowThresholdMove)
            return (
              (i.allowThresholdMove = !0),
              (a.startX = a.currentX),
              (a.startY = a.currentY),
              (i.currentTranslate = i.startTranslate),
              void (a.diff = t.isHorizontal()
                ? a.currentX - a.startX
                : a.currentY - a.startY)
            );
        }
        s.followFinger &&
          !s.cssMode &&
          ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) &&
            (t.updateActiveIndex(), t.updateSlidesClasses()),
          s.freeMode &&
            (0 === i.velocities.length &&
              i.velocities.push({
                position: a[t.isHorizontal() ? "startX" : "startY"],
                time: i.touchStartTime,
              }),
            i.velocities.push({
              position: a[t.isHorizontal() ? "currentX" : "currentY"],
              time: dt.now(),
            })),
          t.updateProgress(i.currentTranslate),
          t.setTranslate(i.currentTranslate));
      }
      function yt(e) {
        const t = this,
          i = t.touchEventsData,
          {
            params: s,
            touches: a,
            rtlTranslate: n,
            $wrapperEl: r,
            slidesGrid: o,
            snapGrid: l,
          } = t;
        let d = e;
        if (
          (d.originalEvent && (d = d.originalEvent),
          i.allowTouchCallbacks && t.emit("touchEnd", d),
          (i.allowTouchCallbacks = !1),
          !i.isTouched)
        )
          return (
            i.isMoved && s.grabCursor && t.setGrabCursor(!1),
            (i.isMoved = !1),
            void (i.startMoving = !1)
          );
        s.grabCursor &&
          i.isMoved &&
          i.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const p = dt.now(),
          h = p - i.touchStartTime;
        if (
          (t.allowClick &&
            (t.updateClickedSlide(d),
            t.emit("tap click", d),
            h < 300 &&
              p - i.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", d)),
          (i.lastClickTime = dt.now()),
          dt.nextTick(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !i.isTouched ||
            !i.isMoved ||
            !t.swipeDirection ||
            0 === a.diff ||
            i.currentTranslate === i.startTranslate)
        )
          return (
            (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1)
          );
        let c;
        if (
          ((i.isTouched = !1),
          (i.isMoved = !1),
          (i.startMoving = !1),
          (c = s.followFinger
            ? n
              ? t.translate
              : -t.translate
            : -i.currentTranslate),
          s.cssMode)
        )
          return;
        if (s.freeMode) {
          if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
          if (c > -t.maxTranslate())
            return void t.slideTo(
              t.slides.length < l.length ? l.length - 1 : t.slides.length - 1
            );
          if (s.freeModeMomentum) {
            if (i.velocities.length > 1) {
              const e = i.velocities.pop(),
                a = i.velocities.pop(),
                n = e.time - a.time;
              (t.velocity = (e.position - a.position) / n),
                (t.velocity /= 2),
                Math.abs(t.velocity) < s.freeModeMinimumVelocity &&
                  (t.velocity = 0),
                (n > 150 || dt.now() - e.time > 300) && (t.velocity = 0);
            } else t.velocity = 0;
            (t.velocity *= s.freeModeMomentumVelocityRatio),
              (i.velocities.length = 0);
            let e = 1e3 * s.freeModeMomentumRatio,
              a = t.translate + t.velocity * e;
            n && (a = -a);
            let o,
              d = !1;
            const p = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
            let h;
            if (a < t.maxTranslate())
              s.freeModeMomentumBounce
                ? (a + t.maxTranslate() < -p && (a = t.maxTranslate() - p),
                  (o = t.maxTranslate()),
                  (d = !0),
                  (i.allowMomentumBounce = !0))
                : (a = t.maxTranslate()),
                s.loop && s.centeredSlides && (h = !0);
            else if (a > t.minTranslate())
              s.freeModeMomentumBounce
                ? (a - t.minTranslate() > p && (a = t.minTranslate() + p),
                  (o = t.minTranslate()),
                  (d = !0),
                  (i.allowMomentumBounce = !0))
                : (a = t.minTranslate()),
                s.loop && s.centeredSlides && (h = !0);
            else if (s.freeModeSticky) {
              let e;
              for (let t = 0; t < l.length; t += 1)
                if (l[t] > -a) {
                  e = t;
                  break;
                }
              (a =
                Math.abs(l[e] - a) < Math.abs(l[e - 1] - a) ||
                "next" === t.swipeDirection
                  ? l[e]
                  : l[e - 1]),
                (a = -a);
            }
            if (
              (h &&
                t.once("transitionEnd", () => {
                  t.loopFix();
                }),
              0 !== t.velocity)
            ) {
              if (
                ((e = n
                  ? Math.abs((-a - t.translate) / t.velocity)
                  : Math.abs((a - t.translate) / t.velocity)),
                s.freeModeSticky)
              ) {
                const i = Math.abs((n ? -a : a) - t.translate),
                  r = t.slidesSizesGrid[t.activeIndex];
                e = i < r ? s.speed : i < 2 * r ? 1.5 * s.speed : 2.5 * s.speed;
              }
            } else if (s.freeModeSticky) return void t.slideToClosest();
            s.freeModeMomentumBounce && d
              ? (t.updateProgress(o),
                t.setTransition(e),
                t.setTranslate(a),
                t.transitionStart(!0, t.swipeDirection),
                (t.animating = !0),
                r.transitionEnd(() => {
                  t &&
                    !t.destroyed &&
                    i.allowMomentumBounce &&
                    (t.emit("momentumBounce"),
                    t.setTransition(s.speed),
                    setTimeout(() => {
                      t.setTranslate(o),
                        r.transitionEnd(() => {
                          t && !t.destroyed && t.transitionEnd();
                        });
                    }, 0));
                }))
              : t.velocity
              ? (t.updateProgress(a),
                t.setTransition(e),
                t.setTranslate(a),
                t.transitionStart(!0, t.swipeDirection),
                t.animating ||
                  ((t.animating = !0),
                  r.transitionEnd(() => {
                    t && !t.destroyed && t.transitionEnd();
                  })))
              : t.updateProgress(a),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          } else if (s.freeModeSticky) return void t.slideToClosest();
          return void (
            (!s.freeModeMomentum || h >= s.longSwipesMs) &&
            (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
          );
        }
        let u = 0,
          g = t.slidesSizesGrid[0];
        for (
          let b = 0;
          b < o.length;
          b += b < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
        ) {
          const e = b < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
          void 0 !== o[b + e]
            ? c >= o[b] && c < o[b + e] && ((u = b), (g = o[b + e] - o[b]))
            : c >= o[b] && ((u = b), (g = o[o.length - 1] - o[o.length - 2]));
        }
        const f = (c - o[u]) / g,
          m = u < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        if (h > s.longSwipesMs) {
          if (!s.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            t.slideTo(f >= s.longSwipesRatio ? u + m : u),
            "prev" === t.swipeDirection &&
              t.slideTo(f > 1 - s.longSwipesRatio ? u + m : u);
        } else {
          if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
          !t.navigation ||
          (d.target !== t.navigation.nextEl && d.target !== t.navigation.prevEl)
            ? ("next" === t.swipeDirection && t.slideTo(u + m),
              "prev" === t.swipeDirection && t.slideTo(u))
            : t.slideTo(d.target === t.navigation.nextEl ? u + m : u);
        }
      }
      function Et() {
        const { params: e, el: t } = this;
        if (t && 0 === t.offsetWidth) return;
        e.breakpoints && this.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: s, snapGrid: a } = this;
        (this.allowSlideNext = !0),
          (this.allowSlidePrev = !0),
          this.updateSize(),
          this.updateSlides(),
          this.updateSlidesClasses(),
          this.slideTo(
            ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
              this.isEnd &&
              !this.isBeginning &&
              !this.params.centeredSlides
              ? this.slides.length - 1
              : this.activeIndex,
            0,
            !1,
            !0
          ),
          this.autoplay &&
            this.autoplay.running &&
            this.autoplay.paused &&
            this.autoplay.run(),
          (this.allowSlidePrev = s),
          (this.allowSlideNext = i),
          this.params.watchOverflow &&
            a !== this.snapGrid &&
            this.checkOverflow();
      }
      function St(e) {
        this.allowClick ||
          (this.params.preventClicks && e.preventDefault(),
          this.params.preventClicksPropagation &&
            this.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation()));
      }
      function Tt() {
        const { wrapperEl: e, rtlTranslate: t } = this;
        let i;
        (this.previousTranslate = this.translate),
          (this.translate = this.isHorizontal()
            ? t
              ? e.scrollWidth - e.offsetWidth - e.scrollLeft
              : -e.scrollLeft
            : -e.scrollTop),
          -0 === this.translate && (this.translate = 0),
          this.updateActiveIndex(),
          this.updateSlidesClasses();
        const s = this.maxTranslate() - this.minTranslate();
        (i = 0 === s ? 0 : (this.translate - this.minTranslate()) / s),
          i !== this.progress &&
            this.updateProgress(t ? -this.translate : this.translate),
          this.emit("setTranslate", this.translate, !1);
      }
      let At = !1;
      function Ct() {}
      var Ot = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
      };
      const It = {
          update: ct,
          translate: ut,
          transition: {
            setTransition: function (e, t) {
              this.params.cssMode || this.$wrapperEl.transition(e),
                this.emit("setTransition", e, t);
            },
            transitionStart: function (e = !0, t) {
              const i = this,
                { activeIndex: s, params: a, previousIndex: n } = i;
              if (a.cssMode) return;
              a.autoHeight && i.updateAutoHeight();
              let r = t;
              if (
                (r || (r = s > n ? "next" : s < n ? "prev" : "reset"),
                i.emit("transitionStart"),
                e && s !== n)
              ) {
                if ("reset" === r)
                  return void i.emit("slideResetTransitionStart");
                i.emit("slideChangeTransitionStart"),
                  i.emit(
                    "next" === r
                      ? "slideNextTransitionStart"
                      : "slidePrevTransitionStart"
                  );
              }
            },
            transitionEnd: function (e = !0, t) {
              const i = this,
                { activeIndex: s, previousIndex: a, params: n } = i;
              if (((i.animating = !1), n.cssMode)) return;
              i.setTransition(0);
              let r = t;
              if (
                (r || (r = s > a ? "next" : s < a ? "prev" : "reset"),
                i.emit("transitionEnd"),
                e && s !== a)
              ) {
                if ("reset" === r)
                  return void i.emit("slideResetTransitionEnd");
                i.emit("slideChangeTransitionEnd"),
                  i.emit(
                    "next" === r
                      ? "slideNextTransitionEnd"
                      : "slidePrevTransitionEnd"
                  );
              }
            },
          },
          slide: gt,
          loop: ft,
          grabCursor: mt,
          manipulation: bt,
          events: {
            attachEvents: function () {
              const e = this,
                { params: t, touchEvents: i, el: s, wrapperEl: a } = e;
              (e.onTouchStart = vt.bind(e)),
                (e.onTouchMove = xt.bind(e)),
                (e.onTouchEnd = yt.bind(e)),
                t.cssMode && (e.onScroll = Tt.bind(e)),
                (e.onClick = St.bind(e));
              const n = !!t.nested;
              if (!pt.touch && pt.pointerEvents)
                s.addEventListener(i.start, e.onTouchStart, !1),
                  it.addEventListener(i.move, e.onTouchMove, n),
                  it.addEventListener(i.end, e.onTouchEnd, !1);
              else {
                if (pt.touch) {
                  const a = !(
                    "touchstart" !== i.start ||
                    !pt.passiveListener ||
                    !t.passiveListeners
                  ) && { passive: !0, capture: !1 };
                  s.addEventListener(i.start, e.onTouchStart, a),
                    s.addEventListener(
                      i.move,
                      e.onTouchMove,
                      pt.passiveListener ? { passive: !1, capture: n } : n
                    ),
                    s.addEventListener(i.end, e.onTouchEnd, a),
                    i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, a),
                    At || (it.addEventListener("touchstart", Ct), (At = !0));
                }
                ((t.simulateTouch && !wt.ios && !wt.android) ||
                  (t.simulateTouch && !pt.touch && wt.ios)) &&
                  (s.addEventListener("mousedown", e.onTouchStart, !1),
                  it.addEventListener("mousemove", e.onTouchMove, n),
                  it.addEventListener("mouseup", e.onTouchEnd, !1));
              }
              (t.preventClicks || t.preventClicksPropagation) &&
                s.addEventListener("click", e.onClick, !0),
                t.cssMode && a.addEventListener("scroll", e.onScroll),
                e.on(
                  t.updateOnWindowResize
                    ? wt.ios || wt.android
                      ? "resize orientationchange observerUpdate"
                      : "resize observerUpdate"
                    : "observerUpdate",
                  Et,
                  !0
                );
            },
            detachEvents: function () {
              const e = this,
                { params: t, touchEvents: i, el: s, wrapperEl: a } = e,
                n = !!t.nested;
              if (!pt.touch && pt.pointerEvents)
                s.removeEventListener(i.start, e.onTouchStart, !1),
                  it.removeEventListener(i.move, e.onTouchMove, n),
                  it.removeEventListener(i.end, e.onTouchEnd, !1);
              else {
                if (pt.touch) {
                  const a = !(
                    "onTouchStart" !== i.start ||
                    !pt.passiveListener ||
                    !t.passiveListeners
                  ) && { passive: !0, capture: !1 };
                  s.removeEventListener(i.start, e.onTouchStart, a),
                    s.removeEventListener(i.move, e.onTouchMove, n),
                    s.removeEventListener(i.end, e.onTouchEnd, a),
                    i.cancel &&
                      s.removeEventListener(i.cancel, e.onTouchEnd, a);
                }
                ((t.simulateTouch && !wt.ios && !wt.android) ||
                  (t.simulateTouch && !pt.touch && wt.ios)) &&
                  (s.removeEventListener("mousedown", e.onTouchStart, !1),
                  it.removeEventListener("mousemove", e.onTouchMove, n),
                  it.removeEventListener("mouseup", e.onTouchEnd, !1));
              }
              (t.preventClicks || t.preventClicksPropagation) &&
                s.removeEventListener("click", e.onClick, !0),
                t.cssMode && a.removeEventListener("scroll", e.onScroll),
                e.off(
                  wt.ios || wt.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  Et
                );
            },
          },
          breakpoints: {
            setBreakpoint: function () {
              const e = this,
                {
                  activeIndex: t,
                  initialized: i,
                  loopedSlides: s = 0,
                  params: a,
                  $el: n,
                } = e,
                r = a.breakpoints;
              if (!r || (r && 0 === Object.keys(r).length)) return;
              const o = e.getBreakpoint(r);
              if (o && e.currentBreakpoint !== o) {
                const l = o in r ? r[o] : void 0;
                l &&
                  [
                    "slidesPerView",
                    "spaceBetween",
                    "slidesPerGroup",
                    "slidesPerGroupSkip",
                    "slidesPerColumn",
                  ].forEach((e) => {
                    const t = l[e];
                    void 0 !== t &&
                      (l[e] =
                        "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                          ? "slidesPerView" === e
                            ? parseFloat(t)
                            : parseInt(t, 10)
                          : "auto");
                  });
                const d = l || e.originalParams,
                  p = a.slidesPerColumn > 1,
                  h = d.slidesPerColumn > 1;
                p && !h
                  ? n.removeClass(
                      `${a.containerModifierClass}multirow ${a.containerModifierClass}multirow-column`
                    )
                  : !p &&
                    h &&
                    (n.addClass(a.containerModifierClass + "multirow"),
                    "column" === d.slidesPerColumnFill &&
                      n.addClass(a.containerModifierClass + "multirow-column"));
                const c = d.direction && d.direction !== a.direction,
                  u = a.loop && (d.slidesPerView !== a.slidesPerView || c);
                c && i && e.changeDirection(),
                  dt.extend(e.params, d),
                  dt.extend(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev,
                  }),
                  (e.currentBreakpoint = o),
                  u &&
                    i &&
                    (e.loopDestroy(),
                    e.loopCreate(),
                    e.updateSlides(),
                    e.slideTo(t - s + e.loopedSlides, 0, !1)),
                  e.emit("breakpoint", d);
              }
            },
            getBreakpoint: function (e) {
              if (!e) return;
              let t = !1;
              const i = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: at.innerHeight * t, point: e };
                }
                return { value: e, point: e };
              });
              i.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
              for (let s = 0; s < i.length; s += 1) {
                const { point: e, value: a } = i[s];
                a <= at.innerWidth && (t = e);
              }
              return t || "max";
            },
          },
          checkOverflow: {
            checkOverflow: function () {
              const e = this.params,
                t = this.isLocked,
                i =
                  this.slides.length > 0 &&
                  e.slidesOffsetBefore +
                    e.spaceBetween * (this.slides.length - 1) +
                    this.slides[0].offsetWidth * this.slides.length;
              (this.isLocked =
                e.slidesOffsetBefore && e.slidesOffsetAfter && i
                  ? i <= this.size
                  : 1 === this.snapGrid.length),
                (this.allowSlideNext = !this.isLocked),
                (this.allowSlidePrev = !this.isLocked),
                t !== this.isLocked &&
                  this.emit(this.isLocked ? "lock" : "unlock"),
                t &&
                  t !== this.isLocked &&
                  ((this.isEnd = !1),
                  this.navigation && this.navigation.update());
            },
          },
          classes: {
            addClasses: function () {
              const { classNames: e, params: t, rtl: i, $el: s } = this,
                a = [];
              a.push("initialized"),
                a.push(t.direction),
                t.freeMode && a.push("free-mode"),
                t.autoHeight && a.push("autoheight"),
                i && a.push("rtl"),
                t.slidesPerColumn > 1 &&
                  (a.push("multirow"),
                  "column" === t.slidesPerColumnFill &&
                    a.push("multirow-column")),
                wt.android && a.push("android"),
                wt.ios && a.push("ios"),
                t.cssMode && a.push("css-mode"),
                a.forEach((i) => {
                  e.push(t.containerModifierClass + i);
                }),
                s.addClass(e.join(" "));
            },
            removeClasses: function () {
              const { $el: e, classNames: t } = this;
              e.removeClass(t.join(" "));
            },
          },
          images: {
            loadImage: function (e, t, i, s, a, n) {
              let r;
              function o() {
                n && n();
              }
              rt(e).parent("picture")[0] || (e.complete && a)
                ? o()
                : t
                ? ((r = new at.Image()),
                  (r.onload = o),
                  (r.onerror = o),
                  s && (r.sizes = s),
                  i && (r.srcset = i),
                  t && (r.src = t))
                : o();
            },
            preloadImages: function () {
              const e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                const s = e.imagesToLoad[i];
                e.loadImage(
                  s,
                  s.currentSrc || s.getAttribute("src"),
                  s.srcset || s.getAttribute("srcset"),
                  s.sizes || s.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        kt = {};
      class Mt extends ht {
        constructor(...e) {
          let t, i;
          1 === e.length && e[0].constructor && e[0].constructor === Object
            ? (i = e[0])
            : ([t, i] = e),
            i || (i = {}),
            (i = dt.extend({}, i)),
            t && !i.el && (i.el = t),
            super(i),
            Object.keys(It).forEach((e) => {
              Object.keys(It[e]).forEach((t) => {
                Mt.prototype[t] || (Mt.prototype[t] = It[e][t]);
              });
            });
          const s = this;
          void 0 === s.modules && (s.modules = {}),
            Object.keys(s.modules).forEach((e) => {
              const t = s.modules[e];
              if (t.params) {
                const e = Object.keys(t.params)[0],
                  s = t.params[e];
                if ("object" != typeof s || null === s) return;
                if (!(e in i) || !("enabled" in s)) return;
                !0 === i[e] && (i[e] = { enabled: !0 }),
                  "object" != typeof i[e] ||
                    "enabled" in i[e] ||
                    (i[e].enabled = !0),
                  i[e] || (i[e] = { enabled: !1 });
              }
            });
          const a = dt.extend({}, Ot);
          s.useModulesParams(a),
            (s.params = dt.extend({}, a, kt, i)),
            (s.originalParams = dt.extend({}, s.params)),
            (s.passedParams = dt.extend({}, i)),
            (s.$ = rt);
          const n = rt(s.params.el);
          if (((t = n[0]), !t)) return;
          if (n.length > 1) {
            const e = [];
            return (
              n.each((t, s) => {
                const a = dt.extend({}, i, { el: s });
                e.push(new Mt(a));
              }),
              e
            );
          }
          let r;
          return (
            (t.swiper = s),
            n.data("swiper", s),
            t && t.shadowRoot && t.shadowRoot.querySelector
              ? ((r = rt(
                  t.shadowRoot.querySelector("." + s.params.wrapperClass)
                )),
                (r.children = (e) => n.children(e)))
              : (r = n.children("." + s.params.wrapperClass)),
            dt.extend(s, {
              $el: n,
              el: t,
              $wrapperEl: r,
              wrapperEl: r[0],
              classNames: [],
              slides: rt(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === s.params.direction,
              isVertical: () => "vertical" === s.params.direction,
              rtl:
                "rtl" === t.dir.toLowerCase() || "rtl" === n.css("direction"),
              rtlTranslate:
                "horizontal" === s.params.direction &&
                ("rtl" === t.dir.toLowerCase() || "rtl" === n.css("direction")),
              wrongRTL: "-webkit-box" === r.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: s.params.allowSlideNext,
              allowSlidePrev: s.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                  "touchstart",
                  "touchmove",
                  "touchend",
                  "touchcancel",
                ];
                let t = ["mousedown", "mousemove", "mouseup"];
                return (
                  pt.pointerEvents &&
                    (t = ["pointerdown", "pointermove", "pointerup"]),
                  (s.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (s.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  pt.touch || !s.params.simulateTouch
                    ? s.touchEventsTouch
                    : s.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements:
                  "input, select, option, textarea, button, video, label",
                lastClickTime: dt.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: s.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            s.useModules(),
            s.params.init && s.init(),
            s
          );
        }
        slidesPerViewDynamic() {
          const {
            params: e,
            slides: t,
            slidesGrid: i,
            size: s,
            activeIndex: a,
          } = this;
          let n = 1;
          if (e.centeredSlides) {
            let e,
              i = t[a].swiperSlideSize;
            for (let r = a + 1; r < t.length; r += 1)
              t[r] &&
                !e &&
                ((i += t[r].swiperSlideSize), (n += 1), i > s && (e = !0));
            for (let r = a - 1; r >= 0; r -= 1)
              t[r] &&
                !e &&
                ((i += t[r].swiperSlideSize), (n += 1), i > s && (e = !0));
          } else
            for (let r = a + 1; r < t.length; r += 1)
              i[r] - i[a] < s && (n += 1);
          return n;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: i } = e;
          function s() {
            const t = Math.min(
              Math.max(
                e.rtlTranslate ? -1 * e.translate : e.translate,
                e.maxTranslate()
              ),
              e.minTranslate()
            );
            e.setTranslate(t), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let a;
          i.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode
              ? (s(), e.params.autoHeight && e.updateAutoHeight())
              : ((a = e.slideTo(
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                    e.isEnd &&
                    !e.params.centeredSlides
                    ? e.slides.length - 1
                    : e.activeIndex,
                  0,
                  !1,
                  !0
                )),
                a || s()),
            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t = !0) {
          const i = this.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i ||
              ("horizontal" !== e && "vertical" !== e) ||
              (this.$el
                .removeClass(`${this.params.containerModifierClass}${i}`)
                .addClass(`${this.params.containerModifierClass}${e}`),
              (this.params.direction = e),
              this.slides.each((t, i) => {
                "vertical" === e ? (i.style.width = "") : (i.style.height = "");
              }),
              this.emit("changeDirection"),
              t && this.update()),
            this
          );
        }
        init() {
          this.initialized ||
            (this.emit("beforeInit"),
            this.params.breakpoints && this.setBreakpoint(),
            this.addClasses(),
            this.params.loop && this.loopCreate(),
            this.updateSize(),
            this.updateSlides(),
            this.params.watchOverflow && this.checkOverflow(),
            this.params.grabCursor && this.setGrabCursor(),
            this.params.preloadImages && this.preloadImages(),
            this.slideTo(
              this.params.loop
                ? this.params.initialSlide + this.loopedSlides
                : this.params.initialSlide,
              0,
              this.params.runCallbacksOnInit
            ),
            this.attachEvents(),
            (this.initialized = !0),
            this.emit("init"));
        }
        destroy(e = !0, t = !0) {
          const i = this,
            { params: s, $el: a, $wrapperEl: n, slides: r } = i;
          return (
            void 0 === i.params ||
              i.destroyed ||
              (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              s.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                a.removeAttr("style"),
                n.removeAttr("style"),
                r &&
                  r.length &&
                  r
                    .removeClass(
                      [
                        s.slideVisibleClass,
                        s.slideActiveClass,
                        s.slideNextClass,
                        s.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach((e) => {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                i.$el.data("swiper", null),
                dt.deleteProps(i)),
              (i.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          dt.extend(kt, e);
        }
        static get extendedDefaults() {
          return kt;
        }
        static get defaults() {
          return Ot;
        }
        static get Class() {
          return ht;
        }
        static get $() {
          return rt;
        }
      }
      var Lt = {
          name: "device",
          proto: { device: wt },
          static: { device: wt },
        },
        Pt = {
          name: "support",
          proto: { support: pt },
          static: { support: pt },
        };
      const $t = {
        isEdge: !!at.navigator.userAgent.match(/Edge/g),
        isSafari: (function () {
          const e = at.navigator.userAgent.toLowerCase();
          return (
            e.indexOf("safari") >= 0 &&
            e.indexOf("chrome") < 0 &&
            e.indexOf("android") < 0
          );
        })(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          at.navigator.userAgent
        ),
      };
      var zt = {
          name: "browser",
          proto: { browser: $t },
          static: { browser: $t },
        },
        Dt = {
          name: "resize",
          create() {
            const e = this;
            dt.extend(e, {
              resize: {
                resizeHandler() {
                  e &&
                    !e.destroyed &&
                    e.initialized &&
                    (e.emit("beforeResize"), e.emit("resize"));
                },
                orientationChangeHandler() {
                  e &&
                    !e.destroyed &&
                    e.initialized &&
                    e.emit("orientationchange");
                },
              },
            });
          },
          on: {
            init() {
              at.addEventListener("resize", this.resize.resizeHandler),
                at.addEventListener(
                  "orientationchange",
                  this.resize.orientationChangeHandler
                );
            },
            destroy() {
              at.removeEventListener("resize", this.resize.resizeHandler),
                at.removeEventListener(
                  "orientationchange",
                  this.resize.orientationChangeHandler
                );
            },
          },
        };
      const Nt = {
        func: at.MutationObserver || at.WebkitMutationObserver,
        attach(e, t = {}) {
          const i = this,
            s = new (0, Nt.func)((e) => {
              if (1 === e.length) return void i.emit("observerUpdate", e[0]);
              const t = function () {
                i.emit("observerUpdate", e[0]);
              };
              at.requestAnimationFrame
                ? at.requestAnimationFrame(t)
                : at.setTimeout(t, 0);
            });
          s.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            i.observer.observers.push(s);
        },
        init() {
          const e = this;
          if (pt.observer && e.params.observer) {
            if (e.params.observeParents) {
              const t = e.$el.parents();
              for (let i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
            }
            e.observer.attach(e.$el[0], {
              childList: e.params.observeSlideChildren,
            }),
              e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
          }
        },
        destroy() {
          this.observer.observers.forEach((e) => {
            e.disconnect();
          }),
            (this.observer.observers = []);
        },
      };
      var Rt = {
        name: "observer",
        params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
        create() {
          dt.extend(this, {
            observer: {
              init: Nt.init.bind(this),
              attach: Nt.attach.bind(this),
              destroy: Nt.destroy.bind(this),
              observers: [],
            },
          });
        },
        on: {
          init() {
            this.observer.init();
          },
          destroy() {
            this.observer.destroy();
          },
        },
      };
      const Bt = {
        update(e) {
          const t = this,
            {
              slidesPerView: i,
              slidesPerGroup: s,
              centeredSlides: a,
            } = t.params,
            { addSlidesBefore: n, addSlidesAfter: r } = t.params.virtual,
            {
              from: o,
              to: l,
              slides: d,
              slidesGrid: p,
              renderSlide: h,
              offset: c,
            } = t.virtual;
          t.updateActiveIndex();
          const u = t.activeIndex || 0;
          let g, f, m;
          (g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
            a
              ? ((f = Math.floor(i / 2) + s + n),
                (m = Math.floor(i / 2) + s + r))
              : ((f = i + (s - 1) + n), (m = s + r));
          const b = Math.max((u || 0) - m, 0),
            w = Math.min((u || 0) + f, d.length - 1),
            v = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);
          function x() {
            t.updateSlides(),
              t.updateProgress(),
              t.updateSlidesClasses(),
              t.lazy && t.params.lazy.enabled && t.lazy.load();
          }
          if (
            (dt.extend(t.virtual, {
              from: b,
              to: w,
              offset: v,
              slidesGrid: t.slidesGrid,
            }),
            o === b && l === w && !e)
          )
            return (
              t.slidesGrid !== p && v !== c && t.slides.css(g, v + "px"),
              void t.updateProgress()
            );
          if (t.params.virtual.renderExternal)
            return (
              t.params.virtual.renderExternal.call(t, {
                offset: v,
                from: b,
                to: w,
                slides: (function () {
                  const e = [];
                  for (let t = b; t <= w; t += 1) e.push(d[t]);
                  return e;
                })(),
              }),
              void x()
            );
          const y = [],
            E = [];
          if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
          else
            for (let S = o; S <= l; S += 1)
              (S < b || S > w) &&
                t.$wrapperEl
                  .find(
                    `.${t.params.slideClass}[data-swiper-slide-index="${S}"]`
                  )
                  .remove();
          for (let S = 0; S < d.length; S += 1)
            S >= b &&
              S <= w &&
              (void 0 === l || e
                ? E.push(S)
                : (S > l && E.push(S), S < o && y.push(S)));
          E.forEach((e) => {
            t.$wrapperEl.append(h(d[e], e));
          }),
            y
              .sort((e, t) => t - e)
              .forEach((e) => {
                t.$wrapperEl.prepend(h(d[e], e));
              }),
            t.$wrapperEl.children(".swiper-slide").css(g, v + "px"),
            x();
        },
        renderSlide(e, t) {
          const i = this.params.virtual;
          if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
          const s = rt(
            i.renderSlide
              ? i.renderSlide.call(this, e, t)
              : `<div class="${this.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
          );
          return (
            s.attr("data-swiper-slide-index") ||
              s.attr("data-swiper-slide-index", t),
            i.cache && (this.virtual.cache[t] = s),
            s
          );
        },
        appendSlide(e) {
          const t = this;
          if ("object" == typeof e && "length" in e)
            for (let i = 0; i < e.length; i += 1)
              e[i] && t.virtual.slides.push(e[i]);
          else t.virtual.slides.push(e);
          t.virtual.update(!0);
        },
        prependSlide(e) {
          const t = this,
            i = t.activeIndex;
          let s = i + 1,
            a = 1;
          if (Array.isArray(e)) {
            for (let i = 0; i < e.length; i += 1)
              e[i] && t.virtual.slides.unshift(e[i]);
            (s = i + e.length), (a = e.length);
          } else t.virtual.slides.unshift(e);
          if (t.params.virtual.cache) {
            const e = t.virtual.cache,
              i = {};
            Object.keys(e).forEach((t) => {
              const s = e[t],
                n = s.attr("data-swiper-slide-index");
              n && s.attr("data-swiper-slide-index", parseInt(n, 10) + 1),
                (i[parseInt(t, 10) + a] = s);
            }),
              (t.virtual.cache = i);
          }
          t.virtual.update(!0), t.slideTo(s, 0);
        },
        removeSlide(e) {
          const t = this;
          if (null == e) return;
          let i = t.activeIndex;
          if (Array.isArray(e))
            for (let s = e.length - 1; s >= 0; s -= 1)
              t.virtual.slides.splice(e[s], 1),
                t.params.virtual.cache && delete t.virtual.cache[e[s]],
                e[s] < i && (i -= 1),
                (i = Math.max(i, 0));
          else
            t.virtual.slides.splice(e, 1),
              t.params.virtual.cache && delete t.virtual.cache[e],
              e < i && (i -= 1),
              (i = Math.max(i, 0));
          t.virtual.update(!0), t.slideTo(i, 0);
        },
        removeAllSlides() {
          (this.virtual.slides = []),
            this.params.virtual.cache && (this.virtual.cache = {}),
            this.virtual.update(!0),
            this.slideTo(0, 0);
        },
      };
      var _t = {
        name: "virtual",
        params: {
          virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
          },
        },
        create() {
          dt.extend(this, {
            virtual: {
              update: Bt.update.bind(this),
              appendSlide: Bt.appendSlide.bind(this),
              prependSlide: Bt.prependSlide.bind(this),
              removeSlide: Bt.removeSlide.bind(this),
              removeAllSlides: Bt.removeAllSlides.bind(this),
              renderSlide: Bt.renderSlide.bind(this),
              slides: this.params.virtual.slides,
              cache: {},
            },
          });
        },
        on: {
          beforeInit() {
            if (!this.params.virtual.enabled) return;
            this.classNames.push(
              this.params.containerModifierClass + "virtual"
            );
            const e = { watchSlidesProgress: !0 };
            dt.extend(this.params, e),
              dt.extend(this.originalParams, e),
              this.params.initialSlide || this.virtual.update();
          },
          setTranslate() {
            this.params.virtual.enabled && this.virtual.update();
          },
        },
      };
      const Gt = {
        handle(e) {
          const t = this,
            { rtlTranslate: i } = t;
          let s = e;
          s.originalEvent && (s = s.originalEvent);
          const a = s.keyCode || s.charCode,
            n = t.params.keyboard.pageUpDown,
            r = n && 33 === a,
            o = n && 34 === a,
            l = 37 === a,
            d = 39 === a,
            p = 38 === a,
            h = 40 === a;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && d) || (t.isVertical() && h) || o)
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && l) || (t.isVertical() && p) || r)
          )
            return !1;
          if (
            !(
              s.shiftKey ||
              s.altKey ||
              s.ctrlKey ||
              s.metaKey ||
              (it.activeElement &&
                it.activeElement.nodeName &&
                ("input" === it.activeElement.nodeName.toLowerCase() ||
                  "textarea" === it.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              t.params.keyboard.onlyInViewport &&
              (r || o || l || d || p || h)
            ) {
              let e = !1;
              if (
                t.$el.parents("." + t.params.slideClass).length > 0 &&
                0 === t.$el.parents("." + t.params.slideActiveClass).length
              )
                return;
              const s = at.innerWidth,
                a = at.innerHeight,
                n = t.$el.offset();
              i && (n.left -= t.$el[0].scrollLeft);
              const r = [
                [n.left, n.top],
                [n.left + t.width, n.top],
                [n.left, n.top + t.height],
                [n.left + t.width, n.top + t.height],
              ];
              for (let t = 0; t < r.length; t += 1) {
                const i = r[t];
                i[0] >= 0 && i[0] <= s && i[1] >= 0 && i[1] <= a && (e = !0);
              }
              if (!e) return;
            }
            t.isHorizontal()
              ? ((r || o || l || d) &&
                  (s.preventDefault
                    ? s.preventDefault()
                    : (s.returnValue = !1)),
                (((o || d) && !i) || ((r || l) && i)) && t.slideNext(),
                (((r || l) && !i) || ((o || d) && i)) && t.slidePrev())
              : ((r || o || p || h) &&
                  (s.preventDefault
                    ? s.preventDefault()
                    : (s.returnValue = !1)),
                (o || h) && t.slideNext(),
                (r || p) && t.slidePrev()),
              t.emit("keyPress", a);
          }
        },
        enable() {
          this.keyboard.enabled ||
            (rt(it).on("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !0));
        },
        disable() {
          this.keyboard.enabled &&
            (rt(it).off("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !1));
        },
      };
      var Ht = {
        name: "keyboard",
        params: {
          keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
        },
        create() {
          dt.extend(this, {
            keyboard: {
              enabled: !1,
              enable: Gt.enable.bind(this),
              disable: Gt.disable.bind(this),
              handle: Gt.handle.bind(this),
            },
          });
        },
        on: {
          init() {
            this.params.keyboard.enabled && this.keyboard.enable();
          },
          destroy() {
            this.keyboard.enabled && this.keyboard.disable();
          },
        },
      };
      const jt = {
          lastScrollTime: dt.now(),
          lastEventBeforeSnap: void 0,
          recentWheelEvents: [],
          event: () =>
            at.navigator.userAgent.indexOf("firefox") > -1
              ? "DOMMouseScroll"
              : (function () {
                  let e = "onwheel" in it;
                  if (!e) {
                    const t = it.createElement("div");
                    t.setAttribute("onwheel", "return;"),
                      (e = "function" == typeof t.onwheel);
                  }
                  return (
                    !e &&
                      it.implementation &&
                      it.implementation.hasFeature &&
                      !0 !== it.implementation.hasFeature("", "") &&
                      (e = it.implementation.hasFeature("Events.wheel", "3.0")),
                    e
                  );
                })()
              ? "wheel"
              : "mousewheel",
          normalize(e) {
            let t = 0,
              i = 0,
              s = 0,
              a = 0;
            return (
              "detail" in e && (i = e.detail),
              "wheelDelta" in e && (i = -e.wheelDelta / 120),
              "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
              "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
              "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
              (s = 10 * t),
              (a = 10 * i),
              "deltaY" in e && (a = e.deltaY),
              "deltaX" in e && (s = e.deltaX),
              e.shiftKey && !s && ((s = a), (a = 0)),
              (s || a) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((s *= 40), (a *= 40))
                  : ((s *= 800), (a *= 800))),
              s && !t && (t = s < 1 ? -1 : 1),
              a && !i && (i = a < 1 ? -1 : 1),
              { spinX: t, spinY: i, pixelX: s, pixelY: a }
            );
          },
          handleMouseEnter() {
            this.mouseEntered = !0;
          },
          handleMouseLeave() {
            this.mouseEntered = !1;
          },
          handle(e) {
            let t = e;
            const i = this,
              s = i.params.mousewheel;
            i.params.cssMode && t.preventDefault();
            let a = i.$el;
            if (
              ("container" !== i.params.mousewheel.eventsTarged &&
                (a = rt(i.params.mousewheel.eventsTarged)),
              !i.mouseEntered && !a[0].contains(t.target) && !s.releaseOnEdges)
            )
              return !0;
            t.originalEvent && (t = t.originalEvent);
            let n = 0;
            const r = i.rtlTranslate ? -1 : 1,
              o = jt.normalize(t);
            if (s.forceToAxis)
              if (i.isHorizontal()) {
                if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                n = -o.pixelX * r;
              } else {
                if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                n = -o.pixelY;
              }
            else
              n =
                Math.abs(o.pixelX) > Math.abs(o.pixelY)
                  ? -o.pixelX * r
                  : -o.pixelY;
            if (0 === n) return !0;
            if ((s.invert && (n = -n), i.params.freeMode)) {
              const e = {
                  time: dt.now(),
                  delta: Math.abs(n),
                  direction: Math.sign(n),
                },
                { lastEventBeforeSnap: a } = i.mousewheel,
                r =
                  a &&
                  e.time < a.time + 500 &&
                  e.delta <= a.delta &&
                  e.direction === a.direction;
              if (!r) {
                (i.mousewheel.lastEventBeforeSnap = void 0),
                  i.params.loop && i.loopFix();
                let a = i.getTranslate() + n * s.sensitivity;
                const o = i.isBeginning,
                  l = i.isEnd;
                if (
                  (a >= i.minTranslate() && (a = i.minTranslate()),
                  a <= i.maxTranslate() && (a = i.maxTranslate()),
                  i.setTransition(0),
                  i.setTranslate(a),
                  i.updateProgress(),
                  i.updateActiveIndex(),
                  i.updateSlidesClasses(),
                  ((!o && i.isBeginning) || (!l && i.isEnd)) &&
                    i.updateSlidesClasses(),
                  i.params.freeModeSticky)
                ) {
                  clearTimeout(i.mousewheel.timeout),
                    (i.mousewheel.timeout = void 0);
                  const t = i.mousewheel.recentWheelEvents;
                  t.length >= 15 && t.shift();
                  const s = t.length ? t[t.length - 1] : void 0,
                    a = t[0];
                  if (
                    (t.push(e),
                    s && (e.delta > s.delta || e.direction !== s.direction))
                  )
                    t.splice(0);
                  else if (
                    t.length >= 15 &&
                    e.time - a.time < 500 &&
                    a.delta - e.delta >= 1 &&
                    e.delta <= 6
                  ) {
                    const s = n > 0 ? 0.8 : 0.2;
                    (i.mousewheel.lastEventBeforeSnap = e),
                      t.splice(0),
                      (i.mousewheel.timeout = dt.nextTick(() => {
                        i.slideToClosest(i.params.speed, !0, void 0, s);
                      }, 0));
                  }
                  i.mousewheel.timeout ||
                    (i.mousewheel.timeout = dt.nextTick(() => {
                      (i.mousewheel.lastEventBeforeSnap = e),
                        t.splice(0),
                        i.slideToClosest(i.params.speed, !0, void 0, 0.5);
                    }, 500));
                }
                if (
                  (r || i.emit("scroll", t),
                  i.params.autoplay &&
                    i.params.autoplayDisableOnInteraction &&
                    i.autoplay.stop(),
                  a === i.minTranslate() || a === i.maxTranslate())
                )
                  return !0;
              }
            } else {
              const t = {
                  time: dt.now(),
                  delta: Math.abs(n),
                  direction: Math.sign(n),
                  raw: e,
                },
                s = i.mousewheel.recentWheelEvents;
              s.length >= 2 && s.shift();
              const a = s.length ? s[s.length - 1] : void 0;
              if (
                (s.push(t),
                a
                  ? (t.direction !== a.direction ||
                      t.delta > a.delta ||
                      t.time > a.time + 150) &&
                    i.mousewheel.animateSlider(t)
                  : i.mousewheel.animateSlider(t),
                i.mousewheel.releaseScroll(t))
              )
                return !0;
            }
            return (
              t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
            );
          },
          animateSlider(e) {
            return (
              (e.delta >= 6 &&
                dt.now() - this.mousewheel.lastScrollTime < 60) ||
              (e.direction < 0
                ? (this.isEnd && !this.params.loop) ||
                  this.animating ||
                  (this.slideNext(), this.emit("scroll", e.raw))
                : (this.isBeginning && !this.params.loop) ||
                  this.animating ||
                  (this.slidePrev(), this.emit("scroll", e.raw)),
              (this.mousewheel.lastScrollTime = new at.Date().getTime()),
              !1)
            );
          },
          releaseScroll(e) {
            const t = this.params.mousewheel;
            if (e.direction < 0) {
              if (this.isEnd && !this.params.loop && t.releaseOnEdges)
                return !0;
            } else if (
              this.isBeginning &&
              !this.params.loop &&
              t.releaseOnEdges
            )
              return !0;
            return !1;
          },
          enable() {
            const e = jt.event();
            if (this.params.cssMode)
              return (
                this.wrapperEl.removeEventListener(e, this.mousewheel.handle),
                !0
              );
            if (!e) return !1;
            if (this.mousewheel.enabled) return !1;
            let t = this.$el;
            return (
              "container" !== this.params.mousewheel.eventsTarged &&
                (t = rt(this.params.mousewheel.eventsTarged)),
              t.on("mouseenter", this.mousewheel.handleMouseEnter),
              t.on("mouseleave", this.mousewheel.handleMouseLeave),
              t.on(e, this.mousewheel.handle),
              (this.mousewheel.enabled = !0),
              !0
            );
          },
          disable() {
            const e = jt.event();
            if (this.params.cssMode)
              return (
                this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0
              );
            if (!e) return !1;
            if (!this.mousewheel.enabled) return !1;
            let t = this.$el;
            return (
              "container" !== this.params.mousewheel.eventsTarged &&
                (t = rt(this.params.mousewheel.eventsTarged)),
              t.off(e, this.mousewheel.handle),
              (this.mousewheel.enabled = !1),
              !0
            );
          },
        },
        Ft = {
          update() {
            const e = this.params.navigation;
            if (this.params.loop) return;
            const { $nextEl: t, $prevEl: i } = this.navigation;
            i &&
              i.length > 0 &&
              (this.isBeginning
                ? i.addClass(e.disabledClass)
                : i.removeClass(e.disabledClass),
              i[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.lockClass)),
              t &&
                t.length > 0 &&
                (this.isEnd
                  ? t.addClass(e.disabledClass)
                  : t.removeClass(e.disabledClass),
                t[
                  this.params.watchOverflow && this.isLocked
                    ? "addClass"
                    : "removeClass"
                ](e.lockClass));
          },
          onPrevClick(e) {
            e.preventDefault(),
              (this.isBeginning && !this.params.loop) || this.slidePrev();
          },
          onNextClick(e) {
            e.preventDefault(),
              (this.isEnd && !this.params.loop) || this.slideNext();
          },
          init() {
            const e = this.params.navigation;
            if (!e.nextEl && !e.prevEl) return;
            let t, i;
            e.nextEl &&
              ((t = rt(e.nextEl)),
              this.params.uniqueNavElements &&
                "string" == typeof e.nextEl &&
                t.length > 1 &&
                1 === this.$el.find(e.nextEl).length &&
                (t = this.$el.find(e.nextEl))),
              e.prevEl &&
                ((i = rt(e.prevEl)),
                this.params.uniqueNavElements &&
                  "string" == typeof e.prevEl &&
                  i.length > 1 &&
                  1 === this.$el.find(e.prevEl).length &&
                  (i = this.$el.find(e.prevEl))),
              t && t.length > 0 && t.on("click", this.navigation.onNextClick),
              i && i.length > 0 && i.on("click", this.navigation.onPrevClick),
              dt.extend(this.navigation, {
                $nextEl: t,
                nextEl: t && t[0],
                $prevEl: i,
                prevEl: i && i[0],
              });
          },
          destroy() {
            const { $nextEl: e, $prevEl: t } = this.navigation;
            e &&
              e.length &&
              (e.off("click", this.navigation.onNextClick),
              e.removeClass(this.params.navigation.disabledClass)),
              t &&
                t.length &&
                (t.off("click", this.navigation.onPrevClick),
                t.removeClass(this.params.navigation.disabledClass));
          },
        },
        Vt = {
          update() {
            const e = this,
              t = e.rtl,
              i = e.params.pagination;
            if (
              !i.el ||
              !e.pagination.el ||
              !e.pagination.$el ||
              0 === e.pagination.$el.length
            )
              return;
            const s =
                e.virtual && e.params.virtual.enabled
                  ? e.virtual.slides.length
                  : e.slides.length,
              a = e.pagination.$el;
            let n;
            const r = e.params.loop
              ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
            if (
              (e.params.loop
                ? ((n = Math.ceil(
                    (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                  )),
                  n > s - 1 - 2 * e.loopedSlides &&
                    (n -= s - 2 * e.loopedSlides),
                  n > r - 1 && (n -= r),
                  n < 0 && "bullets" !== e.params.paginationType && (n = r + n))
                : (n =
                    void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
              "bullets" === i.type &&
                e.pagination.bullets &&
                e.pagination.bullets.length > 0)
            ) {
              const s = e.pagination.bullets;
              let r, o, l;
              if (
                (i.dynamicBullets &&
                  ((e.pagination.bulletSize = s
                    .eq(0)
                    [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  a.css(
                    e.isHorizontal() ? "width" : "height",
                    e.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"
                  ),
                  i.dynamicMainBullets > 1 &&
                    void 0 !== e.previousIndex &&
                    ((e.pagination.dynamicBulletIndex += n - e.previousIndex),
                    e.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1
                      ? (e.pagination.dynamicBulletIndex =
                          i.dynamicMainBullets - 1)
                      : e.pagination.dynamicBulletIndex < 0 &&
                        (e.pagination.dynamicBulletIndex = 0)),
                  (r = n - e.pagination.dynamicBulletIndex),
                  (o = r + (Math.min(s.length, i.dynamicMainBullets) - 1)),
                  (l = (o + r) / 2)),
                s.removeClass(
                  `${i.bulletActiveClass} ${i.bulletActiveClass}-next ${i.bulletActiveClass}-next-next ${i.bulletActiveClass}-prev ${i.bulletActiveClass}-prev-prev ${i.bulletActiveClass}-main`
                ),
                a.length > 1)
              )
                s.each((e, t) => {
                  const s = rt(t),
                    a = s.index();
                  a === n && s.addClass(i.bulletActiveClass),
                    i.dynamicBullets &&
                      (a >= r &&
                        a <= o &&
                        s.addClass(i.bulletActiveClass + "-main"),
                      a === r &&
                        s
                          .prev()
                          .addClass(i.bulletActiveClass + "-prev")
                          .prev()
                          .addClass(i.bulletActiveClass + "-prev-prev"),
                      a === o &&
                        s
                          .next()
                          .addClass(i.bulletActiveClass + "-next")
                          .next()
                          .addClass(i.bulletActiveClass + "-next-next"));
                });
              else {
                const t = s.eq(n),
                  a = t.index();
                if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
                  const t = s.eq(r),
                    n = s.eq(o);
                  for (let e = r; e <= o; e += 1)
                    s.eq(e).addClass(i.bulletActiveClass + "-main");
                  if (e.params.loop)
                    if (a >= s.length - i.dynamicMainBullets) {
                      for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                        s.eq(s.length - e).addClass(
                          i.bulletActiveClass + "-main"
                        );
                      s.eq(s.length - i.dynamicMainBullets - 1).addClass(
                        i.bulletActiveClass + "-prev"
                      );
                    } else
                      t
                        .prev()
                        .addClass(i.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(i.bulletActiveClass + "-prev-prev"),
                        n
                          .next()
                          .addClass(i.bulletActiveClass + "-next")
                          .next()
                          .addClass(i.bulletActiveClass + "-next-next");
                  else
                    t
                      .prev()
                      .addClass(i.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(i.bulletActiveClass + "-prev-prev"),
                      n
                        .next()
                        .addClass(i.bulletActiveClass + "-next")
                        .next()
                        .addClass(i.bulletActiveClass + "-next-next");
                }
              }
              if (i.dynamicBullets) {
                const a = Math.min(s.length, i.dynamicMainBullets + 4),
                  n =
                    (e.pagination.bulletSize * a - e.pagination.bulletSize) /
                      2 -
                    l * e.pagination.bulletSize,
                  r = t ? "right" : "left";
                s.css(e.isHorizontal() ? r : "top", n + "px");
              }
            }
            if (
              ("fraction" === i.type &&
                (a
                  .find("." + i.currentClass)
                  .text(i.formatFractionCurrent(n + 1)),
                a.find("." + i.totalClass).text(i.formatFractionTotal(r))),
              "progressbar" === i.type)
            ) {
              let t;
              t = i.progressbarOpposite
                ? e.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : e.isHorizontal()
                ? "horizontal"
                : "vertical";
              const s = (n + 1) / r;
              let o = 1,
                l = 1;
              "horizontal" === t ? (o = s) : (l = s),
                a
                  .find("." + i.progressbarFillClass)
                  .transform(`translate3d(0,0,0) scaleX(${o}) scaleY(${l})`)
                  .transition(e.params.speed);
            }
            "custom" === i.type && i.renderCustom
              ? (a.html(i.renderCustom(e, n + 1, r)),
                e.emit("paginationRender", e, a[0]))
              : e.emit("paginationUpdate", e, a[0]),
              a[
                e.params.watchOverflow && e.isLocked
                  ? "addClass"
                  : "removeClass"
              ](i.lockClass);
          },
          render() {
            const e = this,
              t = e.params.pagination;
            if (
              !t.el ||
              !e.pagination.el ||
              !e.pagination.$el ||
              0 === e.pagination.$el.length
            )
              return;
            const i = e.pagination.$el;
            let s = "";
            if ("bullets" === t.type) {
              const a = e.params.loop
                ? Math.ceil(
                    ((e.virtual && e.params.virtual.enabled
                      ? e.virtual.slides.length
                      : e.slides.length) -
                      2 * e.loopedSlides) /
                      e.params.slidesPerGroup
                  )
                : e.snapGrid.length;
              for (let i = 0; i < a; i += 1)
                s += t.renderBullet
                  ? t.renderBullet.call(e, i, t.bulletClass)
                  : `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
              i.html(s), (e.pagination.bullets = i.find("." + t.bulletClass));
            }
            "fraction" === t.type &&
              ((s = t.renderFraction
                ? t.renderFraction.call(e, t.currentClass, t.totalClass)
                : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
              i.html(s)),
              "progressbar" === t.type &&
                ((s = t.renderProgressbar
                  ? t.renderProgressbar.call(e, t.progressbarFillClass)
                  : `<span class="${t.progressbarFillClass}"></span>`),
                i.html(s)),
              "custom" !== t.type &&
                e.emit("paginationRender", e.pagination.$el[0]);
          },
          init() {
            const e = this,
              t = e.params.pagination;
            if (!t.el) return;
            let i = rt(t.el);
            0 !== i.length &&
              (e.params.uniqueNavElements &&
                "string" == typeof t.el &&
                i.length > 1 &&
                (i = e.$el.find(t.el)),
              "bullets" === t.type &&
                t.clickable &&
                i.addClass(t.clickableClass),
              i.addClass(t.modifierClass + t.type),
              "bullets" === t.type &&
                t.dynamicBullets &&
                (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
                (e.pagination.dynamicBulletIndex = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
              "progressbar" === t.type &&
                t.progressbarOpposite &&
                i.addClass(t.progressbarOppositeClass),
              t.clickable &&
                i.on("click", "." + t.bulletClass, function (t) {
                  t.preventDefault();
                  let i = rt(this).index() * e.params.slidesPerGroup;
                  e.params.loop && (i += e.loopedSlides), e.slideTo(i);
                }),
              dt.extend(e.pagination, { $el: i, el: i[0] }));
          },
          destroy() {
            const e = this.params.pagination;
            if (
              !e.el ||
              !this.pagination.el ||
              !this.pagination.$el ||
              0 === this.pagination.$el.length
            )
              return;
            const t = this.pagination.$el;
            t.removeClass(e.hiddenClass),
              t.removeClass(e.modifierClass + e.type),
              this.pagination.bullets &&
                this.pagination.bullets.removeClass(e.bulletActiveClass),
              e.clickable && t.off("click", "." + e.bulletClass);
          },
        },
        Yt = {
          setTranslate() {
            if (!this.params.scrollbar.el || !this.scrollbar.el) return;
            const { scrollbar: e, rtlTranslate: t, progress: i } = this,
              { dragSize: s, trackSize: a, $dragEl: n, $el: r } = e,
              o = this.params.scrollbar;
            let l = s,
              d = (a - s) * i;
            t
              ? ((d = -d),
                d > 0 ? ((l = s - d), (d = 0)) : -d + s > a && (l = a + d))
              : d < 0
              ? ((l = s + d), (d = 0))
              : d + s > a && (l = a - d),
              this.isHorizontal()
                ? (n.transform(`translate3d(${d}px, 0, 0)`),
                  (n[0].style.width = l + "px"))
                : (n.transform(`translate3d(0px, ${d}px, 0)`),
                  (n[0].style.height = l + "px")),
              o.hide &&
                (clearTimeout(this.scrollbar.timeout),
                (r[0].style.opacity = 1),
                (this.scrollbar.timeout = setTimeout(() => {
                  (r[0].style.opacity = 0), r.transition(400);
                }, 1e3)));
          },
          setTransition(e) {
            this.params.scrollbar.el &&
              this.scrollbar.el &&
              this.scrollbar.$dragEl.transition(e);
          },
          updateSize() {
            if (!this.params.scrollbar.el || !this.scrollbar.el) return;
            const { scrollbar: e } = this,
              { $dragEl: t, $el: i } = e;
            (t[0].style.width = ""), (t[0].style.height = "");
            const s = this.isHorizontal()
                ? i[0].offsetWidth
                : i[0].offsetHeight,
              a = this.size / this.virtualSize,
              n = a * (s / this.size);
            let r;
            (r =
              "auto" === this.params.scrollbar.dragSize
                ? s * a
                : parseInt(this.params.scrollbar.dragSize, 10)),
              this.isHorizontal()
                ? (t[0].style.width = r + "px")
                : (t[0].style.height = r + "px"),
              (i[0].style.display = a >= 1 ? "none" : ""),
              this.params.scrollbar.hide && (i[0].style.opacity = 0),
              dt.extend(e, {
                trackSize: s,
                divider: a,
                moveDivider: n,
                dragSize: r,
              }),
              e.$el[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](this.params.scrollbar.lockClass);
          },
          getPointerPosition(e) {
            return this.isHorizontal()
              ? "touchstart" === e.type || "touchmove" === e.type
                ? e.targetTouches[0].clientX
                : e.clientX
              : "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].clientY
              : e.clientY;
          },
          setDragPosition(e) {
            const { scrollbar: t, rtlTranslate: i } = this,
              { $el: s, dragSize: a, trackSize: n, dragStartPos: r } = t;
            let o;
            (o =
              (t.getPointerPosition(e) -
                s.offset()[this.isHorizontal() ? "left" : "top"] -
                (null !== r ? r : a / 2)) /
              (n - a)),
              (o = Math.max(Math.min(o, 1), 0)),
              i && (o = 1 - o);
            const l =
              this.minTranslate() +
              (this.maxTranslate() - this.minTranslate()) * o;
            this.updateProgress(l),
              this.setTranslate(l),
              this.updateActiveIndex(),
              this.updateSlidesClasses();
          },
          onDragStart(e) {
            const t = this.params.scrollbar,
              { scrollbar: i, $wrapperEl: s } = this,
              { $el: a, $dragEl: n } = i;
            (this.scrollbar.isTouched = !0),
              (this.scrollbar.dragStartPos =
                e.target === n[0] || e.target === n
                  ? i.getPointerPosition(e) -
                    e.target.getBoundingClientRect()[
                      this.isHorizontal() ? "left" : "top"
                    ]
                  : null),
              e.preventDefault(),
              e.stopPropagation(),
              s.transition(100),
              n.transition(100),
              i.setDragPosition(e),
              clearTimeout(this.scrollbar.dragTimeout),
              a.transition(0),
              t.hide && a.css("opacity", 1),
              this.params.cssMode &&
                this.$wrapperEl.css("scroll-snap-type", "none"),
              this.emit("scrollbarDragStart", e);
          },
          onDragMove(e) {
            const { scrollbar: t, $wrapperEl: i } = this,
              { $el: s, $dragEl: a } = t;
            this.scrollbar.isTouched &&
              (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              t.setDragPosition(e),
              i.transition(0),
              s.transition(0),
              a.transition(0),
              this.emit("scrollbarDragMove", e));
          },
          onDragEnd(e) {
            const t = this.params.scrollbar,
              { scrollbar: i, $wrapperEl: s } = this,
              { $el: a } = i;
            this.scrollbar.isTouched &&
              ((this.scrollbar.isTouched = !1),
              this.params.cssMode &&
                (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
              t.hide &&
                (clearTimeout(this.scrollbar.dragTimeout),
                (this.scrollbar.dragTimeout = dt.nextTick(() => {
                  a.css("opacity", 0), a.transition(400);
                }, 1e3))),
              this.emit("scrollbarDragEnd", e),
              t.snapOnRelease && this.slideToClosest());
          },
          enableDraggable() {
            if (!this.params.scrollbar.el) return;
            const {
                scrollbar: e,
                touchEventsTouch: t,
                touchEventsDesktop: i,
                params: s,
              } = this,
              a = e.$el[0],
              n = !(!pt.passiveListener || !s.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              r = !(!pt.passiveListener || !s.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            pt.touch
              ? (a.addEventListener(t.start, this.scrollbar.onDragStart, n),
                a.addEventListener(t.move, this.scrollbar.onDragMove, n),
                a.addEventListener(t.end, this.scrollbar.onDragEnd, r))
              : (a.addEventListener(i.start, this.scrollbar.onDragStart, n),
                it.addEventListener(i.move, this.scrollbar.onDragMove, n),
                it.addEventListener(i.end, this.scrollbar.onDragEnd, r));
          },
          disableDraggable() {
            if (!this.params.scrollbar.el) return;
            const {
                scrollbar: e,
                touchEventsTouch: t,
                touchEventsDesktop: i,
                params: s,
              } = this,
              a = e.$el[0],
              n = !(!pt.passiveListener || !s.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              r = !(!pt.passiveListener || !s.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            pt.touch
              ? (a.removeEventListener(t.start, this.scrollbar.onDragStart, n),
                a.removeEventListener(t.move, this.scrollbar.onDragMove, n),
                a.removeEventListener(t.end, this.scrollbar.onDragEnd, r))
              : (a.removeEventListener(i.start, this.scrollbar.onDragStart, n),
                it.removeEventListener(i.move, this.scrollbar.onDragMove, n),
                it.removeEventListener(i.end, this.scrollbar.onDragEnd, r));
          },
          init() {
            if (!this.params.scrollbar.el) return;
            const { scrollbar: e, $el: t } = this,
              i = this.params.scrollbar;
            let s = rt(i.el);
            this.params.uniqueNavElements &&
              "string" == typeof i.el &&
              s.length > 1 &&
              1 === t.find(i.el).length &&
              (s = t.find(i.el));
            let a = s.find("." + this.params.scrollbar.dragClass);
            0 === a.length &&
              ((a = rt(
                `<div class="${this.params.scrollbar.dragClass}"></div>`
              )),
              s.append(a)),
              dt.extend(e, { $el: s, el: s[0], $dragEl: a, dragEl: a[0] }),
              i.draggable && e.enableDraggable();
          },
          destroy() {
            this.scrollbar.disableDraggable();
          },
        },
        Xt = {
          setTransform(e, t) {
            const { rtl: i } = this,
              s = rt(e),
              a = i ? -1 : 1,
              n = s.attr("data-swiper-parallax") || "0";
            let r = s.attr("data-swiper-parallax-x"),
              o = s.attr("data-swiper-parallax-y");
            const l = s.attr("data-swiper-parallax-scale"),
              d = s.attr("data-swiper-parallax-opacity");
            if (
              (r || o
                ? ((r = r || "0"), (o = o || "0"))
                : this.isHorizontal()
                ? ((r = n), (o = "0"))
                : ((o = n), (r = "0")),
              (r =
                r.indexOf("%") >= 0
                  ? parseInt(r, 10) * t * a + "%"
                  : r * t * a + "px"),
              (o =
                o.indexOf("%") >= 0 ? parseInt(o, 10) * t + "%" : o * t + "px"),
              null != d)
            ) {
              const e = d - (d - 1) * (1 - Math.abs(t));
              s[0].style.opacity = e;
            }
            if (null == l) s.transform(`translate3d(${r}, ${o}, 0px)`);
            else {
              const e = l - (l - 1) * (1 - Math.abs(t));
              s.transform(`translate3d(${r}, ${o}, 0px) scale(${e})`);
            }
          },
          setTranslate() {
            const e = this,
              { $el: t, slides: i, progress: s, snapGrid: a } = e;
            t
              .children(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
              )
              .each((t, i) => {
                e.parallax.setTransform(i, s);
              }),
              i.each((t, i) => {
                let n = i.progress;
                e.params.slidesPerGroup > 1 &&
                  "auto" !== e.params.slidesPerView &&
                  (n += Math.ceil(t / 2) - s * (a.length - 1)),
                  (n = Math.min(Math.max(n, -1), 1)),
                  rt(i)
                    .find(
                      "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                    )
                    .each((t, i) => {
                      e.parallax.setTransform(i, n);
                    });
              });
          },
          setTransition(e = this.params.speed) {
            const { $el: t } = this;
            t.find(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            ).each((t, i) => {
              const s = rt(i);
              let a =
                parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
              0 === e && (a = 0), s.transition(a);
            });
          },
        },
        Kt = {
          getDistanceBetweenTouches: (e) =>
            e.targetTouches.length < 2
              ? 1
              : Math.sqrt(
                  (e.targetTouches[1].pageX - e.targetTouches[0].pageX) ** 2 +
                    (e.targetTouches[1].pageY - e.targetTouches[0].pageY) ** 2
                ),
          onGestureStart(e) {
            const t = this.params.zoom,
              i = this.zoom,
              { gesture: s } = i;
            if (
              ((i.fakeGestureTouched = !1),
              (i.fakeGestureMoved = !1),
              !pt.gestures)
            ) {
              if (
                "touchstart" !== e.type ||
                ("touchstart" === e.type && e.targetTouches.length < 2)
              )
                return;
              (i.fakeGestureTouched = !0),
                (s.scaleStart = Kt.getDistanceBetweenTouches(e));
            }
            (s.$slideEl && s.$slideEl.length) ||
            ((s.$slideEl = rt(e.target).closest("." + this.params.slideClass)),
            0 === s.$slideEl.length &&
              (s.$slideEl = this.slides.eq(this.activeIndex)),
            (s.$imageEl = s.$slideEl.find(
              "img, svg, canvas, picture, .swiper-zoom-target"
            )),
            (s.$imageWrapEl = s.$imageEl.parent("." + t.containerClass)),
            (s.maxRatio =
              s.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
            0 !== s.$imageWrapEl.length)
              ? (s.$imageEl && s.$imageEl.transition(0),
                (this.zoom.isScaling = !0))
              : (s.$imageEl = void 0);
          },
          onGestureChange(e) {
            const t = this.params.zoom,
              i = this.zoom,
              { gesture: s } = i;
            if (!pt.gestures) {
              if (
                "touchmove" !== e.type ||
                ("touchmove" === e.type && e.targetTouches.length < 2)
              )
                return;
              (i.fakeGestureMoved = !0),
                (s.scaleMove = Kt.getDistanceBetweenTouches(e));
            }
            s.$imageEl &&
              0 !== s.$imageEl.length &&
              ((i.scale = pt.gestures
                ? e.scale * i.currentScale
                : (s.scaleMove / s.scaleStart) * i.currentScale),
              i.scale > s.maxRatio &&
                (i.scale = s.maxRatio - 1 + (i.scale - s.maxRatio + 1) ** 0.5),
              i.scale < t.minRatio &&
                (i.scale = t.minRatio + 1 - (t.minRatio - i.scale + 1) ** 0.5),
              s.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`));
          },
          onGestureEnd(e) {
            const t = this.params.zoom,
              i = this.zoom,
              { gesture: s } = i;
            if (!pt.gestures) {
              if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
              if (
                "touchend" !== e.type ||
                ("touchend" === e.type &&
                  e.changedTouches.length < 2 &&
                  !wt.android)
              )
                return;
              (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
            }
            s.$imageEl &&
              0 !== s.$imageEl.length &&
              ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio)),
              s.$imageEl
                .transition(this.params.speed)
                .transform(`translate3d(0,0,0) scale(${i.scale})`),
              (i.currentScale = i.scale),
              (i.isScaling = !1),
              1 === i.scale && (s.$slideEl = void 0));
          },
          onTouchStart(e) {
            const t = this.zoom,
              { gesture: i, image: s } = t;
            i.$imageEl &&
              0 !== i.$imageEl.length &&
              (s.isTouched ||
                (wt.android && e.cancelable && e.preventDefault(),
                (s.isTouched = !0),
                (s.touchesStart.x =
                  "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (s.touchesStart.y =
                  "touchstart" === e.type
                    ? e.targetTouches[0].pageY
                    : e.pageY)));
          },
          onTouchMove(e) {
            const t = this,
              i = t.zoom,
              { gesture: s, image: a, velocity: n } = i;
            if (!s.$imageEl || 0 === s.$imageEl.length) return;
            if (((t.allowClick = !1), !a.isTouched || !s.$slideEl)) return;
            a.isMoved ||
              ((a.width = s.$imageEl[0].offsetWidth),
              (a.height = s.$imageEl[0].offsetHeight),
              (a.startX = dt.getTranslate(s.$imageWrapEl[0], "x") || 0),
              (a.startY = dt.getTranslate(s.$imageWrapEl[0], "y") || 0),
              (s.slideWidth = s.$slideEl[0].offsetWidth),
              (s.slideHeight = s.$slideEl[0].offsetHeight),
              s.$imageWrapEl.transition(0),
              t.rtl && ((a.startX = -a.startX), (a.startY = -a.startY)));
            const r = a.width * i.scale,
              o = a.height * i.scale;
            if (!(r < s.slideWidth && o < s.slideHeight)) {
              if (
                ((a.minX = Math.min(s.slideWidth / 2 - r / 2, 0)),
                (a.maxX = -a.minX),
                (a.minY = Math.min(s.slideHeight / 2 - o / 2, 0)),
                (a.maxY = -a.minY),
                (a.touchesCurrent.x =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (a.touchesCurrent.y =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                !a.isMoved && !i.isScaling)
              ) {
                if (
                  t.isHorizontal() &&
                  ((Math.floor(a.minX) === Math.floor(a.startX) &&
                    a.touchesCurrent.x < a.touchesStart.x) ||
                    (Math.floor(a.maxX) === Math.floor(a.startX) &&
                      a.touchesCurrent.x > a.touchesStart.x))
                )
                  return void (a.isTouched = !1);
                if (
                  !t.isHorizontal() &&
                  ((Math.floor(a.minY) === Math.floor(a.startY) &&
                    a.touchesCurrent.y < a.touchesStart.y) ||
                    (Math.floor(a.maxY) === Math.floor(a.startY) &&
                      a.touchesCurrent.y > a.touchesStart.y))
                )
                  return void (a.isTouched = !1);
              }
              e.cancelable && e.preventDefault(),
                e.stopPropagation(),
                (a.isMoved = !0),
                (a.currentX = a.touchesCurrent.x - a.touchesStart.x + a.startX),
                (a.currentY = a.touchesCurrent.y - a.touchesStart.y + a.startY),
                a.currentX < a.minX &&
                  (a.currentX = a.minX + 1 - (a.minX - a.currentX + 1) ** 0.8),
                a.currentX > a.maxX &&
                  (a.currentX = a.maxX - 1 + (a.currentX - a.maxX + 1) ** 0.8),
                a.currentY < a.minY &&
                  (a.currentY = a.minY + 1 - (a.minY - a.currentY + 1) ** 0.8),
                a.currentY > a.maxY &&
                  (a.currentY = a.maxY - 1 + (a.currentY - a.maxY + 1) ** 0.8),
                n.prevPositionX || (n.prevPositionX = a.touchesCurrent.x),
                n.prevPositionY || (n.prevPositionY = a.touchesCurrent.y),
                n.prevTime || (n.prevTime = Date.now()),
                (n.x =
                  (a.touchesCurrent.x - n.prevPositionX) /
                  (Date.now() - n.prevTime) /
                  2),
                (n.y =
                  (a.touchesCurrent.y - n.prevPositionY) /
                  (Date.now() - n.prevTime) /
                  2),
                Math.abs(a.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0),
                Math.abs(a.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0),
                (n.prevPositionX = a.touchesCurrent.x),
                (n.prevPositionY = a.touchesCurrent.y),
                (n.prevTime = Date.now()),
                s.$imageWrapEl.transform(
                  `translate3d(${a.currentX}px, ${a.currentY}px,0)`
                );
            }
          },
          onTouchEnd() {
            const e = this.zoom,
              { gesture: t, image: i, velocity: s } = e;
            if (!t.$imageEl || 0 === t.$imageEl.length) return;
            if (!i.isTouched || !i.isMoved)
              return (i.isTouched = !1), void (i.isMoved = !1);
            (i.isTouched = !1), (i.isMoved = !1);
            let a = 300,
              n = 300;
            const r = i.currentX + s.x * a,
              o = i.currentY + s.y * n;
            0 !== s.x && (a = Math.abs((r - i.currentX) / s.x)),
              0 !== s.y && (n = Math.abs((o - i.currentY) / s.y));
            const l = Math.max(a, n);
            (i.currentX = r), (i.currentY = o);
            const d = i.height * e.scale;
            (i.minX = Math.min(t.slideWidth / 2 - (i.width * e.scale) / 2, 0)),
              (i.maxX = -i.minX),
              (i.minY = Math.min(t.slideHeight / 2 - d / 2, 0)),
              (i.maxY = -i.minY),
              (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
              (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
              t.$imageWrapEl
                .transition(l)
                .transform(`translate3d(${i.currentX}px, ${i.currentY}px,0)`);
          },
          onTransitionEnd() {
            const e = this.zoom,
              { gesture: t } = e;
            t.$slideEl &&
              this.previousIndex !== this.activeIndex &&
              (t.$imageEl &&
                t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
              t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"),
              (e.scale = 1),
              (e.currentScale = 1),
              (t.$slideEl = void 0),
              (t.$imageEl = void 0),
              (t.$imageWrapEl = void 0));
          },
          toggle(e) {
            const t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e);
          },
          in(e) {
            const t = this.zoom,
              i = this.params.zoom,
              { gesture: s, image: a } = t;
            if (
              (s.$slideEl ||
                ((s.$slideEl =
                  this.params.virtual &&
                  this.params.virtual.enabled &&
                  this.virtual
                    ? this.$wrapperEl.children(
                        "." + this.params.slideActiveClass
                      )
                    : this.slides.eq(this.activeIndex)),
                (s.$imageEl = s.$slideEl.find(
                  "img, svg, canvas, picture, .swiper-zoom-target"
                )),
                (s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass))),
              !s.$imageEl || 0 === s.$imageEl.length)
            )
              return;
            let n, r, o, l, d, p, h, c, u, g, f, m, b, w, v, x, y, E;
            s.$slideEl.addClass("" + i.zoomedSlideClass),
              void 0 === a.touchesStart.x && e
                ? ((n =
                    "touchend" === e.type
                      ? e.changedTouches[0].pageX
                      : e.pageX),
                  (r =
                    "touchend" === e.type
                      ? e.changedTouches[0].pageY
                      : e.pageY))
                : ((n = a.touchesStart.x), (r = a.touchesStart.y)),
              (t.scale = s.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
              (t.currentScale =
                s.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
              e
                ? ((y = s.$slideEl[0].offsetWidth),
                  (E = s.$slideEl[0].offsetHeight),
                  (o = s.$slideEl.offset().left),
                  (l = s.$slideEl.offset().top),
                  (d = o + y / 2 - n),
                  (p = l + E / 2 - r),
                  (u = s.$imageEl[0].offsetWidth),
                  (g = s.$imageEl[0].offsetHeight),
                  (f = u * t.scale),
                  (m = g * t.scale),
                  (b = Math.min(y / 2 - f / 2, 0)),
                  (w = Math.min(E / 2 - m / 2, 0)),
                  (v = -b),
                  (x = -w),
                  (h = d * t.scale),
                  (c = p * t.scale),
                  h < b && (h = b),
                  h > v && (h = v),
                  c < w && (c = w),
                  c > x && (c = x))
                : ((h = 0), (c = 0)),
              s.$imageWrapEl
                .transition(300)
                .transform(`translate3d(${h}px, ${c}px,0)`),
              s.$imageEl
                .transition(300)
                .transform(`translate3d(0,0,0) scale(${t.scale})`);
          },
          out() {
            const e = this.zoom,
              t = this.params.zoom,
              { gesture: i } = e;
            i.$slideEl ||
              ((i.$slideEl =
                this.params.virtual &&
                this.params.virtual.enabled &&
                this.virtual
                  ? this.$wrapperEl.children("." + this.params.slideActiveClass)
                  : this.slides.eq(this.activeIndex)),
              (i.$imageEl = i.$slideEl.find(
                "img, svg, canvas, picture, .swiper-zoom-target"
              )),
              (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
              i.$imageEl &&
                0 !== i.$imageEl.length &&
                ((e.scale = 1),
                (e.currentScale = 1),
                i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                i.$imageEl
                  .transition(300)
                  .transform("translate3d(0,0,0) scale(1)"),
                i.$slideEl.removeClass("" + t.zoomedSlideClass),
                (i.$slideEl = void 0));
          },
          enable() {
            const e = this.zoom;
            if (e.enabled) return;
            e.enabled = !0;
            const t = !(
                "touchstart" !== this.touchEvents.start ||
                !pt.passiveListener ||
                !this.params.passiveListeners
              ) && { passive: !0, capture: !1 },
              i = !pt.passiveListener || { passive: !1, capture: !0 },
              s = "." + this.params.slideClass;
            pt.gestures
              ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t),
                this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t),
                this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t))
              : "touchstart" === this.touchEvents.start &&
                (this.$wrapperEl.on(
                  this.touchEvents.start,
                  s,
                  e.onGestureStart,
                  t
                ),
                this.$wrapperEl.on(
                  this.touchEvents.move,
                  s,
                  e.onGestureChange,
                  i
                ),
                this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t),
                this.touchEvents.cancel &&
                  this.$wrapperEl.on(
                    this.touchEvents.cancel,
                    s,
                    e.onGestureEnd,
                    t
                  )),
              this.$wrapperEl.on(
                this.touchEvents.move,
                "." + this.params.zoom.containerClass,
                e.onTouchMove,
                i
              );
          },
          disable() {
            const e = this.zoom;
            if (!e.enabled) return;
            this.zoom.enabled = !1;
            const t = !(
                "touchstart" !== this.touchEvents.start ||
                !pt.passiveListener ||
                !this.params.passiveListeners
              ) && { passive: !0, capture: !1 },
              i = !pt.passiveListener || { passive: !1, capture: !0 },
              s = "." + this.params.slideClass;
            pt.gestures
              ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t),
                this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t),
                this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t))
              : "touchstart" === this.touchEvents.start &&
                (this.$wrapperEl.off(
                  this.touchEvents.start,
                  s,
                  e.onGestureStart,
                  t
                ),
                this.$wrapperEl.off(
                  this.touchEvents.move,
                  s,
                  e.onGestureChange,
                  i
                ),
                this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t),
                this.touchEvents.cancel &&
                  this.$wrapperEl.off(
                    this.touchEvents.cancel,
                    s,
                    e.onGestureEnd,
                    t
                  )),
              this.$wrapperEl.off(
                this.touchEvents.move,
                "." + this.params.zoom.containerClass,
                e.onTouchMove,
                i
              );
          },
        },
        Wt = {
          loadInSlide(e, t = !0) {
            const i = this,
              s = i.params.lazy;
            if (void 0 === e) return;
            if (0 === i.slides.length) return;
            const a =
              i.virtual && i.params.virtual.enabled
                ? i.$wrapperEl.children(
                    `.${i.params.slideClass}[data-swiper-slide-index="${e}"]`
                  )
                : i.slides.eq(e);
            let n = a.find(
              `.${s.elementClass}:not(.${s.loadedClass}):not(.${s.loadingClass})`
            );
            !a.hasClass(s.elementClass) ||
              a.hasClass(s.loadedClass) ||
              a.hasClass(s.loadingClass) ||
              (n = n.add(a[0])),
              0 !== n.length &&
                n.each((e, n) => {
                  const r = rt(n);
                  r.addClass(s.loadingClass);
                  const o = r.attr("data-background"),
                    l = r.attr("data-src"),
                    d = r.attr("data-srcset"),
                    p = r.attr("data-sizes"),
                    h = r.parent("picture");
                  i.loadImage(r[0], l || o, d, p, !1, () => {
                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                      if (
                        (o
                          ? (r.css("background-image", `url("${o}")`),
                            r.removeAttr("data-background"))
                          : (d &&
                              (r.attr("srcset", d),
                              r.removeAttr("data-srcset")),
                            p &&
                              (r.attr("sizes", p), r.removeAttr("data-sizes")),
                            h.length &&
                              h.children("source").each((e, t) => {
                                const i = rt(t);
                                i.attr("data-srcset") &&
                                  (i.attr("srcset", i.attr("data-srcset")),
                                  i.removeAttr("data-srcset"));
                              }),
                            l && (r.attr("src", l), r.removeAttr("data-src"))),
                        r.addClass(s.loadedClass).removeClass(s.loadingClass),
                        a.find("." + s.preloaderClass).remove(),
                        i.params.loop && t)
                      ) {
                        const e = a.attr("data-swiper-slide-index");
                        if (a.hasClass(i.params.slideDuplicateClass)) {
                          const t = i.$wrapperEl.children(
                            `[data-swiper-slide-index="${e}"]:not(.${i.params.slideDuplicateClass})`
                          );
                          i.lazy.loadInSlide(t.index(), !1);
                        } else {
                          const t = i.$wrapperEl.children(
                            `.${i.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                          );
                          i.lazy.loadInSlide(t.index(), !1);
                        }
                      }
                      i.emit("lazyImageReady", a[0], r[0]),
                        i.params.autoHeight && i.updateAutoHeight();
                    }
                  }),
                    i.emit("lazyImageLoad", a[0], r[0]);
                });
          },
          load() {
            const e = this,
              { $wrapperEl: t, params: i, slides: s, activeIndex: a } = e,
              n = e.virtual && i.virtual.enabled,
              r = i.lazy;
            let o = i.slidesPerView;
            function l(e) {
              if (n) {
                if (
                  t.children(`.${i.slideClass}[data-swiper-slide-index="${e}"]`)
                    .length
                )
                  return !0;
              } else if (s[e]) return !0;
              return !1;
            }
            function d(e) {
              return n ? rt(e).attr("data-swiper-slide-index") : rt(e).index();
            }
            if (
              ("auto" === o && (o = 0),
              e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
              e.params.watchSlidesVisibility)
            )
              t.children("." + i.slideVisibleClass).each((t, i) => {
                const s = n
                  ? rt(i).attr("data-swiper-slide-index")
                  : rt(i).index();
                e.lazy.loadInSlide(s);
              });
            else if (o > 1)
              for (let p = a; p < a + o; p += 1) l(p) && e.lazy.loadInSlide(p);
            else e.lazy.loadInSlide(a);
            if (r.loadPrevNext)
              if (o > 1 || (r.loadPrevNextAmount && r.loadPrevNextAmount > 1)) {
                const t = r.loadPrevNextAmount,
                  i = o,
                  n = Math.min(a + i + Math.max(t, i), s.length),
                  d = Math.max(a - Math.max(i, t), 0);
                for (let s = a + o; s < n; s += 1)
                  l(s) && e.lazy.loadInSlide(s);
                for (let s = d; s < a; s += 1) l(s) && e.lazy.loadInSlide(s);
              } else {
                const s = t.children("." + i.slideNextClass);
                s.length > 0 && e.lazy.loadInSlide(d(s));
                const a = t.children("." + i.slidePrevClass);
                a.length > 0 && e.lazy.loadInSlide(d(a));
              }
          },
        },
        Jt = {
          LinearSpline: function (e, t) {
            const i = (function () {
              let e, t, i;
              return (s, a) => {
                for (t = -1, e = s.length; e - t > 1; )
                  (i = (e + t) >> 1), s[i] <= a ? (t = i) : (e = i);
                return e;
              };
            })();
            let s, a;
            return (
              (this.x = e),
              (this.y = t),
              (this.lastIndex = e.length - 1),
              (this.interpolate = function (e) {
                return e
                  ? ((a = i(this.x, e)),
                    (s = a - 1),
                    ((e - this.x[s]) * (this.y[a] - this.y[s])) /
                      (this.x[a] - this.x[s]) +
                      this.y[s])
                  : 0;
              }),
              this
            );
          },
          getInterpolateFunction(e) {
            this.controller.spline ||
              (this.controller.spline = this.params.loop
                ? new Jt.LinearSpline(this.slidesGrid, e.slidesGrid)
                : new Jt.LinearSpline(this.snapGrid, e.snapGrid));
          },
          setTranslate(e, t) {
            const i = this,
              s = i.controller.control;
            let a, n;
            function r(e) {
              const t = i.rtlTranslate ? -i.translate : i.translate;
              "slide" === i.params.controller.by &&
                (i.controller.getInterpolateFunction(e),
                (n = -i.controller.spline.interpolate(-t))),
                (n && "container" !== i.params.controller.by) ||
                  ((a =
                    (e.maxTranslate() - e.minTranslate()) /
                    (i.maxTranslate() - i.minTranslate())),
                  (n = (t - i.minTranslate()) * a + e.minTranslate())),
                i.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, i),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
            }
            if (Array.isArray(s))
              for (let o = 0; o < s.length; o += 1)
                s[o] !== t && s[o] instanceof Mt && r(s[o]);
            else s instanceof Mt && t !== s && r(s);
          },
          setTransition(e, t) {
            const i = this,
              s = i.controller.control;
            let a;
            function n(t) {
              t.setTransition(e, i),
                0 !== e &&
                  (t.transitionStart(),
                  t.params.autoHeight &&
                    dt.nextTick(() => {
                      t.updateAutoHeight();
                    }),
                  t.$wrapperEl.transitionEnd(() => {
                    s &&
                      (t.params.loop &&
                        "slide" === i.params.controller.by &&
                        t.loopFix(),
                      t.transitionEnd());
                  }));
            }
            if (Array.isArray(s))
              for (a = 0; a < s.length; a += 1)
                s[a] !== t && s[a] instanceof Mt && n(s[a]);
            else s instanceof Mt && t !== s && n(s);
          },
        },
        qt = {
          makeElFocusable: (e) => (e.attr("tabIndex", "0"), e),
          makeElNotFocusable: (e) => (e.attr("tabIndex", "-1"), e),
          addElRole: (e, t) => (e.attr("role", t), e),
          addElLabel: (e, t) => (e.attr("aria-label", t), e),
          disableEl: (e) => (e.attr("aria-disabled", !0), e),
          enableEl: (e) => (e.attr("aria-disabled", !1), e),
          onEnterKey(e) {
            const t = this.params.a11y;
            if (13 !== e.keyCode) return;
            const i = rt(e.target);
            this.navigation &&
              this.navigation.$nextEl &&
              i.is(this.navigation.$nextEl) &&
              ((this.isEnd && !this.params.loop) || this.slideNext(),
              this.a11y.notify(
                this.isEnd ? t.lastSlideMessage : t.nextSlideMessage
              )),
              this.navigation &&
                this.navigation.$prevEl &&
                i.is(this.navigation.$prevEl) &&
                ((this.isBeginning && !this.params.loop) || this.slidePrev(),
                this.a11y.notify(
                  this.isBeginning ? t.firstSlideMessage : t.prevSlideMessage
                )),
              this.pagination &&
                i.is("." + this.params.pagination.bulletClass) &&
                i[0].click();
          },
          notify(e) {
            const t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e));
          },
          updateNavigation() {
            if (this.params.loop || !this.navigation) return;
            const { $nextEl: e, $prevEl: t } = this.navigation;
            t &&
              t.length > 0 &&
              (this.isBeginning
                ? (this.a11y.disableEl(t), this.a11y.makeElNotFocusable(t))
                : (this.a11y.enableEl(t), this.a11y.makeElFocusable(t))),
              e &&
                e.length > 0 &&
                (this.isEnd
                  ? (this.a11y.disableEl(e), this.a11y.makeElNotFocusable(e))
                  : (this.a11y.enableEl(e), this.a11y.makeElFocusable(e)));
          },
          updatePagination() {
            const e = this,
              t = e.params.a11y;
            e.pagination &&
              e.params.pagination.clickable &&
              e.pagination.bullets &&
              e.pagination.bullets.length &&
              e.pagination.bullets.each((i, s) => {
                const a = rt(s);
                e.a11y.makeElFocusable(a),
                  e.a11y.addElRole(a, "button"),
                  e.a11y.addElLabel(
                    a,
                    t.paginationBulletMessage.replace(
                      /\{\{index\}\}/,
                      a.index() + 1
                    )
                  );
              });
          },
          init() {
            this.$el.append(this.a11y.liveRegion);
            const e = this.params.a11y;
            let t, i;
            this.navigation &&
              this.navigation.$nextEl &&
              (t = this.navigation.$nextEl),
              this.navigation &&
                this.navigation.$prevEl &&
                (i = this.navigation.$prevEl),
              t &&
                (this.a11y.makeElFocusable(t),
                this.a11y.addElRole(t, "button"),
                this.a11y.addElLabel(t, e.nextSlideMessage),
                t.on("keydown", this.a11y.onEnterKey)),
              i &&
                (this.a11y.makeElFocusable(i),
                this.a11y.addElRole(i, "button"),
                this.a11y.addElLabel(i, e.prevSlideMessage),
                i.on("keydown", this.a11y.onEnterKey)),
              this.pagination &&
                this.params.pagination.clickable &&
                this.pagination.bullets &&
                this.pagination.bullets.length &&
                this.pagination.$el.on(
                  "keydown",
                  "." + this.params.pagination.bulletClass,
                  this.a11y.onEnterKey
                );
          },
          destroy() {
            let e, t;
            this.a11y.liveRegion &&
              this.a11y.liveRegion.length > 0 &&
              this.a11y.liveRegion.remove(),
              this.navigation &&
                this.navigation.$nextEl &&
                (e = this.navigation.$nextEl),
              this.navigation &&
                this.navigation.$prevEl &&
                (t = this.navigation.$prevEl),
              e && e.off("keydown", this.a11y.onEnterKey),
              t && t.off("keydown", this.a11y.onEnterKey),
              this.pagination &&
                this.params.pagination.clickable &&
                this.pagination.bullets &&
                this.pagination.bullets.length &&
                this.pagination.$el.off(
                  "keydown",
                  "." + this.params.pagination.bulletClass,
                  this.a11y.onEnterKey
                );
          },
        },
        Qt = {
          init() {
            if (!this.params.history) return;
            if (!at.history || !at.history.pushState)
              return (
                (this.params.history.enabled = !1),
                void (this.params.hashNavigation.enabled = !0)
              );
            const e = this.history;
            (e.initialized = !0),
              (e.paths = Qt.getPathValues()),
              (e.paths.key || e.paths.value) &&
                (e.scrollToSlide(
                  0,
                  e.paths.value,
                  this.params.runCallbacksOnInit
                ),
                this.params.history.replaceState ||
                  at.addEventListener(
                    "popstate",
                    this.history.setHistoryPopState
                  ));
          },
          destroy() {
            this.params.history.replaceState ||
              at.removeEventListener(
                "popstate",
                this.history.setHistoryPopState
              );
          },
          setHistoryPopState() {
            (this.history.paths = Qt.getPathValues()),
              this.history.scrollToSlide(
                this.params.speed,
                this.history.paths.value,
                !1
              );
          },
          getPathValues() {
            const e = at.location.pathname
                .slice(1)
                .split("/")
                .filter((e) => "" !== e),
              t = e.length;
            return { key: e[t - 2], value: e[t - 1] };
          },
          setHistory(e, t) {
            if (!this.history.initialized || !this.params.history.enabled)
              return;
            const i = this.slides.eq(t);
            let s = Qt.slugify(i.attr("data-history"));
            at.location.pathname.includes(e) || (s = `${e}/${s}`);
            const a = at.history.state;
            (a && a.value === s) ||
              (this.params.history.replaceState
                ? at.history.replaceState({ value: s }, null, s)
                : at.history.pushState({ value: s }, null, s));
          },
          slugify: (e) =>
            e
              .toString()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, ""),
          scrollToSlide(e, t, i) {
            const s = this;
            if (t)
              for (let a = 0, n = s.slides.length; a < n; a += 1) {
                const n = s.slides.eq(a);
                if (
                  Qt.slugify(n.attr("data-history")) === t &&
                  !n.hasClass(s.params.slideDuplicateClass)
                ) {
                  const t = n.index();
                  s.slideTo(t, e, i);
                }
              }
            else s.slideTo(0, e, i);
          },
        },
        Ut = {
          onHashCange() {
            const e = this;
            e.emit("hashChange");
            const t = it.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
              const i = e.$wrapperEl
                .children(`.${e.params.slideClass}[data-hash="${t}"]`)
                .index();
              if (void 0 === i) return;
              e.slideTo(i);
            }
          },
          setHash() {
            const e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
              if (
                e.params.hashNavigation.replaceState &&
                at.history &&
                at.history.replaceState
              )
                at.history.replaceState(
                  null,
                  null,
                  "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
                ),
                  e.emit("hashSet");
              else {
                const t = e.slides.eq(e.activeIndex),
                  i = t.attr("data-hash") || t.attr("data-history");
                (it.location.hash = i || ""), e.emit("hashSet");
              }
          },
          init() {
            const e = this;
            if (
              !e.params.hashNavigation.enabled ||
              (e.params.history && e.params.history.enabled)
            )
              return;
            e.hashNavigation.initialized = !0;
            const t = it.location.hash.replace("#", "");
            if (t) {
              const i = 0;
              for (let s = 0, a = e.slides.length; s < a; s += 1) {
                const a = e.slides.eq(s);
                if (
                  (a.attr("data-hash") || a.attr("data-history")) === t &&
                  !a.hasClass(e.params.slideDuplicateClass)
                ) {
                  const t = a.index();
                  e.slideTo(t, i, e.params.runCallbacksOnInit, !0);
                }
              }
            }
            e.params.hashNavigation.watchState &&
              rt(at).on("hashchange", e.hashNavigation.onHashCange);
          },
          destroy() {
            this.params.hashNavigation.watchState &&
              rt(at).off("hashchange", this.hashNavigation.onHashCange);
          },
        },
        Zt = {
          run() {
            const e = this,
              t = e.slides.eq(e.activeIndex);
            let i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") &&
              (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
              clearTimeout(e.autoplay.timeout),
              (e.autoplay.timeout = dt.nextTick(() => {
                e.params.autoplay.reverseDirection
                  ? e.params.loop
                    ? (e.loopFix(),
                      e.slidePrev(e.params.speed, !0, !0),
                      e.emit("autoplay"))
                    : e.isBeginning
                    ? e.params.autoplay.stopOnLastSlide
                      ? e.autoplay.stop()
                      : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                        e.emit("autoplay"))
                    : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                  : e.params.loop
                  ? (e.loopFix(),
                    e.slideNext(e.params.speed, !0, !0),
                    e.emit("autoplay"))
                  : e.isEnd
                  ? e.params.autoplay.stopOnLastSlide
                    ? e.autoplay.stop()
                    : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
                  : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")),
                  e.params.cssMode && e.autoplay.running && e.autoplay.run();
              }, i));
          },
          start() {
            return (
              void 0 === this.autoplay.timeout &&
              !this.autoplay.running &&
              ((this.autoplay.running = !0),
              this.emit("autoplayStart"),
              this.autoplay.run(),
              !0)
            );
          },
          stop() {
            return (
              !!this.autoplay.running &&
              void 0 !== this.autoplay.timeout &&
              (this.autoplay.timeout &&
                (clearTimeout(this.autoplay.timeout),
                (this.autoplay.timeout = void 0)),
              (this.autoplay.running = !1),
              this.emit("autoplayStop"),
              !0)
            );
          },
          pause(e) {
            this.autoplay.running &&
              (this.autoplay.paused ||
                (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
                (this.autoplay.paused = !0),
                0 !== e && this.params.autoplay.waitForTransition
                  ? (this.$wrapperEl[0].addEventListener(
                      "transitionend",
                      this.autoplay.onTransitionEnd
                    ),
                    this.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      this.autoplay.onTransitionEnd
                    ))
                  : ((this.autoplay.paused = !1), this.autoplay.run())));
          },
        },
        ei = {
          setTranslate() {
            const e = this,
              { slides: t } = e;
            for (let i = 0; i < t.length; i += 1) {
              const t = e.slides.eq(i);
              let s = -t[0].swiperSlideOffset;
              e.params.virtualTranslate || (s -= e.translate);
              let a = 0;
              e.isHorizontal() || ((a = s), (s = 0));
              const n = e.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(t[0].progress), 0)
                : 1 + Math.min(Math.max(t[0].progress, -1), 0);
              t.css({ opacity: n }).transform(
                `translate3d(${s}px, ${a}px, 0px)`
              );
            }
          },
          setTransition(e) {
            const t = this,
              { slides: i, $wrapperEl: s } = t;
            if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
              let e = !1;
              i.transitionEnd(() => {
                if (e) return;
                if (!t || t.destroyed) return;
                (e = !0), (t.animating = !1);
                const i = ["webkitTransitionEnd", "transitionend"];
                for (let e = 0; e < i.length; e += 1) s.trigger(i[e]);
              });
            }
          },
        },
        ti = {
          setTranslate() {
            const {
                $el: e,
                $wrapperEl: t,
                slides: i,
                width: s,
                height: a,
                rtlTranslate: n,
                size: r,
              } = this,
              o = this.params.cubeEffect,
              l = this.isHorizontal(),
              d = this.virtual && this.params.virtual.enabled;
            let p,
              h = 0;
            o.shadow &&
              (l
                ? ((p = t.find(".swiper-cube-shadow")),
                  0 === p.length &&
                    ((p = rt('<div class="swiper-cube-shadow"></div>')),
                    t.append(p)),
                  p.css({ height: s + "px" }))
                : ((p = e.find(".swiper-cube-shadow")),
                  0 === p.length &&
                    ((p = rt('<div class="swiper-cube-shadow"></div>')),
                    e.append(p))));
            for (let c = 0; c < i.length; c += 1) {
              const e = i.eq(c);
              let t = c;
              d && (t = parseInt(e.attr("data-swiper-slide-index"), 10));
              let s = 90 * t,
                a = Math.floor(s / 360);
              n && ((s = -s), (a = Math.floor(-s / 360)));
              const p = Math.max(Math.min(e[0].progress, 1), -1);
              let u = 0,
                g = 0,
                f = 0;
              t % 4 == 0
                ? ((u = 4 * -a * r), (f = 0))
                : (t - 1) % 4 == 0
                ? ((u = 0), (f = 4 * -a * r))
                : (t - 2) % 4 == 0
                ? ((u = r + 4 * a * r), (f = r))
                : (t - 3) % 4 == 0 && ((u = -r), (f = 3 * r + 4 * r * a)),
                n && (u = -u),
                l || ((g = u), (u = 0));
              const m = `rotateX(${l ? 0 : -s}deg) rotateY(${
                l ? s : 0
              }deg) translate3d(${u}px, ${g}px, ${f}px)`;
              if (
                (p <= 1 &&
                  p > -1 &&
                  ((h = 90 * t + 90 * p), n && (h = 90 * -t - 90 * p)),
                e.transform(m),
                o.slideShadows)
              ) {
                let t = e.find(
                    l ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"
                  ),
                  i = e.find(
                    l
                      ? ".swiper-slide-shadow-right"
                      : ".swiper-slide-shadow-bottom"
                  );
                0 === t.length &&
                  ((t = rt(
                    `<div class="swiper-slide-shadow-${
                      l ? "left" : "top"
                    }"></div>`
                  )),
                  e.append(t)),
                  0 === i.length &&
                    ((i = rt(
                      `<div class="swiper-slide-shadow-${
                        l ? "right" : "bottom"
                      }"></div>`
                    )),
                    e.append(i)),
                  t.length && (t[0].style.opacity = Math.max(-p, 0)),
                  i.length && (i[0].style.opacity = Math.max(p, 0));
              }
            }
            if (
              (t.css({
                "-webkit-transform-origin": `50% 50% -${r / 2}px`,
                "-moz-transform-origin": `50% 50% -${r / 2}px`,
                "-ms-transform-origin": `50% 50% -${r / 2}px`,
                "transform-origin": `50% 50% -${r / 2}px`,
              }),
              o.shadow)
            )
              if (l)
                p.transform(
                  `translate3d(0px, ${s / 2 + o.shadowOffset}px, ${
                    -s / 2
                  }px) rotateX(90deg) rotateZ(0deg) scale(${o.shadowScale})`
                );
              else {
                const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                  t =
                    1.5 -
                    (Math.sin((2 * e * Math.PI) / 360) / 2 +
                      Math.cos((2 * e * Math.PI) / 360) / 2),
                  i = o.shadowScale / t;
                p.transform(
                  `scale3d(${o.shadowScale}, 1, ${i}) translate3d(0px, ${
                    a / 2 + o.shadowOffset
                  }px, ${-a / 2 / i}px) rotateX(-90deg)`
                );
              }
            t.transform(
              `translate3d(0px,0,${
                $t.isSafari || $t.isWebView ? -r / 2 : 0
              }px) rotateX(${this.isHorizontal() ? 0 : h}deg) rotateY(${
                this.isHorizontal() ? -h : 0
              }deg)`
            );
          },
          setTransition(e) {
            const { $el: t, slides: i } = this;
            i
              .transition(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(e),
              this.params.cubeEffect.shadow &&
                !this.isHorizontal() &&
                t.find(".swiper-cube-shadow").transition(e);
          },
        },
        ii = {
          setTranslate() {
            const e = this,
              { slides: t, rtlTranslate: i } = e;
            for (let s = 0; s < t.length; s += 1) {
              const a = t.eq(s);
              let n = a[0].progress;
              e.params.flipEffect.limitRotation &&
                (n = Math.max(Math.min(a[0].progress, 1), -1));
              let r = -180 * n,
                o = 0,
                l = -a[0].swiperSlideOffset,
                d = 0;
              if (
                (e.isHorizontal()
                  ? i && (r = -r)
                  : ((d = l), (l = 0), (o = -r), (r = 0)),
                (a[0].style.zIndex = -Math.abs(Math.round(n)) + t.length),
                e.params.flipEffect.slideShadows)
              ) {
                let t = e.isHorizontal()
                    ? a.find(".swiper-slide-shadow-left")
                    : a.find(".swiper-slide-shadow-top"),
                  i = e.isHorizontal()
                    ? a.find(".swiper-slide-shadow-right")
                    : a.find(".swiper-slide-shadow-bottom");
                0 === t.length &&
                  ((t = rt(
                    `<div class="swiper-slide-shadow-${
                      e.isHorizontal() ? "left" : "top"
                    }"></div>`
                  )),
                  a.append(t)),
                  0 === i.length &&
                    ((i = rt(
                      `<div class="swiper-slide-shadow-${
                        e.isHorizontal() ? "right" : "bottom"
                      }"></div>`
                    )),
                    a.append(i)),
                  t.length && (t[0].style.opacity = Math.max(-n, 0)),
                  i.length && (i[0].style.opacity = Math.max(n, 0));
              }
              a.transform(
                `translate3d(${l}px, ${d}px, 0px) rotateX(${o}deg) rotateY(${r}deg)`
              );
            }
          },
          setTransition(e) {
            const t = this,
              { slides: i, activeIndex: s, $wrapperEl: a } = t;
            if (
              (i
                .transition(e)
                .find(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(e),
              t.params.virtualTranslate && 0 !== e)
            ) {
              let e = !1;
              i.eq(s).transitionEnd(function () {
                if (e) return;
                if (!t || t.destroyed) return;
                (e = !0), (t.animating = !1);
                const i = ["webkitTransitionEnd", "transitionend"];
                for (let e = 0; e < i.length; e += 1) a.trigger(i[e]);
              });
            }
          },
        },
        si = {
          setTranslate() {
            const {
                width: e,
                height: t,
                slides: i,
                $wrapperEl: s,
                slidesSizesGrid: a,
              } = this,
              n = this.params.coverflowEffect,
              r = this.isHorizontal(),
              o = this.translate,
              l = r ? e / 2 - o : t / 2 - o,
              d = r ? n.rotate : -n.rotate,
              p = n.depth;
            for (let h = 0, c = i.length; h < c; h += 1) {
              const e = i.eq(h),
                t = a[h],
                s = ((l - e[0].swiperSlideOffset - t / 2) / t) * n.modifier;
              let o = r ? d * s : 0,
                c = r ? 0 : d * s,
                u = -p * Math.abs(s),
                g = n.stretch;
              "string" == typeof g &&
                -1 !== g.indexOf("%") &&
                (g = (parseFloat(n.stretch) / 100) * t);
              let f = r ? 0 : g * s,
                m = r ? g * s : 0,
                b = 1 - (1 - n.scale) * Math.abs(s);
              if (
                (Math.abs(m) < 0.001 && (m = 0),
                Math.abs(f) < 0.001 && (f = 0),
                Math.abs(u) < 0.001 && (u = 0),
                Math.abs(o) < 0.001 && (o = 0),
                Math.abs(c) < 0.001 && (c = 0),
                Math.abs(b) < 0.001 && (b = 0),
                e.transform(
                  `translate3d(${m}px,${f}px,${u}px)  rotateX(${c}deg) rotateY(${o}deg) scale(${b})`
                ),
                (e[0].style.zIndex = 1 - Math.abs(Math.round(s))),
                n.slideShadows)
              ) {
                let t = e.find(
                    r ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"
                  ),
                  i = e.find(
                    r
                      ? ".swiper-slide-shadow-right"
                      : ".swiper-slide-shadow-bottom"
                  );
                0 === t.length &&
                  ((t = rt(
                    `<div class="swiper-slide-shadow-${
                      r ? "left" : "top"
                    }"></div>`
                  )),
                  e.append(t)),
                  0 === i.length &&
                    ((i = rt(
                      `<div class="swiper-slide-shadow-${
                        r ? "right" : "bottom"
                      }"></div>`
                    )),
                    e.append(i)),
                  t.length && (t[0].style.opacity = s > 0 ? s : 0),
                  i.length && (i[0].style.opacity = -s > 0 ? -s : 0);
              }
            }
            (pt.pointerEvents || pt.prefixedPointerEvents) &&
              (s[0].style.perspectiveOrigin = l + "px 50%");
          },
          setTransition(e) {
            this.slides
              .transition(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(e);
          },
        },
        ai = {
          init() {
            const { thumbs: e } = this.params,
              t = this.constructor;
            e.swiper instanceof t
              ? ((this.thumbs.swiper = e.swiper),
                dt.extend(this.thumbs.swiper.originalParams, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                dt.extend(this.thumbs.swiper.params, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }))
              : dt.isObject(e.swiper) &&
                ((this.thumbs.swiper = new t(
                  dt.extend({}, e.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1,
                  })
                )),
                (this.thumbs.swiperCreated = !0)),
              this.thumbs.swiper.$el.addClass(
                this.params.thumbs.thumbsContainerClass
              ),
              this.thumbs.swiper.on("tap", this.thumbs.onThumbClick);
          },
          onThumbClick() {
            const e = this,
              t = e.thumbs.swiper;
            if (!t) return;
            const i = t.clickedIndex,
              s = t.clickedSlide;
            if (s && rt(s).hasClass(e.params.thumbs.slideThumbActiveClass))
              return;
            if (null == i) return;
            let a;
            if (
              ((a = t.params.loop
                ? parseInt(
                    rt(t.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : i),
              e.params.loop)
            ) {
              let t = e.activeIndex;
              e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
                (e.loopFix(),
                (e._clientLeft = e.$wrapperEl[0].clientLeft),
                (t = e.activeIndex));
              const i = e.slides
                  .eq(t)
                  .prevAll(`[data-swiper-slide-index="${a}"]`)
                  .eq(0)
                  .index(),
                s = e.slides
                  .eq(t)
                  .nextAll(`[data-swiper-slide-index="${a}"]`)
                  .eq(0)
                  .index();
              a = void 0 === i ? s : void 0 === s ? i : s - t < t - i ? s : i;
            }
            e.slideTo(a);
          },
          update(e) {
            const t = this,
              i = t.thumbs.swiper;
            if (!i) return;
            const s =
                "auto" === i.params.slidesPerView
                  ? i.slidesPerViewDynamic()
                  : i.params.slidesPerView,
              a = t.params.thumbs.autoScrollOffset,
              n = a && !i.params.loop;
            if (t.realIndex !== i.realIndex || n) {
              let r,
                o,
                l = i.activeIndex;
              if (i.params.loop) {
                i.slides.eq(l).hasClass(i.params.slideDuplicateClass) &&
                  (i.loopFix(),
                  (i._clientLeft = i.$wrapperEl[0].clientLeft),
                  (l = i.activeIndex));
                const e = i.slides
                    .eq(l)
                    .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                    .eq(0)
                    .index(),
                  s = i.slides
                    .eq(l)
                    .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                    .eq(0)
                    .index();
                (r =
                  void 0 === e
                    ? s
                    : void 0 === s
                    ? e
                    : s - l == l - e
                    ? l
                    : s - l < l - e
                    ? s
                    : e),
                  (o = t.activeIndex > t.previousIndex ? "next" : "prev");
              } else
                (r = t.realIndex), (o = r > t.previousIndex ? "next" : "prev");
              n && (r += "next" === o ? a : -1 * a),
                i.visibleSlidesIndexes &&
                  i.visibleSlidesIndexes.indexOf(r) < 0 &&
                  (i.params.centeredSlides
                    ? (r =
                        r > l
                          ? r - Math.floor(s / 2) + 1
                          : r + Math.floor(s / 2) - 1)
                    : r > l && (r = r - s + 1),
                  i.slideTo(r, e ? 0 : void 0));
            }
            let r = 1;
            const o = t.params.thumbs.slideThumbActiveClass;
            if (
              (t.params.slidesPerView > 1 &&
                !t.params.centeredSlides &&
                (r = t.params.slidesPerView),
              t.params.thumbs.multipleActiveThumbs || (r = 1),
              (r = Math.floor(r)),
              i.slides.removeClass(o),
              i.params.loop || (i.params.virtual && i.params.virtual.enabled))
            )
              for (let l = 0; l < r; l += 1)
                i.$wrapperEl
                  .children(`[data-swiper-slide-index="${t.realIndex + l}"]`)
                  .addClass(o);
            else
              for (let l = 0; l < r; l += 1)
                i.slides.eq(t.realIndex + l).addClass(o);
          },
        },
        ni = [
          Lt,
          Pt,
          zt,
          Dt,
          Rt,
          _t,
          Ht,
          {
            name: "mousewheel",
            params: {
              mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container",
              },
            },
            create() {
              dt.extend(this, {
                mousewheel: {
                  enabled: !1,
                  enable: jt.enable.bind(this),
                  disable: jt.disable.bind(this),
                  handle: jt.handle.bind(this),
                  handleMouseEnter: jt.handleMouseEnter.bind(this),
                  handleMouseLeave: jt.handleMouseLeave.bind(this),
                  animateSlider: jt.animateSlider.bind(this),
                  releaseScroll: jt.releaseScroll.bind(this),
                  lastScrollTime: dt.now(),
                  lastEventBeforeSnap: void 0,
                  recentWheelEvents: [],
                },
              });
            },
            on: {
              init() {
                !this.params.mousewheel.enabled &&
                  this.params.cssMode &&
                  this.mousewheel.disable(),
                  this.params.mousewheel.enabled && this.mousewheel.enable();
              },
              destroy() {
                this.params.cssMode && this.mousewheel.enable(),
                  this.mousewheel.enabled && this.mousewheel.disable();
              },
            },
          },
          {
            name: "navigation",
            params: {
              navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
              },
            },
            create() {
              dt.extend(this, {
                navigation: {
                  init: Ft.init.bind(this),
                  update: Ft.update.bind(this),
                  destroy: Ft.destroy.bind(this),
                  onNextClick: Ft.onNextClick.bind(this),
                  onPrevClick: Ft.onPrevClick.bind(this),
                },
              });
            },
            on: {
              init() {
                this.navigation.init(), this.navigation.update();
              },
              toEdge() {
                this.navigation.update();
              },
              fromEdge() {
                this.navigation.update();
              },
              destroy() {
                this.navigation.destroy();
              },
              click(e) {
                const t = this,
                  { $nextEl: i, $prevEl: s } = t.navigation;
                if (
                  t.params.navigation.hideOnClick &&
                  !rt(e.target).is(s) &&
                  !rt(e.target).is(i)
                ) {
                  let e;
                  i
                    ? (e = i.hasClass(t.params.navigation.hiddenClass))
                    : s && (e = s.hasClass(t.params.navigation.hiddenClass)),
                    t.emit(!0 === e ? "navigationShow" : "navigationHide", t),
                    i && i.toggleClass(t.params.navigation.hiddenClass),
                    s && s.toggleClass(t.params.navigation.hiddenClass);
                }
              },
            },
          },
          {
            name: "pagination",
            params: {
              pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: (e) => e,
                formatFractionTotal: (e) => e,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass:
                  "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock",
              },
            },
            create() {
              dt.extend(this, {
                pagination: {
                  init: Vt.init.bind(this),
                  render: Vt.render.bind(this),
                  update: Vt.update.bind(this),
                  destroy: Vt.destroy.bind(this),
                  dynamicBulletIndex: 0,
                },
              });
            },
            on: {
              init() {
                this.pagination.init(),
                  this.pagination.render(),
                  this.pagination.update();
              },
              activeIndexChange() {
                (this.params.loop || void 0 === this.snapIndex) &&
                  this.pagination.update();
              },
              snapIndexChange() {
                this.params.loop || this.pagination.update();
              },
              slidesLengthChange() {
                this.params.loop &&
                  (this.pagination.render(), this.pagination.update());
              },
              snapGridLengthChange() {
                this.params.loop ||
                  (this.pagination.render(), this.pagination.update());
              },
              destroy() {
                this.pagination.destroy();
              },
              click(e) {
                const t = this;
                if (
                  t.params.pagination.el &&
                  t.params.pagination.hideOnClick &&
                  t.pagination.$el.length > 0 &&
                  !rt(e.target).hasClass(t.params.pagination.bulletClass)
                ) {
                  const e = t.pagination.$el.hasClass(
                    t.params.pagination.hiddenClass
                  );
                  t.emit(!0 === e ? "paginationShow" : "paginationHide", t),
                    t.pagination.$el.toggleClass(
                      t.params.pagination.hiddenClass
                    );
                }
              },
            },
          },
          {
            name: "scrollbar",
            params: {
              scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
              },
            },
            create() {
              dt.extend(this, {
                scrollbar: {
                  init: Yt.init.bind(this),
                  destroy: Yt.destroy.bind(this),
                  updateSize: Yt.updateSize.bind(this),
                  setTranslate: Yt.setTranslate.bind(this),
                  setTransition: Yt.setTransition.bind(this),
                  enableDraggable: Yt.enableDraggable.bind(this),
                  disableDraggable: Yt.disableDraggable.bind(this),
                  setDragPosition: Yt.setDragPosition.bind(this),
                  getPointerPosition: Yt.getPointerPosition.bind(this),
                  onDragStart: Yt.onDragStart.bind(this),
                  onDragMove: Yt.onDragMove.bind(this),
                  onDragEnd: Yt.onDragEnd.bind(this),
                  isTouched: !1,
                  timeout: null,
                  dragTimeout: null,
                },
              });
            },
            on: {
              init() {
                this.scrollbar.init(),
                  this.scrollbar.updateSize(),
                  this.scrollbar.setTranslate();
              },
              update() {
                this.scrollbar.updateSize();
              },
              resize() {
                this.scrollbar.updateSize();
              },
              observerUpdate() {
                this.scrollbar.updateSize();
              },
              setTranslate() {
                this.scrollbar.setTranslate();
              },
              setTransition(e) {
                this.scrollbar.setTransition(e);
              },
              destroy() {
                this.scrollbar.destroy();
              },
            },
          },
          {
            name: "parallax",
            params: { parallax: { enabled: !1 } },
            create() {
              dt.extend(this, {
                parallax: {
                  setTransform: Xt.setTransform.bind(this),
                  setTranslate: Xt.setTranslate.bind(this),
                  setTransition: Xt.setTransition.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                this.params.parallax.enabled &&
                  ((this.params.watchSlidesProgress = !0),
                  (this.originalParams.watchSlidesProgress = !0));
              },
              init() {
                this.params.parallax.enabled && this.parallax.setTranslate();
              },
              setTranslate() {
                this.params.parallax.enabled && this.parallax.setTranslate();
              },
              setTransition(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e);
              },
            },
          },
          {
            name: "zoom",
            params: {
              zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed",
              },
            },
            create() {
              const e = this,
                t = {
                  enabled: !1,
                  scale: 1,
                  currentScale: 1,
                  isScaling: !1,
                  gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3,
                  },
                  image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {},
                  },
                  velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0,
                  },
                };
              "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
                .split(" ")
                .forEach((i) => {
                  t[i] = Kt[i].bind(e);
                }),
                dt.extend(e, { zoom: t });
              let i = 1;
              Object.defineProperty(e.zoom, "scale", {
                get: () => i,
                set(t) {
                  i !== t &&
                    e.emit(
                      "zoomChange",
                      t,
                      e.zoom.gesture.$imageEl
                        ? e.zoom.gesture.$imageEl[0]
                        : void 0,
                      e.zoom.gesture.$slideEl
                        ? e.zoom.gesture.$slideEl[0]
                        : void 0
                    ),
                    (i = t);
                },
              });
            },
            on: {
              init() {
                this.params.zoom.enabled && this.zoom.enable();
              },
              destroy() {
                this.zoom.disable();
              },
              touchStart(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e);
              },
              touchEnd(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e);
              },
              doubleTap(e) {
                this.params.zoom.enabled &&
                  this.zoom.enabled &&
                  this.params.zoom.toggle &&
                  this.zoom.toggle(e);
              },
              transitionEnd() {
                this.zoom.enabled &&
                  this.params.zoom.enabled &&
                  this.zoom.onTransitionEnd();
              },
              slideChange() {
                this.zoom.enabled &&
                  this.params.zoom.enabled &&
                  this.params.cssMode &&
                  this.zoom.onTransitionEnd();
              },
            },
          },
          {
            name: "lazy",
            params: {
              lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader",
              },
            },
            create() {
              dt.extend(this, {
                lazy: {
                  initialImageLoaded: !1,
                  load: Wt.load.bind(this),
                  loadInSlide: Wt.loadInSlide.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                this.params.lazy.enabled &&
                  this.params.preloadImages &&
                  (this.params.preloadImages = !1);
              },
              init() {
                this.params.lazy.enabled &&
                  !this.params.loop &&
                  0 === this.params.initialSlide &&
                  this.lazy.load();
              },
              scroll() {
                this.params.freeMode &&
                  !this.params.freeModeSticky &&
                  this.lazy.load();
              },
              resize() {
                this.params.lazy.enabled && this.lazy.load();
              },
              scrollbarDragMove() {
                this.params.lazy.enabled && this.lazy.load();
              },
              transitionStart() {
                this.params.lazy.enabled &&
                  (this.params.lazy.loadOnTransitionStart ||
                    (!this.params.lazy.loadOnTransitionStart &&
                      !this.lazy.initialImageLoaded)) &&
                  this.lazy.load();
              },
              transitionEnd() {
                this.params.lazy.enabled &&
                  !this.params.lazy.loadOnTransitionStart &&
                  this.lazy.load();
              },
              slideChange() {
                this.params.lazy.enabled &&
                  this.params.cssMode &&
                  this.lazy.load();
              },
            },
          },
          {
            name: "controller",
            params: {
              controller: { control: void 0, inverse: !1, by: "slide" },
            },
            create() {
              dt.extend(this, {
                controller: {
                  control: this.params.controller.control,
                  getInterpolateFunction: Jt.getInterpolateFunction.bind(this),
                  setTranslate: Jt.setTranslate.bind(this),
                  setTransition: Jt.setTransition.bind(this),
                },
              });
            },
            on: {
              update() {
                this.controller.control &&
                  this.controller.spline &&
                  ((this.controller.spline = void 0),
                  delete this.controller.spline);
              },
              resize() {
                this.controller.control &&
                  this.controller.spline &&
                  ((this.controller.spline = void 0),
                  delete this.controller.spline);
              },
              observerUpdate() {
                this.controller.control &&
                  this.controller.spline &&
                  ((this.controller.spline = void 0),
                  delete this.controller.spline);
              },
              setTranslate(e, t) {
                this.controller.control && this.controller.setTranslate(e, t);
              },
              setTransition(e, t) {
                this.controller.control && this.controller.setTransition(e, t);
              },
            },
          },
          {
            name: "a11y",
            params: {
              a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
              },
            },
            create() {
              const e = this;
              dt.extend(e, {
                a11y: {
                  liveRegion: rt(
                    `<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
                  ),
                },
              }),
                Object.keys(qt).forEach((t) => {
                  e.a11y[t] = qt[t].bind(e);
                });
            },
            on: {
              init() {
                this.params.a11y.enabled &&
                  (this.a11y.init(), this.a11y.updateNavigation());
              },
              toEdge() {
                this.params.a11y.enabled && this.a11y.updateNavigation();
              },
              fromEdge() {
                this.params.a11y.enabled && this.a11y.updateNavigation();
              },
              paginationUpdate() {
                this.params.a11y.enabled && this.a11y.updatePagination();
              },
              destroy() {
                this.params.a11y.enabled && this.a11y.destroy();
              },
            },
          },
          {
            name: "history",
            params: {
              history: { enabled: !1, replaceState: !1, key: "slides" },
            },
            create() {
              dt.extend(this, {
                history: {
                  init: Qt.init.bind(this),
                  setHistory: Qt.setHistory.bind(this),
                  setHistoryPopState: Qt.setHistoryPopState.bind(this),
                  scrollToSlide: Qt.scrollToSlide.bind(this),
                  destroy: Qt.destroy.bind(this),
                },
              });
            },
            on: {
              init() {
                this.params.history.enabled && this.history.init();
              },
              destroy() {
                this.params.history.enabled && this.history.destroy();
              },
              transitionEnd() {
                this.history.initialized &&
                  this.history.setHistory(
                    this.params.history.key,
                    this.activeIndex
                  );
              },
              slideChange() {
                this.history.initialized &&
                  this.params.cssMode &&
                  this.history.setHistory(
                    this.params.history.key,
                    this.activeIndex
                  );
              },
            },
          },
          {
            name: "hash-navigation",
            params: {
              hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
            },
            create() {
              dt.extend(this, {
                hashNavigation: {
                  initialized: !1,
                  init: Ut.init.bind(this),
                  destroy: Ut.destroy.bind(this),
                  setHash: Ut.setHash.bind(this),
                  onHashCange: Ut.onHashCange.bind(this),
                },
              });
            },
            on: {
              init() {
                this.params.hashNavigation.enabled &&
                  this.hashNavigation.init();
              },
              destroy() {
                this.params.hashNavigation.enabled &&
                  this.hashNavigation.destroy();
              },
              transitionEnd() {
                this.hashNavigation.initialized &&
                  this.hashNavigation.setHash();
              },
              slideChange() {
                this.hashNavigation.initialized &&
                  this.params.cssMode &&
                  this.hashNavigation.setHash();
              },
            },
          },
          {
            name: "autoplay",
            params: {
              autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
              },
            },
            create() {
              const e = this;
              dt.extend(e, {
                autoplay: {
                  running: !1,
                  paused: !1,
                  run: Zt.run.bind(e),
                  start: Zt.start.bind(e),
                  stop: Zt.stop.bind(e),
                  pause: Zt.pause.bind(e),
                  onVisibilityChange() {
                    "hidden" === document.visibilityState &&
                      e.autoplay.running &&
                      e.autoplay.pause(),
                      "visible" === document.visibilityState &&
                        e.autoplay.paused &&
                        (e.autoplay.run(), (e.autoplay.paused = !1));
                  },
                  onTransitionEnd(t) {
                    e &&
                      !e.destroyed &&
                      e.$wrapperEl &&
                      t.target === this &&
                      (e.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        e.autoplay.onTransitionEnd
                      ),
                      e.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        e.autoplay.onTransitionEnd
                      ),
                      (e.autoplay.paused = !1),
                      e.autoplay.running
                        ? e.autoplay.run()
                        : e.autoplay.stop());
                  },
                },
              });
            },
            on: {
              init() {
                this.params.autoplay.enabled &&
                  (this.autoplay.start(),
                  document.addEventListener(
                    "visibilitychange",
                    this.autoplay.onVisibilityChange
                  ));
              },
              beforeTransitionStart(e, t) {
                this.autoplay.running &&
                  (t || !this.params.autoplay.disableOnInteraction
                    ? this.autoplay.pause(e)
                    : this.autoplay.stop());
              },
              sliderFirstMove() {
                this.autoplay.running &&
                  (this.params.autoplay.disableOnInteraction
                    ? this.autoplay.stop()
                    : this.autoplay.pause());
              },
              touchEnd() {
                this.params.cssMode &&
                  this.autoplay.paused &&
                  !this.params.autoplay.disableOnInteraction &&
                  this.autoplay.run();
              },
              destroy() {
                this.autoplay.running && this.autoplay.stop(),
                  document.removeEventListener(
                    "visibilitychange",
                    this.autoplay.onVisibilityChange
                  );
              },
            },
          },
          {
            name: "effect-fade",
            params: { fadeEffect: { crossFade: !1 } },
            create() {
              dt.extend(this, {
                fadeEffect: {
                  setTranslate: ei.setTranslate.bind(this),
                  setTransition: ei.setTransition.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                if ("fade" !== this.params.effect) return;
                this.classNames.push(
                  this.params.containerModifierClass + "fade"
                );
                const e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                dt.extend(this.params, e), dt.extend(this.originalParams, e);
              },
              setTranslate() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate();
              },
              setTransition(e) {
                "fade" === this.params.effect &&
                  this.fadeEffect.setTransition(e);
              },
            },
          },
          {
            name: "effect-cube",
            params: {
              cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: 0.94,
              },
            },
            create() {
              dt.extend(this, {
                cubeEffect: {
                  setTranslate: ti.setTranslate.bind(this),
                  setTransition: ti.setTransition.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                if ("cube" !== this.params.effect) return;
                this.classNames.push(
                  this.params.containerModifierClass + "cube"
                ),
                  this.classNames.push(
                    this.params.containerModifierClass + "3d"
                  );
                const e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  resistanceRatio: 0,
                  spaceBetween: 0,
                  centeredSlides: !1,
                  virtualTranslate: !0,
                };
                dt.extend(this.params, e), dt.extend(this.originalParams, e);
              },
              setTranslate() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate();
              },
              setTransition(e) {
                "cube" === this.params.effect &&
                  this.cubeEffect.setTransition(e);
              },
            },
          },
          {
            name: "effect-flip",
            params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
            create() {
              dt.extend(this, {
                flipEffect: {
                  setTranslate: ii.setTranslate.bind(this),
                  setTransition: ii.setTransition.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                if ("flip" !== this.params.effect) return;
                this.classNames.push(
                  this.params.containerModifierClass + "flip"
                ),
                  this.classNames.push(
                    this.params.containerModifierClass + "3d"
                  );
                const e = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                dt.extend(this.params, e), dt.extend(this.originalParams, e);
              },
              setTranslate() {
                "flip" === this.params.effect && this.flipEffect.setTranslate();
              },
              setTransition(e) {
                "flip" === this.params.effect &&
                  this.flipEffect.setTransition(e);
              },
            },
          },
          {
            name: "effect-coverflow",
            params: {
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
              },
            },
            create() {
              dt.extend(this, {
                coverflowEffect: {
                  setTranslate: si.setTranslate.bind(this),
                  setTransition: si.setTransition.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                "coverflow" === this.params.effect &&
                  (this.classNames.push(
                    this.params.containerModifierClass + "coverflow"
                  ),
                  this.classNames.push(
                    this.params.containerModifierClass + "3d"
                  ),
                  (this.params.watchSlidesProgress = !0),
                  (this.originalParams.watchSlidesProgress = !0));
              },
              setTranslate() {
                "coverflow" === this.params.effect &&
                  this.coverflowEffect.setTranslate();
              },
              setTransition(e) {
                "coverflow" === this.params.effect &&
                  this.coverflowEffect.setTransition(e);
              },
            },
          },
          {
            name: "thumbs",
            params: {
              thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs",
              },
            },
            create() {
              dt.extend(this, {
                thumbs: {
                  swiper: null,
                  init: ai.init.bind(this),
                  update: ai.update.bind(this),
                  onThumbClick: ai.onThumbClick.bind(this),
                },
              });
            },
            on: {
              beforeInit() {
                const { thumbs: e } = this.params;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
              },
              slideChange() {
                this.thumbs.swiper && this.thumbs.update();
              },
              update() {
                this.thumbs.swiper && this.thumbs.update();
              },
              resize() {
                this.thumbs.swiper && this.thumbs.update();
              },
              observerUpdate() {
                this.thumbs.swiper && this.thumbs.update();
              },
              setTransition(e) {
                const t = this.thumbs.swiper;
                t && t.setTransition(e);
              },
              beforeDestroy() {
                const e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy();
              },
            },
          },
        ];
      void 0 === Mt.use &&
        ((Mt.use = Mt.Class.use), (Mt.installModule = Mt.Class.installModule)),
        Mt.use(ni);
      var ri = Mt;
      const oi = ["swiperSlides"],
        li = ["*"],
        di = new b.q("SWIPER_CONFIG"),
        pi = [
          "init",
          "beforeDestroy",
          "scroll",
          "progress",
          "keyPress",
          "resize",
          "loopFix",
          "breakpoint",
          "zoomChange",
          "beforeResize",
          "beforeLoopFix",
          "sliderMove",
          "slideChange",
          "setTranslate",
          "setTransition",
          "fromEdge",
          "reachEnd",
          "reachBeginning",
          "autoplay",
          "autoplayStop",
          "autoplayStart",
          "imagesReady",
          "lazyImageLoad",
          "lazyImageReady",
          "scrollbarDragEnd",
          "scrollbarDragMove",
          "scrollbarDragStart",
          "navigationHide",
          "navigationShow",
          "paginationRender",
          "paginationUpdate",
          "paginationHide",
          "paginationShow",
          "swiperTap",
          "swiperClick",
          "swiperDoubleTap",
          "swiperTouchEnd",
          "swiperTouchMove",
          "swiperTouchStart",
          "swiperTouchMoveOpposite",
          "swiperTransitionEnd",
          "swiperTransitionStart",
          "slideNextTransitionEnd",
          "slideNextTransitionStart",
          "slidePrevTransitionEnd",
          "slidePrevTransitionStart",
          "slideChangeTransitionEnd",
          "slideChangeTransitionStart",
        ];
      class hi {
        constructor(e = {}) {
          this.assign(e);
        }
        assign(e = {}, t) {
          t = t || this;
          for (const i in e)
            null == e[i] ||
            Array.isArray(e[i]) ||
            "object" != typeof e[i] ||
            ("undefined" != typeof HTMLElement && e[i] instanceof HTMLElement)
              ? (t[i] = e[i])
              : ((t[i] = {}), this.assign(e[i], t[i]));
        }
      }
      let ci = (() => {
          let e = class {
            constructor(e, t, i, s, a) {
              (this.platformId = e),
                (this.zone = t),
                (this.elementRef = i),
                (this.differs = s),
                (this.defaults = a),
                (this.initialIndex = null),
                (this.configDiff = null),
                (this.disabled = !1),
                (this.performance = !1),
                (this.indexChange = new b.n()),
                (this.S_INIT = new b.n()),
                (this.S_BEFOREDESTROY = new b.n()),
                (this.S_SCROLL = new b.n()),
                (this.S_PROGRESS = new b.n()),
                (this.S_KEYPRESS = new b.n()),
                (this.S_RESIZE = new b.n()),
                (this.S_BREAKPOINT = new b.n()),
                (this.S_ZOOMCHANGE = new b.n()),
                (this.S_AFTERRESIZE = new b.n()),
                (this.S_BEFORERESIZE = new b.n()),
                (this.S_LOOPFIX = new b.n()),
                (this.S_BEFORELOOPFIX = new b.n()),
                (this.S_SLIDERMOVE = new b.n()),
                (this.S_SLIDECHANGE = new b.n()),
                (this.S_SETTRANSLATE = new b.n()),
                (this.S_SETTRANSITION = new b.n()),
                (this.S_FROMEDGE = new b.n()),
                (this.S_REACHEND = new b.n()),
                (this.S_REACHBEGINNING = new b.n()),
                (this.S_AUTOPLAY = new b.n()),
                (this.S_AUTOPLAYSTART = new b.n()),
                (this.S_AUTOPLAYSTOP = new b.n()),
                (this.S_IMAGESREADY = new b.n()),
                (this.S_LAZYIMAGELOAD = new b.n()),
                (this.S_LAZYIMAGEREADY = new b.n()),
                (this.S_SCROLLDRAGEND = new b.n()),
                (this.S_SCROLLDRAGMOVE = new b.n()),
                (this.S_SCROLLDRAGSTART = new b.n()),
                (this.S_NAVIGATIONHIDE = new b.n()),
                (this.S_NAVIGATIONSHOW = new b.n()),
                (this.S_PAGINATIONRENDER = new b.n()),
                (this.S_PAGINATIONUPDATE = new b.n()),
                (this.S_PAGINATIONHIDE = new b.n()),
                (this.S_PAGINATIONSHOW = new b.n()),
                (this.S_TAP = new b.n()),
                (this.S_CLICK = new b.n()),
                (this.S_DOUBLETAP = new b.n()),
                (this.S_TOUCHEND = new b.n()),
                (this.S_TOUCHMOVE = new b.n()),
                (this.S_TOUCHSTART = new b.n()),
                (this.S_TOUCHMOVEOPPOSITE = new b.n()),
                (this.S_TRANSITIONEND = new b.n()),
                (this.S_TRANSITIONSTART = new b.n()),
                (this.S_SLIDEPREVTRANSITIONEND = new b.n()),
                (this.S_SLIDEPREVTRANSITIONSTART = new b.n()),
                (this.S_SLIDENEXTTRANSITIONEND = new b.n()),
                (this.S_SLIDENEXTTRANSITIONSTART = new b.n()),
                (this.S_SLIDECHANGETRANSITIONEND = new b.n()),
                (this.S_SLIDECHANGETRANSITIONSTART = new b.n());
            }
            set index(e) {
              null != e && this.setIndex(e);
            }
            ngAfterViewInit() {
              if (!Object(w.o)(this.platformId)) return;
              const e = new hi(this.defaults);
              e.assign(this.config),
                !0 === e.scrollbar &&
                  (e.scrollbar = { el: ".swiper-scrollbar" }),
                !0 === e.pagination &&
                  (e.pagination = { el: ".swiper-pagination" }),
                !0 === e.navigation &&
                  (e.navigation = {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }),
                this.disabled &&
                  ((e.allowSlidePrev = !1), (e.allowSlideNext = !1)),
                null != this.initialIndex &&
                  ((e.initialSlide = this.initialIndex),
                  (this.initialIndex = null)),
                (e.on = {
                  slideChange: () => {
                    this.instance &&
                      this.indexChange.observers.length &&
                      this.emit(this.indexChange, this.instance.realIndex);
                  },
                }),
                this.zone.runOutsideAngular(() => {
                  this.instance = new ri(this.elementRef.nativeElement, e);
                }),
                !1 !== e.init &&
                  this.S_INIT.observers.length &&
                  this.emit(this.S_INIT, this.instance),
                pi.forEach((e) => {
                  let t = e.replace("swiper", "");
                  (t = t.charAt(0).toLowerCase() + t.slice(1)),
                    this.instance.on(t, (...e) => {
                      1 === e.length && (e = e[0]);
                      const i = this["S_" + t.toUpperCase()];
                      i.observers.length && this.emit(i, e);
                    });
                }),
                this.configDiff ||
                  ((this.configDiff = this.differs
                    .find(this.config || {})
                    .create()),
                  this.configDiff.diff(this.config || {}));
            }
            ngOnDestroy() {
              this.instance &&
                (this.zone.runOutsideAngular(() => {
                  this.instance.destroy(!0, this.instance.initialized || !1);
                }),
                (this.instance = null));
            }
            ngDoCheck() {
              this.configDiff &&
                this.configDiff.diff(this.config || {}) &&
                ((this.initialIndex = this.getIndex(!0)),
                this.ngOnDestroy(),
                this.ngAfterViewInit(),
                this.update());
            }
            ngOnChanges(e) {
              this.instance &&
                e.disabled &&
                e.disabled.currentValue !== e.disabled.previousValue &&
                (!0 === e.disabled.currentValue ||
                  !1 === e.disabled.currentValue) &&
                this.zone.runOutsideAngular(() => {
                  this.ngOnDestroy(), this.ngAfterViewInit();
                });
            }
            emit(e, t) {
              this.performance ? e.emit(t) : this.zone.run(() => e.emit(t));
            }
            swiper() {
              return this.instance;
            }
            init() {
              this.instance &&
                this.zone.runOutsideAngular(() => {
                  this.instance.init();
                });
            }
            update() {
              setTimeout(() => {
                this.instance &&
                  this.zone.runOutsideAngular(() => {
                    this.instance.update();
                  });
              }, 0);
            }
            getIndex(e) {
              return this.instance
                ? e
                  ? this.instance.realIndex
                  : this.instance.activeIndex
                : this.initialIndex || 0;
            }
            setIndex(e, t, i) {
              if (this.instance) {
                let s = e * this.instance.params.slidesPerGroup;
                this.instance.params.loop && (s += this.instance.loopedSlides),
                  this.zone.runOutsideAngular(() => {
                    this.instance.slideTo(s, t, !i);
                  });
              } else this.initialIndex = e;
            }
            prevSlide(e, t) {
              this.instance &&
                this.zone.runOutsideAngular(() => {
                  this.instance.slidePrev(e, !t);
                });
            }
            nextSlide(e, t) {
              this.instance &&
                this.zone.runOutsideAngular(() => {
                  this.instance.slideNext(e, !t);
                });
            }
            stopAutoplay(e) {
              e && this.setIndex(0),
                this.instance &&
                  this.instance.autoplay &&
                  this.zone.runOutsideAngular(() => {
                    this.instance.autoplay.stop();
                  });
            }
            startAutoplay(e) {
              e && this.setIndex(0),
                this.instance &&
                  this.instance.autoplay &&
                  this.zone.runOutsideAngular(() => {
                    this.instance.autoplay.start();
                  });
            }
          };
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                b.Hb(b.B),
                b.Hb(b.z),
                b.Hb(b.l),
                b.Hb(b.t),
                b.Hb(di, 8)
              );
            }),
            (e.ɵdir = b.Cb({
              type: e,
              selectors: [["", "swiper", ""]],
              inputs: {
                disabled: "disabled",
                performance: "performance",
                index: "index",
                config: ["swiper", "config"],
              },
              outputs: {
                indexChange: "indexChange",
                S_INIT: "init",
                S_BEFOREDESTROY: "beforeDestroy",
                S_SCROLL: "scroll",
                S_PROGRESS: "progress",
                S_KEYPRESS: "keyPress",
                S_RESIZE: "resize",
                S_BREAKPOINT: "breakpoint",
                S_ZOOMCHANGE: "zoomChange",
                S_AFTERRESIZE: "afterResize",
                S_BEFORERESIZE: "beforeResize",
                S_LOOPFIX: "loopFix",
                S_BEFORELOOPFIX: "beforeLoopFix",
                S_SLIDERMOVE: "sliderMove",
                S_SLIDECHANGE: "slideChange",
                S_SETTRANSLATE: "setTranslate",
                S_SETTRANSITION: "setTransition",
                S_FROMEDGE: "fromEdge",
                S_REACHEND: "reachEnd",
                S_REACHBEGINNING: "reachBeginning",
                S_AUTOPLAY: "autoplay",
                S_AUTOPLAYSTART: "autoplayStart",
                S_AUTOPLAYSTOP: "autoplayStop",
                S_IMAGESREADY: "imagesReady",
                S_LAZYIMAGELOAD: "lazyImageLoad",
                S_LAZYIMAGEREADY: "lazyImageReady",
                S_SCROLLDRAGEND: "scrollDragEnd",
                S_SCROLLDRAGMOVE: "scrollDragMove",
                S_SCROLLDRAGSTART: "scrollDragStart",
                S_NAVIGATIONHIDE: "navigationHide",
                S_NAVIGATIONSHOW: "navigationShow",
                S_PAGINATIONRENDER: "paginationRender",
                S_PAGINATIONUPDATE: "paginationUpdate",
                S_PAGINATIONHIDE: "paginationHide",
                S_PAGINATIONSHOW: "paginationShow",
                S_TAP: "swiperTap",
                S_CLICK: "swiperClick",
                S_DOUBLETAP: "swiperDoubleTap",
                S_TOUCHEND: "swiperTouchEnd",
                S_TOUCHMOVE: "swiperTouchMove",
                S_TOUCHSTART: "swiperTouchStart",
                S_TOUCHMOVEOPPOSITE: "swiperTouchMoveOpposite",
                S_TRANSITIONEND: "swiperTransitionEnd",
                S_TRANSITIONSTART: "swiperTransitionStart",
                S_SLIDEPREVTRANSITIONEND: "slidePrevTransitionEnd",
                S_SLIDEPREVTRANSITIONSTART: "slidePrevTransitionStart",
                S_SLIDENEXTTRANSITIONEND: "slideNextTransitionEnd",
                S_SLIDENEXTTRANSITIONSTART: "slideNextTransitionStart",
                S_SLIDECHANGETRANSITIONEND: "slideChangeTransitionEnd",
                S_SLIDECHANGETRANSITIONSTART: "slideChangeTransitionStart",
              },
              exportAs: ["ngxSwiper"],
              features: [b.vb],
            })),
            e
          );
        })(),
        ui = (() => {
          let e = class {
            constructor(e, t, i, s) {
              (this.zone = e),
                (this.cdRef = t),
                (this.platformId = i),
                (this.defaults = s),
                (this.mo = null),
                (this.swiperConfig = null),
                (this.paginationBackup = null),
                (this.paginationConfig = null),
                (this.index = null),
                (this.disabled = !1),
                (this.performance = !1),
                (this.useSwiperClass = !0),
                (this.indexChange = new b.n()),
                (this.S_INIT = new b.n()),
                (this.S_BEFOREDESTROY = new b.n()),
                (this.S_SCROLL = new b.n()),
                (this.S_PROGRESS = new b.n()),
                (this.S_KEYPRESS = new b.n()),
                (this.S_RESIZE = new b.n()),
                (this.S_BREAKPOINT = new b.n()),
                (this.S_ZOOMCHANGE = new b.n()),
                (this.S_AFTERRESIZE = new b.n()),
                (this.S_BEFORERESIZE = new b.n()),
                (this.S_BEFORELOOPFIX = new b.n()),
                (this.S_LOOPFIX = new b.n()),
                (this.S_SLIDERMOVE = new b.n()),
                (this.S_SLIDECHANGE = new b.n()),
                (this.S_SETTRANSLATE = new b.n()),
                (this.S_SETTRANSITION = new b.n()),
                (this.S_FROMEDGE = new b.n()),
                (this.S_REACHEND = new b.n()),
                (this.S_REACHBEGINNING = new b.n()),
                (this.S_AUTOPLAY = new b.n()),
                (this.S_AUTOPLAYSTART = new b.n()),
                (this.S_AUTOPLAYSTOP = new b.n()),
                (this.S_IMAGESREADY = new b.n()),
                (this.S_LAZYIMAGELOAD = new b.n()),
                (this.S_LAZYIMAGEREADY = new b.n()),
                (this.S_SCROLLDRAGEND = new b.n()),
                (this.S_SCROLLDRAGMOVE = new b.n()),
                (this.S_SCROLLDRAGSTART = new b.n()),
                (this.S_NAVIGATIONHIDE = new b.n()),
                (this.S_NAVIGATIONSHOW = new b.n()),
                (this.S_PAGINATIONRENDER = new b.n()),
                (this.S_PAGINATIONUPDATE = new b.n()),
                (this.S_PAGINATIONHIDE = new b.n()),
                (this.S_PAGINATIONSHOW = new b.n()),
                (this.S_TAP = new b.n()),
                (this.S_CLICK = new b.n()),
                (this.S_DOUBLETAP = new b.n()),
                (this.S_TOUCHEND = new b.n()),
                (this.S_TOUCHMOVE = new b.n()),
                (this.S_TOUCHSTART = new b.n()),
                (this.S_TOUCHMOVEOPPOSITE = new b.n()),
                (this.S_TRANSITIONEND = new b.n()),
                (this.S_TRANSITIONSTART = new b.n()),
                (this.S_SLIDEPREVTRANSITIONEND = new b.n()),
                (this.S_SLIDEPREVTRANSITIONSTART = new b.n()),
                (this.S_SLIDENEXTTRANSITIONEND = new b.n()),
                (this.S_SLIDENEXTTRANSITIONSTART = new b.n()),
                (this.S_SLIDECHANGETRANSITIONEND = new b.n()),
                (this.S_SLIDECHANGETRANSITIONSTART = new b.n());
            }
            get isAtLast() {
              return (
                !(!this.directiveRef || !this.directiveRef.swiper()) &&
                this.directiveRef.swiper().isEnd
              );
            }
            get isAtFirst() {
              return (
                !(!this.directiveRef || !this.directiveRef.swiper()) &&
                this.directiveRef.swiper().isBeginning
              );
            }
            ngAfterViewInit() {
              Object(w.o)(this.platformId) &&
                (this.zone.runOutsideAngular(() => {
                  this.updateClasses(),
                    this.swiperSlides &&
                      "undefined" != typeof MutationObserver &&
                      ((this.mo = new MutationObserver(() => {
                        this.updateClasses();
                      })),
                      this.mo.observe(this.swiperSlides.nativeElement, {
                        childList: !0,
                      }));
                }),
                window.setTimeout(() => {
                  this.directiveRef &&
                    (this.S_INIT.emit(),
                    (this.directiveRef.indexChange = this.indexChange),
                    pi.forEach((e) => {
                      if (this.directiveRef) {
                        const t = "S_" + e.replace("swiper", "").toUpperCase();
                        this.directiveRef[t] = this[t];
                      }
                    }));
                }, 0));
            }
            ngOnDestroy() {
              this.mo && this.mo.disconnect(),
                this.config &&
                  this.paginationBackup &&
                  (this.config.pagination = this.paginationBackup);
            }
            getConfig() {
              return (
                (this.swiperConfig = new hi(this.defaults)),
                this.swiperConfig.assign(this.config),
                !this.swiperSlides ||
                  (!0 !== this.swiperConfig.pagination &&
                    (!this.swiperConfig.pagination ||
                      "object" != typeof this.swiperConfig.pagination ||
                      (this.swiperConfig.pagination.type &&
                        "bullets" !== this.swiperConfig.pagination.type) ||
                      this.swiperConfig.pagination.renderBullet ||
                      ".swiper-pagination" !==
                        this.swiperConfig.pagination.el)) ||
                  ((this.config = this.config || {}),
                  this.paginationConfig ||
                    ((this.paginationBackup = this.config.pagination),
                    (this.paginationConfig = {
                      el: ".swiper-pagination",
                      renderBullet: (e, t) => {
                        let i = this.swiperSlides
                          ? Array.from(this.swiperSlides.nativeElement.children)
                          : [];
                        i = i.filter((e) =>
                          e.classList.contains("swiper-slide")
                        );
                        let s = `<span class="${t} ${t}-middle" index="${e}"></span>`;
                        return (
                          0 === e
                            ? (s = `<span class="${t} ${t}-first" index="${e}"></span>`)
                            : e === i.length - 1 &&
                              (s = `<span class="${t} ${t}-last" index="${e}"></span>`),
                          `<span class="swiper-pagination-handle" index="${e}">${s}</span>`
                        );
                      },
                    })),
                  (this.config.pagination =
                    !0 === this.swiperConfig.pagination
                      ? this.paginationConfig
                      : Object.assign(
                          {},
                          this.config.pagination,
                          this.paginationConfig
                        ))),
                this.config
              );
            }
            updateClasses() {
              if (this.swiperSlides) {
                let e = !1;
                const t = this.swiperSlides.nativeElement.children;
                for (let i = 0; i < t.length; i++)
                  !1 === /swiper-.*/.test(t[i].className) &&
                    ((e = !0), t[i].classList.add("swiper-slide"));
                e && this.directiveRef && this.directiveRef.update();
              }
              this.cdRef.detectChanges();
            }
            onPaginationClick(e) {
              this.config &&
                this.directiveRef &&
                (!0 === this.config.pagination ||
                  (this.config.pagination &&
                    "object" == typeof this.config.pagination &&
                    (!this.config.pagination.type ||
                      "bullets" === this.config.pagination.type) &&
                    this.config.pagination.clickable &&
                    ".swiper-pagination" === this.config.pagination.el)) &&
                this.directiveRef.setIndex(e);
            }
          };
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(b.Hb(b.z), b.Hb(b.h), b.Hb(b.B), b.Hb(di, 8));
            }),
            (e.ɵcmp = b.Bb({
              type: e,
              selectors: [["swiper"]],
              viewQuery: function (e, t) {
                var i;
                1 & e && (b.hc(oi, !0), b.hc(ci, !0)),
                  2 & e &&
                    (b.ac((i = b.Tb())) && (t.swiperSlides = i.first),
                    b.ac((i = b.Tb())) && (t.directiveRef = i.first));
              },
              inputs: {
                index: "index",
                disabled: "disabled",
                performance: "performance",
                useSwiperClass: "useSwiperClass",
                config: "config",
              },
              outputs: {
                indexChange: "indexChange",
                S_INIT: "init",
                S_BEFOREDESTROY: "beforeDestroy",
                S_SCROLL: "scroll",
                S_PROGRESS: "progress",
                S_KEYPRESS: "keyPress",
                S_RESIZE: "resize",
                S_BREAKPOINT: "breakpoint",
                S_ZOOMCHANGE: "zoomChange",
                S_AFTERRESIZE: "afterResize",
                S_BEFORERESIZE: "beforeResize",
                S_BEFORELOOPFIX: "beforeLoopFix",
                S_LOOPFIX: "loopFix",
                S_SLIDERMOVE: "sliderMove",
                S_SLIDECHANGE: "slideChange",
                S_SETTRANSLATE: "setTranslate",
                S_SETTRANSITION: "setTransition",
                S_FROMEDGE: "fromEdge",
                S_REACHEND: "reachEnd",
                S_REACHBEGINNING: "reachBeginning",
                S_AUTOPLAY: "autoplay",
                S_AUTOPLAYSTART: "autoplayStart",
                S_AUTOPLAYSTOP: "autoplayStop",
                S_IMAGESREADY: "imagesReady",
                S_LAZYIMAGELOAD: "lazyImageLoad",
                S_LAZYIMAGEREADY: "lazyImageReady",
                S_SCROLLDRAGEND: "scrollDragEnd",
                S_SCROLLDRAGMOVE: "scrollDragMove",
                S_SCROLLDRAGSTART: "scrollDragStart",
                S_NAVIGATIONHIDE: "navigationHide",
                S_NAVIGATIONSHOW: "navigationShow",
                S_PAGINATIONRENDER: "paginationRender",
                S_PAGINATIONUPDATE: "paginationUpdate",
                S_PAGINATIONHIDE: "paginationHide",
                S_PAGINATIONSHOW: "paginationShow",
                S_TAP: "swiperTap",
                S_CLICK: "swiperClick",
                S_DOUBLETAP: "swiperDoubleTap",
                S_TOUCHEND: "swiperTouchEnd",
                S_TOUCHMOVE: "swiperTouchMove",
                S_TOUCHSTART: "swiperTouchStart",
                S_TOUCHMOVEOPPOSITE: "swiperTouchMoveOpposite",
                S_TRANSITIONEND: "swiperTransitionEnd",
                S_TRANSITIONSTART: "swiperTransitionStart",
                S_SLIDEPREVTRANSITIONEND: "slidePrevTransitionEnd",
                S_SLIDEPREVTRANSITIONSTART: "slidePrevTransitionStart",
                S_SLIDENEXTTRANSITIONEND: "slideNextTransitionEnd",
                S_SLIDENEXTTRANSITIONSTART: "slideNextTransitionStart",
                S_SLIDECHANGETRANSITIONEND: "slideChangeTransitionEnd",
                S_SLIDECHANGETRANSITIONSTART: "slideChangeTransitionStart",
              },
              exportAs: ["ngxSwiper"],
              ngContentSelectors: li,
              decls: 9,
              vars: 14,
              consts: [
                [
                  1,
                  "s-wrapper",
                  3,
                  "swiper",
                  "index",
                  "disabled",
                  "performance",
                ],
                ["swiper", ""],
                [1, "swiper-wrapper"],
                ["swiperSlides", ""],
                [1, "swiper-scrollbar", 3, "hidden"],
                [1, "swiper-button-prev", 3, "hidden"],
                [1, "swiper-button-next", 3, "hidden"],
                [1, "swiper-pagination", 3, "hidden", "click", "keyup.enter"],
              ],
              template: function (e, t) {
                1 & e &&
                  (b.Wb(),
                  b.Kb(0, "div", 0, 1),
                  b.Kb(2, "div", 2, 3),
                  b.Vb(4),
                  b.Jb(),
                  b.Ib(5, "div", 4),
                  b.Ib(6, "div", 5),
                  b.Ib(7, "div", 6),
                  b.Kb(8, "div", 7),
                  b.Sb("click", function (e) {
                    return t.onPaginationClick(e.target.getAttribute("index"));
                  })("keyup.enter", function (e) {
                    return t.onPaginationClick(e.target.getAttribute("index"));
                  }),
                  b.Jb(),
                  b.Jb()),
                  2 & e &&
                    (b.zb("swiper", t.useSwiperClass)(
                      "swiper-container",
                      t.useSwiperClass
                    ),
                    b.Xb("swiper", t.getConfig())("index", t.index)(
                      "disabled",
                      t.disabled
                    )("performance", t.performance),
                    b.xb(5),
                    b.Xb(
                      "hidden",
                      !(null != t.swiperConfig && t.swiperConfig.scrollbar) ||
                        (!0 !==
                          (null == t.swiperConfig
                            ? null
                            : t.swiperConfig.scrollbar) &&
                          !(
                            null == t.swiperConfig ||
                            null == t.swiperConfig.scrollbar ||
                            !t.swiperConfig.scrollbar.el
                          ) &&
                          ".swiper-scrollbar" !==
                            (null == t.swiperConfig ||
                            null == t.swiperConfig.scrollbar
                              ? null
                              : t.swiperConfig.scrollbar.el))
                    ),
                    b.xb(1),
                    b.Xb(
                      "hidden",
                      !(null != t.swiperConfig && t.swiperConfig.navigation) ||
                        (!0 !==
                          (null == t.swiperConfig
                            ? null
                            : t.swiperConfig.navigation) &&
                          !(
                            null == t.swiperConfig ||
                            null == t.swiperConfig.navigation ||
                            !t.swiperConfig.navigation.prevEl
                          ) &&
                          ".swiper-button-prev" !==
                            (null == t.swiperConfig ||
                            null == t.swiperConfig.navigation
                              ? null
                              : t.swiperConfig.navigation.prevEl))
                    ),
                    b.yb("disabled", t.isAtFirst || null),
                    b.xb(1),
                    b.Xb(
                      "hidden",
                      !(null != t.swiperConfig && t.swiperConfig.navigation) ||
                        (!0 !==
                          (null == t.swiperConfig
                            ? null
                            : t.swiperConfig.navigation) &&
                          !(
                            null == t.swiperConfig ||
                            null == t.swiperConfig.navigation ||
                            !t.swiperConfig.navigation.nextEl
                          ) &&
                          ".swiper-button-next" !==
                            (null == t.swiperConfig ||
                            null == t.swiperConfig.navigation
                              ? null
                              : t.swiperConfig.navigation.nextEl))
                    ),
                    b.yb("disabled", t.isAtLast || null),
                    b.xb(1),
                    b.Xb(
                      "hidden",
                      !(null != t.swiperConfig && t.swiperConfig.pagination) ||
                        (!0 !==
                          (null == t.swiperConfig
                            ? null
                            : t.swiperConfig.pagination) &&
                          !(
                            null == t.swiperConfig ||
                            null == t.swiperConfig.pagination ||
                            !t.swiperConfig.pagination.el
                          ) &&
                          ".swiper-pagination" !==
                            (null == t.swiperConfig ||
                            null == t.swiperConfig.pagination
                              ? null
                              : t.swiperConfig.pagination.el))
                    ));
              },
              directives: [ci],
              styles: [
                "swiper[fxflex]{display:-webkit-box;display:flex;flex-direction:inherit;min-width:0;min-height:0;-webkit-box-direction:inherit;-webkit-box-orient:inherit}swiper[fxflex]>.swiper.s-wrapper{flex:1 1 auto;min-width:0;min-height:0;-webkit-box-flex:1}swiper>.swiper.s-wrapper{width:100%;height:100%}swiper>.swiper.s-wrapper .swiper-wrapper .swiper-slide{will-change:transform;overflow:auto;width:100%;height:100%;max-width:100%;max-height:100%}swiper>.swiper.s-wrapper .swiper-pagination{pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle{position:relative;display:inline-block;padding:4px;margin:2px;cursor:pointer;pointer-events:all}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block;margin:0;pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{border:1px solid rgba(0,0,0,.5)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-prev{top:10px;left:50%;margin-top:0;margin-left:-13px;-webkit-transform:rotate(90deg);transform:rotate(90deg)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-next{top:auto;bottom:10px;left:50%;margin-top:0;margin-left:-13px;-webkit-transform:rotate(90deg);transform:rotate(90deg)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar{width:8px;-webkit-transition:width 250ms ease-in-out;transition:width 250ms ease-in-out}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar:hover{width:16px}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle{display:block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:0 -1px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar{height:8px;-webkit-transition:height 250ms ease-in-out;transition:height 250ms ease-in-out}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar:hover{height:16px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:-1px 0}",
                "@font-face{font-family:swiper-icons;src:url(\"data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA\") format(\"woff\");font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff;--swiper-navigation-size:44px}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:flex;-webkit-transition-property:-webkit-transform;transition-property:transform,-webkit-transform;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{flex-wrap:wrap;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:transform,-webkit-transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(-1 * var(--swiper-navigation-size)/ 2);z-index:10;cursor:pointer;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;text-transform:none;font-variant:initial}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{right:10px;left:auto}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:'next'}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#ffffff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:opacity .3s;transition:opacity .3s;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:transform .2s,top .2s;transition:transform .2s,top .2s}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:transform .2s,left .2s;transition:transform .2s,left .2s}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:transform .2s,right .2s;transition:transform .2s,right .2s}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white{--swiper-pagination-color:#ffffff}.swiper-pagination-black{--swiper-pagination-color:#000000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:1s linear infinite swiper-preloader-spin;animation:1s linear infinite swiper-preloader-spin;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}",
              ],
              encapsulation: 2,
            })),
            e
          );
        })(),
        gi = (() => {
          let e = class {};
          return (
            (e.ɵmod = b.Fb({ type: e })),
            (e.ɵinj = b.Eb({
              factory: function (t) {
                return new (t || e)();
              },
              imports: [[w.b], w.b],
            })),
            e
          );
        })();
      function fi(e, t) {
        if ((1 & e && (b.Kb(0, "div", 8), b.Ib(1, "img", 9), b.Jb()), 2 & e)) {
          const e = t.$implicit;
          b.xb(1), b.Xb("src", e.img, b.cc);
        }
      }
      function mi(e, t) {
        if (
          (1 & e && (b.Kb(0, "swiper", 6), b.ec(1, fi, 2, 1, "div", 7), b.Jb()),
          2 & e)
        ) {
          const e = b.Ub();
          b.Xb("config", e.swiperConfig), b.xb(1), b.Xb("ngForOf", e.photos);
        }
      }
      const bi = [
        {
          path: "",
          component: Qe,
          children: [
            { path: "", component: qe, pathMatch: "full" },
            { path: "hbd", component: Ze, pathMatch: "full" },
            {
              path: "photos",
              component: (() => {
                class e {
                  constructor() {}
                  ngOnInit() {
                    (this.swiperConfig = {
                      effect: "coverflow",
                      autoplay: { delay: 1500 },
                      centeredSlides: !0,
                      loop: !0,
                    }),
                      (this.photos = [
                        { img: "assets/images/photos/1.jpeg" },
                        { img: "assets/images/photos/2.jpeg" },
                        { img: "assets/images/photos/3.jpeg" },
                        { img: "assets/images/photos/5.jpeg" },
                        { img: "assets/images/photos/6.jpeg" },
                        { img: "assets/images/photos/7.jpeg" },
                        { img: "assets/images/photos/8.jpeg" },
                        { img: "assets/images/photos/9.jpeg" },
                        { img: "assets/images/photos/10.jpeg" },
                        { img: "assets/images/photos/11.jpeg" },
                        { img: "assets/images/photos/12.jpeg" },
                        { img: "assets/images/photos/13.jpeg" },
                      ]);
                  }
                }
                return (
                  (e.ɵfac = function (t) {
                    return new (t || e)();
                  }),
                  (e.ɵcmp = b.Bb({
                    type: e,
                    selectors: [["app-photos"]],
                    decls: 15,
                    vars: 1,
                    consts: [
                      ["id", "photos"],
                      [
                        "fxFlex",
                        "",
                        "fxLayout",
                        "row",
                        "fxLayout.lt-md",
                        "column",
                        "fxLayoutAlign",
                        "center center",
                      ],
                      [1, "image-slider"],
                      ["class", "swiper-container", 3, "config", 4, "ngIf"],
                      [1, "wish-container", "p-5"],
                      [1, "d-block", "text-right"],
                      [1, "swiper-container", 3, "config"],
                      [
                        "class",
                        "swiper-slide",
                        "fxLayoutAlign",
                        "center center",
                        4,
                        "ngFor",
                        "ngForOf",
                      ],
                      ["fxLayoutAlign", "center center", 1, "swiper-slide"],
                      ["alt", "slide.banner_title", 1, "slide-img", 3, "src"],
                    ],
                    template: function (e, t) {
                      1 & e &&
                        (b.Kb(0, "div", 0),
                        b.Kb(1, "div", 1),
                        b.Kb(2, "div", 2),
                        b.ec(3, mi, 2, 2, "swiper", 3),
                        b.Jb(),
                        b.Kb(4, "div", 4),
                        b.Kb(5, "span"),
                        b.fc(6, "Once Again,"),
                        b.Jb(),
                        b.Ib(7, "br"),
                        b.Ib(8, "br"),
                        b.Kb(9, "span"),
                        b.fc(
                          10,
                          "Wish you many more happy returns of the day\ud83c\udf82"
                        ),
                        b.Jb(),
                        b.Ib(11, "br"),
                        b.Ib(12, "br"),
                        b.Kb(13, "span", 5),
                        b.fc(
                          14,
                          "\ud83e\udd17\ud83e\udd17\ud83e\udd17Durga Prasad...."
                        ),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Jb()),
                        2 & e &&
                          (b.xb(3), b.Xb("ngIf", t.photos && t.photos.length));
                    },
                    directives: [Oe, ye, De, w.j, ui, w.i],
                    styles: [
                      "#photos[_ngcontent-%COMP%]{width:100%;background:url(/assets/images/backgrounds/photos.jpg) no-repeat;background-size:cover}#photos[_ngcontent-%COMP%]   .image-slider[_ngcontent-%COMP%]{width:500px;height:550px;max-width:100%;max-height:100%}#photos[_ngcontent-%COMP%]   .image-slider[_ngcontent-%COMP%]   .slide-img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;margin:auto}@media screen and (max-width:480px){#photos[_ngcontent-%COMP%]   .image-slider[_ngcontent-%COMP%]{width:250px;height:575px}}#photos[_ngcontent-%COMP%]   .wish-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:30px;font-weight:700;font-style:italic;color:rgba(0,0,0,.52)}",
                    ],
                  })),
                  e
                );
              })(),
              pathMatch: "full",
            },
            {
              path: "wish",
              component: (() => {
                class e {
                  constructor() {}
                  ngOnInit() {}
                }
                return (
                  (e.ɵfac = function (t) {
                    return new (t || e)();
                  }),
                  (e.ɵcmp = b.Bb({
                    type: e,
                    selectors: [["app-wish"]],
                    decls: 101,
                    vars: 18,
                    consts: [
                      ["id", "wish"],
                      [
                        "fxFlex",
                        "",
                        "fxLayout",
                        "column",
                        "fxLayoutAlign",
                        "center",
                        1,
                        "content",
                      ],
                      [1, "wish-content"],
                      [
                        "fxLayout",
                        "row",
                        "fxLayout.lt-md",
                        "column",
                        "fxLayoutAlign",
                        "center center",
                      ],
                      [1, "wish-image"],
                      [
                        "src",
                        "assets/images/wish/smilies.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [1, "wish-text"],
                      [1, "d-block", "text-right"],
                      [1, "d-block", "text-center", "hbdtxt"],
                      [
                        "src",
                        "assets/images/wish/memories.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/DPHRR.png",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/cacke.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/teddy.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/pr.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/bdaygirl.png",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/celebrations.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/hands.jpg",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      [
                        "src",
                        "assets/images/wish/3452.jpg\n            ",
                        "alt",
                        "",
                        "srcset",
                        "",
                      ],
                      ["routerLink", "/photos", 1, "btn", "btn-dark"],
                    ],
                    template: function (e, t) {
                      1 & e &&
                        (b.Kb(0, "div", 0),
                        b.Kb(1, "div", 1),
                        b.Kb(2, "div", 2),
                        b.Kb(3, "div", 3),
                        b.Kb(4, "div", 4),
                        b.Ib(5, "img", 5),
                        b.Jb(),
                        b.Kb(6, "div", 6),
                        b.fc(
                          7,
                          " Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy "
                        ),
                        b.Ib(8, "br"),
                        b.Ib(9, "br"),
                        b.Kb(10, "span", 7),
                        b.fc(11, "--Kepp Smile\ud83d\ude42"),
                        b.Jb(),
                        b.Ib(12, "br"),
                        b.Kb(13, "span", 8),
                        b.fc(14, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(15, "div", 2),
                        b.Kb(16, "div", 3),
                        b.Kb(17, "div", 6),
                        b.fc(
                          18,
                          " May be the time we spent is less, but the memories that i have with you are a lot... "
                        ),
                        b.Kb(19, "span", 7),
                        b.fc(20, "--Keep Going\ud83e\udd17"),
                        b.Jb(),
                        b.Ib(21, "br"),
                        b.Kb(22, "span", 8),
                        b.fc(23, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(24, "div", 4),
                        b.Ib(25, "img", 9),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(26, "div", 2),
                        b.Kb(27, "div", 3),
                        b.Kb(28, "div", 4),
                        b.Ib(29, "img", 10),
                        b.Jb(),
                        b.Kb(30, "div", 6),
                        b.fc(
                          31,
                          " Glad to see you traditionally but still it remembers an unfair day. "
                        ),
                        b.Kb(32, "span", 7),
                        b.fc(
                          33,
                          "--\ud83d\ude0d\ud83d\ude0d\ud83d\ude12\ud83d\ude12"
                        ),
                        b.Jb(),
                        b.Ib(34, "br"),
                        b.Kb(35, "span", 8),
                        b.fc(36, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(37, "div", 2),
                        b.Kb(38, "div", 3),
                        b.Kb(39, "div", 6),
                        b.fc(
                          40,
                          " Wish you all the love your heart can hold. all the joy a day can bring. and all the cake your stomach can handle "
                        ),
                        b.Ib(41, "br"),
                        b.Ib(42, "br"),
                        b.Kb(43, "span", 7),
                        b.fc(
                          44,
                          "--\ud83e\udd17\ud83e\udd17Happy Birth Day\ud83e\udd17\ud83e\udd17"
                        ),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(45, "div", 4),
                        b.Ib(46, "img", 11),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(47, "div", 2),
                        b.Kb(48, "div", 3),
                        b.Kb(49, "div", 4),
                        b.Ib(50, "img", 12),
                        b.Jb(),
                        b.Kb(51, "div", 6),
                        b.fc(
                          52,
                          " You are the first one that i addicted in a very short timne. "
                        ),
                        b.Ib(53, "br"),
                        b.Ib(54, "br"),
                        b.Kb(55, "span", 7),
                        b.fc(56, "--not to recover\ud83e\udd2a"),
                        b.Jb(),
                        b.Ib(57, "br"),
                        b.Kb(58, "span", 8),
                        b.fc(59, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(60, "div", 2),
                        b.Kb(61, "div", 3),
                        b.Kb(62, "div", 4),
                        b.Ib(63, "img", 13),
                        b.Jb(),
                        b.Kb(64, "div", 4),
                        b.Ib(65, "img", 14),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(66, "div", 2),
                        b.Kb(67, "div", 3),
                        b.Kb(68, "div", 6),
                        b.fc(
                          69,
                          " You'r birth day may be in this month but i started remembering from a month ago with the words that describes you. "
                        ),
                        b.Kb(70, "span", 7),
                        b.fc(
                          71,
                          "--\ud83d\ude43\ud83d\ude43\ud83d\ude43\ud83d\ude43"
                        ),
                        b.Jb(),
                        b.Ib(72, "br"),
                        b.Kb(73, "span", 8),
                        b.fc(74, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(75, "div", 4),
                        b.Ib(76, "img", 15),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(77, "div", 2),
                        b.Kb(78, "div", 3),
                        b.Kb(79, "div", 4),
                        b.Ib(80, "img", 16),
                        b.Jb(),
                        b.Kb(81, "div", 6),
                        b.fc(
                          82,
                          " When i was thinking the time we spent for fight together is more then the time we spent for each other. "
                        ),
                        b.Kb(83, "span", 7),
                        b.fc(84, "--\ud83d\ude0d\ud83d\ude0d\ud83d\ude0d"),
                        b.Jb(),
                        b.Ib(85, "br"),
                        b.Kb(86, "span", 8),
                        b.fc(87, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(88, "div", 2),
                        b.Kb(89, "div", 3),
                        b.Kb(90, "div", 6),
                        b.fc(
                          91,
                          " First post that you haven't ask me for like \ud83e\udd23\ud83e\udd23\ud83e\udd23. "
                        ),
                        b.Kb(92, "span", 7),
                        b.fc(93, "--@Instagram"),
                        b.Jb(),
                        b.Ib(94, "br"),
                        b.Kb(95, "span", 8),
                        b.fc(96, "Happy Birth Day"),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(97, "div", 4),
                        b.Ib(98, "img", 17),
                        b.Jb(),
                        b.Jb(),
                        b.Jb(),
                        b.Kb(99, "button", 18),
                        b.fc(
                          100,
                          "Wish You Many More Happy returns Of The Day\ud83d\udc90"
                        ),
                        b.Jb(),
                        b.Jb(),
                        b.Jb()),
                        2 & e &&
                          (b.xb(4),
                          b.Xb("@slideInTop", void 0),
                          b.xb(2),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(11),
                          b.Xb("@slideInTop", void 0),
                          b.xb(7),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(4),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(2),
                          b.Xb("@slideInTop", void 0),
                          b.xb(9),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(6),
                          b.Xb("@slideInTop", void 0),
                          b.xb(4),
                          b.Xb("@slideInTop", void 0),
                          b.xb(2),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(11),
                          b.Xb("@slideInTop", void 0),
                          b.xb(2),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(4),
                          b.Xb("@slideInTop", void 0),
                          b.xb(7),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(4),
                          b.Xb("@slideInBottom", void 0),
                          b.xb(2),
                          b.Xb("@slideInTop", void 0),
                          b.xb(9),
                          b.Xb("@slideInTop", void 0),
                          b.xb(7),
                          b.Xb("@slideInBottom", void 0));
                    },
                    directives: [Oe, ye, De, s.b],
                    styles: [
                      "#wish[_ngcontent-%COMP%]{width:100%;background:url(/assets/images/backgrounds/darknight.jpg) no-repeat;background-size:cover}#wish[_ngcontent-%COMP%]   .wish-content[_ngcontent-%COMP%]{padding:20px}#wish[_ngcontent-%COMP%]   .wish-content[_ngcontent-%COMP%]   .wish-image[_ngcontent-%COMP%]{width:300px;padding:20px}#wish[_ngcontent-%COMP%]   .wish-content[_ngcontent-%COMP%]   .wish-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:25px;width:100%}#wish[_ngcontent-%COMP%]   .wish-content[_ngcontent-%COMP%]   .wish-text[_ngcontent-%COMP%]{color:#fff;padding:20px;width:300px}#wish[_ngcontent-%COMP%]   .wish-content[_ngcontent-%COMP%]   .wish-text[_ngcontent-%COMP%]   .hbdtxt[_ngcontent-%COMP%]{font-style:italic;font-weight:800;color:rgba(125,207,99,.89)}",
                    ],
                    data: { animation: r },
                  })),
                  e
                );
              })(),
              pathMatch: "full",
            },
          ],
        },
      ];
      let wi = (() => {
        class e {}
        return (
          (e.ɵmod = b.Fb({ type: e })),
          (e.ɵinj = b.Eb({
            factory: function (t) {
              return new (t || e)();
            },
            imports: [[s.c.forChild(bi)], s.c],
          })),
          e
        );
      })();
      i("jhN1");
      let vi = (() => {
          class e {}
          return (
            (e.ɵmod = b.Fb({ type: e })),
            (e.ɵinj = b.Eb({
              factory: function (t) {
                return new (t || e)();
              },
              imports: [[L]],
            })),
            e
          );
        })(),
        xi = (() => {
          class e {}
          return (
            (e.ɵmod = b.Fb({ type: e })),
            (e.ɵinj = b.Eb({
              factory: function (t) {
                return new (t || e)();
              },
              imports: [[L]],
            })),
            e
          );
        })(),
        yi = (() => {
          class e {
            constructor(e, t) {
              Object(w.p)(t) &&
                !e &&
                console.warn(
                  "Warning: Flex Layout loaded on the server without FlexLayoutServerModule"
                );
            }
            static withConfig(t, i = []) {
              return {
                ngModule: e,
                providers: t.serverLoaded
                  ? [
                      {
                        provide: D,
                        useValue: Object.assign(Object.assign({}, z), t),
                      },
                      { provide: R, useValue: i, multi: !0 },
                      { provide: N, useValue: !0 },
                    ]
                  : [
                      {
                        provide: D,
                        useValue: Object.assign(Object.assign({}, z), t),
                      },
                      { provide: R, useValue: i, multi: !0 },
                    ],
              };
            }
          }
          return (
            (e.ɵmod = b.Fb({ type: e })),
            (e.ɵinj = b.Eb({
              factory: function (t) {
                return new (t || e)(b.Ob(N), b.Ob(b.B));
              },
              imports: [[Ve, vi, xi], Ve, vi, xi],
            })),
            e
          );
        })(),
        Ei = (() => {
          class e {}
          return (
            (e.ɵmod = b.Fb({ type: e })),
            (e.ɵinj = b.Eb({
              factory: function (t) {
                return new (t || e)();
              },
              imports: [[w.b, yi], w.b, yi],
            })),
            e
          );
        })();
      const Si = { direction: "horizontal", slidesPerView: "auto" };
      let Ti = (() => {
        class e {}
        return (
          (e.ɵmod = b.Fb({ type: e })),
          (e.ɵinj = b.Eb({
            factory: function (t) {
              return new (t || e)();
            },
            providers: [{ provide: di, useValue: Si }],
            imports: [[Ei, wi, gi]],
          })),
          e
        );
      })();
    },
  },
]);
