module.exports = function () {
  // function (storedMap)
  let greetCount = 0;
  let map = {};

  // function storeMap(){
  //   if (storedMap) {
  //     map = storedMap;
  //   }
  // }

  function assignName(checkedLanguage, nameInput) {
// storeMap();
  let nameLower = nameInput.toLowerCase();
  let name = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    if (name !== '' && checkedLanguage) {
      if (map[name] === undefined){
        map[name] = 0;
      }
      map[name] += 1;
     }
  }

  function returnMap() {
    return Object.keys(map);
  }

  function counter() {
    greetCount = Object.keys(map).length;
    return greetCount;
    }

  function returnUser(username) {
    console.log(map[username]);
    
    return map[username];
  }

  function alert(nameInput, checkedLanguage) {
    if (!nameInput && !checkedLanguage) {
      return "Please enter your name and select a language!"
    }
    else if (nameInput === "") {
        return "Please enter your name!"
//change return string response. This one is for testing purposes.
    }
    else if (!checkedLanguage) {
      return "Please select a language!"
//change return string response. This one is for testing purposes.
    }
    else {
      return "";
    }
    }

  function greetPerson(checkedLanguage, nameInput) {
    let nameLower = nameInput.toLowerCase();
    let name = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);
    let greet = ''
      if (checkedLanguage === "english") {
        greet = "Hello ";
      }
      if (checkedLanguage === "sesotho") {
        greet = "Dumela ";
      }
      if (checkedLanguage === "french") {
        greet = "Bonjour ";
      }
      if (checkedLanguage && nameInput) {
        return greet + name;
      }
      else {
        return "";
      }
  }

  function resetCount() {
    map = {};
    greetCount = 0;
  }

return {
  // storeMap,
  assignName,
  returnMap,
  greetPerson,
  counter,
  alert,
  resetCount,
  returnUser
}
}
