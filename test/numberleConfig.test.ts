import { apiCheckDigit } from '../src/module/numberleConfig';

describe('numberleConfig', () => {
  describe('apiCheckDigit', () => {
    test('再現性のあるディジットが得られていること', () => {
      expect(apiCheckDigit(1)).toStrictEqual(apiCheckDigit(1));
    });
  });
});
