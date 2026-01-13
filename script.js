const tg = window.Telegram.WebApp;

// Expand to full height
tg.expand();

// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    // Apply Telegram theme colors if available, otherwise fallback is in CSS
    if (tg.themeParams.bg_color) {
        // We stick to our custom dark theme for consistency, 
        // but we could adapt: document.body.style.backgroundColor = tg.themeParams.bg_color;
    }
    
    // Main Button interaction
    const createBtn = document.getElementById('createBtn');
    const taskInput = document.getElementById('taskInput');
    const priorityChips = document.getElementById('priorityChips');
    const assigneeSelect = document.getElementById('assigneeSelect');
    
    let selectedPriority = 'normal';

    // Chip selection logic
    const chips = priorityChips.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedPriority = chip.dataset.value;
            triggerHaptic('selectionChanged');
        });
    });

    // Create Button Logic
    createBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (!task) {
            triggerHaptic('error');
            taskInput.style.borderColor = '#ff4b4b';
            setTimeout(() => taskInput.style.borderColor = 'rgba(255, 255, 255, 0.1)', 500);
            return;
        }

        const assignee = assigneeSelect.value;
        
        const data = {
            task: task,
            priority: selectedPriority,
            assignee: assignee
        };

        triggerHaptic('success');
        tg.sendData(JSON.stringify(data));
    });

    // Haptic feedback helper
    function triggerHaptic(type) {
        if (tg.HapticFeedback) {
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
            else if (type === 'error') tg.HapticFeedback.notificationOccurred('error');
            else if (type === 'selectionChanged') tg.HapticFeedback.selectionChanged();
        }
    }
});
