import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Login from './pages/login/Login.tsx';
import ImageAnalysis from './pages/imageAnalysis/ImageAnalysis.tsx';

function RequireAuth() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/imageAnalysis" element={<ImageAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
