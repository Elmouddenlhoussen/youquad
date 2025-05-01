
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { user, mail, lock, userPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, resetPassword, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [resetEmail, setResetEmail] = useState('');
  
  // Form errors
  const [loginErrors, setLoginErrors] = useState<{email?: string, password?: string}>({});
  const [registerErrors, setRegisterErrors] = useState<{name?: string, email?: string, password?: string, confirmPassword?: string}>({});
  const [resetError, setResetError] = useState<string | null>(null);
  
  // Handle login form
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: {email?: string, password?: string} = {};
    if (!loginForm.email) errors.email = 'Email is required';
    if (!loginForm.password) errors.password = 'Password is required';
    
    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }
    
    setLoginErrors({});
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      navigate('/profile');
    }
  };
  
  // Handle register form
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: {name?: string, email?: string, password?: string, confirmPassword?: string} = {};
    if (!registerForm.name) errors.name = 'Name is required';
    if (!registerForm.email) errors.email = 'Email is required';
    if (!registerForm.password) errors.password = 'Password is required';
    if (registerForm.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (!registerForm.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }
    
    setRegisterErrors({});
    const success = await register(registerForm.name, registerForm.email, registerForm.password);
    if (success) {
      setActiveTab('login');
    }
  };
  
  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setResetError('Email is required');
      return;
    }
    
    setResetError(null);
    await resetPassword(resetEmail);
  };

  return (
    <div className="container-custom py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-lg py-3">Login</TabsTrigger>
            <TabsTrigger value="register" className="text-lg py-3">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-sand-200 dark:border-sand-700">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <mail className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className={`pl-10 ${loginErrors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {loginErrors.email && <p className="text-sm text-red-500">{loginErrors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('reset')}
                        className="text-sm text-terracotta-500 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <lock className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className={`pl-10 ${loginErrors.password ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t border-sand-200 dark:border-sand-700 pt-4">
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="text-terracotta-500 hover:underline"
                  >
                    Register
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="border-sand-200 dark:border-sand-700">
              <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Enter your details to create a new account</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <user className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="register-name"
                        placeholder="John Doe"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                        className={`pl-10 ${registerErrors.name ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {registerErrors.name && <p className="text-sm text-red-500">{registerErrors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <mail className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className={`pl-10 ${registerErrors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {registerErrors.email && <p className="text-sm text-red-500">{registerErrors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <lock className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        className={`pl-10 ${registerErrors.password ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {registerErrors.password && <p className="text-sm text-red-500">{registerErrors.password}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative">
                      <lock className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        className={`pl-10 ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {registerErrors.confirmPassword && <p className="text-sm text-red-500">{registerErrors.confirmPassword}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Register'}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t border-sand-200 dark:border-sand-700 pt-4">
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-terracotta-500 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reset">
            <Card className="border-sand-200 dark:border-sand-700">
              <CardHeader>
                <CardTitle className="text-2xl">Reset your password</CardTitle>
                <CardDescription>Enter your email to receive a reset link</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <div className="relative">
                      <mail className="absolute left-3 top-3 h-4 w-4 text-sand-500" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="you@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`pl-10 ${resetError ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {resetError && <p className="text-sm text-red-500">{resetError}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending link...' : 'Send Reset Link'}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t border-sand-200 dark:border-sand-700 pt-4">
                <p className="text-sm text-sand-500 dark:text-sand-400">
                  Remember your password?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-terracotta-500 hover:underline"
                  >
                    Back to login
                  </button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
