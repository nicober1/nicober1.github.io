import React from "react";
import { useMediaQuery } from "react-responsive";

export default function  ResponsiveComponent ({ children })  {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  return (
    <div className="responsive-component">
      {/* Render the children prop differently depending on the device */}
      {isMobile && <div className="mobile">{children}</div>}
      {isTablet && <div className="tablet">{children}</div>}
      {isLaptop && <div className="laptop">{children}</div>}
      {isDesktop && <div className="desktop">{children}</div>}
    </div>
  );
};


export default function ResponsiveComponent({ children }) {
  return (
    <div className="responsive-component">
      {/* Render the children prop differently depending on the device */}
      <div className="mobile sm:hidden md:hidden lg:hidden xl:hidden">{children}</div>
      <div className="tablet hidden sm:block md:hidden lg:hidden xl:hidden">{children}</div>
      <div className="laptop hidden sm:hidden md:block lg:hidden xl:hidden">{children}</div>
      <div className="desktop hidden sm:hidden md:hidden lg:block xl:block">{children}</div>
    </div>
  );
}