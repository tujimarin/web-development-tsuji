// import "./styles.css";
import { Routes, Route, ScrollRestoration } from "react-router-dom";
import { ScrollTop } from "./components/ScrollTop";
import { Home } from './components/Home';
import { Page1 } from './components/Page1';
import { Page2 } from './components/Page2';

export default function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/web-development-tsuji" element={<Home />} />
        <Route path="/web-development-tsuji/page1" element={<Page1 />} />
        <Route path="/web-development-tsuji/page2" element={<Page2 />} />
      </Routes>
    </>
  );
}
