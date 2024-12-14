import React from "react";
import { TitleProps } from "./interfaces";

const Title = ({ text, className, ...rest }: TitleProps) => {
  return (
    <h1 className={`${className} m-0 font-bold`} {...rest}>
      {text}
    </h1>
  );
};

export default Title;
