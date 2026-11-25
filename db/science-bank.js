(function (global) {

    'use strict';

    global.ArcadeDB = global.ArcadeDB || {};

const SCIENCE_BANK = [
    // Solar System
    { grade: 3, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Mercury', prompt: 'Which planet is closest to the Sun?', choices: ['Mercury', 'Venus', 'Mars', 'Jupiter'], answer: 'Mercury', explain: 'Mercury is the innermost planet orbiting closest to the Sun.' },
    { grade: 3, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Earth rotation', prompt: 'What causes day and night on Earth?', choices: ['Earth spinning on its axis', 'The Moon blocking the Sun', 'Clouds covering the sky', 'Ocean tides'], answer: 'Earth spinning on its axis', explain: 'One full spin (rotation) of Earth takes 24 hours, creating day and night.' },
    { grade: 4, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Jupiter', prompt: 'Which is the largest planet in our Solar System?', choices: ['Jupiter', 'Saturn', 'Earth', 'Neptune'], answer: 'Jupiter', explain: 'Jupiter is a giant gas planet big enough to fit over 1,300 Earths.' },
    { grade: 5, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Gravity', prompt: 'What invisible force keeps all the planets orbiting around the Sun?', choices: ['Gravity', 'Friction', 'Magnetism', 'Evaporation'], answer: 'Gravity', explain: 'The Sun’s massive gravity pulls planets into steady elliptical orbits.' },

    // Food Chains
    { grade: 3, topic: 'foodchain', label: 'FOOD CHAINS', key: 'Producer', prompt: 'In a food chain, green plants are called _____ because they make their own food.', choices: ['Producers', 'Predators', 'Decomposers', 'Minerals'], answer: 'Producers', explain: 'Plants produce their own food using sunlight, water, and air.' },
    { grade: 3, topic: 'foodchain', label: 'FOOD CHAINS', key: 'Herbivore', prompt: 'An animal that eats ONLY plants is called a(n):', choices: ['Herbivore', 'Carnivore', 'Decomposer', 'Scavenger'], answer: 'Herbivore', explain: 'Herbivores like rabbits and deer get energy only from plants.' },
    { grade: 4, topic: 'foodchain', label: 'FOOD CHAINS', key: 'Decomposer', prompt: 'Mushrooms and worms break down dead leaves into rich soil. They are:', choices: ['Decomposers', 'Producers', 'Apex predators', 'Pollinators'], answer: 'Decomposers', explain: 'Decomposers recycle nutrients back into the ecosystem.' },
    { grade: 5, topic: 'foodchain', label: 'FOOD CHAINS', key: 'Photosynthesis', prompt: 'What gas do plants take in from the air during photosynthesis?', choices: ['Carbon dioxide', 'Nitrogen', 'Helium', 'Neon'], answer: 'Carbon dioxide', explain: 'Plants absorb carbon dioxide and release oxygen during photosynthesis.' },

    // Water Cycle
    { grade: 3, topic: 'watercycle', label: 'WATER CYCLE', key: 'Evaporation', prompt: 'When the Sun warms ocean water and turns it into invisible vapor rising up, that is:', choices: ['Evaporation', 'Precipitation', 'Freezing', 'Erosion'], answer: 'Evaporation', explain: 'Heat energy turns liquid water into water vapor (gas) during evaporation.' },
    { grade: 4, topic: 'watercycle', label: 'WATER CYCLE', key: 'Condensation', prompt: 'Water vapor cooling high in the sky to form clouds is called:', choices: ['Condensation', 'Collection', 'Runoff', 'Melting'], answer: 'Condensation', explain: 'Cooling gas condenses into tiny liquid droplets that form clouds.' },
    { grade: 4, topic: 'watercycle', label: 'WATER CYCLE', key: 'Precipitation', prompt: 'Rain, snow, sleet, and hail falling from clouds are all forms of:', choices: ['Precipitation', 'Evaporation', 'Condensation', 'Transpiration'], answer: 'Precipitation', explain: 'When cloud droplets grow heavy, gravity pulls them down as precipitation.' },
    { grade: 5, topic: 'watercycle', label: 'WATER CYCLE', key: 'Freshwater', prompt: 'Most of Earth’s water (about 97%) is found in:', choices: ['Salty oceans', 'Freshwater rivers', 'Underground caves', 'Rain clouds'], answer: 'Salty oceans', explain: 'Oceans hold ~97% of Earth’s water, so conserving freshwater is vital!' },

    // States of Matter
    { grade: 3, topic: 'matter', label: 'STATES OF MATTER', key: 'Solid', prompt: 'Which state of matter keeps its own fixed shape and volume?', choices: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 'Solid', explain: 'Particles in a solid are packed tightly and hold a fixed shape.' },
    { grade: 4, topic: 'matter', label: 'STATES OF MATTER', key: 'Liquid', prompt: 'Which state of matter takes the shape of its container and can flow?', choices: ['Liquid', 'Solid', 'Crystal', 'Rock'], answer: 'Liquid', explain: 'Liquid particles slide past each other, letting liquids flow and take container shape.' },
    { grade: 4, topic: 'matter', label: 'STATES OF MATTER', key: 'Gas', prompt: 'In which state of matter do particles spread far apart to fill any space?', choices: ['Gas', 'Solid', 'Liquid', 'Ice'], answer: 'Gas', explain: 'Gas particles move fast and spread out to fill their entire container.' },
    { grade: 5, topic: 'matter', label: 'STATES OF MATTER', key: 'Chemical change', prompt: 'Baking cake batter or rusting iron creates a new substance. This is a:', choices: ['Chemical change', 'Physical change', 'Freezing', 'Filtering'], answer: 'Chemical change', explain: 'A chemical change forms brand-new substances that cannot easily be reversed.' },

    // Circuits
    { grade: 3, topic: 'circuits', label: 'CIRCUITS', key: 'Closed circuit', prompt: 'For a lightbulb to turn ON, the electric circuit must be:', choices: ['Closed (complete loop)', 'Open (broken gap)', 'Made of wood', 'Disconnected'], answer: 'Closed (complete loop)', explain: 'Electricity flows only through a complete, closed loop.' },
    { grade: 3, topic: 'circuits', label: 'CIRCUITS', key: 'Battery', prompt: 'Which part of a simple flashlight circuit provides the electrical power?', choices: ['Battery', 'Glass lens', 'Plastic switch', 'Rubber grip'], answer: 'Battery', explain: 'A battery stores energy and pushes electricity through the circuit.' },
    { grade: 3, topic: 'watercycle', label: 'WATER CYCLE', key: 'Collection', prompt: 'When rainwater flows into rivers, lakes, and oceans, that stage is called:', choices: ['Collection', 'Evaporation', 'Condensation', 'Boiling'], answer: 'Collection', explain: 'Water gathers back into rivers, lakes, and oceans during collection.' },
    { grade: 3, topic: 'matter', label: 'STATES OF MATTER', key: 'Melting', prompt: 'When warm sunshine turns a solid ice cube into liquid water, that is:', choices: ['Melting', 'Freezing', 'Evaporating', 'Condensing'], answer: 'Melting', explain: 'Adding heat melts a solid into a liquid.' },
    { grade: 4, topic: 'circuits', label: 'CIRCUITS', key: 'Conductor', prompt: 'Which material is a good CONDUCTOR that lets electricity flow easily?', choices: ['Copper wire', 'Rubber eraser', 'Plastic spoon', 'Wooden stick'], answer: 'Copper wire', explain: 'Metals like copper conduct electricity; rubber, plastic, and wood are insulators.' },
    { grade: 4, topic: 'circuits', label: 'CIRCUITS', key: 'Insulator', prompt: 'Why are electrical wires wrapped in plastic or rubber?', choices: ['They are insulators that keep us safe', 'To make wires heavier', 'To block sunlight', 'To create gravity'], answer: 'They are insulators that keep us safe', explain: 'Insulators stop electricity from flowing into our hands.' },
    { grade: 4, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Mars', prompt: 'Which planet is known as the Red Planet because of iron-rich dust?', choices: ['Mars', 'Saturn', 'Uranus', 'Mercury'], answer: 'Mars', explain: 'Iron oxide (rust) on Mars gives it a reddish color.' },
    { grade: 5, topic: 'solar', label: 'SOLAR SYSTEM', key: 'Earth orbit', prompt: 'How long does it take Earth to complete one full orbit around the Sun?', choices: ['1 year (365 days)', '24 hours', '1 month', '10 years'], answer: '1 year (365 days)', explain: 'Earth takes one year to revolve around the Sun.' },
    { grade: 5, topic: 'foodchain', label: 'FOOD CHAINS', key: 'Apex predator', prompt: 'An eagle at the top of a food chain with no natural predators is called an:', choices: ['Apex predator', 'Primary producer', 'Decomposer', 'Herbivore'], answer: 'Apex predator', explain: 'Apex predators sit at the top of their food web.' },
    { grade: 5, topic: 'watercycle', label: 'WATER CYCLE', key: 'Transpiration', prompt: 'When plant leaves release water vapor into the air, scientists call it:', choices: ['Transpiration', 'Precipitation', 'Freezing', 'Erosion'], answer: 'Transpiration', explain: 'Plants release water vapor through tiny pores in their leaves.' },
    { grade: 5, topic: 'matter', label: 'STATES OF MATTER', key: 'Mixture', prompt: 'Trail mix with peanuts, raisins, and pretzels is an example of a:', choices: ['Mixture', 'Chemical change', 'Gas', 'Element'], answer: 'Mixture', explain: 'Parts of a mixture keep their own properties and can be separated.' },
    { grade: 5, topic: 'circuits', label: 'CIRCUITS', key: 'Energy transfer', prompt: 'In a flashlight, chemical energy in the battery transforms into:', choices: ['Light and heat energy', 'Sound and gravity', 'Water vapor', 'Nuclear fission'], answer: 'Light and heat energy', explain: 'Batteries power the bulb, converting stored chemical energy into light and warmth.' }
];

    global.ArcadeDB.scienceBank = SCIENCE_BANK;

})(window);