import { useState } from "react";

export default function EditBuildingForm({ building, onUpdate }) {
  const [streetName, setStreetName] = useState(building.streetName);
  const [streetNumber, setStreetNumber] = useState(building.streetNumber);
  const [zipcode, setZipcode] = useState(building.zipcode);
  const [city, setCity] = useState(building.city);
  const [country, setCountry] = useState(building.country);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBuilding = {
      streetName,
      streetNumber,
      zipcode,
      city,
      country,
    };

    try {
      const res = await fetch(`/api/buildings/${building._id}`, {
        method: "PUT", // Or 'PATCH' depending on your API route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBuilding),
      });

      if (res.ok) {
        console.log("Building updated successfully!");
        onUpdate(); // Call the callback to update the parent component's state
      } else {
        // Handle error from the API
        const errorData = await res.json();
        console.error("Error updating building:", errorData);
      }
    } catch (e) {
      console.error("Failed to update building:", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="streetName">Street Name:</label>
        <br />
        <input
          type="text"
          id="streetName"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />
        <br />
        <label htmlFor="streetNumber">Street Number:</label>
        <br />
        <input
          type="text"
          id="streetNumber"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
        />
        <br />
        <label htmlFor="zipcode">Zipcode:</label>
        <br />
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <br />
        <label htmlFor="city">City:</label>
        <br />
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label htmlFor="country">Country:</label>
        <br />
        <select
          id="country"
          name="country"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="" disabled selected>
            Select your country
          </option>
          <option value={"DE"}>Germany</option>
        </select>
        {/* Add similar input fields for streetNumber, zipcode, city, country */}
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
