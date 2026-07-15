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

## Getting Started

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

If port `5173` is already in use, Vite will automatically select another available port.

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

## Key Functionality

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

## Limitations

- The API must be running for the client to load the catalog.
- Saved configurations are browser-specific and are not synchronized across devices.
- Authentication, database storage, and payment processing are outside the project scope.

## Repository

https://github.com/SalmaSliem/react-security-bundle-builder