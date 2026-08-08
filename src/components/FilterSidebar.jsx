import React, { useState } from 'react';
import { Filter, RefreshCw, ChevronDown, ChevronUp, DollarSign, Shield, Layers, Flag } from 'lucide-react';

export const FilterSidebar = ({
  selectedNation,
  setSelectedNation,
  selectedBranch,
  setSelectedBranch,
  selectedRank,
  setSelectedRank,
  selectedAccess,
  setSelectedAccess,
  maxPrice,
  setMaxPrice,
  onReset
}) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const NATIONS = [
    { label: 'All', value: 'All' },
    { label: 'USSR / Russia', value: 'USSR' },
    { label: 'USA', value: 'USA' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Great Britain', value: 'Great Britain' },
    { label: 'Japan', value: 'Japan' },
    { label: 'China', value: 'China' },
    { label: 'Sweden', value: 'Sweden' },
  ];

  const BRANCHES = ['All', 'Air', 'Ground', 'Air & Ground'];
  const RANKS = ['All Ranks', 'Rank IX', 'Rank VIII', 'Rank VII', 'Rank VI'];

  return (
    <div className="glass-panel filter-sidebar-container" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      height: 'fit-content'
    }}>
      {/* Sidebar Header with Mobile Expand Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1rem' }}>
          <Filter size={18} color="var(--accent-gold)" />
          <span style={{ color: 'var(--text-bright)' }}>FILTER ACCOUNTS</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onReset}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              cursor: 'pointer'
            }}
            title="Reset Filters"
          >
            <RefreshCw size={13} /> Reset
          </button>

          {/* Mobile Expand Toggle Button */}
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'none',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
          >
            {isMobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Filter Body Content (Collapsible on Mobile) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Nation / Country */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            <Flag size={14} color="var(--accent-cyan)" /> NATION / COUNTRY
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {NATIONS.map((n) => (
              <button
                key={n.value}
                onClick={() => setSelectedNation(n.value)}
                className={selectedNation === n.value ? 'badge badge-gold' : 'badge badge-dark'}
                style={{
                  cursor: 'pointer',
                  fontSize: '0.725rem',
                  padding: '0.35rem 0.65rem'
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Rank */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            <Shield size={14} color="var(--accent-purple)" /> MAXIMUM RANK
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            {RANKS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRank(r)}
                className={selectedRank === r ? 'badge badge-purple' : 'badge badge-dark'}
                style={{
                  cursor: 'pointer',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  padding: '0.35rem 0.5rem'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Type */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
            <Layers size={14} color="var(--accent-cyan)" /> BRANCH TYPE
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {BRANCHES.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={selectedBranch === b ? 'badge badge-cyan' : 'badge badge-dark'}
                style={{
                  cursor: 'pointer',
                  fontSize: '0.725rem',
                  padding: '0.35rem 0.65rem'
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              <DollarSign size={14} color="#10b981" /> MAX PRICE
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10b981' }}>
              ${maxPrice}
            </span>
          </div>

          <input
            type="range"
            min="50"
            max="800"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-gold)',
              cursor: 'pointer'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            <span>$50</span>
            <span>$800+</span>
          </div>
        </div>
      </div>
    </div>
  );
};
