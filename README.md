# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Main features](#main-features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![Preview of the age calculator](./src/assets/images/screenshot.png)

### Main features

- Responsive animated age calculator
- Two-layer form field validation (HTML + JavaScript)
- Auto-focus to next field after entering two valid digits

### Links

- Solution URL: [GitHub](https://github.com/Pensive1/FEM-age-calculator-app)
- Live Site URL: [Preview](https://pensive1.github.io/FEM-age-calculator-app/)

## My process

1. Programmed the detailed age function
1. Created the basic HTML for UI components
1. Analysed element dimensions in Figma
1. Styled the UI (mobile first)
1. Added media queries for the desktop breakpoint
1. Programmed validation functions
1. Programmed the 'count-up' number animation
1. Refactored and split functions into util files
1. Created a basic test script for the calculator function

### Built with

- Vite
- [React](https://reactjs.org/) - JS library
- JavaScript
- TypeScript
- Sass (SCSS)
- Mobile-first workflow
- [DOM Constraint API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState#browser_compatibility) - Field validation
- Vitest

### What I learned

#### CSS

1. Fluid font sizing can be achieved using the [`clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function and flexbox:

```scss
.age {
  padding-top: 8rem;
  font-size: clamp($size-input, 6.4rem, 14vw);
  font-weight: 800;
  font-style: italic;
  line-height: 7rem;
  @include desktop {
    padding-top: 6rem;
    font-size: 10.5rem;
    line-height: 12rem;
  }

  &__data {
    display: flex;
    gap: 1rem;
  }

  &__unit {
    flex-shrink: 1;
  }
}
```

2. Using `translate` with percentage values moves the element based on its own dimensions.

#### React

1. **`useRef`** is not only used for getting a value but for accessing DOM properties of a referenced node. This was useful for field validation. Other than that, its great for getting a value without changing states.

1. **`onBlur`** is React's equivalent of JavaScripts `onFocusOut` event.

1. State update functions can be passed into utility functions as callbacks. It is then executed in the utility function body.

#### TypeScript for React

- `React.SyntheticEvent` is used to define an event type when adding an event listener. Other forms of event types are:
  - `KeyboardEvent`: For key presses
  - `FormEvent`: For use with `onInput`

#### JavaScript

- Timers (`setInterval` and `setTimeout`) need to be assigned to a variable. Else, there's no way to reference them when calling `clearInterval`/ `clearTimeout`.

- **Modulo operator:** dividing a value by 0 returns `NaN`.

  In the _count up_ function _(animation utils)_, if targetVal was divided by 0, the result will be `NaN` creating a bug which causes the setInterval function to loop infinately. To fix this, we use the ternary operator to define the values per case:

  ```javascript
  const remainder = steps > 0 ? targetVal % steps : 0;
  ```

- **`e.preventDefault`** isn't only used for preventing form submission or hyperlinks. Additionally, it can be used to prevent certain letters from being entered in a form.

  The 'e' _(Eulers number)_, '+' and '-' values are used to represent numbers. However, 'e' or 'E' sets the `badInput` validation value to `true`, triggering the field's invalid state.

  On top of validating against bad inputs, it improves the user experience to prevent these characters from being entered.

#### Deployment (GitHub Pages)

I [learned how to deploy an automated vite app](https://vitejs.dev/guide/static-deploy) build using GitHub Actions and configuring `vite.config` accordingly. This was my first time working with GitHub Actions and would love to learn more things I could automate.

### Continued development

- Learn more React Typescript types through [Codevolution](https://youtube.com/playlist?list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK&si=f_JXJXh6i76_cj1-) and the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- Learn how to write unit tests for void and asynchronous functions.

### Useful resources

- [Learn CSS Transform In 15 Minutes](https://www.youtube.com/watch?v=rzD-cPhq02E&t=27s) - Web Dev Simplified
- [Form Validation Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) - MDN

## Author

- Website - [Richard Acquaye](https://www.richardacquaye.com)
- Frontend Mentor - [@Pensive1](https://www.frontendmentor.io/profile/Pensive1)

## Acknowledgments

- [React TypeScript Tutorials for Beginners](https://youtube.com/playlist?list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK&si=f_JXJXh6i76_cj1-) - Codevolution
- [Constraint Validation API in practice](https://youtu.be/D9JHizCAx8U?si=BXeZCudd0T3WCaSR) - Steve Griffith
- [ChatGPT](https://chat.openai.com/) - For learning and resolving advanced type issues when the solution wasn't readily available in StackOverflow.
- [How to block +,- and e in Number Input](https://dev.to/narendersaini32/how-to-block-and-e-in-number-input-1hoe) - Narender Saini
