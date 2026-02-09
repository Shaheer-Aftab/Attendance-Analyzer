const totalLectures = document.getElementById('totalLectures');
const attendedLectures = document.getElementById('attendedLectures');
const calculateBtn = document.getElementById('calculateBtn');

const attendancePercent = document.getElementById('attendancePercent');
const status = document.getElementById('status');
const lecturesNeeded = document.getElementById('lecturesNeeded');
const progressBar = document.getElementById('progressBar');

// Safe attendance threshold
const threshold = 80; // 80% attendance is considered Safe

// Load previous input from localStorage
window.onload = () => {
    if(localStorage.getItem('total')) totalLectures.value = localStorage.getItem('total');
    if(localStorage.getItem('attended')) attendedLectures.value = localStorage.getItem('attended');
    calculateAttendance();
};

function calculateAttendance() {
    const total = Number(totalLectures.value);
    const attended = Number(attendedLectures.value);

    // Validate input
    if (total <= 0 || attended < 0 || attended > total) {
        attendancePercent.textContent = "0%";
        status.textContent = "-";
        lecturesNeeded.textContent = "-";
        progressBar.style.width = '0';
        progressBar.style.backgroundColor = 'green';
        return;
    }

    // Save input to localStorage
    localStorage.setItem('total', total);
    localStorage.setItem('attended', attended);

    // Calculate attendance percentage
    const attendance = (attended / total) * 100;
    attendancePercent.textContent = attendance.toFixed(2) + "%";

    // Status and color
    if (attendance >= threshold) {
        status.textContent = "Safe";
        status.className = "safe";
        progressBar.style.backgroundColor = 'green';
    } else {
        status.textContent = "Shortage";
        status.className = "shortage";
        progressBar.style.backgroundColor = 'red';
    }

    // Lectures needed to reach 80%
    const needed = Math.ceil((threshold / 100 * total - attended) / (1 - threshold / 100));
    lecturesNeeded.textContent = needed > 0 ? needed : 0;

    // Update progress bar
    progressBar.style.width = Math.min(attendance, 100) + "%";
}

// Real-time calculation as user types
calculateBtn.addEventListener('click', calculateAttendance);
totalLectures.addEventListener('input', calculateAttendance);
attendedLectures.addEventListener('input', calculateAttendance);
