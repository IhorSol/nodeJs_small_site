db.users.insertOne(
  {
    "name":"George",
    "email":"admin@test.ru",
    "age":22,
    "hasCar":false,
    "birthday": new Date('1996-11-27')
  }
)

db.users.insertMany([
  {
    "name":"Боб",
    "email":"admin@test.ru",
    "age":22,
    "hasCar":false,
    "birthday": new Date('1996-11-27')
  },
  {
    "name":"Василий",
    "email":"vasya@test.ru",
    "age":22,
    "hasCar":false,
    "birthday": new Date('1996-11-27')
  },
]
)

db.users.find({name: {$in: ["Jack", "John", "Боб"]}}, {_id: 0}).sort({age: 1})
db.users.find({child: {$exists: true}}, {_id: 0}).sort({age: 1})
db.users.find({favColor: {$size: 2}}, {_id: 0}).sort({age: 1})
db.users.find({"favColor.1": "Красный"}, {_id: 0}).sort({age: 1})
db.users.find({favColor: {$elemMatch: {$lt: 20}}}, {_id: 0}).sort({age: 1})

db.users.updateOne({age: 22}, {$set: {age: 25}})
db.users.updateMany({age: 23}, {$set: {name: "User", email: "test@mail.ru"}})
db.users.replaceOne(
  {age: 23},
  {name: "New User", hasCar: 23, password: "1345464", hasWife: true})
db.users.deleteMany({age: {$gte: 22}, age: {$lte: 38}})

db.users.bulkWrite([
  {
    insertOne: {
      "document": {name: "Mike", age: 45, email: "mike@test.ru"}
    }
  },
  {
    deleteOne: {
      filter: {age: 20}
    }
  },
  {
    updateMany: {
      filter: {name: "Mike"},
      update: {$set: {email: "new_email@test.ru"}}
    }
  },
  {
    replaceOne: {
      filter: {name: "John"},
      replacement: {name: "Джон", age: 45, email: "john@mail.ru"}
    }
  },
])
db.articles.insertMany([
  {
    "title": "Акции компаний растут",
    "anons": "Компании стременительно набирают обороты",
    "text": "Рост акций по всем фронтам",
    "autor": "Гоша Дударь",
    "views": 5231,
  },
  {
    "title": "Открытие кофейни",
    "anons": "Новая кофейня была открыта в городе Чишки",
    "text": "Все жители страны празднуют этот день!",
    "autor": "Саша Сударь",
    "views": 1234,
  },
  {
    "title": "Новости города",
    "anons": "Подставки для компьютеров",
    "text": "Новые подсткавки для компьютеров были завезены в магазины",
    "autor": "Иван Царь",
    "views": 3214,
  }
])

db.articles.createIndex({title: "text", anons: "text", text: "text"})
db.articles.find(
  { $text: {$search: "Открытие кофейня"} },
  {score: {$meta: "textScore"}}
).sort({score: {$meta: "textScore"}})

db.users.count({name: "Mike"})
db.users.distinct("age")

db.users.aggregate([
  {$match: {}},
  {$group: {_id: "$name", age: {$sum: "$age"}}}
])

db.products.find( {$text: {$search: "Телефон"}} )

db.students.insertOne(
  {
    "address": {"buildingNumber": 12, "coordinates":[15.785, 198.395], "street": "Kosmosa", "postCode": 111111},
    "name": "Sergiy",
    "surname": "Sergiyev",
    "age": 22,
    "group": 1,
    "marks": [
      {"math": 4},
      {"ukrMova": 5},
      {"economics": 4},
      {"philosophy": 3}
    ]
  }
)

db.students.find( {"marks": {$size: 4}}, {_id: 0}) // 1st task

db.students.find( {}, {name: 1, surname: 1, _id: 0}) //2nd task

db.students.updateMany(
  {"marks.1": 5, age: {$gte: 19}, age: {$lte: 21}},
  {$set: {age: 55, group: 5} }
)
