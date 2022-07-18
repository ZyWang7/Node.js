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
person.greet();


// arrays -----------------------------------------------------------
const hobbies = ['Sports', 'Crosstalk', 1, true, {}];

// for (let hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));   create a new array
console.log(hobbies);
