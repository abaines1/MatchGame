# Portfolio Project: Match Game
## Contents
- Introduction
- Tasks
- Other Functions

## To try out this game click the following link: 

## Introduction	
Matching Game 

## Tasks
### 1. **`createNewCard()`**
This function should create and return a new DOM element that represents a card.

**TEST:** `createNewCardTest()`
<hr>

### 2. **`appendNewCard(parentElement)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `parentElement` | DOM Element | `document.getElementById("card-container")` |

 call `createNewCard()`and attach the return card to the DOM

The card should be attached as a "child" of the parameter `parentElement`. 
**TEST:** `appendNewCardTest()`
<hr>

### 3. **`shuffleCardImageClasses()`**
The `style.css` file has styles for six classes named `image-1` through `image-6`. When applied to a card, these classes will make the card face show the corresponding image when flipped. 
	
Return shuffled array of card images

Library called "underscore.js" to shuffle the array. The library is called underscore because it uses an `_` character as an object to contain helper methods.

- [Underscore.js CDN Link](https://cdnjs.com/libraries/underscore.js) 
- [_.shuffle Documentation](https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm)

> **🗒 Note:** Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The `_` variable will automatically be available to you when you link the CDN in your project.

**TEST:** `shuffleCardImageClassesTest()`
<hr>

### 4. **`createCards(parentElement, shuffledImageClasses)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `parentElement` | DOM Element | `document.getElementById("card-container")` |
| `shuffledImageClasses` | Array | `["image-5", "image-1", "image-3"...]` |

This function will: 

1. Create all twelve cards with random images and append each one to the DOM
2. Return an array of custom card objects that we can use to organize our cards on the JavaScript side, separate from the HTML document / DOM. 


New Custom card object should have: 
- `index` — Which iteration of the loop this is.
- `element` — The DOM element for the card.
- `imageClass` — The string of the image class on the card. 


**TEST:** `createCardsTest()`
<hr>

### 5. **`doCardsMatch(cardObject1, cardObject2)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `cardObject1` | Object | `{index: 3, imageClass: "image-5", element: cardElement}` |
| `cardObject2` | Object | `{index: 7, imageClass: "image-1", element: cardElement}` |

Once we know what our card objects look like, we'll write a function to determine if two cards match. 
Properties of our card objects from the `createCards()` function: `index`, `element`, and `imageClass`.

This function should return `true` when `cardObject1` and `cardObject2` have the same image class name and `false` otherwise. 

**TEST:** `doCardsMatchTest()`
<hr>

### 6. **`incrementCounter(counterName, parentElement)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `counterName` | String | `"flips"` |
| `parentElement` | DOM Element | `document.getElementById("flip-count")` |

This function will add one to a counter being displayed on the webpage (either the number of cards flipped or the number of cards matched)
Use an object/dictionary to contain counters 

`counters["flips"]` will store the flip count and `counters["matches"]` will store the match count. Flips and matches = arguments

The `parentElement` parameter is the DOM element that shows the counter in the HTML (e.g. `<span id="flip-count">`). The `innerText` of this element determines what value is displayed for the counter.

**TEST:** `incrementCounterTest()`
<hr>

### 7. **`onCardFlipped(newlyFlippedCard)`**

| Parameter | Type | Example Argument |
| ---- | ---- | ---- |
| `newlyFlippedCard` | Object | `{index: 9, imageClass: "image-1", element: cardElement}` |

This function will be invoked each time the user flips a card. It has one parameter: `newlyFlippedCard` which is the custom card object associated with whichever card has just been flipped. This function should handle the majority of our game's logic: 

- Is this the first or second card flipped in a sequence?
- Do the cards match? 
- Is the game over?

First off, `incrementCounter` function to add one to the flip counter's UI. 

Once the flip counter is incremented, (if `lastCardFlipped` is null). If this is the first card flipped, reassign the value of `lastCardFlipped` to the card object that was just flipped and exit the function with a `return`. 

If two cards are flipped but they *DON'T* match, remove the "flipped" class from each card's DOM element, set `lastCardFlipped` back to null, and return. 

If two cards are flipped and they match, increment the match counter and add a "glow" effect to the matching cards. Play either the win audio or match audio based on whether the user has the number of matches needed to win or not. Both audio files have been loaded in `provided.js` and are stored in variables you can use in your script. You can access them with `matchAudio` and `winAudio`, respectively.

Finally, reset `lastCardFlipped` to null.

**No testing is provided for this function.**
<hr>

### 8. **`resetGame()`**
This function will be called when the user clicks the Reset button at the bottom of the page. 

Remove children from card-container

Flip and Match Count reset and reset dictionary object to empty

lastCardFlipped set to null and call setUpGame() to reset the board

**No testing is provided for this function.**

## Included Function
**`setUpGame()`** - This function sets up the game by calling the `createCards()` function and adding an `onclick` to new each card created.
