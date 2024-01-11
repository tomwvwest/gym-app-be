import Link from "next/link";
import styles from "../../styles.module.css";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 h-14 border-t border-DeepPurple border-opacity-40 w-full bg-platinum flex items-center">
      <ul className="w-full justify-between py-3 opacity-75 font-semibold grid grid-cols-5 text-center text-sm">
        <li>
          <Link href="/" className={styles.footerListItem}>
            <img src="../homeIcon.png"></img>
            Home
          </Link>
        </li>
        <li>
          <Link href="/workouts" className={styles.footerListItem}>
            <img src="../workoutsIcon.png"></img>Workouts
          </Link>
        </li>
        <Link href="/log-workout" className={styles.footerListItem}>
          <li>
            <img src="../logIcon.png"></img>Log
          </li>
        </Link>
        <li>
          <Link href="/exercises" className={styles.footerListItem}>
            <img src="../exercises.png"></img>Exercises
          </Link>
        </li>
        <li>
          <Link href="/browse" className={styles.footerListItem}>
            <img src="../browseIcon.png"></img>Browse
          </Link>
        </li>
        
      </ul>
    </div>
  );
};
