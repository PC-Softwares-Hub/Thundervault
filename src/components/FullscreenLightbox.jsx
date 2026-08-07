import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

export const FullscreenLightbox = ({ images, initialIndex = 0, onClose }) => {
  if (!images || images.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentImage = images[currentIndex] || images[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const nextZoom = Math.max(prev - 0.5, 1);
      if (nextZoom === 1) setPosition({ x: 0, y: 0 });
      return nextZoom;
    });
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation & Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Drag to pan when zoomed in
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(3, 4, 6, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem',
        userSelect: 'none'
      }}
    >
      {/* Top Controls Toolbar */}
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem', fontWeight: '700' }}>
          <Maximize2 size={18} color="#e5a93b" />
          <span>SCREENSHOT {currentIndex + 1} OF {images.length}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: '400', marginLeft: '0.5rem' }}>
            ({Math.round(zoomLevel * 100)}% Zoom)
          </span>
        </div>

        {/* Zoom & Close Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleZoomIn}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}
            title="Zoom In (+)"
          >
            <ZoomIn size={16} /> Zoom In
          </button>
          
          <button
            onClick={handleZoomOut}
            className="btn-secondary"
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}
            title="Zoom Out (-)"
          >
            <ZoomOut size={16} /> Zoom Out
          </button>

          {zoomLevel > 1 && (
            <button
              onClick={resetZoom}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}
              title="Reset Zoom"
            >
              <RotateCcw size={16} /> Reset
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#f87171',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '0.5rem'
            }}
            title="Close Fullscreen View (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Display Box with Zoom & Pan */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
      }}>
        {/* Previous Arrow */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '1.5rem',
              zIndex: 10,
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              border: '1px solid var(--border-medium)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Scaled Image */}
        <img
          src={currentImage}
          alt={`Full Screenshot ${currentIndex + 1}`}
          onMouseDown={handleMouseDown}
          onClick={() => {
            if (zoomLevel === 1) handleZoomIn();
          }}
          style={{
            maxWidth: '92%',
            maxHeight: '85vh',
            objectFit: 'contain',
            transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
            transition: isDragging ? 'none' : 'transform 0.25s ease-out',
            boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            borderRadius: 'var(--radius-sm)'
          }}
        />

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '1.5rem',
              zIndex: 10,
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              border: '1px solid var(--border-medium)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
            title="Next Image (Right Arrow)"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Strip Slider */}
      {images.length > 1 && (
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          padding: '0.6rem 1rem',
          background: 'rgba(15, 20, 30, 0.8)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          zIndex: 10
        }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                resetZoom();
              }}
              style={{
                width: '70px',
                height: '45px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: currentIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                opacity: currentIndex === idx ? 1 : 0.5,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
