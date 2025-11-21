import React from "react";
import { FieldProps, getIn } from "formik";
import "../OutlinedInput/customOutlinedInputStyle.css";
import Skeleton from "react-loading-skeleton";
const InputMask = require("react-input-mask");

interface OutlinedMaskedInputProps {
  className: string;
  placeholder: string;
  mask: string;
  alwaysShowMask: boolean;
  maskPlaceholder: string;
  value: string;
  loading?: boolean;
  show: boolean;
}

const OutlinedMaskedInput: React.FC<FieldProps & OutlinedMaskedInputProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  loading,
  show = true,
  ...props
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercaseValue = e.target.value.toUpperCase();
    setFieldValue(field.name, uppercaseValue);
  };

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  if (!show) return null;

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
    <InputMask
      mask={props.mask}
      alwaysShowMask={props.alwaysShowMask}
      maskPlaceholder={null}
      value={props.value}
      onChange={onChange}
    >
      <label className="float-label-input w-full">
        <input
          {...field}
          {...props}
          placeholder=" "
          className={`border-b outline-none border-gray_1 w-full ${props.className}`}
        />
        <span className="text-gray_2">{props.placeholder}</span>
        {fieldTouched && fieldError ? (
          <div className="text-red text-sm text-left">
            {fieldError as string}
          </div>
        ) : null}
      </label>
    </InputMask>
  );
};

export default OutlinedMaskedInput;
