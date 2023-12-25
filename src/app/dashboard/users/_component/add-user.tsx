"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/reusable/date-picker";
import { DateValueType } from "react-tailwindcss-datepicker";

const addUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
});

type AddUser = z.infer<typeof addUserSchema>;

export default function AddUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
  } = useForm<AddUser>({
    resolver: zodResolver(addUserSchema),
  });

  async function onSubmit(data: AddUser) {
    // console.log(data);
    await new Promise((resoveer) => setTimeout(resoveer, 2000));
    reset();
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" className=" mb-5">
        Add User
        <PlusIcon className="w-6 h-6" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="4xl"
        className="!overflow-visible"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-5">
                    <Input
                      autoFocus
                      label="First Name"
                      variant="flat"
                      isInvalid={errors.firstName && true}
                      {...register("firstName")}
                      errorMessage={
                        errors.firstName && errors.firstName.message?.toString()
                      }
                    />
                    <Input
                      label="Last Name"
                      variant="flat"
                      {...register("lastName")}
                      isInvalid={errors.lastName && true}
                      errorMessage={
                        errors.lastName && errors.lastName.message?.toString()
                      }
                    />
                    <Input
                      label="Email"
                      variant="flat"
                      {...register("email")}
                      isInvalid={errors.email && true}
                      errorMessage={
                        errors.email && errors.email.message?.toString()
                      }
                    />
                    <DatePicker
                      value={date}
                      setValue={setDate}
                      className=""
                      isInvalid={isSubmitted && !date?.startDate && true}
                      popoverDirection="up"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
