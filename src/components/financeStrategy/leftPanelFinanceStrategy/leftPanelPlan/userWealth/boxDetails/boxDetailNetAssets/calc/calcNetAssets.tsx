import { IDebt } from '../debt'
import { IProperty } from '../property'

interface ICalcNetAssets {
    debt: IDebt[]
    property: IProperty[]
}

export const calcAnnuallyDebt = (debt: IDebt): number => {
    var calcDebt = 0
    if (debt.period === 'month') {
        calcDebt +=
            (Number(debt.value) * (1 + Number(debt.rate) / 100)) /
            Number(debt.dueDate)
    } else
        calcDebt +=
            (Number(debt.value) * (1 + Number(debt.rate) / 12 / 100)) /
            Number(debt.dueDate)

    return parseFloat(calcDebt.toFixed(2))
}

export const calcAnnuallyProfitFromProperty = (property: IProperty): number => {
    if (property.trend === 'up')
        return parseFloat(
            ((Number(property.value) * Number(property.rate)) / 100).toFixed(2)
        )
    return parseFloat(
        ((-1 * Number(property.value) * Number(property.rate)) / 100).toFixed(2)
    )
}

const CalcNetAssets = ({ debt, property }: ICalcNetAssets) => {
    var netAssets = 0

    if (property !== undefined)
        for (const eachProperty of property)
            netAssets += Number(eachProperty.value)
    if (debt !== undefined)
        for (const eachDebt of debt) netAssets -= Number(eachDebt.value)

    return parseFloat(netAssets.toFixed(2))
}

export default CalcNetAssets
