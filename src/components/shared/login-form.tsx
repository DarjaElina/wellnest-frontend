import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { login } from "@/services/auth";
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
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/helper/error";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (res) => {
      console.log(res);
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginInput) => {
    // even though user logs in with email, spring backend expects username field
    const { username, password } = data;
    try {
      const response = await loginMutation.mutateAsync({
        username,
        password,
      });
      const { accessToken } = response
      dispatch(loginSuccess({ token: accessToken }));
      navigate('/dashboard');
    } catch (error) {
      showErrorToast(error)
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
            <Button className="w-full mt-2 hover:shadow-md transition cursor-pointer">
              Log In
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
      </CardContent>
    </Card>
  );
}
