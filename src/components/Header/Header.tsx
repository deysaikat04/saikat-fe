import React from "react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <h1 className="text-4xl font-semibold mb-6 text-gray-500 text-center">
      {title}
    </h1>
  );
}

export default Header;
