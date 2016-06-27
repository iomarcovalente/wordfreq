var parags = document.getElementById('parags');
var ulElem = document.getElementById("ulist");
var tagWords;
var active = 'active';

window.onload = function(){
var wordsList = document.getElementById('wordsList');
    
    $(window).scroll(function(){
        if ($(this).scrollTop() > 233) {
            wordsList.classList.add('fixIt');
            parags.classList.add('adjustParags'); 
        }
        else {
            wordsList.classList.remove('fixIt');
            parags.classList.remove('adjustParags');
        }
        });
        
}

function clearText() {
    var input = document.getElementById('input');
    var pars = document.getElementById('parags');
    var ul = document.getElementById('ulist');
    input.value="";
    pars.innerHTML="";
    pars.style.visibility = "hidden";
    ul.innerHTML="";


}

function counter() {
    var text = document.getElementById('input').value;
    if (text.length != 0) {
        var par = "<p class='piece'>";
        par = par + text.replace(/^(\s*(\r\n|\n|\r)){2,}/gm,"</p><p class='piece'>");
        par = par.replace(/\n|\r/g,"</p><p class='piece'>");
        par += "</p>";
        var reg = /<p class='piece'><\/p>|<p class="piece"><\/p>/g;
        par = par.replace(reg,"");
        $('#parags').css('visibility','visible');
        parags.insertAdjacentHTML('afterbegin',par);


        text = text.toLowerCase();
        text = text.replace(/[^\s\w]/g, " ");
        text = text.replace(/\b(have|haven|make|know|take|come|think|look|want|give|find|tell|seem|feel|leave|call|good|first|last|long|great|little|other|right|high|different|small|large|next|early|young|important|same|able|with|from|about|into|over|after|beneath|under|above|that|this|they|will|would|there|their|what|where|which|when|like|just|people|your|some|could|them|than|then|only|also|back|well|even|because|these|most|left|word|if|get|do|the)\b/ig,"");
        var searchArr = text.split(" ");
        text = [ ...new Set(searchArr) ];//remove all the duplicates from the array, avail only from ES6
        var wordsArray = [];
        var found = 0;
        var t = 0;

        for (var i = 0; i < text.length; i++) {
            if (text[i].length > 3){// filtered word length
                found = 0;
                s = text[i];
                do {
                    searchArr.splice(searchArr.indexOf(s), 1);// removes the word if it is present
                    found++;
                } while (searchArr.indexOf(s) != -1);

                 wordsArray.push({
                    name: s,
                    val: found
                });
            }
        }

    }

    if (wordsArray){
        wordsArray.sort(function(a, b) {
        return b.val - a.val;
        });
    }

    var result = wordsArray;//.slice(0, 20);

    var s = "";
    for (var i = 0; i < result.length; i++) {
        s += "<li id='l_" + result[i].name.trim() + "' class='list'> # " + result[i].name + " ( " + result[i].val + " " + times(result[i].val) + " ) </li>";
    }


    ulElem.insertAdjacentHTML('afterbegin', s);

    //tagWords = document.getElementsByTagName('li');
            /*
            console.log(e.target.style.background);
            if (e.target.style.background == "" || e.target.style.background == undefined) { 
                e.target.style.background = "#FCEB01";
                e.target.style.color = "#333";
                console.log("ON");
            }
            else { 
                e.target.style.background = "";
                e.target.style.color = ""; 
                console.log("OFF");
            }
            console.log(e.target);
            */

            /*s = parags.innerHTML;
            regex = new RegExp(''+e.target.id.slice(2)+'','ig');
            s = s.replace(regex, "<span class='highlight'>"+e.target.id.slice(2)+"</span>");
            parags.innerHTML = s;

            s = parags.innerHTML;
            regex = new RegExp('<(span).*?>([\s\S]*?)<\/?(\/span).*?>','g');
            s = s.replace(regex, e.target.id.slice(2));
            parags.innerHTML = s;*/


        // <(span).*?>([\s\S]*?)<\/?(\/span).*?>
}

function toggleClass(element, className) {
    var classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;

    for(; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
        classes.push(className);
    }

    element.className = classes.join(' ');

    //console.log(element.classList.value);
}

ulElem.onclick = function (e) {
    e.preventDefault();
    var regex;
    var s;
    var elem = e.target;
    if(elem.id!="ulist"){
        toggleClass(elem, active);

        if (elem.classList.value.length > 5){
                    s = parags.innerHTML;
                    regex = new RegExp(''+elem.id.slice(2)+'','ig');
                    s = s.replace(regex, "<span id='s_"+elem.id.slice(2)+"' class='highlight'>"+elem.id.slice(2)+"</span>");
                    parags.innerHTML = s;
        }
        else {  
                    s = parags.innerHTML;
                    regex = new RegExp('<(span id="s_'+elem.id.slice(2)+'").*?>(\\w.*?)<\/?(\/span).*?>','g');
                    //console.log(regex);
                    s = s.replace(regex, elem.id.slice(2));
                    parags.innerHTML = s;
        }
    }
};


function times(res) {
    return res > 1 ? "times" : "time";
}

function resizer() {
    var mq = window.matchMedia('all and (max-width: 650px)');
    if (mq.matches) {
        // the width of browser is more then 650px
        document.getElementById("input").cols = "40";
    }
    mq.addListener(function(changed) {
        if (!changed.matches) {
            // the width of browser is less than 650px
            document.getElementById("input").cols = "70";
        }
    });
}

window.setInterval(resizer(), 150);
