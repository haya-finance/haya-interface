import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "utils/axios";
import { setAdmin, setName, setAccount, setToken } from "utils/token";


type Parmas = {
  name: string
  password: string
}

type Product = {
  name: string
  id: string
}

type LoginData = {
  name: string
  token: string
  admin: string
  account: number
  products: Product[]
}

type Login = {
  status: number,
  data: LoginData
}

export const goLogin = createAsyncThunk('login/goLogin', async (data: Parmas) => {
  const res = await http.post<Login>('/signIn', JSON.stringify(data))

  const token = res.data.data.token
  const account = res.data.data.account
  const name = res.data.data.name
  const admin = res.data.data.admin
  console.log('发送请求获取到的数据', token)
  const newToken = {
    token: token
  }
  const newAdmin = {
    admin: admin
  }
  const newAccount = {
    account: account
  }
  const newName = {
    username: name
  }
  setToken(newToken)
  setAdmin(newAdmin)
  setAccount(newAccount)
  setName(newName)

  return res.data.data
})

const initialState = {
  data: {},
} as any


const slice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    builder.addCase(goLogin.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      return action.payload
    });
  },
  reducers: {}
})


export default slice.reducer