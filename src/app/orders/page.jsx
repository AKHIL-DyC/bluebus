"use client"
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    async function ofetcher() {
      try {
        const res = await fetch(`/api/orderfetcher?uid=1`);
        
        // Check if the response is OK (status 200-299)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Check if the response has content before parsing
        const text = await res.text(); // First, get the response as text
        if (!text) {
          throw new Error("Empty response");
        }

        // Try parsing the JSON only if the text is not empty
        const jres = JSON.parse(text);
        setData(jres);
      } catch (err) {
        setError(err.message); // Set error message to state
        console.error('Fetching error:', err);
      }
    }

    ofetcher(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run effect only once on component mount

  if (error) {
    return <div>Error: {error}</div>; // Display error if something went wrong
  }

  return (
    <div>
      <div>Orders</div>
      <div>{data ? JSON.stringify(data) : "Loading..."}</div> {/* Show "Loading" while waiting */}
    </div>
  );
};

export default Orders;
