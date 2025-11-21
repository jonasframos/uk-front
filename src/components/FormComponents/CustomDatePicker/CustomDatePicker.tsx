import { FieldProps, getIn } from "formik";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Skeleton from "react-loading-skeleton";
import CustomDateInput from "../CustomDateInput/CustomDateInput";

interface CustomDatePickerProps {
  placeholder?: string;
  loading?: boolean;
  className?: string;
  endDate?: boolean;
  subtitle?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps & FieldProps> = ({
  placeholder,
  className,
  loading = false,
  field,
  form,
  endDate = false,
  subtitle
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(field.value ? new Date(field.value) : null);

  useEffect(() => {
    if (field.value) {
      const newDate = new Date(field.value);
      setSelectedDate(newDate);
    } else {
      setSelectedDate(null);
    }
  }, [field.value]);

  const fieldError = getIn(form.errors, field.name);
  const fieldTouched = getIn(form.touched, field.name);

  return loading ? (
    <Skeleton height={24} className="mt-[-10px]" width="100%" />
  ) : (
    <>
      <div className="border-b outline-none border-gray_1 pr-2 inline-block w-full mb-[-30px]">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              if(endDate) date.setHours(23, 59, 59, 999);
              setSelectedDate(date);
              form.setFieldValue(field.name, date ? date.toISOString() : '');
            }}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            customInput={<CustomDateInput placeholderText={placeholder} className={className} />}
          />
        </div>
        {subtitle && (<p className="text-gray_2 text-[9pt]">{subtitle}</p>)}
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </>
  );
};

export default CustomDatePicker;
