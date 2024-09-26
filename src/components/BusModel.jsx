"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDScene = () => {
  const containerRef = useRef(null);
  let object = null;

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 135); // Adjust this for better initial view of the model

    // Instantiate renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerRef.current.clientWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the 3D model using GLTFLoader
    const loader = new GLTFLoader();
    loader.load(
      `/bus4.glb`, // Update with your bus model path
      (gltf) => {
        object = gltf.scene;
        scene.add(object);
      },
      (xhr) => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
      (error) => console.error(error)
    );

    // Add lights
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 5);
    scene.add(ambientLight);

    // Setup OrbitControls to rotate and zoom around the model
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth damping (inertia)
    controls.dampingFactor = 0.1; // Adjust for smoother movement
    controls.enableZoom = false; // Disable zooming
    controls.target.set(0, 5, 0); // Focus the controls around the model's origin
    controls.update();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = containerRef.current.clientWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the model automatically
      if (object) {
        object.rotation.y += 0.002; // Adjust this value for rotation speed
      }

      controls.update(); // Update controls every frame
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '50vh' }}>
      {/* 3D Scene container */}
      <div ref={containerRef} style={{ width: '70vw' }} />
      
    
    
    
    
    
    
    
    
    
    
    </div>
  );
};

export default ThreeDScene;
