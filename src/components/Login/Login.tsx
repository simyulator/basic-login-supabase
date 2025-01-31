import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabaseClient";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/24/solid";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <Card
        theme={{
          root: {
            base: "shadow-2xl",
            children: "flex",
          },
        }}
        className="w-full max-w-4xl bg-white horizontal"
      >
        <div className="w-1/2 min-h-[350px] bg-gradient-to-b from-blue-500 to-blue-300 flex items-center justify-center p-6">
          <HomeIcon className="h-16 w-16 text-white" />
        </div>

        <div className="w-1/2 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Bots Pvt Ltd.</h1>
            <p className="text-gray-500">
              Welcome back! Login to your account to continue.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
              <div>
                <Button
                  color="blue"
                  type="submit"
                  className="w-full rounded-full"
                >
                  Log in
                </Button>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <a href="#" className="hover:underline">
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
