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
				customer_id,
				CONCAT_WS(' ',fname,mname,lname) as customer,
				company,
				balance
			FROM customer_info";		

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
                'lname' => $this->input->post('lname',true),
                'fname' => $this->input->post('fname',true),
                'mname' => $this->input->post('mname',true),
                'address' => $this->input->post('address',true),
                'email' => $this->input->post('email',true),
                'billing_address' => $this->input->post('billing_address',true),
                'pri_contact' => $this->input->post('pri_contact',true),
                'sec_contact' => $this->input->post('sec_contact',true),
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
	
	
}



?>