import pandas as pd

def print_stores_by_zip_code(csv_file_path):
    try:
        # Load the CSV file
        stores_df = pd.read_csv(csv_file_path)

        # Group the stores by zip_code and list the store names
        stores_grouped_by_zip = stores_df.groupby('zip_code')['store_name'].apply(list)

        # Print the stores in each zip code
        for zip_code, stores in stores_grouped_by_zip.items():
            print(f"Zip Code: {zip_code}")
            for store in stores:
                print(f" - {store}")
            print()  # Adds a new line for better readability

    except Exception as e:
        print(f"An error occurred: {e}")

# Replace 'path_to_your_csv.csv' with the path to your CSV file
csv_file_path = 'final_stores.csv'
print_stores_by_zip_code(csv_file_path)
