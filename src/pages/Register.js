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
          <input
            className="card"
            placeholder="Username"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && (
          <span className="text-warning">This field is required</span>
        )}
        <div>
          <input
            className="card"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && (
          <span className="text-warning">This field is required</span>
        )}
        <div>
          <input
            className="card"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <span className="text-warning">This field is required</span>
        )}
        <div>
          <input
            className="card"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        {errors.confirmPassword && (
          <span className="text-warning">This field is required</span>
        )}
        {isError ? <h4 className="text-warning">{msg}</h4> : <h4 className="text-success">{msg}</h4>}
        <div>
          <button type="submit">{isLoading ? 'Registering' : 'Register'}</button>
        </div>
      </form>
      <a
          className="App-link"
          href="/"
        >
          Back to Home Page
        </a>
    </div>
  );
}

export default Register;
