import { FieldProps, getIn } from "formik";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Skeleton from "react-loading-skeleton";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
const InputMask = require("react-input-mask");

interface CustomDateTimePickerProps {
  placeholder?: string;
  loading?: boolean;
  className?: string;
  subtitle?: string;
}

interface CustomTimeInputProps {
  onChange: (time: string) => void;
  selectedTime: string;
  className?: string
  subtitle?: string;
}

const CustomTimeInput: React.FC<CustomTimeInputProps> = ({
  onChange,
  selectedTime,
  className
}) => {
  const [mask, setMask] = useState<any>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setMask([
      /[0-2]/,
      newValue.startsWith("2") ? /[0-3]/ : /[0-9]/,
      ":",
      /[0-5]/,
      /[0-9]/,
      ":",
      /[0-5]/,
      /[0-9]/,
    ]);
    onChange(newValue);
  };

  useEffect(() => {
    setMask([
      /[0-2]/,
      selectedTime.startsWith("2") ? /[0-3]/ : /[0-9]/,
      ":",
      /[0-5]/,
      /[0-9]/,
      ":",
      /[0-5]/,
      /[0-9]/,
    ]);
  }, []);

  return (
    <InputMask
      mask={mask}
      value={selectedTime}
      maskPlaceholder={null}
      onChange={handleTimeChange}
      placeholder="Hora"
    >
      <input type="text" className={`w-[74px] outline-none ${className}`} />
    </InputMask>
  );
};

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps & FieldProps> = ({
  placeholder,
  className,
  loading = false,
  field,
  form,
  subtitle
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(field.value);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, "0");
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
      const seconds = selectedDate.getSeconds().toString().padStart(2, "0");
      setSelectedTime(`${hours}:${minutes}:${seconds}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!field.value) {
      setSelectedDate(null); // Reset the date when field.value is not provided
    } else {
      const newDate = new Date(field.value);
      const hours = newDate.getHours().toString().padStart(2, "0");
      const minutes = newDate.getMinutes().toString().padStart(2, "0");
      const seconds = newDate.getSeconds().toString().padStart(2, "0");

      setSelectedDate(newDate);
      form.setFieldValue(field.name, newDate.toISOString());
      handleTimeInputChange(`${hours}:${minutes}:${seconds}`);
    }
  }, [field.value]);

  const handleTimeInputChange = (typedTime: string) => {
    if (typedTime === "") {
      // If the input is empty, set it to "00:00"
      typedTime = "00:00:00";
    }

    if (selectedDate) {
      const [hours, minutes, seconds] = typedTime.split(":").map(Number);

      if (
        !isNaN(hours) &&
        !isNaN(minutes) &&
        hours >= 0 &&
        hours <= 23 &&
        minutes >= 0 &&
        minutes <= 59 &&
        seconds >= 0 &&
        seconds <= 59
      ) {
        const newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(seconds);
        setSelectedDate(newDate);
        setSelectedTime(typedTime);
        form.setFieldValue(field.name, newDate.toISOString());
      }
    }
  };

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
              form.setFieldValue(field.name, date.toISOString());
            }}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            customInput={<CustomDateInput placeholderText={placeholder} className={className} />}
          />
        </div>
        <div className="pr-2 inline-block">
          {selectedDate ? (
            <CustomTimeInput
              onChange={handleTimeInputChange}
              selectedTime={selectedTime}
              className={className}
            />
          ) : null}
        </div>
        {/* <button onClick={() => {setSelectedDate(null); setSelectedTime('')}}>X</button> */}
      </div>
      {subtitle && (<p className="text-gray_2 text-[9pt]">{subtitle}</p>)}
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default CustomDateTimePicker;
