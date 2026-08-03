import { songs } from "../constants";

const randomIndex = Math.floor(Math.random() * songs.length);

export const todaysSolution = songs[randomIndex];
