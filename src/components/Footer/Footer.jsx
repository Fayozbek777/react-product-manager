import React from "react";
import { Github, Linkedin, Mail, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github size={22} />,
      href: "https://github.com/yourusername",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: <Linkedin size={22} />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <Mail size={22} />,
      href: "mailto:youremail@example.com",
      label: "Email",
      color: "hover:text-red-400",
    },
  ];

  const iconVariants = {
    hover: {
      scale: 1.2,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <motion.div
            className="flex flex-col items-center lg:items-start gap-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <ShoppingBag size={24} className="text-white" />
              </motion.div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ModernShop
              </div>
            </motion.div>

            <motion.p
              className="text-gray-400 text-center lg:text-left max-w-md text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your premier destination for quality products and exceptional
              shopping experiences. Built with passion and modern design
              principles.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center lg:items-end gap-6"
            variants={itemVariants}
          >
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group ${link.color}`}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  aria-label={link.label}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {link.icon}
                  </motion.div>
                </motion.a>
              ))}
            </div>
            <motion.div
              className="flex items-center gap-2 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </motion.div>
              <span>© 2025 ModernShop. All rights reserved.</span>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-white/10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            className="text-gray-500 text-xs text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Elevating your shopping experience one pixel at a time
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
