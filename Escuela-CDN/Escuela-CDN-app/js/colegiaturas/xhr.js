/*##########################################################################
____  ______ _____________ 
\   \/  /   |   \______   \
 \     /    ~    \       _/
 /     \    Y    /    |   \
/___/\  \___|_  /|____|_  /
      \_/     \/        \/ 
##########################################################################*/
function allXhr(){
    console.log("%c Load Js XHR ","color:#FA2A00; font-size:24px")
    loadingConfigCol()
    loadingSelectAll()
    autoComplete()
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
    /*CRUD*/
    function loadingConfigCol(){
        console.log("%cXhr: Run-> loadingSelectAll carga la lista de servicios y productos","color:SkyBlue;")
        //--->
        let jqxhr = $.getJSON(urlDbConfigA + "?type=all", function(data) {
            })
            .done(function(data) {
                $.each(data, function(i, val) {
                //--->
                //alert(val.precio)
                    if(val.descripcion == 'colegiatura'){
                        let x = val.precio
                        costoColegiatura(x)
                    }else  if(val.descripcion == 'colegiatura especial'){
                        $("#config_colegiatura_especial").val(val.precio)
                    }else if(val.descripcion == 'dpa'){
                        $("#config_dpa").val(val.precio)   
                    }else if(val.descripcion == 'interes'){
                        $("#config_interes").val(val.precio)   
                    }
                //--->
                })
            })
            .fail(function(data,jqXHR,textStatus,errorThrown){xhrError(jqXHR,textStatus,errorThrown)})
            .always(function(data){})
            //--->  
    }
    /*efectivo 1 firstName*/
    function autoComplete(){
        console.log("%cXhr: Run-> autoComplete: busca los alumnos por ID ","color:SkyBlue;")
        //--->
        $("#firstName").autocomplete({
          minLength:4,
          delay:1,
          source: function (req, add) {
            // XMLHttpRequest --->
              $.getJSON(urlDbAlumnoS + "?type=find&search=0",req, function (data) {
              var suggestions = [];
              $.each(data, function (i, val) {
                if (val.Buscador == "Error") {
                  suggestions.push({
                    id: "Error 101",
                    value: "Busqueda fallida",
                  });
                } else {
    
                    if(val.Code == 104){
                        suggestions.push({
                            id: "Error 101",
                            value: "Busqueda fallida",
                          });
                    }else{
    
                        suggestions.push({
                            id        : val.id,
                            idAdvance : val.id_advance_alumno,
                            ex        : val.exalumno,
                            value     : val.nombre + " " + val.paterno + " " + val.materno,
                            tipopago  : val.tipopago
                        });
                    }
    
                }
              });
              add(suggestions);
            });
          },
          select: function (event, ui) {
            $("#cobroId").val(ui.item.id)        
            $("#cobrotextId").html(ui.item.id)        
            $("#cobroIdadvance").val(ui.item.idAdvance) 
            $("#cobroNombre").val(ui.item.value)
            $("#print_alumno").html(ui.item.value)
            $("#exalumno").val(ui.item.ex)
            
            $("#precio_change_x").attr('disabled',true)
    
            inputClear()
            loadingcolegiaturas()
            tipo(ui.item.tipopago)
          },
        });
        //--->
    }
    function loadingSelectAll(){
        console.log("%cXhr: Run-> loadingSelectAll: carga la lista de servicios y productos","color:SkyBlue;")
        //--->
        let jqxhr = $.getJSON(urlDbSerproA + "?type=colegiatura", function(data) {
            })
            .done(function(data) {
                //--->
                $.each(data, function(i, val) {
                    /*
                    instcripcion
                    colegiatura
                    colegiatura ex alumno
                    colegiatura con beca
                    */
                    if(
                        val.concepto == "septiembre"              ||
                        val.concepto == "octubre"                 ||
                        val.concepto == "noviembre"               ||
                        val.concepto == "diciembre"               ||
                        val.concepto == "enero"                   ||
                        val.concepto == "febrero"                 ||
                        val.concepto == "marzo"                   ||
                        val.concepto == "abril"                   ||
                        val.concepto == "mayo"                    ||
                        val.concepto == "junio"                   ||
                        val.concepto == "julio"
                    ){
                        x = val.concepto;
                    }else{
                        x = val.concepto + " $" + val.precio;
                    }
                    $("#cobros_serpro").append("<option value=\""+ val.id_advance +"\">" + x +"</option>");
                })
                //--->
            })
            .fail(function(data, jqXHR, textStatus, errorThrown){xhrError(jqXHR, textStatus, errorThrown)})
            .always(function(data){})
            //--->  
    }
    function loadingcolegiaturas(){
        $("#historiaAlumno").empty()
        let x = $("#cobroIdadvance").val()
        let jqxhr = $.getJSON(urlDbColegiaturasA + "?type=one&token=" + x, function(data) {})
        .done(function(data) {
            $.each(data, function(i, val) {
    
            if (typeof Intl == 'object' && typeof Intl.DateTimeFormat == 'function') {
                var formatter = new Intl.DateTimeFormat("es-mx", {
                    month: "short"
                    }),
                month1 = formatter.format(new Date())
                console.log(month1);
    
                }
                /*
                pagadoSM(x,y,z,a,b)
                x = db
                y = val del html
                z = txt del html
                a = input
                b = val input
                */
    
                pagadoSM(val.inscripcion_m,"name_inscripcion","inscripcion","val_m_inscripcion",val.inscripcion)
                pagadoSM(val.seguro_m     ,"name_seguro"     ,"seguro"     ,"val_m_seguro"     ,val.seguro)
                pagadoSM(val.material_m   ,"name_material","material","val_m_material",val.material)
    
                pagadoSM(val.colegiatura12_1_agosto_m,"name_col_1","1ª ½ DE AGOSTO","val_m_1agosto",val.colegiatura12_1_agosto)
                pagadoSM(val.colegiatura12_2_agosto_m,"name_col_6","2ª ½ DE AGOSTO","val_m_2agosto",val.colegiatura12_2_agosto)
                             
                pagadoSM(val.colegiatura_9_septiembre_m,"name_col_2","SEPTIEMBRE","val_m_septiembre",val.colegiatura_9_septiembre)
                pagadoSM(val.colegiatura_10_octubre_m,"name_col_3","OCTUBRE","val_m_octubre",val.colegiatura_10_octubre)
                pagadoSM(val.colegiatura_11_noviembre_m,"name_col_4","NOVIEMBRE","val_m_noviembre",val.colegiatura_11_noviembre)
                pagadoSM(val.colegiatura_12_diciembre_m,"name_col_5","DICIEMBRE","val_m_diciembre",val.colegiatura_12_diciembre)
    
                pagadoSM(val.colegiatura_1_enero_m,"name_col_7","ENERO","val_m_enero",val.colegiatura_1_enero)
                pagadoSM(val.colegiatura_2_febrero_m,"name_col_8","FEBRERO","val_m_febrero",val.colegiatura_2_febrero)
                pagadoSM(val.colegiatura_3_marzo_m,"name_col_9","MARZO","val_m_marzo",val.colegiatura_3_marzo)
                pagadoSM(val.colegiatura_4_abril_m,"name_col_10","ABRIL","val_m_abril",val.colegiatura_4_abril)
                pagadoSM(val.colegiatura_5_mayo_m,"name_col_11","MAYO","val_m_mayo",val.colegiatura_5_mayo)
                pagadoSM(val.colegiatura_6_junio_m,"name_col_12","JUNIO","val_m_junio",val.colegiatura_6_junio)
                pagadoSM(val.colegiatura_7_julio_m,"name_col_13","JULIO","val_m_julio",val.colegiatura_7_julio)
    
    
                /*
                <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6    class="my-0 text-capitalize">enero</h6>
                    <small class="text-muted text-capitalize">2021-2022</small>
                </div>
                <div>
                    <span  class="text-primary text-capitalize" id="print_fecha"> no pagada </span>
                </div>
                </li>
                */
    
            })
            $("#cobros_serpro").attr("disabled",false)
        })
        .fail(function(data,jqXHR,textStatus,errorThrown){xhrError(jqXHR, textStatus, errorThrown)})
        .always(function(data){})
    }
    function savePago(){

            //imprSelec('print_div')
            let ticket_fecha           = $("#configFecha").val();
            let ticket_idUsuario       = $("#cobroIdUsuario").val();
    
            let ticket_idAlumno        = $("#cobroId").val();
            let ticket_idAdvanceAlumno = $("#cobroIdadvance").val();
            let ticket_nombreAlumno    = $("#cobroNombre").val();
    
            let ticket_concepto        = $("#cobroSerpro").val();
            let ticket_idadconcepto    = $("#cobroIdAdvanceSerpro").val();
    
            let ticket_costo           = $("#precio_costo").val();
            let ticket_resta           = $("#precio_change_x").val();
            let ticket_pago            = $("#precio_PorPagar").val()
            let ticket_total           = $("#val_precio_total").val()
    
            //alert(ticket_fecha + "/-----/" + ticket_idUsuario + "/-----/" + ticket_idAlumno + "/-----/" + ticket_idAdvanceAlumno + "/-----/" + ticket_nombreAlumno + "/-----/" + ticket_concepto + "/-----/" + ticket_costo + "/-----/" + ticket_resta + "/-----/" + ticket_pago + "/-----/" + ticket_total)
       /*
            FICHA DE INSCRIPCION (4)
            DATOS DEL ALUMNO     (14)
            PARA ALUMNOS DE 1ER GRADO (6)
            DATOS DEL TUTOR (3)
        */
        let settings = {
            "url": urlDbColegiaturasPagosU + '?type=updatedata',
            "method": "POST",
            "timeout": 0,
            "headers": {
                /*"Authorization": "Basic cm9vdDphZG1pbg==",*/
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "save_fecha"           : ticket_fecha           ,
                "save_idUsuario"       : ticket_idUsuario       ,
                "save_idAlumno"        : ticket_idAlumno        ,
                "save_idAdvanceAlumno" : ticket_idAdvanceAlumno ,
                "save_nombreAlumno"    : ticket_nombreAlumno    ,
                "save_concepto"        : ticket_concepto        ,
                "save_idadconcepto"    : ticket_idadconcepto    ,
                "save_costo"           : ticket_costo           ,
                "save_resta"           : ticket_resta           ,
                "save_pago"            : ticket_pago            ,
                "save_total"           : ticket_total
            }
        };
    
        let jqxhr1 = $.ajax(settings).done(function(response) {
                console.log("Run: Cierres")
            })
            .done(function(data) {
                //$.each(data, function(i, val) {})
                formClear()
            })
            .fail(function(data, jqXHR, textStatus, errorThrown) {
                console.info("Run: all user loading error");
                xhrError(jqXHR, textStatus, errorThrown);
            })
            .always(function(data) {
                console.info("Run: all user always");
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
    function pagadoSM(x,y,z,a,b){
        /*
        pagadoSM(x,y,z,a,b)
        x = db
        y = val del html
        z = txt del html
        a = input
        b = val input
        */    
        //alert(x+ "/------/" +y+ "/------/" +z+ "/------/" +a+ "/------/" +b)
        
        if(b == 0){
            pago = "No Pagado " + z;
            color = "text-danger"
            resultPagado = false;
        }else{
            pago = "Si Pagado " + z;
            color = "text-success"
            resultPagado = true;
        }
        
        //alert("#" + a + x)
        $("#"+a).val(x)

        x = '<li class="list-group-item d-flex justify-content-between lh-sm">' +
        '<div>' +
        '<input type=\"hidden\" id=\"historial' + a +'\" value=\"' + resultPagado + '\" disabled>'+
        '    <h6    class="my-0 text-capitalize">' + z + '</h6>' +
        '    <small class="text-mute text-capitalize">2021-2022</small>' +
        '</div>' +
        '<div>' +
        '    <span  class="' + color + ' text-capitalize" id="print_fecha"> ' + pago + '</span>' +
        '</div>' +
        '</li>';
        
    $("#historiaAlumno").append(x)
    }
    function pagosCol(x,y,z,a,b){
        $("#" + x).html(y)

        if(a == 0){
            txt_pagado= "no pagado"
        }else{
            txt_pagado= "si pagado"
        }
        $("#" + z).html(txt_pagado)
        $("#col_actual").val(b)
    }
    function diaAnno(x,y){
        let dayOfYear_1 = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        let fecha_hoy   = dayOfYear_1(new Date(x))
            console.warn(y + ": " + fecha_hoy)
                return fecha_hoy
    }
    function tipo(x){
        if(x == 'efectivo'){
            $("#tipoefectivo,#btnSaveCobro").removeClass("d-none")
            $("#tipodeposito,#btnSaveDeposito").addClass("d-none")

        }else if(x == 'deposito'){
            $("#tipodeposito,#btnSaveDeposito").removeClass("d-none")
            $("#tipoefectivo,#btnSaveCobro").addClass("d-none")

            datosTicket()
  
        }else{
            console.error("tipo error")
            $("#tipodeposito").addClass("d-none")
            $("#tipoefectivo").addClass("d-none")
        }
        
        $("#colHistorial,#colTicket").removeClass("d-none")
    }
/*########################################################################*/