import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gauge, Zap, Code, Award, TrendingUp, Users, Clock, Star } from 'lucide-react';

const performanceMetrics = [
  { icon: Code, label: "Lines of Code", value: 250000, unit: "+" },
  { icon: Award, label: "Projects Completed", value: 87, unit: "+" },
  { icon: TrendingUp, label: "Performance Boost", value: 340, unit: "%" },
  { icon: Users, label: "Happy Clients", value: 45, unit: "+" },
  { icon: Clock, label: "Years Experience", value: 8, unit: "+" },
  { icon: Star, label: "GitHub Stars", value: 1200, unit: "+" }
];

const skillGauges = [
  { skill: "React/Next.js", level: 95, color: "#61DAFB" },
  { skill: "Node.js", level: 92, color: "#68A063" },
  { skill: "TypeScript", level: 88, color: "#3178C6" },
  { skill: "AWS/Cloud", level: 85, color: "#FF9900" },
  { skill: "UI/UX Design", level: 80, color: "#DC143C" },
  { skill: "DevOps", level: 75, color: "#FFD700" }
];

function AnimatedGauge({ skill, level, color, delay }: { skill: string; level: number; color: string; delay: number }) {
  const [displayLevel, setDisplayLevel] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLevel(level);
    }, delay * 200);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm font-mono text-muted-foreground">{displayLevel}%</span>
      </div>
      
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${displayLevel}%` }}
          transition={{ duration: 1.5, delay: delay * 0.2, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
        >
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}

function Speedometer({ value, max, label }: { value: number; max: number; label: string }) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <div className="relative w-32 h-32 bg-card rounded-full border-4 border-border shadow-secondary">
      <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
        <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </div>
      
      {/* Speedometer needle */}
      <motion.div
        initial={{ rotate: -90 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-primary origin-bottom transform -translate-x-1/2 -translate-y-12"
      />
      
      {/* Speed marks */}
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-3 bg-border origin-bottom"
          style={{
            top: '20%',
            left: '50%',
            transform: `translateX(-50%) rotate(${(i * 30) - 90}deg)`,
            transformOrigin: '50% 200%'
          }}
        />
      ))}
    </div>
  );
}

export default function PerformanceDashboard() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  return (
    <motion.section 
      style={{ opacity, scale }}
      className="py-20 px-6 bg-gradient-to-br from-background via-card to-background relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-primary rounded-full shadow-glow-primary"
            >
              <Gauge size={32} className="text-primary-foreground" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              PERFORMANCE DASHBOARD
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics showcasing development excellence and technical precision
          </p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-card rounded-lg p-6 shadow-secondary hover:shadow-primary transition-all duration-300 border border-border group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-primary rounded-full mb-4 group-hover:shadow-glow-primary transition-all duration-300">
                  <metric.icon size={24} className="text-primary-foreground" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold text-primary mb-1"
                >
                  {metric.value}{metric.unit}
                </motion.div>
                <div className="text-xs text-muted-foreground font-medium">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-8 shadow-secondary border border-border"
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
              <Zap className="text-primary" size={24} />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skillGauges.map((gauge, index) => (
                <AnimatedGauge
                  key={gauge.skill}
                  skill={gauge.skill}
                  level={gauge.level}
                  color={gauge.color}
                  delay={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg p-8 shadow-secondary border border-border"
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-foreground flex items-center gap-3">
              <TrendingUp className="text-primary" size={24} />
              Live Metrics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <Speedometer value={95} max={100} label="CODE QUALITY" />
              </div>
              <div className="flex flex-col items-center">
                <Speedometer value={88} max={100} label="PERFORMANCE" />
              </div>
              <div className="flex flex-col items-center">
                <Speedometer value={92} max={100} label="RELIABILITY" />
              </div>
              <div className="flex flex-col items-center">
                <Speedometer value={96} max={100} label="INNOVATION" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-primary rounded-lg p-8 text-center shadow-glow-primary"
        >
          <h3 className="text-2xl font-display font-bold text-primary-foreground mb-4">
            🏁 SYSTEM STATUS: OPTIMAL
          </h3>
          <p className="text-primary-foreground/80 mb-6">
            All systems running at peak performance. Ready for your next challenge.
          </p>
          <div className="flex justify-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}