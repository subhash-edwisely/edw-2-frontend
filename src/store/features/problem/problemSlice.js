import { createSlice } from "@reduxjs/toolkit";
import { getProblemById, getProblemConstraints, getProblemEditorial, getProblemHints, getProblemTags, getProblemTestCases, getSnippetsByProblem } from "../../../api/api.js";

const initialState = {
    data: {},
    tags: [],
    hints: [],
    constraints: [],
    editorial: {},
    testcases: [],
    snippets: []
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        getProblemData(state, action) {
            const problemId = action.payload;
            state.data = getProblemById(problemId);
            state.tags = getProblemTags(problemId);
            state.hints = getProblemHints(problemId);
            state.constraints = getProblemConstraints(problemId);
            state.editorial = getProblemEditorial(problemId);
            state.testcases = getProblemTestCases(problemId);
            state.snippets = getSnippetsByProblem(problemId);
        }
    }
});


export const { getProblemData } = problemSlice.actions;
export default problemSlice.reducer;