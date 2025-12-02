import { useState } from 'react'
import TripCard from '@/components/TripCard'

const myTrips = [
    { id: 1, title: 'Neon Tokyo Nights', location: 'Tokyo, Japan', days: 7, price: 2400, season: 'Spring', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
]

const wishlist = [
    { id: 3, title: 'Bali Zen Retreat', location: 'Ubud, Bali', days: 10, price: 1200, season: 'Summer', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' },
]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('organized')

    return (
        <div className="container" style={{ padding: '120px 20px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Dashboard</h1>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={() => setActiveTab('organized')}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px 20px',
                        color: activeTab === 'organized' ? 'var(--accent)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'organized' ? '2px solid var(--accent)' : 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    My Organized Trips
                </button>
                <button
                    onClick={() => setActiveTab('wishlist')}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px 20px',
                        color: activeTab === 'wishlist' ? 'var(--accent)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'wishlist' ? '2px solid var(--accent)' : 'none',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Wishlist
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {activeTab === 'organized' ? (
                    myTrips.length > 0 ? myTrips.map(trip => <TripCard key={trip.id} trip={trip} />) : <p>No organized trips yet.</p>
                ) : (
                    wishlist.length > 0 ? wishlist.map(trip => <TripCard key={trip.id} trip={trip} />) : <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    )
}
