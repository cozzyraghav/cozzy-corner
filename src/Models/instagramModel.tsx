import mongoose from 'mongoose';
const instagramSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const IsntagramProduct =
  mongoose.models.instagram || mongoose.model('instagram', instagramSchema);
export default IsntagramProduct;
