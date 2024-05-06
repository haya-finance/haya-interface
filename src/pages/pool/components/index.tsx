
// import { SettingOutlined } from '@ant-design/icons';
import { Box, Card, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { H30_Address, sepolia_rpc, UniswapSepoliaRouterContract } from 'config';
import { ethers } from 'ethers';
import PoolSons from './poolPage';

// const web3 = new Web3(sepolia_rpc)
const provider = new ethers.JsonRpcProvider(sepolia_rpc)


type PropsType = {
  windowWidth: number;
  windowHeight: number
}

type TokenListType = {
  symbol: string;
  address: string;
  balance: string;
  network: string;
  allowance: string

}

export default function PoolPage({ windowHeight, windowWidth }: PropsType) {


  const { address, chain } = useAccount()

  // 第一个H30地址，第二个Weh地址
  const [tokenList, setTokenList] = useState<TokenListType[]>([
    {
      symbol: 'H20',
      address: H30_Address,
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      allowance: ''
    },
    {
      symbol: 'ETH',
      address: '0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia',
      allowance: ''

    }
  ])






  const getBalance = async (add: any) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)

    await contract.balanceOf(address).then(async (res2: any) => {
      // console.log('数据', res2)
      await contract.allowance(address, UniswapSepoliaRouterContract).then((res3: any) => {

        setTokenList((pre) => pre.map((item) => item.symbol === 'H20' ? { ...item, balance: String(Number(res2) / (10 ** 18)), allowance: String(BigInt(res3) / BigInt(10 ** 18)) } : item))
      })



    }).catch((_err) => {

    })
  }


  const getEthBalance = async () => {
    const balance = await provider.getBalance(address ?? '')
    // console.log("balance", balance)
    setTokenList((pre) => pre.map((item) => item.symbol === 'ETH' ? { ...item, balance: String(Number(balance) / (10 ** 18)), allowance: String(ethers.MaxUint256) } : item))

  }



  const OnChange = async () => {

    if (address !== undefined) {
      for (let i = 0; i < tokenList.length; i++) {
        if (tokenList[i].symbol == 'ETH') {
          getEthBalance()

        } else {
          getBalance(tokenList[i].address)
        }

      }
    }
  }


  useEffect(() => {

  }, [tokenList])







  useEffect(() => {

    for (let i = 0; i < tokenList.length; i++) {

      if (address !== undefined) {
        if (tokenList[i].symbol == 'ETH') {
          getEthBalance()

        } else {
          getBalance(tokenList[i].address)
        }
      }
    }

  }, [address])

  // const [openWallet, setOpenWallet] = useState(false)





  return (
    <>
      <Box sx={{ paddingTop: windowWidth >= 600 ? '60px' : 0, backgroundColor: '#fff' }}>
        <Card sx={{ boxShadow: 'none' }}>
          {
            windowWidth >= 600 ? (
              <Box sx={{ width: '600px', margin: '0 auto', p: '20px' }}>
                <Stack direction="row" justifyContent="space-between" width="100%" pb="20px">
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: "#000", fontSize: '15px', fontWeight: 700 }}>
                      Add Liquidity
                    </Typography>
                  </Stack>
                  <Box>
                    {/* <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /> */}
                  </Box>
                </Stack>
                <PoolSons data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />
              </Box>
            ) : (
              <Box sx={{ width: '100%', p: '20px 10px' }}>
                <Stack direction="row" justifyContent="space-between" width="100%" pb="10px">
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ color: "#000", fontSize: '15px', fontWeight: 700 }}>
                      Add Liquidity
                    </Typography>
                  </Stack>
                  <Box>
                    {/* <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /> */}
                  </Box>
                </Stack>
                <PoolSons data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />

              </Box>

            )
          }



        </Card>

      </Box>
    </>
  );
}