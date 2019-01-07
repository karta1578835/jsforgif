class Rect {
	constructor (center, sizes,name,number,resCoeff) {
	this.type = 'rect';
	this.normal = new THREE.Vector3(0,1,0)
	this.pc = new THREE.Vector3(0,1,0)
	this.obj = new THREE.Object3D();
  	this.center = center;
    this.axes = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0)]
    this.sizes = sizes;
	this.name = name||'origin'
	this.number = number||"0";
	this.resCoeff = resCoeff||0.9
/* 
 		this.max = center.clone().add ( this.axes[0].clone().multiplyScalar(sizes[0]/2) )
              .add( this.axes[1].clone().multiplyScalar(sizes[1]/2) );
    this.min = center.clone().add (center.clone().sub(this.max));     
*/    

	let loader = new THREE.TextureLoader()
	loader.crossOrigin = '';
	
	var texture = loader.load('https://i.imgur.com/qfXqQSD.jpg');
	texture.repeat.set(sizes[0]/15, 1);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	
	THREE.ImageUtils.crossOrigin = '';
    this.mesh = new THREE.Mesh (new THREE.PlaneGeometry (sizes[0],sizes[1]), new THREE.MeshBasicMaterial({
	side: THREE.DoubleSide,
    transparent: true, // key to cutout texture
    map: texture
	}))
    //this.mesh.position.copy (center);
	this.mesh.name = this.name;
	this.mesh.number = this.number
	this.obj.name = this.name;
	this.obj.add (this.mesh);
    scene.add (this.obj)
  }
  
  moveTo (x,y) {
	
	this.pc.set (x, y, 0);
    //this.mesh.position.copy (this.pc);
	this.obj.position.copy (this.pc);
	this.center.copy (this.pc);
	//console.log(this.center);
  }
  rotateTo (theta) {  // about +Z
  
  	let euler = new THREE.Euler(0,0,theta)
	
  	this.axes[0].copy (new THREE.Vector3(1,0,0).applyEuler (euler))
  	this.axes[1].copy (new THREE.Vector3(0,1,0).applyEuler (euler))
		//this.mesh.rotation.z = theta;
		this.obj.rotation.z = theta;
		this.normal.applyEuler (new THREE.Euler (0,0,theta))

		
  }
  
}