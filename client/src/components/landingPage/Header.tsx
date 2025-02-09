import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { NavLink,Link } from 'react-router-dom'
import Logo from '../Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl w-fit font-bold text-primary">
           <Logo />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <NavLink to="#mission">Our Mission</NavLink>
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#how-it-works">How It Works</NavLink>
            <NavLink to="#impact">Our Impact</NavLink>
            <NavLink to="#testimonials">Testimonials</NavLink>
            <NavLink to="#faq">FAQ</NavLink>
          </nav>
          <div className="hidden md:block">
            <Link to="/login"><Button className="bg-primary text-white hover:bg-primary-dark">
              Get Started
            </Button></Link>
          </div>
          <button title="Menu" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-md"
        >
          <nav className="flex flex-col p-4">
            <NavLink to="#mission">Our Mission</NavLink>
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#how-it-works">How It Works</NavLink>
            <NavLink to="#impact">Our Impact</NavLink>
            <NavLink to="#testimonials">Testimonials</NavLink>
            <NavLink to="#faq">FAQ</NavLink>
            <Button className="mt-4 bg-primary text-white hover:bg-primary-dark">
              Get Started
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}


