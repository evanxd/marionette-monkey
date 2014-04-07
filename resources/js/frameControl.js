$(document).ready(function(){
    $(document).on('click','a.label',function(){
        console.log(this.id);
        $('#risky_table').hide(1000);
    });
   // alert("123");
    $('select').change(function(){
        console.log($('#display_count').val());
        var t_body=$("#risky_body");
        t_body.append(addTable("setting",123,"12/11",50,1));
    });
    $('#home').click(function(){
        $('#risky_table').fadeToggle(1000);
        $('#searchBar').fadeToggle(1000);
        $('#searchToolBar').fadeToggle(1000);
    });
    $('#help').click(function(){
        $('#data_table').fadeToggle(1000);
    });
});
function addTable(component,name,date,errorCount,id){

    var str="<tr class='danger'>";
    str=str+"<td>"+component+"</td>";
    str=str+"<td>"+name+"</td>";
    str=str+"<td>"+date+"</td>";
    str=str+"<td>"+errorCount+"</td>";
    str=str+"<td><a class='label' href=#><img src='img/bt_detail.png' id='"+id +"'></a></td>";
    //str=str+"<td><a class='label' href=#><img src='img/bt_detail.png'></a></td>"
    str=str+"</tr>";
    return str;

}
function showDateTable(){

}
