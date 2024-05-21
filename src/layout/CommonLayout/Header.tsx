import * as React from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import { MdKeyboardArrowDown } from "react-icons/md";
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  useMediaQuery,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  useScrollTrigger,
  ButtonBase,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ButtonProps
} from '@mui/material';

// project import

// assets
import HeaderLogo from './headerLogo';
import Networks from 'assets/networks';
import { useAccount, useSwitchChain } from 'wagmi';
import DisConnectWallet from './components/disConnectWallet';
import ConnectWallet from './components/connectWallet';
import WalletIcon from 'assets/images/wallet';

// =============================================|| COMPONENTS - APP BAR ||============================================= //

// elevation scroll
function ElevationScroll({ layout, children, window }: any) {
  // const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });


  const backColorScroll = '#fff';
  const backColor = layout !== 'landing' ? backColorScroll : '#fff';

  return React.cloneElement(children, {
    style: {
      backgroundColor: trigger ? backColorScroll : backColor
    }
  });
}

interface Props {
  handleDrawerOpen?: () => void;
  layout?: string;
  windowWidth: number;
  windowHeight: number
}


interface NetworkType {
  id?: number;
  name?: string;
}


const ConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // width: '100%',
  borderRadius: '16px',
  padding: '15px 15px',
  fontSize: '14px',
  lineHeight: '11px',
  fontWeight: 600,
  color: '#fff',
  "&::after": { boxShadow: 'none' },
  backgroundColor: '#1AAE70',
  '&:hover': {
    backgroundColor: '#19A56A',
    color: '#fff',
  },
}));


const ConnectMaxButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '18px 20px',
  borderRadius: '10px',
  fontWeight: 600,
  color: '#fff',
  fontSize: '16px',
  lineHeight: '11px',
  backgroundColor: '#1AAE70',
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: '#19A56A',
    color: '#fff',
  },

}))


const DisConnectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  // width: '100%',
  borderRadius: '16px',
  fontSize: '14px', padding: '10px 20px', color: '#1B1B1B', fontWeight: 600,
  backgroundColor: '#f6f6f6',
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: '#f6f6f6',
    color: '#000'

  },
}));


const NavtionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: '100%',
  // borderRadius: '10px',
  padding: '12px 34px',
  fontSize: '13px',
  lineHeight: '13px',
  color: '#464646',
  fontWeight: 600,
  backgroundColor: 'transparent',
  "&::after": { boxShadow: 'none' },
  '&:hover': {
    backgroundColor: '#f6f6f6',
    color: '#1aae70',
    borderRadius: '20px',
    fontWeight: 600,

  },
  '&:focus': {
    backgroundColor: '#f6f6f6',
    color: '#1aae70',
    borderRadius: '20px',
    fontWeight: 600,

  },
  '&:active': {
    backgroundColor: '#f6f6f6',
    color: '#1aae70',
    borderRadius: '20px',
    fontWeight: 600,

  },
}));

const Header = ({ handleDrawerOpen, layout = 'landing', windowWidth, windowHeight, ...others }: Props) => {


  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  // 账户的信息
  const { address, chain, connector } = useAccount()
  const { switchChain } = useSwitchChain()

  // 路由
  const location = useLocation()
  const currentPath = location.pathname




  // 网络选择
  // 网络数组
  // 421614
  const networkes: NetworkType[] = [
    {
      id: 42161,
      name: 'Arbitrum One'
    }
  ]

  const [network, setNetwork] = React.useState<NetworkType>({
    id: 42161,
    name: 'Arbitrum One'
  })
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }



  React.useEffect(() => {

  }, [network])


  React.useEffect(() => {

  }, [windowHeight, windowWidth])

  // 切换网络
  const onChangeNework = (value: any, event?: any) => {
    console.log(chain)
    setNetwork(value)
    switchChain({ chainId: value.id })
    handleClose(event)
  }


  // 连接钱包
  const [openWallet, setOpenWallet] = React.useState(false)
  const walletConnect = () => {
    setOpenWallet(true)
  }
  const onCloseWalletConnect = () => {
    setOpenWallet(false)
  }


  // 断开钱包连接
  const [disOpenWallet, setDisOpenWallet] = React.useState(false)
  const disConnectWallet = () => {
    setDisOpenWallet(true)
  }

  const onCloseDisConnect = () => {
    setDisOpenWallet(false)
  }


  // 跳转路由
  const navigate = useNavigate()
  const onClickNav = (value: string) => {
    navigate(`${value}`)

  }



  return (
    <>
      {
        windowWidth >= 600 ? (
          <ElevationScroll layout={layout} {...others}>
            <AppBar sx={{ bgcolor: 'transparent', color: theme.palette.text.primary, boxShadow: 'none', padding: '0 36px', borderBottom: currentPath === '/' ? 0 : '0.5px solid rgb(0, 0, 0, 0.1)' }}>
              <Container disableGutters={matchDownMd}>
                <Toolbar sx={{ maxWidth: '1340px', p: '12px 10px' }}>
                  <Stack direction="row" width="100%" justifyContent="space-between">
                    <Stack direction="row" spacing="30px" alignItems="center" sx={{
                      '& .header-link': { '&:hover': { color: "#1AAE70" }, '&:active': { color: '#1AAE70' }, '&:focus': { color: '#1AAE70' } },
                    }}>
                      <ButtonBase component={RouterLink} to="/" disableRipple>
                        <HeaderLogo />
                      </ButtonBase>
                      <Box sx={{ backgroundColor: '#c0c0c0', width: '1px', height: '28px' }}>

                      </Box>
                      <Link className='header-link' to="/" sx={{ fontSize: '14px', lineHeight: '24px', fontWeight: 600, p: 0, color: currentPath === '/' ? '#1aae70' : '#464646' }} component={RouterLink} underline="none">
                        Home
                      </Link>
                      <Link className='header-link' to="/swap" sx={{ fontSize: '14px', lineHeight: '24px', fontWeight: 600, p: 0, color: currentPath === '/swap' ? '#1aae70' : '#464646' }} component={RouterLink} underline="none">
                        Swap
                      </Link>
                      <Link className='header-link' to="/pool" sx={{ fontSize: '14px', lineHeight: '24px', fontWeight: 600, p: 0, color: currentPath === '/pool' ? '#1aae70' : '#464646' }} component={RouterLink} underline="none">
                        Pool
                      </Link>
                      <Link className='header-link' to="/mint" sx={{ fontSize: '14px', lineHeight: '24px', fontWeight: 600, p: 0, color: currentPath === '/mint' ? '#1aae70' : '#464646' }} component={RouterLink} underline="none">
                        Mint
                      </Link>
                      {/* <Link className='header-link' to="/auction" sx={{ fontSize: '14px', lineHeight: '24px', p: 0, color: currentPath === '/auction' ? '#1aae70' : '#000' }} component={RouterLink} underline="none">
                        Auction
                      </Link> */}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="20px">
                      <Box sx={{ display: address == undefined ? 'none' : 'block' }}>
                        <Button
                          sx={{ backgroundColor: '#f6f6f6', fontSize: '14px', padding: '10px 20px', color: '#1B1B1B', fontWeight: 600, borderRadius: '16px', '&:hover': { backgroundColor: '#f6f6f6', color: '#1B1B1B', boxShadow: 'none' }, "&::after": { boxShadow: 'none' }, '&:active': { backgroundColor: '#f6f6f6', color: '#1B1B1B', border: 0, boxShadow: 'none', zIndex: 100, outline: '0px solid #fff' }, '&:focus': { backgroundColor: '#f6f6f6', boxShadow: 'none', color: '#1B1B1B', border: 0, outline: '0px solid #fff' } }}
                          ref={anchorRef}
                          id="composition-button"
                          aria-controls={open ? 'composition-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                          startIcon={<Networks name={network.name} size={22} />}
                          endIcon={<KeyboardArrowDownIcon style={{ fontWeight: 600, fontSize: '20px' }} />}
                        >
                          {network.name}

                        </Button>
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom-start" ? 'left top' : 'left bottom'
                              }}
                            >
                              <Paper sx={{ borderRadius: '16px', padding: '10px 20px', marginTop: '10px', width: '240px' }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    {
                                      networkes.map((item) => {
                                        return (
                                          <MenuItem sx={{ padding: 0, "&:hover": { backgroundColor: '#fff' } }} onClick={(event) => onChangeNework({ name: item.name, id: item.id }, event)} disableRipple key={item.id}>
                                            <Stack direction="row" key={item.id} spacing="10px" sx={{ alignItems: "center", justifyContent: "start" }}>
                                              <Networks name={item.name} size={22} />
                                              <Box sx={{ fontSize: '14px', color: '#1B1B1B', fontWeight: 600 }}>
                                                {item.name}
                                              </Box>
                                            </Stack>
                                          </MenuItem>

                                        )
                                      })
                                    }
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>

                            </Grow>
                          )}

                        </Popper>
                      </Box>

                      <Box >
                        {address !== undefined ? (
                          <>
                            <DisConnectWallet windowWidth={windowWidth} open={disOpenWallet} handleClose={onCloseDisConnect} />
                            <DisConnectButton onClick={disConnectWallet} startIcon={<WalletIcon name={connector?.name} size={22} />} endIcon={<MdKeyboardArrowDown style={{ fontWeight: 600, fontSize: '20px' }} />}>

                              {address?.substring(0, 6)}...{address?.substring(address.length - 4)}

                            </DisConnectButton>
                          </>
                        ) : (
                          <>
                            <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onCloseWalletConnect} />
                            <ConnectMaxButton
                              variant="contained"
                              onClick={walletConnect}
                              disableElevation
                            >
                              Connect Wallet
                            </ConnectMaxButton>
                          </>
                        )
                        }
                      </Box>

                    </Stack>

                  </Stack>

                </Toolbar>

              </Container>


            </AppBar>

          </ElevationScroll>
        ) : (
          <Toolbar sx={{ display: 'flex', flexDirection: 'column', height: `${windowHeight}px`, width: `${windowWidth}px`, p: 0, }}>
            <Stack direction="row" width="100%" justifyContent="space-between" sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10, padding: '8px 16px', borderBottom: '0.5px solid rgb(0, 0, 0, 0.1)' }}>

              <ButtonBase component={RouterLink} to="/" disableRipple>
                <HeaderLogo />
              </ButtonBase>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Box sx={{ display: address == undefined ? 'none' : 'block' }}>
                  <Button
                    sx={{ backgroundColor: '#f6f6f6', color: '#000', padding: '10px 20px', minWidth: 0, borderRadius: '16px', "&::after": { boxShadow: 'none' }, '&:hover': { backgroundColor: '#f6f6f6', borderRadius: '10px', color: '#000' }, '&:active': { backgroundColor: '#f6f6f6', borderRadius: '10px', color: '#000', border: 0 }, '&:focus': { backgroundColor: '#f6f6f6', borderRadius: '10px', color: '#000', border: 0 }, }}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <Networks name={network.name} size={22} />
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper sx={{ borderRadius: '16px', padding: '5px 15px', marginTop: '10px' }}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                              sx={{ padding: 0 }}
                            >
                              {
                                networkes.map((item) => {
                                  return (
                                    <MenuItem sx={{ padding: 0, "&:hover": { backgroundColor: '#fff' } }} onClick={(event) => onChangeNework({ name: item.name, id: item.id }, event)} disableRipple key={item.id}>
                                      <Stack direction="row" key={item.id} spacing={1} sx={{ alignItems: "center", justifyContent: "start" }}>
                                        <Networks name={item.name} size={22} />
                                        <Box sx={{ fontSize: '14px', color: '#1B1B1B', fontWeight: 600 }}>
                                          {item.name}
                                        </Box>
                                      </Stack>
                                    </MenuItem>

                                  )
                                })
                              }
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
                <Box >
                  {address !== undefined ? (
                    <>
                      <DisConnectWallet windowWidth={windowWidth} open={disOpenWallet} handleClose={onCloseDisConnect} />
                      <DisConnectButton sx={{ padding: '10px 20px', minWidth: 0, '& .MuiButton-startIcon': { margin: 0 } }} onClick={disConnectWallet} startIcon={<WalletIcon name={connector?.name} size={22} />}>

                        {/* {address?.substring(0, 6)}...{address?.substring(address.length - 4)} */}

                      </DisConnectButton>
                    </>
                  ) : (
                    <>
                      <ConnectWallet windowWidth={windowWidth} open={openWallet} handleClose={onCloseWalletConnect} />
                      <ConnectButton
                        variant="contained"
                        onClick={walletConnect}
                        disableElevation
                      >
                        Connect Wallet
                      </ConnectButton>
                    </>
                  )
                  }
                </Box>


              </Stack>

            </Stack>
            <Box sx={{ flex: 1, overflowY: 'auto', width: '100%' }}>
              <Outlet />

            </Box>

            <Paper sx={{ position: 'sticky', bottom: 0, zIndex: 10 }} elevation={3}>
              <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ backgroundColor: '#fff', width: `${windowWidth}px`, padding: '8px 14px' }}>
                <NavtionButton sx={{ backgroundColor: currentPath === '/' ? '#f6f6f6' : 'transparent', color: currentPath === '/' ? '#1aae70' : '#464646', borderRadius: currentPath === '/' ? '20px' : 0 }} onClick={() => onClickNav('/')}>
                  Home
                </NavtionButton >
                <NavtionButton sx={{ backgroundColor: currentPath === '/swap' ? '#f6f6f6' : 'transparent', color: currentPath === '/swap' ? '#1aae70' : '#464646', borderRadius: currentPath === '/swap' ? '20px' : 0 }} onClick={() => onClickNav('/swap')}>
                  Swap
                </NavtionButton>
                <NavtionButton sx={{ backgroundColor: currentPath === '/pool' ? '#f6f6f6' : 'transparent', color: currentPath === '/pool' ? '#1aae70' : '#464646', borderRadius: currentPath === '/pool' ? '20px' : 0 }} onClick={() => onClickNav('/pool')}>
                  Pool
                </NavtionButton>
                <NavtionButton sx={{ backgroundColor: currentPath === '/mint' ? '#f6f6f6' : 'transparent', color: currentPath === '/mint' ? '#1aae70' : '#464646', borderRadius: currentPath === '/mint' ? '20px' : 0 }} onClick={() => onClickNav('/mint')}>
                  Mint
                </NavtionButton>
                {/* <NavtionButton sx={{ backgroundColor: currentPath === '/auction' ? '#f6f6f6' : 'transparent', color: currentPath === '/auction' ? '#1aae70' : '#464646', borderRadius: currentPath === '/mint' ? '10px' : 0 }} onClick={() => onClickNav('/auction')}>
                  Auction
                </NavtionButton> */}



              </Stack>
            </Paper>



          </Toolbar>
        )

      }
    </>






  );
};

export default Header;
