import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
    const naviagte = useNavigate();
    const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
    const validationSchema = object({
        email: string("البريد الإلكتروني يجب أن يكون نصًّا")
            .required("البريد الإلكتروني مطلوب")
            .email("يجب إدخال بريد إلكتروني صالح"),
        password: string()
            .required("كلمة المرور مطلوبة")
            .matches(
                passwordRegx,
                "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد على الأقل، ورقم واحد على الأقل."
            ),
    });

    async function sendDataToLogin(values) {
        console.log(values);

        try {
            const option = {
                url: "http://localhost:3000/auth/login",
                method: "POST",
                data: values,
            };

            const { data } = await axios.request(option);
            console.log("asd" + data);

            localStorage.setItem("token", data.token);
            setTimeout(() => {
                naviagte("/home");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        onSubmit: sendDataToLogin,
        validationSchema,
    });
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

                <form action="" className=" mt-5" onSubmit={formik.handleSubmit}>
                    <div className=" space-x-3 space-y-6 bg-secondColor w-1/2 m-auto p-7 rounded-2xl">

                        <div className="flex flex-col space-y-1.5 mt-5">
                            <label htmlFor="" className=" text-start">
                                بريدك الإلكتروني
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل بريدك الإلكتروني"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
                            />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <p className=" text-red-500 font-semibold">
                                {formik.errors.email}
                            </p>
                        )}
                        <div className="flex flex-col space-y-1.5 mt-5">
                            <label htmlFor="" className=" text-start">
                                كلمة المرور
                            </label>
                            <input
                                type="text"
                                placeholder="أأدخل كلمة المرور"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
                            />
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <p className=" text-red-500 font-semibold">
                                {formik.errors.password}
                            </p>
                        )}

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
