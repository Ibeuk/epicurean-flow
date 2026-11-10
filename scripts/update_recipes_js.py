import re

recipes_file = 'js/recipes.js'

with open(recipes_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if manchurian-chicken-recipe already in recipes.js
if 'manchurian-chicken-recipe' not in content:
    # We want to insert the 7 additional recipes right before `// Global Recipes Manager` or `class RecipesManager`
    additional_recipes = '''
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
'''
    target = '  }\n};\n\n// Global Recipes Manager'
    replacement = '  },\n' + additional_recipes + '\n};\n\n// Global Recipes Manager'
    content = content.replace(target, replacement)
    with open(recipes_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Enriched RECIPES_DATA with all live blog recipes!")
else:
    print("Recipes already enriched.")
