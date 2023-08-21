import axios from 'axios';

export const runCompanyAnalysis = async (token, ticker, tickerType, fsString) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/analysis/company?ticker=${ticker}&tickerType=${tickerType}&fsString=${fsString}`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export const runSectorAnalysis = async (token, sector, fsString) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/analysis/sector?sector=${sector}&fsString=${fsString}`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}