<?php

class SalesInvoiceModel extends CI_Model {
	private $affected_id=0;
	private $error=array(
					'stat'=>'error',
					'msg'=>'Sorry, error has occurred.'
				);
				
				

	function __construct(){
        // Call the Model constructor
        parent::__construct();
		$this->load->database(); 
    }
	
	
	function ReturnProductList(){
		$rows=array();
		$sql="SELECT 
				a.prod_id as id,
				CONCAT(a.prod_code,'  ',a.prod_description) as name,
				a.prod_description as description,
				a.prod_code,a.prod_srp as srp,0 as discount,
				b.unit_name
			FROM product_info as a
			LEFT JOIN unit_info as b ON a.unit_id=b.unit_id";
		$query = $this->db->query($sql);
		foreach ($query->result() as $row)
		{
			$rows[]=$row; //assign each row of query in array
		}
		
		return $rows;
	}

	function ReturnInvoiceHistoryList($start,$end){
		$rows=array();
		$sql="SELECT 
					CONCAT_WS('|',
						a.sales_invoice_id,
						a.bill_address,
						a.ship_address,
						a.remarks
					)as record_info,
					
					a.invoice_no,
					
					DATE_FORMAT(a.txn_date,'%m/%d/%Y')as txn_date,
					
					CONCAT_WS('|',
							a.customer_id,
							CONCAT_WS(' ',b.fname,b.mname,b.lname)
					)as customer,
					'Admin' as seller,
					a.invoice_amount,
					a.is_active
				FROM 
					sales_invoice_info as a
				LEFT JOIN 
					customer_info as b ON a.customer_id=b.customer_id
				WHERE 
					a.txn_date BETWEEN '$start' AND '$end'";
		$query = $this->db->query($sql);
		foreach ($query->result() as $row)
		{
			$rows[]=$row; //assign each row of query in array
		}
		
		return $rows;	
	}
	
	
	function ReturnInvoiceCartItems($id){
		$rows=array();
		$sql="SELECT 
				a.prod_id,
				CONCAT_WS('|',a.prod_id,b.prod_description)as item,
				a.item_qty,a.item_discount,
				a.item_unit_price,a.item_line_total 
				FROM sales_invoice_items as a 
				LEFT JOIN product_info as b
				ON a.prod_id=b.prod_id 
			WHERE a.sales_invoice_id=$id";		
		$query = $this->db->query($sql);
		foreach ($query->result() as $row)
		{
			$rows[]=$row; //assign each row of query in array
		}
		
		return $rows;
	}
	
	
	function UpdateSalesInvoice(){
		try{
			//array of data to be inserted
				$this->db->trans_start(); //start transaction
				$invoiceid=$this->input->post('id',TRUE);
				
				$data = array(
					'customer_id' => $this->input->post('customer',TRUE),
					'txn_date' => date('Y-m-d',strtotime($this->input->post('date_due',TRUE))),
					'bill_address'=>$this->input->post('billing_address',TRUE),
					'ship_address'=>$this->input->post('ship_address',TRUE),
					'remarks'=>$this->input->post('remarks',TRUE)
				);
				
				$this->db->where('sales_invoice_id',$invoiceid);
				$this->db->update('sales_invoice_info',$data) or die(json_encode($this->error));
				$this->affected_id=$invoiceid;
				
				
				$this->db->where('sales_invoice_id',$invoiceid);
				$this->db->delete('sales_invoice_items') or die(json_encode($this->error));
				
			
				//array of data sent by js
				$prodid=$this->input->post('prodid',TRUE);
				$unitqty=$this->input->post('qty',TRUE);
				$discount=$this->input->post('discount',TRUE);
				$unitprice=$this->input->post('unitprice',TRUE);
				$linetotal=$this->input->post('linetotal',TRUE);
				
				$datas = array();
				for($i=0;$i<=count($prodid)-1;$i++){		
					$datas[]=array(
						'sales_invoice_id'=>$invoiceid,
						'prod_id'=>$prodid[$i],
						'item_qty'=>floatval($unitqty[$i]),
						'item_discount'=>floatval($discount[$i]),
						'item_unit_price'=>floatval($unitprice[$i]),
						'item_line_total'=>floatval($linetotal[$i])
					);		
				}		
				$this->db->insert_batch('sales_invoice_items', $datas) or die(json_encode($this->error)); 

				$this->db->trans_complete(); //end transaction
				return true;
		
		}catch(Exception $e){
			die(json_encode($this->error));		
		}	
	}
	
	
	
	function CreateSalesInvoice(){
		try{
			//array of data to be inserted
				$this->db->trans_start(); //start transaction
				$data = array(
					'customer_id' => $this->input->post('customer',TRUE),
					'txn_date' => date('Y-m-d',strtotime($this->input->post('date_due',TRUE))),
					'bill_address'=>$this->input->post('billing_address',TRUE),
					'ship_address'=>$this->input->post('ship_address',TRUE),
					'remarks'=>$this->input->post('remarks',TRUE)
				);
				
				$this->db->set('date_created', 'NOW()', FALSE);
				$this->db->set('invoice_no', 'CreateInvoiceNo()', FALSE);
				$this->db->insert('sales_invoice_info',$data) or die(json_encode($this->error));
				
				$this->affected_id=$this->db->insert_id();	//last insert id, the sales invoice	id			
			
				//array of data sent by js
				$prodid=$this->input->post('prodid',TRUE);
				$unitqty=$this->input->post('qty',TRUE);
				$discount=$this->input->post('discount',TRUE);
				$unitprice=$this->input->post('unitprice',TRUE);
				$linetotal=$this->input->post('linetotal',TRUE);
				
				$datas = array();
				for($i=0;$i<=count($prodid)-1;$i++){		
					$datas[]=array(
						'sales_invoice_id'=>$this->affected_id,
						'prod_id'=>$prodid[$i],
						'item_qty'=>$unitqty[$i],
						'item_discount'=>$discount[$i],
						'item_unit_price'=>$unitprice[$i],
						'item_line_total'=>$linetotal[$i]
					);		
				}		
				$this->db->insert_batch('sales_invoice_items', $datas); 

				$this->db->trans_complete(); //end transaction
				return true;
		
		}catch(Exception $e){
			die(json_encode($this->error));		
		}	
	}
	
	
	function ReturnLastAffectedRowDetails(){
		$rows=array();
		$sql="SELECT 
					CONCAT_WS('|',
						a.sales_invoice_id,
						a.bill_address,
						a.ship_address,
						a.remarks
					)as record_info,
					
					a.invoice_no,
					
					DATE_FORMAT(a.txn_date,'%d/%m/%Y')as txn_date,
					
					CONCAT_WS('|',
							a.customer_id,
							CONCAT_WS(' ',b.fname,b.mname,b.lname)
					)as customer,
					'Admin' as seller,
					a.invoice_amount,
					a.is_active
				FROM 
					sales_invoice_info as a
				LEFT JOIN 
					customer_info as b ON a.customer_id=b.customer_id
                WHERE
                  a.sales_invoice_id=".$this->affected_id;

		$query = $this->db->query($sql);

		foreach ($query->result() as $row) //this will return only 1 row
		{
			$rows[]=$row; //assign each row of query in array
		}

		return $rows;	
	}
	
	

	
}



?>