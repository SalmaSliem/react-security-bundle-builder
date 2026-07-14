import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "./ProductCard";

const iconMap = {
  camera: "/assets/logo1.png",
  shield: "/assets/logo2.png",
  sensor: "/assets/logo3.png",
  "plus-shield": "/assets/logo4.png",
};

export default function AccordionStep({
  step,
  index,
  totalSteps = 4,
  isOpen = false,
  selectedCount = 0,
  onToggle,
  onNext,
  activeVariants = {},
  setActiveVariant,
  getQuantity,
  setQuantity,
  isProductSelected,
}) {
  const stepIcon = iconMap[step.icon];
  const bodyId = `step-body-${step.id}`;
  const headerId = `step-header-${step.id}`;
  const products = step.products ?? [];

  return (
    <section
      className={[
        "accordion-step",
        `accordion-step--${step.id}`,
        isOpen
          ? "accordion-step--open"
          : "accordion-step--closed",
      ].join(" ")}
      data-step-id={step.id}
      data-step-index={index}
    >
      <button
        id={headerId}
        type="button"
        className="step-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <span className="step-label-group">
          <span className="step-kicker">
            STEP {index + 1} OF {totalSteps}
          </span>

          <span className="step-title-row">
            {stepIcon && (
              <img
                src={stepIcon}
                alt=""
                className="step-title-icon"
                aria-hidden="true"
              />
            )}

            <span className="step-title">{step.title}</span>
          </span>
        </span>

        <span
          className={`step-state ${
            selectedCount > 0 ? "step-state--selected" : ""
          }`}
        >
          {selectedCount > 0 && (
            <span className="step-selected-count">
              {selectedCount} selected
            </span>
          )}

          <span className="step-chevron" aria-hidden="true">
            {isOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </span>
        </span>
      </button>

      {isOpen && (
        <div
          id={bodyId}
          className={`step-body step-body--${step.id}`}
          role="region"
          aria-labelledby={headerId}
        >
          <div
            className={`product-grid ${
              step.id === "cameras"
                ? "product-grid--cameras"
                : `product-grid--${step.id}`
            }`}
          >
            {products.map((product, productIndex) => {
              const defaultVariantId =
                product.variants?.[0]?.id ?? "default";

              const activeVariantId =
                activeVariants[product.id] ??
                defaultVariantId;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cardIndex={productIndex}
                  activeVariantId={activeVariantId}
                  setActiveVariant={setActiveVariant}
                  getQuantity={getQuantity}
                  setQuantity={setQuantity}
                  isSelected={isProductSelected(product)}
                />
              );
            })}
          </div>

          {step.nextLabel && (
            <button
              type="button"
              className="next-button"
              onClick={onNext}
            >
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}