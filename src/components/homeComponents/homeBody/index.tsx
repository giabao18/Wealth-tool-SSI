import { Link } from 'react-router-dom'
//MUI
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Box,
    Paper,
    Grid,
} from '@mui/material'
//Style MUI
import { experimentalStyled as styled } from '@mui/material/styles'
//Image
import Assets from 'src/assets'
//Translate
import { useTranslation } from 'react-i18next'
interface ICardList {
    name: string
    content: string
    images: any
}

function CardList() {
    const { t } = useTranslation()
    const cardList: Array<ICardList> = [
        {
            name: t('home.footer.price_board'),
            content: t('home.footer.price_board_text'),
            images: Assets.PriceBoardCard,
        },
        {
            name: t('home.footer.company_analysis'),
            content: t('home.footer.company_analysis_text'),
            images: Assets.CompanyAnalysisCard,
        },
        {
            name: t('home.footer.wealth_tool'),
            content: t('home.footer.wealth_tool_text'),
            images: Assets.WealthToolCard,
        },
        {
            name: t('home.footer.iWealth_club'),
            content: t('home.footer.iWealth_club_text'),
            images: Assets.IWealthClubCard,
        },
        {
            name: t('home.footer.stock_screener'),
            content: t('home.footer.stock_screener_text'),
            images: Assets.StockScreenerCard,
        },
        {
            name: t('home.footer.scopy'),
            content: t('home.footer.scopy_text'),
            images: Assets.ICopyCard,
        },
    ]
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                style={{
                    justifyContent: 'space-around',
                }}
            >
                {cardList.map((card, index) => (
                    <Link
                        key={index}
                        to={'/wealth-tool'}
                        style={{ textDecoration: 'none' }}
                    >
                        <Grid item xs={4} mt={4}>
                            <Item className="card_item">
                                <CardActionArea
                                    sx={{ ':hover': { boxShadow: 20 } }}
                                >
                                    <Card
                                        className="card_item-box"
                                        sx={{ display: 'flex' }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Typography
                                                className="card_item_title"
                                                component="div"
                                                color={'#F4F4F4'}
                                                variant="h6"
                                                fontWeight={'bold'}
                                            >
                                                {card.name}
                                            </Typography>
                                            <Typography
                                                className="card_item_content"
                                                variant="subtitle2"
                                                component="div"
                                                color={'#F4F4F4'}
                                            >
                                                {card.content}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            className="card_item_image"
                                            component="img"
                                            sx={{ width: '160px' }}
                                            image={card.images}
                                            alt={card.name}
                                        />
                                    </Card>
                                </CardActionArea>
                            </Item>
                        </Grid>
                    </Link>
                ))}
            </Grid>
        </Box>
    )
}

export default CardList

const Item = styled(Paper)(({ theme }) => ({
    width: '400px',
    background: 'none !important',
    borderRadius: '8px',
    cursor: 'pointer',
}))
