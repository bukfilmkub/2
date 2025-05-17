import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/ranking');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    players: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leaderboard';
      });
  },
});

export default leaderboardSlice.reducer;
