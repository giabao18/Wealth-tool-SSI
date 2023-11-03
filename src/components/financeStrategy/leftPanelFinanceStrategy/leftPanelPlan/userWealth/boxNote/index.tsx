import { Box, Typography } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function BoxNote() {
    const { t } = useTranslation('wealth_tool')
    return (
        <Box
            className="tab_wrapper_plan_noted"
            sx={{
                backgroundColor: '#F8E8EE',
                borderRadius: '10px',
            }}
        >
            <Typography sx={{ fontSize: '14px' }}>
                {t('finance_strategy.your_assets.box_note')}
            </Typography>
        </Box>
    )
}
