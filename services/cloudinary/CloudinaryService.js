const {
  cloudinary_api_key,
  cloudinary_cloud_name,
  cloudinary_api_secret,
} = require('../../config');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

// https://github.com/cloudinary/cloudinary_npm/blob/master/samples/basic/basic.js

class CloudinaryService {
  async fileUpload(filePath) {
    // File upload
    return await cloudinary.uploader
      .upload(filePath) // { tags: 'basic_sample' })
      .then((image) => {
        console.log(image);
        return image;
      })
      .catch(function (err) {
        console.log('** File Upload (Promise)');
        if (err) {
          console.warn(err);
        }
      });

    //   async fileUpload(filePath) {
    //     return new Promise((resolve, reject) => {
    //       cloudinary.uploader.upload(filePath, (err, url) => {
    //         console.log(url);
    //         if (err) return reject(err);
    //         return resolve(url);
    //       });
    //     });
    //   }
  }
}

module.exports = new CloudinaryService();
