var tbl_customer_list;


$(document).ready(function(){



        // call show customer



		//sparkline graph
		$("#sparkline8").sparkline([2,5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7,5,4,3,4], {
			type: 'bar',
				barWidth: 8,
				height: '80px',
				barColor: '#1ab394',
				negBarColor: '#c6c6c6'
		});



    //////////////////////////////////////  CUSTOMER MODAL EVENTS ///////////////////////////////////////////////////////////
        var customerInfoModal =(function(){
            var _mode;		var _selectedID;	 var _selectedRow;


            var bindEventHandler = function ()
            {
               $('btn_create_customer').click(function(){
                   if (cutomermodal_validate_fields())
                   {
                       if (_mode=="new")
                       {
                           CreateCustomer()
                           .success(function(response){
                               console.log(response);
                               PNotify.removeAll(); //remove all notifications
                               new PNotify({
                                   title: 'Success!',
                                   text:  response.msg,
                                   type:  response.stat
                               }); //create new notification base on server response


                               clearFields();

                            })
                           .error(function(xhr,stat,error){ //if error occurs
                               alert(xhr.responseText);
                               console.log(xhr);
                           });

                       } // end new

                       else if (_mode=="edit")
                       {


                       }// end edit

                   }

               });// end button on click

            }();//end bind event handler


            //add new invoice
            var CreateCustomer=function(){

                var serialData=$('#frm-customer').serializeArray();

                return $.ajax({
                    "dataType":"json",
                    "type":"POST",
                    "url":"CustomerManagementController/InsertCustomerInfo",
                    "data":serialData
                });


            }; //end of saveInvoiceInfo

            //field validation
            var cutomermodal_validate_fields = function(){
                var	stat=1;

                // textbox validation
                $('text[required]').each(function(){
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

                //textarea validation
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

            //set mode of modal, are we going to add new or update??
            // "new" for create/"edit" for update
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
            }

            var clearFields=function(){
                $('#frm-customer textarea').val('');
                $('#frm-customer text').val('');
                //$('#frm-customer select').val('').selectpicker('refresh');
            };


            var showModal=function(){
                $('#invoice_modal').modal('show');
            };

            var hideModal=function(){
                $('#invoice_modal').modal('hide');
            };



            //return value of this invoice modal object module
            return {
                setMode: 		setCurrentMode,
                getMode:		getCurrentMode,
                clearFields: 	clearFields,
                showModal: 		showModal,
                hideModal:		hideModal,

                setSelectedID: 	setSelectedID,
                getSelectedID: 	getSelectedID,
                setSelectedRow: setSelectedRow

            }; //end of return value

        })();
        //////////////////////////////////////  END CUSTOMER MODAL EVENTS ///////////////////////////////////////////////////////////

        //////////////////////////////////////  CUSTOMER LIST EVENTS ///////////////////////////////////////////////////////////
        var customer_list = (function () {
            //
            var initializeInvoiceDatatable=(function(){
                tbl_customer_list=$('#tbl_customer_list').DataTable({
                    "bLengthChange":false,
                    "order": [[ 0, "desc" ]],
                    "oLanguage": {
                        "sSearch": "Search: ",
                        "sProcessing": "Please wait..."
                    },
                    "dom": '<"toolbar">frtip',
                    "columnDefs": [
                        {//column 1 customer id
                            'bSortable': false,
                            'targets': [0],
                            'render': function(data, type, full, meta){
                                return '<input type="checkbox" value="'+ data +'" >';
                            }
                        },//column 1 customer id

                        {//column 2 customer name

                            'bSortable': false,
                            'targets': [1],
                            'render': function(data, type, full, meta){
                                return data;
                            }
                        },//column 2 customer name

                        {//column 3 company name

                            'bSortable': false,
                            'targets': [2],
                            'render': function(data, type, full, meta){
                                return data;
                            }
                        },//column 3 company name

                        {//column 3 company name

                            'bSortable': false,
                            'targets': [3],
                            'render': function(data, type, full, meta){
                                return data;
                            }
                        },//column 3 company name

                        {//column 4 action buttons

                            'bSortable': false,
                            'targets': [4],
                            'render': function(data, type, full, meta){
                                var btn_edit='<button name="edit_invoice" class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
                                var btn_trash='<button name="remove_invoice" class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';

                                return '<center>'+btn_edit+btn_trash+'</center>';
                            }
                        }//column 4 action buttons

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
            var showCustomerList=function(){
                $('#tbl_customer_list tbody').html('<tr><td colspan="8" align="center"><img src="assets/img/ajax-loader-sm.gif"></td></tr>');

                $.getJSON('CustomerManagementController/ActionGetCustomerList', function(response){
                    tbl_customer_list.clear().draw(); //make sure invoice datatable has no rows
                    console.log(response);


                    $.each(response,function(index,value){
                        tbl_customer_list.row.add([
                            value.customer_id,
                            value.customer,
                            value.company,
                            value.balance
                        ]).draw();
                    });

                }).fail(function(xhr){
                    alert  (xhr.responseText);
                });
            }();

            var lastPage=function(){
                $('#tbl_customer_list_paginate ul li:nth-last-child(2) a').click(); //trigger 2nd to the last link, the last page number
            };


            var addRow=function(data){
                tbl_customer_list
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
                return tbl_customer_list;
            };


            //update row
            var updateRow=function(row,data){
                tbl_customer_list
                    .row(row)
                    .data(data)
                    .draw();
            };

            return {
                getTableInstance : 		getTableInstance,
                createToolBarButton: 	createToolBarButton,
                showInvoiceHistoryList: showCustomerList,
                addRow: 				addRow,
                updateRow:				updateRow,
                lastPage: 				lastPage
            };

        })();
		
		//write toolbar on datatable
		var _btnRefresh='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Customer" onclick="fnShowCustomerModal()"><i class="fa fa-users"></i> Create New Customer</button>';
        var _btnActive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Active"><i class="fa fa-check-circle"></i> </button>';
        var _btnInactive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Inactive"><i class="fa fa-times-circle"></i> </button>';
        var _btnTrash='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
			
		$("div.toolbar").html(_btnRefresh+_btnActive+_btnInactive+_btnTrash);


    });

function fnShowCustomerModal(){
	$('#customer_modal').modal('show');
}















