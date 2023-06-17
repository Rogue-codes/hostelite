"use client";
import axios from "axios";
import React, { useState } from "react";
import {BsShieldFillCheck} from 'react-icons/bs'
import { toast } from 'react-toastify';

interface formdata {
  name: string;
  email: string;
  password: string;
}
export default function Page() {
  const [formData, setFormData] = useState<formdata>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [passwordChecker, setPasswordChecker] = useState<boolean>(false);

  // sign up
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    formData.password !== confirmPassword;
    e.preventDefault();
    console.log(formData);
    try {
      const { name, email, password } = formData;
      const res = await axios.post(`${baseURL}/admin/signup`, {
        name,
        email,
        password,
      });
      toast.success(`Registration successfull.`)
      console.log(res.data.data);
    } catch (error) {
      toast.error(`An error occurred while creating your account`)
      console.log(error)
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="w-[90%] lg:w-[50%] px-4 lg:px-24 py-8 lg:h-[70%] rounded-lg shadow-lg relative bg-white z-20">
        <h2 className="text-lg text-blue-900 text-center font-bold text">
          Register your account
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-2">
            <label htmlFor="" className="block text-xs text-blue-900">
              Name
            </label>
            <input
              className="w-full text-blue-900 px-2 rounded-md h-12 border border-blue-900 focus:outline-none"
              type="text"
              name="Name"
              id="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="block text-xs text-blue-900">
              Email
            </label>
            <input
              className="w-full px-2 text-blue-900 rounded-md h-12 border border-blue-900 focus:outline-none"
              type="email"
              name="Email"
              id="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="w-[48%]">
              <label htmlFor="" className="block text-xs text-blue-900">
                Password
              </label>
              <input
                className="w-full px-2 text-blue-900 rounded-md h-12 border border-blue-900 focus:outline-none"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="w-[48%]">
              <label htmlFor="" className="block text-xs text-blue-900">
                Confirm Password
              </label>
              <input
                className="w-full px-2 text-blue-900 rounded-md h-12 border border-blue-900 focus:outline-none"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setPasswordChecker(true)}
              />
            </div>
          </div>
          {passwordChecker && <p className="text-xs mt-3 inline text-blue-900 font-bold">Password match: {formData.password !== confirmPassword ? <BsShieldFillCheck className="inline" size="15" color="red"/> : <BsShieldFillCheck className="inline" size="15" color="green"/>}</p> }

          <button className="w-full bg-blue-900 mt-8 text-white py-3 rounded-md ">
            Register
          </button>
        </form>
      </div>

      <div className="w-full h-full absolute left-0 top-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/assets/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full h-full absolute top-0 z-10 left-0 bg-blue-900 opacity-50"></div>
    </div>
  );
}
