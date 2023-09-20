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
    content: OutputData;
    author: User;
    category: string;
    approved: boolean;
    createdAt: string;
    views: number;
    likes: string[];
    commnets: CommentType[];
    userHasLiked: boolean;
    userHasSaved: boolean;
}

export interface Draft {
    _id: string;
    title: string;
    desc: string;
    content: OutputData;
    author: User;
    createdAt: string;
}

export interface Comment {
    _id: string;
    content: string;
    author: User;
    replies: Comment[];
}
