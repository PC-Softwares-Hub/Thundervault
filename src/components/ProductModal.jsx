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
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <div className="glass-panel animate-fade-in" style={{
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
              top: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.6)',
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
          <div style={{
            background: '#07090e',
            padding: '1.5rem',
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
                height: '380px',
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
                top: '12px',
                left: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: 'var(--accent-gold-light)',
                border: '1px solid var(--border-gold)',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.3rem 0.7rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backdropFilter: 'blur(4px)'
              }}>
                <ZoomIn size={14} /> Click Image to Zoom Fullscreen
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
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.75)',
                color: 'var(--text-bright)',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Camera size={13} /> {activeImageIndex + 1} / {images.length}
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
                      width: '70px',
                      height: '50px',
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
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <ShieldCheck size={26} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#34d399' }}>VERIFIED ACCOUNT GUARANTEE</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Full native email credentials handed over upon purchase on Discord.
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Account Details & Discord Buy Button */}
          <div style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {parsedBadges.map((badge, idx) => (
                  <span key={idx} className={`badge badge-${badge.type}`}>
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Title & Copy */}
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <h2 style={{
                  fontSize: '1.2rem',
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
                    padding: '0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  title="Copy Title"
                >
                  {copiedTitle ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
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
                  padding: '0.65rem 1rem',
                  marginBottom: '1.25rem',
                  color: 'var(--accent-gold-light)',
                  fontSize: '0.825rem',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={15} fill="#fbbf24" color="#fbbf24" />
                  <span>100% TRUSTED SELLER • CHECK REVIEWS TAB</span>
                </div>
                <ArrowRight size={16} />
              </button>

              {/* Price Tag Box */}
              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL PRICE</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {product.discountPercentage > 0 && (
                  <div className="badge badge-red" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                    SAVE {product.discountPercentage}%
                  </div>
                )}
              </div>

              {/* Specification Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>NATION</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-bright)' }}>{product.nation}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>BRANCH & RANK</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-purple)' }}>{product.branch} ({product.rank})</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>SILVER LIONS</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f5bc54' }}>{product.silverLions} SL</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>ACCESS LEVEL</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#34d399' }}>{product.accessType}</span>
                </div>
              </div>

              {/* Featured Vehicles */}
              {product.featuredVehicles && product.featuredVehicles.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    UNLOCKED VEHICLES / JETS
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {product.featuredVehicles.map((v, i) => (
                      <span key={i} className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                        ⚡ {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                {product.description}
              </div>
            </div>

            {/* Discord Direct Buy Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => handleBuyNowRedirect(product)}
                className="btn-primary"
                style={{
                  padding: '0.9rem',
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(88, 101, 242, 0.4)'
                }}
              >
                <MessageSquare size={20} /> BUY NOW ON DISCORD SERVER
              </button>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                ⚡ Redirects to <strong style={{ color: '#5865F2' }}>discord.gg/ppJV324MR9</strong> & copies account info to clipboard.
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
