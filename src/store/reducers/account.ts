import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { http } from "utils/axios"

type Params = {
  type: string
  token: string
  account_id: number
}

type Params1 = {
  type: string
  token: string
  name?: string
  alarm: string
}

type Params2 = {
  type: string
  token: string
  name: string
  currency: string
}

type Params3 = {
  type: string
  token: string
  name: string
  borrow: string
}

type Params4 = {
  type: string
  token: string
  name?: string
  threshold: string
}

type Params5 = {
  type: string
  token: string
  name?: string
  equity: string
}



type Account = {
  tra_id: number,
  tra_venue: string
  tra_currency: string,
  api_key: string,
  secret_key: string,
  type: string,
  name: string,
  alarm: string,
  threshold: string,
  borrow: string,
  amount: string,
  wx_hook: string,
}

type Data = {
  data: Account[]
  status?: number
}

export const getAccount = createAsyncThunk('account/getAccount', async (data: Params) => {
  const res = await http.post('/get_accounts', JSON.stringify(data))
  console.log('获取所有账户信息列表', res.data)
  return res.data.data
})

export const updateAlarm = createAsyncThunk('account/updataAlarm', async (data: Params1) => {
  const res = await http.post('/update_accounts_alarm', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})
export const updateCurrency = createAsyncThunk('account/updataCurrency', async (data: Params2) => {
  const res = await http.post('/update_currency', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})
export const updateBorrow = createAsyncThunk('account/updataBorrow', async (data: Params3) => {
  const res = await http.post('/update_borrow', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})
export const updateThreshold = createAsyncThunk('account/updataThreshold', async (data: Params4) => {
  const res = await http.post('/update_threshold', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})
export const updatePositions = createAsyncThunk('account/updataPositions', async (data: Params4) => {
  const res = await http.post('/update_positions', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})

export const updateEquitys = createAsyncThunk('account/updataEquitys', async (data: Params5) => {
  const res = await http.post('/update_equitys', JSON.stringify(data))
  console.log('获取更新数据', res.data)
  return res.data.status
})

const initialState = {
  data: [],
  status: 0
} as Data


const slice = createSlice({
  name: 'account',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAccount.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.data = action.payload
    });
    builder.addCase(updateAlarm.fulfilled, (state, action) => {
      state.status = action.payload
    });
    builder.addCase(updateBorrow.fulfilled, (state, action) => {
      state.status = action.payload
    });
    builder.addCase(updateCurrency.fulfilled, (state, action) => {
      state.status = action.payload
    });
    builder.addCase(updatePositions.fulfilled, (state, action) => {
      state.status = action.payload
    });
    builder.addCase(updateThreshold.fulfilled, (state, action) => {
      state.status = action.payload
    });
    builder.addCase(updateEquitys.fulfilled, (state, action) => {
      state.status = action.payload
    })
  },
  reducers: {}
})


export default slice.reducer
