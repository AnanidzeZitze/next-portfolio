import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Apex from './portfolio.jsx'
import MyWork from './my-work.jsx'
import MyBlog from './my-blog.jsx'
import { FluidBackground } from './components/shared.jsx'

function App() {
    console.log("App rendering starting");
    let content;
    try {
        content = (
            <ReactLenis root>
                <FluidBackground />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Apex />} />
                        <Route path="/my-marketing-work" element={<MyWork />} />
                        <Route path="/my-marketing-blog" element={<MyBlog />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </ReactLenis>
        );
        console.log("App rendering constructed tree successfully");
    } catch (e) {
        console.error("Error constructing ReactLenis or FluidBackground:", e);
    }
    return content;
}

export default App
