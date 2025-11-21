import React from "react";
import { FieldProps, getIn } from "formik";
import "./customOutlinedInputStyle.css";
import Skeleton from "react-loading-skeleton";
import { s } from "framer-motion/dist/types.d-CtuPurYT";

interface OutlinedInputProps {
  className: string;
  labelClassName: string;
  placeholder: string;
  loading?: boolean;
  show: boolean;
  subtitle?: string
}

const OutlinedInput: React.FC<FieldProps & OutlinedInputProps> = ({
  field,
  form: { touched, errors },
  show = true,
  loading,
  subtitle,
  ...props
}) => {
  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  if(!show) return null;

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
      <div className="flex flex-col gap-[-2px]">
        <label className={`float-label-input w-full ${props.labelClassName}`}>
          <input
            {...field}
            {...props}
            placeholder=" "
            className={`border-b outline-none border-gray_1 w-full ${props.className}`}
          />
          <span className="text-gray_2">{props.placeholder}</span>
          {fieldTouched && fieldError ? (
            <div className="text-red text-sm text-left">{fieldError as string}</div>
          ) : null}
        </label>
        {subtitle && (<p className="text-gray_2 text-[9pt]">{subtitle}</p>)}
      </div>
  );
};

export default OutlinedInput;
