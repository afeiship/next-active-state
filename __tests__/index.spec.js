(function () {
  const NxActiveState = require('../src');
  // const NxActiveState = require('./src');

  describe('NxActiveState.methods', function () {
    test('init should listen change.', function () {
      var data = { key: 1, value: 2 };
      var activeState = new NxActiveState(data);
      var count = 0;
      var res = activeState.on('change', (arg) => {
        count++;
      });
      activeState.state.key = 1;
      activeState.state.key = 2;
      activeState.state.key2 = 1;
      delete activeState.state.key;
      expect(count).toBe(4);

      // will not listen change when destroy listener.
      res.destroy();
      activeState.state.key2 = 2;
      expect(count).toBe(4);
    });
  });
})();
