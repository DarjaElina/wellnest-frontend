import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { LoginInput } from "@/types/auth.types";
import { signInSchema } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/helper/error";
import { BACKEND_URL } from "@/config";
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("response from login mutation", response);
    },
    onError: (res) => {
      console.log("error from login mutation", res);
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const { username, password } = data;
    try {
      await loginMutation.mutateAsync({ username, password });
      navigate("/dashboard");
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardHeader className="text-center pb-0">
        <h1 className="text-3xl font-bold text-foreground">
          Log In to Wellnest
        </h1>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-brand-primary hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-2 hover:shadow-md transition cursor-pointer"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link
            to="/register"
            className="text-brand-primary hover:underline font-medium"
          >
            Create new account
          </Link>
        </p>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 mt-4 hover:shadow-md transition cursor-pointer"
          onClick={() => {
            window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}
