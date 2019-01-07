class Ball {
	constructor (center,rad=2,mass) {
  	this.type = 'ball';
	this.center = center;
    this.mass = mass||10;  // may need to differentiate basketball & bowling ball
  	this.rad = rad;
    
    // for dynamics calculation
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();

		this.obj = new THREE.Object3D();
    this.mesh = new THREE.Mesh (new THREE.CircleGeometry(rad,12), new THREE.MeshBasicMaterial({
	//wireframe:true,
	map: THREE.ImageUtils.loadTexture('https://i.imgur.com/w70lw8v.png')
	}))
	
    this.obj.add (this.mesh)
    scene.add (this.obj)
  }
  
  update(dt) {

		// after GLOBAL collision & contact
    
  	this.vel.add (this.force.clone().multiplyScalar(dt))
    this.pos.add (this.vel.clone().multiplyScalar(dt))

 		this.obj.position.copy (this.pos);
		this.center.copy (this.pos);
		//console.log(this.center);
  }

	// useless API
  moveTo(x,y) {
	
	this.center.x = x;
    this.center.y = y;
	this.obj.position.copy (this.center)  
  	this.pos.set (x,y,0)
  }
  delet(){
	  scene.remove(this.obj)
	  delete(this.obj)
  }
}