# Mazhar Lab

![Mazhar Lab](https://mazharmorshed.github.io/mazhar-lab/mazhar-lab-social-image.png)
A computer science reference implementation with interactive algorithm visualizations and WebAssembly-powered examples.

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-4.0.4-orange.svg)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-3.3.0-green.svg)](https://webassembly.org/)

## Features

- Interactive algorithm visualizations
- Native C++ implementations with WebAssembly
- Reference implementations of CS concepts
- Modern web interface

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Emscripten**
   ```bash
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   ./emsdk install latest
   ./emsdk activate latest
   source ./emsdk_env.sh
   ```

3. **Build and run**
   ```bash
   npm run build:wasm
   npm run dev
   ```

## Project Structure

```
/
├── src/
│   ├── cpp/                 # C++ source files
│   ├── components/         
│   │   ├── ui/             # UI components
│   │   └── visualizers/    # Visualizations
│   ├── lib/                # Utilities
│   ├── pages/              # Content pages
│   ├── styles/             # Global styles
│   └── types/              # TypeScript types
├── public/                 # Static assets
└── scripts/               # Build scripts
```

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:wasm` | Build WebAssembly modules |

## Development

### Prerequisites
- Node.js 18+
- Emscripten
- C++ compiler

### WebAssembly Development
1. Add C++ code in `src/cpp/`
2. Run `npm run build:wasm`
3. Import the `.wasm` module in TypeScript

Project Link: [https://github.com/mazharmorshed/mazhar-lab](https://github.com/mazharmorshed/mazhar-lab)
