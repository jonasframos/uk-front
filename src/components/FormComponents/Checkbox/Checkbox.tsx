import React from "react";
import Skeleton from "react-loading-skeleton";

interface CheckboxProps {
  text?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  loading?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, checked, onChange, className = 'w-[18px] h-[18px]', labelClassName = 'font-light text-sm', loading }) => {
  const id = React.useId();

  return (
    loading ? <Skeleton width={150} height={20} /> : 
      <div className={`flex items-center ${text ? 'gap-2' : ''} `}>
        <input
          id={id}
          className={`accent-red rounded-[4px] ${className}`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className={labelClassName} htmlFor={id}>{text}</label>
      </div>
  );
};

export default Checkbox;
