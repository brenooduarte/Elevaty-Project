import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { ProdutoProvider } from "./context/ProdutoContext";

const App = () => {
  return (
    <ProdutoProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ProdutoProvider>
    
  )
}

export default App
 