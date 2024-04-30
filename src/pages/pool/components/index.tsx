
import { SettingOutlined } from '@ant-design/icons';
import { Box, Card, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { H30_Address, sepolia_rpc } from 'config';
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
  network: string
}

export default function PoolPage({ windowHeight, windowWidth }: PropsType) {


  const { address, chain } = useAccount()

  // 第一个H30地址，第二个Weh地址
  const [tokenList, setTokenList] = useState<TokenListType[]>([
    {
      symbol: '',
      address: H30_Address,
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia'
    },
    {
      symbol: '',
      address: '0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7',
      balance: '0',
      network: chain?.name ?? 'Arbitrum Sepolia'

    }
  ])



  const getSymbol = async (add: any) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)

    await contract.symbol().then((res1: any) => {
      setTokenList((pre) => pre.map((item) => item.address === add ? { ...item, symbol: String(res1)?.split('-')[0] } : item))
    }).catch((_err) => {

    })
  }


  const getBalance = async (add: any) => {
    const contract = new ethers.Contract(add, tokenAbi, provider)

    await contract.balanceOf(address).then((res2: any) => {
      setTokenList((pre) => pre.map((item) => item.address === add ? { ...item, balance: String(BigInt(res2)) } : item))

    }).catch((_err) => {

    })
  }



  const OnChange = async () => {

    if (address !== undefined) {
      for (let i = 0; i < tokenList.length; i++) {
        getBalance(tokenList[i].address)

      }
    }
  }




  useEffect(() => {

    for (let i = 0; i < tokenList.length; i++) {
      getSymbol(tokenList[i].address)



      if (address !== undefined) {
        getBalance(tokenList[i].address)
      }
    }

  }, [address])

  // const [openWallet, setOpenWallet] = useState(false)


  // const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   width: '100%',
  //   color: '#fff',
  //   backgroundColor: '#1AAE70',
  //   '&:hover': {
  //     backgroundColor: '#1AAE70',
  //   },
  // }));



  // const walletConnect = () => {
  //   setOpenWallet(true);
  // };

  // const onClose = () => {
  //   setOpenWallet(false);
  // };


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
                    <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
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
                    <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
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