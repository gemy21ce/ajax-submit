
/**************************************** Ajax Submit 1.0 ****************************************
 * a javascript lib scans page forms, you can give the form you want to submit with ajax a   	 *
 * class named "ajax-submit" and then the lib will scan the form fields and submit construct the *
 * form request method that you've wrote in the form attributes, and the action also wrote in    *
 * form attribute.                                                                               *
 *                                                                                               *
 *           ---------------------------------------------------------------------               *
 * -the main function to submit the action called "submitForm".                                  *
 * -other functions that's really very helpful the "jalert" function that shows the alert in     *
 * fancy way, and you can restyle the overlay color and opacity, restyle the button color.       *
 * - other function called "jconfirm" that shows the confirm box, just like the jalert box with  *
 * one more extra button to cancel the action, two functions is attached to this box, one for    *
 * confirm action and one for the cancel action, as you can leave the cancel action blanck if    *
 * want, otherwise you may fetch function action to the cancel.                                  *
 * -"jloading" another function that shows only the loading overlay with a label in head of the  *
 * page, you can path the text as a parameter to the function so you can localize it.            *
 * - one last function "jHide" a function that hides all boxes and all overlays.                 *
 *                                                                                               *
 *                                                                                               *
 * v 2.0: creating the oop style for this lib.                                                   *
 *-----------------------------------------------------------------------------------------------*
 *                                                                                               *
 *                                                                                               *
 * note: the overlay, popup and all lib divs are created in the page once you call any of the    *
 * functions, and doesn't conflict with the page ids or classes as it creates it's own elements. *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 * requires: jQuery http://jquery.com/                                                           *
 * it's recommended to use jquery validator plugin. http://docs.jquery.com/Plugins/Validation    *
 * or you may use the cdn for both of them from here:                                            *
 * http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js                               *
 * http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js                     *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 *                                                                                               *
 *                                 Copyright Gamal Shaban 2012.                                  *
 *                                     gemy21ce@gmail.com                                        *
 *                                                                                               *
 *                                                                                               *
 *************************************************************************************************/
 
/**
 * JUI
 *
 */
var JUI = function (options){
    //obtions for setting the css for the overlay, the popup, buttons and the loading label.
    var settings = {
        //overlay options
        overlay:{
            class_name:null,
            style:null,
            background_color:null,
            opacity:null,
            zindex:null
        },
        //label options
        label:{
            class_name:null,
            style:null,
            background_color:null
        },
        popup:{
            class_name:null,
            style:null,
            background_color:null
        },
        buttons:{
            class_name:null,
            style:null,
            backgroun_color:null
        }
    }

    //validator variable for handling the validate properties.
    var validator;
    /**
     * scans the html forms
     */
    var executeAfterJqueryLoad = function(){
        //extend options with settings.
        $.extend(settings,options);
        //scanning page forms
        $(function(){
            $('form.ajax-submit').each(function(){
                $(this).submit(function(){
                    if($(this).valid()){
                        jui.submitForm(this);
                    }
                    return false;
                });
            });
            //validate the form
            $('form.validate').each(function(){
                validator = $(this).validate();
            });
        });
    };
    //check for jquery and scan the page forms.
    if(typeof jQuery == 'undefined'){
        var scripts = document.getElementsByTagName('script')[0];
        var jquery = document.createElement("script");
        jquery.setAttribute("type", "text/javascript");
        jquery.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
        scripts.parentNode.insertBefore(jquery, scripts);
        var validates = document.createElement("script");
        validates.setAttribute("type", "text/javascript");
        validates.setAttribute("src", "http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js");
        scripts.parentNode.insertBefore(validates, scripts);
        window.setTimeout(function(){
            executeAfterJqueryLoad();
        },1000);
    }else{
        executeAfterJqueryLoad();
    }
    //generating a random number to fitch to the elements id.
    var versionId= Math.floor(Math.random() * 100000000000);
	
    //generating elements id.
    var jconfirmedId = 'jconfirmed_'+versionId,jdelete_popupId='jdelete_popup_'+versionId,
    joverlayId= 'joverlay_'+versionId,jmessageId='jmessage_delete_'+versionId,
    jcancelId='jcancel_'+versionId,jloading_overlayId='jloading_overlay_'+versionId;

    /**
     * that function to use internally to build the html elements.
     * @param loadingMessage: the message of the loading in jloading function.
     * @param cancelLabel: the label of the cancel button to use in jconfirm.
     * @param OkLabel: the label of the ok button in jalert and jconfirm.
     * @param addCancel: a boolean to check if it should show the cancel button or not, so it'll be available in jconfrim.
     */
    var buildHTML = function(loadingMessage,cancelLabel,OkLabel,addCancel){
        //old elements for overlay and old boxes if exist.
        //to avoid duplicating the elements ids, so you should check in every function that uses the html elements before calling this function.
        $("div#"+joverlayId).remove().next("div#"+jdelete_popupId).remove();
        //creating the overlay div.
        var joverlay =document.createElement("div");
        joverlay.setAttribute("id",joverlayId);
        //styling the div.
        //checking for settings object for overlay object overlay: {class_name:null,style:null,background_color:null,opacity:null,zindex:null}
        if(settings.overlay.class_name != null){
            joverlay.setAttribute("class",settings.overlay.class_name);
        }else if(settings.overlay.style != null){
            joverlay.setAttribute("style", settings.overlay.style);
        }else if(settings.overlay.background_color != null && settings.overlay.opacity != null && settings.overlay.zindex != null){
            joverlay.setAttribute("style", "background-color: "+settings.overlay.background_color+";left: 0;position: fixed;top: 0;z-index: "+settings.overlay.zindex+";width:100%;height:100%;filter:alpha(opacity=70);opacity:"+settings.overlay.opacity+";display:none;");
        }else{
            joverlay.setAttribute("style", "background-color: black;left: 0;position: fixed;top: 0;z-index: 1100;width:100%;height:100%;filter:alpha(opacity=70);opacity:0.7;display:none;");
        }
        
        var jloading = document.createElement("span");
        jloading.setAttribute("id", jloading_overlayId);
        //adding the styles and checking the label object in settings
        if(settings.label.class_name != null){
            jloading.setAttribute("class",settings.label.class_name);
        }else if(settings.label.style != null){
            jloading.setAttribute("style", settings.label.style);
        }else if (settings.label.background_color){
            jloading.setAttribute("style", "background: "+settings.label.background_color+";margin: 0 auto;color: white;padding: 10px 25px;text-align: center;display: none;position: absolute;left: 48%;margin-left: -50px;");
        }else{
            jloading.setAttribute("style", "background: #C53727;margin: 0 auto;color: white;padding: 10px 25px;text-align: center;display: none;position: absolute;left: 48%;margin-left: -50px;");
        }
        //placing the loading message
        if(loadingMessage){
            jloading.innerHTML = loadingMessage;
        }else{
            jloading.innerHTML = 'Saving';
        }
        //appending the loading to the overlay
        joverlay.appendChild(jloading);
        //appending the overlay to the document body.
        document.body.appendChild(joverlay);
    
        //creating popup div.
        var popup = document.createElement("div");
        //setting the id and styling the div.
        //also check later to allow developer to add his own class or style.
        //check settings object popup:{class_name:null,style:null,background_color:null}
        if(settings.popup.class_name != null){
            popup.setAttribute("class", settings.popup.class_name);
        }else if(settings.popup.style != null){
            popup.setAttribute("style", settings.popup.style);
        }else if(settings.popup.background_color != null){
            popup.setAttribute("style", "line-height:20px;width: 400px; border: 10px solid #222; -webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;"
                +"padding: 10px 0; background: "+settings.popup.background_color+" repeat-x 0 -1px;color: #323232;position: absolute;z-index: 1200;");
        }else{
            popup.setAttribute("style", "line-height:20px;width: 400px; border: 10px solid #222; -webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;"
                +"padding: 10px 0; background: white repeat-x 0 -1px;color: #323232;position: absolute;z-index: 1200;");
        }
        popup.setAttribute("id", jdelete_popupId);
        var message_box = document.createElement("div");
        message_box.setAttribute("id", jmessageId);
        message_box.setAttribute("style","text-align: center;");
        popup.appendChild(message_box);
        //appending the cancel and checking for labels.
        var div = document.createElement("div");
        //cancel button.
        if(true){
            var aCancel = document.createElement("a");
            aCancel.setAttribute("id", jcancelId);
            if(cancelLabel){
                aCancel.innerHTML = cancelLabel;
            }else{
                aCancel.innerHTML = "Cancel";
            }
            //checking settings object buttons:{class_name:null,style:null,backgroun_color:null}
            if(settings.buttons.class_name != null){
                aCancel.setAttribute("class",settings.buttons.class_name);
            }else if(settings.buttons.style!= null){
                aCancel.setAttribute("style",settings.buttons.style);
            }else if(settings.buttons.backgroun_color != null){
                aCancel.setAttribute("style", "float:right !important;margin-left: 5px;border: 1px solid "+settings.buttons.backgroun_color+";"+"color: white;"+
                    "text-align: center;"+"padding: 0 8px;"+"font-weight:bold;"+"background-color: "+settings.buttons.backgroun_color+";"+
                    "background-image: -webkit-gradient(linear, left top, left bottom, from(#4d90fe), to(#4787ed));"+
                    "background-image: -webkit-linear-gradient(top, #E30606, #E30606);"+"background-image: -moz-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+
                    "background-image: -ms-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+"background-image: -o-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+
                    "background-image: linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+"-webkit-border-radius: 2px;"+"-moz-border-radius: 2px;"+"border-radius: 2px;"+
                    "-webkit-user-select: none;"+"-moz-user-select: none;"+"user-select: none;"+"cursor: default;"+"display: inline-block;"+"text-align: center;"+
                    "color: #fff;"+"font-size: 11px;"+"font-weight: bold;"+"height: 27px;"+"padding: 0 8px;"+"line-height: 27px;"+"line-height: 29px;"+
                    "vertical-align: bottom;"+"height: 32px;"+"font-size: 13px;"+"color:#fff;"+"font-family: 'open sans';"+"margin: 0 0 0 2px;"+
                    "height: 30px;"+"line-height: 30px;"+"color:#fff;cursor:pointer;margin-right: 20px;");
            }else{
                aCancel.setAttribute("style", "float:right !important;margin-left: 5px;border: 1px solid #E30606;"+"color: white;"+
                    "text-align: center;"+"padding: 0 8px;"+"font-weight:bold;"+"background-color: #4d90fe;"+"background-image: -webkit-gradient(linear, left top, left bottom, from(#4d90fe), to(#4787ed));"+
                    "background-image: -webkit-linear-gradient(top, #E30606, #E30606);"+"background-image: -moz-linear-gradient(top, #E30606, #E30606);"+
                    "background-image: -ms-linear-gradient(top, #E30606, #E30606);"+"background-image: -o-linear-gradient(top, #E30606, #E30606);"+
                    "background-image: linear-gradient(top, #E30606, #E30606);"+"-webkit-border-radius: 2px;"+"-moz-border-radius: 2px;"+"border-radius: 2px;"+
                    "-webkit-user-select: none;"+"-moz-user-select: none;"+"user-select: none;"+"cursor: default;"+"display: inline-block;"+"text-align: center;"+
                    "color: #fff;"+"font-size: 11px;"+"font-weight: bold;"+"height: 27px;"+"padding: 0 8px;"+"line-height: 27px;"+"line-height: 29px;"+
                    "vertical-align: bottom;"+"height: 32px;"+"font-size: 13px;"+"color:#fff;"+"font-family: 'open sans';"+"margin: 0 0 0 2px;"+
                    "height: 30px;"+"line-height: 30px;"+"color:#fff;cursor:pointer;margin-right: 20px;");
            }
            div.appendChild(aCancel);
        }
        //appending the confirm a and styling it.
        var aconfirmed = document.createElement("a");
        //checking settings object buttons:{class_name:null,style:null,backgroun_color:null}
        if(settings.buttons.class_name != null){
            aconfirmed.setAttribute("class",settings.buttons.class_name);
        }else if(settings.buttons.style!= null){
            aconfirmed.setAttribute("style",settings.buttons.style);
        }else if(settings.buttons.backgroun_color != null){
            aconfirmed.setAttribute("style", "float:right !important;margin-left: 5px;border: 1px solid "+settings.buttons.backgroun_color+";"+"color: white;"+
                "text-align: center;"+"padding: 0 8px;"+"font-weight:bold;"+"background-color: "+settings.buttons.backgroun_color+";"+
                "background-image: -webkit-gradient(linear, left top, left bottom, from(#4d90fe), to(#4787ed));"+
                "background-image: -webkit-linear-gradient(top, #E30606, #E30606);"+"background-image: -moz-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+
                "background-image: -ms-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+"background-image: -o-linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+
                "background-image: linear-gradient(top, "+settings.buttons.backgroun_color+", "+settings.buttons.backgroun_color+");"+"-webkit-border-radius: 2px;"+"-moz-border-radius: 2px;"+"border-radius: 2px;"+
                "-webkit-user-select: none;"+"-moz-user-select: none;"+"user-select: none;"+"cursor: default;"+"display: inline-block;"+"text-align: center;"+
                "color: #fff;"+"font-size: 11px;"+"font-weight: bold;"+"height: 27px;"+"padding: 0 8px;"+"line-height: 27px;"+"line-height: 29px;"+
                "vertical-align: bottom;"+"height: 32px;"+"font-size: 13px;"+"color:#fff;"+"font-family: 'open sans';"+"margin: 0 0 0 2px;"+
                "height: 30px;"+"line-height: 30px;"+"color:#fff;cursor:pointer;margin-right: 20px;");
        }else{
            aconfirmed.setAttribute("style", "float:right !important;margin-left: 5px;border: 1px solid #E30606;"+"color: white;"+
                "text-align: center;"+"padding: 0 8px;"+"font-weight:bold;"+"background-color: #4d90fe;"+"background-image: -webkit-gradient(linear, left top, left bottom, from(#4d90fe), to(#4787ed));"+
                "background-image: -webkit-linear-gradient(top, #E30606, #E30606);"+"background-image: -moz-linear-gradient(top, #E30606, #E30606);"+
                "background-image: -ms-linear-gradient(top, #E30606, #E30606);"+"background-image: -o-linear-gradient(top, #E30606, #E30606);"+
                "background-image: linear-gradient(top, #E30606, #E30606);"+"-webkit-border-radius: 2px;"+"-moz-border-radius: 2px;"+"border-radius: 2px;"+
                "-webkit-user-select: none;"+"-moz-user-select: none;"+"user-select: none;"+"cursor: default;"+"display: inline-block;"+"text-align: center;"+
                "color: #fff;"+"font-size: 11px;"+"font-weight: bold;"+"height: 27px;"+"padding: 0 8px;"+"line-height: 27px;"+"line-height: 29px;"+
                "vertical-align: bottom;"+"height: 32px;"+"font-size: 13px;"+"color:#fff;"+"font-family: 'open sans';"+"margin: 0 0 0 2px;"+
                "height: 30px;"+"line-height: 30px;"+"color:#fff;cursor:pointer;margin-right: 20px;");
        }
        //setting the hover and focus actions
        //need to be rechecked and also allow developers to set there own classes or styles.
        $(aconfirmed).mouseover(function(){
            $(this).css("background-color","#e30606");
            $(this).css("background-color","-webkit-linear-gradient(top, #4d90fe, #e30606)");
            $(this).css("background-color","-moz-linear-gradient(top, #4d90fe, #e30606)");
            $(this).css("background-color","-ms-linear-gradient(top, #4d90fe, #e30606)");
            $(this).css("background-color","-o-linear-gradient(top, #4d90fe, #e30606)");
            $(this).css("background-color","linear-gradient(top, #4d90fe, #e30606)");
            $(this).css("border"," 1px solid #e30606");
        });
        $(aconfirmed).focus(function(){
            $(this).css("-webkit-box-shadow"," inset 0 0 0 1px #fff;");
            $(this).css("-moz-box-shadow","inset 0 0 0 1px #fff");
            $(this).css("box-shadow","inset 0 0 0 1px #fff");
            $(this).css("border","1px solid white");
            $(this).css("border","1px solid transparent");
            $(this).css("outline","1px solid #4D90FE");
            $(this).css("outline","0 transparent");
        });
        aconfirmed.setAttribute("id", jconfirmedId);
        if(OkLabel){
            aconfirmed.innerHTML = OkLabel;
        }else{
            aconfirmed.innerHTML = "Ok";
        }
        //appending the box.
        div.appendChild(aconfirmed);
        popup.appendChild(div);
        document.body.appendChild(popup);
    };
    
    /**
     * getting the value of the the radio buttons in the form.
     * @param radios: the radios which the function will go throw to find the value.
     * @return the value of the selected radio, null if nothing is selected.
     * @depreicated after using jQuery.serialize();
     */
    var radiosValue = function(radios){
        for(var i=0; i< radios.length;i ++){
            //checking for the checked radio
            if(radios[i].checked){
                return radios[i].value;
            }
        }
        return null;
    };
    
    /**
     * construct the query string from an array, commonly used with multi-select field or check boxes, like if you have a parameter called x
     * then the query string will be x=?&x=?&x=?....etc.
     * @param paramName: the parameter name.
     * @param array: the which will fetch data from.
     * @return a query string represents the data for the parameter.
     */
    var fitchArrayValues = function(paramName,array){
        var data = "";
        for(var a=0 ;a < array.length; a++){
            data+=paramName +"="+encodeURIComponent(array[a])+"&";
        }
        return data;
    };
        
    //methods variable.
    var jui = {
        /**
         * submitForm: the main function of the lib, that uses all of other functions to scan the form that sent in the parameter, build the html elements,
         * style them and then submit the form handle the process of the response, by checking the response code, only 200 proceeds the success function and call the complete parameter,
         * showing the loadingmessage parameter in the header of the overlay, finally if an error occur shows the message parameter in the jalert box.
         * note: you may customize the complete function, if the function finds that complete parameter is null, it process the response code. if it's 200 it redirects the page to the response text.
         * then if you don't want to override the success, you must write the redirect url in your response.
         * @param form: the form element that the function will scan.
         * @param message: the message that the function will show in the box if an error occurred.
         * @param complete: a function to execute after response, regardless of the response code.
         * @param loadingmessage: a message to write in the header of the overlay like "loading" or "saving".
         */
        submitForm : function(form,message,loadingmessage,complete){
            jui.jloading(loadingmessage);
            try{
                //getting the input fields
                var data = $(form).serialize();
                $.ajax({
                    url:$(form).attr('action'),
                    type:$(form).attr('method'),
                    data:data,
                    cache:false,
                    complete:function(jqXHR, textStatus){
                        //check if the complete parameter is null or undefined, so do the standard action.
                        if(complete){
                            complete(jqXHR, textStatus);
                            return;
                        }
                        //check for 200
                        if(jqXHR && jqXHR.status == 200){
                            //in case of response server error and the server didn't send the redirect url.
                            if(jqXHR.responseText.length > 200){
                                if(message)
                                    jui.jalert(message);
                                else
                                    jui.jalert("Something went wrong , check your application and try again. ");
                                return;
                            }
                            //finally redirecting to the url sent in the response.
                            window.location.href=jqXHR.responseText;
                        }else{
                            if(message)
                                jui.jalert(message);
                            else
                                jui.jalert("Something went wrong , check your application and try again. ");
                        }
                    }
                });
            }catch(e){
                if(message)
                    jui.jalert(message);
                else
                    jui.jalert("Something went wrong , check your application and try again. ");
            }
            //stops the submit propagation.
            return false;
        },
        /**
         * jalert function shows the custom alert with a fancy design.
         * @param message: the message to write in the box.
         * @param loader: function to execute after the ok button is clicked.
         * @param OkLabel: the label of the button.
         */
        jalert : function(message,loader,OkLabel){
            //check for the html elements.
            if($('#'+joverlayId).length == 0){
                buildHTML();
            }
            //scrolling the page to the top.
            $("html, body").animate({
                scrollTop: 0
            }, "fast");
            //center the box.
            $('#'+jdelete_popupId).css({
                left: '50%', 
                marginLeft: ($('#'+jdelete_popupId).outerWidth() / 2) * -1
            });
            $('#'+jdelete_popupId).css({
                top: '50%', 
                marginBottom: ($('#'+jdelete_popupId).outerHeight() / 2) * -1
            });
            //replacing the OkLabel
            if(OkLabel)
                $("#"+jconfirmedId).html(OkLabel);
            //hiding the other button of cancel(needed for jconfirm)
            $("#"+jcancelId).hide();
            //hiding any other overlay
            $('#'+jloading_overlayId).hide();
            //append the message
            $('#'+jmessageId).html(message);
            //showing the overlay with the opacity
            $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
            $('#'+joverlayId).fadeIn('fast',function(){
                $('#'+jdelete_popupId).show();
            });
            //setting the click action.
            $('#'+jconfirmedId).click(function(){
                $('#'+joverlayId).hide();
                $('#'+jdelete_popupId).hide(function(){
                    $('#'+joverlayId).hide();
                    if(loader)
                        loader();
                    loader = null;
                });
            });
        },
        /**
         * jloading is a function to show the loading overlay and the header message
         * @param message: a message that will be shown in the header, like "saving", "loading" ....etc.
         */
        jloading : function(message){
            //check the html elements exist
            if($('#'+joverlayId).length == 0){
                buildHTML();
            }
            //hide the box.
            $("#"+jdelete_popupId).hide();
            //center the label.
            if ($(window).height() < $(document).height()) {
                $('#'+joverlayId).css({
                    height: $(document).height() + 'px'
                });
            } else {
                $('#'+joverlayId).css({
                    height: '100%'
                });
            }
            //placing the message.
            if(message)
                $('#'+jloading_overlayId).html(message);
            else
                $('#'+jloading_overlayId).html('Saving');
            //showing the overlay.
            $('#'+jloading_overlayId).show();
            $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
            $('#'+joverlayId).fadeIn('fast',function(){});
        },
        /**
         * jconfirm is just like the jalert, it's override the standard confirm function, shows a message and an action to append on the cancel and confrim action.
         * @param message: the message to show. in the box.
         * @param success: the function to execute after success, if not set the function returns true.
         * @param failer: the function to execute after the cancel action, if not set the function returns false.
         */
        jconfirm : function(message,success,failer){
            if($('#'+joverlayId).length == 0){
                buildHTML();
            }
            //check for html elements and components.
            $('#'+jmessageId).html(message);
            //scroling the page to the tob.
            $("html, body").animate({
                scrollTop: 0
            }, "fast");
            //center the box
            $('#'+jdelete_popupId).css({
                left: '48%', 
                marginLeft: ($('#'+jdelete_popupId).outerWidth() / 2) * -1
            });
            $('#'+jdelete_popupId).css({
                top: '42%', 
                marginBottom: ($('#'+jdelete_popupId).outerHeight() / 2) * -1
            });
            //show the overlay and set opacity
            $('#'+joverlayId).css('filter', 'alpha(opacity=90); BACKGROUND-COLOR: white');
            $('#'+joverlayId).fadeIn('fast',function(){
                $('#'+jdelete_popupId).show();
            });
            //show cancel button
            $("#"+jcancelId).show();
            $('#'+jloading_overlayId).hide();
            //set the action on cancel.
            $('#'+jcancelId).show().click(function(){
                $('#'+jdelete_popupId).hide(function(){
                    $('#'+joverlayId).hide();
                    $("#"+jcancelId).hide();
                    if(failer)
                        failer();
                    failer = null;
                    return true;
                });
            });
            //set the action on confrim.
            $('#'+jconfirmedId).click(function(){
                $('#'+jdelete_popupId).hide(function(){
                    $('#'+joverlayId).hide();
                    $("#"+jcancelId).hide();
                    if(success)
                        success();
                    success = null;
                    return false;
                });
            });
        },
        /**
         * jHide function to hide the overlay and any other box.
         */
        jHide : function(){
            $('#'+jdelete_popupId).hide(function(){
                $('#'+joverlayId).hide();
                $("#"+jcancelId).hide();
            });
        }
    };
    return jui;
};

//instanciating an object from JUI
var jui = new JUI({
    });