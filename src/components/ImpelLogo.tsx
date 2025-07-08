import React from 'react';

const ImpelLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      width="400" 
      height="120" 
      viewBox="0 0 400 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red circle with dots pattern */}
      <circle cx="80" cy="60" r="60" fill="#FF2700" />
      
      {/* White dots pattern */}
      <circle cx="50" cy="30" r="4" fill="white" />
      <circle cx="65" cy="30" r="4" fill="white" />
      <circle cx="80" cy="30" r="4" fill="white" />
      <circle cx="95" cy="30" r="4" fill="white" />
      <circle cx="110" cy="30" r="4" fill="white" />
      
      <circle cx="35" cy="45" r="4" fill="white" />
      <circle cx="50" cy="45" r="4" fill="white" />
      <circle cx="65" cy="45" r="4" fill="white" />
      <circle cx="80" cy="45" r="4" fill="white" />
      <circle cx="95" cy="45" r="4" fill="white" />
      <circle cx="110" cy="45" r="4" fill="white" />
      <circle cx="125" cy="45" r="4" fill="white" />
      
      <circle cx="35" cy="60" r="4" fill="white" />
      <circle cx="50" cy="60" r="4" fill="white" />
      <circle cx="65" cy="60" r="4" fill="white" />
      <circle cx="80" cy="60" r="4" fill="white" />
      <circle cx="95" cy="60" r="4" fill="white" />
      <circle cx="110" cy="60" r="4" fill="white" />
      <circle cx="125" cy="60" r="4" fill="white" />
      
      <circle cx="50" cy="75" r="4" fill="white" />
      <circle cx="65" cy="75" r="4" fill="white" />
      <circle cx="80" cy="75" r="4" fill="white" />
      <circle cx="95" cy="75" r="4" fill="white" />
      <circle cx="110" cy="75" r="4" fill="white" />
      
      <circle cx="80" cy="90" r="4" fill="white" />
      <circle cx="80" cy="105" r="4" fill="white" />
      
      {/* IMPEL text */}
      <path d="M160 30H180V90H160V30Z" fill="#555555" />
      <path d="M200 30H220V70H260V90H200V30Z" fill="#555555" />
      <path d="M280 30H300V70C300 75 305 75 310 75H320C325 75 330 75 330 70V30H350V70C350 90 335 95 320 95H310C295 95 280 90 280 70V30Z" fill="#555555" />
      <path d="M370 30H420V50H390V55H415V70H390V75H420V90H370V30Z" fill="#555555" />
      <path d="M440 30H460V75H500V90H440V30Z" fill="#555555" />
      
      {/* GROUP text */}
      <path d="M280 100H340V110H280V100Z" fill="#555555" />
      <path d="M350 100H400V110H350V100Z" fill="#555555" />
      <path d="M410 100H450V110H410V100Z" fill="#555555" />
      <path d="M460 100H500V110H460V100Z" fill="#555555" />
      <path d="M510 100H550V110H510V100Z" fill="#555555" />
    </svg>
  );
};

export default ImpelLogo;
