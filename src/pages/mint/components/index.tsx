
// import { SettingOutlined } from '@ant-design/icons';
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
// import totalAbi from 'abi/totalData.json'

const provider = new ethers.JsonRpcProvider(sepolia_rpc)



type PropsType = {
  windowWidth: number
  windowHeight: number
}

type DataType = {
  symbol: string;
  address: any;
  balance: string;
  num: string;
  allowance: string;
  decimals: string

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
    // const Tokencontract = new ethers.Contract(adds, tokenAbi, provider)

    setTokenData((pre) => [{ symbol: 'H20', balance: '0' }])

  }


  const getBalanceSymbol = async () => {
    const Tokencontract = new ethers.Contract(H30_Address, tokenAbi, provider)

    await Tokencontract.balanceOf(address).then(async (res2: any) => {
      await Tokencontract.decimals().then((decimals: any) => {
        const num = Number(res2) / (10 ** Number(decimals))
        setTokenData((pre) => [{ symbol: 'H20', balance: String(num) }])

      })


    })

  }


  const getBalance = async (adds: any) => {
    const Tokencontract = new ethers.Contract(adds, tokenAbi, provider)
    await Tokencontract.balanceOf(address).then(async (res1: any) => {
      await Tokencontract.decimals().then((decimals: any) => {
        const num = Number(res1) / (10 ** Number(decimals))
        setTokenData((pre) => pre.map(item => {
          return { symbol: item.symbol, balance: String(Number(num)) }
        }))

      })



    })
  }


  const getTokenDetail = async () => {
    const BasicContract = new ethers.Contract(BasicIssuanceModule, basicIssAbi, provider)

    await BasicContract.getRequiredComponentUnitsForIssue(
      H30_Address,
      String(1 * (10 ** 18))
    ).then(async function (result: any) {
      let arr: DataType[] = []
      // let addresses: string[] = []
      // let symbols: string[] = []
      // let decimals: string[] = []
      // let balances: string[] = []
      // let allowances: string[] = []
      // setResData(result)
      // console.log(result)


      // for (let i = 0; i < result[0].length; i++) {
      //   addresses.push(result[0][i])

      // }

      // const symbolsContract = new ethers.Contract(total_Address, totalAbi, provider)

      // await symbolsContract.batchFetchBaseInfos(addresses).then(async (res) => {
      //   for (let i = 0; i < res[0].length; i++) {
      //     symbols.push(res[0][i])
      //     decimals.push(res[2][i])
      //   }

      //   console.log('symbols', symbols, decimals)

      //   if (address !== undefined) {
      //     await symbolsContract.batchFetchBalancesOf(addresses, [...address]).then(async (res1) => {
      //       console.log('balance', res1)


      //       await symbolsContract.batchFetchAllowances(addresses, [...address], [BasicIssuanceModule]).then(async (res2) => {
      //         console.log(res1)
      //         console.log(res2)

      //       })

      //     })



      //   }
      // })

      for (let i = 0; i < result[0].length; i++) {

        const contract = new ethers.Contract(result[0][i], tokenAbi, provider)
        await contract.symbol().then(async function (res1: any) {

          await contract.decimals().then(async (decimals: any) => {
            const num = Number(result[1][i]) / (10 ** Number(decimals))







            if (address !== undefined) {
              await contract.balanceOf(address).then(async function (res2: any) {
                const balance = Number(BigInt(res2)) / (10 ** Number(decimals))
                // console.log('decimals', decimals)
                await contract.allowance(address, BasicIssuanceModule).then(function (res3: any) {
                  // console.log('res3', res3)
                  const allow = BigInt(res3) / BigInt((10 ** Number(decimals)))
                  arr.push({
                    symbol: res1 as unknown as string,
                    address: result[0][i],
                    balance: String(balance),
                    num: String(num),
                    allowance: String(allow),
                    decimals: String(Number(decimals))

                  })
                })
              })

            } else {
              arr.push({
                symbol: res1,
                address: result[0][i],
                balance: '0',
                num: String(num),
                allowance: '0',
                decimals: String(Number(decimals))
              })
            }

          })
        })
      }

      // console.log('arr', arr)
      setData(arr)

    })

  }


  const getTokenBalance = async (adds: any) => {
    const contract = new ethers.Contract(adds, tokenAbi, provider)
    await contract.balanceOf(address).then(async function (res2: any) {
      await contract.decimals().then((decimals) => {
        const balance = Number(res2) / (10 ** Number(decimals))
        setData((pre) => pre.map((item) => item.address == adds ? { ...item, balance: String(balance) } : item))

      })

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
                  {/* <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /> */}
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
                  {/* <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /> */}
                </Box>
              </Stack>
            )
          }
          {
            value == 0 ? (
              <Container sx={{ p: 0 }}>
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