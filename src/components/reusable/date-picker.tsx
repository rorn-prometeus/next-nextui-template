"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";
import Datepicker, {
  DateValueType,
  PopoverDirectionType,
} from "react-tailwindcss-datepicker";

type Props = {
  value: DateValueType;
  setValue: React.Dispatch<React.SetStateAction<DateValueType>>;
  isRang?: boolean;
  className?: string;
  isInvalid?: boolean;
  popoverDirection?: PopoverDirectionType;
};

const DatePicker = ({
  setValue,
  value,
  isRang,
  className,
  isInvalid,
  popoverDirection,
  ...props
}: Props) => {
  const { theme } = useTheme();
  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <Datepicker
        {...props}
        value={value}
        onChange={handleValueChange}
        asSingle={isRang ? false : true}
        showShortcuts
        useRange={isRang ? true : false}
        popoverDirection={popoverDirection ? popoverDirection : "down"}
        inputClassName={clsx(
          `text-sm text-black dark:text-white rounded-xl bg-default-100 hover:bg-default-200 py-4 px-4 rounded-lg outline-none w-full placeholder:text-sm placeholder:text-default-500 ${
            isInvalid &&
            "bg-pink-100 hover:bg-pink-200 placeholder:text-sm placeholder:!text-danger-500 "
          }`,
          className
        )}
        primaryColor={
          ((theme === "purple" || theme === "purple-dark") && "fuchsia") ||
          "blue"
        }
        placeholder="Please pick a date"
        toggleClassName={`absolute top-1/2 -translate-y-1/2 right-4 text-default-500 ${
          isInvalid && "!text-danger-500"
        }`}
        displayFormat="DD-MM-YYYY"
      />
      {isInvalid && (
        <p className={`text-[12px] ml-1 mt-1 text-danger-500`}>
          Date is required
        </p>
      )}
    </div>
  );
};

export default DatePicker;
