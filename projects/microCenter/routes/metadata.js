const { Router } = require('express');
const metadataRouter = Router();
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: __dirname + '/../uploads/' });

metadataRouter.post('/', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  fs.readdir(__dirname + '/../uploads', (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(__dirname + '/../uploads', file), err => {
        if (err) throw err;
      });
    }
  })
});

module.exports = metadataRouter