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
	<link href="assets/js/plugins/dropdown-enhance/dist/css/bootstrap-select.min.css" rel="stylesheet">
	
	<!-- Datepicker --->
	<link href="assets/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
	 
	<!-- Data Tables -->
    <link href="assets/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
    <link href="assets/css/plugins/dataTables/dataTables.responsive.css" rel="stylesheet">
    <link href="assets/css/plugins/dataTables/dataTables.tableTools.min.css" rel="stylesheet">

	<link href="assets/js/plugins/notify/pnotify.core.css" rel="stylesheet">
    <link href="assets/js/plugins/datepicker/daterangepicker.css" rel="stylesheet">


	
   
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

        #tbl_invoice_list > tbody > tr:hover { cursor: pointer; cursor: hand; }
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

                    <!-- side options-->
					<div class="col-lg-2">
						<div class="ibox float-e-margins">
							<div class="ibox-content mailbox-content">

								<div class="file-manager">
														
									<button id="btn_new_invoice" type="button" class="btn btn-block btn-primary compose-mail" data-toggle="modal" data-target="#invoice_modal">
										<i class="fa fa-file-text-o"></i> 
										<u>N</u>ew Invoice
									</button>
									
									<div class="space-25"></div>
									<h5>Options</h5>
									<ul class="folder-list m-b-md" style="padding: 0">
										<li><a href="#"> <i class="fa fa-inbox "></i> Adjust Invoice </a></li>                                
										<li><a href="#"> <i class="fa fa-certificate"></i> Set to Inactive</a></li>                              
										<li><a href="#"> <i class="fa fa-trash-o"></i> Trash</a></li>
									</ul>
									<h5>Reference</h5>
									<ul class="category-list" style="padding: 0">
										<li><a href="#"> <i class="fa fa-circle text-navy"></i> Department </a></li>
										<li><a href="#"> <i class="fa fa-circle text-danger"></i> Products </a></li>
										<li><a href="#"> <i class="fa fa-circle text-primary"></i> Categories</a></li>                                
									</ul>

									
									<div class="clearfix"></div>
								</div>

							</div>
						</div>
					</div><!-- side options-->

					<div class="col-lg-10 animated fadeInRight">
							<div class="mail-box-header" style="margin-bottom:-25px;">
								<h2 style="block:inline;"><i class="fa fa-clipboard"></i> Sales Invoice </h2>
								
							</div>
							
							<div class="mail-box" style="padding-left:10px;padding-right:10px;">
							
							
								<div class="panel-heading">                            
									<div class="panel-options">
										<div class="pull-right box-tools" style="margin-top:15px"><!-- /. tools -->
													  <i class="fa fa-clipboard"></i> Today's Invoice  [<a href="#" id="link_view_previous">View Previous?</a>]
										</div><!-- /. tools -->
											
									    <!-- navigation tab caption-->
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#tab-1">Invoice History</a></li>
											<li class=""><a data-toggle="tab" href="#tab-2">Invoice #  [ <strong class="text-navy"> Nothing selected </strong> ] </a></li>
										</ul><!-- navigation tab caption-->


									</div>
								</div>

								<div class="panel-body">

									<div class="tab-content">
                                        <!-- / tab 1-->
										<div id="tab-1" class="tab-pane active">
												<table id="tbl_invoice_list" class="table table-bordered">
													<thead>
														<tr>
															<td></td>
															<td>Invoice #</td>
															<td>Txn Date</td>
															<td>Customer</td>
															<td>Seller</td>
															<td>Amount</td>
															<td style="text-align:center;">Status</td>
															<td style="text-align:center;">Action</td>
														</tr>
													</thead>
													<tbody>
														
													</tbody>
												</table>	
										</div><!-- / tab 1-->

                                        <!-- / tab 2-->
										<div id="tab-2" class="tab-pane"><!-- / tab 2-->



                                            <div class="row"><!-- / row 1 / tab 2 -->
                                                <div class="col-lg-12">
                                                    <div class="wrapper wrapper-content animated fadeInRight">
                                                        <div class="ibox-content p-xl">
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <h5>From:</h5>
                                                                    <address>
                                                                        <strong>JDEV IT Business Solution</strong><br>
                                                                        Diamond Street, Balibago, Angeles City, Pampanga<br>
                                                                        jdevtechsolution@gmail.com<br>
                                                                        <abbr title="Phone">P:</abbr> (045) 322-3542
                                                                    </address>
                                                                </div>

                                                                <div class="col-sm-6 text-right">
                                                                    <span id="span_invoice_details">
                                                                        <h4>Invoice No.</h4>
                                                                        <h4 class="text-navy">INV-000567F7-00</h4>
                                                                        <span>To:</span>
                                                                        <address>
                                                                            <strong>Paul Christian Rueda</strong><br>
                                                                            San Jose, San Simon, Pampanga<br>
                                                                            chrisrueda14@yahoo.com<br>
                                                                            <abbr title="Phone">P:</abbr> (120) 9000-4321
                                                                        </address>
                                                                        <p>
                                                                            <span><strong>Invoice Date:</strong> Marh 18, 2014</span><br/>
                                                                            <span><strong>Due Date:</strong> March 24, 2014</span>
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div class="table-responsive m-t">
                                                                <table id="tbl_doc_invoice_details" class="table invoice-table">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Item Description</th>
                                                                        <th>Quantity</th>
                                                                        <th>Unit Price</th>
                                                                        <th>Tax</th>
                                                                        <th>Total Price</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td><div><strong>Intel CPU Octa Core 3.2 Ghz</strong></div>
                                                                            <small>One of the fastest CPU in the market right now.</small></td>
                                                                        <td>10 pcs</td>
                                                                        <td>$26.00</td>
                                                                        <td>$5.98</td>
                                                                        <td>$31,98</td>
                                                                    </tr>


                                                                    </tbody>
                                                                </table>
                                                            </div><!-- /table-responsive -->

                                                            <table class="table invoice-total">
                                                                <tbody>
                                                                <tr>
                                                                    <td><strong>Sub Total :</strong></td>
                                                                    <td>$1026.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>TAX :</strong></td>
                                                                    <td>$235.98</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>TOTAL :</strong></td>
                                                                    <td>$1261.98</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <div class="text-right">
                                                                <button class="btn btn-primary"><i class="fa fa-dollar"></i> Make A Payment</button>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- / row 1 / tab 2 -->

                                            <hr>
                                            <div class="row">
                                                <div class="col-lg-10">
                                                    <button class="btn btn-primary"><i class="fa fa-print"></i> Print Invoice</button>
                                                    <button class="btn btn-success"><i class="fa fa-download"></i> Generate PDF</button>
                                                </div>
                                            </div>


                                        </div> <!-- / tab 2-->

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
		<div class="modal fade" id="invoice_modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                            <div class="modal-dialog"  style="width:70%;">
                                <div class="modal-content animated bounceInRight">
                                        
										
										
                                        <div class="modal-body"><!--/modal body-->
											<div class="row" style="margin-left:-25px;margin-right:-25px;"><!--/row-->
												<ul id="tab-content" class="nav nav-tabs" style="margin-left:10px;margin-right:10px;">
													<li class="active">
														<a href="#create_invoice" data-toggle="tab">
															<label class="modal_label"><i class="fa fa-clipboard"></i> Create Invoice</label>
														</a>
													</li>
													</ul>
													
													<div id="tabs" class="tab-content"  style="margin-left:10px;margin-right:10px;"><!-- /tab contents -->
														<div class="tab-pane fade in active" id="create_invoice" style="border-bottom:1px solid #d5d4d4;border-right:1px solid #d5d4d4;border-left:1px solid #d5d4d4;padding:15px;">
															<div class="row">
																<form id="frm_details_top"><!--/form -->
																	<div class="col-lg-5"><!--column-->
																			<div class="panel panel-primary" style="padding:10px;">
																				<div class="form-group">
																					<label>C<u>u</u>stomer *</label>
																					<select id="cbo_customer" style="color:white;" name="customer" class="selectpicker show-tick form-control" data-live-search="true"  data-message="Please make sure you enter Customer name." title="Please select customer." required>
																						
																						<?php foreach($customers as $customer){ ?>
																							<option value="<?php echo $customer->customer_id; ?>"><?php echo $customer->customer; ?></option>
																						<?php } ?>
																					</select>
																				</div>
																			</div>	
																	</div><!--column-->
																	<div class="col-lg-4"></div>
																	<div class="col-lg-3">
																		<div class="panel panel-primary" style="padding:10px;">
																			<div class="form-group" id="data_1">
																				<label class="font-noraml"><u>D</u>ate Due *</label>
                                                                                <div class="input-group m-b">
                                                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                                                    <input id="txn_date" name="date_due" type="text" class="form-control has-feedback-left" aria-describedby="inputSuccess2Status3" value="11/26/2015"  data-message="Please enter a valid transaction date." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter transaction date here." required>
                                                                                </div>
																			</div>
																		</div>
																	</div>
																</form><!--/form -->
															</div>
															
															<div class="row">
																	<div class="col-lg-12">
																		<div class="panel panel-primary" style="padding:15px 10px 0px 10px;margin-top:-12px;">
																			<div class="form-group">																		
																				<div class="input-group">																			
																					<input type="text" id="plu_typehead" data-provide="typeahead" class="form-control" placeholder="Enter PLU or Desription / Press F2 to Browse Item List"> 
																					<span class="input-group-btn">																				
																						<button type="button" class="btn btn-primary">Browse List</button>
																					</span>
																					
																				</div>
																			</div>
																		</div>
																		
																		<div class="panel panel-primary" style="padding:10px;margin-top:-12px;">
																			<table id="tbl_item_cart" class="table table-bordered">
																				<thead>
																					<tr>
																						<td>Qty</td>
																						<td>Description</td>
																						<td>Discount</td>
																						<td>Unit Price</td>																				
																						<td>Total</td>
																						<td>Action</td>
																					</tr>
																				</thead>
																				<tbody>
																					
																				</tbody>
																				
																				<tfoot>
																					<tr>
																						<td colspan="2" align="right" id="td_total_discount"><strong>Total Discount</strong></td>
																						<td id="cell_total_discount" align="right"><strong>0.00</strong></td>
																						<td align="right"><strong>Total Invoice</strong></td>																						
																						<td id="cell_total_invoice" align="right"><strong>0.00</strong></td>
																						<td>Php</td>
																					</tr>
																					<tr>
																						<td colspan="2" align="right"><strong>Discount %</strong></td>
																						<td id="cell_discount_percent" align="right"><strong>0%</strong></td>
																						<td align="right"><h3>Net Amount</h3></td>
																						<td id="cell_net_amount" align="right" style="color:red;"><strong>0.00</strong></td>
																						<td>Php</td>
																					</tr>
																				</tfoot>
																			</table>
																		</div>
																	</div>
															</div>



															<div class="row">
																<div class="col-lg-12" style="">
																	
																	
																		 <div id="tab_invoice_heading" class="panel-heading" style="margin-left:-15px;margin-top:-20px;">
																			
																			<div class="panel-options">

																				<ul class="nav nav-tabs">
																					<li class="active"><a data-toggle="tab" href="#tab-modal-1"><u>B</u>ill to Address *</a></li>
																					<li class=""><a data-toggle="tab" href="#tab-modal-2">S<u>h</u>ipping Address</a></li>
																					<li class=""><a data-toggle="tab" href="#tab-modal-3">Re<u>m</u>arks</a></li>
																				</ul>
																			</div>

																		</div>
																		
																		<div class="panel-body">
																			<form id="frm_details_bottom"><!--/form -->
																				<div class="tab-content">
																					
																						<div id="tab-modal-1" class="tab-pane active">
																							<div class="form-group" style="margin-top:-10px;">
																								<textarea id="txt_bill_address" name="billing_address" class="form-control" data-message="Please make sure you enter billing address." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter billing address here." required></textarea>
																							</div>
																						</div>

																						<div id="tab-modal-2" class="tab-pane">
																							<div class="form-group" style="margin-top:-10px;">
																								<textarea id="txt_ship_address" name="ship_address" class="form-control"></textarea>
																							</div>
																						</div>
																						
																						<div id="tab-modal-3" class="tab-pane">
																							<div class="form-group" style="margin-top:-10px;">
																								<textarea id="txt_remarks" name="remarks" class="form-control"></textarea>
																							</div>
																						</div>
																					
																				</div>
																			</form><!--/form -->
																		</div>
																	
																	
																	
																	
																</div>
																
																
																
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

        <!---/period modal--->
        <div id="period_modal" class="modal fade" role="dialog">
        <div class="modal-dialog"  style="width:27%;">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Custom Period</h4>
                </div>
                <div class="modal-body">

                    <label>Period Start</label>
                    <div class="input-group m-b">
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        <input name="start" type="text" class="form-control has-feedback-left" aria-describedby="inputSuccess2Status3" value="11/26/2015"  data-message="Please enter a valid transaction date." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter transaction date here." required>
                    </div>

                    <label>Period End</label>
                    <div class="input-group m-b">
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        <input name="end" type="text" class="form-control has-feedback-left" aria-describedby="inputSuccess2Status3" value="11/26/2015"  data-message="Please enter a valid transaction date." data-container="body" data-trigger="manual" data-toggle="tooltip" title="Enter transaction date here." required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_period" class="btn btn-primary"><i class="fa fa-calendar"></i> Apply Period</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div><!---/period modal--->



    <?php include('assets/includes/global_js.php'); ?>
	
	<!--- Dropdown / Selectpicker --->
	<script src="assets/js/plugins/dropdown-enhance/dist/js/bootstrap-select.min.js"></script>
	<script src="assets/js/plugins/typehead/bootstrap3-typeahead.js"></script>
	
	
	 <!-- iCheck -->
    <script src="assets/js/plugins/iCheck/icheck.min.js"></script>
	
	 <!-- Datepicker -->
    <script src="assets/js/plugins/moment.min2.js"></script>
    <script src="assets/js/plugins/datepicker/daterangepicker.js"></script>
	
	<!-- PNotify -->
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.core.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.buttons.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notify/pnotify.nonblock.js"></script>
	
	<!-- Data Tables -->
    <script src="assets/js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.bootstrap.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.responsive.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.tableTools.min.js"></script>
	<script src="assets/js/plugins/formatter/accounting.js"></script>

    <!-- my date libray -->
    <script src="assets/js/defined/date.library.js"></script>

    <script src="assets/js/defined/sales.invoice.event.handlers.js"></script>
	
</body>

</html>
