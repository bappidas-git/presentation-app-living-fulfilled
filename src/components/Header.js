import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css';
import LOGO from '../assets/Logo.png';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-content">
        <motion.img 
          src={LOGO} 
          alt="Living Fulfilled Logo" 
          className="logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        />
        <motion.h1 
          className="header-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Life Planning & Self Development Program
        </motion.h1>
      </div>
    </motion.header>
  );
};

export default Header;