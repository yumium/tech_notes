# Inheritance and Alternatives

In object-oriented programming, inheritance is the mechanism of basing an object or class upon another object (prototype-based inheritance) or class (class-based inheritance), retaining similar implementation.

This supports code reuse.

One big advantage of inheritance is it's **very simple** to code.



<u>Problems with inheritance</u>

Fragile base class problem => seemingly safe changes to the base class can cause surprising changes in the derived class. This is because interface isn't defined as cleanly

```java
class Super {
    private int counter = 0;

    void inc1() {
        counter++;
    }

    void inc2() {
        counter++;
    }
}

class Sub extends Super {
    @Override
    void inc2() {
        inc1();
    }
}

// problem is caused if `Super` class is modified to take following form
class Super {

    private int counter = 0;

    void inc1() {
        inc2(); // Derived class will run into infinite loop here, one fix is to make `inc2` a final method so it cannot be derived
    }

    void inc2() {
        counter++;
    }
}
```

There's also possible for base-derived class relationship to change in the future. So use inheritance if this is very very unlikely the case.

Another drawback is having many layer of "thin" inheritance, making it very difficult to trace the inheritance to figure out what code is actually run on derived class members.





<u>Alternatives</u>



**Composition**

https://en.wikipedia.org/wiki/Composition_over_inheritance

Composition gives more flexibility than inheritance because it's more common for different objects to share a few common functions, rather than figuring out what different objects have in common to form a family tree.

"In other words, it is better to compose what an object can do (has-a) than extend what it is (is-a)."

Drawback => usually need to define the same methods in the composed objects in the composing object, where we're just passing arguments in (don't need to do this for inheritance). Some languages have constructs that removes need for writing boiler plate code explicitly



Example:

Using inheritance

```c++
class Object
{
public:
    virtual void update() {
        // no-op
    }

    virtual void draw() {
        // no-op
    }

    virtual void collide(Object objects[]) {
        // no-op
    }
};

class Visible : public Object
{
    Model* model;

public:
    virtual void draw() override {
        // code to draw a model at the position of this object
    }
};

class Solid : public Object
{
public:
    virtual void collide(Object objects[]) override {
        // code to check for and react to collisions with other objects
    }
};

class Movable : public Object
{
public:
    virtual void update() override {
        // code to update the position of this object
    }
};

// We want to define the following classes:
// class Player - which is Solid, Movable and Visible
// class Cloud - which is Movable and Visible, but not Solid
// class Building - which is Solid and Visible, but not Movable
// class Trap - which is Solid, but neither Visible nor Movable

// Here, using inheritance means creating a hierarchy tree. To avoid multiple inheritance we may need separate classes for `VisibleAndSolid` etc. for all combinations of traits. This is clearly cumbersome
```

Using composition

```c++
class VisibilityDelegate
{
public:
    virtual void draw() = 0;
};

class NotVisible : public VisibilityDelegate
{
public:
    virtual void draw() override {
        // no-op
    }
};

class Visible : public VisibilityDelegate
{
public:
    virtual void draw() override {
        // code to draw a model at the position of this object
    }
};

class UpdateDelegate
{
public:
    virtual void update() = 0;
};

class NotMovable : public UpdateDelegate
{
public:
    virtual void update() override {
        // no-op
    }
};

class Movable : public UpdateDelegate
{
public:
    virtual void update() override {
        // code to update the position of this object
    }
};

class CollisionDelegate
{
public:
    virtual void collide(Object objects[]) = 0;
};

class NotSolid : public CollisionDelegate
{
public:
    virtual void collide(Object objects[]) override {
        // no-op
    }
};

class Solid : public CollisionDelegate
{
public:
    virtual void collide(Object objects[]) override {
        // code to check for and react to collisions with other objects
    }
};

class Object
{
    VisibilityDelegate* _v;
    UpdateDelegate* _u;
    CollisionDelegate* _c;

public:
    Object(VisibilityDelegate* v, UpdateDelegate* u, CollisionDelegate* c)
        : _v(v) // Here we're using composition
        , _u(u)
        , _c(c)
    {}

    // downside of composition is this forward passing code
    void update() {
        _u->update();
    }

    void draw() {
        _v->draw();
    }

    void collide(Object objects[]) {
        _c->collide(objects);
    }
};

// Here are the concrete classes
class Player : public Object
{
public:
    Player()
        : Object(new Visible(), new Movable(), new Solid())
    {}

    // ...
};

class Smoke : public Object
{
public:
    Smoke()
        : Object(new Visible(), new Movable(), new NotSolid())
    {}

    // ...
};
```



**Abstract classes**

Subtyping, forming is-a relationships

Python: ABC

C++: A class with pure virtual functions => C++ doesn't provide special keyword for traits



**Mixins**

For sharing functionality

Good Mixin style:

- Conceptually doesn't define a type, only bundles a few closely-related methods
- Mixins should never be instantiated
- Mixins shouldn't contain internal state (ie. no instance variables)
- Concrete classes shouldn't only inherit from Mixins

Mixins solve the inheritance problems -> being small and simple avoids fragile subclass problem, and avoids complex trees



It's also useful to create aggregated classes that only aggregates Mixins for inheritance

```python
class ListView(MultipleObjectTemplateResponseMixin, BaseListView):
    """
    Render some list of objects, set by `self.model` or `self.queryset`.
    `self.queryset` can actually be any iterable of items, not just a queryset.
    """
    
# This class only contains a base class and a mixin
# Other classes can inherit from this class without needing to think every time what mixin go with what base class
```







