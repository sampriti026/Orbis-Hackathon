import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-4 text-center leading-tight">
  Where hackers and builders believe in you!
</h1>

<h1 className="text-gray-600 font-bold text-xl mb-4 text-center leading-tight">
  Connect with your favourite side hustlers and fund your favourite project.
</h1>


        <div className="flex flex-col md:flex-row justify-between items-center mt-10">
          <Link href="/products" className="w-full md:w-1/2 bg-gray-100 rounded-md p-6 shadow-lg hover:shadow-xl cursor-pointer">
            <Link href="/products" className="text-xl font-bold text-gray-700 mb-4">
              Explore other creations
            </Link>
            <p className="text-gray-600 mb-4">
              Discover new products and ideas from other creators.
            </p>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl">
              Explore
            </button>
          </Link>
          <Link href="/pitch" className="w-full md:w-1/2 bg-gray-100 rounded-md p-6 shadow-lg hover:shadow-xl cursor-pointer mt-4 md:mt-0">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Pitch your own product
            </h2>
            <p className="text-gray-600 mb-4">
              Share your ideas and get feedback from the community.
            </p>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl">
              Pitch
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
