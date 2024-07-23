import NavBar from "./navbar";
import Link from 'next/link';
import Hero from './hero';

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
    </main>
  );
}
