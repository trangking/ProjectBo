import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Hearder/Hearder";

const Consent_Conditions = () => {
  const navigate = useNavigate();

  const HandleReturnLogin = () => {
    navigate("/");
  };

  const HadleGoMenu = () => {
    navigate("/Menu");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-yellow-100 flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                เงื่อนไขการยินยอม
              </h2>
              <p className="text-gray-600">
                โปรดอ่านและรับทราบเงื่อนไขก่อนทำการประเมิน
              </p>
              <div className="border-t-2 border-green-500 w-16 mx-auto mt-4"></div>
            </div>

            <div className="text-gray-700 space-y-4">
              <p>
                1. วัตถุประสงค์ของแบบประเมินโรคซึมเศร้านั้น
                เพื่อเป็นอีกหนึ่งช่องทางในการประเมินว่าผู้ประเมินนั้น
                เสี่ยงต่อโรคซึมเศร้าหรือไม่
              </p>
              <p>
                2. การประเมินนั้นผู้เข้ารับการประเมินจะต้องประเมิน
                ด้วยความสมัครใจและตอบตามจริงให้มากที่สุด
              </p>
              <p>
                3. ข้อมูลที่รวบรวมจะถูกใช้เพื่อให้ความช่วยเหลือ
                ในครั้งต่อไปหรือสามารถติดต่อได้โดยตรง ผ่านช่องทาง
                xxx-xxx-xxxx-xxxx-xxx
              </p>
              <p>
                4. ความยินยอม: ในการดำเนินการประเมินนี้
                แสดงว่าคุณเข้าใจเงื่อนไขการเข้าร่วมและ
                ความยินยอมในการเข้าร่วมการประเมิน
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={HandleReturnLogin}
                className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={HadleGoMenu}
                className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
              >
                ยอมรับ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consent_Conditions;
