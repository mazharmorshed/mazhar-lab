#!/bin/bash
set -e

# Save current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Directories
CPP_DIR="$ROOT_DIR/packages/mlab"
WASM_DIR="$ROOT_DIR/packages/site/public/wasm"
BUILD_DIR="$CPP_DIR/build-wasm"

# Create necessary directories
mkdir -p $WASM_DIR
mkdir -p $BUILD_DIR

# Navigate to build directory
cd $BUILD_DIR

# Configure CMake for Emscripten
emcmake cmake .. \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_TOOLCHAIN_FILE=$EMSDK/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake \
    -DBUILD_CLI=OFF \
    -DBUILD_WASM=ON

# Build the project
emmake cmake --build .

# Copy WASM files to public directory
mv $BUILD_DIR/mlab_core.js $WASM_DIR/mlab_core.js
mv $BUILD_DIR/mlab_core.wasm $WASM_DIR/mlab_core.wasm

echo "WASM build complete!"
