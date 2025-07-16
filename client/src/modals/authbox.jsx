import { useState } from "react";
import { X } from "lucide-react";
import { signup, login } from "../api/auth.api";
import { toast } from "react-toastify";

export default function AuthBox({ setIsAuthModalOpen, setIsLoggedIn }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const toggleMode = () => setIsSignup((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = isSignup
        ? await signup(formData)
        : await login(formData);

      setIsLoggedIn(true);
      setIsAuthModalOpen(false);
      console.log("Success:", response);
    } catch (err) {
      console.error("Auth error:", err.message);
      toast.error(err.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative w-[90%] md:max-w-md bg-white p-4 md:p-6 rounded-md shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          onClick={() => setIsAuthModalOpen(false)}
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 justify-center">
          <img
            src="/images/logo-full.svg"
            alt="Sprouto Logo"
            className="w-[100px]"
          />
          <h1 className="hidden md:block text-lg font-semibold">
            Let’s make www special!
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-center">
          {isSignup ? "Create Account" : "Log In"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 rounded border"
              required
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded border"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-black text-white p-2 rounded hover:opacity-90 disabled:opacity-50"
              disabled={loading}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
        )}

        {!loading && (
          <p className="text-sm mt-3 text-center">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={toggleMode}
              className="font-bold underline cursor-pointer"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
