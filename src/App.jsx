import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useProfile } from "./Context/ProfileContext";
import ProfileSwitcher from "./Components/ProfileSwitcher";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import WatchPage from "./Pages/WatchPage";
import Trending from "./Pages/Trending";
import Navbar from "./Components/Navbar";
import MySpace from "./Pages/MySpace";

function MainApp() {
  const { activeProfile } = useProfile();
  if (!activeProfile) return <ProfileSwitcher />;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/myspace" element={<MySpace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;


