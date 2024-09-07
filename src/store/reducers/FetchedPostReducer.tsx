import { ADD_POST, ADD_POSTS, REMOVE_POST } from "../Actions/FetchedPostAction";

const initialState = {
  fetchedPosts: [],
};

const fetchedPostReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        fetchedPosts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        fetchedPosts: [action.payload, ...state.fetchedPosts],
      };
    case REMOVE_POST:
      return {
        ...state,
        fetchedPosts: state.fetchedPosts.filter((post: any) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default fetchedPostReducer;
