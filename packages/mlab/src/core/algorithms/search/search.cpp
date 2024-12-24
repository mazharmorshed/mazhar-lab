#include "search.hpp"
#include "../util/array.hpp"

extern "C" {
    EXPORT void run_search_algorithm(const char* algorithm, int* array, int size, int target, const char* case_type, SearchResult* result) {
        // Debug memory contents
        std::cout << "C++ received algorithm string at " << (void*)algorithm << ":" << std::endl;
        std::cout << "Raw bytes: ";
        for(int i = 0; algorithm[i] != '\0' && i < 20; i++) {
            std::cout << (int)(unsigned char)algorithm[i] << " ";
        }
        std::cout << std::endl;
        
        // Debug info first
        std::cout << "Running search with:" << std::endl;
        std::cout << "Algorithm string: '" << algorithm << "'" << std::endl;
        std::cout << "Array size: " << size << std::endl;
        std::cout << "Target: " << target << std::endl;
        std::cout << "Case type: " << case_type << std::endl;

        // Validate algorithm before generating array
        if (strcmp(algorithm, "linear") != 0) {
            std::cout << "Unknown search algorithm: " << algorithm << std::endl;
            result->duration = 0.0;
            result->index = -1;
            return;
        }

        // Generate array for searching based on case type
        mlabs::algo::generate_number_array(array, size, case_type);

        // Print first 10 elements of array
        std::cout << "Array preview: [";
        for (int i = 0; i < std::min(10, size); i++) {
            std::cout << array[i];
            if (i < std::min(10, size) - 1) std::cout << ", ";
        }
        if (size > 10) std::cout << ", ...";
        std::cout << "]" << std::endl;
        
        auto start = std::chrono::high_resolution_clock::now();
        int search_index = mlabs::algo::search::linear_search(array, size, target);
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end - start;

        // Update result pointer
        result->duration = duration.count();
        result->index = search_index;

        // Debug print the actual struct value
        std::cout << "C++ struct duration value: " << result->duration << " seconds" << std::endl;
        std::cout << "C++ struct index value: " << result->index << std::endl;
    }
}
