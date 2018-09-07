const assert = require("assert");
let Greetings = require("../greetings");

let postgres = require('pg');
const Pool = postgres.Pool

const pool = new Pool({
  connectionString: 'postgresql://coder:pg123@localhost:5432/greet_users'
})


describe('Greet Me', function(){

    beforeEach(async function() {
        await pool.query("delete from users");
      });    

    it('should greet Pholisa in English', async function(){
      var greetUser = Greetings(pool);
      let greetName = await greetUser.greetPerson('english','Pholisa');
        assert.equal(greetName, "Hello Pholisa");
    });
    it('should greet Andre in English', async function(){
        var greetUser = Greetings(pool);
        let greetName = await greetUser.greetPerson('english','Andre');
          assert.equal(greetName, "Hello Andre");
    });
    it('should greet Andrew in Sesotho', async function(){
        var greetUser = Greetings(pool);
        let greetName = await greetUser.greetPerson('sesotho','Andrew');
          assert.equal(greetName, "Dumela Andrew");
    });
    it('should greet Yegan in French', async function(){
        var greetUser = Greetings(pool);
        let greetName = await greetUser.greetPerson('french','Yegan');
          assert.equal(greetName, "Bonjour Yegan");
    });



     it('should count how many people have been greeted as 3', async function(){
       var countUsers = Greetings(pool);
         await countUsers.greetPerson(true, 'Andrew');
         await countUsers.greetPerson(true, 'Candice');
         await countUsers.greetPerson(true, 'Taslin');
        assert.equal(3, await countUsers.counter());
     });
     it('should NOT increment counter if the same name has been entered before', async function(){
        var countUsers = Greetings(pool);
        await countUsers.greetPerson(true, 'Nathri');
        await countUsers.greetPerson(true, 'Yegan');
        await countUsers.greetPerson(true, 'Nathri');
       assert.equal(2, await countUsers.counter());
     });
     it('should count how many people have been greeted as 2 because greeting requirements are incomplete', async function(){
        var countUsers = Greetings(pool);
        await countUsers.greetPerson(true, 'Candice');
        await countUsers.greetPerson(true, '');
        await countUsers.greetPerson(true, 'Taslin');
       assert.equal(2, await countUsers.counter());
     });


     it('should return an alert message because no name input has been entered', function(){
       var alertName = Greetings();
        assert.equal(alertName.alert("", "english"), "Please enter your name!");
     });
     it('should return an alert message because no language has been selected', function(){
       var alertRadio = Greetings();
        assert.equal(alertRadio.alert("Candice", ""), "Please select a language!");
     });


     it('should count that Candice has been greeted 4 times', async function(){
        var countGreet = Greetings(pool);
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Candice');
         assert.equal(4, await countGreet.returnUserGreet("Candice"));
      });
     it('should select and only give the greet count for Taslin and show that Taslin has been greeted twice', async function(){
        var countGreet = Greetings(pool);
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Taslin');
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Candice');
          await countGreet.greetPerson(true, 'Taslin');
         assert.equal(2, await countGreet.returnUserGreet("Taslin"));
      });
    
     it('should clear all values in the database', async function(){
         var clearDB = Greetings(pool);
         await clearDB.greetPerson(true, 'Andrew');
         await clearDB.greetPerson(true, 'Candice');
         await clearDB.greetPerson(true, 'Nathri');
         await clearDB.greetPerson(true, 'Yegan');
         await clearDB.greetPerson(true, 'Taslin');
        assert.deepEqual([], await clearDB.resetCount());
     });

    after(async function() {
        await pool.end();
      });

   });
