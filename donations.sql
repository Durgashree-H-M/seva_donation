
CREATE DATABASE IF NOT EXISTS seva_flow;
USE seva_flow;


CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(15),
    payment_method VARCHAR(50),
    donation_details TEXT,
    total_amount VARCHAR(50)
);
