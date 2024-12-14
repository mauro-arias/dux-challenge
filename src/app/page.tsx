import styles from "./page.module.css";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <div className={styles.page}>
      <Button className="p-6">Click</Button>
      <Button outlined>Click</Button>
    </div>
  );
}
