class Student {
  constructor(name, age, score) {
    this.name = name;
    this.age = age;
    this.score = score;
  }
}

// Array
let students = [];

// Project functions

function registerStudent(name, age, score) {
  const student = new Student(name, age, score);

  if (students.includes(student)) {
    alert("You cannot add the same student");
  } else {
    students.push(student);
    alert("You have added a new student");
  }

  return Student;
}

function sortByScore(students) {
  students.sort((a, b) => b.score - a.score);
  students.reverse();
  return students;
}

function sortByAge() {
  students.sort((a, b) => b.age - a.age);
  return students;
}

function sortByName(students) {
  return students.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }
  });
}

function calculateAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  let sumScores = 0;

  students.forEach(student => {
    sumScores += Number(student.score);
  });

  const average = sumScores / students.length;
  return average;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function removeStudent(array, name) {
  let index;
  let removed = false;
  array.forEach(student => {
    if (student.name == name) {
      index = array.indexOf(student);
      removed = true;
    }
  });
  array.splice(index, 1);
  return removed;
}

function searchStudent(array, name) {
  let searchResult = false;
  array.forEach(student => {
    if (student.name.includes(name)) {
      searchResult = true;
    }
  });

  return searchResult;
}

// Selecting elements
const studentForm = document.querySelector("#student-form");
const studentInput = document.querySelector("#student-input");
const studentInput2 = document.querySelector("#student-input-2");
const studentInput3 = document.querySelector("#student-input-3");
const studentList = document.querySelector("#student-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Functions
const saveStudent = (name, age, score, done = 0, save = 1) => {
  let studentObject = registerStudent(name, age, score, students);

  const student = document.createElement("div");
  student.classList.add("student");

  const studentName = document.createElement("h3");
  studentName.innerText = studentObject.Name;
  student.appendChild(studentName);

  const studentAge = document.createElement("h3");
  studentAge.innerText = studentObject.Age;
  student.appendChild(studentAge);

  const studentScore = document.createElement("h3");
  studentScore.innerText = studentObject.Score;
  student.appendChild(studentScore);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-student");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  student.appendChild(deleteBtn);

  studentList.appendChild(student);

  const average = document.querySelector("#average");
  average.textContent = calculateAverage(students).toFixed(2);

  studentInput.value = "";
  studentInput2.value = "";
  studentInput3.value = "";
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  studentForm.classList.toggle("hide");
  studentList.classList.toggle("hide");
};

const getSearchStudent = (search) => {
  const students = document.querySelectorAll(".student");

  let searchResult = searchStudent(students, search);

  if (searchResult) {
    students.forEach((student) => {
      const studentName = student.querySelector("h3").innerText.toLowerCase();

      student.style.display = "flex";

      if (!studentName.includes(search)) {
        student.style.display = "none";
      }
    });
  };
}

const filterStudents = (filterValue) => {
  const students = document.querySelectorAll(".student");

  switch (filterValue) {
    case "score":
      students.forEach((student) => {
        student.remove();
      })
      students = sortByScore(students);
      students.forEach((student) => saveStudent(student.name, student.age, student.score, done = 0, save = 1));
      break;

    case "age":
      students.forEach((student) => {
        student.remove();
      })
      students = sortByAge(students);
      students.forEach((student) => saveStudent(student.name, student.age, student.score, done = 0, save = 1));
      break;

    case "name":
      students.forEach((student) => {
        student.remove();
      })
      students = sortByName(students);
      students.forEach((student) => saveStudent(student.name, student.age, student.score, done = 0, save = 1));
      break;

    default:
      break;
  }
};

// Events
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = studentInput.value;
  const inputValue2 = studentInput2.value;
  const inputValue3 = studentInput3.value;

  if (inputValue && inputValue2 && inputValue3) {
    saveStudent(inputValue, inputValue2, inputValue3);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let studentName;

  if (parentEl && parentEl.querySelector("h3")) {
    studentName = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("remove-student")) {
    studentName = parentEl.querySelector("h3").innerText
    let removed = removeStudent(students, studentName)
    if (removed) {
      parentEl.remove();
    }
  }
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchStudent(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterStudents(filterValue);
});

// Local Storage

// const loadStudents = () => {

//   students.forEach((student) => {
//     saveStudent(student.name, student.age, student.score, 0);
//   });
// };

// loadStudents();