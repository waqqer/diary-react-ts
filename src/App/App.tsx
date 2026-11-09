import { StorageContext } from "@/Contexts/StorageContext"
import Layout from "../Widgets/Layout"
import "./Styles"
import Loader from "@/Widgets/Loader"
import { useContext, useMemo } from "react"
import type { LoadingState } from "@/Shared/Types/Record"
import CreateLayout from "@/Widgets/CreateLayout"

function App() {
  const { isLoaded, data } = useContext(StorageContext)

  const loadingState = useMemo((): LoadingState => {
    if (!isLoaded)
      return "LOADING"

    if (data.length == 0)
      return "ERROR"

    return "OK"
  }, [isLoaded, data])

  return (
    <Loader
      status={loadingState}
      isOK={<Layout />}
      isErr={<CreateLayout />}
    />
  )
}

export default App
