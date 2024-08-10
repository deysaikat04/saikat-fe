import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  type: "text" | "password" | "number" | "email";
  label: string;
  id: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}
const Input = <T extends FieldValues>({
  label,
  type,
  id,
  name,
  error,
  register,
}: InputProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        {...register(name)}
      />
      <p className="text-sm text-red-500 pt-2">{error}</p>
    </div>
  );
};

export default Input;
