import { useState } from 'react'

export default function CreateTrip() {
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState(null)

    const handleAISuggest = () => {
        setLoading(true)
        // Mock AI delay
        setTimeout(() => {
            setSuggestions([
                { season: 'Spring', destination: 'Kyoto, Japan', reason: 'Cherry blossoms are in full bloom.' },
                { season: 'Summer', destination: 'Amalfi Coast, Italy', reason: 'Perfect beach weather and vibrant nightlife.' },
                { season: 'Autumn', destination: 'Vermont, USA', reason: 'Stunning fall foliage and cozy cabins.' },
                { season: 'Winter', destination: 'Zermatt, Switzerland', reason: 'World-class skiing and snowy landscapes.' },
            ])
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="container" style={{ padding: '120px 20px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Create Your Dream Trip</h1>

            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Where do you want to go?</label>
                    <input type="text" placeholder="e.g. Europe, Beach, Mountains" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Budget</label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}>
                            <option>$1000 - $2000</option>
                            <option>$2000 - $5000</option>
                            <option>$5000+</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Duration</label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}>
                            <option>3-5 Days</option>
                            <option>1 Week</option>
                            <option>2 Weeks</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleAISuggest}
                    className="btn btn-primary"
                    style={{ width: '100%', marginBottom: '30px' }}
                    disabled={loading}
                >
                    {loading ? 'Generating Suggestions...' : 'Get AI Suggestions'}
                </button>

                {suggestions && (
                    <div style={{ marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>AI Season-wise Suggestions</h3>
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {suggestions.map((s, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <strong style={{ color: 'var(--primary)' }}>{s.season}</strong>
                                        <span>{s.destination}</span>
                                    </div>
                                    <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>{s.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
