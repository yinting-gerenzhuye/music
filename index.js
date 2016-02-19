document.addEventListener('readystatechange',function(){
	if(document.readyState=='complete'){
		//autio对象的属性方法和事件
		var audio=document.querySelector('audio');
 		var divsonglist = document.querySelector('#divsonglist');
		var musicname = document.querySelector('.music_name');
		var geshouname = document.querySelector('.singer_name');
		var ptime = document.querySelector('#ptime');
		var op = document.querySelector('#music_op');
 		var spansongnum1 = document.querySelector('#spansongnum1');
		var prevbt = document.querySelector('.prev_bt');
		var nextbt = document.querySelector('.next_bt');
  /*音乐列表*/ 
 var yinyueku=[
	{name:'有点甜',src:'sweet.mp3',geshou:'汪苏泷',duration:'3:55'},
	{name:'st',src:'1.mp3',geshou:'王俊凯',duration:'4:14'},
	{name:'不能说的秘密',src:'3.mp3',geshou:'周杰伦',duration:'4:56'}
 
 ]
//没有歌曲的时候的状态
var uireset=function(){
	downloadbar.style.width=0;
	spanprogress_op.style.left=0;
	ptime.innerHTML='';
	audio.src='';
	musicname.innerHTML='<span>听我想听的歌！</span>';
	geshouname.innerHTML='<span>QQ音乐</span>';
	btnplay.classList.remove('pause_bt');
	btnplay.classList.add('pause_bt');
 }
var createlist=function(){
	var el='';
	spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>'
	spansongnum1.onclick=function(){
		if(divplayframe.style.display=='block'){
			divplayframe.style.display='none';
		}else{
			divplayframe.style.display='block';
		}
	}
	if(yinyueku.length===0){
		divsonglist.firstElementChild.innerHTML='';
	}else{
		for(var i=0;i<yinyueku.length;i++){
			var ac=(i===songindex)?'play_current':'';
			el+= '<li data-index="'+i+'"class="'+ac+'"><strong class="music_name" title="'+yinyueku[i].name+'">'+yinyueku[i].name+'</strong><strong class="singer_name" title="'+yinyueku[i].geshou+'">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
   	divsonglist.firstElementChild.innerHTML=el;//把每一条记录都追加进去；
		}

	}
 }
createlist();
//清空列表
 clear_list.onclick=function(){
	yinyueku=[];
	uireset();
	createlist();
}
var btndel;
var delsong = function(){
	btndel = document.querySelectorAll('.btn_del');
	for(var i = 0;i < btndel.length;i++){
		btndel[i].index = i;
		btndel[i].onclick = function(ev){
			ev.stopPropagation();
			if(songindex > this.index){
				songindex -=1;
			}else if(songindex == this.index){
				if(songindex != yinyueku.length-1){
					audio.src = yinyueku[songindex+1].src;
					audio.play();
					musicname.innerHTML = yinyueku[songindex+1].name;
					musicname.title = yinyueku[songindex+1].name;
					geshouname.innerHTML = yinyueku[songindex+1].geshou;
					geshouname.title = yinyueku[songindex+1].geshou;
					ptime.innerHTML = yinyueku[songindex+1].duration;
				}else if(songindex == yinyueku.length-1 && songindex !=0){
					songindex = 0;
					audio.src = yinyueku[0].src;
					audio.play();
					musicname.innerHTML = yinyueku[0].name;
					musicname.title = yinyueku[0].name;
					geshouname.innerHTML = yinyueku[0].geshou;
					geshouname.title = yinyueku[0].geshou;
					ptime.innerHTML = yinyueku[0].duration;
				}else{
					audio.src = '';
					uireset();
				}
			}
			var newlist = [];
			for(var j = 0;j < yinyueku.length;j++){
				if(yinyueku[this.index] != yinyueku[j]){
					newlist.push(yinyueku[j]);
				}
			} 
			yinyueku = newlist;
			createlist();
			songlists();
		}
	}
}
delsong(); 
//歌曲播放列表
var songlist;
var songindex;//当前歌曲的下标
var songlists=function(){
	songlist=divsonglist.firstElementChild.children;
	for(var i=0;i<songlist.length;i++){
 		songlist[i].index=i;//要点击的那个
		songlist[i].onclick=function(){
			songindex=this.index;
			onsongchange();
			audio.play();
	 	}
	  	songlist[i].onmouseover=function(){
	  		this.classList.add('play_hover');
	 	}

	 	songlist[i].onmouseout=function(){
	 		for(var i=0;i<songlist.length;i++){
	 			songlist[i].classList.remove('play_hover');
	 		}
		}
 	}
	delsong();
 }
 songlists();


 //将面板打开或者关闭
 btnfold.onclick=function(){
 	if(divplayer.style.left=='0px'){
 		divplayer.style.left='-540px';
 		this.title='点击展开';
 		divplayer.classList.add('m_player_folded');
 		divplayer.classList.add('m_player_playing')
 	}else{
 		divplayer.style.left=0;
 		this.title='点击收起';
 	}
 }


var onsongchange=function(){
	var song='';
 	for(var i=0;i<songlist.length;i++){//清除所有的样式，默认样式
		songlist[i].classList.remove('play_current');
 	}
	audio.src = yinyueku[songlist[songindex].getAttribute('data-index')].src;
 	songlist[songindex].classList.add('play_current');
 	musicname.innerHTML=yinyueku[songindex].name;
 	geshouname.innerHTML = yinyueku[songindex].geshou;
	ptime.innerHTML = yinyueku[songindex].duration;
	//op.style.display='block';
} 
  
var nextSong=function(){
 	if(songindex===undefined){
		return;
	}
	if(songindex===UNORDERED){
		randomSong();
		return;
	}
 	songindex=(songindex==yinyueku.length-1)?0:songindex+=1;
	onsongchange();
	audio.play();
} 

var prevSong =function(){
	if(songindex===undefined){
		return;
	}
	if(songindex===UNORDERED){
		randomSong();
		return;
	}
 	songindex=(songindex===0)?2:songindex-=1;
	onsongchange();
	audio.play();
}
nextbt.onclick=nextSong;
prevbt.onclick=prevSong;

 //处理播放模式的
 //变量为全大写的表示一个常量
 btnPlayway.onclick=function(){
 	divselect.style.display="block";
 }
var CYCLE_SINGLE = 1,ORDERED = 2,CYCLE = 3,UNORDERED = 4;
 var currentbofangmoshi=CYCLE;

 bofangmoshi=function(num){
	currentbofangmoshi=num;
 	divselect.style.display="none";
 	if(bofangmoshi===1){
 		audio.loop=true;
 	}else{
 		audio.loop=false;
 	}
 	var data = [
				{classname:'cycle_single_bt',modename:'单曲循环'},
				{classname:'ordered_bt',modename:'顺序播放'},
				{classname:'cycle_bt',modename:'列表循环'},
				{classname:'unordered_bt',modename:'随机播放'}
	]
	btnPlayway.className = data[num-1].classname;
	btnPlayway.innerHTML = '<span>'+data[num-1].modename+'</span>'
	btnPlayway.title = data[num-1].modename;
	divselect.style.display = 'none';
  }

  		/*播放暂停的处理*/
		btnplay.onclick=function(){
 			if(audio.paused==true){   //布尔值不加引号
				audio.play();
  			}else{
				audio.pause();
			}
  		}
  		audio.onplay=function(){
 			 btnplay.classList.add('pause_bt');
 		}
 		audio.onpause=function(){
 			 btnplay.classList.add('play_bt');
 			 btnplay.classList.remove('pause_bt');
  		}
		
		/*播放进度的处理*/
		var state=document.querySelector('#spanplayer_bgbar');//长条
        var spanplaybar=document.querySelector('#spanplaybar');//应经播放的   进度
        var stateposition=document.querySelector('#spanprogress_op');//小圆点
        var tips=document.querySelector('.time_show');//提示时间
 		
		/*公共函数部分*/
		 var zhuanhua=function(time){
			var az=parseInt(time);
			var min=parseInt(az/60);
			var s=az%60;
			return min+':'+s;
 		} 
 		state.onclick = function(ev){
			audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}
		spanplaybar.onclick = function(ev){
			audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}

		stateposition.onclick = function(ev){
			ev.stopPropagation();
		} 
		audio.ontimeupdate = function(){
			var ste = state.offsetWidth * (audio.currentTime/audio.duration) - stateposition.offsetWidth/2;
			stateposition.style.left = ste + 'px';
			spanplaybar.style.width = state.offsetWidth * (audio.currentTime/audio.duration) + 'px';
			if(audio.ended){
				if(currentbofangmoshi === CYCLE){
					nextSong();
				}else if(currentbofangmoshi === ORDERED){
					if(songindex !== yinyueku.length-1){
						nextSong();
					}
				}else if(currentbofangmoshi === UNORDERED){
					randomSong();
				}
			}
		}
 		 //鼠标在进度条上的显示
 		state.onmouseover=spanplaybar.onmouseover=function(ev){
            tips.style.display="block";
            tips.style.left=ev.offsetX-tips.offsetWidth/2+'px';
            var time=ev.offsetX/this.offsetWidth*audio.duration;
            tips.innerHTML=zhuanhua(time);
        }
        stateposition.onmouseover = function(ev){
			ev.stopPropagation();
		}
		state.onmousemove = spanplaybar.onmousemove = function(ev){
			var time = audio.duration*ev.offsetX/state.offsetWidth;
			tips.innerHTML = zhuanhua(time);
			tips.style.left = ev.offsetX - tips.offsetWidth/2 + 'px';
		}

 		state.onmouseout = function(ev){
			tips.style.display = 'none';
		}
 
  		var randomSong=function(){
  			var oldindex=songindex;
			songindex=Math.floor(Math.random()*yinyueku.length);

			while(oldindex === songindex){
				songindex = Math.floor(Math.random()*yinyueku.length);
			}
			onsongchange();
			audio.play();
			
		}

 		/*音量的处理*/
 		spanvolume.onclick=function(ev){
			var v=ev.offsetX/this.offsetWidth;
			audio.volume=v;
 		}
 		spanvolumeop.onclick=function(ev){
     		ev.stopPropagation();
     	}

 		audio.onvolumechange=function(){
     		if(audio.volume===0){
     			spanmute.className='volume_mute';
     		}else{
     			spanmute.className='volume_icon';
     		}
     		spanvolumeop.style.left=audio.volume*100+'%';  
     		spanvolumebar.style.width=audio.volume*100+'%';  
     	}


     	spanmute.onclick=(function(){
			var oldvolume;
			return function(){
				if(audio.volume!=0){
					oldvolume=audio.volume;
					audio.volume=0;
				}else{
					audio.volume=oldvolume;
				}
			}
		})();

}
},false);