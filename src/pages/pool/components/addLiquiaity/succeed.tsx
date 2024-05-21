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



type TypeProps = {
  windowWidth: Number;
  open: boolean;
  handleConfirmClose: () => void;
  inputToNum: string;
  inputFromNum: string;
  toToken: string;
  fromToken: string;
  hash: string

}

function ValueNumber(num: number) {

  if (num % 1 !== 0) {
    const decimalPart = num.toString().split('.')[1]

    for (let i = 0; i < decimalPart.length; i++) {
      if (Number(decimalPart[i]) !== 0) {
        num *= 10 ** (i + 4)
        num = Math.floor(num)
        num /= 10 ** (i + 4)
        var parts = num.toString().split(".");
        // console.log(parts)
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    }
  } else {
    num *= 10000
    num = Math.floor(num)
    num /= 10000

    return String(num)

  }
}





const Succeed = ({ windowWidth, handleConfirmClose, hash, open, inputFromNum, inputToNum, toToken, fromToken }: TypeProps) => {



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
    window.open(`${hash_url}${hash}`, '_blank')
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
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name={toToken} size={22} />
                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {ValueNumber(Number(inputToNum))} {toToken}
                      </Typography>

                    </Stack>
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name={fromToken} size={22} />
                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {ValueNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                    </Stack>
                    <img src={RightRow} />
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name="H20ETH" size={44} />
                      <Typography variant='body1' sx={{ color: '#000', fontWeight: 600, fontSize: '24px' }}>
                        {ValueNumber(Number(Math.sqrt(Number(inputToNum) * Number(inputFromNum))))} H20/ETH
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
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name={toToken} size={22} />
                      <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                        {ValueNumber(Number(inputToNum))} {toToken}
                      </Typography>

                    </Stack>
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name={fromToken} size={22} />
                      <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                        {ValueNumber(Number(inputFromNum))} {fromToken}
                      </Typography>

                    </Stack>
                    <img src={RightRow} />
                    <Stack direction="row" spacing="4px" alignItems="center"  >
                      <TokenColorIcon name="H20ETH" size={44} />
                      <Typography sx={{ color: "#000", fontSize: '13px', fontWeight: 600 }}>
                        {ValueNumber(Number(Math.sqrt(Number(inputToNum) * Number(inputFromNum))))} H20/ETH
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