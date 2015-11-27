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

    function ActionGetOpenInvoiceList()
    {
        echo json_encode(
            $this->CustomerManagementModel->ReturnOpenInvoiceList()
        );
    }

    function ActionGetCustomerLedger()
    {
        echo json_encode(
            $this->CustomerManagementModel->ReturnCustomerLedger()
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
                    'msg'=>'Customer successfully updated.',
                    'row'=>$this->CustomerManagementModel->ReturnLastAffectedRowDetails()
                )
            );

        }
    }

    function DeleteCustomerInfo(){
        if($this->CustomerManagementModel->DeleteCustomer()){
            echo json_encode(
                array(
                    'stat'=>'success',
                    'msg'=>'Customer successfully deleted.',
                    'id'=> $this->input->post('customer_id',TRUE)
                )
            );
        }
    }
	
}
	
?>