<?php
class Configgrupos extends CI_Controller
{
    //----->

    //--->
    public function __construct()
    {
        parent::__construct();

        $this->load->database();
        $this->default = $this->load->database('default', TRUE);
            
        $this->load->model('Configgrupos/Querys');
            //$this->load->model('log/Model_log');
                
            //$xr8_data = $this->Model_log->logNew();
    }
    //--->

    //--->
    public function index()
    {
        //$xr8_data = $this->Model_log->logNew();
        //$this->output->set_content_type('application/json')->set_output(json_encode($xr8_data));
    }
    //--->
    
    //--->
    //index.php/metales/createdata?type=generarcierre
    public function createdata()
    {  
        if (is_null($_POST)){
        //----->
            $xr8_data = "Error: 1001";
        //----->
        } else {
        //----->
            $xr8_data = $this->Querys->cierreCreate();
                
                /*$xr8_data  = [
                    "time" => Date("Y-m-d H:m:s") , 
                    "category"    => "does not exist",
                    "http_code"   => 200,
                    "code"        => 1001,
                    "request"     => true
                ];
                */
            //----->
            }
        $this->output->set_content_type('application/json')->set_output(json_encode($xr8_data));
    }
    //--->

    //--->
    public function readedata()
    {
       
        if ($_GET['type'] == "all"){
            $xr8_data   = $this->Querys->allRead();
            
            $this->output->set_content_type('application/json')->set_output(json_encode($xr8_data));

        }else if ($_GET['type'] == "codebar"){

            $data['codebar']  = $this->Querys->codebarRead();
            $this->load->view('a999/codebar',$data);
            /*
            print_r($xr8_data);
            $this->load->view('a999/codebar',$xr8_data);
            */

        }else {
            $xr8_data  = array("Error"  => 101);
            
            $this->output->set_content_type('application/json')->set_output(json_encode($xr8_data));
        }


    }
    //--->

    //----->
}