const { Router } = require('express')
const urlShortenerRouter = Router();

urlShortenerRouter.post('/api/shorturl', urlHandler.addUrl);
urlShortenerRouter.get('/api/shorturl/:shurl', urlHandler.processShortUrl);

module.exports = urlShortenerRouter;

