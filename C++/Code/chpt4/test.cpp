#include <iostream>

int main() {
	int i = 5;
	for (i; i < 10; i++) {
		std::cout << i;
	}

	std::cout << "Final value: " << i;
	return 0;
}
