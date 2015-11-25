<?php

class CustomerManagementController extends CI_Controller {	
	
	function __construct(){ // gets called every time the controller is loaded (example: $unit=new Unit_controller()) or when called in url
        // Call the Model constructor
        parent::__construct();
		$this->load->helper('url');
        $this->load->model('CustomerManagementModel');
		
    }
	
	function index(){		// the default function that is called if no function is given in the uri
        $this->load->view('customer_management');
	}

    function ActionGetCustomerList(){
        echo json_encode(
            $this->CustomerManagementModel->ReturnCustomerList()
        );
    }

    function InsertCustomerInfo()
    {
        if($this->CustomerManagementModel->CreateCustomer())
        {

            echo json_encode(
                array(
                    'stat'=>'success',
                    'msg'=>'Customer successfully created.',
                    'row'=>$this->CustomerManagementModel->ReturnLastAffectedRowDetails()
                )
            );
        }

    }

    function UpdateCustomerInfo(){
        if($this->CustomerManagementModel->UpdateCustomer()){
            echo json_encode(
                array(
                    'stat'=>'success',
                    'msg'=>'Invoice successfully updated.',
                    'row'=>$this->SalesInvoiceModel->ReturnLastAffectedRowDetails()
                )
            );

        }
    }
	
	
}
	
?>