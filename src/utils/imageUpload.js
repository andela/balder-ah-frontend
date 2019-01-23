import axios from 'axios';

const imgUploadURL = process.env.REACT_APP_CLOUDINARY_URL;
const imgUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', imgUploadPreset);
  try {
    const imgUploadResponse = await axios({
      url: imgUploadURL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });
    return imgUploadResponse;
  } catch (err) {
    return err.message;
  }
};

export default uploadImage;
