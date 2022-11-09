var Linker = {
    setColor:function(color){
        $('a').css('color',color);
    }
}
var Body = {
    setColor:function(color){
        $('body').css('color',color);
    },
    setBackgroundColor:function(color){
        $('body').css('backgroundColor',color);
    }
}
function nightDayHandler(self){
    if(self.value === 'night'){
        Body.setBackgroundColor('black');
        Body.setColor('white');
        self.value = 'day'; 
        
        Linker.setColor('powderblue');
    }else{
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';

        Linker.setColor('blue');
    }
}