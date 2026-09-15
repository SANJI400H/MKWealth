import { redirect } from "next/navigation";

/** Alias: Private Desk → Client Portal (hosted investor dashboard). */
export default function DeskPage() {
  redirect("/portal");
}
