import React, { useEffect } from 'react'

function VotersList({votingSystem}) {

  useEffect(() =>{
    //getVotersList();
  },[])

  const getVotersList = async () => {
   
    //const voters = await votingSystem.getVotersList();
    
    const voters = await (await votingSystem.getVotersList()).wait()
    console.log('Voters',voters);
  }

  return (
    <div>VotersList</div>
  )
}

export default VotersList