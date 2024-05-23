-- Connect to the 'product_catalog' database
USE product_catalog;

-- Create the 'products' table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price FLOAT(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Check if the 'products' table is empty, and if so, populate it with 10 realistic products
INSERT INTO products (name, image, description, price, created_at)
SELECT * FROM (
    SELECT 'Apple iPhone 13', 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg', 'Latest model with A15 Bionic chip and advanced dual-camera system.', 799.99, NOW() UNION
    SELECT 'Nike Air Max 2021', 'https://letkicks.com/cdn/shop/products/air-max-2021-mens-shoes-8F4Sk5_3894227b-dfa6-4fe5-8412-0bbf1be3a69c.jpg?v=1630026168', 'Comfortable and stylish running shoes with air cushioning.', 129.99, NOW() UNION
    SELECT 'Samsung 55-Inch 4K TV', 'https://exitocol.vtexassets.com/arquivos/ids/22649044/televisor-samsung-55-pulgadas-1397cm-led-cristal-uhd-4k-negro-un55cu7000kxzl.jpg?v=638496806336170000', 'Ultra HD smart TV with high dynamic range and Crystal Display.', 549.99, NOW() UNION
    SELECT 'Bose QuietComfort Headphones', 'https://m.media-amazon.com/images/I/51qfLURUtpL.jpg', 'Noise cancelling wireless headphones with high-fidelity audio.', 279.99, NOW() UNION
    SELECT 'Kindle Paperwhite', 'https://exitocol.vtexassets.com/arquivos/ids/14412776/kindle-paperwhite-11-amazon-lector-digital-68-pulgadas-luz-ambar-8gb.jpg?v=637974774865830000', 'Waterproof e-reader with a 6.8-inch glare-free display.', 139.99, NOW() UNION
    SELECT 'Levis 501 Original Jeans', 'https://levisco.vtexassets.com/arquivos/ids/262612/Jeans-Jean-Levis-501-Original-para-Hombre-36129-501-Indigo-Medio_2.jpg?v=638266938912330000', 'Classic straight fit jeans with signature button fly.', 59.99, NOW() UNION
    SELECT 'Sony PlayStation 5', 'https://exitocol.vtexassets.com/arquivos/ids/9154830/consola-sony-playstation-5-ps5-825gb-lector-de-disco.jpg?v=637631028235770000', 'Next-gen console with lightning-fast loading and an immersive gaming experience.', 499.99, NOW() UNION
    SELECT 'DeLonghi Espresso Machine', 'https://cb.scene7.com/is/image/Crate/DelonghiSSPumpEsprMakerSHF16/$web_pdp_main_carousel_med$/240201164008/delonghi-stainless-steel-pump-espresso-maker.jpg', 'Barista-style coffee maker with integrated frother.', 219.99, NOW() UNION
    SELECT 'Dyson V11 Torque Drive', 'https://www.vacuumgenie.co.uk/media/catalog/product/cache/c3a216d52ee0b86dae1bbdbd4a645704/d/y/dyson-v11-torque-drive-motorhead-970100-03.jpg', 'High-performance cordless vacuum with intelligent cleaning modes.', 599.99, NOW() UNION
    SELECT 'Patagonia Down Sweater Jacket', 'https://www.patagonia.com.au/cdn/shop/products/84675_NENA.jpg?v=1678061985', 'Lightweight and windproof jacket with 800-fill-power down.', 229.99, NOW()
) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM products
);
