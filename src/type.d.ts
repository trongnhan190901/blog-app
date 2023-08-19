export interface User {
    googleId: string;
    name: string;
    email: string;
    avatar: string;
}

export interface Blog {
    slug: string;
    title: string;
    desc: string;
    content: OutputData[];
    author: User;
    category: string;
    approved: boolean;
    createdAt: string;
    views: number;
    likes: string[];
    userHasLiked: boolean;
    userHasSaved: boolean;
}

export interface Data {
    user: User;
    blogs: Blog[];
}
