import React, { createContext } from 'react'

interface IFormContext {
    activeStep: number
    setActiveStep: (step: number) => void
}

const FormContext = createContext<IFormContext>({
    activeStep: 0,
    setActiveStep: () => {},
})

export default FormContext
