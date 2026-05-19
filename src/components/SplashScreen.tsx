import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  onComplete: () => void
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  angle: (i / 24) * 360,
  radius: 80 + Math.random() * 60,
  size: 1.5 + Math.random() * 2.5,
  duration: 2.5 + Math.random() * 2,
  delay: Math.random() * 2,
}))

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 1.5,
  opacity: 0.1 + Math.random() * 0.5,
  duration: 2 + Math.random() * 4,
}))

export default function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'flying' | 'landing' | 'settled' | 'exit'>('flying')
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(springY, [-200, 200], [8, -8])
  const rotateY = useTransform(springX, [-200, 200], [-8, 8])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('landing'), 1800)
    const t2 = setTimeout(() => setPhase('settled'), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [mouseX, mouseY])

  const handleSkip = useCallback(() => setPhase('exit'), [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'exit' && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'radial-gradient(ellipse at 50% 60%, #111008 0%, #080808 55%, #000000 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', perspective: 1200,
          }}
        >
          {/* Starfield */}
          {STARS.map(s => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute',
                left: `${s.x}%`, top: `${s.y}%`,
                width: s.size, height: s.size,
                borderRadius: '50%',
                background: 'rgba(232,185,35,0.7)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
              transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Ambient radial glow */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(212,160,23,0.07) 0%, transparent 70%)',
            }}
            animate={{ opacity: phase === 'settled' ? [0.6, 1, 0.6] : 0.6 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Top eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase !== 'flying' ? 1 : 0, y: phase !== 'flying' ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'absolute', top: 48, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.6))' }} />
            <span className="text-amber-600" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Plateforme Vérifiée · Tunisie</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(212,160,23,0.6), transparent)' }} />
          </motion.div>

          {/* Eagle + particles group */}
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>

            {/* Orbital particles — only when settled */}
            {phase === 'settled' && PARTICLES.map(p => (
              <motion.div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: hovered
                    ? `rgba(232,185,35,${0.6 + Math.random() * 0.4})`
                    : `rgba(212,160,23,${0.25 + Math.random() * 0.3})`,
                  boxShadow: hovered ? '0 0 6px rgba(232,185,35,0.9)' : 'none',
                  pointerEvents: 'none',
                }}
                animate={{
                  x: Math.cos((p.angle * Math.PI) / 180) * p.radius * (hovered ? 1.3 : 1),
                  y: Math.sin((p.angle * Math.PI) / 180) * p.radius * (hovered ? 1.3 : 1),
                  opacity: hovered ? [0.8, 1, 0.8] : [0.3, 0.7, 0.3],
                  scale: hovered ? [1, 1.6, 1] : [1, 1.2, 1],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Eagle logo */}
            <motion.div
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              initial={{ y: 300, scale: 0.3, rotateX: -45, rotateZ: -15, opacity: 0 }}
              animate={
                phase === 'flying' ? { y: 80, scale: 0.75, rotateX: -20, rotateZ: -8, opacity: 1 } :
                phase === 'landing' ? { y: 0, scale: 1.05, rotateX: 0, rotateZ: 0, opacity: 1 } :
                { y: hovered ? -18 : 0, scale: hovered ? 1.12 : 1, rotateX: 0, rotateZ: 0, opacity: 1 }
              }
              transition={
                phase === 'flying' ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } :
                phase === 'landing' ? { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] } :
                { duration: 0.5, ease: 'easeOut' }
              }
              style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
            >
              {/* Wing flap ring */}
              <motion.div
                style={{
                  position: 'absolute', inset: -20,
                  borderRadius: '50%',
                  border: '1px solid rgba(212,160,23,0.15)',
                  pointerEvents: 'none',
                }}
                animate={{
                  scaleX: phase === 'settled' ? [1, 1.35, 1] : 1,
                  scaleY: phase === 'settled' ? [1, 0.72, 1] : 1,
                  opacity: phase === 'settled' ? [0.4, 0.8, 0.4] : 0,
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Glow halo */}
              <motion.div
                style={{
                  position: 'absolute', inset: -32,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
                animate={{ opacity: hovered ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2] }}
                transition={{ duration: hovered ? 1 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Eagle badge */}
              <motion.div
                style={{
                  width: 140, height: 140,
                  borderRadius: '28px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
                  display: 'flex', alignItems: 'center', justify+Content: 'center',
                  boxShadow: hovered
                    ? '0 0 80px rgba(232,185,35,0.7), 0 0 160px rgba(212,160,23,0.35), inset 0 1px 0 rgba(255,255,255,0.3)'
                    : '0 0 40px rgba(212,160,23,0.35), 0 0 80px rgba(212,160,23,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Inner shimmer */}
                <motion.div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                    pointerEvents: 'none',
                  }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Eagle SVG */}
                <EagleSVG flapping={phase === 'flying'} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: phase === 'settled' ? 1 : 0, y: phase === 'settled' ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
          >
            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #b45309)' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #b45309, transparent)' }} />
            </div>

            <h1 className="text-zinc-100" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: 6,
            }}>
              BIENVENUE SUR
            </h1>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              marginBottom: 20,
              background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              L'AIGLE TN
            </h1>

            <p className="text-zinc-400" style={{ fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 40 }}>
              Livraison Premium · Cuisine Tunisienne Authentique
            </p>

            {/* CTA */}
            <motion.button
              onClick={handleSkip}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 48px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                color: '#000',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 32px rgba(212,160,23,0.4), 0 8px 24px rgba(0,0,0,0.5)',
                marginBottom: 20,
              }}
            >
              Commencer L'Aventure 4K
            </motion.button>

            {/* Badge row */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {['Plateforme Vérifiée', '4K Expérience', 'Qualité Premium'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b' }} />
                  <span className="text-zinc-400" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skip during flying/landing */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'settled' ? 0.5 : 0 }}
            onClick={handleSkip}
            className="text-zinc-400"
            style={{
              position: 'absolute', bottom: 32, right: 32,
              fontSize: 11, letterSpacing: '0.1em',
              textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            Ignorer →
          </motion.button>

          {/* Corner accents */}
          {[
            { top: 20, left: 20 },
            { top: 20, right: 20 },
            { bottom: 20, left: 20 },
            { bottom: 20, right: 20 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'settled' ? 0.4 : 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              style={{
                position: 'absolute', ...pos,
                width: 20, height: 20,
                borderTop: i < 2 ? '1px solid rgba(212,160,23,0.4)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(212,160,23,0.4)' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid rgba(212,160,23,0.4)' : 'none',
                borderRight: i % 2 === 1 ? '1px solid rgba(212,160,23,0.4)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EagleSVG({ flapping }: { flapping: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      width={80}
      height={80}
      style={{ position: 'relative', zIndex: 1 }}
      animate={flapping ? { scaleX: [1, 1.18, 1], scaleY: [1, 0.82, 1] } : { scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.45, repeat: flapping ? Infinity : 0, ease: 'easeInOut' }}
    >
      <ellipse cx="40" cy="44" rx="10" ry="14" fill="#0a0804" />
      <motion.path
        d="M40 42 C28 34, 10 30, 4 24 C12 32, 22 38, 30 44 Z"
        fill="#0a0804"
        animate={flapping ? { d: ['M40 42 C28 34, 10 30, 4 24 C12 32, 22 38, 30 44 Z', 'M40 42 C28 40, 10 42, 4 40 C12 40, 22 42, 30 44 Z', 'M40 42 C28 34, 10 30, 4 24 C12 32, 22 38, 30 44 Z'] } : {}}
        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M40 42 C52 34, 70 30, 76 24 C68 32, 58 38, 50 44 Z"
        fill="#0a0804"
        animate={flapping ? { d: ['M40 42 C52 34, 70 30, 76 24 C68 32, 58 38, 50 44 Z', 'M40 42 C52 40, 70 42, 76 40 C68 40, 58 42, 50 44 Z', 'M40 42 C52 34, 70 30, 76 24 C68 32, 58 38, 50 44 Z'] } : {}}
        transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M36 56 L40 66 L44 56 Z" fill="#0a0804" />
      <circle cx="40" cy="28" r="8" fill="#0a0804" />
      <path d="M40 30 L47 33 L40 35 Z" fill="#0a0804" opacity="0.8" />
      <circle cx="43" cy="26" r="1.8" fill="#0a0804" />
      <circle cx="43.5" cy="25.5" r="0.7" fill="rgba(232,185,35,0.9)" />
      <line x1="36" y1="58" x2="30" y2="64" stroke="#0a0804" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="59" x2="34" y2="66" stroke="#0a0804" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="58" x2="50" y2="64" stroke="#0a0804" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="59" x2="46" y2="66" stroke="#0a0804" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  )
}
