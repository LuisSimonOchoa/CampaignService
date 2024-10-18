CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `status` BOOLEAN DEFAULT TRUE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    `status` BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);

CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    process_date DATE NOT NULL,
    process_hour TIME NOT NULL,
    process_status INT NOT NULL,
    phone_list VARCHAR(255) NOT NULL,
    message_text TEXT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    `text` TEXT NOT NULL,
    shipping_status INT NOT NULL,
    process_date DATE NOT NULL,
    process_hour TIME NOT NULL,
    CONSTRAINT fk_campaign
        FOREIGN KEY (campaign_id)
        REFERENCES campaigns(id)
        ON DELETE CASCADE
);