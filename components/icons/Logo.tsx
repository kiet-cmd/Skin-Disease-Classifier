
import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    width="40" 
    height="40" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="url(#paint0_linear_1_2)"/>
    <path d="M12 6C11.17 6 10.5 6.67 10.5 7.5V11.5H8.5C7.67 11.5 7 12.17 7 13C7 13.83 7.67 14.5 8.5 14.5H12.5V16.5C12.5 17.33 13.17 18 14 18C14.83 18 15.5 17.33 15.5 16.5V12.5H17.5C18.33 12.5 19 11.83 19 11C19 10.17 18.33 9.5 17.5 9.5H13.5V7.5C13.5 6.67 12.83 6 12 6Z" fill="url(#paint1_linear_1_2)"/>
    <defs>
    <linearGradient id="paint0_linear_1_2" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
    <stop stopColor="#38bdf8"/>
    <stop offset="1" stopColor="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="paint1_linear_1_2" x1="7" y1="12" x2="19" y2="12" gradientUnits="userSpaceOnUse">
    <stop stopColor="#0284c7"/>
    <stop offset="1" stopColor="#0369a1"/>
    </linearGradient>
    </defs>
  </svg>
);
