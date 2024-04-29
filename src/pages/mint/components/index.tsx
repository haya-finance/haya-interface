
import { SettingOutlined } from '@ant-design/icons';
import { Box, Card, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import MintSon from './mintPage';
import ConnectWallet from 'layout/CommonLayout/components/connectWallet';
import RedeemSon from './redeemPage';
import tokenAbi from 'abi/token.json'
import basicIssAbi from 'abi/basicIssuance.json'
import { sepolia_rpc, BasicIssuanceModule, H30_Address } from 'config';
import { ethers } from 'ethers';
import { Container } from '@mui/system';
// import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(sepolia_rpc)



type PropsType = {
  windowWidth: number
  windowHeight: number
}

type DataType = {
  symbol: string;
  address: any;
  balance: string;
  num: string

}


type HType = {
  symbol: string;
  balance: string
}


// const provider = new ethers.JsonRpcProvider(sepolia_rpc)





export default function MintPage({ windowWidth, windowHeight }: PropsType) {

  const [value, setValue] = useState(0)
  const [data, setData] = useState<DataType[]>([])

  const [tokenData, setTokenData] = useState<HType[]>([])

  const OnCheckTitel = (v: number) => {
    setValue(v)

  }




  const [openWallet, setOpenWallet] = useState(false)

  const { address } = useAccount();

  // const [resData, setResData] = useState<any>({})


  useEffect(() => {

  }, [data])


  const getSymbol = async (adds: any) => {
    const Tokencontract = new ethers.Contract(adds, tokenAbi, provider)
    await Tokencontract.symbol().then((res1: any) => {
      setTokenData((pre) => [{ symbol: res1, balance: '0' }])
    })
  }


  const getBalanceSymbol = async () => {
    const Tokencontract = new ethers.Contract(H30_Address, tokenAbi, provider)
    await Tokencontract.symbol().then(async (res1: any) => {
      await Tokencontract.balanceOf(address).then((res2: any) => {
        const num = Number(res2) / (10 ** 18)
        setTokenData((pre) => [{ symbol: res1, balance: String(num) }])
      })
    })

  }


  const getBalance = async (adds: any) => {
    const Tokencontract = new ethers.Contract(adds, tokenAbi, provider)
    await Tokencontract.balanceOf(address).then((res1: any) => {
      const num = Number(res1) / (10 ** 18)
      setTokenData((pre) => pre.map(item => {
        return { symbol: item.symbol, balance: String(Number(num)) }
      }))

    })
  }


  const getTokenDetail = async () => {
    const BasicContract = new ethers.Contract(BasicIssuanceModule, basicIssAbi, provider)

    await BasicContract.getRequiredComponentUnitsForIssue(
      H30_Address,
      String(1 * (10 ** 18))
    ).then(async function (result: any) {
      let arr: DataType[] = []
      // setResData(result)
      console.log(result)

      for (let i = 0; i < result[0].length; i++) {

        const contract = new ethers.Contract(result[0][i], tokenAbi, provider)
        await contract.symbol().then(async function (res1: any) {



          const num = res1 == "WBTC-H" ? Number(result[1][i]) / (10 ** 8) : Number(result[1][i]) / (10 ** 18)

          if (address !== undefined) {
            await contract.balanceOf(address).then(function (res2: any) {

              const balance = res1 == "WBTC-H" ? Number(BigInt(res2)) / (10 ** 8) : Number(BigInt(res2)) / (10 ** 18)


              arr.push({
                symbol: res1 as unknown as string,
                address: result[0][i],
                balance: String(balance),
                num: String(num)

              })

            })

          } else {
            arr.push({
              symbol: res1,
              address: result[0][i],
              balance: '0',
              num: String(num)
            })
          }

        })
      }

      // console.log('arr', arr)
      setData(arr)

    })

  }


  const getTokenBalance = async (adds: any) => {
    const contract = new ethers.Contract(adds, tokenAbi, provider)
    await contract.balanceOf(address).then(function (res2: any) {
      const balance = Number(res2) / (10 ** 18)
      setData((pre) => pre.map((item) => item.address == adds ? { ...item, balance: String(balance) } : item))
    })
  }



  const onChange = (_change: boolean) => {
    getBalance(H30_Address)
    for (let i = 0; i < data.length; i++) {
      getTokenBalance(data[i].address)

    }
  }



  useEffect(() => {

    if (address !== undefined) {
      getBalanceSymbol()
    } else {
      getSymbol(H30_Address)

    }
    getTokenDetail()



  }, [address])








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
      <Box sx={{ padding: windowWidth >= 600 ? '60px 0' : '10px 0', backgroundColor: '#fff' }}>
        <Card sx={{ p: 1, boxShadow: 'none' }}>
          {
            windowWidth >= 600 ? (
              <Stack direction="row" justifyContent="space-between" width="600px" margin="0 auto" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={value == 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Mint
                  </Box>
                  <Box sx={value == 1 ? ({ p: '0 0.5rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.5rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(1)}>
                    Redeem
                  </Box>
                </Stack>
                <Box>
                  <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
                </Box>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Stack direction="row" spacing={1}>
                  <Box sx={value == 0 ? ({ p: '0 0.7rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.7rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Mint
                  </Box>
                  <Box sx={value == 1 ? ({ p: '0 0.5rem', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '12px', borderRadius: 8, cursor: 'pointer', border: 0 }) : ({ p: '0 0.5rem', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '12px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(1)}>
                    Redeem
                  </Box>
                </Stack>
                <Box>
                  <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} />
                </Box>
              </Stack>
            )
          }
          {
            value == 0 ? (
              <Container>
                <MintSon windowWidth={windowWidth} windowHeight={windowHeight} tokensData={data} H30Data={tokenData} onUpdate={onChange} />
                {
                  address !== undefined ? (
                    <></>
                  ) : (
                    <>
                      {
                        windowWidth >= 600 ? (
                          <Box sx={{ width: "600px", margin: '0 auto', mt: '20px' }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        ) : (
                          <Box sx={{ width: '100%', mt: '10px' }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect wallet</ConnectButton>
                          </Box>
                        )
                      }
                    </>

                  )
                }
              </Container>
            ) : (
              <Box sx={{ width: '100%' }}>
                <RedeemSon windowWidth={windowWidth} windowHeight={windowHeight} tokensData={data} H30Data={tokenData} OnChange={onChange} />
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

            )
          }

        </Card>

      </Box>
    </>
  );
}