import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { CardDetail } from '@/pages/CardDetail'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card/:id" element={<CardDetail />} />
    </Routes>
  )
}
