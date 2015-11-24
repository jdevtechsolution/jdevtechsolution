/**
 * Created by CHRISRUEDA on 11/23/2015.
 */

$(document).ready(function(){

    /**
     * List of Item Modules, iniatialization of Datatables
     */
    var itemListModule=(function(){
        var tbl_item_list;

        var binEventHandlers=(function(){

            $('#tab-1').on('click','button[name="create_new_item"]',function(){
                itemInfoModalModule.showModal();
            });

        })();

        /**
         * initialization of Item List Datatable
         */
        var initializeItemList=(function(){
            tbl_item_list=$('#tbl_item_list').DataTable({
                "bLengthChange":true,
                "order": [[ 0, "desc" ]],
                "bPaginate":false,
                "dom": '<"toolbar">frtip',
                "oLanguage": {
                    "sSearch": "Search: ",
                    "sProcessing": "Please wait..."
                }
            });
        })(); //end of item datatable initialization


        //create button "create new item"
        var createToolBar=(function(){
            var _btnCreateNewItem='<button name="create_new_item" style="margin-right:3px;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Create New Item"><i class="fa fa-cubes"></i> Create New Item</button>';
            $("div.toolbar").html(_btnCreateNewItem);
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



});