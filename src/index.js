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
        this.$event = nx.mix(this, EventMitt);
        var handler = (key) => {
          if (!this.__initialized__) return;
          var args = nx.slice(arguments);
          var data = { action: key, args: args };
          this.$event.emit('change', data);
          return Reflect[key].apply(null, args);
        };

        var proxyer = {
          set: () => handler('set'),
          deleteProperty: () => handler('deleteProperty')
        };

        this.state = new Proxy(inData, proxyer);

        nxDeepEach(this.state, function (key, value, target) {
          if (typeof value === 'object') {
            target[key] = new Proxy(value, proxyer);
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
