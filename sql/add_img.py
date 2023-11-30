import pandas as pd

# Create a DataFrame
df = pd.read_csv('products.csv')

# Mapping from specific categories to general labels
general_to_specific = {
    "Meat & Seafood": [
        "Pork", "Chicken & Turkey", "Lamb & Veal", "Beef", "Salmon", "Shrimp", 
        "Squid & Octopus", "Smoked Fish", "Shellfish", "Kebabs & Marinated Meat",
        "Bacon, Sausages & Hot Dogs", "Fish", "Meat", "Deli Meat"
    ],
    "Dairy & Alternatives": [
        "Milk & Cream", "Cheese", "Deli Cheese", "Lactose-Free", 
        "Non-dairy Milk Alternatives", "Yogurt", "Butter & Spreads", "Lactose Free",
        "Sour Cream & Dips", "Non-Dairy Milk Alternatives", "Egg & Egg Substitutes"
    ],
    "Bakery & Breakfast": [
        "Bread", "Bagels, Buns & Rolls", "Breakfast", "Cereal & Breakfast", 
        "Cereal & Granola", "Quiches & Pies", "Fresh Pasta & Sauce",
        "Bakery", "Bakery & Breakfast ", "Bakery & Deli"
    ],
    "Snacks & Appetizers": [
        "Snacks", "Cookies & Crackers", "Snacks & Dips", "Appetizers & Snacks", 
        "Candy & Chocolate", "Snack Cakes", "Chips & Snacks", " Dips, Spreads & Antipasto",
        "Chocolate, Candy & Gum ", "Crackers & Cookies", "Crackers & Condiments", "Snacks ", "Snacks, Cookies & Crackers",
        "Bulk Nuts and Candy", "Dried Fruits & Nuts", "Party Trays", "Spreads & Syrups", "Seafood Appetizers"
    ],
    "Beverages": [
        "Coffee", "Tea & Hot Drinks", "Beverages & Ice", "Non-Alcoholic Drinks", "Juice", 
        "Soft Drinks", "Fresh Juice & Smoothies", "Sports & Energy", "Drink Mixes", "Beverages", "Water"
    ],
    "Frozen & Prepared Foods": [
        "Frozen Pizza", "Frozen Fruit & Vegetables", "Frozen Entrees", 
        "Frozen Meat & Seafood", "Easy Meals & Sides", "Easy Prep Meals & Sides", "Meals, Entrees & Sides", 
        "Lunch & Snack Kits", "Rotisserie & Fried Chicken", "Frozen", "Entrees & Appetizers", "Fries & Sides"
    ],
    "Pantry Staples": [
        "Condiments, Sauces & Oil", "Pasta & Pasta Sauce", "Canned Food", "Canned Goods", 
        "Dried Beans, Vegetables & Grains", "Rice", "Spices & Seasonings", "Baking Essentials", 
        "Noodles & Noodle Soup", "Condiments & Sauces", "Oil & Vinegar", "Oils & Vinegar", 
        "Herbs", "Canned", "Canned & Pickled ", "Canned, Pickled Food & Olives"
    ],
    "Fresh Produce": [
        "Fresh Vegetables", "Fresh Cut Fruits & Vegetables", "Fresh Fruits", 
        "Packaged Salad & Dressing", "Salads & Soups"
    ],
    "Specialty & International Foods": [
        "International Foods", "Latin American Foods", "Sushi", 
        "Wraps, Pitas & Flatbread", "Vegan & Vegetarian", "Gluten-Free", "Organic", "Deli"
    ],
    "Desserts & Baking": [
        "Ice Cream & Desserts", "Baking", "Desserts & Doughs", "Cakes & Desserts", 
        "Honey, Syrups & Spreads", "Pizza", "Pizza Crusts & Crumbs ", "Sandwiches", 
        "Meatless Alternatives", "Offals, Game Meat & Fowl"
    ]
}


# Function to find the general category
def find_general_category(specific_category):
    for general, specifics in general_to_specific.items():
        if specific_category in specifics:
            return general
    return None

# Apply the function to each row in the DataFrame
df['image'] = df['category'].apply(lambda x: f"images/{find_general_category(x)}.png" if find_general_category(x) else None)

df.to_csv('products_2.csv', index=False)
