import React, { useState, useContext } from 'react'
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
import { AccountContext } from 'src/context/User/Account'
import { IUserData } from './AuthForm'

const AccountSetting: React.ComponentType<IUserData> = ({}) => {
    //Logout
    const { logout }: any = useContext(AccountContext)
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
                    {/* <Typography>{lo}</Typography> */}
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
    )
}

export default AccountSetting
