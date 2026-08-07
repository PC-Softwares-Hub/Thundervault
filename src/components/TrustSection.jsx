import React from 'react';
import { ShieldCheck, Star, ExternalLink, Award, Lock, Zap, MessageSquare, CheckCircle2 } from 'lucide-react';

export const TrustSection = () => {
  const PLAYERAUCTIONS_URL = "https://www.playerauctions.com/store/accounts_seller/feedback/";
  const ELDORADO_URL = "https://www.eldorado.gg/users/JumpyFlag-Upsh/reviews";

  return (
    <section style={{
      padding: '4rem 0',
      background: 'rgba(10, 13, 19, 0.6)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} /> 100% LEGIT & REPUTABLE SELLER
          </div>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '0.75rem' }}>
            WHY TRUST US? VERIFIED REVIEWS & GUARANTEES
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
            We are top-rated sellers on major global gaming platforms like PlayerAuctions and Eldorado.gg with hundreds of satisfied buyers!
          </p>
        </div>

        {/* Verified Seller Platform Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* PlayerAuctions Card */}
          <div className="glass-panel glass-panel-hover" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(229,169,59,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span className="badge badge-gold">PlayerAuctions Verified</span>
                <div style={{ display: 'flex', color: '#f5bc54' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f5bc54" />
                  ))}
                </div>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                PLAYERAUCTIONS STORE FEEDBACK
              </h3>

              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                100% Positive feedback rating on PlayerAuctions marketplace. Verified identity with clean sales history.
              </div>
            </div>

            <a
              href={PLAYERAUCTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold"
              style={{ justifyContent: 'center', width: '100%' }}
            >
              Check PlayerAuctions Reviews <ExternalLink size={15} />
            </a>
          </div>

          {/* Eldorado.gg Card */}
          <div className="glass-panel glass-panel-hover" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(0,229,255,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span className="badge badge-cyan">Eldorado.gg Verified</span>
                <div style={{ display: 'flex', color: '#00e5ff' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#00e5ff" />
                  ))}
                </div>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                ELDORADO.GG SELLER: JumpyFlag-Upsh
              </h3>

              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Official 5-Star verified Eldorado seller profile (<strong style={{ color: 'var(--accent-cyan)' }}>JumpyFlag-Upsh</strong>) with instant delivery reputation.
              </div>
            </div>

            <a
              href={ELDORADO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center', width: '100%', color: 'var(--accent-cyan)', borderColor: 'rgba(0,229,255,0.4)' }}
            >
              Check Eldorado Seller Reviews <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Lock size={20} color="#10b981" />
              <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>Full Native Email Access</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              You get 100% complete ownership of the original native email tied to the War Thunder account.
            </p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Zap size={20} color="#e5a93b" />
              <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>5-Min Instant Delivery</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Account credentials and email details are transferred immediately via Discord after purchase.
            </p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={20} color="#00e5ff" />
              <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>Zero Ban Guarantee</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Clean hand-farmed accounts with zero bans, warnings, or restrictions. Guaranteed safe.
            </p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <MessageSquare size={20} color="#5865F2" />
              <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>24/7 Discord Support</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Personal assistance and step-by-step guidance on Discord whenever you need help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
