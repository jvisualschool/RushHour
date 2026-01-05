import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
    onComplete: () => void;
}

export function Confetti({ onComplete }: ConfettiProps) {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number; rotation: number }>>([]);

    useEffect(() => {
        // Generate confetti particles
        const newParticles = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
            delay: Math.random() * 0.5,
            rotation: Math.random() * 360,
        }));
        setParticles(newParticles);

        // Auto-complete after 3 seconds
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Firework bursts */}
            {[1, 2, 3].map((burst) => (
                <m.div
                    key={`burst-${burst}`}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                        scale: [0, 1.5, 2],
                        opacity: [1, 0.8, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        delay: burst * 0.4,
                        ease: "easeOut"
                    }}
                    className="absolute"
                    style={{
                        left: `${20 + burst * 25}%`,
                        top: `${30 + (burst % 2) * 20}%`,
                        width: '200px',
                        height: '200px',
                    }}
                >
                    <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-400/40 via-orange-500/20 to-transparent" />
                </m.div>
            ))}

            {/* Confetti particles */}
            {particles.map((particle) => (
                <m.div
                    key={particle.id}
                    initial={{
                        x: `${particle.x}vw`,
                        y: '-10vh',
                        rotate: particle.rotation,
                        opacity: 1
                    }}
                    animate={{
                        y: '110vh',
                        rotate: particle.rotation + 720,
                        opacity: [1, 1, 0.5, 0]
                    }}
                    transition={{
                        duration: 2.5,
                        delay: particle.delay,
                        ease: "easeIn"
                    }}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                        backgroundColor: particle.color,
                        boxShadow: `0 0 10px ${particle.color}`
                    }}
                />
            ))}

            {/* Sparkle effects */}
            {Array.from({ length: 30 }).map((_, i) => (
                <m.div
                    key={`sparkle-${i}`}
                    initial={{
                        scale: 0,
                        opacity: 0,
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1,
                        delay: Math.random() * 2,
                        repeat: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                        filter: 'blur(1px)',
                        boxShadow: '0 0 8px white'
                    }}
                />
            ))}
        </div>
    );
}
