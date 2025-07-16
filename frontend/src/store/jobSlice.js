import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allCompanyJobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    filters: {
      location: "",
      jobType: "",
      salary: "",
    },
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    clearSingleJob: (state) => {
      state.singleJob = null;
    },
    setAllCompanyJobs: (state, action) => {
      state.allCompanyJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  clearSingleJob,
  setAllCompanyJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
