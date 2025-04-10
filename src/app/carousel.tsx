'use client';
import { CartProvider } from '@/const/cartContext';
import { cartState } from '@/const/cartState';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const slides = [
  {
    id: 1,
    productId: 'ed03cefa-a53e-4845-b818-26b5cd81ab5e',
    discountedPrice: 1999,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-goku.png',
    heading: 'Dragon Ball Z Shirtless  Goku',
    description:
      'Son Goku action figure: Immerse yourself in the Dragon Ball universe. showcasing intricate details and dynamic poses. High-Quality Materials Crafted from premium materials',
    buyNowText: 'Buy Goku Figure',
    exploreText: '/product/ed03cefa-a53e-4845-b818-26b5cd81ab5e',
    limitedEdition: 'Limited Edition Goku Figure - Only 50 Left!',
    limitedDescription: "Don't miss your chance to own this exclusive figure!",
  },
  {
    id: 3,
    productId: 'b392ba8b-9617-4089-8622-2b1e2419f097',
    discountedPrice: 999,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-zoro.png',
    heading: 'One Piece Roronoa Zoro Tree',
    description:
      "BEST FOR GIFTING toy on Birthday and Christmas | Can use as Cake Toppers/Cake Decoration as well |It can be used for car furnishing articles, children's toys, desktop decor, cake decor, birthday gift.",
    buyNowText: 'Buy Zoro Figure',
    exploreText: '/product/b392ba8b-9617-4089-8622-2b1e2419f097',
    limitedEdition: 'Limited Edition Zoro Figure - Only 40 Left!',
    limitedDescription: 'Grab yours before it sells out!',
  },
  {
    id: 4,
    productId: '7a85d4b6-3dae-4379-968a-47d7f50b1fab',
    discountedPrice: 669,
    content: 'https://s3.ap-south-1.amazonaws.com/cozzy.corner/hero-boa.png',
    heading: 'Boa Hancock One Piece Sitting Pirate',
    description: `This collection includes some of the most popular characters! Great quality and craftsmanship, a must have collector's item | Fans and collectors will love.`,
    buyNowText: 'Buy Boa Figure',
    exploreText: '/product/7a85d4b6-3dae-4379-968a-47d7f50b1fab',
    limitedEdition: 'Limited Edition Boa Figure - Only 20 Left!',
    limitedDescription: 'Secure this stunning figure today!',
  },
  // Add more slides as needed
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<any>(0); // Track slide direction for animation
  const intervalRef = useRef<any>(null); // Ref to hold the interval for auto-slide
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartState);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer(); // Reset the auto-slide timer on manual navigation
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer(); // Reset the auto-slide timer on manual navigation
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, 5000); // Restart the timer
  };

  useEffect(() => {
    resetTimer(); // Start the initial timer
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    enter: (direction: any) => ({
      x: direction === 1 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: any) => ({
      x: direction === 1 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const handleBuyNow = ({ id, name, discountPrice, image }: any) => {
    setCart(JSON.stringify([{ id, quantity: 1 }]));
    router.push('/cart');
  };

  return (
    <div className="relative h-[75vh] w-full overflow-hidden bg-black">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.5,
            duration: 0.5,
          }}
          className="absolute inset-0 px-4 md:px-6"
        >
          <div className="flex h-full w-full flex-col-reverse gap-2 md:flex-row md:gap-16">
            <div className="flex h-full w-full flex-col items-center justify-start gap-3 space-y-3 px-4 py-2 text-white md:justify-center md:gap-6 md:px-8 md:py-8">
              <h1 className="line-clamp-1 text-center text-3xl font-semibold text-gray-100 md:line-clamp-none md:text-5xl">
                {slides[currentSlide].heading}
              </h1>

              <p className="line-clamp-2 text-center font-exo text-gray-300 md:text-lg">
                {slides[currentSlide].description}
              </p>

              <div className="flex w-full justify-center gap-4">
                <button
                  onClick={() =>
                    handleBuyNow({
                      id: slides[currentSlide].productId,
                      name: slides[currentSlide].heading,
                      discountedPrice: slides[currentSlide].discountedPrice,
                      image: slides[currentSlide].content,
                    })
                  }
                  className="h-fit w-full rounded bg-p-green px-2 py-3 text-sm text-white transition duration-300 hover:bg-p-green/70 md:w-fit md:px-6 md:text-base"
                >
                  {slides[currentSlide].buyNowText}
                </button>
                <Link
                  href={slides[currentSlide].exploreText}
                  className="h-fit w-full rounded border border-p-blue px-2 py-3 text-center text-sm text-white transition duration-300 hover:bg-p-blue/70 md:w-fit md:px-6 md:text-base"
                >
                  Explore Characters
                </Link>
              </div>

              <div className="hidden space-y-4 pt-8 md:block">
                <h3 className="font-audiowide text-xl text-p-green">
                  {slides[currentSlide].limitedEdition}
                </h3>
                <p className="font-exo text-lg">
                  {slides[currentSlide].limitedDescription}
                </p>
              </div>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <img
                className="h-full max-h-[90vh] w-full object-contain"
                src={slides[currentSlide].content}
                alt={`Slide ${currentSlide + 1}`}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left and right buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-r-lg bg-black bg-opacity-50 px-4 py-2 text-white focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-l-lg bg-black bg-opacity-50 px-4 py-2 text-white focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
}
