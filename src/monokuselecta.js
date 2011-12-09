var MonokuSelecta = new Class({
    initialize: function(selector){
        var selects = $$(selector);
        var select, styledSelecta;

        for(var i = 0, l = selects.length; i < l; i++) {
            select = selects[i];
            styledSelecta = new Element('span', {
                'class': 'monoku-selecta-wrapper', 
                'html':'<span class="value">'+ select.getSelected()[0].text +'</span><span class="arrow">▼</span><input type="hidden" />'
            });

            //Select config
            select.store('wrapper', styledSelecta);
            select.setStyle('zIndex', 999);
            select.addClass('monoku-selecta-select')
            select.addEvent('blur', this.hideSelecta);
            select.addEvent('click', this.hideSelecta);
            select.addEvent('change', this.doSelect);
            select.addEvent('keyup', this.doSelectByEnter);
            select.size = select.options.length;
            styledSelecta.store('select', select);
            if(select.get('name')){
                styledSelecta.getChildren("input").set('name', select.get('name'));
                //cleans the name, because the value is replaced in the input hidden
                select.set('name', '');
                styledSelecta.getChildren("input").set('value', select.getSelected()[0].get('value'));
            }

            styledSelecta.inject(select,'before');
            document.body.grab(select,'bottom');
            styledSelecta.addEvent('click', this.doMonokuSelecta);
        }
    },
    
    doMonokuSelecta: function(evnt){
        var select = this.retrieve('select');
        select.setStyle('top', this.getCoordinates().bottom);
        select.setStyle('left', this.getPosition().x);
        select.focus();
    },

    hideSelecta: function(){
        this.style.top="-99999em";
        this.blur();
    },

    doSelect: function(){
        var selected = $(this).getSelected()[0];
        this.retrieve('wrapper').getChildren('.value')[0].innerHTML = selected.text;
        this.retrieve('wrapper').getChildren('input')[0].set('value', selected.value);
    },

    doSelectByEnter: function(evt){
        console.log(evt.key);
        if(evt.key == 'enter'){
            this.style.top="-99999em";
            this.blur();
        }
    },

    getValue: function(){
        return select.getSelected()[0].value;
    }
});