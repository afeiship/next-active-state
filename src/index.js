(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var EventMitt = global.EventMitt || require('@jswork/event-mitt');
  var nxDeepEach = nx.deepEach || require('@jswork/next-deep-each');

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

  var NxActiveState = nx.declare('nx.ActiveState', {
    methods: {
      __initialized__: false,
      init: function (inData) {
        var self = this;
        this.$event = nx.mix(this, EventMitt);
        this.$handler = {
          set: function () {
            if (!self.__initialized__) return;
            var args = arguments;
            var data = { action: 'set', args: args };
            self.$event.emit('change', data);
            return Reflect.set.apply(null, args);
          },
          deleteProperty: function () {
            if (!self.__initialized__) return;
            var args = arguments;
            var data = { action: 'deleteProperty', args: args };
            self.$event.emit('change', data);
            return Reflect.deleteProperty.apply(null, args);
          }
        };

        this.state = new Proxy(inData, this.$handler);
        nxDeepEach(this.state, function (key, value, target) {
          if (typeof value === 'object') {
            target[key] = new Proxy(value, self.$handler);
          }
        });
        this.__initialized__ = true;
      },
      on: function (inName, inHandler) {
        return self.$event.on(inName, inHandler);
      },
      to: function () {
        return JSON.parse(JSON.stringify(this.state));
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxActiveState;
  }
})();
