exports.calculateLeadingDigitFrequencies = function(distributionObj) {
    const distributionFrequencyObj = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  for (const prop in distributionFrequencyObj) {
    distributionFrequencyObj[prop] = distributionObj[prop] / distributionObj['total'];
  }

  return distributionFrequencyObj;
}