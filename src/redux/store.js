import { configureStore } from "@reduxjs/toolkit";
import allSnippets from "./allSnippets";

export const store=configureStore({
    reducer:{
        allSnippets
    }
})