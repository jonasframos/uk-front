import { FieldProps, getIn } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Skeleton from "react-loading-skeleton";
import CustomDateInput from "../CustomDateInput/CustomDateInput";

interface DayAndMonthPickerProps {
  placeholder?: string;
  loading?: boolean;
}

const DayAndMonthPicker: React.FC<DayAndMonthPickerProps & FieldProps> = ({
  placeholder,
  loading = false,
  field,
  form,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(field.value);

  useEffect(() => {
    if (!field.value) {
      setSelectedDate(null);
    } else {
      
      const year = moment().year();
      const [day, month] = field.value.split('/').map(Number);

      const newDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      setSelectedDate(newDate.toDate());
      form.setFieldValue(field.name, moment(newDate).format("DD/MM"));
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
              setSelectedDate(date);
              form.setFieldValue(field.name, moment(date).format("DD/MM"));
            }}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            dateFormat="dd/MM"
            locale="pt-BR"
            customInput={<CustomDateInput placeholderText={placeholder} />}
          />
        </div>
      </div>
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default DayAndMonthPicker;
