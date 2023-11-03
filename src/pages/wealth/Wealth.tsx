import React, { Suspense } from 'react'
import './Wealth.scss'
import Auth from '../../components/Auth/authGoogle/Auth'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import BoxIconTool from 'src/components/iconContent/BoxIconTool'
import ButtonStyled from '../../components/buttonStyled'
import { Box, Card, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
//Language
import { useTranslation } from 'react-i18next'

function Wealth() {
    const { t } = useTranslation('wealth_tool')
    return (
        <Suspense fallback={<Skeleton variant="text" />}>
            <div className="wealth_background">
                <div className="landing_page_header">
                    <div className="container">
                        <CardContent sx={{ paddingBottom: '8px' }}>
                            <Typography
                                className="landing_page_header_title"
                                component="div"
                                variant="h6"
                                fontWeight={'bold'}
                                color={'#841818'}
                            >
                                {t('wealth_tool.user_target_title')}
                            </Typography>
                            <Typography
                                className="landing_page_header_content"
                                variant="h6"
                                padding={'15px'}
                                component="div"
                            >
                                {t('wealth_tool.user_target_description')}
                            </Typography>
                        </CardContent>
                    </div>
                </div>
                <div className="landing_page_bottom">
                    <div className="container">
                        <div className="position_absolute">
                            <div className="position_container">
                                <BoxIconTool />
                            </div>
                        </div>
                        <Card className="box_content">
                            <Box p={3} textAlign={'center'}>
                                <Typography
                                    className="card_content"
                                    variant="subtitle1"
                                    fontWeight={'bold'}
                                >
                                    {t('wealth_tool.highlight_box_text')}
                                </Typography>
                                <div className="auth_login">
                                    <Auth />
                                </div>
                                <Link to="/wealth-tool/user-goal">
                                    <ButtonStyled
                                        className="btn_start"
                                        variant="contained"
                                        sx={{
                                            width: '192px',
                                        }}
                                    >
                                        {t('wealth_tool.button_next')}
                                    </ButtonStyled>
                                </Link>
                            </Box>
                        </Card>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default Wealth
