<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
	class Querys extends CI_Model{
		//--->
		function allDataPrimariaRead(){
				$this->db->select('
                    pagos.id,
                    pagos.id_advance,
                    pagos.time,
                    pagos.id_advance_usuario,
                    pagos.id_advance_alumno,
                    pagos.id_advance_programas,
                    pagos.pago,
                    alumnoprimaria.materno,
                    alumnoprimaria.paterno,
                    alumnoprimaria.nombre,
                    configsp.concepto,
                    configsp.precio
				');
                $this->db->from('pagos');
        
                $porciones = explode("-",$_GET['time']);
                if(count($porciones) == 1){
                    $time = date("Y");
                    $x = 1;
                }else if(count($porciones) == 2){
                    $time = date("Y-m");
                    $x = 2;
                }else if(count($porciones) == 3){
                    $time = $_GET['time'];
                    $x = 3;
                }else{
                    $time = date("Y-m-d");
                    $x = 4;
                }
        
                $this->db->like('pagos.time',$time);
					$this->db->join('alumnoprimaria'  ,'alumnoprimaria.id_advance = pagos.id_advance_alumno');
					$this->db->join('configsp'        ,'configsp.id_advance       = pagos.id_advance_programas');
					
					$this->db->group_by('`pagos`.id'); 
					$this->db->order_by('`pagos`.id', 'DESC');

				$query = $this->db->get();
				$row = $query->row_array();
		
				//---A)
				if ($query->num_rows() > 0) {
					foreach ($query->result() as $row) {
						$data[] = $row;
					}
				} else {
					$date   = date("Y-m-d H:m:s");
					$data[] = array(
						"Time"       => $date,
						"Message"    => "Error Alumno" . " " . $x . " " . $time,
						"Code"       => 104,
						"Contorller" => "DbTabsCierre",
						"class"      => "DbTabsCierre",
						"fuction"    => "DbTabsCierreRead",
						"id"         => "user"
					);
				}
		
				return  $data;
		}
		//--->

		//--->
		function allDataKinderRead(){
            $this->db->select('
                pagos.id,
                pagos.id_advance,
                pagos.time,
                pagos.id_advance_usuario,
                pagos.id_advance_alumno,
                pagos.id_advance_programas,
                pagos.pago,
                alumnokinder.materno,
                alumnokinder.paterno,
                alumnokinder.nombre,
                configsp.concepto,
                configsp.precio
            ');
            $this->db->from('pagos');
        
            $porciones = explode("-",$_GET['time']);
            if(count($porciones) == 1){
                $time = date("Y");
            }else if(count($porciones) == 2){
                $time = date("Y-m");
            }else if(count($porciones) == 3){
                $time = date("Y-m-d");
            }else{
                $time = date("Y-m-d");
            }

            $this->db->like('pagos.time',$time);
                $this->db->join('alumnokinder'  ,'alumnokinder.id_advance = pagos.id_advance_alumno');
                $this->db->join('configsp'        ,'configsp.id_advance       = pagos.id_advance_programas');
                
                $this->db->group_by('`pagos`.id'); 
                $this->db->order_by('`pagos`.id', 'DESC');

            $query = $this->db->get();
            $row = $query->row_array();
    
            //---A)
            if ($query->num_rows() > 0) {
                foreach ($query->result() as $row) {
                    $data[] = $row;
                }
            } else {
                $date   = date("Y-m-d H:m:s");
                $data[] = array(
                    "Time"       => $date,
                    "Message"    => "Error Alumno",
                    "Code"       => 104,
                    "Contorller" => "DbTabsCierre",
                    "class"      => "DbTabsCierre",
                    "fuction"    => "DbTabsCierreRead",
                    "id"         => "user"
                );
            }
    
            return  $data;
    }
    //--->
	}