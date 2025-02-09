import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Create Your Profile",
    description:
      "Sign up and showcase your farm or business with detailed information.",
  },
  {
    title: "Connect with Partners",
    description:
      "Find and connect with potential buyers or sellers that match your needs.",
  },
  {
    title: "Negotiate Deals",
    description:
      "Use our platform to negotiate terms, prices, and conditions securely.",
  },
  {
    title: "Complete Transactions",
    description:
      "Finalize deals with our blockchain-backed smart contracts for full transparency.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeInUp}
        >
          How AgriPact Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <div className="m-20">
              <img src="/img/logoImg.png" alt="AgriPact platform interface" />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ol className="space-y-8">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-center text-primary font-semibold">
              <span>Start your journey today</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
