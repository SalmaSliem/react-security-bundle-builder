import { Bookmark, Truck } from 'lucide-react';

import QuantityStepper from './QuantityStepper';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ReviewPanel({
  groups,
  compareTotal,
  total,
  savings,
  setQuantity,
  onSave,
  onCheckout,
  saveMessage,
}) {
  const financing = total / 10;

  return (
    <aside className="review-panel">
      <div className="review-heading">
        <span className="review-kicker">REVIEW</span>

        <h2>Your security system</h2>

        <p>
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className="review-lines">
        {groups.length === 0 ? (
          <div className="empty-state">
            Choose products to build your system.
          </div>
        ) : (
          groups.map((group) => (
            <section
              className="review-group"
              key={group.id}
            >
              <h3>
                <span className="review-group-title-desktop">
                  {group.title}
                </span>

                <span className="review-group-title-mobile">
                  {group.mobileTitle || group.title}
                </span>
              </h3>
{group.items.map((item) =>
  group.id === 'plan' ? (
    <div
      className="review-plan-row"
      key={item.key}
    >
      <img
        className="review-plan-image"
        src={`/assets/${item.image}`}
        alt={item.name}
      />

      <div className="review-item review-item--plan">
        <div className="review-item-copy">
          <div className="review-item-name">
            <span>{item.name}</span>

            {item.variantLabel && (
              <small>{item.variantLabel}</small>
            )}
          </div>
        </div>

        <div className="review-item-controls review-item-controls--without-quantity">
          <div className="review-item-price">
            {item.compareAt !== undefined &&
              item.compareAt > item.price && (
                <span>
                  {money.format(
                    item.compareAt * item.quantity,
                  )}
                </span>
              )}

            <strong>
              {item.price === 0
                ? 'FREE'
                : money.format(
                    item.price * item.quantity,
                  )}
            </strong>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="review-item"
      key={item.key}
    >
      <img
        src={`/assets/${item.image}`}
        alt={item.name}
      />

      <div className="review-item-copy">
        <div className="review-item-name">
          <span>{item.name}</span>

          {item.variantLabel && (
            <small>{item.variantLabel}</small>
          )}
        </div>
      </div>

      <div className="review-item-controls">
        <QuantityStepper
          compact
          value={item.quantity}
          max={item.maxQuantity ?? 99}
          onChange={(nextQuantity) =>
            setQuantity(
              item.productId,
              item.variantId,
              nextQuantity,
            )
          }
          ariaLabel={`${item.name} quantity in review`}
        />

        <div className="review-item-price">
          {item.compareAt !== undefined &&
            item.compareAt > item.price && (
              <span>
                {money.format(
                  item.compareAt * item.quantity,
                )}
              </span>
            )}

          <strong>
            {item.price === 0
              ? 'FREE'
              : money.format(
                  item.price * item.quantity,
                )}
          </strong>
        </div>
      </div>
    </div>
  )
)}
            </section>
          ))
        )}
      </div>

      <div className="shipping-block">
        <div className="shipping-icon">
          <Truck
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </div>

        <div className="shipping-copy">
          Fast Shipping
        </div>

        <div className="shipping-pricing">
          <span>{money.format(5.99)}</span>
          <strong>FREE</strong>
        </div>
      </div>

      <div className="review-right">
        <div className="guarantee-area">
          <div className="guarantee-badge">
            <img
              src="/assets/guarantee-badge.png"
              alt="100% Wyze satisfaction guarantee"
              className="guarantee-badge-image"
            />
          </div>

          <div className="guarantee-copy">
            <h3>30-day hassle-free returns</h3>

            <p>
              If you're not totally in love with the product, we will refund
              you 100%.
            </p>
          </div>
        </div>

        <div className="totals-main">
          <div className="finance-pill">
            as low as {money.format(financing)}/mo
          </div>

          <div className="total-price-row">
            {compareTotal > total && (
              <span className="total-compare">
                {money.format(compareTotal)}
              </span>
            )}

            <strong>
              {money.format(total)}
            </strong>
          </div>
        </div>

        {savings > 0 && (
          <div className="savings-copy">
            Congrats! You're saving {money.format(savings)} on your security
            bundle!
          </div>
        )}

        <button
          className="checkout-button"
          type="button"
          onClick={onCheckout}
        >
          Checkout
        </button>

        <button
          className="save-link"
          type="button"
          onClick={onSave}
        >
          <Bookmark
            size={17}
            aria-hidden="true"
          />

          Save my system for later
        </button>

        {saveMessage && (
          <p
            className="save-message"
            role="status"
          >
            {saveMessage}
          </p>
        )}
      </div>
    </aside>
  );
}