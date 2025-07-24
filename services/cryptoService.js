const axios = require("axios");
async function getCryptoPrice(symbol = "bitcoin", currency = "usd") {
  const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
    params: { ids: symbol, vs_currencies: currency }
  });
  return res.data[symbol][currency];
}
module.exports = { getCryptoPrice };