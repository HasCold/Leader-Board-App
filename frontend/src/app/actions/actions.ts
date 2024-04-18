"use server";

import { PlayerInfoProps, ProcessDataProps } from "../types";

export async function addPlayerAction(playerInfo: PlayerInfoProps){
    const response = await fetch('http://localhost:4000/api/prod/addPlayer', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerInfo)
    });

    const data = await response.json();
    return data.dataPlayer;
}

export async function processDataAction(payLoad: ProcessDataProps){
    const response = await fetch("http://localhost:4000/api/prod/processData", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payLoad) 
    });

    const data = await response.json();
    return data;
}