import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EditBuildingForm from "@/components/EditBuildForm";

export default function BuildingDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [building, setBuilding] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const buildingId = router.query.buildingId;

  console.log("BUILDING IS ADMIN: ", building?.isAdmin);
  console.log("SESSION USER IS ADMIN: ", session?.user._id);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const isAdmin = building?.isAdmin.some(
    (admin) => admin.$oid === session?.user._id
  ); // Authorization check

  // Fetch Building logic...
  useEffect(() => {
    const fetchBuilding = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/buildings/${buildingId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch building");
        }
        const data = await res.json();
        setBuilding(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have an ID
    if (buildingId) {
      fetchBuilding();
    }
  }, [buildingId]);

  if (isLoading) return <div>Loading building...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!building) return <div>Building not found</div>;

  return (
    <div>
      <Link href="/buildings" style={{ fontSize: "xx-large" }}>
        🔙
      </Link>
      <h2>
        {building.streetName} {building.streetNumber}
      </h2>
      <p>
        {building.zipcode}, {building.city}, {building.country}
      </p>
      <button onClick={handleEdit}>Edit</button>
      {edit && (
        <>
          <EditBuildingForm building={building} />
          <button onClick={handleEdit}>Discard changes</button> <br />
        </>
      )}{" "}
    </div>
  );
}
