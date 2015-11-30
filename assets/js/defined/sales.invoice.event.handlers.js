


$(document).ready(function(){
	

/**********************************************************************************************************************************************************/
		//invoice list module,the invoice table
		var tableInvoiceModule=(function(){
					var tbl_invoice_list;
					
					
					var bindEventHandlers=(function(){
                                $('#tbl_invoice_list > tbody').on('click','tr',function(){

                                    highlightRow(this); //highlight the row that fires click event

                                    var _cell=$(this).find('td');
                                    $('a[href="#tab-2"]').html( _cell.eq(1).text()+" <span> [ Loading details... <img src='assets/img/ajax-loader-arrow.gif'> ]</span>" );



                                    documentInvoiceInfoModule.writeContent({
                                        "invoice_id"            :       _cell.eq(0).find('input[type="checkbox"]').val(),
                                        "invoice_no"            :       _cell.eq(1).text(),
                                        "customer_name"         :       _cell.eq(3).text(),
                                        "billing_address"       :       _cell.eq(0).find('input[type="checkbox"]').attr('data-bill-address'),
                                        "email"                 :       _cell.eq(3).attr('data-email'),
                                        "invoice_date"          :       _cell.eq(2).text(),
                                        "due_date"              :       _cell.eq(0).find('input[type="checkbox"]').attr('data-due-date'),
                                        "primary_contact"       :       _cell.eq(3).attr('data-primary-contact')

                                    });


                                });

								/**
								*	fires when edit invoice button on selected row is clicked
								*/					
								$('#tbl_invoice_list tbody').on('click','button[name="edit_invoice"]',function(){
									var row=$(this).closest('tr');
									
									modalInvoiceInfoModule.setMode("edit"); //set mode to editing
									modalInvoiceInfoModule.setSelectedID(row.find('td:eq(0) input[type="checkbox"]').val()); //what is the id of the invoice we are going to update
									modalInvoiceInfoModule.setSelectedRow(row); //remember the row we are going to update
									
									//object details of modal
									modalInvoiceInfoModule.setDetails({
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
									modalInvoiceInfoModule.showModal();
																	
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
										return '<input type="checkbox" value="'+_arrData[0]+'" data-bill-address="'+_arrData[1]+'" data-ship-address="'+_arrData[2]+'" data-remarks="'+_arrData[3]+'" data-due-date="'+_arrData[4]+'">';
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
										var btn_edit='<button name="edit_invoice" class="btn btn-default btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
										var btn_trash='<button name="remove_invoice" class="btn btn-default btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
										
										return '<center>'+btn_edit+btn_trash+'</center>';
									}
								}//column 8
							],
							"rowCallback":function( row, data, index ){	
							
								$(row).find('td').eq(5).attr({
									"align":"right"
								});
								
								$(row).find('td').eq(3).attr({
									"data-customer-id": data[3].split('|')[0],
                                    "data-email": data[3].split('|')[2],
                                    "data-primary-contact": data[3].split('|')[3]
								});
							}

							
						});	
					
					})();
					
					
					//show list of invoice of current period
					var showInvoiceHistoryList=function(period){
						$('#tbl_invoice_list tbody').html('<tr><td colspan="8" align="center"><img src="assets/img/ajax-loader-sm.gif"></td></tr>');

						$.getJSON('SalesInvoiceController/ActionGetInvoiceHistory',period, function(response){
							tbl_invoice_list.clear().draw(); //make sure invoice datatable has no rows

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
                            alert(xhr.responseText);
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
				
				
				    var highlightRow=function(row){
                        $(row).siblings()
                            .removeClass('active')
                            .find('td:eq(0) input[type="checkbox"]')
                            .prop('checked',false); //remove highlights of other rows

                        $(row).attr('class','active')
                            .find('td:eq(0) input[type="checkbox"]')
                            .prop('checked',true); //highlight the row that fires the event
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

		var tableCartModule=(function(){
					var tbl_item_cart;
					
					var bindEventHandlers=(function(){
					
							//update data cached everytime changes is done on datatable td DOM, to make it safe it updates everytime td lost focus
							$('#tbl_item_cart > tbody').on('blur','td',function(){
                                var row=$(this).closest('tr');

								updateCachedData(this);	//update cached data even if "Enter" key is not pressed
								setLineTotal( row , getLineTotal( row ) ); //update line total amount
                                reComputeFooterDetails();
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
                                    var row=$(this).closest('tr');

                                    updateCachedData(this); //update cached data
									setLineTotal(  row , getLineTotal(row)  ); //compute line total

                                    reComputeFooterDetails();
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
                                            "data-product-id":_item[0],
                                            "data-unit-id": _item[2]
                                        });

										$(row).find('td').eq(2).attr({
											"align":"right",
											"contenteditable":"true"
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
                        updateCachedData(row.find('td').eq(4)); //update also the line total in cached data
					};

                    //set all cart footer info, total invoice, total discount, percent discount
                    var reComputeFooterDetails=function(){
                        var _totalDiscount=0, _totalInvoice= 0, _totalUndiscounted=0;

                        tbl_item_cart.rows().eq(0).each(function(index){
                            var row = tbl_item_cart.row(index);
                            var data = row.data();
                            _totalDiscount+=parseFloat(accounting.unformat(data[2]));
                            _totalInvoice+=parseFloat(accounting.unformat(data[4]));
                            _totalUndiscounted+=parseFloat(accounting.unformat(data[3]))*parseFloat(accounting.unformat(data[0]))
                        });

                        //alert(_totalDiscount);
                        $('#cell_total_discount').html('<strong class="">'+accounting.formatNumber(_totalDiscount,2)+'</strong>');
                        $('#cell_total_invoice').html('<strong class="">'+accounting.formatNumber(_totalUndiscounted,2)+'</strong>');

                        //compute total percentage

                        var _percentDisc=(_totalDiscount/_totalUndiscounted)*100;
                        $('#cell_discount_percent').html('<strong class="">'+accounting.formatNumber(_percentDisc)+'%</strong>');
                        $('#cell_net_amount').html('<h3 style="color:red;">'+accounting.formatNumber(_totalInvoice,2)+'</h3>');

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
						
						removeRows: removeRows,
                        reComputeFooterDetails: reComputeFooterDetails
							
						
					
					};
					
		})();
/**********************************************************************************************************************************************************/

		//all typehead modules
		var typeHeadModule=(function(){
				var typeHeadPLU;
				
				var initializeTypHead=(function(){
							var $input = $('#plu_typehead');
							//get product list
							$.get('SalesInvoiceController/ActionGetProductList', function(response){	
								//initialize typehead after data request is completed
							typeHeadPLU=$input.typeahead({ 
									source:response,
									updater: function(data) {									;
										
										tableCartModule.addRow([
											"1",
											data.id+"|"+data.description+" [ "+data.unit_name+" ]|"+data.unit_id,
											accounting.formatNumber(data.discount,2),
											accounting.formatNumber(data.srp),
											accounting.formatNumber(data.srp,2),
											""
										]);
                                        tableCartModule.reComputeFooterDetails();

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
		
		var modalInvoiceInfoModule=(function(){
				var _mode;		var _selectedID;	 var _selectedRow;		
				
				//binds all events of invoice modal
				var bindEventHandlers=(function(){
							
							/**
							* fires everytime the record invoice button on modal is clicked
							**/
							$('#btn_create_invoice').click(function(){
									
									if(validateRequiredFields()){ //if true, all required fields are supplied
									
											if(_mode=="new"){ //if current mode is new			

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
															tableInvoiceModule.addRow(data); //add the info of recent invoice
															tableInvoiceModule.lastPage(); //go to last page
				
															tableCartModule.removeRows(); //remove all rows of cart datatable
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
															tableInvoiceModule.updateRow(_selectedRow,data);
				
															tableCartModule.removeRows(); //remove all rows of cart datatable
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
								
								var rowCount = tableCartModule.getInstance().rows()[0].length;
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
					
						var _cartTable=tableCartModule.getInstance(); //intance of datatable					
						var serialData=$('#frm_details_top,#frm_details_bottom').serializeArray();
						
						_cartTable.rows().eq(0).each(function(index){
							var row = _cartTable.row(index);				 
							var data = row.data();
							
							serialData.push(
								{name:"qty[]",value:accounting.unformat(data[0])},
								{name:"prodid[]",value:data[1].split('|')[0]},
								{name:"discount[]",value:accounting.unformat(data[2])},
								{name:"unitprice[]",value:accounting.unformat(data[3])},
								{name:"linetotal[]",value:accounting.unformat(data[4])},
                                {name:"unitid[]",value:data[1].split('|')[2]}
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
						var _cartTable=tableCartModule.getInstance(); //intance of datatable					
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
								{name:"linetotal[]",value:accounting.unformat(data[4])},
                                {name:"unitid[]",value:data[1].split('|')[2]}
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
                    $('#txn_date').val(data.txn_date);
					$('#txt_bill_address').val(data.bill_address);
					$('#txt_ship_address').val(data.ship_address);
					$('#txt_remarks').val(data.remarks);
					
					
					//set invoice cart items
					$('#tbl_item_cart tbody').html('<tr><td colspan="6" align="center"><img src="assets/img/ajax-loader-sm.gif" /></td></tr>');
					
					$.getJSON('SalesInvoiceController/ActionGetInvoiceCartItems',{id:data.invoice_id}, function(response){	
						//console.log(response);
						tableCartModule.removeRows(); //remove rows
						$.each(response,function(index,data){

							tableCartModule.addRow([
										accounting.formatNumber(data.item_qty),
										data.item,
										accounting.formatNumber(data.item_discount,2),
										accounting.formatNumber(data.item_unit_price,2),
										accounting.formatNumber(data.item_line_total,2),
										""
							]);

                            tableCartModule.reComputeFooterDetails();//recompute details
							
						});
						//tableCartModule.addRow(["1",data.id+"|"+data.description,data.discount,data.srp,data.srp,""]);
						
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

        var modalPeriodModule=(function(){

            var bindEventHandlers=(function(){

                    //initialize period modal
                    $('#period_modal input').daterangepicker({
                        singleDatePicker: true,
                        calender_style: "picker_4"
                    }, function (start, end, label) {
                        console.log(start.toISOString(), end.toISOString(), label);
                    });


                    $('#btn_period').click(function(){
                        tableInvoiceModule.showInvoiceHistoryList({
                            "start":    $('#period_modal input[name="start"]').val(),
                            "end":      $('#period_modal input[name="end"]').val()
                        });

                        hideModal();
                    });


            })();

            var showModal=function(){
                $('#period_modal').modal('show');
            };

            var hideModal=function(){
                $('#period_modal').modal('hide');
            };

            return {
                showModal : showModal
            };

        })();

/**********************************************************************************************************************************************************/

        var tabInvoiceOtherInfoModule=(function(){

            var bindEventHandlers=(function(){

                $('#tab_invoice_heading a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var target = $(e.target).attr("href") // activated tab
                    $(target).find('textarea').first().focus();
                });

            })();

        })();


        var documentInvoiceInfoModule=(function(){

            var writeContent=function(obj){
                var details='<h4>Invoice No.</h4>'+
                '<h4 class="text-navy">'+obj.invoice_no+'</h4>'+
                '<span>To:</span>'+
                '<address>'+
                '<strong>'+obj.customer_name+'</strong><br>'+
                obj.billing_address+'<br>'+
                obj.email+'<br>'+
                '<abbr title="Phone">P:</abbr> '+obj.primary_contact+
                '</address>'+
                '<p>'+
                '<span><strong>Invoice Date:</strong> '+obj.invoice_date+'</span><br/>'+
                '<span><strong>Due Date:</strong> '+obj.due_date+'</span>'+
                '</p>';

                $('#tbl_doc_invoice_details > tbody').html('<tr><td colspan="5"><center><img src="assets/img/ajax-loader-sm.gif"></center></td></tr>');
                    $.getJSON('SalesInvoiceController/ActionGetInvoiceCartItems',{"id":obj.invoice_id}, function(response){

                        $('a[href="#tab-2"]').find('span').html(''); //clear loading image on tab caption
                        $('#tbl_doc_invoice_details > tbody').html(''); //clear loading image on table

                        var _rowItems='';
                        $.each(response,function(index,value){
                            _rowItems+='<tr>'+
                            '<td><div><strong>'+value.item.split('|')[1]+'</strong></div>'+
                            '<small>One of the fastest CPU in the market right now.</small></td>'+
                            '<td>10 pcs</td>'+
                            '<td>$26.00</td>'+
                            '<td>$5.98</td>'+
                            '<td>$31,98</td>'+
                            '</tr>';
                        });

                        $('#tbl_doc_invoice_details > tbody').html(_rowItems);

                    }).fail(function(xhr){
                        alert(xhr.responseText);
                    });


                $('#span_invoice_details').html(details);
            };


            return {
                writeContent : writeContent
            };

        })();

/**********************************************************************************************************************************************************/

        $('#txt_due_date').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });



		tableInvoiceModule.showInvoiceHistoryList({
            "start" :   period.thisDay().start(),
            "end"   :   period.thisDay().end()
        });

		
		
		
				
/**********************************************************************************************************************************************************/
		
		//new invoice	
		$('#btn_new_invoice').click(function(){
			modalInvoiceInfoModule.setMode("new");
			tableCartModule.removeRows(); //remove all rows of cart datatable
			modalInvoiceInfoModule.clearFields(); //clear fields
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
			
			
			tableInvoiceModule.createToolBarButton(_btnRefresh+_btnActive+_btnInactive+_btnTrash);
			
			
			var _btnApplyGlobalDiscount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Apply Global Discount"><i class="fa fa-refresh"></i> Apply Global Discount</button>';
			var _btnIncreaseCount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Add Qty"><i class="fa fa-plus"></i> Increase <b><u>Q</u></b>ty</button>';
			var _btnDecreaseCount='<button style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Subtract Qty"><i class="fa fa-minus"></i> Descrease <b><u>Q</u></b>ty</button>';
			$("div.tools").html(_btnIncreaseCount+_btnDecreaseCount+_btnApplyGlobalDiscount);
			
				
});





