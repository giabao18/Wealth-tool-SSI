import { Link } from 'react-router-dom'
import React from 'react'
import './Footer.scss'
//MUI
import { Box, Typography, Container, Stack, Grid } from '@mui/material'
//Icon
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import FaxIcon from '@mui/icons-material/Fax'

import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import LanguageIcon from '@mui/icons-material/Language'
//Image
import Assets from 'src/assets'
//Translate
import { useTranslation } from 'react-i18next'

const Footer: React.ComponentType = () => {
    const { t } = useTranslation('home')

    return (
        <>
            <Box
                component="footer"
                className="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    color: 'whitesmoke',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container p={1} className="footer_content">
                        <Grid item xs={2} className="logo_content">
                            <img
                                src={Assets.SSILogo}
                                alt=""
                                width={'80px'}
                                height={'80px'}
                            />
                        </Grid>
                        <Grid item xs={7} className="item_content">
                            <Stack
                                spacing={{ xs: 1, sm: 1 }}
                                alignItems={'flex-start'}
                            >
                                <Typography variant="body1">
                                    <LocationOnIcon className="icon" />

                                    {t('footer.location')}
                                </Typography>
                                <Typography variant="body1">
                                    <LocalPhoneIcon className="icon" />
                                    {t('footer.phone')}
                                </Typography>
                                <Typography variant="body1">
                                    <FaxIcon className="icon" />
                                    {t('footer.fax')}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} className="footer_icon">
                            <Stack spacing={{ xs: 1, sm: 1 }}>
                                <Typography>
                                    {' '}
                                    {t('footer.follow_us')}
                                </Typography>
                                <Box>
                                    <Link
                                        className="link_icon"
                                        to="https://www.ssi.com.vn/"
                                    >
                                        <LanguageIcon />
                                    </Link>
                                    <Link
                                        className="link_icon"
                                        to="https://www.facebook.com/profile.php?id=100064741894674"
                                    >
                                        <FacebookIcon />
                                    </Link>
                                    <Link
                                        className="link_icon"
                                        to="https://www.facebook.com/profile.php?id=100064741894674"
                                    >
                                        <EmailIcon />
                                    </Link>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} className="footer_copy">
                            <Copyright />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Footer
function Copyright() {
    return (
        <Typography
            variant="body2"
            sx={{ marginTop: '56px', textAlign: 'center', color: 'black' }}
        >
            {'Copyright © '}
            <Link className="link_copyright" to="https://www.ssi.com.vn/">
                SSI
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}
