import React from "react";

export default function Wallet() {
  return (
    <>
      <div className="container w-3/4 ">
        <div className="balance p-3 text-center space-y-3 bg-secondColor rounded-2xl">
          <p>رصيدك الحالي</p>
          <h2 className=" font-bold text-3xl">٥,٢٠٠.٠٠ ج.م</h2>
          <button className="btn mt-2 bg-mainColor">إضافة رصيد</button>
        </div>

        <div className="transaction py-5">
          <h2 className=" text-center mb-3.5 font-bold">سجل المعاملات</h2>
          <div className="header flex p-3 bg-secondColor justify-around rounded-2xl items-center ">
            <p className=" ">الحاله</p>
            <p>المبلغ</p>
            <p>المرجع</p>
            <p>النوع</p>
            <p>التاريخ</p>
          </div>
          <div className="header flex p-3 bg-secondColor justify-around items-center  mt-2">
            <p className=" bg-mainColor p-2 rounded-2xl">مكتمل</p>
            <p>+٥٠٠.٠٠ ج.م</p>
            <p>#٩٨٧٦٥٤</p>
            <p>إيداع</p>
            <p>٢٠٢٤-١٠-٢٦</p>
          </div>
        </div>
      </div>
    </>
  );
}
