import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/homepage";
import { Movie } from "./pages/movie";
import { Downloads } from "./pages/downloads";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/movie/:id" element={<Movie />} />

                <Route path="/downloads" element={<Downloads />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;