import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";
import Menu from "./shared/menu/Menu";
import Selection from "./pages/Selection/Selection";
import Cabinet from "./pages/Cabinet/Cabinet";
import Home from "./pages/Home/Home";
import { firebaseService } from "./FirebaseService";
import Footer from "./shared/footer/Footer";


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

                <Footer/>
            </div>
          </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
