// En-tête de la ContentBox — contient la date et l'heure locale
import styles from "./Header.module.css";

export const Header = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
