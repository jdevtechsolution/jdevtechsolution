var tbl_customer_list;


$(document).ready(function(){
		//initialize customer list
		tbl_customer_list=$('#tbl_invoice_list').DataTable({
					"iDisplayLength":15,
					"bLengthChange":false,
					"order": [[ 0, "desc" ]],
                    "oLanguage": {
                        "sSearch": "Search: ",
						"sProcessing": "Please wait..."
                    },
				"dom": '<"toolbar">frtip',
				"columnDefs": [
							{//column 6
								'bSortable': false,
								'targets': [4],
								'render': function(data, type, full, meta){	
									var btn_create='<button class="btn btn-white btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Edit Customer"><i class="fa fa-pencil"></i> </button>';
									var btn_trash='<button class="btn btn-white btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';
									
									return '<center>'+btn_create+btn_trash+'</center>';
								}
							}//column 6
					]
				
		});	
		
		
		//sparkline graph
		$("#sparkline8").sparkline([2,5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7,5,4,3,4], {
			type: 'bar',
				barWidth: 8,
				height: '80px',
				barColor: '#1ab394',
				negBarColor: '#c6c6c6'
		});


		
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















