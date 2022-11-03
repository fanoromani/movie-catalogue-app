import Image from "next/image";

import logo from "../assets/logo.svg";

export default function Home() {
  return (
    <div>
      <div className="bg-purple-400 flex-1 h-14">
        <Image src={logo} alt="" />
      </div>
    </div>
  );
}
