module.exports = function (pool) {

  async function counter() {
    let greetCount = await pool.query('select * from users');
    return greetCount.rowCount
    }

  async function returnUsers() {
    let users = await pool.query('select * from users');
    // console.log(users.rows);    
    return users.rows;
  }

  async function returnUserGreet(name) {
    let userGreetCount = await pool.query('select greet_number from users where username = $1', [name]);   
    //  console.log(userGreetCount.rows);    
    return userGreetCount.rows[0].greet_number;
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

  async function greetPerson(checkedLanguage, nameInput) {
    let nameLower = nameInput.toLowerCase();
    let name = nameLower.charAt(0).toUpperCase() + nameLower.slice(1);

    let greet = ''

    if (name !== '' && checkedLanguage) { 
      let nameResult = await pool.query('select * from users where username = $1', [name])
      if(nameResult.rowCount === 0){
        await pool.query('insert into users(username,greet_number) values($1, $2)', [name, 0])
      }
      await pool.query('update users set greet_number = greet_number + 1 where username = $1', [name])
    };

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

  async function resetCount() {
    let reset = await pool.query('delete from users')
    return reset.rows
  }

return {
  greetPerson,
  counter,
  alert,
  resetCount,
  returnUsers,
  returnUserGreet
}
}
