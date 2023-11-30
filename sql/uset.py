import pandas as pd

df = pd.read_csv("products.csv")

unique_set = set(df['category'].unique())

print(unique_set)