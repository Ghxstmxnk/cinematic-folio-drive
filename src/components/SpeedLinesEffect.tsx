import { motion, useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

interface SpeedLinesEffectProps {
  isRolling: boolean;
  carVelocity: MotionValue<number>;
}

export default function SpeedLinesEffect({ isRolling, carVelocity }: SpeedLinesEffectProps) {
  const lineHeight = useTransform(carVelocity, (value) => `${8 + value * 20}px`);

  if (!isRolling) return null;

  return (
    <motion.div
      className="absolute bottom-12 left-20 flex space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary/60 to-transparent"
          style={{ height: lineHeight }}
          animate={{
            x: [-50, -120],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            delay: i * 0.03
          }}
        />
      ))}
    </motion.div>
  );
}