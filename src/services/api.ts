import { Prompt, Result } from "@/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getMatchup = async () =>
  fetch(`${API_URL}/matchup`).then(
    (res) => res.json() as Promise<Prompt[] | { winner: Prompt }>
  );

export const vote = async (id: number) =>
  fetch(`${API_URL}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ winner_id: id }),
  }).then((res) => res.json() as Promise<Result[]>);

export const resetTournament = async () =>
  fetch(`${API_URL}/reset`, {
    method: "POST",
  }).then((res) => res.json() as Promise<Prompt[]>);

export const getResults = async () =>
  fetch(`${API_URL}/results`).then((res) => res.json() as Promise<Result[]>);
