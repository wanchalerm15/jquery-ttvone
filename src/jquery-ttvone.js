/*
    javascript
	jquery ttvone developer by ttvone 
	wanchaloem laoket 
	copyright 2016
	contact : wanchaloem.laokeut@googlemail.com
    version 1.0.4
*/
(function(){
    var $$ = $.fn;
    /* ############################ BEGIN FOR EXAMPLE ##############################
    $(element).ttvone_tooltip(options);
    options
    {
        title:      'title',
        postion:    'left',
    }
    $(element).ttvone_autocomplate(options);
    options
    {
        width:      [width from element]
        datas:      ['data 1', 'data 2', 'data 1'],
        select:     function(value, element){},
        sensitive:  false,
        limit:      10,
        caret:      false
    }
    $.ttvone_routing(options);
    options
    {
        actions:    [], // { action: '/', controls: function(response, status, http_object){}, [[ path: '' ]] },
        params:     function(params){},
        run:        function(){}
    }
    $.ttvone_alert(options);
    options
    {
        backdrop:       options.backdrop        || true,        // [true, false, 'auto']
        type:           options.type            || 'alert',     // ['alert', 'confirm']
        effect:         options.effect          || 'static',    // ['fade', 'slide', 'move', 'static']
        button:         options.button          || 'ตกลง',
        cancelButton:   options.cancelButton    || 'ยกเลิก',
        timeEffect:     options.timeEffect      || 300,
        callback:       options.callback        || function(status, element){}
    }
    ############################### END FOR EXAMPLE ############################## */

    /* ### BEGIN TOOLTIP FUNCTION ### */
    $$.ttvone_tooltip       = function(options){
        // SET VARIABLE
        options                 = options || {};
        var elements	        = this;
        var container           = $('body');
        var main_class          = 'ttvone-scope'
        var option              = {
            title:      options.title       || 'title',
            postion:    options.postion     || 'left'
        };
        // HTML TEMPLATE TOOLTIP
        var class_tooltip      = 'ttvone-tooltip';
        var class_text         = 'ttvone-text';
        var class_arrow        = 'ttvone-arrow';
        var class_arrow_pos    = {
            top:    'ttvone-top', 
            bottom: 'ttvone-bottom', 
            left:   'ttvone-left', 
            right:  'ttvone-right'  
        };
        var tooltip_template    = function(id, text){
            var template = ""
            + "<div class='{class_tooltip}' id='{id}'>"
            + "     <span class='{class_arrow}'></span>"
            + "     <span class='{class_text}'>{text}</span>"
            + "</div>";
            template = template.replace(/{id}/,             id);
            template = template.replace(/{class_tooltip}/,  class_tooltip + ' ' + main_class);
            template = template.replace(/{class_arrow}/,    class_arrow);
            template = template.replace(/{class_text}/,     class_text);
            template = template.replace(/{text}/,           text);
            return template;
        };
        // PROCESS AND PUSH POSITION ELEMENT TOOLTIP
        var process_position    = function(mainElement, subElement){
            var aElement    = subElement.find('.' + class_arrow);
            if(mainElement.length !== 0 && subElement.length !== 0 && aElement.length !== 0){
                var top             = 0, 
                    atop            = 0,
                    left            = 0,
                    aleft           = 0,
                    margin          = 6,
                    scroll_top      = $(window).scrollTop(),
                    class_arr       = '';
                var size    = {
                    main: {
                        w: mainElement[0].offsetWidth, h: mainElement[0].offsetHeight,
                        t: mainElement[0].offsetTop, l: mainElement[0].offsetLeft
                    },
                    sub: {
                        w: subElement[0].offsetWidth, h: subElement[0].offsetHeight,
                        t: subElement[0].offsetTop, l: subElement[0].offsetLeft
                    },
                    arrow: {
                        w: aElement[0].offsetWidth, h: aElement[0].offsetHeight,
                        t: aElement[0].offsetTop, l: aElement[0].offsetLeft
                    }
                };  
                switch(option.postion){
                    case 'top':
                        top     = size.main.t - size.sub.h - margin;
                        left    = size.main.l + (size.main.w / 2) - (size.sub.w / 2);

                        atop        = size.main.t - margin;
                        aleft       = size.main.l + (size.main.w / 2) - (size.arrow.w / 2);
                        class_arr   = class_arrow_pos.top;
                        break;

                    case 'bottom':
                        top         = size.main.t + size.main.h + margin;
                        left        = size.main.l + (size.main.w / 2) - (size.sub.w / 2);

                        atop        = size.main.t + size.main.h - margin;
                        aleft       = size.main.l + (size.main.w / 2) - (size.arrow.w / 2);
                        class_arr   = class_arrow_pos.bottom;
                        break;

                    case 'right':
                        top         = size.main.t + (size.main.h / 2) - (size.sub.h / 2);
                        left        = size.main.l - size.sub.w - margin;

                        atop        = size.main.t + (size.main.h / 2) - (size.arrow.h / 2);
                        aleft       = size.main.l - margin;
                        class_arr   = class_arrow_pos.right;
                        break;

                    case 'left':
                        top         = size.main.t + (size.main.h / 2) - (size.sub.h / 2);
                        left        = size.main.l + size.main.w + margin;

                        atop        = size.main.t + (size.main.h / 2) - (size.arrow.h / 2);
                        aleft       = size.main.l + size.main.w - margin;
                        class_arr   = class_arrow_pos.left;
                        break;
                }
                // SET SCROLL TOP POSTION
                top     = top - scroll_top;
                atop    = atop - scroll_top;
                subElement.css({
                    top:    top     + 'px',
                    left:   left    + 'px'
                });
                aElement.css({
                    top:    atop    + 'px',
                    left:   aleft   + 'px'
                }).addClass(class_arr);
            }
        };
        // FIND LENGTH ELEMENT
        if(elements.length !== 0){
            // SCOPE ALL ELEMENT
            elements.addClass(main_class);
            elements.each(function(){
                var _element            = $(this);
                var _title_attr         = option.title;
                var _title_text         = _element.attr(option.title);
                // CHECK EMPTY DATA
                if($.trim(_title_text) !== ''){
                    // REMOVE TITLE ATTRIBUTE
                    if($.trim(_title_attr) === 'title'){
                        _title_attr = 'data-ttvone-title';
                        _element.removeAttr(option.title);  
                        _element.attr(_title_attr, _title_text);
                    }
                    // BEGIN MOUSE OVER
                    _element.on('mouseover', function(e){
                        var top             = e.pageY;
                        var left            = e.pageX;
                        var text            = _element.attr(_title_attr);
                        var randomId        = 'ttvone_' + parseInt((Math.random() + 1) * 999999999900191);
                        var template        = tooltip_template(randomId, text);
                        // APPEND ELEMENT AND SET POSITION ELEMENT TOOLTIP
                        container.append(template);
                        process_position(_element, $(document.getElementById(randomId)));
                    });
                    // END MOUSE OVER


                    // BEGIN MOUSE OUT
                    _element.on('mouseout', function(){
                        container.find('.' + class_tooltip).remove();
                    });
                    // END MOUSE OUT
                }
            });
        }
    };
    /* ### END TOOLTIP FUNCTION ### */

    /* ### BEGIN AUTOCOMPLATE FUNCTION ### */
    $$.ttvone_autocomplate  = function(options){
        options             = options || {};
        var elements        = this,
            option          = {
                width:      options.width       || undefined,
                datas:      options.datas       || [],
                select:     options.select      || function(value, element){},
                cancel:     options.cancel      || function(parent){},
                sensitive:  options.sensitive   || false,
                limit:      options.limit       || 10,
                caret:      options.caret       || false
            },
            body            = $('body'),
            main_class      = 'ttvone-scope',
            class_auto      = 'ttvone-autocomplate',
            class_auto_main = 'ttvone-autocomplate-main',
            template        = function(id, style, data){
                var temp    = "<ul class='{main_class}' style='{style}' id='{id}'>";
                temp        = temp.replace(/{main_class}/, class_auto + ' ' + main_class);
                temp        = temp.replace(/{style}/, style);
                temp        = temp.replace(/{id}/, id);
                // loop foreach
                for(var i in data){
                    if(i == option.limit) break;
                    var d = data[i];
                    temp += '<li>' + d + '</li>';
                }
                temp += "<ul>";

                return temp;
            };
        if(elements.length !== 0){
            elements.addClass(main_class);
            // SCOPE ELEMENT
            var element_datas   = $('[data-autocomplate-for="' + elements.attr('id') + '"]'); 
            if(element_datas.length !== 0){
                element_datas.hide();
                var li = element_datas.find('li');
                if(li.length > 0){
                    option.datas = [];
                    li.each(function(){
                        option.datas.push($.trim($(this).text()));
                    });   
                }
            }
            elements.each(function(){
                var _element    = $(this);
                var _document   = $(window);
                var _datas      = option.datas;
                var _active_cls = 'ttvone-active';
                var _caret_cls  = 'ttvone-autocomplate-caret';
                var _search     = [];
                var _key_not    = [
                    16, 17, 18, 91, 
                    38, 40, 13, 32,
                    27
                ];
                var _tempate_proces = function(data){
                    if(data.length > 0){
                        var _size       = {
                            w: _element[0].offsetWidth,
                            h: _element[0].offsetHeight,
                            t: _element[0].offsetTop,
                            l: _element[0].offsetLeft,
                            s: $(window).scrollTop()
                        };
                        var _randomId   = 'ttvone-' + parseInt((Math.random() + 1) * 9099990909090);
                        var _width      = option.width || (_size.w);
                        var _top        = (_size.t + _size.h - _size.s) + 5;
                        var _left       = _size.l;
                        var _style      = 'top: ' + _top + 'px;left: ' + _left + 'px; width: ' +_width+ 'px;';
                        var _template   = template(_randomId, _style, data);
                        // APPEND DATA AND ADD AUTOCOMPLATE
                        body.append(_template);
                        _element.attr('autocomplete', 'off');
                        // FIND ELEMENT APPENE
                        var _autocomplate   = $('#' + _randomId);
                        if(_autocomplate.length !== 0){
                            var _autocom_li = _autocomplate.find('li');
                            // SET EVENT 
                            _autocom_li.on('click', function(){
                                var value   = $.trim($(this).text());
                                _element.val(value);
                                // SEND DATA TO OUTER FUNCTION
                                option.select(value, this);
                                _autocomplate.hide();
                            });
                            _element.on('click', function(e){
                                _autocomplate.show();
                                e.stopPropagation();
                            });
                            _element.on('keydown', function(e){
                                // KEY DOWN
                                if(e.keyCode === 40){
                                    if(_autocom_li.length > 0){
                                        if(!_autocom_li.hasClass(_active_cls)){
                                            $(_autocom_li[0]).addClass(_active_cls);
                                        }
                                        else{
                                            var li_active   = _autocomplate.find('li.' + _active_cls);
                                            var li          = li_active.next('li');
                                            if(li.length !== 0){
                                                li_active.removeClass(_active_cls);
                                                li.addClass(_active_cls);
                                            }
                                        }
                                    }
                                    e.preventDefault();
                                }
                                // KEY UP
                                else if(e.keyCode === 38){
                                    if(_autocom_li.length > 0){
                                        var li_active   = _autocomplate.find('li.' + _active_cls);
                                        var li          = li_active.prev('li');
                                        if(li.length !== 0){
                                            li_active.removeClass(_active_cls);
                                            li.addClass(_active_cls);
                                        }
                                    }
                                    e.preventDefault();
                                }
                                // KEY ENTER SPACEBAR
                                else if(e.keyCode === 13 || e.keyCode === 32){
                                    if(_autocomplate.css('display') !== 'none'){
                                        var li_active   = _autocomplate.find('li.' + _active_cls);
                                        if(li_active.length !== 0){
                                            _autocomplate.hide();
                                            _element.val($.trim(li_active.text()));   
                                        }   
                                        return false;
                                    }
                                    else{
                                        return true;
                                    }
                                }
                                // KEY ESC
                                else if(e.keyCode === 27){
                                    option.cancel(_autocomplate);
                                    _autocomplate.hide();
                                }
                            });
                            _document.on('click', function(){
                                option.cancel(_autocomplate);
                                _autocomplate.hide();
                            });
                        }   
                    }
                    return _autocomplate;
                };
                var _tempate_caret  = function(elem){
                    var Id              = 'ttvone-caret-' + parseInt((Math.random() + 1) * 9999999999),
                        _caret_element  = null;
                    $('.' + _caret_cls).remove();
                    elem.after('<span class="' + _caret_cls + '" id="' + Id + '"></span>');
                    _caret_element      = $("#" + Id);
                    // CHECK CARET ELEMENT
                    if(_caret_element.length > 0){
                        var _element_size   = {
                            width           : _element[0].offsetWidth,
                            height          : _element[0].offsetHeight,
                            position        : _element.offset(),
                            caret           : parseInt(_caret_element.css('border-width')) * 2
                        };
                        _caret_element.css({
                            top     : (_element_size.position.top + (_element_size.height / 2)) - ((_element_size.caret / 2) / 2),
                            left    : ((_element_size.position.left + _element_size.width) - _element_size.caret) - 5
                        });
                        _caret_element.click(function(e){
                            $('.' + class_auto).remove();
                            _tempate_proces(_datas).show();
                            e.stopPropagation();
                        });
                    }
                    return Id;
                };
                var _remove_element = function(){
                    $('.' + class_auto).remove();
                    $('.' + _caret_cls).remove();
                };
                // ADD CLASSES
                _element.addClass(class_auto_main);
                // CHECK EVENT ON KEY UP ELEMENT
                _element.on('keyup', function(e){
                    // KEY NOT PROCESS
                    if(_key_not.indexOf(e.keyCode) !== -1){
                        return;
                    }
                    var value   = this.value.toString(),
                        search  = [];
                    // FIND DATA AND THAN PUSH TO ARRAY
                    for(var i in _datas){
                        if(value.trim() !== ''){
                            var d           = _datas[i];
                            var sensitive   = (option.sensitive) ? (d.indexOf(value) !== -1) : (d.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                            if(sensitive)   search.push(d);
                        }
                    }
                    // SORT DATA
                    _search = search.sort();
                    $('.' + class_auto).remove();
                    _tempate_proces(_search);
                });
                // CLOSE AUTOCOMPLATE WHEN SCROLLING AND RESIZEA PAGE
                _document.scroll(_remove_element);
                _document.resize(_remove_element);
                // ADD CARET ELEMENT
                if(option.caret){
                    _element.on('mouseover', function(){ _tempate_caret(_element); });   
                }
            });
        }
    };
    /* ### END AUTOCOMPLATE FUNCTION ### */

    /* ### BEGIN ROUTE OBJECT ### */
    $.ttvone_routing        = function(options){
        options             = options || {};
        var hash            = '#/';
        var option          = {
            actions:        options.actions     || [], // { action: '/', controls: function(response, status, http_object){}, [[ path: '' ]] },
            params:         options.params      || function(params){},
            run:            options.run         || function(){},
        };
        var routing         = {
            // RUN BEFORE ROUTING
            run         : function() {
                var refresh = false;
                if(!location.hash){
                    location.href   = hash;
                    refresh         = true;
                    // CHECK ACTIONS
                    routing.GetAction();
                }
                else {
                    refresh         = false;
                    // CHECK ACTIONS
                    routing.GetAction();
                }
                option.run();
                option.params(routing.GetParams());
                // CHECK EVENT URL HASH CHANGE
                $(window).on('hashchange', function(){
                    // CHECK NULL ACTIONS
                    if(!location.hash){
                        location.href   = hash;
                        refresh         = true;
                    }
                    if(refresh){refresh = false; return;}
                    // CHECK ACTIONS
                    routing.GetAction();
                    option.run();
                    option.params(routing.GetParams());
                });
            },
            // GET ACTIONS PROCESS
            GetAction   : function(){
                var action  = location.hash;
                if(action){
                    if(option.actions.length > 0){
                        var _action             = action.replace(/#/, ''),
                            _actions            = option.actions,
                            _controller         = null,
                            _params             = {};
                        _action = _action.split('?');
                        _action = _action[0];
                        for(var i in _actions){
                            var config          = _actions[i];
                            if(config.action === _action){
                                // SEARCH PARAMS HASH URL
                                _params         = routing.GetParams();
                                // APPLY DATA TO CONTROLS BY HTTP REQUEST
                                if(config.path){
                                    var ajax    = $.get(config.path, function(response, status, http_object){
                                        config.controls(response, _params, http_object);
                                    });
                                    // IF ERROR HTTP REQUEST
                                    ajax.error(function(http_object){
                                        config.controls(null, _params, http_object);
                                    });
                                    return;
                                }
                                // APPLY DATA TO CONTROLS NOT HTTP REQUEST
                                config.controls(null, _params, {});
                                break;
                            }
                        }
                    }
                }
            },
            // GET PARAMS PROCESS
            GetParams   : function(){
                var action          = location.hash;
                var _action         = action.split('?'),
                    _params         = {};
                if(_action.length > 1 && $.trim(_action[1]) !== ''){
                    _action         = _action[1].split('&');
                    for(var i in _action){
                        var param   = _action[i].split('=');
                        if(param.length === 2){
                            _params[param[0]] = param[1];
                        }
                    }
                }
                return _params;
            }
        };
        routing.run(); 
    };
    /* ### BEGIN ROUTE OBJECT ### */

    /* ### BEGIN ALERT  ### */
    $.ttvone_alert          = function(text, options){
        // SET VARIABLE
        options             = options || {};
        var option          = {
            backdrop:       options.backdrop        || true,        // [true, false, 'auto']
            type:           options.type            || 'alert',     // ['alert', 'confirm', 'prompt']
            effect:         options.effect          || 'static',    // ['fade', 'slide', 'move', 'static']
            button:         options.button          || 'ตกลง',
            cancelButton:   options.cancelButton    || 'ยกเลิก',
            timeEffect:     options.timeEffect      || 300,
            callback:       options.callback        || function(status){} // function(status || message)
        };
        var body            = $('body'),
            class_main      = 'ttvone-scope',
            class_alert     = 'ttvone-alert',
            class_backdrop  = 'ttvone-backdrop',
            class_content   = 'ttvone-content',
            class_none      = 'ttvone-none',
            button          = option.button,
            cancel_button   = option.cancelButton,
            backdrop        = option.backdrop,
            effect          = option.effect,
            time_effect     = option.timeEffect,
            class_cancel    = option.type == 'confirm' || option.type == 'prompt' ? 'ttvone-show' : 'ttvone-hide',
            element         = null;
        // SET FUNCTION
        var template        = function(id){
            var _class_drop = backdrop === false ? class_backdrop + ' ' + class_none : class_backdrop,
                _input      = option.type == 'prompt' ? '<input type="text" />' : '',
                _style      = option.type == 'prompt' ? 'style="text-align: left;"' : '';
            var _template   = ""
            + "<div class='{class_backdrop}' id='{id}'>"
            +   "<div class='{class_content}'>"
            +       "<div {style}>"
            +           "{text}"
            +           "{input}"
            +       "</div>"
            +       "<div>"
            +           " <button class='{class_cancel}'>{cancel_button}</button>"
            +           " <button>{button}</button>"
            +       "</div>"
            +   "</div>"
            + "<div>";
            _template       = _template.replace(/{id}/,             id);
            _template       = _template.replace(/{class_backdrop}/, _class_drop);
            _template       = _template.replace(/{class_content}/,  class_content);
            _template       = _template.replace(/{input}/,          _input);
            _template       = _template.replace(/{style}/,          _style);
            _template       = _template.replace(/{text}/g,           text);
            _template       = _template.replace(/{button}/,         button);
            _template       = _template.replace(/{cancel_button}/,  cancel_button);
            _template       = _template.replace(/{class_cancel}/,   class_cancel);
            return _template;
        };
        var remove_template = function(status){
            var _remove_elm = function(){
                if(option.type == 'prompt'){
                    var _message    = null;
                    // check status is true
                    if(status){ 
                        var _input      = element.find('input');
                        if(_input.length > 0 && $.trim(_input.val()) != '') _message = _input.val();
                        option.callback(_message); 
                    }  
                    else { 
                        option.callback(_message); 
                    }
                }
                else {
                    option.callback(status); 
                }
                body.removeClass(class_main);
                body.removeClass(class_alert);
                element.remove();
            };
            // FADE ELEMENT
            switch(effect){
                case 'fade':
                    _element.content.fadeOut(time_effect, function(){
                        element.fadeOut(time_effect, function(){
                            _remove_elm();
                        });
                    });
                    break;
                case 'slide':
                    _element.content.slideUp(time_effect, function(){
                        element.fadeOut(time_effect, function(){
                            _remove_elm();
                        });
                    });
                    break;
                case 'move':
                    _element.content.hide(time_effect, function(){
                        element.fadeOut(time_effect, function(){
                            _remove_elm();
                        });
                    });
                    break;
                default:
                    element.hide();
                    _remove_elm();
                    break;
            }
        };

        // SET DATA
        body.addClass(class_main);
        body.addClass(class_alert);
        var randomId        = 'ttvone-' + parseInt((Math.random() + 1) * 999999090);
        body.append(template(randomId));

        // GET ELEMENT APPEND MANAGER
        element             = $('#' + randomId);
        // IF ELEMENT NOT NULL
        if(element.length > 0){
            // GET ELEMENT FOR SETTING
            var _element    = {
                button:     element.find('button'),
                content:    element.find('.' + class_content),
                input:      element.find('input')
            };
            // EVENT
            if(_element.button.length === 2 && _element.content.length > 0){
                // FADE ELEMENT
                element.hide();
                switch(effect){
                    case 'fade':
                        _element.content.hide();
                        element.fadeIn((time_effect / 3), function(){
                            _element.content.fadeIn(time_effect);
                        });
                        break;
                    case 'slide':
                        _element.content.hide();
                        element.fadeIn((time_effect / 3), function(){
                            _element.content.slideDown(time_effect);
                        });
                        break;
                    case 'move':
                        _element.content.hide();
                        element.fadeIn((time_effect / 3), function(){
                            _element.content.show(time_effect);
                        });
                        break;
                    default:
                        element.show();
                        break;
                }
                // EVENT BUTTON
                var _okButton       = $(_element.button[1]),
                    _cancelButton   = $(_element.button[0]),
                    _inputPrompt    = _element.input;
                _okButton.click(function(){
                    remove_template(true);
                });
                _cancelButton.click(function(){
                    remove_template(false);
                });
                _inputPrompt.keydown(function(e){
                    if(e.keyCode === 13) remove_template(true);
                    if(e.keyCode === 27) remove_template(false);
                });
                // EVENT CONTENT
                _element.content.click(function(e){
                    e.stopPropagation();
                });
                if(backdrop === 'auto'){
                    // EVENT ELEMENT HIDE ALERT ON CLINK BACKDROP
                    element.click(function(){
                        remove_template(false);
                    });   
                }
                // focus input prompt when input not hidden
                if(_inputPrompt.length > 0) _inputPrompt.focus();
            }
        }
    };
    /* ### END ALERT  ### */

    /* ### BEGIN GET WEB CONTENT SERVICE  ### */
    $.ttvone_webservice     = function(URL, options){
        options             = options || {};
        var option          = {
            success         : options.success   || function(content){},
            error           : options.error     || function(message){},
            element         : options.element   || '*' // [ '*', 'document', 'element_name']
        };
        var decodeURL       = "USE 'http://kincrew.github.com/xReader/xReader.xml?u=127.0.0.1&v=0.0.5'"
        +                   " AS xReader;SELECT * FROM xReader WHERE url='" + URL + "' AND css='html'";
        var encodeURL       = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(decodeURL) + '&format=json';
        var success         = function(res){
            var response    = res.query.results.resources.content,
                element     = null,
                content     = null,
                parse_dom   = null,
                parse_type  = 'text/html';
            try {
                parse_dom   = new DOMParser().parseFromString(response, parse_type);
                element     = $(parse_dom);
                switch(option.element){
                    case '*':
                        content     = response;
                        break;
                    case 'document':
                        content     = parse_dom;
                        break;
                    default:
                        element     = element.find(option.element);
                        if(element.length > 0)
                            content = element.html();
                        break;
                }
            }
            catch(message) {
                option.error(message);
            }
            option.success(content);
        };
        $.ajax({ method: 'GET', url: encodeURL, success: success });
    };
    /* ### END GET WEB CONTENT SERVICE  ### */

    /* ### BEGIN GET PARAMS ###*/
    $.ttvone_params         = function(scope){
        scope               = scope || '?';
        var returnParams    = {};
        try{
            var search          = (scope === '?') ? $.trim(location.search) : $.trim(location.hash);
            if(search === '')   return;
            var _search         = search.split(scope);
            // SCAN RAW PARAMS
            $.each(_search, function(rawParamsKey, rawParams){
                var _rawParams  = $.trim(rawParams);
                if(_rawParams === '') return;
                var params      = _rawParams.split('&');
                var randomKey   = 1;
                // SCAN PARAMS
                $.each(params, function(paramKey, param){
                    var _param  = param.split('=');
                    if(_param.length !== 2) return;
                    var _key    = _param[0];
                    if(_key.indexOf('[]') !== -1){
                        _key    = _key.replace('[]', '');
                        _key    = _key + '_' + randomKey;
                        randomKey ++;
                    }
                    var _val    = decodeURIComponent(_param[1]);
                    returnParams[_key] = _val;
                });
            });
        }
        catch(e){
            returnParams = {
                error: e.message  
            };
        }
        return returnParams;
    };
    /* ### END GET PARAMS ###*/
}).call(this);










