import { Button, Box, Typography, Avatar } from '@mui/material'

//icon
import GoogleIcon from '@mui/icons-material/Google'
import Assets from 'src/assets'
import { useTranslation } from 'react-i18next'

const buttonWealth = [
    {
        name: 'SSI Trading',
        icon: '',
    },
    {
        name: 'Google',
        icon: Assets.GoogleLogo64,
    },
]

export const Auth = () => {
    const { t } = useTranslation('wealth_tool')
    return (
        <>
            <Typography className="auth_text">
                {t('wealth_tool.user_sign_in_box_text')}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {buttonWealth.map((button, index) => (
                    <Button
                        className="btn_sign_in"
                        key={index}
                        sx={{
                            margin: 2,
                            width: '160px',
                            color: '#333333',
                            padding: '8px',
                            backgroundColor: '#e4e4e4',
                        }}
                        startIcon={
                            <Avatar
                                src={button.icon}
                                sx={{ width: '32px', height: '32px' }}
                            ></Avatar>
                        }
                    >
                        {button.name}
                    </Button>
                ))}
            </Box>
        </>
    )
}

export default Auth
