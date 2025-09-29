import React from 'react'
import ReactDOM from 'react-dom/client'
import PyLingo from './src/PyLingo.jsx'
// Import Tailwind base utilities first, then custom styles to allow overrides
import './src/index.css'
import './src/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PyLingo />
  </React.StrictMode>
)