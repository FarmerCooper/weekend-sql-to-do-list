$(document).ready(onReady);

function onReady() {
    console.log('Document ready/jQuery in the house');

    // On page load, get tasks
    getTasks();

    // Click listeners
    $('.add-btn').on('click', addTask);
    $('#taskList').on('click', '.remove', removeTask);
    $('#taskList').on('click', '.completed', updateTask)
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
        renderTasks(response);
        // for (let i=0; i < response.length; i++) {
        //     if(response[i].completion !== false ) {
        //         $(`#row`).addClass('lime-green');
        //     }
        // }
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
    })
}

function renderTasks(response) {
console.log('in renderTasks', response);

//append data to the DOM
    for (let i=0; i<response.length; i ++) {
        $('#taskList').append(`
        <tr id = "row" class = "status" data-completion = "${response[i].completion}">
            <td>${response[i].task}</td>
            <td>${response[i].due}</td>
            <td data-id = ${response[i].id} data-complete = ${response[i].completion} class = "completed column-icon">
                ☑️ ${response[i].completion}
            </td>
            <td data-id = ${response[i].id} class = "remove column-icon">
                🗑
            </td>
        </tr>
        `)

    }

}

// Front end experience that allows a user to create a task
// Add task
function addTask() {
    let newData = {
        task: $('#task').val(),
        due: $('#due').val()
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newData
    }).then(function (response) {
        console.log('in Post, this is the response:',response)
        // Append to the DOM
        // Task is created the front end should refresh to show all tasks that need to be completed.
        getTasks();
    }).catch(function (error) {
        console.log('Error in POST /tasks', error)
    })
}

// Update the status of task completion
function updateTask() {
    let id = $(this).data('id');
    let checked = $(this).data('complete')
    console.log('data of checked:', checked);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {completion: !checked}
    }).then(function() {
        getTasks();
        // changeCSS(id);
    }).catch(function(error) {
        alert('Error in UPDATing', error);
    })
}

// Delete task
function removeTask() {
    let taskId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
        data: {id: taskId}
    }).then(function() {
        // Once deleted, refresh the updated tasks
        getTasks();
    }).catch(function(error) {
        console.log('Check in DELETE /tasks', error);
    })
}

// Each Task should have an option to 'Complete' or 'Delete'.