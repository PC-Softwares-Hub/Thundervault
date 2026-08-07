import React, { useState } from 'react';
import { ShieldCheck, Zap, Coins, Crosshair, Trash2, Edit3, Eye, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { parseTitleTags, handleBuyNowRedirect, FALLBACK_ACCOUNT_IMAGE } from '../data/initialProducts';

export const ProductCard = ({
  product,
  onSelectProduct,
  onOpenReviews,
  isSellerMode,
  onEditProduct,
  onDeleteProduct
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const parsedBadges = parseTitleTags(product.title);

  const images = product.images && product.images.length > 0
    ? product.images
    : [FALLBACK_ACCOUNT_IMAGE];

  const currentImage = images[currentImgIndex] || images[0];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="glass-panel glass-panel-hover" style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Image Thumbnail Container */}
      <div style={{
        position: 'relative',
        height: '220px',
        width: '100%',
        background: '#0a0d13',
        overflow: 'hidden'
      }}>
        <img
          src={currentImage}
          alt={product.title}
          onClick={() => onSelectProduct(product)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_ACCOUNT_IMAGE;
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.4s ease'
          }}
        />
        
        {/* Top Badges overlay: KEEP Discount Pill (-23% OFF) */}
        {product.discountPercentage > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            pointerEvents: 'none'
          }}>
            <span className="badge badge-red" style={{ fontSize: '0.8rem', padding: '0.3rem 0.65rem' }}>
              -{product.discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Thumbnail Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.65)',
                color: '#fff',
                border: '1px solid var(--border-medium)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Previous Screenshot"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNextImage}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.65)',
                color: '#fff',
                border: '1px solid var(--border-medium)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Next Screenshot"
            >
              <ChevronRight size={18} />
            </button>

            {/* Thumbnail Indicator Dots */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px',
              background: 'rgba(0,0,0,0.5)',
              padding: '3px 8px',
              borderRadius: '999px'
            }}>
              {images.map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  style={{
                    width: currentImgIndex === idx ? '12px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: currentImgIndex === idx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Body */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          {/* Title */}
          <h4
            onClick={() => onSelectProduct(product)}
            style={{
              fontSize: '0.95rem',
              fontWeight: '700',
              lineHeight: 1.35,
              color: 'var(--text-bright)',
              cursor: 'pointer',
              marginBottom: '0.65rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontFamily: 'var(--font-body)'
            }}
            title={product.title}
          >
            {product.title}
          </h4>

          {/* Title Auto-Parsed Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBottom: '0.85rem'
          }}>
            {parsedBadges.map((badge, idx) => {
              let badgeClass = 'badge-gold';
              if (badge.type === 'green') badgeClass = 'badge-green';
              if (badge.type === 'cyan') badgeClass = 'badge-cyan';
              if (badge.type === 'red') badgeClass = 'badge-red';
              if (badge.type === 'purple') badgeClass = 'badge-purple';
              return (
                <span key={idx} className={`badge ${badgeClass}`} style={{ fontSize: '0.68rem', padding: '0.18rem 0.5rem' }}>
                  {badge.label}
                </span>
              );
            })}
          </div>

          {/* Sleek Verified Reviews Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenReviews) onOpenReviews();
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 0.75rem',
              marginBottom: '0.85rem',
              color: 'var(--accent-gold-light)',
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.03em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.12)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.12) 100%)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)';
              e.currentTarget.style.borderColor = 'var(--border-gold)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Check Verified Seller Reviews on PlayerAuctions & Eldorado"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={13} fill="#fbbf24" color="#fbbf24" />
              <span>100% TRUSTED SELLER • CHECK REVIEWS</span>
            </div>
            <ArrowRight size={14} />
          </button>

          {/* Spec Row */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.6rem 0.8rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            fontSize: '0.75rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Coins size={14} color="#e5a93b" />
              <span>SL: <strong style={{ color: '#f5bc54' }}>{product.silverLions}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Crosshair size={14} color="#00e5ff" />
              <span>Branch: <strong style={{ color: 'var(--accent-cyan)' }}>{product.branch}</strong></span>
            </div>
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  color: '#fff'
                }}>
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dim)',
                    textDecoration: 'line-through'
                  }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {isSellerMode && (
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => onEditProduct(product)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  title="Edit Product"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  title="Delete Product"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '0.5rem' }}>
            <button
              onClick={() => onSelectProduct(product)}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.6rem 0.5rem',
                justifyContent: 'center'
              }}
            >
              <Eye size={15} /> View Offer
            </button>

            <button
              onClick={() => handleBuyNowRedirect(product)}
              className="btn-primary"
              style={{
                fontSize: '0.8rem',
                padding: '0.6rem 0.5rem',
                justifyContent: 'center'
              }}
              title="Buy Now - Redirects to Discord Server"
            >
              <Zap size={15} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
