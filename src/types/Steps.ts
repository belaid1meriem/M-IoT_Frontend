export type State = 'pending' | 'current' | 'completed'

export type StepType = {
    index: number
    text: string
}

export type StepProps = {
    index: number,
    state: State,
    text: string
}