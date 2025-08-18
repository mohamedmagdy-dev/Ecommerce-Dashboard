import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SuccessAlert({ show, onClose, msg }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState("");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimate("fade-in-up");

      const timer = setTimeout(() => {
        setAnimate("fade-out-down");
        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-[#1b1b1b4b] dark:bg-[#302f2f59]"></div>

      <div
        className={`relative h-[180px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 
                    max-w-sm w-full mx-4 flex flex-col items-center justify-center gap-3 
                    animate-${animate}`}
      >
        <CheckCircleOutlineIcon
          fontSize="large"
          className="text-green-500 w-12 h-12"
        />
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {msg}
        </p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-out-down {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        .animate-fade-out-down {
          animation: fade-out-down 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
