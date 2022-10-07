import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Menu from "./shared/menu/Menu";
import Selection from "./pages/Selection/Selection";
import Cabinet from "./pages/Cabinet/Cabinet";
import Home from "./pages/Home/Home";

function App() {
    const router = createBrowserRouter([
        {path: "/cab", element: <Cabinet/>},
        {path: "/selection", element: <Selection/>},
        {path: "/home", element: <Home/>},
        {path: "/", element: <Home/>},
    ]);


  return (
    <div className="App">
        <header>
            <Menu></Menu>
        </header>

        <RouterProvider router={router} />

        <footer>footer</footer>
    </div>
  );
}

export default App;
