import "./App.css";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // import LoginPage from "./pages/Login";
import NewsHub from "./component/NewsPage";
function App() {
  const AuthRoute = () => {
    const user = localStorage.getItem("userId");
    if (user) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };
  return (
    // <>
    //   <News news={news} />
    <div className="w-full h-full">
      <BrowserRouter>
        {/* Authentication Routes */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<NewsHub />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
