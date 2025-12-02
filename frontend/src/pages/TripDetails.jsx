import { useParams } from 'react-router-dom'

export default function TripDetails() {
    const { id } = useParams()

    // Mock fetch - in a real app, use id to fetch data
    const trip = {
        id: id || 1,
        title: 'Neon Tokyo Nights',
        location: 'Tokyo, Japan',
        days: 7,
        price: 2400,
        season: 'Spring',
        description: 'Experience the vibrant energy of Tokyo with a mix of traditional culture and futuristic technology. Visit ancient temples, bustling markets, and neon-lit districts.',
        facilities: ['WiFi', 'Breakfast', 'Pool', 'Guide'],
        weather: '15°C - 22°C',
        mapLink: 'https://maps.google.com/?q=Tokyo',
        agency: { name: 'TravelX', website: 'https://example.com' }
    }

    return (
        <div className="container" style={{ padding: '120px 20px' }}>
            <div style={{ height: '400px', background: '#333', borderRadius: '16px', marginBottom: '40px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80) center/cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>{trip.title}</h1>
                    <p style={{ fontSize: '20px', color: '#888', marginBottom: '30px' }}>{trip.location}</p>

                    <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Overview</h3>
                        <p style={{ lineHeight: '1.6', color: '#ccc' }}>{trip.description}</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Facilities</h3>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {trip.facilities.map(f => (
                                <span key={f} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px' }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="glass-panel" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--primary)' }}>${trip.price}</div>
                        <p style={{ color: '#888', marginBottom: '20px' }}>per person / {trip.days} days</p>

                        <button className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>Join Trip</button>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <strong>Weather:</strong> <span style={{ color: '#ccc' }}>{trip.weather}</span>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <strong>Agency:</strong> <a href={trip.agency.website} target="_blank" style={{ color: 'var(--secondary)' }}>{trip.agency.name}</a>
                            </div>
                            <div>
                                <a href={trip.mapLink} target="_blank" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '10px' }}>View on Map</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
