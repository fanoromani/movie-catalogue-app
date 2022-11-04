import Image from "next/image";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <div className="bg-purple-400 flex-1 h-14 flex justify-center sm:block sm:pl-28 py-4">
      <Image src={logo} alt="" />
    </div>
  );
}
