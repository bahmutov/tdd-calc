# tdd-calc

> Build a simple HTML calculator using test-driven development

🎓 This is the example application for the course [TDD Calculator](https://cypress.tips/courses/tdd-calculator).

![Calculator test](./images/calc.png)

## Lessons

Clone this repo to your local machine

```shell
$ git clone git@github.com:bahmutov/tdd-calc.git
# git clones the repo into "tdd-calc" folder
$ cd tdd-calc
```

The starting code for each lesson is located in a separate branch, like `a1`, `a2`, ... etc. A typical lesson would start with:

```
$ git checkout <branch name>
$ npm install
$ npx cypress open
```

Then follow the lesson prompts from [the course](https://cypress.tips/courses/tdd-calculator)

## Branches

| Branch | Lesson                                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| `a1`   | [Lesson a1: Add HTML page](https://cypress.tips/courses/tdd-calculator/lessons/a1)                               |
| `a2`   | [Lesson a2: Add the main calculator elements](https://cypress.tips/courses/tdd-calculator/lessons/a2)            |
| `a3`   | [Lesson a3: Page resources](https://cypress.tips/courses/tdd-calculator/lessons/a3)                              |
| `a4`   | [Lesson a4: Add buttons](https://cypress.tips/courses/tdd-calculator/lessons/a4)                                 |
| `a5`   | [Lesson a5: Enter numbers](https://cypress.tips/courses/tdd-calculator/lessons/a5)                               |
| `a6`   | [Lesson a6: Enter expressions](https://cypress.tips/courses/tdd-calculator/lessons/a6)                           |
| `b1`   | [Lesson b1: Re-run tests on application changes](https://cypress.tips/courses/tdd-calculator/lessons/b1)         |
| `b2`   | [Lesson b2: Clear the current expression](https://cypress.tips/courses/tdd-calculator/lessons/b2)                |
| `b3`   | [Lesson b3: Spy on global application functions](https://cypress.tips/courses/tdd-calculator/lessons/b3)         |
| `b4`   | [Lesson b4: Add a custom command](https://cypress.tips/courses/tdd-calculator/lessons/b4)                        |
| `b5`   | [Lesson b5: Decimal point happy paths](https://cypress.tips/courses/tdd-calculator/lessons/b5)                   |
| `b6`   | [Lesson b6: Decimal edge cases](https://cypress.tips/courses/tdd-calculator/lessons/b6)                          |
| `b7`   | [Lesson b7: Unit tests](https://cypress.tips/courses/tdd-calculator/lessons/b7)                                  |
| `c1`   | [Lesson c1: Calculate the expression](https://cypress.tips/courses/tdd-calculator/lessons/c1)                    |
| `c2`   | [Lesson c2: Invalid expressions](https://cypress.tips/courses/tdd-calculator/lessons/c2)                         |
| `c3`   | [Lesson c3: Do not evaluate invalid expressions](https://cypress.tips/courses/tdd-calculator/lessons/c3)         |
| `c4`   | [Lesson c4: Style the display element](https://cypress.tips/courses/tdd-calculator/lessons/c4)                   |
| `c5`   | [Lesson c5: Style the keyboard buttons](https://cypress.tips/courses/tdd-calculator/lessons/c5)                  |
| `c6`   | [Lesson c6: Make the keyboard buttons round](https://cypress.tips/courses/tdd-calculator/lessons/c6)             |
| `c7`   | [Lesson c7: Style the body element](https://cypress.tips/courses/tdd-calculator/lessons/c7)                      |
| `c8`   | [Lesson c8: Style the operator buttons](https://cypress.tips/courses/tdd-calculator/lessons/c8)                  |
| `c9`   | [Lesson c9: Style the hover state](https://cypress.tips/courses/tdd-calculator/lessons/c9)                       |
| `c10`  | [Lesson c10: Confirm the operator buttons hover styles](https://cypress.tips/courses/tdd-calculator/lessons/c10) |
| `d1`   | [Lesson d1: Error message goes away](https://cypress.tips/courses/tdd-calculator/lessons/d1)                     |
| `d2`   | [Lesson d2: Halloween pumpkins](https://cypress.tips/courses/tdd-calculator/lessons/d2)                          |
| `d3`   | [Lesson d3: The saved expression](https://cypress.tips/courses/tdd-calculator/lessons/d3)                        |
| `d4`   | [Lesson d4: Check an object stored in local storage](https://cypress.tips/courses/tdd-calculator/lessons/d4)     |
| `d5`   | [Lesson d5: Add the history element](https://cypress.tips/courses/tdd-calculator/lessons/d5)                     |
| `d6`   | [Lesson d6: Append history items](https://cypress.tips/courses/tdd-calculator/lessons/d6)                        |
| `d7`   | [Lesson d7: Use a page object](https://cypress.tips/courses/tdd-calculator/lessons/d7)                           |
| `d8`   | [Lesson d8: Store history in the local storage](https://cypress.tips/courses/tdd-calculator/lessons/d8)          |
| `d9`   | [https://cypress.tips/courses/tdd-calculator/lessons/d9](https://cypress.tips/courses/tdd-calculator/lessons/d9) |
| `d10`  | [Lesson d10: Implement data migration](https://cypress.tips/courses/tdd-calculator/lessons/d10)                  |
| `d11`  | [Lesson d11: Find and fix a history edge case](https://cypress.tips/courses/tdd-calculator/lessons/d11)          |
| `e1`   | [Lesson e1: Run all tests on CI](https://cypress.tips/courses/tdd-calculator/lessons/e1)                         |
| `e2`   | [Lesson e2: Use ES6 JavaScript modules](https://cypress.tips/courses/tdd-calculator/lessons/e2)                  |
| `e3`   | [Lesson e3: Unit tests for an exported function](https://cypress.tips/courses/tdd-calculator/lessons/e3)         |
| `e4`   | [Lesson e4: Run all specs](https://cypress.tips/courses/tdd-calculator/lessons/e4)                               |
| `e5`   | [Lesson e5: Print page as PDF](https://cypress.tips/courses/tdd-calculator/lessons/e5)                           |
| `e6`   | [Lesson e6: Catch accessibility issues](https://cypress.tips/courses/tdd-calculator/lessons/e6)                  |
| `e7`   | [Lesson e7: Button color contrast](https://cypress.tips/courses/tdd-calculator/lessons/e7)                       |
| `f1`   | [Lesson f1: Remove the global calculate function](https://cypress.tips/courses/tdd-calculator/lessons/f1)        |
| `f2`   | [Lesson f2: Remove the global clear display function](https://cypress.tips/courses/tdd-calculator/lessons/f2)    |
| `f3`   | [Lesson f3: Remove the global enterDigit function](https://cypress.tips/courses/tdd-calculator/lessons/f3)       |
| `f4`   | [Lesson f4: Use TypeScript for specs](https://cypress.tips/courses/tdd-calculator/lessons/f4)                    |
| `f5`   | [Lesson f5: Fix TypeScript lint errors](https://cypress.tips/courses/tdd-calculator/lessons/f5)                  |
| `f6`   | [Lesson f6: Code coverage](https://cypress.tips/courses/tdd-calculator/lessons/f6)                               |
| `f7`   | [Lesson f7: 100% code coverage](https://cypress.tips/courses/tdd-calculator/lessons/f7)                          |

## Small print

Copyright 2024 ©️ Gleb Bahmutov
