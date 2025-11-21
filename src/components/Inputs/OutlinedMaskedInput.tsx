import React from "react";
import { FieldProps, getIn } from "formik";
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
    </InputMask>
  );
};

export default OutlinedMaskedInput;
