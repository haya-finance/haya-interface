import { lazy } from 'react';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));
const Home = Loadable(lazy(() => import('pages/home')));
const Swap = Loadable(lazy(() => import('pages/swap')));
const Mint = Loadable(lazy(() => import('pages/mint')));
const Pool = Loadable(lazy(() => import('pages/pool')));
const Auction = Loadable(lazy(() => import('pages/auction')));

// render - sample page
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <CommonLayout layout='landing' />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/swap',
      element: <Swap />
    },
    {
      path: '/mint',
      element: <Mint />
    },
    {
      path: '/pool',
      element: <Pool />
    },
    {
      path: '/auction',
      element: <Auction />
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '403',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
