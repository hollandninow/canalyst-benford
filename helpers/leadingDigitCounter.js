class LeadingDigitCounter {
  countLeadingDigits(array) {
    const leadingDigitDistributionObj = {
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

    console.log(array);

    array.forEach(value => {
      const valueStr = value < 0 ? `${value * -1}` : `${value}`;
      const valueStrArr = valueStr.split('');
      
      leadingDigitDistributionObj[valueStrArr[0]]++;
      leadingDigitDistributionObj.total++;
    });
    
    return leadingDigitDistributionObj;
  }
}

module.exports = LeadingDigitCounter;