import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    CylinderGeometry,
    MeshBasicMaterial,
    Mesh,
    AmbientLight,
    PointLight,
    DoubleSide,
    Color,
    Float32BufferAttribute
} from 'three';

const CONFIG = {
    canvas: {
        fov: 75,
        near: 0.1,
        far: 1000,
        cameraPosition: 3
    },
    prism: {
        radius: 0.4,
        height: 0.8,
        segments: 3,
        rotationSpeed: 0.005
    },
    lights: {
        ambient: 0.2,
        front: 1
    }
};

const COLORS = {
    primaryPrimrose: new Color('#e9eb93'),
    lightPrimrose: new Color('#f0f2a1')
};

const createRenderer = (canvas) => {
    const renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    return renderer;
};

const createCamera = () => {
    const { fov, near, far, cameraPosition } = CONFIG.canvas;
    const camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
    camera.position.z = cameraPosition;
    return camera;
};

const createPrism = () => {
    const { radius, height, segments } = CONFIG.prism;
    const geometry = new CylinderGeometry(0, radius, height, segments, 1);
    
    const colorVariations = [
        new Color('#e9eb93'), 
        new Color('#d7d9a2'), 
        new Color('#c4cd91'),
        new Color('#b1be80'), 
        new Color('#9caa6f'), 
    ];

    const colors = [];

    for (let i = 0; i < geometry.attributes.position.count; i++) {
        const colorIndex = i % colorVariations.length;
        colors.push(colorVariations[colorIndex].r, colorVariations[colorIndex].g, colorVariations[colorIndex].b);
    }

    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1,
        side: DoubleSide
    });

    return new Mesh(geometry, material);
};

const createLights = () => {
    const { ambient, front } = CONFIG.lights;

    const ambientLight = new AmbientLight(COLORS.primaryPrimrose, ambient);
    const frontLight = new PointLight(COLORS.lightPrimrose, front);
    frontLight.position.set(2, 2, 2);
    
    return { ambientLight, frontLight };
};

const createScene = () => {
    const scene = new Scene();
    const prism = createPrism();
    const lights = createLights();

    scene.add(prism);
    scene.add(lights.ambientLight);
    scene.add(lights.frontLight);

    return { scene, prism };
};

const handleResize = (camera, renderer) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

const animate = (renderer, scene, camera, prism) => {
    const animationLoop = () => {
        requestAnimationFrame(animationLoop);

        prism.rotation.y += CONFIG.prism.rotationSpeed;

        renderer.render(scene, camera);
    };

    return animationLoop;
};

export function initPrism() {
    const canvas = document.getElementById('three-canvas');
    const renderer = createRenderer(canvas);
    const camera = createCamera();
    const { scene, prism } = createScene();

    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => handleResize(camera, renderer));

    const animationLoop = animate(renderer, scene, camera, prism);
    animationLoop();
}
