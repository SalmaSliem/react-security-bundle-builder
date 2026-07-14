# React JavaScript Bundle Builder

A responsive React bundle-builder application implemented from the supplied Figma designs.

The application allows shoppers to configure a home-security system, select product variants, change quantities, review their selections, calculate totals, and save their configuration for a later visit.

## Tech stack

- React
- JavaScript and JSX
- Vite
- CSS
- Lucide React icons
- Local JSON data
- Browser localStorage

## Features

- Responsive layouts matching the supplied desktop and mobile Figma frames. 
## (Iphone 13 & 14 - 390 x 1252) (frame 1736 - 1440 x 1606) ( frame 1735 - 1440 x 1077)
- Data-driven product rendering from a local JSON source.
- Expandable and collapsible accordion steps.
- Product variant selection.
- Separate quantity tracking for every product variant.
- Quantity steppers on product cards and review-panel items.
- Synchronized quantities between the builder and review panel.
- Live selected-product counters for every step.
- Live review-panel updates.
- Automatic total and savings calculations.
- Selected and unselected product-card states.
- Client-side persistence using localStorage.

## Run locally

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>