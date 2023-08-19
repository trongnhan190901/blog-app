export const convertParamToCategory = (param: string) => {
    const categoryMapping: Record<string, string> = {
        'khoa-hoc-cong-nghe': 'Khoa học - Công nghệ',
        'suc-khoe-sac-dep': 'Sức khỏe - Sắc đẹp',
        'du-lich-am-thuc': 'Du lịch - Ẩm thực',
        'nghe-thuat-van-hoa': 'Nghệ thuật - Văn hóa',
        'phat-trien-ca-nhan': 'Phát triển cá nhân',
        'tin-tuc-xa-hoi': 'Tin tức xã hội',
        'tam-ly-suc-khoe-tinh-than': 'Tâm lý - Sức khỏe tinh thần',
        'loi-song-gia-dinh': 'Lối sống - Gia đình',
        'kinh-doanh-tai-chinh': 'Kinh doanh - Tài chính',
        'giao-duc-hoc-tap': 'Giáo dục - Học tập',
        'thoi-trang-phong-cach': 'Thời trang - Phong cách',
        'hai-huoc-giai-tri': 'Hài hước - Giải trí',
    };

    return categoryMapping[param];
};
