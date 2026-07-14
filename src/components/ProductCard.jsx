import QuantityStepper from './QuantityStepper';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ProductCard({
  product,
  cardIndex,
  activeVariantId,
  setActiveVariant,
  getQuantity,
  setQuantity,
  isSelected,
}) {
  const hasVariants = product.variants.length > 0;
  const activeVariant =
    product.variants.find((variant) => variant.id === activeVariantId) ??
    product.variants[0];
  const variantId = activeVariant?.id ?? 'default';
  const displayedProductImage = activeVariant?.productImage || product.image;
  const quantity = getQuantity(product.id, variantId);
  const maxQuantity = product.maxQuantity ?? 99;

  const selectProduct = () => {
    if (quantity === 0) {
      setQuantity(product.id, variantId, 1);
    }
  };

  const handleCardClick = (event) => {
    const clickedElement = event.target;

    if (clickedElement.closest('button, a, input, select, textarea')) {
      return;
    }

    selectProduct();
  };

  return (
    <article
      className={`product-card product-card--${cardIndex ?? 0} ${
        isSelected ? 'product-card--selected' : ''
      }`}
      onClick={handleCardClick}
    >
      {product.badge && (
        <span className="discount-badge">{product.badge}</span>
      )}

      <div className="product-image-wrap">
        <img
          className="product-image"
          src={`/assets/${displayedProductImage}`}
          alt={`${product.name}${activeVariant?.label ? ` ${activeVariant.label}` : ''}`}
        />
      </div>

      <div className="product-copy">
        <h3>{product.name}</h3>
        <p>
          {product.description}{' '}
          <a href="#learn-more" onClick={(event) => event.preventDefault()}>
            Learn More
          </a>
        </p>
      </div>

      {hasVariants && (
        <div className="variant-row" aria-label={`${product.name} variants`}>
          {product.variants.map((variant) => {
            const isActive = variant.id === variantId;

            return (
              <button
                key={variant.id}
                type="button"
                className={`variant-chip ${
                  isActive ? 'variant-chip--active' : ''
                }`}
                onClick={() => setActiveVariant(product.id, variant.id)}
                aria-pressed={isActive}
              >
                <img
                  src={`/assets/${variant.swatchImage}`}
                  alt=""
                  className="variant-swatch-image"
                  aria-hidden="true"
                />
                {variant.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="product-card-footer">
        <QuantityStepper
          value={quantity}
          max={maxQuantity}
          onChange={(nextQuantity) =>
            setQuantity(product.id, variantId, nextQuantity)
          }
          ariaLabel={`${product.name} quantity`}
        />

        <div className="price-block">
          {product.compareAt !== undefined && (
            <span className="compare-price">
              {money.format(product.compareAt)}
            </span>
          )}
          <span className="active-price">{money.format(product.price)}</span>
        </div>
      </div>
    </article>
  );
}
