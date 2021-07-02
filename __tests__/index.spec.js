(function () {
  const NxActiveState = require('../src');
  // const NxActiveState = require('./src');

  describe('NxActiveState.methods', function () {
    test('init', function () {
      var data = { key: 1, value: 2 };
      var activeState = new NxActiveState(data);
      activeState.on('change', (arg) => {
        console.log(arg);
      });
      activeState.state.key = 122;
    });
  });
})();
