export const FADE_MS = 400;

export const calcProgressPercent = (progress: number) => Math.round(progress * 100);

export const isFinishedFromPercent = (progress: number) => progress >= 100;
