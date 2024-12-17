#include <emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int linear_search(int* arr, int length, int target) {
        for (int i = 0; i < length; i++) {
            if (arr[i] == target) {
                return i; 
            }
        }
        return -1;
    } 
}
