import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { http } from "utils/axios"

type Params = {
  code: string
}



type Account = {
  code: string,
  user: string,
  max: number,
  status: string,
  id: string
}


type Invitation = {
  check_invitaions: Account
}

export const checkedInvitation = createAsyncThunk('checkinvitations/checkedInvitation', async (data: Params) => {
  const res = await http.post('/check_invitation', JSON.stringify(data))
  console.log('获取所有账户信息列表', res.data)
  return res.data.data
})

const initialState = {
  check_invitaions: {},
} as Invitation


const slice = createSlice({
  name: 'checkinvitations',
  initialState,
  extraReducers: builder => {
    builder.addCase(checkedInvitation.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.check_invitaions = action.payload
    });
  },
  reducers: {}
})


export default slice.reducer
