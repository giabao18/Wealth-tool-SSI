import React, { createContext } from 'react'
//cognito
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
//component
import Pool from 'src/cognito/UserPool'

const AccountContext = createContext({})

const Account = (props: any) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser()
            if (user) {
                user.getSession(async (err: any, session: any) => {
                    if (err) {
                        reject()
                    } else {
                        const attributes = await new Promise(
                            (resolve, reject) => {
                                user.getUserAttributes(
                                    (err, attributes: any) => {
                                        if (err) {
                                            reject(err)
                                        } else {
                                            const results: any = {}

                                            for (let attribute of attributes) {
                                                const { Name, Value } =
                                                    attribute
                                                results[Name] = Value
                                            }

                                            resolve(results)
                                        }
                                    }
                                )
                            }
                        )
                        resolve({
                            user,
                            ...session,
                            ...(typeof attributes === 'object'
                                ? attributes
                                : {}),
                        })
                    }
                })
            } else {
                reject()
            }
        })
    }
    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool })

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            })
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log('onSuccess: ', data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error('onFailure: ', err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log('newPasswordRequired: ', data)
                    resolve(data)
                },
            })
        })
    }
    const logout = () => {
        const user = Pool.getCurrentUser()
        if (user) {
            user.signOut()
        }
    }
    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
}
export { Account, AccountContext }
