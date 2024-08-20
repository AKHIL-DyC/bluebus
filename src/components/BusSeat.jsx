"use client";
import React, { useState } from "react";
import { MdChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

const BusLayout = () => {
  const rows = 8; // Number of rows in the bus
  const seatsPerRow = [2, 3]; // First two columns have 2 seats, next three columns have 3 seats

  const [selectedSeats, setSelectedSeats] = useState([]); // State to store selected seats
  console.log(selectedSeats)
  const handleClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // Deselect the seat if it's already selected
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid light-dark(black,white)",borderRadius:'30px' }}>
      {/* Driver's seat */}
      <div style={{ display: "flex", alignItems: "right", marginBottom: "1rem" }}>
        <div style={{ marginLeft: "8rem" }}>
          <GiSteeringWheel size={40} />
        </div>
      </div>

      {/* Bus seats layout */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", marginBottom: "1rem",marginLeft:'1.5rem'}}>
          {/* First 2 seats */}
          {[...Array(seatsPerRow[0])].map((_, seatIndex) => {
            const seatNumber = rowIndex * 5 + seatIndex + 1; // Calculate seat number
            return (
              <MdChair
                key={`seat-${seatNumber}`}
                size={40}
                style={{ marginRight: "1rem", color: selectedSeats.includes(seatNumber) ? "green" : "light-dark(black,white)" }} 
                onClick={() => handleClick(seatNumber)}
              />
            );
          })}
          {/* Gap */}
          <div style={{ width: "2rem" }}></div>
          {/* Next 3 seats */}
          {[...Array(seatsPerRow[1])].map((_, seatIndex) => {
            const seatNumber = rowIndex * 5 + seatIndex + 3; // Calculate seat number
            return (
              <MdChair
                key={`seat-${seatNumber}`}
                size={40}
                style={{ marginRight: "1rem", color: selectedSeats.includes(seatNumber) ? "green" : "light-dark(black,white)" }} // Change color if selected
                onClick={() => handleClick(seatNumber)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BusLayout;