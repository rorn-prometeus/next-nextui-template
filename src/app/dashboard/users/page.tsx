"use client";

import React from "react";
import TodoTable from "./_component/table";
import { Button } from "@nextui-org/button";
import AddUser from "./_component/add-user";
import useSWR from "swr";

type Props = {};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Users = (props: Props) => {
  const { data, isLoading, error } = useSWR<Todo[]>("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    )
  );
  return (
    <div>
      <div className="flex justify-end">
        <AddUser />
      </div>
      {data?.length && <TodoTable todos={data} />}
    </div>
  );
};

export default Users;
