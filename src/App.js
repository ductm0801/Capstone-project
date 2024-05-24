
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../src/Pages/login'
import Header from '../src/components/header'
function App() {
  return (
  <BrowserRouter>

    
    <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/" element={<Header />}></Route>
    </Routes>
    
    
   
  </BrowserRouter>

);
}

export default App;
