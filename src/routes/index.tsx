import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Home from '../pages/home/Home'
import NavBar from '../components/navbar'
import { Skeleton } from '@mui/material'
const Wealth = lazy(() => import('../pages/wealth/Wealth'))
const Login = lazy(() => import('../pages/login/login'))
const WealthTool = lazy(() => import('../pages/wealthTool'))

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'wealth-tool',
                Component: Wealth,
            },
            {
                path: 'wealth-tool/user-goal',
                element: (
                    <Suspense fallback={<Skeleton variant="rectangular" />}>
                        <WealthTool />
                    </Suspense>
                ),
            },
        ],
    },
])
