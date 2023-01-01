import Link from "next/link";
import { Orbis } from "@orbisclub/orbis-sdk";
import React, { useState, useEffect } from "react";

let orbis = new Orbis();

const Navbar = () => {

    const [user, setUser] = useState();

    function getPublicKeyFromDid(did) {
      // Get the length of the input string
      const inputStringLength = did.length;
      // Calculate the start index for the slice by subtracting 42 from the length of the input string
      const startIndex = inputStringLength - 42;
      // Slice the last 42 characters from the input string
      const last42Characters = did.slice(startIndex);
      return last42Characters; // logs "0123456789abcdefghijklmnopqrstuvwxyz0123456789"
    }

    const shortenAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  

    async function connect() {
        let res = await orbis.isConnected();
        if (res.status !== 200){
        console.log("no active status")
        let res = await orbis.connect();
        }
    
        /** Check if connection is successful or not */
        if (res.status == 200) {
          setUser(res.did);
          console.log(res.did)
        } else {
          console.log("Error connecting to Ceramic: ", res);
          alert("Error connecting to Ceramic.");
        }
      }

    return (
<nav className="bg-gray-800 py-4">
  <div className="container mx-auto flex justify-between items-center">
    <Link href="/" className="text-white font-bold text-2xl">
      iBuilder
    </Link>
    <Link href="/products" className="text-white font-bold text-xl">
      Products
    </Link>
    <Link href="/pitch" className="text-white font-bold text-xl">
      Pitch
    </Link>
    {user ? (
      <p className="text-white">Connected with: {shortenAddress(getPublicKeyFromDid(user))}</p>
    ) : (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => connect()}>
      Connect
    </button>
    )}
  </div>
</nav>

);
    }

export default Navbar;
