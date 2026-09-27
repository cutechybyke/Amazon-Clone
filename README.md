# Amazon Clone

[![Browser Test CI](https://github.com/cutechybyke/Amazon-Clone/actions/workflows/ci.yml/badge.svg)](https://github.com/cutechybyke/Amazon-Clone/actions/workflows/ci.yml)

A front-end e-commerce project that recreates core shopping interactions including products, cart state, checkout calculations and delivery options.

## Highlights

- Product browsing and cart interactions
- Persistent cart state using localStorage
- Delivery-option updates
- Checkout/order summary logic
- Jasmine unit tests
- Headless browser verification with Playwright
- GitHub Actions CI using Chromium

## Stack

JavaScript · HTML · CSS · Jasmine · Playwright

## Run locally

Clone the repository and serve the project through a local HTTP server so ES modules load correctly.

For the automated browser test environment:

```bash
npm install
npx playwright install chromium
npm test
```

## Testing

The existing Jasmine browser suite is executed headlessly through Playwright in CI. Coverage includes cart persistence, malformed localStorage recovery, product removal, delivery-option updates and checkout-related behavior.

## Engineering improvements

Cart state handling was hardened against malformed browser storage and missing products, while network failures are surfaced instead of silently appearing successful. The follow-up test work converted the browser-based Jasmine suite into an automated GitHub Actions check.
