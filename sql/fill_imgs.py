import os
import psycopg2

# Directory containing your images
image_directory = 'images/'

# Function to convert image to byte array
def image_to_byte_array(image_path):
    with open(image_path, 'rb') as img_file:
        return img_file.read()

# Connect to your PostgreSQL database
conn = psycopg2.connect("dbname=grocery user=postgres password=12345")
cur = conn.cursor()

# Insert each image into the Images table
for filename in os.listdir(image_directory):
    if filename.endswith(".png") or filename.endswith(".jpg"):  # Check image format
        image_path = os.path.join(image_directory, filename)
        image_bytes = image_to_byte_array(image_path)
        cur.execute("INSERT INTO Images (image, image_path) VALUES (%s, %s) ON CONFLICT (image_path) DO NOTHING",
                    (psycopg2.Binary(image_bytes), image_path))

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()
