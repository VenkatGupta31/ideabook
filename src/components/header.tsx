import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { auth } from "@/auth";
import * as actions from "@/actions";

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;

  if (session?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut}>
            <Button type="submit" color="secondary" variant="flat">
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form className="display flex" action={actions.signIn}>
        <Button type="submit" color="secondary" variant="faded">
          Sign In
        </Button>
        <Button type="submit" color="secondary" variant="solid">
          Sign Up
        </Button>
      </form>
    );
  }
  return (
    <Navbar className="shadow mb-12">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          !deabook
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>{authContent}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
