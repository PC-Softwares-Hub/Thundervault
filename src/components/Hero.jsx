import React from 'react';
import { ShieldCheck, Zap, Lock, Award, Star } from 'lucide-react';

export const Hero = ({ onQuickFilter, totalListings, onOpenReviews }) => {
  const quickTags = [
    'Su-30SM2',
    'MiG-29 (9-12)',
    'Su-25K',
    '4.2M Silver Lions',
    'Rank IX Air',
    'USSR / Russia',
    'Full Access',
    'F-16C'
  ];

  return (
    <section style={{
      position: 'relative',
      padding: '3.5rem 0 2.5rem',
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }}>
      {/* Glow Background */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(229,169,59,0.14) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge badge-gold">
                <ShieldCheck size={14} /> 100% Verified Trusted Seller
              </span>
              <span
                onClick={onOpenReviews}
                className="badge badge-cyan"
                style={{ cursor: 'pointer' }}
                title="Click to view ratings on PlayerAuctions & Eldorado"
              >
                ⭐ 100% Positive Ratings — Check Reviews Tab
              </span>
            </div>
            
            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: '700',
              lineHeight: 1.15,
              marginBottom: '1rem'
            }}>
              100% VERIFIED TRUSTED SELLER <br />
              <span className="gold-gradient-text">MAKE SURE TO SEE REVIEWS TAB</span>
            </h1>
            
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1.15rem',
              maxWidth: '680px',
              marginBottom: '1.8rem',
              lineHeight: 1.6,
              fontWeight: '500'
            }}>
              Direct access to top-tier jets, full access War Thunder accounts. Check out the Reviews tab if you have any doubt!
            </p>

            {/* Popular Tags */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '600', marginRight: '0.25rem' }}>
                POPULAR SEARCHES:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onQuickFilter(tag)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.background = 'rgba(229,169,59,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
            minWidth: '340px'
          }}>
            <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Zap size={18} color="#e5a93b" />
                <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  INSTANT
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5-Min Email Delivery</div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Lock size={18} color="#10b981" />
                <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  100%
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Native Mail Access</div>
            </div>

            <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Award size={18} color="#00e5ff" />
                <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  {totalListings} ACCOUNTS
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Verified Offers</div>
            </div>

            <div
              onClick={onOpenReviews}
              style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', cursor: 'pointer' }}
              title="Click to view reviews"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Star size={18} color="#f5bc54" fill="#f5bc54" />
                <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  5.0 REVIEWS
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>See PlayerAuctions & Eldorado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
