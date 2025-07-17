import { motion } from 'framer-motion';
import { Code, Zap, Target, Users } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Expert in React, Node.js, and modern web technologies with 8+ years of experience.",
    technologies: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"]
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Specialized in creating lightning-fast applications with optimal user experience.",
    technologies: ["Next.js", "Webpack", "Redis", "CDN", "Web Vitals"]
  },
  {
    icon: Target,
    title: "Solution Architecture",
    description: "Designing scalable systems that grow with your business needs and requirements.",
    technologies: ["AWS", "Docker", "Kubernetes", "Microservices", "API Design"]
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Leading cross-functional teams to deliver exceptional products on time and budget.",
    technologies: ["Agile", "Scrum", "Mentoring", "Code Review", "DevOps"]
  }
];

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "8+", label: "Years Experience" },
  { number: "15+", label: "Technologies Mastered" },
  { number: "99%", label: "Client Satisfaction" }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating exceptional digital experiences through innovative technology 
            and user-centered design. I transform complex problems into elegant solutions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-lg p-6 shadow-secondary hover:shadow-primary transition-all duration-300 border border-border"
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-gradient-primary rounded-lg shadow-glow-primary"
                >
                  <skill.icon size={24} className="text-primary-foreground" />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {skill.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-card rounded-lg p-8 shadow-secondary border border-border max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
              "I believe in the power of technology to transform businesses and improve lives. 
              Every line of code I write is crafted with precision, passion, and purpose."
            </blockquote>
            <footer className="mt-6">
              <div className="text-foreground font-display font-semibold">Alex Ferrari</div>
              <div className="text-sm text-muted-foreground">Senior Full-Stack Developer</div>
            </footer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}