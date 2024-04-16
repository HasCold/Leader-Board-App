"use server";

import { PlayerInfoProps } from "../types";

export default async function addPlayerAction(playerInfo: PlayerInfoProps){
    const response = await fetch('/prod/api/addPlayer', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({playerInfo})
    });

    return response;
}