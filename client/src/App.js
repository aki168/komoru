import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackstageAdmin from "./pages/BackstageAdmin";

import LoginPage from './pages/LoginPage';
import ForgotPW from './pages/ForgotPWPage';
import Register from './pages/Register';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>       
    <BackstageAdmin /> 

      {/* <Routes>     
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPW" element={<ForgotPW />} />
      </Routes> */}

    </BrowserRouter>
  )
}

export default App;

// <Routes>標籤包起來的部分： 0620 由aki更新進去的前台路由 （寧的部分暫稱為後台）
// 寧的部分是 : BackstageAdmin 暫時先註解掉
