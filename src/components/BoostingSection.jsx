import React, { useState } from 'react';
import { Rocket, Zap, ShieldCheck, CheckCircle2, MessageSquare, Star, ArrowRight, Award, Crown, Calculator } from 'lucide-react';
import { DISCORD_SERVER_LINK } from '../data/initialProducts';

export const BoostingSection = () => {
  const [rpAmount, setRpAmount] = useState(100); // In thousands (100 = 100k)

  const price = (rpAmount / 100) * 5;

  const handleOrderBoosting = () => {
    const message = `Hello! I would like to order War Thunder Power Boosting Service:\n\n🚀 **Package:** ${rpAmount * 1000} RP (${rpAmount}k Research Points)\n💵 **Price:** $${price} USD\n✅ **Requirements Met:** Rank 7+, Premium Vehicle, Active Premium Account`;

    try {
      navigator.clipboard.writeText(message);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }

    window.open(DISCORD_SERVER_LINK, '_blank');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      marginBottom: '2.5rem',
      border: '1px solid var(--border-gold)',
      background: 'linear-gradient(135deg, rgba(28, 35, 51, 0.9) 0%, rgba(13, 17, 23, 0.95) 100%)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-glow-gold)'
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '240px',
        height: '240px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center'
      }} className="main-layout-grid">
        
        {/* Left Side: Boosting Deal Details & Requirements */}
        <div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              <Rocket size={14} color="#fbbf24" /> FAST POWER BOOSTING SERVICE
            </span>
            <span className="badge badge-red" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              🔥 SPECIAL DEAL: 100K RP = $5
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            lineHeight: 1.2,
            marginBottom: '0.75rem'
          }}>
            GET <span className="gold-gradient-text">100K RP FOR JUST $5!</span>
          </h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Supercharge your War Thunder research tree! Our elite pro pilots farm Research Points directly on your account safely with maximum efficiency.
          </p>

          {/* Requirements Box */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: '800',
              color: 'var(--accent-gold-light)',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              🚀 BOOSTING REQUIREMENTS:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span><strong>Rank 7 or above</strong> unlocked in target tree</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span><strong>Premium Vehicle</strong> in lineup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <Crown size={16} color="#06b6d4" />
                <span><strong>Active Premium Account</strong> time</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleOrderBoosting}
              className="btn-primary"
              style={{ padding: '0.8rem 1.6rem', fontSize: '0.9rem' }}
            >
              <Rocket size={18} /> ORDER BOOSTING ON DISCORD
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={15} color="#34d399" /> 100% Safe & Hand-Farmed
            </div>
          </div>
        </div>

        {/* Right Side: Interactive RP Calculator */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '800',
            color: 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginBottom: '1rem'
          }}>
            <Calculator size={16} /> INTERACTIVE RP COST CALCULATOR
          </div>

          {/* Amount Display */}
          <div style={{
            background: 'var(--bg-darker)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid var(--border-gold)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CHOSEN RESEARCH POINTS</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
              {(rpAmount * 1000).toLocaleString()} <span style={{ color: 'var(--accent-gold)' }}>RP</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#34d399', marginTop: '0.2rem' }}>
              Price: ${price} USD
            </div>
          </div>

          {/* RP Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={rpAmount}
              onChange={(e) => setRpAmount(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--accent-gold)',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
              <span>100k RP ($5)</span>
              <span>500k RP ($25)</span>
              <span>1M RP ($50)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[100, 200, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setRpAmount(amt)}
                className={rpAmount === amt ? 'badge badge-gold' : 'badge badge-dark'}
                style={{
                  cursor: 'pointer',
                  justifyContent: 'center',
                  padding: '0.4rem 0.2rem',
                  fontSize: '0.7rem'
                }}
              >
                {amt >= 1000 ? `${amt / 1000}M RP` : `${amt}k RP`}
              </button>
            ))}
          </div>

          <button
            onClick={handleOrderBoosting}
            className="btn-secondary"
            style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '0.85rem',
              borderColor: '#5865F2',
              color: '#5865F2'
            }}
          >
            <MessageSquare size={16} /> Order {(rpAmount * 1000).toLocaleString()} RP on Discord
          </button>
        </div>
      </div>
    </div>
  );
};
