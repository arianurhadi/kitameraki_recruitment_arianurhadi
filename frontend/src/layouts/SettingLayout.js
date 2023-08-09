import React from "react";

export default function SettingLayout({ children }) {
  return (
    <>
      <div className="container-fluid">
        {children}
      </div>
    </>
  );
}
