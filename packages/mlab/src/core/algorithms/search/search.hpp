#pragma once

#include "../../platform.hpp"

#include <iostream>
#include <chrono>

namespace mlabs {
    namespace algo {
        namespace search {
            int linear_search(int* array, int size, int target);
        }
    }
}

extern "C" {
    struct SearchResult {
        double duration;
        int index;
    };

    EXPORT void run_search_algorithm(const char* algorithm, int* array, int size, int target, const char* case_type, SearchResult* result);
}
