import React from 'react'
import './app.css'
import Index from './components/JSX'
import './app.scss'
// import webpack from './assets/imgs/Webpack.webp'

function App() {
  return(
    <div>
        <h2>webpack5-react-ts</h2>
        <Index />
        {/* <img src={webpack} alt="" /> */}
    </div>
  ) 
}
export default App