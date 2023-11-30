import pandas as pd

# Load the CSV file
file_path = 'stores.csv'
stores_df = pd.read_csv(file_path)

# Display the first few rows of the dataframe to understand its structure
stores_df.head()

