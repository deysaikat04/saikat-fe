import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/auth/authSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../Input";

export interface FormDataInterface {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least 6 character(s)." }),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const form = useForm<FormDataInterface>({
    defaultValues: {
      email: "jake@email.com",
      password: "123456",
    },
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormDataInterface, event: any) => {
    event.preventDefault();
    dispatch(login(data));
  };

  return (
    <div>
      {authState?.loginError ? (
        <p className="text-sm text-red-500 pt-2 text-center">
          {authState?.loginError}
        </p>
      ) : null}

      <form
        action="#"
        method="POST"
        className="space-y-4 pt-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          label={"Email"}
          type={"email"}
          id={"email"}
          name={"email"}
          error={errors.email?.message}
          register={register}
        />

        <Input
          label={"Password"}
          type={"password"}
          id={"password"}
          name={"password"}
          error={errors.password?.message}
          register={register}
        />

        <div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
