import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { navLinks } from "../constants/route";

export const useActiveNav = () => {
  const location = useLocation();
  const activeNav = useMemo(() => {
		const paths = location.pathname.match(/^(\/[\w-]+)/g) || [];
    return navLinks.find((nav) => nav.href === paths[0]) || navLinks[0];
	}, [location]);

  return activeNav;
}