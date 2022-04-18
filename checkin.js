var data = [
    {
        "id": "id1",
        "name": "Jordan Ella",
        "email": "jordan@jordanella.com"
    },
    {
        "id": "id2",
        "name": "2Jorf Ella",
        "email": "2"
    },
    {
        "id": "id3",
        "name": "2Jordee Ella",
        "email": "3"
    },
    {
        "id": "id4",
        "name": "4Jordam Ella",
        "email": "4"
    }
];

function fill_table() {

    var tbody = $('#tbody');

    for (var i = 0; i < data.length; i++) {
        tbody.append("<tr><td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].email + "</td></tr>");
    };
};