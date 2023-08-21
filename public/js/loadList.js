import axios from 'axios';

export const loadTickerList = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/list/ticker`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export const loadSectorList = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/list/sector`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}