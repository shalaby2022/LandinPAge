$(document).ready(()=>{
    let pname = $('#pname');
    let pcontent = $('#pcontent');
    let save = $('#save');
    let cancel= $('#cancel');
    $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/posts"
    }).done((data,status)=> {
        // console.log(data);
        for(let i=0; i < data.length; i++) {
            $('.container').append(
            `<div>
            <figure><img src="p4.jpg" alt=""></figure>
            <h3>${data[i].title}</h3>
            <p>${data[i].body}
            <button class="edit" >edit<button>
            <button class="delete" id=${150+i}>Delete<button><div>`); 
        }
        var edit = $('.edit');
        for(let i=0; i < edit.length; i++) {
            $(edit[i]).attr("id",`${data[i].id}`);
        }

        $(edit).click ( function() {
            window.location.href = 'index2.html?id=' + this.id;
        });

        var query = window.location.search;

        var urlquery = new URLSearchParams(query);

        var id = urlquery.get(`id`);
        console.log(id);
        $.ajax({
            type:'GET',
            data: JSON.stringify(window.data),
            url:`https://jsonplaceholder.typicode.com/posts/${id}`
        }).done((data,status)=>{
            console.log(data);
            pname.append(data.title)
            pcontent.append(data.body)
        })
        $(save).click(function(){
            $.ajax({
                type:'PUT',
                data : JSON.stringify(window.data),
                url:`https://jsonplaceholder.typicode.com/posts/${id}`
            }).done(function(){
                alert('success');
            }).fail(function(){
                alert('fail');
            })
        })
        $(cancel).click(function() {
            window.location.href = 'index.html';
        })
        $('delete').click(function () {
            $.ajax({
                type:'DELETE',
                url:`https://jsonplaceholder.typicode.com/posts/${id}`
            }). success(function(){
                alert('deleted');
            })
        })
    })
    .fail((error)=> console.log(error.status))
})

