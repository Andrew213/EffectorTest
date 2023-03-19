import React from "react";
import cn from "classnames";

import "./styles.scss";

interface LoaderProps {
  className?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  className,
  width = 150,
  height = 150,
}) => {
  const loaderStyle: React.CSSProperties = {
    width,
    height,
  };

  return (
    <div className={cn("loaderContainer", { className })}>
      <div className="loader" style={loaderStyle} />
    </div>
  );
};

export default Loader;
