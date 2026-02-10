import type { HTMLAttributes } from "react";

import "./cell.css";

function Cell(props: HTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`cell ${props.className}`} />;
}

export default Cell;
