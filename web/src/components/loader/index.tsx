import "./loader.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Loader({ size = "md", className = "" }: LoaderProps) {
  const sizeClass = `spinner-${size}`;
  const classes = `spinner ${sizeClass} ${className}`;

  return (
    <div className="loader-container">
      <div className={classes} role="status" aria-label="Loading" />
    </div>
  );
}

export default Loader;
