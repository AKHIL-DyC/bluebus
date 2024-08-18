"use client";
import React, { useEffect, useState } from 'react';
import StartLocation from '../../components/StartLocation';
import EndLocarion from '../../components/EndLocation';
import DatePickerDemo from '../../components/Datepicker';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import TimePicker from'@/components/Timepicker'

const Page = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(null);
  const [rid, setRid] = useState(0); // Route ID
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (start && end) {
        try {
          const response = await fetch(`/api/rid?from=${start}&to=${end}`);
          const data = await response.json();
          setRid(data.rid); // No need to stringify the ID
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
      const res = await fetch('/api/addbus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bid: 5, // Bus ID
          rid: rid, // Route ID
          date: date, // Date object directly
          arrivaltime: time, // Arrival time
          deptrtime: "6:08 PM" // Departure time, hardcoded for now
        }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log('Bus route created:', result);
      } else {
        console.error('Failed to create bus route');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <h3>{start + " to " + end + " on " + date+ " arrival " + time}</h3>
      <div style={{ display: "flex", gap: "3vw", padding: "4vw" }}>
        <StartLocation start={start} setstart={setStart} />
        <EndLocarion end={end} setend={setEnd} />
        <DatePickerDemo date={date} setdate={setDate} />
        <TimePicker time={time} setTime={setTime} />
        <Button variant={'outline'} onClick={handleClick}>Confirm</Button>
      </div>
    </>
  );
};

export default Page;
















































