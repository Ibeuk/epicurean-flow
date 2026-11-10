/* ==========================================================================
   EPICUREAN FLOW - RECIPES, ARTICLES & WIX BLOG INTEGRATION MODULE
   ========================================================================== */

const RECIPES_DATA = {
  'ceviche': {
    id: 'ceviche',
    category: 'mediterranean',
    badge: 'Seafood & Heritage',
    title: 'Authentic Peruvian Ceviche: Fresh Lime, Corvina & Leche de Tigre',
    subtitle: 'Classic coastal technique refined on Mediterranean shores.',
    author: 'Chef Eliane Muskus',
    prepTime: '20 mins',
    cookTime: '10 mins (Acid cure)',
    servings: '4 servings',
    difficulty: 'Intermediate',
    image: 'https://static.wixstatic.com/media/8e85e1_77c9aa584b06402187c746820060e2e1~mv2.jpg/v1/fill/w_1600,h_900,al_c/8e85e1_77c9aa584b06402187c746820060e2e1~mv2.jpg',
    excerpt: 'Fresh wild sea bass cured in vibrant lime juice, red onions, habanero chilli, and traditional leche de tigre marinade with elegant chef presentation.',
    story: `Ceviche is all about purity, speed, and contrast. During my years as head chef on private mega-yachts in the Mediterranean and the Caribbean, fresh ceviche was the dish guests requested more than any other. The secret lies in treating the lime juice not as a salad dressing, but as an instantaneous curing agent that sets the exterior of the fish firm while maintaining sashimi-soft sweetness inside.`,
    ingredients: [
      '500g sashimi-grade wild sea bass (corvina or sea bream), thoroughly chilled',
      '8 fresh juicy limes (squeezed gently by hand immediately before mixing)',
      '1 medium red onion, sliced paper-thin and soaked in ice water for 10 minutes',
      '1 fresh habanero or aji amarillo chili, finely minced (seeds removed for moderate heat)',
      '3 sprigs fresh cilantro (coriander), leaves finely chopped',
      '1 tsp fine sea salt (or to taste)',
      '1 pinch freshly ground white pepper',
      'Accompaniments: 1 cooked sweet potato cut into rounds, and toasted Andean choclo corn'
    ],
    instructions: [
      'Slice the chilled fish fillets into uniform 1.5cm cubes. Keep refrigerated until the moment of assembly.',
      'Rub the interior of a chilled ceramic or glass mixing bowl with a cut slice of chili to infuse fragrant capsaicin oils.',
      'Add the cubed fish to the bowl, sprinkle with sea salt, and gently toss for 30 seconds. Salting first tightens the fish proteins.',
      'Pour the freshly squeezed lime juice over the fish. Toss gently. Allow to cure for 6 to 8 minutes — the fish will turn opaque white on the exterior while remaining succulent in the center.',
      'Drain the sliced red onions thoroughly and fold them into the ceviche along with the minced chili and chopped cilantro.',
      'Spoon immediately into chilled shallow bowls, ladling the milky "leche de tigre" marinade over the top. Serve alongside sweet potato rounds and toasted choclo corn.'
    ],
    chefTip: 'Never squeeze limes with a mechanical press to the bitter pith. Squeeze only halfway with your fingers to capture only the sweet, aromatic essential citrus oils.'
  },

  'turkey-breast': {
    id: 'turkey-breast',
    category: 'technique',
    badge: 'Chef Technique',
    title: 'The \'No-Fail\' Sous Vide Turkey Breast',
    subtitle: 'My restaurant secret for an ultra-juicy, stress-free holiday table.',
    author: 'Chef Eliane Muskus',
    prepTime: '25 mins',
    cookTime: '3.5 hrs @ 63°C',
    servings: '8 servings',
    difficulty: 'Confident Home Cook',
    image: 'images/lemon-herb-roasted-chicken.jpg',
    excerpt: 'My restaurant secret for a juicy, perfectly cooked holiday centerpiece with herb compound butter and zero moisture loss.',
    story: `For decades, holiday cooks have suffered through dry, sawdust-textured turkey breast because whole birds require roasting until dark meat is safe, which obliterates the delicate white meat. In my Cannes restaurant, we solved this permanently with precision immersion cooking (sous vide). The meat stays exceptionally plump and juicy throughout, while finishing in a foaming pan of butter crisps the golden skin to perfection.`,
    ingredients: [
      '1.5kg whole boneless, skin-on turkey breast',
      '60g unsalted cultured butter, softened at room temperature',
      '2 sprigs fresh rosemary, leaves finely minced',
      '4 sprigs fresh thyme, leaves stripped',
      '6 fresh sage leaves, finely sliced',
      '2 garlic cloves, crushed into paste',
      '1.5 tsp kosher salt',
      '1 tsp freshly cracked black peppercorns',
      '2 tbsp extra virgin olive oil (for finishing sear)'
    ],
    instructions: [
      'Carefully separate the turkey skin from the meat using your fingers, leaving it attached at the outer edges.',
      'Mix the softened butter with minced rosemary, thyme, sage, crushed garlic, salt, and pepper to form a lush herb compound butter.',
      'Work the herb butter evenly beneath the turkey skin and massage across the entire surface of the meat.',
      'Place the seasoned turkey breast into a heavy-duty vacuum pouch. Seal on high vacuum.',
      'Set your sous vide water bath to 63°C (145.5°F). Submerge the sealed pouch completely for 3.5 to 4 hours.',
      'Remove from the bath. Carefully take the turkey out of the bag and pat the skin meticulously dry with paper towels.',
      'Heat a heavy cast iron skillet over high heat with 1 tablespoon of olive oil and 1 tablespoon of butter. Sear the skin side down for 2 to 3 minutes until blistered, crackling, and deeply bronze. Rest 5 minutes, carve into thick medallions, and spoon pan juices over top.'
    ],
    chefTip: 'Save the juices remaining inside the sous vide bag! Simmer them in a small saucepan with a splash of dry white wine for the most intense, natural turkey jus imaginable.'
  },

  'diabetes-journey': {
    id: 'diabetes-journey',
    category: 'diabetes',
    badge: 'Diabetes Living',
    title: 'My Personal Journey with Type 2 Diabetes: Transformation Through Food',
    subtitle: 'How Michelin-level technique redefined health without sacrificing pleasure.',
    author: 'Chef Eliane Muskus',
    prepTime: '10 mins read',
    cookTime: 'Lifestyle Approach',
    servings: 'For Everyday Life',
    difficulty: 'Empowering',
    image: 'images/hero-chef-eliane-new.jpg',
    excerpt: 'Chef Eliane\'s personal story of transformation, blood sugar balance, and regaining vitality through gourmet low-glycemic cooking without fear.',
    story: `When I received my diagnosis of Type 2 Diabetes, the first reaction from traditional brochures was depressing: boiled vegetables, dry chicken breasts, and eliminating everything that makes dining joyful. As a classically trained French chef, I knew that sustainable health could never come from deprivation.

I immediately applied my understanding of food science, glycemic loads, and flavor pairing to reconstruct my everyday diet. By front-loading healthy fats (first cold-pressed olive oils, avocados, walnuts), pairing complex fibers with high-quality proteins, and using natural culinary acids (citrus, vinegars) to blunt glucose absorption, my HbA1c dropped dramatically into normal range.

Today, my blood sugar is balanced, my energy is higher than it was fifteen years ago, and I eat more delicious food than ever before. This is the heartbeat behind 'The Diabetes-Friendly Kitchen' and my masterclasses.`,
    ingredients: [
      'Foundation 1: Cold-pressed Extra Virgin Olive Oil & Grass-fed Fats (slows gastric emptying)',
      'Foundation 2: High-density protein anchored with aromatic herb rubs',
      'Foundation 3: Cruciferous & leafy vegetables seasoned with toasted nuts and aged vinegars',
      'Foundation 4: Natural blood sugar balancers: Ceylon cinnamon, bitter greens, garlic, and turmeric',
      'Mindset: Joy in the kitchen, beautiful plating, and sharing food with family'
    ],
    instructions: [
      'Always start your meal with fiber or healthy fats before carbohydrates — this coats the digestive tract and prevents sharp glucose spikes.',
      'Embrace acid in cooking: a splash of Sherry vinegar or fresh lemon juice directly reduces the post-meal glycemic curve.',
      'Swap refined flours with fine blanched almond flour and ground golden flaxseed when baking treats like my signature Diabetic Banana Cake.',
      'Cook from scratch with whole, recognizable ingredients. Eliminate processed seed oils and hidden food industry maltodextrins.',
      'Celebrate food! Stress elevates cortisol, which directly spikes blood sugar. Eat in tranquility and enjoy every bite.'
    ],
    chefTip: 'Never look at a diabetes-friendly meal as "diet food." A plate of wild pan-seared sea bass over braised fennel, capers, and extra virgin olive oil is Michelin-grade dining that also happens to love your pancreas.'
  },

  'sarde-in-saor': {
    id: 'sarde-in-saor',
    category: 'mediterranean',
    badge: 'Venetian Classics',
    title: 'Sarde in Saor: Venetian Sweet & Sour Sardines',
    subtitle: 'A 700-year-old maritime Venetian antipasto of caramelized onions and pine nuts.',
    author: 'Chef Eliane Muskus',
    prepTime: '30 mins',
    cookTime: '30 mins + 24 hr marinade',
    servings: '6 servings',
    difficulty: 'Traditional Heritage',
    image: 'images/seafood-crab-platter.jpg',
    excerpt: 'Centuries-old Venetian antipasto of fried sardines marinated in sweet caramelized onions, white wine vinegar, raisins, and toasted pine nuts.',
    story: `Venetian sailors invented 'Saor' out of necessity in the 14th century: the high acidity of vinegar preserved fresh fish on long Adriatic voyages. Over the centuries, Venetian grandmothers turned it into a culinary masterpiece by marrying soft, melting white onions with golden raisins and pine nuts. The resulting sweet-sour interplay cuts through the oily richness of fresh sardines in a way that is utterly transcendent.`,
    ingredients: [
      '600g fresh sardines, gutted, heads removed, and butterflied open',
      '4 large white onions, thinly sliced into rings',
      '120ml good white wine vinegar (preferably Italian)',
      '40g golden raisins (sultanas), soaked in warm water for 15 minutes',
      '35g Italian pine nuts, gently toasted in a dry pan until fragrant',
      '1/2 cup organic all-purpose flour (for dusting)',
      'Extra virgin olive oil for frying and stewing onions',
      'Fine sea salt and freshly ground white pepper',
      '2 bay leaves'
    ],
    instructions: [
      'Rinse sardines and pat thoroughly dry. Lightly dust both sides in flour, shaking off any excess.',
      'Heat 4 tablespoons of olive oil in a wide frying pan over medium-high heat. Fry the sardines for 90 seconds per side until lightly crisp and golden. Transfer to a paper towel-lined platter and season with sea salt.',
      'In the same skillet (add a touch more olive oil if dry), cook the sliced onions with bay leaves over gentle low heat for 25 to 30 minutes. Do not burn them; they should become meltingly tender, translucent, and sweet.',
      'Pour the white wine vinegar over the onions, increase heat to medium, and simmer for 3 minutes until the sharp fumes subside. Remove from heat and stir in the drained raisins and toasted pine nuts.',
      'In a ceramic or terracotta terrine dish, arrange a layer of fried sardines. Cover with a layer of warm onion saor. Repeat until all fish and onions are layered, finishing with onion and pine nuts on top.',
      'Allow to cool completely to room temperature, then cover tightly and refrigerate for at least 24 hours (48 hours is even better!). Bring to cool room temperature before serving with toasted polenta rounds.'
    ],
    chefTip: 'Patience is everything here: do NOT eat this the day it is cooked. The magic happens during the 24-hour rest when the vinegar softens the tiny sardine bones and perfumes the meat.'
  },

  'chicken-sherry': {
    id: 'chicken-sherry',
    category: 'mediterranean',
    badge: 'French Bistro',
    title: 'Juicy Chicken Breasts with Wild Mushroom & Sherry Sauce',
    subtitle: 'Classic French pan-sauce technique with Spanish Oloroso depth.',
    author: 'Chef Eliane Muskus',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: '4 servings',
    difficulty: 'Easy Gourmet',
    image: 'https://static.wixstatic.com/media/30dece_1857ef21db784a739672d128e48f7dc7f002.jpg/v1/fill/w_1200,h_800,enc_auto/file.jpeg',
    excerpt: 'Tender pan-seared chicken deglazed with dry Oloroso sherry, fresh wild mushrooms, minced shallots, and crème fraîche reduction.',
    story: `This recipe is the foundation of French pan sauces taught in every reputable culinary academy. When chicken breasts are seared properly, they leave behind caramelised proteins (the 'fond') on the base of your stainless steel pan. Deglazing that fond with dry Spanish sherry releases a wave of toasted nuttiness that elevates simple weeknight chicken into a bistro spectacle.`,
    ingredients: [
      '4 pasture-raised chicken breasts (skin-on or skinless)',
      '300g mixed wild mushrooms (chanterelles, cremini, or shiitake), cleaned and sliced',
      '2 French shallots, finely diced',
      '2 cloves garlic, finely minced',
      '80ml dry Spanish Sherry (Oloroso or Amontillado — avoid sweet cream sherry)',
      '150ml rich homemade chicken bone broth',
      '3 tbsp French crème fraîche (or heavy cream)',
      '1 tsp Dijon mustard',
      '2 tbsp butter + 1 tbsp extra virgin olive oil',
      '2 tbsp fresh flat-leaf parsley, finely chopped'
    ],
    instructions: [
      'Pat chicken breasts dry with kitchen paper. Season generously on both sides with sea salt and cracked black pepper.',
      'Heat olive oil and 1 tablespoon of butter in a large skillet over medium-high heat. Sear chicken for 5 to 6 minutes per side until golden brown and cooked through (74°C / 165°F internal). Transfer to a warm plate and tent loosely with foil.',
      'In the same skillet with the remaining pan drippings, melt the remaining butter. Add shallots and mushrooms; sauté for 5 minutes until mushrooms release their moisture and turn deeply caramelized.',
      'Add minced garlic and cook for 30 seconds until fragrant.',
      'Pour in the dry sherry, vigorously scraping the bottom of the skillet with a wooden spoon to dissolve all caramelized brown bits. Simmer until reduced by half (about 2 minutes).',
      'Pour in the chicken stock, crème fraîche, and Dijon mustard. Whisk until silky and simmer gently for 3 to 4 minutes until the sauce coats the back of a spoon.',
      'Return the chicken breasts along with any collected resting juices into the simmering sauce. Spoon sauce generously over the chicken, garnish with fresh parsley, and serve immediately.'
    ],
    chefTip: 'Always choose dry Oloroso or Amontillado sherry from the wine section, never salty "cooking wine" from the grocery aisle. The quality of the sherry dictates the elegance of the finish.'
  },

  'meatballs-gravy': {
    id: 'meatballs-gravy',
    category: 'technique',
    badge: 'Comfort Gastronomy',
    title: 'Succulent Meatballs with Silky Smooth Gravy',
    subtitle: 'Melt-in-your-mouth texture with velvety bone broth reduction.',
    author: 'Chef Eliane Muskus',
    prepTime: '25 mins',
    cookTime: '25 mins',
    servings: '4 servings',
    difficulty: 'Intermediate',
    image: 'images/spaghetti-meatballs.jpg',
    excerpt: 'Ultra-tender pork and veal meatballs simmered in velvety beef bone broth reduction with touch of nutmeg and lingonberry glaze.',
    story: `Tough, rubbery meatballs are the result of overworked ground meat and lack of panade. By soaking light panko breadcrumbs in heavy cream and combining finely ground veal with Berkshire pork, each meatball stays feather-light and exceptionally juicy. Simmering them directly inside a velvety roux-thickened beef stock reduction coats every sphere in glossy comfort.`,
    ingredients: [
      '300g minced grass-fed beef (80/20 lean-to-fat ratio)',
      '200g minced tender pork or veal',
      '1/2 cup panko breadcrumbs soaked in 1/3 cup double cream for 10 minutes (the Panade)',
      '1 small yellow onion, grated finely on a box grater with its juices',
      '1 large free-range egg',
      '1/4 tsp ground allspice & 1/4 tsp freshly grated nutmeg',
      '1 tsp fine sea salt & 1/2 tsp black pepper',
      'Gravy: 40g butter, 35g flour, 450ml rich beef bone broth, 60ml cream, 1 tbsp Worcestershire sauce'
    ],
    instructions: [
      'In a large chilled mixing bowl, combine the soaked panko panade, grated onion, egg, sea salt, pepper, allspice, and nutmeg until emulsified.',
      'Add the minced beef and pork. Gently fold with your fingers just until combined — do NOT compact or overmix.',
      'Using damp hands, roll into uniform walnut-sized balls (about 25-30g each). Place on parchment paper and chill for 15 minutes.',
      'Melt 2 tablespoons of butter in a wide Dutch oven or skillet over medium heat. Brown meatballs in batches for 4 to 5 minutes until crisp on all sides. Remove to a warm plate.',
      'Whisk flour into the pan drippings to create a golden roux, cooking for 90 seconds.',
      'Gradually stream in the warm beef bone broth while whisking constantly to prevent lumps. Add Worcestershire sauce and simmer for 5 minutes until velvety and glossy. Stir in cream.',
      'Gently lower meatballs back into the simmering gravy. Cover and simmer over low heat for 10 minutes until cooked through and infused with flavor.',
      'Serve hot over buttery mashed potatoes with a spoonful of lingonberry or tart cranberry compote.'
    ],
    chefTip: 'Grate the onion rather than dicing it. The onion pulp and sweet juices melt invisibly into the meat fibers, guaranteeing moist meatballs that never dry out.'
  },

  'manchurian-chicken-recipe': {
    id: 'manchurian-chicken-recipe',
    category: 'technique',
    badge: 'Chef Technique & Fusion',
    title: 'Crisp Manchurian Chicken with Glossy Indo-Chinese Sauce',
    subtitle: 'Crisp fried chicken coated in a balanced, aromatic savory glaze.',
    author: 'Chef Eliane Muskus',
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: '4 servings',
    difficulty: 'Intermediate',
    image: 'https://static.wixstatic.com/media/30dece_427d6f6d4dc142de9892ef6d03d0b4c6~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg',
    excerpt: 'A balanced Manchurian chicken recipe with crisp fried chicken and a bold Indo-Chinese sauce, made with control and clarity of flavour.',
    story: `Manchurian chicken is one of those dishes you immediately recognise when it’s done right. The chicken stays crisp, the sauce is bold but measured, and every element has a purpose. It’s not meant to be heavy or overpoweringly syrupy—it is about striking a delicate harmony between ginger heat, garlic aromatics, and umami richness.`,
    ingredients: [
      '500g boneless skinless chicken thighs, cut into bite-sized 2.5cm pieces',
      '2 tbsp dark soy sauce (naturally brewed)',
      '1 tbsp Chinese Shaoxing wine or dry sherry',
      '2 tbsp cornstarch (for light velvety coating) + 1 egg white',
      '3 cloves garlic, finely grated + 1 inch fresh ginger, finely grated',
      '3 spring onions (scallions), green and white parts separated and sliced',
      '2 green birds-eye chilies, slit lengthwise',
      '150ml rich homemade chicken bone broth',
      '1 tbsp toasted sesame oil + 1 tsp natural rice vinegar',
      'Ground white pepper and sea salt to taste'
    ],
    instructions: [
      'Toss chicken thigh pieces with 1 tbsp soy sauce, white pepper, grated ginger, and egg white. Dust in cornstarch until each piece has a light, even dry powdery coating.',
      'Heat oil in a wide wok to 180°C (350°F). Fry chicken in small batches for 3 to 4 minutes until pale golden. Drain on paper towels.',
      'Increase oil heat to 195°C (385°F). Flash-fry the chicken a second time for 60 to 90 seconds until deeply crispy, golden, and dry. Remove and set aside.',
      'Drain excess oil from the wok, leaving 1 tablespoon. Add sliced scallion whites, minced garlic, and slit chilies; flash-fry for 30 seconds until fragrant.',
      'Pour in chicken broth, remaining soy sauce, rice vinegar, and a small cornstarch slurry (1 tsp starch dissolved in 2 tbsp water). Simmer for 60 seconds until a glossy lacquer coats the spoon.',
      'Turn off heat, toss in the crispy chicken and scallion greens, folding quickly to glaze without losing crunch. Drizzle with toasted sesame oil and serve immediately.'
    ],
    chefTip: 'The double fry is non-negotiable. The first fry seals the internal juices without over-browning; the second hot flash expels surface moisture, creating a glass-like crunch that stays crisp under the glossy sauce.'
  },

  'braised-cabbage-rolls': {
    id: 'braised-cabbage-rolls',
    category: 'mediterranean',
    badge: 'Comfort Gastronomy',
    title: 'Braised Cabbage Rolls with Minced Meat & Crème Fraîche',
    subtitle: 'Classic European comfort food slow-simmered in rich tomato bone broth.',
    author: 'Chef Eliane Muskus',
    prepTime: '35 mins',
    cookTime: '50 mins',
    servings: '6 servings',
    difficulty: 'Intermediate',
    image: 'https://static.wixstatic.com/media/30dece_b7a5dffdfda04db8a28660301d5970a4~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg',
    excerpt: 'Tender Savoy cabbage leaves stuffed with savory seasoned beef, pork, and caramelized onions, slow-braised in aromatic broth and served with cultured crème fraîche.',
    story: `Across European culinary tradition, stuffed cabbage rolls represent the ultimate alchemy of simple ingredients into pure luxury. When sweet winter Savoy cabbage is par-boiled, wrapped tightly around seasoned grass-fed meats, and braised with sweet onions and tomatoes, the juices intermingle into a velvety sauce that warms the soul.`,
    ingredients: [
      '1 large head organic Savoy cabbage (approx. 12 outer leaves carefully removed)',
      '300g minced grass-fed beef chuck (80/20 ratio)',
      '200g minced pasture-raised pork',
      '1/2 cup cooked short-grain Arborio rice, cooled',
      '2 medium shallots, finely diced and gently sautéed in butter',
      '2 cloves garlic, minced',
      '2 sprigs fresh thyme, leaves stripped',
      '500ml rich beef bone broth',
      '2 tbsp concentrated tomato paste + 1 can crushed San Marzano tomatoes',
      '120ml cultured French crème fraîche (for serving)'
    ],
    instructions: [
      'Bring a large pot of heavily salted water to a rolling boil. Blanch whole cabbage leaves for 3 minutes until pliable. Immediately plunge into an ice water bath; drain and pat dry.',
      'Using a small paring knife, shave down the tough central rib on the back of each leaf so it lays completely flat.',
      'In a large mixing bowl, combine minced beef, pork, cooked rice, sautéed shallots, garlic, thyme, sea salt, and black pepper. Divide into 12 equal portions.',
      'Place a portion of filling at the stem end of each cabbage leaf. Fold sides inward and roll tightly forward into a neat cylinder.',
      'Melt butter in a wide Dutch oven. Arrange the cabbage rolls seam-side down in a snug single layer.',
      'Whisk warm beef broth with tomato paste and crushed tomatoes. Pour over the rolls until partially submerged. Cover tightly with lid.',
      'Simmer gently on low heat (or bake at 165°C / 325°F) for 50 minutes until cabbage is fork-tender. Serve warm with pan reduction and generous dollops of cool crème fraîche.'
    ],
    chefTip: 'Always choose Savoy cabbage over ordinary white cabbage. Savoy leaves have crinkled pockets that catch and hold braising sauce, providing far more tender texture and delicate sweetness.'
  },

  'event-menu-planning-tips-for-success': {
    id: 'event-menu-planning-tips-for-success',
    category: 'technique',
    badge: 'Chef Masterclass',
    title: 'Event Menu Planning: Chef Eliane’s Professional Guide for Entertaining',
    subtitle: 'The reverse-timeline strategy to hosting unforgettable, stress-free gatherings.',
    author: 'Chef Eliane Muskus',
    prepTime: '15 mins read',
    cookTime: 'Masterclass Method',
    servings: 'For Hosts & Entertaining',
    difficulty: 'All Levels',
    image: 'https://static.wixstatic.com/media/30dece_f0648762bb9946d4a667982b1a4d5d6f~mv2.png/v1/fit/w_800,h_800,q_90/file.png',
    excerpt: 'Chef Eliane shares her yacht-tested event menu planning blueprint: how to build balanced courses, manage prep timelines, and host without kitchen panic.',
    story: `Over 15 years as head chef on private mega-yachts and catering high-profile dinners along the French Riviera, I observed that the most common reason hosts panic is choosing dishes that require last-minute stove attention. Real professional entertaining is 85% planning and 15% execution. When your prep is completed hours before guests arrive, you can sip champagne alongside them with effortless confidence.`,
    ingredients: [
      'Rule 1: Build Around One Finishing Element Only (Only 1 item uses oven/burner during the event)',
      'Rule 2: Balance Heavy and Light (Pair rich meats with sharp citrus and bitter greens)',
      'Rule 3: Temperature Contrasts (Cold welcome canapé, hot entrée, room-temp sides, cool dessert)',
      'Rule 4: Master Reverse Timelines (Count backwards from service time to schedule shopping & prep)',
      'Rule 5: Mise en Place (Have all garnishes, oils, and sauces measured in glass ramekins)'
    ],
    instructions: [
      '7 Days Prior: Finalize guest list, dietary requirements, and choose your centerpiece dish.',
      '3 Days Prior: Complete dry pantry shopping and select your wine/beverage pairings.',
      '1 Day Prior: Prepare marinades, dressings, stocks, dessert bases, and chill your wine glasses.',
      'Morning of Event: Prep vegetables, sear or sous-vide meats, set table linens and ambient lighting.',
      '2 Hours Before: Clean kitchen completely, empty dishwasher, take a relaxing break.',
      'Service: Warm plates, reheat braises or slice roast, drizzle finishing oils, and enjoy your guests!'
    ],
    chefTip: 'Never test an entirely new, unpracticed recipe for the first time during an important dinner party. Master the dish on a quiet weeknight first so your timing is second nature.'
  },

  'indulgent-elegance-homemade-chicken-liver-pâté': {
    id: 'indulgent-elegance-homemade-chicken-liver-pâté',
    category: 'mediterranean',
    badge: 'French Bistro',
    title: 'Indulgent Elegance: Homemade Silky Chicken Liver Pâté',
    subtitle: 'Classic French technique for a velvet-smooth, aromatic bistro terrine.',
    author: 'Chef Eliane Muskus',
    prepTime: '25 mins',
    cookTime: '15 mins + 4 hr chill',
    servings: '8 servings',
    difficulty: 'Intermediate',
    image: 'https://static.wixstatic.com/media/30dece_db05d9da34fa4c9eaa35100e4fb54dd3~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg',
    excerpt: 'Velvet-smooth chicken liver pâté gently cooked with butter, shallots, French Cognac, fresh thyme, and sealed with clarified herb butter.',
    story: `A properly made French chicken liver pâté is one of the greatest luxuries in all of gastronomy. The secret lies in treating the livers with absolute gentleness: they must never be scorched or overcooked to brown grey. Seared just until pink and emulsified in a blender with cultured room-temperature butter, the texture becomes impossibly satiny and melts across warm crusty toast.`,
    ingredients: [
      '500g fresh organic chicken livers, meticulously cleaned and trimmed of sinew',
      '220g unsalted high-fat cultured French butter (divided: 40g for sauté, 180g softened for emulsion)',
      '2 French shallots, finely minced',
      '2 cloves garlic, finely grated',
      '60ml French Cognac or fine Brandy',
      '2 tbsp heavy whipping cream',
      '3 sprigs fresh thyme, leaves picked',
      '1/4 tsp freshly grated nutmeg',
      'Fine sea salt and freshly cracked white pepper',
      'Garnish: Clarified butter and bay leaf for the top airtight seal'
    ],
    instructions: [
      'Rinse trimmed chicken livers and pat thoroughly dry on paper towels.',
      'Melt 40g butter in a wide stainless steel skillet over medium heat. Sauté shallots, thyme, and garlic for 3 minutes until soft and translucent.',
      'Add chicken livers in a single layer. Sear for 2 minutes per side—the exterior should be browned while the center remains rosy pink. Do NOT overcook.',
      'Pour Cognac into the hot pan, carefully deglazing all caramelized juices for 90 seconds until alcohol vapors subside. Stir in heavy cream and remove from heat.',
      'Transfer pan contents immediately to a high-speed blender. Blend on high while gradually adding the 180g of softened cubed butter one piece at a time to form a silky emulsion.',
      'Season with sea salt, white pepper, and nutmeg. Pass through a fine mesh sieve (chinois) directly into ceramic ramekins for flawless restaurant texture.',
      'Pour melted clarified butter over top to seal. Refrigerate for at least 4 hours before serving with cornichons, fig confit, and toasted sourdough.'
    ],
    chefTip: 'Pouring a 2mm layer of clarified butter on top of the terrine prevents oxidation and keeps your pâté a radiant pink hue in the refrigerator for up to 7 days.'
  },

  'creating-a-personalized-menu-for-your-needs': {
    id: 'creating-a-personalized-menu-for-your-needs',
    category: 'diabetes',
    badge: 'Nutrition & Lifestyle',
    title: 'Creating a Personalized Menu for Your Lifestyle & Dietary Needs',
    subtitle: 'How to build sustainable daily menus that celebrate flavor without metabolic spikes.',
    author: 'Chef Eliane Muskus',
    prepTime: '12 mins read',
    cookTime: 'Lifestyle Framework',
    servings: 'Everyday Living',
    difficulty: 'Empowering',
    image: 'https://static.wixstatic.com/media/30dece_c31fd3fcab9f42be9c1d909c363a3e76~mv2.png/v1/fit/w_800,h_800,q_90/file.png',
    excerpt: 'How to construct personalized weekly meal routines that support blood glucose stability, vibrant energy, and true culinary pleasure without feeling restricted.',
    story: `Dietary personalization should never feel like punishment. As someone who adapted to Type 2 diabetes after a lifetime in Michelin kitchens, I realized that generic dietary plans fail because they ignore the sensory pleasure of food. When you learn how to pair aromatic spices, natural fats, and healthy textures, your daily meals become something you eagerly look forward to every morning.`,
    ingredients: [
      'Pillar 1: 50% Plate Foundation of non-starchy Mediterranean vegetables (fennel, artichokes, spinach, zucchini)',
      'Pillar 2: 25% Premium Protein (wild fish, pasture-raised poultry, eggs, legumes)',
      'Pillar 3: 25% Nutrient-Dense Carbohydrates (lentils, quinoa, or roasted root vegetables)',
      'Pillar 4: Healthy Lipids (first cold-pressed extra virgin olive oil, avocado, toasted seeds)',
      'Pillar 5: Acid and Spices (Sherry vinegar, lemon zest, sumac, cumin, za’atar)'
    ],
    instructions: [
      'Step 1: Identify your personal carbohydrate tolerance and peak energy times during the day.',
      'Step 2: Choose 3 core proteins for the week to keep shopping focused and prevent food waste.',
      'Step 3: Roast a large batch of seasonal Mediterranean vegetables with olive oil and sea salt for easy assembly.',
      'Step 4: Keep homemade herb vinaigrettes (olive oil, lemon, Dijon, garlic) ready in mason jars.',
      'Step 5: Assemble dynamic bowls with protein, greens, toasted nuts, and generous dressing for effortless lunches.'
    ],
    chefTip: 'Acid is the chef secret to low-glycemic satiety. A finishing squeeze of fresh lemon juice or a drizzle of aged Sherry vinegar enhances flavor perception so you need far less salt or carbohydrate to feel completely satisfied.'
  },

  'holiday-chocolate-fondue-recipe': {
    id: 'holiday-chocolate-fondue-recipe',
    category: 'mediterranean',
    badge: 'Holiday Entertaining',
    title: 'Indulgent Holiday Chocolate Fondue: The Ultimate Festive Dessert Experience',
    subtitle: 'Rich Valrhona dark chocolate melted with double cream, vanilla & Grand Marnier.',
    author: 'Chef Eliane Muskus',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: '6 servings',
    difficulty: 'Easy Gourmet',
    image: 'https://static.wixstatic.com/media/30dece_fd0c4b04a74546a0be5457a60bbb7458~mv2.jpg/v1/fit/w_800,h_800,q_90/file.jpg',
    excerpt: 'An interactive holiday dessert masterpiece made with premium dark chocolate, infused cream, a touch of orange liqueur, and seasonal dipping delights.',
    story: `During holiday dinners, sitting around a communal pot of silken, warm chocolate fondue turns dessert into an event. The key to restaurant-quality chocolate fondue is avoiding excess sugar and using high-percentage bittersweet chocolate (65% to 70% cacao) emulsified into gently scalded cream. The result is velvety, glossy, and never cloying.`,
    ingredients: [
      '300g premium dark bittersweet chocolate (65-70% cacao, Valrhona or Guittard), finely chopped',
      '240ml fresh double cream (heavy whipping cream)',
      '1 whole Madagascar vanilla bean (split and seeds scraped) or 1 tsp pure vanilla paste',
      '2 tbsp Grand Marnier (orange liqueur), Amaretto, or dark spiced rum',
      '1 generous pinch of flaky Maldon sea salt',
      'For Dipping: Fresh organic strawberries, clementine segments, banana coins, toasted brioche cubes, and artisanal vanilla marshmallows'
    ],
    instructions: [
      'Place the finely chopped chocolate in a medium heatproof ceramic or glass bowl.',
      'In a small heavy saucepan, heat the double cream with vanilla seeds over medium heat until tiny bubbles form around the rim (do not allow to boil).',
      'Pour the hot cream directly over the chopped chocolate. Let sit untouched for 2 minutes to allow heat to penetrate the cocoa butter.',
      'Using a silicone spatula or small whisk, gently stir in concentric circles from the center outward until completely glossy, smooth, and emulsified.',
      'Stir in the Grand Marnier and flaky sea salt. The salt is essential to balance the bittersweet chocolate profile.',
      'Pour immediately into a fondue ceramic pot over a gentle tea-light candle. Arrange fresh dipping fruits and brioche on a shared platter with fondue skewers.'
    ],
    chefTip: 'If your fondue begins to cool or stiffen during a long evening, whisk in 1 tablespoon of warm cream. Never place the fondue bowl over direct flame as chocolate will scorch immediately.'
  },

  'healthy-diabetic-banana-bread-low-sugar-guilt-free-recipe': {
    id: 'healthy-diabetic-banana-bread-low-sugar-guilt-free-recipe',
    category: 'diabetes',
    badge: 'Diabetes Friendly',
    title: 'Healthy Banana Cake for Diabetics: Low-Sugar, Guilt-Free & Moist',
    subtitle: 'Almond flour, golden flaxseed & Ceylon cinnamon for steady blood glucose balance.',
    author: 'Chef Eliane Muskus',
    prepTime: '20 mins',
    cookTime: '45 mins',
    servings: '10 slices',
    difficulty: 'Easy Home Cook',
    image: 'https://static.wixstatic.com/media/30dece_8fec68335c1642cc91c030d83d0087e4~mv2.png/v1/fit/w_800,h_800,q_90/file.png',
    excerpt: 'Naturally sweetened banana bread crafted with blanched almond flour, golden flax meal, Ceylon cinnamon, and walnuts for zero glucose spikes.',
    story: `For years after my Type 2 diabetes diagnosis, I missed the comfort of banana bread with my morning espresso. Traditional bakery banana bread is loaded with refined white flour and up to a cup of sugar—a disaster for blood sugar. I reformulated this recipe in my test kitchen using blanched almond meal, rich in vitamin E and healthy fats, alongside ground golden flax. The result is so tender, moist, and naturally sweet that no one ever suspects it is diabetes-friendly.`,
    ingredients: [
      '2 ripe medium bananas, thoroughly mashed with a fork',
      '200g blanched super-fine almond flour',
      '30g golden flaxseed meal (adds fiber and binds moisture)',
      '3 large free-range eggs, room temperature',
      '60g melted grass-fed unsalted butter (or organic coconut oil)',
      '1.5 tsp Ceylon cinnamon (true cinnamon has proven insulin-sensitizing benefits)',
      '1 tsp baking soda (aluminum-free)',
      '1 tsp pure Madagascar vanilla extract',
      '1/4 tsp fine sea salt',
      '50g walnuts or pecans, roughly chopped'
    ],
    instructions: [
      'Preheat your oven to 175°C (350°F). Line an 8.5 x 4.5-inch loaf pan with unbleached parchment paper, leaving a slight overhang on both sides.',
      'In a large mixing bowl, whisk together the mashed bananas, eggs, melted butter, and vanilla extract until frothy and smooth.',
      'In a separate bowl, combine almond flour, golden flaxseed meal, Ceylon cinnamon, baking soda, and sea salt, whisking to remove any lumps.',
      'Pour the dry ingredients into the wet mixture. Fold gently with a spatula until just combined. Fold in half of the chopped walnuts.',
      'Pour batter into the prepared loaf pan and smooth the top. Sprinkle remaining walnuts on top.',
      'Bake for 40 to 45 minutes until the loaf is deeply golden brown and a skewer inserted in the center comes out clean.',
      'Allow to cool in the pan for 15 minutes, then use the parchment handles to transfer to a wire cooling rack. Cool completely before slicing into 10 generous portions.'
    ],
    chefTip: 'Store sliced portions in an airtight container in the freezer with parchment between slices. Pop a slice directly into the toaster oven for 4 minutes for a warm, fragrant breakfast with steady energy all morning.'
  }

};

// Global Recipes Manager
class RecipesManager {
  constructor() {
    this.modalEl = null;
    this.recipes = { ...RECIPES_DATA };
    this.wixClient = null;
    this.init();
  }

  async init() {
    this.createModalDOM();
    this.bindCardTriggers();
    this.bindFilterPills();
    await this.initWixBlogSync();
  }

  // Inject luxury modal DOM structure into recipes.html
  createModalDOM() {
    if (document.getElementById('recipe-detail-modal')) return;

    const modalHTML = `
      <div id="recipe-detail-modal" class="recipe-modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="recipe-modal-container">
          <button class="recipe-modal-close" id="btn-close-recipe-modal" aria-label="Close Recipe Dialog">&times;</button>
          
          <div class="recipe-modal-header">
            <span class="recipe-modal-badge" id="modal-badge">Chef Recipe</span>
            <h2 class="recipe-modal-title" id="modal-title">Recipe Title</h2>
            <p class="recipe-modal-subtitle" id="modal-subtitle">Subtitle</p>
            <div class="recipe-modal-meta">
              <span class="recipe-meta-item"><strong>Prep:</strong> <span id="modal-prep">-</span></span>
              <span class="recipe-meta-item"><strong>Cook:</strong> <span id="modal-cook">-</span></span>
              <span class="recipe-meta-item"><strong>Servings:</strong> <span id="modal-servings">-</span></span>
              <span class="recipe-meta-item"><strong>Level:</strong> <span id="modal-diff">-</span></span>
            </div>
          </div>

          <div class="recipe-modal-hero">
            <img id="modal-img" src="" alt="Recipe Photo" class="recipe-modal-hero-img">
          </div>

          <div class="recipe-modal-body">
            <div class="recipe-story-box">
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 12px; color: var(--color-ink);">Chef Eliane's Culinary Heritage &amp; Technique Story</h4>
              <p id="modal-story" style="color: var(--color-ink-subtle); line-height: 1.8; font-size: 0.98rem; white-space: pre-line;"></p>
            </div>

            <div class="recipe-ingredients-section" style="margin-top: 32px;">
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 16px; color: var(--color-ink);">Ingredients Checklist</h4>
              <ul class="recipe-checklist" id="modal-ingredients"></ul>
            </div>

            <div class="recipe-method-section" style="margin-top: 32px;">
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 16px; color: var(--color-ink);">Step-by-Step Cooking Method</h4>
              <ol class="recipe-steps-list" id="modal-steps"></ol>
            </div>

            <div class="recipe-pro-tip-box" id="modal-tip-box" style="margin-top: 32px; background: rgba(200, 155, 60, 0.08); border-left: 3px solid var(--color-gold); padding: 18px 22px; border-radius: 4px;">
              <strong style="color: var(--color-gold); font-family: var(--font-serif); display: block; margin-bottom: 6px; font-size: 1.05rem;">Chef Eliane's Pro Tip:</strong>
              <p id="modal-tip" style="margin: 0; color: var(--color-ink); font-size: 0.95rem; line-height: 1.6;"></p>
            </div>

            <div class="recipe-modal-actions" style="margin-top: 40px; display: flex; gap: 16px; justify-content: space-between; flex-wrap: wrap; border-top: 1px solid var(--color-border); padding-top: 24px;">
              <button class="btn btn-outline" id="btn-print-recipe" style="display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                <span>Print Recipe</span>
              </button>
              <a href="cookbooks.html" class="btn btn-gold">
                <span>Explore Full Cookbooks &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modalEl = document.getElementById('recipe-detail-modal');

    // Close listeners
    const closeBtn = document.getElementById('btn-close-recipe-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Print listener
    const printBtn = document.getElementById('btn-print-recipe');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Open recipe modal with selected data
  openRecipe(recipeId) {
    const data = this.recipes[recipeId];
    if (!data || !this.modalEl) return;

    document.getElementById('modal-badge').textContent = data.badge || 'Chef Recipe';
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.subtitle || data.excerpt || '';
    document.getElementById('modal-prep').textContent = data.prepTime || '-';
    document.getElementById('modal-cook').textContent = data.cookTime || '-';
    document.getElementById('modal-servings').textContent = data.servings || '-';
    document.getElementById('modal-diff').textContent = data.difficulty || 'All Levels';
    
    const imgEl = document.getElementById('modal-img');
    if (imgEl) {
      imgEl.src = data.image || 'images/hero-chef-eliane-new.jpg';
      imgEl.alt = data.title;
    }

    document.getElementById('modal-story').textContent = data.story || data.excerpt || '';

    // Render ingredients checklist
    const ingrUl = document.getElementById('modal-ingredients');
    if (ingrUl) {
      ingrUl.innerHTML = '';
      if (data.ingredients && data.ingredients.length > 0) {
        data.ingredients.forEach(item => {
          const li = document.createElement('li');
          li.style.cssText = 'display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 0.95rem; color: var(--color-ink); cursor: pointer;';
          li.innerHTML = `
            <input type="checkbox" style="margin-top: 5px; accent-color: var(--color-gold); cursor: pointer;">
            <span>${item}</span>
          `;
          li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
              const cb = li.querySelector('input');
              cb.checked = !cb.checked;
            }
          });
          ingrUl.appendChild(li);
        });
      } else {
        ingrUl.innerHTML = '<li>Fresh seasonal pantry ingredients. See chef details in story.</li>';
      }
    }

    // Render steps list
    const stepsOl = document.getElementById('modal-steps');
    if (stepsOl) {
      stepsOl.innerHTML = '';
      if (data.instructions && data.instructions.length > 0) {
        data.instructions.forEach(step => {
          const li = document.createElement('li');
          li.style.cssText = 'margin-bottom: 14px; font-size: 0.95rem; color: var(--color-ink); line-height: 1.7; padding-left: 6px;';
          li.textContent = step;
          stepsOl.appendChild(li);
        });
      } else {
        stepsOl.innerHTML = `<li>${data.excerpt || 'Follow chef guidance above.'}</li>`;
      }
    }

    // Pro tip
    const tipBox = document.getElementById('modal-tip-box');
    const tipText = document.getElementById('modal-tip');
    if (data.chefTip && tipBox && tipText) {
      tipBox.style.display = 'block';
      tipText.textContent = data.chefTip;
    } else if (tipBox) {
      tipBox.style.display = 'none';
    }

    // Show modal
    this.modalEl.classList.add('active');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('active');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind all recipe card buttons on the page to open modal
  bindCardTriggers() {
    const triggerMap = {
      'ceviche': 'ceviche',
      'peruvian': 'ceviche',
      'sous-vide': 'turkey-breast',
      'turkey': 'turkey-breast',
      'diabetes': 'diabetes-journey',
      'personal-journey': 'diabetes-journey',
      'sarde': 'sarde-in-saor',
      'venetian': 'sarde-in-saor',
      'chicken': 'chicken-sherry',
      'mushroom-sherry': 'chicken-sherry',
      'meatball': 'meatballs-gravy',
      'silky-gravy': 'meatballs-gravy'
    };

    const cards = document.querySelectorAll('.grid-recipes-responsive article, .grid-recipes-responsive .course-card');
    cards.forEach(card => {
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const btn = card.querySelector('a, button');
      if (btn) {
        let matchedKey = 'ceviche';
        for (const [kw, key] of Object.entries(triggerMap)) {
          if (title.includes(kw)) {
            matchedKey = key;
            break;
          }
        }
        btn.removeAttribute('href');
        btn.removeAttribute('target');
        btn.style.cursor = 'pointer';
        btn.setAttribute('data-recipe-target', matchedKey);
        btn.onclick = (e) => {
          e.preventDefault();
          this.openRecipe(matchedKey);
        };
      }
    });

    // Also remove the external wix blog archive link and replace with internal smooth filter
    const archiveBtn = document.querySelector('a[href*="/blog"]');
    if (archiveBtn) {
      archiveBtn.removeAttribute('href');
      archiveBtn.removeAttribute('target');
      archiveBtn.style.cursor = 'pointer';
      archiveBtn.innerHTML = '<span>Viewing All Signature Recipes &amp; Articles</span>';
      archiveBtn.onclick = (e) => {
        e.preventDefault();
        const allBtn = document.querySelector('.filter-pill[data-filter="all"]');
        if (allBtn) allBtn.click();
        const grid = document.querySelector('.grid-recipes-responsive');
        if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // Category filter buttons
  bindFilterPills() {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');

        const cards = document.querySelectorAll('.grid-recipes-responsive article, .grid-recipes-responsive .course-card');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter || (filter === 'plant' && cat === 'diabetes')) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Dynamically sync new blog posts from live Wix Blog API
  async initWixBlogSync() {
    try {
      let createClient, OAuthStrategy, posts;
      if (typeof window !== 'undefined' && window.WixHeadless) {
        ({ createClient, OAuthStrategy, posts } = window.WixHeadless);
      } else {
        ({ createClient, OAuthStrategy } = await import('https://esm.sh/@wix/sdk'));
        ({ posts } = await import('https://esm.sh/@wix/blog'));
      }
      
      this.wixClient = createClient({
        modules: { posts },
        auth: OAuthStrategy({ clientId: '155465fa-5c5a-477d-969f-f0d098b3bcca' })
      });

      console.log('[WixBlogSync] Querying live blog posts from Wix...');
      const res = await this.wixClient.posts.listPosts({ paging: { limit: 12 } });
      if (res && res.posts && res.posts.length > 0) {
        console.log('[WixBlogSync] Successfully retrieved', res.posts.length, 'live posts from Wix Blog');
        this.renderLiveWixPosts(res.posts);
      }
    } catch (err) {
      console.info('[WixBlogSync] Live blog sync note (using curated recipes):', err.message);
    }
  }

  // Prepend any new posts published by Chef Eliane on Wix
  renderLiveWixPosts(livePosts) {
    const grid = document.querySelector('.grid-recipes-responsive');
    if (!grid) return;

    livePosts.forEach(post => {
      // If we don't already have this post id, register it
      const slugId = post.slug || post._id;
      if (!this.recipes[slugId]) {
        let imageUrl = 'images/hero-chef-eliane-new.jpg';
        const rawImage = post.coverMedia?.image?.url || post.media?.wixMedia?.image || post.media?.image?.url || post.heroImage;
        if (rawImage) {
          if (rawImage.startsWith('http')) {
            imageUrl = rawImage;
          } else {
            const match = rawImage.match(/wix:image:\/\/v1\/([^/#?]+)/) || rawImage.match(/([a-zA-Z0-9~_.-]+\.(?:jpg|jpeg|png|webp))/i) || rawImage.match(/([a-zA-Z0-9~_.-]+)/);
            if (match) {
              const fileKey = match[1];
              imageUrl = `https://static.wixstatic.com/media/${fileKey}/v1/fill/w_800,h_533,al_c/file.jpg`;
            }
          }
        }

        const excerpt = post.excerpt || (post.plainContent ? post.plainContent.slice(0, 160) : '') || '';

        this.recipes[slugId] = {
          id: slugId,
          category: 'mediterranean',
          badge: 'Latest From Chef Eliane',
          title: post.title,
          subtitle: excerpt ? excerpt.slice(0, 120) + '...' : 'Fresh kitchen insights and culinary techniques.',
          author: 'Chef Eliane Muskus',
          prepTime: `${post.minutesToRead || 5} mins read`,
          cookTime: 'Culinary Masterclass',
          servings: 'Chef Journal',
          difficulty: 'All Levels',
          image: imageUrl,
          excerpt: excerpt,
          story: excerpt || 'Read the full recipe commentary and techniques from Chef Eliane Muskus.',
          ingredients: [
            'Fresh seasonal ingredients curated by Chef Eliane Muskus',
            'Full pantry details available in accompanying masterclasses'
          ],
          instructions: [
            excerpt || 'Full cooking steps published by Chef Eliane on the culinary journal.'
          ],
          chefTip: 'Cooking is intuition grounded in French technique. Master the fundamentals and the flavor follows.'
        };

        // Create card in grid
        const article = document.createElement('article');
        article.className = 'course-card';
        article.setAttribute('data-category', 'mediterranean');
        article.innerHTML = `
          <div class="course-thumb">
            <img src="${imageUrl}" alt="${post.title}" loading="lazy">
            <span class="course-badge">Live Wix Journal</span>
          </div>
          <div class="course-card-content">
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 10px;">${post.title}</h3>
            <p style="font-size: 0.92rem; color: var(--color-ink-subtle); line-height: 1.6; margin-bottom: 16px;">
              ${excerpt ? excerpt.slice(0, 140) + '...' : 'Explore authentic techniques and culinary balance from Chef Eliane.'}
            </p>
            <button class="btn btn-outline btn-block" style="cursor: pointer;">Read Authentic Recipe &rarr;</button>
          </div>
        `;
        const btn = article.querySelector('button');
        btn.onclick = (e) => {
          e.preventDefault();
          this.openRecipe(slugId);
        };

        grid.prepend(article);
      }
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.recipesManager = new RecipesManager();
});
