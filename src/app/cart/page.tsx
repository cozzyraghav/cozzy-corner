'use client';
import React from 'react';
import ShowCartData from './showCartData';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';

const CartPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <NavBar />
      <ShowCartData />
      <Footer />
    </div>
  );
};

export default CartPage;
