import { useState, useContext, useEffect } from 'react'
import { AccountContext } from './Account'

const Status = () => {
    const [status, setStatus] = useState(false)
    const { getSession, logout }: any = useContext(AccountContext)

    useEffect(() => {
        getSession()
            .then((session: any) => {
                console.log('Session: ', session)
                setStatus(true)
            })
            .catch((err: any) => {
                console.error('Failed to login', err)
                setStatus(false)
            })
    }, [])
    return (
        <div>
            {status ? <button onClick={logout}>Logout</button> : ''}
        </div>
    )
}
export default Status
