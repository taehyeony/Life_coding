var Linker = {
    setColor:function(color){
        let alist = document.querySelectorAll('a');
        for(let i in alist){
            alist[i].style.color = color;
        }
    }
}
var Body = {
    setColor:function(color){
        document.querySelector('body').style.color = color;
    },
    setBackgroundColor:function(color){
    document.querySelector('body').style.backgroundColor = color;
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