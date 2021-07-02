(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { context: global };

  var NxActiveState = nx.declare('nx.ActiveState', {
    statics: {
      from: function () {},
      to: function () {},
      on: function () {}
    },
    methods: {
      init: function (inData, inHanlder) {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxActiveState;
  }
})();
