import Error404 from "./pages/Error404";
import GetStarted from "./pages/GetStarted";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Match from "./pages/Match";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<GetStarted />} />
                <Route exact path="/user" element={<Home />} />
                <Route exact path="/scanner" element={<Scanner />} />
                <Route exact path="/match" element={<Match />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
