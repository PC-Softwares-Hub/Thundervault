import React, { useState } from 'react';
import { Search, ShoppingBag, ShieldCheck, MessageSquare, PlusCircle, ExternalLink, Menu, X, Star, Lock, LogOut, Rocket } from 'lucide-react';
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(13, 17, 23, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Main Navbar Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Logo */}
        <div
          onClick={() => {
            setActiveTab('products');
            setIsMobileMenuOpen(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-gold)'
          }}>
            <ShieldCheck size={22} color="#f59e0b" />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: '700',
              lineHeight: 1,
              letterSpacing: '0.05em'
            }}>
              THUNDER<span className="gold-gradient-text">VAULT</span>
            </div>
            <div style={{
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              fontWeight: '600'
            }}>
              WAR THUNDER MARKETPLACE
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.95rem' }}
          >
            <ShoppingBag size={15} /> Accounts Catalog
          </button>

          <button
            onClick={() => setActiveTab('boosting')}
            className={activeTab === 'boosting' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.95rem' }}
          >
            <Rocket size={15} /> 100k RP Boosting
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.95rem' }}
          >
            <Star size={15} fill={activeTab === 'reviews' ? '#000' : 'none'} /> Reviews & Trust
          </button>

          <button
            onClick={() => setActiveTab('discord')}
            className={activeTab === 'discord' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.95rem' }}
          >
            <MessageSquare size={15} /> Discord Server
          </button>
        </nav>

        {/* Search Bar & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Desktop Search Box */}
          <div className="desktop-search-input" style={{ position: 'relative', width: '220px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search Su-30SM2, MiG-29..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem 0.5rem 2.3rem',
                color: 'var(--text-bright)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-medium)',
              color: '#fff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-menu-btn"
            title="Search"
          >
            <Search size={18} />
          </button>

          {/* Owner Admin Login / Logout */}
          {isAdminLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={onOpenUploadModal}
                className="btn-primary"
                style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem' }}
              >
                <PlusCircle size={14} /> Upload
              </button>
              <button
                onClick={onAdminLogout}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.45rem 0.65rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                title="Logout Owner"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.45rem 0.7rem', color: 'var(--text-muted)' }}
              title="Owner Admin Login"
            >
              <Lock size={13} /> Owner
            </button>
          )}

          {/* Mobile 3-Dash Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-medium)',
              color: '#fff',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-menu-btn"
            title="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {isMobileSearchOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search Su-30SM2, MiG-29, Rank IX..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 1rem',
              color: 'var(--text-bright)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}>
          <button
            onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
            className={activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            🛒 Accounts Catalog
          </button>
          <button
            onClick={() => { setActiveTab('boosting'); setIsMobileMenuOpen(false); }}
            className={activeTab === 'boosting' ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            🚀 100k RP Power Boosting
          </button>
          <button
            onClick={() => { setActiveTab('reviews'); setIsMobileMenuOpen(false); }}
            className={activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            ⭐ Reviews & Trust
          </button>
          <button
            onClick={() => { setActiveTab('discord'); setIsMobileMenuOpen(false); }}
            className={activeTab === 'discord' ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            💬 Discord Server
          </button>
        </div>
      )}
    </header>
  );
};
