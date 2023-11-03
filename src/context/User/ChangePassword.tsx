import {
    FormControl,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Grid,
    Link,
    DialogTitle,
    DialogContentText,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
//Translate
import { useTranslation } from 'react-i18next'
import React, { useState, useContext } from 'react'
import ButtonStyled from 'src/components/buttonStyled'
import { AccountContext } from './Account'

export interface IDataPassword {
    new_password: string
    confirm_password: string
}
const ChangePassword = () => {
    const { t } = useTranslation('home')
    const [showPassword, setShowPassword] = useState(false)
    const [changepassword, setChangePassword] = useState<IDataPassword>({
        new_password: '',
        confirm_password: '',
    })
    const { getSession }: any = useContext(AccountContext)

    const onSubmit = (event: any) => {
        event.preventDefault()
        getSession().then(({ user }: any) => {
            user.changePassword(
                changepassword.new_password,
                changepassword.confirm_password,
                (err: any, result: any) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(result)
                    }
                }
            )
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangePassword((preData) => ({
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <DialogTitle
                    className="login_form_title"
                    sx={{
                        fontSize: '30px',
                        fontWeight: '700',
                        padding: 0,
                    }}
                >
                    Lấy lại mật khẩu
                </DialogTitle>

                <FormControl
                    sx={{ marginBottom: '16px' }}
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined_password">
                        {/* {t('account.user_input_email')} */}
                        Nhập mật khẩu
                    </InputLabel>
                    <OutlinedInput
                        className="button_border_radius"
                        sx={{ borderRadius: '8px' }}
                        name="password"
                        label="password"
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
                        {/* {t('account.user_input_password')} */}
                        Nhập lại mật khẩu
                    </InputLabel>
                    <OutlinedInput
                        name="confirm_password"
                        sx={{ borderRadius: '8px' }}
                        label="confirm_password"
                        id="confirm_password"
                        autoComplete="password"
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
                                Đăng nhập
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
                    {/* {t('account.user_signin_button')} */}
                    Hoàn tất
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
            </form>
        </div>
    )
}
export default ChangePassword
