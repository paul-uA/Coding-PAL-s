const PALSinfo = [{
    name: "Paul",
    hobbies: ['Video Games','Movies','Eating Food'],
    tvShows: ['The Witcher','The Book of Boba Fett','Loki'],
    favoriteDogActivity:['Walking in the park', 'Sleeping','Playing Fetch'],
    dogs:[]
},{
    name: "Addy",
    hobbies: ['Watcing Tv','Walking around the Park',"Hanging out"],
    tvShows: ['The Great','The Office',"Bob's Burger"],
    favoriteDogActivity:['Walks', 'Playing catch','Going to Astros Games'], 
    dogs:[] 
},{
    name: "Lauren",
    hobbies: ['Crafting','Watching Tv',"Playing the Sims"],
    tvShows: ['Community','The Office',"Archer"],
    favoriteDogActivity:['Playing Ball', 'Belly Rubs','Taking a Ride in the Car'],
    dogs:[]
}]

const dogInfo=[{
    name: 'Dex',
    age: 10,
    breed: 'Pit Lab mix (Pit-ador)',
    fixed: true,
    owner: 'Paul'
},{
    name: 'Charlie Girl',
    age: 1.5,
    breed: 'Super Mutt',
    fixed: true,
    owner:'Addy'
},{
    name: 'Cay',
    age: 10,
    breed: 'Pit Lab mix (Pit-ador)',
    fixed: true,
    owner:'Lauren'

}]


const Owners = require('./Owners')

 Owners.insertMany(PALSinfo).then(console.log).catch(console.error).finally(()=>process.exit)