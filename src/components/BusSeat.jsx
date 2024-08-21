"use client";
import React, { useEffect, useState } from "react";
import { MdChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { FloatingDock } from "./ui/floating-dock";
import  BuyPop from"@/components/BuyPopup"
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { POST } from "@/app/api/signin/route";


const BusLayout = ({bus,rid,date,amount}) => {
  console.log(bus)
  const rows = 8; 
  const seatsPerRow = [2, 3]; 
  const [seatArr, setSeatArr] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); 
  const[count,setcount]=useState(0);
  console.log("selec"+selectedSeats)



  useEffect(() => {
    async function fetchSeats() {
      if (bus && rid && date) {
        try {
          const res = await fetch(`/api/seat?id=${bus.id}`);
          const data = await res.json();
          setSeatArr(data.seats); 
        } catch (error) {
          console.error("Error fetching seat data:", error);
        }
      }
    }

    fetchSeats();
  }, [bus, rid, date,count]); 


 // console.log(seatArr);


  
  
  const handleClick = (seatNumber) => {
    if(!seatArr[seatNumber]){
      if (selectedSeats.includes(seatNumber)) {
        // Deselect the seat if it's already selected
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        // Select the seat
        setSelectedSeats([...selectedSeats, seatNumber]);
      }


    }
  
  };

  const links = [
    {
      title: `${bus.owner.bname}`,
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: `${bus.owner.regno}`,
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: `${bus.arrivaltime}`,
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: `${bus.deptrtime}`,
      icon: (
        <Image
          src="/busticket.avif"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: `${bus.remaining}`,
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: `${date}`,
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: `${bus.id}`,
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];




  return (

    <div>
      <div style={{ position: "absolute", top: "0",left:"6" }}>
         <FloatingDock
        mobileClassName="translate-y-20"  
        items={links}
          />
          </div>
          <div className="flex flex-col align-middle justify-center ">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid light-dark(black,white)",borderRadius:'30px',marginLeft:'2vw'}}>
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
                style={{ marginRight: "1rem", color: selectedSeats.includes(seatNumber) ? "green" : seatArr[seatNumber]?"red":"light-dark(black,white) "}} 
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
                style={{ marginRight: "1rem", color: selectedSeats.includes(seatNumber) ? "green" : seatArr[seatNumber]?"red":"light-dark(black,white) "}} 
                onClick={() => handleClick(seatNumber)}
              />
            );
          })}
        </div>
      ))}
    </div>
    <div style={{display:'flex',position:'absolute',top:'60vh',left:'40vw'}}>
    <BuyPop amount={amount} id={bus.id} seatArr={selectedSeats} count={count} setcount={setcount}/>
    </div>
    </div>
    </div>
  );
};

export default BusLayout;
