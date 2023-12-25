"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useTheme } from "next-themes";
const DatePicker = dynamic(() => import("@/components/reusable/date-picker"), {
  ssr: false,
});

const Analytic = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <main className="">
      <h1 className="purple:text-purple-600">Analytics</h1>
      <DatePicker value={value} setValue={setValue} />
    </main>
  );
};
export default Analytic;
