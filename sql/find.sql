SELECT 
    s.store_id, 
    p.name AS product_name, 
    h.current_price, 
    h.amount,
    h.units
FROM 
    Has h
JOIN 
    Product p ON h.product_id = p.product_id
JOIN 
    Stores s ON h.store_id = s.store_id
WHERE 
    s.zip_code = 10002
    AND (p.name = 'Ginger' OR p.product_id = 19);