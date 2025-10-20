import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

export default function Login() {
    return (
        <>
            <section className="container text-center py-5">
                <div className="title  space-y-3">
                    <h2 className=" text-4xl font-bold text-mainColor ">ارينا بوك</h2>
                    <h2 className="text-4xl font-bold">ادخل الى أرينا بوك</h2>
                    <p className=" font-medium text-thirdColor">
                        سجل فى ارينا بوك
                    </p>
                </div>

                <form action="" className=" mt-5">
                    <div className=" space-x-3 space-y-6 bg-secondColor w-1/2 m-auto p-7 rounded-2xl">

                        <div className="flex flex-col space-y-1.5 mt-5">
                            <label htmlFor="" className=" text-start">
                                بريدك الإلكتروني
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل بريدك الإلكتروني"
                                name="email"
                                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 mt-5">
                            <label htmlFor="" className=" text-start">
                                كلمة المرور
                            </label>
                            <input
                                type="text"
                                placeholder="أأدخل كلمة المرور"
                                name="password"
                                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
                            />
                        </div>

                        <button type="submit" className="btn bg-mainColor w-3/4">
                            تسجيل الدخول
                        </button>

                        <p className=" text-mainColor py-3">
                            نسيت كلمة المرور؟
                        </p>
                        <p>او</p>

                        <div className="flex flex-col  space-y-2 items-center w-3/4 m-auto">
                            <button className="p-4 border rounded-2xl w-full bg-white border-thirdColor flex justify-center  items-center gap-3">
                                <FaGoogle /> المتابعة باستخدام جوجل
                            </button>
                            <button className="p-4 border rounded-2xl w-full bg-white border-thirdColor flex justify-center  items-center gap-3">
                                <FaFacebookF /> المتابعة باستخدام فيسبوك
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}
