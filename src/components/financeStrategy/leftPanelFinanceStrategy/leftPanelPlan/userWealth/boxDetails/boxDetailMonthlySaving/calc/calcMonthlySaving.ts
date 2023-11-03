import { IIncome } from '../income'
import { ISpending } from '../spending'

interface ICalcMonthlySaving {
    income: IIncome[]
    spending: ISpending[]
    netAssetsValue: number
}

const calcMonthlySaving = ({
    income,
    spending,
    netAssetsValue,
}: ICalcMonthlySaving): number => {
    var monthlySaving = 0

    if (income !== undefined)
        for (var item of income) {
            if (item.period === 'month') monthlySaving += Number(item.value)
            else monthlySaving += Number(item.value) / 12
        }

    if (spending !== undefined)
        for (var data of spending) {
            if (data.period === 'month') monthlySaving -= Number(data.value)
            else monthlySaving -= Number(data.value) / 12
        }

    return parseFloat((monthlySaving).toFixed(2))
}

export default calcMonthlySaving
