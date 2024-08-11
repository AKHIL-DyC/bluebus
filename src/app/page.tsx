import Image from "next/image";
import Toggler from "@/components/Toggler"
import Alerter from "@/components/Alerter"
import StartLocation from "@/components/StartLocation"
import EndLocation from "@/components/EndLocation"
import DatePicker from "@/components/Datepicker"
import   {DrawerDemo}from "@/components/BuyPopup"
import  Signup from "@/components/Signup"

export default function Home() {
  return (
    <main className="flex h-100vh overflow-hidden flex-row items-center justify-between p-24 gap-9">
    
     <Alerter/>
     <StartLocation/>
     <EndLocation/>
     <DatePicker/>
     <DrawerDemo/>
    
    </main>
  );
}
