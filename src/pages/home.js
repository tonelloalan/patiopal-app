import UserInfo from "@/components/UserInfo";
import { getSession } from "next-auth/react";

export default function Home() {
  return <UserInfo />;
}
