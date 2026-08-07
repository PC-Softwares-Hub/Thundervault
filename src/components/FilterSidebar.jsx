import React from 'react';
import { Filter, RefreshCw, Flag, Shield, Crosshair, DollarSign } from 'lucide-react';

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
  const nations = ['All', 'USSR', 'USA', 'Germany', 'Great Britain', 'Japan', 'China', 'Sweden'];
  const branches = ['All', 'Air', 'Ground', 'Air & Ground'];
  const ranks = ['All Ranks', 'Rank IX', 'Rank VIII', 'Rank VII', 'Rank VI'];
  const accessTypes = ['All Access', 'Full Access (Email Included)', 'Gaijin Direct'];

  return (
    <aside className="glass-panel" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      height: 'fit-content',
      position: 'sticky',
      top: '90px'
    }}>
      {/* Header & Reset */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#e5a93b" />
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>FILTER ACCOUNTS</h3>
        </div>
        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      {/* Nation Filter */}
      <div>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--text-bright)',
          marginBottom: '0.6rem',
          textTransform: 'uppercase'
        }}>
          <Flag size={14} color="#00e5ff" /> Nation / Country
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {nations.map((nation) => {
            const active = selectedNation === nation;
            return (
              <button
                key={nation}
                onClick={() => setSelectedNation(nation)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: active ? '700' : '500',
                  background: active ? 'rgba(229,169,59,0.18)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#f5bc54' : 'var(--text-main)',
                  border: active ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {nation === 'USSR' ? '🇷🇺 USSR / Russia' : nation === 'USA' ? '🇺🇸 USA' : nation === 'Germany' ? '🇩🇪 Germany' : nation}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rank Filter */}
      <div>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--text-bright)',
          marginBottom: '0.6rem',
          textTransform: 'uppercase'
        }}>
          <Crosshair size={14} color="#c084fc" /> Maximum Rank
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
          {ranks.map((rank) => {
            const active = selectedRank === rank;
            return (
              <button
                key={rank}
                onClick={() => setSelectedRank(rank)}
                style={{
                  padding: '0.4rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: active ? '700' : '500',
                  background: active ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#c084fc' : 'var(--text-main)',
                  border: active ? '1px solid #9333ea' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {rank}
              </button>
            );
          })}
        </div>
      </div>

      {/* Branch Filter */}
      <div>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--text-bright)',
          marginBottom: '0.6rem',
          textTransform: 'uppercase'
        }}>
          Branch Type
        </label>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {branches.map((branch) => {
            const active = selectedBranch === branch;
            return (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: active ? '700' : '500',
                  background: active ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.04)',
                  color: active ? 'var(--accent-cyan)' : 'var(--text-main)',
                  border: active ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                {branch}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: 'var(--text-bright)',
            textTransform: 'uppercase'
          }}>
            <DollarSign size={14} color="#10b981" /> Max Price
          </label>
          <span style={{ color: '#34d399', fontWeight: '700', fontSize: '0.875rem' }}>
            ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="800"
          step="25"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--accent-gold)',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          <span>$50</span>
          <span>$800+</span>
        </div>
      </div>
    </aside>
  );
};
