// Bouton de bascule entre le système métrique (°C, m/s, km) et le système impérial (°F, m/h, miles)
import styles from "./UnitSwitch.module.css";

export const UnitSwitch = ({ onClick, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.active : styles.inactive
        }`}
        onClick={onClick}
      >
        Metric System
      </p>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.inactive : styles.active
        }`}
        onClick={onClick}
      >
        Imperial System
      </p>
    </div>
  );
};
