import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "AgriPact has revolutionized how we do business. The transparency and efficiency are unmatched in the industry.",
    author: "John Doe",
    role: "Large-scale Farmer, USA",
    avatarSrc:
      "https://plus.unsplash.com/premium_photo-1664476788423-7899ac87bd7f?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "As a small farmer, I never thought I'd have access to global markets. AgriPact has leveled the playing field for us.",
    author: "Maria Garcia",
    role: "Small-scale Farmer, Mexico",
    avatarSrc: "https://images.unsplash.com/photo-1439778615639-28529f7628bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9vciUyMGZhcm1lciUyMGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
      "The market insights provided by AgriPact have been game-changing for our procurement strategy.",
    author: "Yuki Tanaka",
    role: "Agribusiness CEO, Japan",
    avatarSrc: "https://plus.unsplash.com/premium_photo-1682095379852-8ce2bc3c1c59?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Testimonial() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeInUp}
        >
          What Our Users Say
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Quote className="h-12 w-12 text-primary mb-4" />
                  <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <div className="relative w-20 h-20 mb-4 mx-auto">
                      <img
                        src={testimonial.avatarSrc}
                        alt={testimonial.author}
                        className="object-cover rounded-full w-full h-full"
                      />
                    </div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
