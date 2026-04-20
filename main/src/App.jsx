import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/activities/activity-1/Home";
import Activity2 from "./pages/activities/activity-2/Activity2";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Activity2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;