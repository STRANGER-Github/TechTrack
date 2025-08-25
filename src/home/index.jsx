"use client"

import Header from "@/components/custom/Header"
import { Button } from "@/components/ui/button"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import ResumePreview from "@/dashboard/resume/components/ResumePreview"
import { dummy } from "@/data/dummy"
import { ArrowRight, CheckCircle, FileText, Sparkles, Users, Zap } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setResumeInfo(dummy)
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Resume Builder
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    {" "}
                    Dream Resume
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Stand out from the
                  crowd and land your dream job.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/sign-in">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 bg-transparent">
                  View Examples
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">500K+ users</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400">
                      ⭐
                    </div>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="scale-75 origin-top-left">
                  <ResumePreview />
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ATS Optimized
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-8 w-12 h-12 bg-blue-500/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Resume Builder?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a professional resume that gets you hired
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Create professional resumes in under 5 minutes with our intuitive builder",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "ATS Optimized",
                description: "All templates are designed to pass Applicant Tracking Systems",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "AI-Powered",
                description: "Get intelligent suggestions for content and formatting",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Approved",
                description: "Templates reviewed by hiring managers and career experts",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Multiple Formats",
                description: "Download in PDF, Word, or share with a custom link",
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: "Real-time Preview",
                description: "See your changes instantly as you build your resume",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Perfect Resume?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs
          </p>
          <Link to="/auth/sign-in">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
            >
              Start Building Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">TechTrack Resume</h3>
              <p className="text-gray-400">Build professional resumes that get you hired.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Interview Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechTrack Resume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
