"use client";

interface Props {
  priceId: string;
  label: string;
  className?: string;
}

export function CheckoutButton({ label, className }: Props) {
  return (
    <button
      disabled
      className={`${className} opacity-60 cursor-not-allowed`}
    >
      Coming Soon
    </button>
  );
}
