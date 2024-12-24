cmake_minimum_required(VERSION 3.10)
project(mlab)

# Build options
option(BUILD_CLI "Build the CLI application" ON)
option(BUILD_WASM "Build WebAssembly module" OFF)

# Common core library sources
set(CORE_SOURCES
    src/core/algorithms/sort/sort.cpp
    src/core/algorithms/sort/bubble_sort.cpp
    src/core/algorithms/search/search.cpp
    src/core/algorithms/search/linear_search.cpp
    src/core/algorithms/util/array.cpp
)

# WebAssembly Module
if(BUILD_WASM AND EMSCRIPTEN)
    add_executable(mlab_core ${CORE_SOURCES})
    target_include_directories(mlab_core PUBLIC src)
    
    # Set Emscripten link flags with explicit function signatures
    set_target_properties(mlab_core PROPERTIES
        SUFFIX ".js"
        LINK_FLAGS " \
            -s WASM=1 \
            -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] \
            -s EXPORTED_FUNCTIONS=['_malloc','_free','_run_sort_algorithm','_run_search_algorithm'] \
            -s ALLOW_MEMORY_GROWTH=1 \
            -s NO_EXIT_RUNTIME=1 \
            -s ENVIRONMENT='web' \
            -s EXPORTED_RUNTIME_METHODS=['getValue','setValue'] \
            -s WASM_BIGINT=1 \
            -s SAFE_HEAP=1 \
            --bind \
        "
    )
# Native Build
else()
    # Core library
    add_library(mlab_core ${CORE_SOURCES})
    target_include_directories(mlab_core PUBLIC src)

    # CLI Application
    if(BUILD_CLI)
        add_executable(mlab_cli src/cli/main.cpp)
        target_link_libraries(mlab_cli PRIVATE mlab_core)
    endif()
endif() 