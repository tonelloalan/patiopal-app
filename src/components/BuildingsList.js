"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BuildingsList() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [buildings, setBuildings] = useState([]); // For the fetched list of buildings

  //   console.log("SESSION USER ID FE: ", session?.user?._id);

  useEffect(() => {
    const fetchBuildings = async () => {
      if (status === "loading") {
        return <p>Loading...</p>; // Skip fetch if session is loading
      }

      const res = await fetch("/api/buildings");
      const data = await res.json();
      const filteredBuildings = data.filter(
        (building) =>
          building.residents
            .map((resident) => resident._id.toString()) // Map over the residents array within each building document, converting each ObjectId to its string representation using the toString() method.
            .includes(session.user._id.toString()) // Convert the session.user._id to a string as well, ensuring consistent comparison.
        // Above, when the API response is received by the frontend, Mongoose implicitly converts those ObjectId objects into full-fledged Mongoose ObjectId instances, which have a different internal structure.Solution: Convert ObjectId to String -- both the ObjectId in your front-end filter and the resident ObjectId values within your buildings array to strings for comparison.
      );
      //   console.log("FILTERED BUILDINGS FE: ", filteredBuildings);
      setBuildings(filteredBuildings); // Update buildings state
      setIsLoading(false);
    };
    fetchBuildings();
  }, [session, status]);

  return (
    <>
      <Link href="/home" style={{ fontSize: "xx-large" }}>
        ⬅
      </Link>
      <div>
        <h1>My Buildings</h1>
        {isLoading ? (
          <p>Loading buildings...</p>
        ) : buildings.length === 0 ? (
          <>
            <p>You don&apos;t have any buildings yet.</p>
            <Link href="/registerBuild">
              <button>Click here to add one</button>
            </Link>
          </>
        ) : (
          <ul className="buildingsList-ul">
            {buildings.map((building) => (
              <li className="buildingsList-item" key={building._id}>
                <Link href={`/buildings/${building._id.toString()}`}>
                  <h2>{building.streetNumber}</h2>
                  <h3>{building.streetName} </h3>
                  <h4>{building.city}</h4>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
