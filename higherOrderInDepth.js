

// higher-order functions are functions that operate on other functions, 
// either by taking them as arguments or by returning them,

//A callback function is a function passed into another function as an argument, 
//which is then invoked inside the outer function to complete some kind of routine or action.

//In other words. A higher order functions is a function that takes in another function.
//The latter function is called a callback function because the higherorder function calls it as many times as we like.

/*
    This makes more sense maybe when we talk about the basics of functions.
    A function declaration is when we tell our script what a piece of the code should do.
 */
// this is a declaration.
function nameOfFunction(paramater) {
    //body of our code
}

//Then when we want to excecute the function, we call it (via it's name)
nameOfFunction("argument") //this is a function call.


//So a higher order function calls another one. We only call the higher order function.

function higherOrder( callbackFn ){
    //call the callback function inside body
    callbackFn() //this is a function call.
}

//This is a function declaration.
function callBack(){
    console.log("Hello there")
}

higherOrder(callBack) //this is a function call, and we pass a function as argument.

//<------- Map method -------->
//Documentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

//The map() method creates a new array with the results of calling a provided function on every element in the calling array.
//Let's first see how this would work if we write it ourselves.

//The following function takes in two arguments. First one is the array we're looping over.
//Second argument is the callback function. So the function we call on every iteration.
function homeMadeMap(array, callbackFnc) {
    let mapped = []; // new array 
    for (let i = 0; i < array.length; i++) {
        mapped.push(callbackFnc(array[i])); //calling the callbackfunction, which takes in an element of the array we put in.
    }
    return mapped; //after looping over entire array homeMadeMap (the higher order function) returns the new array
}

const nameArray = ["Jack", "Eva", "Eric"];

//This is a function declaration. It's also a function we can pass as an argument to another function
function changeNameToUpperCase(string) {
    let element = string;
    return element.toUpperCase();
}

// Inb this case we have a function homeMadeMap and we pass an array and another function.
const anotherArray = homeMadeMap(nameArray, changeNameToUpperCase);

console.log("Changed names to uppercase", anotherArray);

//Here we wrote the callback as an anonymous function in the function call.
//In other words: in this secenario we decalare the callback function directly in the function call of our higher order function.
const mappedArray = homeMadeMap(nameArray, function(anElement){
    if(anElement === "Eva"){
        anElement = "Adam"
    }
    return anElement;
});

console.log("Changed name to Adam", mappedArray);



//If we use map instead of our own custom method, we don't have to write the loop manually anymore.
//In this case we use a custom function as argument (which will be called by the map function).
//We use the same function to transform the names to uppercase as before.
const upperCaseWithMap = nameArray.map(changeNameToUpperCase);

//Or, we can write map and use an anonymous function as an argument.

const toLowerCase = nameArray.map( function(elementInArray) {
    let eachElement = elementInArray;
    return eachElement.toLowerCase();
})

console.log("change to lower case", toLowerCase);



//< ------- Filter method ------>
//Documentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

//The filter() method creates a new array with all elements that pass the test implemented by the provided function.

//Let's first write that oursleves again.

function customFilter (array, conditionalFunction) {
    let passed = []; // empty array where we gonna store our new values
    for (let i = 0; i < array.length; i++) { 
        if (conditionalFunction(array[i])) { //here we use the boolean value of our callback function as our condition whether or not to add something to our new array.
            passed.push(array[i]);
        }
    }
    return passed;
}

//Here we write filter and our callback is written as anonymous function in the call of filter
const filteredNameArray = customFilter(nameArray, function(element) {
    //if an element from the array does meet our condition we return true, else we return false.
    if (element !== "Jack") {
        return true;
    } else {
        return false; 
    }
})

console.log("Filtered array", filteredNameArray)

//We can also decare our callback outside our function call.
function filterOutEva(name) {
    if(name !== "Eva") return true;
    else return false;
}

const noEva = customFilter(nameArray, filterOutEva);

console.log("New array without Eva", noEva);


//If we use the filter method and use an anonymous callback function as argument.
const filterNameQuick = nameArray.filter( function(elem) {
    if (elem !== "Jack") return elem;
})

console.log("Filter out Jack with filter method", filterNameQuick);

//If we use our a function declared elsewhere we implement it like so:

const filterEvaOut = nameArray.filter(filterOutEva)

console.log("No Eva with filter method", filterEvaOut);


// <-------- Reduce ------- >
//Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

let numbers = [1, 2, 3, 4]

//Reduce is transforming a set of values to one value
const customReduce = (array, combine, start) => {
    //here start is our initial value.
    let current = start;
    for (let i = 0; i < array.length; i++) {
        current = combine(current, array[i]); // we loop over the array and store the return value outside the loop. So we can keep on adding (reducing in this case)
    }
    return current; // return a single value
}

//here we call our custom reduce with as arguments an array, and anonymous function and 0 as initial counter.
const counted = customReduce(numbers, function(a, b) {
    return a + b
}, 0);


console.log("Custom count", counted)

//Here we use reduce method with an anonymous function
const reduced = numbers.reduce( function (a, b) {
   return a + b;
}, 0)

console.log("Reduce method", reduced)

//But we can also call it with an function declared elsewhere.

function reducer(a,b) {
    return a + b;
}  
const anotherReduce = numbers.reduce(reducer);

console.log("One more time we reduce", anotherReduce);


//<------ Sort ------->
//Dpocumentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//The sort() method sorts the elements of an array in place and returns the sorted array. 
//The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

//So writting out sort customly is a bit more complex. Here is a link with a more visual representation: https://www.w3resource.com/javascript-exercises/javascript-function-exercise-24.php.


//This is also nicely descriptive: https://www.sitepoint.com/sophisticated-sorting-in-javascript/
//JavaScripts sorting algorithm relies on the technique of bubble sort.
//There are a lot more, and in some cases there are once that will be more optimal, depending on the data you're working with.
// You can find them here: https://brilliant.org/wiki/sorting-algorithms/.

//Here let's write a custom bubble sorting alogithm.
function bubbleSort(array) {
    let swapp;
    let length = array.length - 1;
    let newArray = array
    //A do while loop is like a while loop, but will always execute atleast once.
    do {
        //set to false in order to avoid infinite loop.
        swapp = false;
        for (let i=0; i < length; i++) {
            //Here we give a condition. In this case we want to sort by a descending order.
            if ( newArray[i] > newArray[i+1]) {
                //We need to temporaraly store in order to make swamp between elements.
                let temp = newArray[i];
                newArray[i] = newArray[i+1];
                newArray[i+1] = temp;
                //We need to swap in order to execute the do block again.
                swapp = true;
            }
        }
    } while (swapp);
    return newArray; 
}

console.log("Custom bubble", bubbleSort([1,3,1,5]));

//Implement JS's native sorting algorithm.

const numbersArray = [1,4,10,100, 99, 2, 34];


//To compare numbers instead of strings, the compare function can simply subtract b from a. 
//The following function will sort the array in ascending order
function sorter(a,b) {
    return a - b;
}

const sorted = numbersArray.sort(sorter);

console.log("Native sorting", sorted)

//If we deal with strings

function compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }


const orderArrayOfName = nameArray.sort(compare);
console.log("Order alphabetically", orderArrayOfName);

//If we are dealing with more complex data types we have to specifiy that in the callback of sort.

const arrayWithObject = [
    { name: "Jack" },
    { name: "Eva" },
    { name: "Eric" }
];

function compareObjectProperties(a,b) {
    //Now a and be will be objects, so we have access to there properties (in this case name)
    if(a.name < b.name) return -1;
    else if(a.name > b.name) return 1;
    else return 0;
}

const orderedObj = arrayWithObject.sort(compareObjectProperties);

console.log("Ordered an array with object", orderedObj);