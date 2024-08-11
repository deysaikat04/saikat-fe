import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ReactDatePickerProps {
  handleChange: (date: Date) => void;
  label: string;
  id: string;
}

const ReactDatePicker = ({ handleChange, label, id }: ReactDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <DatePicker
        selected={date}
        onChange={(date) => {
          if (date) {
            handleChange(date);
            setDate(date);
          }
        }}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 "
      />
    </div>
  );
};

export default ReactDatePicker;
