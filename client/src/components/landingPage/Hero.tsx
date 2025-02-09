import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('https://plus.unsplash.com/premium_photo-1675866446878-fb80455b12ce?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <motion.div
        className="container mx-auto px-4 text-center text-white relative z-20"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.h1
          className="text-5xl font-bold mb-6 sm:text-6xl md:text-7xl"
          variants={fadeInUp}
        >
          Assured Contract Farming for{" "}
          <span className="text-green-400">Stable Markets</span>
        </motion.h1>
        <motion.p
          className="text-xl mb-8 sm:text-2xl md:text-3xl max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          AgriPact: Connecting Farmers to Secure Buyers and Guaranteed Income
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-3"
            >
              Start Contract Farming
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
          >
            Learn More <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
