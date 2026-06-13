const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' }
];

const sidebar = document.getElementById('sidebar');
const app = document.getElementById('app');

function buildSidebar() {
    const brand = document.createElement('div');
    brand.className = 'sidebar-brand';
    brand.innerHTML = `
        <div class="logo-circle">L</div>
        <div>
            <div class="brand-title">LearnOS</div>
            <div class="brand-subtitle">Learning dashboard</div>
        </div>
    `;

    const nav = document.createElement('div');
    nav.className = 'sidebar-nav';

    sidebarItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'sidebar-link';
        button.textContent = item.label;
        button.onclick = () => navigate(item.id);
        nav.appendChild(button);
    });

    sidebar.appendChild(brand);
    sidebar.appendChild(nav);
}

function renderDashboard(courses) {
    return `
        <section id="dashboard" class="page active">
            <div class="dashboard-header">
                <div>
                    <div class="dashboard-title">Dashboard</div>
                    <div class="dashboard-subtitle">Your learning progress at a glance.</div>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="summary-card">
                    <h3>Total courses</h3>
                    <div class="course-meta">${courses.length} active courses</div>
                </div>
                <div class="summary-card">
                    <h3>Average progress</h3>
                    <div class="course-meta">${Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%</div>
                </div>
                <div class="summary-card">
                    <h3>Total XP</h3>
                    <div class="course-meta">${courses.reduce((sum, course) => sum + course.xp, 0)} XP</div>
                </div>
            </div>
        </section>
    `;
}

function renderCourses(courses) {
    const cards = courses.map(course => {
        return `
            <article class="course-card">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span>Progress: ${course.progress}%</span>
                    <span>XP: ${course.xp}</span>
                </div>
                <div class="progress-row">
                    <div class="progress-bar">
                        <div class="progress-fill" data-progress="${course.progress}"></div>
                    </div>
                </div>
                <div class="course-summary">
                    <span>${course.progress >= 80 ? 'Nearing completion' : 'Keep going'}</span>
                </div>
            </article>
        `;
    }).join('');

    return `
        <section id="courses" class="page">
            <div class="dashboard-header">
                <div>
                    <div class="dashboard-title">Courses</div>
                    <div class="dashboard-subtitle">Track your course progress and XP.</div>
                </div>
            </div>

            <div class="course-grid">
                ${cards}
            </div>
        </section>
    `;
}

async function initApp() {
    buildSidebar();

    try {
        const response = await fetch('courses.json');
        if (!response.ok) {
            throw new Error('Unable to fetch courses');
        }

        const courses = await response.json();
        app.innerHTML = renderDashboard(courses) + renderCourses(courses);
        animateAllProgressBars();
    } catch (error) {
        app.innerHTML = `<div class="summary-card"><h3>Error loading courses</h3><p>${error.message}</p></div>`;
    }
}

initApp();
