import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import 'src/i18n/i18n'
import { Router } from './routes'
import { Skeleton } from '@mui/material'

function App() {
    return (
        <div className="App">
            <Suspense fallback={<Skeleton variant="text" />}>
                <RouterProvider router={Router} />
            </Suspense>
        </div>
    )
}

export default App
