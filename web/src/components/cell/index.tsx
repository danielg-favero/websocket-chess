import type { ButtonHTMLAttributes } from "react";

import "./cell.css";

function Cell(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`cell ${props.className}`} />;
}

export default Cell;
