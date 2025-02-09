// import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Handshake, FileSignature, BarChart, Shield, Sprout, Truck } from 'lucide-react'

const features = [
  { icon: Handshake, title: "Assured Contracts", description: "Secure agreements between farmers and buyers for guaranteed market access." },
  { icon: FileSignature, title: "Smart Contracts", description: "Blockchain-powered contracts ensuring transparency and enforceability." },
  { icon: BarChart, title: "Price Stability", description: "Fair and stable pricing mechanisms to protect farmers from market fluctuations." },
  { icon: Shield, title: "Risk Mitigation", description: "Reduced market risks through pre-agreed terms and conditions." },
  { icon: Sprout, title: "Sustainable Practices", description: "Promotion of sustainable farming methods through long-term contracts." },
  { icon: Truck, title: "Streamlined Logistics", description: "Integrated supply chain management for efficient produce delivery." },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeInUp}
        >
          Empowering Features for Assured Farming
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

