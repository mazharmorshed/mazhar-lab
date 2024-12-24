#!/bin/bash
set -e

# Save current directory and move to mlab package
pushd packages/mlab > /dev/null

# Create build directory if it doesn't exist
BUILD_DIR="build"
mkdir -p $BUILD_DIR

# Configure and build using CMake
cmake -B $BUILD_DIR -S .
cmake --build $BUILD_DIR

# Copy binary to convenient location
cp $BUILD_DIR/mlab_cli ../../mlab

# Return to original directory
popd > /dev/null

echo "Build complete! Binary available as mlab." 