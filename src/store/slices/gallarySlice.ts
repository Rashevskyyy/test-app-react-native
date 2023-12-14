import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface InterfaceImage {
  id: string;
  url: string;
  title: string;
  author: string;
}

interface GalleryState {
  images: InterfaceImage[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  loading: false,
  error: null,
};

const ACCESS_KEY = 'ex7QvL4f0-3siNn346hlI-eU-daRG_gcRWD9F_Yii5o';

export const fetchImages = createAsyncThunk<
  InterfaceImage[],
  void,
  { rejectValue: string }
>('gallery/fetchImages', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=30`,
    );
    return response.data.map((img: any) => ({
      id: img.id,
      url: img.urls.small,
      title: img.description || 'No Title',
      author: img.user.name,
    }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchImages.pending, state => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default gallerySlice.reducer;
