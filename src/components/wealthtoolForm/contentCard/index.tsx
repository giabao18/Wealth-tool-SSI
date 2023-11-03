import { useTranslation } from 'react-i18next'

export const InvestCardContent = () => {
    const { t } = useTranslation('wealth_tool')
    const invest = (
        <span>
            {t('user_goal.finance_goal.invest_form.accumulation_text')}{' '}
            <b>{t('user_goal.finance_goal.invest_form.accumulation_input')}</b>{' '}
            {t('user_goal.finance_goal.invest_form.money_received_text')}
            <b>
                {t('user_goal.finance_goal.invest_form.money_received_input')}
            </b>
            ?
        </span>
    )
    return invest
}
export const ShopCardContent = () => {
    const { t } = useTranslation('wealth_tool')
    const shopping = (
        <span>
            {t('user_goal.finance_goal.goal_form.shopping_text')}{' '}
            <b>{t('user_goal.finance_goal.goal_form.shopping_input')}</b>{' '}
            {t('user_goal.finance_goal.goal_form.shopping_time')}
            <b>{t('user_goal.finance_goal.goal_form.shopping_time_input')}</b>
            {t('user_goal.finance_goal.goal_form.things_to_do')}
        </span>
    )
    return shopping
}
export const EducateCardContent = () => {
    const { t } = useTranslation('wealth_tool')
    const education = (
        <span>
            {t('user_goal.finance_goal.education_form.children_education_text')}{' '}
        </span>
    )
    return education
}
