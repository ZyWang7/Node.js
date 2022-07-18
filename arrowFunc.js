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

console.log(summerizeUser(name, age, hasHobbies));
