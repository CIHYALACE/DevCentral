import '../style/App.css'
import { Routes, Route } from 'react-router-dom'
import SharedLayout from '../sharedLayout/SharedLayout'
import HomePage from '../pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
