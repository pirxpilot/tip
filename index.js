import events from '@pirxpilot/events';
import getBoundingClientRect from 'bounding-client-rect';
import Emitter from 'component-emitter';

function create(tag, className) {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

function html() {
  const el = create('div', 'tip tip-hide');
  el.appendChild(create('div', 'tip-arrow'));
  const inner = create('div', 'tip-inner');
  el.appendChild(inner);
  return { el, inner };
}

/**
 * Initialize a `Tip` with the given `content`.
 *
 * @param {Mixed} content
 * @api public
 */

export default class Tip extends Emitter {
  static of(...args) {
    return tip(...args);
  }

  constructor(content, options = {}) {
    const { delay = 300, pad = 15 } = options;

    super();
    this.classname = '';
    this.delay = delay;
    this.pad = pad;
    const { el, inner } = html();
    this.el = el;
    this.inner = inner;
    this.events = events(this.el, this);
    this.message(content);
    this.position('top');
    this.static = !!options.static;
    if (Tip.effect) this.effect(Tip.effect);
  }

  /**
   * Set tip `content`.
   *
   * @param {String|Element} content
   * @return {Tip} self
   * @api public
   */

  message(content) {
    if ('string' === typeof content) {
      this.inner.insertAdjacentHTML('beforeend', content);
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
    this.handleEvents.bind('mouseover');
    this.handleEvents.bind('mouseout');
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
    this.events.bind('mouseover', 'cancelHide');
    this.events.bind('mouseout', 'hide');
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
    this.emit('reposition');
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
    if ('string' === typeof el) el = document.querySelector(el);

    // show it
    document.body.appendChild(this.el);
    this.el.classList.add(`tip-${this._position.replace(/\s+/g, '-')}`);
    this.el.classList.remove('tip-hide');

    // x,y
    if ('number' === typeof el) {
      const left = el;
      const top = args[0];
      this.emit('show');
      setPosition(this.el, { top, left });
      return this;
    }

    // el
    this.target = el;
    this.reposition();
    this.emit('show', this.target);

    if (!this.winEvents && !this.static) {
      this.winEvents = events(window, this);
      this.winEvents.bind('resize', 'reposition');
      this.winEvents.bind('scroll', 'reposition');
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
    let off = pos === 'inner' ? this.innerOffset() : this.offset(pos);

    if (this._nudge) {
      off = this.adjust(pos, off);
    }

    if (this._auto && pos !== 'inner') {
      const newpos = this.suggested(pos, off);
      if (newpos && newpos !== pos) {
        pos = newpos;
        off = this.offset(pos);
      }
    }

    this.replaceClass(pos);
    this.emit('reposition');
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

    // too low
    if (off.top + eh > top + h) good.bottom = false;

    // too high
    if (off.top < top) good.top = false;

    // too far to the right
    if (off.left + ew > left + w) good.right = false;

    // too far to the left
    if (off.left < left) good.left = false;

    const positions = pos.split(/\s+/);

    // attempt to give the preferred position first, consider "bottom right"
    for (let i = 0; i < positions.length; i++) {
      if (!good[positions[i]]) break;
      if (i === positions.length - 1) {
        // last one!
        return pos;
      }
    }

    // attempt to get close to preferred position, i.e. "bottom" or "right"
    for (const p of positions) {
      if (good[p]) return p;
    }

    if (good[pos]) return pos;
    if (good.top) return 'top';
    if (good.bottom) return 'bottom';
    if (good.left) return 'left';
    if (good.right) return 'right';
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

    if (pos === 'bottom' || pos === 'top') {
      // too far to the right
      if (off.left + ew > left + w) {
        off.left = left + w - ew;
      }
      // too far to the left
      if (off.left < left) {
        off.left = left;
      }
      // moved? adjust arrow position
      if (org.left !== off.left) {
        arrow.left = ew / 2 + (org.left - off.left);
      }
    } else if (pos === 'left' || pos === 'right') {
      // too high
      if (off.top < top) {
        off.top = top;
      }
      // too low
      if (off.top + eh > top + h) {
        off.top = top + h - eh;
      }
      // moved? adjust arrow position
      if (org.top !== off.top) {
        arrow.top = eh / 2 + (org.top - off.top);
      }
    }

    // move arrow if needed
    if (arrow.left || arrow.top) {
      setPosition(el.querySelector('.tip-arrow'), arrow);
    } else {
      el.querySelector('.tip-arrow').removeAttribute('style');
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
    name = name.split(' ').join('-');
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

    const { width: ew, height: eh } = getBoundingClientRect(this.el);

    const targetRect = getBoundingClientRect(this.target);
    const { width: tw, height: th } = targetRect;

    const to = offset(targetRect, document);

    switch (pos) {
      case 'top':
        return {
          top: to.top - eh,
          left: to.left + tw / 2 - ew / 2
        };
      case 'bottom':
        return {
          top: to.top + th,
          left: to.left + tw / 2 - ew / 2
        };
      case 'right':
        return {
          top: to.top + th / 2 - eh / 2,
          left: to.left + tw
        };
      case 'left':
        return {
          top: to.top + th / 2 - eh / 2,
          left: to.left - ew
        };
      case 'top left':
        return {
          top: to.top - eh,
          left: to.left + tw / 2 - ew + pad
        };
      case 'top right':
        return {
          top: to.top - eh,
          left: to.left + tw / 2 - pad
        };
      case 'bottom left':
        return {
          top: to.top + th,
          left: to.left + tw / 2 - ew + pad
        };
      case 'bottom right':
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
    this.emit('hiding');

    // duration
    if (ms) {
      this._hide = setTimeout(() => this.hide(), ms);
      return this;
    }

    // hide
    this.el.classList.add('tip-hide');
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
    this.emit('hide');

    this.el.remove();
    return this;
  }
}

/**
 * Apply the average use-case of simply
 * showing a tool-tip on `el` hover.
 *
 * Options:
 *
 *  - `delay` hide delay in milliseconds [0]
 *  - `value` defaulting to the element's title attribute
 *
 * @param {Mixed} elem
 * @param {Object|String} options or value
 * @api public
 */

function tip(elem, options) {
  if ('string' === typeof options) options = { value: options };
  const els = 'string' === typeof elem ? document.querySelectorAll(elem) : [elem];
  els.forEach(function (el) {
    const val = options.value || el.getAttribute('title');
    const tip = new Tip(val, options);
    el.setAttribute('title', '');
    tip.cancelHideOnHover();
    tip.attach(el);
  });
}

/**
 * Extracted from `timoxley/offset`, but directly using a
 * TextRectangle instead of getting another version.
 *
 * @param {TextRectangle} box - result from a `getBoundingClientRect()` call
 * @param {Document} doc - Document instance to use
 * @return {Object} an object with `top` and `left` Number properties
 * @api private
 */

function offset(box, doc) {
  const body = doc.body || doc.getElementsByTagName('body')[0];
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

/**
 * set element position by modifying its style
 */
function setPosition(el, { left, top }) {
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}
