import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./features/problem/problemSlice.js";
import submissionReducer from "./features/submission/submissionSlice.js";
import showAIReducer from "./features/showAIPanel/showAISlice.js";
import topicReducer from "./features/topic/topicSlice.js";

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        submissions: submissionReducer,
        showAIPanel: showAIReducer,
        topic: topicReducer,
    }
});