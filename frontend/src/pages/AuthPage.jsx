import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../hooks/use-toast";

const AuthPage = () => {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (!signInData.email || !signInData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Demo mode - any email/password works
    const userData = {
      name: signInData.email.split("@")[0],
      email: signInData.email,
      id: "demo-user-" + Date.now()
    };

    login(userData);
    toast({
      title: "Welcome back!",
      description: "Successfully signed in to Festive Funds"
    });
    
    navigate("/select-account");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      toast({
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Demo mode - create user account
    const userData = {
      name: signUpData.name,
      email: signUpData.email,
      id: "demo-user-" + Date.now()
    };

    login(userData);
    toast({
      title: "Account created!",
      description: "Welcome to Festive Funds"
    });
    
    navigate("/select-account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600 mb-2">
            festivefunds
          </CardTitle>
          <p className="text-gray-600">
            Join India's #1 festival crowdfunding platform
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData(prev => ({ 
                      ...prev, 
                      name: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData(prev => ({ 
                      ...prev, 
                      confirmPassword: e.target.value 
                    }))}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="bg-green-50 p-3 rounded-lg">
              🎭 <strong>Demo Mode:</strong> Use any email and password to sign in!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;