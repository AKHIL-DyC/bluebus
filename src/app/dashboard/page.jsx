"use client";
import React, { useEffect, useState } from 'react';
import StartLocation from '../../components/StartLocation';
import EndLocarion from '../../components/EndLocation';
import DatePickerDemo from '../../components/Datepicker';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import TimePicker from'@/components/Timepicker'
import { getSession } from 'next-auth/react';
import { GlareCard } from '@/components/ui/glare-card';
async function getBid(){
  const session = await getSession(); 
  if (session && session.user) {
    return session.user.id; 
  }
  return null; 
}

const Page = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState(null);
  const [rid, setRid] = useState(0);
  const [time, setTime] = useState('');
  const [bid, setBid] = useState('');
  const [data, setData] = useState([]);
  const[count,setcount]=useState(0);

  useEffect(() => {
    async function fetchBid() {
      const bids = await getBid(); 
      console.log(bids); 
      setBid(bids);
    }

    fetchBid(); 
  }, []);

  useEffect(() => {
    if (bid) {
      async function fetchBus() {
        const response = await fetch(`/api/showbuswithbid?bid=${bid}`);
        const arr = await response.json();
        const rdata = arr.data;
        setData(rdata);
      }
      fetchBus();
    }
  }, [bid,count]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (start && end && bid) {
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
  }, [start, end, bid]);

  async function handleClick() {
    try {
      if (!bid || !rid || !date || !time) {
        console.error('Missing required data to proceed');
        return;
      }
      
      const res = await fetch('/api/addbus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bid: bid, 
          rid: rid, 
          date: date, 
          arrivaltime: time, 
          deptrtime: "6:08 PM"
        }),
      });

      if (res.ok) {
        setcount(count+1)
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
      <h3>{start + " to " + end + " on " + date+ " arrival " + time + " bid " + bid}</h3>
      
      <div className='flex gap-5 p-6 justify-between'>
        {data?.length > 0 ? (
          data.map((id) => (
            <GlareCard key={id.rid}>
              <div className=' justify-center'>
              <h2 className='text-center'>Date: {id.date}</h2>
              <h2 className='text-center'>Arrival Time: {id.arrivaltime}</h2>
              <h2 className='text-center'>Departure Time: {id.deptrtime}</h2>
              <h2 className='text-center'>Remaining Seats: {id.remaining}</h2>
              </div>
            </GlareCard>
          ))
        ) : (
          <div>No bus data available</div>
        )}
      </div>

      {console.log(data)}
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
