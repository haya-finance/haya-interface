import * as React from 'react';
import { Box } from '@mui/material';
// import MetaMask from 'assets/wallet/metamask.png';
import DisConnectWallet from '../disConnectWallet';



// interface WalletProps {
//   name: any;
//   icon?: string;
//   uid: string;
//   connector: any;
// }

interface Props {
  windowWidth: number
}

export default function ConnectWallet({ windowWidth }: Props) {


  // console.log("钱包数组", connectors)



  // console.log(installedWallets)

  const [disOpenWallet, setDisOpenWallet] = React.useState(false)


  const onCloseDisConnect = () => {
    setDisOpenWallet(false)
  }

  React.useEffect(() => {

  }, [disOpenWallet])



  return (
    // <React.Fragment>
    <>
      <DisConnectWallet windowWidth={windowWidth} open={disOpenWallet} handleClose={onCloseDisConnect} />
      {
        windowWidth >= 600 ? (
          <Box sx={{ width: '100%' }}>
            <w3m-button balance='hide' size="md" />
          </Box>
        ) : (
          <Box sx={{ width: '100%' }}>
            <w3m-button balance='hide' size="sm" />
          </Box>


        )
      }
    </>
    // </React.Fragment>
  );
}
