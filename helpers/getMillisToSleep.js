exports.getMillisToSleep = function (retryHeaderString) {
  let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000);

  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(0, new Date(retryHeaderString) - new Date());
  }

  return millisToSleep;
}

exports.sleep = function (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}