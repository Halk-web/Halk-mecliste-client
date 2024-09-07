import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext<any>(null);

export const PostProvider = ({ children }:any) => {
    const [fetchedPosts, setFetchedPosts] = useState<any[]>([]);

    const addPost = (newPost: any) => {
        setFetchedPosts(prevPosts => [...prevPosts,newPost]);
    };

    const removePost = (postId: string) => {
        setFetchedPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    return (
        <PostContext.Provider value={{ fetchedPosts,setFetchedPosts, addPost, removePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext);
