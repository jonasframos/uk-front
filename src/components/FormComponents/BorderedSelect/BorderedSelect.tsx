import React from "react";
import { FieldProps, getIn } from "formik";
import Skeleton from "react-loading-skeleton";

interface BorderedSelectProps {
  className: string;
  placeholder: string;
  options: { value: string; label: string }[];
  loading: boolean;
}

const BorderedSelect: React.FC<FieldProps & BorderedSelectProps> = ({
  field,
  form: { touched, errors },
  options,
  placeholder,
  loading,
  ...props
}) => {

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  return (
    loading ? (
      <Skeleton height={24} className="mt-[-10px]" width="100%" />
    ) : <label className={`bordered-select`}>
      <select
        {...field}
        {...props}
        className={`bg-white border rounded-[8px]  outline-none border-gray_1 w-full px-5 ${props.className}`}
      >
        <option value=""></option>
        {options.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={`text-gray_2 ${field.value === "" ? "empty" : ""}`}>{placeholder}</span>
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </label>
  );
};

export default BorderedSelect;
