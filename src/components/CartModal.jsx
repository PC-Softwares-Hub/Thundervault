import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShieldCheck, MessageSquare, CreditCard, Send, Lock } from 'lucide-react';

export const CartModal = ({ isOpen, onClose, cartItems, onRemoveFromCart, onClearCart }) => {
  if (!isOpen) return null;

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [customerContact, setCustomerContact] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('crypto');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutComplete(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'rgba(4, 6, 9, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '650px',
        maxHeight: '90vh',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-gold)',
        overflowY: 'auto',
        position: 'relative',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-bright)' }}>
              SAVED ACCOUNTS & INQUIRY CART ({cartItems.length})
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Review selected War Thunder listings for instant credentials transfer.
            </p>
          </div>
          <button
            onClick={() => { setCheckoutComplete(false); onClose(); }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {checkoutComplete ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={64} color="#34d399" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              ORDER INQUIRY SUBMITTED!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Our support team has locked these credentials for you. Reach out on Discord or Telegram to finalize instant email delivery.
            </p>
            <div style={{
              background: 'var(--bg-input)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>DISCORD SUPPORT CONTACT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                WarThunderVault_Support#1337
              </div>
            </div>
            <button
              onClick={() => {
                onClearCart();
                setCheckoutComplete(false);
                onClose();
              }}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Your inquiry cart is empty.</p>
                <button onClick={onClose} className="btn-outline-gold">
                  Browse Account Catalog
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          style={{ width: '55px', height: '45px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                        />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: 'var(--text-bright)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            {item.nation} • {item.rank} • {item.silverLions} SL
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#fff' }}>
                          ${item.price}
                        </span>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#f87171',
                            border: 'none',
                            padding: '0.4rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Checkout Form */}
                <form onSubmit={handleCheckoutSubmit} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL AMOUNT:</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent-gold-light)' }}>
                      ${totalPrice} USD
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                      YOUR DISCORD / TELEGRAM / EMAIL HANDLE *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Discord: Pilot#1234 or Telegram: @wt_buyer"
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem',
                        color: 'var(--text-bright)',
                        fontSize: '0.875rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                    <Send size={18} /> Confirm Order Inquiry & Reserve Account
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
