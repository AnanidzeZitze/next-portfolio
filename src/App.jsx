import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Apex from './portfolio.jsx'
import MyWork from './my-work.jsx'
import { FluidBackground } from './components/shared.jsx'

const BLOG_URL = 'https://gbnmarketing.blogspot.com/'

function BlogRedirect() {
    useEffect(() => { window.location.replace(BLOG_URL) }, [])
    return null
}

function App() {
    return (
        <ReactLenis root>
            <FluidBackground />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Apex />} />
                    <Route path="/my-marketing-work" element={<MyWork />} />
                    <Route path="/my-marketing-blog" element={<BlogRedirect />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ReactLenis>
    );
}

export default App
