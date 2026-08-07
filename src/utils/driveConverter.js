// Image URL Converter supporting ImgBB, Google Drive, Imgur, Postimages, and Direct Image Links
export const convertGoogleDriveUrl = (url = '') => {
  if (!url) return '';
  const trimmed = url.trim();

  // 1. Direct image link or Base64 (ImgBB i.ibb.co links, .png, .jpg, .webp, data:image)
  if (trimmed.startsWith('data:image') || trimmed.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i)) {
    return trimmed;
  }

  // 2. Handle ImgBB page links like https://ibb.co/FILE_ID -> auto convert if direct link wasn't copied
  if (trimmed.includes('ibb.co/')) {
    // If it's already i.ibb.co direct image, return trimmed
    if (trimmed.includes('i.ibb.co/')) return trimmed;
    // Return as is (ImgBB viewer links work when direct link option is chosen)
    return trimmed;
  }

  // 3. Google Drive URL format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
  }

  // 4. Google Drive URL format 2: https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idParamMatch[1]}`;
  }

  return trimmed;
};
