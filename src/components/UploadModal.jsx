import React, { useState, useEffect } from 'react';
import { X, UploadCloud, Image as ImageIcon, Trash2, Plus, Sparkles, Check, Download, Copy, ExternalLink, HardDrive, Star, ArrowLeft, ArrowRight, Link } from 'lucide-react';
import { parseTitleTags } from '../data/initialProducts';
import { convertGoogleDriveUrl } from '../utils/driveConverter';

export const UploadModal = ({ isOpen, onClose, onSaveProduct, editingProduct, allProducts }) => {
  if (!isOpen) return null;

  const DEFAULT_TITLE_EXAMPLE = "Special Discount | Full Access | Su-30SM2 |Mig-29 (9-12) | Su-25K | 4.2M Silver Lions | russia top tier account | Rank IX air";

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [nation, setNation] = useState('USSR');
  const [branch, setBranch] = useState('Air');
  const [rank, setRank] = useState('Rank IX');
  const [silverLions, setSilverLions] = useState('4,200,000');
  const [goldenEagles, setGoldenEagles] = useState('2,500');
  const [accessType, setAccessType] = useState('Full Access (Email Included)');
  const [featuredVehicles, setFeaturedVehicles] = useState('Su-30SM2, MiG-29 (9-12), Su-25K');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title || '');
      setPrice(editingProduct.price || '');
      setOriginalPrice(editingProduct.originalPrice || '');
      setNation(editingProduct.nation || 'USSR');
      setBranch(editingProduct.branch || 'Air');
      setRank(editingProduct.rank || 'Rank IX');
      setSilverLions(editingProduct.silverLions || '4,200,000');
      setGoldenEagles(editingProduct.goldenEagles || '0');
      setAccessType(editingProduct.accessType || 'Full Access (Email Included)');
      setFeaturedVehicles(editingProduct.featuredVehicles ? editingProduct.featuredVehicles.join(', ') : '');
      setDescription(editingProduct.description || '');
      setImages(editingProduct.images || []);
    } else {
      setTitle('');
      setPrice('');
      setOriginalPrice('');
      setNation('USSR');
      setBranch('Air');
      setRank('Rank IX');
      setSilverLions('4,200,000');
      setGoldenEagles('2,500');
      setAccessType('Full Access (Email Included)');
      setFeaturedVehicles('Su-30SM2, MiG-29 (9-12), Su-25K');
      setDescription('Stacked War Thunder Russia top tier account. Features Su-30SM2, MiG-29 (9-12), Su-25K premium, 4.2M Silver Lions, and full native mail access.');
      setImages([]);
    }
  }, [editingProduct, isOpen]);

  // File Upload via FileReader
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages((prev) => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Add image by URL (ImgBB, Google Drive, or Direct Link)
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    const convertedUrl = convertGoogleDriveUrl(imageUrlInput.trim());
    setImages((prev) => [...prev, convertedUrl]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetMainImage = (indexToMakeMain) => {
    if (indexToMakeMain === 0) return;
    setImages((prev) => {
      const updated = [...prev];
      const selectedImage = updated.splice(indexToMakeMain, 1)[0];
      updated.unshift(selectedImage);
      return updated;
    });
  };

  const handleMoveImageLeft = (index) => {
    if (index <= 0) return;
    setImages((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return updated;
    });
  };

  const handleMoveImageRight = (index) => {
    if (index >= images.length - 1) return;
    setImages((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated;
    });
  };

  const handleApplyPresetExample = () => {
    setTitle(DEFAULT_TITLE_EXAMPLE);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert('Please fill in the title and price.');
      return;
    }

    const priceNum = parseFloat(price);
    const origPriceNum = originalPrice ? parseFloat(originalPrice) : null;
    const discount = (origPriceNum && origPriceNum > priceNum)
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
      : 0;

    const vehiclesArray = featuredVehicles
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);

    const newProduct = {
      id: editingProduct ? editingProduct.id : `wt-acc-${Date.now()}`,
      title,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercentage: discount,
      nation,
      branch,
      rank,
      silverLions: silverLions || '0',
      goldenEagles: goldenEagles || '0',
      accessType,
      featuredVehicles: vehiclesArray,
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800'
      ],
      description: description || 'No description provided.',
      createdDate: new Date().toISOString().split('T')[0]
    };

    onSaveProduct(newProduct);
    onClose();
  };

  const parsedBadges = parseTitleTags(title);

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
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '880px',
        maxHeight: '92vh',
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
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-bright)' }}>
              {editingProduct ? 'EDIT WAR THUNDER ACCOUNT' : 'UPLOAD NEW WAR THUNDER ACCOUNT'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Upload local PC screenshots or paste ImgBB / Drive image links. First picture is your Main Cover!
            </p>
          </div>
          <button
            onClick={onClose}
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)' }}>
                PRODUCT LISTING TITLE *
              </label>
              <button
                type="button"
                onClick={handleApplyPresetExample}
                className="btn-outline-gold"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}
              >
                Fill Example Title
              </button>
            </div>
            <textarea
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Special Discount | Full Access | Su-30SM2 |Mig-29 (9-12) | Su-25K | 4.2M Silver Lions | russia top tier account | Rank IX air"
              required
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                color: 'var(--text-bright)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            {parsedBadges.length > 0 && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '600' }}>AUTO DETECTED BADGES:</span>
                {parsedBadges.map((b, idx) => (
                  <span key={idx} className={`badge badge-${b.type}`} style={{ fontSize: '0.65rem' }}>
                    {b.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ImgBB / Google Drive / File Upload Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)' }}>
                ACCOUNT SCREENSHOTS & PICS ({images.length} Added)
              </label>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>
                ⭐ Tip: Click "Make Main" or use arrows to set cover picture!
              </span>
            </div>

            {/* ImgBB / Direct Image URL Input */}
            <div style={{
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                <Link size={16} /> PASTE IMGBB, GOOGLE DRIVE OR DIRECT IMAGE LINK
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="url"
                  placeholder="e.g. https://i.ibb.co/XYZ/screenshot.png or Google Drive link"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.55rem 0.75rem',
                    color: 'var(--text-bright)',
                    fontSize: '0.825rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                >
                  <Plus size={15} /> Add Link
                </button>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Supports <strong style={{ color: 'var(--accent-cyan)' }}>ImgBB direct links</strong>, Imgur, Google Drive, and Discord attachments!
              </div>
            </div>

            {/* Local File Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed var(--accent-gold)' : '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                background: dragActive ? 'rgba(245,158,11,0.05)' : 'var(--bg-input)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%'
                }}
              />
              <UploadCloud size={30} color={dragActive ? '#f59e0b' : '#64748b'} style={{ margin: '0 auto 0.4rem' }} />
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-bright)' }}>
                Or Click here to select local screenshot files from computer
              </div>
            </div>

            {/* Added Images Thumbnails Grid */}
            {images.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '0.85rem',
                marginTop: '1rem'
              }}>
                {images.map((img, idx) => {
                  const isMain = idx === 0;
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        height: '110px',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: isMain ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                        background: '#0a0d13',
                        boxShadow: isMain ? 'var(--shadow-glow-gold)' : 'none'
                      }}
                    >
                      <img src={img} alt={`Pic ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                      {isMain ? (
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                          color: '#000',
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}>
                          <Star size={10} fill="#000" /> MAIN COVER
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            background: 'rgba(0,0,0,0.75)',
                            color: 'var(--accent-gold)',
                            border: '1px solid var(--border-gold)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.65rem',
                            fontWeight: '700',
                            padding: '0.15rem 0.45rem',
                            cursor: 'pointer'
                          }}
                          title="Set as Main Thumbnail Image"
                        >
                          ⭐ Make Main
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(239,68,68,0.85)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Remove Picture"
                      >
                        <X size={12} />
                      </button>

                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        right: '4px',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImageLeft(idx)}
                            style={{
                              background: 'rgba(0,0,0,0.75)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 'var(--radius-sm)',
                              padding: '0.2rem 0.4rem',
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                            title="Move Left"
                          >
                            <ArrowLeft size={12} />
                          </button>
                        )}

                        {idx < images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImageRight(idx)}
                            style={{
                              background: 'rgba(0,0,0,0.75)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 'var(--radius-sm)',
                              padding: '0.2rem 0.4rem',
                              fontSize: '0.7rem',
                              cursor: 'pointer',
                              marginLeft: 'auto'
                            }}
                            title="Move Right"
                          >
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price & Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                PRICE ($ USD) *
              </label>
              <input
                type="number"
                placeholder="185"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                ORIGINAL PRICE ($ USD - Optional)
              </label>
              <input
                type="number"
                placeholder="240"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 0.85rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                NATION
              </label>
              <select
                value={nation}
                onChange={(e) => setNation(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="USSR">USSR / Russia</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Sweden">Sweden</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                BRANCH
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Air">Air</option>
                <option value="Ground">Ground</option>
                <option value="Air & Ground">Air & Ground</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                MAX RANK
              </label>
              <select
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Rank IX">Rank IX (Top Tier)</option>
                <option value="Rank VIII">Rank VIII</option>
                <option value="Rank VII">Rank VII</option>
                <option value="Rank VI">Rank VI</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                SILVER LIONS AMOUNT
              </label>
              <input
                type="text"
                value={silverLions}
                onChange={(e) => setSilverLions(e.target.value)}
                placeholder="4,200,000"
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                FEATURED JETS / TANKS
              </label>
              <input
                type="text"
                value={featuredVehicles}
                onChange={(e) => setFeaturedVehicles(e.target.value)}
                placeholder="Su-30SM2, MiG-29 (9-12), Su-25K"
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem',
                  color: 'var(--text-bright)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
              ACCOUNT DESCRIPTION & HIGHLIGHTS
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description details..."
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                color: 'var(--text-bright)',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <Check size={18} /> {editingProduct ? 'Update Product' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
