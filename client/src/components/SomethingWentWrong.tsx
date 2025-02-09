import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";

export const SomethingWentWrong = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <img
          src="/error-illustration.svg"
          alt="Error illustration"
          className="w-64 h-64 mb-8"
        />
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        Oops! Something went wrong
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-md">
        Don't worry, it's not your fault. Let's get you back on track.
      </p>

      <div className="flex gap-4 mt-8">
        <Button
          variant="default"
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>

        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
