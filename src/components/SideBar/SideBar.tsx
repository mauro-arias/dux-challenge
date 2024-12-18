import { Button } from "primereact/button";
import React from "react";
import { navItems } from "./constants";
import styles from "./styles.module.css";

const SideBar = () => {
  return (
    <aside
      className={`shadow-2 flex items-center flex-column p-1 col-fixed ${styles.sideBarStyles}`}
    >
      {navItems.map((item, index) => (
        <Button
          key={index}
          text
          size="large"
          className="text-white h-2rem my-2"
          icon="pi pi-box"
          aria-label={item.title}
        />
      ))}
    </aside>
  );
};

export default SideBar;
