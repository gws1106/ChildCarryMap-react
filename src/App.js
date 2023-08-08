import { BrowserRouter, Route, Routes } from "react-router-dom";
import Head from "./components/Head";
import Statistics from "./routes/Statistics";
import Mypage from "./routes/Mypage";
import MapTest from "./routes/MapTest";

function App() {
  return (
    <div className="app-div">
      <BrowserRouter>
        <Head />
        <Routes>
          <Route path="/" element={<MapTest />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
