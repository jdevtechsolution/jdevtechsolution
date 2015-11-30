/**
 * Created by CHRISRUEDA on 11/26/2015.
 */
var period=(function(){
    var fullDate=new Date();

    return {

        getDate: function(){
            return fullDate.getDate();
        },

        getMonth : function(){
            var _month ="0"+(fullDate.getMonth()+1).toString(); //always concatinate "0" to the left side
            return  _month.slice(-2);
        },

        getYear : function(){
            return fullDate.getFullYear();
        },

        thisDay : function(){
            return {
                start : function (){
                    return period.getMonth()+"/"+period.getDate()+"/"+period.getYear();
                },
                end : function(){
                    return period.getMonth()+"/"+period.getDate()+"/"+period.getYear();
                }
            };
        },

        thisMonth : function(){
            return {
                start : function (){
                    return period.getMonth()+"/01/"+period.getYear();
                },
                end : function(){
                    var _lastFullDate = new Date(period.getYear(), fullDate.getMonth() + 1, 0);
                    var _month ="0"+ (_lastFullDate.getMonth()+1).toString();
                    var _date=_lastFullDate.getDate();

                    return   _month.slice(-2)+"/"+_date+"/"+_lastFullDate.getFullYear();
                }
            };
        },

        thisYear :  function(){
            return {
                start : function (){
                    return "01/01/"+period.getYear();
                },
                end : function(){
                    return "12/31/"+period.getYear();
                }
            };
        }

    };

})();
