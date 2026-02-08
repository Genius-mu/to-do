import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = (props) => {
  return (
    <AnimatePresence>
      {props.trigger && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={() => props.setTrigger(false)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Header Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600"></div>

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => props.setTrigger(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors group z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                </motion.button>

                {/* Children Content */}
                <div className="mt-2">{props.children}</div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popup;
