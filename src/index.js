import nx from '@jswork/next';
import EventMitt from '@jswork/event-mitt';
import deepEqual from 'fast-deep-equal';

import '@jswork/next-deep-each';
import '@jswork/next-deep-clone';
import '@jswork/next-is-empty-object';
import '@jswork/next-empty';

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// https://github.com/sindresorhus/on-change

var merge = function (state, initial) {
  nx.empty(state);
  var isArray = Array.isArray(initial);
  if (isArray) {
    initial.forEach((item) => state.push(item));
  } else {
    if (!nx.isEmptyObject(initial)) {
      nx.mix(state, initial);
    }
  }
};

const NxActiveState = nx.declare('nx.ActiveState', {
  statics: {
    use: function (inData, inCallback) {
      var instance = new this(inData);
      instance.one('change', inCallback);
      return instance.state;
    },
    get: function (inState) {
      return nx.deepClone(inState);
    }
  },
  properties: {
    touched: function () {
      return !deepEqual(this.state, this.cloned);
    }
  },
  methods: {
    __initialized__: false,
    __muted__: false,
    init: function (inData) {
      nx.mix(this, EventMitt);
      this.cloned = nx.deepClone(inData);
      var handler = (key, args) => {
        var res = Reflect[key].apply(null, args);
        !this.ignore(key, args) && this.emit('change', { action: key, args: args });
        return res;
      };

      var proxyer = {
        set: function () {
          var args = nx.slice(arguments);
          var value = args[2];
          if (value && typeof value === 'object') {
            args[2] = new Proxy(value, proxyer);
          }
          return handler('set', args);
        },
        deleteProperty: function () {
          return handler('deleteProperty', nx.slice(arguments));
        }
      };

      this.state = new Proxy(inData, proxyer);
      nx.deepEach(this.state, (key, value, target) => (target[key] = value));
      this.__initialized__ = true;
    },
    reset: function () {
      var initial = nx.deepClone(this.cloned);
      this.__muted__ = true;
      merge(this.state, initial);
      this.__muted__ = false;
      this.emit('change', { action: 'reset', args: null });
      return initial;
    },
    get: function () {
      return nx.deepClone(this.state);
    },
    ignore: function (key, args) {
      if (!this.__initialized__) return true;
      if (this.__muted__) return true;
      if (key === 'set' && args[1] === 'length' && Array.isArray(args[0])) return true;
      return false;
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NxActiveState;
}

export default NxActiveState;
