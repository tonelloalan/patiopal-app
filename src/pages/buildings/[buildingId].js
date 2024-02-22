import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BuildingDetailsPage() {
  const router = useRouter();
  const [building, setBuilding] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildingId = router.query.buildingId;

  console.log("BUILDING ID SLUG: ", buildingId);

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
      {/* Add more details as needed */}
    </div>
  );
}
