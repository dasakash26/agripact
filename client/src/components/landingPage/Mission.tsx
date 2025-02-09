import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Mission() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-xl mb-6 text-gray-600">
              At AgriPact, we're on a mission to revolutionize the agricultural industry by creating a sustainable, transparent, and efficient ecosystem that benefits both farmers and buyers.
            </p>
            <p className="text-xl mb-6 text-gray-600">
              We believe in empowering farmers with cutting-edge technology, fair pricing, and direct access to global markets, while providing buyers with high-quality, traceable produce.
            </p>
            <p className="text-xl text-gray-600">
              Together, we're building a future where sustainable farming practices thrive, communities prosper, and everyone has access to nutritious, ethically-sourced food.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/sustainable-farming.jpg"
              alt="Sustainable farming practices"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

