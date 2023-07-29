import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';

const LoginButton = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách gọi API để lấy thông tin người dùng
        axios.get('/api/user').then((response) => {
            setUser(response.data);
        });
    }, []);

    const handleLogin = () => {
        // Chuyển hướng đến trang đăng nhập của Google khi nhấp vào nút
        window.location.href = 'http://localhost:5000/auth/google';
    };

    const handleLogout = () => {
        // Xử lý đăng xuất bằng cách gọi API hoặc làm những việc khác nếu cần
        setUser(null);
    };

    return user ? (
        <UserProfile user={user} handleLogout={handleLogout} />
    ) : (
        <button onClick={handleLogin}>Đăng nhập bằng Google</button>
    );
};

export default LoginButton;
