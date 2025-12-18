import React from "react";

interface TierTextProps {
  tier: string;
  className?: string;
}

const TierText: React.FC<TierTextProps> = ({ tier, className}) => {
    const tier_colors: any = {
        'S+': 'bg-[#FFD700] text-[#000000]', //gold text_black
        'S': 'bg-[#e6da07] text-[#000000]', //yellow text_black
        'A+': 'bg-[#2f964c] text-[#ffffff]', //lighter green text_white
        'A': 'bg-[#164523] text-[#ffffff]', //dark green text_white
        'B+': 'bg-[#2281a1] text-[#ffffff]', //lighter blue text_white
        'B': 'bg-[#1837a8] text-[#ffffff]', //dark blue text_white
        'C+': 'bg-[#969696] text-[#ffffff]', //lighter gray text_white
        'C': 'bg-[#383838] text-[#ffffff]', //dark gray text_white
    };
    return <span className={`px-2 rounded-[20px] text-center text-md shadow-lg font-semibold ${tier_colors?.[tier]} ${className}`}>{tier?.padEnd(2, ' ')}</span>
};

export default TierText;
