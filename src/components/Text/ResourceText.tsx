import React from "react";
import { FoodIcon, GoldIcon, StoneIcon, WoodIcon } from "../../assets/icons";

interface ResourceTextProps {
    resource: string;
    current_storage: number;
    max_storage: number;
    production: number;
}

const storage_color = (percentage: number) => {
    const storage_colors: any = {
        [0.7]: 'text-gray_3',
        [0.9]: 'text-orange',
        [1]: 'text-red'
    };

    if(percentage <= 0.85) return 'text-gray_3';
    if(percentage <= 0.95) return 'text-orange';
    return 'text-red';
}

const ResourceText: React.FC<ResourceTextProps> = ({ resource, current_storage, max_storage, production }) => {

    const resourceIconMap: any = {
        food: <img className='inline-block w-[32px] h-[30px] mr-1' src={FoodIcon} />,
        wood: <img className='inline-block w-[30px] h-[28px] mr-1' src={WoodIcon} />,
        stone: <img className='inline-block w-[30px] h-[30px] mr-1' src={StoneIcon} />,
        gold: <img className='inline-block w-[30px] h-[30px] mr-1' src={GoldIcon} />
    };

    return (
        <div className='flex items-center'>
            <div className='rounded-[25px] bg-white p-[2px] w-[90px] flex justify-center items-center shadow-lg'>
                {resourceIconMap[resource]}
                <span className={`text-sm font-semibold ${storage_color(Math.floor(current_storage)/max_storage)}`}>{Math.floor(current_storage)}</span>
            </div>
            <span className='text-sm ml-1 italic'>+ {production} (por hora)</span>
        </div>
    )

};
export default ResourceText;
