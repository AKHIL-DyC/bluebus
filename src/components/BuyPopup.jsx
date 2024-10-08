"use client"
import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { getSession, useSession } from "next-auth/react"
import {useRouter} from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export default function DrawerDemo({amount,id,seatArr,count,setcount}) {
  
  const [uid,setuid] = React.useState(null)
    const router=useRouter();
  async function sessiongetter(){
    const session=await  getSession();
    setuid(session?.user?.id);
  }
sessiongetter()

console.log(uid);
  async function handlebuy() {
    const res = await fetch('/api/markseat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id, 
        seatno: seatArr ,
        uid:uid
      })
    });
    setcount(count+1)
    router.push('/orders')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Buy Ticket</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Ticket Fare</DrawerTitle>
            <DrawerDescription>Best fare at blue bus.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
            
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {amount*seatArr.length}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Rupees
                </div>
              </div>
             
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } 
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handlebuy}>Buy</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
