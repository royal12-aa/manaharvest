import { Star, MapPin, Sprout, Package } from 'lucide-react'
import { farmers } from '../data/farmers'
import { products } from '../data/products'
import { Link } from 'react-router-dom'

export default function Farmers() {
  const getFarmerProducts = (id) => products.filter(p => p.farmerId === id)

  return (
    <div className="page-enter" style={{ paddingTop: 80 }}>
      <div style={{ background: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Meet Our Farmers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Every vegetable has a face behind it. These are the hands that grow your food.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {farmers.map((f, i) => (
            <div key={f.id} id={`farmer-${f.id}`} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 260 }} className="farmer-card-grid">
                {/* Left - photo/color block */}
                <div style={{
                  background: i % 2 === 0 ? 'linear-gradient(160deg, var(--green) 0%, #1B5E20 100%)' : 'linear-gradient(160deg, var(--brown) 0%, #4E342E 100%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12
                }}>
                  <div style={{ fontSize: 64 }}>{f.emoji}</div>
                  <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, textAlign: 'center' }}>{f.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                    <MapPin size={12} /> {f.village}, {f.district}
                  </div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4 }}>
                    <Star size={14} color="#F9A825" fill="#F9A825" />
                    <span style={{ color: 'white', fontWeight: 700 }}>{f.rating}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>({f.totalOrders} orders)</span>
                  </div>
                </div>

                {/* Right - details */}
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                      <Sprout size={14} color="var(--green)" />
                      {f.yearsfarming} years farming
                    </div>
                    {f.certifications.map(c => (
                      <span key={c} className="badge badge-green" style={{ fontSize: 11 }}>{c}</span>
                    ))}
                  </div>

                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text)', marginBottom: 20, maxWidth: 520 }}>{f.story}</p>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginBottom: 8 }}>Crops Grown</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {f.crops.map(c => <span key={c} className="badge badge-brown">{c}</span>)}
                    </div>
                  </div>

                  {/* Today's products from this farmer */}
                  {getFarmerProducts(f.id).length > 0 && (
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', marginBottom: 8 }}>
                        Available Today
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {getFarmerProducts(f.id).map(p => (
                          <Link key={p.id} to="/harvest" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 99, padding: '6px 12px', fontSize: 13, color: 'var(--text)', textDecoration: 'none' }}>
                            <span>{p.emoji}</span> {p.name} <span style={{ color: 'var(--green)', fontWeight: 600 }}>₹{p.price}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .farmer-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
