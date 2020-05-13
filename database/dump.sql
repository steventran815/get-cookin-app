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
    "recipePrepTime" integer NOT NULL
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
2	pork
3	apple
4	avocado
5	anchovies
6	bacon
7	beef stock
8	beef broth
9	broccoli
10	butter
11	bread
12	beans
13	carrots
14	celery
15	chicken
16	chicken stock
17	chicken broth
18	cucumber
19	cheddar cheese
20	duck
21	eggs
22	garlic
23	ginger
24	granola
25	honey
26	kale
27	lemon
28	lime
29	lamb
30	milk
31	mushrooms
32	noodles
33	onions
34	olive oil
35	oats
36	peas
37	potatoes
38	pickles
39	pumpkins
40	quinoa
41	rice
42	spinach
43	salmon
44	shallots
45	squash
46	shrimp
47	thyme
48	tuna
49	tomatoes
50	vinegar
51	yogurt
52	zucchini
53	vegetable oil
54	salt
55	pepper
56	flour
57	heavy cream
58	rosemary
59	parsley
60	ground turkey
61	ground beef
62	breadcrumbs
63	allspice
64	cream cheese
65	italian sausage
66	tortellini
67	baby spinach
68	parmesan cheese
69	cauliflower
70	red onion
71	jalapeno
72	cilantro
73	mozzarella cheese
74	lettuce
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

COPY public.recipes ("recipeId", "recipeTitle", "recipeImage", "recipePrepTime") FROM stdin;
1	Smothered Pork Chops	https://www.simplyrecipes.com/wp-content/uploads/2019/12/Skillet_Smothered_Pork_LEAD_2b.jpg	40
2	Swedish Meatballs	https://themodernproper.sfo2.cdn.digitaloceanspaces.com/posts/2018/_recipeSquare/swedish-meatballs-13.jpg?mtime=20181203171358&focal=none	40
3	One Pan Tortellini	https://www.saltandlavender.com/wp-content/uploads/2019/09/one-pan-tortellini-with-sausage-recipe-3-720x1080.jpg	40
4	Vegan Avocado Ceviche	https://loveonetoday.com/wp-content/uploads/2017/11/Love-One-Today-Facebook-Vegan-Avocado-Ceviche.jpg	20
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

SELECT pg_catalog.setval('public."ingredients_ingredientId_seq"', 74, true);


--
-- Name: instructions_instructionId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."instructions_instructionId_seq"', 15, true);


--
-- Name: recipes_recipeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."recipes_recipeId_seq"', 4, true);


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

