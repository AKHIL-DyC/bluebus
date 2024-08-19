"use client";
import React, { useEffect, useState } from 'react';
import StartLocation from '@/components/StartLocation';
import EndLocarion from '@/components/EndLocation';
import DatePickerDemo from '@/components/Datepicker';
import { Button } from '@/components/ui/button';

export default function SearchBus() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(null);
  const [rid, setRid] = useState(0);
  const [data, setData] = useState([]);

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

  return (
    <>
      <ul>
        {data.length > 0 ? (
          data.map((bus, index) => (
            <li key={index}>
              <h2>Bus Name: {bus.owner.bname}</h2>
              <h2>Arrival Time: {bus.arrivaltime}</h2>
              <h2>Departure Time: {bus.deptrtime}</h2>
              <h2>Remaining Seats: {bus.remaining}</h2>
            </li>
          ))
        ) : (
          <div>No bus data available</div>
        )}
      </ul>

      <div style={{ display: "flex", gap: "3vw", padding: "4vw" }}>
        <StartLocation start={start} setstart={setStart} />
        <EndLocarion end={end} setend={setEnd} />
        <DatePickerDemo date={date} setdate={setDate} />
        <Button variant={'outline'} onClick={handleClick}>Search</Button>
      </div>
    </>
  );
}
