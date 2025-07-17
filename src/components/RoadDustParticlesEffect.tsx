import { motion } from 'framer-motion';

interface RoadDustParticlesEffectProps {
  isRolling: boolean;
}

export default function RoadDustParticlesEffect({ isRolling }: RoadDustParticlesEffectProps) {
  if (!isRolling) return null;

  return (
    <motion.div className="absolute bottom-2 left-12">
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-400 rounded-full"
          animate={{
            x: [-10, -60],
            y: [0, -20, -10],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.3]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </motion.div>
  );
}