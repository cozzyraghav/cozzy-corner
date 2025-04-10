import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const SeriesCategory =
  mongoose.models.seriesCategory ||
  mongoose.model('seriesCategory', categorySchema);
export default SeriesCategory;
