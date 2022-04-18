# <h1>📍 Database-Dev</h1>
- 🔧 DevNetwork#2103
- 🔖 V 1.0.0

## 📚 Dependence Libs use

- 💎 NodeJs V 16.14.2 [(NodeJs)](https://nodejs.org/en/)
- 💎 fs [(nodeFS)](https://discord.js.org/https://nodejs.org/api/fs.html)

## 💻 Use libs

#### import the file in your project, preferably, in libs folders

### Initialize
```js
const databaseModel = require('./libs/database-dev/');
const data = new databaseModel(options);
```
### Option
```js
const options = {     
    root: "root/path/your/database.json",
    autoSave: Boolean, // true or false, if true "timeForAutoSave" is not optional     
    timeForAutoSave: Number, // in seconds
}
```
### Interaction with libs
```js
const data = new databaseModel({
    root: `${__dirname}/exemple.json`
})

// get Database
const db = data.database;

console.log(data.database); // {users: ['Exemple']}
console.log(require('exemple.json')); // {users: ['Exemple']}

// exemple of use
if (!db['users']) db['users'] = [];
db['users'].push('DevNetwork');

// set Database
data.database = db;

// if "autoSave" in options is false
data.save();

console.log(data.database); // {users: ['Exemple','DevNetwork']}
console.log(require('exemple.json')); // {users: ['Exemple','DevNetwork']}
```

## 🙎‍♂️ Author

- [DevNetworktm](https://github.com/DevNetworktm)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
