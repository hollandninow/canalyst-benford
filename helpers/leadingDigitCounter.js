class LeadingDigitCounter {
  #leadingDigitDistributionObj;

  constructor() {
    this.#leadingDigitDistributionObj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      total: 0,
    };
  }

  countLeadingDigits(array) {
    array.forEach(value => {
      const valueStr = value < 0 ? `${value * -1}` : `${value}`;
      const valueStrArr = valueStr.split('');

      this.incrementBucket(valueStrArr[0]);
    });
    
    return this.#leadingDigitDistributionObj;
  }

  incrementBucket(bucket) {
    this.#leadingDigitDistributionObj[bucket]++;
    this.#leadingDigitDistributionObj.total++;
  }
}

module.exports = LeadingDigitCounter;