"use client";
import React, { useEffect, useState } from 'react';
import StartLocation from '@/components/StartLocation';
import EndLocation from '@/components/EndLocation' // Fixed typo in 'EndLocarion'
import DatePickerDemo from '@/components/Datepicker';
import { Button } from '@/components/ui/button';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import BusLayout from './BusSeat';

export default function SearchBus() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(null);
  const [rid, setRid] = useState(0);
  const [data, setData] = useState([]);
  const [activeBus, setActiveBus] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (start && end) {
        try {
          const response = await fetch(`/api/rid?from=${start}&to=${end}`);
          const data = await response.json();
          setRid(data.rid);
        } catch (error) {
          console.error("Error fetching details:", error);
          setRid('Error fetching details');
        }
      }
    };
    fetchDetails();
  }, [start, end]);

  async function handleClick() {
    try {
      if (!rid || !date) {
        console.error('Missing required data to proceed');
        return;
      }

      const response = await fetch(`/api/showbus?rid=${rid}&date=${date}`);
      const arr = await response.json();
      const rdata = arr.data;
      setData(rdata);
    } catch (error) {
      console.error("Error fetching bus data:", error);
    }
  }

  const handleBusClick = (bus) => {
    console.log("Selected Bus:", bus); // Add logging
    setActiveBus(bus);
  };

  return (
    <div className='flex-row'>
      {activeBus ? (
        <div>
          <BusLayout bus={activeBus} />
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: "3vw", padding: "4vw" }}>
            <StartLocation start={start} setstart={setStart} />
            <EndLocation end={end} setend={setEnd} /> {/* Fixed typo in 'EndLocarion' */}
            <DatePickerDemo date={date} setdate={setDate} />
            <Button variant={'outline'} onClick={handleClick}>Search</Button>
          </div>
          
          <ul className="list-none p-0 m-0">
            {data && data.length > 0 ? (
              data.map((bus, index) => (
                <li key={index} className="mb-4">
                  <CardSpotlight className="flex flex-row p-4 justify-between border rounded-lg shadow-lg">
                    <div className="flex flex-col mb-4">
                      <h2 className="text-xl mb-1">Bus Detail:</h2>
                      <p className="text-lg font-light mb-2 text-gray-700 dark:text-gray-300">{bus.owner.bname}</p>
                      <p className="text-lg font-light text-gray-700 dark:text-gray-300">{bus.owner.regno}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                      <h2 className="text-xl mb-1">Arrival Time:</h2>
                      <p className="text-lg font-light mb-2 text-gray-700 dark:text-gray-300">{bus.arrivaltime}</p>
                      <h2 className="text-xl mb-1">Departure Time:</h2>
                      <p className="text-lg font-light text-gray-700 dark:text-gray-300">{bus.deptrtime}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-5 z-40">Free Seats: {bus.remaining}</p>
                  </CardSpotlight>
                  <div className="flex flex-col items-center justify-between mb-4">
    <Button variant="outline" onClick={() => handleBusClick(bus)}>Look Seats</Button>
    
  </div>
                </li>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">No bus data available</div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
