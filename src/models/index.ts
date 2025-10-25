export type Prompt = {
    id: number;
    text: string;
    response: string;
}

export type Vote = {
    winnerId: number;
}

export type Result = {
    prompt: Prompt;
    score: number;
}