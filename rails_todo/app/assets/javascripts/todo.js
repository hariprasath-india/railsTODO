
function create_todo(){
    var task_name = document.getElementById('task_name').value;
    Rails.ajax({
        url: '/todos',
        type: 'post',
        data:
           'todo[task_name]='+task_name,      
       success:function(response){ 
            if(response.message == "success"){
                var update_parm = `onclick = "update_todo(${response.data.id},'InProgress','Completed')"`;
                var add = '<div class="task" id = "task_'+response.data.id+'"><span id="taskname">'+response.data.task_name +' </span><button class="inprogress" '+update_parm+'  ><span>In Progress</span></button><button class="delete"  onclick="delete_todo('+ response.data.id+')"><i class="far fa-trash-alt" aria-hidden="true"></i></button></div>'
                document.getElementById('tasks-Open').innerHTML+=add;   
                document.getElementById('task_name').value= "";  
                var x = document.getElementsByTagName("DIV")[2];
                if (x.id == "error") { 
                    document.getElementById('error').remove(); 
                }
            }else{
                var add = '<div id="error" class="message-alert">'+response.message+'</div>'
                document.getElementById('tasks-head').innerHTML+=add;   
            }
       } 
    });
};

function update_todo(id,stat,next_stat){
    var task_id = '/todos/'+id;
    var status = stat;
    var next_status = next_stat;
    console.log(`${status} -- ${next_status}`)
    Rails.ajax({
        url: task_id,
        type: 'put',
        data:
           'todo[status]='+status,         
       success:function(response){ 
            if (response.message == "success") {
                document.getElementById('task_'+id).remove();
                if(next_status == "Nil"){
                    var add = '<div class="task completed" id = "task_'+response.data.id+'"><span id="taskname">'+response.data.task_name +' </span><button class="delete" onclick="delete('+response.data.id+')"><i class="far fa-trash-alt" aria-hidden="true"></i></button></div>'
                    document.getElementById('tasks-'+status ).innerHTML+=add;
                }else{
                    var update_parm = `onclick = "update_todo(${response.data.id},'Completed','Nil')"`;
                    var add = '<div class="task" id = "task_'+response.data.id+'"><span id="taskname">'+response.data.task_name +' </span><button class="inprogress" '+update_parm+' ><span>'+next_status+'</span></button><button class="delete" onclick="delete_todo('+ response.data.id+')"><i class="far fa-trash-alt" aria-hidden="true"></i></button></div>'
                    document.getElementById('tasks-'+status ).innerHTML+=add;
                }
                var x = document.getElementsByTagName("DIV")[2];
                if (x.id == "error") { 
                    document.getElementById('error').remove(); 
                } 
            }else{
                var add = '<div id="error" class="message-alert">'+response.message+'</div>'
                document.getElementById('tasks-head').innerHTML+=add;   
            }
       }
    });
}

function delete_todo(id){
    var task_id = '/todos/'+id;
    Rails.ajax({
        url: task_id,
        type: 'delete',
        success:function(response){ 
            if (response.message == "success") {
                document.getElementById('task_'+id).remove();
                var x = document.getElementsByTagName("DIV")[2];
                if (x.id == "error") { 
                    document.getElementById('error').remove(); 
                }
            }else{
                var add = '<div id="error" class="message-alert">'+response.message+'</div>'
                document.getElementById('tasks-head').innerHTML+=add;   
            }
        }
    });
}
