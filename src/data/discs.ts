import bankRobberDisc from "@/assets/bank-robber-disc.webp";
import treasureHuntDisc from "@/assets/treasure-hunt-disc.webp";
import moneyShotDisc from "@/assets/money-shot-disc.webp";
import jailbreakDisc from "@/assets/jailbreak-disc.png";

export type DiscType = "driver" | "fairway" | "midrange" | "putter";

export interface Disc {
  id: number;
  name: string;
  imageSrc: string;
  /** Translation key for description — used with t() */
  descriptionKey: string;
  speed: number | string;
  glide: number | string;
  turn: number | string;
  fade: number | string;
  type: DiscType;
  isNewRelease: boolean;
}

const discs: Disc[] = [
  {
    id: 1,
    name: "Bank Robber",
    imageSrc: bankRobberDisc,
    descriptionKey: "disc.bankRobber.description",
    speed: 8,
    glide: 5,
    turn: -1,
    fade: 2,
    type: "fairway",
    isNewRelease: true,
  },
  {
    id: 2,
    name: "Treasure Hunt",
    imageSrc: treasureHuntDisc,
    descriptionKey: "disc.treasureHunt.description",
    speed: 12,
    glide: 6,
    turn: -1,
    fade: 3,
    type: "driver",
    isNewRelease: false,
  },
  {
    id: 3,
    name: "Money Shot",
    imageSrc: moneyShotDisc,
    descriptionKey: "disc.moneyShot.description",
    speed: 4,
    glide: 3,
    turn: 1,
    fade: 3,
    type: "putter",
    isNewRelease: false,
  },
  {
    id: 4,
    name: "Jailbreak",
    imageSrc: jailbreakDisc,
    descriptionKey: "disc.jailbreak.description",
    speed: "?",
    glide: "?",
    turn: "?",
    fade: "?",
    type: "driver",
    isNewRelease: true,
  },
];

export default discs;
