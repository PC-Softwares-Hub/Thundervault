import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { DiscordSection } from './components/DiscordSection';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { UploadModal } from './components/UploadModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { INITIAL_PRODUCTS, DISCORD_SERVER_LINK } from './data/initialProducts';
import { MessageSquare, ShieldCheck, PlusCircle, RefreshCw, ExternalLink, Lock, ShieldAlert, Check, ShoppingBag, Star } from 'lucide-react';

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

  // Navigation tab state ('products' | 'reviews' | 'discord')
  const [activeTab, setActiveTab] = useState('products');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNation, setSelectedNation] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedRank, setSelectedRank] = useState('All Ranks');
  const [selectedAccess, setSelectedAccess] = useState('All Access');
  const [maxPrice, setMaxPrice] = useState(800);

  // Admin authentication state (Encrypted via SHA-256)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('wt_admin_logged_in') === 'true';
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

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

  // Filter Logic
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

    if (selectedNation !== 'All') {
      if (selectedNation === 'USSR' && !(product.nation.includes('USSR') || product.nation.includes('Russia'))) {
        return false;
      } else if (selectedNation !== 'USSR' && product.nation !== selectedNation) {
        return false;
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar with 3 Tabs & 3-Dash Menu */}
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

          <main className="container" style={{ flex: 1, padding: '2.5rem 1.5rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
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

            {/* Listings Grid Section */}
            <div>
              {/* Header Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                background: 'var(--bg-secondary)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-bright)' }}>
                    AVAILABLE WAR THUNDER ACCOUNTS
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Showing <strong style={{ color: 'var(--accent-gold)' }}>{filteredProducts.length}</strong> verified account listings
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
              {filteredProducts.length === 0 ? (
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {filteredProducts.map((product) => (
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

              {/* Admin Reset Option */}
              {isAdminLoggedIn && (
                <div style={{ marginTop: '3rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <button
                    onClick={handleResetToDefaultProducts}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <RefreshCw size={12} /> Reset Catalog to Defaults
                  </button>
                </div>
              )}
            </div>
          </main>
        </>
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
              The premier marketplace for verified War Thunder accounts. Top tier jets Su-30SM2, MiG-29 (9-12), Su-25K, Rank IX Air, and millions of Silver Lions with full native email access.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>NAVIGATION TABS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <span onClick={() => setActiveTab('products')} style={{ cursor: 'pointer', color: activeTab === 'products' ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                🛒 Products Catalog
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
