import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { mockOrders } from '../data/orders'
import { Package, CreditCard, Gift, MapPin, ChevronRight, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('orders')

  if (!user) return <Navigate to="/login" state={{ from: '/dashboard' }} replace />

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={16} /> },
    { id: 'subscription', label: 'Subscription', icon: <Clock size={16} /> },
    { id: 'wallet', label: 'Wallet & Referral', icon: <CreditCard size={16} /> },
    { id: 'address', label: 'Address', icon: <MapPin size={16} /> },
  ]

  return (
    <div className="page-enter" style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--green) 0%, #1B5E20 100%)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.2)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            👤
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 4 }}>
              Hey, {user.name.split(' ')[0]}! 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{user.email}</p>
          </div>
          {user.subscription && (
            <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '12px 20px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Active Plan</div>
              <div style={{ color: 'white', fontWeight: 700 }}>{user.subscription.plan}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Next: {user.subscription.nextDelivery}</div>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }} className="dashboard-grid">
          {/* Sidebar */}
          <div className="card" style={{ padding: 12, position: 'sticky', top: 80 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
                background: tab === t.id ? 'var(--green-pale)' : 'transparent',
                color: tab === t.id ? 'var(--green)' : 'var(--text)',
                transition: 'all .2s', textAlign: 'left'
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {tab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>My Orders</h2>
                {mockOrders.map(order => (
                  <div key={order.id} className="card" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{order.id}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{order.date}</div>
                      </div>
                      <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: order.status === 'delivered' ? '#E8F5E9' : '#FFF3E0', color: order.status === 'delivered' ? 'var(--green)' : '#E65100' }}>
                        {order.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                      {order.items.map(i => (
                        <span key={i.name} className="badge badge-green" style={{ fontSize: 12 }}>{i.name}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-muted)' }}>
                      <span>Total: <strong style={{ color: 'var(--green)' }}>₹{order.total}</strong></span>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'subscription' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>My Subscription</h2>
                <div className="card" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 24, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{user.subscription.plan}</div>
                      <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Status: <span style={{ color: 'var(--green)', fontWeight: 600 }}>Active ✓</span></div>
                    </div>
                    <button className="btn btn-outline btn-sm">Change Plan</button>
                  </div>
                  <div style={{ background: 'var(--cream)', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Next Delivery</div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{user.subscription.nextDelivery}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>10:00 AM – 1:00 PM · Your saved address</div>
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline btn-sm">Pause Delivery</button>
                    <button className="btn btn-sm" style={{ background: '#FFEBEE', color: '#C62828', border: 'none' }}>Cancel Plan</button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'wallet' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Wallet & Referral</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }} className="wallet-grid">
                  <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, var(--green) 0%, #1B5E20 100%)' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Wallet Balance</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)' }}>₹{user.wallet}</div>
                    <button style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>Add Money</button>
                  </div>
                  <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Referral Earned</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--brown)', fontFamily: 'var(--font-display)' }}>₹{user.referralEarned}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>from 4 referrals</div>
                  </div>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontWeight: 600, marginBottom: 12 }}>Your Referral Code</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ background: 'var(--cream)', border: '1.5px dashed var(--border)', borderRadius: 10, padding: '12px 20px', fontFamily: 'monospace', fontWeight: 700, fontSize: 18, letterSpacing: 2, color: 'var(--green)', flex: 1, textAlign: 'center' }}>
                      {user.referralCode}
                    </div>
                    <button className="btn btn-primary btn-sm">Copy</button>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>
                    Share this code with friends. You earn ₹100 for every friend who places their first order.
                  </p>
                </div>
              </div>
            )}

            {tab === 'address' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Saved Addresses</h2>
                <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ width: 40, height: 40, background: 'var(--green-pale)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MapPin size={18} color="var(--green)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Home <span className="badge badge-green" style={{ fontSize: 10, marginLeft: 6 }}>Default</span></div>
                        <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{user.address}</div>
                      </div>
                    </div>
                    <button className="btn btn-outline btn-sm">Edit</button>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
          .wallet-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
