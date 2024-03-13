import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="box-content border-indigo-200 h-5/6 w-4/6 p-4 border-8 flex flex-col justify-center items-center bg-purple-400">
        <motion.div
          className="text-4xl md:text-6xl font-bold text-white mb-8"
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
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              T
            </motion.span>
            <motion.span
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              o
            </motion.span>
            <motion.span
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              m
            </motion.span>
            <motion.span
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              a
            </motion.span>
            <motion.span
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              t
            </motion.span>
            <motion.span
              className="text-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              o
            </motion.span>
          </motion.span>
          <motion.span
            className="text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            G
          </motion.span>
          <motion.span
            className="text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            a
          </motion.span>
          <motion.span
            className="text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            m
          </motion.span>
          <motion.span
            className="text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
          >
            e
          </motion.span>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3 }}
        >
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded"
            style={{ width: "150px" }} // Adjust the width as needed
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ width: "150px" }} // Adjust the width as needed
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/register")}
          >
            Register
          </motion.button>
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ width: "150px" }} // Adjust the width as needed
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/guestgame")}
          >
            Guest
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default MenuPage;
