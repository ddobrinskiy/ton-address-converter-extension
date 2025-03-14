# TON Address Converter Chrome Extension

A simple Chrome extension that allows you to convert TON (The Open Network) addresses between different formats.

## Features

- Convert TON addresses between different formats (HEX, Bounceable, Non-bounceable)
- Support for both Mainnet and Testnet addresses
- Convert public keys to wallet addresses
- Simple and intuitive interface with auto-focus

## Installation

Since this extension is not published to the Chrome Web Store, you need to load it manually:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click on "Load unpacked" and select the folder containing this extension
4. The extension should now be installed and visible in your browser toolbar

## Usage

1. Copy a TON address or public key to your clipboard
2. Click on the extension icon in your browser toolbar
3. The input field is automatically focused
4. Press Ctrl+V (or Cmd+V on Mac) to paste from your clipboard
5. The extension will automatically convert and display the address in various formats
6. Alternatively, you can manually enter a TON address or public key in the input field

## Supported Address Formats

- HEX format
- Mainnet Bounceable
- Mainnet Non-bounceable
- Testnet Bounceable
- Testnet Non-bounceable

## Technologies Used

- HTML, CSS, JavaScript
- TonWeb.js library for TON blockchain interactions
- Clipboard API for reading clipboard data 