export type PlayerInfoProps = {
    playerId: string;
    playerName: string;
    score: number;
    createdOn: string;
}

export type ProcessDataProps = Pick<PlayerInfoProps, "playerId" | "score"> 