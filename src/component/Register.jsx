import { useState } from "react";
import { Mail, Lock, Newspaper, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import img from "./../assets/bg.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../services";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password mismatch. Please make sure your passwords match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      await registerWithEmail(email, password);
      toast.success(
        "Account created! Welcome to FindNews! You can now start exploring the latest news.",
      );
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      let errorMessage = "Registration failed. Please try again with different credentials.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please try logging in instead.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check your email and try again.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      }

      toast.error(errorMessage);
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-screen p-6"
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
                <Newspaper className="w-8 text-white h-8 text-primary" />
                <span className="text-2xl font-bold text-white"> Join FindNews</span>
              </motion.div>
              <p className="text-muted-foreground text-white">
                Create your account to get personalized news and stay informed
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="email"
                    className="text-sm text-white font-medium text-foreground block mb-2"
                  >
                    Email
                  </label>
                  <div className="relative w-full">
                    <Mail className="absolute text-black left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                    className="text-sm text-white font-medium text-foreground block mb-2"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col items-start">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-white text-foreground block mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <button
                    type="submit"
                    className="inline-flex text-white bg-red-800 hover:bg-red-800/60 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2 w-full font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    disabled={isLoading}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isLoading ? "Creating account..." : "Create account"}
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-xs text-white text-center text-muted-foreground"
                >
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="cursor-pointer hover:text-blue-600 underline"
                  >
                    Login
                  </span>
                </motion.p>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
