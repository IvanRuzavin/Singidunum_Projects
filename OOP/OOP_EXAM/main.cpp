/*
 * Midterm 2 + Exam solution for Object Oriented Programming course.
 * Made by Ivan Ruzavin - index number 2023230658.
 * 
 * Requirements for this project are below:
 * @requirement Minimum 6 classes with one abstract.
 * @classes
 * 1) Date;
 * 2) Person (abstract);
 * 3) Student;
 * 4) Professor;
 * 5) Course;
 * 6) University.
 * 
 * @requirement Inheritance.
 * @inheritance
 * Person ----
 *    |      |
 * Student   Professor
 * 
 * @requirement Polymorphism
 * @functions
 * getInfo() - virtual function being overridden both by Student and Professor classes
 * 
 * @requirement Virtual functions
 * @functions called via base class pointer(Person*) stored in vector<Person*>
 * getInfo();
 * display()
 * 
 * @requirement Overload at least 2 operators
 * @operators overloaded
 * == - in Date amd Course
 * << - in Date and in Course
 * 
 * @requirement Use at least 3 algorithms from the <algorithm> library
 * @algorithms
 * std::sort – in University::showAllCourses();
 * std::find_if – in University::findPersonById()
 * std::for_each
 * 
 * @requirement Exceptions
 * @exceptions
 * Date::validate() throws invalid_argument
 * University::saveToFile() and loadFromFile() throw runtime_error
 * main() wraps the logic in a try / catch
 * 
 * @requirement Reading/writing from/in the file
 * @file abuse
 * Writing : University::saveToFile()
 * Reading : University::loadFromFile()
 * 
 * @requirement Create a vector of objects and use all defined functions from the classes
 * @vectors
 * vector<Person*> people:
 * 1) addPerson();
 * 2) showAllPeople();
 * 3) findPersonById();
 * 4) saveToFile();
 * 5) loadFromFile();
 * vector<Course> courses:
 * 1) addCourse();
 * 2) showAllCourses();
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <fstream>
#include <stdexcept>
#include <memory>

using namespace std;

/*
 * @class Date.
 * @brief Represents a simple date with day, month, year.
 * @details Supports operator== and stream output.
 *          Throws exceptions for invalid date.
 */
class Date {
private:
    int day;
    int month;
    int year;

    // Simple date validation.
    void validate() {
        if (1900 > year || 2100 < year)
            throw invalid_argument("Year out of range");
        if (1 > month || 12 < month)
            throw invalid_argument("Month out of range");
        if (1 > day)
            throw invalid_argument("Day out of range");

        // Days in each month.
        int daysInMonth[] = { 31, 28, 31, 30, 31, 30,
                              31, 31, 30, 31, 30, 31 };

        // Check for leap year and adjust February.
        bool isLeap = (0 == year % 4 && (0 != year % 100 || 0 == year % 400));
        if (isLeap && (2 == month))
            daysInMonth[1] = 29;

        if (day > daysInMonth[month - 1])
            throw invalid_argument("Invalid day for the given month");
    }

public:
    Date(int d = 1, int m = 1, int y = 2000) : day(d), month(m), year(y) {
        validate();
    }

    // Equality operator overload.
    bool operator==(const Date& other) const {
        return day == other.day && month == other.month && year == other.year;
    }

    // Stream output operator overload.
    friend ostream& operator<<(ostream& os, const Date& date) {
        os << date.day << "/" << date.month << "/" << date.year;
        return os;
    }
};

/*
 * @class Person (Abstract).
 * @brief Base class for all people in the university.
 * @details Has name and id, pure virtual functions for polymorphism.
 */
class Person {
protected:
    string name;
    int id;

public:
    Person(const string& n, int i) : name(n), id(i) {}

    // Pure virtual function to get info about the person.
    virtual string getInfo() const = 0;

    // Virtual function to display info on console.
    virtual void display() const {
        cout << getInfo() << endl;
    }

    // Virtual destructor for polymorphism.
    virtual ~Person() = default;

    int getId() const { return id; }
};

/*
 * @class Student (derived from Person).
 * @brief Has additional attribute GPA.
 * @details Overrides virtual methods.
 */
class Student : public Person {
private:
    double GPA;

public:
    Student(const string& n, int i, double gpa) : Person(n, i), GPA(gpa) {}

    string getInfo() const override {
        return "Student: " + name + ", ID: " + to_string(id) + ", GPA: " + to_string(GPA);
    }
};

/*
 * @class Professor (derived from Person).
 * @brief Has additional attribute department.
 * @details Overrides virtual methods.
 */
class Professor : public Person {
private:
    string department;

public:
    Professor(const string& n, int i, const string& dept) : Person(n, i), department(dept) {}

    string getInfo() const override {
        return "Professor: " + name + ", ID: " + to_string(id) + ", Dept: " + department;
    }
};

/*
 * @class Course.
 * @brief Represents a university course with title, courseCode, startDate.
 * @details Overloads == to compare courses by code and title.
 *          Overloads << to print course info.
 */
class Course {
private:
    string title;
    int courseCode;
    Date startDate;

public:
    Course(const string& t, int c, const Date& d) : title(t), courseCode(c), startDate(d) {}

    // Equality operator compares courseCode and title.
    bool operator==(const Course& other) const {
        return (courseCode == other.courseCode) && (title == other.title);
    }

    // Stream output operator.
    friend ostream& operator<<(ostream& os, const Course& c) {
        os << "Course: " << c.title << " (" << c.courseCode << "), Starts: " << c.startDate;
        return os;
    }

    string getTitle() const { return title; }
    int getCourseCode() const { return courseCode; }
};

/*
 * @class University.
 * @brief Manages collections of Person* and Course objects.
 * @details Provides methods to add persons/courses, display, file I/O, and more.
 */
class University {
private:
    vector<Person*> people;
    vector<Course> courses;

public:
    ~University() {
        // Clean up dynamically allocated Person objects.
        for (auto p : people) {
            delete p;
        }
    }

    // Add a person (Student or Professor).
    void addPerson(Person* p) {
        people.push_back(p);
    }

    // Add a course.
    void addCourse(const Course& c) {
        courses.push_back(c);
    }

    // Show all people using polymorphism.
    void showAllPeople() const {
        cout << "---- University People ----" << endl;
        for (const auto& p : people) {
            p->display();
        }
    }

    // Show all courses sorted by title with std::sort.
    void showAllCourses() {
        cout << "---- University Courses ----" << endl;
        sort(courses.begin(), courses.end(), [](const Course& a, const Course& b) {
            return a.getTitle() < b.getTitle();
            });
        for (const auto& c : courses) {
            cout << c << endl;
        }
    }

    // Find a person by ID using std::find_if and display info.
    void findPersonById(int id) const {
        auto it = find_if(people.begin(), people.end(),
            [id](const Person* p) { return p->getId() == id; });

        if (it != people.end()) {
            cout << "Person found: ";
            (*it)->display();
        }
        else {
            cout << "No person found with ID " << id << endl;
        }
    }

    // Save people info to a file.
    void saveToFile(const string& filename) const {
        ofstream ofs(filename);
        if (!ofs) {
            throw runtime_error("Failed to open file for writing");
        }

        // Write each person info as a single line.
        for (const auto& p : people) {
            ofs << p->getInfo() << endl;
        }
    }

    // Load people from file.
    void loadFromFile(const string& filename) {
        ifstream ifs(filename);
        if (!ifs) {
            throw runtime_error("Failed to open file for reading");
        }

        string line;
        while (getline(ifs, line)) {
            cout << "Loaded line: " << line << endl;
        }
    }
};

int main() {
    try {
        University uni;

        // Add persons.
        uni.addPerson(new Student("Ivan Ruzavin", 2023230658, 9.0));
        uni.addPerson(new Professor("Prof. Zivkovic", 0000000000, "OOP"));
        uni.addPerson(new Professor("Assistent Aleksa Cuk", 0000000001, "OOP"));

        // Add courses.
        uni.addCourse(Course("OOP 2", 101, Date(17, 2, 2025)));
        uni.addCourse(Course("OSs and System Programming", 102, Date(18, 2, 2025)));
        uni.addCourse(Course("Algorithms and DS", 103, Date(5, 5, 2025)));

        // Show all people.
        uni.showAllPeople();

        // Show all courses (sorted by title).
        uni.showAllCourses();

        // Find a person by ID.
        uni.findPersonById(2023230658);
        uni.findPersonById(0000000001);

        // Save people to file.
        uni.saveToFile("people.txt");

        // Load people from file.
        uni.loadFromFile("people.txt");
    }
    catch (const exception& ex) {
        cerr << "Error: " << ex.what() << endl;
    }

    return 0;
}
