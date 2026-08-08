import React, { useState } from 'react';
import { X, ShieldCheck, Camera, Copy, Check, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, Zap, Lock, Award, Coins, ZoomIn, Star, ArrowRight } from 'lucide-react';
import { parseTitleTags, handleBuyNowRedirect, DISCORD_SERVER_LINK, FALLBACK_ACCOUNT_IMAGE } from '../data/initialProducts';
import { FullscreenLightbox } from './FullscreenLightbox';

export const ProductModal = ({ product, onClose, onOpenReviews }) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [isFullscreenLightboxOpen, setIsFullscreenLightboxOpen] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [
    FALLBACK_ACCOUNT_IMAGE
  ];

  const parsedBadges = parseTitleTags(product.title);

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(product.title);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <div className="glass-panel modal-grid-container animate-fade-in" style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)',
          overflowY: 'auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '0'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid var(--border-medium)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          {/* Left Side: Photo Lightbox Gallery */}
          <div className="modal-left-gallery" style={{
            background: '#07090e',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
            borderRight: '1px solid var(--border-subtle)'
          }}>
            {/* Main Large Image Display (Clickable for Fullscreen Zoom) */}
            <div
              onClick={() => setIsFullscreenLightboxOpen(true)}
              style={{
                position: 'relative',
                height: '320px',
                width: '100%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#0d1119',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-in'
              }}
            >
              <img
                src={images[activeImageIndex]}
                alt={`Screenshot ${activeImageIndex + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_ACCOUNT_IMAGE;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
              />

              {/* Hover Zoom Hint Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.75)',
                color: 'var(--accent-gold-light)',
                border: '1px solid var(--border-gold)',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backdropFilter: 'blur(4px)'
              }}>
                <ZoomIn size={13} /> Click Image to Zoom Fullscreen
              </div>

              {/* Gallery Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.75)',
                color: 'var(--text-bright)',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Camera size={12} /> {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '0.25rem'
              }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '65px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      flexShrink: 0,
                      cursor: 'pointer',
                      background: '#0d1119'
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_ACCOUNT_IMAGE;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Security Banner */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <ShieldCheck size={24} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#34d399' }}>VERIFIED ACCOUNT GUARANTEE</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  Full native email credentials handed over upon purchase on Discord.
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Account Details & Discord Buy Button */}
          <div style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div>
              {/* Title & Copy */}
              <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
                <h2 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  lineHeight: 1.35,
                  color: 'var(--text-bright)',
                  fontFamily: 'var(--font-body)',
                  paddingRight: '2.5rem'
                }}>
                  {product.title}
                </h2>
                <button
                  onClick={handleCopyTitle}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  title="Copy Title"
                >
                  {copiedTitle ? <Check size={15} color="#34d399" /> : <Copy size={15} />}
                </button>
              </div>

              {/* Sleek Reviews Banner */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenReviews) onOpenReviews();
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.55rem 0.85rem',
                  marginBottom: '1rem',
                  color: 'var(--accent-gold-light)',
                  fontSize: '0.775rem',
                  fontWeight: '800',
                  letterSpacing: '0.03em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
                }}
                title="Check Verified Seller Reviews on PlayerAuctions & Eldorado"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>100% TRUSTED SELLER • CHECK REVIEWS</span>
                </div>
                <ArrowRight size={15} />
              </button>

              {/* Price Tag Box */}
              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL PRICE</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {product.discountPercentage > 0 && (
                  <div className="badge badge-red" style={{ fontSize: '0.8rem', padding: '0.35rem 0.7rem' }}>
                    SAVE {product.discountPercentage}%
                  </div>
                )}
              </div>

              {/* Specification Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.6rem',
                marginBottom: '1rem'
              }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>NATION</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-bright)' }}>{product.nation}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>BRANCH & RANK</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-purple)' }}>{product.branch} ({product.rank})</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>SILVER LIONS</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f5bc54' }}>{product.silverLions} SL</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>ACCESS LEVEL</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#34d399' }}>{product.accessType}</span>
                </div>
              </div>

              {/* Featured Vehicles */}
              {product.featuredVehicles && product.featuredVehicles.length > 0 && (
                <div style={{ marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    UNLOCKED VEHICLES / JETS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {product.featuredVehicles.map((v, i) => (
                      <span key={i} className="badge badge-gold" style={{ fontSize: '0.725rem' }}>
                        ⚡ {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                {product.description}
              </div>
            </div>

            {/* Discord Direct Buy Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => handleBuyNowRedirect(product)}
                className="btn-primary"
                style={{
                  padding: '0.8rem',
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 18px rgba(88, 101, 242, 0.4)'
                }}
              >
                <MessageSquare size={18} /> BUY NOW ON DISCORD SERVER
              </button>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                ⚡ Redirects to <strong style={{ color: '#5865F2' }}>discord.gg/ppJV324MR9</strong> & copies info to clipboard.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Zoomer Slider */}
      {isFullscreenLightboxOpen && (
        <FullscreenLightbox
          images={images}
          initialIndex={activeImageIndex}
          onClose={() => setIsFullscreenLightboxOpen(false)}
        />
      )}
    </>
  );
};
