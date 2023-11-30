import pandas as pd

def generate_unique_store_ids(input_file_path, output_file_path):
    try:
        # Load the CSV file
        stores_df = pd.read_csv(input_file_path)

        # Generating new unique store_id for each row
        stores_df['store_id'] = range(1, len(stores_df) + 1)

        # Save the updated data to a new CSV file
        stores_df.to_csv(output_file_path, index=False)
        print(f"Data with unique store IDs saved to {output_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage
input_csv_path = 'final_stores.csv'  # Replace with your CSV file path
output_csv_path = 'output.csv'  # Replace with your desired output CSV file path
generate_unique_store_ids(input_csv_path, output_csv_path)
