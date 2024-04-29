import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const Header = lazy(() => import('./Header'));

// ==============================|| Loader ||============================== //

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

export interface LoaderProps extends LinearProgressProps { }

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = ({ layout = 'blank' }: { layout?: string }) => {

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


  return (
    <>
      {(layout === 'landing' || layout === 'simple') && (
        <Suspense fallback={<Loader />}>
          {
            windowWidth >= 600 ? (
              <>
                <Header layout={layout} windowHeight={windowHeight} windowWidth={windowWidth} />
                <Outlet />
              </>
            ) : (
              <Header layout={layout} windowHeight={windowHeight} windowWidth={windowWidth} />

            )
          }
        </Suspense>
      )}
      {layout === 'blank' && <Outlet />}
    </>
  )
}

export default CommonLayout;
