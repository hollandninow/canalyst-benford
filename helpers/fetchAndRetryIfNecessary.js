const { getMillisToSleep, sleep } = require('./getMillisToSleep');

exports.fetchAndRetryIfNecessary = async function fetchAndRetryIfNecessary (callAPIFn) {
  let response;
  
  try {
    response = await callAPIFn();
    // console.log(response);
  } catch (err) {
    if(+err.response.status === 429) {
      const retryAfter = err.response.headers['retry-after'];
      const millisToSleep = getMillisToSleep(retryAfter);

      console.log('sleeping 😴');
      await sleep(millisToSleep);
      return fetchAndRetryIfNecessary(callAPIFn);
    } else {
      throw err;
    }
  }

  return response;
}

