import { useState, useEffect } from 'react';
import WelcomePage from './component/WelcomePage';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import MainPage from './component/MainPage';
import { Routes, Route, Navigate } from 'react-router';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    useEffect(() => {
    // 从localStorage中获取用户信息
        const storedId = localStorage.getItem('id');
        const storedUsername = localStorage.getItem('username');

        if (storedId && storedUsername) {
            setId(storedId);
            setUsername(storedUsername);
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<LoginPage setId={setId} setUsername={setUsername} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage id={id} username={username} setUsername={setUsername} />} />
        </Routes>
    )
}

export default App