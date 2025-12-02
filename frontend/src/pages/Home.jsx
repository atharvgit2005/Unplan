import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import soundManager from '../utils/soundManager'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase, SplitText)

// Create custom eases inspired by Omaya Yachts
CustomEase.create("omayaEase", "0.76, 0, 0.24, 1")
CustomEase.create("omayaBounce", "0.68, -0.55, 0.265, 1.55")

export default function Home() {
    const mainRef = useRef(null)
    const cursorImageRef = useRef(null)
    const [hoverImage, setHoverImage] = useState(null)
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })


    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    // Mouse tracking for cursor hover effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY })

            if (cursorImageRef.current && hoverImage) {
                gsap.to(cursorImageRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.6,
                    ease: 'power2.out'
                })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [hoverImage])

    useGSAP(() => {
        // Global Video Parallax - Subtle movement and scale
        gsap.fromTo('.hero-video',
            { scale: 1.2, y: 0 },
            {
                scrollTrigger: {
                    trigger: document.documentElement, // Use documentElement to track full page scroll
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5 // Smoother scrub
                },
                scale: 1.0, // Scale down slightly to create depth/distance effect
                y: 100, // Move down slightly to create parallax against upward scrolling content
                ease: 'none'
            }
        )

        // Hero Content Animation with Custom Eases
        const tl = gsap.timeline()

        // Animate title lines with character reveal
        tl.to('.hero-line-text', {
            y: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: 'power4.out'
        })
            .fromTo('.hero-subtitle',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'omayaEase'
                }, '-=1.0')
            .fromTo('.hero-btn',
                { y: 20, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'omayaBounce',
                    onComplete: () => {
                        // Add hover sound to buttons after animation
                        document.querySelectorAll('.hero-btn').forEach(btn => {
                            btn.addEventListener('mouseenter', () => {
                                soundManager.play('hover')
                            })
                        })
                    }
                }, '-=0.8')

        // Advanced Scroll Animations
        const sections = gsap.utils.toArray('.animate-section')
        sections.forEach(section => {
            gsap.fromTo(section,
                { y: 100, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        end: 'top 40%', // Extended end for smoother fade in
                        scrub: 1,
                        toggleActions: 'play none none reverse'
                    },
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                }
            )
        })

        // Staggered Cards with Parallax
        gsap.utils.toArray('.stagger-container').forEach(container => {
            gsap.from(container.children, {
                scrollTrigger: {
                    trigger: container,
                    start: 'top 90%',
                    end: 'bottom 80%',
                    scrub: 1
                },
                y: 80, // Increased distance
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out'
            })
        })

        // Parallax Images with 3D Effect
        const parallaxImages = gsap.utils.toArray('.parallax-img')
        parallaxImages.forEach((img) => {
            const speed = img.getAttribute('data-speed') || 1

            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i, target) => {
                    return -(target.offsetHeight * (speed - 1) * 0.5)
                },
                ease: 'none'
            })

            // 3D hover effect
            img.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            })

            img.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            })
        })

        // 3D Card Transformations for "How it Works" and "What Travelers Say"
        const transformCards = gsap.utils.toArray('.transform-card')
        transformCards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    rotateY: -15,
                    rotateX: 15,
                    scale: 0.9,
                    z: -100
                },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: 1,
                        toggleActions: 'play reverse play reverse'
                    },
                    opacity: 1,
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    z: 0,
                    duration: 1,
                    ease: 'power2.out'
                }
            )

            // Additional hover interaction
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    rotateY: 5,
                    z: 50,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            })

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotateY: 0,
                    z: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
            })
        })

        // Animated Counter for Stats
        const statNumbers = gsap.utils.toArray('.stat-number')
        statNumbers.forEach((stat) => {
            const target = parseFloat(stat.getAttribute('data-target'))
            const isDecimal = target % 1 !== 0

            gsap.fromTo(stat,
                { textContent: 0 },
                {
                    textContent: target,
                    duration: 2.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.stats-section',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    snap: { textContent: isDecimal ? 0.1 : 1 },
                    onUpdate: function () {
                        if (isDecimal) {
                            stat.textContent = parseFloat(this.targets()[0].textContent).toFixed(1)
                        } else {
                            stat.textContent = Math.ceil(this.targets()[0].textContent).toLocaleString()
                        }
                    }
                }
            )
        })

        // SplitText Animation for Section Headings
        const splitHeadings = gsap.utils.toArray('.split-heading')
        splitHeadings.forEach((heading) => {
            const split = new SplitText(heading, {
                type: 'chars,words',
                charsClass: 'char',
                wordsClass: 'word'
            })

            gsap.set(split.chars, {
                opacity: 0,
                y: 100,
                scale: 0.5,
                rotation: -15
            })

            gsap.to(split.chars, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 0.5
                },
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: 'power4.out'
            })
        })


    }, { scope: mainRef })

    return (
        <div ref={mainRef}>
            {/* Global Fixed Video Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                overflow: 'hidden'
            }}>
                <video
                    className="hero-video" // Added class for GSAP target
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scale(1.2)', // Initial scale matched to GSAP fromTo
                        filter: 'brightness(1.3) contrast(1.1) saturate(1.2)' // Enhanced brightness and vibrancy
                    }}
                >
                    <source src="/1119.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Global Dark Gradient Overlay - More transparent for brighter video */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(5,5,5,0), rgba(5,5,5,0.15) 50%, rgba(10,10,10,0.7) 100%)',
                    zIndex: 1
                }} />
            </div>

            {/* Hero Section */}
            <section className="hero-section" style={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '-80px',
                paddingBottom: '120px',
                zIndex: 2
            }}>
                <div className="container" style={{ paddingTop: '120px' }}>
                    <h1 className="text-mega" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <span className="hero-line-mask">
                            <span className="hero-line-text">PLAN YOUR</span>
                        </span>
                        <span className="hero-line-mask">
                            <span className="hero-line-text text-gradient-primary">PERFECT</span>
                        </span>
                        <span className="hero-line-mask">
                            <span className="hero-line-text">ADVENTURE</span>
                        </span>
                    </h1>

                    <p className="hero-subtitle" style={{ fontSize: 'var(--font-size-xl)', color: '#e0e0e0', maxWidth: '640px', margin: '0 auto var(--spacing-xl)', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        AI-powered trip planning with season-wise suggestions, automated itineraries, and seamless organization.
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                        <Link
                            to="/create"
                            className="btn btn-primary hero-btn"
                            onMouseEnter={(e) => {
                                gsap.to(e.target, { scale: 1.05, duration: 0.3, ease: 'omayaBounce' })
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.target, { scale: 1, duration: 0.3, ease: 'omayaEase' })
                            }}
                        >
                            Start Planning
                        </Link>
                        <Link
                            to="/explore"
                            className="btn btn-outline hero-btn"
                            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                            onMouseEnter={(e) => {
                                gsap.to(e.target, { scale: 1.05, duration: 0.3, ease: 'omayaBounce' })
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.target, { scale: 1, duration: 0.3, ease: 'omayaEase' })
                            }}
                        >
                            Explore Trips
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="animate-section stats-section" style={{ padding: 'var(--spacing-section) 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'transparent', backdropFilter: 'none' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 'var(--spacing-xl)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3
                            className="stat-number"
                            data-target="10000"
                            style={{
                                fontSize: 'clamp(48px, 8vw, 80px)',
                                margin: 0,
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 4px 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                transform: 'perspective(500px) rotateX(2deg)',
                                letterSpacing: '-2px'
                            }}
                        >
                            0
                        </h3>
                        <span style={{
                            fontSize: 'clamp(32px, 6vw, 60px)',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginLeft: '4px'
                        }}>+</span>
                        <p style={{ color: '#ccc', marginTop: 'var(--spacing-sm)', fontSize: '1.1rem' }}>Happy Travelers</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3
                            className="stat-number"
                            data-target="500"
                            style={{
                                fontSize: 'clamp(48px, 8vw, 80px)',
                                margin: 0,
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 4px 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                transform: 'perspective(500px) rotateX(2deg)',
                                letterSpacing: '-2px'
                            }}
                        >
                            0
                        </h3>
                        <span style={{
                            fontSize: 'clamp(32px, 6vw, 60px)',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginLeft: '4px'
                        }}>+</span>
                        <p style={{ color: '#ccc', marginTop: 'var(--spacing-sm)', fontSize: '1.1rem' }}>Curated Trips</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3
                            className="stat-number"
                            data-target="4.9"
                            style={{
                                fontSize: 'clamp(48px, 8vw, 80px)',
                                margin: 0,
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 4px 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                transform: 'perspective(500px) rotateX(2deg)',
                                letterSpacing: '-2px'
                            }}
                        >
                            0
                        </h3>
                        <span style={{
                            fontSize: 'clamp(32px, 6vw, 60px)',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginLeft: '4px'
                        }}>/5</span>
                        <p style={{ color: '#ccc', marginTop: 'var(--spacing-sm)', fontSize: '1.1rem' }}>User Rating</p>
                    </div>
                </div>
            </section>


            {/* How it Works */}
            <section className="container animate-section" style={{ padding: 'var(--spacing-section) 20px', perspective: '1000px' }}>
                <h2 className="split-heading" style={{ fontSize: 'clamp(56px, 10vw, 120px)', textAlign: 'center', marginBottom: 'var(--spacing-3xl)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1, textShadow: '0 4px 30px rgba(0,0,0,0.5)', color: 'white' }}>How it Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
                    {[
                        { title: '1. Choose Destination', desc: 'Select where you want to go or let our AI suggest the perfect spot based on the season.', image: '/india-1.jpg' },
                        { title: '2. Customize Plan', desc: 'Adjust your itinerary, add friends, and set your budget preferences.', image: '/india-2.jpg' },
                        { title: '3. Start Adventure', desc: 'Get your detailed guide, maps, and weather info all in one place.', image: '/india-3.jpg' }
                    ].map((step, i) => (
                        <div
                            key={i}
                            className="glass-panel transform-card"
                            style={{ padding: 'var(--spacing-xl)', textAlign: 'center', position: 'relative', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', transformStyle: 'preserve-3d', cursor: 'pointer' }}
                            onMouseEnter={() => setHoverImage(step.image)}
                            onMouseLeave={() => setHoverImage(null)}
                        >
                            <div style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>{step.icon}</div>
                            <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-md)' }}>{step.title}</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="animate-section" style={{ padding: 'var(--spacing-section) 0', background: 'linear-gradient(to bottom, transparent, rgba(124, 58, 237, 0.05))' }}>
                <div className="container" style={{ perspective: '1000px' }}>
                    <h2 className="split-heading" style={{ fontSize: 'clamp(56px, 10vw, 120px)', textAlign: 'center', marginBottom: 'var(--spacing-3xl)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1, textShadow: '0 4px 30px rgba(0,0,0,0.5)', color: 'white' }}>What Travelers Say</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {[
                            { name: 'Sarah J.', role: 'Solo Traveler', text: "The AI suggestions were spot on! I found a hidden gem in Kyoto that wasn't on any other guide.", image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80' },
                            { name: 'Mike T.', role: 'Adventure Seeker', text: "Planning a group trip used to be a nightmare. This app made it seamless and fun.", image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80' },
                            { name: 'Emily R.', role: 'Digital Nomad', text: "I love the season-wise recommendations. It saved me from visiting Bali during the rainy season!", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' }
                        ].map((t, i) => (
                            <div
                                key={i}
                                className="glass-panel transform-card"
                                style={{ padding: 'var(--spacing-xl)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', transformStyle: 'preserve-3d', cursor: 'pointer' }}
                                onMouseEnter={() => setHoverImage(t.image)}
                                onMouseLeave={() => setHoverImage(null)}
                            >
                                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: 'var(--spacing-lg)', color: '#ddd' }}>&quot;{t.text}&quot;</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)' }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{t.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: '#888' }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* India Travel Parallax Gallery */}
            <section style={{ position: 'relative', minHeight: '200vh', paddingTop: '100px', paddingBottom: '100px' }}>
                <div style={{
                    position: 'sticky',
                    top: '20vh',
                    textAlign: 'center',
                    marginBottom: '60px',
                    zIndex: 10
                }}>
                    <h1 style={{
                        fontWeight: 900,
                        fontSize: 'clamp(40px, 8vw, 100px)',
                        color: 'white',
                        WebkitTextStroke: '2px white',
                        margin: 0,
                        textShadow: '0 0 30px rgba(201, 168, 106, 0.5)'
                    }}>Discover India</h1>
                </div>

                <div className="parallax-images" style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    minHeight: '150vh',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(20, 5%)',
                    gridTemplateRows: 'repeat(30, 3%)',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    alignItems: 'center',
                    padding: '0 20px',
                    zIndex: 1
                }}>
                    <img
                        data-speed="0.8"
                        src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop"
                        alt="India Gate Delhi"
                        style={{
                            gridArea: '1/1/6/8',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="0.9"
                        src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop"
                        alt="Kerala Backwaters"
                        style={{
                            gridArea: '3/12/8/20',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="1"
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
                        alt="Adventure Travel"
                        style={{
                            gridArea: '9/5/13/15',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="1.1"
                        src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop"
                        alt="Rajasthan Palace"
                        style={{
                            gridArea: '14/1/18/8',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="0.9"
                        src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop"
                        alt="Himalayan Mountains"
                        style={{
                            gridArea: '16/12/20/19',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="1.2"
                        src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop"
                        alt="Goa Beach"
                        style={{
                            gridArea: '20/2/25/9',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="0.8"
                        src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop"
                        alt="Jaipur Architecture"
                        style={{
                            gridArea: '22/11/24/20',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                    <img
                        data-speed="1"
                        src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
                        alt="Indian Culture"
                        style={{
                            gridArea: '26/5/30/15',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            transition: 'transform 0.3s ease',
                            willChange: 'transform'
                        }}
                        className="parallax-img"
                    />
                </div>
            </section>

            {/* Cursor Follower Image */}
            {hoverImage && (
                <div
                    ref={cursorImageRef}
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        pointerEvents: 'none',
                        zIndex: 9999,
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        opacity: 0.9
                    }}
                >
                    <img
                        src={hoverImage}
                        alt="Hover preview"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            )}
        </div>
    )
}
