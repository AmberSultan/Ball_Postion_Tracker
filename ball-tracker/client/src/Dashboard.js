import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as THREE from 'three';

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        socket.on('positionUpdate', (data) => {
            setPosition(data);
        });

        return () => {
            socket.off('positionUpdate');
        };
    }, []);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);

            sphere.position.x = position.x;
            sphere.position.y = position.y;
            sphere.position.z = position.z;

            renderer.render(scene, camera);
        };

        animate();
    }, [position]);

    return <div />;
};

export default Dashboard;
