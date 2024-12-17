#!/bin/bash

set -e

CPP_DIR="src/cpp"
WASM_DIR="build"
PUBLIC_WASM_DIR="public/wasm"

# Create necessary directories
mkdir -p $WASM_DIR $PUBLIC_WASM_DIR

# Collect all .cpp files
cpp_files=""
for file in $(find $CPP_DIR -name '*.cpp'); do
    cpp_files="$cpp_files $file"
done

# Output directories
wasm_output_dir="$WASM_DIR"
public_output_dir="$PUBLIC_WASM_DIR"

mkdir -p $wasm_output_dir $public_output_dir

# Compile all C++ files into a single module
emcc $cpp_files -o $wasm_output_dir/lab.js \
    -s MODULARIZE \
    -s EXPORT_NAME="labModule" \
    -s ENVIRONMENT=web \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s INITIAL_MEMORY=32MB \
    -s MAXIMUM_MEMORY=512MB \
    -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap', 'HEAP32']" \
    -s EXPORTED_FUNCTIONS="['_bubble_sort', '_malloc', '_free']"

# Copy WASM/JS files to the public directory
cp $wasm_output_dir/lab.{js,wasm} $public_output_dir/

echo "WASM build complete!"
