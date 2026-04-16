// Conteneur de la partie droite de l'interface
// regroupe la date, les métriques et le switch d'unités
import styles from "./ContentBox.module.css";

export const ContentBox = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
