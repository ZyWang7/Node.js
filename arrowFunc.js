/*
const name = 'Victor';
let age = 20;
const hasHobbies = true;

age = 25;

// const summerizeUser = function (userName, userAge, userHasHobby) {
//     return ('Name is ' + userName + ', age is ' + userAge +
//             ' and the user has hobbies: ' + userHasHobby);
// }
const summerizeUser = (userName, userAge, userHasHobby) => {
    return ('Name is ' + userName + ', age is ' + userAge +
            ' and the user has hobbies: ' + userHasHobby);
};


const add = (a, b) => a + b;
const addOne = a => a + 1;
const addRandom = () => 1 + 2;

console.log(summerizeUser(name, age, hasHobbies));

console.log(add(1, 2));
console.log(addOne(1));
console.log(addRandom());
*/


// objects ----------------------------------------------------------
const person = {
    name: 'Victor',
    age: 27,
    // greet: () => {
    //     console.log('I am ' + this.name);   // I am undefined
    // }

    // greet: function(){
    //     console.log('I am ' + this.name);   // I am Victor
    // }

    greet(){
        console.log('I am ' + this.name);   // I am Victor
    }
}

// console.log(person);
// person.greet();


// arrays -----------------------------------------------------------
const hobbies = ['Sports', 'Crosstalk', 1, true, {}];

// for (let hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));   // create a new array
// console.log(hobbies);

/*
hobbies.push('Programming');    // get no error when editing constant
// array -> referencr type -> store an address pointing at the place in memory
console.log(hobbies);

const copyArray = hobbies.slice();
console.log(copyArray);

// spread operator
// take the array/object after the operater and pull out all the elements/properties
const copiedArray1 = [hobbies];     // nested array
const copiedArray2 = [...hobbies];
console.log(copiedArray1);
console.log(copiedArray2);

const copyPerson = {...person};
console.log(copyPerson);


// rest operator
// const toArray = (arg1, arg2, arg3) => {
//     return [arg1, arg2, arg3];
// }
const toArray = (...args) => {
    return args;
}
console.log(toArray(1, 2, 3));
console.log(toArray(1, 2, 3, 4));
*/


// destructuring ----------------------------------------------------
// const printName = (personData) => {
//     console.log(personData.name);
// }
const printName = ({ name }) => {
    console.log(name);
}
printName(person);

// object -> pull out by property name
const { name , age } = person;
console.log(name, age);

// pull out in order
//  1st element, 2nd element
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);        // Sports Crosstalk -> no[]


