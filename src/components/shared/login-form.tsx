import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardHeader className="text-center pb-0">
        <h1 className="text-3xl font-bold text-foreground">Log In to Wellnest</h1>
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
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <Button className="w-full mt-2 hover:shadow-md transition">
          Log In
        </Button>

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
