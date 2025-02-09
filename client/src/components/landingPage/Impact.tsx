// import React from 'react'
import { motion } from 'framer-motion'
import { Users, Sprout, DollarSign } from 'lucide-react'

const impactData = [
  { icon: Users, value: "10,000+", label: "Farmers Empowered" },
  { icon: Sprout, value: "50,000", label: "Hectares Sustainably Farmed" },
  { icon: DollarSign, value: "$100M+", label: "in Fair Trade Transactions" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Impact() {
  return (
    <section id="impact" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          variants={fadeInUp}
        >
          Our Impact
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {impactData.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <item.icon className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
              <p className="text-xl">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

