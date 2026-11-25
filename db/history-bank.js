(function (global) {
    'use strict';
    global.ArcadeDB = global.ArcadeDB || {};

    global.ArcadeDB.historyBank = [
        // --- GRADE 3: Continents, Oceans, Maps, Community & Landmarks ---
        {
            grade: 3, topic: 'geo',
            prompt: 'Which is the largest continent on Earth?',
            choices: ['Asia', 'Africa', 'Europe', 'South America'],
            answer: 'Asia',
            explain: 'Asia is the largest continent by both land area and population.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'Which ocean borders the coast of California?',
            choices: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
            answer: 'Pacific Ocean',
            explain: 'The Pacific Ocean lies along the entire western coast of California.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'What tool on a map shows North, South, East, and West?',
            choices: ['Compass rose', 'Map scale', 'Equator', 'Time zone'],
            answer: 'Compass rose',
            explain: 'A compass rose displays cardinal directions (N, S, E, W) on a map.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'Which imaginary line divides Earth into Northern and Southern Hemispheres?',
            choices: ['Equator', 'Prime Meridian', 'Tropic line', 'Coastline'],
            answer: 'Equator',
            explain: 'The Equator wraps around the middle of Earth at 0 degrees latitude.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'Which continent is covered mostly by ice and has no countries?',
            choices: ['Antarctica', 'Australia', 'Europe', 'North America'],
            answer: 'Antarctica',
            explain: 'Antarctica is the icy southernmost continent used mainly for science.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'What part of a map explains what the symbols and colors mean?',
            choices: ['Map key (legend)', 'Compass rose', 'Latitude grid', 'Border line'],
            answer: 'Map key (legend)',
            explain: 'A map key or legend decodes icons, roads, and colors on a map.'
        },
        {
            grade: 3, topic: 'geo',
            prompt: 'How many continents are there on Earth?',
            choices: ['7', '5', '6', '9'],
            answer: '7',
            explain: 'Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'Who is the elected leader of a city or town government?',
            choices: ['Mayor', 'Governor', 'President', 'Principal'],
            answer: 'Mayor',
            explain: 'A mayor leads city government, while a governor leads a state.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'Why do communities have laws and rules?',
            choices: ['To keep people safe and fair', 'To stop all games', 'To make traffic slower', 'To replace schools'],
            answer: 'To keep people safe and fair',
            explain: 'Laws protect citizens, solve conflicts fairly, and keep communities safe.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'What is a good way for citizens to choose local leaders?',
            choices: ['Voting in an election', 'Drawing straws', 'Guessing ages', 'Flipping a coin'],
            answer: 'Voting in an election',
            explain: 'In a democracy, citizens vote to choose leaders and decide local issues.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'Which community worker puts out fires and rescues people?',
            choices: ['Firefighter', 'Librarian', 'Architect', 'Botanist'],
            answer: 'Firefighter',
            explain: 'Firefighters respond to fires, medical emergencies, and rescues.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Who lived in North America for thousands of years before European settlers arrived?',
            choices: ['Native Americans', 'Roman soldiers', 'Vikings only', 'Space explorers'],
            answer: 'Native Americans',
            explain: 'Indigenous Native American nations lived across North America long before Europeans.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Which famous red bridge spans the bay in San Francisco, California?',
            choices: ['Golden Gate Bridge', 'Brooklyn Bridge', 'London Bridge', 'Hoover Bridge'],
            answer: 'Golden Gate Bridge',
            explain: 'The Golden Gate Bridge opened in 1937 as an iconic California landmark.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Which national holiday honors Dr. Martin Luther King Jr. for equal rights?',
            choices: ['MLK Jr. Day', 'Labor Day', 'Flag Day', 'Arbor Day'],
            answer: 'MLK Jr. Day',
            explain: 'Martin Luther King Jr. Day honors his peaceful leadership for civil rights.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Which bird is the national symbol of the United States?',
            choices: ['Bald eagle', 'Peregrine falcon', 'California condor', 'Great horned owl'],
            answer: 'Bald eagle',
            explain: 'The bald eagle was chosen as the national emblem of the United States in 1782.'
        },

        // --- GRADE 4: California Regions, Gold Rush, Missions & Statehood ---
        {
            grade: 4, topic: 'geo',
            prompt: 'What is the capital city of California?',
            choices: ['Sacramento', 'Los Angeles', 'San Diego', 'San Jose'],
            answer: 'Sacramento',
            explain: 'Sacramento has been the capital of California since 1854.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which mountain range runs along eastern California?',
            choices: ['Sierra Nevada', 'Appalachian Mountains', 'Rocky Mountains', 'Andes Mountains'],
            answer: 'Sierra Nevada',
            explain: 'The Sierra Nevada stretches along eastern California and holds Lake Tahoe and Yosemite.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which California region is famous for growing much of the nation’s fruits and vegetables?',
            choices: ['Central Valley', 'Mojave Desert', 'Cascade Range', 'Channel Islands'],
            answer: 'Central Valley',
            explain: 'California’s Central Valley has rich soil and warm weather ideal for farming.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which desert in southeastern California is the hottest and lowest point in North America?',
            choices: ['Death Valley', 'Gobi Desert', 'Sahara Desert', 'Sonoran Plateau'],
            answer: 'Death Valley',
            explain: 'Death Valley’s Badwater Basin sits 282 feet below sea level.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'In what year was gold discovered at Sutter’s Mill, sparking the California Gold Rush?',
            choices: ['1848', '1776', '1906', '1812'],
            answer: '1848',
            explain: 'James Marshall found gold at Sutter’s Mill in January 1848.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'Why were Gold Rush miners who arrived in 1849 called "Forty-Niners"?',
            choices: ['They arrived in 1849', 'They dug 49 feet deep', 'They carried 49 pans', 'They stayed 49 days'],
            answer: 'They arrived in 1849',
            explain: 'Over 80,000 prospectors traveled to California in 1849 seeking gold.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'In what year did California officially become the 31st U.S. state?',
            choices: ['1850', '1789', '1865', '1914'],
            answer: '1850',
            explain: 'California joined the United States on September 9, 1850.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'How many Spanish missions were built along California’s coast between 1769 and 1823?',
            choices: ['21', '13', '50', '10'],
            answer: '21',
            explain: 'Spanish missionaries established 21 missions from San Diego to Sonoma.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'Which 1869 engineering project connected California to the eastern United States by rail?',
            choices: ['Transcontinental Railroad', 'Erie Canal', 'Route 66', 'Panama Canal'],
            answer: 'Transcontinental Railroad',
            explain: 'The Transcontinental Railroad cut coast-to-coast travel from months to under a week.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'Which large group of immigrant workers built much of the rugged Sierra Nevada railroad tunnels?',
            choices: ['Chinese workers', 'French sailors', 'Russian pilots', 'Egyptian masons'],
            answer: 'Chinese workers',
            explain: 'Thousands of Chinese laborers carved tunnels and laid track through the Sierra Nevada.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'What fast mail service used horse riders in relays between Missouri and California in 1860?',
            choices: ['Pony Express', 'Wells Telegraph', 'Stagecoach Line', 'Pacific Clipper'],
            answer: 'Pony Express',
            explain: 'The Pony Express carried mail across the West in about 10 days before the telegraph.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'Who leads the executive branch of California’s state government?',
            choices: ['Governor', 'Mayor', 'Senator', 'Sheriff'],
            answer: 'Governor',
            explain: 'The Governor is the chief executive of California’s state government.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'Where does the California State Legislature meet to pass state laws?',
            choices: ['State Capitol in Sacramento', 'City Hall in Fresno', 'Golden Gate Park', 'Port of Long Beach'],
            answer: 'State Capitol in Sacramento',
            explain: 'California’s Assembly and Senate meet inside the State Capitol in Sacramento.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'Which animal appears on the California state flag?',
            choices: ['Grizzly bear', 'Mountain lion', 'Sea otter', 'Golden trout'],
            answer: 'Grizzly bear',
            explain: 'The California Bear Flag features a grizzly bear and a single red star.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which major harbor in Southern California is one of the busiest container ports in the world?',
            choices: ['Port of Los Angeles', 'Port of Sacramento', 'Lake Tahoe', 'Mono Lake'],
            answer: 'Port of Los Angeles',
            explain: 'The Port of Los Angeles handles massive international shipping trade.'
        },

        // --- GRADE 5: US Geography, 3 Branches, Revolutionary War & Constitution ---
        {
            grade: 5, topic: 'geo',
            prompt: 'What is the capital city of the United States?',
            choices: ['Washington, D.C.', 'New York City', 'Philadelphia', 'Boston'],
            answer: 'Washington, D.C.',
            explain: 'Washington, D.C. is the federal capital, home to the White House and Congress.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'Which river is the longest river system in the United States, flowing south to the Gulf of Mexico?',
            choices: ['Mississippi River', 'Colorado River', 'Hudson River', 'Columbia River'],
            answer: 'Mississippi River',
            explain: 'Together with the Missouri, the Mississippi forms North America’s largest river system.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'How many states make up the United States of America?',
            choices: ['50', '48', '52', '13'],
            answer: '50',
            explain: 'There are 50 states, with Alaska and Hawaii added in 1959.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'Which mountain range stretches along the eastern United States?',
            choices: ['Appalachian Mountains', 'Rocky Mountains', 'Sierra Nevada', 'Cascade Range'],
            answer: 'Appalachian Mountains',
            explain: 'The Appalachian Mountains run from Alabama northward into Canada.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'How many original colonies declared independence from Great Britain in 1776?',
            choices: ['13', '10', '21', '50'],
            answer: '13',
            explain: 'The 13 American colonies along the Atlantic coast formed the first United States.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Who was the primary author of the Declaration of Independence?',
            choices: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'Paul Revere'],
            answer: 'Thomas Jefferson',
            explain: 'Thomas Jefferson drafted the Declaration of Independence in June 1776.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Who commanded the Continental Army during the Revolutionary War and became the first U.S. President?',
            choices: ['George Washington', 'John Adams', 'Abraham Lincoln', 'Alexander Hamilton'],
            answer: 'George Washington',
            explain: 'George Washington led the Continental Army to victory and served as first President.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Why did American colonists protest British taxes like the Stamp Act and Tea Act?',
            choices: ['Taxation without representation', 'Too many holidays', 'Cold winter weather', 'New ocean maps'],
            answer: 'Taxation without representation',
            explain: 'Colonists had no elected representatives in the British Parliament that taxed them.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'What 1773 protest in Boston Harbor saw colonists dump British tea into the water?',
            choices: ['Boston Tea Party', 'Battle of Yorktown', 'Constitutional Dinner', 'Mayflower Compact'],
            answer: 'Boston Tea Party',
            explain: 'During the Boston Tea Party, protesters dumped 342 chests of tea to oppose the Tea Act.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Which 1803 land deal doubled the size of the United States?',
            choices: ['Louisiana Purchase', 'Oregon Trail', 'Treaty of Ghent', 'Alaska Purchase'],
            answer: 'Louisiana Purchase',
            explain: 'President Thomas Jefferson bought the Louisiana Territory from France in 1803.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'What is the supreme law of the United States?',
            choices: ['U.S. Constitution', 'Declaration of Rights', 'Federal Almanac', 'Mayflower Compact'],
            answer: 'U.S. Constitution',
            explain: 'Written in 1787, the U.S. Constitution establishes the rules and branches of government.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'Which branch of the U.S. government makes federal laws?',
            choices: ['Legislative Branch (Congress)', 'Executive Branch', 'Judicial Branch', 'Postal Service'],
            answer: 'Legislative Branch (Congress)',
            explain: 'Congress (the Senate and House of Representatives) writes and passes federal laws.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'Which branch of the U.S. government includes the Supreme Court and interprets laws?',
            choices: ['Judicial Branch', 'Executive Branch', 'Legislative Branch', 'Treasury Department'],
            answer: 'Judicial Branch',
            explain: 'The Judicial Branch interprets the Constitution and reviews whether laws are fair.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'What are the first ten amendments to the U.S. Constitution called?',
            choices: ['Bill of Rights', 'Articles of Peace', 'Federalist Papers', 'Emancipation Act'],
            answer: 'Bill of Rights',
            explain: 'The Bill of Rights protects freedoms like speech, religion, and trial by jury.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'Why does the U.S. government use a system of "checks and balances"?',
            choices: ['So no single branch gets too powerful', 'To count paper money faster', 'To shorten winter breaks', 'To elect mayors daily'],
            answer: 'So no single branch gets too powerful',
            explain: 'Checks and balances let each branch limit the others so power stays shared.'
        },

        // --- EXPANDED GRADE 3 (10 more -> 25 total) ---
        {
            grade: 3, topic: 'geo',
            prompt: 'Which continent is both a country and an island?',
            choices: ['Australia', 'Europe', 'South America', 'Africa'],
            answer: 'Australia',
            explain: 'Australia is the only continent that is also a single country.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'What document lists a community’s or nation’s basic rules and rights?',
            choices: ['Constitution', 'Dictionary', 'Calendar', 'Receipt'],
            answer: 'Constitution',
            explain: 'A constitution sets out the core laws and rights of a government.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'How do cities pay for public parks, libraries, and roads?',
            choices: ['Taxes', 'Raffles', 'Library fines only', 'Treasure hunts'],
            answer: 'Taxes',
            explain: 'Citizens pay taxes so local governments can fund schools, parks, and roads.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'What is a volunteer?',
            choices: ['Someone who helps without pay', 'A paid mayor', 'A movie actor', 'A bus driver'],
            answer: 'Someone who helps without pay',
            explain: 'Volunteers freely give their time to improve their school or neighborhood.'
        },
        {
            grade: 3, topic: 'civics',
            prompt: 'Which local place lets everyone borrow books and use computers for free?',
            choices: ['Public library', 'Grocery store', 'Post office', 'Train station'],
            answer: 'Public library',
            explain: 'Public libraries are community hubs funded by taxes for everyone to learn.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'What holiday in July celebrates the birthday of the United States?',
            choices: ['Independence Day (July 4)', 'Thanksgiving', 'Memorial Day', 'Veterans Day'],
            answer: 'Independence Day (July 4)',
            explain: 'July 4, 1776 is when the Declaration of Independence was adopted.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Which famous statue in New York Harbor welcomes newcomers as a symbol of freedom?',
            choices: ['Statue of Liberty', 'Liberty Bell', 'Lincoln Memorial', 'Mount Rushmore'],
            answer: 'Statue of Liberty',
            explain: 'France gifted the Statue of Liberty to the United States in 1886.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'What monument in Washington, D.C. is a tall white obelisk honoring our first President?',
            choices: ['Washington Monument', 'Space Needle', 'Alamo', 'Gateway Arch'],
            answer: 'Washington Monument',
            explain: 'The Washington Monument honors George Washington, the first U.S. President.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Why did early Native American groups build different kinds of homes like pueblos or plank houses?',
            choices: ['They used materials from their local environment', 'They copied modern skyscrapers', 'They only lived on boats', 'They ordered bricks online'],
            answer: 'They used materials from their local environment',
            explain: 'Desert tribes used adobe clay, while forest tribes used cedar wood and bark.'
        },
        {
            grade: 3, topic: 'history',
            prompt: 'Which California landmark in Los Angeles is famous for giant tar-pit fossils of mammoths and saber-toothed cats?',
            choices: ['La Brea Tar Pits', 'Yosemite Valley', 'Alcatraz Island', 'Hearst Castle'],
            answer: 'La Brea Tar Pits',
            explain: 'The La Brea Tar Pits preserved Ice Age animal fossils right in Los Angeles.'
        },

        // --- EXPANDED GRADE 4 (10 more -> 25 total) ---
        {
            grade: 4, topic: 'geo',
            prompt: 'Which California national park is famous for giant granite cliffs like El Capitan and Half Dome?',
            choices: ['Yosemite National Park', 'Joshua Tree', 'Redwood Park', 'Channel Islands'],
            answer: 'Yosemite National Park',
            explain: 'Yosemite Valley in the Sierra Nevada was carved by ancient glaciers.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which tall trees along Northern California’s misty coast are the tallest living trees on Earth?',
            choices: ['Coast redwoods', 'Joshua trees', 'Palm trees', 'Saguaro cactuses'],
            answer: 'Coast redwoods',
            explain: 'Coast redwoods in Northern California can grow over 350 feet tall.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'Which river forms much of California’s southeastern border with Arizona?',
            choices: ['Colorado River', 'Sacramento River', 'Mississippi River', 'Rio Grande'],
            answer: 'Colorado River',
            explain: 'The Colorado River supplies water to Southern California farms and cities.'
        },
        {
            grade: 4, topic: 'geo',
            prompt: 'What natural hazard happens when rock plates shift along California’s San Andreas Fault?',
            choices: ['Earthquakes', 'Hurricanes', 'Blizzards', 'Tornadoes'],
            answer: 'Earthquakes',
            explain: 'California sits along tectonic plate boundaries where faults cause earthquakes.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'What were the large cattle ranches in Mexican-era California called?',
            choices: ['Ranchos', 'Plantations', 'Factories', 'Subways'],
            answer: 'Ranchos',
            explain: 'Californio families raised cattle for hides and tallow on huge ranchos.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'Who became famous during the Gold Rush for selling durable canvas pants to miners?',
            choices: ['Levi Strauss', 'John Sutter', 'James Marshall', 'Juan Cabrillo'],
            answer: 'Levi Strauss',
            explain: 'Levi Strauss partnered with Jacob Davis to invent riveted blue jeans in California.'
        },
        {
            grade: 4, topic: 'history',
            prompt: 'What 1913 engineering project brought mountain water over 200 miles to help Los Angeles grow?',
            choices: ['Los Angeles Aqueduct', 'Golden Gate Bridge', 'Hoover Dam', 'BART Tunnel'],
            answer: 'Los Angeles Aqueduct',
            explain: 'The Los Angeles Aqueduct carried water from the Owens Valley into Los Angeles.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'How many houses make up the California State Legislature?',
            choices: ['Two (Assembly and Senate)', 'One (Council)', 'Three (Courts)', 'Four (Districts)'],
            answer: 'Two (Assembly and Senate)',
            explain: 'California’s Legislature has an 80-member Assembly and a 40-member Senate.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'What is the highest court in California’s state judicial branch?',
            choices: ['California Supreme Court', 'County Traffic Court', 'City Council', 'School Board'],
            answer: 'California Supreme Court',
            explain: 'The California Supreme Court makes final decisions on California state laws.'
        },
        {
            grade: 4, topic: 'civics',
            prompt: 'What official motto of California means "I have found it!" in Greek?',
            choices: ['Eureka', 'Excelsior', 'Liberty', 'Aloha'],
            answer: 'Eureka',
            explain: 'California adopted "Eureka" after the 1848 Gold Rush discovery.'
        },

        // --- EXPANDED GRADE 5 (10 more -> 25 total) ---
        {
            grade: 5, topic: 'geo',
            prompt: 'Which five huge freshwater lakes lie along the northern border of the United States?',
            choices: ['Great Lakes', 'Finger Lakes', 'Salt Lakes', 'Ozark Lakes'],
            answer: 'Great Lakes',
            explain: 'HOMES: Huron, Ontario, Michigan, Erie, and Superior form the Great Lakes.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'Which U.S. state is a chain of volcanic islands in the Pacific Ocean?',
            choices: ['Hawaii', 'Alaska', 'Florida', 'Maine'],
            answer: 'Hawaii',
            explain: 'Hawaii became the 50th state in 1959 and lies in the central Pacific Ocean.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'Which U.S. state is the largest by land area, located northwest of Canada?',
            choices: ['Alaska', 'Texas', 'California', 'Montana'],
            answer: 'Alaska',
            explain: 'Alaska is more than twice the size of Texas.'
        },
        {
            grade: 5, topic: 'geo',
            prompt: 'Which line of longitude at 0 degrees passes through Greenwich, England?',
            choices: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'Arctic Circle'],
            answer: 'Prime Meridian',
            explain: 'The Prime Meridian divides Earth into Eastern and Western Hemispheres.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Which 1775 battles in Massachusetts marked the first shots of the American Revolution?',
            choices: ['Lexington and Concord', 'Gettysburg and Vicksburg', 'Yorktown and Saratoga', 'Bunker Hill and Trenton'],
            answer: 'Lexington and Concord',
            explain: 'Fighting at Lexington and Concord began the Revolutionary War in April 1775.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Which 1620 agreement signed aboard a ship set up self-government for the Pilgrims?',
            choices: ['Mayflower Compact', 'Magna Carta', 'Treaty of Paris', 'Olive Branch Petition'],
            answer: 'Mayflower Compact',
            explain: 'Pilgrims signed the Mayflower Compact to agree on fair laws for Plymouth Colony.'
        },
        {
            grade: 5, topic: 'history',
            prompt: 'Which 1781 battle ended major fighting in the American Revolutionary War?',
            choices: ['Battle of Yorktown', 'Battle of Bunker Hill', 'Battle of Valley Forge', 'Battle of Fort Sumter'],
            answer: 'Battle of Yorktown',
            explain: 'With French help, Washington surrounded British forces at Yorktown in 1781.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'Who leads the Executive Branch of the United States government?',
            choices: ['The President', 'The Chief Justice', 'The Speaker of the House', 'A State Governor'],
            answer: 'The President',
            explain: 'The President enforces federal laws and serves as Commander in Chief.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'How many U.S. Senators represent each state regardless of population?',
            choices: ['2', '4', '10', '50'],
            answer: '2',
            explain: 'Every state elects 2 Senators, making 100 total Senators in the U.S. Senate.'
        },
        {
            grade: 5, topic: 'civics',
            prompt: 'What power lets the President reject a bill passed by Congress?',
            choices: ['Veto', 'Pardon', 'Audit', 'Census'],
            answer: 'Veto',
            explain: 'A presidential veto sends a bill back to Congress, which can override it with a 2/3 vote.'
        }
    ];
})(window);
