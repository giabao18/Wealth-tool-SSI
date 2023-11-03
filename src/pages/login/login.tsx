import React from 'react'
import Box from '@mui/material/Box'
import {
    FormControlLabel,
    Checkbox,
    Grid,
    Link,
    FormControl,
    InputLabel,
    Paper,
    Typography,
    IconButton,
    OutlinedInput,
    InputAdornment,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import Logo from '../../assets'
import ButtonStyled from '../../components/buttonStyled'

const Login: React.FC<any> = (status) => {
    const logo = Logo.SSILogo
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    return (
        <Box sx={{ overflow: 'hidden', zIndex: '1' }}>
            <Grid
                container
                sx={{
                    height: '100vh',
                }}
                spacing={0}
            >
                <Grid
                    item
                    xs={7}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div className="login_logo">
                        <img
                            alt=""
                            src={logo}
                            style={{ overflow: 'hidden', position: 'relative' }}
                        />
                    </div>
                </Grid>

                <Grid
                    item
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                    }}
                    xs={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            // my: 18,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}

                        {/* Login From */}
                        <Box
                            component="form"
                            noValidate
                            // onSubmit={handleSubmit}
                            // sx={{ mt: 1 }}
                        >
                            <Box
                                component="form"
                                sx={{
                                    width: '100%',
                                    fontWeight: '500',

                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    margin: '5px 5px 5px 0',
                                }}
                            >
                                <Typography
                                    className="login_form_title"
                                    // component="h1"
                                    // variant="h4"
                                    sx={{
                                        width: '100%',
                                        marginLeft: '2px',
                                        fontSize: '30px',
                                        fontWeight: '700',
                                    }}
                                >
                                    Welcome Back!
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '17px',
                                        fontWeight: '400',
                                    }}
                                >
                                    Start managing your finance easier and
                                    better.
                                </Typography>
                            </Box>
                            <FormControl
                                sx={{ marginBottom: '30px' }}
                                // className='login_form_input'
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined_email">
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    className="button_border_radius"
                                    sx={{ borderRadius: '10px' }}
                                    name="email"
                                    label="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </FormControl>
                            <FormControl
                                sx={{ marginBottom: '20px' }}
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    name="password"
                                    sx={{ borderRadius: '10px' }}
                                    label="Password"
                                    id="password"
                                    autoComplete="password"
                                    type={showPassword ? 'text' : 'password'}
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
                                        label="Remember me"
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
                                            Forgot Password
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <ButtonStyled
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 4,
                                    borderRadius: '10px',
                                    lineHeight: '35px',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                }}
                            >
                                Sign In
                            </ButtonStyled>
                            <span
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    marginBottom: '10px',
                                    color: 'rgb(174,172,172)',
                                }}
                            >
                                - Or continue with -
                            </span>
                            <Box
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

                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: '200',
                                }}
                            >
                                Not a member?
                                <Link
                                    sx={{ ml: 1 }}
                                    underline="hover"
                                    component="button"
                                >
                                    {' '}
                                    Register now
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login
