import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 1. فصل البيانات الثابتة (Constants) لتقليل حجم الـ Re-renders
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 1.5,
  opacity: 0.1 + Math.random() * 0.5,
  duration: 2 + Math.random() * 4,
}));

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'flying' | 'landing' | 'settled' | 'exit'>('flying');

  // 2. معالجة الحركة بذكاء
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-200, 200], [8, -8]);
  const rotateY = useTransform(springX, [-200, 200], [-8, 8]);

  // 3. دورة حياة المكون (Lifecycle)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('landing'), 1800);
    const t2 = setTimeout(() => setPhase('settled'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleSkip = useCallback(() => setPhase('exit'), []);

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
          {/* نجوم الخلفية - مستقرة ومحسنة */}
          {STARS.map(s => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                width: s.size, height: s.size, borderRadius: '50%',
                background: 'rgba(232,185,35,0.7)', pointerEvents: 'none',
              }}
              animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
              transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* الحاجب العلوي - مُنظم ومغلق */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase !== 'flying' ? 1 : 0, y: phase !== 'flying' ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ position: 'absolute', top: '20%', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.6))' }} />
            <span style={{ color: '#d97706', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em' }}>BIENVENUE</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(212,160,23,0.6), transparent)' }} />
          </motion.div>

          {/* العنوان الرئيسي */}
          <motion.h1
            onClick={handleSkip}
            style={{ 
              color: '#fbbf24', fontSize: '3rem', fontWeight: 'bold', 
              cursor: 'pointer', rotateX, rotateY, transformStyle: 'preserve-3d' 
            }}
          >
            L'AIGLE TN
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
