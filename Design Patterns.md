

# Creational patterns


## Factory method

When there are multiple concrete implementation of a common interface or base class, we don't want to expose what concrete class we're using to client code.

We create a common object creation interface, where the implementation logic will instantiate the correct concrete class.

This has various benefits:

- Client code only depends on abstract interface, so no change in client code if concrete classes interface changes
- Can add more concrete subclasses without modifying client code.

```c++
#include <iostream>
#include <memory>

enum ProductId {MINE, YOURS};

class Product {
  public:
    virtual void print() = 0;
    virtual ~Product() = default;
};

class ConcreteProductMINE: public Product {
  public:
    void print() {
      std::cout << "this=" << this << " print MINE\n";
    }
};

class ConcreteProductYOURS: public Product {
public:
  void print() {
    std::cout << "this=" << this << " print YOURS\n";
  }
};

class Creator {
  public:
    virtual std::unique_ptr<Product> create (ProductId id) {
      if (ProductId::MINE == id) return std::make_unique<ConcreteProductMINE>();
      if (ProductId::YOURS == id) return std::make_unique<ConcreteProductYOURS>();

      return nullptr;
    }
    virtual ~Creator() = default;
};

int main() {
  // client code
  std::unique_ptr<Creator> creator = std::make_unique<Creator>();

  std::unique_ptr<Product> product1 = creator->create(ProductId::MINE);
  product1->print();

  std::unique_ptr<Product> product2 = creator->create(ProductId:YOURS);
  product2->print();
};
```



