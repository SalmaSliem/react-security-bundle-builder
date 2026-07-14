export default function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  compact = false,
  ariaLabel = 'Quantity',
}) {
  const update = (nextValue) => {
    const bounded = Math.max(min, Math.min(max, nextValue));
    onChange(bounded);
  };

  return (
    <div
      className={`quantity-stepper ${
        compact ? 'quantity-stepper--compact' : ''
      }`}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        aria-label={`Decrease ${ariaLabel}`}
        onClick={() => update(value - 1)}
        disabled={value <= min}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${ariaLabel}`}
        onClick={() => update(value + 1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
