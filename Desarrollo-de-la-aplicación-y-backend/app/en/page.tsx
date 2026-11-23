import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Xochitl Delgado · Portfolio",
  description: "Digital portfolio of Xochitl Lisbeth Delgado Cano, high school graduate and scholarship recipient at Centro ¡Supérate!.",
};

export default function Page() {
  return <Home lang="en" />;
}
