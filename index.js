$(function(){

    var currentId = 1;
    var checklistItems = [];


    function updateChecklistItems() {
        var data = JSON.parse(localStorage.getItem('my-todolist'));

        data.forEach((item) => {
            if (!item) return;

            $(".items").append(`
                <div class="item">
                    <div class="check">
                        <input type="checkbox" id="checkbox" checkId="${item.id}">
                    </div>

                    <div class="check-divider"></div>

                    <div class="name">
                        ${item.name}
                    </div>
                </div>
            `);

            $(`input[checkId='${item.id}'`).prop('checked', item.isChecked);
        })
    }

    $("#add-item").click(function() {
        let name = $("#name").val();
        let id = currentId;

        if (name.length <= 0) {
            return console.error("Todo item has to be something");
        }

        checklistItems[id] = {
            name: name,
            id: id,
            isChecked: false
        }

        currentId++;

        $(".items").append(`
            <div class="item">
                <div class="check">
                    <input type="checkbox" id="checkbox" checkId="${id}">
                </div>

                <div class="check-divider"></div>

                <div class="name">
                    ${name}
                </div>
            </div>
        `);

        localStorage.setItem('my-todolist', JSON.stringify(checklistItems));
        $(`input[checkId='${id}'`).prop('checked', false);
    })

    $("#delete-list").click(function(){
        checklistItems = [];
        localStorage.setItem('my-todolist', JSON.stringify(checklistItems));
        updateChecklistItems();
    })

    $("body").on('change', '#checkbox', function(){
        let checkId = $(this).attr('checkid');
        let data = checklistItems[checkId];

        console.log(checkId, data)

        if (data.id == checkId) {
            console.log("yes");
            checklistItems[checkId].isChecked = this.checked;
            console.log(checklistItems[checkId]);
        }
    })

    setTimeout(() => {
        updateChecklistItems();
    }, 100)
})