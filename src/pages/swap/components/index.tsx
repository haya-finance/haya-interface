
import { SettingOutlined } from '@ant-design/icons';
import { Box, Card, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';
import SwapSons from './swapPage';
// import Web3 from 'web3'
import tokenAbi from 'abi/token.json'
import { sepolia_rpc } from 'config';
import { ethers } from 'ethers';

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

export default function SwapPage({ windowHeight, windowWidth }: PropsType) {


  const { address, chain } = useAccount()

  // 第一个eth地址，第二个h30地址
  const [tokenList, setTokenList] = useState<TokenListType[]>([
    {
      symbol: '',
      address: '0x8b5F184973b34F9D57A9706E31aE66d67824139B',
      balance: '0',
      network: chain?.name ?? 'sepolia'
    },
    {
      symbol: '',
      address: '0xa1BE9E952432F582e65152Be90cd76FED27af12b',
      balance: '0',
      network: chain?.name ?? 'sepolia'

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

  const [value, setValue] = useState(0)

  const OnCheckTitel = (v: number) => {
    setValue(v)

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

  const [openWallet, setOpenWallet] = useState(false)


  const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#1AAE70',
    },
  }));



  const walletConnect = () => {
    setOpenWallet(true);
  };

  const onClose = () => {
    setOpenWallet(false);
  };


  return (
    <>
      <Box sx={{ paddingTop: windowWidth >= 600 ? '8rem' : '80px', backgroundColor: '#fff' }}>
        <Card sx={{ p: windowWidth >= 600 ? 1 : '14px', boxShadow: 'none' }}>
          {
            windowWidth >= 600 ? (
              <Stack direction="row" justifyContent="space-between" width="600px" margin="0 auto" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={value === 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box>
                  <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
                </Box>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={value === 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Swap
                  </Box>
                </Stack>
                <Box>
                  <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
                </Box>
              </Stack>
            )
          }
          {
            value === 0 ? (
              <Box sx={{ width: '100%' }}>
                <SwapSons data={tokenList} windowHeight={windowHeight} windowWeight={windowWidth} OnChange={OnChange} />
                {
                  address !== undefined ? (
                    <></>


                  ) : (
                    <>
                      {
                        windowWidth >= 600 ? (
                          <Box sx={{ width: "600px", margin: '0 auto', mt: 1 }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        ) : (
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        )
                      }
                    </>

                  )
                }
              </Box>
            ) : (
              <></>
            )
          }

        </Card>

      </Box>
    </>
  );
}