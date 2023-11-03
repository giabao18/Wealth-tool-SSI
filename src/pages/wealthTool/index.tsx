import React, { useState } from 'react'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './wealthTool.scss'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector'
import {
    Box,
    Button,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    createTheme,
    ThemeProvider,
    CardMedia,
    Stack,
    Card,
} from '@mui/material'
//Language
import { useTranslation } from 'react-i18next'
// Image
import Assets from 'src/assets'
//react hook form
import { FormProvider, useForm } from 'react-hook-form'

// Component
import UserInfoForm from 'src/components/wealthtoolForm/userInfo'
import UserFinanceGoal from 'src/components/wealthtoolForm/userFinanceGoal'
import UserFinanceStatus from 'src/components/wealthtoolForm/userFinanceStatus'

// Redux
import { IWealthToolFormDataType } from 'src/redux/store'
import FinanceStrategy from 'src/components/financeStrategy'
import formContext from 'src/context/formContext'
import ButtonStyled from 'src/components/buttonStyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { registerField } from 'redux-form'
import { useSelector } from 'react-redux'

// Form data types

const stepLabel = createTheme({ typography: { fontSize: 18 } })

export interface IFormControl {
    name: string
    control: any
}

export default function WealthTool() {
    // Redux
    //Language
    const { t } = useTranslation('wealth_tool')
    //stepper
    const steps = [
        t('wealth_tool.icon_info_title'),
        t('wealth_tool.icon_goal_title'),
        t('wealth_tool.icon_finance_title'),
    ]

    // Form Context
    const [activeStep, setActiveStep] = useState(0)

    // Hook Form
    const methods = useForm<IWealthToolFormDataType>()
    const { handleSubmit, control, setValue, getValues, resetField } = methods

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        if (activeStep === 1) {
            resetField('UserFinanceGoalForm')
        }
        setActiveStep(activeStep - 1)
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserInfoForm name="UserInfoForm" control={control} />
            case 1:
                return (
                    <UserFinanceGoal
                        name="UserFinanceGoalForm"
                        control={control}
                        setActiveStep={setActiveStep}
                        setValue={setValue}
                        getValues={getValues}
                        handleSubmit={handleSubmit}
                    />
                )
            case 2:
                return (
                    <UserFinanceStatus
                        name="UserFinanceStatusForm"
                        control={control}
                    />
                )
            default:
                return <UserInfoForm name="UserInfoForm" control={control} />
        }
    }
    return (
        <div className="user_goal_wrapper">
            <div className="container">
                {activeStep === steps.length ? (
                    <FormProvider {...methods}>
                        <FinanceStrategy
                            name={'financeStrategy'}
                            control={control}
                            getValues={getValues}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                        />
                    </FormProvider>
                ) : (
                    <Box className="user_goal_box">
                        <Paper
                            className="info_wrapper"
                            variant="outlined"
                            sx={{
                                p: { md: 3 },
                                height: '556px',
                                maxWidth: 'md',
                            }}
                        >
                            <ThemeProvider theme={stepLabel}>
                                <Stack sx={{ display: 'flex', mt: '16px' }}>
                                    <Stepper
                                        className="icon_stepper"
                                        alternativeLabel
                                        activeStep={activeStep}
                                        connector={<ColorLibConnector />}
                                    >
                                        {steps.map((step) => (
                                            <Step key={step}>
                                                <StepLabel
                                                    className="icon_step_label"
                                                    StepIconComponent={
                                                        ColorLibStepIcon
                                                    }
                                                >
                                                    <Typography
                                                        className="icon_title"
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {step}
                                                    </Typography>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Stack>
                            </ThemeProvider>
                            <React.Fragment>
                                <formContext.Provider
                                    value={{ activeStep, setActiveStep }}
                                >
                                    <FormProvider {...methods}>
                                        <form>
                                            {getStepContent(activeStep)}
                                            <Box
                                                pt={2}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                {activeStep === 0 ||
                                                activeStep === 2 ? (
                                                    <ButtonStyled
                                                        className="btn_next"
                                                        variant="contained"
                                                        onClick={handleSubmit(
                                                            () => handleNext()
                                                        )}
                                                        sx={{
                                                            width: '400px',
                                                        }}
                                                    >
                                                        {activeStep ===
                                                        steps.length - 1 ? (
                                                            <span>
                                                                {t(
                                                                    'wealth_tool.button_submit'
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                {t(
                                                                    'wealth_tool.button_next'
                                                                )}
                                                            </span>
                                                        )}
                                                    </ButtonStyled>
                                                ) : null}
                                                {activeStep !== 0 && (
                                                    <Button
                                                        sx={{
                                                            color: 'black',
                                                            m: '16px auto auto',
                                                        }}
                                                        onClick={handleBack}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={{
                                                                marginRight:
                                                                    '8px',
                                                                color: '#841818',
                                                                fontSize:
                                                                    '18px',
                                                            }}
                                                            icon={
                                                                faCircleChevronLeft
                                                            }
                                                        />
                                                        <Typography
                                                            component="span"
                                                            textTransform="capitalize"
                                                            fontSize="17px"
                                                        >
                                                            {t(
                                                                'wealth_tool.button_pre'
                                                            )}
                                                        </Typography>
                                                    </Button>
                                                )}
                                            </Box>
                                        </form>
                                    </FormProvider>
                                </formContext.Provider>
                            </React.Fragment>
                        </Paper>
                    </Box>
                )}
            </div>
        </div>
    )
}
const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}))

const ColorLibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 48,
    height: 48,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: '#F4F4F4',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        background: '#F4F4F4',
    }),
}))

function ColorLibStepIcon(props: StepIconProps) {
    const { active, completed } = props

    const icons: { [index: string]: React.ReactElement } = {
        1: (
            <CardMedia
                component="img"
                image={Assets.InfoIcon}
                sx={{ width: '32px' }}
            />
        ),
        2: (
            <CardMedia
                component="img"
                image={Assets.GoalIcon}
                sx={{ width: '32px' }}
            />
        ),
        3: (
            <CardMedia
                component="img"
                image={Assets.FinanceIcon}
                sx={{ width: '32px' }}
            />
        ),
    }

    return (
        <ColorLibStepIconRoot
            ownerState={{ completed, active }}
            className={'stepper_form'}
        >
            {icons[String(props.icon)]}
        </ColorLibStepIconRoot>
    )
}
