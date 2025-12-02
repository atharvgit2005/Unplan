import TripCard from '@/components/TripCard'

// Enhanced Mock Data
const trips = [
    { id: 1, title: 'Neon Tokyo Nights', location: 'Tokyo, Japan', days: 7, price: 2400, season: 'Spring', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
    { id: 2, title: 'Swiss Alps Escape', location: 'Interlaken, Switzerland', days: 5, price: 1800, season: 'Winter', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
    { id: 3, title: 'Bali Zen Retreat', location: 'Ubud, Bali', days: 10, price: 1200, season: 'Summer', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' },
    { id: 4, title: 'Northern Lights Hunt', location: 'Tromso, Norway', days: 6, price: 3000, season: 'Winter', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
    { id: 5, title: 'Santorini Sunset', location: 'Santorini, Greece', days: 8, price: 2100, season: 'Summer', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' },
    { id: 6, title: 'Machu Picchu Trek', location: 'Cusco, Peru', days: 9, price: 1600, season: 'Autumn', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80' },
    { id: 7, title: 'Safari Adventure', location: 'Serengeti, Tanzania', days: 12, price: 4500, season: 'Summer', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80' },
    { id: 8, title: 'New York City Break', location: 'New York, USA', days: 4, price: 1500, season: 'Autumn', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80' },
]

export default function Explore() {
    return (
        <div className="container" style={{ padding: '120px 20px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className="text-gradient-primary" style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>Explore Destinations</h1>
                <p style={{ color: '#888', fontSize: '18px' }}>Curated trips for every season and style.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                {trips.map((trip, index) => (
                    <div key={trip.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <TripCard trip={trip} />
                    </div>
                ))}
            </div>
        </div>
    )
}
