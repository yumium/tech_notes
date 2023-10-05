#include <iostream>
#include "functions/add.h"

// This declaration isn't necessary, but it does make your code a lot cleaner.
// Though the best idea is to have the declarations in a headfile.
// Also, remember to do "g++ main.cpp add.cpp" so all required files are compiled.
int main() {
	std::cout << "3 plus 4 is " << add(3, 4) << "\n";
	return 0;
}
