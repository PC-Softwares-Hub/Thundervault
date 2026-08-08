import React, { useState } from 'react';
import { Search, ShoppingBag, ShieldCheck, MessageSquare, PlusCircle, ExternalLink, Menu, X, Star, Lock, LogOut } from 'lucide-react';
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
      background: 'rgba(13, 17, 23, 0.92)',
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
          onClick={() => setActiveTab('products')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-gold)'
          }}>
            <ShieldCheck size={26} color="#f59e0b" />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: '700',
              lineHeight: 1,
              letterSpacing: '0.05em'
            }}>
              THUNDER<span className="gold-gradient-text">VAULT</span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              fontWeight: '600'
            }}>
              WAR THUNDER MARKETPLACE
            </div>
          </div>
        </div>

        {/* Desktop 3 Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
          >
            <ShoppingBag size={16} /> Products
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
          >
            <Star size={16} fill={activeTab === 'reviews' ? '#000' : 'none'} /> Reviews & Trust
          </button>

          <button
            onClick={() => setActiveTab('discord')}
            className={activeTab === 'discord' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}
          >
            <MessageSquare size={16} /> Discord Server
          </button>
        </nav>

        {/* Search Bar & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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
                padding: '0.55rem 1rem 0.55rem 2.4rem',
                color: 'var(--text-bright)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'all 0.2s ease'
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

          {/* Owner Admin Login / Logout */}
          {isAdminLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={onOpenUploadModal}
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
              >
                <PlusCircle size={15} /> Upload Account
              </button>
              <button
                onClick={onAdminLogout}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                title="Logout Owner"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.55rem 0.85rem', color: 'var(--text-muted)' }}
              title="Owner Admin Login"
            >
              <Lock size={13} /> Owner
            </button>
          )}

          {/* Mobile 3-Dash Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-medium)',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              display: 'none',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
            className={activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            🛒 Products Catalog
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
