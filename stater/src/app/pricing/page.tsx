import NavBar from "../navbar";
import Link from 'next/link';
import Hero from "./hero";
import Prices from "./prices";
import Disclaimer from "./disclaimers";

export default function Pricing() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Prices />
      <Disclaimer />
    </main>
  );
}
