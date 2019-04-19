
<template>
  <div>
    <div class="button" @click="changeView">change view</div>
    <div ref="threecontainer" class="threecontainer"></div>
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import FBXLoader from 'three-fbxloader-offical'

export default {
  data(){
    return {
        camera:null,
        scene:null,
        renderer:null,
        geometry:null,
        material:null,
        mesh:null,
        controls:null,
        light:null,
        ambientlight:null,
        fbxloader:null,
        skymesh:null,
        skygeometry:null,
        skymaterial:null
    }
  },
  created(){
    
  },
  mounted(){
    this.init();
  },
  methods:{
    changeView:function(){
      this.camera.position.set(-1,.5,-2);
      this.camera.lookAt(new THREE.Vector3(-1,.5,-2));
    },
    init: function() {
       
        this.camera = new THREE.PerspectiveCamera( 50, this.$refs.threecontainer.clientWidth / this.$refs.threecontainer.clientHeight, 0.01, 200 );
        this.camera.position.set( .2, .5, .25 );
        // this.camera.position.z = .25;
        // this.camera.position.x = .2;
        // this.camera.position.y = .5;
       
        this.scene = new THREE.Scene();

        this.light = new THREE.PointLight( 0xffffff, 1.9 )
        this.light.position.set(-1,.5,-2);
        this.ambientlight	= new THREE.AmbientLight( 0xffffff, .6 );

        
        //SKY
        this.skygeometry = new THREE.SphereGeometry( 100, 16, 16 );
        this.skymaterial  = new THREE.MeshBasicMaterial({
          map : new THREE.TextureLoader().load(require('@/assets/images/skymap.jpg'), (texture) => {}),
          side : THREE.BackSide
        })
        this.skymesh = new THREE.Mesh(this.skygeometry, this.skymaterial);
        this.skymesh.rotation.y = 1;
        this.skymesh.rotation.x = 4.2; 
        this.scene.add( this.skymesh );
        
         this.scene.add( this.light );
         this.scene.add( this.ambientlight );
        this.fbxloader = new THREE.FBXLoader();


        this.fbxloader.load(require('@/assets/3dmodels/spitfire.fbx'), (object3d) => {

            object3d.scale.set(.0009,.0009,.0009);

            var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load(require('@/assets/images/spitfire_d.png'));
            var mMap = textureLoader.load(require('@/assets/images/spitfire_m_klein.png'));
            var aoMap = textureLoader.load(require('@/assets/images/spitfire_ao_klein.png'));
            var nMap = textureLoader.load(require('@/assets/images/spitfire_n_klein.png'));
            var rMap = textureLoader.load(require('@/assets/images/spitfire_r_klein.png'));

            var material = new THREE.MeshPhongMaterial({
                map: map, 
                metalnessMap:mMap,
                metalness:2,
                roughnessMap:rMap,
                roughness:10,
                normalMap:nMap,
                normalScale:new THREE.Vector2(.2,.2),
                aoMap:aoMap,
                aoMapIntensity:1.5
            });

            object3d.traverse( function ( node ) {
              
              if ( node.isMesh ) {
                // console.log(node.material);
                node.material = material;
              }

            } );


           this.scene.add(object3d);

           
            
        });
        
        

        this.renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha:true
        });

        this.renderer.setSize(this.$refs.threecontainer.clientWidth, this.$refs.threecontainer.clientHeight);
        this.$refs.threecontainer.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = .3;
        this.controls.maxDistance = 40;

        this.animate();

    },
    
    animate: function() {
        requestAnimationFrame( ()=>{this.animate()} );
          this.renderer.render( this.scene, this.camera );
    }
  }
}
</script>

<style scoped lang="scss">
.threecontainer{
  width:100vw;
  height:100vh;
  overflow:hidden;
}

.button{
  position:absolute;
  bottom:10px;
}
</style>
