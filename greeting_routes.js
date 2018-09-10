module.exports = function(greet){

    async function greetings(req, res) {
        let language = req.body.language;
        let name = req.body.inputName;
       res.render('home', {
         alert: greet.alert(name, language),
         greetPerson: await greet.greetPerson(language, name),
         count: await greet.counter()
       });
     }

    async function greeted(req, res) {
        res.render('greeted', {
          userCount: await greet.returnUsers()
        });
     }

    async function greetedUser(req, res) {
        res.render('greetedUser', {
           userGreeted: req.params.user,
           greetNumber: await greet.returnUserGreet(req.params.user)
        });
     }

    async function clear(req, res) {
        await greet.resetCount();
       res.redirect('/');
     } 
     
    return {
        greetings,
        greeted,
        greetedUser,
        clear
    }
};