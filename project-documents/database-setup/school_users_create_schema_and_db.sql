START TRANSACTION;

CREATE DATABASE IF NOT EXISTS schoolusers
    CHARACTER SET utf8
    COLLATE utf8_general_ci;

CREATE USER 'schoolusers'@'localhost' IDENTIFIED BY 'schoolusers';
GRANT ALL PRIVILEGES ON schoolusers.* TO 'schoolusers'@'localhost';

CREATE USER 'schoolusers'@'%' IDENTIFIED BY 'schoolusers';
GRANT ALL PRIVILEGES ON schoolusers.* TO 'schoolusers'@'%';

FLUSH PRIVILEGES;
COMMIT;

