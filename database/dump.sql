--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."userIngredients" DROP CONSTRAINT "userIngredients_userId_fkey";
ALTER TABLE ONLY public."userIngredients" DROP CONSTRAINT "userIngredients_ingredientId_fkey";
ALTER TABLE ONLY public."shoppingListItems" DROP CONSTRAINT "shoppingListItems_userId_fkey";
ALTER TABLE ONLY public."shoppingListItems" DROP CONSTRAINT "shoppingListItems_ingredientId_fkey";
ALTER TABLE ONLY public."recipeInstructions" DROP CONSTRAINT "recipeInstructions_recipeId_fkey";
ALTER TABLE ONLY public."recipeInstructions" DROP CONSTRAINT "recipeInstructions_instructionId_fkey";
ALTER TABLE ONLY public."recipeIngredients" DROP CONSTRAINT "recipeIngredients_recipeId_fkey";
ALTER TABLE ONLY public."recipeIngredients" DROP CONSTRAINT "recipeIngredients_ingredientId_fkey";
ALTER TABLE ONLY public."favoriteRecipes" DROP CONSTRAINT "favoriteRecipes_userId_fkey";
ALTER TABLE ONLY public."favoriteRecipes" DROP CONSTRAINT "favoriteRecipes_recipeId_fkey";
DROP INDEX public."userIngredients_userId_ingredientId";
DROP INDEX public.ingredients_name;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
ALTER TABLE ONLY public.instructions DROP CONSTRAINT instructions_pkey;
ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.recipes ALTER COLUMN "recipeId" DROP DEFAULT;
ALTER TABLE public.instructions ALTER COLUMN "instructionId" DROP DEFAULT;
ALTER TABLE public.ingredients ALTER COLUMN "ingredientId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP TABLE public."userIngredients";
DROP TABLE public."shoppingListItems";
DROP SEQUENCE public."recipes_recipeId_seq";
DROP TABLE public.recipes;
DROP TABLE public."recipeInstructions";
DROP TABLE public."recipeIngredients";
DROP SEQUENCE public."instructions_instructionId_seq";
DROP TABLE public.instructions;
DROP SEQUENCE public."ingredients_ingredientId_seq";
DROP TABLE public.ingredients;
DROP TABLE public."favoriteRecipes";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: favoriteRecipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."favoriteRecipes" (
    "userId" integer NOT NULL,
    "recipeId" integer NOT NULL
);


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredients (
    "ingredientId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ingredients_ingredientId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ingredients_ingredientId_seq" OWNED BY public.ingredients."ingredientId";


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instructions (
    "instructionId" integer NOT NULL,
    instruction text NOT NULL
);


--
-- Name: instructions_instructionId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."instructions_instructionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: instructions_instructionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."instructions_instructionId_seq" OWNED BY public.instructions."instructionId";


--
-- Name: recipeIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."recipeIngredients" (
    "recipeId" integer,
    "ingredientId" integer
);


--
-- Name: recipeInstructions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."recipeInstructions" (
    "recipeId" integer,
    "instructionId" integer
);


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipes (
    "recipeId" integer NOT NULL,
    "recipeTitle" text NOT NULL,
    "recipeImage" text NOT NULL,
    "recipePrepTime" integer NOT NULL,
    "recipeInstructions" text
);


--
-- Name: recipes_recipeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."recipes_recipeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipes_recipeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."recipes_recipeId_seq" OWNED BY public.recipes."recipeId";


--
-- Name: shoppingListItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shoppingListItems" (
    "userId" integer,
    "ingredientId" integer
);


--
-- Name: userIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userIngredients" (
    "userId" integer NOT NULL,
    "ingredientId" integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "userName" text
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: ingredients ingredientId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN "ingredientId" SET DEFAULT nextval('public."ingredients_ingredientId_seq"'::regclass);


--
-- Name: instructions instructionId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructions ALTER COLUMN "instructionId" SET DEFAULT nextval('public."instructions_instructionId_seq"'::regclass);


--
-- Name: recipes recipeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes ALTER COLUMN "recipeId" SET DEFAULT nextval('public."recipes_recipeId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: favoriteRecipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."favoriteRecipes" ("userId", "recipeId") FROM stdin;
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ingredients ("ingredientId", name) FROM stdin;
1	beef
3	apple
4	avocado
5	anchovies
6	bacon
7	beef stock
11	bread
12	beans
13	carrots
14	celery
17	chicken broth
18	cucumber
19	cheddar cheese
20	duck
24	granola
26	kale
28	lime
29	lamb
32	noodles
35	oats
36	peas
38	pickles
39	pumpkins
40	quinoa
41	rice
42	spinach
43	salmon
45	squash
46	shrimp
48	tuna
49	tomatoes
50	vinegar
51	yogurt
52	zucchini
56	flour
57	heavy cream
58	rosemary
60	ground turkey
61	ground beef
62	breadcrumbs
63	allspice
64	cream cheese
65	italian sausage
66	tortellini
67	baby spinach
69	cauliflower
70	red onion
71	jalapeno
72	cilantro
73	mozzarella cheese
74	lettuce
78	cayenne
80	cornstarch
82	beer
83	baking powder
53	vegetable oil
86	fish
88	flour tortillas
22	garlic
33	onions
95	sour cream
173	orange juice
97	cream corn
21	eggs
99	corn
100	cornbread mix
15	chicken
102	sugar
77	paprika
178	asparagus
34	olive oil
79	all-purpose flour
16	chicken stock
90	sausage
107	onion
115	marinara sauce
117	basil
37	potatoes
10	butter
120	spaghetti
30	milk
54	salt
55	pepper
27	lemon
131	alfredo sauce
68	parmesan cheese
135	elbow macaroni
89	cheese
47	thyme
126	oregano
146	steak
148	water
23	ginger
150	sesame oil
151	soy sauce
152	corn starch
143	brown sugar
25	honey
8	beef broth
9	broccoli
44	shallots
162	half and half
31	mushrooms
109	white wine
59	parsley
2	pork
168	barbecue sauce
169	canola oil
\.


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.instructions ("instructionId", instruction) FROM stdin;
15	{"step": 2, "displayText": "Transfer to a serving bowl. Serve with homemade pita chips."}
14	{"step": 1, "displayText": "In a large bowl, combine avocado, cauliflower, tomatoes, onion, jalapeno, garlic, cilantro, lime juice, salt and olive oil."}
2	{"step": 2, "displayText": "Add the onion and garlic to the pan and cook them over medium heat, stirring frequently for 3-4 minutes or until they are softened and become a deep golden color."}
1	{"step": 1, "displayText": "In a large (12 to 14-inch) skillet set over medium-high heat, add the oil. While the oil is heating, sprinkle one side of the pork chops with salt and pepper. Place the chops into the hot pan, seasoned side down, and sear for 4 minutes, or until they are a dark, golden brown. While the first sides are searing, season the top side with more salt and pepper. Flip the chops over and cook for another 4 minutes. Transfer the chops from the pan to a platter. You may have to do this in batches for a good sear."}
13	{"step": 4, "displayText": "Stir in the spinach and let it wilt. Season with salt & pepper as needed and serve with fresh parmesan sprinkled over top."}
12	{"step": 3, "displayText": "Add the garlic, chicken broth, diced tomatoes, cream, and tortellini. Cook for 5-7 minutes or until the tortellini is cooked and the sauce has reduced to your liking. Cooking the tortellini in the sauce helps thicken it (it releases starch)."}
11	{"step": 2, "displayText": "In a large bowl, combine beef, turkey, egg, onion mixture, breadcrumbs, ¼ teaspoon salt, pepper and allspice. Mix well and form into 16 meatballs."}
10	{"step": 1, "displayText": "Take the sausage meat out of the casings and crumble it into a skillet. Cook it over medium-high heat, stirring occasionally, until it's browned. Drain the fat and leave the sausage in the pan."}
9	{"step": 4, "displayText": "Remove the meatballs with a slotted spoon and set aside in a serving dish. Strain the broth, transfer to a blender with cream cheese and blend until smooth. Return to the skillet with the meatballs and simmer."}
8	{"step": 3, "displayText": "Add beef stock to the pan and bring to a boil. Reduce the heat to medium-low and slowly drop meatballs into the broth. Cover and cook for about 20 minutes, until cooked through."}
7	{"step": 2, "displayText": "In a large bowl, combine beef, turkey, egg, onion mixture, breadcrumbs, ¼ teaspoon salt, pepper and allspice. Mix well and form into 16 meatballs."}
6	{"step": 1, "displayText": "In a large nonstick skillet, heat olive oil over medium heat and add onions and garlic. Sauté until onions are translucent, about 4-5 minutes. Add celery and parsley and cook until soft, about 3-4 more minutes. Set aside to cool."}
5	{"step": 5, "displayText": "Nestle the pork chops into the simmering gravy, then cover the pan. Allow the chops to simmer in the thickened gravy for 10 minutes, or until their internal temperature reaches at least 145°F and no higher than 165°F."}
4	{"step": 4, "displayText": "Combine the cream with the rest of the beef stock and pour this liquid into the pan. Add the rosemary sprigs and bring the mixture up to a gentle simmer, stirring frequently, until thickened."}
3	{"step": 3, "displayText": "Add the onion and garlic to the pan and cook them over medium heat, stirring frequently for 3-4 minutes or until they are softened and become a deep golden color."}
\.


--
-- Data for Name: recipeIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."recipeIngredients" ("recipeId", "ingredientId") FROM stdin;
1	53
1	2
1	54
1	55
1	33
1	22
1	56
1	7
1	57
1	58
2	33
2	22
2	14
2	59
2	60
2	61
2	21
2	62
2	54
2	55
2	63
2	8
2	64
3	65
3	22
3	17
3	49
3	57
3	66
3	67
3	68
4	4
4	69
4	49
4	70
4	71
4	22
4	72
4	28
4	34
5	37
5	10
5	77
5	78
6	79
6	80
6	54
6	82
6	83
6	55
6	53
6	86
6	37
7	88
7	89
7	90
7	21
7	10
7	37
8	10
8	95
8	89
8	97
8	21
8	99
8	100
9	15
9	102
9	59
9	55
9	54
9	34
9	109
9	107
9	22
9	79
9	10
9	16
10	90
10	107
10	115
10	30
10	117
10	54
10	55
10	120
11	34
11	54
11	55
11	22
11	126
11	15
11	27
12	15
12	54
12	131
12	55
12	68
12	9
13	30
13	135
13	89
14	15
14	55
14	22
14	25
14	47
14	143
14	126
14	10
14	54
15	146
15	22
15	148
15	23
15	150
15	151
15	152
15	143
15	25
15	9
15	8
16	2
16	54
16	55
16	34
16	44
16	162
16	109
16	59
16	31
17	2
17	54
17	168
17	169
17	55
17	22
17	33
17	173
18	15
18	34
18	54
18	77
19	178
19	34
19	54
19	55
20	37
20	10
20	30
20	54
20	55
\.


--
-- Data for Name: recipeInstructions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."recipeInstructions" ("recipeId", "instructionId") FROM stdin;
1	1
1	2
1	3
1	4
1	5
2	6
2	7
2	8
2	9
3	10
3	11
3	12
3	13
4	14
4	15
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipes ("recipeId", "recipeTitle", "recipeImage", "recipePrepTime", "recipeInstructions") FROM stdin;
1	Smothered Pork Chops	https://www.simplyrecipes.com/wp-content/uploads/2019/12/Skillet_Smothered_Pork_LEAD_2b.jpg	40	[{"step":1,"displayText":"In a large (12 to 14-inch) skillet set over medium-high heat, add the oil. While the oil is heating, sprinkle one side of the pork chops with salt and pepper. Place the chops into the hot pan, seasoned side down, and sear for 4 minutes, or until they are a dark, golden brown. While the first sides are searing, season the top side with more salt and pepper. Flip the chops over and cook for another 4 minutes. Transfer the chops from the pan to a platter. You may have to do this in batches for a good sear."},{"step":2,"displayText":"Add the onion and garlic to the pan and cook them over medium heat, stirring frequently for 3-4 minutes or until they are softened and become a deep golden color."},{"step":3,"displayText":"Once the onions and garlic are cooked down but still a little glossy, sprinkle flour over the veggies. If the onions aren’t glossy, add 1 tablespoon of oil before adding the flour. Cook the flour for one minute to remove the raw, starchy taste from it. Add 1/4 cup of beef stock to the pan and use your spoon to scrape up the browned bits from the bottom of the pan. The mixture will look like a very thick paste at this point."},{"step":4,"displayText":"Combine the cream with the rest of the beef stock and pour this liquid into the pan. Add the rosemary sprigs and bring the mixture up to a gentle simmer, stirring frequently, until thickened."},{"step":5,"displayText":"Nestle the pork chops into the simmering gravy, then cover the pan. Allow the chops to simmer in the thickened gravy for 10 minutes, or until their internal temperature reaches at least 145°F and no higher than 165°F."}]
3	One Pan Tortellini	https://www.saltandlavender.com/wp-content/uploads/2019/09/one-pan-tortellini-with-sausage-recipe-3-720x1080.jpg	40	[{"step":1,"displayText":"Take the sausage meat out of the casings and crumble it into a skillet. Cook it over medium-high heat, stirring occasionally, until it browned. Drain the fat and leave the sausage in the pan."},{"step":2,"displayText":"In a large bowl, combine beef, turkey, egg, onion mixture, breadcrumbs, ¼ teaspoon salt, pepper and allspice. Mix well and form into 16 meatballs."},{"step":3,"displayText":"Add the garlic, chicken broth, diced tomatoes, cream, and tortellini. Cook for 5-7 minutes or until the tortellini is cooked and the sauce has reduced to your liking. Cooking the tortellini in the sauce helps thicken it (it releases starch)."},{"step":4,"displayText":"Stir in the spinach and let it wilt. Season with salt & pepper as needed and serve with fresh parmesan sprinkled over top."}]
2	Swedish Meatballs	https://themodernproper.sfo2.cdn.digitaloceanspaces.com/posts/2018/_recipeSquare/swedish-meatballs-13.jpg?mtime=20181203171358&focal=none	40	[{"step":1,"displayText":"In a large nonstick skillet, heat olive oil over medium heat and add onions and garlic. Sauté until onions are translucent, about 4-5 minutes. Add celery and parsley and cook until soft, about 3-4 more minutes. Set aside to cool."},{"step":2,"displayText":"In a large bowl, combine beef, turkey, egg, onion mixture, breadcrumbs, ¼ teaspoon salt, pepper and allspice. Mix well and form into 16 meatballs."},{"step":3,"displayText":"Add beef stock to the pan and bring to a boil. Reduce the heat to medium-low and slowly drop meatballs into the broth. Cover and cook for about 20 minutes, until cooked through."},{"step":4,"displayText":"Remove the meatballs with a slotted spoon and set aside in a serving dish. Strain the broth, transfer to a blender with cream cheese and blend until smooth. Return to the skillet with the meatballs and simmer."}]
5	Classic Hash Browns	https://cookieandkate.com/images/2018/02/crispy-hash-browns-recipe-1-1.jpg	25	[{"step":1,"displayText":"Shred potatoes into a large bowl filled with cold water. Stir until water is cloudy, drain, and cover potatoes again with fresh cold water. Stir again to dissolve excess starch. Drain potatoes well, pat dry with paper towels, and squeeze out any excess moisture."},{"step":2,"displayText":"Heat clarified butter in a large non-stick pan over medium heat. Sprinkle shredded potatoes into the hot butter and season with salt, black pepper, cayenne pepper, and paprika."},{"step":3,"displayText":"Cook potatoes until a brown crust forms on the bottom, about 5 minutes. Continue to cook and stir until potatoes are browned all over, about 5 more minutes."}]
4	Vegan Avocado Ceviche	https://loveonetoday.com/wp-content/uploads/2017/11/Love-One-Today-Facebook-Vegan-Avocado-Ceviche.jpg	20	[{"step":1,"displayText":"In a large bowl, combine avocado, cauliflower, tomatoes, onion, jalapeno, garlic, cilantro, lime juice, salt and olive oil."},{"step":2,"displayText":"Transfer to a serving bowl. Serve with homemade pita chips."}]
6	Classic Fish and Chips	https://www.thespruceeats.com/thmb/L3PsB3-RhPRTtPMT_YxwpUvu1dk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-fish-and-chips-recipe-434856-Hero-5b61b89346e0fb00500f2141.jpg	40	[{"step":1,"displayText":"In a large, roomy bowl, mix all but 2 tablespoons of the flour (set aside) with the cornstarch and baking powder. Season lightly with a tiny pinch of salt and pepper."},{"step":2,"displayText":"Using a fork to whisk continuously, add the beer and the sparkling water to the flour mixture and continue mixing until you have a thick, smooth batter. Place the batter in the fridge to rest for between 30 minutes and an hour."},{"step":3,"displayText":"Meanwhile, cut the potatoes into 1-centimeter slices (a little less than a half an inch), then slice these into 1-centimeter-wide chips. Place the chips into a colander and rinse under cold running water."},{"step":4,"displayText":"Place the washed chips into a pan of cold water. Bring to a gentle boil and simmer for 3 to 4 minutes."},{"step":5,"displayText":"Drain carefully through a colander then dry with kitchen paper. Keep in the fridge covered with kitchen paper until needed."},{"step":6,"displayText":"Meanwhile, lay the fish fillets on a sheet of kitchen paper and pat dry. Season lightly with a little sea salt."},{"step":7,"displayText":"Heat the oil to 350 F in a deep-fat fryer or large, deep saucepan. Cook the chips a few handfuls at a time in the fat for about 2 minutes. Do not brown them. Once the chips are slightly cooked, remove them from the fat and drain. Keep to one side."},{"step":8,"displayText":"Place the 2 tablespoons of flour reserved from the batter mix into a shallow bowl. Toss each fish fillet in the flour and shake off any excess."},{"step":9,"displayText":"Dip into the batter, coating the entire fillet."},{"step":10,"displayText":"Check that the oil temperature is still 350 F. Carefully lower each fillet into the hot oil. Fry for approximately 8 minutes, or until the batter is crisp and golden, turning the fillets from time to time with a large slotted spoon."},{"step":11,"displayText":"Once cooked, remove the fillets from the hot oil and drain on kitchen paper. Sprinkle with salt. Cover with greaseproof paper and keep hot."},{"step":12,"displayText":"Heat the oil to 400 F then cook the chips until golden and crisp, or about 5 minutes. Remove from the oil and drain. Season with salt."},{"step":13,"displayText":"Serve immediately with the hot fish accompanied by your favorite condiment."}]
7	Breakfast Burrito	https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-breakfast-burrito-horizontaljpg-1541624805.jpg?resize=768:*	45	[{"step":1,"displayText":"Finely dice potatoes and set aside."},{"step":2,"displayText":"In a skillet over medium heat, cook sausage until cooked, about 8 minutes.  Remove protein from skillet."},{"step":3,"displayText":"Cook potatoes in bacon fat and transfer to a plate."},{"step":4,"displayText":"In a medium bowl, whisk together eggs. Wipe out skillet, place over medium heat, and melt butter. When butter is just starting to foam, reduce heat to medium-low and add beaten eggs. Using a rubber spatula, stir every occasionally until soft curds form. Season with salt and pepper. Remove from heat."},{"step":5,"displayText":"Warm tortillas on a hot skillet for 30 seconds on each side."},{"step":6,"displayText":"Assemble burritos: In the center of each tortilla, layer potatoes, scrambled eggs, cheese, and sausage. Fold in the two sides and roll up tightly. Serve with hot sauce."}]
8	Cream Corn Casserole	https://www.thegunnysack.com/wp-content/uploads/2019/11/Corn-Casserole-Recipe-735x1103.jpg	60	[{"step":1,"displayText":"Preheat the oven to 350 degrees."},{"step":2,"displayText":"Melt half stick of butter."},{"step":3,"displayText":"In a large bowl, mix all ingredients until combined."},{"step":4,"displayText":"Grease an 8x8 baking dish and pour the contents inside"},{"step":5,"displayText":"Bake for 45 minutes at 350."},{"step":6,"displayText":"Remove from the oven and let it rest for at least 10 minutes before serving."}]
9	Chicken with Pan Sauce	https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F13%2F11%2Fpan-seared-chicken-breast-rich-pan-sauce-ck-x.jpg%3Fitok%3DZasTv-xO&w=450&c=sc&poi=face&q=85	35	[{"step":1,"displayText":"Let chicken stand at room temperature for 20 minutes. Sprinkle chicken with 1/4 teaspoon pepper and 1/4 teaspoon salt. Heat a large stainless steel skillet over medium-high heat. Add 1 tablespoon oil; swirl to coat. Add chicken to pan, rounded side down; cook 5 minutes. Turn chicken over; reduce heat to medium, and cook 5 minutes or until done. Remove chicken from pan; let stand 5 minutes."},{"step":2,"displayText":"Add remaining 1 teaspoon oil, onion, and garlic to pan; sauté 1 minute. Add flour; sauté 30 seconds. Add wine to pan; cook 30 seconds or until liquid almost evaporates, stirring constantly. Stir in stock; bring to a boil, scraping pan to loosen browned bits. Reduce heat to medium-low; simmer 3 minutes or until reduced to 1/2 cup, stirring occasionally. Remove pan from heat; stir in remaining 1/4 teaspoon pepper, remaining 1/8 teaspoon salt, butter, and sugar. Sprinkle with parsley."}]
10	Tomato Basil Sausage Spaghetti	https://img.buzzfeed.com/thumbnailer-prod-us-east-1/eb3d417e793642dcb54d2f2e8155b7da/BFV9208_Spaghetti4Ways.jpg	20	[{"step":1,"displayText":"Cook spaghetti per package instructions.  Finely chop fresh basil and set aside."},{"step":2,"displayText":"Heat pot to medium-high heat.  Cook the sausage in the pot."},{"step":3,"displayText":"Add the onions, salt, and pepper, cooking until the onions are translucent and sausage is starting to brown."},{"step":4,"displayText":"Add the marinara, milk, and basil, cooking until sauce has thickened slightly."},{"step":5,"displayText":"Add the spaghetti, and toss until evenly coated and sauce sticks to the noodles."}]
11	Lemon Pepper Chicken	https://img.buzzfeed.com/thumbnailer-prod-us-east-1/86a242615fb54bfba9a73d90c019b3a7/BFV18394_One-Pan_Chicken_Meal_Prep_4_Ways_-_FB_1080x1080.jpg?output-quality=100&resize=900:*	30	[{"step":1,"displayText":"Preheat oven to 400°F (200°C)."},{"step":2,"displayText":"Tear off a sheet of parchment paper, large enough to fold into a packet."},{"step":3,"displayText":"Place chicken breast on top of parchment paper. Season with salt, pepper, oregano, minced garlic, and lemon juice. Garnish with 2-3 lemon slices."},{"step":4,"displayText":"Fold the edges of the parchment paper widthwise 2-3 times then twist the ends until fully closed."},{"step":5,"displayText":"Bake for 20-25 minutes or until internal temperature reaches 165°F (74°C)."}]
12	Alfredo Chicken Bake	https://img.buzzfeed.com/thumbnailer-prod-us-east-1/e025695faf82444381606156d320db4a/BFV9176_Chicken_Bake_4_Ways_FB1080SQ.jpg?output-quality=100&resize=900:*	50	[{"step":1,"displayText":"Preheat oven to 400˚F (200˚C)."},{"step":2,"displayText":"Spread a layer of alfredo sauce on the baking dish. Place chicken over sauce. Season chicken with salt and pepper, to taste."},{"step":3,"displayText":"Spread broccoli over chicken."},{"step":4,"displayText":"Pour remaining alfredo over chicken and broccoli."},{"step":5,"displayText":"Top with Parmesan cheese."},{"step":6,"displayText":"Bake for 40 minutes. Enjoy!"}]
13	Mac and Cheese	https://img.buzzfeed.com/thumbnailer-prod-us-east-1/6f1f6e8541404c6db1f0fa9c0d6de7f8/BFV12484_3-IngredientDinners-FB1080SQ.jpg	15	[{"step":1,"displayText":"In a large pot, bring the milk to a boil."},{"step":2,"displayText":"Add the pasta and stir constantly until the pasta is cooked, about 10 minutes."},{"step":3,"displayText":"Turn off the heat, then add the cheddar. Stir until the cheese is melted and the pasta is evenly coated."},{"step":4,"displayText":"Add additional seasonings to your liking."}]
14	Honey Garlic Chicken	https://img.buzzfeed.com/video-api-prod/assets/ba8b9b30531c4058956bbe5c1296bbc8/Thumb_A_FB.jpg	40	[{"step":1,"displayText":"Preheat oven to 400˚F (200˚C)"},{"step":2,"displayText":"Season chicken thighs with salt and pepper."},{"step":3,"displayText":"Melt 1 tablespoon butter in a large ovenproof skillet over medium heat. Add chicken, skin-side down, and sear both sides until golden brown. (The skin side will take much longer, in order to properly render the fat and crisp up the skin.)"},{"step":4,"displayText":"Remove chicken thighs and set aside. Pour out any excess fat, but leave some in for the sauce."},{"step":5,"displayText":"Add garlic, stir until fragrant, then add brown sugar, honey, thyme, and oregano, and stir. Reduce heat to low."},{"step":6,"displayText":"Return chicken to the skillet. Coat the chicken in the sauce."},{"step":7,"displayText":"Bake for 25 minutes or until chicken is cooked through."}]
15	Beef and Broccoli	https://img.buzzfeed.com/video-api-prod/assets/f48d0ecb8b494e1189d5117492cb7420/thumb.jpg	30	[{"step":1,"displayText":"In an oiled skillet over medium-high heat, sear the thinly sliced steak until cooked all the way through. Remove from the pan."},{"step":2,"displayText":"Add a little more oil, then add the garlic and ginger to the pan. Sauté until soft."},{"step":3,"displayText":"Add the sesame oil, soy sauce, brown sugar, honey, and beef broth. Stir until combined."},{"step":4,"displayText":"Add the broccoli florets."},{"step":5,"displayText":"In a separate bowl, combine cornstarch and water. Add to broccoli mixture. Bring to a boil, until sauce has thickened."},{"step":6,"displayText":"Add the beef back into the mixture, and serve over rice with sesame seeds, if desired."}]
16	Pork Chops with Creamy Mushroom Sauce	https://d11jlb3pm9d3u5.cloudfront.net/SixteenToNine/1200/MK8019_Kunkel.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZDExamxiM3BtOWQzdTUuY2xvdWRmcm9udC5uZXQvU2l4dGVlblRvTmluZS8xMjAwL01LODAxOV9LdW5rZWwuanBnIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxOTU2NTI0NDAwfSwiSXBBZGRyZXNzIjp7IkFXUzpTb3VyY2VJcCI6IjAuMC4wLjAvMCJ9fX1dfQ__&Signature=ZF3XPt0wD9rbCoJc2QofX1IPgF7HHj4M2YOIXYAO1oDKVT-WxWK26EOfzMAftmjwYgqRZ0AsmdSTDJpaRsCj--4jhGHIMA3uDUY~-P4RasDpcdWTK69-Tm7aVMiWcaMOPcUln1~9bIoIv7Y-XtUyEBc3alRNWVuv8UDofEO0egzZHQpk1btYXSYY7MInzT1rwg4oTnelsT5l9zNObeSLAnptf3hWceio39SIjy-ZBMvjefAECXaCTVhKJPNbeAFkDnuhh18SCWmGIyaQ4UJkAKn2o-aJp1aE5Cdhyqi0QOcngFE-PcJLfexeXqavYRwwA794SsoyJskRZqSQo3bK4A__&Key-Pair-Id=APKAJPODN2I4Z4XGLZOQ	30	[{"step":1,"displayText":"Sprinkle pork chops with 1/4 teaspoon salt and pepper. Heat 1 tablespoon oil in a large skillet, preferably cast iron, over medium-high heat. Reduce the heat to medium and add 2 pork chops. Cook, turning once, until cooked through, 5 to 7 minutes. Remove to a plate and tent with foil. Repeat with another 1 tablespoon oil and the remaining chops."},{"step":2,"displayText":"Add the remaining 1 tablespoon oil to the pan. Add shallots and mushrooms; cook, stirring frequently until the mushrooms are browned, 2 to 4 minutes. Add wine and the remaining 1/4 teaspoon salt; cook, stirring up any browned bits, until the liquid is mostly evaporated, 1 to 3 minutes. Stir in half-and-half and herbs; cook until bubbling, about 1 minute more. Serve the chops with the mushroom sauce."}]
17	Oven-Barbecued Pork Chops	https://d11jlb3pm9d3u5.cloudfront.net/SixteenToNine/1200/MK5725.jpg?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZDExamxiM3BtOWQzdTUuY2xvdWRmcm9udC5uZXQvU2l4dGVlblRvTmluZS8xMjAwL01LNTcyNS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE5NTY1MjQ0MDB9LCJJcEFkZHJlc3MiOnsiQVdTOlNvdXJjZUlwIjoiMC4wLjAuMC8wIn19fV19&Signature=V2gDMJxPiOz5a~vBB4-VMWw5hoj-xam0JT8y0hU53itcFIxBCOsHn71-ftr7m67vGdsArIytI8gTH6h6PI~QH6rX54~Z0Zvoau3pVtayfzi1OKoLViIyG6JoHSWSOdKSP~cdBMK9DDG1BovbjA60D64MMBT9SgCCbCh9Ikgd8NcXKRtWcOcX-ib8TKeKUC130Z1MjX7UWSXc9e-gb7hxYSMJ4kY8mW0DPvCC4aOpgNZ~ZlmuGZXbYpP4JS9GZDHN93AffT20XGHnOPvqEtTBWymNH-iPEdhxJ6daHHpwAknBnC44iT7qel2aHYH1Leb103sFcti3e3H5gO0bkHDHgg__&Key-Pair-Id=APKAJPODN2I4Z4XGLZOQ	30	[{"step":1,"displayText":"Preheat oven to 400°F."},{"step":2,"displayText":"Sprinkle pork chops with salt and pepper. Heat 2 teaspoons oil in a large ovenproof skillet over high heat. Add the pork chops and cook until beginning to brown, 1 to 2 minutes per side. Transfer to a plate."},{"step":3,"displayText":"Add the remaining 1 teaspoon oil to the pan. Add onion and cook, stirring, until softened, 3 to 4 minutes. Stir in garlic and cook, stirring, until fragrant, 30 seconds. Add orange juice and cook until most of the liquid has evaporated, 30 seconds to 1 minute. Stir in barbecue sauce. Return the pork chops to the pan, turning several times to coat with the sauce."},{"step":4,"displayText":"Transfer the pan to the oven and bake until the pork chops are barely pink in the middle and an instant-read thermometer registers 145°F, 6 to 10 minutes. Serve the sauce over the pork chops."}]
18	Easy Baked Chicken Breast	https://www.thecookierookie.com/wp-content/uploads/2014/06/baked-fried-chicken-recipe-4-of-6.jpg	40	[{"step":1,"displayText":"Preheat oven to 400 degrees F"},{"step":2,"displayText":"Rub chicken breasts with olive oil and sprinkle both sides with salt and paprika. Then place chicken in a broiler pan."},{"step":3,"displayText":"Bake chicken breasts at 400 degrees for 10 minutes. "},{"step":4,"displayText":"Flip chicken and cook another 15 minutes, until no longer pink in the center and the juices are clear. An instant-read thermometer inserted into the center should read at least 165 degrees F"},{"step":5,"displayText":"Serve immediately alongside vegetables, potatoes, or your favorite side dish!"}]
19	Oven-Roasted Asparagus	https://thestayathomechef.com/wp-content/uploads/2012/12/Roasted-Asparagus-1-small.jpg	25	[{"step":1,"displayText":"Preheat an oven to 425 degrees F (220 degrees C)."},{"step":2,"displayText":"Place the asparagus into a mixing bowl, and drizzle with the olive oil. Toss to coat the spears, then sprinkle with Parmesan cheese, garlic, salt, and pepper. Arrange the asparagus onto a baking sheet in a single layer."},{"step":3,"displayText":"Bake in the preheated oven until just tender, 12 to 15 minutes depending on thickness. Sprinkle with lemon juice just before serving."}]
20	Mashed Potatoes	https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18523-homestyle-mashed-potatoes-760x580.jpg?ext=.jpg	35	[{"step":1,"displayText":"Bring a pot of salted water to a boil. Add potatoes and cook until tender but still firm, about 15 minutes; drain."},{"step":2,"displayText":"In a small saucepan heat butter and milk over low heat until butter is melted. Using a potato masher or electric beater, slowly blend milk mixture into potatoes until smooth and creamy. Season with salt and pepper to taste."}]
\.


--
-- Data for Name: shoppingListItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."shoppingListItems" ("userId", "ingredientId") FROM stdin;
\.


--
-- Data for Name: userIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."userIngredients" ("userId", "ingredientId") FROM stdin;
1	53
1	2
1	54
1	55
1	33
1	22
1	56
1	7
1	57
1	58
1	14
1	59
1	60
1	61
1	21
1	62
1	63
1	8
1	64
2	2
3	3
4	4
5	5
1	37
1	78
1	77
1	10
1	79
1	80
1	83
1	82
1	86
1	88
1	90
1	89
1	34
1	126
1	27
1	15
2	53
2	54
2	55
2	33
2	22
2	56
2	7
2	57
2	58
2	14
2	59
2	60
2	61
2	21
2	62
2	63
2	8
2	64
2	65
2	17
2	49
2	66
2	67
2	68
2	4
2	69
2	70
2	71
2	72
2	28
2	34
2	37
2	10
2	77
2	78
2	79
2	80
2	82
2	83
2	86
2	88
2	89
2	90
2	95
2	97
2	99
2	100
2	15
2	102
2	109
2	107
2	16
2	115
2	30
2	117
2	120
2	126
2	27
2	131
2	9
2	135
2	25
2	47
2	143
2	146
2	148
2	23
2	150
2	151
2	152
2	44
2	162
2	31
2	168
2	169
2	173
2	178
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName") FROM stdin;
1	the_boys
2	johnnyung
3	steventran
4	nathanreitan
5	phutrieu
\.


--
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ingredients_ingredientId_seq"', 186, true);


--
-- Name: instructions_instructionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."instructions_instructionId_seq"', 15, true);


--
-- Name: recipes_recipeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."recipes_recipeId_seq"', 20, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 5, true);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY ("ingredientId");


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY ("instructionId");


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY ("recipeId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: ingredients_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ingredients_name ON public.ingredients USING btree (name);


--
-- Name: userIngredients_userId_ingredientId; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "userIngredients_userId_ingredientId" ON public."userIngredients" USING btree ("userId", "ingredientId");


--
-- Name: favoriteRecipes favoriteRecipes_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."favoriteRecipes"
    ADD CONSTRAINT "favoriteRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public.recipes("recipeId");


--
-- Name: favoriteRecipes favoriteRecipes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."favoriteRecipes"
    ADD CONSTRAINT "favoriteRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: recipeIngredients recipeIngredients_ingredientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."recipeIngredients"
    ADD CONSTRAINT "recipeIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public.ingredients("ingredientId");


--
-- Name: recipeIngredients recipeIngredients_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."recipeIngredients"
    ADD CONSTRAINT "recipeIngredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public.recipes("recipeId");


--
-- Name: recipeInstructions recipeInstructions_instructionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."recipeInstructions"
    ADD CONSTRAINT "recipeInstructions_instructionId_fkey" FOREIGN KEY ("instructionId") REFERENCES public.instructions("instructionId");


--
-- Name: recipeInstructions recipeInstructions_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."recipeInstructions"
    ADD CONSTRAINT "recipeInstructions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public.recipes("recipeId");


--
-- Name: shoppingListItems shoppingListItems_ingredientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shoppingListItems"
    ADD CONSTRAINT "shoppingListItems_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public.ingredients("ingredientId");


--
-- Name: shoppingListItems shoppingListItems_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shoppingListItems"
    ADD CONSTRAINT "shoppingListItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: userIngredients userIngredients_ingredientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public.ingredients("ingredientId");


--
-- Name: userIngredients userIngredients_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userIngredients"
    ADD CONSTRAINT "userIngredients_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

