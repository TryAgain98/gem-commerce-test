import React, { useEffect, useState } from "react"
import styles from "./unitValue.module.scss"
import InputNumber from "../common/input/InputNumber"
import { UnitType } from "../../types/unit"
interface UnitValueProps {
  unit?: UnitType
}
const MAX_PERCENTAGE = 100
const UnitValue: React.FC<UnitValueProps> = ({ unit = "%" }) => {
  const [unitValue, setUnitValue] = useState<string>("1")

  useEffect(() => {
    if (unit === "%" && parseFloat(unitValue) > MAX_PERCENTAGE) {
      setUnitValue(MAX_PERCENTAGE.toString())
    }
  }, [unit])

  return (
    <div className={styles.container}>
      <div className={styles.label}>Unit value</div>
      <InputNumber
        value={unitValue}
        min={0}
        max={unit === "%" ? MAX_PERCENTAGE : undefined}
        onChangeValue={setUnitValue}
      />
    </div>
  )
}

export default UnitValue
