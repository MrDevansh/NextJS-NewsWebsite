import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    category: String,
    thumbnail: String,
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model('News', NewsSchema);
