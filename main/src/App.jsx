import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/activities/activity-1/Home";
import Activity2 from "./pages/activities/activity-2/Activity2";
import Activity3 from "./pages/activities/activity-3/Activity3";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Activity2 />} />
                <Route path="/" element={<Activity3 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;