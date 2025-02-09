import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/" className="flex items-center gap-2 ">
        <img src="https://i.ibb.co/28Sy5VH/image.png" alt="Agripact Logo" className="h-12" />
        <span className="text-emerald-200 text-2xl font-bold">Agripact</span>
      </Link>
    </>
  );
}

export default Logo;
