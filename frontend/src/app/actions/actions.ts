"use server";

import { PlayerInfoProps } from "../types";

export default async function addPlayerAction(playerInfo: PlayerInfoProps){
    const response = await fetch('http://localhost:4000/api/prod/addPlayer', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerInfo)
    });

    const data = await response.json();
    return {data};
}