const { Router } = require('express');
const headerParserRouter = Router();

headerParserRouter.post('/', (req, res) => {
  res.json({
    'ipaddress': req.ip,
    'language': req.headers['accept-language'],
    'software': req.headers['user-agent']
  });
});

module.exports = headerParserRouter