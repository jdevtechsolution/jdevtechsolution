/**
 * Created by CHRISRUEDA on 11/23/2015.
 */

$(document).ready(function(){


    /**
     * List of Item Modules, initialization of Datatable and its listener
     */
    var itemListModule=(function(){
        var tbl_item_list;

        var binEventHandlers=(function(){

            //fires when create new item button on each row is clicked
            $('#tab-1').on('click','button[name="create_new_item"]',function(){
                itemInfoModalModule.showModal();
            });

            $('#tbl_item_list > tbody').on('click','tr',function(){
                $(this).siblings()
                    .removeClass('active')
                    .find('td:eq(0) input[type="checkbox"]')
                    .prop('checked',false); //remove highlights of other rows

                $(this).attr('class','active')
                    .find('td:eq(0) input[type="checkbox"]')
                    .prop('checked',true); //highlight the row that fires the event

                $('a[href="tab-2"]').find('strong').html( " [ "+$(this).find('td').eq(2).text()+" ] " );

            });

        })();

        /**
         * initialization of Item List Datatable
         */
        var initializeItemList=(function(){
            tbl_item_list=$('#tbl_item_list').DataTable({
                "bLengthChange":true,
                "order": [[ 0, "desc" ]],
                "bPaginate":true,
                "dom": '<"toolbar">frtip',
                "oLanguage": {
                    "sSearch": "Search: ",
                    "sProcessing": "Please wait..."
                },
                "columnDefs": [
                    {//column 1
                        'bSortable': false,
                        'targets': [0],
                        'render': function(data, type, full, meta){
                            return '<center><input type="checkbox"></center>';
                        }
                    },
                    {//column 6
                        'bSortable': false,
                        'targets': [5],
                        'render': function(data, type, full, meta){
                            var btn_edit='<button name="edit_invoice" class="btn btn-default btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
                            var btn_trash='<button name="remove_invoice" class="btn btn-default btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';

                            return '<center>'+btn_edit+btn_trash+'</center>';
                        }
                    }
                ]

            });
        })(); //end of item datatable initialization


        //create button "create new item"
        var createToolBar=(function(){
            var _btnCreateNewItem='<button name="create_new_item" style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Item"><i class="fa fa-cubes"></i> Create New Item</button>';
            $("div.toolbar").html(_btnCreateNewItem);
        })();


    })();



    /**
     * List of Item History, initialization of Datatable and its listener
     */
    var itemHistoryListModule=(function(){
        var tbl_item_history;

        var bindEventHandlers=(function(){

        })();

        var initializeItemHistoryList=(function(){
            tbl_item_history=$('#tbl_item_history').DataTable({
                "order": [[ 0, "desc" ]],
                "bPaginate": true,
                "dom": '<"period">frtip',
                "oLanguage": {
                    "sSearch": "Search: ",
                    "sProcessing": "Please wait..."
                }

            });
        })();

        var createToolBar=(function(){
            var _cboPeriod='<select class="form-control" style="width:200px;">'+
                '<option>This Day</option>'+
                '<option>This Month</option>'+
                '<option>This Year</option>'+
                '<option>Custom Period</option>'+
                '</select>';

            $('div.period').html(_cboPeriod);
        })();


    })();



    /**
     * item information fields modal
     */
    var itemInfoModalModule=(function(){
        var showInfoModal=function(){
            $('#item_info_modal').modal('show');
        };

        return {
            showModal : showInfoModal
        };
    })();



    /**
     * List of Category, initialization of Datatable and its listener
     */
    var categoryListModule=(function(){
        var tbl_category_list;


        var initializeCategoryList=(function(){
            tbl_category_list=$('#tbl_category_list').DataTable({
                "pageLength":5,
                "bLengthChange":false,
                "order": [[ 0, "desc" ]],
                "dom": '<"new_category">frtip',
                "bPaginate": true,
                "oLanguage": {
                    "sSearch": "Search: ",
                    "sProcessing": "Please wait..."
                },
                "columnDefs": [
                    {//column 1
                        'bSortable': false,
                        'targets': [0],
                        'render': function(data, type, full, meta){
                            return '<center><input type="checkbox"></center>';
                        }
                    },
                    {//column 6
                        'bSortable': false,
                        'targets': [4],
                        'render': function(data, type, full, meta){
                            var btn_edit='<button name="edit_invoice" class="btn btn-default btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
                            var btn_trash='<button name="remove_invoice" class="btn btn-default btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';

                            return '<center>'+btn_edit+btn_trash+'</center>';
                        }
                    }
                ]

            });

        })();

        var createToolBar=(function(){
            var _btnCreateNewCategory='<button name="create_new_category" style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Category"><i class="fa fa-inbox"></i> Create New Category</button>';
            $("div.new_category").html(_btnCreateNewCategory);
        })();


    })();



    var unitListModule=(function(){
        var tbl_unit_list;


        var initializeUnitList=(function(){
            tbl_unit_list=$('#tbl_unit_list').DataTable({
                "pageLength":5,
                "bLengthChange":false,
                "order": [[ 0, "desc" ]],
                "dom": '<"new_unit">frtip',
                "bPaginate": true,
                "oLanguage": {
                    "sSearch": "Search: ",
                    "sProcessing": "Please wait..."
                },
                "columnDefs": [
                    {//column 1
                        'bSortable': false,
                        'targets': [0],
                        'render': function(data, type, full, meta){
                            return '<center><input type="checkbox"></center>';
                        }
                    },
                    {//column 6
                        'bSortable': false,
                        'targets': [4],
                        'render': function(data, type, full, meta){
                            var btn_edit='<button name="edit_invoice" class="btn btn-default btn-sm" style="margin-left:-15px;" data-toggle="tooltip" data-placement="top" title="Adjust Invoice"><i class="fa fa-file-text-o"></i> </button>';
                            var btn_trash='<button name="remove_invoice" class="btn btn-default btn-sm" style="margin-right:-15px;" data-toggle="tooltip" data-placement="top" title="Move to trash"><i class="fa fa-trash-o"></i> </button>';

                            return '<center>'+btn_edit+btn_trash+'</center>';
                        }
                    }
                ]

            });

        })();

        var createToolBar=(function(){
            var _btnCreateNewUnit='<button name="create_new_category" style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Unit"><i class="fa fa-th-large"></i> Create New Unit</button>';
            $("div.new_unit").html(_btnCreateNewUnit);
        })();


    })();




    $("span.pie").peity("pie", {
        fill: ['#1ab394', '#d7d7d7', '#ffffff']
    })


});