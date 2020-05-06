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

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.recipes ALTER COLUMN "recipeId" DROP DEFAULT;
ALTER TABLE public.ingredients ALTER COLUMN "ingredientId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP TABLE public."userIngredients";
DROP SEQUENCE public."recipes_recipeId_seq";
DROP TABLE public.recipes;
DROP TABLE public."recipeIngredients";
DROP SEQUENCE public."ingredients_ingredientId_seq";
DROP TABLE public.ingredients;
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
-- Name: ingredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ingredients (
    "ingredientId" integer NOT NULL,
    name text
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
-- Name: recipeIngredients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."recipeIngredients" (
    "recipeId" integer NOT NULL,
    "ingredientsId" integer NOT NULL
);


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipes (
    "recipeId" integer NOT NULL,
    "recipeTitle" text NOT NULL,
    "recipeImage" text NOT NULL,
    "recipePrepTime" integer NOT NULL,
    "recipeIngredients" text NOT NULL,
    "recipeInstructions" text NOT NULL
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
    "userId" integer NOT NULL
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
-- Name: recipes recipeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes ALTER COLUMN "recipeId" SET DEFAULT nextval('public."recipes_recipeId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ingredients ("ingredientId", name) FROM stdin;
1	beef
\.


--
-- Data for Name: recipeIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."recipeIngredients" ("recipeId", "ingredientsId") FROM stdin;
1	1
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipes ("recipeId", "recipeTitle", "recipeImage", "recipePrepTime", "recipeIngredients", "recipeInstructions") FROM stdin;
1	Swedish Meatballs	meatballs.jpg	120	meat	cook meat
2	Smothered Pork Chops	pork-chops.jpg	90	pork	cook pork
\.


--
-- Data for Name: userIngredients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."userIngredients" ("userId", "ingredientId") FROM stdin;
1	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId") FROM stdin;
1
\.


--
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ingredients_ingredientId_seq"', 1, true);


--
-- Name: recipes_recipeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."recipes_recipeId_seq"', 2, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY ("ingredientId");


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
