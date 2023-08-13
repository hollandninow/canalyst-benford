import axios from 'axios';

export const loadTickerList = async (token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `api/v1/list/ticker?token=${token}`,
    });

    return res;
  } catch (err) {
    throw err;
  }
}