// import React from 'react'
// import Header from '../components/custom/Header'

// const Home = () => {
//   return (
//     <div>
//       <Header/>
//       Landing Screen
//     </div>
//   )
// }

// export default Home



import React from 'react'
import Header from '../components/custom/Header'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto py-20">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Create Your Professional Resume with Ease
          </h1>
          <p className="text-gray-700 mb-8">
            Our AI-powered resume builder helps you create a standout resume in minutes.
          </p>
          <Link to="/auth/sign-in">
            <Button className="bg-primary text-white hover:bg-primary-900">
              Get Started
            </Button>
          </Link>
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Our Resume Builder?
          </h2>
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
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            New to Resume Building?
          </h2>
          <p className="text-gray-700 mb-8">
            Explore our project options to get a head start.
          </p>
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white text-primary hover:bg-gray-200">
                View Project Options
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="text-center py-8 text-gray-500">
        &copy; 2025 Tech Track. All rights reserved.
      </footer>
    </div>
  );
}

export default Home