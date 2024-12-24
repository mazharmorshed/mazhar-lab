#include <iostream>
#include <string>
#include <map>
#include "../core/algorithms/sort/sort.hpp"
#include "../core/algorithms/search/search.hpp"

void print_usage() {
    std::cout << "Usage:\n";
    std::cout << "  Sort:   ./mlab sort [-algorithm <algo> | -size <n> | -case <type>]\n";
    std::cout << "  Search: ./mlab search [-algorithm <algo> | -target <n> | -size <n> | -case <type>]\n";
    std::cout << "\nOptions:\n";
    std::cout << "  -algorithm: bubble (sort), linear (search)\n";
    std::cout << "  -size:     array size\n";
    std::cout << "  -target:   value to search for (search only)\n";
    std::cout << "  -case:     sorted, random (default: random)\n";
    std::cout << "\nExample:\n";
    std::cout << "  ./mlab search -size 10 -algorithm linear -case random -target 5\n";
}

std::map<std::string, std::string> parse_args(int argc, char* argv[]) {
    std::map<std::string, std::string> args;
    
    if (argc < 2) return args;
    
    // Store operation
    args["operation"] = argv[1];
    
    // Parse named arguments in any order
    for (int i = 2; i < argc; i++) {
        std::string arg = argv[i];
        if (arg[0] == '-') {
            std::string key = arg.substr(1); // Remove leading dash
            if (i + 1 < argc && argv[i + 1][0] != '-') {
                args[key] = argv[i + 1];
                i++; // Skip next argument as it's the value
            }
        }
    }
    
    return args;
}

int main(int argc, char* argv[]) {
    auto args = parse_args(argc, argv);
    
    if (args.empty() || (args["operation"] != "sort" && args["operation"] != "search")) {
        print_usage();
        return 1;
    }
    
    // Validate required arguments
    if (!args.count("algorithm") || !args.count("size")) {
        std::cout << "Error: algorithm and size are required\n";
        print_usage();
        return 1;
    }
    
    if (args["operation"] == "search" && !args.count("target")) {
        std::cout << "Error: target is required for search operation\n";
        print_usage();
        return 1;
    }
    
    // Set defaults and convert values
    std::string algorithm = args["algorithm"];
    int size = std::stoi(args["size"]);
    std::string case_type = args.count("case") ? args["case"] : "random";
    int target = args.count("target") ? std::stoi(args["target"]) : 0;
    
    // Debug output
    std::cout << "Running with parameters:\n";
    std::cout << "  Operation: " << args["operation"] << "\n";
    std::cout << "  Algorithm: " << algorithm << "\n";
    std::cout << "  Size: " << size << "\n";
    if (args["operation"] == "search") {
        std::cout << "  Target: " << target << "\n";
    }
    std::cout << "  Case: " << case_type << "\n\n";
    
    int* array = new int[size];
    
    if (args["operation"] == "sort") {
        struct SortResult result;
        run_sort_algorithm(algorithm.c_str(), array, size, case_type.c_str(), &result);
        
        std::cout << "Sort completed in " << result.duration << " seconds\n";
        std::cout << "First 10 elements: ";
        for (int i = 0; i < std::min(10, size); i++) {
            std::cout << array[i] << " ";
        }
        std::cout << "\n";
    }
    else if (args["operation"] == "search") {
        struct SearchResult result;
        run_search_algorithm(algorithm.c_str(), array, size, target, case_type.c_str(), &result);
        
        std::cout << "Search completed in " << result.duration << " seconds\n";
        std::cout << "Target " << target << " found at index: " << result.index << "\n";
    }
    
    delete[] array;
    return 0;
}