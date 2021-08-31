db.students.insertMany([
  {
    "address": {
       "building": "11",
       "coord": [ -73.856077, 40.848447 ],
       "street": "Арсенальная",
       "zipcode": "021234"
    },
    "name": "Алексей",
    "surname": "Влашковец",
    "age": 21,
    "group": "КН-2",
    "grades": [
       { "predmet": "математика", "score": 3 },
       { "predmet": "физика", "score": 3 },
       { "predmet": "программирование", "score": 5 },
       { "predmet": "алгоритмы", "score": 4 },
    ]
  },
  {
    "address": {
       "building": "31",
       "coord": [ -73.856077, 40.848447 ],
       "street": "Суворова",
       "zipcode": "23410"
    },
    "name": "Владимир",
    "surname": "Баранов",
    "age": 18,
    "group": "КН-1",
    "grades": [
       { "predmet": "математика", "score": 5 },
       { "predmet": "физика", "score": 5 },
       { "predmet": "программирование", "score": 3 },
    ]
  },
  {
    "address": {
       "building": "22",
       "coord": [ -73.856077, 40.848447 ],
       "street": "Айвазовского",
       "zipcode": "120422"
    },
    "name": "Анастасия",
    "surname": "Белянцева",
    "age": 20,
    "group": "КН-2",
    "grades": [
       { "predmet": "математика", "score": 5 },
       { "predmet": "физика", "score": 5 },
       { "predmet": "программирование", "score": 5 },
       { "predmet": "алгоритмы", "score": 4 },
    ]
  }
])

// Проверка на 4 предмета
db.students.find({ grades: {$size: 4} })

// Вывод имени и фамилии
db.students.find({}, {_id:0, name:1, surname:1})

// Обновление первого студента
db.students.updateMany(
  {
    grades: {$elemMatch: {score:5}},
    age: {$gte: 19},
    age: {$lte: 21}
  },
  {$set: {age: 18, group: "МП-1"}}
)
