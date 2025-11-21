import React from "react";
import { FieldProps, getIn } from "formik";
import "./customOutlinedEmailsInputStyle.css";
import Skeleton from "react-loading-skeleton";

interface OutlinedEmailsInputProps {
  className: string;
  labelClassName: string;
  placeholder: string;
  loading?: boolean;
  show: boolean;
}

const OutlinedEmailsInput: React.FC<FieldProps & OutlinedEmailsInputProps> = ({
  field,
  form: { touched, errors },
  show = true,
  loading,
  ...props
}) => {
  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  if(!show) return null;

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
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
  );
};

export default OutlinedEmailsInput;
