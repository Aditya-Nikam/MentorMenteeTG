import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import RegistrationPage from "./components/Registrationpage";
import ProtectedRoute from "./components/ProtectedRoute";
import Sdashboard from "./components/StudentSide/Sdashboard";
import StudentD from "./components/StudentSide/Student Details/StudentD";
import ParentD from "./components/StudentSide/Student Details/ParentD";
import Internships from "./components/StudentSide/Student Details/Internships";
import authService from "./services/authService";
import PYDetails from "./components/StudentSide/Student Details/PYDetails";
import CurrentD from "./components/StudentSide/Student Details/CurrentD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={authService.getCurrentUser() ? <Sdashboard /> : <Login />}
        />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/sdashboard" element={<Sdashboard />} />
        <Route path="/studentd" element={<StudentD />} />
        <Route path="/parentd" element={<ParentD />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/pydetails" element={<PYDetails/>} />
        <Route path="/currentd" element={<CurrentD/>} />
       
      </Routes>
    </Router>
  );
}

export default App;
