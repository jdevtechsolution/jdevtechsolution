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
    <link href="assets/js/plugins/datepicker/daterangepicker.css" rel="stylesheet">




    <style>
		.toolbar , .new_category , .new_unit{
			float: left;
		}

        .period{
            float: left;
            margin-bottom: 10px;
        }

		[contenteditable="true"]:active,
		[contenteditable="true"]:focus{
			border:3px solid #F5C116;
			outline:none;
			
			background: white;
		}

        #tbl_item_list > tbody > tr:hover { cursor: pointer; cursor: hand; }
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

				<div class="row"><!-- /content area/ 1st row-->
					
					<div class="col-lg-8 animated fadeInRight">
							<div class="mail-box-header" style="margin-bottom:-25px;">
								<h2 style="block:inline;"><i class="fa fa-cubes"></i> Item Management </h2>
								
							</div>
							
							<div class="mail-box" style="padding-left:10px;padding-right:10px;">
							
							
								<div class="panel-heading">                            
									<div class="panel-options">									
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#tab-1">List of Item</a></li>
											<li class=""><a data-toggle="tab" href="#tab-2">Item History <strong class="text-navy"> [ Intel Octa Core 3.2Ghz ] </strong></a></li>
                                            <li class=""><a data-toggle="tab" href="#tab-3">References</a></li>

                                        </ul>
									</div>
								</div>

								<div class="panel-body">

									<div class="tab-content">

                                        <!-- /tab 1 -->
										<div id="tab-1" class="tab-pane active">
												<table id="tbl_item_list" class="table table-bordered">
													<thead>
														<tr>
															<td></td>																												
															<td>Item #</td>
															<td>Item Description</td>
															<td>Category</td>
															<td style="text-align:right;">On Hand</td>
                                                            <td>Action</td>
														</tr>
													</thead>
													<tbody>
														<?php for($i=0;$i<=10;$i++){ ?>
														<tr>
															<td><input type="checkbox"></td>
															<td>10001</td>
															<td>Intel Octa Core 3.2Ghz</td>
															<td>Computer Parts</td>
															<td align="right">150 pcs</td>
                                                            <td></td>
														</tr>
														<?php } ?>
													</tbody>
												</table>	
										</div><!-- /tab 1 -->

                                        <!-- /tab 2 -->
										<div id="tab-2" class="tab-pane">
												<table id="tbl_item_history" class="table table-bordered">
													<thead>
														<tr>
															<td>Txn Date</td>
															<td>Invoice #</td>
															<td>Remarks</td>
															<td>Stock In</td>
															<td>Stock Out</td>
															<td>Balance</td>
														</tr>
													</thead>
													<tbody>
														<?php for($i=0;$i<=10;$i++){ ?>
														<tr>
															<td>Nov 24, 2015</td>
															<td>2015101000001</td>
															<td>na</td>
															<td>1,200.00</td>
															<td>0.00</td>
															<td>1,200.00</td>
														</tr>
														<?php } ?>
													</tbody>
												</table>	
										</div><!-- /tab 2 -->

                                        <!-- /tab 3 -->
                                        <div id="tab-3" class="tab-pane">

                                            <div class="bs-example">
                                                <div class="panel-group" id="accordion">

                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h4 class="panel-title">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><i class="fa fa-inbox"></i> Category Management</a>
                                                            </h4>
                                                        </div>

                                                        <div id="collapseOne" class="panel-collapse collapse in">
                                                            <div class="panel-body">

                                                                <table id="tbl_category_list" class="table table-bordered">
                                                                    <thead>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>Category</td>
                                                                        <td>Description</td>
                                                                        <td>Status</td>
                                                                        <td>Action</td>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <?php for($i=0;$i<=10;$i++){ ?>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td>Category</td>
                                                                            <td>Description</td>
                                                                            <td>Status</td>
                                                                            <td>Action</td>

                                                                        </tr>
                                                                    <?php } ?>
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h4 class="panel-title">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><i class="fa fa-th-large"></i> Unit Management</a>
                                                            </h4>
                                                        </div>
                                                        <div id="collapseTwo" class="panel-collapse collapse">
                                                            <div class="panel-body">
                                                                <table id="tbl_unit_list" class="table table-bordered">
                                                                    <thead>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>Unit</td>
                                                                        <td>Description</td>
                                                                        <td>Status</td>
                                                                        <td>Action</td>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <?php for($i=0;$i<=10;$i++){ ?>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td>Unit</td>
                                                                            <td>Description</td>
                                                                            <td>Status</td>
                                                                            <td>Action</td>

                                                                        </tr>
                                                                    <?php } ?>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                            </div>
                                        </div><!-- /tab 3 -->



									</div>
								</div>
							</div>
						
					</div>
					
					<div class="col-lg-4">

                        <!-- /item details on right -->
						<div class="contact-box  animated fadeInRight">

                            <div class="row">
                                    <div class="col-sm-12 ">
                                            <div class="row">
                                                <div class="col-sm-12 ">
                                                    <h3><i class="fa fa-cubes"></i> Intel CPU Octa core 3.2Ghz</h3><br>
                                                    <center><img class="img-responsive" style="width:120px;" src="assets/img/items/1.jpg"></center>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <i class="fa fa-gift"></i> <strong>Category :</strong> <br />Computer Parts<br /><br />
                                                </div>
                                                <div class="col-sm-6">
                                                    <i class="fa fa-th-large"></i> <strong>On Hand :</strong> <br />10 pcs
                                                </div>
                                            </div>
                                        <hr >
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <i class="fa fa-dollar"></i> <strong>Selling Price :</strong>  <br />3,500.00 Php
                                                </div>
                                                <div class="col-sm-6">
                                                    <i class="fa fa-dollar"></i> <strong>Purchase Cost :</strong> <br /> 3,000.00 Php
                                                </div>
                                            </div>

                                            <br />
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <i class="fa fa-th-large"></i> <strong>Ideal Qty :</strong> <br />12
                                                </div>
                                                <div class="col-sm-6">
                                                    <i class="fa fa-th-large"></i> <strong>Warn Qty :</strong> <br />2
                                                </div>
                                            </div>

                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <i class="fa fa-th-large"></i> <strong>Other Description 1 :</strong> <br />Description 1
                                                </div>
                                            </div>

                                            <br />
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <i class="fa fa-th-large"></i> <strong>Other Description 2 :</strong> <br />Description 2
                                                </div>
                                            </div>
                                            <hr>
                                    </div>
                            </div><br><br>


							<div class="text-right">
									<a class="btn btn-xs btn-white"><i class="fa fa-pencil"></i> Edit Product Information </a>
							</div>
								
								

						</div><!-- /item details on right -->
						
					</div>

				</div><!-- /content area/ 1st row-->

        </div><!-- /main content area -->
		
		<!-- /footer -->
        <?php $this->load->view('templates/footer'); ?>
		<!-- /footer -->
		
		
        </div>
        </div>
		
		
	<!---/invoice modal--->
	<div class="modal fade" id="item_info_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog"  style="width:50%;">
                <div class="modal-content animated bounceInRight">

                    <div class="modal-body">
                        <div class="row" style="margin-left:-25px;margin-right:-25px;"><!--/row-->
                            <div class="col-lg-12">
                                <div class="panel panel-default" style="margin-bottom:-20px;border-radius:0px;">

                                    <div class="ibox float-e-margins">
                                        <div class="ibox-title">
                                            <h5>Item Management<small class="m-l-sm">Please enter Item Information.</small></h5>
                                            <div class="ibox-tools">

                                                <a data-dismiss="modal">
                                                    <i class="fa fa-times"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="ibox-content">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label>Item # *</label>
                                                        <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Item number is required.">
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Item Description *</label>
                                                        <input class="form-control" type="text" name="user_code"  data-container="body" data-trigger="manual" data-toggle="tooltip" title="Item Description is required.">
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Unit *</label>
                                                        <select id="cbo_unit" style="color:white;" name="unit" class="selectpicker show-tick form-control" data-live-search="true"  data-message="Please make sure you enter unit." title="Please select unit." required>
                                                            <option value="1">kg</option>
                                                            <option value="2">mg</option>
                                                            <option value="3">pcs</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Purchase Cost </label>
                                                        <input class="form-control" type="number" name="user_code">
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Selling Price</label>
                                                        <input class="form-control" type="number" name="user_code">
                                                    </div>


                                                </div>

                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label>Ideal Qty </label>
                                                        <input class="form-control" type="number" name="user_code">
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Warn Qty</label>
                                                        <input class="form-control" type="number" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Employee number is required.">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Other Description 1</label>
                                                        <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Employee number is required.">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Other Description 2 </label>
                                                        <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Employee number is required.">
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Other Description 3 </label>
                                                        <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Employee number is required.">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>	<!--/row-->


                    </div>


                    <div class="modal-footer">
                        <button id="btn_save_changes" type="button" class="btn btn-primary"><i class="fa fa-save"></i> <u>S</u>ave Changes </button>
                        <button type="button" class="btn btn-white" data-dismiss="modal"><u>C</u>lose</button>
                    </div>

                </div>
            </div>
        </div><!---/invoice modal--->


    <!-- / category modal-->
    <div class="modal fade" id="category_info_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog"  style="width:30%;">
            <div class="modal-content animated bounceInRight">

                <div class="modal-body">
                    <div class="row" style="margin-left:-25px;margin-right:-25px;"><!--/row-->
                        <div class="col-lg-12">
                            <div class="panel panel-default" style="margin-bottom:-20px;border-radius:0px;">

                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>Category Management<small class="m-l-sm">Please enter Category Information.</small></h5>
                                        <div class="ibox-tools">

                                            <a data-dismiss="modal">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="form-group">
                                                    <label>Category *</label>
                                                    <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Item number is required.">
                                                </div>

                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <textarea class="form-control" style="resize: none;"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	<!--/row-->


                </div>


                <div class="modal-footer">
                    <button id="btn_save_changes" type="button" class="btn btn-primary"><i class="fa fa-save"></i> <u>S</u>ave Changes </button>
                    <button type="button" class="btn btn-white" data-dismiss="modal"><u>C</u>lose</button>
                </div>

            </div>
        </div>
    </div><!-- / category modal-->


    <!-- / unit modal-->
    <div class="modal fade" id="unit_info_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog"  style="width:30%;">
            <div class="modal-content animated bounceInRight">

                <div class="modal-body">
                    <div class="row" style="margin-left:-25px;margin-right:-25px;"><!--/row-->
                        <div class="col-lg-12">
                            <div class="panel panel-default" style="margin-bottom:-20px;border-radius:0px;">

                                <div class="ibox float-e-margins">
                                    <div class="ibox-title">
                                        <h5>Unit Management<small class="m-l-sm">Please enter Unit Information.</small></h5>
                                        <div class="ibox-tools">

                                            <a data-dismiss="modal">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="ibox-content">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="form-group">
                                                    <label>Unit *</label>
                                                    <input class="form-control" type="text" name="user_code" data-container="body" data-trigger="manual" data-toggle="tooltip" title="Item number is required.">
                                                </div>

                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <textarea class="form-control" style="resize: none;"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	<!--/row-->


                </div>


                <div class="modal-footer">
                    <button id="btn_save_changes" type="button" class="btn btn-primary"><i class="fa fa-save"></i> <u>S</u>ave Changes </button>
                    <button type="button" class="btn btn-white" data-dismiss="modal"><u>C</u>lose</button>
                </div>

            </div>
        </div>
    </div><!-- / unit modal-->


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
                    <button type="button" class="btn btn-primary"><i class="fa fa-calendar"></i> Apply Period</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>


	<?php include('assets/includes/global_js.php'); ?>
	
	<!--- Dropdown / Selectpicker --->
	<script src="assets/css/dropdown-enhance/dist/js/bootstrap-select.min.js"></script>
	<script src="assets/js/plugins/typehead/bootstrap3-typeahead.js"></script>	
	
	 <!-- iCheck -->
    <script src="assets/js/plugins/iCheck/icheck.min.js"></script>
	
	 <!-- Datepicker -->
	<script src="assets/js/plugins/datapicker/bootstrap-datepicker.js"></script>
    <script src="assets/js/plugins/moment.min2.js"></script>
    <script src="assets/js/plugins/datepicker/daterangepicker.js"></script>


    <!-- Data Tables -->
    <script src="assets/js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.bootstrap.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.responsive.js"></script>
    <script src="assets/js/plugins/dataTables/dataTables.tableTools.min.js"></script>
	 
	<!-- sparkline -->
	<script src="assets/js/plugins/sparkline/jquery.sparkline.min.js"></script>
	
	<!-- Peity -->
    <script src="assets/js/plugins/peity/jquery.peity.min.js"></script>

    <script src="assets/js/defined/item.management.event.handlers.js"></script>


</body>

</html>
