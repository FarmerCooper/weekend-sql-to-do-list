$(document).ready(onReady);

function onReady() {
    console.log('Document ready/jQuery in the house');

    // On page load, get tasks
    getTasks();
    $('.add-btn').on('click', addTask);
}

// Get tasks
function getTasks() {
    // empty the table
    $('#taskList').empty();

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('Response from GET /tasks', response);

        //append data to the DOM
        for (let i=0; i<response.length; i++) {
            $('#taskList').append(`
                <tr>
                    <td>${response[i].task}</td>
                    <td>${response[i].due}</td>
                    <td>${response[i].completion}</td>
                    <td>
                    <button>🗑</button>
                    </td>
                </tr>
            `);
        }
    });
}

// Front end experience that allows a user to create a task
// Add task
function addTask() {
    let newData = {
        task: $('#task').val(),
        due: $('#date').val()
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newData
    }).then(function (response) {
        // Append to the DOM
        $('#taskList').append(`
            <td>${response.task}</td>
            <td>${response.due}</td>
        `)
    }).catch(function (error) {
        console.log('Error in POST /tasks', error)
    })
}

// Whenever a Task is created the front end should refresh to show all tasks that need to be completed.

// Each Task should have an option to 'Complete' or 'Delete'.