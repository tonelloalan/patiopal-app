import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EditBuildingForm from "@/components/EditBuildForm";

let updatedBuildingData;

export default function BuildingDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [building, setBuilding] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResidents, setShowResidents] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const handleSearchChange = async (event) => {
    setSearchInput(event.target.value);

    if (event.target.value.trim()) {
      // Only search if there's text
      try {
        const res = await fetch(`/api/buildings/${buildingId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "searchUser",
            searchTerm: event.target.value,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
          setShowSearchResults(true); // Show results
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false); // Hide results
    }
  };

  const handleSearchResultClick = (user) => {
    console.log("CLICKED USERNAME:", user.username); // Log the clicked username

    setSearchInput(user.username);
    setSearchResults([]);
    setShowSearchResults(false);
    setSelectedUserId(user._id);
  };

  const handleAddUser = async () => {
    console.log("SEARCH INPUT BEFORE API CALL:", searchInput); // Log searchInput

    try {
      const res = await fetch(`/api/buildings/${buildingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addUser",
          // userId: selectedUser._id,
          searchTerm: searchInput,
        }),
      });

      if (res.ok) {
        console.log("User added successfully!");
        // Update UI - refetch the building, or directly add the user to the residents array
        setSearchInput(""); // Clear the search input after adding

        // Refetch building data:
        const updatedBuildingData = await res.json();

        console.log("Original Building:", building); // Log for comparison
        console.log("UPDATED BUILDING DATA:", updatedBuildingData);

        setBuilding(updatedBuildingData); // Update component state
      } else {
        // Handle error from the API
        const errorData = await res.json();
        if (errorData.error === "User not found") {
          alert("User not found in the database.");
        } else if (
          errorData.error === "This person is already a resident here"
        ) {
          alert("This person is already a resident.");
        } else {
          alert("An error occurred while adding the user.");
        }
      }
    } catch (e) {
      console.error("Failed to add user to building:", e);
    }
  };

  const handleDeleteResident = async (residentId) => {
    if (window.confirm("Are you sure you want to remove this resident?")) {
      try {
        const res = await fetch(`/api/buildings/${buildingId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId }),
        });

        if (res.ok) {
          console.log("Resident removed successfully!");
          const updatedBuildingData = await res.json();
          setBuilding(updatedBuildingData);
        } else {
          const errorData = await res.json();
          console.error("Error removing resident:", errorData);
          // Handle error (display a message, etc.)
        }
      } catch (e) {
        console.error("Failed to remove resident:", e);
      }
    }
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
            {updatedBuildingData
              ? updatedBuildingData.residents.map((resident) => (
                  <li className="residents-list" key={resident._id}>
                    {isAdmin && ( // Show 'X' only for admins
                      <button
                        className="remove-resident"
                        onClick={() => handleDeleteResident(resident._id)}
                      >
                        X
                      </button>
                    )}
                    {resident.firstName
                      ? `${resident.firstName[0].toUpperCase()}.`
                      : "-"}{" "}
                    {resident.lastName}{" "}
                    <span style={{ fontSize: "small" }}>
                      (@{resident.username})
                    </span>
                  </li>
                ))
              : building.residents.map((resident) => (
                  <li className="residents-list" key={resident._id}>
                    {isAdmin && ( // Show 'X' only for admins
                      <button
                        className="remove-resident"
                        onClick={() => handleDeleteResident(resident._id)}
                      >
                        X
                      </button>
                    )}
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
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by username"
            />
            <button onClick={handleAddUser}>Add User</button>

            {showSearchResults && ( // Conditionally display search results
              <ul className="addUser-search-item-container">
                {searchResults.map((user) => (
                  <li
                    className="addUser-search-item"
                    key={user._id}
                    onClick={() => handleSearchResultClick(user)}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
