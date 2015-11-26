<?php

class SalesInvoiceController extends CI_Controller {	
	
	function __construct(){ // gets called every time the controller is loaded (example: $unit=new Unit_controller()) or when called in url
        // Call the Model constructor
        parent::__construct();
		$this->load->helper('url');
		$this->load->model('SalesInvoiceModel');
		$this->load->model('CustomerManagementModel');
    }
	
	function index(){		// the default function that is called if no function is given in the uri
		$data['customers']=$this->CustomerManagementModel->ReturnCustomerList();
		$this->load->view('sales_invoice',$data);	
	}
	
	function ActionGetProductList(){ //returns returns array of object of product
		echo json_encode($this->SalesInvoiceModel->ReturnProductList());
	}
	
	
	function ActionSaveInvoiceInfo(){
		if($this->SalesInvoiceModel->CreateSalesInvoice()){
		
			echo json_encode(
				array(
					'stat'=>'success',
					'msg'=>'Invoice successfully created.',
					'row'=>$this->SalesInvoiceModel->ReturnLastAffectedRowDetails()
				)			
			);
			
		}
	}
	
	
	function ActionUpdateInvoiceInfo(){
		if($this->SalesInvoiceModel->UpdateSalesInvoice()){
			$unitqty=$this->input->post('qty',TRUE);
			echo json_encode(
				array(
					'stat'=>'success',
					'msg'=>'Invoice successfully updated.',
					'row'=>$this->SalesInvoiceModel->ReturnLastAffectedRowDetails()
					
				)			
			);
			
		}
	}
	
	
	
	function ActionGetInvoiceHistory(){
        $start=date('Y-m-d',strtotime($this->input->get('start')));
        $end=date('Y-m-d',strtotime($this->input->get('end')));

		echo json_encode(
			//
            $this->SalesInvoiceModel->ReturnInvoiceHistoryList($start,$end)
		);
	}
	
	function ActionGetInvoiceCartItems(){
		$id=$this->input->get('id',TRUE);
		
		echo json_encode(
           $this->SalesInvoiceModel->ReturnInvoiceCartItems($id)
		);
		
	}
	
	
	
	
}
	
?>