export const ADD_POST = "@add/post";
export const ADD_POSTS = "@add/posts";  // Typo düzeltildi
export const REMOVE_POST = "@remove/post";

export const addPostsAction = (posts: any) => ({
  type: ADD_POSTS,
  payload: posts,
});

export const addPostAction = (post: any) => ({
  type: ADD_POST,
  payload: post,
});

export const removePostAction = (postId: number) => ({
  type: REMOVE_POST,
  payload: postId,
});
