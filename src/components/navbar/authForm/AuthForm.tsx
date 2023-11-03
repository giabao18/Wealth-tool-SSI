import React, { useState, useContext } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import './AuthForm.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
    Box,
    Typography,
    IconButton,
    Link,
    useTheme,
    Dialog,
    DialogContentText,
    Button,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Grid,
    FormControlLabel,
    Checkbox,
    Menu,
    MenuItem,
    Tooltip,
    Avatar,
    Divider,
    ListItemIcon,
} from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ButtonStyled from 'src/components/buttonStyled'

//Icon
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google'
import CloseIcon from '@mui/icons-material/Close'
//Translate
import { useTranslation } from 'react-i18next'
//component
import { AccountContext } from 'src/context/User/Account'
import RegisterForm from './RegisterForm'

export interface IUserData {
    username: string
    password: string
}

export default function AuthForm() {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    //Language
    const { t } = useTranslation('home')

    // Display form login
    const [isVisible, setIsVisible] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    const [loginData, setLoginData] = useState<IUserData>({
        username: '',
        password: '',
    })
    //Change form
    const handleVisibleForm = () => {
        setIsVisible(true)
    }
    const handleInVisibleForm = () => {
        setIsVisible(false)
        setIsSignIn(false)
    }
    const handleOpenFormSignIn = () => {
        setIsSignIn(!isSignIn)
    }
    //Show password
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }
    // Get Data form
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }))
    }
    //Logout
    const [status, setStatus] = useState(false)
    const { getSession, logout }: any = useContext(AccountContext)
    // Sign in
    const { authenticate }: any = useContext(AccountContext)
    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault()
        authenticate(loginData.username, loginData.password)
            .then((data: any) => {
                console.log('Logged in!', data)
            })
            .catch((err: any) => {
                console.error('Failed to login', err)
            })
        getSession()
            .then((session: any) => {
                console.log('Session: ', session)
                setStatus(true)
            })
            .catch((err: any) => {
                console.error('Failed to login', err)
                setStatus(false)
            })
        setIsVisible(false)
        alert('Sign in success')
    }
    //Dropdown Menu Account
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            {status ? (
                <>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AccountCircleIcon
                                sx={{ fontSize: '24px', color: 'whitesmoke' }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 24,
                                    height: 24,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar />
                            <Typography>{loginData.username}</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Typography>Settings</Typography>
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <div className="login_navbar" onClick={handleVisibleForm}>
                    <AccountCircleIcon />
                    <span
                        className="login_navbar title"
                        style={{
                            height: '24px',
                            cursor: 'pointer',
                        }}
                    >
                        {t('account.login')}
                    </span>
                </div>
            )}
            <Dialog
                open={isVisible}
                onClose={handleInVisibleForm}
                fullScreen={fullScreen}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                    },
                }}
            >
                <Box className="login">
                    <IconButton
                        className="btn_close"
                        edge="start"
                        color="inherit"
                        onClick={handleInVisibleForm}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    {!isSignIn && (
                        <>
                            <form onSubmit={handleSignIn}>
                                <DialogTitle
                                    className="login_form_title"
                                    sx={{
                                        fontSize: '30px',
                                        fontWeight: '700',
                                        padding: 0,
                                    }}
                                >
                                    {t('account.user_welcome')}
                                </DialogTitle>
                                <DialogContent
                                    className="login_form_content"
                                    sx={{
                                        fontSize: '17px',
                                        fontWeight: '400',
                                        padding: 0,
                                        marginBottom: '16px',
                                    }}
                                >
                                    {t('account.user_welcome_text')}
                                </DialogContent>
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
                                    sx={{ marginBottom: '24px' }}
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
                                        autoComplete="password"
                                        onChange={handleChange}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
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
                                    <Grid>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="remember"
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography className="checkbox_email">
                                                    {t(
                                                        'account.user_checkbox_remember'
                                                    )}
                                                </Typography>
                                            }
                                        />
                                    </Grid>

                                    <Grid
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: '200' }}>
                                            <Link
                                                underline="hover"
                                                variant="body2"
                                                component="button"
                                            >
                                                {t(
                                                    'account.user_forgot_password'
                                                )}
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <ButtonStyled
                                    type="submit"
                                    className="btn_submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    {t('account.user_signin_button')}
                                </ButtonStyled>
                                <DialogContentText
                                    sx={{
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
                            <DialogContentText
                                className="link_suggest"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: '200',
                                }}
                            >
                                {t('account.user_not_member')}
                                <Link
                                    sx={{ ml: 1 }}
                                    underline="hover"
                                    component="button"
                                    onClick={handleOpenFormSignIn}
                                >
                                    {t('account.user_link_register_now')}
                                </Link>
                            </DialogContentText>
                        </>
                    )}

                    {/* sign up */}
                    {isSignIn && (
                        <>
                            <RegisterForm {...loginData} />
                            <DialogContentText
                                className="link_suggest"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: '200',
                                }}
                            >
                                {t('account.user_have_account')}
                                <Link
                                    sx={{ ml: 1 }}
                                    underline="hover"
                                    component="button"
                                    onClick={handleOpenFormSignIn}
                                >
                                    {t('account.user_link_log_in')}
                                </Link>
                            </DialogContentText>
                        </>
                    )}
                </Box>
            </Dialog>
        </>
    )
}
