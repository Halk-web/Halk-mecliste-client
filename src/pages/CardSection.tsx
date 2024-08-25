import { useDispatch } from "react-redux";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { findAllThunk } from "../store/Thunk/PostThunk";
import useAuth from "../hooks/useAuth";

const CardSection=()=>{
    const dispatch=useDispatch();
    const [fetchedPosts,setFetchedPosts]=useState<any>([]);
    const {user}=useAuth();

    useEffect(()=>{
        const fetcAllPosts=async()=>{
            const posts=await dispatch(findAllThunk() as any);
            console.log(posts.payload);
            setFetchedPosts(posts.payload);
        }
        
        fetcAllPosts();
    },[dispatch]);

    return (
        <>
        <div style={{marginTop:"75px"}}>
            {fetchedPosts && fetchedPosts?.map((post:any,index:any)=>(
                <PostCard key={index} post={post} user={user}></PostCard>
            ))}
        </div>
        </>
    )
}

export default CardSection;