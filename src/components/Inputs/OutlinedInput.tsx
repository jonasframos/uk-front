import React from "react";
import { FieldProps, getIn } from "formik";
import Skeleton from "react-loading-skeleton";

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
      <span className="text-gray_2">{props.placeholder}</span>
      <input
        {...field}
        {...props}
        placeholder=" "
        className={`w-full border ${props.className}`}
      />
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default OutlinedInput;
