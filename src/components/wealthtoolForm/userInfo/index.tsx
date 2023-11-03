import React from 'react'
import { Controller } from 'react-hook-form'
import Assets from 'src/assets'
import {
    Select,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    CardMedia,
    Card,
    CardContent,
    Box,
} from '@mui/material'
import { IFormControl } from 'src/pages/wealthTool'
import { useTranslation } from 'react-i18next'

export interface IUserInfoData {
    age: number
    maritalStatus: string
    workType: string
}

const UserInfoForm: React.ComponentType<IFormControl> = ({ control, name }) => {
    const { t } = useTranslation('wealth_tool')
    return (
        <React.Fragment>
            <Card className="indicator" sx={{ maxWidth: 'md' }}>
                <CardMedia
                    sx={{ width: '112px', height: '112px' }}
                    component="img"
                    className="media"
                    image={Assets.UserInfoIcon}
                    alt={'finance info image'}
                />
                <CardContent className="indicator_content">
                    <Box className="indicator_text" m={1}>
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.user_info.Im')}
                        </Typography>

                        <Controller
                            name={`${name}.age`}
                            control={control}
                            defaultValue="30"
                            rules={{
                                required: t('invalid.mandatory'),
                                max: {
                                    value: 100,
                                    message: t('invalid.max_value') + '100',
                                },
                                min: {
                                    value: 1,
                                    message: t('invalid.min_value') + '1',
                                },
                            }}
                            render={({
                                field: { onBlur, onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    variant="standard"
                                    name={`${name}.age`}
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            style: {
                                                textAlign: 'center',
                                                width: '100px',
                                                fontWeight: 'bold',
                                            },
                                        },
                                    }}
                                    required
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={!!error}
                                    helperText={error ? error.message : ''}
                                />
                            )}
                        />
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.user_info.year_old')}
                        </Typography>
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.user_info.marital_status_text')}
                        </Typography>

                        <Controller
                            name={`${name}.maritalStatus`}
                            defaultValue={'married'}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        width: '180px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Select
                                        onChange={onChange}
                                        value={value}
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        <MenuItem value={'married'}>
                                            {t(
                                                'user_goal.user_info.married_input'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'single'}>
                                            {t(
                                                'user_goal.user_info.single_input'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                    <Box className="indicator_text" m={1}>
                        <Typography
                            component="span"
                            variant="h6"
                            className="input"
                        >
                            {t('user_goal.user_info.job_status_text')}
                        </Typography>
                        <Controller
                            name={`${name}.workType`}
                            control={control}
                            defaultValue={'wage'}
                            render={({ field: { value, onChange } }) => (
                                <FormControl
                                    fullWidth
                                    variant="standard"
                                    sx={{
                                        width: '200px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Select
                                        onChange={onChange}
                                        value={value}
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        <MenuItem value={'wage'}>
                                            {t(
                                                'user_goal.user_info.wage_input'
                                            )}
                                        </MenuItem>
                                        <MenuItem value={'business'}>
                                            {t(
                                                'user_goal.user_info.business_input'
                                            )}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default UserInfoForm
