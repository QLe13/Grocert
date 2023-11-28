with open('cleaned_file.csv', 'w', encoding='utf-8') as clean_file:
    with open('products.csv', 'r', encoding='windows-1252', errors='ignore') as file:
        for line in file:
            try:
                # Write the line to the new file
                clean_file.write(line)
            except UnicodeDecodeError:
                # Handle or log the error
                print(f'Problematic line: {line}')
