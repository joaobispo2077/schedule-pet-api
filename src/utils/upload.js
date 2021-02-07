const fs = require('fs');
const path = require('path');

module.exports = (filepath, filename, callbackCreatedImage) => {
  const allowedMimeTypes = ['.jpg', '.png', '.jpeg'];

  const ext = path.extname(filepath);

  const isValidMimeType = allowedMimeTypes.includes(ext);

  if (!isValidMimeType) {
    const err = 'invalid mime type';
    console.log("ERROR - Invalid Mime Type.");
    callbackCreatedImage(err);
  } else {
    const savePath = `./src/uploads/images/${filename}${ext}`;

    fs.createReadStream(filepath)
      .pipe(fs.createWriteStream(savePath))
      .on('finish', () => callbackCreatedImage(false, savePath));
  }

}