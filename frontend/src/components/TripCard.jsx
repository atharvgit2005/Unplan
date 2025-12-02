import { Link } from 'react-router-dom'

export default function TripCard({ trip }) {
    return (
        <Link to={`/trip/${trip.id}`} style={{ display: 'block' }} className="trip-card-link">
            <div className="glass-panel" style={{ overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', height: '100%', position: 'relative' }}>
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                    {/* Image with zoom effect on hover */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `url(${trip.image}) center/cover`,
                        transition: 'transform 0.5s ease'
                    }} className="card-image" />

                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {trip.days} Days
                    </div>
                </div>

                <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{trip.title}</h3>
                        <span style={{ fontSize: '12px', color: 'var(--accent)', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{trip.season}</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📍</span> {trip.location}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
                        <div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>Starting from</span>
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '18px' }}>${trip.price}</span>
                        </div>
                        <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '8px' }}>View Details</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
