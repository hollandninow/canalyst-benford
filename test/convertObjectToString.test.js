const { convertObjectToString } = require('../helpers/convertObjectToString');

describe('convertObjectToString', () => {
  const testObj = {
    test1: 1,
    prop2: true,
    hello: 'world',
  };

  const emptyObj = {};

  it('should convert the obj to a string', () => {
    const str = convertObjectToString(testObj);

    expect(typeof str).toBe('string');
    expect(str).toEqual('{test1: 1, prop2: true, hello: world}');
  });

  it('should convert an empty object to a string', () => {
    const str = convertObjectToString(emptyObj);

    expect(typeof str).toBe('string');
    expect(str).toEqual('{}');
  });

  it('should not convert a non-object variable to a string', () => {
    const test = convertObjectToString(true);

    expect(test).not.toBeUndefined();
  });
});