import { useEffect, useState } from 'react';
import { Comment } from '~/type';

interface CommentProps {
    slug: string;
}

const CommentComp = ({ slug }: CommentProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyContent, setReplyContent] = useState<string>('');
    const [commentContent, setCommentContent] = useState<string>('');
    const [isReplying, setIsReplying] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/blog/${slug}/comments`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const submitComment = (content: string) => {
        fetch(`http://localhost:5000/api/blog/${slug}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ content }),
        })
            .then((response) => response.json())
            .then((newComment) => {
                setComments((prevComments) => {
                    if (Array.isArray(prevComments)) {
                        return [...prevComments, newComment];
                    } else {
                        return [newComment];
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
        setCommentContent('');
    };

    const submitReply = (parentId: string, replyContent: string) => {
        fetch(`http://localhost:5000/api/blog/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                content: replyContent,
                parentId: parentId,
            }),
        })
            .then((response) => response.json())
            .then((newReply) => {
                setComments((prevComments) =>
                    prevComments.map((comment: Comment) =>
                        comment._id === parentId
                            ? {
                                  ...comment,
                                  replies: [...comment.replies, newReply],
                              }
                            : comment,
                    ),
                );
                setReplyContent('');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className='w-full h-20 my-40'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitComment(commentContent);
                    }}
                    className='flex flex-col'
                >
                    <textarea
                        name='commentContent'
                        required
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button type='submit'>Gửi Bình Luận</button>
                </form>
                {Array.isArray(comments) &&
                    comments.map((comment: Comment) => {
                        return (
                            <div key={comment._id}>
                                <p>{comment.content}</p>
                                <button
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    Trả lời
                                </button>
                                {isReplying && (
                                    <div>
                                        <textarea
                                            name='replyContent'
                                            required
                                            value={replyContent}
                                            onChange={(e) =>
                                                setReplyContent(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                submitReply(
                                                    comment._id,
                                                    replyContent,
                                                )
                                            }
                                            type='submit'
                                        >
                                            Gửi Trả Lời
                                        </button>
                                    </div>
                                )}
                                {comment.replies &&
                                    comment.replies.map((reply: Comment) => (
                                        <div key={reply._id}>
                                            <p>{reply.content}</p>
                                            <button
                                                onClick={() =>
                                                    setIsReplying(!isReplying)
                                                }
                                            >
                                                Trả lời
                                            </button>
                                            {isReplying && (
                                                <div>
                                                    <textarea
                                                        name='replyContent'
                                                        required
                                                        value={replyContent}
                                                        onChange={(e) =>
                                                            setReplyContent(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            submitReply(
                                                                reply._id,
                                                                replyContent,
                                                            )
                                                        }
                                                        type='submit'
                                                    >
                                                        Gửi Trả Lời
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default CommentComp;
