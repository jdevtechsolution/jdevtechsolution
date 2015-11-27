<?php

class CustomerManagementModel extends CI_Model {
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
	
	
	function ReturnCustomerList(){
		$rows=array();
		$sql="SELECT

				CONCAT_WS('|',customer_id,lname,fname,mname,address,billing_address,pri_contact,sec_contact,email) as cust_info,
				CONCAT_WS(' ',fname,mname,lname) as customer,
				company,
				balance,
                customer_id

			FROM customer_info
			WHERE is_deleted = 0";

        $query = $this->db->query($sql);

		foreach ($query->result() as $row)
		{
			$rows[]=$row; //assign each row of query in array
		}
		
		return $rows;
	}

    function CreateCustomer()
    {
        try
        {
            $this->db->trans_start(); //start database transaction

            //array data
            $data = array(
                'lname' => $this->input->post('lname',TRUE),
                'fname' => $this->input->post('fname',TRUE),
                'mname' => $this->input->post('mname',TRUE),
                'address' => $this->input->post('address',TRUE),
                'email' => $this->input->post('email',TRUE),
                'billing_address' => $this->input->post('billing_address',TRUE),
                'pri_contact' => $this->input->post('pri_contact',TRUE),
                'sec_contact' => $this->input->post('sec_contact',TRUE),
                'company' => $this->input->post('company',TRUE),
                'created_by' => 1
            );
            $this->db->set('date_created', 'NOW()', FALSE); //set date created
            $this->db->insert('customer_info',$data) or die(json_encode($this->error)); //insert data to database
            $this->affected_id=$this->db->insert_id();

            $this->db->trans_complete(); //end transaction
            return true;
        }
        catch(Exception $e)
        {
            die(json_encode($this->error));
        }

    }

    function UpdateCustomer()
    {
        try
        {
            $this->db->trans_start(); //start database transaction
            $customer_id = $this->input->post('customer_id',TRUE);
            //array data
            $data = array(
                'lname' => $this->input->post('lname',TRUE),
                'fname' => $this->input->post('fname',TRUE),
                'mname' => $this->input->post('mname',TRUE),
                'address' => $this->input->post('address',TRUE),
                'email' => $this->input->post('email',TRUE),
                'billing_address' => $this->input->post('billing_address',TRUE),
                'pri_contact' => $this->input->post('pri_contact',TRUE),
                'sec_contact' => $this->input->post('sec_contact',TRUE),
                'company' => $this->input->post('company',TRUE),
                'modified_by' => 1
            );

            //$this->db->set('date_modified', 'CURRENT_TIMESTAMP()', FALSE); //set date created
            $this->db->where('customer_id',$customer_id);
            $this->db->update('customer_info',$data) or die(json_encode($this->error)); //insert data to database

            $this->affected_id=$customer_id;

            $this->db->trans_complete(); //end transaction
            return true;
        }
        catch(Exception $e)
        {
            die(json_encode($this->error));
        }

    }

    function DeleteCustomer()
    {
        try
        {
            $this->db->trans_start(); //start database transaction
            $customer_id = $this->input->post('customer_id',TRUE);
            //array data
            $data = array(
                'is_deleted' => 1
            );

            //$this->db->set('date_modified', 'CURRENT_TIMESTAMP()', FALSE); //set date created
            $this->db->where('customer_id',$customer_id);
            $this->db->update('customer_info',$data) or die(json_encode($this->error)); //insert data to database

            $this->affected_id=$customer_id;

            $this->db->trans_complete(); //end transaction
            return true;
        }
        catch(Exception $e)
        {
            die(json_encode($this->error));
        }

    }

    function ReturnLastAffectedRowDetails(){
        $rows=array();
        $sql="SELECT
				CONCAT_WS('|',customer_id,lname,fname,mname,address,billing_address,pri_contact,sec_contact,email) as cust_info,
				CONCAT_WS(' ',fname,mname,lname) as customer,
				company,
				balance
			FROM customer_info
            WHERE
                  customer_id =".$this->affected_id;

        $query = $this->db->query($sql);

        foreach ($query->result() as $row) //this will return only 1 row
        {
            $rows[]=$row; //assign each row of query in array
        }

        return $rows;
    }
	
	function ReturnOpenInvoiceList(){
        $rows=array();
        $customer_id = $this->input->get('customer_id',TRUE);
        $sql= "select
                    sales_invoice_id,
                    invoice_no,
                    0 as invoice_balance
              from sales_invoice_info
              where status = 'Open' and is_deleted = 0 and is_active = 1
              and customer_id = $customer_id";

        $query = $this->db->query($sql);

        foreach ($query->result() as $row)
        {
            $rows[]=$row; //assign each row of query in array
        }

        return $rows;
    }

    function ReturnCustomerLedger()
    {
        $rows=array();
        $customer_id = $this->input->get('customer_id',TRUE);
        $sql = "set @bal:=0.00;";
        $this->db->query($sql);

        $sql= "select
            x.*,
            @bal := @bal + (x.pay_amount - x.inv_amount) as balance
            from (
                select
                si.invoice_no as ref_no,
                si.customer_id,
                si.invoice_amount as inv_amount,
                (0) as pay_amount,
                si.txn_date
            from sales_invoice_info as si
            where si.is_active = true and si.is_deleted = 0 and si.status = 'Open'
                  and si.customer_id = $customer_id

            union all

            select
                sp.sales_payment_receipt_no as ref_no,
                sp.customer_id,
                (0) as inv_amount,
                sp.sales_payment_amount as pay_amount,
                sp.txn_date
            from sales_payment as sp
            where sp.is_deleted = 0 and sp.is_active = 1
                  and sp.customer_id = $customer_id ) as x order by txn_date,ref_no";

        $query = $this->db->query($sql);

        foreach ($query->result() as $row)
        {
            $rows[]=$row; //assign each row of query in array
        }

        return $rows;
    }
}



?>