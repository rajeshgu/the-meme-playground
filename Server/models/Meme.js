import mongoose from 'mongoose';

const MemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  imageUrl: {
    type: String,
    required: true
  },
  topText: {
    type: String,
    default: ''
  },
  bottomText: {
    type: String,
    default: ''
  },
  font: {
    type: String,
    default: 'impact'
  },
  fontSize: {
    type: Number,
    default: 40
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  tags: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add virtual for vote score
MemeSchema.virtual('voteScore').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Add text search index
MemeSchema.index({ title: 'text', tags: 'text' });

const Meme = mongoose.model('Meme', MemeSchema);

export default Meme;