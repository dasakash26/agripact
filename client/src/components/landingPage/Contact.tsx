// import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-primary"
          variants={fadeInUp}
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-600 mb-8">
              Have questions or need assistance? Our team is here to help. Reach out to us through any of the following channels.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:info@agripact.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@agripact.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+18001234567" className="text-gray-600 hover:text-primary transition-colors">
                  +1 (800) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-gray-600">
                  123 AgriTech Plaza, Silicon Valley, CA 94000
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
          >
            <form className="space-y-6">
              <Input placeholder="Your Name" className="w-full" />
              <Input placeholder="Your Email" type="email" className="w-full" />
              <Textarea placeholder="Your Message" className="w-full min-h-[150px]" />
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

