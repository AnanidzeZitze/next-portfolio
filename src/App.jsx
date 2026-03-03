import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Apex from './portfolio.jsx'
import MyWork from './my-work.jsx'
import MyBlog from './my-blog.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Apex />} />
                <Route path="/my-marketing-work" element={<MyWork />} />
                <Route path="/my-marketing-blog" element={<MyBlog />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
