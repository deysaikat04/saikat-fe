import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormDataInterface } from "../Login/Login";

interface InputProps {
  type: "text" | "password" | "number" | "email";
  label: string;
  id: string;
  name: string;
  register: UseFormRegister<FormDataInterface>;
  error?: string;
}
const Input = ({ label, type, id, name, error, register }: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        {...register(name as keyof FormDataInterface)}
      />
      <p className="text-sm text-red-500 pt-2">{error}</p>
    </div>
  );
};

export default Input;
