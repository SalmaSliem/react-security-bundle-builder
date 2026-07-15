import { useMemo, useState } from 'react';

import AccordionStep from './components/AccordionStep';
import ReviewPanel from './components/ReviewPanel';

const STORAGE_KEY = 'security-bundle-builder-js-v1';

const inventoryKey = (productId, variantId = 'default') =>
  `${productId}::${variantId}`;

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getDefaultOpenStepId() {
  if (typeof window === 'undefined') {
    return 'cameras';
  }

  return window.matchMedia('(max-width: 767px)').matches ? null : 'cameras';
}

function createInitialConfiguration() {
  return {
    openStepId: getDefaultOpenStepId(),
    activeVariants: {
      'wyze-cam-v4': 'white',
      'wyze-cam-pan-v3': 'white',
      'wyze-cam-floodlight-v2': 'white',
      'wyze-battery-cam-pro': 'white',
    },
    quantities: {
      'wyze-cam-v4::white': 1,
      'wyze-cam-pan-v3::white': 2,
      'cam-unlimited::default': 1,
      'motion-sensor::default': 2,
      'sense-hub::default': 1,
      'microsd-256::default': 2,
    },
  };
}

function readSavedConfiguration() {
  const fallback = createInitialConfiguration();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return fallback;
    }

    const parsed = JSON.parse(stored);

    if (!isRecord(parsed)) {
      return fallback;
    }

    const activeVariants = isRecord(parsed.activeVariants)
      ? Object.fromEntries(
          Object.entries(parsed.activeVariants).filter(
            ([, value]) => typeof value === 'string',
          ),
        )
      : {};

    const quantities = isRecord(parsed.quantities)
      ? Object.fromEntries(
          Object.entries(parsed.quantities).filter(
            ([, value]) =>
              typeof value === 'number' &&
              Number.isFinite(value) &&
              value > 0,
          ),
        )
      : fallback.quantities;

    return {
      openStepId:
        typeof parsed.openStepId === 'string' || parsed.openStepId === null
          ? parsed.openStepId
          : fallback.openStepId,
      activeVariants: {
        ...fallback.activeVariants,
        ...activeVariants,
      },
      quantities,
    };
  } catch {
    return fallback;
  }
}

export default function App({ catalog }) {
  const [configuration, setConfiguration] = useState(readSavedConfiguration);
  const [saveMessage, setSaveMessage] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const getQuantity = (productId, variantId = 'default') =>
    configuration.quantities[inventoryKey(productId, variantId)] ?? 0;

  const setQuantity = (productId, variantId, quantity) => {
    const key = inventoryKey(productId, variantId);

    setConfiguration((current) => {
      const nextQuantities = { ...current.quantities };

      if (quantity <= 0) {
        delete nextQuantities[key];
      } else {
        nextQuantities[key] = quantity;
      }

      return {
        ...current,
        quantities: nextQuantities,
      };
    });
  };

  const setActiveVariant = (productId, variantId) => {
    setConfiguration((current) => ({
      ...current,
      activeVariants: {
        ...current.activeVariants,
        [productId]: variantId,
      },
    }));
  };

  const isProductSelected = (product) => {
    if (product.variants.length === 0) {
      return getQuantity(product.id, 'default') > 0;
    }

    return product.variants.some(
      (variant) => getQuantity(product.id, variant.id) > 0,
    );
  };

  const selectedCountForStep = (step) =>
    step.products.filter(isProductSelected).length;

  const reviewGroups = useMemo(() => {
    const reviewOrder = ['cameras', 'sensors', 'protection', 'plan'];
    const orderedSteps = [...catalog.steps].sort(
      (first, second) =>
        reviewOrder.indexOf(first.id) - reviewOrder.indexOf(second.id),
    );

    return orderedSteps
      .map((step) => {
        const items = [];

        step.products.forEach((product) => {
          if (product.variants.length === 0) {
            const variantId = 'default';
            const quantity =
              configuration.quantities[inventoryKey(product.id, variantId)] ?? 0;

            if (quantity > 0) {
              items.push({
                key: inventoryKey(product.id, variantId),
                productId: product.id,
                variantId,
                name: product.name,
                image: product.image,
                price: product.price,
                compareAt: product.compareAt,
                quantity,
                maxQuantity: product.maxQuantity,
              });
            }

            return;
          }

          product.variants.forEach((variant) => {
            const quantity =
              configuration.quantities[
                inventoryKey(product.id, variant.id)
              ] ?? 0;

            if (quantity <= 0) {
              return;
            }

            items.push({
              key: inventoryKey(product.id, variant.id),
              productId: product.id,
              variantId: variant.id,
              name: product.name,
              variantLabel: variant.label,
              image: variant.productImage || product.image,
              price: product.price,
              compareAt: product.compareAt,
              quantity,
              maxQuantity: product.maxQuantity,
            });
          });
        });

        const title =
          step.id === 'protection'
            ? 'Accessories'
            : step.id.charAt(0).toUpperCase() + step.id.slice(1);

        return {
          id: step.id,
          title,
          mobileTitle: step.id === 'plan' ? 'Home Monitoring Plan' : title,
          items,
        };
      })
      .filter((group) => group.items.length > 0);
  }, [configuration.quantities]);

  const totals = useMemo(() => {
    const items = reviewGroups.flatMap((group) => group.items);

    return items.reduce(
      (accumulator, item) => {
        accumulator.total += item.price * item.quantity;
        accumulator.compareTotal +=
          (item.compareAt ?? item.price) * item.quantity;
        return accumulator;
      },
      { total: 0, compareTotal: 0 },
    );
  }, [reviewGroups]);

  const openStepIndex = catalog.steps.findIndex(
    (step) => step.id === configuration.openStepId,
  );

  const openStep = (stepId) => {
    setConfiguration((current) => ({
      ...current,
      openStepId: current.openStepId === stepId ? null : stepId,
    }));
  };

  const goToNextStep = () => {
    const nextStep = catalog.steps[openStepIndex + 1];

    if (nextStep) {
      setConfiguration((current) => ({
        ...current,
        openStepId: nextStep.id,
      }));
      return;
    }

    document.querySelector('.review-panel')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const saveConfiguration = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    setSaveMessage('Your system has been saved on this device.');
    window.setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <main className="page-shell">
      <h1 className="page-title">Let’s get started!</h1>

      <div className="builder-layout">
        <div className="builder-column">
          {catalog.steps.map((step, index) => (
            <div data-step-id={step.id} key={step.id}>
              <AccordionStep
                step={step}
                index={index}
                isOpen={configuration.openStepId === step.id}
                selectedCount={selectedCountForStep(step)}
                onToggle={() => openStep(step.id)}
                onNext={goToNextStep}
                activeVariants={configuration.activeVariants}
                setActiveVariant={setActiveVariant}
                getQuantity={getQuantity}
                setQuantity={setQuantity}
                isProductSelected={isProductSelected}
              />
            </div>
          ))}
        </div>

        <ReviewPanel
          groups={reviewGroups}
          compareTotal={totals.compareTotal + 5.99}
          total={totals.total}
          savings={totals.compareTotal + 5.99 - totals.total}
          setQuantity={setQuantity}
          onSave={saveConfiguration}
          onCheckout={() => setCheckoutOpen(true)}
          saveMessage={saveMessage}
        />
      </div>

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="confirmation-modal" role="dialog" aria-modal="true">
            <h2>Your prototype checkout is ready.</h2>
            <p>
              This placeholder keeps the focus on the builder and live review
              behavior, exactly as the exercise allows.
            </p>
            <button type="button" onClick={() => setCheckoutOpen(false)}>
              Back to builder
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
