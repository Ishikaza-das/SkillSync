import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allCompanyJobs: [],
    searchJobByText:'',
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllCompanyJobs: (state, action) => {
      state.allCompanyJobs = action.payload;
    },
    setSearchJobByText:(state,action) => {
      state.searchJobByText = action.payload;
    }
  },
});

export const { setAllJobs, setSingleJob, setAllCompanyJobs, setSearchJobByText} = jobSlice.actions;
export default jobSlice.reducer;
