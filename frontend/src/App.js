import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login/login.jsx";
import { UserRoute } from "./routers/index.jsx";
import Header from "./components/layouts/header/Header.jsx";
import Sidenav from "./components/layouts/sidenav/Sidenav.jsx";
import {ProtectedRoute} from './components/protected/ProtectedRoute.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            {UserRoute.map((route, index) => {
              const Page = route.component;
              return (
               <Route
                  key={index}
                  path={route.path}
                  element={
                    <Sidenav>
                      <Header>
                        <Page />
                      </Header>
                    </Sidenav>
                  }
                >
                  {route.children &&
                    route.children.map((childRoute, childIndex) => {
                      const ChildPage = childRoute.component;
                      return (
                        <Route
                          key={childIndex}
                          path={childRoute.path}
                          element={<ChildPage />}
                        />
                      );
                    })}
                </Route>
              );
            })}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
