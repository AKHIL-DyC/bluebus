"use client";

import React, { useEffect } from 'react';
import Toggler from "@/components/Toggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { who } from "@/app/store/atoms/who";
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from './ui/button';
const SidebarContent = () => {
  const [whos,setwho] = useRecoilState(who);
  const { data: session } = useSession(); // Access session directly

  useEffect(() => {
    console.log("Recoil Value:", whos);
    console.log("Session Data:", session); // Log the session data here
    setwho(session?.user?.role)
  }, [session]);

  return (
    <div style={{ display: 'flex', position: 'fixed', top: '3vh', gap: '2vh', right: '4vw',height:"10vh"}}>
      <Toggler />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div style={{display:"flex",flexDirection:"column"}}>
        <Button  variant={'outline'}  onClick={() => signIn()}>Signin</Button>
        <Button  variant={'destructive'}   onClick={() => signOut()}>Sign out</Button>
        <h3 style={{color:"white"}}>{JSON.stringify(session?.user?.email)}</h3>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <RecoilRoot>
      <SidebarContent />
    </RecoilRoot>
  );
};

export default Sidebar;
