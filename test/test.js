const requireWat = require('../')
const assert = require('assert');
const path = require('path');

it('js can load wat function', async function() {

    const watFile = path.join(__dirname, '/calc.wat');
    const { add, sub } = await requireWat(watFile);

    assert.deepStrictEqual(add(5,5), 10);
    assert.deepStrictEqual(add(11,8), 19);
    assert.deepStrictEqual(sub(5,5), 0);
    assert.deepStrictEqual(sub(7,6), 1);
    assert.deepStrictEqual(sub(3,11), -8);
    assert.deepStrictEqual(sub(-9,-11), 2);
});

it('wat can load js function', async function() {

    const watFile = path.join(__dirname, '/volume.wat');
    const { cubeVolume } = await requireWat(watFile, {
        calculate: {
            positivePower3: function(n) {
                if (n <= 0) return 0;
                return n * n * n;
            }
        }
    });

    assert.deepStrictEqual(cubeVolume(5), 125);
    assert.deepStrictEqual(cubeVolume(10), 1000);
    assert.deepStrictEqual(cubeVolume(-10), 0);
});

// No global in node js

// it('wat can access global', async function() {

//     const global = WebAssembly.Global({value: "i32", mutable: true}, 0);

//     const watFile = path.join(__dirname, '/global.wat');
//     const { getGlobal, incGlobal } = await requireWat(watFile);

//     global.value++;
//     global.value++;

//     assert.deepStrictEqual(global.value, 2);

//     incGlobal();
//     incGlobal();
//     incGlobal();

//     assert.deepStrictEqual(global.value, 5);

//     global.value++;
//     incGlobal();

//     assert.deepStrictEqual(global.value, 7);
//     assert.deepStrictEqual(getGlobal(), 7);

// });
