function btnAll(){
    /*############################################################*/
    console.log("%c Load Js BTN ","color:#FA2A00; font-size:24px")
    btnUpdate()
    /*############################################################*/
}

/*##########################################################################
   __                  _   _
  / _|                | | (_)
 | |_ _   _ _ __   ___| |_ _  ___  _ __
 |  _| | | | '_ \ / __| __| |/ _ \| '_ \
 | | | |_| | | | | (__| |_| | (_) | | | |
 |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|
##########################################################################*/
function btnUpdate(){
    console.log("%c btn Update ","color:#FA2A00; font-size:12px")
    $("#generaractualizacion").on('click',function(){
        console.log("Update Alumno")
        updateDataInscripcion()
    })
}
/*##########################################################################
           | |                     | | (_)
  ___ _   _| |__    _ __ ___  _   _| |_ _ _ __   ___  ___
 / __| | | | '_ \  | '__/ _ \| | | | __| | '_ \ / _ \/ __|
 \__ \ |_| | |_) | | | | (_) | |_| | |_| | | | |  __/\__ \
 |___/\__,_|_.__/  |_|  \___/ \__,_|\__|_|_| |_|\___||___/
##########################################################################*/