import { FieldInputProps, FieldProps, getIn } from "formik";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Skeleton from "react-loading-skeleton";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import { formatDate } from "../../../utils/functions/formatters";
import { arrayUnique } from "../../../utils/functions/functions";

interface TagsCustomDatePickerProps {
  placeholder?: string;
  loading?: boolean;
  className?: string;
  targetFieldName: string;
}

const TagsCustomDatePicker: React.FC<TagsCustomDatePickerProps & FieldProps> = ({
  placeholder,
  className,
  loading = false,
  field,
  form,
  targetFieldName,
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
    <div>
      <div className="border-b outline-none border-gray_1">
        <div className="pr-2 inline-block">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              form.setFieldValue(field.name, date ? formatDate(date) : '');
              form.setFieldValue(targetFieldName, [...form.values[targetFieldName], formatDate(date)].filter(arrayUnique));
              form.setFieldValue(field.name, '');
            }} 
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            customInput={<CustomDateInput placeholderText={placeholder} className={className} />}
          />
        </div>
      </div>
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default TagsCustomDatePicker;
