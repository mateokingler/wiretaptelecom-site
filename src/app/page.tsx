import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  // The root page shares a segment with the root layout, so the layout's title
  // template does not reach it and the suffix has to be spelled out.
  title: "SIP Trunking, Numbers, Messaging, and Fax | Wiretap Telecom",
};

export default function Page() {
  return <HomePage />;
}
