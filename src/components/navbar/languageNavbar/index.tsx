import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Button,
    CardMedia,
    MenuItem,
    MenuList,
    Paper,
    Popover,
    Typography,
} from '@mui/material'
import Assets from 'src/assets'

const LanguageNavbar = () => {
    const options = [
        {
            id: 1,
            icon: Assets.EnglandIcon,
            title: 'English',
            lng: 'en',
        },
        {
            id: 2,
            icon: Assets.VietnamIcon,
            title: 'Tiếng Việt',
            lng: 'vi',
        },
    ]
    const { i18n } = useTranslation()
    //button group
    const [open, setOpen] = useState(false)
    const anchorRef = useRef<HTMLButtonElement | null>(null)

    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleMenuItemClick = (event: any, index: number, lng: string) => {
        setSelectedIndex(index)
        i18n.changeLanguage(lng)
        setOpen(false)
    }

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return
        }
        setOpen(false)
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }
    return (
        <>
            <Button
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="menu"
                style={{ height: '24px' }}
                ref={anchorRef}
                onClick={handleToggle}
            >
                <CardMedia
                    style={{ width: '28px' }}
                    component={'img'}
                    src={options[selectedIndex].icon}
                ></CardMedia>
            </Button>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                role={undefined}
                disablePortal
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper>
                    <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                    handleMenuItemClick(
                                        event,
                                        index,
                                        option.lng
                                    )
                                }
                            >
                                <CardMedia
                                    style={{ width: '28px' }}
                                    component={'img'}
                                    src={option.icon}
                                ></CardMedia>
                                <Typography
                                    variant="subtitle2"
                                    marginLeft={'12px'}
                                >
                                    {option.title}
                                </Typography>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Paper>
            </Popover>
        </>
    )
}

export default LanguageNavbar
