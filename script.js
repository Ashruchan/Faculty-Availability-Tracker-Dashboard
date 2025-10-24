// Faculty data
const facultyList = [
    // Department of Computer Science and Information Technology
    { name: "Prof. Abanti Padhan", dept: "CSE", status: "available", next: "2:00 PM" },
    { name: "Prof. Ajit Kumar Mahapatra", dept: "CSE", status: "busy", next: "3:30 PM" },
    { name: "Prof. Ajit Nayak", dept: "CSE", status: "available", next: "1:00 PM" },
    { name: "Prof. Alok Ranjan Sahoo", dept: "CSE", status: "break", next: "12:30 PM" },
    { name: "Prof. Ambit Kumar Pany", dept: "CSE", status: "available", next: "2:45 PM" },

    // Department of Civil Engineering
    { name: "Dr. Sapan Kumar Sadual", dept: "Civil", status: "available", next: "1:30 PM" },
    { name: "Dr. Susanta Ranjan Chaini", dept: "Civil", status: "busy", next: "3:00 PM" },
    { name: "Dr. Smita S. Mahapatra", dept: "Civil", status: "break", next: "12:15 PM" },
    { name: "Dr. Sasmita Mohanty", dept: "Civil", status: "available", next: "2:00 PM" },
    { name: "Dr. Ansuman Samal", dept: "Civil", status: "busy", next: "4:00 PM" },
    { name: "Dr. Lalat Indu Misra", dept: "Civil", status: "available", next: "1:00 PM" },
    { name: "Dr. Patita Paban Mohanty", dept: "Civil", status: "break", next: "12:45 PM" },
    { name: "Dr. Mou Roy", dept: "Civil", status: "available", next: "3:15 PM" },
    { name: "Mr. Abhilash Satapathy", dept: "Civil", status: "busy", next: "2:30 PM" },
    { name: "Mr. Sourav Shaw", dept: "Civil", status: "available", next: "1:45 PM" },
    { name: "Ms. Sanghamitra", dept: "Civil", status: "break", next: "12:30 PM" },
    { name: "Ms. Rasmita Pradhan", dept: "Civil", status: "available", next: "2:00 PM" },

    // Department of Mechanical Engineering
    { name: "Dr. V. Balaji", dept: "ME", status: "available", next: "2:00 PM" },
    { name: "Mr. P. Sravankumar", dept: "ME", status: "busy", next: "3:30 PM" },
    { name: "Mr. S. Nasar", dept: "ME", status: "break", next: "12:30 PM" },
    { name: "Mr. D. R. Subba Rao", dept: "ME", status: "available", next: "1:00 PM" },
    { name: "Mr. V. Eswaraiah", dept: "ME", status: "busy", next: "4:00 PM" },

    // Department of Electrical and Electronics Engineering
    { name: "Dr. A. Sanjeevi Kumar", dept: "EEE", status: "available", next: "1:30 PM" },
    { name: "Mr. V. Pratapa Rao", dept: "EEE", status: "busy", next: "3:00 PM" },
    { name: "Mr. A. Mahesh Kumar Reddy", dept: "EEE", status: "break", next: "12:15 PM" },
    { name: "Mr. S. Ekbal Ali", dept: "EEE", status: "available", next: "2:00 PM" },
    { name: "Ms. B. Anusha", dept: "EEE", status: "busy", next: "4:30 PM" },
    { name: "Ms. P. Vasundhara", dept: "EEE", status: "break", next: "12:45 PM" },

    // Department of Electronics and Communication Engineering
    { name: "Prof. Priyabrata Pattnaik", dept: "ECE", status: "available", next: "1:00 PM" },
    { name: "Mrs. Sandhyalati Behera", dept: "ECE", status: "busy", next: "2:30 PM" },
    { name: "Mr. Uttpal Tripathy", dept: "ECE", status: "break", next: "12:30 PM" },

    // Department of Master of Business Administration (MBA)
    { name: "Dr. K. Inthiyaz", dept: "MBA", status: "available", next: "1:15 PM" },
    { name: "Dr. A. Sivakozhundu", dept: "MBA", status: "busy", next: "3:45 PM" },
    { name: "Dr. V. Sivakumar", dept: "MBA", status: "break", next: "12:00 PM" },
    { name: "Mr. K. Rasool Basha", dept: "MBA", status: "available", next: "2:30 PM" },
    { name: "Mrs. K. Geethanjali", dept: "MBA", status: "busy", next: "4:00 PM" }
];


const container = document.getElementById("facultyContainer");
const searchInput = document.getElementById("searchInput");
const deptFilter = document.getElementById("departmentFilter");
const darkToggle = document.getElementById("darkModeToggle");
const updateTime = document.getElementById("update-time");

// Update time
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    updateTime.textContent = `Updated: ${hours}:${minutes} ${ampm}`;
}

setInterval(updateClock, 60000);
updateClock();

// Generate faculty cards
function displayFaculty(list) {
    container.innerHTML = "";
    list.forEach((fac, index) => {
        const card = document.createElement("div");
        card.classList.add("faculty-card");
        card.style.setProperty('--i', index); // staggered animation delay
        card.innerHTML = `
    <img class="avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(fac.name)}&background=random" alt="${fac.name}">
    <h3>${fac.name}</h3>
    <p>Dept: ${fac.dept}</p>
    <span class="status ${fac.status}">
      ${fac.status === "available" ? "🟢 Available" :
                fac.status === "busy" ? "🔴 In Class" : "🟡 Break"}
    </span>
    <p style="margin-top:8px;">Next: ${fac.next}</p>
  `;
        container.appendChild(card);
    });

}

// Initial display
displayFaculty(facultyList);

// Search & Filter
function filterFaculty() {
    const query = searchInput.value.toLowerCase();
    const dept = deptFilter.value;

    const filtered = facultyList.filter(fac => {
        const matchesName = fac.name.toLowerCase().includes(query);
        const matchesDept = dept === "All" || fac.dept === dept;
        return matchesName && matchesDept;
    });

    displayFaculty(filtered);
}

searchInput.addEventListener("input", filterFaculty);
deptFilter.addEventListener("change", filterFaculty);

// Dark Mode
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
});

