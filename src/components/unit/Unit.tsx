import styles from "./unit.module.scss"
import Button from "../common/button"
import { UnitType } from "../../types/unit"
import { UNIT_LIST } from "@/constants/unit.constant"
interface UnitProps {
  unit: UnitType
  onChange: (unit: UnitType) => void
}

function Unit({ unit, onChange }: UnitProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Unit</span>
      <div className={styles.value}>
        {UNIT_LIST.map((data, index) => (
          <Button isActive={unit === data} key={index} onClick={() => onChange(data)} className={styles.button}>
            {data}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Unit
