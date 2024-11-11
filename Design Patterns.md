

# Creational patterns


## Factory method

When there are multiple concrete implementation of a common interface or base class, we don't want to expose what concrete class we're using to client code.

We create a common object creation interface, where the implementation logic will instantiate the correct concrete class. Essentially the Factory interface takes in some class ID and creates common class with the right concrete implementation.

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


## Singleton

A preferred way for global state over global variables because:
- Doesn't pollute global namespace
- Lazy allocation (only allocate if using the instance)
- Thread safety in the class

An example of use is for a logging facility (usually we target *one* central logger)

```c++
class Singleton {
public:
  // Lazy instantiation, can add thread safety here with locks, say
  Singleton& get() {
    if (instance == nullptr) instance = new Singleton();
    return *instance;
  }

  // Avoid duplication so delete these constructors
  Singleton(const Singleton&) = delete;
  Singleton& operator=(const Singleton&) = delete;

  // Clean up
  static void destruct() {
    delete instance;
    instance = nullptr;
  }

  // Arbitrary methods
  int get_value() { return value; }
  void set_value(int val) { value = val; }

private:
  // Constructor not accessible outside class
  Singleton() = default;
  ~Singleton() = default;
  static Singleton* instance = nullptr;
  int value = 0;
}

int main() {
  Singleton::get().set_value(42);
  std::cout << Singleton::get().get_value() << std::endl;  // 42
  Singleton::destruct();
}
```

## Abstract Factory

Useful when you have a group of related objects and you want to instantiate them under the same set of configs to keep uniform, but you may have many version of that config.

You encapsulate the config mapping to a separate Abstract Factory object, and keep client code same.

This can be useful for say UI components where a group of components need to share a theme and there are both light and dark themes.

```python
# Abstract Factory Interface
class GUIFactory:
    def create_button(self):
        pass

    def create_window(self):
        pass

# Concrete Factory for Mac
class MacGUIFactory(GUIFactory):
    def create_button(self):
        return MacButton()

    def create_window(self):
        return MacWindow()

# Concrete Factory for Windows
class WindowsGUIFactory(GUIFactory):
    def create_button(self):
        return WindowsButton()

    def create_window(self):
        return WindowsWindow()

# Client Code
def render_ui(factory: GUIFactory):
    button = factory.create_button()
    window = factory.create_window()
    # Render the button and window in the UI

# Usage
factory = MacGUIFactory()  # Or WindowsGUIFactory based on platform
render_ui(factory)
```


## Prototype pattern

Create new objects by cloning existing "prototype" objects instead of calling the constructor, useful when:
- Creation is costly, easier to copy
- Creation is complex, with complex configuration inputs, ideally don't want to have client code do this everytime
- Lots of subclasses, so easier to clone the complex object and modify slightly for each instance

```python
import copy

# Prototype object
class Shape:
    def __init__(self, shape_type):
        self.shape_type = shape_type
        self.color = "black"

    # Has clone function to allow cloning of prototype object
    def clone(self):
        return copy.deepcopy(self)

circle_prototype = Shape("Circle")
new_circle = circle_prototype.clone()
new_circle.color = "red"
```



# Behavioural

- Subject maintain a list of observers
- Subject notify observers when there are events
- Things this pattern solve
  - Subject and observer dependency should be loosely coupled. Subject just push message to observers without knowing how they are consumed. Observers take messages without knowing how they are created
  - The logic of updating list of observers should be done automatically, without rewriting in client code
  - Observers can (de)register themselves at runtime
- Sometimes you may want subject and observer to be tightly coupled, if they are strongly related or for performance reasons

This pattern is quite basic and does not concern much about scalability, peformance, message guarantee. These are more concerned in message queue implementations, where observer pattern is a small part (e.g., Kafka).

```python
class Observable:
    def __init__(self):
        self._observers = []

    def register_observer(self, observer) -> None:
        self._observers.append(observer)

    def notify_observers(self, *args, **kwargs) -> None:
        for observer in self._observers:
            observer.notify(self, *args, **kwargs)


class Observer:
    def __init__(self, observable):
        observable.register_observer(self)

    def notify(self, observable, *args, **kwargs) -> None:
        print("Got", args, kwargs, "From", observable)


subject = Observable()
observer = Observer(subject)
subject.notify_observers("test", kw="python")
```





