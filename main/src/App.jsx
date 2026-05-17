import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/activities/activity-1/Home";
import Activity2 from "./pages/activities/activity-2/Activity2";
import Activity3 from "./pages/activities/activity-3/Activity3";
import Activity4 from "./pages/activities/activity-4/Activity4";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Activity2 />} />
                <Route path="/record" element={<Activity3 />} />
                <Route path="/bible" element={<Activity4 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;