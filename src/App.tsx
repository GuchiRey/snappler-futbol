/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Outlet,
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import TopBar from './components/TopBar'
import { Box } from '@mui/material';
import Dashboard from './views/Dashboard'
import Welcome from './views/Welcome'

export function Layout() {
  return (
    <>
      <TopBar />
    </>
  );
}

export function Landing() {
  return (
    <>
      <Box width="100vw">
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'start',
            backgroundSize: 'cover',
            width: '100%',
            minHeight: '100vh',
            top: '0%',
          }}
        >
          <TopBar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export function routerLanding() {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Landing />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    )
  );
}

export default function WrappedApp() {
  return (
    <>
      <Box>
        <RouterProvider router={routerLanding()} />
      </Box>
    </>
  );
}
