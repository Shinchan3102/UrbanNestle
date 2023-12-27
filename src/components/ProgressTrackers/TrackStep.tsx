import { IconType } from "react-icons"
import Step from "./Step"

type step = {
    label: string,
    description: string,
    id: number,
    icon: IconType,
}

interface Props {
    activeStep: number,
    steps: step[],
}

const TrackStep = ({ activeStep, steps }: Props) => {
    return (
        <div className="relative flex justify-between w-full max-w-xl">
            <hr className="min-w-full" />
            <div className="flex justify-between items-center absolute z-10 w-full -top-3 md:-top-4">
                {
                    steps.map((item) => (
                        <Step
                            key={item.label}
                            label={item.label}
                            Icon={item.icon}
                            id={item.id}
                            status={activeStep > item.id ? 'COMPLETED' : activeStep === item.id ? 'ACTIVE' : 'INCOMPLETE'}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TrackStep
