'use client' // if you're using App Router

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeToggle
