import pandas as pd
"""
df = pd.read_csv('has.csv') 

# Rounding and converting to integers
df['current_price'] = df['current_price'].round().astype(int)

print(df)

df.to_csv('has.csv', index=False)
"""

def truncate_names_in_csv(csv_file_path, output_file_path):
    try:
        # Load the CSV file
        products_df = pd.read_csv(csv_file_path)

        # Truncate the 'name' column to 20 characters
        products_df['name'] = products_df['name'].apply(lambda x: x[:20] if len(x) > 20 else x)

        # Save the modified data to a new CSV file
        products_df.to_csv(output_file_path, index=False)
        print(f"Data with truncated names saved to {output_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Replace the paths with your actual file paths
input_csv_path = 'products_3.csv'  # Replace with your input CSV file path
output_csv_path = 'products_3.csv'  # Replace with your desired output CSV file path
truncate_names_in_csv(input_csv_path, output_csv_path)
