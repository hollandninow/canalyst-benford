exports.getErrorBarValues = statementBenfordObj => {
  const countData = statementBenfordObj.getCountData();
  const frequencyData = statementBenfordObj.getFrequencyData();

  const errorBarData = [];
  for(const digit in frequencyData) {
    const zScore = 1.959;
    const count = countData.total;
    const frequency = frequencyData[digit];

    const stdError = Math.sqrt((frequency * (1 - frequency)) / count);
    errorBarData.push(stdError * zScore);
  }

  return errorBarData;
}