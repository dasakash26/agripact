// import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

const solutions = [
  "Transparent communication between farmers and buyers",
  "Secure contract management and enforcement",
  "Timely and guaranteed payments",
  "Price negotiation tools for fair agreements",
  "Market risk reduction through assured buyers",
  "Enhanced income stability for farmers"
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function ProblemSolution() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeInUp}
        >
          Solving Agricultural Market Challenges
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-semibold mb-6">The Problem</h3>
            <p className="text-gray-600 mb-6">
              Farmers often face uncertainties in market access, leading to fluctuating incomes and financial instability. Traditional farming practices lack guaranteed buyers, leaving farmers vulnerable to market volatility and unfair pricing.
            </p>
            <h3 className="text-2xl font-semibold mb-6">Our Solution</h3>
            <p className="text-gray-600 mb-6">
              AgriPact provides a comprehensive platform that facilitates assured contract farming agreements between farmers and buyers. Our innovative approach ensures:
            </p>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">How AgriPact Works</h4>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span>Farmers and buyers register on the AgriPact platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span>Farmers list their produce and desired terms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span>Buyers browse listings and initiate contract negotiations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                    <span>Smart contracts are created and agreed upon by both parties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                    <span>Secure payments are processed through the platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">6</span>
                    <span>Both parties benefit from a stable, transparent agreement</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

