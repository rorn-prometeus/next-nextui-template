import { motion } from "framer-motion";
import {
  ChartBarIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import AccordionMenu from "../reusable/accordion-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type MenuItem = {
  label: string;
  url: string;
  icon: React.ReactNode;
  children: MenuItem[];
};

export type Menu = {
  title: string;
  items: MenuItem[];
};

const menus: Menu[] = [
  {
    title: "overview",
    items: [
      {
        label: "Home",
        url: "/dashboard",
        icon: <HomeIcon className="w-6 h-6 text-primary" />,
        children: [],
      },
      {
        label: "Analytics",
        url: "/dashboard/analytics",
        icon: <ChartBarIcon className="w-6 h-6 text-primary" />,
        children: [],
      },
    ],
  },
  {
    title: "management",
    items: [
      {
        label: "User",
        url: "/dashboard/users",
        icon: <UserIcon className="w-6 h-6 text-primary" />,
        children: [],
      },
      {
        label: "Product",
        url: "/dashboard/products",
        icon: <ShoppingBagIcon className="w-6 h-6 text-primary" />,
        children: [
          {
            label: "Shirt",
            url: "/dashboard/products",
            icon: null,
            children: [],
          },
          {
            label: "Jean",
            url: "/dashboard/products/jean",
            icon: null,
            children: [],
          },
        ],
      },
    ],
  },
];

export default function BaseSidebarMenu() {
  return (
    <motion.div
      className={`sticky top-0  border-r border-dashed border-primary-300 h-screen min-h-screen lg:w-60 xl:w-72 px-2 `}
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="h-20 flex items-center">
        <HomeIcon className="w-10 h-10 text-primary" />
      </div>

      <div className="mt-5">
        {menus.map((menu) => (
          <SimpleMenu title={menu.title} items={menu.items} key={menu.title} />
        ))}
      </div>
    </motion.div>
  );
}

function SimpleMenu({ items, title }: Menu) {
  const pathname = usePathname();

  return (
    <div className="mt-5">
      <h1 className={"uppercase font-semibold text-sm text-default-400 ml-2"}>
        {title}
      </h1>

      <div className="mt-2">
        {items.map((item) =>
          item.children.length > 0 ? (
            <AccordionMenu item={item} key={item.label} />
          ) : (
            <Link
              key={item.label}
              href={item.url}
              className={`mt-1 flex items-center gap-4 py-3 px-4 mx-2 rounded-xl group active:scale-95 ${
                pathname === item.url
                  ? "!bg-primary-50"
                  : "hover:bg-default-100"
              }`}
            >
              {item.icon}
              <p
                className={`font-medium text-sm text-default-500 ${
                  pathname === item.url ? "text-primary " : ""
                }`}
              >
                {item.label}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
