export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getMemeScore = (meme) => {
  const votes = meme.votes || 0;
  const comments = meme.commentsCount || 0;
  const views = meme.views || 0;
  const ageInHours = (new Date() - new Date(meme.createdAt)) / (1000 * 60 * 60);
  
  // Simple scoring algorithm (can be adjusted)
  return (votes * 2 + comments * 1.5 + views * 0.1) / Math.max(1, Math.log(ageInHours + 1));
};

export const extractTags = (text) => {
  const tagRegex = /#(\w+)/g;
  const matches = text.match(tagRegex);
  if (!matches) return [];
  return matches.map((tag) => tag.substring(1).toLowerCase());
};

export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, and GIF images are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 5MB' };
  }

  return { valid: true };
};