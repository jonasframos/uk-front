import React from "react";
import Skeleton from "react-loading-skeleton";
import { Colors } from "../../../utils/constants/style";

interface SwitchToggleProps {
  text?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  backgroundColor?: string;
  isLoading?: boolean;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ text, checked, onChange, backgroundColor, isLoading }) => {
  backgroundColor = backgroundColor ?? Colors.red;

  return (
    <div className={`flex items-center ${text && 'gap-2'} `}>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        {isLoading ? (<Skeleton height={15} width={120} />) : <>
          <div style={{ background: checked ? backgroundColor : Colors.gray_05 }} className="relative w-9 h-5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          <span className="font-light text-sm ml-2 text-black">{text}</span>
        </>}
      </label>
    </div>
  );
};

export default SwitchToggle;
