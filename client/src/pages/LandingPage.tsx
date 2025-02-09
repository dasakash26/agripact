import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Header } from '@/components/landingPage/Header'
import { Hero } from '@/components/landingPage/Hero'
import { ProblemSolution } from '@/components/landingPage/ProblemSolution'
import { Features } from '@/components/landingPage/Features'
import { HowItWorks } from '@/components/landingPage/HowItWorks'
import { Impact } from '@/components/landingPage/Impact'
import { Testimonial } from '@/components/landingPage/Testimonial'
import { FAQ } from '@/components/landingPage/FAQ'
import { Contact } from '@/components/landingPage/Contact'
import { Footer } from '@/components/landingPage/Footer'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <Header />
      <Hero />
      <AnimatedSection>
        <ProblemSolution />
      </AnimatedSection>
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection>
        <Impact/>
      </AnimatedSection>
      <AnimatedSection>
        <Testimonial/>
      </AnimatedSection>
      <AnimatedSection>
        <FAQ />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
      <Footer />
    </div>
  )
}