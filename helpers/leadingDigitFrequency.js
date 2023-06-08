exports.calculateLeadingDigitFrequencies = function(distributionObj, options) {
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
    total: 0,
  };

  for (const prop in distributionFrequencyObj) {
    if (prop !== 'total')
      distributionFrequencyObj[prop] = distributionObj[prop] / distributionObj['total'];
  }

  for (const prop in distributionFrequencyObj) {
    if (prop !== 'total')
      distributionFrequencyObj['total'] += distributionFrequencyObj[prop];
  }

  if (options.rounded === true) {
    for(const prop in distributionFrequencyObj) {
      distributionFrequencyObj[prop] = (Math.round(distributionFrequencyObj[prop] * 10000) / 10000).toFixed(4);
    }
  }

  return distributionFrequencyObj;
}