#pragma once

#include <vector>
#include <string>

namespace mlabs {
    namespace algo {
        void generate_number_array(int* arr, int size, const char* case_type);
        
        std::vector<int> array_to_vector(int* arr, int size);
        void vector_to_array(const std::vector<int>& vec, int* arr);
    }
}