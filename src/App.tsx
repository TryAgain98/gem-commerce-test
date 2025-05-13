import styles from "./app.module.scss"
import Unit from "./components/unit"
import UnitValue from "./components/unit-value"
import { useState } from "react"
import { UnitType } from "./types/unit"
function App() {
  const [unit, setUnit] = useState<UnitType>("%")
  return (
    <div className={styles.app}>
      <Unit unit={unit} onChange={setUnit} />
      <UnitValue unit={unit} />
    </div>
  )
}

export default App
