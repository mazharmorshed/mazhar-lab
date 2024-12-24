#pragma once

#include "../../platform.hpp"

#include <iostream>
#include <chrono>

namespace mlabs {
    namespace algo {
        namespace sort {
            void bubble_sort(int* array, int size);
        }
    }
}

extern "C" {
    struct SortResult {
        double duration;
    };

    EXPORT void run_sort_algorithm(const char* algorithm, int* array, int size, const char* case_type, SortResult* result);
}
