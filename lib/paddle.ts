import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddle: Paddle | undefined;

export async function getPaddle(): Promise<Paddle | undefined> {
  if (paddle) return paddle;
  paddle = await initializePaddle({
    environment: "production",
    token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
  });
  return paddle;
}

export const PRICE_IDS = {
  monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY!,
  annual: process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL!,
  lifetime: process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFETIME!,
};
