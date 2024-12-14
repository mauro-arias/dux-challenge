import { Button } from "primereact/button";
import style from "./styles.module.css";
import Image from "next/image";

const TopMenu = () => {
  return (
    <div className={style.menu}>
      <Image src="/dux-favicon.png" width={25} height={25} alt="Dux Software Logo" />
      <Button
        text
        className="text-white"
        icon="pi pi-cog"
        size="large"
        rounded
        aria-label="Configuración"
      />
    </div>
  );
};

export default TopMenu;
