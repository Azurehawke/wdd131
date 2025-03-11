let currentParticipants = 1;

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addParticipant");
    const form = document.getElementById("registrationForm");

    addButton.addEventListener("click", () => {
        currentParticipants++;
        const newParticipant = participantTemplate(currentParticipants);
        addButton.insertAdjacentHTML("beforebegin", newParticipant);
    });

    form.addEventListener("submit", submitForm);
});

function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <label for="fee${count}">Fee:</label>
            <input type="number" id="fee${count}" name="fee${count}" required>
        </section>
    `;
}

function submitForm(event) {
    event.preventDefault();
    const adultName = document.getElementById("adultName").value;
    const total = totalFees();
    const info = {
        name: adultName,
        participants: currentParticipants,
        total: total
    };
    const summary = document.getElementById("summary");
    const form = document.getElementById("registrationForm");

    form.style.display = "none";
    summary.classList.remove("hide");
    summary.innerHTML = successTemplate(info);
}

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    const total = feeElements.reduce((sum, element) => {
        return sum + (Number(element.value) || 0);
    }, 0);
    return total;
}

function successTemplate(info) {
    return `
        Thank you ${info.name} for registering. You have registered ${info.participants} participants and owe $${info.total} in Fees.
    `;
}