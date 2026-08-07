import React, { useState } from 'react';
import { Search, Lock, PlusCircle, LogOut, Crosshair, MessageSquare, Menu, X, ShoppingBag, Star, ShieldCheck } from 'lucide-react';
import { DISCORD_SERVER_LINK } from '../data/initialProducts';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenUploadModal,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onAdminLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(13, 16, 23, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Top Notice Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 50%, #10b981 100%)',
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '0.3rem 0',
        textAlign: 'center',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }}>
        ⚡ Official Verified War Thunder Marketplace • Full Email Access • Instant Discord Delivery
      </div>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        gap: '1.25rem'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('products')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(229,169,59,0.2) 0%, rgba(0,229,255,0.15) 100%)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-gold)'
          }}>
            <Crosshair size={24} color="#e5a93b" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: '700',
              lineHeight: 1.1,
              letterSpacing: '0.06em'
            }}>
              THUNDER<span className="gold-gradient-text">VAULT</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: '600' }}>
              WAR THUNDER MARKETPLACE
            </div>
          </div>
        </div>

        {/* 3 Main Navigation Tabs (Products, Reviews, Discord) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              background: activeTab === 'products' ? 'rgba(229,169,59,0.15)' : 'transparent',
              border: activeTab === 'products' ? '1px solid var(--accent-gold)' : '1px solid transparent',
              color: activeTab === 'products' ? '#f5bc54' : 'var(--text-main)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <ShoppingBag size={16} /> Products
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              background: activeTab === 'reviews' ? 'rgba(0,229,255,0.15)' : 'transparent',
              border: activeTab === 'reviews' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              color: activeTab === 'reviews' ? 'var(--accent-cyan)' : 'var(--text-main)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Star size={16} fill={activeTab === 'reviews' ? 'var(--accent-cyan)' : 'none'} /> Reviews & Trust
          </button>

          <button
            onClick={() => setActiveTab('discord')}
            style={{
              background: activeTab === 'discord' ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
              border: activeTab === 'discord' ? '1px solid #5865F2' : '1px solid transparent',
              color: activeTab === 'discord' ? '#7983f5' : 'var(--text-main)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <MessageSquare size={16} /> Discord Server
          </button>
        </nav>

        {/* Global Search Bar (Only shown on Products tab) */}
        {activeTab === 'products' && (
          <div style={{
            flex: 1,
            maxWidth: '360px',
            position: 'relative'
          }}>
            <Search size={16} color="#64748b" style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <input
              type="text"
              placeholder="Search Su-30SM2, MiG-29, Rank IX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                color: 'var(--text-bright)',
                fontSize: '0.825rem',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Action Controls & Hamburger Menu (3 dashes) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAdminLoggedIn ? (
            <>
              <button
                onClick={onOpenUploadModal}
                className="btn-primary"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.55rem 1rem'
                }}
              >
                <PlusCircle size={16} />
                <span>Upload Account</span>
              </button>

              <button
                onClick={onAdminLogout}
                className="btn-secondary"
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  color: '#f87171',
                  borderColor: 'rgba(239, 68, 68, 0.3)'
                }}
                title="Log Out of Admin Mode"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.75rem',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
              title="Admin Login"
            >
              <Lock size={13} /> Owner
            </button>
          )}

          {/* 3-Dash Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Menu Drawer (3 Dashes)"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Hamburger Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            NAVIGATION MENU
          </div>

          <button
            onClick={() => {
              setActiveTab('products');
              setIsMobileMenuOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: activeTab === 'products' ? 'rgba(229,169,59,0.15)' : 'var(--bg-input)',
              border: activeTab === 'products' ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: activeTab === 'products' ? '#f5bc54' : '#fff',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={18} /> Products Catalog (Main Accounts)
          </button>

          <button
            onClick={() => {
              setActiveTab('reviews');
              setIsMobileMenuOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: activeTab === 'reviews' ? 'rgba(0,229,255,0.15)' : 'var(--bg-input)',
              border: activeTab === 'reviews' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: activeTab === 'reviews' ? 'var(--accent-cyan)' : '#fff',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <Star size={18} /> My Reviews & Ratings (PlayerAuctions & Eldorado)
          </button>

          <button
            onClick={() => {
              setActiveTab('discord');
              setIsMobileMenuOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: activeTab === 'discord' ? 'rgba(88, 101, 242, 0.2)' : 'var(--bg-input)',
              border: activeTab === 'discord' ? '1px solid #5865F2' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: activeTab === 'discord' ? '#7983f5' : '#fff',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={18} /> Official Discord Server (Instant Buy)
          </button>
        </div>
      )}
    </header>
  );
};
