import React from "react";
import { FieldProps, getIn } from "formik";
import "../OutlinedInput/customOutlinedInputStyle.css";
import Skeleton from "react-loading-skeleton";

interface OutlinedMaskedCurrencyInputProps {
  className: string;
  placeholder: string;
  value: string;
  loading?: boolean;
  show: boolean;
}

const OutlinedMaskedCurrencyInput: React.FC<FieldProps & OutlinedMaskedCurrencyInputProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  loading,
  show = true,
  ...props
}) => {
  const formatCurrency = (value: string | number) => {
    const rawValue = String(value).replace(/\D/g, "");
    if (!rawValue) return "R$ 0,00";
    const num = Number(rawValue) / 100;
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(num);
    return formatted;
  };
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFieldValue(field.name, rawValue);
  };

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  if (!show) return null;

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
    <label className="float-label-input w-full">
      <input
        {...field}
        {...props}
        value={formatCurrency(field.value)}
        onChange={onChange}
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

export default OutlinedMaskedCurrencyInput;
