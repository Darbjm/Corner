from django.db import models

# Create your models here.


class Food(Models.models):

    api_id = models.CharField(max_length=50)
    title = models.CharField(max_length=500)
    breadcrumbs = models.CharField(max_length=500)
    badges = models.CharField(max_length=500)
    importantBadges = models.CharField(max_length=500)
    ingredientCount = models.CharField(max_length=10)
    generatedText = models.CharField(max_length=500)
    ingredientList = models.CharField(max_length=500)
    ingredients: [
        {
            description: null,
            name: emulsifier,
            safety_level: null
        },
        {
            description: null,
            name: added sugar,
            safety_level: null
        },
        {
            description: null,
            name: sweetener,
            safety_level: null
        },
        {
            description: null,
            name: cooking fat,
            safety_level: null
        },
        {
            description: null,
            name: cooking oil,
            safety_level: null
        },
        {
            description: null,
            name: lecithin,
            safety_level: null
        },
        {
            description: null,
            name: yeast,
            safety_level: null
        },
        {
            description: null,
            name: menu item type,
            safety_level: null
        },
        {
            description: null,
            name: nuts,
            safety_level: null
        },
        {
            description: null,
            name: partially hydrogenated vegetable oil,
            safety_level: low
        },
        {
            description: Unlike partially hydrogenated oils, fully hydrogenated oils do not contain trans fat and thus are currently considered safer.,
            name: hydrogenated vegetable oil,
            safety_level: high
        },
        {
            description: null,
            name: calcium,
            safety_level: null
        },
        {
            description: null,
            name: nut butter,
            safety_level: null
        },
        {
            description: null,
            name: legumes,
            safety_level: null
        },
        {
            description: null,
            name: refined sweetener,
            safety_level: null
        },
        {
            description: null,
            name: non food item,
            safety_level: null
        },
        {
            description: null,
            name: tree nuts,
            safety_level: null
        },
        {
            description: null,
            name: chocolate,
            safety_level: null
        },
        {
            description: null,
            name: sugar,
            safety_level: null
        },
        {
            description: null,
            name: snack,
            safety_level: null
        },
        {
            description: null,
            name: corn syrup,
            safety_level: null
        },
        {
            description: null,
            name: drink,
            safety_level: null
        },
        {
            description: null,
            name: milk,
            safety_level: null
        },
        {
            description: null,
            name: spread,
            safety_level: null
        },
        {
            description: null,
            name: vegetable oil,
            safety_level: null
        },
        {
            description: null,
            name: yeast nutrient,
            safety_level: null
        },
        {
            description: null,
            name: palm kernel oil,
            safety_level: null
        },
        {
            description: null,
            name: artificial ingredient,
            safety_level: null
        },
        {
            description: null,
            name: stabilizer,
            safety_level: null
        },
        {
            description: null,
            name: additive,
            safety_level: null
        },
        {
            description: null,
            name: nutrient,
            safety_level: null
        },
        {
            description: null,
            name: soybean oil,
            safety_level: null
        },
        {
            description: null,
            name: supplement,
            safety_level: null
        },
        {
            description: null,
            name: mineral,
            safety_level: null
        },
        {
            description: null,
            name: artificial flavor,
            safety_level: medium
        },
        {
            description: null,
            name: skim milk,
            safety_level: null
        },
        {
            description: null,
            name: peanuts,
            safety_level: null
        },
        {
            description: null,
            name: corn syrup solids,
            safety_level: medium
        },
        {
            description: Unlike partially hydrogenated oils, fully hydrogenated oils do not contain trans fat and thus are currently considered safer.,
            name: hydrogenated palm kernel oil,
            safety_level: high
        },
        {
            description: null,
            name: cottonseed oil,
            safety_level: null
        },
        {
            description: null,
            name: milkfat,
            safety_level: high
        },
        {
            description: null,
            name: lactose,
            safety_level: null
        },
        {
            description: null,
            name: corn syrup,
            safety_level: null
        },
        {
            description: null,
            name: cocoa butter,
            safety_level: high
        },
        {
            description: null,
            name: tbhq to maintain freshness,
            safety_level: null
        },
        {
            description: null,
            name: peanut butter,
            safety_level: null
        },
        {
            description: null,
            name: egg whites,
            safety_level: null
        },
        {
            description: null,
            name: sugar,
            safety_level: null
        },
        {
            description: null,
            name: milk chocolate,
            safety_level: null
        },
        {
            description: null,
            name: palm oil,
            safety_level: null
        },
        {
            description: null,
            name: artificial flavor,
            safety_level: null
        },
        {
            description: null,
            name: salt,
            safety_level: null
        },
        {
            description: null,
            name: almonds,
            safety_level: null
        },
        {
            description: null,
            name: skim milk less than 2 % - lactose,
            safety_level: null
        },
        {
            description: null,
            name: vegetable oil,
            safety_level: null
        },
        {
            description: null,
            name: less than 2 % - glycerin,
            safety_level: null
        },
        {
            description: null,
            name: dextrose,
            safety_level: high
        },
        {
            description: Soy lecithin is not a concern for most people allergic to soy.,
            name: soy lecithin,
            safety_level: high
        },
        {
            description: null,
            name: invert sugar,
            safety_level: high
        },
        {
            description: null,
            name: chocolate,
            safety_level: null
        },
        {
            description: null,
            name: rapeseed oil,
            safety_level: null
        },
        {
            description: null,
            name: partially hydrogenated soybean oil,
            safety_level: low
        },
        {
            description: null,
            name: calcium carbonate,
            safety_level: high
        },
        {
            description: null,
            name: partially hydrogenated palm kernel oil,
            safety_level: low
        },
        {
            description: null,
            name: artificial flavor.snickers brand,
            safety_level: null
        },
        {
            description: null,
            name: snickers brand almond bar,
            safety_level: null
        }
    ],
    likes = models.CharField(max_length=50)
    aisle = models.CharField(max_length=500)
    nutrition: {
        nutrients: [
            {
                title: Fat,
                amount: 4,
                unit: g,
                percentOfDailyNeeds: 6.15
            },
            {
                title: Protein,
                amount: 10,
                unit: g,
                percentOfDailyNeeds: 20
            },
            {
                title: Calories,
                amount: 200,
                unit: cal,
                percentOfDailyNeeds: 10
            },
            {
                title: Carbohydrates,
                amount: 26,
                unit: g,
                percentOfDailyNeeds: 9.45
            }
        ],
        caloricBreakdown: {
            percentProtein: 22.22,
            percentFat: 20,
            percentCarbs: 57.78
        },
    },
    price = models.CharField(max_length=500)
    servings: {
        number: 8,
        size: 4,
        unit: pieces
    },
