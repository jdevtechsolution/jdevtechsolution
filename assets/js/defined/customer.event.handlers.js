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

        var customer_cofirm_modal=(function(){ //start confirm modal
            var _selectedRow; var _selectedID;
            var bindEventHandler = function() //start event handler
            {
                $('#btn_delete_customer').click(function(){
                    deleteCustomer()
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
                            console.log(response.id);
                            customer_list.removeRow(_selectedRow);
                        })
                        .error(function(xhr,stat,error){ //if error occurs
                            alert(xhr.responseText);
                            console.log(xhr);
                        });
                });

            }(); //end event handler

            var showModal=function(){
                $('#confirm_modal').modal('show');
            };

            var hideModal=function(){
                $('#confirm_modal').modal('hide');
            };

            var setMessage = function(customer_name){
                $('#confirm_modal .modal-body').html('<p> Are you sure you want to deleted ? [' + customer_name  + ']</p>');
            };

            var setSelectedRow=function(row){
                _selectedRow=row;
            };

            //get selected row, the tr element
            var getSelectedRow=-function(){
                return _selectedRow;
            };

            //set selected id
            var setSelectedID=function(id){
                _selectedID=id;
            };

            var getSelectedID=function(){
                return _selectedID;
            };

            var deleteCustomer=function(){
                //alert(_selectedID);
                return $.ajax({
                    "dataType":"json",
                    "type":"POST",
                    "url":"CustomerManagementController/DeleteCustomerInfo?customer_id=14"
                    //"data":{name:"customer_id",value: _selectedID}
                });

            };

            return {
                showModal: 		showModal,
                hideModal:		hideModal,
                setMessage:		setMessage,
                setSelectedRow: setSelectedRow,
                getSelectedRow: getSelectedRow,
                setSelectedID: setSelectedID,
                getSelectedID: getSelectedID

            }; //end of return value
        })();//end confirm modal

    //////////////////////////////////////  CUSTOMER MODAL EVENTS ///////////////////////////////////////////////////////////
        var customerInfoModal =(function(){
            var _mode;		var _selectedID;	 var _selectedRow;


            var bindEventHandler = function ()
            {
               $('#btn_create_customer').click(function(){
                   if (customermodal_validate_fields())
                   {
                       if (_mode=="new")
                       {
                           createCustomer()
                           .success(function(response){

                               console.log(response);
                               PNotify.removeAll(); //remove all notifications
                               new PNotify({
                                   title: 'Success!',
                                   text:  response.msg,
                                   type:  response.stat
                               }); //create new notification base on server response


                               var row=response.row[0];
                               var data=[row.cust_info,row.customer,row.company,0,""];

                               customer_list.addRow(data); //add the info of recent invoice
                               customer_list.lastPage(); //go to last page
                               customerInfoModal.clearFields();

                            })
                           .error(function(xhr,stat,error){ //if error occurs
                               alert(xhr.responseText);
                               console.log(xhr);

                           });

                       } // end new

                       else if (_mode=="edit")
                       {
                           updateCustomer()
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
                                   var data=[row.cust_info,row.customer,row.company,row.balance,""];
                                   customer_list.updateRow(_selectedRow,data);
                                   clearFields(); //clear fields
                               })
                               .error(function(xhr,stat,error){ //if error occurs
                                   alert(xhr.responseText);
                                   console.log(xhr);
                               });

                       }// end edit

                   }

               });// end button on click

            }();//end bind event handler


            //add new invoice
            var createCustomer=function(){

                var serialData=$('#frm-customer').serializeArray();

                return $.ajax({
                    "dataType":"json",
                    "type":"POST",
                    "url":"CustomerManagementController/InsertCustomerInfo",
                    "data":serialData
                });


            }; //end of saveInvoiceInfo


            var updateCustomer=function(){
                var serialData=$('#frm-customer').serializeArray();

                serialData.push({
                    name:"customer_id",value: _selectedID
                });

                console.log(serialData);

                return $.ajax({
                    "dataType":"json",
                    "type":"POST",
                    "url":"CustomerManagementController/DeleteCustomerInfo",
                    "data":serialData
                });

            };

            //field validation
            var customermodal_validate_fields = function(){
                var	stat=1;

                // textbox validation
                $('input[required]').each(function(){
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

                return stat; //this will always be executed and return current state
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
            };

            var clearFields=function(){
                //$('#frm-customer input').val('');
                //$('#frm-customer textarea').val('');
                $('#frm-customer').trigger("reset");
                //$('#frm-customer select').val('').selectpicker('refresh');
            };


            var showModal=function(){
                $('#customer_modal').modal('show');
            };

            var hideModal=function(){
                $('#customer_modal').modal('hide');
            };


            //set invoice modal details
            var setCustomerModalDetails=function(data){

                $('#customer_id').val(data.customer_id)
                $('#lname').val(data.lname);
                $('#fname').val(data.fname);
                $('#mname').val(data.mname);
                $('#company').val(data.company);
                $('#balance').val(data.balance);
                $('#address').val(data.address);
                $('#billing_address').val(data.billing_address);
                $('#pri_contact').val(data.pri_contact);
                $('#sec_contact').val(data.sec_contact);
                $('#email').val(data.email);
            };



            //return value of this invoice modal object module
            return {
                setMode: 		setCurrentMode,
                getMode:		getCurrentMode,
                clearFields: 	clearFields,
                showModal: 		showModal,
                hideModal:		hideModal,
                setDetails:     setCustomerModalDetails,
                setSelectedID: 	setSelectedID,
                getSelectedID: 	getSelectedID,
                setSelectedRow: setSelectedRow,
                getSelectedRow: getSelectedRow

            }; //end of return value

        })();
//////////////////////////////////////  END CUSTOMER MODAL EVENTS ///////////////////////////////////////////////////////////



//////////////////////////////////////  CUSTOMER LIST EVENTS ///////////////////////////////////////////////////////////
        var customer_list = (function () {
            //
            var tbl_customer_list;


            var bindEventHandlers=(function(){
                /**
                 *
                 *	fires when edit invoice button on selected row is clicked
                 *
                 */
                $('#tbl_customer_list > tbody').on('click','button[name="edit_customer"]',function(){
                    var row=$(this).closest('tr');

                    customerInfoModal.setMode("edit"); //set mode to editing
                    customerInfoModal.setSelectedID(row.find('td:eq(0) input[type="checkbox"]').val()); //what is the id of the invoice we are going to update
                    customerInfoModal.setSelectedRow(row); //remember the row we are going to update

                    //alert(row.find('td').eq(2).text());

                    //object details of modal
                    customerInfoModal.setDetails({
                            "customer_id"	        :		row.find('td:eq(0) input[type="checkbox"]').val(),
                            "customer"	            :		row.find('td').eq(1).text(),
                            "company"		        :		row.find('td').eq(2).text(),
                            "balance"	            :		row.find('td').eq(3).text(),
                            "lname"                 :       row.find('td:eq(0) input[type="checkbox"]').attr('data-lname'),
                            "fname"                 :       row.find('td:eq(0) input[type="checkbox"]').attr('data-fname'),
                            "mname"                 :       row.find('td:eq(0) input[type="checkbox"]').attr('data-mname'),
                            "address"               :       row.find('td:eq(0) input[type="checkbox"]').attr('data-address'),
                            "billing_address"       :       row.find('td:eq(0) input[type="checkbox"]').attr('data-billing-address'),
                            "pri_contact"           :       row.find('td:eq(0) input[type="checkbox"]').attr('data-pri-contact'),
                            "sec_contact"           :       row.find('td:eq(0) input[type="checkbox"]').attr('data-sec-contact'),
                            "email"                 :       row.find('td:eq(0) input[type="checkbox"]').attr('data-email')
                    });

                    //show invoice info modal
                    customerInfoModal.showModal();

                });

                $('#tbl_customer_list > tbody').on('click','button[name="remove_customer"]',function(){
                    var row=$(this).closest('tr');
                    console.log(row);
                    console.log(row.find('td:eq(0) input[type="checkbox"]').val());
                    customer_cofirm_modal.setMessage(row.find('td').eq(1).text());
                    customer_cofirm_modal.setSelectedID(row.find('td:eq(0) input[type="checkbox"]').val()); //what is the id of the invoice we are going to update
                    customer_cofirm_modal.setSelectedRow(row);
                    //alert(customer_cofirm_modal.getSelectedID);
                    customer_cofirm_modal.showModal();

                });

                $('#tab-1').on('click','button[name="new-customer"]',function(){
                    customerInfoModal.clearFields();
                    customerInfoModal.setMode("new");
                    customerInfoModal.showModal();

                });

            })();


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
                                //alert(data);
                                var _arrData = data.split('|');

                                return '<input type="checkbox" value="'+ _arrData[0] +'" data-lname ="' + _arrData[1] + '" data-fname ="' + _arrData[2] + '" ' +
                                        'data-mname ="' + _arrData[3] + '" data-address = "' + _arrData[4] +'" data-billing-address = "' + _arrData[5] + '" ' +
                                        'data-pri-contact = "' + _arrData[6] + '" data-sec-contact = "' + _arrData[7] + '" data-email = "' + _arrData[8] + '" >';
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

                        {//column 3 balance

                            'bSortable': false,
                            'targets': [3],
                            'render': function(data, type, full, meta){
                                return data;
                            }
                        },//column 3 balance

                        {//column 4 action buttons

                            'bSortable': false,
                            'targets': [4],
                            'render': function(data, type, full, meta){
                                var btn_edit='<button name="edit_customer" class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
                                var btn_trash='<button name="remove_customer" class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';

                                return '<center>'+btn_edit+btn_trash+'</center>';
                            }
                        }//column 4 action buttons

                    ]
                    //,
                    //"rowCallback":function( row, data, index ){
                    //
                    //    //$(row).find('td').eq(5).attr({
                    //    //    "align":"right"
                    //    //});
                    //    //
                    //    //$(row).find('td').eq(3).attr({
                    //    //    "data-customer-id": data[3].split('|')[0]
                    //    //});
                    //
                    //}


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
                            value.cust_info,
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

            //create toolbar buttons
            var createToolBarButton=function(_buttons){
                $("div.toolbar").html(_buttons);
            };


            //get the invoice table object instance
            var getTableInstance=function(){
                return tbl_customer_list;
            };

            //add row
            var addRow=function(data){
                tbl_customer_list
                    .row
                    .add(data)
                    .draw();
            };

            //update row
            var updateRow=function(row,data){
                tbl_customer_list
                    .row(row)
                    .data(data)
                    .draw();
            };

            //remove row
            var removeRow=function(row){
                tbl_customer_list
                    .row(row).remove()
                    .draw();
            };

            return {
                getTableInstance : 		getTableInstance,
                createToolBarButton: 	createToolBarButton,
                showInvoiceHistoryList: showCustomerList,
                addRow: 				addRow,
                updateRow:				updateRow,
                lastPage: 				lastPage,
                removeRow:              removeRow
            };

        })();



		//write toolbar on datatable
		var _btnNew='<button name="new-customer" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Customer" ><i class="fa fa-users"></i> Create New Customer</button>';
        var _btnActive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Active"><i class="fa fa-check-circle"></i> </button>';
        var _btnInactive='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as Inactive"><i class="fa fa-times-circle"></i> </button>';
        var _btnTrash='<button class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
			
		$("div.toolbar").html(_btnNew +_btnActive+_btnInactive+_btnTrash);


    });

function fnShowCustomerModal(){
	$('#customer_modal').modal('show');
}















