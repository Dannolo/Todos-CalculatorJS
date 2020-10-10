/**
 * State interface, it contains most of the important values for the app.
 * total: string     total and starting value for the calculator
 * next: string    second value to be used in the calculator' operations
 * operation: string    simbol of the operations we are going to do
 */

export interface State {
    total: string,
    next: string,
    operation: string
}