[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# Tip

  Tip component. Inspired by [tipsy](https://github.com/jaz303/tipsy) without the weird jQuery
  API.


  Live demo is [here](http://pirxpilot.github.io/tip/).

## Installation

```sh
$ npm install @pirxpilot/tip
```

## Features

  - events for composition
  - "auto" positioning on window resize / scroll
  - fluent API

## Events

  - `show` the tip is shown
  - `hide` the tip is hidden

## API

### Tip(el, string)

  Equivalent to `Tip(el, { value: string })`.

### Tip(el, [options])

  Attach a `Tip` to an element, and display the `title`
  attribute's contents on hover. Optionally apply a hide `delay`
  in milliseconds.
  Also if `static` is true the tip will be fixed to its initial position.

```js
var tip = require('tip');
tip('a[title]', { delay: 300 });
```

### new Tip(content, [options])

  Create a new tip with `content` being
  either a string, html, element, etc.

```js
var Tip = require('tip');
var tip = new Tip('Hello!');
tip.show('#mylink');
```

### Tip#position(type, [options])

  - `top`
  - `top right`
  - `top left`
  - `bottom`
  - `bottom right`
  - `bottom left`
  - `right`
  - `left`

Options:

  - `auto` set to __false__ to disable auto-positioning

### Tip#show(el)

  Show the tip attached to `el`, where `el`
  may be a selector or element.

### Tip#show(x, y)

  Show the tip at the absolute position `(x, y)`.

### Tip#hide([ms])

  Hide the tip immediately or wait `ms`.

### Tip#attach(el)

  Attach the tip to the given `el`, showing on `mouseover` and hiding on `mouseout`.

### Tip#effect(name)

  Use effect `name`. Default with `Tip.effect = 'fade'` for example.

### Themes

  - [Aurora](https://github.com/component/aurora-tip)
  - [Nightrider](https://github.com/jb55/nightrider-tip)

## License

  MIT

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/tip
[npm-url]: https://npmjs.org/package/@pirxpilot/tip

[build-url]: https://github.com/pirxpilot/tip/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/tip/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@pirxpilot/tip
[deps-url]: https://libraries.io/npm/@pirxpilot%2Ftip
