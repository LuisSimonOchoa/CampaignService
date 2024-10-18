INSERT INTO customers (name, status) 
VALUES 
('Acme Corp', TRUE),
('Globex Inc.', TRUE),
('Initech', FALSE);

INSERT INTO users (customer_id, username, status)
VALUES
(1, 'john_doe', TRUE),
(1, 'jane_doe', TRUE),
(2, 'alice_smith', TRUE),
(2, 'bob_johnson', FALSE);

INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text)
VALUES
(1, 'Summer Promo 2024', '2024-10-20', '10:00:00', 1, '1234567890, 9876543210', 'Get 50% off on summer products!'),
(2, 'Winter Sale 2024', '2024-12-01', '14:00:00', 3, '2345678901, 8765432109', 'Dont miss out on our winter sale!'),
(3, 'Spring Launch 2024', '2024-09-15', '09:00:00', 2, '3456789012, 7654321098', 'Check out our new spring collection!');

INSERT INTO messages (campaign_id, phone, text, shipping_status, process_date, process_hour)
VALUES
(1, '1234567890', 'Get 50% off on summer products!', 1, '2024-10-20', '10:00:00'),
(1, '9876543210', 'Get 50% off on summer products!', 1, '2024-10-20', '10:01:00'),
(2, '2345678901', 'Dont miss out on our winter sale!', 2, '2024-12-01', '14:00:00'),
(2, '8765432109', 'Dont miss out on our winter sale!', 2, '2024-12-01', '14:01:00');