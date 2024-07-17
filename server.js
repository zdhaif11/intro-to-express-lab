const express = require('express');

const app = express();


//exercise 1 - Be Polite, Greet the User
app.get('/greeting/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}!`)
})

//exercise 2 - Rolling the Dice

app.get('/roll/:number', (req, res) => {
    if (isNaN(req.params.number)){
        res.send("this is not a number, please specify a number");
    }

    else {
        function randomNumber() {
            const max = req.params.number;
            return Math.floor(Math.random() * max);
            }
        res.send(`You rolled ${randomNumber()}`);
    }
})

//exercise 3 - I Want THAT One!

app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];
      if (!isNaN(req.params.index)){
            if (req.params.index < collectibles.length){
                res.send(`The item chosen is ${collectibles[req.params.index].name} and its price is ${collectibles[req.params.index].price}`);
            }
            else {
                res.send('This item is not yet in stock. Check back soon!');
            }
      }
      else {
        res.send('This item is not yet in stock. Check back soon!');
      }

    
})

//exercise 4 - Filter Shoes by Query Parameters

app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    const minp = req.query.minp;
    const maxp = req.query.maxp;
    const type = req.query.type
    let arrangedShoes = shoes;

    if (minp){
        arrangedShoes = shoes.filter((shoe) =>{ 
            return shoe.price >= minp;
        })
    }
    else if (maxp){
        arrangedShoes = shoes.filter((shoe) =>{
            return shoe.price <= maxp;
        })
    }
    else if (type){
        arrangedShoes = shoes.filter((shoe) =>{ 
            return shoe.type === type;
        })
    }
    
    let display = "";

    arrangedShoes.forEach((item) => {
         display += (`<li>Shoe name is "${item.name}", its price is $${item.price}, and the type of shoe is [${item.type}].</li>`);
    })

    res.send(display);
   
});
   
   


app.get('/hello', (req, res) => {
    // Accessing query parameters from the request
    const name = req.query.name;
    const age = req.query.age;

    // Using the query parameters to customize the response
    res.send(`Hello there, ${name}! I hear you are ${age} years old!`);
});

app.listen(8000, () => {
    console.log('Listening on port 3000')
})

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})