"use client";

import React from 'react'
import addPlayerAction from './actions/actions';

const page = () => {

  const addPlayer = async () => {
    const num = Math.round(Math.random());

    const payLoad = {
      playerId: num,
      playerNum: `Gamer ${num}`,
      score: 0,
      createdOn: new Date().toISOString()
    }

    const res = await addPlayerAction(payLoad);
    const data = await res.json(); 
    console.log("Data: -", data);
  }

  return (
    <div className='flex gap-4 flex-col'>
      <div className='flex bg-gradient-to-t from-gray-400 to-yellow-400 p-4 font-bold text-white'>
        <h1>Real Time Leaderboard</h1>
      </div>
        
        <div className='p-4 flex flex-col gap-5'>
        <button className="bg-red-500 p-3 font-bold text-white self-start text-center" onClick={addPlayer}>Add Player</button>
        <div className='flex flex-col w-1/4 gap-3'>
          <div className='flex gap-3 border-solid border-b-2 font-bold p-2'>
            <div>Name</div>
            <div>Roll Dice</div>
          </div>
          <div className="flex justify-between font-bold border-solid border-b-2 p-3">
            <div className='self-center'>Gamer 1</div>
            <button className="bg-green-500 p-3 font-bold text-white">Play</button>
          </div>
          <div className="flex justify-between font-bold border-solid border-b-2 p-3">
            <div className='self-center'>Gamer 2</div>
            <button className="bg-green-500 p-3 font-bold text-white">Play</button>
          </div>
          <div className="flex justify-between font-bold border-solid border-b-2 p-3">
            <div className='self-center'>Gamer 3</div>
            <button className="bg-green-500 p-3 font-bold text-white">Play</button>
          </div>
          <div className="flex justify-between font-bold border-solid border-b-2 p-3">
            <div className='self-center'>Gamer 4</div>
            <button className="bg-green-500 p-3 font-bold text-white">Play</button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default page