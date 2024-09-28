import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Cocurriact from "./components/StudentSide/Student Details/Cocurriact";
import Extracurriact from "./components/StudentSide/Student Details/Extracurriact";
import CareerPath from "./components/StudentSide/Student Details/CareerPath";
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
        <Route
          path="/sdashboard"
          element={authService.getCurrentUser() ? <Sdashboard /> : <Login />}
        />
        <Route
          path="/studentd"
          element={authService.getCurrentUser() ? <StudentD /> : <Login />}
        />
        <Route
          path="/parentd"
          element={authService.getCurrentUser() ? <ParentD /> : <Login />}
        />
        <Route
          path="/internships"
          element={authService.getCurrentUser() ? <Internships /> : <Login />}
        />
        <Route
          path="/pydetails"
          element={authService.getCurrentUser() ? <PYDetails /> : <Login />}
        />
        <Route
          path="/currentd"
          element={authService.getCurrentUser() ? <CurrentD /> : <Login />}
        />
        <Route
          path="/cocurriact"
          element={authService.getCurrentUser() ? <Cocurriact /> : <Login />}
        />
        <Route
          path="/extracurriact"
          element={authService.getCurrentUser() ? <Extracurriact /> : <Login />}
        />
        <Route
          path="/careerpath"
          element={authService.getCurrentUser() ? <CareerPath /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
