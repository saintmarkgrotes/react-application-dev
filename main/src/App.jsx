import { BrowserRouter, Routes, Route } from "react-router-dom";
import MCO from "./pages/mco/MCO";
import Activity1 from "./pages/activities/activity-1/Activity1";
import Activity2 from "./pages/activities/activity-2/Activity2";
import Activity3 from "./pages/activities/activity-3/Activity3";
import Activity4 from "./pages/activities/activity-4/Activity4";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MCO />} />
                <Route path="/landing" element={<Activity1 />} />
                <Route path="/login" element={<Activity2 />} />
                <Route path="/record" element={<Activity3 />} />
                <Route path="/bible" element={<Activity4 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;