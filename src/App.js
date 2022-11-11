import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";
import Menu from "./shared/menu/Menu";
import Selection from "./pages/Selection/Selection";
import Cabinet from "./pages/Cabinet/Cabinet";
import Home from "./pages/Home/Home";
import {firebaseService} from "./FirebaseService";


function App() {

    const [user, setUser] = useState({
        email: "",
        name: "",
        surname: "",
        group: "",
        groups: [],
        auth: null,
        courses: []
    });

    const routes = [
        { path: "/cab", element: <Cabinet/> },
        { path: "/selection", element: <Selection/> },
        { path: "/home", element: <Home/> },
        { path: "/", element: <Home/> },
    ];

    useEffect(() => {
        firebaseService.getGroups()
            .then(groups => {
                setUser({...user, groups});
            });
    }, []);


  return (
      <UserContext.Provider value={{user, setUser}}>
          <BrowserRouter>
            <div className="App">
                <header>
                    <Menu></Menu>
                </header>

                <main>
                    <Routes>
                        { routes.map((item, index) =>
                                <Route key={index} path={item.path} element={item.element} />) }
                    </Routes>
                </main>

                <footer className="container-fluid text-bg-dark">
                    <div className="row h-100 align-content-center">
                        <div className="col-6">Copyright 2022</div>
                        <div className="col-6">Вибір Курсів</div>
                    </div>
                </footer>
            </div>
          </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
