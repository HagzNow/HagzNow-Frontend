import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

export default function Register() {
  return (
    <>
      <section className="container text-center py-5">
        <div className="title  space-y-3">
          <h2 className=" text-4xl font-bold text-mainColor ">ارينا بوك</h2>
          <h2 className="text-4xl font-bold">إنشاء حساب في أرينا بوك</h2>
          <p className=" font-medium text-thirdColor">
            سجل لتبدأ رحلتك الرياضية
          </p>
        </div>

        <form action="" className=" mt-5">
          <div className=" space-x-3 space-y-6 bg-secondColor w-1/2 m-auto p-7 rounded-2xl">
            <div className="flex gap-3 justify-center">
              <div>
                <input
                  type="radio"
                  id="owner"
                  name="role"
                  value="A"
                  class="hidden peer/option1"
                />
                <label
                  for="owner"
                  className="btn bg-secondColor text-2xl text-black"
                >
                  مالك
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="player"
                  name="role"
                  value="B"
                  className="hidden peer/option2"
                  checked
                />
                <label for="player" class="btn bg-mainColor text-2xl ">
                  لاعب
                </label>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                الاسم الاول
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الأول"
                name="fristName"
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                الاسم الاخير
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الاخير"
                name="fristLast"
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
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
                رقم هاتفك
              </label>
              <input
                type="text"
                placeholder="أدخل رقم هاتفك"
                name="phone"
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
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                تاكيد كلمة المرور
              </label>
              <input
                type="text"
                placeholder="أعد إدخال كلمة المرور"
                name="phone"
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            <button type="submit" className="btn bg-mainColor w-3/4">
              إنشاء حساب
            </button>

            <p className=" text-mainColor py-3">
              لدي حساب بالفعل؟ تسجيل الدخول
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
