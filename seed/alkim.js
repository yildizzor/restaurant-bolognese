const dishes =[
    {

    title: "Bean",//example 1

    ingredients: ["Bean", "Tomatoes", "Salt"], //example

    cuisine: "Turkish",
    dishType: "main_course",


    { enum: [   // You should write one of this dish type into dish type property "dishType: "main_course",.
        "main_course",
        "pasta",
        "pizza",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image:"/images/dishes/bean.jpg" // This is valid for dishes
    image:"/images/drinks/rode-wine.jpg" // This is valid for drinks

    
}, {

    title: "Apple tart",//example 2

    ingredients: ["Apple", "Sugar", "Flour", "Cinnamon"], //example

    cuisine: "Turkish",
    dishType: "dessert",


    { enum: [   // You should write one of this dish type into dish type property "dishType: "main_course",.
        "main_course",
        "pasta",
        "pizza",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image:"/images/desserts/apple-tart.jpg" // This is valid for 
   
}]
