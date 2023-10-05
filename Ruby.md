# Ruby

Using the introduction to Ruby course on `learn.chef.io`

This intro will be super brief as the focus is on learning the language basics so I can use Chef.



## Introduction

### What is Ruby

Ruby is a ...

- High level language
- Dynamic (operations done at run time)
- Object-oriented
- Interpreted

It is supported by various frameworks, such as Ruby on Rails for web backend





### Ruby 101

Use `irb` to enter into REPL

```ruby
puts "Hello World"
```

`puts` is short for put string. You can also use `print`, but note that there is no new line character appended to the end

You can also put the statement inside a .rb file and run by `ruby hello_world.rb`



You can use `gets` for console I/O

```ruby
puts "What's your name?"
name = gets
puts "Hello #{name}!"
```



<u>Comments</u>

```ruby
# This is an inline commment

=begin
	Multiline comment
	are wrapped in
	these
=end
```



<u>Syntax</u>

Like python, variables in Ruby use underscore, like `my_variable`

```ruby
name = "Emily"
age = 25
puts "Your name is #{name} and you are #{age} years old"			# interpolation
puts "You name is " + name + " and you are " + age + " years old"	# concatenation
```



<u>Numbers</u>

Numbers come in 2 primitive types, int and float.

```ruby
x_int = 5
y_float = 5.0
```

Ruby support the usual arithmetic operators (+, -, *, /, %)



<u>Strings</u>

Apart from interpolation and concatenation shown earlier, there are various built-in string methods

```ruby
string = "I love Ruby"

puts string.length
puts string.reverse
puts string.downcase
puts string.upcase
```







## Language Basics

### Control flow

If

```ruby
x = 10
if x > 7
    puts "x is greater than 7"
elsif x < 7
    puts "x is less than 7"
else
    puts "x is equal to 7"
end
```



Unless

```ruby
playing = false

unless playing # takes control when `playing` evaluates to false, syntactic sugar to if !playing
    puts "We're busy learning Ruby"
else
    puts "It's time to play games"
end
```



Logical operators

&&, ||, !



Case

```ruby
num = 0

case num
when 0
    puts "Zero"
when 1
    puts "One"
else # Executes if none of the cases match
    puts "The entered number is not a binary digit"
end
```



While

```ruby
count = 1

while count < 10
	puts count
    count += 1
end
```



Until

```ruby
count = 10

until count < 1 # Syntactic sugar to while !(count < 1)
    puts count
    count -= 1
end
```



For

```ruby
for count in 1...10 # This range object contains integers in interval [1..10)
    puts count
end
```





### Iterators

.times - executes the statement the # of times as defined in the integer

```ruby
5.times { puts "I am learning Ruby" }

5.times do
    puts "I am learning Ruby" # We can also specify a code block
end
```



.each - executes the statements, substituting the piped variable with elements in the collection

```ruby
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

days.each { |day| put day }
```







## Data structures

### Arrays

```ruby
fruits = ['Apple', 'Orange', 'Pear']

puts fruits[0]

fruits << 'Lychee'			# Append
fruits.push('Mango')		# Append
fruits.insert(5, 'Peach')	# Insertion
fruits.pop
fruits.delete_at(4)
puts fruits.include?('Peach')
puts fruits.sort 			# Sorting is functional, will not change original array
puts fruits.map { |x| "_#{x}_"}	# Map is functional
```



Arrays can be of higher order as well, of course

```ruby
my_2d_array = [[1,2],[3,4]]
my_2d_array.each { |arr| arr.each { |x| puts x } }
puts my_2d_array[1][1]

puts my_2d_array.flatten	# Returns a 1D array
```





### Hashes

Ruby Hashes are like Python maps

```ruby
person_hash = Hash.new

person_hash['name'] = 'Jonathan'
person_hash['age'] = 25
puts person_hash['name']
person_hash.each do |key, value|	# Iterating over a hash
    puts "#{key} is #{value}"
end
person_hash.delete('age')			# Delete an entry by key
person_hash.has_key?('name')
puts person_hash.select{ |key,value| key == 'name'}	# Like the Haskell filter
puts person_hash.fetch('name')		# Like safe get
```



You can also instantiate a hash like this

```ruby
person_hash = {
	'name' => 'Jonathan',
    'age' => 25
}
```





### Sets

```ruby
require 'set'
my_set = Set.new([1,2,3,4,5])
my_set << 6
my_set.add 7

my_set.each do |x|
    puts x
end
```



### Ranges

```ruby
1...10  # [1..10)
1..10	# [1..10]
Range.new(1,10)	# [1..10]
```





## Functions

```ruby
def greet(name='Scott')
    puts "Hello #{name}"
end

def add(x,y)
    res = x+y
    return res
end

def add_alt(x,y)
    x+y	# implicit return
end
```

Default arguments, optional arguments ... have similar syntax to Python

Like Scala, Ruby has implicit returns. If the function has no explicit `return` statement, the value of the last statement will be returned.



the `yield` statement

It acts as a placeholder in the function where code will be inserted at run time.

```ruby
def yield_test
    puts "We're now in the method!"
    yield
    puts "We're now back in the method!"
end

yield_test { puts "The method has yielded to the block!" }
```

The last statement, when executed, will produce the following result

```
We're now in the method!
The method has yielded to the block!
We're back in the method!
```

yield can also take arguments. In response, the appended statement must also take arguments. Below is a function that is a possible implementation of `each`.

```ruby
def each(arr)
    for i in 0...arr.length
        yield(arr[i])
end
    
arr.each { |n| puts n }
```





## Classes and Objects

```ruby
class Car
    @@count = 0
    def initialize(brand)
        @brand = brand	# Instance variables start with @
        @@count += 1	# Class variables start wit @@
    end
    
    def self.class_greet
        puts "Hello #{@brand} from a class method"
    end
    
    def instance_greet
        puts "Hello #{@brand} from an instance method"
    end
    
    def get_instance_count
        @@count
    end
end

car = Car.new('Ferrari')
```

The cool thing about Ruby is that all variables can only be accessed as the return value of a class method. This is neat as from objects and classes, all we can access are methods, making the syntax uniform.



Class inheritance is done using mixins

```ruby
module Greetings
    def greet
        puts "Hello!"
    end
end

class Person
	extend Greetings	# Adds methods from Greetings as class methods of Person
    include Greetings 	# Adds methods from Greetings as instance methods of Person
end
```











## I/O

### Files

```ruby
# Creating a file
test_file = File.new('test.txt', 'w+')
```

The access modes are specified below:

| **r**  | This is the default mode for files in Ruby. It provides read-only access and starts reading the file at the beginning |
| ------ | ------------------------------------------------------------ |
| **r+** | Specifying this mode provides read and write access and it also starts at the beginning of the file |
| **w**  | This mode provides write-only access and specifying this mode will truncate the existing file and create a new file for writing |
| **w+** | This mode provides both read and write access but it truncates the existing file and overwrites the existing file for reading and writing |
| **a**  | This mode is write only and specifying this mode will append to the end of the file for writing |
| **a+** | This mode also provides both read and write access but it appends or reads from the end of the file |



```ruby
test_file = File.open('test.txt', 'w+')
test_file.puts("We're writing some text to the file")
test_file.write("We're writing some more text to the file\n") # Need to add carriage return as `write` don't append these automatically
test_file.close

File.open('test.txt', 'w+') {
	|file| files.puts('This text was added using code block')    
}

puts File.read('test.txt')
```







### Network

```ruby
require 'net/http'
http_response = Net::HTTP.get_response('www.google.com', '/')
puts http_response.code
# 200
puts http_response.body
```

We can use other libraries like `uri`, `json`, and `webrick`



## Testing

Built-in unit testing: `Test::Unit`

BDD: `RSpec`

TDD: `Minitest`









