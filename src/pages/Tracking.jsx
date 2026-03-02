import { useState } from 'react'
import { Search, Package, CheckCircle, Clock, Truck, Home } from 'lucide-react'
import { mockOrders } from '../data/orders'

const statusIcons = {
  ordered: Package, harvesting: '🌿', packed: Package, out_for_delivery: Truck, delivered: Home
}

const statusColors = {
  ordered: '#1565C0', harvesting: '#2E7D32', packed: '#6A1B9A', out_for_delivery: '#E65100', delivered: '#2E7D32'
}

export default function Tracking() {
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const search = () => {
    const found = mockOrders.find(o => o.id.toLowerCase() === query.toLowerCase().trim())
    if (found) { setOrder(found); setNotFound(false) }
    else { setOrder(null); setNotFound(true) }
  }

  const doneSteps = order?.timeline.filter(t => t.done).length || 0
  const totalSteps = order?.timeline.length || 5

  return (
    <div className="page-enter" style={{ paddingTop: 80, minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)', padding: '56px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
            Track Your Order
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Enter your order ID to see real-time status.</p>

          <div style={{ display: 'flex', gap: 10, maxWidth: 500, margin: '0 auto', flexWrap: 'wrap' }}>
            <input className="form-input" style={{ flex: 1, background: 'white' }} placeholder="e.g. MH-ORD-2024" value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()} />
            <button className="btn btn-primary" onClick={search}>
              <Search size={16} /> Track
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10 }}>
            Try: <button onClick={() => { setQuery('MH-ORD-2024'); setTimeout(search, 50) }} style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>MH-ORD-2024</button> or <button onClick={() => { setQuery('MH-ORD-2023'); setTimeout(() => { const found = mockOrders.find(o => o.id === 'MH-ORD-2023'); setOrder(found); setNotFound(false); }, 50) }} style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}>MH-ORD-2023</button>
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {notFound && (
          <div className="card" style={{ padding: 40, textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
            <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Order Not Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Check the order ID and try again. Order IDs look like MH-ORD-XXXX.</p>
          </div>
        )}

        {order && (
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Header card */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Order ID</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>{order.id}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{order.date} · Delivery: {order.deliverySlot}</div>
                </div>
                <div style={{ background: statusColors[order.status] + '15', color: statusColors[order.status], padding: '6px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600, border: `1.5px solid ${statusColors[order.status]}30` }}>
                  {order.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Progress</span><span>{doneSteps}/{totalSteps} steps</span>
                </div>
                <div style={{ height: 8, background: 'var(--cream)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(doneSteps / totalSteps) * 100}%`, background: 'var(--green)', borderRadius: 99, transition: 'width .5s' }} />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: 28 }}>
              <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 20 }}>Delivery Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {order.timeline.map((step, i) => (
                  <div key={step.status} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                    {i < order.timeline.length - 1 && (
                      <div style={{ position: 'absolute', left: 15, top: 30, bottom: -4, width: 2, background: step.done ? 'var(--green)' : 'var(--border)', zIndex: 0 }} />
                    )}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                      background: step.done ? 'var(--green)' : 'var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <CheckCircle size={16} color="white" />
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: step.done ? 'var(--text)' : 'var(--text-muted)' }}>{step.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Order Items</h3>
              {order.items.map(item => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 14 }}>{item.name} <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>({item.qty})</span></span>
                  <span style={{ fontWeight: 600, color: 'var(--green)' }}>₹{item.price}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, fontWeight: 700, fontSize: 16 }}>
                <span>Total</span><span style={{ color: 'var(--green)' }}>₹{order.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
