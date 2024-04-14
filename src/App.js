import logo from './logo.svg';
import './App.css';
import SimpleSidebar from "./components/SimpleSidebar";
import {useState} from "react";
import Overview from "./pages/Overview";
import Requirements from "./pages/Requirements";
import Outcomes from "./pages/Outcomes";
import Plan from "./pages/Plan";
function App() {
    const [currentRoute,setCurrentRoute] = useState('Overview')

    return (
        <div>
            <SimpleSidebar setCurrentRoute={setCurrentRoute}>
                {
                    currentRoute === "Overview" && <Overview/>
                }
                {
                    currentRoute === "Requirements" && <Requirements/>
                }
                {
                    currentRoute === "Learning Outcomes" && <Outcomes/>
                }
                {
                    currentRoute === "Plan" && <Plan/>
                }

            </SimpleSidebar>
        </div>
    );
}

export default App;
