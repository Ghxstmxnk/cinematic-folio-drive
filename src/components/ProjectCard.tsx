import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  liveUrl, 
  githubUrl, 
  index 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-card rounded-lg overflow-hidden shadow-secondary hover:shadow-primary transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Hover Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/10 flex items-center justify-center space-x-4"
        >
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-primary text-primary-foreground rounded-full shadow-glow-primary hover:shadow-glow-accent transition-all duration-300"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-secondary text-secondary-foreground rounded-full shadow-secondary hover:shadow-accent transition-all duration-300"
            >
              <Github size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Card Border Glow Effect */}
      <div className="absolute inset-0 rounded-lg border border-border group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}