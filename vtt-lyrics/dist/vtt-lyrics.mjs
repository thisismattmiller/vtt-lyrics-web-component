function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), i = e.split(",");
  for (let s = 0; s < i.length; s++)
    n[i[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const X = {}, tt = [], ye = () => {
}, ys = () => !1, xs = /^on[^a-z]/, Bt = (e) => xs.test(e), wn = (e) => e.startsWith("onUpdate:"), ne = Object.assign, vn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ws = Object.prototype.hasOwnProperty, k = (e, t) => ws.call(e, t), U = Array.isArray, nt = (e) => jt(e) === "[object Map]", Ci = (e) => jt(e) === "[object Set]", H = (e) => typeof e == "function", ie = (e) => typeof e == "string", Tn = (e) => typeof e == "symbol", G = (e) => e !== null && typeof e == "object", Oi = (e) => G(e) && H(e.then) && H(e.catch), Ai = Object.prototype.toString, jt = (e) => Ai.call(e), vs = (e) => jt(e).slice(8, -1), Ii = (e) => jt(e) === "[object Object]", En = (e) => ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, St = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), kt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ts = /-(\w)/g, Me = kt((e) => e.replace(Ts, (t, n) => n ? n.toUpperCase() : "")), Es = /\B([A-Z])/g, ge = kt(
  (e) => e.replace(Es, "-$1").toLowerCase()
), Pi = kt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), Jt = kt(
  (e) => e ? `on${Pi(e)}` : ""
), Nt = (e, t) => !Object.is(e, t), Zt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Dt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Cs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, qn = (e) => {
  const t = ie(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Yn;
const ln = () => Yn || (Yn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Wt(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n], s = ie(i) ? Ps(i) : Wt(i);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (ie(e))
      return e;
    if (G(e))
      return e;
  }
}
const Os = /;(?![^(]*\))/g, As = /:([^]+)/, Is = /\/\*[^]*?\*\//g;
function Ps(e) {
  const t = {};
  return e.replace(Is, "").split(Os).forEach((n) => {
    if (n) {
      const i = n.split(As);
      i.length > 1 && (t[i[0].trim()] = i[1].trim());
    }
  }), t;
}
function mt(e) {
  let t = "";
  if (ie(e))
    t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const i = mt(e[n]);
      i && (t += i + " ");
    }
  else if (G(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ss = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Rs = /* @__PURE__ */ xn(Ss);
function Si(e) {
  return !!e || e === "";
}
const Tt = (e) => ie(e) ? e : e == null ? "" : U(e) || G(e) && (e.toString === Ai || !H(e.toString)) ? JSON.stringify(e, Ri, 2) : String(e), Ri = (e, t) => t && t.__v_isRef ? Ri(e, t.value) : nt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [i, s]) => (n[`${i} =>`] = s, n), {})
} : Ci(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : G(t) && !U(t) && !Ii(t) ? String(t) : t;
let me;
class Ms {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = me, !t && me && (this.index = (me.scopes || (me.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = me;
      try {
        return me = this, t();
      } finally {
        me = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    me = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    me = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++)
        this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Fs(e, t = me) {
  t && t.active && t.effects.push(e);
}
function Ns() {
  return me;
}
const Cn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Mi = (e) => (e.w & je) > 0, Fi = (e) => (e.n & je) > 0, Ds = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= je;
}, Us = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      Mi(s) && !Fi(s) ? s.delete(e) : t[n++] = s, s.w &= ~je, s.n &= ~je;
    }
    t.length = n;
  }
}, cn = /* @__PURE__ */ new WeakMap();
let ut = 0, je = 1;
const fn = 30;
let _e;
const Ye = Symbol(""), an = Symbol("");
class On {
  constructor(t, n = null, i) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Fs(this, i);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = _e, n = He;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = _e, _e = this, He = !0, je = 1 << ++ut, ut <= fn ? Ds(this) : Xn(this), this.fn();
    } finally {
      ut <= fn && Us(this), je = 1 << --ut, _e = this.parent, He = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    _e === this ? this.deferStop = !0 : this.active && (Xn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Xn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let He = !0;
const Ni = [];
function lt() {
  Ni.push(He), He = !1;
}
function ct() {
  const e = Ni.pop();
  He = e === void 0 ? !0 : e;
}
function ue(e, t, n) {
  if (He && _e) {
    let i = cn.get(e);
    i || cn.set(e, i = /* @__PURE__ */ new Map());
    let s = i.get(n);
    s || i.set(n, s = Cn()), Di(s);
  }
}
function Di(e, t) {
  let n = !1;
  ut <= fn ? Fi(e) || (e.n |= je, n = !Mi(e)) : n = !e.has(_e), n && (e.add(_e), _e.deps.push(e));
}
function Fe(e, t, n, i, s, r) {
  const o = cn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && U(e)) {
    const f = Number(i);
    o.forEach((d, _) => {
      (_ === "length" || _ >= f) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        U(e) ? En(n) && c.push(o.get("length")) : (c.push(o.get(Ye)), nt(e) && c.push(o.get(an)));
        break;
      case "delete":
        U(e) || (c.push(o.get(Ye)), nt(e) && c.push(o.get(an)));
        break;
      case "set":
        nt(e) && c.push(o.get(Ye));
        break;
    }
  if (c.length === 1)
    c[0] && un(c[0]);
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    un(Cn(f));
  }
}
function un(e, t) {
  const n = U(e) ? e : [...e];
  for (const i of n)
    i.computed && Gn(i);
  for (const i of n)
    i.computed || Gn(i);
}
function Gn(e, t) {
  (e !== _e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Ls = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), Ui = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Tn)
), Hs = /* @__PURE__ */ An(), Bs = /* @__PURE__ */ An(!1, !0), js = /* @__PURE__ */ An(!0), Jn = /* @__PURE__ */ ks();
function ks() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const i = W(this);
      for (let r = 0, o = this.length; r < o; r++)
        ue(i, "get", r + "");
      const s = i[t](...n);
      return s === -1 || s === !1 ? i[t](...n.map(W)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const i = W(this)[t].apply(this, n);
      return ct(), i;
    };
  }), e;
}
function Ws(e) {
  const t = W(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
function An(e = !1, t = !1) {
  return function(i, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? sr : ki : t ? ji : Bi).get(i))
      return i;
    const o = U(i);
    if (!e) {
      if (o && k(Jn, s))
        return Reflect.get(Jn, s, r);
      if (s === "hasOwnProperty")
        return Ws;
    }
    const c = Reflect.get(i, s, r);
    return (Tn(s) ? Ui.has(s) : Ls(s)) || (e || ue(i, "get", s), t) ? c : fe(c) ? o && En(s) ? c : c.value : G(c) ? e ? Wi(c) : Sn(c) : c;
  };
}
const Vs = /* @__PURE__ */ Li(), Ks = /* @__PURE__ */ Li(!0);
function Li(e = !1) {
  return function(n, i, s, r) {
    let o = n[i];
    if (gt(o) && fe(o) && !fe(s))
      return !1;
    if (!e && (!pn(s) && !gt(s) && (o = W(o), s = W(s)), !U(n) && fe(o) && !fe(s)))
      return o.value = s, !0;
    const c = U(n) && En(i) ? Number(i) < n.length : k(n, i), f = Reflect.set(n, i, s, r);
    return n === W(r) && (c ? Nt(s, o) && Fe(n, "set", i, s) : Fe(n, "add", i, s)), f;
  };
}
function zs(e, t) {
  const n = k(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && Fe(e, "delete", t, void 0), i;
}
function $s(e, t) {
  const n = Reflect.has(e, t);
  return (!Tn(t) || !Ui.has(t)) && ue(e, "has", t), n;
}
function qs(e) {
  return ue(e, "iterate", U(e) ? "length" : Ye), Reflect.ownKeys(e);
}
const Hi = {
  get: Hs,
  set: Vs,
  deleteProperty: zs,
  has: $s,
  ownKeys: qs
}, Ys = {
  get: js,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Xs = /* @__PURE__ */ ne(
  {},
  Hi,
  {
    get: Bs,
    set: Ks
  }
), In = (e) => e, Vt = (e) => Reflect.getPrototypeOf(e);
function Et(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = W(e), r = W(t);
  n || (t !== r && ue(s, "get", t), ue(s, "get", r));
  const { has: o } = Vt(s), c = i ? In : n ? Fn : Mn;
  if (o.call(s, t))
    return c(e.get(t));
  if (o.call(s, r))
    return c(e.get(r));
  e !== s && e.get(t);
}
function Ct(e, t = !1) {
  const n = this.__v_raw, i = W(n), s = W(e);
  return t || (e !== s && ue(i, "has", e), ue(i, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Ot(e, t = !1) {
  return e = e.__v_raw, !t && ue(W(e), "iterate", Ye), Reflect.get(e, "size", e);
}
function Zn(e) {
  e = W(e);
  const t = W(this);
  return Vt(t).has.call(t, e) || (t.add(e), Fe(t, "add", e, e)), this;
}
function Qn(e, t) {
  t = W(t);
  const n = W(this), { has: i, get: s } = Vt(n);
  let r = i.call(n, e);
  r || (e = W(e), r = i.call(n, e));
  const o = s.call(n, e);
  return n.set(e, t), r ? Nt(t, o) && Fe(n, "set", e, t) : Fe(n, "add", e, t), this;
}
function ei(e) {
  const t = W(this), { has: n, get: i } = Vt(t);
  let s = n.call(t, e);
  s || (e = W(e), s = n.call(t, e)), i && i.call(t, e);
  const r = t.delete(e);
  return s && Fe(t, "delete", e, void 0), r;
}
function ti() {
  const e = W(this), t = e.size !== 0, n = e.clear();
  return t && Fe(e, "clear", void 0, void 0), n;
}
function At(e, t) {
  return function(i, s) {
    const r = this, o = r.__v_raw, c = W(o), f = t ? In : e ? Fn : Mn;
    return !e && ue(c, "iterate", Ye), o.forEach((d, _) => i.call(s, f(d), f(_), r));
  };
}
function It(e, t, n) {
  return function(...i) {
    const s = this.__v_raw, r = W(s), o = nt(r), c = e === "entries" || e === Symbol.iterator && o, f = e === "keys" && o, d = s[e](...i), _ = n ? In : t ? Fn : Mn;
    return !t && ue(
      r,
      "iterate",
      f ? an : Ye
    ), {
      // iterator protocol
      next() {
        const { value: b, done: u } = d.next();
        return u ? { value: b, done: u } : {
          value: c ? [_(b[0]), _(b[1])] : _(b),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function De(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Gs() {
  const e = {
    get(r) {
      return Et(this, r);
    },
    get size() {
      return Ot(this);
    },
    has: Ct,
    add: Zn,
    set: Qn,
    delete: ei,
    clear: ti,
    forEach: At(!1, !1)
  }, t = {
    get(r) {
      return Et(this, r, !1, !0);
    },
    get size() {
      return Ot(this);
    },
    has: Ct,
    add: Zn,
    set: Qn,
    delete: ei,
    clear: ti,
    forEach: At(!1, !0)
  }, n = {
    get(r) {
      return Et(this, r, !0);
    },
    get size() {
      return Ot(this, !0);
    },
    has(r) {
      return Ct.call(this, r, !0);
    },
    add: De("add"),
    set: De("set"),
    delete: De("delete"),
    clear: De("clear"),
    forEach: At(!0, !1)
  }, i = {
    get(r) {
      return Et(this, r, !0, !0);
    },
    get size() {
      return Ot(this, !0);
    },
    has(r) {
      return Ct.call(this, r, !0);
    },
    add: De("add"),
    set: De("set"),
    delete: De("delete"),
    clear: De("clear"),
    forEach: At(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = It(
      r,
      !1,
      !1
    ), n[r] = It(
      r,
      !0,
      !1
    ), t[r] = It(
      r,
      !1,
      !0
    ), i[r] = It(
      r,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    i
  ];
}
const [
  Js,
  Zs,
  Qs,
  er
] = /* @__PURE__ */ Gs();
function Pn(e, t) {
  const n = t ? e ? er : Qs : e ? Zs : Js;
  return (i, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? i : Reflect.get(
    k(n, s) && s in i ? n : i,
    s,
    r
  );
}
const tr = {
  get: /* @__PURE__ */ Pn(!1, !1)
}, nr = {
  get: /* @__PURE__ */ Pn(!1, !0)
}, ir = {
  get: /* @__PURE__ */ Pn(!0, !1)
}, Bi = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap();
function rr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function or(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : rr(vs(e));
}
function Sn(e) {
  return gt(e) ? e : Rn(
    e,
    !1,
    Hi,
    tr,
    Bi
  );
}
function lr(e) {
  return Rn(
    e,
    !1,
    Xs,
    nr,
    ji
  );
}
function Wi(e) {
  return Rn(
    e,
    !0,
    Ys,
    ir,
    ki
  );
}
function Rn(e, t, n, i, s) {
  if (!G(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const o = or(e);
  if (o === 0)
    return e;
  const c = new Proxy(
    e,
    o === 2 ? i : n
  );
  return s.set(e, c), c;
}
function it(e) {
  return gt(e) ? it(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
function pn(e) {
  return !!(e && e.__v_isShallow);
}
function Vi(e) {
  return it(e) || gt(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function Ki(e) {
  return Dt(e, "__v_skip", !0), e;
}
const Mn = (e) => G(e) ? Sn(e) : e, Fn = (e) => G(e) ? Wi(e) : e;
function cr(e) {
  He && _e && (e = W(e), Di(e.dep || (e.dep = Cn())));
}
function fr(e, t) {
  e = W(e);
  const n = e.dep;
  n && un(n);
}
function fe(e) {
  return !!(e && e.__v_isRef === !0);
}
function ar(e) {
  return fe(e) ? e.value : e;
}
const ur = {
  get: (e, t, n) => ar(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const s = e[t];
    return fe(s) && !fe(n) ? (s.value = n, !0) : Reflect.set(e, t, n, i);
  }
};
function zi(e) {
  return it(e) ? e : new Proxy(e, ur);
}
class pr {
  constructor(t, n, i, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new On(t, () => {
      this._dirty || (this._dirty = !0, fr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = i;
  }
  get value() {
    const t = W(this);
    return cr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function dr(e, t, n = !1) {
  let i, s;
  const r = H(e);
  return r ? (i = e, s = ye) : (i = e.get, s = e.set), new pr(i, s, r || !s, n);
}
function Be(e, t, n, i) {
  let s;
  try {
    s = i ? e(...i) : e();
  } catch (r) {
    Kt(r, t, n);
  }
  return s;
}
function xe(e, t, n, i) {
  if (H(e)) {
    const r = Be(e, t, n, i);
    return r && Oi(r) && r.catch((o) => {
      Kt(o, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(xe(e[r], t, n, i));
  return s;
}
function Kt(e, t, n, i = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, c = n;
    for (; r; ) {
      const d = r.ec;
      if (d) {
        for (let _ = 0; _ < d.length; _++)
          if (d[_](e, o, c) === !1)
            return;
      }
      r = r.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Be(
        f,
        null,
        10,
        [e, o, c]
      );
      return;
    }
  }
  hr(e, n, s, i);
}
function hr(e, t, n, i = !0) {
  console.error(e);
}
let _t = !1, dn = !1;
const re = [];
let Oe = 0;
const st = [];
let Re = null, $e = 0;
const $i = /* @__PURE__ */ Promise.resolve();
let Nn = null;
function qi(e) {
  const t = Nn || $i;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mr(e) {
  let t = Oe + 1, n = re.length;
  for (; t < n; ) {
    const i = t + n >>> 1;
    bt(re[i]) < e ? t = i + 1 : n = i;
  }
  return t;
}
function Dn(e) {
  (!re.length || !re.includes(
    e,
    _t && e.allowRecurse ? Oe + 1 : Oe
  )) && (e.id == null ? re.push(e) : re.splice(mr(e.id), 0, e), Yi());
}
function Yi() {
  !_t && !dn && (dn = !0, Nn = $i.then(Gi));
}
function gr(e) {
  const t = re.indexOf(e);
  t > Oe && re.splice(t, 1);
}
function _r(e) {
  U(e) ? st.push(...e) : (!Re || !Re.includes(
    e,
    e.allowRecurse ? $e + 1 : $e
  )) && st.push(e), Yi();
}
function ni(e, t = _t ? Oe + 1 : 0) {
  for (; t < re.length; t++) {
    const n = re[t];
    n && n.pre && (re.splice(t, 1), t--, n());
  }
}
function Xi(e) {
  if (st.length) {
    const t = [...new Set(st)];
    if (st.length = 0, Re) {
      Re.push(...t);
      return;
    }
    for (Re = t, Re.sort((n, i) => bt(n) - bt(i)), $e = 0; $e < Re.length; $e++)
      Re[$e]();
    Re = null, $e = 0;
  }
}
const bt = (e) => e.id == null ? 1 / 0 : e.id, br = (e, t) => {
  const n = bt(e) - bt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Gi(e) {
  dn = !1, _t = !0, re.sort(br);
  const t = ye;
  try {
    for (Oe = 0; Oe < re.length; Oe++) {
      const n = re[Oe];
      n && n.active !== !1 && Be(n, null, 14);
    }
  } finally {
    Oe = 0, re.length = 0, Xi(), _t = !1, Nn = null, (re.length || st.length) && Gi();
  }
}
function yr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const i = e.vnode.props || X;
  let s = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in i) {
    const _ = `${o === "modelValue" ? "model" : o}Modifiers`, { number: b, trim: u } = i[_] || X;
    u && (s = n.map((p) => ie(p) ? p.trim() : p)), b && (s = n.map(Cs));
  }
  let c, f = i[c = Jt(t)] || // also try camelCase event handler (#2249)
  i[c = Jt(Me(t))];
  !f && r && (f = i[c = Jt(ge(t))]), f && xe(
    f,
    e,
    6,
    s
  );
  const d = i[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, xe(
      d,
      e,
      6,
      s
    );
  }
}
function Ji(e, t, n = !1) {
  const i = t.emitsCache, s = i.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let o = {}, c = !1;
  if (!H(e)) {
    const f = (d) => {
      const _ = Ji(d, t, !0);
      _ && (c = !0, ne(o, _));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !c ? (G(e) && i.set(e, null), null) : (U(r) ? r.forEach((f) => o[f] = null) : ne(o, r), G(e) && i.set(e, o), o);
}
function zt(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, ge(t)) || k(e, t));
}
let Ae = null, Zi = null;
function Ut(e) {
  const t = Ae;
  return Ae = e, Zi = e && e.type.__scopeId || null, t;
}
function xr(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const i = (...s) => {
    i._d && pi(-1);
    const r = Ut(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Ut(r), i._d && pi(1);
    }
    return o;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function Qt(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: s,
    props: r,
    propsOptions: [o],
    slots: c,
    attrs: f,
    emit: d,
    render: _,
    renderCache: b,
    data: u,
    setupState: p,
    ctx: O,
    inheritAttrs: C
  } = e;
  let I, D;
  const w = Ut(e);
  try {
    if (n.shapeFlag & 4) {
      const h = s || i;
      I = Ce(
        _.call(
          h,
          h,
          b,
          r,
          p,
          u,
          O
        )
      ), D = f;
    } else {
      const h = t;
      I = Ce(
        h.length > 1 ? h(
          r,
          { attrs: f, slots: c, emit: d }
        ) : h(
          r,
          null
          /* we know it doesn't need it */
        )
      ), D = t.props ? f : wr(f);
    }
  } catch (h) {
    ht.length = 0, Kt(h, e, 1), I = Ie(Ge);
  }
  let S = I;
  if (D && C !== !1) {
    const h = Object.keys(D), { shapeFlag: B } = S;
    h.length && B & 7 && (o && h.some(wn) && (D = vr(
      D,
      o
    )), S = rt(S, D));
  }
  return n.dirs && (S = rt(S), S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs), n.transition && (S.transition = n.transition), I = S, Ut(w), I;
}
const wr = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Bt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, vr = (e, t) => {
  const n = {};
  for (const i in e)
    (!wn(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
  return n;
};
function Tr(e, t, n) {
  const { props: i, children: s, component: r } = e, { props: o, children: c, patchFlag: f } = t, d = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return i ? ii(i, o, d) : !!o;
    if (f & 8) {
      const _ = t.dynamicProps;
      for (let b = 0; b < _.length; b++) {
        const u = _[b];
        if (o[u] !== i[u] && !zt(d, u))
          return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable) ? !0 : i === o ? !1 : i ? o ? ii(i, o, d) : !0 : !!o;
  return !1;
}
function ii(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !zt(n, r))
      return !0;
  }
  return !1;
}
function Er({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Cr = (e) => e.__isSuspense;
function Or(e, t) {
  t && t.pendingBranch ? U(e) ? t.effects.push(...e) : t.effects.push(e) : _r(e);
}
const Pt = {};
function en(e, t, n) {
  return Qi(e, t, n);
}
function Qi(e, t, { immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o } = X) {
  var c;
  const f = Ns() === ((c = oe) == null ? void 0 : c.scope) ? oe : null;
  let d, _ = !1, b = !1;
  if (fe(e) ? (d = () => e.value, _ = pn(e)) : it(e) ? (d = () => e, i = !0) : U(e) ? (b = !0, _ = e.some((h) => it(h) || pn(h)), d = () => e.map((h) => {
    if (fe(h))
      return h.value;
    if (it(h))
      return et(h);
    if (H(h))
      return Be(h, f, 2);
  })) : H(e) ? t ? d = () => Be(e, f, 2) : d = () => {
    if (!(f && f.isUnmounted))
      return u && u(), xe(
        e,
        f,
        3,
        [p]
      );
  } : d = ye, t && i) {
    const h = d;
    d = () => et(h());
  }
  let u, p = (h) => {
    u = w.onStop = () => {
      Be(h, f, 4);
    };
  }, O;
  if (xt)
    if (p = ye, t ? n && xe(t, f, 3, [
      d(),
      b ? [] : void 0,
      p
    ]) : d(), s === "sync") {
      const h = Co();
      O = h.__watcherHandles || (h.__watcherHandles = []);
    } else
      return ye;
  let C = b ? new Array(e.length).fill(Pt) : Pt;
  const I = () => {
    if (w.active)
      if (t) {
        const h = w.run();
        (i || _ || (b ? h.some(
          (B, z) => Nt(B, C[z])
        ) : Nt(h, C))) && (u && u(), xe(t, f, 3, [
          h,
          // pass undefined as the old value when it's changed for the first time
          C === Pt ? void 0 : b && C[0] === Pt ? [] : C,
          p
        ]), C = h);
      } else
        w.run();
  };
  I.allowRecurse = !!t;
  let D;
  s === "sync" ? D = I : s === "post" ? D = () => ae(I, f && f.suspense) : (I.pre = !0, f && (I.id = f.uid), D = () => Dn(I));
  const w = new On(d, D);
  t ? n ? I() : C = w.run() : s === "post" ? ae(
    w.run.bind(w),
    f && f.suspense
  ) : w.run();
  const S = () => {
    w.stop(), f && f.scope && vn(f.scope.effects, w);
  };
  return O && O.push(S), S;
}
function Ar(e, t, n) {
  const i = this.proxy, s = ie(e) ? e.includes(".") ? es(i, e) : () => i[e] : e.bind(i, i);
  let r;
  H(t) ? r = t : (r = t.handler, n = t);
  const o = oe;
  ot(this);
  const c = Qi(s, r.bind(i), n);
  return o ? ot(o) : Xe(), c;
}
function es(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++)
      i = i[n[s]];
    return i;
  };
}
function et(e, t) {
  if (!G(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), fe(e))
    et(e.value, t);
  else if (U(e))
    for (let n = 0; n < e.length; n++)
      et(e[n], t);
  else if (Ci(e) || nt(e))
    e.forEach((n) => {
      et(n, t);
    });
  else if (Ii(e))
    for (const n in e)
      et(e[n], t);
  return e;
}
function Ve(e, t, n, i) {
  const s = e.dirs, r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const c = s[o];
    r && (c.oldValue = r[o].value);
    let f = c.dir[i];
    f && (lt(), xe(f, n, 8, [
      e.el,
      c,
      e,
      t
    ]), ct());
  }
}
function Ir(e, t) {
  return H(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => ne({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const Rt = (e) => !!e.type.__asyncLoader, ts = (e) => e.type.__isKeepAlive;
function Pr(e, t) {
  ns(e, "a", t);
}
function Sr(e, t) {
  ns(e, "da", t);
}
function ns(e, t, n = oe) {
  const i = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if ($t(t, i, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      ts(s.parent.vnode) && Rr(i, t, n, s), s = s.parent;
  }
}
function Rr(e, t, n, i) {
  const s = $t(
    t,
    e,
    i,
    !0
    /* prepend */
  );
  is(() => {
    vn(i[t], s);
  }, n);
}
function $t(e, t, n = oe, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      lt(), ot(n);
      const c = xe(t, n, e, o);
      return Xe(), ct(), c;
    });
    return i ? s.unshift(r) : s.push(r), r;
  }
}
const Ne = (e) => (t, n = oe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!xt || e === "sp") && $t(e, (...i) => t(...i), n)
), Mr = Ne("bm"), Fr = Ne("m"), Nr = Ne("bu"), Dr = Ne("u"), Ur = Ne("bum"), is = Ne("um"), Lr = Ne("sp"), Hr = Ne(
  "rtg"
), Br = Ne(
  "rtc"
);
function jr(e, t = oe) {
  $t("ec", e, t);
}
const kr = Symbol.for("v-ndc");
function Wr(e, t, n, i) {
  let s;
  const r = n && n[i];
  if (U(e) || ie(e)) {
    s = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      s[o] = t(e[o], o, void 0, r && r[o]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let o = 0; o < e; o++)
      s[o] = t(o + 1, o, void 0, r && r[o]);
  } else if (G(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (o, c) => t(o, c, void 0, r && r[c])
      );
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let c = 0, f = o.length; c < f; c++) {
        const d = o[c];
        s[c] = t(e[d], d, c, r && r[c]);
      }
    }
  else
    s = [];
  return n && (n[i] = s), s;
}
const hn = (e) => e ? hs(e) ? jn(e) || e.proxy : hn(e.parent) : null, dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => hn(e.parent),
    $root: (e) => hn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Un(e),
    $forceUpdate: (e) => e.f || (e.f = () => Dn(e.update)),
    $nextTick: (e) => e.n || (e.n = qi.bind(e.proxy)),
    $watch: (e) => Ar.bind(e)
  })
), tn = (e, t) => e !== X && !e.__isScriptSetup && k(e, t), Vr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: i, data: s, props: r, accessCache: o, type: c, appContext: f } = e;
    let d;
    if (t[0] !== "$") {
      const p = o[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return i[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (tn(i, t))
          return o[t] = 1, i[t];
        if (s !== X && k(s, t))
          return o[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && k(d, t)
        )
          return o[t] = 3, r[t];
        if (n !== X && k(n, t))
          return o[t] = 4, n[t];
        mn && (o[t] = 0);
      }
    }
    const _ = dt[t];
    let b, u;
    if (_)
      return t === "$attrs" && ue(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (b = c.__cssModules) && (b = b[t])
    )
      return b;
    if (n !== X && k(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      u = f.config.globalProperties, k(u, t)
    )
      return u[t];
  },
  set({ _: e }, t, n) {
    const { data: i, setupState: s, ctx: r } = e;
    return tn(s, t) ? (s[t] = n, !0) : i !== X && k(i, t) ? (i[t] = n, !0) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: s, propsOptions: r }
  }, o) {
    let c;
    return !!n[o] || e !== X && k(e, o) || tn(t, o) || (c = r[0]) && k(c, o) || k(i, o) || k(dt, o) || k(s.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function si(e) {
  return U(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let mn = !0;
function Kr(e) {
  const t = Un(e), n = e.proxy, i = e.ctx;
  mn = !1, t.beforeCreate && ri(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: r,
    methods: o,
    watch: c,
    provide: f,
    inject: d,
    // lifecycle
    created: _,
    beforeMount: b,
    mounted: u,
    beforeUpdate: p,
    updated: O,
    activated: C,
    deactivated: I,
    beforeDestroy: D,
    beforeUnmount: w,
    destroyed: S,
    unmounted: h,
    render: B,
    renderTracked: z,
    renderTriggered: le,
    errorCaptured: N,
    serverPrefetch: R,
    // public API
    expose: se,
    inheritAttrs: ee,
    // assets
    components: V,
    directives: Z,
    filters: Pe
  } = t;
  if (d && zr(d, i, null), o)
    for (const J in o) {
      const $ = o[J];
      H($) && (i[J] = $.bind(n));
    }
  if (s) {
    const J = s.call(n, n);
    G(J) && (e.data = Sn(J));
  }
  if (mn = !0, r)
    for (const J in r) {
      const $ = r[J], ke = H($) ? $.bind(n, n) : H($.get) ? $.get.bind(n, n) : ye, wt = !H($) && H($.set) ? $.set.bind(n) : ye, We = To({
        get: ke,
        set: wt
      });
      Object.defineProperty(i, J, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (we) => We.value = we
      });
    }
  if (c)
    for (const J in c)
      ss(c[J], i, n, J);
  if (f) {
    const J = H(f) ? f.call(n) : f;
    Reflect.ownKeys(J).forEach(($) => {
      Jr($, J[$]);
    });
  }
  _ && ri(_, e, "c");
  function Y(J, $) {
    U($) ? $.forEach((ke) => J(ke.bind(n))) : $ && J($.bind(n));
  }
  if (Y(Mr, b), Y(Fr, u), Y(Nr, p), Y(Dr, O), Y(Pr, C), Y(Sr, I), Y(jr, N), Y(Br, z), Y(Hr, le), Y(Ur, w), Y(is, h), Y(Lr, R), U(se))
    if (se.length) {
      const J = e.exposed || (e.exposed = {});
      se.forEach(($) => {
        Object.defineProperty(J, $, {
          get: () => n[$],
          set: (ke) => n[$] = ke
        });
      });
    } else
      e.exposed || (e.exposed = {});
  B && e.render === ye && (e.render = B), ee != null && (e.inheritAttrs = ee), V && (e.components = V), Z && (e.directives = Z);
}
function zr(e, t, n = ye) {
  U(e) && (e = gn(e));
  for (const i in e) {
    const s = e[i];
    let r;
    G(s) ? "default" in s ? r = Mt(
      s.from || i,
      s.default,
      !0
      /* treat default function as factory */
    ) : r = Mt(s.from || i) : r = Mt(s), fe(r) ? Object.defineProperty(t, i, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[i] = r;
  }
}
function ri(e, t, n) {
  xe(
    U(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ss(e, t, n, i) {
  const s = i.includes(".") ? es(n, i) : () => n[i];
  if (ie(e)) {
    const r = t[e];
    H(r) && en(s, r);
  } else if (H(e))
    en(s, e.bind(n));
  else if (G(e))
    if (U(e))
      e.forEach((r) => ss(r, t, n, i));
    else {
      const r = H(e.handler) ? e.handler.bind(n) : t[e.handler];
      H(r) && en(s, r, e);
    }
}
function Un(e) {
  const t = e.type, { mixins: n, extends: i } = t, {
    mixins: s,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, c = r.get(t);
  let f;
  return c ? f = c : !s.length && !n && !i ? f = t : (f = {}, s.length && s.forEach(
    (d) => Lt(f, d, o, !0)
  ), Lt(f, t, o)), G(t) && r.set(t, f), f;
}
function Lt(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && Lt(e, r, n, !0), s && s.forEach(
    (o) => Lt(e, o, n, !0)
  );
  for (const o in t)
    if (!(i && o === "expose")) {
      const c = $r[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const $r = {
  data: oi,
  props: li,
  emits: li,
  // objects
  methods: pt,
  computed: pt,
  // lifecycle
  beforeCreate: ce,
  created: ce,
  beforeMount: ce,
  mounted: ce,
  beforeUpdate: ce,
  updated: ce,
  beforeDestroy: ce,
  beforeUnmount: ce,
  destroyed: ce,
  unmounted: ce,
  activated: ce,
  deactivated: ce,
  errorCaptured: ce,
  serverPrefetch: ce,
  // assets
  components: pt,
  directives: pt,
  // watch
  watch: Yr,
  // provide / inject
  provide: oi,
  inject: qr
};
function oi(e, t) {
  return t ? e ? function() {
    return ne(
      H(e) ? e.call(this, this) : e,
      H(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qr(e, t) {
  return pt(gn(e), gn(t));
}
function gn(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pt(e, t) {
  return e ? ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function li(e, t) {
  return e ? U(e) && U(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ne(
    /* @__PURE__ */ Object.create(null),
    si(e),
    si(t ?? {})
  ) : t;
}
function Yr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ne(/* @__PURE__ */ Object.create(null), e);
  for (const i in t)
    n[i] = ce(e[i], t[i]);
  return n;
}
function rs() {
  return {
    app: null,
    config: {
      isNativeTag: ys,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Xr = 0;
function Gr(e, t) {
  return function(i, s = null) {
    H(i) || (i = ne({}, i)), s != null && !G(s) && (s = null);
    const r = rs(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const f = r.app = {
      _uid: Xr++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: Oo,
      get config() {
        return r.config;
      },
      set config(d) {
      },
      use(d, ..._) {
        return o.has(d) || (d && H(d.install) ? (o.add(d), d.install(f, ..._)) : H(d) && (o.add(d), d(f, ..._))), f;
      },
      mixin(d) {
        return r.mixins.includes(d) || r.mixins.push(d), f;
      },
      component(d, _) {
        return _ ? (r.components[d] = _, f) : r.components[d];
      },
      directive(d, _) {
        return _ ? (r.directives[d] = _, f) : r.directives[d];
      },
      mount(d, _, b) {
        if (!c) {
          const u = Ie(
            i,
            s
          );
          return u.appContext = r, _ && t ? t(u, d) : e(u, d, b), c = !0, f._container = d, d.__vue_app__ = f, jn(u.component) || u.component.proxy;
        }
      },
      unmount() {
        c && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(d, _) {
        return r.provides[d] = _, f;
      },
      runWithContext(d) {
        Ht = f;
        try {
          return d();
        } finally {
          Ht = null;
        }
      }
    };
    return f;
  };
}
let Ht = null;
function Jr(e, t) {
  if (oe) {
    let n = oe.provides;
    const i = oe.parent && oe.parent.provides;
    i === n && (n = oe.provides = Object.create(i)), n[e] = t;
  }
}
function Mt(e, t, n = !1) {
  const i = oe || Ae;
  if (i || Ht) {
    const s = i ? i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : Ht._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && H(t) ? t.call(i && i.proxy) : t;
  }
}
function Zr(e, t, n, i = !1) {
  const s = {}, r = {};
  Dt(r, Yt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), os(e, t, s, r);
  for (const o in e.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? e.props = i ? s : lr(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Qr(e, t, n, i) {
  const {
    props: s,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, c = W(s), [f] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (i || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const _ = e.vnode.dynamicProps;
      for (let b = 0; b < _.length; b++) {
        let u = _[b];
        if (zt(e.emitsOptions, u))
          continue;
        const p = t[u];
        if (f)
          if (k(r, u))
            p !== r[u] && (r[u] = p, d = !0);
          else {
            const O = Me(u);
            s[O] = _n(
              f,
              c,
              O,
              p,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          p !== r[u] && (r[u] = p, d = !0);
      }
    }
  } else {
    os(e, t, s, r) && (d = !0);
    let _;
    for (const b in c)
      (!t || // for camelCase
      !k(t, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = ge(b)) === b || !k(t, _))) && (f ? n && // for camelCase
      (n[b] !== void 0 || // for kebab-case
      n[_] !== void 0) && (s[b] = _n(
        f,
        c,
        b,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete s[b]);
    if (r !== c)
      for (const b in r)
        (!t || !k(t, b)) && (delete r[b], d = !0);
  }
  d && Fe(e, "set", "$attrs");
}
function os(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let f in t) {
      if (St(f))
        continue;
      const d = t[f];
      let _;
      s && k(s, _ = Me(f)) ? !r || !r.includes(_) ? n[_] = d : (c || (c = {}))[_] = d : zt(e.emitsOptions, f) || (!(f in i) || d !== i[f]) && (i[f] = d, o = !0);
    }
  if (r) {
    const f = W(n), d = c || X;
    for (let _ = 0; _ < r.length; _++) {
      const b = r[_];
      n[b] = _n(
        s,
        f,
        b,
        d[b],
        e,
        !k(d, b)
      );
    }
  }
  return o;
}
function _n(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const c = k(o, "default");
    if (c && i === void 0) {
      const f = o.default;
      if (o.type !== Function && !o.skipFactory && H(f)) {
        const { propsDefaults: d } = s;
        n in d ? i = d[n] : (ot(s), i = d[n] = f.call(
          null,
          t
        ), Xe());
      } else
        i = f;
    }
    o[
      0
      /* shouldCast */
    ] && (r && !c ? i = !1 : o[
      1
      /* shouldCastTrue */
    ] && (i === "" || i === ge(n)) && (i = !0));
  }
  return i;
}
function ls(e, t, n = !1) {
  const i = t.propsCache, s = i.get(e);
  if (s)
    return s;
  const r = e.props, o = {}, c = [];
  let f = !1;
  if (!H(e)) {
    const _ = (b) => {
      f = !0;
      const [u, p] = ls(b, t, !0);
      ne(o, u), p && c.push(...p);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!r && !f)
    return G(e) && i.set(e, tt), tt;
  if (U(r))
    for (let _ = 0; _ < r.length; _++) {
      const b = Me(r[_]);
      ci(b) && (o[b] = X);
    }
  else if (r)
    for (const _ in r) {
      const b = Me(_);
      if (ci(b)) {
        const u = r[_], p = o[b] = U(u) || H(u) ? { type: u } : ne({}, u);
        if (p) {
          const O = ui(Boolean, p.type), C = ui(String, p.type);
          p[
            0
            /* shouldCast */
          ] = O > -1, p[
            1
            /* shouldCastTrue */
          ] = C < 0 || O < C, (O > -1 || k(p, "default")) && c.push(b);
        }
      }
    }
  const d = [o, c];
  return G(e) && i.set(e, d), d;
}
function ci(e) {
  return e[0] !== "$";
}
function fi(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ai(e, t) {
  return fi(e) === fi(t);
}
function ui(e, t) {
  return U(t) ? t.findIndex((n) => ai(n, e)) : H(t) && ai(t, e) ? 0 : -1;
}
const cs = (e) => e[0] === "_" || e === "$stable", Ln = (e) => U(e) ? e.map(Ce) : [Ce(e)], eo = (e, t, n) => {
  if (t._n)
    return t;
  const i = xr((...s) => Ln(t(...s)), n);
  return i._c = !1, i;
}, fs = (e, t, n) => {
  const i = e._ctx;
  for (const s in e) {
    if (cs(s))
      continue;
    const r = e[s];
    if (H(r))
      t[s] = eo(s, r, i);
    else if (r != null) {
      const o = Ln(r);
      t[s] = () => o;
    }
  }
}, as = (e, t) => {
  const n = Ln(t);
  e.slots.default = () => n;
}, to = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = W(t), Dt(t, "_", n)) : fs(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && as(e, t);
  Dt(e.slots, Yt, 1);
}, no = (e, t, n) => {
  const { vnode: i, slots: s } = e;
  let r = !0, o = X;
  if (i.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (ne(s, t), !n && c === 1 && delete s._) : (r = !t.$stable, fs(t, s)), o = t;
  } else
    t && (as(e, t), o = { default: 1 });
  if (r)
    for (const c in s)
      !cs(c) && !(c in o) && delete s[c];
};
function bn(e, t, n, i, s = !1) {
  if (U(e)) {
    e.forEach(
      (u, p) => bn(
        u,
        t && (U(t) ? t[p] : t),
        n,
        i,
        s
      )
    );
    return;
  }
  if (Rt(i) && !s)
    return;
  const r = i.shapeFlag & 4 ? jn(i.component) || i.component.proxy : i.el, o = s ? null : r, { i: c, r: f } = e, d = t && t.r, _ = c.refs === X ? c.refs = {} : c.refs, b = c.setupState;
  if (d != null && d !== f && (ie(d) ? (_[d] = null, k(b, d) && (b[d] = null)) : fe(d) && (d.value = null)), H(f))
    Be(f, c, 12, [o, _]);
  else {
    const u = ie(f), p = fe(f);
    if (u || p) {
      const O = () => {
        if (e.f) {
          const C = u ? k(b, f) ? b[f] : _[f] : f.value;
          s ? U(C) && vn(C, r) : U(C) ? C.includes(r) || C.push(r) : u ? (_[f] = [r], k(b, f) && (b[f] = _[f])) : (f.value = [r], e.k && (_[e.k] = f.value));
        } else
          u ? (_[f] = o, k(b, f) && (b[f] = o)) : p && (f.value = o, e.k && (_[e.k] = o));
      };
      o ? (O.id = -1, ae(O, n)) : O();
    }
  }
}
const ae = Or;
function io(e) {
  return so(e);
}
function so(e, t) {
  const n = ln();
  n.__VUE__ = !0;
  const {
    insert: i,
    remove: s,
    patchProp: r,
    createElement: o,
    createText: c,
    createComment: f,
    setText: d,
    setElementText: _,
    parentNode: b,
    nextSibling: u,
    setScopeId: p = ye,
    insertStaticContent: O
  } = e, C = (l, a, m, y = null, g = null, T = null, A = !1, v = null, E = !!a.dynamicChildren) => {
    if (l === a)
      return;
    l && !at(l, a) && (y = vt(l), we(l, g, T, !0), l = null), a.patchFlag === -2 && (E = !1, a.dynamicChildren = null);
    const { type: x, ref: M, shapeFlag: P } = a;
    switch (x) {
      case qt:
        I(l, a, m, y);
        break;
      case Ge:
        D(l, a, m, y);
        break;
      case nn:
        l == null && w(a, m, y, A);
        break;
      case Ee:
        V(
          l,
          a,
          m,
          y,
          g,
          T,
          A,
          v,
          E
        );
        break;
      default:
        P & 1 ? B(
          l,
          a,
          m,
          y,
          g,
          T,
          A,
          v,
          E
        ) : P & 6 ? Z(
          l,
          a,
          m,
          y,
          g,
          T,
          A,
          v,
          E
        ) : (P & 64 || P & 128) && x.process(
          l,
          a,
          m,
          y,
          g,
          T,
          A,
          v,
          E,
          Je
        );
    }
    M != null && g && bn(M, l && l.ref, T, a || l, !a);
  }, I = (l, a, m, y) => {
    if (l == null)
      i(
        a.el = c(a.children),
        m,
        y
      );
    else {
      const g = a.el = l.el;
      a.children !== l.children && d(g, a.children);
    }
  }, D = (l, a, m, y) => {
    l == null ? i(
      a.el = f(a.children || ""),
      m,
      y
    ) : a.el = l.el;
  }, w = (l, a, m, y) => {
    [l.el, l.anchor] = O(
      l.children,
      a,
      m,
      y,
      l.el,
      l.anchor
    );
  }, S = ({ el: l, anchor: a }, m, y) => {
    let g;
    for (; l && l !== a; )
      g = u(l), i(l, m, y), l = g;
    i(a, m, y);
  }, h = ({ el: l, anchor: a }) => {
    let m;
    for (; l && l !== a; )
      m = u(l), s(l), l = m;
    s(a);
  }, B = (l, a, m, y, g, T, A, v, E) => {
    A = A || a.type === "svg", l == null ? z(
      a,
      m,
      y,
      g,
      T,
      A,
      v,
      E
    ) : R(
      l,
      a,
      g,
      T,
      A,
      v,
      E
    );
  }, z = (l, a, m, y, g, T, A, v) => {
    let E, x;
    const { type: M, props: P, shapeFlag: F, transition: L, dirs: j } = l;
    if (E = l.el = o(
      l.type,
      T,
      P && P.is,
      P
    ), F & 8 ? _(E, l.children) : F & 16 && N(
      l.children,
      E,
      null,
      y,
      g,
      T && M !== "foreignObject",
      A,
      v
    ), j && Ve(l, null, y, "created"), le(E, l, l.scopeId, A, y), P) {
      for (const K in P)
        K !== "value" && !St(K) && r(
          E,
          K,
          null,
          P[K],
          T,
          l.children,
          y,
          g,
          Se
        );
      "value" in P && r(E, "value", null, P.value), (x = P.onVnodeBeforeMount) && Te(x, y, l);
    }
    j && Ve(l, null, y, "beforeMount");
    const q = (!g || g && !g.pendingBranch) && L && !L.persisted;
    q && L.beforeEnter(E), i(E, a, m), ((x = P && P.onVnodeMounted) || q || j) && ae(() => {
      x && Te(x, y, l), q && L.enter(E), j && Ve(l, null, y, "mounted");
    }, g);
  }, le = (l, a, m, y, g) => {
    if (m && p(l, m), y)
      for (let T = 0; T < y.length; T++)
        p(l, y[T]);
    if (g) {
      let T = g.subTree;
      if (a === T) {
        const A = g.vnode;
        le(
          l,
          A,
          A.scopeId,
          A.slotScopeIds,
          g.parent
        );
      }
    }
  }, N = (l, a, m, y, g, T, A, v, E = 0) => {
    for (let x = E; x < l.length; x++) {
      const M = l[x] = v ? Le(l[x]) : Ce(l[x]);
      C(
        null,
        M,
        a,
        m,
        y,
        g,
        T,
        A,
        v
      );
    }
  }, R = (l, a, m, y, g, T, A) => {
    const v = a.el = l.el;
    let { patchFlag: E, dynamicChildren: x, dirs: M } = a;
    E |= l.patchFlag & 16;
    const P = l.props || X, F = a.props || X;
    let L;
    m && Ke(m, !1), (L = F.onVnodeBeforeUpdate) && Te(L, m, a, l), M && Ve(a, l, m, "beforeUpdate"), m && Ke(m, !0);
    const j = g && a.type !== "foreignObject";
    if (x ? se(
      l.dynamicChildren,
      x,
      v,
      m,
      y,
      j,
      T
    ) : A || $(
      l,
      a,
      v,
      null,
      m,
      y,
      j,
      T,
      !1
    ), E > 0) {
      if (E & 16)
        ee(
          v,
          a,
          P,
          F,
          m,
          y,
          g
        );
      else if (E & 2 && P.class !== F.class && r(v, "class", null, F.class, g), E & 4 && r(v, "style", P.style, F.style, g), E & 8) {
        const q = a.dynamicProps;
        for (let K = 0; K < q.length; K++) {
          const Q = q[K], he = P[Q], Ze = F[Q];
          (Ze !== he || Q === "value") && r(
            v,
            Q,
            he,
            Ze,
            g,
            l.children,
            m,
            y,
            Se
          );
        }
      }
      E & 1 && l.children !== a.children && _(v, a.children);
    } else
      !A && x == null && ee(
        v,
        a,
        P,
        F,
        m,
        y,
        g
      );
    ((L = F.onVnodeUpdated) || M) && ae(() => {
      L && Te(L, m, a, l), M && Ve(a, l, m, "updated");
    }, y);
  }, se = (l, a, m, y, g, T, A) => {
    for (let v = 0; v < a.length; v++) {
      const E = l[v], x = a[v], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === Ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !at(E, x) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? b(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        E,
        x,
        M,
        null,
        y,
        g,
        T,
        A,
        !0
      );
    }
  }, ee = (l, a, m, y, g, T, A) => {
    if (m !== y) {
      if (m !== X)
        for (const v in m)
          !St(v) && !(v in y) && r(
            l,
            v,
            m[v],
            null,
            A,
            a.children,
            g,
            T,
            Se
          );
      for (const v in y) {
        if (St(v))
          continue;
        const E = y[v], x = m[v];
        E !== x && v !== "value" && r(
          l,
          v,
          x,
          E,
          A,
          a.children,
          g,
          T,
          Se
        );
      }
      "value" in y && r(l, "value", m.value, y.value);
    }
  }, V = (l, a, m, y, g, T, A, v, E) => {
    const x = a.el = l ? l.el : c(""), M = a.anchor = l ? l.anchor : c("");
    let { patchFlag: P, dynamicChildren: F, slotScopeIds: L } = a;
    L && (v = v ? v.concat(L) : L), l == null ? (i(x, m, y), i(M, m, y), N(
      a.children,
      m,
      M,
      g,
      T,
      A,
      v,
      E
    )) : P > 0 && P & 64 && F && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (se(
      l.dynamicChildren,
      F,
      m,
      g,
      T,
      A,
      v
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (a.key != null || g && a === g.subTree) && us(
      l,
      a,
      !0
      /* shallow */
    )) : $(
      l,
      a,
      m,
      M,
      g,
      T,
      A,
      v,
      E
    );
  }, Z = (l, a, m, y, g, T, A, v, E) => {
    a.slotScopeIds = v, l == null ? a.shapeFlag & 512 ? g.ctx.activate(
      a,
      m,
      y,
      A,
      E
    ) : Pe(
      a,
      m,
      y,
      g,
      T,
      A,
      E
    ) : te(l, a, E);
  }, Pe = (l, a, m, y, g, T, A) => {
    const v = l.component = _o(
      l,
      y,
      g
    );
    if (ts(l) && (v.ctx.renderer = Je), bo(v), v.asyncDep) {
      if (g && g.registerDep(v, Y), !l.el) {
        const E = v.subTree = Ie(Ge);
        D(null, E, a, m);
      }
      return;
    }
    Y(
      v,
      l,
      a,
      m,
      g,
      T,
      A
    );
  }, te = (l, a, m) => {
    const y = a.component = l.component;
    if (Tr(l, a, m))
      if (y.asyncDep && !y.asyncResolved) {
        J(y, a, m);
        return;
      } else
        y.next = a, gr(y.update), y.update();
    else
      a.el = l.el, y.vnode = a;
  }, Y = (l, a, m, y, g, T, A) => {
    const v = () => {
      if (l.isMounted) {
        let { next: M, bu: P, u: F, parent: L, vnode: j } = l, q = M, K;
        Ke(l, !1), M ? (M.el = j.el, J(l, M, A)) : M = j, P && Zt(P), (K = M.props && M.props.onVnodeBeforeUpdate) && Te(K, L, M, j), Ke(l, !0);
        const Q = Qt(l), he = l.subTree;
        l.subTree = Q, C(
          he,
          Q,
          // parent may have changed if it's in a teleport
          b(he.el),
          // anchor may have changed if it's in a fragment
          vt(he),
          l,
          g,
          T
        ), M.el = Q.el, q === null && Er(l, Q.el), F && ae(F, g), (K = M.props && M.props.onVnodeUpdated) && ae(
          () => Te(K, L, M, j),
          g
        );
      } else {
        let M;
        const { el: P, props: F } = a, { bm: L, m: j, parent: q } = l, K = Rt(a);
        if (Ke(l, !1), L && Zt(L), !K && (M = F && F.onVnodeBeforeMount) && Te(M, q, a), Ke(l, !0), P && Gt) {
          const Q = () => {
            l.subTree = Qt(l), Gt(
              P,
              l.subTree,
              l,
              g,
              null
            );
          };
          K ? a.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && Q()
          ) : Q();
        } else {
          const Q = l.subTree = Qt(l);
          C(
            null,
            Q,
            m,
            y,
            l,
            g,
            T
          ), a.el = Q.el;
        }
        if (j && ae(j, g), !K && (M = F && F.onVnodeMounted)) {
          const Q = a;
          ae(
            () => Te(M, q, Q),
            g
          );
        }
        (a.shapeFlag & 256 || q && Rt(q.vnode) && q.vnode.shapeFlag & 256) && l.a && ae(l.a, g), l.isMounted = !0, a = m = y = null;
      }
    }, E = l.effect = new On(
      v,
      () => Dn(x),
      l.scope
      // track it in component's effect scope
    ), x = l.update = () => E.run();
    x.id = l.uid, Ke(l, !0), x();
  }, J = (l, a, m) => {
    a.component = l;
    const y = l.vnode.props;
    l.vnode = a, l.next = null, Qr(l, a.props, y, m), no(l, a.children, m), lt(), ni(), ct();
  }, $ = (l, a, m, y, g, T, A, v, E = !1) => {
    const x = l && l.children, M = l ? l.shapeFlag : 0, P = a.children, { patchFlag: F, shapeFlag: L } = a;
    if (F > 0) {
      if (F & 128) {
        wt(
          x,
          P,
          m,
          y,
          g,
          T,
          A,
          v,
          E
        );
        return;
      } else if (F & 256) {
        ke(
          x,
          P,
          m,
          y,
          g,
          T,
          A,
          v,
          E
        );
        return;
      }
    }
    L & 8 ? (M & 16 && Se(x, g, T), P !== x && _(m, P)) : M & 16 ? L & 16 ? wt(
      x,
      P,
      m,
      y,
      g,
      T,
      A,
      v,
      E
    ) : Se(x, g, T, !0) : (M & 8 && _(m, ""), L & 16 && N(
      P,
      m,
      y,
      g,
      T,
      A,
      v,
      E
    ));
  }, ke = (l, a, m, y, g, T, A, v, E) => {
    l = l || tt, a = a || tt;
    const x = l.length, M = a.length, P = Math.min(x, M);
    let F;
    for (F = 0; F < P; F++) {
      const L = a[F] = E ? Le(a[F]) : Ce(a[F]);
      C(
        l[F],
        L,
        m,
        null,
        g,
        T,
        A,
        v,
        E
      );
    }
    x > M ? Se(
      l,
      g,
      T,
      !0,
      !1,
      P
    ) : N(
      a,
      m,
      y,
      g,
      T,
      A,
      v,
      E,
      P
    );
  }, wt = (l, a, m, y, g, T, A, v, E) => {
    let x = 0;
    const M = a.length;
    let P = l.length - 1, F = M - 1;
    for (; x <= P && x <= F; ) {
      const L = l[x], j = a[x] = E ? Le(a[x]) : Ce(a[x]);
      if (at(L, j))
        C(
          L,
          j,
          m,
          null,
          g,
          T,
          A,
          v,
          E
        );
      else
        break;
      x++;
    }
    for (; x <= P && x <= F; ) {
      const L = l[P], j = a[F] = E ? Le(a[F]) : Ce(a[F]);
      if (at(L, j))
        C(
          L,
          j,
          m,
          null,
          g,
          T,
          A,
          v,
          E
        );
      else
        break;
      P--, F--;
    }
    if (x > P) {
      if (x <= F) {
        const L = F + 1, j = L < M ? a[L].el : y;
        for (; x <= F; )
          C(
            null,
            a[x] = E ? Le(a[x]) : Ce(a[x]),
            m,
            j,
            g,
            T,
            A,
            v,
            E
          ), x++;
      }
    } else if (x > F)
      for (; x <= P; )
        we(l[x], g, T, !0), x++;
    else {
      const L = x, j = x, q = /* @__PURE__ */ new Map();
      for (x = j; x <= F; x++) {
        const pe = a[x] = E ? Le(a[x]) : Ce(a[x]);
        pe.key != null && q.set(pe.key, x);
      }
      let K, Q = 0;
      const he = F - j + 1;
      let Ze = !1, Kn = 0;
      const ft = new Array(he);
      for (x = 0; x < he; x++)
        ft[x] = 0;
      for (x = L; x <= P; x++) {
        const pe = l[x];
        if (Q >= he) {
          we(pe, g, T, !0);
          continue;
        }
        let ve;
        if (pe.key != null)
          ve = q.get(pe.key);
        else
          for (K = j; K <= F; K++)
            if (ft[K - j] === 0 && at(pe, a[K])) {
              ve = K;
              break;
            }
        ve === void 0 ? we(pe, g, T, !0) : (ft[ve - j] = x + 1, ve >= Kn ? Kn = ve : Ze = !0, C(
          pe,
          a[ve],
          m,
          null,
          g,
          T,
          A,
          v,
          E
        ), Q++);
      }
      const zn = Ze ? ro(ft) : tt;
      for (K = zn.length - 1, x = he - 1; x >= 0; x--) {
        const pe = j + x, ve = a[pe], $n = pe + 1 < M ? a[pe + 1].el : y;
        ft[x] === 0 ? C(
          null,
          ve,
          m,
          $n,
          g,
          T,
          A,
          v,
          E
        ) : Ze && (K < 0 || x !== zn[K] ? We(ve, m, $n, 2) : K--);
      }
    }
  }, We = (l, a, m, y, g = null) => {
    const { el: T, type: A, transition: v, children: E, shapeFlag: x } = l;
    if (x & 6) {
      We(l.component.subTree, a, m, y);
      return;
    }
    if (x & 128) {
      l.suspense.move(a, m, y);
      return;
    }
    if (x & 64) {
      A.move(l, a, m, Je);
      return;
    }
    if (A === Ee) {
      i(T, a, m);
      for (let P = 0; P < E.length; P++)
        We(E[P], a, m, y);
      i(l.anchor, a, m);
      return;
    }
    if (A === nn) {
      S(l, a, m);
      return;
    }
    if (y !== 2 && x & 1 && v)
      if (y === 0)
        v.beforeEnter(T), i(T, a, m), ae(() => v.enter(T), g);
      else {
        const { leave: P, delayLeave: F, afterLeave: L } = v, j = () => i(T, a, m), q = () => {
          P(T, () => {
            j(), L && L();
          });
        };
        F ? F(T, j, q) : q();
      }
    else
      i(T, a, m);
  }, we = (l, a, m, y = !1, g = !1) => {
    const {
      type: T,
      props: A,
      ref: v,
      children: E,
      dynamicChildren: x,
      shapeFlag: M,
      patchFlag: P,
      dirs: F
    } = l;
    if (v != null && bn(v, null, m, l, !0), M & 256) {
      a.ctx.deactivate(l);
      return;
    }
    const L = M & 1 && F, j = !Rt(l);
    let q;
    if (j && (q = A && A.onVnodeBeforeUnmount) && Te(q, a, l), M & 6)
      bs(l.component, m, y);
    else {
      if (M & 128) {
        l.suspense.unmount(m, y);
        return;
      }
      L && Ve(l, null, a, "beforeUnmount"), M & 64 ? l.type.remove(
        l,
        a,
        m,
        g,
        Je,
        y
      ) : x && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (T !== Ee || P > 0 && P & 64) ? Se(
        x,
        a,
        m,
        !1,
        !0
      ) : (T === Ee && P & 384 || !g && M & 16) && Se(E, a, m), y && Wn(l);
    }
    (j && (q = A && A.onVnodeUnmounted) || L) && ae(() => {
      q && Te(q, a, l), L && Ve(l, null, a, "unmounted");
    }, m);
  }, Wn = (l) => {
    const { type: a, el: m, anchor: y, transition: g } = l;
    if (a === Ee) {
      _s(m, y);
      return;
    }
    if (a === nn) {
      h(l);
      return;
    }
    const T = () => {
      s(m), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (l.shapeFlag & 1 && g && !g.persisted) {
      const { leave: A, delayLeave: v } = g, E = () => A(m, T);
      v ? v(l.el, T, E) : E();
    } else
      T();
  }, _s = (l, a) => {
    let m;
    for (; l !== a; )
      m = u(l), s(l), l = m;
    s(a);
  }, bs = (l, a, m) => {
    const { bum: y, scope: g, update: T, subTree: A, um: v } = l;
    y && Zt(y), g.stop(), T && (T.active = !1, we(A, l, a, m)), v && ae(v, a), ae(() => {
      l.isUnmounted = !0;
    }, a), a && a.pendingBranch && !a.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === a.pendingId && (a.deps--, a.deps === 0 && a.resolve());
  }, Se = (l, a, m, y = !1, g = !1, T = 0) => {
    for (let A = T; A < l.length; A++)
      we(l[A], a, m, y, g);
  }, vt = (l) => l.shapeFlag & 6 ? vt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : u(l.anchor || l.el), Vn = (l, a, m) => {
    l == null ? a._vnode && we(a._vnode, null, null, !0) : C(a._vnode || null, l, a, null, null, null, m), ni(), Xi(), a._vnode = l;
  }, Je = {
    p: C,
    um: we,
    m: We,
    r: Wn,
    mt: Pe,
    mc: N,
    pc: $,
    pbc: se,
    n: vt,
    o: e
  };
  let Xt, Gt;
  return t && ([Xt, Gt] = t(
    Je
  )), {
    render: Vn,
    hydrate: Xt,
    createApp: Gr(Vn, Xt)
  };
}
function Ke({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function us(e, t, n = !1) {
  const i = e.children, s = t.children;
  if (U(i) && U(s))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let c = s[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[r] = Le(s[r]), c.el = o.el), n || us(o, c)), c.type === qt && (c.el = o.el);
    }
}
function ro(e) {
  const t = e.slice(), n = [0];
  let i, s, r, o, c;
  const f = e.length;
  for (i = 0; i < f; i++) {
    const d = e[i];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[i] = s, n.push(i);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        c = r + o >> 1, e[n[c]] < d ? r = c + 1 : o = c;
      d < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), n[r] = i);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
const oo = (e) => e.__isTeleport, Ee = Symbol.for("v-fgt"), qt = Symbol.for("v-txt"), Ge = Symbol.for("v-cmt"), nn = Symbol.for("v-stc"), ht = [];
let be = null;
function Ue(e = !1) {
  ht.push(be = e ? null : []);
}
function lo() {
  ht.pop(), be = ht[ht.length - 1] || null;
}
let yt = 1;
function pi(e) {
  yt += e;
}
function ps(e) {
  return e.dynamicChildren = yt > 0 ? be || tt : null, lo(), yt > 0 && be && be.push(e), e;
}
function ze(e, t, n, i, s, r) {
  return ps(
    de(
      e,
      t,
      n,
      i,
      s,
      r,
      !0
      /* isBlock */
    )
  );
}
function co(e, t, n, i, s) {
  return ps(
    Ie(
      e,
      t,
      n,
      i,
      s,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function fo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function at(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yt = "__vInternal", ds = ({ key: e }) => e ?? null, Ft = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ie(e) || fe(e) || H(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function de(e, t = null, n = null, i = 0, s = null, r = e === Ee ? 0 : 1, o = !1, c = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ds(t),
    ref: t && Ft(t),
    scopeId: Zi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ae
  };
  return c ? (Hn(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= ie(n) ? 8 : 16), yt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && be.push(f), f;
}
const Ie = ao;
function ao(e, t = null, n = null, i = 0, s = null, r = !1) {
  if ((!e || e === kr) && (e = Ge), fo(e)) {
    const c = rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Hn(c, n), yt > 0 && !r && be && (c.shapeFlag & 6 ? be[be.indexOf(e)] = c : be.push(c)), c.patchFlag |= -2, c;
  }
  if (vo(e) && (e = e.__vccOpts), t) {
    t = uo(t);
    let { class: c, style: f } = t;
    c && !ie(c) && (t.class = mt(c)), G(f) && (Vi(f) && !U(f) && (f = ne({}, f)), t.style = Wt(f));
  }
  const o = ie(e) ? 1 : Cr(e) ? 128 : oo(e) ? 64 : G(e) ? 4 : H(e) ? 2 : 0;
  return de(
    e,
    t,
    n,
    i,
    s,
    o,
    r,
    !0
  );
}
function uo(e) {
  return e ? Vi(e) || Yt in e ? ne({}, e) : e : null;
}
function rt(e, t, n = !1) {
  const { props: i, ref: s, patchFlag: r, children: o } = e, c = t ? ho(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && ds(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? U(s) ? s.concat(Ft(t)) : [s, Ft(t)] : Ft(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ee ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && rt(e.ssContent),
    ssFallback: e.ssFallback && rt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function po(e = " ", t = 0) {
  return Ie(qt, null, e, t);
}
function sn(e = "", t = !1) {
  return t ? (Ue(), co(Ge, null, e)) : Ie(Ge, null, e);
}
function Ce(e) {
  return e == null || typeof e == "boolean" ? Ie(Ge) : U(e) ? Ie(
    Ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Le(e) : Ie(qt, null, String(e));
}
function Le(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : rt(e);
}
function Hn(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null)
    t = null;
  else if (U(t))
    n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Hn(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Yt in t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    H(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), i & 64 ? (n = 16, t = [po(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i)
      if (s === "class")
        t.class !== i.class && (t.class = mt([t.class, i.class]));
      else if (s === "style")
        t.style = Wt([t.style, i.style]);
      else if (Bt(s)) {
        const r = t[s], o = i[s];
        o && r !== o && !(U(r) && r.includes(o)) && (t[s] = r ? [].concat(r, o) : o);
      } else
        s !== "" && (t[s] = i[s]);
  }
  return t;
}
function Te(e, t, n, i = null) {
  xe(e, t, 7, [
    n,
    i
  ]);
}
const mo = rs();
let go = 0;
function _o(e, t, n) {
  const i = e.type, s = (t ? t.appContext : e.appContext) || mo, r = {
    uid: go++,
    vnode: e,
    type: i,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ms(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ls(i, s),
    emitsOptions: Ji(i, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: X,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: X,
    data: X,
    props: X,
    attrs: X,
    slots: X,
    refs: X,
    setupState: X,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = yr.bind(null, r), e.ce && e.ce(r), r;
}
let oe = null, Bn, Qe, di = "__VUE_INSTANCE_SETTERS__";
(Qe = ln()[di]) || (Qe = ln()[di] = []), Qe.push((e) => oe = e), Bn = (e) => {
  Qe.length > 1 ? Qe.forEach((t) => t(e)) : Qe[0](e);
};
const ot = (e) => {
  Bn(e), e.scope.on();
}, Xe = () => {
  oe && oe.scope.off(), Bn(null);
};
function hs(e) {
  return e.vnode.shapeFlag & 4;
}
let xt = !1;
function bo(e, t = !1) {
  xt = t;
  const { props: n, children: i } = e.vnode, s = hs(e);
  Zr(e, n, s, t), to(e, i);
  const r = s ? yo(e, t) : void 0;
  return xt = !1, r;
}
function yo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ki(new Proxy(e.ctx, Vr));
  const { setup: i } = n;
  if (i) {
    const s = e.setupContext = i.length > 1 ? wo(e) : null;
    ot(e), lt();
    const r = Be(
      i,
      e,
      0,
      [e.props, s]
    );
    if (ct(), Xe(), Oi(r)) {
      if (r.then(Xe, Xe), t)
        return r.then((o) => {
          hi(e, o, t);
        }).catch((o) => {
          Kt(o, e, 0);
        });
      e.asyncDep = r;
    } else
      hi(e, r, t);
  } else
    ms(e, t);
}
function hi(e, t, n) {
  H(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : G(t) && (e.setupState = zi(t)), ms(e, n);
}
let mi;
function ms(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && mi && !i.render) {
      const s = i.template || Un(e).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: f } = i, d = ne(
          ne(
            {
              isCustomElement: r,
              delimiters: c
            },
            o
          ),
          f
        );
        i.render = mi(s, d);
      }
    }
    e.render = i.render || ye;
  }
  ot(e), lt(), Kr(e), ct(), Xe();
}
function xo(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ue(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function wo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return xo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function jn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(zi(Ki(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in dt)
          return dt[n](e);
      },
      has(t, n) {
        return n in t || n in dt;
      }
    }));
}
function vo(e) {
  return H(e) && "__vccOpts" in e;
}
const To = (e, t) => dr(e, t, xt), Eo = Symbol.for("v-scx"), Co = () => Mt(Eo), Oo = "3.3.4", Ao = "http://www.w3.org/2000/svg", qe = typeof document < "u" ? document : null, gi = qe && /* @__PURE__ */ qe.createElement("template"), Io = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, i) => {
    const s = t ? qe.createElementNS(Ao, e) : qe.createElement(e, n ? { is: n } : void 0);
    return e === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple), s;
  },
  createText: (e) => qe.createTextNode(e),
  createComment: (e) => qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => qe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, i, s, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      gi.innerHTML = i ? `<svg>${e}</svg>` : e;
      const c = gi.content;
      if (i) {
        const f = c.firstChild;
        for (; f.firstChild; )
          c.appendChild(f.firstChild);
        c.removeChild(f);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Po(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function So(e, t, n) {
  const i = e.style, s = ie(n);
  if (n && !s) {
    if (t && !ie(t))
      for (const r in t)
        n[r] == null && yn(i, r, "");
    for (const r in n)
      yn(i, r, n[r]);
  } else {
    const r = i.display;
    s ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (i.display = r);
  }
}
const _i = /\s*!important$/;
function yn(e, t, n) {
  if (U(n))
    n.forEach((i) => yn(e, t, i));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const i = Ro(e, t);
    _i.test(n) ? e.setProperty(
      ge(i),
      n.replace(_i, ""),
      "important"
    ) : e[i] = n;
  }
}
const bi = ["Webkit", "Moz", "ms"], rn = {};
function Ro(e, t) {
  const n = rn[t];
  if (n)
    return n;
  let i = Me(t);
  if (i !== "filter" && i in e)
    return rn[t] = i;
  i = Pi(i);
  for (let s = 0; s < bi.length; s++) {
    const r = bi[s] + i;
    if (r in e)
      return rn[t] = r;
  }
  return t;
}
const yi = "http://www.w3.org/1999/xlink";
function Mo(e, t, n, i, s) {
  if (i && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(yi, t.slice(6, t.length)) : e.setAttributeNS(yi, t, n);
  else {
    const r = Rs(t);
    n == null || r && !Si(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Fo(e, t, n, i, s, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    i && o(i, s, r), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = n;
    const d = c === "OPTION" ? e.getAttribute("value") : e.value, _ = n ?? "";
    d !== _ && (e.value = _), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const d = typeof e[t];
    d === "boolean" ? n = Si(n) : n == null && d === "string" ? (n = "", f = !0) : d === "number" && (n = 0, f = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  f && e.removeAttribute(t);
}
function No(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function Do(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
function Uo(e, t, n, i, s = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (i && o)
    o.value = i;
  else {
    const [c, f] = Lo(t);
    if (i) {
      const d = r[t] = jo(i, s);
      No(e, c, d, f);
    } else
      o && (Do(e, c, o, f), r[t] = void 0);
  }
}
const xi = /(?:Once|Passive|Capture)$/;
function Lo(e) {
  let t;
  if (xi.test(e)) {
    t = {};
    let i;
    for (; i = e.match(xi); )
      e = e.slice(0, e.length - i[0].length), t[i[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ge(e.slice(2)), t];
}
let on = 0;
const Ho = /* @__PURE__ */ Promise.resolve(), Bo = () => on || (Ho.then(() => on = 0), on = Date.now());
function jo(e, t) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    xe(
      ko(i, n.value),
      t,
      5,
      [i]
    );
  };
  return n.value = e, n.attached = Bo(), n;
}
function ko(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((i) => (s) => !s._stopped && i && i(s));
  } else
    return t;
}
const wi = /^on[a-z]/, Wo = (e, t, n, i, s = !1, r, o, c, f) => {
  t === "class" ? Po(e, i, s) : t === "style" ? So(e, n, i) : Bt(t) ? wn(t) || Uo(e, t, n, i, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Vo(e, t, i, s)) ? Fo(
    e,
    t,
    i,
    r,
    o,
    c,
    f
  ) : (t === "true-value" ? e._trueValue = i : t === "false-value" && (e._falseValue = i), Mo(e, t, i, s));
};
function Vo(e, t, n, i) {
  return i ? !!(t === "innerHTML" || t === "textContent" || t in e && wi.test(t) && H(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || wi.test(t) && ie(n) ? !1 : t in e;
}
function Ko(e, t) {
  const n = Ir(e);
  class i extends kn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return i.def = n, i;
}
const zo = typeof HTMLElement < "u" ? HTMLElement : class {
};
class kn extends zo {
  constructor(t, n = {}, i) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && i ? i(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, qi(() => {
      this._connected || (Ei(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let i = 0; i < this.attributes.length; i++)
      this._setAttr(this.attributes[i].name);
    new MutationObserver((i) => {
      for (const s of i)
        this._setAttr(s.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (i, s = !1) => {
      const { props: r, styles: o } = i;
      let c;
      if (r && !U(r))
        for (const f in r) {
          const d = r[f];
          (d === Number || d && d.type === Number) && (f in this._props && (this._props[f] = qn(this._props[f])), (c || (c = /* @__PURE__ */ Object.create(null)))[Me(f)] = !0);
        }
      this._numberProps = c, s && this._resolveProps(i), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((i) => t(i, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, i = U(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && i.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of i.map(Me))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(r) {
          this._setProp(s, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const i = Me(t);
    this._numberProps && this._numberProps[i] && (n = qn(n)), this._setProp(i, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, i = !0, s = !0) {
    n !== this._props[t] && (this._props[t] = n, s && this._instance && this._update(), i && (n === !0 ? this.setAttribute(ge(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ge(t), n + "") : n || this.removeAttribute(ge(t))));
  }
  _update() {
    Ei(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ie(this._def, ne({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const i = (r, o) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: o
          })
        );
      };
      n.emit = (r, ...o) => {
        i(r, o), ge(r) !== r && i(ge(r), o);
      };
      let s = this;
      for (; s = s && (s.parentNode || s.host); )
        if (s instanceof kn) {
          n.parent = s._instance, n.provides = s._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const i = document.createElement("style");
      i.textContent = n, this.shadowRoot.appendChild(i);
    });
  }
}
const $o = ["ctrl", "shift", "alt", "meta"], qo = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => $o.some((n) => e[`${n}Key`] && !t.includes(n))
}, vi = (e, t) => (n, ...i) => {
  for (let s = 0; s < t.length; s++) {
    const r = qo[t[s]];
    if (r && r(n, t))
      return;
  }
  return e(n, ...i);
}, Yo = /* @__PURE__ */ ne({ patchProp: Wo }, Io);
let Ti;
function Xo() {
  return Ti || (Ti = io(Yo));
}
const Ei = (...e) => {
  Xo().render(...e);
};
var gs = {};
(function(e) {
  (function() {
    var t = {
      direction: "horizontal",
      snapToLines: !0,
      linePosition: "auto",
      lineAlign: "start",
      textPosition: "auto",
      positionAlign: "auto",
      size: 100,
      alignment: "center"
    }, n = function(c) {
      c || (c = {
        "&amp": "&",
        "&lt": "<",
        "&gt": ">",
        "&lrm": "‎",
        "&rlm": "‏",
        "&nbsp": " "
      }), this.entities = c, this.parse = function(f, d) {
        f = f.replace(/\0/g, "�");
        var _ = /\r\n|\r|\n/, b = Date.now(), u = 0, p = f.split(_), O = !1, C = [], I = [], D = [];
        function w(te, Y) {
          D.push({ message: te, line: u + 1, col: Y });
        }
        var S = p[u], h = S.length, B = "WEBVTT", z = 0, le = B.length;
        for (S[0] === "\uFEFF" && (z = 1, le += 1), (h < le || S.indexOf(B) !== 0 + z || h > le && S[le] !== " " && S[le] !== "	") && w('No valid signature. (File needs to start with "WEBVTT".)'), u++; p[u] != "" && p[u] != null; ) {
          if (w("No blank line after the signature."), p[u].indexOf("-->") != -1) {
            O = !0;
            break;
          }
          u++;
        }
        for (; p[u] != null; ) {
          for (var N; !O && p[u] == ""; )
            u++;
          if (!O && p[u] == null)
            break;
          N = Object.assign({}, t, {
            id: "",
            startTime: 0,
            endTime: 0,
            pauseOnExit: !1,
            direction: "horizontal",
            snapToLines: !0,
            linePosition: "auto",
            lineAlign: "start",
            textPosition: "auto",
            positionAlign: "auto",
            size: 100,
            alignment: "center",
            text: "",
            tree: null
          });
          var R = !0;
          if (p[u].indexOf("-->") == -1) {
            if (N.id = p[u], /^NOTE($|[ \t])/.test(N.id)) {
              for (u++; p[u] != "" && p[u] != null; )
                p[u].indexOf("-->") != -1 && w("Cannot have timestamp in a comment."), u++;
              continue;
            }
            if (/^STYLE($|[ \t])/.test(N.id)) {
              var se = [], ee = !1;
              for (u++; p[u] != "" && p[u] != null; )
                p[u].indexOf("-->") != -1 && (w("Cannot have timestamp in a style block."), ee = !0), se.push(p[u]), u++;
              if (I.length) {
                w("Style blocks cannot appear after the first cue.");
                continue;
              }
              ee || C.push(se.join(`
`));
              continue;
            }
            if (u++, p[u] == "" || p[u] == null) {
              w("Cue identifier cannot be standalone.");
              continue;
            }
            if (p[u].indexOf("-->") == -1) {
              R = !1, w("Cue identifier needs to be followed by timestamp.");
              continue;
            }
          }
          O = !1;
          var V = new i(p[u], w), Z = 0;
          if (I.length > 0 && (Z = I[I.length - 1].startTime), R && !V.parse(N, Z)) {
            for (N = null, u++; p[u] != "" && p[u] != null; ) {
              if (p[u].indexOf("-->") != -1) {
                O = !0;
                break;
              }
              u++;
            }
            continue;
          }
          for (u++; p[u] != "" && p[u] != null; ) {
            if (p[u].indexOf("-->") != -1) {
              w("Blank line missing before cue."), O = !0;
              break;
            }
            N.text != "" && (N.text += `
`), N.text += p[u], u++;
          }
          var Pe = new s(N.text, w, d, c);
          N.tree = Pe.parse(N.startTime, N.endTime), I.push(N);
        }
        return I.sort(function(te, Y) {
          return te.startTime < Y.startTime ? -1 : te.startTime > Y.startTime ? 1 : te.endTime > Y.endTime ? -1 : te.endTime < Y.endTime ? 1 : 0;
        }), { cues: I, errors: D, time: Date.now() - b, styles: C };
      };
    }, i = function(b, f) {
      var d = /[\u0020\t\f]/, _ = /[^\u0020\t\f]/, b = b, u = 0, p = function(w) {
        f(w, u + 1);
      };
      function O(w) {
        for (; b[u] != null && w.test(b[u]); )
          u++;
      }
      function C(w) {
        for (var S = ""; b[u] != null && w.test(b[u]); )
          S += b[u], u++;
        return S;
      }
      function I() {
        var w = "minutes", S, h, B, z;
        if (b[u] == null) {
          p("No timestamp found.");
          return;
        }
        if (!/\d/.test(b[u])) {
          p("Timestamp must start with a character in the range 0-9.");
          return;
        }
        if (S = C(/\d/), (S.length > 2 || parseInt(S, 10) > 59) && (w = "hours"), b[u] != ":") {
          p("No time unit separator found.");
          return;
        }
        if (u++, h = C(/\d/), h.length != 2) {
          p("Must be exactly two digits.");
          return;
        }
        if (w == "hours" || b[u] == ":") {
          if (b[u] != ":") {
            p("No seconds found or minutes is greater than 59.");
            return;
          }
          if (u++, B = C(/\d/), B.length != 2) {
            p("Must be exactly two digits.");
            return;
          }
        } else {
          if (S.length != 2) {
            p("Must be exactly two digits.");
            return;
          }
          B = h, h = S, S = "0";
        }
        if (b[u] != ".") {
          p('No decimal separator (".") found.');
          return;
        }
        if (u++, z = C(/\d/), z.length != 3) {
          p("Milliseconds must be given in three digits.");
          return;
        }
        if (parseInt(h, 10) > 59) {
          p("You cannot have more than 59 minutes.");
          return;
        }
        if (parseInt(B, 10) > 59) {
          p("You cannot have more than 59 seconds.");
          return;
        }
        return parseInt(S, 10) * 60 * 60 + parseInt(h, 10) * 60 + parseInt(B, 10) + parseInt(z, 10) / 1e3;
      }
      function D(w, S) {
        for (var h = w.split(d), B = [], z = 0; z < h.length; z++)
          if (h[z] != "") {
            var le = h[z].indexOf(":"), N = h[z].slice(0, le), R = h[z].slice(le + 1);
            if (B.indexOf(N) != -1 && p("Duplicate setting."), B.push(N), R == "") {
              p("No value for setting defined.");
              return;
            }
            if (N == "vertical") {
              if (R != "rl" && R != "lr") {
                p("Writing direction can only be set to 'rl' or 'rl'.");
                continue;
              }
              S.direction = R;
            } else if (N == "line") {
              if (/,/.test(R)) {
                var se = R.split(",");
                R = se[0];
                var ee = se[1];
              }
              if (!/^[-\d](\d*)(\.\d+)?%?$/.test(R)) {
                p("Line position takes a number or percentage.");
                continue;
              }
              if (R.indexOf("-", 1) != -1) {
                p("Line position can only have '-' at the start.");
                continue;
              }
              if (R.indexOf("%") != -1 && R.indexOf("%") != R.length - 1) {
                p("Line position can only have '%' at the end.");
                continue;
              }
              if (R[0] == "-" && R[R.length - 1] == "%") {
                p("Line position cannot be a negative percentage.");
                continue;
              }
              var V = R, Z = !1;
              if (R[R.length - 1] == "%" && (Z = !0, V = R.slice(0, R.length - 1), parseInt(R, 10) > 100)) {
                p("Line position cannot be >100%.");
                continue;
              }
              if (V === "" || isNaN(V) || !isFinite(V)) {
                p("Line position needs to be a number");
                continue;
              }
              if (ee !== void 0) {
                if (!["start", "center", "end"].includes(ee)) {
                  p("Line alignment needs to be one of start, center or end");
                  continue;
                }
                S.lineAlign = ee;
              }
              S.snapToLines = !Z, S.linePosition = parseFloat(V), parseFloat(V).toString() !== V && (S.nonSerializable = !0);
            } else if (N == "position") {
              if (/,/.test(R)) {
                var se = R.split(",");
                R = se[0];
                var Pe = se[1];
              }
              if (R[R.length - 1] != "%") {
                p("Text position must be a percentage.");
                continue;
              }
              if (parseInt(R, 10) > 100 || parseInt(R, 10) < 0) {
                p("Text position needs to be between 0 and 100%.");
                continue;
              }
              if (V = R.slice(0, R.length - 1), V === "" || isNaN(V) || !isFinite(V)) {
                p("Line position needs to be a number");
                continue;
              }
              if (Pe !== void 0) {
                if (!["line-left", "center", "line-right"].includes(Pe)) {
                  p("Position alignment needs to be one of line-left, center or line-right");
                  continue;
                }
                S.positionAlign = Pe;
              }
              S.textPosition = parseFloat(V);
            } else if (N == "size") {
              if (R[R.length - 1] != "%") {
                p("Size must be a percentage.");
                continue;
              }
              if (parseInt(R, 10) > 100) {
                p("Size cannot be >100%.");
                continue;
              }
              var te = R.slice(0, R.length - 1);
              if (te === void 0 || te === "" || isNaN(te)) {
                p("Size needs to be a number"), te = 100;
                continue;
              } else if (te = parseFloat(te), te < 0 || te > 100) {
                p("Size needs to be between 0 and 100%.");
                continue;
              }
              S.size = te;
            } else if (N == "align") {
              var Y = ["start", "center", "end", "left", "right"];
              if (Y.indexOf(R) == -1) {
                p("Alignment can only be set to one of " + Y.join(", ") + ".");
                continue;
              }
              S.alignment = R;
            } else
              p("Invalid setting.");
          }
      }
      this.parse = function(w, S) {
        if (O(d), w.startTime = I(), w.startTime != null) {
          if (w.startTime < S && p("Start timestamp is not greater than or equal to start timestamp of previous cue."), _.test(b[u]) && p("Timestamp not separated from '-->' by whitespace."), O(d), b[u] != "-") {
            p("No valid timestamp separator found.");
            return;
          }
          if (u++, b[u] != "-") {
            p("No valid timestamp separator found.");
            return;
          }
          if (u++, b[u] != ">") {
            p("No valid timestamp separator found.");
            return;
          }
          if (u++, _.test(b[u]) && p("'-->' not separated from timestamp by whitespace."), O(d), w.endTime = I(), w.endTime != null)
            return w.endTime <= w.startTime && p("End timestamp is not greater than start timestamp."), _.test(b[u]), O(d), D(b.substring(u), w), !0;
        }
      }, this.parseTimestamp = function() {
        var w = I();
        if (b[u] != null) {
          p("Timestamp must not have trailing characters.");
          return;
        }
        return w;
      };
    }, s = function(u, f, d, _) {
      this.entities = _;
      var b = this, u = u, p = 0, O = function(I) {
        d != "metadata" && f(I, p + 1);
      };
      this.parse = function(I, D) {
        function w(V) {
          const Z = { ...V };
          return V.children && (Z.children = V.children.map(w)), Z.parent && delete Z.parent, Z;
        }
        var S = { children: [] }, h = S, B = [];
        function z(V) {
          h.children.push({ type: "object", name: V[1], classes: V[2], children: [], parent: h }), h = h.children[h.children.length - 1];
        }
        function le(V) {
          for (var Z = h; Z; ) {
            if (Z.name == V)
              return !0;
            Z = Z.parent;
          }
        }
        for (; u[p] != null; ) {
          var N = C();
          if (N[0] == "text")
            h.children.push({ type: "text", value: N[1], parent: h });
          else if (N[0] == "start tag") {
            d == "chapters" && O("Start tags not allowed in chapter title text.");
            var R = N[1];
            R != "v" && R != "lang" && N[3] != "" && O("Only <v> and <lang> can have an annotation."), R == "c" || R == "i" || R == "b" || R == "u" || R == "ruby" || R == "rt" && h.name == "ruby" ? z(N) : R == "v" ? (le("v") && O("<v> cannot be nested inside itself."), z(N), h.value = N[3], N[3] || O("<v> requires an annotation.")) : R == "lang" ? (z(N), h.value = N[3]) : O("Incorrect start tag.");
          } else if (N[0] == "end tag")
            d == "chapters" && O("End tags not allowed in chapter title text."), N[1] == h.name ? h = h.parent : N[1] == "ruby" && h.name == "rt" ? h = h.parent.parent : O("Incorrect end tag.");
          else if (N[0] == "timestamp") {
            d == "chapters" && O("Timestamp not allowed in chapter title text.");
            var se = new i(N[1], O), ee = se.parseTimestamp();
            ee != null && ((ee <= I || ee >= D) && O("Timestamp must be between start timestamp and end timestamp."), B.length > 0 && B[B.length - 1] >= ee && O("Timestamp must be greater than any previous timestamp."), h.children.push({ type: "timestamp", value: ee, parent: h }), B.push(ee));
          }
        }
        for (; h.parent; )
          h.name != "v" && O("Required end tag missing."), h = h.parent;
        return w(S);
      };
      function C() {
        for (var I = "data", D = "", w = "", S = []; u[p - 1] != null || p == 0; ) {
          var h = u[p];
          if (I == "data")
            if (h == "&")
              w = h, I = "escape";
            else if (h == "<" && D == "")
              I = "tag";
            else {
              if (h == "<" || h == null)
                return ["text", D];
              D += h;
            }
          else if (I == "escape")
            if (h == "<" || h == null) {
              O("Incorrect escape.");
              let B;
              return (B = w.match(/^&#([0-9]+)$/)) ? D += String.fromCharCode(B[1]) : b.entities[w] ? D += b.entities[w] : D += w, ["text", D];
            } else if (h == "&")
              O("Incorrect escape."), D += w, w = h;
            else if (/[a-z#0-9]/i.test(h))
              w += h;
            else if (h == ";") {
              let B;
              (B = w.match(/^&#(x?[0-9]+)$/)) ? D += String.fromCharCode("0" + B[1]) : b.entities[w + h] ? D += b.entities[w + h] : (B = Object.keys(_).find((z) => w.startsWith(z))) ? D += b.entities[B] + w.slice(B.length) + h : (O("Incorrect escape."), D += w + ";"), I = "data";
            } else
              O("Incorrect escape."), D += w + h, I = "data";
          else if (I == "tag")
            if (h == "	" || h == `
` || h == "\f" || h == " ")
              I = "start tag annotation";
            else if (h == ".")
              I = "start tag class";
            else if (h == "/")
              I = "end tag";
            else if (/\d/.test(h))
              D = h, I = "timestamp tag";
            else {
              if (h == ">" || h == null)
                return h == ">" && p++, ["start tag", "", [], ""];
              D = h, I = "start tag";
            }
          else if (I == "start tag")
            if (h == "	" || h == "\f" || h == " ")
              I = "start tag annotation";
            else if (h == `
`)
              w = h, I = "start tag annotation";
            else if (h == ".")
              I = "start tag class";
            else {
              if (h == ">" || h == null)
                return h == ">" && p++, ["start tag", D, [], ""];
              D += h;
            }
          else if (I == "start tag class")
            if (h == "	" || h == "\f" || h == " ")
              w && S.push(w), w = "", I = "start tag annotation";
            else if (h == `
`)
              w && S.push(w), w = h, I = "start tag annotation";
            else if (h == ".")
              w && S.push(w), w = "";
            else {
              if (h == ">" || h == null)
                return h == ">" && p++, w && S.push(w), ["start tag", D, S, ""];
              w += h;
            }
          else if (I == "start tag annotation") {
            if (h == ">" || h == null)
              return h == ">" && p++, w = w.split(/[\u0020\t\f\r\n]+/).filter(function(B) {
                if (B)
                  return !0;
              }).join(" "), ["start tag", D, S, w];
            w += h;
          } else if (I == "end tag") {
            if (h == ">" || h == null)
              return h == ">" && p++, ["end tag", D];
            D += h;
          } else if (I == "timestamp tag") {
            if (h == ">" || h == null)
              return h == ">" && p++, ["timestamp", D];
            D += h;
          } else
            O("Never happens.");
          p++;
        }
      }
    }, r = function() {
      function c(u) {
        const p = ("00" + (u - Math.floor(u)).toFixed(3) * 1e3).slice(-3);
        let O = 0, C = 0, I = 0;
        return u >= 3600 && (O = Math.floor(u / 3600)), C = Math.floor((u - 3600 * O) / 60), I = Math.floor(u - 3600 * O - 60 * C), (O ? O + ":" : "") + ("" + C).padStart(2, "0") + ":" + ("" + I).padStart(2, "0") + "." + p;
      }
      function f(u) {
        var p = "";
        const O = Object.keys(t).filter((C) => u[C] !== t[C]);
        return O.includes("direction") && (p += " vertical:" + u.direction), O.includes("alignment") && (p += " align:" + u.alignment), O.includes("size") && (p += " size:" + u.size + "%"), (O.includes("lineAlign") || O.includes("linePosition")) && (p += " line:" + u.linePosition + (u.snapToLines ? "" : "%") + (u.lineAlign && u.lineAlign != t.lineAlign ? "," + u.lineAlign : "")), (O.includes("textPosition") || O.includes("positionAlign")) && (p += " position:" + u.textPosition + "%" + (u.positionAlign && u.positionAlign !== t.positionAlign ? "," + u.positionAlign : "")), p;
      }
      function d(u) {
        for (var p = "", O = 0; O < u.length; O++) {
          var C = u[O];
          if (C.type == "text")
            p += C.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          else if (C.type == "object") {
            if (p += "<" + C.name, C.classes)
              for (var I = 0; I < C.classes.length; I++)
                p += "." + C.classes[I];
            C.value && (p += " " + C.value), p += ">", C.children && (p += d(C.children)), p += "</" + C.name + ">";
          } else
            C.type == "timestamp" ? p += "<" + c(C.value) + ">" : p += "<" + C.value + ">";
        }
        return p;
      }
      function _(u) {
        return (u.id !== void 0 ? u.id + `
` : "") + c(u.startTime) + " --> " + c(u.endTime) + f(u) + `
` + d(u.tree.children) + `

`;
      }
      function b(u) {
        return `STYLE
` + u + `

`;
      }
      this.serialize = function(u, p) {
        var O = `WEBVTT

`;
        if (p)
          for (var C = 0; C < p.length; C++)
            O += b(p[C]);
        for (var C = 0; C < u.length; C++)
          O += _(u[C]);
        return O;
      };
    };
    function o(c) {
      c.WebVTTParser = n, c.WebVTTCueTimingsAndSettingsParser = i, c.WebVTTCueTextParser = s, c.WebVTTSerializer = r;
    }
    typeof window < "u" && o(window), o(e);
  })();
})(gs);
const Go = `:root{font-family:Avenir,Helvetica,Arial,sans-serif}.cue-text-line{display:flex;align-items:center;padding:2px;transition-property:background-color;transition-duration:2s}.cue-text-line-playing{background-color:#d9e7ff!important}.cue-text-line:nth-child(odd){background-color:#f5f5f5}.cue-playing{color:#6495ed!important;font-weight:700}.cue-text-start{flex-shrink:1;font-family:monospace;padding-right:5px;color:#000000b3}.cue-text{flex-grow:1;text-align:justify;padding-left:.25em}.cue-text strong{background-color:#ffeb3b8c}.error-msg{background-color:#f08080;display:block}#play-stop{font-size:1.1em;background-color:#f5f5f5;padding:.15em;border-radius:1em}#play-stop span{font-size:.85em}a{text-decoration:none;color:#000000b3}.playbutton-container{display:flex;width:50%}.playbutton-icon{flex:0}.playbutton-text{flex:1;display:flex;align-items:center;padding-left:.5em}.playbutton{align-items:center;display:flex;justify-content:center;width:25px;height:25px}.fondo{background:hsla(200,0%,0%,.7);border-radius:50%;height:25px;position:absolute;width:25px}.playbutton:active .fondo{background:cornflowerblue}.icono{height:50px;transform:rotate(-120deg) translate(-11px);transition:transform .5s;width:50px}.parte{background:white;height:50px;position:absolute;width:50px}.izquierda{clip-path:polygon(43.77666% 55.85251%,43.77874% 55.46331%,43.7795% 55.09177%,43.77934% 54.74844%,43.77855% 54.44389%,43.77741% 54.18863%,43.77625% 53.99325%,43.77533% 53.86828%,43.77495% 53.82429%,43.77518% 53.55329%,43.7754% 53.2823%,43.77563% 53.01131%,43.77585% 52.74031%,43.77608% 52.46932%,43.7763% 52.19832%,43.77653% 51.92733%,43.77675% 51.65633%,43.77653% 51.38533%,43.7763% 51.11434%,43.77608% 50.84334%,43.77585% 50.57235%,43.77563% 50.30136%,43.7754% 50.03036%,43.77518% 49.75936%,43.77495% 49.48837%,44.48391% 49.4885%,45.19287% 49.48865%,45.90183% 49.48878%,46.61079% 49.48892%,47.31975% 49.48906%,48.0287% 49.4892%,48.73766% 49.48934%,49.44662% 49.48948%,50.72252% 49.48934%,51.99842% 49.4892%,53.27432% 49.48906%,54.55022% 49.48892%,55.82611% 49.48878%,57.10201% 49.48865%,58.3779% 49.4885%,59.6538% 49.48837%,59.57598% 49.89151%,59.31883% 50.28598%,58.84686% 50.70884%,58.12456% 51.19714%,57.11643% 51.78793%,55.78697% 52.51828%,54.10066% 53.42522%,52.02202% 54.54581%,49.96525% 55.66916%,48.3319% 56.57212%,47.06745% 57.27347%,46.11739% 57.79191%,45.42719% 58.14619%,44.94235% 58.35507%,44.60834% 58.43725%,44.37066% 58.41149%,44.15383% 58.27711%,43.99617% 58.0603%,43.88847% 57.77578%,43.82151% 57.43825%,43.78608% 57.06245%,43.77304% 56.66309%,43.773% 56.25486%);transition:clip-path .5s}.derecha{clip-path:polygon(43.77666% 43.83035%,43.77874% 44.21955%,43.7795% 44.59109%,43.77934% 44.93442%,43.77855% 45.23898%,43.77741% 45.49423%,43.77625% 45.68961%,43.77533% 45.81458%,43.77495% 45.85858%,43.77518% 46.12957%,43.7754% 46.40056%,43.77563% 46.67156%,43.77585% 46.94255%,43.77608% 47.21355%,43.7763% 47.48454%,43.77653% 47.75554%,43.77675% 48.02654%,43.77653% 48.29753%,43.7763% 48.56852%,43.77608% 48.83952%,43.77585% 49.11051%,43.77563% 49.38151%,43.7754% 49.65251%,43.77518% 49.9235%,43.77495% 50.1945%,44.48391% 50.19436%,45.19287% 50.19422%,45.90183% 50.19408%,46.61079% 50.19394%,47.31975% 50.1938%,48.0287% 50.19366%,48.73766% 50.19353%,49.44662% 50.19338%,50.72252% 50.19353%,51.99842% 50.19366%,53.27432% 50.1938%,54.55022% 50.19394%,55.82611% 50.19408%,57.10201% 50.19422%,58.3779% 50.19436%,59.6538% 50.1945%,59.57598% 49.79136%,59.31883% 49.39688%,58.84686% 48.97402%,58.12456% 48.48572%,57.11643% 47.89493%,55.78697% 47.16458%,54.10066% 46.25764%,52.02202% 45.13705%,49.96525% 44.01371%,48.3319% 43.11074%,47.06745% 42.4094%,46.11739% 41.89096%,45.42719% 41.53667%,44.94235% 41.3278%,44.60834% 41.24561%,44.37066% 41.27137%,44.15383% 41.40575%,43.99617% 41.62256%,43.88847% 41.90709%,43.82151% 42.24461%,43.78608% 42.62041%,43.77304% 43.01978%,43.773% 43.428%);transition:clip-path .5s}.puntero{border-radius:50%;height:50px;position:absolute;-webkit-tap-highlight-color:transparent;width:50px}.active .icono{transform:rotate(-90deg) translate(-11px)}.active .izquierda{clip-path:polygon(56.42249% 57.01763%,54.93283% 57.0175%,53.00511% 57.01738%,50.83554% 57.01727%,48.62036% 57.01718%,46.55585% 57.01709%,44.83822% 57.01702%,43.66373% 57.01698%,43.22863% 57.01696%,42.86372% 57.01904%,42.56988% 57.01621%,42.3402% 56.99486%,42.16778% 56.94152%,42.0457% 56.84267%,41.96705% 56.68478%,41.92493% 56.45432%,41.91246% 56.13777%,41.91258% 55.76282%,41.9129% 55.37058%,41.91335% 54.96757%,41.91387% 54.56032%,41.91439% 54.15537%,41.91485% 53.75926%,41.91517% 53.3785%,41.91529% 53.01965%,41.94275% 52.72355%,42.02117% 52.51653%,42.14465% 52.38328%,42.30727% 52.30854%,42.50308% 52.27699%,42.72619% 52.27341%,42.97065% 52.28248%,43.23056% 52.2889%,43.94949% 52.28896%,45.45083% 52.28912%,47.47445% 52.28932%,49.76027% 52.28957%,52.04818% 52.28981%,54.07805% 52.29003%,55.5898% 52.29019%,56.32332% 52.29024%,56.58221% 52.28816%,56.83726% 52.28948%,57.07897% 52.30593%,57.29794% 52.34898%,57.48468% 52.43029%,57.62978% 52.56146%,57.72375% 52.7541%,57.75718% 53.01981%,57.75713% 53.37763%,57.75699% 53.81831%,57.75679% 54.31106%,57.75657% 54.82507%,57.75635% 55.32958%,57.75615% 55.79377%,57.75601% 56.18684%,57.75596% 56.47801%,57.7549% 56.50122%,57.74034% 56.5624%,57.6955% 56.64887%,57.60334% 56.748%,57.44691% 56.84712%,57.20925% 56.93358%,56.87342% 56.99471%)}.active .derecha{clip-path:polygon(56.42249% 42.44625%,54.93283% 42.44637%,53.00511% 42.44649%,50.83554% 42.4466%,48.62036% 42.4467%,46.55585% 42.44679%,44.83822% 42.44685%,43.66373% 42.4469%,43.22863% 42.44691%,42.86372% 42.44483%,42.56988% 42.44767%,42.3402% 42.46902%,42.16778% 42.52235%,42.0457% 42.6212%,41.96705% 42.77909%,41.92493% 43.00956%,41.91246% 43.32611%,41.91258% 43.70105%,41.9129% 44.0933%,41.91335% 44.49631%,41.91387% 44.90355%,41.91439% 45.3085%,41.91485% 45.70462%,41.91517% 46.08537%,41.91529% 46.44422%,41.94275% 46.74032%,42.02117% 46.94735%,42.14465% 47.0806%,42.30727% 47.15534%,42.50308% 47.18688%,42.72619% 47.19047%,42.97065% 47.1814%,43.23056% 47.17497%,43.94949% 47.17491%,45.45083% 47.17476%,47.47445% 47.17455%,49.76027% 47.1743%,52.04818% 47.17406%,54.07805% 47.17384%,55.5898% 47.17369%,56.32332% 47.17363%,56.58221% 47.17571%,56.83726% 47.17439%,57.07897% 47.15795%,57.29794% 47.1149%,57.48468% 47.03359%,57.62978% 46.90242%,57.72375% 46.70977%,57.75718% 46.44406%,57.75713% 46.08625%,57.75699% 45.64557%,57.75679% 45.15282%,57.75657% 44.6388%,57.75635% 44.1343%,57.75615% 43.6701%,57.75601% 43.27703%,57.75596% 42.98586%,57.7549% 42.96265%,57.74034% 42.90148%,57.6955% 42.815%,57.60334% 42.71587%,57.44691% 42.61675%,57.20925% 42.53029%,56.87342% 42.46916%)}
`, Jo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, s] of t)
    n[i] = s;
  return n;
}, Zo = {
  components: {},
  data: function() {
    return {
      networkError: !1,
      errorMsg: null,
      vttTree: null,
      sound: null,
      context: null,
      audioBuffer: null,
      playingClip: !1,
      playingAll: !1,
      activeSource: null,
      activeCueUniqueId: null,
      activeCountDown: null,
      activeCountDownTimer: null,
      playButtonText: "Play All",
      playFrom: null
    };
  },
  props: {
    vtt: String,
    audio: String,
    highlight: String,
    width: String
  },
  methods: {
    async playAllClips() {
      if (this.playingAll)
        return this.playButtonText = "Resume", this.activeSource.stop(), this.playingClip = !1, this.playingAll = !1, window.clearTimeout(this.activeStopTimer), window.clearTimeout(this.activeCountDownTimer), this.activeCountDownTimer = null, this.activeCueUniqueId = null, !1;
      this.playButtonText = "Pause", this.playingAll = !0;
      for (let e of this.vttTree.cues) {
        if (!this.playingAll)
          break;
        if (this.playFrom) {
          let n = null, i = !1;
          for (let s of this.vttTree.cues) {
            if (i) {
              n = "" + s.startTime + s.endTime;
              break;
            }
            "" + s.startTime + s.endTime == this.playFrom && (i = !0);
          }
          if ("" + e.startTime + e.endTime != n)
            continue;
          this.playFrom = null;
        }
        let t = e.endTime - e.startTime;
        t = t * 1e3, await this.playClip(e), await new Promise((n) => setTimeout(n, t));
      }
    },
    async playClip(e) {
      this.context || (this.context = new AudioContext(), this.audioBuffer = await fetch(this.audio).then((i) => i.arrayBuffer()).then((i) => this.context.decodeAudioData(i)).catch((i) => this.errorMsg = i)), this.playingClip && (this.activeSource.stop(), this.playingClip = !1, window.clearTimeout(this.activeStopTimer), window.clearTimeout(this.activeCountDownTimer), this.activeCountDownTimer = null, this.activeCueUniqueId = null), this.activeCueUniqueId = "" + e.startTime + e.endTime, this.playingClip = !0;
      const t = (i, s) => {
        this.activeSource = this.context.createBufferSource(), this.activeSource.buffer = this.audioBuffer, this.activeSource.connect(this.context.destination), this.activeSource.start(this.context.currentTime, i, s);
      };
      let n = e.startTime > 0 ? e.startTime - 0.1 : 0;
      t(n, e.endTime - e.startTime), this.activeCountDown = e.endTime - e.startTime, this.activeCountDownTimer = window.setInterval(() => {
        this.activeCountDown = this.activeCountDown - 1;
      }, 1e3), this.activeStopTimer = window.setTimeout(() => {
        this.playingClip = !1, this.activeCueUniqueId = null, window.clearTimeout(this.activeCountDownTimer);
      }, (e.endTime - e.startTime) * 1e3);
    },
    highlightFunc(e, t) {
      return t.replace(
        new RegExp(e, "gi"),
        (n) => `<strong>${n}</strong>`
      );
    },
    fancyTimeFormat(e) {
      const t = ~~(e / 3600), n = ~~(e % 3600 / 60), i = ~~e % 60;
      let s = "";
      return t > 0 && (s += "" + t + ":" + (n < 10 ? "0" : "")), s += (n < 10 ? "0" : "") + n + ":" + (i < 10 ? "0" : ""), s += "" + i, s;
    }
  },
  async mounted() {
    let e = null;
    if (this.vtt === void 0)
      return console.error("vtt attribute not set, cannot download the vtt file."), this.errorMsg = "vtt attribute not set, cannot download the vtt file.", !1;
    try {
      let t = await fetch(this.vtt);
      if (t.ok)
        e = await t.text();
      else
        return console.error("Could not download ", this.vtt), this.errorMsg = "Could not download " + this.vtt, this.networkError = !0, !1;
    } catch {
      return console.error("Could not download ", this.vtt), this.errorMsg = "Could not download " + this.vtt, !1;
    }
    try {
      const t = new gs.WebVTTParser();
      this.vttTree = t.parse(e, "metadata");
    } catch {
      console.error("Could not parse ", this.vtt);
    }
    this.context = new AudioContext(), this.audioBuffer = await fetch(this.audio).then((t) => t.arrayBuffer()).then((t) => this.context.decodeAudioData(t)).catch((t) => this.errorMsg = t);
  }
}, Qo = {
  key: 0,
  class: "error-msg"
}, el = { class: "playbutton-container" }, tl = { class: "playbutton-icon" }, nl = /* @__PURE__ */ de("div", { class: "fondo" }, null, -1), il = /* @__PURE__ */ de("div", { class: "icono" }, [
  /* @__PURE__ */ de("div", { class: "parte izquierda" }),
  /* @__PURE__ */ de("div", { class: "parte derecha" })
], -1), sl = [
  nl,
  il
], rl = { class: "playbutton-text" }, ol = {
  key: 0,
  class: "cue-text-start cue-playing"
}, ll = {
  key: 1,
  class: "cue-text-start"
}, cl = { class: "cue-text" }, fl = ["onClick", "innerHTML"];
function al(e, t, n, i, s, r) {
  return Ue(), ze("div", {
    style: Wt({ width: n.width === void 0 ? "100%" : n.width })
  }, [
    e.errorMsg !== null ? (Ue(), ze("span", Qo, "ERROR:" + Tt(e.errorMsg), 1)) : sn("", !0),
    e.errorMsg === null ? (Ue(), ze("a", {
      key: 1,
      href: "#",
      onClick: t[0] || (t[0] = vi((o) => r.playAllClips(), ["prevent", "stop"]))
    }, [
      de("div", el, [
        de("div", tl, [
          de("div", {
            class: mt({ playbutton: !0, active: this.playingClip })
          }, sl, 2)
        ]),
        de("div", rl, [
          de("span", null, Tt(e.playButtonText), 1)
        ])
      ])
    ])) : sn("", !0),
    e.vttTree && e.vttTree.cues ? (Ue(!0), ze(Ee, { key: 2 }, Wr(e.vttTree.cues, (o) => (Ue(), ze("div", {
      class: mt({ "cue-text-line": !0, "cue-text-line-playing": e.activeCueUniqueId == o.startTime + "" + o.endTime })
    }, [
      e.activeCueUniqueId == o.startTime + "" + o.endTime ? (Ue(), ze("div", ol, Tt(r.fancyTimeFormat(e.activeCountDown)), 1)) : (Ue(), ze("div", ll, Tt(r.fancyTimeFormat(o.startTime)), 1)),
      de("div", cl, [
        de("a", {
          href: "#",
          onClick: vi((c) => {
            r.playClip(o), this.playButtonText = "Play From " + r.fancyTimeFormat(o.startTime), this.playFrom = o.startTime + "" + o.endTime;
          }, ["prevent", "stop"]),
          innerHTML: n.highlight === void 0 ? o.text : r.highlightFunc(n.highlight, o.text)
        }, null, 8, fl)
      ])
    ], 2))), 256)) : sn("", !0)
  ], 4);
}
const ul = /* @__PURE__ */ Jo(Zo, [["render", al], ["styles", [Go]]]), pl = Ko(ul);
customElements.define("vtt-lyrics", pl);
