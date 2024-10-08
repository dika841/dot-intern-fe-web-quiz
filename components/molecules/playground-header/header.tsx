"use client";
import { Button } from "@/components";
import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";
import { FC, ReactElement, useState } from "react";

export const Header: FC = (): ReactElement => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="w-full md:w-4/5 mx-auto rounded-xl mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg">
      <div className="flex items-center justify-between w-full px-8 py-4">
        <h1 className="text-sm md:text-lg font-semibold">
          Welcome to your Playground
        </h1>
        <div className="relative">
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <Icon icon="mdi:account-circle" className="h-7 w-7" />
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <Icon
              icon={dropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="h-5 w-5"
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg shadow-lg ">
              <Button
                variant="ghost"
                className="w-full text-left  text-sm text-white transition-all"
                onClick={() => {
                  signOut();
                  window.localStorage.removeItem("quizState");
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
