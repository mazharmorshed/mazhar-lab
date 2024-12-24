#include "array.hpp"

#include <algorithm>
#include <random>
#include <cstring>

namespace mlabs {
    namespace algo {
        void generate_number_array(int* arr, int size, const char* case_type) {
            // Fill with sequential numbers
            for (int i = 0; i < size; i++) {
                arr[i] = i;
            }

            if (strcmp(case_type, "reverse-order") == 0) {
                std::reverse(arr, arr + size);
            }
            else if (strcmp(case_type, "random") == 0) {
                std::random_device rd;
                std::mt19937 gen(rd());
                std::shuffle(arr, arr + size, gen);
            }
        }

        std::vector<int> array_to_vector(int* arr, int size) {
            return std::vector<int>(arr, arr + size);
        }

        void vector_to_array(const std::vector<int>& vec, int* arr) {
            std::copy(vec.begin(), vec.end(), arr);
        }
    }
}