"use client";

import { Prompt, Result } from "@/models";
import * as api from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import { ResetButton } from "./components/reset-button";

export default function Home() {
  const [matchup, setMatchup] = useState<Prompt[]>([]);
  const [winner, setWinner] = useState<Prompt | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const fetchMatchup = useCallback(async () => {
    const matchup = await api.getMatchup();
    if ("winner" in matchup) {
      setWinner(matchup.winner);
      return;
    }
    setMatchup(matchup);
  }, []);

  useEffect(() => {
    fetchMatchup();
    api.getResults().then(setResults);
  }, [fetchMatchup]);

  const vote = useCallback(
    (id: number) => async () => {
      const results = await api.vote(id);
      setResults(results);
      fetchMatchup();
    },
    []
  );

  const reset = useCallback(async () => {
    const matchup = await api.resetTournament();
    setMatchup(matchup);
    setWinner(null);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      {!winner && (
        <div className="flex flex-col gap-4 md:flex-row">
          {matchup.map((p) => (
            <div
              key={p.id}
              className="border border-gray-400 p-4 rounded-xl flex-1"
            >
              <h3>Prompt {p.id}</h3>
              <p>
                <b>Prompt:</b> {p.text}
              </p>
              <p>
                <b>Response:</b> {p.response}
              </p>
              <button
                onClick={vote(p.id)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md font-bold"
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      )}

      {!!winner && (
        <div>
          <h1 className="font-bold text-2xl">Tournament Results</h1>
          <h3 className="font-bold mt-2 text-md">🏆 Best prompt</h3>
          <p className="opacity-70 text-sm">{winner.text}</p>
        </div>
      )}

      <div>
        <h1 className="font-bold text-lg">Rank</h1>
        <ul>
          {results.map((r) => (
            <li key={r.prompt.id} className="flex flex-col py-2">
              <p className="text-md">
                Prompt {r.prompt.id} - Score: {r.score}
              </p>
              <span className="text-sm opacity-70">{r.prompt.text}</span>
            </li>
          ))}
        </ul>
        <ResetButton onReset={reset} />
      </div>
    </div>
  );
}
