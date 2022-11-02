import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useMutation } from "react-query";

import axios from "axios";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    isLoading,
    isError,
    error,
    mutate: registerUser,
  } = useMutation(
    async (data) => {
      return await axios.post(
        "https://apply-frontend-libraries-be.vercel.app/users/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
    },
    {
      onSuccess: (res) => {
        setMsg(res.data.message);
      },
      onError: (err) => {
        setMsg(err.response?.data.message);
      },
    }
  );

  const onSubmit = (data) => {
    setUserData(data);
    registerUser(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration Form</h1>
        <div>
          <div>Username</div>
          <input
            className="card"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && <span>This field is required</span>}
        <div>
          <div>Email</div>
          <input className="card" {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <div>Password</div>
          <input
            className="card"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && <span>This field is required</span>}
        <div>
          <div>Confirm Password</div>
          <input
            className="card"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        {errors.confirmPassword && <span>This field is required</span>}
        <div>{msg}</div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
