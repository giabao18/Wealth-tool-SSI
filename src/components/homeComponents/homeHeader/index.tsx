//MUI
import { Grid, CardMedia, Typography, Box } from '@mui/material'
//Icon-Button
import SendIcon from '@mui/icons-material/Send'
import ButtonStyled from '../../buttonStyled'
//Translate
import { useTranslation } from 'react-i18next'
//Image
import Assets from 'src/assets'

const HeaderHome = () => {
    const { t } = useTranslation()
    return (
        <Grid container spacing={0} className="header_background_box">
            <Grid item xs={5} className="header_background_content">
                <Box className="form_content" style={{ color: '#F4F4F4' }}>
                    <Typography
                        className="form_content_title"
                        variant="h5"
                        marginBottom={'16px'}
                        fontWeight={'bold'}
                    >
                        {t('home.open_online_account_title')}
                    </Typography>
                    <Typography
                        className="form_content_content"
                        variant="subtitle1"
                        marginBottom={'16px'}
                    >
                        {t('home.overview_text')}
                    </Typography>

                    <a href="https://www.ssi.com.vn/khach-hang-ca-nhan/mo-tai-khoan?utm_source=internal_link&utm_medium=website_button">
                        <ButtonStyled
                            className="btn_start"
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            <span className="btn_start_text">
                                {t('home.open_online_account_button')}
                            </span>
                        </ButtonStyled>
                    </a>
                </Box>
            </Grid>
            <Grid item xs={7} className="header_background_image">
                <CardMedia
                    className="asia_image"
                    component="img"
                    image={Assets.HeaderHome}
                    alt="Asia background"
                />
            </Grid>
        </Grid>
    )
}
export default HeaderHome
