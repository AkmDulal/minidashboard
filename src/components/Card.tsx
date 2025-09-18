'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CardProps {
  title: string;
  content: string;
  href?: string;
  index?: number;
}

export default function Card({ title, content, href, index = 0 }: CardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    }
  };

  const cardContent = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-6 h-full border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 line-clamp-3">{content}</p>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}