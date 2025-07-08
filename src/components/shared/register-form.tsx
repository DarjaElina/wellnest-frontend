import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { signUp } from "@/services/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"

const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const newUserMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      console.log(response)
    },
  });


  const onSubmit = async (data: RegisterFormValues) => {
    const {firstName, lastName, email, password} = data
    console.log(firstName, lastName, email, password)
    try {
      const response = await newUserMutation.mutateAsync({
        firstName,
        lastName,
        email,
        password,
        role: ["user"],
      });;
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardHeader className="text-center pb-0">
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground text-sm mt-1">
            Join Wellnest and start reflecting with care 🌿
          </p>
      </CardHeader>

      <CardContent className="mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Smith"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button
              type="submit"
              className="w-full mt-2 hover:shadow-md transition cursor-pointer"
            >
              Sign Up
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              <span>Already have an account? </span>
              <Link
                to="/login"
                className="text-brand-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


