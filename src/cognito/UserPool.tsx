import { CognitoUserPool } from 'amazon-cognito-identity-js'

const PoolData = {
    UserPoolId: 'ap-southeast-2_AJxNUx7y9',
    ClientId: '369nau74e33sksafi9jlkeegt3',
}

const userPoolInstance = new CognitoUserPool(PoolData)

export default userPoolInstance
