import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Section from "./pages/section";
import LoginPage from "./pages/login";
import SignupV1 from "./pages/Signupv1";
import Signupv2 from "./pages/Signupv2";
import Message from "./pages/Message";
import ProfilePage from "./pages/ProfilePage";
import TopBar from "./components/Navbar";
import AuthGuard from "./utils/route-guard/authGuard";
import UserCards from "./components/UserCard";
import CardSection from "./pages/CardSection";

const App = () => {
  return (
    <BrowserRouter>
      <ConditionalTopBar>
        <Routes>
          <Route path="/" element={<AuthGuard><Section></Section></AuthGuard>} />
          <Route path="/home/:profile_id" element={<AuthGuard><Section></Section></AuthGuard>} />
          <Route path="/home/search" element={<AuthGuard><Section></Section></AuthGuard>} />
          <Route path="/message/:postId" element={<AuthGuard><Message></Message></AuthGuard>} />
          <Route path="/users" element={<AuthGuard><UserCards></UserCards></AuthGuard>}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupV1 />} />
          <Route path="/signup/v2" element={<Signupv2 />} />
          <Route path="/profile/:userId" element={<AuthGuard><ProfilePage /></AuthGuard>} />
        </Routes>
      </ConditionalTopBar>
    </BrowserRouter>
  );
};

// TopBar bileşenini, belirli rotalara bağlı olarak render eden bileşen
const ConditionalTopBar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const excludedRoutes = ['/login', '/signup', '/signup/v2'];
  
  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <TopBar />}
      {children}
    </>
  );
};

export default App;
