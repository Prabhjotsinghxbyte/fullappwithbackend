import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { UserContext } from "../contextApi/UserContextProvider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../api/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

const ForgetModule = () => {
  const navigator = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { setUserData, setLogedin } = useContext(UserContext);

  const inputs = [
    {
      label: "User Name",
      type: "text",
      id: "username",
      placeholder: "User Name",
    },
    {
      label: "Reset key",
      type: "text",
      id: "resetKey",
      placeholder: "Reset key",
    },
    {
      label: "New Password",
      type: "password",
      id: "newPassword",
      placeholder: "New Password",
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const isMatch = newPassword === confirmPassword;

    if (!isMatch) {
      setPasswordMatch(false);
      setDialogOpen(true);
    } else {
      const logindata = { username, password: username + "pass" };

      try {
        const apiResponse = await userLogin(logindata);

        if (apiResponse) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("image");
          localStorage.removeItem("userInfo");
        }
        localStorage.setItem("accessToken", apiResponse.accessToken);
        localStorage.setItem("refreshToken", apiResponse.refreshToken);
        localStorage.setItem("image", apiResponse.image);
        setUserData(apiResponse);
        setLogedin(true);
        navigator("/");
      } catch {
        setDialogOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email address and we'll send you a OTP to reset your password</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            {inputs.map(({ id, label, placeholder, type }) => (
              <div key={"l" + id}>
                <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </label>
                <Input key={id} id={id} name={id} type={type} placeholder={placeholder} aria-invalid={!passwordMatch && id === "confirmPassword"} />
              </div>
            ))}
            <AlertDialog open={dialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{passwordMatch ? "Password Changed" : "Password not match"}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {passwordMatch ? "Your new password is set" : "Type Same New Password And Confirm Password"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    variant={"outline"}
                    size={"default"}
                    onClick={() => {
                      setDialogOpen(false);
                      setPasswordMatch(true);
                    }}>
                    Ok
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Remember your password? </span>
          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetModule;
