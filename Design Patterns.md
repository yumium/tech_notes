

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

How this could be implemented in practice:

- Have a templated class `FactoryT` that have two public methods, `instantiate` and `enroll`
  - The class tracks internally a static map that maps template::key to template::constructor
  - `enroll` just inserts to this map
  - `instantiate` will find the constructor taking the key and call the constructor
- For each type of Factory, say Candy Factory, define the shape of the constructor
- Then for each type of Candy, inherit from Factory::Register as a Mixin, say, where using a hack like `using _static__enrolled = std::integral_constant<decltype(&_enrolled), &_enrolled>;` we force the compiler to generate code that calls `enroll` before `main()` entry
  - This constructs the switch logic
- Then at runtime, client code will call `instantiate(candy.key())` and the `FactoryT` will call the correct constructor
- The idea is the same, the client code just calls `instantiate(key)` and the pre-calculated map knows which constructor to call. So we can extend new constructors without modifying client code.




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

## Observer pattern

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




# Structural

## Adapter pattern

Problems
- How can a class be reused that does not have an interface that a client requires?
- How can classes that have incompatible interfaces work together?
- How can an alternative interface be provided for a class?

Solutions
- Have separate `Adater` class that wraps around the service class to reuse (via composition). The `Adapter` interface is that of the client class. `Adapter` simply does the translation and forwards calls to the service class.
- This allow reuse of classes with a slightly different interface

Trivial example

```python
# Adapter implements interface for Android charging slot, with iPhone object internally via composition
class IPhoneAdapter(FormatAndroid):
    def __init__(self, mobile):
        self.mobile = mobile

    def recharge(self):
        self.mobile.recharge()

    def use_micro_usb(self):
        print(CONNECTED.format(POWER_ADAPTERS["Android"]))
        self.mobile.use_lightning()
```





### Iterator

A unified way to easily iterate element by element through any class that's a "collection"

Use `iterator` method to get an iterator object from the collection, then use `hasNext` and `next` to iterate through the iterator.

Used extensively in C++



### Model View Controller

Model: Internal data

View: A mapping of internal data to display. There can be multiple views from the same model

Controller: Processing input, updating model from input, and refreshing the view




### Command

We don't want to associate each keypress with direct method calls that change the model.

We want to associate each keypress with a command, then encapsulate the method calls that change the model in the command. This has several benefits:

- The commands are more abstract, so easy to understand
- You can change the method calls easily, without having to worry about keypress
- You can pass commands around, merge them etc.
- Commands might fail to execute when the state of the model doesn't allow it to do so. This is simpler as every keypress still generate commands, but not all commands generated are executable.

All in all, this decouples the keypress with immediate effects.

There are 4 players:

1. Concrete commands:

   ```scala
   class InsertCommand extends Command {
       override def execute() {...}
   }
   ```

2. The client: The one that associate the keypress with the correct command

3. The invoker: The part of code that does `command.execute`

4. The receiver: The object that is affected by the command execution



### Change

When you want to undo or redo things, it might be good to encapsulate a change into an object

```scala
trait Change {
    def undo()
    def redo()
}
```



### Memento

Your "originator" changes relatively continuously. During discrete times it can generate a memento that stores all of its internal state at that time. The memento can be invoked to restore the state of the originator to that time, sort of like git commits.

```scala
class Memento {
    ...	//private fields that stores the state
    
    def restore() {...}
}
```

Usually the memento class lives inside the originator class. This way, extracting the information about the originator is just accessing its internal data.
