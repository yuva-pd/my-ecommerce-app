"use client";
import React from "react";

const BNavbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-black text-white relative">
      <div className="space-x-4 flex items-center">
        <a href="/policies/contact-us">Contact Us</a>
        <a href="/policies/shipping-policy">Shipping Policy</a>
        <a href="/policies/terms-and-conditions">Terms & Conditions</a>
        <a href="/policies/cancellations-and-refunds">
          Cancellations & Refunds
        </a>
        <a href="/policies/privacy-policy">Privacy Policy</a>
      </div>
    </nav>
  );
};

export default BNavbar;
