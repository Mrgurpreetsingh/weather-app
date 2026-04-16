// Barre de recherche de ville — composant conservé mais non utilisé depuis la migration vers une ville fixe dans config.json
import styles from "./Search.module.css";

export const Search = ({
  placeHolder,
  value,
  onFocus,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeHolder}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
