
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
import BUsModel from "@/components/BusModel"
export default async function Home() {
      const session =await getServerSession(Next_AUTH_CONFIG);
      
  
  return (
    <>
    <Sidebar/>
    <NavbarDemo/>

   
   
   
   

    <div>
    <BUsModel/>
    </div>
  
     <ShowBus/>
    
  
    

    </>
  );
}
