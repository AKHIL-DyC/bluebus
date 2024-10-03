"use client"
import React, { useEffect, useState } from 'react';
import { GlareCard } from '@/components/ui/glare-card';
import { useSession } from 'next-auth/react';
const Orders = () => {
  const [data, setData] = useState({ reservationDetails: [] });
  const [error, setError] = useState(null);
  const session=useSession()
  useEffect(() => {
    async function ofetcher() {
      try {
        const res = await fetch(`/api/orderfetcher?uid=${session?.data?.user?.id}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        if (!text) {
          throw new Error("Empty response");
        }

        const jres = JSON.parse(text);
        setData(jres);
      } catch (err) {
        setError(err.message);
        console.error('Fetching error:', err);
      }
    }

    ofetcher();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Your Reservations</h1>
      {console.log("reservation uid",session?.data?.user?.id)}
      {data?.reservationDetails?.length > 0 ? (
        data.reservationDetails.map((reservation, index) => (
          <GlareCard key={index} className="mb-4 p-4 ">
            <div className="text-center font-bold text-xl pb-7">TICKET</div>
            <div className="mt-2">
              <strong>Route:</strong> {reservation.route.from} to {reservation.route.to}
            </div>
            <div className="mt-2">
              <strong>Date:</strong> {new Date(reservation.routebus.date).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <strong>Bus Name:</strong> {reservation.busname.bname}
             </div>
            <div className="mt-2">
              <strong>Seat No :</strong> {reservation.setno.join(', ')}
            </div>
            <div className="mt-2">
              <strong>Distance:</strong> {reservation.route.distance}
            </div>
            <div className="mt-2">
                   <strong>Contact:</strong> {reservation.busname.phone}
                     </div>
          
          </GlareCard>
        ))
      ) : (
        <div className="text-center">No Reservations</div>
      )}
    </div>
  );
};

export default Orders;
