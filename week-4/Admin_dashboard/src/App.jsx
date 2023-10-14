// dependancies
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Appbar from "./Appbar";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <Appbar />
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
