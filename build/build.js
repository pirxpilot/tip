var Tip = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/.pnpm/get-document@1.0.0/node_modules/get-document/index.js
  var require_get_document = __commonJS({
    "node_modules/.pnpm/get-document@1.0.0/node_modules/get-document/index.js"(exports, module) {
      module.exports = getDocument;
      var DOCUMENT_NODE = 9;
      function isDocument(d) {
        return d && d.nodeType === DOCUMENT_NODE;
      }
      function getDocument(node) {
        if (isDocument(node)) {
          return node;
        } else if (isDocument(node.ownerDocument)) {
          return node.ownerDocument;
        } else if (isDocument(node.document)) {
          return node.document;
        } else if (node.parentNode) {
          return getDocument(node.parentNode);
        } else if (node.commonAncestorContainer) {
          return getDocument(node.commonAncestorContainer);
        } else if (node.startContainer) {
          return getDocument(node.startContainer);
        } else if (node.anchorNode) {
          return getDocument(node.anchorNode);
        }
      }
    }
  });

  // node_modules/.pnpm/bounding-client-rect@1.0.5/node_modules/bounding-client-rect/index.js
  var require_bounding_client_rect = __commonJS({
    "node_modules/.pnpm/bounding-client-rect@1.0.5/node_modules/bounding-client-rect/index.js"(exports, module) {
      var getDocument = require_get_document();
      module.exports = getBoundingClientRect2;
      function getBoundingClientRect2(node) {
        var rect = null;
        var doc = getDocument(node);
        if (node.nodeType === 3) {
          var range = doc.createRange();
          range.selectNodeContents(node);
          node = range;
        }
        if ("function" === typeof node.getBoundingClientRect) {
          rect = node.getBoundingClientRect();
          if (node.startContainer && rect.left === 0 && rect.top === 0) {
            var span = doc.createElement("span");
            span.appendChild(doc.createTextNode("\u200B"));
            node.insertNode(span);
            rect = span.getBoundingClientRect();
            var spanParent = span.parentNode;
            spanParent.removeChild(span);
            spanParent.normalize();
          }
        }
        return rect;
      }
    }
  });

  // node_modules/.pnpm/component-emitter@2.0.0/node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/.pnpm/component-emitter@2.0.0/node_modules/component-emitter/index.js"(exports, module) {
      function Emitter2(object) {
        if (object) {
          return mixin(object);
        }
        this._callbacks = /* @__PURE__ */ new Map();
      }
      function mixin(object) {
        Object.assign(object, Emitter2.prototype);
        object._callbacks = /* @__PURE__ */ new Map();
        return object;
      }
      Emitter2.prototype.on = function(event, listener) {
        const callbacks = this._callbacks.get(event) ?? [];
        callbacks.push(listener);
        this._callbacks.set(event, callbacks);
        return this;
      };
      Emitter2.prototype.once = function(event, listener) {
        const on = (...arguments_) => {
          this.off(event, on);
          listener.apply(this, arguments_);
        };
        on.fn = listener;
        this.on(event, on);
        return this;
      };
      Emitter2.prototype.off = function(event, listener) {
        if (event === void 0 && listener === void 0) {
          this._callbacks.clear();
          return this;
        }
        if (listener === void 0) {
          this._callbacks.delete(event);
          return this;
        }
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          for (const [index, callback] of callbacks.entries()) {
            if (callback === listener || callback.fn === listener) {
              callbacks.splice(index, 1);
              break;
            }
          }
          if (callbacks.length === 0) {
            this._callbacks.delete(event);
          } else {
            this._callbacks.set(event, callbacks);
          }
        }
        return this;
      };
      Emitter2.prototype.emit = function(event, ...arguments_) {
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          const callbacksCopy = [...callbacks];
          for (const callback of callbacksCopy) {
            callback.apply(this, arguments_);
          }
        }
        return this;
      };
      Emitter2.prototype.listeners = function(event) {
        return this._callbacks.get(event) ?? [];
      };
      Emitter2.prototype.listenerCount = function(event) {
        if (event) {
          return this.listeners(event).length;
        }
        let totalCount = 0;
        for (const callbacks of this._callbacks.values()) {
          totalCount += callbacks.length;
        }
        return totalCount;
      };
      Emitter2.prototype.hasListeners = function(event) {
        return this.listenerCount(event) > 0;
      };
      Emitter2.prototype.addEventListener = Emitter2.prototype.on;
      Emitter2.prototype.removeListener = Emitter2.prototype.off;
      Emitter2.prototype.removeEventListener = Emitter2.prototype.off;
      Emitter2.prototype.removeAllListeners = Emitter2.prototype.off;
      if (typeof module !== "undefined") {
        module.exports = Emitter2;
      }
    }
  });

  // index.js
  var index_exports = {};
  __export(index_exports, {
    default: () => Tip
  });

  // node_modules/.pnpm/@pirxpilot+events@3.0.0/node_modules/@pirxpilot/events/index.js
  function events(el, obj) {
    const handlers = /* @__PURE__ */ new Map();
    function bind(name, handler, opts) {
      if (!handler) {
        handler = name;
      }
      if (typeof handler === "string") {
        handler = obj[handler].bind(obj);
      }
      el.addEventListener(name, handler, opts);
      handlers.set(name, {
        handler,
        opts
      });
    }
    function do_unbind(name) {
      const h = handlers.get(name);
      if (h) {
        el.removeEventListener(name, h.handler, h.opts);
        handlers.delete(name);
      }
    }
    function unbind(name) {
      return name ? do_unbind(name) : unbindAll();
    }
    function unbindAll() {
      handlers.forEach((h, name) => el.removeEventListener(name, h.handler, h.opts));
      handlers.clear();
    }
    return {
      bind,
      unbind
    };
  }

  // index.js
  var import_bounding_client_rect = __toESM(require_bounding_client_rect(), 1);
  var import_component_emitter = __toESM(require_component_emitter(), 1);
  function create(tag, className) {
    const el = document.createElement(tag);
    el.className = className;
    return el;
  }
  function html() {
    const el = create("div", "tip tip-hide");
    el.appendChild(create("div", "tip-arrow"));
    const inner = create("div", "tip-inner");
    el.appendChild(inner);
    el.popover = "manual";
    return { el, inner };
  }
  var Tip = class _Tip extends import_component_emitter.default {
    static of(...args) {
      return tip(...args);
    }
    constructor(content, options = {}) {
      const { delay = 300, pad = 15 } = options;
      super();
      this.classname = "";
      this.delay = delay;
      this.pad = pad;
      const { el, inner } = html();
      this.el = el;
      this.inner = inner;
      this.events = events(this.el, this);
      this.message(content);
      this.position("top");
      this.static = !!options.static;
      if (_Tip.effect) this.effect(_Tip.effect);
    }
    /**
     * Set tip `content`.
     *
     * @param {String|Element} content
     * @return {Tip} self
     * @api public
     */
    message(content) {
      if ("string" === typeof content) {
        this.inner.insertAdjacentHTML("beforeend", content);
      } else {
        this.inner.appendChild(content);
      }
      return this;
    }
    /**
     * Attach to the given `el` with optional hide `delay`.
     *
     * @param {Element} el
     * @param {Number} delay
     * @return {Tip}
     * @api public
     */
    attach(el) {
      this.target = el;
      this.handleEvents = events(el, this);
      this.handleEvents.bind("mouseover");
      this.handleEvents.bind("mouseout");
      return this;
    }
    /**
     * On mouse over
     *
     * @param {Event} e
     * @return {Tip}
     * @api private
     */
    mouseover() {
      this.show(this.target);
      this.cancelHide();
    }
    /**
     * On mouse out
     *
     * @param {Event} e
     * @return {Tip}
     * @api private
     */
    mouseout() {
      this.hide(this.delay);
    }
    /**
     * Cancel hide on hover, hide with the given `delay`.
     *
     * @param {Number} delay
     * @return {Tip}
     * @api public
     */
    cancelHideOnHover() {
      this.events.bind("mouseover", "cancelHide");
      this.events.bind("mouseout", "hide");
      return this;
    }
    /**
     * Set the effect to `type`.
     *
     * @param {String} type
     * @return {Tip}
     * @api public
     */
    effect(type) {
      this._effect = type;
      this.el.classList.add(type);
      return this;
    }
    /**
     * Set position:
     *
     *  - `top`
     *  - `top left`
     *  - `top right`
     *  - `bottom`
     *  - `bottom left`
     *  - `bottom right`
     *  - `left`
     *  - `right`
     *
     * @param {String} pos
     * @param {Object} options
     * @return {Tip}
     * @api public
     */
    position(pos, { auto = true, nudge = true } = {}) {
      this._position = pos;
      this._auto = auto;
      this._nudge = nudge;
      this.replaceClass(pos);
      this.emit("reposition");
      return this;
    }
    /**
     * Show the tip attached to `el`.
     *
     * Emits "show" (el) event.
     *
     * @param {String|Element|Number} el or x
     * @param {Number} [y]
     * @return {Tip}
     * @api public
     */
    show(el, ...args) {
      if ("string" === typeof el) el = document.querySelector(el);
      document.body.appendChild(this.el);
      const source = typeof el === "number" ? this.target : el;
      this.el.showPopover({ source });
      this.el.classList.add(`tip-${this._position.replace(/\s+/g, "-")}`);
      this.el.classList.remove("tip-hide");
      if ("number" === typeof el) {
        const left = el;
        const top = args[0];
        this.emit("show");
        setPosition(this.el, { top, left });
        return this;
      }
      this.target = el;
      this.reposition();
      this.emit("show", this.target);
      if (!this.winEvents && !this.static) {
        this.winEvents = events(window, this);
        this.winEvents.bind("resize", "reposition");
        this.winEvents.bind("scroll", "reposition");
      }
      return this;
    }
    /**
     * Reposition the tip if necessary.
     *
     * @api private
     */
    reposition() {
      let pos = this._position;
      let off = pos === "inner" ? this.innerOffset() : this.offset(pos);
      if (this._nudge) {
        off = this.adjust(pos, off);
      }
      if (this._auto && pos !== "inner") {
        const newpos = this.suggested(pos, off);
        if (newpos && newpos !== pos) {
          pos = newpos;
          off = this.offset(pos);
        }
      }
      this.replaceClass(pos);
      this.emit("reposition");
      setPosition(this.el, off);
    }
    /**
     * Compute the "suggested" position favouring `pos`.
     *
     * Returns `pos` if no suggestion can be determined.
     *
     * @param {String} pos
     * @param {Object} offset
     * @return {String}
     * @api private
     */
    suggested(pos, off) {
      const el = this.el;
      const ew = el.clientWidth;
      const eh = el.clientHeight;
      const top = window.scrollY;
      const left = window.scrollX;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const good = {
        top: true,
        bottom: true,
        left: true,
        right: true
      };
      if (off.top + eh > top + h) good.bottom = false;
      if (off.top < top) good.top = false;
      if (off.left + ew > left + w) good.right = false;
      if (off.left < left) good.left = false;
      const positions = pos.split(/\s+/);
      for (let i = 0; i < positions.length; i++) {
        if (!good[positions[i]]) break;
        if (i === positions.length - 1) {
          return pos;
        }
      }
      for (const p of positions) {
        if (good[p]) return p;
      }
      if (good[pos]) return pos;
      if (good.top) return "top";
      if (good.bottom) return "bottom";
      if (good.left) return "left";
      if (good.right) return "right";
    }
    /**
     * Nudge the component so that if fits into the vieport
     *
     * @param {String} pos
     * @param {Object} offset
     * @return {Object} new adjusted offset
     * @api private
     */
    adjust(pos, off) {
      const { el } = this;
      const ew = el.offsetWidth;
      const eh = el.offsetHeight;
      const top = document.documentElement.scrollTop;
      const left = document.documentElement.scrollLeft;
      const w = document.documentElement.offsetWidth;
      const h = document.documentElement.offsetHeight;
      const org = {
        left: off.left,
        top: off.top
      };
      const arrow = {};
      if (pos === "bottom" || pos === "top") {
        if (off.left + ew > left + w) {
          off.left = left + w - ew;
        }
        if (off.left < left) {
          off.left = left;
        }
        if (org.left !== off.left) {
          arrow.left = ew / 2 + (org.left - off.left);
        }
      } else if (pos === "left" || pos === "right") {
        if (off.top < top) {
          off.top = top;
        }
        if (off.top + eh > top + h) {
          off.top = top + h - eh;
        }
        if (org.top !== off.top) {
          arrow.top = eh / 2 + (org.top - off.top);
        }
      }
      if (arrow.left || arrow.top) {
        setPosition(el.querySelector(".tip-arrow"), arrow);
      } else {
        el.querySelector(".tip-arrow").removeAttribute("style");
      }
      return off;
    }
    /**
     * Replace position class `name`.
     *
     * @param {String} name
     * @api private
     */
    replaceClass(name) {
      name = name.split(" ").join("-");
      let classname = `${this.classname} tip tip-${name}`;
      if (this._effect) classname += ` ${this._effect}`;
      this.el.className = classname;
    }
    /**
     * Compute the offset for `.target`
     * based on the given `pos`.
     *
     * @param {String} pos
     * @return {Object}
     * @api private
     */
    offset(pos) {
      const { pad } = this;
      const { width: ew, height: eh } = (0, import_bounding_client_rect.default)(this.el);
      const targetRect = (0, import_bounding_client_rect.default)(this.target);
      const { width: tw, height: th } = targetRect;
      const to = offset(targetRect, document);
      switch (pos) {
        case "top":
          return {
            top: to.top - eh,
            left: to.left + tw / 2 - ew / 2
          };
        case "bottom":
          return {
            top: to.top + th,
            left: to.left + tw / 2 - ew / 2
          };
        case "right":
          return {
            top: to.top + th / 2 - eh / 2,
            left: to.left + tw
          };
        case "left":
          return {
            top: to.top + th / 2 - eh / 2,
            left: to.left - ew
          };
        case "top left":
          return {
            top: to.top - eh,
            left: to.left + tw / 2 - ew + pad
          };
        case "top right":
          return {
            top: to.top - eh,
            left: to.left + tw / 2 - pad
          };
        case "bottom left":
          return {
            top: to.top + th,
            left: to.left + tw / 2 - ew + pad
          };
        case "bottom right":
          return {
            top: to.top + th,
            left: to.left + tw / 2 - pad
          };
      }
    }
    /**
     * calculate offset for 'inner' position
     */
    innerOffset() {
      const { el, target } = this;
      return {
        left: 0,
        top: target.clientHeight - el.offsetHeight
      };
    }
    /**
     * Cancel the `.hide()` timeout.
     *
     * @api private
     */
    cancelHide() {
      clearTimeout(this._hide);
    }
    /**
     * Hide the tip with optional `ms` delay.
     *
     * Emits "hide" event.
     *
     * @param {Number} ms
     * @return {Tip}
     * @api public
     */
    hide(ms) {
      this.emit("hiding");
      if (ms) {
        this._hide = setTimeout(() => this.hide(), ms);
        return this;
      }
      this.el.classList.add("tip-hide");
      if (this._effect) {
        setTimeout(() => this.remove(), 300);
      } else {
        this.remove();
      }
      return this;
    }
    /**
     * Hide the tip without potential animation.
     *
     * @return {Tip}
     * @api public
     */
    remove() {
      if (this.winEvents) {
        this.winEvents.unbind();
        this.winEvents = null;
      }
      this.emit("hide");
      this.el.hidePopover();
      this.el.remove();
      return this;
    }
  };
  function tip(elem, options) {
    if ("string" === typeof options) options = { value: options };
    const els = "string" === typeof elem ? document.querySelectorAll(elem) : [elem];
    els.forEach((el) => {
      const val = options.value || el.getAttribute("title");
      const tip2 = new Tip(val, options);
      el.setAttribute("title", "");
      tip2.cancelHideOnHover();
      tip2.attach(el);
    });
  }
  function offset(box, doc) {
    const body = doc.body || doc.getElementsByTagName("body")[0];
    const docEl = doc.documentElement || body.parentNode;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const scrollTop = window.pageYOffset || docEl.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  function setPosition(el, { left, top }) {
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=build.js.map
