
      var container;
			var camera, scene, renderer;
      var OBJLoaded; 
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

      const TEXTURE_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366';

			init();
			animate();

			function init() {
      
				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 750;
				// scene

				scene = new THREE.Scene();

        //LIGHTS
           
        var ambient = new THREE.AmbientLight( 0x0b6389 );
				scene.add( ambient );
        
				var directionalLight = new THREE.DirectionalLight( 0x95b4c1);
				directionalLight.position.set( 1, 0, 1 );
				scene.add( directionalLight );
        
        var hemilight = new THREE.HemisphereLight( 0xffffbb, 0x0f313f, 0.5 );
        scene.add( hemilight );
      
				// texture

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				var texture = new THREE.Texture();

				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};

				// model
      loader = new THREE.TextureLoader();
      loader.setCrossOrigin( 'https://s.codepen.io' );
      var texture = loader.load( TEXTURE_PATH + '/statue_texture.jpg' );

				var loader = new THREE.OBJLoader( manager );
				loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/statue.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture;

						}

					} );
        object.position.y = 0;
				object.position.x = 0;	
        object.scale.set(2.5,2.5,2.5);
          OBJLoaded = object;
					scene.add( object );

				}, onProgress, onError );
        
				//BACKGROUND
        
    var geometry1 = new THREE.CylinderBufferGeometry( 10, 10, 20, 32 );
    geometry1.scale(-80, 80, 80);
        
  THREE.TextureLoader.prototype.crossOrigin = 'anonymous';

    var material1 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/a18.png' )
    });
     
         mesh1 = new THREE.Mesh(geometry1, material1);
         scene.add(mesh1);
         mesh1.position.z = -100;
        
        //
				renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor( 0x000000, 0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {
				requestAnimationFrame( animate );
        OBJLoaded.rotation.y += 0.003;
        mesh1.rotation.y += 0.002;

				render();

			}

			function render() {

				//camera.lookAt( scene.position );

				renderer.render( scene, camera );
        renderer.domElement.id = 'c';
       
			}

