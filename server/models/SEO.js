import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keywords: [{
    type: String
  }],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  twitterCard: {
    type: String,
    default: 'summary_large_image'
  },
  twitterTitle: String,
  twitterDescription: String,
  twitterImage: String,
  canonical: String,
  robots: {
    type: String,
    default: 'index, follow'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

seoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('SEO', seoSchema);