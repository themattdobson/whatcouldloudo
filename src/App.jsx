import { useState, useEffect } from 'react'
import MapView from './MapView'; // <-- Use this import!
import './App.css'

const STORAGE_KEY = 'lou-ideas';

function App() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setIdeas(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing saved ideas:', e)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
  }, [ideas])

  const addIdea = (newIdea) => {
    setIdeas(prev => [...prev, newIdea])
  }

  return (
    <div>
      <header style={{ padding: '1rem', background: '#fff', zIndex: 1 }}>
        <h1>Hello, Louisville! 👋</h1>
        <p>This is the start of <strong>What Could Lou Do</strong>.</p>
        <p>We're building a place to imagine the future of our shared spaces.</p>
      </header>
      <MapView ideas={ideas} addIdea={addIdea} />
      <section style={{ padding: '1rem', background: '#f9f9f9', borderTop: '1px solid #eee' }}>
        <h2>Community Ideas & Discussion</h2>
        <p>Share your thoughts, see what others are imagining, or join the conversation below!</p>
      </section>
      <footer style={{ padding: '1rem', background: '#222', color: '#fff', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} What Could Lou Do
      </footer>
    </div>
  );
}

export default App;
