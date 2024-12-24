#include "sort.hpp"
#include "../util/array.hpp"

extern "C" {
    EXPORT void run_sort_algorithm(const char* algorithm, int* array, int size, const char* case_type, SortResult* result) {
        // Generate test array
        mlabs::algo::generate_number_array(array, size, case_type);
        
        // Debug info
        std::cout << "Running sort with:" << std::endl;
        std::cout << "Algorithm: " << algorithm << std::endl;
        std::cout << "Array size: " << size << std::endl;
        std::cout << "Case type: " << case_type << std::endl;
        
        // Print first 10 elements of initial array
        std::cout << "Initial array preview: [";
        for (int i = 0; i < std::min(10, size); i++) {
            std::cout << array[i];
            if (i < std::min(10, size) - 1) std::cout << ", ";
        }
        if (size > 10) std::cout << ", ...";
        std::cout << "]" << std::endl;
        
        auto start = std::chrono::high_resolution_clock::now();
        
        if (strcmp(algorithm, "bubble") == 0) {
            mlabs::algo::sort::bubble_sort(array, size);
        }
        else {
            std::cout << "Unknown sort algorithm: " << algorithm << std::endl;
        }

        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end - start;

        // Print first 10 elements of sorted array
        std::cout << "Sorted array preview: [";
        for (int i = 0; i < std::min(10, size); i++) {
            std::cout << array[i];
            if (i < std::min(10, size) - 1) std::cout << ", ";
        }
        if (size > 10) std::cout << ", ...";
        std::cout << "]" << std::endl;

        // Print execution time
        std::cout << "Execution time: " << duration.count() << " seconds" << std::endl;

        // Update result pointer
        result->duration = duration.count();
        
        // Debug print the actual struct value
        std::cout << "C++ struct duration value: " << result->duration << " seconds" << std::endl;
    }
}
