'use client'
import { useState } from 'react'

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Alice', text: 'Hey everyone! Excited for the Tokyo trip!', time: '10:00 AM' },
        { id: 2, user: 'Bob', text: 'Me too! Has anyone booked flights yet?', time: '10:05 AM' },
    ])
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return
        setMessages([...messages, { id: Date.now(), user: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
        setInput('')
    }

    return (
        <div style={{ display: 'flex', height: '600px', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', background: 'var(--card-bg)' }}>
            {/* Sidebar / Forum Channels */}
            <div style={{ width: '250px', borderRight: '1px solid var(--border)', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Channels</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '10px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', borderRadius: '8px', cursor: 'pointer' }}># general</div>
                    <div style={{ padding: '10px', color: '#888', cursor: 'pointer' }}># itinerary</div>
                    <div style={{ padding: '10px', color: '#888', cursor: 'pointer' }}># flights</div>
                    <div style={{ padding: '10px', color: '#888', cursor: 'pointer' }}># announcements</div>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}># general</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>3 Members Online</span>
                </div>

                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{ alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px', textAlign: msg.user === 'You' ? 'right' : 'left', display: 'flex', justifyContent: msg.user === 'You' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'center' }}>
                                <span>{msg.user} • {msg.time}</span>
                                {msg.user !== 'You' && (
                                    <button
                                        onClick={() => alert(`Blocked ${msg.user}`)}
                                        style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '10px', padding: 0 }}
                                    >
                                        Block
                                    </button>
                                )}
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: msg.user === 'You' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                borderBottomRightRadius: msg.user === 'You' ? '4px' : '12px',
                                borderBottomLeftRadius: msg.user === 'You' ? '12px' : '4px'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                        />
                        <button onClick={handleSend} className="btn btn-primary" style={{ padding: '12px 20px' }}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
