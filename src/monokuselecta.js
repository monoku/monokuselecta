(function(window){
    'strict mode';

    if(window.MonokuSelecta)
        return;
    
    window.MonokuSelecta = new Class({
        initialize: function(selectorOrElement){
            if(typeof 'selectorOrElement' === 'undefined') return;

            var selects = typeof 'selectorOrElement' === 'string' ? 
                    $$(selectorOrElement) : [selectorOrElement],
                select, styledSelecta,
                i = 0, l = selects.length;

            for(;i < l; i++) {
                select = selects[i];
                styledSelecta = new Element('span', {
                    'class': 'monoku-selecta-wrapper', 
                    'html':'<span class="value">'+ select.getSelected()[0].text +'</span><span class="arrow">▼</span><input type="text" />'
                });

                //Select config
                select.store('wrapper', styledSelecta);
                select.setStyle('zIndex', 999);
                select.addClass('monoku-selecta-select')
                styledSelecta.addEvent('focus:relay(input)', this.doMonokuSelecta);
                select.addEvent('blur', this.hideSelecta);
                select.addEvent('click', this.hideSelecta);
                select.addEvent('change', this.doSelect);
                select.addEvent('keyup', this.doSelectByEnter);
                select.addEvent('keydown', this.doTab);
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
            var that = this.get('tag')=='input' ? 
                    this.getParent('.monoku-selecta-wrapper') : this,
                select = that.retrieve('select');
            select.setStyle('top', that.getCoordinates().bottom);
            select.setStyle('left', that.getPosition().x);
            select.setStyle('visibility', 'visible');
            select.focus();
        },

        hideSelecta: function(){
            // this.style.top="-99999em";
            this.style.visibility="hidden";
            this.blur();
        },

        doSelect: function(){
            var selected = $(this).getSelected()[0];
            this.retrieve('wrapper').getChildren('.value')[0].innerHTML = selected.text;
            this.retrieve('wrapper').getChildren('input')[0].set('value', selected.value);
        },

        doSelectByEnter: function(evt){
            if(evt.key == 'enter'){
                this.style.top="-99999em";
                this.blur();
            }
        },

        doTab: function(evt){
            var tabable, index, direction = 1

            if(evt.key == 'tab'){
                evt.stop()
                tabable = $$('input, button')
                index = tabable.indexOf(this.retrieve('wrapper').getElement('input'))
                if(evt.shift)
                    direction = -1
                if(tabable[index+direction])
                    tabable[index+direction].focus()
            }
        },

        getValue: function(){
            return select.getSelected()[0].value;
        }
    })
})(window);