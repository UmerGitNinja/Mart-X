"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface PaymentProps {
  params: {
    OriginUrl: string;
  };
}

const Payment: React.FC<PaymentProps> = ({ params }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (params) {
      const handleButtonClick = async () => {
        try {
          const data = await axios.post("/api/checkout", params);
          localStorage.setItem("OriginUrl", params?.OriginUrl);
          window.location.href = data.data.url;
        } catch (error) {
          console.log(error);
        }
      };
      handleButtonClick();
    }
  }, [params]);
  useEffect(() => {
    const OriginUrl = localStorage.getItem("OriginUrl");
    if (searchParams.get("canceled") && OriginUrl) {
      window.location.href = OriginUrl;
    }
    if (searchParams.get("success") && OriginUrl) {
      window.location.href = `${process.env.NEXT_PUBLIC_MAIN_URL}/track-order`;
    }
  }, [searchParams]);
  const handleButtonClick = async (e) => {
    try {
      const data = await axios.post("/api/checkout", params);

      window.location.href = data.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      className="z-50 rounded-md bg-green-500 px-8 py-4 text-lg font-semibold"
    >
      Pay with Credit Card
    </button>
  );
};

export default Payment;
