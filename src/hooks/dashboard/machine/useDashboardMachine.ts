import { useLastValues } from "./useLastValues"
import { useMachineDetails } from "./useMachineDetails"

const useDashboardMachine = (machineId: number) => {
  const {isLoading: detailsLoading, error: detailsError, machine} = useMachineDetails(machineId)
  const {message: lastValues, error: lastValuesError, loading: lastValuesLoading} = useLastValues(machineId)

  // Combined loading state - true if any hook is loading
  const isLoading = detailsLoading || lastValuesLoading;

  // Combined error state - returns the first error found
  const error = detailsError || lastValuesError;

  return {
    isLoading,
    error,

    machine,
    lastValues
  }
}

export default useDashboardMachine