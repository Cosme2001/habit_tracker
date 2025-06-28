document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add_button');
    const habitList = document.getElementById('habits');

    addButton.addEventListener('click', function () {
        createHabitElement('', false); // Adds an empty habit
        saveHabitsToStorage(); // Save to localStorage
    });

    loadHabitsFromStorage(); // Load stored habits when page loads

    function createHabitElement(habitText, isChecked = false) {
        const habitContainer = document.createElement('div');
        habitContainer.className = 'habit-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.addEventListener('change', saveHabitsToStorage);

        const input = document.createElement('input');
        input.type = 'text';
        input.value = habitText;
        input.placeholder = 'Enter habit';
        input.disabled = habitText !== '';

        const editButton = document.createElement('button');
        editButton.textContent = habitText ? 'Edit' : 'Save';
        editButton.addEventListener('click', function () {
            input.disabled = !input.disabled;
            editButton.textContent = input.disabled ? 'Edit' : 'Save';
            saveHabitsToStorage();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            if (confirm(`Are you sure you want to delete the habit "${input.value}"?`)) {
            habitContainer.remove();
            saveHabitsToStorage();
            }
        });

        habitContainer.appendChild(checkbox);
        habitContainer.appendChild(input);
        habitContainer.appendChild(editButton);
        habitContainer.appendChild(deleteButton);
        habitList.appendChild(habitContainer);
    }

    function saveHabitsToStorage() {
        const habitItems = habitList.querySelectorAll('.habit-item');
        const habits = [];

        habitItems.forEach(item => {
            const text = item.querySelector('input[type="text"]').value.trim();
            const checked = item.querySelector('input[type="checkbox"]').checked;
            if (text !== '') {
                habits.push({ text, checked });
            }
        });

        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function loadHabitsFromStorage() {
        const saved = JSON.parse(localStorage.getItem('habits')) || [];
        saved.forEach(habit => {
            createHabitElement(habit.text, habit.checked);
        });
    }
});