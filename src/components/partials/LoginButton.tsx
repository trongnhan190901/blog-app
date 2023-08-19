import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userId } from '~/atoms/GlobalState';
import LoginModal from '../modal/LoginModal';
import UserProfile from './UserProfile';

const LoginButton = () => {
    const [user, setUser] = useAtom(userId);

    useEffect(() => {
        fetch('http://localhost:5000/api/user', {
            method: 'GET',
            credentials: 'include', // Bật tùy chọn để gửi cookie trong yêu cầu
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Nếu yêu cầu thành công, lưu thông tin người dùng vào state
                setUser(data);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {
        fetch('http://localhost:5000/auth/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUser(null);
                    window.location.reload(); // Refresh trang sau khi logout
                }
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    return user ? (
        <UserProfile user={user} handleLogout={handleLogout} />
    ) : (
        <LoginModal />
    );
};

export default LoginButton;
