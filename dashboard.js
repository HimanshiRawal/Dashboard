function animateProgress(id, value) {

    const bar = document.getElementById(id);

    if (!bar) return;

    bar.style.width = value + "%";
}

function animateAllProgressBars() {
    document.querySelectorAll(".progress-fill").forEach(bar => {
        const value = parseFloat(bar.dataset.progress) || 0;
        bar.style.width = value + "%";
    });
}

document.addEventListener("DOMContentLoaded", () => {

    animateProgress("react-progress", 75);
    animateProgress("ml-progress", 48);
    animateProgress("design-progress", 92);

});
