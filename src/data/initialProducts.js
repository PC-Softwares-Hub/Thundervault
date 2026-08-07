import { convertGoogleDriveUrl } from '../utils/driveConverter';

export const DISCORD_SERVER_LINK = 'https://discord.gg/ppJV324MR9';

// Safe Base64 SVG Generator for 100% Incognito & Netlify compatibility
const makeBase64Svg = (title, vehicle, nation, rank, sl) => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f141d"/>
        <stop offset="50%" stop-color="#1a2332"/>
        <stop offset="100%" stop-color="#090c12"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#fbbf24"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)"/>
    <path d="M0,100 H800 M0,200 H800 M0,300 H800 M0,400 H800 M200,0 V500 M400,0 V500 M600,0 V500" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    
    <rect x="30" y="30" width="740" height="50" rx="8" fill="#121824" stroke="#2b3548" stroke-width="1"/>
    <text x="50" y="62" fill="#ffffff" font-family="sans-serif" font-weight="700" font-size="20" letter-spacing="1">WAR THUNDER ACCOUNT VERIFIED</text>
    <rect x="630" y="42" width="120" height="26" rx="4" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
    <text x="690" y="60" fill="#34d399" font-family="sans-serif" font-weight="700" font-size="12" text-anchor="middle">FULL ACCESS</text>

    <rect x="50" y="105" width="700" height="290" rx="12" fill="#171e2c" stroke="#f59e0b" stroke-opacity="0.35" stroke-width="1.5"/>
    
    <circle cx="400" cy="220" r="80" stroke="#06b6d4" stroke-opacity="0.2" stroke-width="2" fill="none"/>
    <circle cx="400" cy="220" r="50" stroke="#06b6d4" stroke-opacity="0.3" stroke-dasharray="4 4" fill="none"/>
    <line x1="300" y1="220" x2="500" y2="220" stroke="#06b6d4" stroke-opacity="0.25"/>
    <line x1="400" y1="120" x2="400" y2="320" stroke="#06b6d4" stroke-opacity="0.25"/>

    <text x="400" y="210" fill="url(#gold)" font-family="sans-serif" font-size="34" font-weight="800" text-anchor="middle">${vehicle}</text>
    <text x="400" y="245" fill="#94a3b8" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">${nation} • ${rank} • ${sl} SL</text>
    
    <rect x="50" y="415" width="220" height="55" rx="8" fill="#111622" stroke="#2b3548"/>
    <text x="65" y="438" fill="#64748b" font-family="sans-serif" font-size="11">PRIMARY JET</text>
    <text x="65" y="457" fill="#e2e8f0" font-family="sans-serif" font-weight="700" font-size="14">${vehicle}</text>
    
    <rect x="290" y="415" width="220" height="55" rx="8" fill="#111622" stroke="#2b3548"/>
    <text x="305" y="438" fill="#64748b" font-family="sans-serif" font-size="11">SILVER LIONS</text>
    <text x="305" y="457" fill="#f5bc54" font-family="sans-serif" font-weight="700" font-size="14">${sl}</text>

    <rect x="530" y="415" width="220" height="55" rx="8" fill="#111622" stroke="#2b3548"/>
    <text x="545" y="438" fill="#64748b" font-family="sans-serif" font-size="11">ACCOUNT ACCESS</text>
    <text x="545" y="457" fill="#34d399" font-family="sans-serif" font-weight="700" font-size="14">Full Native Mail</text>
  </svg>`;

  try {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
  } catch (e) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent);
  }
};

export const FALLBACK_ACCOUNT_IMAGE = makeBase64Svg(
  'WAR THUNDER ACCOUNT SCREENSHOT',
  'WAR THUNDER TOP TIER',
  'USSR / RUSSIA',
  'Rank IX',
  '4.2M'
);

export const INITIAL_PRODUCTS = [
  {
    id: 'wt-acc-001',
    title: 'Special Discount | Full Access | Su-30SM2 |Mig-29 (9-12) | Su-25K | 4.2M Silver Lions | russia top tier account | Rank IX air',
    price: 185,
    originalPrice: 240,
    discountPercentage: 23,
    nation: 'USSR',
    branch: 'Air',
    rank: 'Rank IX',
    silverLions: '4,200,000',
    goldenEagles: '2,450',
    accessType: 'Full Access (Email Included)',
    featuredVehicles: ['Su-30SM2', 'MiG-29 (9-12)', 'Su-25K', 'Su-27', 'Yak-141'],
    badges: ['Special Discount', 'Full Access', 'Su-30SM2', 'MiG-29', '4.2M Silver Lions', 'Russia Top Tier', 'Rank IX Air'],
    images: [
      makeBase64Svg('Special Discount Russia Top Tier', 'Su-30SM2 & MiG-29 (9-12)', 'USSR / RUSSIA', 'Rank IX', '4.2M'),
      makeBase64Svg('Tech Tree Unlocked Overview', 'Su-25K & Su-27', 'USSR Aviation', 'Rank IX', '4.2M'),
      makeBase64Svg('Hangar Showcase & Lions', '4,200,000 Silver Lions', 'Gaijin Login', 'Rank IX', '4.2M')
    ],
    description: 'Stacked War Thunder Russian Aviation top tier account! Comes with full original email access, clean history, zero bans. Features top modern fighters Su-30SM2, MiG-29 (9-12), premium Su-25K for fast research, and over 4.2 Million Silver Lions ready to spend.',
    seller: {
      name: 'VortexWT_Store',
      rating: 4.9,
      totalSales: 142,
      verified: true
    },
    createdDate: '2026-08-05'
  },
  {
    id: 'wt-acc-002',
    title: 'US Air & Ground Top Tier | F-16C Block 50 | F-15E Strike Eagle | M1A2 SEPv2 | 8.5M SL | Rank VIII Air & Ground | Email Access',
    price: 240,
    originalPrice: 290,
    discountPercentage: 17,
    nation: 'USA',
    branch: 'Air & Ground',
    rank: 'Rank VIII',
    silverLions: '8,500,000',
    goldenEagles: '3,100',
    accessType: 'Full Access (Email Included)',
    featuredVehicles: ['F-16C Block 50', 'F-15E Strike Eagle', 'A-10A Late', 'M1A2 SEPv2'],
    badges: ['US Top Tier', 'F-16C', 'F-15E', 'M1A2 SEPv2', '8.5M Silver Lions', 'Full Access'],
    images: [
      makeBase64Svg('USA Top Tier Jet & Tank Stack', 'F-16C & M1A2 SEPv2', 'USA', 'Rank VIII', '8.5M'),
      makeBase64Svg('F-15E Strike Eagle Showcase', 'F-15E & A-10A', 'US Air Force', 'Rank VIII', '8.5M')
    ],
    description: 'Ultimate US dual Air and Ground top tier account. All major US modern jets unlocked including F-16C and F-15E alongside top Abrams line M1A2 SEPv2. Loaded with 8.5M Silver Lions.',
    seller: {
      name: 'ApexTactical',
      rating: 5.0,
      totalSales: 210,
      verified: true
    },
    createdDate: '2026-08-06'
  }
];

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
