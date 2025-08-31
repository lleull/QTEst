import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, Newspaper } from "lucide-react";
import { loginWithEmail, loginWithGoogle } from "../services";
import toast from "react-hot-toast";
import img from "./../assets/bg.jpg";
import { Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
      toast.success("Login successful! Welcome back to FindNews.");
    } catch (err) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full z-10">
        <img src={img} alt="Background" className="fixed inset-0 w-full h-full object-cover z-0 " />
        <div className="w-full h-full bg-black/60 top-0 fixed left-0" />
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col z-20 items-center justify-center min-h-screen p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg shadow-2xl p-6">
            {/* Header */}
            <div className="space-y-1 text-center mb-6">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <Newspaper className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-white">FindNews</span>
              </motion.div>
              <p className="text-muted-foreground  text-white">
                Sign in to your account to continue reading the latest news
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="email"
                    className="text-sm  text-white font-medium text-foreground block"
                  >
                    Email
                  </label>
                  <div className="relative w-full">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="password"
                    className="text-sm  text-white font-medium text-foreground block"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center bg-red-500 text-white justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </motion.form>
              <h2
                onClick={() => navigate("/register")}
                className="inline-flex cursor-pointer items-center text-white justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                Create an account
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
