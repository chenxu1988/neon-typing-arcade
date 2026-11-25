(function (global) {

    'use strict';

    global.ArcadeDB = global.ArcadeDB || {};

const SENTENCES_POOL = {
    1: [
        "The cat sat on the mat.",
        "I like to play ball.",
        "The sun is very hot.",
        "A green frog can hop.",
        "My dog likes to nap.",
        "We see a big red bus.",
        "The bird sang a song.",
        "I can run up the hill.",
        "Look at the bright moon.",
        "Ten fish swim in a pond."
    ],
    2: [
        "Big dinosaurs eat green leaves.",
        "A small dog ran fast today.",
        "We can jump very high.",
        "Monkeys swing from tall trees.",
        "The baby dino found a berry.",
        "Rain falls on the jungle floor.",
        "Colorful parrots fly above us.",
        "A turtle hides inside its shell.",
        "Bears sleep during cold winter.",
        "Butterflies land on sweet flowers."
    ],
    3: [
        "The blue bird flies in the sky.",
        "My friend has a red bicycle.",
        "They found a treasure chest.",
        "Camels walk across warm sand.",
        "The clever fox jumped over rocks.",
        "We packed water for our hike.",
        "Stars shine bright at midnight.",
        "A gentle breeze cooled the camp.",
        "The explorer drew a helpful map.",
        "Golden light filled the canyon."
    ],
    4: [
        "Elephants have long trunks and big ears.",
        "Space rockets fly to the moon and stars.",
        "The ocean is full of colorful fish.",
        "Scientists study fossils from long ago.",
        "A rainbow appeared after the afternoon storm.",
        "Dolphins leap happily over ocean waves.",
        "Our class visited the natural history museum.",
        "Mountains rise high above the quiet valley.",
        "Courageous explorers sailed across wide seas.",
        "The library has stories about ancient worlds."
    ],
    5: [
        "The friendly T-Rex is looking for his dinner.",
        "A volcano erupted with bright orange lava.",
        "Pterodactyls soar above the giant tall trees.",
        "Every fossil tells an amazing story about Earth.",
        "Velociraptors raced swiftly across the dusty plains.",
        "Triceratops used three horns to protect its herd.",
        "Stegosaurus carried bony plates along its strong back.",
        "Brachiosaurus stretched its long neck to reach leaves.",
        "Prehistoric forests echoed with thunderous dinosaur footsteps.",
        "You have mastered every biome in the dinosaur world!"
    ]
};

const GRADE_SENTENCES = {
    grade3: SENTENCES_POOL,
    grade4: {
        1: [
            "Plants use sunlight to make their own food.",
            "Every magnet has a north pole and a south pole.",
            "Water freezes into ice when it gets very cold.",
            "A habitat gives animals food, water, and shelter.",
            "Frogs begin their lives as tiny tadpoles.",
            "Roots pull water from the soil into the stem."
        ],
        2: [
            "Producers, consumers, and decomposers form an ecosystem.",
            "Erosion slowly shapes valleys, canyons, and coastlines.",
            "Camouflage helps creatures blend into their surroundings.",
            "A simple circuit needs a battery, wires, and a bulb.",
            "Sound travels in waves through air, water, and solids.",
            "Clouds form when warm water vapor cools in the sky."
        ],
        3: [
            "Metamorphic rocks change deep underground from heat and pressure.",
            "Pollinators like bees carry pollen from flower to flower.",
            "Solar panels convert bright sunlight into clean electricity.",
            "Herbivores eat plants, while carnivores eat other animals.",
            "Earthquakes happen when tectonic plates suddenly shift.",
            "Friction slows down moving objects when surfaces rub together."
        ],
        4: [
            "Adaptations allow desert cactuses to store water for dry months.",
            "Fossil fuels formed over millions of years from ancient organisms.",
            "Gravity keeps the moon orbiting smoothly around planet Earth.",
            "Evaporation, condensation, and precipitation drive the water cycle.",
            "Wetlands filter pollution and protect towns from heavy floods.",
            "Optic nerves send light signals from our eyes to the brain."
        ],
        5: [
            "Biologists classify living things by their shared traits and behaviors.",
            "Renewable wind turbines generate power without burning fossil fuels.",
            "Weathering breaks large boulders into smaller pebbles and sand.",
            "Migration helps birds travel thousands of miles to warmer climates.",
            "Earth's tilted axis creates spring, summer, autumn, and winter.",
            "Every species plays an important role in keeping nature balanced."
        ]
    },
    grade5: {
        1: [
            "Primary sources include diaries, letters, and artifacts.",
            "Astronomers use powerful telescopes to study distant galaxies.",
            "A compass needle points north using Earth's magnetic field.",
            "The thirteen colonies grew along the Atlantic coast.",
            "Mars has iron-rich dust that makes it look red.",
            "Maps use scale bars and legends to show real distances."
        ],
        2: [
            "The Constitution divides government into three equal branches.",
            "Mercury, Venus, Earth, and Mars are rocky inner planets.",
            "Explorers used astrolabes and stars to navigate open oceans.",
            "Congress writes laws, while courts interpret what they mean.",
            "Jupiter is the largest planet in our entire solar system.",
            "Trade routes connected distant cities across continents."
        ],
        3: [
            "The Bill of Rights protects freedom of speech and assembly.",
            "Photosynthesis turns carbon dioxide and water into sugar and oxygen.",
            "Pioneer families traveled westward in covered wagons along trails.",
            "Saturn's dazzling rings are made of ice crystals and rock.",
            "Inventions like the printing press spread ideas much faster.",
            "Citizens participate in democracy by voting and sharing ideas."
        ],
        4: [
            "The Declaration of Independence stated that all people have equal rights.",
            "Comets are icy travelers that grow bright tails near the sun.",
            "Archaeologists carefully excavate ancient ruins to learn about history.",
            "Chemical reactions combine atoms to create brand-new substances.",
            "The Industrial Revolution replaced hand tools with steam-powered machines.",
            "Satellite imagery helps meteorologists track hurricanes across oceans."
        ],
        5: [
            "Checking multiple credible sources helps historians verify important facts.",
            "Space probes have sent back close-up photos of icy moons and rings.",
            "The Preamble begins with the famous words: We the People.",
            "Gravity bends the paths of asteroids, moons, and spacecraft alike.",
            "Understanding chronology helps us see how past choices shape today.",
            "Curiosity and teamwork drive every great discovery in science and history."
        ]
    }
};

    global.ArcadeDB.dinoSentences = GRADE_SENTENCES;

})(window);