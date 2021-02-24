const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { uploadFile } = require('../helpers/upload-file');
const { User, Product } = require('../models');

cloudinary.config(process.env.CLOUDINARY_URL);

const getImage = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ message: 'Invalid user' });
      }
      break;

    case 'products':
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({ message: 'Invalid product' });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Update image error' });
  }
  if (model.img) {
    const imagePath = path.join(__dirname, '../uploads', collection, model.img);

    if (fs.existsSync(imagePath)) {
      return res.sendFile(path.join(imagePath));
    }
  }
  const defaultImagePath = path.join(__dirname, '../assets', 'no-image.jpg');
  return res.sendFile(defaultImagePath);
};

const uploads = async (req, res) => {
  try {
    const fileName = await uploadFile(req.files, 'img');

    res.json({ fileName });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

// const updateImages = async (req, res) => {
//   const { collection, id } = req.params;
//   let model;

//   switch (collection) {
//     case 'users':
//       model = await User.findById(id);

//       if (!model) {
//         return res.status(400).json({ message: 'Invalid user' });
//       }
//       break;

//     case 'products':
//       model = await Product.findById(id);

//       if (!model) {
//         return res.status(400).json({ message: 'Invalid product' });
//       }
//       break;
//     default:
//       return res.status(500).json({ msg: 'Update image error' });
//   }

//   try {
//     if (model.img) {
//       const imagePath = path.join(
//         __dirname,
//         '../uploads',
//         collection,
//         model.img
//       );

//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ msg: 'Error delete file' });
//   }

//   try {
//     const fileName = await uploadFile(req.files, collection);
//     model.img = fileName;

//     await model.save();
//     return res.json(model);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ msg: 'File is required' });
//   }
// };

const updateImages = async (req, res) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ message: 'Invalid user' });
      }
      break;

    case 'products':
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({ message: 'Invalid product' });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Update image error' });
  }

  if (model.img) {
    const imageUrl = model.img.split('/');
    const fileName = imageUrl[imageUrl.length - 1];
    const [name] = fileName.split('.');
    await cloudinary.uploader.destroy(name);
  }

  try {
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    return res.json(model);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getImage, uploads, updateImages };
