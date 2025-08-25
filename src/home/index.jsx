"use client"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Box, Sphere, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Header from "../components/custom/Header"
import {
  FileText,
  Zap,
  Download,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react"

// 3D Resume Card Component
function ResumeCard({ position, rotation, color = "#08b8d4" }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef} position={position} rotation={rotation}>
        <Box args={[2, 2.8, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="white" />
        </Box>
        <Box args={[1.6, 0.3, 0.11]} position={[0, 1, 0.05]}>
          <meshStandardMaterial color={color} />
        </Box>
        <Box args={[1.6, 0.1, 0.11]} position={[0, 0.5, 0.05]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        <Box args={[1.6, 0.1, 0.11]} position={[0, 0.2, 0.05]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        <Box args={[1.6, 0.1, 0.11]} position={[0, -0.1, 0.05]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        <Box args={[1.6, 0.1, 0.11]} position={[0, -0.4, 0.05]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
      </group>
    </Float>
  )
}

// Floating Particles
function Particles() {
  const particlesRef = useRef()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02]}
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}
        >
          <meshStandardMaterial color="#08b8d4" opacity={0.6} transparent />
        </Sphere>
      ))}
    </group>
  )
}

// 3D Text Component
function Hero3DText() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <Text
        font="/fonts/Inter-Bold.ttf"
        fontSize={1.5}
        color="#08b8d4"
        anchorX="center"
        anchorY="middle"
        position={[0, 2, 0]}
      >
        AI Resume Builder
      </Text>
    </Float>
  )
}

// Scroll Animation Hook
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

const Home = () => {
  const scrollY = useScrollAnimation()
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Content",
      description: "Generate compelling resume content with advanced AI technology",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Choose from 50+ ATS-friendly, professionally designed templates",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Download in PDF, Word, or share with a custom link",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never share your information",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Track your applications and get insights on your job search",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content: "This resume builder helped me land my dream job at Google. The AI suggestions were spot-on!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager at Meta",
      content: "The templates are incredibly professional. I got 3x more interview calls after using this.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Apple",
      content: "The ATS optimization feature is a game-changer. My resume now gets past all screening systems.",
      rating: 5,
    },
  ]

  const stats = [
    { number: "500K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Templates" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />

            <Hero3DText />
            <ResumeCard position={[-4, 0, 0]} rotation={[0, 0.3, 0]} />
            <ResumeCard position={[4, -1, -2]} rotation={[0, -0.3, 0]} color="#06b6d4" />
            <ResumeCard position={[0, -3, -4]} rotation={[0, 0, 0]} color="#0891b2" />
            <Particles />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div
            className="transform transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              opacity: 1 - scrollY * 0.001,
            }}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-cyan-200">
              <Sparkles className="w-4 h-4 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Resume Builder</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Create Your
              <br />
              <span className="relative">
                Dream Resume
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg blur opacity-20 animate-pulse"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Build a professional, ATS-optimized resume in minutes with our AI-powered platform. Stand out from the
              crowd and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth/sign-in">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                  Start Building Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="border-2 border-cyan-300 text-cyan-700 hover:bg-cyan-50 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-transparent"
              >
                View Templates
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.features ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a standout resume that gets you hired
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${
                  isVisible.features ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your professional resume in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Select from our collection of ATS-friendly, professional templates designed by experts",
              },
              {
                step: "02",
                title: "Add Your Info",
                description: "Fill in your details with AI-powered suggestions to make your content shine",
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Export your resume in multiple formats and start applying to your dream jobs",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-1000 ${
                  isVisible["how-it-works"] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-2xl">
                    {step.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.testimonials ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who landed their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 ${
                  isVisible.testimonials ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Resume Builder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Assistance</h3>
            <p className="text-gray-600">
              Leverage the power of AI to generate compelling content and optimize your resume.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Professionally Designed Templates</h3>
            <p className="text-gray-600">
              Choose from a variety of modern and professional templates to make your resume stand out.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy to Use Interface</h3>
            <p className="text-gray-600">
              Our intuitive interface makes it simple to create, edit, and customize your resume.
            </p>
          </div>
        </div>
      </section>

      {/* New to Resume Building Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">New to Resume Building?</h2>
        <p className="text-gray-700 mb-8">Explore our project options to get a head start.</p>
        <div className="flex justify-center">
          <Link to="/dashboard">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-200">
              View Project Options
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Get Hired?</h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join over 500,000 job seekers who have successfully landed their dream jobs with our platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth/sign-in">
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-12 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                Start Building Your Resume
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>

            <div className="flex items-center text-white/90">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Free to start • No credit card required</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">&copy; 2025 Tech Track. All rights reserved.</footer>
    </div>
  )
}

export default Home
