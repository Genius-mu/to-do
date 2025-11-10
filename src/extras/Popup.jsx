import { X } from "lucide-react";
import { motion } from "framer-motion";

const Popup = (props) => {
  return props.trigger ? (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
      >
        <div className="relative p-[32px] w-full  w-100% max-w-[640px] bg-white">
          <button
            className="absolute top-[16px] right-[16px]"
            onClick={() => props.setTrigger(false)}
          >
            <X />
          </button>
          {props.children}
        </div>
      </motion.div>
    </>
  ) : (
    ""
  );
};

export default Popup;
