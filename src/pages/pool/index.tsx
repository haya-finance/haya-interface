import { useEffect, useState } from 'react';

// material-ui
import { Box } from '@mui/material';
import PoolPage from './components';

// project import

// assets

// ==============================|| LANDING PAGE ||============================== //

const Pool = () => {

  const [visible, setVisible] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight)

    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  useEffect(() => {

  }, [windowWidth, windowHeight])

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 250;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToHideFrom) {
        setVisible(true);
      } else {
        visible && setVisible(false);
      }
    };

    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, [visible]);




  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: "#fff",
          overflow: 'hidden',
          height: windowWidth >= 600 ? '8vh' : 0,
          '&>*': {
            position: 'relative',
            zIndex: 5
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            boxShadow: 'inherit',
            top: 0,
            left: 0,
            zIndex: 2,
          }
        }}
      >

      </Box>
      <PoolPage windowWidth={windowWidth} windowHeight={windowHeight} />
    </Box>
  );
};

export default Pool;
