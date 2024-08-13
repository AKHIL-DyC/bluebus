import React from 'react'
import Toggler from"@/components/Toggler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Sidebar = () => {
  return (
    <div style={{display:'flex',position:'fixed',top:'3vh',gap:'2vh',right:'4vw'}}>
        <Toggler/>
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

    </div>
  )
}

export default Sidebar