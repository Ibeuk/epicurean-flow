# Epicurean Flow

A chef-led culinary platform, digital cookbook showcase, masterclasses, and gastronomy experience for Chef Eliane Muskus, powered by Wix Headless eCommerce.

## Features

- **Editorial Luxury Design**: Tailored serif & sans typography (Cormorant Garamond & Inter), warm ivory palette with gold accents, and fluid layouts.
- **Wix Headless Commerce**: Native integration with Wix Stores and eCommerce (`@wix/sdk`, `@wix/stores`, `@wix/ecom`).
- **Interactive Cart Drawer**: Real-time cart state with direct checkout routing to Wix's secure hosted payment gateway.
- **Standalone Embed Bundle**: Includes `wix-bundle.html` for direct embedding into Wix visual editors.

## Getting Started

Open `index.html` in your browser, or run a local static server:

```bash
npx serve .
```

## Structure

```
├── css/
│   ├── variables.css      # Design tokens, color palette, typography
│   ├── base.css           # Global resets and typography hierarchy
│   ├── layout.css         # Grid layouts, section padding, containers
│   ├── components.css     # Navigation, product cards, cart drawer, forms
│   ├── animations.css     # Scroll reveals, micro-interactions
│   └── responsive.css     # Mobile, tablet, desktop breakpoints
├── js/
│   ├── products.js        # Wix Headless integration & cart drawer logic
│   ├── navigation.js      # Sticky header & mobile menu drawer
│   ├── animations.js      # Scroll reveals and intersection observers
│   └── main.js            # General DOM interactions & form handling
├── index.html             # Main storefront entry point
├── wix-bundle.html        # Self-contained single-file bundle
└── bundle.py              # Script to regenerate wix-bundle.html
```
