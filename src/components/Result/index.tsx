import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";

import { Button } from "../Button";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
  resetGame: () => void;
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
  resetGame,
}: Props) {
  const textForTry = ["Wow!", "Super!", "Congrats!", "Nice!"];

  if (didGuess) {
    const copyResult = React.useCallback(() => {
      navigator.clipboard.writeText(scoreToEmoji(guesses));
    }, [guesses]);

    return (
      <>
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
        <Styled.SongTitle>
          The song is {todaysSolution.artist} -{" "}
          {todaysSolution.name}
        </Styled.SongTitle>
        <Styled.Tries>
          You guessed it in {currentTry} {currentTry === 1 ? 'try' : 'tries'}
        </Styled.Tries>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.ActionRow>
          <Button onClick={copyResult} variant="green">
            Copy results
          </Button>
          <Button onClick={resetGame} variant="green">
            Play again
          </Button>
        </Styled.ActionRow>
      </>
    );
  } else {
    return (
      <>
        <Styled.ResultTitle>Unfortunately, thats wrong</Styled.ResultTitle>
        <Styled.SongTitle>
          Todays song is {todaysSolution.artist} -{" "}
          {todaysSolution.name}
        </Styled.SongTitle>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.ActionRow>
          <Button onClick={resetGame} variant="green">
            Play again
          </Button>
        </Styled.ActionRow>
        <Styled.TimeToNext>
          Start a fresh round.
        </Styled.TimeToNext>
      </>
    );
  }
}
