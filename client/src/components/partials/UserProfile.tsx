import React from 'react';

interface User {
    displayName: string;
    // Thêm các thuộc tính khác của user nếu cần
}

interface UserProfileProps {
    user: User;
    handleLogout: () => void;
}

const UserProfile = ({ user, handleLogout }: UserProfileProps) => {
    return (
        <div>
            <h2>Xin chào, {user.displayName}</h2>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
};

export default UserProfile;
