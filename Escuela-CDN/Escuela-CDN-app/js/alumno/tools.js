/*##########################################################################
___________________   ________  .____       _________
\__    ___/\_____  \  \_____  \ |    |     /   _____/
  |    |    /   |   \  /   |   \|    |     \_____  \ 
  |    |   /    |    \/    |    \    |___  /        \
  |____|   \_______  /\_______  /_______ \/_______  /
                   \/         \/        \/        \/ 
##########################################################################*/
function allTools(){
    alumnosHistorial()
    alumnoFiltro()
}
/*########################################################################*/

/*##########################################################################
_______________ __________  ____________________.___________    _______    _________
\_   _____/    |   \      \ \_   ___ \__    ___/|   \_____  \   \      \  /   _____/
 |    __) |    |   /   |   \/    \  \/ |    |   |   |/   |   \  /   |   \ \_____  \ 
 |     \  |    |  /    |    \     \____|    |   |   /    |    \/    |    \/        \
 \___  /  |______/\____|__  /\______  /|____|   |___\_______  /\____|__  /_______  /
     \/                   \/        \/                      \/         \/        \/ 
##########################################################################*/
function alumnosHistorial() {
    $("#historial").on('click', function() {
        
            let x = $('input[type="checkbox"]:checked').attr("id")
            let y = $('.'+x).html()
            window.location.href= url_base + "historial/?token=" + x  +"&id=" + y;
        
    })
}
function alumnoFiltro(){
    console.log("run filtro")
    $(".filtro").on('click', function() {
        
        let x = $(this).attr('id')

        $(".alumnos_lista").hide()

        
        if(x == "n_primero"){
            a = "primero"
        }else if(x == "n_segundo"){
            a = "segundo"
        }else{
            a = "alumnos_lista"
        }
        $("." + a).show()
        

    })
}
/*########################################################################*/


/*##########################################################################
            ___.            __________               __  .__                     
  ________ _\_ |__          \______   \ ____  __ ___/  |_|__| ____   ___________ 
 /  ___/  |  \ __ \   ______ |       _//  _ \|  |  \   __\  |/    \_/ __ \_  __ \
 \___ \|  |  / \_\ \ /_____/ |    |   (  <_> )  |  /|  | |  |   |  \  ___/|  | \/
/____  >____/|___  /         |____|_  /\____/|____/ |__| |__|___|  /\___  >__|   
     \/          \/                 \/                           \/     \/       
##########################################################################*/

/*########################################################################*/