const mongoose = require('mongoose')
const Dogs = require('./models/Dogs')
const { create } = require('./models/Owners')


const MONGODB_URI= process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dogOwnersDB'

mongoose.connect(MONGODB_URI, () => {
    console.log('Mongoose has connected to MongoDB')
})

const PALSinfo = [{
    name: "Paul",
    hobbies: ['Video Games ','Movies ','Eating Food '],
    tvShows: ['The Witcher ','The Book of Boba Fett ','Loki '],
    favoriteDogActivity:['Walking in the park', 'Sleeping','Playing Fetch'],
    dogs:[],
    img: "https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/ProfilePaul.jpg?raw=true"
},{
    name: "Addy",
    hobbies: ['Watching TV ','Walking around the Park ','Hanging out '],
    tvShows: ['The Great ','The Office ',"Bob's Burger "],
    favoriteDogActivity:['Walks ', 'Playing catch ','Going to Astros Games '], 
    dogs:[], 
    img: "https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/Addy_Charlie.jpg?raw=true"
},{
    name: "Lauren",
    hobbies: ['Crafting ','Watching Tv ',"Playing the Sims "],
    tvShows: ['Community ','The Office ',"Archer "],
    favoriteDogActivity:['Playing Ball ', 'Belly Rubs ','Taking a Ride in the Car' ],
    dogs:[],
    img: "https://github.com/l-Rich/project1-2048/blob/main/CodingPalLauren-1.png?raw=true"
}]

const dogInfo=[{
    name: 'Dex',
    age: 10,
    breed: 'Pit Lab mix (Pit-ador)',
    fixed: true,
    img: ["https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/DexBaby.jpg?raw=true","https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/DexOlder.png?raw=true"]
    
},{
    name: 'Charlie Girl',
    age: 1.5,
    breed: 'Super Mutt',
    fixed: true,
    img: ["https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/IMG_5221.jpg?raw=true", "https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/IMG_2919.JPG?raw=true"]
    
},{
    name: 'Cayenne',
    age: 4,
    breed: 'Golden Doodle',
    fixed: true,
    img: ["https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/Cayenne1.jpg?raw=true","https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/Cayenne2.jpg?raw=true"]

},{
    name: 'Gabby',
    age: 7,
    breed: 'Portuguese Water Dog',
    fixed: true,
    img: ["https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/Gabby1.jpeg?raw=true", "https://github.com/paul-uA/Coding-PAL-s/blob/main/pictures/Gabby2.jpeg?raw=true"]
}]


const Owners = require('./models/Owners')

async function wipeDB(){
    await Owners.deleteMany({})
    await Dogs.deleteMany({})

}
async function createAddy(){
   const addy = await Owners.create(PALSinfo[1])
   const dex = await Dogs.create(dogInfo[1])
   addy.dogs.push(dex)
   await addy.save()

}

async function createLauren(){
    const Lauren = await Owners.create(PALSinfo[2])
    const dex = await Dogs.create(dogInfo[2])
    const dex2 = await Dogs.create(dogInfo[3])
    Lauren.dogs.push(dex)
    Lauren.dogs.push(dex2)
    await Lauren.save()
 
 }

 async function createPaul(){
    const paul = await Owners.create(PALSinfo[0])
    const dex = await Dogs.create(dogInfo[0])
    paul.dogs.push(dex)
    await paul.save()
 
 }

async function main(){
    await wipeDB()
    await createPaul()
    await createAddy()
    await createLauren()

    mongoose.connection.close()
}

main()

//dbSeed()
