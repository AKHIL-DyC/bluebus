
import Image from "next/image";
import Toggler from "@/components/Toggler"
import Alerter from "@/components/Alerter"
import StartLocation from "@/components/StartLocation"
import EndLocation from "@/components/EndLocation"
import DatePicker from "@/components/Datepicker"
import  Signup from "@/components/Signup"
import NavbarDemo from "@/components/Navbarc";
import { getServerSession} from "next-auth";
import { json } from "stream/consumers";
import { Next_AUTH_CONFIG } from "./lib/auth";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import BusSeat from '@/components/BusSeat'
import ShowBus from"@/components/BusSearch"
import BlurIn from "@/components/magicui/blur-in";
export default async function Home() {
      const session =await getServerSession(Next_AUTH_CONFIG);
      
  
  return (
    <>
    <Sidebar/>
    <NavbarDemo/>

   
   
   
    <main className="flex h-100vh overflow-hidden flex-row items-center justify-between p-24 gap-9">



     <ShowBus/>
    
  
    </main>

    </>
  );
}
