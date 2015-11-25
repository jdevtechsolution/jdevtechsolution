


$(document).ready(function(){
	

/**********************************************************************************************************************************************************/
		//invoice list module,the invoice table
		var invoiceListModule=(function(){
					var tbl_invoice_list;
					
					
					var bindEventHandlers=(function(){
								/**
								*
								*	fires when edit invoice button on selected row is clicked
								*								
								*/					
								$('#tbl_invoice_list tbody').on('click','button[name="edit_invoice"]',function(){
									var row=$(this).closest('tr');
									
									invoiceInfoModalModule.setMode("edit"); //set mode to editing
									invoiceInfoModalModule.setSelectedID(row.find('td:eq(0) input[type="checkbox"]').val()); //what is the id of the invoice we are going to update
									invoiceInfoModalModule.setSelectedRow(row); //remember the row we are going to update
									
									//object details of modal
									invoiceInfoModalModule.setDetails({
										"invoice_id"	:		row.find('td:eq(0) input[type="checkbox"]').val(),
										"invoice_no"	:		row.find('td').eq(1).text(),
										"txn_date"		:		row.find('td').eq(2).text(),
										"customer_id"	:		row.find('td').eq(3).attr('data-customer-id'),
										"customer"		:		row.find('td').eq(3).text(),
										"bill_address"	:		row.find('td:eq(0) input[type="checkbox"]').attr('data-bill-address'),
										"ship_address"	:		row.find('td:eq(0) input[type="checkbox"]').attr('data-ship-address'),
										"remarks"		:		row.find('td:eq(0) input[type="checkbox"]').attr('data-remarks')			
									});
									
									//show invoice info modal
									invoiceInfoModalModule.showModal();
																	
								});
					
					})();
					
					
					var initializeInvoiceDatatable=(function(){
						tbl_invoice_list=$('#tbl_invoice_list').DataTable({
							"bLengthChange":false,
							"order": [[ 0, "desc" ]],
							"oLanguage": {
								"sSearch": "Search: ",
								"sProcessing": "Please wait..."
							},
							"dom": '<"toolbar">frtip',
							"columnDefs": [							
								{//column 1
									'bSortable': false,
									'targets': [0],
									'render': function(data, type, full, meta){
                                       // alert(data);
										var _arrData=data.split('|');
										return '<input type="checkbox" value="'+_arrData[0]+'" data-bill-address="'+_arrData[1]+'" data-ship-address="'+_arrData[2]+'" data-remarks="'+_arrData[3]+'">';
									}
								},//column 1
								{//column 3

									'bSortable': false,
									'targets': [3],
									'render': function(data, type, full, meta){
										return data.split('|')[1];
									}
								},//column 3,
								
								{//column 7

									'bSortable': false,
									'targets': [6],
									'render': function(data, type, full, meta){
										return '<center><i class="fa fa-check-circle" style="color:green;"></i></center>';
									}
								},//column 7
							
								{//column 8

									'bSortable': false,
									'targets': [7],
									'render': function(data, type, full, meta){
										var btn_edit='<button name="edit_invoice" class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
										var btn_trash='<button name="remove_invoice" class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
										
										return '<center>'+btn_edit+btn_trash+'</center>';
									}
								}//column 8
							],
							"rowCallback":function( row, data, index ){	
							
								$(row).find('td').eq(5).attr({
									"align":"right"
								});
								
								$(row).find('td').eq(3).attr({
									"data-customer-id": data[3].split('|')[0]
								});
							}

							
						});	
					
					})();
					
					
					//show list of invoice of current period
					var showInvoiceHistoryList=function(){
						$('#tbl_invoice_list tbody').html('<tr><td colspan="8" align="center"><img src="assets/img/ajax-loader-sm.gif"></td></tr>');
					
						$.getJSON('SalesInvoiceController/ActionGetInvoiceHistory', function(response){	
							tbl_invoice_list.clear().draw(); //make sure invoice datatable has no rows
							console.log(response);

							
							$.each(response,function(index,value){								
								
								tbl_invoice_list.row.add([
									value.record_info,
									value.invoice_no,
									value.txn_date,
									value.customer,
									value.seller,
									value.invoice_amount,
									value.is_active,
									""
								]).draw();
							});
							
						}).fail(function(xhr){


                        });
					};
					
					
					var lastPage=function(){
						$('#tbl_invoice_list_paginate ul li:nth-last-child(2) a').click(); //trigger 2nd to the last link, the last page number
					};
					
					
					var addRow=function(data){
						tbl_invoice_list
						.row
						.add(data)
						.draw();
					};


					//create toolbar buttons
					var createToolBarButton=function(_buttons){
						$("div.toolbar").html(_buttons);
					};


					//get the invoice table object instance
					var getTableInstance=function(){					
						return tbl_invoice_list;
					};


					//update row
					var updateRow=function(row,data){
						tbl_invoice_list
						.row(row)
						.data(data)
						.draw();
					};
				
				
				
					//return objects as functions
					return {
						getTableInstance : 		getTableInstance,
						createToolBarButton: 	createToolBarButton,						
						showInvoiceHistoryList: showInvoiceHistoryList,						
						addRow: 				addRow,
						updateRow:				updateRow,
						lastPage: 				lastPage
					};			
					
		
		})();
/**********************************************************************************************************************************************************/	

		var itemCartListModule=(function(){
					var tbl_item_cart;
					
					var bindEventHandlers=(function(){
					
							//update data cached everytime changes is done on datatable td DOM, to make it safe it updates everytime td lost focus
							$('#tbl_item_cart > tbody').on('blur','td',function(){			
							
								updateCachedData(this);	//update cached data even if "Enter" key is not pressed		
								
								var row=$(this).closest('tr');
								setLineTotal( row , getLineTotal( row ) ); //update line total amount
								
								updateCachedData(row.find('td').eq(4)); //update cached data of total
								
								formatEditableNumberCells( row );
								
							});
							
							//remove row everytime trash button on td is clicked
							$('#tbl_item_cart > tbody').on('click','button[name="remove_row"]',function(){
																
								//remove selected row when trash button is clicked
								tbl_item_cart
								.row( $(this).closest('tr') )
								.remove()
								.draw();
								
							});
					
												
							
							$('#tbl_item_cart > tbody').on('keypress','td',function(event){	
								if(event.keyCode==13){
										
									updateCachedData(this); //update cached data
									
									var row=$(this).closest('tr');	
									setLineTotal(  row , getLineTotal(row)  ); //compute line total	
									
									formatEditableNumberCells( row ); //set number format
									
									$('#plu_typehead').focus();
									
								}else{
									return isNumber(event,this);//returns true if current character is number and  decimal point
								}
							});
					
					})();
					
					//initialize cart datatable
					var initializeCartDatatable=(function(){
						
						tbl_item_cart=$('#tbl_item_cart').DataTable({
									"iDisplayLength":5,
									"bLengthChange":false,
									/*"order": [[ 0, "desc" ]],*/
									"bFilter":true,
									"bInfo":false,
									"dom": '<"tools">frtip<"bottom">',
									"columnDefs": [
											{'bSortable': false,'targets': [0]},
											{//column 2

												'bSortable': false,
												'targets': [1],
												'render': function(data, type, full, meta){
													return data.split('|')[1];
												}
											}//column 2
											,						
											
											{//column 6

												'bSortable': false,
												'targets': [5],
												
												'render': function(data, type, full, meta){	
													//var btn_increase='<button  class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Increase Qty"><i class="fa fa-plus"></i> </button>';
													//var btn_decrease='<button  class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Decrease Qty"><i class="fa fa-minus"></i> </button>';
													var btn_trash='<button name="remove_row" class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
													//var btn_increase='<button name="remove_row" class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Increase Qty"><i class="fa fa-plus"></i> </button>';
													return '<center>'+btn_trash+'</center>';
												}
											}//column 6
									],
									"rowCallback":function( row, data, index ){	
										$(row).find('td').eq(0).attr({
											"align":"right",
											"contenteditable":"true"
										});
										
										var _item=data[1].split('|');
										$(row).find('td').eq(2).attr({
											"align":"right",
											"contenteditable":"true",
											"data-product-id":_item[0]
										});
										
										$(row).find('td').eq(3).attr({
											"align":"right",
											"contenteditable":"true"
										});
										
										$(row).find('td').eq(4).attr({
													"align":"right"
										});
									}
								
							});	
					
					})();
					
					//compute total amount of current row
					var getLineTotal=function(row){
						var _qty=row.find('td').eq(0).text(),
							_discount=row.find('td').eq(2).text(),
							_price=row.find('td').eq(3).text();
						
						return ((accounting.unformat(_price)*accounting.unformat(_qty))-accounting.unformat(_discount));
					};
					
					//set total amount
					var setLineTotal=function(row,amount){
						row.find('td').eq(4).text(accounting.formatNumber(amount,2));
					};
					
					//set total discount on cart table footer
					var setTotalDiscount=function(amount){
						$('#td_total_discount').text(accounting.formatNumber(amount,2));
					};
					
					
					//function that returns true if element character is valid(number and 1 decimal point)
					var isNumber=function (evt, element) {
						var charCode = (evt.which) ? evt.which : evt.keyCode;
						
						if(
							/*(charCode != 45 || $(element).text().indexOf('-') != -1) &&      */
							(charCode != 46 || $(element).text().indexOf('.') != -1) &&      // “.” check DOT, and only one
							(charCode < 48 || charCode > 57)) {
							return false;
						} else {
							
							return true;
						}
					};
					
					
					//format editable cells
					var formatEditableNumberCells=function(row){
						row.find('td').eq(0).text(accounting.formatNumber(row.find('td').eq(0).text()));
						row.find('td').eq(2).text(accounting.formatNumber(row.find('td').eq(2).text(),2));
						row.find('td').eq(3).text(accounting.formatNumber(row.find('td').eq(3).text(),2));
						row.find('td').eq(4).text(accounting.formatNumber(row.find('td').eq(4).text(),2));
					};
					
					
					//update cached memory on selected cell
					var updateCachedData=function(cell){
						 tbl_item_cart
						.cell($(cell))
						.data( accounting.unformat( $(cell).text() ) );						
					};
					
					
					var removeRows=function(){						
						tbl_item_cart.clear().draw();
					};
					
					
					
					//return objectss
					return {
						/*init: function(){
							//initializeCartDatatable();
							//bindEventHandlers();						
						}, *///end of init table function
					
						addRow: function(data){
							tbl_item_cart.row.add(data).draw();
						},
						
						getInstance: function(){
							return tbl_item_cart;
						},
						
						removeRows: removeRows
							
						
					
					};
					
		})();
/**********************************************************************************************************************************************************/
		//all typehead modules
		var typeHeadModules=(function(){
				var typeHeadPLU;
				
				var initializeTypHead=(function(){
							var $input = $('#plu_typehead');
							//get product list
							$.get('SalesInvoiceController/ActionGetProductList', function(response){	
								//initialize typehead after data request is completed
							typeHeadPLU=$input.typeahead({ 
									source:response,
									updater: function(data) {									;
										
										itemCartListModule.addRow([
											"1",
											data.id+"|"+data.description,
											accounting.formatNumber(data.discount,2),
											accounting.formatNumber(data.srp),
											accounting.formatNumber(data.srp,2),
											""
										]);
										
										return ""; //specifies what would be going to display			
									},
									afterSelect:function(data){ //callback after item is selected, data here depends on the content of textbox
										$('#tbl_item_cart_paginate ul li:nth-last-child(2) a').click(); //trigger 2nd to the last link, the last page number
									}
								
								});
							},'json').fail(function(xhr){
								console.log(xhr);
							});
					
				})();
				
				return {
					
									
					//returns PLU typehead instance
					getPLUInstance: function(){
						return typeHeadPLU;
					}
				
				
				};
		
		})();
/**********************************************************************************************************************************************************/
		
		var invoiceInfoModalModule=(function(){
				var _mode;		var _selectedID;	 var _selectedRow;		
				
				//binds all events of invoice modal
				var bindEventHandlers=(function(){
							
							/**
							* fires everytime the record invoice button on modal is clicked
							**/
							$('#btn_create_invoice').click(function(){
									
									if(validateRequiredFields()){ //if true, all required fields are supplied
									
											if(_mode=="new"){ //if current mode is new			
													alert("ddd");
													createNewInvoice()
													.success(function(response){ //if request is successful
															console.log(response);
															
															PNotify.removeAll(); //remove all notifications
															new PNotify({
																title: 'Success!',
																text:  response.msg,
																type:  response.stat
															}); //create new notification base on server response

															var row=response.row[0];
															var data=[row.record_info,row.invoice_no,row.txn_date,row.customer,row.seller,row.invoice_amount,row.is_active,""];
															invoiceListModule.addRow(data); //add the info of recent invoice
															invoiceListModule.lastPage(); //go to last page
				
															itemCartListModule.removeRows(); //remove all rows of cart datatable
															clearFields(); //clear fields
															
													})
													.error(function(xhr,stat,error){ //if error occurs
														alert(xhr.responseText);
														console.log(xhr);				
													});
													
													
													
											}else{		//if current mode is update	
													
													updateInvoice()
													.success(function(response){ //if request is successful
															//console.log(response);
															//alert(response.test);
															hideModal();
															
															PNotify.removeAll(); //remove all notifications
															new PNotify({
																title: 'Success!',
																text:  response.msg,
																type:  response.stat
															}); //create new notification base on server response
															
															var row=response.row[0];
															var data=[row.record_info,row.invoice_no,row.txn_date,row.customer,row.seller,row.invoice_amount,row.is_active,""];													
															invoiceListModule.updateRow(_selectedRow,data);
				
															itemCartListModule.removeRows(); //remove all rows of cart datatable
															clearFields(); //clear fields
															
															
															
													})
													.error(function(xhr,stat,error){ //if error occurs
														alert(xhr.responseText);
														console.log(xhr);				
													});
											}
										
									}
									
							});
							
							
							
							/**
							* fires everytime the modal is shown
							**/
							$('#invoice_modal').on('shown.bs.modal', function() {
								$('#plu_typehead').focus();
							});
							
							
				
				})();
				
				
				
				
				//function that validates all required fields, returns true if all required fields are supplied
				var validateRequiredFields=function(){
								var	stat=1;								
								
								$('textarea[required]').each(function(){
										if($(this).val()==""){
								
											$(this).focus()
											.tooltip('show');
											
											PNotify.removeAll();
											new PNotify({
												title: 'Missing!',
												text: $(this).data('message'),
												type: 'error'
											});
											
											stat=0;
											return false; //this will exit on function inside 'each'
										}
								});
								
								$('select[required]').each(function(){ //selectpicker does not support tooltip, just show notification
									if($(this).val()==""){
										PNotify.removeAll();
										new PNotify({
												title: 'Missing!',
												text: $(this).data('message'),
												type: 'error'
										});
												
										stat=0;
										return false; //this will exit on function inside 'each'
									}
								});
								
								var rowCount = itemCartListModule.getInstance().rows()[0].length;
								if(rowCount==0){ //if not item in cart
									PNotify.removeAll();
									new PNotify({
											title: 'Missing!',
											text: 'No item found. Please enter atleast one item.',
											type: 'error'
									});
											
									stat=0;									
								}
								
								return stat; //this will always be executed and return current state
				}; //end of validateRequiredFields
				
				//add new invoice
				var createNewInvoice=function(){						
					
						var _cartTable=itemCartListModule.getInstance(); //intance of datatable					
						var serialData=$('#frm_details_top,#frm_details_bottom').serializeArray();
						
						_cartTable.rows().eq(0).each(function(index){
							var row = _cartTable.row(index);				 
							var data = row.data();
							
							serialData.push(
								{name:"qty[]",value:accounting.unformat(data[0])},
								{name:"prodid[]",value:data[1].split('|')[0]},
								{name:"discount[]",value:accounting.unformat(data[2])},
								{name:"unitprice[]",value:accounting.unformat(data[3])},
								{name:"linetotal[]",value:accounting.unformat(data[4])}
							);
							
							
						});
						
												
						return $.ajax({
							"dataType":"json",
							"type":"POST",
							"url":"SalesInvoiceController/ActionSaveInvoiceInfo",
							"data":serialData	
						});
							
							
				}; //end of saveInvoiceInfo
				
				//update invoice
				var updateInvoice=function(){
						var _cartTable=itemCartListModule.getInstance(); //intance of datatable					
						var serialData=$('#frm_details_top,#frm_details_bottom').serializeArray();
						
						serialData.push({
							name:"id",value: _selectedID
						});
						
						_cartTable.rows().eq(0).each(function(index){
							var row = _cartTable.row(index);				 
							var data = row.data();
							
							serialData.push(
								{name:"qty[]",value:accounting.unformat(data[0])},
								{name:"prodid[]",value:data[1].split('|')[0]},
								{name:"discount[]",value:accounting.unformat(data[2])},
								{name:"unitprice[]",value:accounting.unformat(data[3])},
								{name:"linetotal[]",value:accounting.unformat(data[4])}
							);
							
						});
						
						console.log(serialData);
											
						return $.ajax({
							"dataType":"json",
							"type":"POST",
							"url":"SalesInvoiceController/ActionUpdateInvoiceInfo",
							"data":serialData	
						});
						
				};
				
				//set mode of modal, are we going to add new or update??
				var setCurrentMode=function(status){					
					_mode=status.toLowerCase();
				};
					
				//returns the current mode of the modal, add new or update
				var getCurrentMode=function(){
					return _mode;
				};
				
				//set selected id, the invoice
				var setSelectedID=function(id){
					_selectedID=id;
				};
				
				//get selected id, the invoice
				var getSelectedID=function(){
					return _selectedID;
				};
				
				//set selected row, the tr element
				var setSelectedRow=function(row){
					_selectedRow=row;
				};
				
				//get selected row, the tr element
				var getSelectedRow=-function(){
					return _selectedRow;
				};
				
				var clearFields=function(){
					$('#plu_head').val('');
					$('#frm_details_bottom textarea').val('');
					$('#frm_details_top select').val('').selectpicker('refresh');					
				};
						

				var showModal=function(){
					$('#invoice_modal').modal('show');
				};
				
				var hideModal=function(){
					$('#invoice_modal').modal('hide');
				};
				
				//set invoice modal details
				var setInvoiceModalDetails=function(data){									
				
					$('#cbo_customer').val(data.customer_id).selectpicker('refresh');
					$('#txt_bill_address').val(data.bill_address);
					$('#txt_ship_address').val(data.ship_address);
					$('#txt_remarks').val(data.remarks);
					
					
					//set invoice cart items
					$('#tbl_item_cart tbody').html('<tr><td colspan="6" align="center"><img src="assets/img/ajax-loader-sm.gif" /></td></tr>');
					
					$.getJSON('SalesInvoiceController/ActionGetInvoiceCartItems',{id:data.invoice_id}, function(response){	
						//console.log(response);
						itemCartListModule.removeRows(); //remove rows
						$.each(response,function(index,data){							
							itemCartListModule.addRow([
										accounting.formatNumber(data.item_qty),
										data.item,
										accounting.formatNumber(data.item_discount,2),
										accounting.formatNumber(data.item_unit_price,2),
										accounting.formatNumber(data.item_line_total,2),
										""
							]);				
							
						});
						//itemCartListModule.addRow(["1",data.id+"|"+data.description,data.discount,data.srp,data.srp,""]);
						
					});
					
					
				};
				
				
				
					
					
					
					
					
					
				//return value of this invoice modal object module
				return {
						setMode: 		setCurrentMode,
						getMode:		getCurrentMode,
						clearFields: 	clearFields,
						showModal: 		showModal,
						hideModal:		hideModal,
						setDetails: 	setInvoiceModalDetails,
						setSelectedID: 	setSelectedID,
						getSelectedID: 	getSelectedID,
						setSelectedRow: setSelectedRow
						
				}; //end of return value
				
				
	
		})();
		
/**********************************************************************************************************************************************************/		
		
		var pluginListModules=(function(){
				return {
					initDTPicker: function(){
						$('#dt_due_date').datepicker();
					}
				};
		
		})();
		

/**********************************************************************************************************************************************************/
		
		//itemCartListModule.
		invoiceListModule.showInvoiceHistoryList();
		pluginListModules.initDTPicker();		
		
		
		
				
/**********************************************************************************************************************************************************/
		
		//new invoice	
		$('#btn_new_invoice').click(function(){
			invoiceInfoModalModule.setMode("new");
			itemCartListModule.removeRows(); //remove all rows of cart datatable
			invoiceInfoModalModule.clearFields(); //clear fields
		});
		
		//
		$('#link_view_previous').click(function(){
			$('#period_modal').modal('show');
		});

		
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
			
			
		
					
			
			var _btnRefresh='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh Invoice"><i class="fa fa-refresh"></i> Refresh</button>';
            var _btnActive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Active"><i class="fa fa-check-circle"></i> </button>';
            var _btnInactive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Inactive"><i class="fa fa-times-circle"></i> </button>';
            var _btnTrash='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
			
			
			invoiceListModule.createToolBarButton(_btnRefresh+_btnActive+_btnInactive+_btnTrash);
			
			
			var _btnApplyGlobalDiscount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Apply Global Discount"><i class="fa fa-refresh"></i> Apply Global Discount</button>';
			var _btnIncreaseCount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Add Qty"><i class="fa fa-plus"></i> Increase <b><u>Q</u></b>ty</button>';
			var _btnDecreaseCount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Subtract Qty"><i class="fa fa-minus"></i> Descrease <b><u>Q</u></b>ty</button>';
			$("div.tools").html(_btnIncreaseCount+_btnDecreaseCount+_btnApplyGlobalDiscount);
			
				
});





