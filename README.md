# React JavaScript Bundle Builder

A responsive React bundle-builder application implemented from the supplied Figma designs.

The application allows shoppers to configure a home-security system, select product variants, change quantities, review their selections, calculate totals, and save their configuration for a later visit.

## Tech Stack

- React
- JavaScript and JSX
- Vite
- CSS
- Lucide React icons
- Local JSON data
- Browser `localStorage`

## Features

- Responsive layouts matching the supplied Figma frames:
  - iPhone 13 & 14 — 390 × 1252
  - Frame 1735 — 1440 × 1077
  - Frame 1736 — 1440 × 1606
- Data-driven product rendering from a local JSON source.
- Expandable and collapsible accordion steps.
- Step 1 is open on initial load.
- Product variant selection.
- Separate quantity tracking for every product variant.
- Quantity steppers on product cards and review-panel items.
- Synchronized quantities between the builder and review panel.
- Live selected-product counters for every step.
- Live review-panel updates.
- Automatic total and savings calculations.
- Selected and unselected product-card states.
- Client-side persistence using `localStorage`.

## Requirements

Before running the project, make sure the following are installed:

- Node.js
- npm
- Git

## Run Locally

Clone the repository:

```bash
git clone https://github.com/SalmaSliem/react-security-bundle-builder.git
```

Move into the project folder:

```bash
cd react-security-bundle-builder
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Vite will display a local URL in the terminal, usually:

```text
http://localhost:5173/
```

If port `5173` is already in use, Vite will automatically select another available port.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files will be created inside the `dist` folder.

## Clean-Clone Verification

The project has been tested from a clean GitHub clone using:

```bash
git clone https://github.com/SalmaSliem/react-security-bundle-builder.git
cd react-security-bundle-builder
npm ci
npm run build
npm run dev
```

The clean-clone installation and production build completed successfully.

## Data Source

All product, pricing, variant, step, image, and quantity-limit data is stored in:

```text
src/data/catalog.json
```

The product interface is rendered from this JSON source instead of using hardcoded markup for each product.

A backend was not added because serving the JSON through an API was described as an optional bonus.

## Product and Variant Behavior

Products with variant options display selectable variant chips.

Each variant maintains its own independent quantity.

Example:

1. Select the White variant and set its quantity to `2`.
2. Switch to the Black variant.
3. The product-card stepper displays the Black quantity, initially `0`.
4. The White quantity remains stored as `2`.
5. Every variant with a quantity greater than zero appears as a separate line in the review panel.

Products without variants use a single default quantity and do not display a variant selector.

Clicking an unselected product card adds one unit of its currently active variant.

Returning a quantity to `0` removes that product or variant from the review panel.

The selected counter represents the number of distinct selected products in the step, not the total number of units.

## Quantity Synchronization

Quantity steppers are available on both:

- Product cards
- Review-panel lines

Both locations use the same application state.

Changing a quantity from the product card immediately updates the review panel.

Changing a quantity from the review panel immediately updates the corresponding product card.

## Accordion Behavior

- Steps can be expanded and collapsed.
- Step 1 is open on initial load.
- The selected counter updates based on the number of distinct selected products in each step.
- The next-step button moves the shopper through the configuration flow.

## Review Panel

The review panel updates immediately when:

- A product is added.
- A product is removed.
- A product variant is selected.
- A quantity changes from a product card.
- A quantity changes from the review panel.

The following values are recalculated from the current configuration:

- Total price
- Comparison total
- Monthly financing amount
- Savings amount

## Persistence

The **Save my system for later** action stores the shopper's current configuration in browser `localStorage`.

The saved configuration includes:

- Selected products
- Product quantities
- Separate quantities for each variant
- Active variants
- Accordion state

The saved configuration is restored when the shopper:

- Reloads the page
- Closes and reopens the application
- Returns later using the same browser and website origin

The storage key used by the application is:

```text
security-bundle-builder-js-v1
```

Because browser storage is used, saved configurations are specific to the current browser and device.

## Responsive Layouts

### Frame 1735 — 1440 × 1077

- Base desktop layout.
- Builder displayed on the left.
- Review panel displayed on the right.
- Camera products displayed in two columns.
- The fifth camera card is centered.
- Product prices are stacked vertically.

### Frame 1736 — 1440 × 1606

Activated by:

```css
@media (min-width: 1200px) and (min-height: 1300px)
```

- Builder displayed at full width.
- Five camera cards displayed in one row.
- Camera cards use a vertical layout.
- Review panel displayed underneath the builder.
- Review panel uses a two-column desktop layout.
- Product prices appear beside each other where required.

### Mobile Layout — iPhone 13 & 14

Activated by:

```css
@media (max-width: 767px)
```

- Mobile page heading displayed.
- Accordion steps use the full viewport width.
- Product cards stack vertically.
- Review panel is displayed below the steps.
- Review items, totals, guarantee content, and checkout actions are rearranged for narrow screens.
- The layout remains usable on smaller phone widths.

## Project Structure

```text
src/
├── components/
│   ├── AccordionStep.jsx
│   ├── ProductCard.jsx
│   ├── QuantityStepper.jsx
│   └── ReviewPanel.jsx
├── data/
│   └── catalog.json
├── App.jsx
├── main.jsx
└── styles.css
```

Other important project files:

```text
public/
index.html
package.json
package-lock.json
vite.config.js
README.md
.gitignore
```

## Decisions and Tradeoffs

- Product data is stored in a local JSON file because a backend was optional.
- Application state is managed inside `App.jsx` because the project is small and does not require an external state-management library.
- `localStorage` is used for persistence because it satisfies the requirement without requiring authentication or a backend.
- CSS media queries are based on the supplied Figma frames while still allowing the interface to adapt between those exact dimensions.
- Lucide React is used for interface icons.
- The checkout action is a prototype interaction only.

## Known Limitations

- Saved configurations are available only on the same browser and device.
- Clearing browser storage removes the saved configuration.
- No backend is included.
- No authentication or user accounts are included.
- No payment service or real checkout integration is included.
- The application does not synchronize saved systems across multiple browsers or devices.

## Repository

Public GitHub repository:

```text
https://github.com/SalmaSliem/react-security-bundle-builder
```