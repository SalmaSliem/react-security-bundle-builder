# React Security Bundle Builder

A responsive React application for configuring a home-security bundle from product, variant, and pricing data.

The implementation follows the supplied Figma designs and includes a lightweight Express API as the optional backend bonus.

## Tech Stack

- React
- JavaScript / JSX
- Vite
- Express
- CSS
- Lucide React
- Local JSON data
- Browser `localStorage`

## Run instructions

### Prerequisites

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/SalmaSliem/react-security-bundle-builder.git
cd react-security-bundle-builder
npm ci
```

### Development

```bash
npm run dev
```

This starts:

- React client: `http://localhost:5173`
- Express API: `http://localhost:3001`


### Production Build

```bash
npm run build
```

To preview the production build, start the API first:

```bash
npm run api
```

Then, in another terminal:

```bash
npm run preview
```
## Clean-Clone Verification

To verify the repository exactly as a reviewer would receive it, clone it into a new folder and run:

```bash
git clone https://github.com/SalmaSliem/react-security-bundle-builder.git clean-bundle-test
cd clean-bundle-test
npm ci
npm run build
npm run dev
```

Then verify:

- The React application loads from the Vite URL shown in the terminal.
- `http://localhost:3001/api/health` returns a successful response.
- `http://localhost:3001/api/catalog` returns the catalog JSON.
- Product selection, variants, quantities, totals, and persistence work correctly.

## Available Scripts

```bash
npm run dev      # Start client and API
npm run client   # Start React client only
npm run api      # Start Express API only
npm run build    # Create production build
npm run preview  # Preview production build
```

## API

Catalog endpoint:

```text
GET http://localhost:3001/api/catalog
```

Health check:

```text
GET http://localhost:3001/api/health
```

The API reads from:

```text
src/data/catalog.json
```

The backend implementation is located in:

```text
server/index.cjs
```

## Key Features

- Data-driven product rendering
- Responsive desktop and mobile layouts
- Expandable and collapsible accordion steps
- Independent quantity tracking for each product variant
- Synchronized quantity controls between product cards and the review panel
- Live selected-product counters
- Live totals and savings calculations
- Persistent saved configurations using `localStorage`

## Variant Behavior

Each product variant maintains its own quantity.

Selecting another variant changes the quantity shown in the product card without removing quantities already assigned to other variants.

Every variant with a quantity greater than zero appears as a separate line in the review panel.

Products without variants use a single default quantity.

## Persistence

The **Save my system for later** action stores the current configuration in browser `localStorage`.

Saved data includes:

- Selected products
- Product and variant quantities
- Active variants
- Accordion state

Saved configurations are restored on later visits from the same browser profile and application origin.

## Responsive Designs

The implementation supports the supplied Figma frames:

- Frame 1735 — `1440 × 1077`
- Frame 1736 — `1440 × 1606`
- iPhone 13 & 14 — `390 × 1252`

## Project Structure

```text
server/
└── index.cjs

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

## Technical Decisions

- Product data is stored in JSON and served through a lightweight Express API.
- Application state is managed in React without an external state-management library.
- `localStorage` is used because persistence does not require authentication or a database.
- The checkout interaction is a prototype and does not process real payments.

## Limitations Notes

- The API must be running for the client to load the catalog.
- Saved configurations are browser-specific and are not synchronized across devices.
- The `N selected` counter remains visible on closed accordion steps in the desktop frames. Hiding it only for closed desktop steps is not completed.
- Authentication, database storage, and payment processing are outside the project scope.

## Repository

https://github.com/SalmaSliem/react-security-bundle-builder