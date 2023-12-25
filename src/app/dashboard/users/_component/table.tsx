import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Todo } from "../page";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type Props = {
  todos: Todo[];
};

export default function TodoTable({ todos }: Props) {
  const renderCell = React.useCallback((todo: Todo, columnKey: React.Key) => {
    const cellValue = todo[columnKey as keyof Todo];

    switch (columnKey) {
      case "id":
        return <p>{todo.id}</p>;
      case "userId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {todo.userId}
            </p>
          </div>
        );
      case "completed":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[todo.completed ? "active" : "paused"]}
            size="sm"
            variant="flat"
          >
            {todo.completed ? "Completed" : "Pending"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="success" content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon className="w-6 h-6" />
              </span>
            </Tooltip>
            <Tooltip color="secondary" content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <PencilIcon className="w-6 h-6" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                // onClick={() => trigger(String(todo.id))}
              >
                <TrashIcon className="w-6 h-6" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      selectionMode="multiple"
      // defaultSelectedKeys={["2"]}
      bottomContent={
        <div className="w-full flex justify-end ">
          <Pagination total={10} initialPage={2} />
        </div>
      }
      bottomContentPlacement="inside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.name}
            align={column.name === "actions" ? "center" : "start"}
          >
            <p className="uppercase">{column.name}</p>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={todos} loadingContent={<Spinner />}>
        {(todo) => (
          <TableRow key={todo.id}>
            {(columnKey) => (
              <TableCell>{renderCell(todo, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
