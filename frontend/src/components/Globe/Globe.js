import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import texture from "./high-res-world-map-partially-colored-30-filled.png";
import countryTexture from "./high-res-world-map-partially-colored-30-filled-blue.png";
import Header from "../Header/Header";
import "./Globe.css";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../Footer/Footer";

function Globe(props) {
  const colorMapping = {
    "70744C": "United States",
    847233: "Italy",
    "9E8D56": "China",
    "5C9E5D": "Mexico",
    555931: "India",
    "6A5912": "France",
    "6D8C39": "Korea",
    "94923F": "Japan",
    164915: "Spain",
    176416: "United Kingdom",
    "84A54F": "Germany",
    "8F9117": "Thailand",
    BCAD5E: "Vietnam",
    DFC979: "Brazil",
    "7DBA43": "Argentina",
    B5BA43: "Peru",
    909526: "Greece",
    C4943E: "Turkey",
    "6C7D31": "Morocco",
    "4D5533": "Lebanon",
    A89358: "Ethiopia",
    "7B9873": "South Africa",
    C1C659: "Australia",
    BD7730: "Russia",
    "689F9B": "Sweden",
    D1C781: "Indonesia",
    888469: "Iran",
    "3E7A56": "Poland",
    568067: "Canada",
    C4C0C0: "Not Implemented",
  };

  const countryOrangeColorMapping = {
    "United States": "F6EA7D",
    Italy: "F6EA7D",
    China: "FBF2A4",
    Mexico: "FED854",
    India: "FFE70C",
    France: "E17E08",
    Korea: "FFD466",
    Japan: "FF8F28",
    Spain: "FBDE76",
    "United Kingdom": "FFF597",
    Germany: "FF961C",
    Thailand: "FBA745",
    Vietnam: "EE9848",
    Brazil: "FFCD82",
    Argentina: "FB7D09",
    Peru: "F0A348",
    Greece: "FCBA6C",
    Turkey: "E4762A",
    Morocco: "F68F30",
    Lebanon: "FFB774",
    Ethiopia: "F6EA7D",
    "South Africa": "F6EA7D",
    Australia: "FBF2A4",
    Russia: "FED854",
    Sweden: "FBA745",
    Indonesia: "FFE70C",
    Iran: "FF961C",
    Poland: "F68F30",
    Canada: "E17E08",
    "Not Implemented": "2C2C2C",
  };

  const countryDescription = {
    "United States":
      "The cuisine of the United States is diverse and influenced by many cultures, including Native American, European, African, and Asian. Some popular American foods include hamburgers, hot dogs, fried chicken, pizza, barbecue, and apple pie.",
    Italy:
      "Italian cuisine is known for its use of fresh ingredients, such as tomatoes, basil, and olive oil. Popular Italian dishes include pasta, pizza, lasagna, and risotto. Italian food is also famous for its cheeses, such as mozzarella and parmesan.",
    China:
      "Chinese cuisine is diverse and varies by region. Some popular dishes include stir-fried vegetables, noodle dishes, dumplings, and steamed buns. Chinese cuisine often uses soy sauce, ginger, garlic, and sesame oil for flavor.",
    Mexico:
      "Mexican cuisine is known for its use of spices and chili peppers. Popular dishes include tacos, enchiladas, tamales, and guacamole. Mexican cuisine also features beans, rice, and a variety of cheeses.",
    India:
      "Indian cuisine is known for its use of spices, such as cumin, coriander, and turmeric. Popular Indian dishes include curries, biryanis, samosas, and naan bread. Indian cuisine also features a variety of vegetarian options.",
    France:
      "French cuisine is known for its use of butter, cream, and wine. Popular French dishes include coq au vin, ratatouille, quiche, and croissants. French cuisine is also famous for its cheeses and wines.",
    "South Korea":
      "Korean cuisine is known for its use of fermented foods, such as kimchi, and spicy flavors. Popular Korean dishes include bibimbap, bulgogi, and Korean barbecue. Korean cuisine often features rice, vegetables, and meats.",
    Japan:
      "Japanese cuisine is known for its use of fresh ingredients and minimalist presentation. Popular Japanese dishes include sushi, tempura, ramen, and udon. Japanese cuisine also features a variety of seafood and rice dishes.",
    Spain:
      "Spanish cuisine is known for its use of olive oil, garlic, and saffron. Popular Spanish dishes include paella, gazpacho, tortilla española, and churros. Spanish cuisine is also famous for its cheeses, cured meats, and wines.",
    "United Kingdom":
      "British cuisine is known for its hearty and comforting dishes, such as fish and chips, bangers and mash, and shepherd's pie. British cuisine also features a variety of meats, cheeses, and breads.",
    Germany:
      "German cuisine is known for its sausages, such as bratwurst and knockwurst, and hearty dishes like schnitzel and sauerkraut. German cuisine also features a variety of breads, cheeses, and beers.",
    Thailand:
      "Thai cuisine is known for its use of spicy, sweet, and sour flavors. Popular Thai dishes include curries, pad thai, tom yum soup, and mango sticky rice. Thai cuisine often features a variety of vegetables, meats, and seafood.",
    Vietnam:
      "Vietnamese cuisine is known for its use of fresh herbs and vegetables, such as lemongrass, mint, and bean sprouts. Popular Vietnamese dishes include pho, banh mi, and spring rolls. Vietnamese cuisine often features a variety of meats, seafood, and rice noodles.",
    Brazil:
      "Brazilian cuisine is diverse, reflecting the country's mix of indigenous, African, and European influences. Common ingredients include rice, beans, manioc, corn, and various meats including beef, chicken, and pork.",
    Argentina:
      "Argentinian cuisine is known for its meat-based dishes, especially beef, as well as grilled sausages and empanadas. The cuisine is influenced by Italian and Spanish cuisine, and includes a variety of desserts such as dulce de leche and alfajores.",
    Peru: "Peruvian cuisine is a fusion of Indigenous, Spanish, African, and Asian culinary traditions. It features a variety of ingredients and dishes such as ceviche, lomo saltado, and ají de gallina, and incorporates a lot of seafood and potatoes.",
    Greece:
      "Greek cuisine is known for its fresh ingredients, including vegetables, fruits, and herbs, as well as seafood and lamb. It features dishes such as moussaka, tzatziki, and dolmades, and incorporates a lot of olive oil, feta cheese, and yogurt.",
    Turkey:
      "Turkish cuisine features a lot of meat-based dishes such as kebabs and shawarma, as well as vegetarian dishes such as dolma and baklava. It incorporates spices and herbs such as cumin, mint, and sumac, and includes a variety of meze dishes.",
    Morocco:
      "Moroccan cuisine features a lot of spices and herbs such as saffron, cumin, and ginger, as well as ingredients such as couscous, lamb, and chickpeas. It includes dishes such as tagine, harira, and pastilla, and often incorporates dried fruits and nuts.",
    Lebanon:
      "Lebanese cuisine features a lot of fresh vegetables and fruits, as well as meat dishes such as shawarma and kibbeh. It incorporates herbs such as parsley and mint, and includes dishes such as hummus, tabbouleh, and falafel.",
    Ethiopia:
      "Ethiopian cuisine features a lot of spices such as berbere and mitmita, and includes dishes such as injera, doro wat, and kitfo. It incorporates a lot of lentils and vegetables, as well as meat dishes such as lamb and beef.",
    "South Africa":
      "South African cuisine features a lot of meat-based dishes such as boerewors and biltong, as well as seafood and vegetables. It incorporates spices and herbs such as peri peri, and includes dishes such as bobotie, bunny chow, and sosaties.",
    Australia:
      "Australian cuisine is influenced by British, Indigenous, and Asian culinary traditions, and features a variety of ingredients and dishes. It includes dishes such as meat pies, fish and chips, and pavlova, and incorporates a lot of seafood and barbecue.",
    Russia:
      "Russian cuisine features a lot of meat dishes such as beef stroganoff and shashlik, as well as soups and stews such as borscht and solyanka. It incorporates ingredients such as mushrooms, potatoes, and beets, and includes dishes such as blini and pelmeni.",
    Sweden:
      "Swedish cuisine features a lot of seafood such as herring and salmon, as well as meat dishes such as meatballs and Janssons frestelse. It incorporates ingredients such as potatoes and lingonberries, and includes dishes such as smorgasbord and kanelbulle.",
    Indonesia:
      "Indonesian cuisine is known for its bold flavors and use of spices such as turmeric, ginger, and lemongrass. Popular dishes include nasi goreng (fried rice), satay (grilled skewers of meat or fish), and gado-gado (vegetables with peanut sauce).",
    Iran: "Iranian cuisine is influenced by the country's geography and history. Common ingredients include rice, lamb, chicken, and vegetables such as eggplant and tomato. Popular dishes include kebabs, stews, and rice dishes such as tahchin.",
    Poland:
      "Polish cuisine is hearty and often includes meat, potatoes, and cabbage. Popular dishes include pierogi (dumplings), kielbasa (sausage), and bigos (a stew made with meat and cabbage).",
    Canada:
      "Canadian cuisine is influenced by the country's diverse cultural background, including indigenous, French, and British influences. Popular dishes include poutine (french fries with cheese curds and gravy), butter tarts, and tourtière (a meat pie).",
  };

  const ref = useRef();
  const history = useHistory();
  const [uv, setUv] = useState();
  const [countryHovered, setCountryHovered] = useState(false);
  const countryHoveredRef = useRef(countryHovered);
  const [dotMapping, setDotMapping] = useState({
    "United States": [],
    Italy: [],
    China: [],
    Mexico: [],
    India: [],
    France: [],
    Korea: [],
    Japan: [],
    Spain: [],
    "United Kingdom": [],
    Germany: [],
    Thailand: [],
    Vietnam: [],
    Brazil: [],
    Argentina: [],
    Peru: [],
    Greece: [],
    Turkey: [],
    Morocco: [],
    Lebanon: [],
    Ethiopia: [],
    "South Africa": [],
    Australia: [],
    Russia: [],
    Sweden: [],
    Indonesia: [],
    Iran: [],
    Poland: [],
    Canada: [],
    "Not Implemented": [],
  });

  let autoRotate = true;
  let group = new THREE.Group();
  useEffect(() => {
    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000); //changed
    const light = new THREE.DirectionalLight();
    light.position.x = 0;
    light.position.z = 300;
    light.position.y = 0;
    scene.add(light);

    // Initialize globe
    const globeGeometry = new THREE.SphereGeometry(30, 64, 64);
    // const globeTexture = new THREE.TextureLoader().load(countryTexture);
    // const globeMaterial = new THREE.MeshStandardMaterial({map: globeTexture});
    const globeMaterial = new THREE.MeshStandardMaterial({ color: 0x9dd0ff }); //673fe1 })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.position.x = 0;
    globe.position.z = 0;
    globe.position.y = 0;
    // scene.add(globe);

    group.add(globe);
    scene.add(group);

    // Point camera towards globe at (0, 0, 0)
    camera.position.set(0, 50, 100);
    camera.lookAt(globe.position);

    // Handle globe rotation on user drag
    let down = 0;
    window.addEventListener("mousedown", (e) => (down = e.buttons));
    window.addEventListener("mouseup", (e) => (down = 0));
    window.addEventListener("mousemove", handleMouseMove);
    let oldXPos = 0;
    let oldYPos = 0;
    function handleMouseMove(e) {
      if (down === 1) {
        if (e.clientX > oldXPos) {
          group.rotation.y += 0.01;
        }
        if (e.clientX < oldXPos) {
          group.rotation.y -= 0.01;
        }
        if (e.clientY > oldYPos) {
          group.rotation.x += 0.01;
        }
        if (e.clientY < oldYPos) {
          group.rotation.x -= 0.01;
        }
      }
      oldXPos = e.clientX;
      oldYPos = e.clientY;
    }

    // Capture UV coordinates on mouse move
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();
    ref.current.addEventListener("mousemove", handleMouseMoveForRaycaster);
    let canvasWidth = window.innerWidth * 0.6;
    let canvasHeight = window.innerWidth * 0.6;
    let lastCall = Date.now();
    function handleMouseMoveForRaycaster(e) {
      if (Date.now() - lastCall < 200) {
        return;
      }
      lastCall = Date.now();
      if (e.target.tagName === "CANVAS") {
        mousePos.x = (e.offsetX / canvasWidth) * 2 - 1;
        mousePos.y = -((e.offsetY / canvasHeight) * 2 - 1);
      }
      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length !== 0) {
        setUv(intersects[0].uv);
      } else {
        autoRotate = true;
      }
      // if (lastCall) cancelAnimationFrame(lastCall)
      // lastCall = requestAnimationFrame(animate)
    }

    // Render above scene
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(0.6 * window.innerWidth, window.innerWidth * 0.6); // changed
    renderer.render(scene, camera);
    ref.current.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      if (autoRotate) {
        group.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }
    animate();
    return () => {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0])
      }
    }
  }, []);

  // Use UV coordinates to determine if user is hovering over a in-scope country
  useEffect(() => {
    if (uv) {
      const canvas = document.getElementById("placeholder-canvas");
      canvas.style.visibility = "hidden";
      canvas.style.display = "none";
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(img, 0, 0);
      imgColor = context.getImageData(0, 0, img.width, img.height);
      let color = getColorFromUV(uv.x, uv.y).toUpperCase();
      if (colorMapping[color] && colorMapping[color] !== "Not Implemented") {
        countryHoveredRef.current = colorMapping[color];
      }
    }
  }, [uv]);

  // Load placeholder 2D world map image to create dots
  const img = new Image();
  img.src = texture;
  img.crossOrigin = "Anonymous";
  img.willReadFrequently = true;

  let imgColor;
  useEffect(() => {
    if (img.complete) {
      createDots()
    } else {
      img.onload = () => createDots();
    }

    function createDots() {
      const canvas = document.getElementById("placeholder-canvas");
      canvas.style.visibility = "hidden";
      canvas.style.display = "none";
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(img, 0, 0);
      imgColor = context.getImageData(0, 0, img.width, img.height);
      for (let i = 0; i < 20000; i++) {
        const phi = Math.acos(-1 + (2 * i) / 20000);
        const theta = Math.sqrt(20000 * Math.PI) * phi;
        const vector = new THREE.Vector3();
        vector.setFromSphericalCoords(30, phi, theta);

        let x = vector.x / 30;
        let y = vector.y / 30;
        let z = vector.z / -30;

        let u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
        let v = 0.5 + Math.asin(y) / Math.PI;

        let color = getColorFromUV(u, v).toUpperCase();
        if (colorMapping[color]) {
          const dotGeometry = new THREE.SphereGeometry(0.1, 1);
          let orangeVariant = parseInt(
            `${countryOrangeColorMapping[colorMapping[color]]}`,
            16
          );
          let dotMaterial = new THREE.MeshBasicMaterial({
            color: orangeVariant,
          });
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          dot.position.x = vector.x;
          dot.position.y = vector.y;
          dot.position.z = vector.z;
          group.add(dot);
          setDotMapping({
            ...dotMapping,
            [colorMapping[color]]: dotMapping[colorMapping[color]].push(dot),
          });
        }
      }
    }
  }, []);

  function getColorFromUV(u, v) {
    const width = Math.floor(u * img.width);
    const height = Math.floor((1 - v) * img.height);
    const index = (width + (height - 1) * img.width) * 4;
    const hexColor =
      imgColor.data[index].toString(16) +
      imgColor.data[index + 1].toString(16) +
      imgColor.data[index + 2].toString(16);
    return hexColor;
  }

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      let dotArr;
      if (
        countryHoveredRef.current &&
        countryHoveredRef.current !== "Not Implemented"
      ) {
        dotArr = dotMapping[countryHoveredRef.current];
      } else {
        dotArr = [];
      }
      dotArr.forEach((dot) => {
        while (
          Math.sqrt(
            dot.position.x ** 2 + dot.position.y ** 2 + dot.position.z ** 2
          ) < 33
        ) {
          dot.position.x *= 1.05;
          dot.position.y *= 1.05;
          dot.position.z *= 1.05;
        }
        // while (Math.sqrt(x ** 2 + y ** 2 + z ** 2) > 35) {
        //     let sizeFactor = 1 - Math.random() * 0.01
        //     x *= sizeFactor
        //     y *= sizeFactor
        //     z *= sizeFactor
        //     dot.position.x *= sizeFactor
        //     dot.position.y *= sizeFactor
        //     dot.position.z *= sizeFactor
        //     break;
        // }
        // dot.material = new THREE.MeshStandardMaterial( { color: 0x44C08A } )
      });
      if (
        countryHoveredRef.past &&
        countryHoveredRef.past !== countryHoveredRef.current
      ) {
        dotMapping[countryHoveredRef.past].forEach((dot) => {
          while (
            Math.sqrt(
              dot.position.x ** 2 + dot.position.y ** 2 + dot.position.z ** 2
            ) > 30.1
          ) {
            dot.position.x /= 1.001;
            dot.position.y /= 1.001;
            dot.position.z /= 1.001;
          }
        });
      }
      if (countryHoveredRef.current !== "Not Implemented") {
        countryHoveredRef.past = countryHoveredRef.current;
      }
    });
  }, []);

  return (
    <div id="explore-page-root">
      <Header />
      <div id="explore-page-main">
        <div ref={ref} id="explore-page-globe"></div>
        {countryHoveredRef.current && (
          <div id="explore-page-country-popup">
            <div id="country-description">
              <h1>{countryHoveredRef.current}</h1>
              <p>{countryDescription[countryHoveredRef.current]}</p>
            </div>
            <div
              onClick={() =>
                history.push({
                  pathname: "/recipes",
                  search: `?country=${countryHoveredRef.current}`,
                })
              }
            >
              Take me there!
            </div>
          </div>
        )}
        {!countryHoveredRef.current && (
          <>
            <div id="explore-page-country-popup">
              <h1>Try hovering over a country</h1>
            </div>
          </>
        )}
        <canvas id="placeholder-canvas" display="none"></canvas>
      </div>
      <Footer />
    </div>
  );
}

export default Globe;

// color theme
// auto spin
// raytracing
// - defining areas of the globe to handle click logic, ideas:
// 1) dividing the 3d model into clickable sub-components
// 2) layering invisible image (sprite) on top of globe to handle clicks,
//    projecting globe onto 2D screen space
// 3) get longitude and latitude coordinates of location and convert to 2d
// can add markers for countries, or have the country outlined/highlighted on hover
// markers require 1 coord, highlight requires 10000
// image coloring method from stripe

// US: 70744C
// Italy: 847233
// China: 9E8D56
// Mexico: 5C9E5D
// India: 555931
// France: 6a5912
// Korea: 6d8c39
// Japan: 94923f
// C4C0C0: Undefined
