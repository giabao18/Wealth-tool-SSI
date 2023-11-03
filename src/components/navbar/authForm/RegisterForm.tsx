import React, { useState } from 'react'
import {
    Box,
    FormControl,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Grid,
    Checkbox,
    FormControlLabel,
    ListItem,
    List,
    useTheme,
    DialogTitle,
    DialogContentText,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
//Icon
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google'
import ButtonStyled from 'src/components/buttonStyled'
//Translate
import { useTranslation } from 'react-i18next'
//component
import { IUserData } from './AuthForm'
import UserPool from 'src/cognito/UserPool'

const RegisterForm: React.ComponentType<IUserData> = () => {
    const bulletStyle = useTheme()
    //translate
    const { t } = useTranslation('home')
    const signUpInstruction = [
        t('account.noted_lowercase_character'),
        t('account.noted_uppercase_character'),
        t('account.noted_one_number'),
        t('account.noted_character_length'),
    ]
    //useState
    const [showPassword, setShowPassword] = useState(false)
    const [signupData, setSignupData] = useState<IUserData>({
        username: '',
        password: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }))
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }
    // Sign up
    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault()
        UserPool.signUp(
            signupData.username,
            signupData.password,
            [],
            [],
            (err, data) => {
                if (err) {
                    console.error(err)
                }
                console.log(data)
            }
        )
        alert('Sign up success')
    }
    return (
        <>
            <form onSubmit={handleSignUp}>
                <DialogTitle
                    className="login_form_title"
                    sx={{
                        fontSize: '30px',
                        fontWeight: '700',
                        padding: 0,
                    }}
                >
                    {t('account.sign_up')}
                </DialogTitle>

                <FormControl
                    sx={{ marginBottom: '16px' }}
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined_email">
                        {t('account.user_input_email')}
                    </InputLabel>
                    <OutlinedInput
                        className="button_border_radius"
                        sx={{ borderRadius: '8px' }}
                        name="username"
                        label="username"
                        autoComplete="email"
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl
                    sx={{ marginBottom: '16px' }}
                    variant="outlined"
                    required
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        {t('account.user_input_password')}
                    </InputLabel>
                    <OutlinedInput
                        name="password"
                        sx={{ borderRadius: '8px' }}
                        label="Password"
                        id="password"
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <List sx={bulletStyle.custom?.coloredBulletList}>
                        {signUpInstruction.map((instruction, index) => (
                            <ListItem
                                className="signup_instruction"
                                key={index}
                            >
                                {instruction}
                            </ListItem>
                        ))}
                    </List>
                    <Grid>
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label={
                                <Typography className="checkbox_email">
                                    {t('account.checkbox_update_email')}
                                </Typography>
                            }
                        />
                    </Grid>
                </Grid>
                <ButtonStyled
                    type="submit"
                    className="btn_submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 4,
                        borderRadius: '8px',
                        lineHeight: '35px',
                        fontWeight: '600',
                        fontSize: '15px',
                    }}
                >
                    {t('account.user_button_singup')}
                </ButtonStyled>
                <DialogContentText
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: 'rgb(174,172,172)',
                    }}
                >
                    {t('account.user_signin_social')}
                </DialogContentText>
                <Box
                    className="login_social"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 3,
                    }}
                >
                    <IconButton sx={{ mx: 2 }}>
                        <FacebookIcon fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ mx: 2 }}>
                        <GoogleIcon fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ mx: 2 }}>
                        <TwitterIcon fontSize="large" />
                    </IconButton>
                </Box>
            </form>
        </>
    )
}
export default RegisterForm
