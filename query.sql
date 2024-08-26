use mentor;
select * from login;

CREATE TABLE studentinfo ( id int NOT NULL AUTO_INCREMENT,name varchar(255), program varchar(255), branch varchar(255), email varchar(255), phone int(10), dob date);

select* from studentinfo;
drop table studentinfo;

CREATE TABLE studentinfo (
    sid INT PRIMARY KEY AUTO_INCREMENT,
    id INT,
    name VARCHAR(100),
    program VARCHAR(100),
    branch VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    dob DATE,
    FOREIGN KEY (id) REFERENCES login(id)
);

CREATE TABLE cgpadetails (
    cid INT PRIMARY KEY AUTO_INCREMENT,
    id INT,
    semester VARCHAR(225),
    grade int(10),
    internalkt int(10),
    externalkt int(10),
    totalkt int(10),
    aggrigate varchar(225),
    FOREIGN KEY (id) REFERENCES login(id)
);

INSERT INTO studentinfo (id, name, program, branch, email, phone, dob)
VALUES (LAST_INSERT_ID(), 'John Doe', 'B.Tech', 'CSE', 'john.doe@example.com', '1234567890', '2000-01-01');