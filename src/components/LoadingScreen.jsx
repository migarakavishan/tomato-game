import { motion } from "framer-motion";
import tomatoImage from "../assets/tomato.png";
import React, { useState, useEffect } from "react";

function LoadingScreen() {
  const [tomatoes, setTomatoes] = useState([]);

  useEffect(() => {
    const tomatoCount = 40; // Number of tomatoes
    const newTomatoes = Array.from({ length: tomatoCount }, (_, index) => {
      return {
        x: Math.random() * window.innerWidth, // Random X position
        y: Math.random() * window.innerHeight, // Random Y position
        vx: Math.random() * 2 - 1, // Random X velocity (-1 to 1)
        vy: Math.random() * 2 - 1, // Random Y velocity (-1 to 1)
      };
    });

    setTomatoes(newTomatoes);

    const interval = setInterval(() => {
      setTomatoes((prevTomatoes) =>
        prevTomatoes.map((tomato) => ({
          ...tomato,
          x: tomato.x + tomato.vx, // Update X position
          y: tomato.y + tomato.vy, // Update Y position
        }))
      );
    }, 10); // Update position every 10 milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 overflow-hidden">
      <motion.div
        className="text-4xl md:text-7xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.span
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.span
            className="text-orange-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            T
          </motion.span>
          <motion.span
            className="text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            o
          </motion.span>
          <motion.span
            className="text-yellow-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            m
          </motion.span>
          <motion.span
            className="text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            a
          </motion.span>
          <motion.span
            className="text-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            t
          </motion.span>
          <motion.span
            className="text-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            o
          </motion.span>
        </motion.span>
        <motion.span
          className="text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          G
        </motion.span>
        <motion.span
          className="text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          a
        </motion.span>
        <motion.span
          className="text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          m
        </motion.span>
        <motion.span
          className="text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          e
        </motion.span>
      </motion.div>
      <div>
        {tomatoes.map((tomato, index) => (
          <motion.img
            key={index}
            src={tomatoImage}
            alt="Tomato"
            className="w-12 md:w-24 absolute"
            style={{ left: tomato.x, top: tomato.y }}
            animate={{
              x: tomato.x + tomato.vx * 10, // Move horizontally based on velocity
              y: tomato.y + tomato.vy * 10, // Move vertically based on velocity
            }}
            transition={{ duration: 0.5, loop: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingScreen;
