import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from "./quiz"
import Admin from "./admin"
import Result from "./result"

const App = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/quiz" element={<Quiz />} />

                    <Route path="/quiz/admin" element={<Admin />} />
                    <Route path="/quiz/result" element={<Result />} />


                </Routes>
            </Router>
        </div>
    )

}



export default App