import { fetchPokemonAction } from "../redux/slices/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Header } from "./Header";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPokemonAction());
    }, []);
    return (
        <>
            <Header />
        </>
    );
};
