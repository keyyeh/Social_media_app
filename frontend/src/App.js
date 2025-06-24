import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login/login.jsx";
import { UserRoute } from "./routers/index.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {UserRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
