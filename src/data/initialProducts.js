import { convertGoogleDriveUrl } from '../utils/driveConverter';

export const DISCORD_SERVER_LINK = 'https://discord.gg/ppJV324MR9';

export const FALLBACK_ACCOUNT_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f141d"/><text x="400" y="250" fill="%23f59e0b" font-family="sans-serif" font-size="28" font-weight="700" text-anchor="middle">WAR THUNDER TOP TIER ACCOUNT</text></svg>`;

export const INITIAL_PRODUCTS = [];

export const parseTitleTags = (title = '') => {
  const tags = [];
  const lower = title.toLowerCase();

  if (lower.includes('special discount') || lower.includes('discount')) tags.push({ label: 'Special Discount', type: 'red' });
  if (lower.includes('full access') || lower.includes('email included')) tags.push({ label: 'Full Access', type: 'green' });
  if (lower.includes('su-30sm2')) tags.push({ label: 'Su-30SM2', type: 'gold' });
  if (lower.includes('mig-29')) tags.push({ label: 'MiG-29', type: 'cyan' });
  if (lower.includes('su-25k')) tags.push({ label: 'Su-25K', type: 'cyan' });
  if (lower.includes('f-16c')) tags.push({ label: 'F-16C', type: 'gold' });
  if (lower.includes('f-15e')) tags.push({ label: 'F-15E', type: 'gold' });
  
  const slMatch = title.match(/(\d+(\.\d+)?\s*[mMkK]?)\s*(silver lions|sl)/i);
  if (slMatch) {
    tags.push({ label: `${slMatch[1].toUpperCase()} Silver Lions`, type: 'gold' });
  }

  if (lower.includes('russia') || lower.includes('ussr')) tags.push({ label: 'USSR / Russia', type: 'purple' });
  if (lower.includes('usa') || lower.includes('us air')) tags.push({ label: 'USA', type: 'purple' });
  if (lower.includes('germany') || lower.includes('german')) tags.push({ label: 'Germany', type: 'purple' });
  if (lower.includes('rank ix') || lower.includes('rank 9')) tags.push({ label: 'Rank IX Air', type: 'purple' });

  return tags;
};

export const handleBuyNowRedirect = (product) => {
  const message = `Hello! I would like to buy this War Thunder account:\n\n🛒 **Title:** ${product.title}\n💵 **Price:** $${product.price} USD\n🛡️ **Access:** ${product.accessType}\n🆔 **Product ID:** ${product.id}`;

  try {
    navigator.clipboard.writeText(message);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }

  window.open(DISCORD_SERVER_LINK, '_blank');
};
