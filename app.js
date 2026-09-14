// ----------------------
// TEAMS
// ----------------------
const teams = [
    { id: 1, name: "Bountiful/Viewmont MS Boys" },
    { id: 2, name: "Farmington MS Boys" },
    { id: 3, name: "Davis/Layton MS Boys" },
    { id: 4, name: "Northridge/CF/SY MS Boys" },
    { id: 5, name: "Bountiful MS Girls" },
    { id: 6, name: "Viewmont MS Girls" },
    { id: 7, name: "Farmington MS Girls" },
    { id: 8, name: "Davis/Layton MS Girls" },
    { id: 9, name: "Northridge/CF/SY MS Girls" },
    { id: 10, name: "Bountiful Orange" },
    { id: 11, name: "Farmington/Centerville Orange" },
    { id: 12, name: "Kaysville Orange" },
    { id: 13, name: "Layton Orange" },
    { id: 14, name: "Clearfield Orange" },
    { id: 15, name: "North Ogden Orange" },
    { id: 16, name: "Pleasant View Orange" },
    { id: 17, name: "Centerville/Farmington/BO HS" },
    { id: 18, name: "Kaysville/Layton HS" },
    { id: 19, name: "Weber HS" },
    { id: 20, name: "Fremont HS" }
];

// ----------------------
// COURTS
// ----------------------
const courts = [
    { id: 1, name: "Farmington High School" },
    { id: 2, name: "West Muller Park" },
    { id: 3, name: "Davis High School" },
    { id: 4, name: "Viewmont High School" },
    { id: 5, name: "Northridge High School" },
    { id: 6, name: "Ogden High School" },
    { id: 7, name: "North Ogden Park" },
    { id: 8, name: "Fremont High School" },
    { id: 9, name: "Syracuse High School" },
    { id: 10, name: "Clearfield High School" },
    { id: 11, name: "Weber High School" },
    { id: 12, name: "Five Points Park" },
    { id: 13, name: "Ranches Park" },
    { id: 14, name: "Chapel Park" },
    { id: 15, name: "Fire House Park" }
];

// ----------------------
// LOAD SAVED SCHEDULES
// ----------------------
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

// ----------------------
// LOAD DROPDOWNS
// ----------------------
function loadDropdowns() {
    const teamSelect = document.getElementById("teamSelect");
    const courtSelect = document.getElementById("courtSelect");

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.id;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    courts.forEach(court => {
        const option = document.createElement("option");
        option.value = court.id;
        option.textContent = court.name;
        courtSelect.appendChild(option);
    });
}

// ----------------------
// ADD SCHEDULE ENTRY
// ----------------------
function addSchedule() {
    const teamId = document.getElementById("teamSelect").value;
    const courtId = document.getElementById("courtSelect").value;
    const date = document.getElementById("dateInput").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    const teamName = teams.find(t => t.id == teamId).name;
    const courtName = courts.find(c => c.id == courtId).name;

    schedules.push({ teamName, courtName, date, start, end });

    localStorage.setItem("schedules", JSON.stringify(schedules));

    renderCalendar();
    renderSavedList();
}

// ----------------------
// DELETE ENTRY
// ----------------------
function deleteSchedule(index) {
    schedules.splice(index, 1);
    localStorage.setItem("schedules", JSON.stringify(schedules));
    renderCalendar();
    renderSavedList();
}

// ----------------------
// EDIT ENTRY
// ----------------------
function editSchedule(index) {
    const s = schedules[index];

    document.getElementById("teamSelect").value =
        teams.find(t => t.name === s.teamName).id;

    document.getElementById("courtSelect").value =
        courts.find(c => c.name === s.courtName).id;

    document.getElementById("dateInput").value = s.date;
    document.getElementById("startTime").value = s.start;
    document.getElementById("endTime").value = s.end;

    schedules.splice(index, 1);
    localStorage.setItem("schedules", JSON.stringify(schedules));

    renderCalendar();
    renderSavedList();
}

// ----------------------
// RENDER SAVED LIST
// ----------------------
function renderSavedList() {
    const list = document.getElementById("savedList");
    list.innerHTML = "";

    schedules.forEach((s, index) => {
        list.innerHTML += `
            <div>
                ${s.date}: ${s.teamName} at ${s.courtName} from ${s.start} to ${s.end}
                <button onclick="deleteSchedule(${index})">Delete</button>
                <button onclick="editSchedule(${index})">Edit</button>
            </div>
        `;
    });
}

// ----------------------
// RENDER CALENDAR VIEW
// ----------------------
function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const dates = [...new Set(schedules.map(s => s.date))].sort();

    let html = "<table><tr><th>Date</th><th>Schedule</th></tr>";

    dates.forEach(date => {
        html += `<tr><td>${date}</td><td>`;

        schedules
            .filter(s => s.date === date)
            .forEach(s => {
                html += `${s.teamName} at ${s.courtName}: ${s.start} - ${s.end}<br>`;
            });

        html += "</td></tr>";
    });

    html += "</table>";
    calendar.innerHTML = html;
}

// ----------------------
// INIT PAGE
// ----------------------
loadDropdowns();
renderCalendar();
renderSavedList();
