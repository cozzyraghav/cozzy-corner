import { Instagram } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BottomInstagram = () => {
  return (
    <Link
      href="https://www.instagram.com/cozzy___corner/"
      className="animate-size fixed bottom-6 left-4 z-[999] flex items-center justify-center rounded-full bg-neutral-800 p-3 md:hidden"
    >
      <Instagram size={28} color="#eee" />
    </Link>
  );
};

export default BottomInstagram;
