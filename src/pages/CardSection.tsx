import { useDispatch } from "react-redux";
import PostCard from "../components/PostCard";
import { useEffect, useMemo, useRef } from "react";
import { findAllThunk, findByProfileIdThunk } from "../store/Thunk/PostThunk";
import { usePosts } from "../contexts/PostContext";
import { useParams } from "react-router-dom";

const CardSection = (props: any) => {
    const dispatch = useDispatch();
    const { fetchedPosts, setFetchedPosts } = usePosts();
    const hasFetchedPosts = useRef(false); // Track if posts have been fetched
    const { profile_id } = useParams<{ profile_id?: string }>(); // Make profile_id optional

    useEffect(() => {
        const fetchAllPosts = async () => {
            if (!hasFetchedPosts.current) {
                const posts = await dispatch(findAllThunk() as any);
                setFetchedPosts((prevPosts: any) => {
                    const newPosts = posts.payload;
                    const uniquePosts = newPosts.filter((newPost: any) =>
                        !prevPosts.some((prevPost: any) => prevPost.id === newPost.id)
                    );
                    return [...prevPosts, ...uniquePosts]; // Merge old and new posts, avoiding duplicates
                });
                hasFetchedPosts.current = true; // Mark posts as loaded
            }
        };

        const fetchPostByProfileId = async () => {
            if (profile_id) {
                const posts = await dispatch(findByProfileIdThunk(profile_id) as any);
                setFetchedPosts((prevPosts: any) => {
                    const newPosts = posts.payload;
                    const uniquePosts = newPosts.filter((newPost: any) =>
                        !prevPosts.some((prevPost: any) => prevPost.id === newPost.id)
                    );
                    return [...prevPosts, ...uniquePosts]; // Merge old and new posts, avoiding duplicates
                });
            }
        };

        // Ensure unique posts in props.posts
        if (props.posts) {
            const uniquePosts = props.posts.filter(
                (post: any, index: number, self: any[]) =>
                    index === self.findIndex((p: any) => p.id === post.id)
            );
            setFetchedPosts(uniquePosts); // Set only unique posts
        } else {
            if (profile_id) {
                fetchPostByProfileId();
            } else {
                fetchAllPosts();
            }
        }
    }, [dispatch, profile_id, setFetchedPosts, props.posts]);

    // Optimize sorting with useMemo
    const reversedPosts = useMemo(() => {
        return [...fetchedPosts].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime(); // Sort in descending order
        });
    }, [fetchedPosts]);

    return (
        <div style={{ marginTop: "100px" }}>
            {reversedPosts && reversedPosts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </div>
    );
};

export default CardSection;
