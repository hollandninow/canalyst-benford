import axios from 'axios';

export const runCompanyAnalysis = async (token, ticker, tickerType, fsString) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/analysis/company?ticker=${ticker}&tickerType=${tickerType}&fsString=${fsString}&token=${token}`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}
