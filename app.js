


// ----------------------
// DATA (teams + courts)
// ----------------------

const teams = [
    { id: 1, name: "Farmington Aces" },
    { id: 2, name: "Kaysville Smashers" },
    { id: 3, name: "Layton Lightning" },
    // Add up to 20 teams
];

const courts = [
    { id: 1, name: "Farmington Court A", location: "Farmington", open: "08:00", close: "22:00" },
    { id: 2, name: "Farmington Court B", location: "Farmington", open: "08:00", close: "22:00" },
    { id: 3, name: "Kaysville Rec Court 1", location: "Kaysville", open: "07:00", close: "21:00" },
    // Add up to 20 courts
];

let bookings = [];


// ----------------------
// HELPER FUNCTIONS
// ----------------------

function toMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

function isOverlapping(courtId, start, end) {
    return bookings.some(b =>
        b.courtId === courtId &&
        !(end <= b.start || start >= b.end)
    );
}


// ----------------------
// LOAD DROPDOWNS
// ----------------------

function loadDropdowns() {
    const courtSelect = document.getElementById("courtSelect");
    const teamSelect = document.getElementById("teamSelect");

    courts.forEach(c => {
        courtSelect.innerHTML += `<option value="${c.id}">${c.name} (${c.location})</option>`;
    });

    teams.forEach(t => {
        teamSelect.innerHTML += `<option value="${t.id}">${t.name}</option>`;
    });
}


// ----------------------
// BOOKING LOGIC
// ----------------------

function bookCourt() {
    const courtId = Number(document.getElementById("courtSelect").value);
    const teamId = Number(document.getElementById("teamSelect").value);
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    const court = courts.find(c => c.id === courtId);

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);

    if (start < toMinutes(court.open) || end > toMinutes(court.close)) {
        alert("Court is closed during that time.");
        return;
    }

    if (isOverlapping(courtId, start, end)) {
        alert("Time slot already booked.");
        return;
    }

    bookings.push({ courtId, teamId, start, end });
    renderSchedule();
    alert("Booking confirmed!");
}


// ----------------------
// DISPLAY SCHEDULE
// ----------------------

function renderSchedule() {
    const scheduleDiv = document.getElementById("schedule");
    scheduleDiv.innerHTML = "";

    bookings.forEach(b => {
        const court = courts.find(c => c.id === b.courtId).name;
        const team = teams.find(t => t.id === b.teamId).name;

        const start = `${Math.floor(b.start / 60)}:${String(b.start % 60).padStart(2, "0")}`;
        const end = `${Math.floor(b.end / 60)}:${String(b.end % 60).padStart(2, "0")}`;

        scheduleDiv.innerHTML += `
      <div>
        <strong>${court}</strong> — ${team}<br>
        ${start} to ${end}
        <hr>
      </div>
    `;
    });
}


// ----------------------
// INIT
// ----------------------

document.getElementById("bookBtn").addEventListener("click", bookCourt);

loadDropdowns();
renderSchedule();
