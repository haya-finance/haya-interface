import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "utils/axios";


type Parmas = {
  name: string
  token: string
}

export const signOut = createAsyncThunk('logout/signOut', async (data: Parmas) => {
  const res = await http.post('/signOut', JSON.stringify(data))

  console.log('退出登录', res)

  return res
})

const initialState = {
  data: "",
} as any


const slice = createSlice({
  name: 'logout',
  initialState,
  extraReducers: builder => {
    builder.addCase(signOut.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      return action.payload
    });
  },
  reducers: {}
})


export default slice.reducer