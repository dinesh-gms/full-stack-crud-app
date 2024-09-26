import { ChevronDown, ChevronUp, MoreVertical, Text } from "lucide-react";
import React, { useState, createContext, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  return (
    <aside className="max-h-screen">
      <nav className="h-full flex flex-col bg-transparent border-r border-slate-700 shadow-sm">
        <div className="pt-4 pl-3 pb-2 pr-0 flex justify-start items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-500">
            <Text />
          </button>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ml-4 ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-col flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="relative border-t border-slate-700 flex p-3">
          <img
            src={isLoggedIn.user.profile}
            alt="profile"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}>
            <div className="leading-4">
              <h4 className="font-semibold text-gray-300">
                {isLoggedIn.user.name}
              </h4>
              <span className="text-xs text-gray-500">
                {isLoggedIn.user.email}
              </span>
            </div>
            <div className="pop-up">
              <MoreVertical
                size={20}
                color="rgb(148,163,184)"
                className="cursor-pointer"
              />
              <div
                className="absolute -right-4 bottom-12 text-slate-900 font-semibold bg-slate-300 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-slate-400 hover:text-slate-950 transition-all z-40 logout"
                onClick={async () => {
                  if (await onLogout(isLoggedIn.user.email)) navigate("/");
                }}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  title,
  path,
  submenu,
  expandDropdown,
  dropdownActive,
  children,
}) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className="relative">
      <NavLink
        className={`flex py-2 px-3 my-1 text-slate-400 rounded-md font-medium max-h-10 hover:bg-slate-800`}
        to={path}
        onClick={dropdownActive}>
        <span>{icon}</span>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}>
          {title}
        </span>
        {submenu && (
          <span
            className={`ml-auto overflow-hidden transition-all ${
              expanded ? "w-auto" : "w-0"
            }`}>
            {expandDropdown ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </NavLink>
      {submenu && (
        <ul
          className={`mt-1 overflow-hidden transition-all ${
            expanded ? "w-auto" : "w-0"
          } ${expandDropdown ? "block" : "hidden"}`}>
          {children}
        </ul>
      )}
    </li>
  );
}

export function SidebarDropdownItem({ title, path, active }) {
  return (
    <li
      className={`
    relative py-1 px-8
    font-medium max-h-10 text-slate-400 rounded-md cursor-pointer
    transition-colors group
    ${
      active
        ? "bg-gradient-to-r from-slate-900 to-slate-800"
        : "hover:text-slate-500"
    }
`}>
      <NavLink className="block" to={path}>
        {title}
      </NavLink>
    </li>
  );
}
