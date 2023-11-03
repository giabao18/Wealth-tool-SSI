import Typography from '@mui/material/Typography'
//Grid
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

const BoxIconTool = () => {
    const { t } = useTranslation('wealth_tool')
    const icons: Array<IconList> = [
        {
            image: Assets.InfoIcon,
            content: t('wealth_tool.icon_info_title'),
        },
        {
            image: Assets.GoalIcon,
            content: t('wealth_tool.icon_goal_title'),
        },
        {
            image: Assets.FinanceIcon,
            content: t('wealth_tool.icon_finance_title'),
        },
    ]

    return (
        <Grid container spacing={0} style={{ justifyContent: 'center' }}>
            {icons.map((icon, index) => (
                <Grid item xs={4} key={index}>
                    <Item className="landing_page_box">
                        <CardMedia
                            className="landing_page_icon"
                            component="img"
                            image={icon.image}
                            alt="Icon Information"
                        />
                        <Typography
                            className="landing_page_content"
                            variant="h6"
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

export default BoxIconTool

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'none !important',
    boxShadow: 'none',
}))
