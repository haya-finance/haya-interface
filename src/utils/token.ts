const JIAN_KONG = 'monitor'
const JIAN_KONG_ACCOUNT = 'monitor_account'
const JIAN_KONG_NAME = 'monitor_name'
const JIAN_KONG_ANDMIN = 'monitor_admin'
const JIAN_KONG_APIKEY = 'monitor_api_key'
const JIAN_KONG_SECRETKEY = 'monitor_secret_key'
const JIAN_KONG_AMOUNT = 'monitor_amount'


type Token = { token: string }


type APIKEY = { api_key: string }

type SECRETKEY = { secret_key: string }
type Amount = { amount: string }



type User = {
  username: string
}

type Account = { account: number }

type Admin = { admin: string }

export const getToken = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG) ?? '{ "token": ""}'
  ) as Token

export const getAmount = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_AMOUNT) ?? '{ "amount": ""}'
  ) as Amount
// const { token, refresh_token } = getToken()

export const getApiKey = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_APIKEY) ?? '{ "api_key": ""}'
  ) as APIKEY

export const getSecretKey = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_SECRETKEY) ?? '{ "secret_key": ""}'
  ) as SECRETKEY

export const getAdmin = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_ANDMIN) ?? '{ "admin": ""}'
  )

export const getUserName = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_NAME) ?? '{ "username": ""}'
  ) as User

export const getAccountText = () =>
  JSON.parse(
    localStorage.getItem(JIAN_KONG_ACCOUNT) ?? '{ "account": ""}'
  ) as Account

export const setToken = (token: Token) =>
  localStorage.setItem(JIAN_KONG, JSON.stringify(token))

export const setAmounts = (amount: Amount) =>
  localStorage.setItem(JIAN_KONG_AMOUNT, JSON.stringify(amount))

export const setApiKeys = (api_key: APIKEY) =>
  localStorage.setItem(JIAN_KONG_APIKEY, JSON.stringify(api_key))

export const setSecretKeys = (secret_key: SECRETKEY) =>
  localStorage.setItem(JIAN_KONG_SECRETKEY, JSON.stringify(secret_key))

export const setAdmin = (admin: Admin) => {
  localStorage.setItem(JIAN_KONG_ANDMIN, JSON.stringify(admin))
}

export const setName = (name: User) =>
  localStorage.setItem(JIAN_KONG_NAME, JSON.stringify(name))

export const setAccount = (account: Account) => localStorage.setItem(JIAN_KONG_ACCOUNT, JSON.stringify(account))

export const clearToken = () => localStorage.removeItem(JIAN_KONG)
export const clearAmount = () => localStorage.removeItem(JIAN_KONG_AMOUNT)
export const clearApiKey = () => localStorage.removeItem(JIAN_KONG_APIKEY)
export const clearSecretKey = () => localStorage.removeItem(JIAN_KONG_SECRETKEY)
export const clearAccount = () => localStorage.removeItem(JIAN_KONG_ACCOUNT)
export const clearName = () => localStorage.removeItem(JIAN_KONG_NAME)
export const clearAdmin = () => localStorage.removeItem(JIAN_KONG_ANDMIN)

export const isAdmin = () => getAdmin().admin == "true"
// console.log('是否是管理员', isAdmin())

// 约定只要有 token 就认为是登录了
// 注意：此处，需要拿到 token 中的 token 属性，再通过 !! 转布尔值
export const isAuth = () => !!getToken().token
// console.log('isAuth', isAuth())