"use client";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="h-6 w-32 bg-gray-700 rounded"></div>
      <div className="h-6 w-48 bg-gray-700 rounded"></div>
      <div className="h-6 w-40 bg-gray-700 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;
