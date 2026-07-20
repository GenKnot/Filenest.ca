"use client";

import { useState } from "react";
import { getPaddle } from "../../lib/paddle";

interface Props {
  priceId: string;
  label: string;
  className?: string;
}

export function CheckoutButton({ priceId, label, className }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const paddle = await getPaddle();
      await paddle?.Checkout.open({
        items: [{ priceId, quantity: 1 }],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Loading…" : label}
    </button>
  );
}
