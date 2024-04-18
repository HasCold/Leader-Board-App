export type PlayerInfoProps = {
    playerId: number;
    playerName: string;
    score: number;
    createdOn: string;
}

export type ProcessDataProps = Pick<PlayerInfoProps, "playerId" | "score"> 