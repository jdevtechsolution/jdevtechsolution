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
												<table id="tbl_invoice_list" class="table table-bordered">
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
														<?php for($i=0;$i<=55;$i++){ ?>
														<tr>
															<td><input type="checkbox"></td>
															<td>Christian Rueda</td>
															<td>JDEV IT Business Solution</td>
															<td>1,500,000.00</td>
															<td></td>
														</tr>
														<?php } ?>
													</tbody>
												</table>	
										</div>
										
										<div id="tab-2" class="tab-pane">
												<table id="tbl_customer_ledger" class="table table-bordered">
													<thead>
														<tr>
															<td></td>																												
															<td>Invoice #</td>
															<td>Receipt #</td>
															<td>Debit</td>
															<td>Credit</td>
															<td>Balance</td>
														</tr>
													</thead>
													<tbody>
														<?php for($i=0;$i<=10;$i++){ ?>
														<tr>
															<td><input type="checkbox"></td>
															<td>2015101000001</td>
															<td>na</td>
															<td>1,200.00</td>
															<td>0.00</td>
															<td>1,200.00</td>
														</tr>
														<?php } ?>
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
					
					<div class="col-lg-4">
						<div class="contact-box  animated fadeInRight">
							<a href="#">
								<div class="col-sm-4">
									<div class="text-center">
										<img alt="image" class="img-circle m-t-xs img-responsive" src="assets/img/profile_small.jpg">
										<div class="m-t-xs font-bold">Software Developer</div>
									</div>
								</div>
								<div class="col-sm-8">
									<h3><strong>Christian Rueda</strong></h3>
									<p><i class="fa fa-archive"></i> JDEV IT Business Solution</p><br>
									
									<address>
										<i class="fa fa-map-marker"></i> San Jose, San Simon, Pampanga<br>
										<i class="fa fa-map-marker"></i> chrisrueda14@yahoo.com<br>
										<i class="fa fa-list-alt"></i> 322-3542<br>																	
									</address>
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
											<li class="active"><a data-toggle="tab" href="#tab-invoice-1">Open Invoices</a></li>
											<li class=""><a data-toggle="tab" href="#tab-invoice-2">Invoice Details</a></li>
										</ul>
									</div>
							</div>
						
							<div class="panel-body">
									<div class="tab-content">
										<div id="tab-invoice-1" class="tab-pane active">
											<div class="row">
												<div class="col-xs-12">
													<span>Total Open Invoice</span>
													<h2>$ 1,231,809</h2>										
													<div class="text-center m">
														<span id="sparkline8"></span>
													</div>    
												</div>
											</div>
											
											<br />
											<div class="row">
												<div class="col-xs-12">
													<table id="tbl_past_due" class="table table-bordered">							
														<thead>
															<tr>
																<td>Invoice #</td>																
																												
																<td>Balance</td>
															</tr>
														</thead>
														<tbody>
															<?php for($i=0;$i<=5;$i++){ ?>
																<tr>
																	<td><?php echo $i; ?></td>																			
																	
																	<td>1,000,000.00</td>
																</tr>
															<?php } ?>
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
		
		
		<!---/invoice modal--->
		<div class="modal fade" id="customer_modal" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog"  style="width:70%;">
                                <div class="modal-content animated bounceInRight">
                                        
										
										
                                        <div class="modal-body"><!--/modal body-->
											<div class="row" style="margin-left:-25px;margin-right:-25px;"><!--/row-->
												<ul id="tab-content" class="nav nav-tabs" style="margin-left:10px;margin-right:10px;">
													<li class="active">
														<a href="#create_invoice" data-toggle="tab">
															<label class="modal_label"><i class="fa fa-clipboard"></i> Customer Information</label>
														</a>
													</li>
													</ul>
													
													<div id="tabs" class="tab-content"  style="margin-left:10px;margin-right:10px;"><!-- /tab contents -->
														<div class="tab-pane fade in active" id="create_invoice" style="border-bottom:1px solid #d5d4d4;border-right:1px solid #d5d4d4;border-left:1px solid #d5d4d4;padding:15px;">
															<div class="row">
																
																	<div class="col-lg-5"><!--column-->
																			<div class="panel panel-primary" style="padding:10px;">
																				<div class="form-group">
																					<label>C<u>u</u>stomer *</label>
																					<select id="customer_dropdown" style="color:white;" name="customer" class="selectpicker show-tick form-control" data-live-search="true">
																						<option>Paul Christian Rueda</option>
																					</select>
																				</div>
																			</div>	
																	</div><!--column-->
																	
																
															</div>
															
														</div>
														
														
													</div><!-- /tab contents -->
												
											</div>	<!--/row-->	
                                        </div><!--/modal body-->
										
                                        <div class="modal-footer">   
                                            <button id="btn_create_invoice" type="button" class="btn btn-primary"><i class="fa fa-save"></i> <u>R</u>ecord Invoice </button>
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
	
</body>

</html>
