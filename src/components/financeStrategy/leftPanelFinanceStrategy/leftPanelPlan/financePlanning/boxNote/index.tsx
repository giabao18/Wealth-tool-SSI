import { Box, Typography } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import { useTranslation } from 'react-i18next'

import React from 'react'
const BoxNoted: React.FC = () => {
    const { t } = useTranslation('wealth_tool')
    return (
        <Box
            className="tab_wrapper_plan_noted"
            sx={{
                backgroundColor: '#F8E8EE',
                borderRadius: '8px',
            }}
        >
            <Typography component="span" sx={{ fontSize: '14px' }}>
                {t('finance_strategy.your_plan.box_note.click')}
            </Typography>
            <TuneIcon
                sx={{
                    fontSize: '20px',
                    color: 'darkred',
                    marginBottom: '-4px',
                }}
            />{' '}
            <Typography component="span" sx={{ fontSize: '14px' }}>
                {t('finance_strategy.your_plan.box_note.description')}
            </Typography>
        </Box>
    )
}

export default BoxNoted
