import { Box, Dialog, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TokenColorIcon from "assets/tokens";
import RightRow from 'assets/Arrow-right.svg';
import check from 'assets/Check-rig.svg'
import { useEffect } from "react";
import { hash_url } from "config";


type dataType = {
  num: string;
  symbol: string;
  address: string;
  balance: string;
  allowance: string;
  decimals: string;

}

type TypeProps = {
  windowWidth: Number;
  open: boolean;
  handleConfirmClose: () => void;
  data: dataType[];
  inputNum: string;
  hash: string

}

function ChangeNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.round(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");



      }
    }
  } else {
    return num.toLocaleString()

  }
}





const Succeed = ({ windowWidth, hash, handleConfirmClose, open, data, inputNum }: TypeProps) => {



  const BootstrapDialog = styled(Dialog)(({ theme }) => ({

    '.MuiDialog-paper': {
      width: '600px',
      borderRadius: '20px',
      padding: '20px 20px'
    },

    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .MuiDialogActions-root': {
      padding: 0,
    },
    '& .customized-dialog-title': {
      borderBottom: 0
    }
  }));

  useEffect(() => {

  }, [hash])


  const goHash = () => {
    window.location.assign(`${hash_url}${hash}`)
  }

  return (
    <>
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <BootstrapDialog
              onClose={handleConfirmClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >

              <Stack direction="row" justifyContent="end" alignItems="end" padding="0 10px" mb="20px" width="100%">

                <IconButton
                  aria-label="close"
                  onClick={handleConfirmClose}
                  sx={{ color: "#9b9b9b" }}

                >
                  <CloseIcon />
                </IconButton>
              </Stack>

              <DialogContent >
                <Box sx={{ p: '0px 0px 20px 0px', mb: '20px' }}>
                  <Box sx={{ width: '100%', mb: '20px', textAlign: 'center' }}>
                    <img src={check} />
                  </Box>

                  <Typography sx={{ color: '#000', fontSize: '20px', fontWeight: 700, lineHeight: '20px', textAlign: 'center', mb: '20px' }}>
                    Transaction Succeed!
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing="10px" flexWrap="wrap" gap="10px" justifyContent="center">

                    {
                      data.map((item, index) => {
                        return (
                          <>
                            {/* <Box display={BigInt(item.allowance) > BigInt(Math.round((Number(item.num) * Number(inputNum)) * (10 ** Number(item.decimals)))) ? 'none' : 'block'}> */}
                            <Stack direction="row" spacing="4px" alignItems="center" key={index} >
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={22} />
                              <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>
                            {/* </Box> */}
                          </>
                        )
                      })
                    }
                    <img src={RightRow} />
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name='H20' size={22} />
                      <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                        {String(Number(inputNum))} H20
                      </Typography>

                    </Stack>

                  </Stack>




                </Box>
              </DialogContent>
              <DialogActions>
                <Stack width="100%">
                  <Typography onClick={goHash} component="button" sx={{ backgroundColor: 'transparent', border: 0, cursor: 'pointer', color: '#1AAE70', fontSize: '15px', fontWeight: 600, lineHeight: '20px', textAlign: 'center' }}>
                    View on Explorer
                  </Typography>
                </Stack>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        ) : (
          <Drawer anchor='bottom' open={open} onClose={handleConfirmClose} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#fff', left: '5px', right: '5px', borderRadius: '20px 20px 0 0' } }}>
            <Box sx={{ width: 'auto', padding: '20px 10px' }}>
              <Box sx={{ width: '100%' }}>

                <Stack direction="row" justifyContent="end" alignItems="end" width="100%" p="0 10px" mb="10px">
                  <IconButton
                    aria-label="close"
                    onClick={handleConfirmClose}
                    sx={{ color: "#6f6f6f" }}

                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Box p="0 0 10px 0" mb="10px">
                  <Box sx={{ width: '100%', mb: '10px', textAlign: 'center' }}>
                    <img src={check} />
                  </Box>
                  <Typography sx={{ color: '#000', fontSize: '18px', fontWeight: 700, lineHeight: '20px', textAlign: 'center', mb: '10px' }}>
                    Transaction Succeed!
                  </Typography>
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing="6px" flexWrap="wrap" gap="6px" >

                    {
                      data.map((item, index) => {
                        return (
                          <>
                            {/* <Box display={BigInt(item.allowance) > BigInt(Math.round((Number(item.num) * Number(inputNum)) * (10 ** Number(item.decimals)))) ? 'none' : 'block'}> */}

                            <Stack direction="row" spacing="4px" alignItems="center" key={index} >
                              <TokenColorIcon name={item.symbol.split('-')[0]} size={22} />
                              <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                                {String(ChangeNumber(Number(item.num) * Number(inputNum)))} {item.symbol.split('-')[0]}
                              </Typography>

                            </Stack>


                            {/* </Box> */}
                          </>
                        )
                      })
                    }
                    <img src={RightRow} />
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name='H20' size={22} />
                      <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                        {String(Number(inputNum))} H20
                      </Typography>

                    </Stack>
                  </Stack>




                </Box>
                <Stack width="100%">
                  <Typography onClick={goHash} component="button" sx={{ backgroundColor: 'transparent', border: 0, cursor: 'pointer', color: '#1AAE70', fontSize: '15px', fontWeight: 600, lineHeight: '20px', textAlign: 'center' }}>
                    View on Explorer
                  </Typography>
                </Stack>

              </Box>
            </Box>
          </Drawer>
        )
      }

    </>
  )

}
export default Succeed