import { CardHeader, Stack, IconButton } from '@mui/material'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn'
import { useTranslation } from 'react-i18next'

interface IBoxDetailHeader {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    title: string
}

const BoxDetailHeader = ({ setOpenDialog, title }: IBoxDetailHeader) => {
    const {t} = useTranslation('wealth_tool')
    return (
        <CardHeader
            className="finance_list_title"
            title={title}
            sx={{
                '.MuiCardHeader-title': {
                    fontSize: '16px',
                    fontWeight: 'bold',
                },
                backgroundColor: '#841818',
                color: '#E8E2E2',
            }}
            action={
                <Stack direction={'row'} spacing={2}>
                    <IconButton
                        sx={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#E8E2E2',
                        }}
                        onClick={() => setOpenDialog(true)}
                    >
                        <DataSaverOnIcon
                            sx={{
                                marginRight: '5px',
                                color: '#E8E2E2',
                            }}
                        />
                        {t('wealth_tool.button_more')}
                    </IconButton>
                </Stack>
            }
        />
    )
}

export default BoxDetailHeader
