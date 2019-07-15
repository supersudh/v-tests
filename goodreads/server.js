const express = require('express');
const axios = require('axios');
var cors = require('cors');
var parseString = require('xml2js').parseString;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const { q, page } = req.query;
  if (!q || !page) {
    return res.status(400).send('Bad Request. q/page missing');
  }
  const axiosInstance = axios.create({
    baseURL: `https://www.goodreads.com/search/index.xml?q=${q}&key=argsUQ0N6Oa0aKFtVoCfg&page=${page}`,
    method: 'get'
  });

  const resp = await axiosInstance();

  parseString(resp.data, function(err, result) {
    return res.status(200).send(result);
  });
});

app.listen(
  8080,
  console.log.bind(null, 'good reads server listening at port 8080')
);
