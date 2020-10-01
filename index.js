'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: simply returns the value passed unchanged. 
 * 
 * @param {a value} value: any value
 * 
 * @returns{value}: same value
 */
function identity(value) {
  //return value unchanged  
    return value;
}
module.exports.identity = identity;


/**
 * typeOf: returns the type of value passed as a string
 * 
 * @param {a value} value: any value
 * 
 * @returns{a string}: returns a string specifying the data type 
 */
 
function typeOf(value) {
    if (Array.isArray(value)) {
        return "array";
    } else if (value === null) {
        return "null";
    } else if (value instanceof Date) {
        return "date";
    } else return typeof value;
}
module.exports.typeOf = typeOf;


/**
 * first: returns a given number of items from an array, starting from the first item. 
 * 
 * @param {an array} array: an array 
 * @param {a number} number: a number
 * 
 * @returns{array}: returns an array containing the first <number> of items fom <array>
 */
 
function first(array, number) {
    if (!Array.isArray(array) || number < 0) {
        return [];
    } else if (typeof number !== 'number') {
        return array[0];
    } else {
        return array.slice(0, number);
    }
}
module.exports.first = first;

/**
 * last: returns a given number of items from an array starting from last item
 * 
 * @param {an array} array: an array
 * @param {a number} number: a number
 * 
 * @returns{array: an array containing the last <number> of items from <array>
 */
 
function last(array, number) {
   if (!Array.isArray(array) || number < 0) {
        return [];
    } else if (typeof number !== 'number') {
        return array[array.length-1]; 
    } else {
        return array.slice(-number);
    }
}
module.exports.last = last;

/**
 * indexOf: searches for the first occurance of a given value in an array and returns it's index
 * 
 * @param {an array} array: an array
 * @param {a value} value: a value 
 * 
 * @returns{number}: returns the index number of the first instance of <value> in <array>
 */

function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    } return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: will return true if the array contains the value, false otherwise
 * 
 * @param {an array} array: an array
 * @param {a value} value: any value
 * 
 * @returns{boolean}: returns true or false based on whether <array> contains <value>
 */
 
function contains(array, value) {
    for (let i = 0; i < array.length; i++) {
        return (array.includes(value) ? true : false);
      }
    }
    module.exports.contains = contains;

/**
 * each: Designed to loop over a collection, Array or Object, and applies a
 * given function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} test: The Function to be applied to each value in the 
 * collection
 */

function each(collection,test) {
// check if collection is an array or an object
    if (Array.isArray(collection)) {
// iterate through array and run the given function for each element in the array       
        for (let i = 0; i < collection.length; i++) {
            test(collection[i], i, collection);
        }
// do the same thing if collection is an object        
    } else if (typeof collection === 'object') {
        for (let key in collection) {
            test(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * unique: returns a new array containing only unique values; removes duplicates  
 * 
 * @param {array} array: an array
 * 
 * @returns{array}: a new array with duplicate items removed
 */
  
 function unique(array) {
 // create new array to store unique values
    const uniqueValues = [];
// loop through array 
    for (let i = 0; i < array.length; i++) {
// check if value at given index is the first instance of said value
        if (indexOf(array, array[i]) === i) {
            uniqueValues.push(array[i]);
        }
// return the array of unique values        
    } return uniqueValues;
}
module.exports.unique = unique;

/**
 * filter: iterates through an array and applies a given function to each element; returns 
 * a new array containing elements on which the function returns true
 * 
 * @param {array} array: an array 
 * @param {a function} test: this function will be applied to each element in
 * the array.
 *
 * @returns{array}: returns an array containing only elements in <array>
 * that return true after passing through <test>
 */
 
 function filter(array, test) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (test(array[i], i, array)) {
            newArray.push(array[i]);
        }
    } return newArray;
}
module.exports.filter = filter;

/**
 * reject: iterates through an array and applies a given function to each
 * element; returns a new array containing only elements that returned false
 * 
 * @param {an array} array: an array of values to be tested by <test>
 * @param {a function} test: a function to be applied to elements in <array>
 * 
 * @returns{array}: a new array containing only elements from <array> that when 
 * passed through <test> return false
 */
 
 function reject (array, test) {
    //use filter to pass the array and anonymous funtion through with all its elements
    return filter(array,function(elements,i, a) {
        // return new array for which calling anonymous funtion on elements, index, and array returned fal
        return !test(elements,i,a);
    });
};
module.exports.reject = reject;

/**
 * partition: iterates through an array and applies a function to each element and sorts them
 * into two separate arrays based on if the element when passed through the function returns true or false
 * 
 * @param {an array} array: an array of elements to be tested
 * @param {a function} test: a function to be applied to each element in <array>
 * 
 * @returns{two arrays}: returns two arrays; one for values who returned true when passed through <test>,
 * the second containing those who returned false.
 */
 
function partition(array, test) {
    return [filter(array, test), reject(array, test)];
};
module.exports.partition = partition;

/**
 * map: takes a collection -an array or object- and applies a given function to each
 *  element and returns each result in a new array.
 * 
 * @param {an object or array} collection: an object or array containing values to be
 *   tested by <test>
 * @param {a function} test: 
 * 
 * @returns{array}: an array containing the result of each element from <collection> 
 *  passed through <test>
 */
 
function map(collection, test) {
// create an empty array to store results
    let results = [];
// test if collection is an array    
    if (Array.isArray(collection)) {
// if so, run a for loop, call given function on each element in the array
// and push the result to results array
        for (let i = 0; i < collection.length; i++) {
            results.push(test(collection[i], i, collection));
        }
// do the same if collection is an object
    } else if (typeof collection === 'object') {
        for (let key in collection) {
            results.push(test(collection[key], key, collection));
        }
// return the new modified array containing the results        
    } return results;
}
module.exports.map = map;

/**
 * pluck: takes an array of objects and returns a new array 
 *  containing the values of a given property from each object
 * 
 * @param {an array} array: an array of objects 
 * @param {a property} prop: a property to be searched for in each object
 * 
 * @returns{array}: a new array containing the value of <prop> from each 
 *  object in <array>
 */
 
function pluck(arr, prop) {
    return map(arr, function(obj) {
        return obj[prop];
    })
} 
module.exports.pluck = pluck;

/**
 * every: iterates through a collection -can be an array or object- and calls a function
 *  on each element; returns true only if ALL elements passed through the function return true
 * 
 * @param {an array or object} collection: a collection elements to be tested by a given function
 * @param {a function} test: a function to be called on each element of the collection
 * 
 * @return{boolean}: returns true if <test> returns true on ALL elements; otherwise returns false.
 */
 
function every(collection, test) {
    if (typeof test !== 'function') {
        let result = false;
    each(collection, function(value){
        if(value === true){
        result = true;
    }
    });
    return result;
        
    }
    
    let result = true;
    each(collection, function(e, i, a) {
        if(!test(e, i, a)) {
            result = false;
        }
    });
    return result;
};

module.exports.every = every;

/**
 * some: iterates through a collection -can be an array or object- and passes each element
 *  through a given function; returns true if AT LEAST ONE element returns true 
 * 
 * @param {an array or object} collection: an array or object to be iterated
 * @param {a function} test: a function to be called on eache element in <collection>
 * 
 * @returns{boolean}: returns true if <test> returns true on at least one element
 *  in <collection>; returns false otherwise.
 * 
 */
 
function some(collection, test) {
// test to see if a function is passed
    if (typeof test !== 'function') {
        let result = true; 
        each(collection, function(value) {
            if(value === false) {
                result = false;
            }
        });
        return result;
    } else {

        let results = map(collection, test);
    
        for (let i = 0; i < results.length; i++) {
            if (results[i]) {
            return true;
        }
    } return false;
}
};
module.exports.some = some;

/**
 * reduce: is a cumulative function that compiles the results of a given function called 
 *  against each of the elements in an array and returns a single value.
 * 
 * @param {an array} array: an array
 * @param {a function} test: a function to pass all elements of <array> through
 *  *Optional*
 * @param {a starting value} seed: a starting value from which to add the result of each 
 *  element passed through the <test>
 * 
 * returns{a value}: returns a value; the culmination of the results of each element in <array>
 *  passed through <test> and added to the previous
 */
 
 function reduce(array, test, seed) {
    if (typeof seed === 'undefined') {
        var result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = test(result, array[i], i);
        } 
    } else {
        var result = seed;
        for (let i = 0; i < array.length; i++) {
            result = test(result, array[i], i);
        }
    } 
        return result;
}
 module.exports.reduce = reduce;   
    
    /**
     * extend: takes two or more objects and merges them together into one object
     * 
     * @param {an object} object1: an object to be merged with other objects
     * @param {an object} object2: a second object to merged with the first
     *  CAN PASS ANY NUMBER OF OBJECTS AND COMBINE THEM
     * 
     * @returns{object}: a new object that contains all elements from all objects 
     * passed through the function
     */
     
function extend(...objects) {
    return Object.assign(objects[0], ...objects);
}
    module.exports.extend = extend;
    
