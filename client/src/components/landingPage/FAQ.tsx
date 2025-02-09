// import React from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "What makes AgriPact different from other agricultural platforms?",
    answer: "AgriPact leverages cutting-edge blockchain technology and AI to provide a secure, transparent, and efficient marketplace. We focus on direct farmer-to-buyer connections, sustainable practices, and data-driven insights, setting us apart in the agricultural technology sector."
  },
  {
    question: "How does AgriPact ensure the quality of products and reliability of users?",
    answer: "We implement a robust verification process for all users and employ a rating system based on transaction history. Our smart contracts include quality assurance clauses, and we offer dispute resolution services to maintain high standards across our platform."
  },
  {
    question: "Can AgriPact be used for international trade?",
    answer: "AgriPact is designed to facilitate both local and international agricultural trade. We provide tools for currency conversion, international shipping logistics, and compliance with various trade regulations to support global transactions."
  },
  {
    question: "What kind of support does AgriPact offer to its users?",
    answer: "We offer 24/7 customer support, educational resources on best practices in agri-business, webinars with industry experts, and a community forum for knowledge sharing among users. Our team is dedicated to helping you succeed on our platform."
  },
  {
    question: "How does AgriPact contribute to sustainable agriculture?",
    answer: "AgriPact promotes sustainable farming practices by offering incentives for eco-friendly methods, providing educational resources on sustainability, and facilitating connections between environmentally conscious buyers and sellers. We're committed to creating a greener future for agriculture."
  }
]

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeIn}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

