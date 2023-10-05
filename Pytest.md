# Unit testing with Python

Testing primer:

*Testing tells you the presence of bugs, not the absence of it*.



**Types of unit tests**

Black box unit testing

White box unit testing

Equivalent class testing

Boundary/Corner-case testing

Property testing (like BDD)



Kinds of tests:

- Unit test
- Integration test (different components)
- System test (entire system)



Writing tests is a bit of an art. The science is in learning the ideas, but how to use those ideas come with experience.

You should also refactor your test cases like you do with your code. Your test cases will live with your code during its improvement, so it must be high quality.



### Unit Test Fundamentals

Unit = small piece of code

- A method or function
- A module or class
- A small group of related classes



An automated unit test is

- designed by human
- ran by computer automatically
- terminates with "pass" or "fail". Should be binary and without the need to read complex output



**Test case** = a test for 1 unit of code

Each test should be independent from each other



**Test runner** = a script that runs the tests. All testing libraries contain this.

Can run inside IDE or use command line (usually during CI)



**Test suite** = number of test cases run together by test runner



**Test fixture** = supporting code for your test cases

```python
setUp()

TestCaseMethod()

tearDown()
```

If `setUp` fails, no other methods run. If only `TestCaseMethod` fails, `tearDown` is still run.



### Unit Test Why and When

**Why unit test?**

Help you understand what to build

- Collaborate with business analyst, tester, designer, architect, and even end-user



Document the units

- Specify behaviors of unit
- Must update test when your code changes, so it's always kept up-to-date



Help design the units

- Unit tests forces your methods to be modular
- Specify the interface of your unit



Regression protection

- i.e. makes sure something that used to work will still work after change





**Limitations of unit testing**

- Test scenarios may not occur in production
- Tests may not notice failures
- Can't find integration errors and poor on non-functional requirements like efficiency and security





**Unit tests in your development routine**

Some people prefer to:

- Do whiteboard sketches
- Mess around with REPL before writing code
- Write test first



3 general approaches to tests in development

- Test first
  - +: Forces design to be testable before you implement the design
  - -: Hard to predict all cases, so you'll end up having to iterate and change both code and design
    It might be a good idea to take this into account so you don't have to write *all* the tests before you start
- Test last
  - +: No need to change the test as you stabilize your design
  - -: Risk of making an untestable design before testing it and have to redesign it
    Also if you discover bugs late you might need to change your design
    Sometimes tests are rushed when you are pushing for a deadline
- TDD
  - Write one test => Make it pass => Refactor => Repeat
  - Basically test first approach but iterative
  - This takes a little more skill



**Unit tests in your team's development routine**

1. Pull changes from VC
2. Run tests & check that they pass before making changes
3. Run tests again after making changes before you share them

This can be done with a build automation server using Jenkins and Sonarqube







### Unit Test Design

Test case name should for informative and specific

Each test case should only test on function of a unit

Three parts of a test

1. Arrange: set up objects to be tested
2. Act: exercise the unit under test
3. Assert: make claims about what happened

^^ Try to have each test function body contain this



Three kinds of assertions:

- Check return value or exceptions
- Check state change (use an API to query new state) -> this is more whitebox
- Check a collaborating class get called with the correct method and arguments -> even more whitebox





Example of poor design

```python
# Using unittest module
import unittest

def test_is_consistent(self):
    self.phonebook.add('Bob', '12345')
	self.assertTrue(self.phonebook.is_consistent())
    self.phonebook.add('Anna', '012345')
    self.assertTrue(self.phonebook.is_consistent())
	self.phonebook.add('Sue', '12345') # identical to Bob
    self.assertFalse(self.phonebook.is_consistent())
    self.phonebook.add('Sue', '123') # prefix of Bob
    self.assertFalse(self.phonebook.is_consistent())
```

For context, the phonebook is consistent when no number is a prefix of another.

One way of doing the `.is_consistent()` function is to realize that when the numbers are sorted in lexicographic order, prefixes are beside each other. This means we just need to sort the numbers then do a one-pass check, giving an O(nlogn) algorithm.

Of course, we can also store the number in a Trie data structure so invariant can be checked on each addition to the phonebook.



Refactoring of the test

```python
class PhoneBookTest(unittest.TestCaes):

    def setUp(self):
        self.phonebook = PhoneBook()
        
    def test_lookup_by_name(self):
        # set up
        self.phonebook.add('Bob', '12345')

        # test
        number = self.phonebook.lookup('Bob')

        # assert
        self.assertEqual('12345', number)


    def test_is_consistent_with_different_entries(self):
        self.phonebook.add('Bob', '12345')
        self.phonebook.add('Anna', '012345')
        self.assertTrue(self.phonebook.is_consistent())

    def test_is_inconsistent_with_duplicate_entries(self):
        self.phonebook.add('Bob', '12345')
        self.phonebook.add('Sue', '12345')
        self.assertFalse(self.phonebook.is_consistent())

    def test_is_inconsistent_with_duplicate_prefix(self):
        self.phonebook.add('Bob', '12345')
        self.phonebook.add('Sue', '123')
        self.assertFalse(self.phonebook.is_consistent())
        
	# More tests
    # Occasionally you can add >1 assertion if that's compatible with the unit's function 
    def test_phonebook_adds_names_and_numbers(self):
        self.phonebook.add('Sue', '123343')
        self.assertIn('Sue', self.phonebook.get_names())
        self.assertIn('123343', self.phonebook.get_numbers())
        
	# You can also test for exceptions
    def test_missing_name_raises_error(self):
		with self.assertRaises(KeyError):
            self.phonebook.lookup('missing')
```







### pytest



unittest is modelled on JUnit

Which is why it is not very "Python-ic" -> uses camel case, wordy ...

pytest is a popular alternative to unittest

It's not a member of the xUnit family like unittest

It's not in the standard Python distribution





**Defining test cases**

```python
def test_lookup_by_name():
    phonebook = Phonebook()
    phonebook.add('Bob', '12345')
    assert '12345' == phonebook.lookup('Bob')
    
def test_missing_name_raises_error():
	phonebook = Phonebook()
    with pytest.raises(KeyError):
        phonebook.lookup('Bob')
```

Pytest uses a lot of native python structure, apart from exception assertions





**Test Fixtures**

```python
@pytest.fixture
def phonebook():
    """Provides an empty Phonebook"""
    return Phonebook()

def test_lookup_by_name(phonebook):
    phonebook.add('Bob', '12345')
    assert '12345' == phonebook.lookup('Bob')
    
def test_phonebook_contains_all_names(phonebook):
    phonebook.add('Bob', '1234')
    assert 'Bob' in phonebook.names()
```

In Pytest, fixtures (= set up code) are refactored into a method and passed in as arguments to test cases. Compare this with the Java-like method of using classes.



What if we want to do clean up?

```python
@pytest.fixture
def phonebook():
    phonebook = Phonebook()
    yield phonebook			# Set up method will return this
    phonebook.clear()		# Clean up method will be called at the end of test case execution
```



pytest has built-in fixtures, like `tmpdir`, which at runtime will return a temporary directory. We can chain fixtures together like this:

```python
@pytest.fixture
def phonebook(tmpdir):
    return PhoneBook(tmpdir)

def test_lookup_by_name(phonebook):
    phonebook.add('Bob', '12345')
    assert '12345' == phonebook.lookup('Bob')
```

This can be used when the `Phonebook` constructor needs a directory to store the phonebook.



Use `pytest --fixtures` to get a list of fixtures.





**Organising test code**

```
│   pytest.ini
├───src
└───tests
        conftest.py
        test_feature_1.py
        test_feature_2.py
        test_feature_3.py
```

You have your code in the `src` folder.

You have your tests in the `tests` folder.

`conftest.py` contains your fixtures.

`pytest.ini` is an optional file that contains pytest configurations



Sometimes you want to skip some tests. You can do this by using markers:

```python
@pytest.mark.slow
def test_large_file():
    ...
```

Then you can run

```python
python -m pytest -m "not slow"
```

to skip tests with marker `slow`



You may want to enforce the markers are all legitimate to ensure you don't accidentally miss a test. You can do this by populating the `pytest.ini` file with this:

```
[pytest]
addopts = --strict
markers = 
	slow: Run tests that use sample data from file
```



There are also built-in markers

```python
@pytest.mark.skip("WIP")  # means Work In Progress
def test_feature_1():
    ...
```



To view all built-in markers

```python
python -m pytest --markers
```



pytest-html -> python module that outputs test result to HTML









### Test Doubles

A test double is like an acting double for your development units / classes.

There are many types of doubles.

Some people use "mock" as another umbrella term for doubles, but mocking is actually a specific kind of doubles.



Replace inconvenient collaborators: dummy, stub, fake

Ensure interactions are correct: spy, mock



What you use is based on taste + requirements of code





**Stub**

Example: say we are creating an alarm class that probes the sensor and triggers an alarm when the sensor gives a temperature above some threshold. It'll be difficult to connect to an actual sensor every time for testing.

In this case, it's easier to create a StubSensor class that has the same interface but much simpler logic/implementation so we can test quickly.

Using a doubles framework to make stubs easier to create and more readable.



Here we are using the vanilla way of creating the stub class

```python
class StubSensor:
    def sample_pressure(self):
        return 18

def test_normal_pressure_alarm_stays_off():
    alarm = Alarm(sensor=StubSensor())
    alarm.check()
    assert not alarm.is_alarm_on
```

Here we are using the doubles library. Notice how it's more clear on what we are stubbing

```python
def test_normal_pressure_alarm_stays_off():
    stub_sensor = Mock(Sensor)
    stub_sensor.sample_pressure.return_value = 18
    alarm = Alarm(sensor=stub_sensor)
    alarm.check()
    assert not alarm.is_alarm_on
```





**Fake**

Fakes have realistic implementation of the units you want to test (i.e., same methods) but are not used in production.

Examples:

- Use the python `StringIO` class instead of an actual File
- Use an in-memory database instead of an actual database
- Use a lightweight web server instead of an actual web server





**Dummy**

Usually `None`

Increase in fidelity: dummy -> stub -> fake





**Spy**

A spy is a class with additional logic to record the method calls it receives and the contents of the parameters, so you can assert they were correct.

Use a mock framework for this.





**Mock**

Basically the same as the spy, but it fails immediately when the wrong method or arguments are called (unlike in the spy case where it only fails on test assertion).

This means mocks will fail faster + give stack trace on where it failed.







### Parameterized testing

Sometimes we may want to parameterize our tests to save writing duplicated code.

Pytest has a framework to do this

```python
@pytest.mark.parametrize("player1_points, player2_points, expected_score",
                        [(0, 0, "Love-All"),
                         (1, 1, "Fifteen-All"),
                         (2, 2, "Thirty-All")])
def test_score_tennis(player1_points, player2_points, expected_score):
    assert score_tennis(player1_points, player2_points) == expected_score
```





### Test coverage

`pytest-cov`

```bash
pytest --cov-report html:cov_html --cov=tennis .
```

- html:cov_html: tells where to dump the html report
- --cov=tennis: tells which .py file to check the coverage
- . : tells the directory



Test coverage: how many percent of code is run during tests

Branch coverage: how many outcomes of conditions are covered?

```bash
pytest --cov-report html:cov_html --cov-branch --cov=tennis .
```



Documentation: https://pytest-cov.readthedocs.io/en/latest/config.html

In reality, the command syntax are a bit fiddly. This is what worked for me:

```bash
python -m pytest --cov sample_module test_sample_module.py --cov-report html
```

The field `test_sample_module.py` is a relative path to the test file. The module `sample_module` doesn't need to be under your current directory as it'll be imported by the test module.





**Limitations of coverage metrics:** 

- It cannot tell you code that is *missing* -> even if the coverage is 100%, your code might still miss implementation of some features 



Track and look at coverage trends!

DevOps guys can then put metrics like if <80% coverage make people write tests



Uses of coverage:

- Spot missing tests for new code
- Track coverage trends



**Evaluating test quality**: (other signals to look for when evaluating if tests are good)

- Bugs in production (lots of bugs ~ bad tests)
- Confidence in refactor (= how confident you are in the tests to make sure your code won't break if you refactor some parts?)
- Unreliable tests (= break randomly)
- Code Review from seniors
- Onboarding time (= how readable are your tests)
- Mutation testing (= deliberately add bugs to code and see if it trips tests)
- ...





### Miscellaneous

**conftest.py**

You can place fixtures in `conftest.py` file inside the test folder with other tests. These fixtures will automatically be imported by pytest, as `conftest.py` is a special file name in pytest. You can simply add these fixtures in test functions in your test files.













