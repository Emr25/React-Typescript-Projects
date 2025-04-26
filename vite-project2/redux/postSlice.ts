import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../../vite-project2/types/Post';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// API URL
const API_URL = 'http://localhost:3000/posts';

// Async Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<Post[]>(API_URL);
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost: Omit<Post, 'id'>) => {
  const response = await axios.post<Post>(API_URL, newPost);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost: Post) => {
  const response = await axios.put<Post>(`${API_URL}/${updatedPost.id}`, updatedPost);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
  await axios.delete(`${API_URL}/${postId}`);
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu.';
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;