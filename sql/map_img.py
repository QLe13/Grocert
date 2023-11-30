import os
import psycopg2
import csv

# Function to normalize image paths
def normalize_path(path):
    # This function should be modified according to how paths are stored in your database
    # For example, removing leading './', making sure the path format is consistent, etc.
    return os.path.normpath(path).replace('\\', '/')

# Connect to your PostgreSQL database
conn = psycopg2.connect("dbname=grocery_database user=postgres password=12345")
cur = conn.cursor()

# Fetch the mapping from image paths to image IDs
cur.execute("SELECT image_path, image_id FROM Images")
image_path_to_id = {normalize_path(row[0]): row[1] for row in cur.fetchall()}

# Print the mapping for debugging
print("Image Path to ID Mapping:")
for path, image_id in image_path_to_id.items():
    print(f"{path}: {image_id}")

cur.close()
conn.close()

# Read the current CSV file
with open('products_2.csv', mode='r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)

# Replace image paths with image IDs in the data
for row in data[1:]:  # Skip header row
    image_path = normalize_path(row[3])  # Assuming the image path is in the fourth column
    if image_path in image_path_to_id:
        row[3] = image_path_to_id[image_path]
    else:
        row[3] = 'DefaultID'  # Or any other default value you prefer
        print(f"No match found for image path: {image_path}")

# Write the updated data to a new CSV file
with open('products_3.csv', mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)
