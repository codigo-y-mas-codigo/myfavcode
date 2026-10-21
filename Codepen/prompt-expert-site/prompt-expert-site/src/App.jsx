import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Portfolio from './components/pages/Portfolio'
import FAQ from './components/pages/FAQ'
import Privacy from './components/pages/Privacy'
import PromptsPage from './components/pages/PromptsPage'
import PromptDetail from './components/prompts/PromptDetail'
import { AuthProvider } from './hooks/useAuth.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/prompts" element={<PromptsPage />} />
              <Route path="/prompt/:id" element={<PromptDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

