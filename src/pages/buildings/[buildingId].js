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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResidents, setShowResidents] = useState(false);

  const buildingId = router.query.buildingId;

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/buildings/${buildingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Building deleted successfully!");
        router.push("/buildings"); // Redirect to the buildings list
      } else {
        // Handle error from the API
        const errorData = await res.json();
        console.error("Error deleting building:", errorData);
        // You might want to display an error message to the user here
      }
    } catch (e) {
      console.error("Failed to delete building:", e);
      // Handle network errors
    }
  };

  const isAdmin = building?.isAdmin.some(
    (admin) => admin.toString() === session?.user._id
  ); // Authorization check

  // Fetch Building logic...
  useEffect(() => {
    const fetchBuilding = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/buildings/${buildingId}?populate=residents`
        );

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

  const handleShowResidents = () => {
    setShowResidents(true);
  };

  const handleCloseResidents = () => {
    setShowResidents(false);
  };

  if (isLoading) return <div>Loading building...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!building) return <div>Building not found</div>;

  return (
    <div>
      <Link href="/buildings" style={{ fontSize: "xx-large" }}>
        🔙
      </Link>
      <h4 onClick={handleShowResidents} style={{ cursor: "pointer" }}>
        {" "}
        {building.residents.length} resident
        {building.residents.length > 1 && "s"} at
      </h4>
      {showResidents && (
        <div>
          <ul>
            {building.residents.map((resident) => (
              <li key={resident._id}>
                {resident.firstName
                  ? `${resident.firstName[0].toUpperCase()}.`
                  : "-"}{" "}
                {resident.lastName}{" "}
                <span style={{ fontSize: "small" }}>
                  (@{resident.username})
                </span>
              </li>
            ))}
          </ul>
          <button onClick={handleCloseResidents}>Close</button>
        </div>
      )}
      <h2>
        {building.streetName} {building.streetNumber}
      </h2>
      <p>
        {building.zipcode}, {building.city}, {building.country}
      </p>
      {!edit &&
        isAdmin && ( // Show buttons only for admins
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => setShowDeleteConfirm(true)}>Remove</button>
          </>
        )}
      {showDeleteConfirm && (
        <div>
          <p>Are you sure you want to delete this building?</p>
          <button onClick={handleDelete}>Confirm</button>
          <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}
      {edit && (
        <>
          <EditBuildingForm
            building={building}
            onUpdate={handleEdit}
            setBuilding={setBuilding}
          />
          <button onClick={handleEdit}>Discard changes</button> <br />
        </>
      )}{" "}
    </div>
  );
}
