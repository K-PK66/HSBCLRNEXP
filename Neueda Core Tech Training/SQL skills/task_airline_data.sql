CREATE TABLE customer (
    cst_id INT PRIMARY KEY,
    cst_name VARCHAR(100),
    email VARCHAR(100),
    phone_num VARCHAR(15),
    joining_date DATE
);

INSERT INTO customer (cst_id, cst_name, email, phone_num, joining_date) VALUES
(1, 'Alice Smith', 'alice@example.com', '1234567890', '2023-01-10'),
(2, 'Bob Johnson', 'bob@example.com', '1234567891', '2023-01-15'),
(3, 'Charlie Lee', 'charlie@example.com', '1234567892', '2023-02-01'),
(4, 'David Brown', 'david@example.com', '1234567893', '2023-02-05'),
(5, 'Eve Davis', 'eve@example.com', '1234567894', '2023-02-20'),
(6, 'Frank Moore', 'frank@example.com', '1234567895', '2023-03-01'),
(7, 'Grace Wilson', 'grace@example.com', '1234567896', '2023-03-10'),
(8, 'Hank Taylor', 'hank@example.com', '1234567897', '2023-03-15'),
(9, 'Ivy Anderson', 'ivy@example.com', '1234567898', '2023-03-20'),
(10, 'Jack Thomas', 'jack@example.com', '1234567899', '2023-03-25'),
(11, 'Karen White', 'karen@example.com', '1234567800', '2023-04-01'),
(12, 'Leo Martin', 'leo@example.com', '1234567801', '2023-04-05'),
(13, 'Mia Thompson', 'mia@example.com', '1234567802', '2023-04-10'),
(14, 'Nick Garcia', 'nick@example.com', '1234567803', '2023-04-15'),
(15, 'Olivia Martinez', 'olivia@example.com', '1234567804', '2023-04-20'),
(16, 'Paul Robinson', 'paul@example.com', '1234567805', '2023-04-25'),
(17, 'Quinn Clark', 'quinn@example.com', '1234567806', '2023-05-01'),
(18, 'Rachel Rodriguez', 'rachel@example.com', '1234567807', '2023-05-05'),
(19, 'Steve Lewis', 'steve@example.com', '1234567808', '2023-05-10'),
(20, 'Tina Lee', 'tina@example.com', '1234567809', '2023-05-15'),
(21, 'Uma Walker', 'uma@example.com', '1234567810', '2023-05-20'),
(22, 'Victor Hall', 'victor@example.com', '1234567811', '2023-05-25'),
(23, 'Wendy Allen', 'wendy@example.com', '1234567812', '2023-06-01'),
(24, 'Xander Young', 'xander@example.com', '1234567813', '2023-06-05'),
(25, 'Yara Hernandez', 'yara@example.com', '1234567814', '2023-06-10'),
(26, 'Zane King', 'zane@example.com', '1234567815', '2023-06-15'),
(27, 'Amy Scott', 'amy@example.com', '1234567816', '2023-06-20'),
(28, 'Brian Green', 'brian@example.com', '1234567817', '2023-06-25'),
(29, 'Clara Adams', 'clara@example.com', '1234567818', '2023-07-01'),
(30, 'Derek Nelson', 'derek@example.com', '1234567819', '2023-07-05');


CREATE TABLE flying_miles (
    cst_id INT,
    total_miles INT,
    last_flying_dt DATE,
    FOREIGN KEY (cst_id) REFERENCES customer(cst_id)
);


INSERT INTO flying_miles (cst_id, total_miles, last_flying_dt) VALUES
(1, 12000, '2025-02-14'),
(2, 8500, '2024-11-21'),
(3, 4500, '2023-07-10'),
(4, 3000, '2025-06-01'),
(5, 22000, '2024-12-12'),
(6, 9800, '2025-01-30'),
(7, 16000, '2024-10-05'),
(8, 7100, '2023-05-20'),
(9, 13400, '2025-03-18'),
(10, 2500, '2022-12-25'),
(11, 11100, '2025-04-05'),
(12, 6000, '2024-08-18'),
(13, 9400, '2023-03-22'),
(14, 10500, '2024-07-15'),
(15, 12500, '2025-05-12'),
(16, 8700, '2022-09-10'),
(17, 15400, '2025-06-28'),
(18, 6200, '2024-06-19'),
(19, 11900, '2023-10-30'),
(20, 3000, '2025-07-05'),
(21, 7900, '2024-04-14'),
(22, 4000, '2023-11-11'),
(23, 9800, '2025-01-09'),
(24, 11300, '2025-03-25'),
(25, 7200, '2023-01-20'),
(26, 10200, '2025-05-03'),
(27, 8600, '2024-02-16'),
(28, 6900, '2023-08-12'),
(29, 13400, '2025-06-18'),
(30, 5400, '2022-11-04');

CREATE TABLE membership_level (
    lower_limit INT NOT NULL,
    upper_limit INT NOT NULL,
    membership_level VARCHAR(20) NOT NULL,
    CHECK (lower_limit < upper_limit)
);

INSERT INTO membership_level (lower_limit, upper_limit, membership_level) VALUES
(0, 4999, 'Silver'),
(5000, 9999, 'Gold'),
(10000, 14999, 'Platinum'),
(15000, 999999, 'Diamond');


/*
1. Extract and display the domain names from email addresses.
2. Upper Case all the names from customer table.
3. Check for invalid phone numbers where phone number has less than 10 digits
4. Count customers by email domain
5. Find top 3 earliest joined customer
6. Find each customer's membership level. Display their ID, Name, Miles and their Level.
7. find customers who haven’t flown in the last 2 years
8. identify customers whose flying miles should become zero if they haven’t flown in the last 2 years. In the resulting table display cst_id, cst_name,last_flying_dt,total_miles, and a derived column adjusted miles as 0 for the such customers

*/
