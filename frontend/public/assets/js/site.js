const dropdownTriggers = document.querySelectorAll('.dropdown-trigger button');
dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        trigger.parentElement.parentElement.classList.add('is-active');
    });
});

const addButtons = document.querySelectorAll('.add');
addButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.querySelector('.add-modal');
        modal.classList.add('is-active');
    });
});

const resetButtons = document.querySelectorAll('.reset');
resetButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const inputElement = button.parentElement.querySelector('.input');
        inputElement.value = '';
    });
});

// listener du document pour enlever les class des div lorsqu'on click sur d'autres élements
document.addEventListener('click', (e) => {
    dropdownTriggers.forEach((trigger) => {
        if (!trigger.contains(e.target)) {
            trigger.parentElement.parentElement.classList.remove('is-active');
        }
    });
});

// désactiver les skeletons et la pageLoader
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.has-skeleton').forEach((skeleton) => {
        skeleton.classList.remove('has-skeleton');
    });
    document.querySelectorAll('.is-skeleton').forEach((skeleton) => {
        skeleton.classList.remove('is-skeleton');
    });
    document.querySelectorAll('.skeleton-block').forEach((skeleton) => {
        skeleton.classList.remove('skeleton-block');
    });
    document.querySelectorAll('.skeleton-lines').forEach((skeleton) => {
        skeleton.classList.remove('skeleton-lines');
    });
    document.querySelector('.pageloader').classList.remove('is-active');
});