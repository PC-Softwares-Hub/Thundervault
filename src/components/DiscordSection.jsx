import React from 'react';
import { MessageSquare, ExternalLink, ShieldCheck, Zap, Lock, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { DISCORD_SERVER_LINK } from '../data/initialProducts';

export const DiscordSection = () => {
  return (
    <section style={{
      padding: '4rem 0',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Discord Banner Card */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(88, 101, 242, 0.4)',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(13, 16, 23, 0.95) 100%)',
          boxShadow: '0 12px 40px rgba(88, 101, 242, 0.2)',
          marginBottom: '3rem'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(88, 101, 242, 0.25)',
            border: '1px solid #5865F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 30px rgba(88, 101, 242, 0.4)'
          }}>
            <MessageSquare size={32} color="#7983f5" />
          </div>

          <div className="badge" style={{ background: 'rgba(88, 101, 242, 0.2)', color: '#7983f5', border: '1px solid #5865F2', marginBottom: '1rem' }}>
            ⚡ OFFICIAL COMMUNITY & ORDER HUB
          </div>

          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '1rem' }}>
            JOIN OUR OFFICIAL DISCORD SERVER
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Instant account credentials delivery, 24/7 direct seller support, custom account requests, and exclusive discounts for Discord members!
          </p>

          <a
            href={DISCORD_SERVER_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{
              padding: '1rem 2.2rem',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
              color: '#fff',
              boxShadow: '0 4px 25px rgba(88, 101, 242, 0.5)',
              display: 'inline-flex'
            }}
          >
            <MessageSquare size={22} /> JOIN DISCORD SERVER NOW <ExternalLink size={18} />
          </a>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1.25rem' }}>
            Direct Invite Link: <strong style={{ color: '#5865F2' }}>https://discord.gg/ppJV324MR9</strong>
          </div>
        </div>

        {/* How to Buy via Discord Steps */}
        <h3 style={{ fontSize: '1.5rem', color: '#fff', textAlign: 'center', marginBottom: '1.75rem' }}>
          HOW TO BUY AN ACCOUNT VIA DISCORD
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ background: 'var(--bg-input)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
              STEP 1
            </div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.4rem' }}>Pick Your Account</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Browse the <strong>Products</strong> tab, choose your desired top-tier jet (Su-30SM2, MiG-29, Su-25K) or nation.
            </p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
              STEP 2
            </div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.4rem' }}>Click "Buy Now"</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Clicking <strong>Buy Now</strong> automatically copies the product details to your clipboard and opens Discord.
            </p>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399', marginBottom: '0.5rem' }}>
              STEP 3
            </div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.4rem' }}>Get Instant Delivery</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Paste your request into Discord. We hand over the full native email & credentials in 5 minutes!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
