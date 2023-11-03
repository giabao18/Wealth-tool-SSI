import './userFinanceGoal.scss'
//Image
import Assets from 'src/assets'
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Dialog,
    Grid,
    DialogActions,
    Container,
    Button,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ButtonStyled from 'src/components/buttonStyled'
import React, { SetStateAction, useState } from 'react'

//component
import UserInvestGoal, { IUserInvestCardData } from './Card/userInvestCard'
import UserShoppingGoal, {
    IUserShoppingCardData,
} from './Card/userShoppingCard'
import UserEducationGoal, {
    IUserEducationCardData,
} from './Card/userEducationCard'

//carousel
import Carousel from 'nuka-carousel'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
    renderCenterLeftControls,
    renderCenterRightControls,
} from 'src/components/carouselCard/Source'
//contentCard
import {
    InvestCardContent,
    ShopCardContent,
    EducateCardContent,
} from '../contentCard'

// React-hook-form
import { IFormControl } from 'src/pages/wealthTool'
import {
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormSetValue,
    useFormContext,
} from 'react-hook-form'
import { IWealthToolFormDataType } from 'src/redux/store'
//language
import { useTranslation } from 'react-i18next'


export interface IUserFinanceGoalData {
    UserEducationCard?: IUserEducationCardData
    UserInvestCard?: IUserInvestCardData
    UserShoppingCard?: IUserShoppingCardData
}

interface Character {
    id: number
    imgSrc: Object
    title: string
    content: JSX.Element
    dialog: JSX.Element
}

interface IFormHandler extends IFormControl {
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>
    setValue: UseFormSetValue<IWealthToolFormDataType>
    getValues: UseFormGetValues<IWealthToolFormDataType>
    setAddGoal?: React.Dispatch<SetStateAction<boolean>>
    handleSubmit: UseFormHandleSubmit<IWealthToolFormDataType, undefined>
    handleCloseBoxCardList?: (
        status: boolean,
        data?: IUserFinanceGoalData
    ) => void
}

const UserFinanceGoalForm: React.ComponentType<IFormHandler> = ({
    control,
    name,
    setActiveStep,
    setValue,
    getValues,
    handleSubmit,
    handleCloseBoxCardList,
}) => {
    const { resetField } = useFormContext()
    //language
    const { t } = useTranslation('wealth_tool')
    const theme = useTheme()

    //cards variant
    let cards = [
        {
            id: 1,
            setCardStatus: setValue(
                'UserFinanceGoalForm.UserInvestCard.status',
                true
            ),
            setDefaultPeriod: setValue(
                'UserFinanceGoalForm.UserInvestCard.period',
                10
            ),
            imgSrc: Assets.InvestCard,
            title: t('user_goal.finance_goal.invest_form.title'),
            content: <InvestCardContent />,
            dialog: (
                <UserInvestGoal
                    name={`${name}.UserInvestCard`}
                    control={control}
                />
            ),
        },
        {
            id: 2,
            setCardStatus: setValue(
                'UserFinanceGoalForm.UserShoppingCard.status',
                false
            ),
            imgSrc: Assets.CarCard,
            title: t('user_goal.finance_goal.goal_form.title'),
            content: <ShopCardContent />,
            dialog: (
                <UserShoppingGoal
                    name={`${name}.UserShoppingCard`}
                    control={control}
                />
            ),
        },
        {
            id: 3,
            imgSrc: Assets.EducationCard,
            setCardStatus: setValue(
                'UserFinanceGoalForm.UserEducationCard.status',
                false
            ),
            title: t('user_goal.finance_goal.education_form.title'),
            content: <EducateCardContent />,
            dialog: (
                <UserEducationGoal
                    name={`${name}.UserEducationCard`}
                    control={control}
                />
            ),
        },
    ]
    //useState
    const [activatingCardID, setActivatingCardID] = useState(1)
    const [isVisible, setIsVisible] = useState(false)

    // For boxDetailGoal of leftPanel in FinanceStrategy component
    if (handleCloseBoxCardList !== undefined) cards.splice(0, 1)

    //handle
    const handleSave = () => {
        switch (activatingCardID) {
            case 2:
                setValue('UserFinanceGoalForm.UserShoppingCard.status', true)
                break
            case 3:
                setValue('UserFinanceGoalForm.UserEducationCard.status', true)
                break
        }

        if (setActiveStep !== undefined) {
            setActiveStep(2)
        }

        // For boxDetailGoal of leftPanel in FinanceStrategy component
        if (handleCloseBoxCardList !== undefined) {
            console.log('run', name)
            var boxCardData: IUserFinanceGoalData = {}
            switch (activatingCardID) {
                case 2:
                    boxCardData.UserShoppingCard = getValues(
                        'UserFinanceGoalForm.UserShoppingCard'
                    )
                    break
                case 3:
                    boxCardData.UserEducationCard = getValues(
                        'UserFinanceGoalForm.UserEducationCard'
                    )
                    break
            }
            handleCloseBoxCardList(false, boxCardData)
        }
    }

    const handleDialogOpen = (character: Character) => {
        setIsVisible(true)
        setActivatingCardID(character.id)
    }

    const handleDialogClose = (index: number) => {
        if (index == 2)
            resetField('UserFinanceGoalForm.UserShoppingCard', {
                defaultValue: { price: 900, period: 5 },
            })
        if (index == 3)
            resetField('UserFinanceGoalForm.UserEducationCard', {
                defaultValue: {
                    period: 4,
                    childCurrentAge: 14,
                    childFutureAge: 18,
                    collegeTime: 4,
                    tuitionFees: 100,
                },
            })
        setIsVisible(false)
    }
    // Dialog Content
    const dialogContent = () => {
        return (
            <>
                {cards &&
                    cards.length > 0 &&
                    cards.map((item) => {
                        return (
                            <div key={item.id}>
                                {activatingCardID === item.id
                                    ? item.dialog
                                    : null}
                            </div>
                        )
                    })}
            </>
        )
    }

    //Carousel
    const mdUp = useMediaQuery(theme.breakpoints.up('sm'))
    const xlUp = useMediaQuery(theme.breakpoints.up('md'))
    let SlideToShowNumber = 1
    if (mdUp) {
        SlideToShowNumber = 2
    }
    if (xlUp) {
        SlideToShowNumber = 3
    }

    return (
        <React.Fragment>
            {isVisible && (
                <Dialog
                    open={activatingCardID !== 0}
                    PaperProps={{
                        sx: {
                            width: '522px',
                            borderRadius: '12px',
                            textAlign: 'center',
                            padding: '12px',
                        },
                    }}
                    onClose={() => handleDialogClose(activatingCardID)}
                >
                    {dialogContent()}
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <ButtonStyled
                            className="btn_save"
                            variant="contained"
                            sx={{
                                width: '280px',
                            }}
                            type="submit"
                            onClick={handleSubmit(() => handleSave())}
                        >
                            {t('wealth_tool.button_save')}
                        </ButtonStyled>
                    </DialogActions>
                </Dialog>
            )}

            <Container className="carousel" maxWidth="md" sx={{ pt: 4 }}>
                <Carousel
                    className="carousel_wrapper"
                    renderCenterLeftControls={renderCenterLeftControls}
                    renderCenterRightControls={renderCenterRightControls}
                    renderBottomCenterControls={null}
                    animation="zoom"
                    wrapAround
                    cellAlign="center"
                    slidesToShow={SlideToShowNumber}
                    cellSpacing={8}
                    style={{ height: '280px' }}
                >
                    {cards &&
                        cards.length > 0 &&
                        cards.map((item) => (
                            <Grid
                                item
                                key={item.id}
                                onClick={() => handleDialogOpen(item)}
                            >
                                <Card className="carousel_card">
                                    <CardActionArea>
                                        <div className="carousel_image">
                                            <CardMedia
                                                component="img"
                                                className="financeGoal_card_image media"
                                                image={item.imgSrc}
                                                alt={item.title}
                                            />
                                        </div>
                                        <CardContent className="carousel_content">
                                            <Typography
                                                className="carousel_content-title"
                                                variant="h6"
                                                fontWeight={'bold'}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                className="carousel_content-text"
                                                component="span"
                                                variant="body1"
                                                color="black"
                                            >
                                                {item.content}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Carousel>
            </Container>
        </React.Fragment>
    )
}

export default UserFinanceGoalForm
