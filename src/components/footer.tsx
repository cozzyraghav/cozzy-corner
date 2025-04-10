'use client';

import { categoryData } from '@/const/products';
import { Facebook, Github, Globe, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="mt-6 flex w-full flex-col gap-8 border-t border-gray-500 py-6 md:mt-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 md:flex-row md:py-6">
        <div className="flex w-full flex-col gap-2 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            About Us
          </p>
          <p className="text-base text-gray-400">
            At Cozzy corner, we are passionate about bringing the finest
            die-cast models and collectibles to enthusiasts and collectors pan
            India.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:gap-6">
          <p className="text-2xl font-medium text-white md:text-3xl">
            Get Early Stock Notifications!
          </p>
          <p className="text-base text-gray-400">
            Join our Instagram page to get early stock updates.{' '}
            <Link
              target="_blank"
              href="https://www.instagram.com/cozzy___corner/"
              className="text-blue-600 underline"
            >
              Click Here
            </Link>{' '}
            to join
          </p>
        </div>
        <div className="flex w-full justify-between gap-4">
          <div className="flex w-full flex-col gap-3 md:gap-6">
            <p className="text-2xl font-medium text-white md:text-3xl">
              Categories
            </p>
            <div className="flex flex-col gap-1.5 md:gap-3">
              {categoryData.map((item) => {
                return (
                  <Link
                    key={item.slug}
                    href={item.slug}
                    className="cursor-pointer text-gray-400 hover:underline"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 md:gap-6">
            <p className="text-2xl font-medium text-white md:text-3xl">
              Quick Links
            </p>

            <div className="flex flex-col gap-1.5 md:gap-3">
              <Link
                href="#"
                className="cursor-pointer text-gray-400 hover:underline"
              >
                Home
              </Link>
              <Link
                href={'/about-us'}
                className="cursor-pointer text-gray-400 hover:underline"
              >
                About Us
              </Link>
              <Link
                href={'/contact-us'}
                className="cursor-pointer text-gray-400 hover:underline"
              >
                Contact Us
              </Link>
              <Link
                href={'/orders'}
                className="cursor-pointer text-gray-400 hover:underline"
              >
                My orders
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-fit gap-4">
        <Link href={'https://www.instagram.com/cozzy___corner/'}>
          <Instagram className="h-6 w-6 cursor-pointer text-gray-200 duration-200 hover:scale-105" />
        </Link>
        <Link
          target={'_blank'}
          href={
            'https://wa.me/+919664203951?text=Hi Cozzy Corner, I am interested in your product'
          }
        >
          {' '}
          <img
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/whatsapp-icon.png"
            className="h-6 w-6 cursor-pointer hover:scale-105"
            alt=""
          />
        </Link>
        <Link
          href={'https://youtube.com/@cozzy___corner82?si=uoTtdLMErC0HzVn2'}
        >
          <Youtube className="h-6 w-6 cursor-pointer text-gray-200 duration-200 hover:scale-105" />
        </Link>
      </div>
      {/* <div className="px-6 text-center text-xs text-gray-400">
        © 2024, DIECASTO.com Powered by Shopify {' · '}
        <Link
          className="text-gray-200 hover:underline"
          href={'/privacy-policy'}
        >
          Privacy policy
        </Link>
        {' · '}
        <Link className="text-gray-200 hover:underline" href={'/contact-us'}>
          Contact information
        </Link>
      </div> */}
      <AshishFooter />
    </div>
  );
}

function AshishFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  function handleNameClick() {
    router.push('https://portfolio-iota-olive-12.vercel.app/');
  }
  return (
    <div className="mx-auto w-full border-t border-neutral-600 py-2">
      <div className="relative text-center text-sm text-gray-300">
        Developed By -{' '}
        <span
          onClick={handleNameClick}
          className="cursor-pointer rounded p-1 duration-300 hover:bg-neutral-700"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Ashish Bishnoi
          {isHovered && (
            <motion.div
              whileInView={{ opacity: 1, y: 0, x: '-50%' }}
              initial={{ opacity: 0, y: 6, x: '-50%' }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 transform p-1"
            >
              <div className="flex w-80 flex-col justify-start gap-3 rounded border border-neutral-700 bg-neutral-800 p-3 text-gray-200 shadow-lg">
                <div className="flex gap-3">
                  <Link
                    target="_blank"
                    href={'https://portfolio-iota-olive-12.vercel.app/'}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      className="size-12 rounded-full border border-neutral-400"
                      src="https://bishnoi11011.s3.ap-south-1.amazonaws.com/portfolio/me.jpg"
                      alt="Ashish Bishnoi Pic"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://portfolio-iota-olive-12.vercel.app/"
                    className="flex flex-col rounded px-1 duration-200 hover:bg-neutral-700"
                  >
                    <p className="text-left text-lg font-bold">
                      Ashish Bishnoi
                    </p>
                    <p className="text text-left font-thin text-gray-400">
                      Software Developer
                    </p>
                  </Link>
                  <div className="ml-auto mr-2 flex flex-col items-center justify-center gap-1">
                    <Link
                      target="_blank"
                      href="https://portfolio-iota-olive-12.vercel.app/"
                    >
                      <Globe
                        className="cursor-pointer text-gray-200 duration-200 hover:scale-125 hover:text-white"
                        size={16}
                      />
                    </Link>
                    <Link
                      target="_blank"
                      href={'https://github.com/ashish11011'}
                    >
                      <Github
                        className="cursor-pointer text-gray-200 duration-200 hover:scale-125 hover:text-white"
                        size={16}
                      />
                    </Link>
                  </div>
                </div>
                <div className="text-left text-gray-300">
                  Full Stack Developer open for freelance projects in dynamic
                  web applications.
                </div>
              </div>
            </motion.div>
          )}
        </span>
      </div>
    </div>
  );
}
