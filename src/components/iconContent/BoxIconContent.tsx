import Typography from '@mui/material/Typography'
//Grid v
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import CardMedia from '@mui/material/CardMedia'
//Image
import Assets from 'src/assets'
import { useTranslation } from 'react-i18next'
interface IconList {
    image: any
    content: string
}
const BoxIconContent = () => {
    const { t } = useTranslation('home')
    const icons: Array<IconList> = [
        {
            image: Assets.KeyIcon,
            content: t('home.open_online_account_box_text'),
        },
        {
            image: Assets.LockIcon,
            content: t('home.register_iotp_box_text'),
        },
        {
            image: Assets.StorageIcon,
            content: t('home.optimize_memory_box_text'),
        },
    ]
    return (
        <Grid container spacing={0} style={{ justifyContent: 'center' }}>
            {icons.map((icon, index) => (
                <Grid item xs={4} key={index}>
                    <Item className="function_box">
                        <CardMedia
                            className="function_box_icon"
                            component="img"
                            image={icon.image}
                            alt="Icon Key"
                        />
                        <Typography
                            className="function_box_content"
                            variant="subtitle1"
                            component="div"
                        >
                            {icon.content}
                        </Typography>
                    </Item>
                </Grid>
            ))}
        </Grid>
    )
}

export default BoxIconContent

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'none !important',
    boxShadow: 'none',
    cursor: 'pointer',
}))
