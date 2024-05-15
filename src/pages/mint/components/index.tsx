
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
import { sepolia_rpc, BasicIssuanceModule, H30_Address, total_Address } from 'config';
import { ethers } from 'ethers';
import { Container } from '@mui/system';
import totalAbi from 'abi/totalData.json'

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

  const { address, } = useAccount();

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
      let newArr: DataType[] = []
      let nums: string[] = []
      let ownerAddresses: string[] = []
      let spenderAddresses: string[] = []
      let addresses: string[] = []
      let symbols: string[] = []
      let decimals: string[] = []
      // setResData(result)
      // console.log(result)


      for (let i = 0; i < result[0].length; i++) {
        addresses.push(result[0][i])
        nums.push(String(result[1][i]))
        ownerAddresses.push(String(address))
        spenderAddresses.push(BasicIssuanceModule)
      }

      const symbolsContract = new ethers.Contract(total_Address, totalAbi, provider)

      await symbolsContract.batchFetchBaseInfos(addresses).then(async (res) => {
        for (let i = 0; i < res[0].length; i++) {
          symbols.push(String(res[0][i]))
          decimals.push(String(Number(res[2][i])))
        }

        if (address !== undefined) {
          await symbolsContract.batchFetchBalancesOf(addresses, ownerAddresses).then(async (res1) => {


            await symbolsContract.batchFetchAllowances(addresses, ownerAddresses, spenderAddresses).then(async (res2) => {


              for (let i = 0; i < res1.length; i++) {

                newArr.push({
                  symbol: symbols[i],
                  address: addresses[i],
                  balance: String(Number(BigInt(res1[i])) / (10 ** Number(decimals[i]))),
                  num: String(Number(nums[i]) / (10 ** Number(decimals[i]))),
                  allowance: String(BigInt(res2[i]) / BigInt((10 ** Number(decimals[i])))),
                  decimals: String(decimals[i])

                })

              }



            })

          })



        } else {
          for (let i = 0; i < res[0].length; i++) {
            newArr.push({
              symbol: symbols[i],
              address: addresses[i],
              balance: '0',
              num: String(Number(nums[i]) / (10 ** Number(decimals[i]))),
              allowance: '0',
              decimals: decimals[i]

            })

          }

        }

      })
      setData(newArr)




    })

  }


  const getTokenBalance = async (adds: any) => {
    // const symbolsContract = new ethers.Contract(total_Address, totalAbi, provider)
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
    padding: windowWidth >= 600 ? '18px 0' : '15px 0',
    borderRadius: '20px',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    width: '100%',
    color: '#fff',
    backgroundColor: '#1AAE70',
    '&:hover': {
      backgroundColor: '#19A56A',
      color: '#fff',
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
              <Stack direction="row" justifyContent="space-between" width="600px" margin="0 auto" mb="20px">
                <Stack direction="row" spacing={1}>
                  <Box sx={value == 0 ? ({ p: '4px 12px', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '13px', fontWeight: 600, borderRadius: "20px", cursor: 'pointer', border: 0 }) : ({ p: '4px 12px', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '13px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Mint
                  </Box>
                  <Box sx={value == 1 ? ({ p: '4px 12px', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '13px', fontWeight: 600, borderRadius: "20px", cursor: 'pointer', border: 0 }) : ({ p: '4px 12px', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '13px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(1)}>
                    Redeem
                  </Box>
                </Stack>
                <Box>
                  {/* <SettingOutlined onPointerOverCapture={undefined} onPointerMoveCapture={undefined} /> */}
                </Box>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between" mb="10px">
                <Stack direction="row" spacing={1}>
                  <Box sx={value == 0 ? ({ p: '4px 12px', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '13px', fontWeight: 600, borderRadius: "20px", cursor: 'pointer', border: 0 }) : ({ p: '4px 12px', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '13px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(0)}>
                    Mint
                  </Box>
                  <Box sx={value == 1 ? ({ p: '4px 12px', backgroundColor: '#f6f6f6', color: '#1AAE70', fontSize: '13px', fontWeight: 600, borderRadius: "20px", cursor: 'pointer', border: 0 }) : ({ p: '4px 12px', backgroundColor: '#fff', color: '#6F6F6F', fontSize: '13px', cursor: 'pointer', border: 0 })} component="button" onClick={() => OnCheckTitel(1)}>
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
                            <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                          </Box>
                        ) : (
                          <Box sx={{ width: '100%', mt: '10px' }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
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
                            <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
                          </Box>
                        ) : (
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onClose} />
                            <ConnectButton onClick={walletConnect} >Connect Wallet</ConnectButton>
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