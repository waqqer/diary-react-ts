import { StorageProvider } from "@/Contexts/StorageContext"
import Layout from "../Widgets/Layout"
import "./Styles"

function App() {
  return (
    <StorageProvider>
      <Layout />
    </StorageProvider>
  )
}

export default App
