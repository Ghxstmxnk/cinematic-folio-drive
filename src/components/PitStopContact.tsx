import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wrench, Send, Coffee, MessageCircle, Phone, Mail, MapPin, Clock, Fuel, Settings } from 'lucide-react';

const pitStopServices = [
  {
    icon: Coffee,
    title: "Project Consultation",
    description: "Quick strategic discussion about your next big idea",
    duration: "30 min",
    price: "Free"
  },
  {
    icon: Wrench,
    title: "Technical Audit",
    description: "Comprehensive review of your existing codebase",
    duration: "2-3 days",
    price: "On Quote"
  },
  {
    icon: Fuel,
    title: "Performance Boost",
    description: "Optimize your application for lightning-fast speeds",
    duration: "1 week",
    price: "Starting $2k"
  },
  {
    icon: Settings,
    title: "Full Development",
    description: "Complete project development from concept to deployment",
    duration: "2-12 weeks",
    price: "Starting $10k"
  }
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "alex.ferrari@example.com",
    href: "mailto:alex.ferrari@example.com",
    response: "< 2 hours"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    response: "Immediate"
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: "AlexFerrari#1234",
    href: "https://discord.com",
    response: "< 30 min"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
    response: "PST Timezone"
  }
];

function PitStopTimer() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card rounded-lg p-4 border border-border shadow-secondary">
      <div className="flex items-center gap-3 mb-2">
        <Clock size={20} className="text-primary" />
        <span className="font-semibold text-foreground">Pit Stop Status</span>
      </div>
      <div className="text-2xl font-mono font-bold text-primary">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-sm text-muted-foreground">
        Available for new projects
      </div>
      <div className="flex items-center gap-2 mt-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
        <span className="text-xs text-green-500">Online</span>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      className="bg-card rounded-lg p-6 shadow-secondary hover:shadow-primary transition-all duration-300 border border-border group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-primary rounded-full group-hover:shadow-glow-primary transition-all duration-300">
          <service.icon size={24} className="text-primary-foreground" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-display font-bold mb-2 text-foreground">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {service.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} />
                {service.duration}
              </span>
              <span className="text-xs font-semibold text-primary">
                {service.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PitStopContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % pitStopServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-primary rounded-full shadow-glow-primary"
            >
              <Wrench size={32} className="text-primary-foreground" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              PIT STOP
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to fuel your next project? Let's get your ideas up to speed.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pitStopServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-lg p-8 shadow-secondary border border-border">
              <h3 className="text-2xl font-display font-bold mb-6 text-foreground flex items-center gap-3">
                <Send size={24} className="text-primary" />
                Request Pit Stop
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="">Select a service</option>
                    {pitStopServices.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg shadow-primary hover:shadow-glow-primary transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                      <span>Entering Pit...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Request Pit Stop</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Timer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <PitStopTimer />
            
            <div className="bg-card rounded-lg p-6 shadow-secondary border border-border">
              <h3 className="text-xl font-display font-bold mb-4 text-foreground">
                Direct Contact
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <method.icon size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.value}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{method.response}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-primary rounded-lg p-6 shadow-glow-primary">
              <h3 className="text-lg font-bold text-primary-foreground mb-4">
                🏁 Current Availability
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-foreground">2</div>
                  <div className="text-xs text-primary-foreground/80">Spots Open</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-foreground">24h</div>
                  <div className="text-xs text-primary-foreground/80">Response Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}