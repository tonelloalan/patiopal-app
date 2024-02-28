import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      style={{
        position: "relative",
        right: "-75px",
        margin: "8px 20px",
      }}
      src={"/pp-logo02.png"}
      alt="patio pal logo"
      height={80}
      width={140}
    />
  );
}
