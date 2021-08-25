# next-active-state
> Mini state mananger based on proxy.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-active-state
```

## apis
| api   | params | description                          |
| ----- | ------ | ------------------------------------ |
| to    | -      | Unwrap proxy data to pure js object. |
| on    | -      | Watch changed and return destroy fn. |
| #use  | -      | Use object with listener.            |
| #toJS | -      | Transform to pure js object.         |

## usage
```js
import NxActiveState from '@jswork/next-active-state';

const data = { key: 1, value: 2 };
const instance = new NxActiveState(data);
const state = instance.state;

const res = instance.on('change', (arg) => {
  console.log(arg);
});

// create
state.newKey = 'I am new.';

// update
state.key = 122;

// delete
delete state.value;

// destroy resource
res.destroy();
```

```js
// simple use
const data = { key: 1, value: 2 };
const state = NxActiveState.use(data, (arg) => {
  console.log(arg);
});

// create
state.newKey = 'I am new.';

// update
state.key = 122;

// delete
delete state.value;

// no need to destroy resource
```


## license
Code released under [the MIT license](https://github.com/afeiship/next-active-state/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-active-state
[version-url]: https://npmjs.org/package/@jswork/next-active-state

[license-image]: https://img.shields.io/npm/l/@jswork/next-active-state
[license-url]: https://github.com/afeiship/next-active-state/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-active-state
[size-url]: https://github.com/afeiship/next-active-state/blob/master/dist/next-active-state.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-active-state
[download-url]: https://www.npmjs.com/package/@jswork/next-active-state
