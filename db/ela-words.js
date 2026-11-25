(function (global) {

    'use strict';

    global.ArcadeDB = global.ArcadeDB || {};

const scifiDictionary = [
    "laser", "plasma", "meteor", "proton", "cosmos", "orbit", "vector", "matrix", "shield", "warp",
    "photon", "comet", "beacon", "energy", "fusion", "quantum", "gravity", "nebula", "galaxy", "rocket",
    "stellar", "neutron", "asteroid", "engine", "signal", "module", "system", "thruster", "sensor", "core",
    "nanite", "hologram", "cyberspace", "android", "titanium", "velocity", "generator", "overdrive", "catalyst", "hyperdrive",
    "horizon", "vortex", "starlight", "pulsar", "singularity", "dimension", "telemetry", "spectrum", "satellite", "atmosphere",
    "alien", "aurora", "binary", "blaster", "capsule", "circuit", "cluster", "cockpit", "collider", "cryo",
    "cyber", "data", "deflector", "docking", "drone", "eclipse", "electron", "exosuit", "flux", "forcefield",
    "gamma", "grid", "hull", "hyperion", "ignition", "impulse", "ion", "jetpack", "kepler", "kinetic",
    "launch", "lightyear", "lunar", "magnet", "mars", "mech", "moonbeam", "nova", "observatory", "omega",
    "orbital", "oxygen", "parsec", "payload", "planet", "pod", "portal", "probe", "quasar", "radar",
    "radiation", "reactor", "robot", "rover", "scanner", "shuttle", "solar", "spacecraft", "starship", "supernova",
    "tachyon", "teleport", "terra", "titan", "trajectory", "turret", "universe", "uranium", "void", "wormhole",
    "xenon", "zenith", "zero"
];

const lausdGrade3 = [
    "friend", "school", "because", "before", "people", "would", "about", "could", "write", "glowing",
    "character", "sentence", "paragraph", "author", "chapter", "compare", "contrast", "describe", "explain", "detail",
    "fraction", "multiply", "divide", "explore", "energy", "matter", "source", "nature", "history", "culture",
    "opinion", "purpose", "influence", "reason", "support", "creature", "habitat", "protect", "observe", "discover",
    "answer", "around", "always", "animal", "basket", "beauty", "believe", "between", "blanket", "bright",
    "brother", "building", "butter", "camera", "candle", "careful", "carpet", "carry", "center", "change",
    "circle", "clever", "climate", "cloud", "collect", "common", "complete", "connect", "country",
    "courage", "create", "curious", "danger", "decide", "desert", "different", "dinner", "doctor", "dollar",
    "dragon", "dream", "earth", "effort", "either", "enough", "equal", "evening", "example", "except",
    "family", "famous", "favorite", "feather", "festival", "figure", "forest", "forever", "garden", "gentle",
    "giant", "golden", "govern", "grateful", "ground", "happen", "harbor", "harvest", "healthy", "helpful",
    "hidden", "holiday", "honest", "hundred", "hungry", "island", "journey", "jungle", "kitchen", "kitten",
    "listen", "little", "locate", "magnet", "market", "measure", "member", "memory", "message", "middle",
    "minute", "mirror", "moment", "monkey", "morning", "mountain", "museum", "music", "mystery", "nation",
    "nearby", "neither", "notice", "number", "ocean", "orange", "order", "outside", "parent", "pattern",
    "pencil", "perfect", "person", "picture", "planet", "please", "pocket", "polite", "practice", "present",
    "pretty", "problem", "project", "promise", "puzzle", "question", "quiet", "rabbit", "rainbow", "rather",
    "recall", "record", "reduce", "region", "remain", "remember", "repair", "repeat", "report", "rescue",
    "result", "return", "rhythm", "ribbon", "river", "safety", "science", "season", "second", "secret",
    "shadow", "shelter", "signal", "silver", "simple", "sister", "sketch", "smooth", "social", "solve",
    "special", "speech", "spiral", "spring", "square", "steady", "story", "strange", "stream", "street",
    "strong", "student", "study", "subject", "success", "sudden", "summer", "supply", "surface", "surprise",
    "symbol", "system", "tablet", "talent", "teacher", "thought", "through", "thunder", "ticket", "together",
    "toward", "travel", "treasure", "triangle", "trouble", "tunnel", "turtle", "umbrella", "uncle", "under",
    "useful", "valley", "value", "village", "visit", "voice", "volume", "voyage", "wander", "warmth",
    "weather", "welcome", "whisper", "window", "winter", "wisdom", "wonder", "yellow", "young", "zebra"
];

const lausdGrade4 = [
    "accident", "balance", "calmness", "daughter", "excitement", "frighten", "gather", "imagine", "journal",
    "boundary", "capture", "horizon", "telescope", "analyze", "evidence", "inference", "summarize",
    "metaphor", "simile", "narrative", "dialogue", "adjective", "adverb", "pronoun", "preposition", "conjunction", "punctuation",
    "ecosystem", "producer", "consumer", "organism", "environment", "adaptation", "government", "constitution", "citizen", "heritage",
    "abundant", "accurate", "achieve", "adventure", "affection", "altitude", "ancient", "announce", "anxiety",
    "approach", "approval", "argument", "arrange", "article", "assemble", "atlantic", "attitude", "audience",
    "average", "awkward", "barrier", "behavior", "benefit", "biography", "blossom", "brilliant", "calendar",
    "cautious", "celebrate", "century", "challenge", "champion", "chemical", "civilian",
    "classic", "colony", "comfort", "command", "community",
    "compass", "compete", "concept", "concern", "confuse",
    "conquer", "consent", "consider", "continue", "contract", "control", "convince",
    "cooperate", "coordinate", "correct", "courageous", "courtesy", "creative", "critical", "current",
    "custom", "cylinder", "decade", "declare", "decline", "decorate", "decrease", "defend", "definite", "delicate",
    "deliver", "demand", "democracy", "demonstrate", "depend", "deposit", "deserve", "design", "despair",
    "destroy", "determine", "develop", "diagram", "diameter", "dictate", "difficult", "digest", "dignity", "diligent",
    "dimension", "direct", "disaster", "discard", "discuss", "disease", "display", "distance", "distinct",
    "district", "diverse", "document", "domestic", "dominate", "dramatic", "drought", "durable", "eager",
    "economy", "edition", "educate", "effect", "efficient", "elaborate", "elastic", "election", "element", "elevate",
    "eliminate", "emerge", "emotion", "emphasis", "employ", "enable", "enclose", "encourage", "endure",
    "enforce", "engage", "engineer", "enormous", "ensure", "enter", "entire", "envelope", "equation",
    "equator", "equip", "erosion", "escape", "essential", "establish", "estimate", "evaluate", "eventual", "examine",
    "exceed", "excellent", "exchange", "exclaim", "exclude", "excuse", "execute", "exercise", "exhaust",
    "exhibit", "exist", "expand", "expect", "expedition", "expense", "experience", "experiment", "expert",
    "explode", "export", "expose", "express", "extend", "external", "extinct", "extract", "extreme"
];

const lausdGrade5 = [
    "abolish", "abstract", "accomplish", "accumulate", "acknowledge", "acquire", "adaptable", "adequate", "adjacent", "advocate",
    "affluent", "aggravate", "allegory", "allocate", "alteration", "ambiguous", "ambition", "amendment", "amplify", "analogy",
    "ancestor", "anecdote", "antagonist", "anticipate", "apparent", "appreciate", "approximate", "arbitrary", "architect", "arrogant",
    "artifact", "articulate", "aspiration", "assimilate", "assumption", "astonish", "atmosphere", "attribute", "authentic", "authority",
    "autonomous", "barren", "beneficial", "benevolent", "bias", "boycott", "brevity", "brittle", "bureaucracy", "calculate",
    "campaign", "candidate", "capable", "capacity", "catalyst", "category", "chronicle", "chronology", "circulate", "citation",
    "clarify", "classify", "coalition", "coherent", "coincide", "collaborate", "collapse", "colleague", "combine", "commemorate",
    "commerce", "commission", "commodity", "compatible", "compel", "compensate", "competent", "compile", "complement", "complex",
    "component", "compose", "comprehend", "compromise", "conceal", "concede", "concentrate", "conception", "conclude", "concrete",
    "condense", "condition", "conduct", "confederate", "confer", "confident", "confine", "confirm", "conflict", "conform",
    "confront", "congress", "conscience", "conscious", "consensus", "consequence", "conserve", "considerable", "consistent", "consolidate",
    "conspicuous", "constant", "constitute", "construct", "consult", "consume", "contact", "contagious", "contain", "contaminate"
];

const WORD_DEFINITIONS = {
    // Sci-Fi
    laser: "A focused beam of bright light.",
    plasma: "Super-hot glowing gas made of charged particles.",
    meteor: "A space rock burning up as it enters Earth's sky.",
    orbit: "The curved path a planet or moon takes around something.",
    galaxy: "A huge group of billions of stars and planets.",
    gravity: "The invisible force that pulls objects toward each other.",
    nebula: "A giant colorful cloud of dust and gas in space.",
    quantum: "Relating to the tiniest packets of energy in physics.",
    velocity: "Speed in a specific direction.",
    telemetry: "Measuring and sending data from far away.",
    // Grade 3
    character: "A person, animal, or creature in a story.",
    compare: "To find ways two things are alike.",
    contrast: "To find ways two things are different.",
    describe: "To tell what something looks, sounds, or feels like.",
    fraction: "A part of a whole, like one half or three fourths.",
    habitat: "The natural home where a plant or animal lives.",
    opinion: "What someone thinks or believes about a topic.",
    observe: "To watch carefully to learn details.",
    courage: "Being brave even when something feels scary.",
    rhythm: "A steady beat or pattern in music or poetry.",
    // Grade 4
    analyze: "To study something closely by looking at its parts.",
    conclude: "To decide what something means after looking at clues.",
    evidence: "Facts or clues that prove something is true.",
    inference: "A smart guess based on clues and what you know.",
    summarize: "To retell the main points briefly in your own words.",
    metaphor: "Comparing two things directly without using 'like' or 'as'.",
    simile: "Comparing two things using 'like' or 'as'.",
    ecosystem: "Living things and their environment working together.",
    adaptation: "A trait that helps a living thing survive.",
    heritage: "Traditions and history passed down through families.",
    // Grade 5
    abolish: "To officially end a law, system, or practice.",
    acknowledge: "To admit or recognize that something is true.",
    advocate: "To speak up in support of a person or idea.",
    allegory: "A story with a hidden moral or deeper meaning.",
    ambiguous: "Unclear or able to be understood in more than one way.",
    amendment: "An official change or addition to a law or document.",
    analogy: "A comparison showing how two pairs of things are alike.",
    antagonist: "The character or force working against the hero.",
    anticipate: "To expect or prepare for something before it happens.",
    artifact: "An object made by humans in the past.",
    authentic: "Real, genuine, and not a copy.",
    beneficial: "Helpful or producing a good result.",
    boycott: "Refusing to buy or use something as a protest.",
    chronology: "Events arranged in the order they happened in time.",
    citation: "Giving credit to the source where you found information.",
    collaborate: "To work together with others toward a shared goal.",
    compromise: "When both sides give up a little to reach an agreement.",
    consequence: "The result or effect of an action or choice.",
    consensus: "General agreement reached by a group.",
    conserve: "To protect and save resources so they don't run out."
};

    global.ArcadeDB.elaWords = {

        scifi: scifiDictionary,

        grade3: lausdGrade3,

        grade4: lausdGrade4,

        grade5: lausdGrade5,

        definitions: WORD_DEFINITIONS

    };

})(window);