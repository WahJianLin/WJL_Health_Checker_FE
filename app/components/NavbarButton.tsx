import React from "react";
import Link from "next/link";

function NavbarButton(props: Props) {
  const { content: name, url } = props;
  return (
    <li>
      <Link href={url}>{name}</Link>
    </li>
  );
}

interface Props {
  readonly content: string;
  readonly url: string;
}

export default NavbarButton;
