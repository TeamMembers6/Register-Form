
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { HashRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

<Router>
  <App />
</Router>

  
)
