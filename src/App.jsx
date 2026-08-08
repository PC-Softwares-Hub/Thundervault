import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { DiscordSection } from './components/DiscordSection';
import { BoostingSection } from './components/BoostingSection';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { UploadModal } from './components/UploadModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { INITIAL_PRODUCTS, DISCORD_SERVER_LINK } from './data/initialProducts';
import { MessageSquare, ShieldCheck, PlusCircle, RefreshCw, ExternalLink, Lock, ShieldAlert, Check, ShoppingBag, Star, Download, Save, ArrowUpDown, Rocket } from 'lucide-react';

export function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('wt_marketplace_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Navigation tab state ('products' | 'boosting' | 'reviews' | 'discord')
  const [activeTab, setActiveTab] = useState('products');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNation, setSelectedNation] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedRank, setSelectedRank] = useState('All Ranks');
  const [selectedAccess, setSelectedAccess] = useState('All Access');
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState('sale_price_asc'); // 'sale_price_asc' | 'price_asc' | 'price_desc' | 'discount_desc'

  // Admin authentication state (Encrypted via SHA-256)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('wt_admin_logged_in') === 'true';
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState('');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Save products to LocalStorage
  useEffect(() => {
    localStorage.setItem('wt_marketplace_products', JSON.stringify(products));
  }, [products]);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('wt_admin_logged_in', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('wt_admin_logged_in');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedNation('All');
    setSelectedBranch('All');
    setSelectedRank('All Ranks');
    setSelectedAccess('All Access');
    setMaxPrice(800);
    setSortBy('sale_price_asc');
  };

  const handleQuickFilter = (tag) => {
    setSearchQuery(tag);
    setActiveTab('products');
  };

  // Save Product (Admin only)
  const handleSaveProduct = (productToSave) => {
    if (!isAdminLoggedIn) return;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === productToSave.id);
      if (exists) {
        return prev.map((p) => (p.id === productToSave.id ? productToSave : p));
      }
      return [productToSave, ...prev];
    });
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    if (!isAdminLoggedIn) return;
    setEditingProduct(product);
    setIsUploadModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (!isAdminLoggedIn) return;
    if (window.confirm('Are you sure you want to delete this account listing?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleResetToDefaultProducts = () => {
    if (!isAdminLoggedIn) return;
    if (window.confirm('Reset catalog to initial sample products?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.removeItem('wt_marketplace_products');
    }
  };

  // Download 1-Click initialProducts.js file to upload to GitHub
  const handleDownloadUpdatedCatalogFile = () => {
    const fileContent = `import { convertGoogleDriveUrl } from '../utils/driveConverter';

export const DISCORD_SERVER_LINK = 'https://discord.gg/ppJV324MR9';

export const FALLBACK_ACCOUNT_IMAGE = \`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f141d"/><text x="400" y="250" fill="%23f59e0b" font-family="sans-serif" font-size="28" font-weight="700" text-anchor="middle">WAR THUNDER TOP TIER ACCOUNT</text></svg>\`;

export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};

export const parseTitleTags = (title = '') => {
  const tags = [];
  const lower = title.toLowerCase();

  if (lower.includes('special discount') || lower.includes('discount') || lower.includes('sale')) tags.push({ label: 'Special Discount', type: 'red' });
  if (lower.includes('full access') || lower.includes('email included')) tags.push({ label: 'Full Access', type: 'green' });
  if (lower.includes('su-30sm2')) tags.push({ label: 'Su-30SM2', type: 'gold' });
  if (lower.includes('mig-29')) tags.push({ label: 'MiG-29', type: 'cyan' });
  if (lower.includes('su-25k')) tags.push({ label: 'Su-25K', type: 'cyan' });
  if (lower.includes('f-16c') || lower.includes('f16c') || lower.includes('f-16')) tags.push({ label: 'F-16C', type: 'gold' });
  if (lower.includes('f-15e') || lower.includes('f15e') || lower.includes('f-15') || lower.includes('f18') || lower.includes('f-18')) tags.push({ label: 'F-15E / F-18', type: 'gold' });
  if (lower.includes('f-14') || lower.includes('f14')) tags.push({ label: 'F-14 Tomcat', type: 'gold' });
  if (lower.includes('av8b') || lower.includes('av-8b')) tags.push({ label: 'AV-8B Harrier', type: 'cyan' });
  
  const slMatch = title.match(/(\\d+(\\.\\d+)?\\s*[mMkK]?)\\s*(silver lions|sl)/i);
  if (slMatch) {
    tags.push({ label: \`\${slMatch[1].toUpperCase()} Silver Lions\`, type: 'gold' });
  }

  if (lower.includes('russia') || lower.includes('ussr')) tags.push({ label: 'USSR / Russia', type: 'purple' });
  if (lower.includes('usa') || lower.includes('us air') || lower.includes('us rank') || lower.includes('us top') || lower.includes('f18') || lower.includes('f-16') || lower.includes('f-15')) tags.push({ label: 'USA', type: 'purple' });
  if (lower.includes('germany') || lower.includes('german')) tags.push({ label: 'Germany', type: 'purple' });
  if (lower.includes('rank ix') || lower.includes('rank 9')) tags.push({ label: 'Rank IX Air', type: 'purple' });
  if (lower.includes('rank viii') || lower.includes('rank 8')) tags.push({ label: 'Rank VIII', type: 'purple' });

  return tags;
};

export const handleBuyNowRedirect = (product) => {
  const message = \`Hello! I would like to buy this War Thunder account:\\n\\n🛒 **Title:** \${product.title}\\n💵 **Price:** $\${product.price} USD\\n🛡️ **Access:** \${product.accessType}\\n🆔 **Product ID:** \${product.id}\`;

  try {
    navigator.clipboard.writeText(message);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }

  window.open(DISCORD_SERVER_LINK, '_blank');
};
`;

    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'initialProducts.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage('initialProducts.js downloaded! Drag & drop it to your GitHub src/data folder.');
    setTimeout(() => setDownloadSuccessMessage(''), 6000);
  };

  // Robust & Bulletproof Filter Logic
  const filteredProducts = products.filter((product) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(q);
      const nationMatch = product.nation.toLowerCase().includes(q);
      const rankMatch = product.rank.toLowerCase().includes(q);
      const vehicleMatch = product.featuredVehicles && product.featuredVehicles.some(v => v.toLowerCase().includes(q));
      const slMatch = product.silverLions && product.silverLions.toLowerCase().includes(q);

      if (!titleMatch && !nationMatch && !rankMatch && !vehicleMatch && !slMatch) {
        return false;
      }
    }

    // Bulletproof Nation Filtering
    if (selectedNation !== 'All') {
      const pNation = (product.nation || '').toLowerCase().trim();
      const pTitle = (product.title || '').toLowerCase().trim();
      const featured = (product.featuredVehicles || []).join(' ').toLowerCase();

      if (selectedNation === 'USSR') {
        const isUSSR = pNation.includes('ussr') || pNation.includes('russia') || pTitle.includes('ussr') || pTitle.includes('russia') || featured.includes('su-') || featured.includes('mig-');
        if (!isUSSR) return false;
      } else if (selectedNation === 'USA') {
        // Match USA cleanly
        const isUSA = pNation.includes('usa') || pNation === 'us' ||
                      pTitle.includes('usa') || pTitle.includes('us air') || pTitle.includes('us rank') || pTitle.includes('us top') ||
                      pTitle.includes('f18') || pTitle.includes('f-18') || pTitle.includes('f16') || pTitle.includes('f-16') || pTitle.includes('f15') || pTitle.includes('f-15') || pTitle.includes('f14') || pTitle.includes('f-14') || pTitle.includes('av8b') || pTitle.includes('abrams') ||
                      featured.includes('f-16') || featured.includes('f-15') || featured.includes('f-14') || featured.includes('m1a2');

        if (!isUSA) return false;
      } else if (selectedNation === 'Germany') {
        const isGermany = pNation.includes('germany') || pNation.includes('german') || pTitle.includes('germany') || pTitle.includes('german') || featured.includes('leopard');
        if (!isGermany) return false;
      } else if (selectedNation === 'Great Britain') {
        const isBritain = pNation.includes('britain') || pNation.includes('uk') || pTitle.includes('britain') || pTitle.includes('uk') || featured.includes('challenger');
        if (!isBritain) return false;
      } else if (selectedNation === 'Japan') {
        const isJapan = pNation.includes('japan') || pTitle.includes('japan') || featured.includes('f-2') || featured.includes('type 90');
        if (!isJapan) return false;
      } else if (selectedNation === 'China') {
        const isChina = pNation.includes('china') || pTitle.includes('china') || featured.includes('j-11') || featured.includes('j-10');
        if (!isChina) return false;
      } else if (selectedNation === 'Sweden') {
        const isSweden = pNation.includes('sweden') || pTitle.includes('sweden') || featured.includes('gripen');
        if (!isSweden) return false;
      } else {
        if (!pNation.includes(selectedNation.toLowerCase()) && !pTitle.includes(selectedNation.toLowerCase())) {
          return false;
        }
      }
    }

    if (selectedBranch !== 'All' && product.branch !== selectedBranch) {
      return false;
    }

    if (selectedRank !== 'All Ranks' && product.rank !== selectedRank) {
      return false;
    }

    if (product.price > maxPrice) {
      return false;
    }

    return true;
  });

  // Sorting Logic: On Sale items first (highest discount %), then lowest price!
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'sale_price_asc') {
      const aDiscount = a.discountPercentage || 0;
      const bDiscount = b.discountPercentage || 0;
      // If both have discounts, sort by higher discount first, then lower price
      if (aDiscount > 0 && bDiscount > 0) {
        if (bDiscount !== aDiscount) return bDiscount - aDiscount;
        return a.price - b.price;
      }
      // Put on sale item first
      if (aDiscount > 0 && bDiscount === 0) return -1;
      if (bDiscount > 0 && aDiscount === 0) return 1;
      // If neither is on sale, sort by lowest price first
      return a.price - b.price;
    } else if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    } else if (sortBy === 'discount_desc') {
      return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    }
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar with 4 Navigation Tabs */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUploadModal={() => {
          setEditingProduct(null);
          setIsUploadModalOpen(true);
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Tab Render Switcher */}
      {activeTab === 'products' && (
        <>
          <Hero
            onQuickFilter={handleQuickFilter}
            totalListings={products.length}
            onOpenReviews={() => setActiveTab('reviews')}
          />

          <main className="container main-layout-grid" style={{ flex: 1, padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
            {/* Sidebar Filters */}
            <FilterSidebar
              selectedNation={selectedNation}
              setSelectedNation={setSelectedNation}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              selectedRank={selectedRank}
              setSelectedRank={setSelectedRank}
              selectedAccess={selectedAccess}
              setSelectedAccess={setSelectedAccess}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={handleResetFilters}
            />

            {/* Main Content Area */}
            <div>
              {/* Prominent Power Boosting Service Highlight Banner */}
              <BoostingSection />

              {/* Header Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                background: 'var(--bg-secondary)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-bright)' }}>
                    AVAILABLE WAR THUNDER ACCOUNTS
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Showing <strong style={{ color: 'var(--accent-gold)' }}>{sortedProducts.length}</strong> verified account listings
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Styled Dark Theme Sort Dropdown */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#111622',
                    padding: '0.4rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-gold)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    <ArrowUpDown size={14} color="#f59e0b" />
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>SORT:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="dark-dropdown"
                      style={{
                        background: '#111622',
                        border: 'none',
                        color: 'var(--accent-gold-light)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="sale_price_asc" style={{ background: '#161b26', color: '#f59e0b' }}>🔥 On Sale First & Lowest Price</option>
                      <option value="price_asc" style={{ background: '#161b26', color: '#38bdf8' }}>💲 Lowest Price First</option>
                      <option value="discount_desc" style={{ background: '#161b26', color: '#f87171' }}>🏷️ Highest Discount First</option>
                      <option value="price_desc" style={{ background: '#161b26', color: '#c084fc' }}>💎 Highest Price First</option>
                    </select>
                  </div>

                  {isAdminLoggedIn ? (
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setIsUploadModalOpen(true);
                      }}
                      className="btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
                    >
                      <PlusCircle size={15} /> Upload Account
                    </button>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <ShieldCheck size={14} color="#10b981" /> Verified Owner Catalog
                    </div>
                  )}

                  <a
                    href={DISCORD_SERVER_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem', color: '#5865F2', borderColor: '#5865F2' }}
                  >
                    <MessageSquare size={15} /> Buy on Discord
                  </a>
                </div>
              </div>

              {/* Grid */}
              {sortedProducts.length === 0 ? (
                <div className="glass-panel" style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '4rem 2rem',
                  textAlign: 'center'
                }}>
                  <ShieldCheck size={56} color="#64748b" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
                    NO ACCOUNTS MATCH YOUR FILTER
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Try adjusting your nation or price filters.
                  </p>
                  <button onClick={handleResetFilters} className="btn-secondary">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={setSelectedProduct}
                      onOpenReviews={() => setActiveTab('reviews')}
                      isSellerMode={isAdminLoggedIn}
                      onEditProduct={handleEditProduct}
                      onDeleteProduct={handleDeleteProduct}
                    />
                  ))}
                </div>
              )}

              {/* Admin Save & Download Control Panel */}
              {isAdminLoggedIn && (
                <div style={{
                  marginTop: '3rem',
                  padding: '1.5rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}>
                  <h4 style={{ color: 'var(--accent-gold-light)', fontSize: '1.1rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Save size={18} /> OWNER UPDATE CONTROL PANEL
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', maxWidth: '600px', margin: '0 auto 1rem' }}>
                    Made edits or added/deleted accounts? Click below to download your updated catalog file, then drop it into your GitHub repository to publish changes globally!
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleDownloadUpdatedCatalogFile}
                      className="btn-primary"
                      style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                    >
                      <Download size={18} /> SAVE WEBSITE UPDATE FILE (initialProducts.js)
                    </button>

                    <button
                      onClick={handleResetToDefaultProducts}
                      className="btn-secondary"
                      style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <RefreshCw size={14} /> Reset Catalog to Defaults
                    </button>
                  </div>

                  {downloadSuccessMessage && (
                    <div style={{ marginTop: '0.85rem', fontSize: '0.825rem', color: '#34d399', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <Check size={16} /> {downloadSuccessMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* Standalone Boosting Page */}
      {activeTab === 'boosting' && (
        <main className="container" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
          <BoostingSection />
        </main>
      )}

      {/* Reviews & Trust Tab Page */}
      {activeTab === 'reviews' && (
        <TrustSection />
      )}

      {/* Discord Hub Tab Page */}
      {activeTab === 'discord' && (
        <DiscordSection />
      )}

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-darker)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '3rem 0 2rem',
        marginTop: '3rem'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '2.5rem' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: '700',
              marginBottom: '0.75rem'
            }}>
              THUNDER<span className="gold-gradient-text">VAULT</span> MARKETPLACE
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '400px' }}>
              The premier marketplace for verified War Thunder accounts and 100k RP power boosting. Top tier jets Su-30SM2, MiG-29 (9-12), Su-25K, Rank IX Air, and millions of Silver Lions with full native email access.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>NAVIGATION TABS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <span onClick={() => setActiveTab('products')} style={{ cursor: 'pointer', color: activeTab === 'products' ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                🛒 Accounts Catalog
              </span>
              <span onClick={() => setActiveTab('boosting')} style={{ cursor: 'pointer', color: activeTab === 'boosting' ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                🚀 100k RP Boosting ($5)
              </span>
              <span onClick={() => setActiveTab('reviews')} style={{ cursor: 'pointer', color: activeTab === 'reviews' ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                ⭐ My Reviews & Trust
              </span>
              <a href={DISCORD_SERVER_LINK} target="_blank" rel="noreferrer" style={{ color: '#5865F2', fontWeight: '600' }}>
                💬 Discord Server Link
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>OWNER ACCESS</h4>
            {!isAdminLoggedIn ? (
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
              >
                <Lock size={13} /> Owner Admin Login
              </button>
            ) : (
              <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={14} /> Logged in as Admin
              </span>
            )}
          </div>
        </div>

        <div className="container" style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-dim)'
        }}>
          © 2026 ThunderVault Marketplace. All War Thunder assets and trademarks belong to Gaijin Entertainment.
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenReviews={() => setActiveTab('reviews')}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setEditingProduct(null);
        }}
        onSaveProduct={handleSaveProduct}
        editingProduct={editingProduct}
        allProducts={products}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}

export default App;
