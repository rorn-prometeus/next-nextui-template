import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { LanguageIcon } from "@heroicons/react/24/solid";
import { useGreeting } from "@/hook/use-greeting";
import dynamic from "next/dynamic";
import NavbarUserDropdown from "./sub-component/navbar-user-dropdown";
import NavbarSidabarController from "./sub-component/navbar-sidebar-controller";
import { Session } from "next-auth";
const ThemeSetting = dynamic(() => import("./theme-setting"), { ssr: false });

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  const greeting = useGreeting();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="full" position="sticky" className="h-20">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className=" gap-5 max-w-fit">
          <NavbarSidabarController />
          <h1 className={"text-xl font-bold"}>{greeting}</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button isIconOnly variant="light">
            <LanguageIcon className=" w-6 h-6 text-primary" />
          </Button>
          <ThemeSetting />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          {session && <NavbarUserDropdown session={session} />}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
