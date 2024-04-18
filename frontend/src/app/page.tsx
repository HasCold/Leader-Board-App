"use client";

import React, { useEffect, useState } from 'react'
import {addPlayerAction, processDataAction } from './actions/actions';
import { PlayerInfoProps } from './types';

const Page = () => {

  const [playerInfo, setPlayerInfo] = useState<PlayerInfoProps[]>();

  const addPlayer = async () => {

    const num = Math.round(Math.random() * 100);
    const payLoad = {
      playerId: num,
      playerName: `Gamer ${num}`,
      score: 0,
      createdOn: new Date().toISOString()
    }

    const data = await addPlayerAction(payLoad);
    if(data){
      setPlayerInfo([
        ...playerInfo || [],
        data
      ]);
    }
  }

  const processData = async (player: PlayerInfoProps) => {
    const payLoad = {
      playerId: player.playerId,
      score: Math.round(Math.random() * 100)
    }

    const data = await processDataAction(payLoad);
    if(data){
      setPlayerInfo([
        ...playerInfo || [],
        data
      ]);
    }
  }

  useEffect(() => {
    if(playerInfo){
      console.log("PlayerInfo", playerInfo[0]);
    }

  }, [playerInfo]);

  return (
    <div className='flex gap-4 flex-col'>
      <div className='flex bg-gradient-to-t from-gray-400 to-yellow-400 p-4 font-bold text-white'>
        <h1>Real Time Leaderboard</h1>
      </div>
        
        <div className='p-4 flex flex-col gap-5'>
        <button className="bg-red-500 p-3 font-bold text-white self-start text-center" onClick={addPlayer}>Add Player</button>
        <div className='flex flex-col w-1/4 gap-3'>
          <div className='flex justify-between gap-3 border-solid border-b-2 font-bold p-2'>
            <div>Name</div>
            <div>Roll Dice</div>
          </div>
          {
            playerInfo && playerInfo.map((player, index) => (
              <div key={index} className="flex justify-between font-bold border-solid border-b-2 p-3">
                <div className="self-center">{player.playerName}</div>
                <button 
                className="bg-red-500 p-3 font-bold text-white"
                onClick={() => processData(player)}
                >
                Play
                </button>
              </div>
            ))
          }
        </div>
        </div>

        <div className="p-4 flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="flex border-solid border-b-2 font-bold justify-between p-3">
            <div className="basis-1/4">Player ID</div>
            <div className="basis-1/4">Player Name</div>
            <div className="basis-1/4">Score</div>
            <div className="basis-1/4">CreatedOn</div>
          </div>
          {
            playerInfo && playerInfo.map((player, index) => (
              <div key={index} className="flex justify-between font-bold border-solid border-b-2">
                <div className="basis-1/4 self-center p-3">{player.playerId}</div>
                <div className="basis-1/4 self-center p-3">{player.playerName}</div>
                <div id={player?.playerId.toString()} className="basis-1/4 self-center p-3">{player.score}</div>
                <div className="basis-1/4 self-center p-3">{player.createdOn}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Page;