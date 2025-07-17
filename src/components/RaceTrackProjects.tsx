import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flag, Trophy, Zap, ExternalLink, Github, Calendar, Users, Star } from 'lucide-react';

const raceProjects = [
  {
    id: 1,
    title: "E-Commerce Turbo",
    description: "Lightning-fast e-commerce platform with advanced payment processing and real-time analytics",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    stats: { users: "10k+", performance: "98%", uptime: "99.9%" },
    position: 1,
    difficulty: "Pro"
  },
  {
    id: 2,
    title: "AI Racing Engine",
    description: "Machine learning platform providing predictive insights and automated decision making",
    technologies: ["Python", "TensorFlow", "Docker", "AWS", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    stats: { accuracy: "94%", models: "12", datasets: "50+" },
    position: 2,
    difficulty: "Expert"
  },
  {
    id: 3,
    title: "Real-Time Chat Circuit",
    description: "Scalable messaging platform with end-to-end encryption and video capabilities",
    technologies: ["Socket.io", "Express", "MongoDB", "WebRTC", "JWT"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    stats: { messages: "1M+", latency: "50ms", concurrent: "10k" },
    position: 3,
    difficulty: "Advanced"
  },
  {
    id: 4,
    title: "Blockchain Speedway",
    description: "DeFi protocol with smart contracts, yield farming, and liquidity mining",
    technologies: ["Solidity", "Web3.js", "Hardhat", "IPFS", "Chainlink"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    stats: { tvl: "$2.5M", apr: "12%", transactions: "50k+" },
    position: 4,
    difficulty: "Expert"
  }
];

function RaceTrackLine() {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-border to-transparent transform -translate-x-1/2" />
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-20`}
    >
      {/* Position Marker */}
      <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-20">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary border-4 border-background"
        >
          <span className="text-primary-foreground font-bold">{project.position}</span>
        </motion.div>
      </div>

      {/* Project Card */}
      <motion.div
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        className={`w-full max-w-md ${isLeft ? 'mr-8' : 'ml-8'} perspective-1000`}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative preserve-3d"
        >
          {/* Front Face */}
          <div className="backface-hidden bg-card rounded-lg overflow-hidden shadow-secondary hover:shadow-primary transition-all duration-300 border border-border">
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Difficulty Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.difficulty === 'Expert' ? 'bg-red-500 text-white' :
                  project.difficulty === 'Pro' ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-black'
                }`}>
                  {project.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-display font-bold mb-2 text-foreground flex items-center gap-2">
                <Trophy size={20} className="text-primary" />
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-primary rounded-lg p-6 shadow-glow-primary">
            <div className="text-primary-foreground h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap size={20} />
                Performance Stats
              </h3>
              
              <div className="space-y-4 flex-grow">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="capitalize">{key}:</span>
                    <span className="font-bold">{String(value)}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-accent text-accent-foreground py-2 px-4 rounded-lg font-semibold text-center hover:bg-accent/80 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  Live
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg font-semibold text-center hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function RaceTrackProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section 
      ref={trackRef}
      style={{ opacity, scale }}
      className="py-20 px-6 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-primary rounded-full shadow-glow-primary"
            >
              <Flag size={32} className="text-primary-foreground" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              RACE TRACK
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate through my featured projects on this high-speed development circuit
          </p>
        </motion.div>

        {/* Race Track */}
        <div className="relative">
          <RaceTrackLine />
          
          {/* Start Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary rounded-full shadow-glow-primary">
              <Flag size={20} className="text-primary-foreground" />
              <span className="text-primary-foreground font-bold">START</span>
            </div>
          </motion.div>

          {/* Projects */}
          <div className="relative">
            {raceProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Finish Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-accent rounded-full shadow-glow-accent">
              <Trophy size={20} className="text-accent-foreground" />
              <span className="text-accent-foreground font-bold">FINISH</span>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg shadow-primary hover:shadow-glow-primary transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <ExternalLink size={20} />
            View Full Race Results
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}