import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { http } from "utils/axios"

type Params = {
  user_name: string,
  password: string
}



type Account = {
  status: Boolean
}


export const AddAccounts = createAsyncThunk('addAccounts/AddAccounts', async (data: Params) => {
  const res = await http.post('/add_accounts_invitation', JSON.stringify(data))
  console.log('获取所有账户信息列表', res.data)
  return res.data.data
})

const initialState = {
  status: {},
} as Account


const slice = createSlice({
  name: 'addAccounts',
  initialState,
  extraReducers: builder => {
    builder.addCase(AddAccounts.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.status = action.payload
    });
  },
  reducers: {}
})


export default slice.reducer
