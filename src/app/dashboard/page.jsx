import React from 'react'
import { getServerSession } from 'next-auth'
async function sessiongetter(){
        const session=await getServerSession()
        return session
}
const page = async() => {
    const sessions= await sessiongetter();
    console.log("in dash"+sessions)
  return (
           <>
                <div>{JSON.stringify(sessions.user.role)}</div>
           </> 
  )
}

export default page