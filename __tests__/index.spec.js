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

    test('basic curd for object', () => {
      var data = {};
      var activeState = new NxActiveState(data);
      var count = 0;
      var res = activeState.on('change', (arg) => {
        count++;
      });

      // create
      activeState.state.k1 = 1;
      activeState.state.k2 = 1;
      // update
      activeState.state.k3 = 123;
      // delete
      delete activeState.state.k2;

      expect(count).toBe(4);
    });

    test('pure array should be changed', () => {
      var data = [
        { checked: false, value: 'A new template1' },
        { checked: false, value: 'A new template2' },
        { checked: false, value: 'A new template3' },
        { checked: false, value: 'A new template4' }
      ];

      var activeState = new NxActiveState(data);
      var count = 0;
      var res = activeState.on('change', (arg) => {
        count++;
      });

      activeState.state[0].checked = true;
      expect(count).toBe(1);
      // push or remove will trigger 2 times
      activeState.state.push({ checked: true, value: 'fff' });
      expect(count).toBe(3);
    });

    test('to an new object', () => {
      var data = [
        { checked: false, value: 'A new template1' },
        { checked: false, value: 'A new template2' },
        { checked: false, value: 'A new template3' },
        { checked: false, value: 'A new template4' }
      ];

      var activeState = new NxActiveState(data);
      expect(activeState.to()).toEqual(data);
    });

    test('use api:', () => {
      var times = 0;
      var data = [
        { checked: false, value: 'A new template1' },
        { checked: false, value: 'A new template2' },
        { checked: false, value: 'A new template3' },
        { checked: false, value: 'A new template4' }
      ];

      var state = NxActiveState.use(data, () => {
        times++;
      });

      state[0].checked = true;
      state[0].value = 'xxx';
      expect(times).toBe(2);
      expect(state).toEqual([
        { checked: true, value: 'xxx' },
        { checked: false, value: 'A new template2' },
        { checked: false, value: 'A new template3' },
        { checked: false, value: 'A new template4' }
      ]);
    });
  });
})();
