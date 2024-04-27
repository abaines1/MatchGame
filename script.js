function createNewCard() {
	/* Step 1: Create a new div element and assign it to a variable called cardElement. */

	/* Step 2: Add the "card" class to the variable 'cardElement' from the previous step. */
	
	/* Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement. */

  markup = `<div class="card-down"></div>
		        <div class="card-up"></div>`
	
  /* Step 4: Return the cardElement. */
	
  let cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = markup;

  return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {
	/* Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement. */
	
	/* Step 2: Append the card element to the parentElement (making the card element a "child").  */
	
  /* Step 3: Return the card element. */

  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);

  return cardElement;

}
appendNewCardTest();


function shuffleCardImageClasses() {
  /* Step 1: Create a new array that contains two of each image class string in order (e.g. "image-1", "image-1", "image-2", "image-2"...). Store the array in a variable called 'cardClasses'.  */

  let cardClasses = ["image-1","image-1","image-2","image-2","image-3","image-3","image-4","image-4","image-5","image-5","image-6","image-6"]
	
	/* Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" character as an object to contain helper methods. Load underscore.js in your HTML via the CDN then open up the documentation linked below to learn how to use the 'shuffle' method.  
         
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm 
 
  NOTE: Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The '_' variable will already be available to you from loading the CDN. */

  //var _ = require('underscore');
   
	/* Step 3: Return the shuffled array of class names. */

  let shuffledCardClasses = _.shuffle(cardClasses);
  return shuffledCardClasses;


}
shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
	/* Step 1: Make an empty array to hold our card objects. */

  cardObjectsArray = [];

  /* Step 2: Write a for loop that loops 12 times to create the 12 cards we need. */
    
    /* Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable. */
    
		/* Step 2(b): Add an image class to the new card element using shuffledImageClasses[i]. */
    
    /* Step 2(c): Append a new object to the card object array. The object should contain the following properties:
			"index" -- Which iteration of the loop this is.
			"element" -- The DOM element for the card.
			"imageClass" -- The string of the image class on the card. */	
	

  /* Step 3: Return the array of 12 card objects. */

  for(let x=0; x<12; x++) {
    let newCard = appendNewCard(parentElement);
        newCard.classList.add(shuffledImageClasses[x]);

    cardObject = {
      index: x,
      element: newCard,
      imageClass: shuffledImageClasses[x]
    };
    
    cardObjectsArray.push(cardObject);
  }
  
  return cardObjectsArray;
	
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	/* Step 1: Determine if two cards match. Remember the properties of our card objects from the createCards() function: index, element, and imageClass. */

	if(cardObject1.imageClass == cardObject2.imageClass) {
    return true;
  }
  else {
    return false; 
  }
}
doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};


function incrementCounter(counterName, parentElement) {
  /* Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0. */
  
  /* Step 2: Increment the counter for 'counterName'. */

  /* Step 3: Change the HTML within 'parentElement' to display the new counter value. */

  if(typeof counters[counterName] === 'undefined') {
    
    counters[counterName] = 0;
  }

  counters[counterName]++;
  
  parentElement.innerHTML = counters[counterName];

}
 incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  /* Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.  */
  
  let flips = document.getElementById("flip-count")
  incrementCounter("flips", flips);
	

	/* Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */

  if(lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return; 
  }

  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */
  

  /* Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function. Remember that newlyFlippedCard and lastCardFlipped are both objects made with the createCards function. This means that, to access each card's classList, you must access the card object's .element property first!  */
	
  	
  /* Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards. */


  /* Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win. Both sounds have been loaded in provided.js as matchAudio and winAudio, respectively. */
	

  /* Step 6: Reset 'lastCardFlipped' to null */

  if(lastCardFlipped.imageClass !== newlyFlippedCard.imageClass) {

    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");

    lastCardFlipped = null;

    return;

  }
  else {

    lastCardFlipped.element.classList.add("border-glow");
    newlyFlippedCard.element.classList.add("border-glow");

     let matches = document.getElementById("match-count");
     incrementCounter("matches", matches);

    if(matches.innerHTML == 6) {
      winAudio.play();
    }
    else {
      matchAudio.play();
    }

  }

  lastCardFlipped = null;
}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
	/* Step 1: Get the card container by its id and store it in a variable. */
    let cardContainer = document.getElementById("card-container");
	
	/* Step 2: Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists.
	See "To remove all children from an element:" in the Examples section of the MDN removeChild documentation -> https://mzl.la/3bklFxP */

	
	/* Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0. */ 

  /* Step 4: Reassign the value of the `counters` dictionary to an empty object  */

	
	/* Step 5: Set lastCardFlipped back to null. */

	
	/* Step 6: Set up a new game. */

  while(cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  let flipsCount = document.getElementById("flip-count");
      flipsCount.innerHTML = 0;
  let matchCount = document.getElementById("match-count");
      matchCount.innerHTML = 0;

  counters = {};

  setUpGame();

}

/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav')

/* OVERVIEW:
Attaches an mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.

INPUT/OUPUT
The 'cardObject' parameter is a custom card object we created in the 'createCards' function.

This function will make the card element associated with 'cardObject' clickable and call onCardFlipped with that cardObject after the flip is complete. */
function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.

    // Card is already flipped, return.
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }

    // Play the "click" sound.
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject);
    }, 500);
  };
}
/* Set up the game. This functions calls createCards() and adds onclicks to each card created. */
function setUpGame() {
  let cardObjects = 
    createCards(document.getElementById("card-container"), shuffleCardImageClasses());

  if (cardObjects != null) {
    for (let i = 0; i < cardObjects.length; i++) {
      flipCardWhenClicked(cardObjects[i]);
    }
  }
}


// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();