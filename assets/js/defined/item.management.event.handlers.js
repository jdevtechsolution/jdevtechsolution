/**
 * Created by CHRISRUEDA on 11/23/2015.
 */

$(document).ready(function(){


    /**
     * List of Item Modules, initialization of Datatable and its listeners
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
     * List of Item History, initialization of Datatable and its listeners
     */
    var itemHistoryListModule=(function(){
        var tbl_item_history;

        var bindEventHandlers=(function(){

            //fires everytime the select period has change
            $('#tab-2').on('change','select[name="period"]',function(){
                var period;
                if($(this).val()==1){ //this day
                    period={
                        "start" : period.thisDay().start(),
                        "end" : period.thisDay().end()
                    };
                }

                if($(this).val()==2){ //this month
                    date_period={
                        "start" : period.thisMonth().start(),
                        "end" : period.thisMonth().end()
                    };
                }

                if($(this).val()==3){ //this year
                    date_period={
                        "start" : period.thisYear().start(),
                        "end" : period.thisYear().end()
                    };
                }

                if($(this).val()==4){
                    periodInfoModalModule.showModal();
                }

                showHistoryList(date_period);

            });

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
            var _cboPeriod='<select id="cbo-period" name="period" class="form-control" style="width:200px;">'+
                '<option value="1">This Day</option>'+
                '<option value="2">This Month</option>'+
                '<option value="3">This Year</option>'+
                '<option value="4">Custom Period</option>'+
                '</select>';


            $('div.period').html(_cboPeriod);
        })();

        var showHistoryList=(function(date_period){

            alert(date_period.start);
            alert(date_period.end);

        });


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
     * List of Category, initialization of Datatable and its listeners
     */
    var categoryListModule=(function(){
        var tbl_category_list;

        var bindEventHandlers=(function(){

                $('#collapseOne').on('click','button[name="create_new_category"]',function(){
                    categoryInfoModalModule.showModal();
                });




        })();


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


    /**
     * List of Unit, initialization of Datatable and its listeners
     */
    var unitListModule=(function(){
        var tbl_unit_list;

        var bindEventHandlers=(function(){
                $('#collapseTwo').on('click','button[name="create_new_unit"]',function(){
                    unitInfoModalModule.showModal();
                });
        })();

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
            var _btnCreateNewUnit='<button name="create_new_unit" style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Unit"><i class="fa fa-th-large"></i> Create New Unit</button>';
            $("div.new_unit").html(_btnCreateNewUnit);
        })();


    })();


    /**
     * category information fields modal
     */
    var categoryInfoModalModule=(function(){

        //fires everytime the category modal is shown
        var bindEventHandlers=(function(){
            $('#category_info_modal').on('shown.bs.modal', function() {
                $('.form-control',this).first().focus();
            });
        })();


        var showModal=function(){
            $('#category_info_modal').modal('show');
        };

        return {
            showModal : showModal
        };

    })();


    /**
     * unit information fields modal
     */
    var unitInfoModalModule=(function(){

        //fires everytime the unit modal is shown
        var bindEventHandlers=(function(){
            $('#unit_info_modal').on('shown.bs.modal', function() {
                $('.form-control',this).first().focus();
            });
        })();


        var showModal=function(){
            $('#unit_info_modal').modal('show');
        };

        return {
            showModal : showModal
        };

    })();


    /**
     * period start to end info modal
     */
    var periodInfoModalModule=(function(){

        var bindEventHandlers=(function(){
            $('#period_modal input').daterangepicker({
                singleDatePicker: true,
                calender_style: "picker_4"
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
        })();

        var showModal=function(){
            $('#period_modal').modal('show');
        };

        return {
            showModal : showModal
        };

    })();






    $("span.pie").peity("pie", {
        fill: ['#1ab394', '#d7d7d7', '#ffffff']
    })




});