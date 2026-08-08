import React, { useState } from 'react';
import { Rocket, CheckCircle2, MessageSquare, Star, Crown, Calculator, ShieldCheck } from 'lucide-react';
import { DISCORD_SERVER_LINK } from '../data/initialProducts';

export const BoostingSection = () => {
  // Store RP in thousands (e.g. 100 = 100,000 RP)
  const [rpInput, setRpInput] = useState('200000');
  const [copiedMessage, setCopiedMessage] = useState('');

  // Extract numeric RP value
  const numericRp = Math.max(0, parseInt(rpInput.toString().replace(/,/g, ''), 10) || 0);
  const rpInThousands = numericRp / 1000;
  const price = (rpInThousands / 100) * 5;

  const formattedRpNumber = numericRp.toLocaleString();

  const handleOrderBoosting = () => {
    if (numericRp <= 0) {
      alert('Please enter a valid RP amount.');
      return;
    }

    const message = `Hello sky0285_24091! I would like to order War Thunder RP Boosting:\n\n🚀 **Package:** ${formattedRpNumber} RP (${rpInThousands}k RP)\n💵 **Price:** $${price.toFixed(2)} USD\n👤 **Seller Discord:** @sky0285_24091\n✅ **Requirements Met:** Rank 7+, Premium Vehicle, Active Premium Account`;

    try {
      navigator.clipboard.writeText(message);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }

    setCopiedMessage(`Order copied to clipboard! Opening Discord to message @sky0285_24091...`);
    setTimeout(() => setCopiedMessage(''), 5000);

    window.open(DISCORD_SERVER_LINK, '_blank');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      marginBottom: '2rem',
      border: '1px solid var(--border-gold)',
      background: 'linear-gradient(135deg, rgba(28, 35, 51, 0.9) 0%, rgba(13, 17, 23, 0.95) 100%)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-glow-gold)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center'
      }} className="main-layout-grid">
        
        {/* Left Side: Offer & Requirements */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              <Rocket size={14} color="#fbbf24" /> WAR THUNDER RP BOOSTING
            </span>
            <span className="badge badge-red" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
              🔥 100K RP = $5
            </span>
          </div>

          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}>
            GET <span className="gold-gradient-text">100K RP FOR JUST $5!</span>
          </h2>

          {/* Requirements Box */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem'
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
              🚀 REQUIREMENTS:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span>Rank 7 or above</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span>Premium vehicle</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-bright)' }}>
                <Crown size={16} color="#06b6d4" />
                <span>Active Premium account</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleOrderBoosting}
              className="btn-primary"
              style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}
            >
              <MessageSquare size={18} /> ORDER {formattedRpNumber} RP ON DISCORD
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Direct message seller: <strong style={{ color: '#5865F2' }}>sky0285_24091</strong>
            </div>
          </div>
        </div>

        {/* Right Side: RP Cost Calculator */}
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
            <Calculator size={16} /> RP COST CALCULATOR
          </div>

          {/* Custom Input Box */}
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              ENTER CUSTOM RP AMOUNT:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="200000"
                step="10000"
                value={rpInput}
                onChange={(e) => setRpInput(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  color: 'var(--text-bright)',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  outline: 'none'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent-gold)',
                fontWeight: '800',
                fontSize: '0.85rem'
              }}>
                RP
              </span>
            </div>
          </div>

          {/* Amount & Price Output Box */}
          <div style={{
            background: 'var(--bg-darker)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid var(--border-gold)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CALCULATED PACKAGE PRICE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
              {formattedRpNumber} <span style={{ color: 'var(--accent-gold)' }}>RP</span>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#34d399', marginTop: '0.2rem' }}>
              Price: ${price.toFixed(2)} USD
            </div>
          </div>

          {/* Quick Presets Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[100000, 200000, 500000, 1000000].map((amt) => (
              <button
                key={amt}
                onClick={() => setRpInput(amt.toString())}
                className={numericRp === amt ? 'badge badge-gold' : 'badge badge-dark'}
                style={{
                  cursor: 'pointer',
                  justifyContent: 'center',
                  padding: '0.45rem 0.2rem',
                  fontSize: '0.7rem'
                }}
              >
                {amt >= 1000000 ? `${amt / 1000000}M RP` : `${amt / 1000}k RP`}
              </button>
            ))}
          </div>

          <button
            onClick={handleOrderBoosting}
            className="btn-secondary"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.85rem',
              borderColor: '#5865F2',
              color: '#5865F2'
            }}
          >
            <MessageSquare size={16} /> ORDER {formattedRpNumber} RP ON DISCORD
          </button>

          {copiedMessage && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.775rem', color: '#34d399', fontWeight: '700' }}>
              {copiedMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
