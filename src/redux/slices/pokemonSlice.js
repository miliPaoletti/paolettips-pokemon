import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemonAction = createAsyncThunk("pokemon/fetch", async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get("https://pokemon-go1.p.rapidapi.com/pokemon_encounter_data.json", {
            headers: {
                "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
                "x-rapidapi-key": "506e54869fmsh40a3d9256cbca46p1eed4fjsnddd0a678a341",
            },
        });
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response.data);
    }
});

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {},

    extraReducers: (builder) => {
        // pending
        builder.addCase(fetchPokemonAction.pending, (state, action) => {
            state.loading = true;
        });
        // fulfilled
        builder.addCase(fetchPokemonAction.fulfilled, (state, action) => {
            state.pokemon = action?.payload;
            state.loading = false;
            state.error = undefined;
        });
        // rejected
        builder.addCase(fetchPokemonAction.rejected, (state, action) => {
            state.loading = false;
            state.pokemon = undefined;
            state.error = action?.payload;
        });
    },
});

export default pokemonSlice.reducer;
