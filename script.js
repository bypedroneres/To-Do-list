$(document).ready(function() {
    // Load tasks from localStorage on page load
    loadTasks();

    $(".tdl-new").keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            var inputValue = $(this).val().trim();
            if (inputValue !== "") {
                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + inputValue + "</span><a href='#'>–</a></label></li>");
                $(this).val("");
                saveTasks(); // Save tasks to localStorage
            }
        }
    });

    $(".tdl-content").on("click", "a", function() {
        var li = $(this).parent().parent("li");
        li.addClass("remove").stop().delay(100).slideUp("fast", function() {
            li.remove();
            saveTasks(); // Save tasks to localStorage after removing a task
        });
        return false;
    });

    // Function to save tasks to localStorage
    function saveTasks() {
        var tasks = [];
        $(".tdl-content ul li").each(function() {
            tasks.push($(this).find("span").text());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        var storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            var tasks = JSON.parse(storedTasks);
            $.each(tasks, function(index, task) {
                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + task + "</span><a href='#'>–</a></label></li>");
            });
        }
    }
    
});
