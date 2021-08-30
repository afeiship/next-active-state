(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var EventMitt = global.EventMitt || require('@jswork/event-mitt');
  var nxDeepEach = nx.deepEach || require('@jswork/next-deep-each');
  var nxDeepClone = nx.deepClone || require('@jswork/next-deep-clone');

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  // https://github.com/sindresorhus/on-change

  var NxActiveState = nx.declare('nx.ActiveState', {
    statics: {
      use: function (inData, inCallback) {
        var instance = new this(inData);
        instance.one('change', inCallback);
        return instance.state;
      },
      get: function (inState) {
        return nxDeepClone(inState);
      }
    },
    methods: {
      __initialized__: false,
      init: function (inData) {
        nx.mix(this, EventMitt);
        var handler = (key, args) => {
          var res = Reflect[key].apply(null, args);
          this.should(key, args) && this.emit('change', { action: key, args: args });
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
        nxDeepEach(this.state, (key, value, target) => (target[key] = value));
        this.__initialized__ = true;
      },
      get: function () {
        return nxDeepClone(this.state);
      },
      should: function (key, args) {
        if (!this.__initialized__) return false;
        if (key === 'set' && args[1] === 'length' && Array.isArray(args[0])) {
          return false;
        }
        return true;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxActiveState;
  }
})();
