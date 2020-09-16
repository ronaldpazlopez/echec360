var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
btnScene="";
booClick=true;
booBtn=false;
var btnPrev;
var sphereScene;
var isUsrIntrtg = false,isUsrMvg=false, mousex=0, mousey=0,  projector;
var group
var sizeButton=2;
 var textureObject;
var raycaster; // create once
var mouse; // create once
var plane1, plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu,point1,point2;
// Define the standard global variables
var container, scene, camera, renderer;
var listener;
var sound, sound1, sound2,sound3,sound4,sound5,sound6, sound7, sound8;
var soundPrev = sound1; 
var soundActual=sound1;
var texturePoint;
var clock = new THREE.Clock();
var video;
var booSound=true;
var booScene=true;
var  control;
var t=new TimelineMax();
var booMenu=true;
preloader.style.display = 'none';



var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {
        preloader.style.display = 'block';
        init();
        animate(); 
    });



////////////////  botoneria  menu ////

var btMenu= document.getElementById( 'btMenu' );  
btMenu.style.display = 'none';

var bts= document.getElementById( 'menu' );  
//bts.style.display = 'none';



function muestra_oculta(id){  
    /*
  if (document.getElementById){ //se obtiene el id
      var el = document.getElementById(id); 
      el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
  }
   */
   bts.style.display = 'block'; 
   btMenu.style.pointerEvents = 'none';
  if(booMenu){ 
      //abre      
        booMenu=false;
        t.to(menu, 0.5, { alpha:1,  onComplete:endAnimeMenu,  onCompleteParams:[id], ease: Power2.easeInOut})
       .play()
   }else  { 
       //cierra
       booMenu=true;
       t.to(menu, 0.5, { alpha:0, onComplete:endAnimeMenu,  onCompleteParams:[id], ease: Power2.easeInOut})
       .play()

   }
    
}

function endAnimeMenu(btmenu) {
    
  
    btMenu.style.pointerEvents = 'auto';
   console.log("fin") 
    if(booMenu){
      
         //bts.style.display ='none';
         bts.style.pointerEvents = 'none';
    }else{
       
        //bts.style.display = 'block'  ; 
         bts.style.pointerEvents = 'auto';
    } 
    
}


window.onload = function(){
    //muestra_oculta('menu');
}



////////////////////



function init() {

    
  var d = document.getElementById ("play");
  if (d) {d.parentNode.removeChild (d); }     
    
  // Scene
  scene = new THREE.Scene();
  group = new THREE.Group();

  // Camera
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var viewAngle = 75;
  var nearDistance = 0.1;
  var farDistance = 1000;
        
  camera = new THREE.PerspectiveCamera(viewAngle, screenWidth / screenHeight, nearDistance, farDistance);
  scene.add(camera);
  camera.position.set(0, 0, 7);
  camera.lookAt(scene.position);
  
  raycaster = new THREE.Raycaster(); // create once
  mouse = new THREE.Vector2(); // create once
    
  document.addEventListener( 'mouseup', onDctMseUp, false );   
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener("orientationchange", onWindowResize, false );    
  //EventBus.addEventListener("callback_event", callback);
  EventBus.addEventListener("custom_event", clickTouch);
 
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
   renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(screenWidth, screenHeight, false);
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

 /////// manager carga de imagenes
    
  loadManager3 = new THREE.LoadingManager();
  loaderTexture = new THREE.TextureLoader(loadManager3);
   
      // loader manager
  loadManager3.onProgress = function(url, itemsLoaded, itemsTotal) {
    //console.log('loading texture ' + url + ' ' + (itemsLoaded / itemsTotal * 100) + '%');
  };
    
  loadManager3.onError = function(url) {
    console.log('Error loading texture: ' + url);
  };

   
  //////////// //audio fondo    
    var listeneraudio = new THREE.AudioListener();
    //camera.add( listeneraudio ); 
    
    //sound = new THREE.Audio( listeneraudio ); 
    sound = new THREE.PositionalAudio( listeneraudio );
    var audioLoader = new THREE.AudioLoader();    
    
    audioLoader.load( 'audio/daydream_bliss.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setRefDistance( 20 );
        sound.setLoop( true );
        sound.setVolume( 0.3 );
        sound.play();
    });   
  
  var source = listeneraudio.context.createBufferSource();
  source.connect(listeneraudio.context.destination);
  source.start();


    //////////////////// carga de texturas
    
    
  textureObject = [  
   //new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg', onLoadScene ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_4.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_5.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_1.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg' ),
      
   new THREE.TextureLoader(loadManager3).load( 'img/btn5.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/btn6.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn7.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn8.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn1.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/btn4.jpg' ),
      
   new THREE.TextureLoader(loadManager3).load( 'img/btnmenu2.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/point2.png' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1_1.jpg' )  

  ];
    
   
  //loadManager3.onLoad = (buffer) => {  
  loadManager3.onLoad = function() {  
    
    btMenu.style.display = 'block';
    console.log("cargo textura")       
    materialsObject = [
      new THREE.MeshBasicMaterial({map: textureObject[0]}),
      new THREE.MeshBasicMaterial({map: textureObject[1]}),
      new THREE.MeshBasicMaterial({map: textureObject[2]}),
      new THREE.MeshBasicMaterial({map: textureObject[3]}),
      new THREE.MeshBasicMaterial({map: textureObject[4]}),
      new THREE.MeshBasicMaterial({map: textureObject[5]}),
      new THREE.MeshBasicMaterial({map: textureObject[6]}),
      new THREE.MeshBasicMaterial({map: textureObject[7]}),   
        
      new THREE.MeshBasicMaterial({map: textureObject[8]}),
      new THREE.MeshBasicMaterial({map: textureObject[9]}),
      new THREE.MeshBasicMaterial({map: textureObject[10]}),
      new THREE.MeshBasicMaterial({map: textureObject[11]}),
      new THREE.MeshBasicMaterial({map: textureObject[12]}),
      new THREE.MeshBasicMaterial({map: textureObject[13]}),
      new THREE.MeshBasicMaterial({map: textureObject[14]}),
      new THREE.MeshBasicMaterial({map: textureObject[15]}),
        
      new THREE.MeshBasicMaterial({map: textureObject[16]})   
    ];
     
      onWindowResize();     
      preloader.style.display = 'none';
    
      
      
      
    //// esfera para los escenarios /////  
    var geometrySphere = new THREE.SphereGeometry( 500, 60, 40 );
    geometrySphere.scale( - 1, 1, 1 );      
   /* var materialSphere = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'img/s_1_opt.jpg' )       
    } );  
    */            
    //sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphereScene = new THREE.Mesh( geometrySphere, materialsObject [0]);       
    sphereScene.position.x = 0;
    sphereScene.position.y = 0;
    sphereScene.position.z = 0;    
    sphereScene.rotation.y = (0.5 * Math.PI);
    sphereScene.name='sphereScene';
      sphereScene.scale.set(0.1,0.1,0.1)    
    scene.add( sphereScene );
    
  
    //// botones ////  
    var geometryPlane = new THREE.PlaneGeometry(3, 3, 0);    
      /*var material = new THREE.MeshBasicMaterial({
      map: texture
    });*/
      
    plane5 = new THREE.Mesh(geometryPlane, materialsObject[12]);
    plane5.position.x = 4.8;
    plane5.position.y = 2.2;
    plane5.position.z = -5.2;   
    plane5.name='btn1';
    //scene.add(plane5);
      
    plane6 = new THREE.Mesh(geometryPlane, materialsObject[13]);
    plane6.position.x = 1.6;
    plane6.position.y = 2.2;;
    plane6.position.z = -5.2;   
    plane6.name='btn2';
    //scene.add(plane6);
          
    plane7 = new THREE.Mesh(geometryPlane, materialsObject[14]);
    plane7.position.x = - 1.6;
    plane7.position.y = 2.2;;
    plane7.position.z = -5.2;      
    plane7.name='btn3';
    //scene.add(plane7);
      
    plane8 = new THREE.Mesh(geometryPlane, materialsObject[15]);
    plane8.position.x =-4.8;
    plane8.position.y = 2.2;;
    plane8.position.z =  -5.2;   
    plane8.name='btn4';
    //scene.add(plane8);
      
    plane1 = new THREE.Mesh(geometryPlane, materialsObject[8]);
    plane1.position.x = -4.8;
    plane1.position.y = -1;
    plane1.position.z = -5.2;    
    plane1.name='btn5';
    //scene.add(plane1);      
    
    plane2 = new THREE.Mesh(geometryPlane, materialsObject[9]);
    plane2.position.x = -1.6;
    plane2.position.y = -1;
    plane2.position.z = -5.2;     
    plane2.name='btn6';
    //scene.add(plane2);      
      
    plane3 = new THREE.Mesh(geometryPlane, materialsObject[10]);
    plane3.position.x = 1.6;
    plane3.position.y = -1;
    plane3.position.z = -5.2;      
    plane3.name='btn7';
    //scene.add(plane3);
     
    plane4 = new THREE.Mesh(geometryPlane, materialsObject[11]);
    plane4.position.x = 4.8;
    plane4.position.y = -1;
    plane4.position.z = -5.2;     
    plane4.name='btn8';
      
    plane4.matrixAutoUpdate = false;
    plane4.updateMatrix();      
    //scene.add(plane4);  
    
      
      
   /*   
    var geometryPlaneMenu = new THREE.PlaneGeometry(3.5, 1.2, 0);   
    planemenu = new THREE.Mesh(geometryPlaneMenu, materialsObject[16]);
    planemenu.position.x = -6;
    planemenu.position.y = -11;
    planemenu.position.z = -20;    
       planemenu.rotation.y = (0.5 * Math.PI);
    planemenu.name='btnmenu';
    scene.add(planemenu);
    */

      
      
      
      
	texturePoint = new TextureAnimator(  textureObject[17], 38, 1, 38,100 ); // texture, #horiz, #vert, #total, duration.
	var pointMaterial = new THREE.MeshBasicMaterial( { map: textureObject[17], side:THREE.DoubleSide } );      
    pointMaterial.transparent = true;      
	var pointGeometry = new THREE.PlaneGeometry(3, 3, 2, 2);
      
      
	point1 = new THREE.Mesh(pointGeometry, pointMaterial);
	point1.position.set(16,0,4);
 
    point1.rotation.y = (0.5 * Math.PI);
    point1.name='point1';
	scene.add(point1);    
      
      
	var pointGeometry2 = new THREE.PlaneGeometry(4, 4, 2, 2);
	point2 = new THREE.Mesh(pointGeometry2, pointMaterial);
	//point2.position.set(-5,0,-28);
    point2.position.set(-5,-500,-28);
    point2.name='point2';
	scene.add(point2);
    point2.visible=false;
      
     

      
     
    /////////////// VIDEO  ////////////////////////  
     
      
      
    /////////  audio robot 1
    var listAudioRobot1 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound1 = new THREE.PositionalAudio( listAudioRobot1 );    
    var audioLoader1 = new THREE.AudioLoader(); 
      
    audioLoader1.load( 'audio/robot1.mp3', function( buffer ) {
        sound1.setBuffer( buffer );
         sound1.setRefDistance( 20 );
        //sound1.setLoop( true );
        sound1.setVolume( 1 );
        soundActual=sound1;
          setTimeout(playSound, 1500);
       
    });
  
    var source1 = listAudioRobot1.context.createBufferSource();
    source1.connect(listAudioRobot1.context.destination);
    source1.start(); 
      
        
    /////////  audio robot 2
    var listAudioRobot2 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound2= new THREE.PositionalAudio( listAudioRobot2 );    
    var audioLoader2 = new THREE.AudioLoader(); 
      
    audioLoader2.load( 'audio/robot2.mp3', function( buffer ) {
        sound2.setBuffer( buffer );
         sound2.setRefDistance( 20 );        
        sound2.setVolume( 1 );       
    });
  
    var source2 = listAudioRobot2.context.createBufferSource();
    source2.connect(listAudioRobot2.context.destination);
    source2.start();  
      
    /////////  audio robot 3
    var listAudioRobot3 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound3= new THREE.PositionalAudio( listAudioRobot3 );    
    var audioLoader3 = new THREE.AudioLoader(); 
      
    audioLoader3.load( 'audio/robot3.mp3', function( buffer ) {
        sound3.setBuffer( buffer );
         sound3.setRefDistance( 20 );        
        sound3.setVolume( 1 );       
    });
  
    var source3 = listAudioRobot3.context.createBufferSource();
    source3.connect(listAudioRobot3.context.destination);
    source3.start();   
      
    /////////  audio robot 4
    var listAudioRobot4 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound4= new THREE.PositionalAudio( listAudioRobot4 );    
    var audioLoader4 = new THREE.AudioLoader(); 
      
    audioLoader4.load( 'audio/robot4.mp3', function( buffer ) {
        sound4.setBuffer( buffer );
         sound4.setRefDistance( 20 );        
        sound4.setVolume( 1 );       
    });
  
    var source4 = listAudioRobot4.context.createBufferSource();
    source4.connect(listAudioRobot4.context.destination);
    source4.start();   
     
    
    /////////  audio robot 3
    var listAudioRobot5 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound5= new THREE.PositionalAudio( listAudioRobot5 );    
    var audioLoader5 = new THREE.AudioLoader(); 
      
    audioLoader5.load( 'audio/robot5.mp3', function( buffer ) {
        sound5.setBuffer( buffer );
         sound5.setRefDistance( 20 );        
        sound5.setVolume( 1 );       
    });
  
    var source5 = listAudioRobot5.context.createBufferSource();
    source5.connect(listAudioRobot5.context.destination);
    source5.start();   
      
    ////////////////////////
   
 
  
  }; 
    
       
function onLoad(texture) {
      
    var geometry = new THREE.PlaneGeometry(2, 2, 0);
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
   // render();
  }

  // Rendering function
  
    /*
  var render = function() {
    renderer.render(scene, camera);
  };
    */    
    
  control = new THREE.OrbitControls(camera, renderer.domElement)
};



function goButton( btn )
{
    
   
   bts.style.pointerEvents = 'none';
    
     muestra_oculta('menu');
    
    console.log("apreto boton: "+btn)
     booClick=true;
   
        
    sphereScene.scale.set(0.1,0.1,0.1);
    TweenMax.to( sphereScene.scale, 1, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        onComplete:endAnimeSphere,
        onCompleteParams:[btn],
        ease: Power2.easeInOut
    } );

  
        
     
          
};




function intersectsButton( intersects )
{
         //console.log("xxxxxx: "+group.children[3].name)
    
	for(var j=0;j<intersects.length;j++){  
      
	/*	console.log(intersects[j].object.name+' clicked at '+intersects[j].point.x+' '+intersects[j].point.y+' '+intersects[j].point.z);*/         
      
        if(intersects[j].object.name == 'point1'){ 
           
          //  console.log("btn nombre:"+intersects[j].object.name);
             sphereScene.scale.set(0.1,0.1,0.1);
            TweenMax.to( sphereScene.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete:endAnimeSphere,
                onCompleteParams:[intersects[j].object.name],
                ease: Power2.easeInOut
            } );
                
         }	
        
        
        if(intersects[j].object.name == 'point2'){ 
           
        //    console.log("btn nombre:"+intersects[j].object.name);
             sphereScene.scale.set(0.1,0.1,0.1);
            TweenMax.to( sphereScene.scale, 1, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete:endAnimeSphere,
                onCompleteParams:[intersects[j].object.name],
                ease: Power2.easeInOut
            } );
                
         }	
        
    }	    
};



//see Console log for intersection coordinates
function onDctMseUp( event )
{
	isUsrIntrtg = false;	
	var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );  
    
    var intersects = raycaster.intersectObjects([point1,point2]);
    
    intersectsButton(intersects);
	isUsrMvg=false;
}

function clickTouch(event, pX, pY)
{    
    var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( pX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( pY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );    
    //var intersects = raycaster.intersectObjects( scene.children );	
     var intersects = raycaster.intersectObjects([point1,point2]);
  
     intersectsButton(intersects);	
	isUsrMvg=false
}

function endAnimeSphere(nameButton) {
    
      
    control.reset();
    camera.position.set(0, 0, 5);
    camera.updateProjectionMatrix();
    control.update();
    
    
     clickScene(nameButton);
  
     sphereScene.scale.set(0.1,0.1,0.1);  
    if(nameButton != 'point1'){
       booBtn=false;   
    } 
 }   

function animar() {
    
    if(booBtn){
 
            TweenMax.to( group.position, 0.6, {
                x: 0,
                y: 1,
                z: 0,
                onComplete:endonAnimeMenu,
                ease: Power2.easeInOut
            } );
 
    }else{
         console.log(" desaparecer menu");
           TweenMax.to( group.position, 0.6, {
                x: 0,
                y: -0.5,
                z: 0,
                onComplete:endoffAnimeMenu,
                ease: Power2.easeInOut
            } );
        
        } 
}    
function endoffAnimeMenu() {
    
}

function endonAnimeMenu() {
  
    
}


function playSound() {
       
    
    soundActual.play();    
}

function clickScene( nameBoton){   
    //console.log("carga 1")
    var nbt;
    point1.visible=false;
    point2.visible=false;
    point2.position.set(-5,-50,-28);
    point1.position.set(16,-50,4);

    
    if(booClick){
       // console.log("carga 2")
        btnScene=nameBoton;  
        
        
        if(soundActual != undefined){     
           soundActual.play();
            soundActual.stop();
        }
        
             
        booScene=false;
                  
        switch ( nameBoton ) {
			case 'btn1':			
                 sphereScene.rotation.y = (0.5 * Math.PI);          
                nbt=0;
                point1.visible=true;  
                point1.position.set(16,0,4);                
                soundPrev=sound1;
                soundActual=sound1;
                setTimeout(playSound, 1500);
               
				break;
                

			case 'btn2':
				   sphereScene.rotation.y = (0.6 * Math.PI);
                nbt=1;
                 soundPrev=sound2;                
                  soundActual=sound2;
                setTimeout(playSound, 1500);
               
				break;

			case 'btn3':
			      sphereScene.rotation.y = (0.15 * Math.PI);
                nbt=2;
                soundPrev=sound3;      
                soundActual=sound3;
                 setTimeout(playSound, 1500);
               
				break;

			case 'btn4':
			    sphereScene.rotation.y = (0.8 * Math.PI);
                nbt=3;
                 soundPrev=sound4;      
                  soundActual=sound4;
                setTimeout(playSound, 1500);
              
				break;
            
            case 'btn5':
			  sphereScene.rotation.y = (1.6 * Math.PI);  
                nbt=4;
                soundPrev=sound5;      
                 soundActual=sound5;
                setTimeout(playSound, 1500);
              booScene=true;
                setTimeout(scene5_1, 6000);
                
				break;
            
            case 'btn6':
			 sphereScene.rotation.y = (0.5 * Math.PI);     
                nbt=5;
                soundPrev=sound5;      
                  soundActual=sound5;
                setTimeout(playSound, 1500);
               
				break;
            
            case 'btn7':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=6;
                 soundPrev=sound5;      
                  soundActual=sound5;
               
				break;
            
            case 'btn8':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=7;
                soundPrev=sound5;      
                  soundActual=sound5;
                setTimeout(playSound, 1500);
              
				break;
                
            case 'point1':
			 sphereScene.rotation.y = (0.4 * Math.PI); 
                nbt=18;
                point2.position.set(-5,0,-28);
                 point2.visible=true;
				break;   
            
            case 'point2':
			 sphereScene.rotation.y = (0.4 * Math.PI); 
                nbt=0;
                 point1.visible=true;
                 point1.position.set(16,0,4);
				break;                 
		} 
        
      materialsObject[0].map = textureObject[nbt];
    }   
    
}



function scene5_1() { 
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        
        sphereScene.rotation.y = (0.5 * Math.PI);   
        materialsObject[0].map = textureObject[5];
        setTimeout(scene5_2, 6000);
    }
}

function scene5_2() {    
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        
        sphereScene.rotation.y = (1.6 * Math.PI); 
        materialsObject[0].map = textureObject[6];
        setTimeout(scene5_3, 6000);
    }
}

function scene5_3() {    
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        sphereScene.rotation.y = (1.6 * Math.PI); 
        materialsObject[0].map = textureObject[7];
    }
}


function onLoadScene(texture) {    
       switch ( btnScene ) {
			case 'btn1':              
               sphereScene.rotation.y = (0.5 * Math.PI);            
				break;

			case 'btn2':				
                 sphereScene.rotation.y = (0.6 * Math.PI);
				break;

			case 'btn3':			    
                 sphereScene.rotation.y = (0.15 * Math.PI);
				break;

			case 'btn4':			    
                sphereScene.rotation.y = (0.8 * Math.PI);
				break;
            
            case 'btn5':
		       sphereScene.rotation.y = (1.6 * Math.PI);              
				break;
            
            case 'btn6':
			 sphereScene.rotation.y = (0.5 * Math.PI);     
				break;
            
            case 'btn7':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;
            
            case 'btn8':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;

		}
    console.log("--------> 3 cargo la imagen");
        materials[0].map = texture;
      
        booClick=true;
  }



function onWindowResize() {
 if (Math.abs(window.orientation) === 90) {
      
    } else {
        
        if (isMobile.apple.device || isMobile.android.device ) {
           
        }

       
    }
    
     /*           
    if(window.innerHeight > window.innerWidth){
        console.log("Please use Landscape!");
    }else{
        console.log("Please use PORTRAIT!"); 
        }
*/
  //  camera.aspect = window.innerWidth / window.innerHeight;
//    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function update() {
   // console.log("---->update")
    
    
    if(texturePoint!=undefined){
        var delta = clock.getDelta(); 
        texturePoint.update(1000 * delta);
   }
/*
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );
    */
    /*
    // distortion
    camera.position.copy( camera.target ).negate();    */

//    renderer.render( scene, camera );

}

function animate() {

    //requestAnimationFrame( animate );
    //controls.update();    
   // update();
    
     
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
    update();
     
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}