<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>JCore v2</title>

	
    <?php include('assets/includes/global_css.html'); ?>
	
	<!-- Checkbox / Radio -->
    <link href="assets/css/plugins/iCheck/custom.css" rel="stylesheet">
	
	<!-- Dropdown / Select picker-->
	<link href="assets/css/dropdown-enhance/dist/css/bootstrap-select.min.css" rel="stylesheet">
	
	<!-- Datepicker --->
	<link href="assets/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
	 
	<!-- Data Tables -->
    <link href="assets/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
    <link href="assets/css/plugins/dataTables/dataTables.responsive.css" rel="stylesheet">
    <link href="assets/css/plugins/dataTables/dataTables.tableTools.min.css" rel="stylesheet">

    <link href="assets/js/plugins/notify/pnotify.core.css" rel="stylesheet">
	

	
   
	<style>
		.toolbar{			
			float: left;
		}
		
		.tools {
			float: left;
			margin-bottom:5px;
		}
		
		[contenteditable="true"]:active,
		[contenteditable="true"]:focus{
			border:3px solid #F5C116;
			outline:none;
			
			background: white;
		}
	</style>
</head>

<body>

    <div id="wrapper">
		<!-- /left navigation -->
		<?php $this->load->view('templates/left_navigation.php'); ?>
		<!-- /left navigation -->
	
	
	
        <div id="page-wrapper" class="gray-bg">
				<div class="row border-bottom">
					<!-- /top navigation -->
					<?php $this->load->view('templates/top_navigation.php'); ?>
					<!-- /top navigation -->
				</div>

		
		
		
        <div class="wrapper wrapper-content"><!-- /main content area -->
				<div class="row">
					
					<div class="col-lg-8 animated fadeInRight">
							<div class="mail-box-header" style="margin-bottom:-25px;">
								<h2 style="block:inline;"><i class="fa fa-users"></i> Customer Management </h2>
								
							</div>
							
							<div class="mail-box" style="padding-left:10px;padding-right:10px;">
							
							
								<div class="panel-heading">                            
									<div class="panel-options">									
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#tab-1">List of Customer</a></li>
											<li class=""><a data-toggle="tab" href="#tab-2">Customer Ledger</a></li>
											<li class=""><a data-toggle="tab" href="#tab-3">Transaction History</a></li>
										</ul>
									</div>
								</div>

								<div class="panel-body">

									<div class="tab-content">
										<div id="tab-1" class="tab-pane active">
												<table id="tbl_customer_list" class="table table-bordered">
													<thead>
														<tr>
															<td></td>																												
															<td>Customer</td>
															<td>Company</td>
															<td>Balance</td>
															<td>Action</td>
														</tr>
													</thead>
													<tbody>

													</tbody>
												</table>	
										</div>
										
										<div id="tab-2" class="tab-pane">
												<table id="tbl_customer_ledger" class="table table-bordered">
													<thead>
														<tr>
															<td>Reference #</td>
															<td>Invoice Amount</td>
															<td>Payment Amount</td>
															<td>Balance</td>
														</tr>
													</thead>
													<tbody>

													</tbody>
												</table>	
										</div>
										
										
										<div id="tab-3" class="tab-pane">
												<table id="tbl_customer_ledger" class="table table-bordered">
													<thead>
														<tr>																																						
															<td>Status</td>
															<td>Txn Date</td>
															<td>Invoice #</td>
															<td>Remarks</td>
															<td>Invoice Amount</td>											
															
														</tr>
													</thead>
													<tbody>
														<?php for($i=0;$i<=10;$i++){ ?>
														<tr>
															<td><span class="pie">Open</span></td>
															<td>11/10/2015</td>
															<td>2015101000001</td>
															<td>Sales on Nov 11. 2015.</td>															
															<td>0.00</td>
															<td>1,200.00</td>
														</tr>
														<?php } ?>
													</tbody>
												</table>	
										</div>
									</div>
								</div>
							</div>
						
					</div>
					
					<div id="customer-display-info " class="col-lg-4">
						<div class="contact-box  animated fadeInRight">
							<a href="#">
								<div class="col-sm-4">
									<div class="text-center">
										<img id="customer-image" alt="image" class="img-circle m-t-xs img-responsive" src="assets/img/customers/unknown_user.png" style="background-color: #808080" >
										<div class="m-t-xs font-bold">Software Developer</div>
									</div>
								</div>
								<div class="col-sm-8">
									<span id ="customer-name">
                                         <h3><strong></strong></h3>
                                    </span>
                                    <span id ="company-name">
                                        <p><i ></i></p><br>
                                    </span>
									<span id="address">
										 <i ></i><br>
                                         <i ></i><br>
										 <i ></i><br>
									</span>
								</div>
								
								<div class="text-right">									
									<a class="btn btn-xs btn-white"><i class="fa fa-pencil"></i> Edit Customer Info </a>
									<a class="btn btn-xs btn-white"><i class="fa fa-credit-card"></i> Post Payment </a>													
								</div>

							</a>
						</div>						
						
					</div>
					
					<div class="col-lg-4">
						<div class="contact-box  animated fadeInRight" style="padding:10px;">
						
							<div class="panel-heading">                            
									<div class="panel-options">									
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#tab-invoice-1" style="font-size: 12px;">Open Invoices</a></li>
											<li class=""><a data-toggle="tab" href="#tab-invoice-2" style="font-size: 12px;">Open Sales Order</a></li>
										</ul>
									</div>
							</div>
						
							<div class="panel-body">
									<div class="tab-content">
										<div id="tab-invoice-1" class="tab-pane active">
											<div class="row">
												<div class="col-xs-12">
													<span>Total Open Invoice</span>
													<span id="total_invoice_balance"><h2>Php 0.00</h2></span>
													<div class="text-center m">
														<span id="sparkline8"></span>
													</div>    
												</div>
											</div>
											
											<br />
											<div class="row">
												<div class="col-xs-12">
													<table id="tbl_open_invoice_list" class="table table-bordered">
														<thead>
															<tr>
																<td>Invoice #</td>
																<td>Balance</td>
															</tr>
														</thead>
														<tbody>

														</tbody>
													</table>	
												</div>
											</div>
										</div>
										
										<div id="tab-invoice-2" class="tab-pane">
											
										</div>
									</div>
								</div>
						
						
							
						</div>
					</div>
				</div>
        </div><!-- /main content area -->
		
		<!-- /footer -->
        <?php $this->load->view('templates/footer'); ?>
		<!-- /footer -->
		
		
        </div>
        </div>

        <!--- confirmation modal --->
        <div class="modal fade" id = "confirm_modal" role="dialog" aria-hidden="true">
            <div class="modal-dialog"  style="width:40%;">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <p>Delete Customer ?</p>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button id="btn_delete_customer" type="button" class="btn btn-danger"><i class="fa fa-trash"></i> <u>D</u>elete Customer </button>
                        <button type="button" class="btn btn-white" data-dismiss="modal"><u>C</u>lose</button>
                    </div>
                </div>
            </div>
        </div>
        <!--- end confirmation modal --->
		
		<!---/invoice modal--->
		<div class="modal fade" id="customer_modal" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog"  style="width:50%;">
                                <div class="modal-content animated bounceInRight">
                                        
										<div class="modal-header">
                                            <div class="x_title">
                                                <ul class="list-unstyled">
                                                    <li>
                                                        <h2>Customer Information <small>Please enter Customer Information.</small></h2>
                                                    </li>
                                                </ul>



                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

										
                                        <div class="modal-body"><!--/modal body-->
                                            <div class="x_panel"><!--/panel-->
												<div class="x_content"><!--/panel content-->
														<form id="frm-customer">
															<div class="row">
																<div class="col-md-6 col-sm-6 col-xs-6"><!--/column 2-->
	
																	<div class="form-group">	
																		<label>Lastname *</label>	
																		<input id="lname" name="lname" type="text" class="form-control" data-message="Please make sure you enter Lastname." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter Lastname here." required placeholder = "Enter Lastname">
																	</div>
																	
																	<div class="form-group">	
																		<label>Firstname *</label>	
																		<input id="fname" name="fname" type="text" class="form-control" data-message="Please make sure you enter Firstname." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter Firstname here." required placeholder = "Enter Firstname">
																	</div>
																	
																	<div class="form-group">	
																		<label>Middlename</label>	
																		<input id="mname" name="mname" type="text" class="form-control" placeholder = "Enter Middlename">
																	</div>
																	
																	<div class="form-group">	
																		<label>Address *</label>	
																		<textarea id="address" name="address" class="form-control"data-message="Please make sure you enter Address." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter Address here." required placeholder = "Enter Address"></textarea>
																	</div>
																	<div class="form-group">	
																		<label>Email Address *</label>	
																		<input id="email" name="email" type="text" class="form-control" data-message="Please make sure you enter Email Address." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter Email Address here." required placeholder = "Enter Email Address">
																	</div>
																	
																</div><!--/column 1-->
															
																<div class="col-md-6 col-sm-6 col-xs-6"><!--/column 2-->
																	
																	<div class="form-group">	
																		<label>Billing Address</label>	
																		<textarea id="billing_address" name="billing_address" class="form-control" placeholder = "Enter Contact Number"placeholder = "Enter Contact Number"></textarea>
																	</div>
																	
																	<div class="form-group">	
																		<label>Contact No. *</label>	
																		<input id="pri_contact" name="pri_contact" type="text" class="form-control" data-message="Please make sure you enter  Contact Number." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter Contact Number here." required placeholder = "Enter Contact Number">
																	</div>
																	<div class="form-group">	
																		<label>Contact No. (Alternative)</label>	
																		<input id="sec_contact" name="sec_contact" type="text" class="form-control" placeholder = "Enter Altenative Contact Number">
																	</div>

																	<div class="form-group">	
																		<label>Company Name</label>	
																		<input id="company" name="company" type="text" class="form-control" placeholder = "Enter Company Name">
																	</div>
																	
																	<br />
																	<div class="form-group">
																		<label>
																			<input id="is_active" type="checkbox" class="flat" checked="checked" name="is_active"> Active
																		</label>
																	</div>
	
																</div><!--/column 2-->
															
															</div>
														</form>
												</div><!--/content-->
											</div><!--/panel-->
										</div><!--/modal body-->

                                        <div class="modal-footer">   
                                            <button id="btn_create_customer" type="button" class="btn btn-primary"><i class="fa fa-save"></i> <u>R</u>ecord Customer </button>
											<button type="button" class="btn btn-white" data-dismiss="modal"><u>C</u>lose</button>
                                        </div>
                                    </div>
                                </div>
        </div><!---/invoice modal--->
		
		

	<?php include('assets/includes/global_js.php'); ?>
	
	<!--- Dropdown / Selectpicker --->
	<script src="assets/css/dropdown-enhance/dist/js/bootstrap-select.min.js"></script>
	<script src="assets/js/plugins/typehead/bootstrap3-typeahead.js"></script>	
	
	 <!-- iCheck -->
    <script src="assets/js/plugins/iCheck/icheck.min.js"></script>
	
	 <!-- Datepicker -->
	<script src="assets/js/plugins/datapicker/bootstrap-datepicker.js"></script>
	
	<!-- Data Tables -->
    <script src="assets/js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.bootstrap.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.responsive.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.tableTools.min.js"></script>
	 
	<!-- sparkline -->
	<script src="assets/js/plugins/sparkline/jquery.sparkline.min.js"></script>
	
	<!-- Peity -->
    <script src="assets/js/plugins/peity/jquery.peity.min.js"></script>
	
    <script src="assets/js/defined/customer.event.handlers.js"></script>

    <!-- PNotify -->
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.core.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.buttons.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.nonblock.js"></script>
	
</body>

</html>
