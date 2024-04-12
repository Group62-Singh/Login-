import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import Hero from "../components/hero";
import { Fragment } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Fragment>
      <Header />
      <Hero />
    </Fragment>
  );
}
