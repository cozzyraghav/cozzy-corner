'use client';
import { cartState } from '@/const/cartState';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const NavBar = () => {
  const [mobNavOpen, setMobNavOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const navData = [
    { name: 'Home', slug: '/' },
    {
      name: 'Category',
      subMenu: [
        { name: 'Action Figure', slug: '/category/action-figure' },
        { name: 'Miniature', slug: '/category/miniature' },
        { name: 'Bobble Head', slug: '/category/bobble-head' },
        { name: 'Sets', slug: '/category/sets' },
        { name: 'Q Posket', slug: '/category/q-posket' },
        { name: 'Keychain', slug: '/category/keychain' },
        { name: 'Katana', slug: '/category/katana' },
      ],
    },
    {
      name: 'Series',
      subMenu: [
        { name: 'Naruto', slug: '/series/naruto' },
        { name: 'One Piece', slug: '/series/one-piece' },
        { name: 'Demon Slayer', slug: '/series/demon-slayer' },
        { name: 'Dragon Ball Z', slug: '/series/dragon-ball-z' },
        { name: 'Marvel', slug: '/series/marvel' },
        { name: 'Jujutsu Kaisen', slug: '/series/jujutsu-kaisen' },
        { name: 'Others', slug: '/series/others' },
      ],
    },
    { name: 'Your orders', slug: '/orders' },
  ];

  return (
    <div className="sticky top-0 z-50 flex w-full flex-col bg-black">
      <div className="flex items-center justify-center gap-2 border-b border-neutral-800 bg-neutral-950 p-2">
        {/* <div className="size-2 animate-pulse rounded-full bg-blue-500"></div> */}
        <div className="text-center text-sm text-gray-300 md:text-base">
          Get free delivery on orders above ₹1199
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-4 py-6 md:px-8 md:py-6">
        <Link
          href={'/'}
          className="flex h-10 w-36 min-w-14 items-start justify-start"
        >
          <img
            className="h-full object-contain"
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/logo.png"
            alt="Cozzy Corner Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center border-neutral-700 font-medium text-gray-200">
            {navData.map((item, index) => {
              if (item.subMenu) return <NavSubMenu key={index} item={item} />;
              return (
                <li key={index}>
                  <Link
                    href={item.slug}
                    className="cursor-pointer px-4 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-5 md:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="flex cursor-pointer items-center justify-center px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base">
              <Link
                href={'/searchproduct'}
                // className="cursor-pointer px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base"
              >
                <Search />
              </Link>
            </li>
            <li className="flex cursor-pointer items-center justify-center px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base">
              <CartButton />
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={'/searchproduct'}
            className="cursor-pointer px-2 py-1.5 text-sm duration-300 md:px-5 md:text-base"
          >
            <Search color="#ccc" />
          </Link>
          <CartButton />
          {mobNavOpen ? (
            <X onClick={() => setMobNavOpen(false)} color="#ccc" />
          ) : (
            <Menu onClick={() => setMobNavOpen(true)} color="#ccc" />
          )}
        </div>

        {/* Mobile Menu */}
        {mobNavOpen && (
          <div className="absolute left-0 top-28 flex h-screen w-full items-start bg-black text-white">
            <div className="z-40 flex w-full flex-col px-2 pt-6">
              {navData.map((item, index) => {
                if (!item.subMenu)
                  return (
                    <Link
                      className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-xl"
                      key={index}
                      href={item.slug}
                    >
                      {item.name}
                    </Link>
                  );
                return (
                  <div key={index} className="mb-2">
                    <div
                      className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-xl"
                      onClick={() =>
                        item.subMenu
                          ? setOpenSubMenu((prev) =>
                              prev === item.name ? null : item.name
                            )
                          : setMobNavOpen(false)
                      }
                    >
                      <span>{item.name}</span>
                      {item.subMenu && (
                        <span>
                          {openSubMenu === item.name ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      )}
                    </div>
                    {item.subMenu && openSubMenu === item.name && (
                      <div className="bg-neutral-950 pl-4">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.slug}
                            className="block py-2 text-lg hover:bg-neutral-950"
                            onClick={() => setMobNavOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

function NavSubMenu({ item }: any) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsSubMenuOpen(true)}
      onMouseLeave={() => setIsSubMenuOpen(false)}
    >
      <div className="cursor-pointer px-4 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-5 md:text-base">
        {item.name}
      </div>
      {isSubMenuOpen && (
        <ul className="absolute left-0 top-full flex w-48 flex-col bg-neutral-900 shadow-lg">
          {item.subMenu.map((subItem: any, index: number) => (
            <li key={index}>
              <Link
                href={subItem.slug}
                className="block px-4 py-2 text-sm duration-300 hover:bg-neutral-800 md:text-base"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function CartButton() {
  const [cart] = useRecoilState(cartState);
  var cartQuentity = cart
    ? JSON.parse(cart).reduce(
        (total: number, item: any) => total + item.quantity,
        0
      )
    : 0;
  return (
    <Link
      href={'/cart'}
      className="relative cursor-pointer px-2 py-1.5 text-sm duration-300 hover:bg-neutral-800 md:px-3 md:text-base"
    >
      <ShoppingBag color="#ccc" />
      <span className="absolute -top-2 right-0 z-10 text-white">
        {cartQuentity}
      </span>
    </Link>
  );
}
