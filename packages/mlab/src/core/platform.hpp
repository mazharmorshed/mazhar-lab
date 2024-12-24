#pragma once

#ifdef __EMSCRIPTEN__
    #include <emscripten.h>
    #define EXPORT extern "C" EMSCRIPTEN_KEEPALIVE
#else
    #define EXPORT
#endif 

