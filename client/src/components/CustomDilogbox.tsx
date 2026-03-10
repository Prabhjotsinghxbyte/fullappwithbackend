/* import { UserContext } from "../contextApi/UserContextProvider"; */
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useMutation } from "@apollo/client/react";
import { addTodoMutation, deleteTodoMutation } from "../api/querys";
import { updateTodoMutation } from "../api/querys";

const CustomDilogbox = ({
  Trigger,
  Title,
  Deccription,
  hideinput,
  id,
}: {
  Trigger: string;
  Title: string;
  Deccription: string;
  hideinput?: boolean;
  id: number | string;
}) => {
  const [addTodo] = useMutation(addTodoMutation);
  const [updateTodo] = useMutation(updateTodoMutation);
  const [deleteTodo] = useMutation(deleteTodoMutation);

  /* const { userData } = useContext(UserContext)!; */
  const [value, setValue] = useState("");
  const handleClick = async () => {
    if (Trigger === "Edit") {
      /* setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, todo: value } : t))); */
      const response = await updateTodo({
        variables: {
          input: {
            id: id as number,
            todo: value,
          },
        },
      });
      console.log(response);
    } else if (Trigger === "Delete") {
      /* setTodos((prev) => prev.filter((t) => t.id !== id)); */

      const response = await deleteTodo({
        variables: { id: id as number },
      });
      console.log(response);
    } else if (Trigger === "Add New Todo") {
      /* if (userData) { */
      const newTodo = { todo: value, completed: false, userId: 1 };
      /* setTodos((prev) => [...prev, newTodo]); */

      const response = await addTodo({
        variables: {
          input: newTodo,
        },
      });
      console.log(response);
      /* } */
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{Trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Title}</DialogTitle>
          <DialogDescription>{Deccription}</DialogDescription>
        </DialogHeader>
        {!hideinput && <Input onChange={(e) => setValue(e.target.value)} placeholder={Title} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                handleClick();
              }}>
              {Trigger}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDilogbox;
