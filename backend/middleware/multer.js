const Multer = require('multer');

const storage = Multer.memoryStorage();

const singleUpload = Multer({storage}).single('file');

module.exports = {singleUpload}