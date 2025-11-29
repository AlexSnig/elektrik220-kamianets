import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useApp } from '../hooks/use-app';

const FloatingCallButton: React.FC = () => {
  const { state } = useApp();
  const phoneNumber = state.companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-20 lg:bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Подзвонити електрику"
    >
      {/* Pulse animation ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />

      {/* Phone icon */}
      <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10 group-hover:rotate-12 transition-transform" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Зателефонувати зараз
      </span>
    </motion.a>
  );
};

export default FloatingCallButton;
