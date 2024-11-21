// import "./styles.css";
import { Routes, Route } from "react-router-dom"; 
import { SampleHome } from './components/SampleHome';
import { SamplePage1 } from "./components/SamplePage1";
import { SamplePage2 } from './components/SamplePage2';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/web-development-tsuji" element={<SampleHome />} />
        <Route path="/web-development-tsuji/page1" element={<SamplePage1 />} />
        <Route path="/web-development-tsuji/page2" element={<SamplePage2 />} />
      </Routes>
    </div>
  );
}
