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
import { UserContext } from "../contextApi/UserContextProvider";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { addTodoMutation } from "../api/querys";

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

  const { userData, setTodos } = useContext(UserContext)!;
  const [value, setValue] = useState("");
  const handleClick = async () => {
    if (Trigger === "Edit") {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, todo: value } : t)));
    } else if (Trigger === "Delete") {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } else if (Trigger === "Add New Todo") {
      if (userData) {
        const newTodo = { todo: value, completed: false, userId: 1 };
        /* setTodos((prev) => [...prev, newTodo]); */
        const response = await addTodo({
          variables: {
            input: newTodo,
          },
        });
        console.log(response.data.addTodo);
      }
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
