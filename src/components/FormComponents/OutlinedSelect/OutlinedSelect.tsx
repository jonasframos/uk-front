import React from "react";
import { FieldProps, getIn } from "formik";
import Skeleton from "react-loading-skeleton";

interface OutlinedSelectProps {
  className: string;
  placeholder: string;
  options: { value: string; label: string }[];
  loading: boolean;
  allowEmptyOption: boolean;
}

const OutlinedSelect: React.FC<FieldProps & OutlinedSelectProps> = ({
  field,
  form: { touched, errors },
  options,
  placeholder,
  loading,
  allowEmptyOption=true,
  ...props
}) => {

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  return (
    loading ? (
      <Skeleton height={24} className="mt-[-10px]" width="100%" />
    ) : <label className={`float-label-select`}>
      <select
        {...field}
        {...props}
        className={`bg-white pl-[-5px] border-b outline-none border-gray_1 w-full ${props.className}`}
      >
        {allowEmptyOption ? <option value=""></option> : null}
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

export default OutlinedSelect;
