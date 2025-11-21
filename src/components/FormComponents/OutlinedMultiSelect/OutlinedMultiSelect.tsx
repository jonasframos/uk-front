import React, { useRef, useState } from "react";
import { FieldProps, getIn } from "formik";
import Skeleton from "react-loading-skeleton";
import { ArrowDown2 } from "iconsax-react";

interface OutlinedMultiSelectProps {
  className: string;
  placeholder: string;
  options: { value: string; label: string }[];
  loading: boolean;
  allowEmptyOption: boolean;
}

const OutlinedMultiSelect: React.FC<FieldProps & OutlinedMultiSelectProps> = ({
  field,
  form: { setFieldValue, touched, errors },
  options,
  placeholder,
  loading,
  allowEmptyOption = true,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  // Ensure value is always an array
  const value: string[] = Array.isArray(field.value) ? field.value : [];

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    let newValue;
    if (value.includes(optionValue)) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      newValue = [...value, optionValue];
    }
    setFieldValue(field.name, newValue);
  };

  const handleRemove = (optionValue: string) => {
    setFieldValue(field.name, value.filter((v) => v !== optionValue));
  };

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
    <div ref={ref} className="relative w-full">
      <div
        className={`flex flex-wrap bg-white pl-[-5px] border-b outline-none border-gray_1 w-full pb-1 ${props.className} ${fieldTouched && fieldError ? "border-red" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
        {value.length === 0 && (
          <span className="text-gray_2">{placeholder}</span>
        )}
        {value.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <span
              key={val}
              className="flex items-center bg-gray_2 text-white rounded-full px-2 py-0.5 mr-2 mb-1 text-xs"
              onClick={e => e.stopPropagation()}
            >
              {opt?.label ?? val}
              <button
                type="button"
                className="ml-3 text-blue-700 hover:text-blue-900"
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
              >
                ×
              </button>
            </span>
          );
        })}
        <span className="ml-auto flex items-center">
          <ArrowDown2 className={`transition-transform ${open ? "rotate-180" : ""}`} size={12} />
        </span>
      </div>
      {open && (
        <div className="absolute z-10 mt-1 left-0 w-full bg-white border border-gray_1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {allowEmptyOption && (
            <div
              className="px-4 py-2 hover:bg-gray_02 cursor-pointer"
              onClick={() => setFieldValue(field.name, [])}
            >
              Limpar seleção
            </div>
            )}
          <div className="left-0 w-full border-t border-gray_08"></div>
            
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray_02 flex items-center ${
                value.includes(option.value) ? "bg-gray_02" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                readOnly
                className="mr-2 accent-red"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left mt-1">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default OutlinedMultiSelect;