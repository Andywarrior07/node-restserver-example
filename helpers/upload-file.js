const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  folder = '',
  extensions = ['png', 'jpg', 'jpeg', 'gif']
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const fileName = file.name.split('.');
    const extensionFile = fileName[fileName.length - 1];

    if (!extensions.includes(extensionFile.toLowerCase())) {
      return reject('File extension does not permitted');
    }

    const newFileName = uuidv4() + '.' + extensionFile;

    const uploadPath = path.join(__dirname, '../uploads/', folder, newFileName);

    file.mv(uploadPath, err => {
      if (err) {
        return reject(err);
      }

      return resolve(newFileName);
    });
  });
};

module.exports = { uploadFile };
