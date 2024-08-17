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
  const [rid, setRid] = useState('');//rid
  const [time, setTime] = useState('');
  useEffect(() => {
    const fetchDetails = async () => {
      if (start && end) {
        try {
          const response = await fetch(`/api/rid?from=${start}&to=${end}`);
          const data = await response.json();
          setRid(JSON.stringify(data.rid)); 
        } catch (error) {
          console.error("Error fetching details:", error);
          setRid('Error fetching details');
        }
      }
    };

    fetchDetails();
  }, [start, end]);

  return (
    <>
    <h3>{start +"  to " +end + " on " + date + " arrival "+time}</h3>
    <div style={{ display: "flex", gap: "3vw", padding: "4vw" }}>
      <StartLocation start={start} setstart={setStart} />
      <EndLocarion end={end} setend={setEnd} />
      <DatePickerDemo date={date} setdate={setDate} />
      <TimePicker time={time}setTime={setTime}/>
    
      <Button variant={'outline'}>Confirm</Button>
    </div>
    </>
  );
}

export default Page;
