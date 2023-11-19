# Database final project
Group members:[WeiweiHung](https://github.com/WeiweiHung),[mason45ok](https://github.com/mason45ok)
## Code  
### 1.MySQL create *course* table
```
CREATE TABLE course (
    course_ID INT PRIMARY KEY,
    course_name VARCHAR(255),
    teacher VARCHAR(255),
    credits INT
);
CREATE TABLE portfolio.courses (
    course_ID INT PRIMARY KEY,
    course_name VARCHAR(255),
    credits DECIMAL(3, 1),
    teacher VARCHAR(255)
);
```
### 2.MySQL create *student* table
```
CREATE TABLE student (
    student_ID INT PRIMARY KEY,
    student_name VARCHAR(255),
);
```
### 3.MySQL create *friendship* table  
```
CREATE TABLE friendship (
    student_ID_1 INT,
    student_ID_2 INT,
    PRIMARY KEY (student_ID_1, student_ID_2),
    FOREIGN KEY (student_ID_1) REFERENCES student(student_ID),
    FOREIGN KEY (student_ID_2) REFERENCES student(student_ID)
);
```
### 4.MySQL create *student_course* table  
```
CREATE TABLE student_course (
    student_ID INT,
    course_ID INT,
    PRIMARY KEY (student_ID, course_ID),
    FOREIGN KEY (student_ID) REFERENCES student(student_ID),
    FOREIGN KEY (course_ID) REFERENCES course(course_ID)
);
```
### testy
```
LOAD DATA INFILE 'C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\courses.xls'
INTO TABLE portfolio.courses
FIELDS TERMINATED BY '\t'  -- 使用 Tab 作為分隔符，根據實際情況調整
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;  -- 忽略 Excel 表格中的標題行
```
## Reference
+ [遠端電腦或伺服器連結並存取本機的MySQL(不使用localhost使用IP)](https://evacyl52201.pixnet.net/blog/post/38835291)
